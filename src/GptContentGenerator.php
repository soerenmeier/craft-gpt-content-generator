<?php
namespace soerenmeier\gptcontentgenerator;

use Craft;
use yii\base\Event;
use craft\base\Model;
use craft\base\Plugin;
use craft\base\Field;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterCpNavItemsEvent;
use craft\events\DefineFieldHtmlEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\services\Fields;
use craft\services\UserPermissions;
use craft\models\FieldLayout;
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

		Event::on(
			Field::class,
			Field::EVENT_DEFINE_INPUT_HTML,
			static function (DefineFieldHtmlEvent $event) {
				$plugin = GptContentGenerator::$plugin;
				$user = Craft::$app->user;
				$fieldGroups = $plugin->settings->fieldGroups;

				$group = $fieldGroups[(string) $event->sender->id] ?? null;
				if (
					!isset($group) || $group === '' ||
					!$user->checkPermission('gpt-cg-view-'. $group) ||
					!isset($plugin->settings->getGroups()[$group])
				)
					return;

				$type = (new \ReflectionClass($event->sender))->name;

				$event->html .= Craft::$app->view->renderTemplate('gpt-content-generator/fieldtag.twig', [
					'event' => $event,
					'group' => $group,
					'type' => $type
				] );
			}
		);

		Event::on(
			UserPermissions::class,
			UserPermissions::EVENT_REGISTER_PERMISSIONS,
			function(RegisterUserPermissionsEvent $event) {
				$permissions = [
					'gpt-cg-view' => [
						'label' => 'View and execute prompts'
					]
				];

				foreach ($this->settings->getGroups() as $group => $groupVal) {
					$permissions['gpt-cg-view-'. $group] = [
						'label' => 'View and execute prompts in group '. $groupVal['name']
					];
				}

				foreach ($this->settings->getGroups() as $group => $groupVal) {
					$permissions['gpt-cg-edit-'. $group] = [
						'label' => 'Edit prompts in group '. $groupVal['name']
					];
				}

				$event->permissions[] = [
					'heading' => 'GPT Content Generator',
					'permissions' => $permissions
				];
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
				$event->rules['gpt-content-generator/settings'] = 'gpt-content-generator/settings';

				$event->rules['gpt-content-generator/prompts'] = 'gpt-content-generator/prompts';
				$event->rules['gpt-content-generator/prompts/new'] = 'gpt-content-generator/prompts/edit';
				$event->rules['gpt-content-generator/prompts/<promptId:\d+>'] = 'gpt-content-generator/prompts/edit';
			}
		);
	}

	/**
	 * @inheritdoc
	 */
	public static function config(): array {
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

	public function getCpNavItem(): ?array {
		$app = Craft::$app;

		if (!$app->user->checkPermission('gpt-cg-view'))
			return null;

		$nav = parent::getCpNavItem();

		$nav['subnav']['prompts'] = [
			'label' => 'Prompts',
			'url' => 'gpt-content-generator/prompts',
		];

		if (
			$app->getUser()->getIsAdmin() &&
			$app->getConfig()->getGeneral()->allowAdminChanges
		) {
			$nav['subnav']['settings-fields'] = [
				'label' => 'Fields',
				'url' => 'gpt-content-generator/settings/fields',
			];

			$nav['subnav']['settings'] = [
				'label' => 'Settings',
				'url' => 'gpt-content-generator/settings',
			];
		}

		return $nav;
	}

	public function getSettingsResponse(): mixed {
		return Craft::$app->controller->redirect(
			'gpt-content-generator/settings'
	);
	}
}