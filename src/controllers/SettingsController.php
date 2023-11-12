<?php
namespace soerenmeier\gptcontentgenerator\controllers;

use soerenmeier\gptcontentgenerator\GptContentGenerator;
use Craft;
use craft\web\Controller;

class SettingsController extends Controller {
	protected array|int|bool $allowAnonymous = false;
	public $enableCsrfValidation = false;

	public function actionIndex(): Response {
		$settings = GptContentGenerator::$plugin->settings;

		return $this->renderTemplate('gpt-content-generator/settings/index', [
			'settings' => $settings
		]);
	}

	public function actionFields(): Response {
		$settings = GptContentGenerator::$plugin->settings;

		return $this->renderTemplate('gpt-content-generator/settings/fields', [
			'settings' => $settings
		]);
	}

	public function actionGetFields() {
		$this->requireAdmin();

		$craft = Craft::$app;
		$settings = GptContentGenerator::$plugin->settings;

		$fields = $craft->fields->getAllFields();
		$nFields = [];

		foreach ($fields as $field) {
			$nField = filterField($field, true);

			if (!is_null($nField) && array_is_list($nField))
				$nFields = array_merge($nFields, $nField);
			else if ($nField)
				$nFields[] = $nField;
		}

		return $this->asJson([
			'fields' => $nFields,
			'fieldGroups' => $settings->fieldGroups
		]);
	}

	public function actionSaveFieldGroups() {
		$this->requireAdmin();

		$craft = Craft::$app;
		$plugin = GptContentGenerator::$plugin;
		$settings = $plugin->settings;
		$request = $craft->getRequest();

		$fieldGroups = $request->getBodyParam('fieldGroups');

		$settings->fieldGroups = json_decode($fieldGroups, true);
		$craft->plugins->savePluginSettings($plugin, []);

		return $this->asJson($settings->fieldGroups);
	}
}

function filterField($field, $nesting = false): ?array {
	$type = (new \ReflectionClass($field))->name;

	switch ($type) {
		case 'craft\fields\PlainText':
		case 'craft\ckeditor\Field':
		case 'craft\redactor\Field':
		case 'craft\fields\Table':
			return [
				'id' => (string) $field->id,
				'type' => $type,
				'handle' => $field->handle,
				'name' => $field->name
			];

		case 'craft\fields\Matrix':
		case 'benf\neo\Field':
			if (!$nesting)
				return null;

			$nFields = [];

			foreach ($field->blockTypeFields as $blockField) {
				$nField = filterField($blockField, false);
				if (!is_null($nField)) {
					$nField['id'] = ((string) $field->id). '.'. $nField['id'];
					$nField['handle'] = $field->handle. '.'. $nField['handle'];
					$nField['name'] = $field->name. ': '. $nField['name'];
					$nFields[] = $nField;
				}
			}

			return $nFields;
		// nystudio107\seomatic\fields\SeoSettings

		default:
			// var_dump($type);
			return null;
	}
}