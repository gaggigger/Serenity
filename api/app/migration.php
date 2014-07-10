<?php

namespace Serenity;

use Illuminate\Database\Migrations\Migration;

class Migration extends Migration
{
    public $seed;
    
    protected $tableName;

    /* @var \Illuminate\Database\Schema\Builder $schema */
    protected $schema;

    public function init()
    {
        $this->schema = $capsule::schema();
    }
    
}