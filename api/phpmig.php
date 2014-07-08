<?php
define('ENVIRONMENT', isset($_SERVER['APP_ENV']) ? $_SERVER['APP_ENV'] : 'production');

# phpmig.php

$config = array();
require_once "config.php";

use \Phpmig\Adapter,
    \Pimple;

$container = new Pimple();

$container['config'] = $db[ENVIRONMENT];

$container['schema'] = $container->share(function($c) {
    /* Bootstrap Eloquent */
    $capsule = new Capsule;
    $capsule->addConnection($c['config']);
    $capsule->setAsGlobal();
    /* Bootstrap end */

    return Capsule::schema();
});

$container['db'] = $container->share(function($c) {
    $dbh = new PDO('mysql:dbname='. $c['config']['database'] .';host=' . $c['config']['host'], $c['config']['username'], $c['config']['password']);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
});

$container['phpmig.adapter'] = $container->share(function() use ($container) {
    return new Adapter\PDO\Sql($container['db'], 'migrations');
});

$container['phpmig.migrations_path'] = __DIR__ . DIRECTORY_SEPARATOR . 'migrations';

return $container;