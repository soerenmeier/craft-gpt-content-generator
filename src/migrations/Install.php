<?php

namespace soerenmeier\gptcontentgenerator\migrations;

use Craft;
use craft\db\Migration;

class Install extends Migration
{
	public function safeUp(): bool
	{
		$this->createTable('{{%gpt_content_prompts}}', [
			'id' => $this->primaryKey(),
			'name' => $this->string()->notNull(),
			'prompt' => $this->text()->notNull(),
			'group' => $this->string()->notNull(),
			'sortOrder' => $this->integer()->notNull()->defaultValue(0)
		]);

		$this->createIndex(
			'idx-gpt_content_prompts-group',
			'{{%gpt_content_prompts}}',
			'group'
		);

		return true;
	}

	public function safeDown(): bool
	{
		$this->dropTableIfExists('{{%gpt_content_prompts}}');

		return true;
	}
}
