<?php
namespace soerenmeier\gptcontentgenerator\controllers;

use Craft;
use craft\web\Controller;
use soerenmeier\gptcontentgenerator\GptContentGenerator;
use soerenmeier\gptcontentgenerator\models\Prompts;

class PromptsController extends Controller {
	protected array|int|bool $allowAnonymous = false;
	public $enableCsrfValidation = false;

	// actions/gpt-content-generator/prompts/get
	public function actionGet() {
		// $this->requireGetRequest();
		$this->requireAdmin();

		return $this->asJson(Prompts::find()->all());
	}

	public function actionEdit(?int $promptId = null): Response {
		return $this->renderTemplate('gpt-content-generator/prompts/edit', [
			'promptId' => $promptId
		]);
	}
	

	// actions/gpt-content-generator/prompts/save
	public function actionSave() {
		$this->requirePostRequest();
		$this->requireAdmin();

		$craft = Craft::$app;
		$request = $craft->getRequest();

		$id = $request->getBodyParam('id');
		$name = $request->getBodyParam('name');
		$prompt = $request->getBodyParam('prompt');

		if (is_null($id))
			$entry = new Prompts;
		else
			$entry = Prompts::findOne(intval($id));

		$entry->name = $name;
		$entry->prompt = $prompt;

		if (!$entry->save())
			throw new \Error("failed to update entry");

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
