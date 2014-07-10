<?php

namespace Serenity;

use Illuminate\Database\Migrations\Migration;

class BaseMigration extends Migration
{
    public $seed;
    
    protected $tableName;

    /* @var \Illuminate\Database\Schema\Builder $schema */
    protected $schema;

    public function init($capsule)
    {
        $this->schema = $capsule::schema();
    }
    
}