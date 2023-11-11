<?php
namespace soerenmeier\gptcontentgenerator\assetbundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class Assets extends AssetBundle {
	public function init() {
		parent::init();

		// Define the path that your JS files are located
		$this->sourcePath = '@soerenmeier/gptcontentgenerator/dist';

		$this->depends = [
			CpAsset::class,
		];
	}
}