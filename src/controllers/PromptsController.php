<?php

namespace soerenmeier\gptcontentgenerator\controllers;

use Craft;
use craft\web\Controller;
use craft\web\Response;
use soerenmeier\gptcontentgenerator\GptContentGenerator;
use soerenmeier\gptcontentgenerator\models\Prompts;
use yii\web\ForbiddenHttpException;
use yii\web\BadRequestHttpException;

class PromptsController extends Controller
{
	protected array|int|bool $allowAnonymous = false;
	public $enableCsrfValidation = false;

	public function actionIndex(?int $promptId = null): Response
	{
		$user = Craft::$app->user;

		$canEdit = false;
		$groups = GptContentGenerator::$plugin->settings->getGroups();
		foreach ($groups as $key => $group) {
			if (Craft::$app->user->checkPermission('gpt-cg-edit-' . $key))
				$canEdit = true;
		}

		$prompts = Prompts::find()->all();
		$nPrompts = [];
		foreach ($prompts as $prompt) {
			if (!$user->checkPermission('gpt-cg-view-' . $prompt->group))
				continue;

			$prompt = (object) $prompt->toArray();
			$prompt->canEdit = $user->checkPermission('gpt-cg-edit-' . $prompt->group);
			$prompt->group = $groups[$prompt->group]["name"] ?? $prompt->group;
			$nPrompts[] = $prompt;
		}

		return $this->renderTemplate('gpt-content-generator/prompts/index', [
			'canEdit' => $canEdit,
			'prompts' => $nPrompts,
		]);
	}

	public function actionEdit(?int $promptId = null): Response
	{
		return $this->renderTemplate('gpt-content-generator/prompts/edit', [
			'promptId' => $promptId
		]);
	}

	// actions/gpt-content-generator/prompts/get
	public function actionGet()
	{
		$this->requirePermission('gpt-cg-view');

		$plugin = GptContentGenerator::$plugin;
		$user = Craft::$app->user;

		$groups = $plugin->settings->getGroups();

		$nGroups = [];
		foreach ($groups as $key => $group) {
			// check the rights
			if (!$user->checkPermission('gpt-cg-view-' . $key))
				continue;
			$group['key'] = $key;
			$group['canEdit'] = $user->checkPermission('gpt-cg-edit-' . $key);
			$nGroups[] = $group;
		}

		$prompts = Prompts::find()->all();
		$nPrompts = [];
		foreach ($prompts as $prompt) {
			if (!$user->checkPermission('gpt-cg-view-' . $prompt->group))
				continue;

			$nPrompts[] = $prompt;
		}

		return $this->asJson([
			'prompts' => $nPrompts,
			'groups' => $nGroups,
			'fieldGroups' => $plugin->settings->fieldGroups
		]);
	}

	// actions/gpt-content-generator/prompts/save
	public function actionSave()
	{
		$this->requirePostRequest();

		$craft = Craft::$app;
		$plugin = GptContentGenerator::$plugin;
		$request = $craft->getRequest();

		$id = $request->getBodyParam('id');
		$name = $request->getBodyParam('name');
		$prompt = $request->getBodyParam('prompt');
		$group = $request->getBodyParam('group');

		$this->requirePermission('gpt-cg-edit-' . $group);

		// make sure the group exists
		$groups = $plugin->settings->getGroups();
		if (!isset($groups[$group]))
			throw new \Error('group does not exist');

		if (is_null($id))
			$entry = new Prompts;
		else
			$entry = Prompts::findOne(intval($id));

		$entry->name = $name;
		$entry->prompt = $prompt;
		$entry->group = $group;

		if (!$entry->save())
			throw new \Error('failed to update entry');

		return $this->asJson($entry);
	}

	// actions/gpt-content-generator/prompts/save
	public function actionDelete()
	{
		$this->requirePostRequest();

		$craft = Craft::$app;
		$request = $craft->getRequest();

		$id = $request->getBodyParam('id');

		$entry = Prompts::findOne(intval($id));

		$this->requirePermission('gpt-cg-edit-' . $entry->group);

		if (!$entry->delete())
			throw new \Error("failed to delete entry");

		return $this->asJson(null);
	}

	public function actionReorder()
	{
		$this->requirePostRequest();

		// Check if user can edit prompts in any group
		$canEditAnyGroup = false;
		$groups = GptContentGenerator::$plugin->settings->getGroups();
		foreach ($groups as $key => $groupSettings) {
			if (Craft::$app->user->checkPermission('gpt-cg-edit-' . $key)) {
				$canEditAnyGroup = true;
				break;
			}
		}

		if (!$canEditAnyGroup) {
			throw new ForbiddenHttpException('User not permitted to reorder prompts.');
		}

		$request = Craft::$app->getRequest();
		$rawOrderedIds = $request->getRequiredBodyParam('ids');
		$orderedIds = json_decode($rawOrderedIds, true);

		if (!is_array($orderedIds)) {
			Craft::error('Invalid format for ordered IDs. Expected a JSON array. Payload: ' . $rawOrderedIds, __METHOD__);
			throw new BadRequestHttpException('Invalid format for ordered IDs. Expected a JSON array.');
		}

		$db = Craft::$app->getDb();
		$transaction = $db->beginTransaction();

		try {
			foreach ($orderedIds as $sortOrder => $id) {
				$prompt = Prompts::findOne(intval($id));
				if (!$prompt)
					throw new \Exception("Prompt with ID $id not found during reorder operation.");

				$prompt->sortOrder = $sortOrder + 1;
				if (!$prompt->save(false))
					throw new \Exception("Failed to update sort order for prompt ID {$id}: ");
			}

			$transaction->commit();

			return $this->asSuccess(Craft::t('gpt-content-generator', 'Prompts reordered.'));
		} catch (\Throwable $e) {
			$transaction->rollBack();
			Craft::error('Error reordering prompts: ' . $e->getMessage(), __METHOD__);
			return $this->asErrorJson($e->getMessage());
		}
	}

	public function actionExecute()
	{
		$this->requirePostRequest();
		$this->requirePermission('gpt-cg-view');

		$plugin = GptContentGenerator::$plugin;
		$craft = Craft::$app;
		$request = $craft->getRequest();

		$prompt = $request->getBodyParam('prompt');
		$context = $request->getBodyParam('context');
		$context = json_decode($context, true);

		try {
			$twig = $craft->getView()->getTwig();
			$template = $twig->createTemplate($prompt);

			$variables = [
				'field' => $context['field'] ?? []
			];

			if (isset($context['siteId']))
				$variables['currentSite'] = $craft->sites->getSiteById($context['siteId']);

			// todo add siteId to context

			$prompt = $template->render($variables);
		} catch (\Exception $e) {
			Craft::error('gpt twig error: ' . $e->getMessage());
			return $this->asErrorJson($e->getMessage());
		}

		try {
			$res = $plugin->gptService->generateContent($prompt);

			return $this->asJson($res);
		} catch (\Exception $e) {
			return $this->asErrorJson($e->getMessage());
		}
	}
}
