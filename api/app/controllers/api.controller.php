<?php

class ApiController extends Controller {
	
    public function index($order = null)
    {
        
        
        $this->render('api');
    }
}