<?php

use Serenity\BaseMigration;

class AddGroups extends BaseMigration
{
    public function init($capsule)
    {
        parent::init($capsule);
        $this->seed = false;
        $this->tableName = 'groups';
    }
    /**
     * Do the migration
     */
    public function up()
    {
        /* @var \Illuminate\Database\Schema\Blueprint $table */
        $this->schema->dropIfExists($this->tableName);
        $this->schema->create($this->tableName, function ($table)
        {
            $table->increments('id');
            $table->string('name');
            $table->text('permissions')->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->unique('name');
        });
        return true;
    }

    /**
     * Undo the migration
     */
    public function down()
    {
        $this->schema->drop($this->tableName);
        return true;
    }
}
