<?php
namespace soerenmeier\gptcontentgenerator;

use Craft;
use yii\base\Event;
use craft\base\Model;
use craft\base\Plugin;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterCpNavItemsEvent;
use craft\web\UrlManager;
use craft\web\View;
use craft\web\twig\variables\CraftVariable;
use craft\web\twig\variables\Cp;
use nystudio107\pluginvite\services\VitePluginService;
use soerenmeier\gptcontentgenerator\services\GptService;
use soerenmeier\gptcontentgenerator\models\Settings;
use soerenmeier\gptcontentgenerator\assetbundles\Assets;
use soerenmeier\gptcontentgenerator\variables\ViteAssets;


class GptContentGenerator extends Plugin {
	public static $plugin;

	public bool $hasCpSettings = true;
	public bool $hasCpSection = true;

	public function init() {
		parent::init();
		self::$plugin = $this;

		// Defer most setup tasks until Craft is fully initialized
		Craft::$app->onInit(function() {
			$this->attachEventHandlers();
		});
	}

	private function attachEventHandlers(): void {
		Event::on(
			View::class,
			View::EVENT_BEFORE_RENDER_TEMPLATE,
			function () {
				// Make sure we're in the CP
				if (Craft::$app->request->isCpRequest) {
					Craft::$app->getView()->registerAssetBundle(Assets::class);
					$this->vite->register('src/main.js');
				}
			}
		);

		// Register our variables
		Event::on(
			CraftVariable::class,
			CraftVariable::EVENT_INIT,
			function (Event $event) {
				/** @var CraftVariable $variable */
				$variable = $event->sender;
				$variable->set('viteAssets', [
					'class' => ViteAssets::class,
					'viteService' => $this->vite,
				]);
			}
		);

		Event::on(
			UrlManager::class,
			UrlManager::EVENT_REGISTER_CP_URL_RULES,
			function(RegisterUrlRulesEvent $event) {
				$event->rules['gpt-content-generator/prompts/new'] = 'gpt-content-generator/prompts/edit';
				$event->rules['gpt-content-generator/prompts/<promptId:\d+>'] = 'gpt-content-generator/prompts/edit';
			}
		);
	}

	/**
	 * @inheritdoc
	 */
	public static function config(): array
	{
		return [
			'components' => [
				'gptService' => GptService::class,
				'vite' => [
					'class' => VitePluginService::class,
					'assetClass' => Assets::class,
					'useDevServer' => true,
					'devServerPublic' => 'http://localhost:3001',
					'devServerInternal' => 'http://localhost:3001',
					'checkDevServer' => true
				],
			]
		];
	}

	protected function createSettingsModel(): ?Model {
		return new Settings();
	}

	protected function settingsHtml(): string {
		return Craft::$app->getView()->renderTemplate(
			'gpt-content-generator/settings',
			[
				'settings' => $this->getSettings()
			]
		);
	}
}