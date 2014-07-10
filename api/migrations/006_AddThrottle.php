<?php

use Serenity\BaseMigration;

class AddThrottle extends BaseMigration
{
    public function init($capsule)
    {
        parent::init($capsule);
        $this->seed = false;
        $this->tableName = 'users_throttle';
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
            $table->integer('user_id')->unsigned();
            $table->string('ip_address')->nullable();
            $table->integer('attempts')->default(0);
            $table->boolean('suspended')->default(0);
            $table->boolean('banned')->default(0);
            $table->timestamp('last_attempt_at')->nullable();
            $table->timestamp('suspended_at')->nullable();
            $table->timestamp('banned_at')->nullable();

            $table->engine = 'InnoDB';
            $table->index('user_id');
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
