<?php
namespace soerenmeier\gptcontentgenerator\controllers;

use Craft;
use craft\web\Controller;
use craft\web\Response;
use soerenmeier\gptcontentgenerator\GptContentGenerator;
use soerenmeier\gptcontentgenerator\models\Prompts;

class PromptsController extends Controller {
	protected array|int|bool $allowAnonymous = false;
	public $enableCsrfValidation = false;

	public function actionIndex(?int $promptId = null): Response {
		return $this->renderTemplate('gpt-content-generator/prompts/index');
	}

	public function actionEdit(?int $promptId = null): Response {
		return $this->renderTemplate('gpt-content-generator/prompts/edit', [
			'promptId' => $promptId
		]);
	}

	// actions/gpt-content-generator/prompts/get
	public function actionGet() {
		// $this->requireGetRequest();
		$this->requireAdmin();

		$plugin = GptContentGenerator::$plugin;

		$groups = $plugin->settings->getGroups();

		$groups = array_map(function($key, $value) {
			$value['key'] = $key;
			return $value;
		}, array_keys($groups), $groups);

		return $this->asJson([
			'prompts' => Prompts::find()->all(),
			'groups' => $groups,
			'fieldGroups' => $plugin->settings->fieldGroups
		]);
	}

	// actions/gpt-content-generator/prompts/save
	public function actionSave() {
		$this->requirePostRequest();
		$this->requireAdmin();

		$craft = Craft::$app;
		$plugin = GptContentGenerator::$plugin;
		$request = $craft->getRequest();

		$id = $request->getBodyParam('id');
		$name = $request->getBodyParam('name');
		$prompt = $request->getBodyParam('prompt');
		$group = $request->getBodyParam('group');

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
	public function actionDelete() {
		$this->requirePostRequest();
		$this->requireAdmin();

		$craft = Craft::$app;
		$request = $craft->getRequest();

		$id = $request->getBodyParam('id');

		$entry = Prompts::findOne(intval($id));

		if (!$entry->delete())
			throw new \Error("failed to delete entry");

		return $this->asJson(null);
	}

	public function actionExecute() {
		$this->requirePostRequest();
		$this->requireAdmin();

		$plugin = GptContentGenerator::$plugin;
		$craft = Craft::$app;
		$request = $craft->getRequest();

		$prompt = $request->getBodyParam('prompt');

		$res = $plugin->gptService->generateContent($prompt);

		return $this->asJson($res);
	}
}
