<?php

namespace soerenmeier\gptcontentgenerator\migrations;

use Craft;
use craft\db\Migration;

/**
 * m250513_203520_prompts_order migration.
 */
class m250513_203520_prompts_order extends Migration
{
	/**
	 * @inheritdoc
	 */
	public function safeUp(): bool
	{
		$tableName = '{{%gpt_content_prompts}}';

		if (!$this->db->tableExists($tableName)) {
			echo "Table $tableName does not exist. Skipping adding sortOrder column as Install migration should handle it.\n";
			return true;
		}

		if (!$this->db->columnExists($tableName, 'sortOrder')) {
			$this->addColumn($tableName, 'sortOrder', $this->integer()->notNull()->defaultValue(0));

			// Populate sortOrder for existing rows, using id as the initial sort order
			// This might not be ideal for very large tables, but generally okay for this kind of data.
			Craft::$app->db->createCommand()
				->setSql('UPDATE ' . $tableName . ' SET [[sortOrder]] = [[id]]')
				->execute();

			echo "Added sortOrder column to $tableName and populated initial values.\n";
		} else {
			echo "sortOrder column already exists in $tableName.\n";
		}

		return true;
	}

	/**
	 * @inheritdoc
	 */
	public function safeDown(): bool
	{
		$tableName = '{{%gpt_content_prompts}}';

		if ($this->db->tableExists($tableName) && $this->db->columnExists($tableName, 'sortOrder')) {
			$this->dropColumn($tableName, 'sortOrder');
			echo "Dropped sortOrder column from $tableName.\n";
		} else {
			echo "sortOrder column does not exist in $tableName or table itself does not exist. Skipping drop.\n";
		}

		return true;
	}
}
