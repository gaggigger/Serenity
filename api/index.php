<?php
define('ENVIRONMENT', isset($_SERVER['APP_ENV']) ? $_SERVER['APP_ENV'] : 'production');

require_once "vendor/autoload.php";

require_once "config.php";
require_once "app/application.php";
require_once "app/migration.php";

// Controllers
require_once "app/controller.php";
require_once "app/controllers/login.controller.php";
require_once "app/controllers/api.controller.php";
require_once "app/controllers/admin.controller.php";
require_once "app/controllers/install.controller.php";

// Models
require_once "app/models/BaseModel.php";
require_once "app/models/Users.php";
require_once "app/models/Config.php";
//require_once "app/models/Idea.php";

define('EXT', '.twig');

use Slim\Slim;
use Slim\Views\Twig as TwigView;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

$app = new Slim(array(
	'view' => new TwigView,
));

// Asset Management
$app->view()->parserExtensions = array(
    new \Slim\Views\TwigExtension(),
);

/* Content Type Middleware */
$app->add(new \Slim\Middleware\ContentTypes());

$capsule = new Capsule;

$capsule->addConnection($db[ENVIRONMENT]);

$capsule->setEventDispatcher(new Dispatcher(new Container));

// If you want to use the Eloquent ORM...
$capsule->bootEloquent();

/* DB methods accessible via Slim instance */
$capsule->setAsGlobal();

$app->capule = $capsule;
/* Sentry Auth */
class_alias('Illuminate\Database\Capsule\Manager', 'Capsule');
class_alias('Cartalyst\Sentry\Facades\Native\Sentry', 'Sentry');

$app->container->singleton(
    'auth',
    function () {
        $hasher = new Cartalyst\Sentry\Hashing\NativeHasher;
        $userProvider = new Cartalyst\Sentry\Users\Eloquent\Provider($hasher);
        $groupProvider = new Cartalyst\Sentry\Groups\Eloquent\Provider;
        $throttleProvider = new Cartalyst\Sentry\Throttling\Eloquent\Provider($userProvider);
        $session = new Cartalyst\Sentry\Sessions\NativeSession;
        $cookie = new Cartalyst\Sentry\Cookies\NativeCookie;

        /* @var Cartalyst\Sentry\Facades\Native\Sentry $sentry */
        $sentry = new Sentry(
            $userProvider,
            $groupProvider,
            $throttleProvider,
            $session,
            $cookie
        );

        return $sentry::instance();
    }
);

$c = new Application($app);

// Include Routes
require_once "app/routes.php";

$app->run();