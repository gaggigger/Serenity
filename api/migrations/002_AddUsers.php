<?php

use Sernity\Migration;
use Illuminate\Database\Seeder;

class AddUsers extends Migration
{
    public function init($capsule)
    {
        parent::init();
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
        $table = $capsule->table($this->tableName);
        $table->insert(array('name' => 'Admin User', 'email' => 'admin@myapp.com', 'emailPublic' => false, 'userId' => 'admin', 'role' => 'admin', 'dateJoined' => date('Y-m-d'), 'group' => 'Administrators'));
        $table->insert(array('name' => 'Ginger Baker', 'email' => 'gbaker@myapp.com', 'emailPublic' => true, 'userId' => 'gBaker47362', 'role' => 'member', 'dateJoined' => date('Y-m-d'), 'group' => 'Cream Band'));
        $table->insert(array('name' => 'Jack Bruce', 'email' => 'jbruce@myapp.com', 'emailPublic' => true, 'userId' => 'jbruce', 'role' => 'editor', 'dateJoined' => date('Y-m-d'), 'group' => 'Cream Band'));
        $table->insert(array('name' => 'Eric Clapton', 'email' => 'eclapton@myapp.com', 'emailPublic' => true, 'userId' => 'eclapton', 'role' => 'member', 'dateJoined' => date('Y-m-d'), 'group' => 'Cream Band')); 
    }
}
