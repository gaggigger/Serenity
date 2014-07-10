<?php

class ApiController extends Controller {
	
    public function index($order = null)
    {
        $config = Config::findOrFail(1);
        if (is_null($config)) {
            $this->app->redirect('/install');
        } else {
           $this->render('api'); 
        }
    }
}