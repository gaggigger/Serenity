<?php

use Sernity\BaseMigration;
use Illuminate\Database\Seeder;

class AddConfig extends Serenity\BaseMigration
{
    public function init($capsule)
    {
        parent::init($capsule);
        $this->seed = true;
        $this->tableName = 'config';
    }
    /**
     * Do the migration
     */
    public function up()
    {
        $this->schema->dropIfExists($this->tableName);
        $this->schema->create($this->tableName, function ($table)
        {
            $table->increments('id');
            $table->string('key');
            $table->string('value');
            $table->timestamps();
            $table->softDeletes();

            $table->engine = 'InnoDB';
            $table->unique('id');
            $table->unique('key');
            $table->index('key');
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

class AddConfigSeed extends Seeder 
{
    public function run($capsule) {
        $table = $capsule->table('config');
        $table->insert(array('key'=>'site_name','value'=>'Serenity API Demo'));
        $table->insert(array('key'=>'version','value'=>'0.1'));
        $table->insert(array('key'=>'allow_signup','value'=>'1'));
    }
}
