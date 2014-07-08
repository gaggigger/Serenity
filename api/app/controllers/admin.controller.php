<?php

class AdminController extends Controller {
	
	public function index($order = null)
	{
            $this->allUsers($order);
	}

	public function allUsers($order = null)
	{
            $data['users'] = Users::get($order);
            $this->response($data);
	}
}