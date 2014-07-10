<?php

class ApiController extends Controller {
	
    public function index($capsule)
    {
        if (!Config::configInstalled($capsule)) {
            $this->app->redirect('/api/install');
        } else {
           $this->render('api'); 
        }
    }
}