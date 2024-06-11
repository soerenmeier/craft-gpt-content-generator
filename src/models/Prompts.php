<?php

namespace soerenmeier\gptcontentgenerator\models;

use craft\db\ActiveRecord;

class Prompts extends ActiveRecord
{
	// public int $id;
	// public string $name;
	// public string $prompt;
	// public string $group;

	// prompt groups
	// maybe defined in a config.php

	public static function tableName()
	{
		return '{{%gpt_content_prompts}}';
	}

	// public function rules(): array {
	// 	return [
	// 		[['name', 'prompt'], 'string']
	// 	];
	// }
}
