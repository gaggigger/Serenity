<?php

require_once "app/migration.php";

define('MIGRATIONS_PATH', './migrations');

class InstallController extends Controller {
	
    public function index()
    {
        $this->run();
    }
    public function run($type = null, $capsule = null) {
        error_reporting(E_ALL);
        if (!ini_get('display_errors'))
        {
            ini_set('display_errors', 1);
        }
        $args = isset($type) ? $type : "install";
        switch ($args) 
        {
            case "install":
                $this->installMigrations($capsule);
                 break;
            case "remove":
                $this->removeMigrations($capsule);
                break;
        }
    }
    function installMigrations($capsule)
    {
        $files = glob(MIGRATIONS_PATH.'/*.php');
        
        foreach ($files as $file) {
            require_once($file);

            $class = substr(basename($file, '.php'), 4);
            $migration = new $class;
            $migration->init($capsule);
            if ($migration->up()) 
            {
                echo("Sucessfully installed migration ".$file."<br />");
            }
            if ($migration->seed === true) 
            {
                $seeder = $class."Seed";
                $seedClass = new $seeder;
                $seedClass->run($capsule);
            }
        }
        $this->render('install'); 
    }
    function removeMigrations($capsule)
    {
        $files = glob(MIGRATIONS_PATH.'/*.php');

        foreach ($files as $file) 
        {
            require_once($file);

            $class = substr(basename($file, '.php'), 4);

            $migration = new $class;
            $migration->init($capsule);
            $migration->down();
            if ($migration->down()) 
            {
                echo("Sucessfully removed migration ".$file."<br />");
            }
        }
        $this->app->redirect('/api');
    }
}