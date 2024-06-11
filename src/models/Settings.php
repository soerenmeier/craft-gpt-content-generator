<?php

namespace soerenmeier\gptcontentgenerator\models;

use craft\base\Model;

class Settings extends Model
{
	public string $apiKey = '';

	public string $gptModel = 'default';

	public int $maxTokens = 256;

	/// {'groupKey': {name: 'MyGroup'}}
	public array $groups = [];

	/// ['id' => 'groupKey']
	public array $fieldGroups = [];

	public function getGroups()
	{
		return array_merge([
			'default' => [
				'name' => 'Default'
			]
		], $this->groups);
	}

	public function rules(): array
	{
		return [
			[['apiKey'], 'string'],
			[['gptModel'], 'string'],
			[['maxTokens'], 'number']
		];
	}
}
