<?php

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Seeder;

class AddUsers
{
    public $seed = true;
    
    protected $tableName;

    /* @var \Illuminate\Database\Schema\Builder $schema */
    protected $schema;

    public function init($capsule)
    {
        $this->schema = $capsule::schema();
        $this->tableName = 'users';
        //$this->schema = $this->get('schema');
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
        
    }

    /**
     * Undo the migration
     */
    public function down()
    {
        $this->schema->drop($this->tableName);
    }
}

class AddUsersSeed extends Illuminate\Database\Seeder 
{
    public function run() {
        DB::table($this->tableName)->insert(array('name' => 'Admin User', 'email' => 'admin@myapp.com', 'emailPublic' => false, 'userId' => 'admin', 'role' => 'admin', 'dateJoined' => date('Y-m-d'), 'group' => 'Administrators'));
        DB::table($this->tableName)->insert(array('name' => 'Ginger Baker', 'email' => 'gbaker@myapp.com', 'emailPublic' => true, 'userId' => 'gBaker47362', 'role' => 'member', 'dateJoined' => date('Y-m-d'), 'group' => 'Cream Band'));
        DB::table($this->tableName)->insert(array('name' => 'Jack Bruce', 'email' => 'jbruce@myapp.com', 'emailPublic' => true, 'userId' => 'jbruce', 'role' => 'editor', 'dateJoined' => date('Y-m-d'), 'group' => 'Cream Band'));
        DB::table($this->tableName)->insert(array('name' => 'Eric Clapton', 'email' => 'eclapton@myapp.com', 'emailPublic' => true, 'userId' => 'eclapton', 'role' => 'member', 'dateJoined' => date('Y-m-d'), 'group' => 'Cream Band')); 
    }
}
