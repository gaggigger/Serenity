<?php

use Serenity\BaseMigration;
use Illuminate\Database\Seeder;

class AddUsers extends BaseMigration
{
    public function init($capsule)
    {
        parent::init($capsule);
        $this->seed = true;
        $this->tableName = 'users';
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
            $table->string('username');
            $table->string('email');
            $table->string('password');
            $table->string('password_salt');
            $table->text('permissions')->nullable();
            $table->boolean('activated')->default(0);
            $table->string('activation_code')->nullable();
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->string('persist_code')->nullable();
            $table->string('reset_password_code')->nullable();
            $table->string('role');
            $table->integer('created_by');
            $table->integer('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // We'll need to ensure that MySQL uses the InnoDB engine to
            // support the indexes, other engines aren't affected.
            $table->engine = 'InnoDB';
            $table->unique('email');
            $table->unique('username');
            $table->index('activation_code');
            $table->index('reset_password_code');
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

class AddUsersSeed extends Seeder 
{
    public function run($capsule) {
        $table = $capsule->table('users');
        $table->insert(array('email' => 'admin@myapp.com', 'username' => 'admin', 'role' => 'admin'));
        $table->insert(array('email' => 'gbaker@myapp.com', 'username' => 'gBaker47362', 'role' => 'member'));
        $table->insert(array('email' => 'jbruce@myapp.com', 'username' => 'jbruce', 'role' => 'editor'));
        $table->insert(array('email' => 'eclapton@myapp.com', 'username' => 'eclapton', 'role' => 'member')); 
    }
}
