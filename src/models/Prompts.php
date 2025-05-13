<?php

namespace soerenmeier\gptcontentgenerator\models;

use craft\db\ActiveRecord;
use craft\db\ActiveQuery;

class Prompts extends ActiveRecord
{
	// prompt groups
	// maybe defined in a config.php

	public static function tableName()
	{
		return '{{%gpt_content_prompts}}';
	}

	/**
	 * @inheritdoc
	 * @return ActiveQuery
	 */
	public static function find(): ActiveQuery
	{
		return parent::find()->orderBy(['sortOrder' => SORT_ASC]);
	}
}
