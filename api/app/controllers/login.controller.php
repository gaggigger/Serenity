<?php

use Cartalyst\Sentry\Throttling\UserBannedException;
use Cartalyst\Sentry\Throttling\UserSuspendedException;
use Cartalyst\Sentry\Users\UserExistsException;
use Cartalyst\Sentry\Users\UserNotActivatedException;
use Cartalyst\Sentry\Users\UserNotFoundException;

class LoginController extends Controller {

	public function index()
	{
            if ($this->app->request()->isPost()) 
            {
                $v = $this->validator($this->post());
                $v->rule('required', array('email', 'password'));
                $v->rule('length', 'email', 4, 22);
                $v->rule('length', 'password', 3, 11);
                if ($v->validate()) 
                {
                    try 
                    {
                        $credentials = array(
                            'email' => $this->post('email'),
                            'password' => $this->post('password'),
                        );
                        $remember = $this->post('remember');
                        $user = Sentry::authenticate($credentials, $remember);

                        if ($user) {
                            $this->responseArr = $this->responseArr + array('name'=>$user.name, 'role'=>$user.role);
                        }
                    }
                    catch (UserNotFoundException $e) {
                        $this->responseArr['message'] = 'Email and Password provided did not match any records.';
                    } 
                    catch (UserNotActivatedException $e) {
                        $this->responseArr['message'] = 'User is not activated.';
                    }
                    catch (UserSuspendedException $e) {
                        $this->responseArr['message'] = 'User is currently suspended.';
                    }
                    catch (UserBannedException $e) {
                        $this->responseArr['message'] = 'User is currently banned.';
                    }
                    if ($this->responseArr['message'] !== 'OK') {
                        $this->responseArr['status'] = 500;
                    }
                    $this->response($this->responseArr);
                } // if ($v->validate()) 
            } else {
                $this->response($this->responseArr);
            }
	}
	public function register()
	{
            if ($this->app->request()->isPost()) 
            {
                $v = $this->validator($this->post());
                $v->rule('required', array('email', 'password'));
                $v->rule('email', 'email');
                $v->rule('length', 'password', 3, 11);
                if ($v->validate()) {
                    try 
                    {
                        $credentials = array(
                            'email' => $this->post('email'),
                            'password' => $this->post('password'),
                        );

                        $user = Sentry::register($credentials, true);

                        if ($user) {
                            /* Login right after signup */
                            Sentry::authenticate($credentials);

                            $this->responseArr['message'] = 'Your registration was successful.';
                        } else {
                            $this->responseArr['message'] = 'User information was not updated successfully.';
                            $this->responseArr['status'] = 500;
                        }
                    } catch (UserExistsException $e) {
                        $this->responseArr['message'] = 'User with this login already exists.';
                        $this->responseArr['status'] = 500;
                    } catch (UserNotFoundException $e) {
                        $this->responseArr['message'] = 'User was not found.';
                        $this->responseArr['status'] = 500;
                    }
                }
                $this->responseArr['errors'] = $this->errorOutput($v->errors());
                $this->response($this->responseArr);
            }
	}

	public function logout()
	{
		//$this->app->flash('info', 'Come back sometime soon');
		$this->auth->logout(true);
		//$this->redirect('login');
                $this->responseArr = $this->responseArr + array('name'=>'', 'role'=>'');
                $this->response($this->responseArr);
	}

	public function forgotPassword()
	{
		if (!Sentry::check()) {
		//	$this->redirect('/', false);
		//}
		//$this->render('login/forgot');
                   $this->response($this->responseArr); 
                }
	}
}