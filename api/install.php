<?php
define('ENVIRONMENT', isset($_SERVER['APP_ENV']) ? $_SERVER['APP_ENV'] : 'production');

require_once "vendor/autoload.php";
require_once "config.php"; 

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

define("MIGRATIONS_PATH", __DIR__."/migrations");

/**
 * Script for creating, destroying, and seeding the app's database
 */
class Install {

    function run($db)
    {
        $capsule = new Capsule;
        $capsule->addConnection($db[ENVIRONMENT]);
        $capsule->setEventDispatcher(new Dispatcher(new Container));
        // If you want to use the Eloquent ORM...
        $capsule->bootEloquent();
        /* DB methods accessible via Slim instance */
        $capsule->setAsGlobal();

        error_reporting(E_ALL);
        if (!ini_get('display_errors'))
        {
            ini_set('display_errors', 1);
        }
        $args = isset($_GET['type']) ? filter_input($_GET['type']) : "install";
        switch ($args) 
        {
            case "install":
                $this->installMigrations($capsule);
                 break;
            case "remove":
                $this->removeMigrations($capsule);
                break;
            case "help":
            case "--help":
                $this->help();
                break;
        }
    }

    function installMigrations($capsule)
    {
        echo("Installing migrations<br />");
        $files = glob(MIGRATIONS_PATH.'/*.php');
        
        foreach ($files as $file) {
            require_once($file);

            $class = substr(basename($file, '.php'), 4);
            echo("class = ".$class);
            $migration = new $class;
            $migration->init($capsule);
            if ($migration->up()) {
                echo("Sucessfully installed ".$file."<br />");
            }
        }
    }
    function removeMigrations()
    {
        $files = glob(MIGRATIONS_PATH.'/*.php');

        foreach ($files as $file) {
            require_once($file);

            $class = basename($file, '.php');

            $migration = new $class;
            $migration->down();
        }
    }
}
echo("making install object<br />");
$install = new Install();

$install->run($db);