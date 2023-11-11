<?php
namespace soerenmeier\gptcontentgenerator\controllers;

use soerenmeier\gptcontentgenerator\GptContentGenerator;
use Craft;
use craft\web\Controller;

class SettingsController extends Controller {
	protected $allowAnonymous = false;

	public function actionSaveSettings() {
		$this->requirePostRequest();
		$this->requireAdmin();

		$settings = Craft::$app->getRequest()->getBodyParam('settings', []);

		$saveSettings = GptContentGenerator::$plugin->getSettings()
			->setAttributes($settings, false);
		$save2 = Craft::$app->getPlugins()
			->savePluginSettings(GptContentGenerator::$plugin, $settings);

		if ($saveSettings && $save2) {
			Craft::$app->getSession()
				->setNotice(Craft::t('gpt-content-generator', 'Settings saved.'));
		} else {
			Craft::$app->getSession()
				->setError(Craft::t('gpt-content-generator', 'Couldn’t save settings.'));
		}

		return $this->redirectToPostedUrl();
	}
}
