<?php
namespace soerenmeier\gptcontentgenerator\models;

use craft\base\Model;

class Settings extends Model
{
	public $fieldsEnabled = true; // Default value

	public function rules(): array
	{
		return [
			[['fieldsEnabled'], 'boolean']
		];
	}
}
