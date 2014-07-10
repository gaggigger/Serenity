<?php

require_once "app/migration.php";

class InstallController extends Controller {
	
    public function index()
    {
        $this->run();
    }
    public function run($type = null) {
        error_reporting(E_ALL);
        if (!ini_get('display_errors'))
        {
            ini_set('display_errors', 1);
        }
        $args = isset($type) ? filter_input($type) : "install";
        switch ($args) 
        {
            case "install":
                $this->installMigrations();
                 break;
            case "remove":
                $this->removeMigrations();
                break;
        }
    }
    function installMigrations()
    {
        $files = glob(MIGRATIONS_PATH.'/*.php');
        
        foreach ($files as $file) {
            require_once($file);

            $class = substr(basename($file, '.php'), 4);
            $migration = new $class;
            $migration->init();
            if ($migration->up()) 
            {
                echo("Sucessfully installed migration ".$file."<br />");
            }
            if ($migration->seed === true) 
            {
                $seeder = $class."Seed";
                $seedClass = new $seeder;
                $seedClass->run();
            }
        }
    }
    function removeMigrations()
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
    }
}