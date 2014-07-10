<?php

use Serenity\BaseMigration;

class AddUsersMeta extends BaseMigration
{
    public function init($capsule)
    {
        parent::init($capsule);
        $this->seed = false;
        $this->tableName = 'users_meta';
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
            $table->integer('user_id');
            $table->string('gender', 1);
            $table->string('avatar', 500);
            $table->string('timezone');
            $table->string('first_name', 300)->nullable();
            $table->string('last_name', 300)->nullable();
            $table->string('nick_name', 100)->nullable();
            $table->string('title', 100)->nullable();
            $table->string('bio', 1000)->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('country')->nullable();
            $table->string('display_name', 120)->nullable();
            $table->string('twitter', 120)->nullable();
            $table->integer('created_by');
            $table->integer('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // We'll need to ensure that MySQL uses the InnoDB engine to
            // support the indexes, other engines aren't affected.
            $table->engine = 'InnoDB';
            $table->unique('user_id');
            $table->index('user_id');
            $table->index('last_name');
            $table->index('first_name');
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
