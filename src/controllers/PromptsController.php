<?php

namespace soerenmeier\gptcontentgenerator\controllers;

use Craft;
use craft\web\Controller;
use craft\web\Response;
use soerenmeier\gptcontentgenerator\GptContentGenerator;
use soerenmeier\gptcontentgenerator\models\Prompts;

class PromptsController extends Controller
{
	protected array|int|bool $allowAnonymous = false;
	public $enableCsrfValidation = false;

	public function actionIndex(?int $promptId = null): Response
	{
		$canEdit = false;
		$groups = GptContentGenerator::$plugin->settings->getGroups();
		foreach ($groups as $key => $group) {
			if (Craft::$app->user->checkPermission('gpt-cg-edit-' . $key))
				$canEdit = true;
		}

		return $this->renderTemplate('gpt-content-generator/prompts/index', [
			'canEdit' => $canEdit
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
