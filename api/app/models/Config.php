<?php

class Config extends BaseModel
{
    protected $table = 'config';
    protected $softDelete = false;
    
    public static function configInstalled($capsule) {
        return  $capsule::schema()->hasTable('config');
    }
}