<?php
$app->container->singleton('LoginController', function () {
    return new LoginController();
});
$app->container->singleton('AdminController', function () {
    return new AdminController();
});
$app->container->singleton('ApiController', function () {
    return new ApiController();
});

// routes
$app->get('/', function () use ($app) {
    $app->ApiController->index();
})->name('home');

$app->map('/login', function () use ($app) {
    $app->LoginController->index();
})
->via('GET', 'POST')
->name('login');

$app->get('/logout', function () use ($app) {
    $app->LoginController->logout();
})->name('logout');

$app->get('/users', function () use ($app) {
    $app->AdminController->allUsers();
})->name('users');

$app->map('/register', function () use ($app) {
    $app->LoginController->signUp();
})
->via('GET', 'POST')
->name('signup');

$app->map('/forgot', function () use ($app) {
    $app->LoginController->forgot();
})
->via('GET', 'POST')
->name('forgot_password');

$app->group('/account', function () use($app) {
    $app->map('/', function () use ($app) {
        //$app->LoginController->profile();
    })
    ->via('GET', 'POST')
    ->name('profile');

    $app->map('/settings', function () use ($app) {
        //$app->AdminController->settings();
    })
    ->via('GET', 'POST')
    ->name('settings');
});