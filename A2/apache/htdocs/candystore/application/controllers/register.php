<?php

class Register extends CI_Controller {

	function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	}

	function index(){

		$this->load->view('regForm.php');
	}

	function create(){

		$this->load->library('form_validation');

		$this->form_validation->set_rules('email', 'Email', 'required|callback_email_check');

		$this->form_validation->set_rules('firstName', 'First Name', 'required');

		$this->form_validation->set_rules('lastName', 'Last Name', 'required');

		$this->form_validation->set_rules('login', 'Login ID', 'required');

		$this->form_validation->set_rules('password', 'Password', 'required|minlength[6]');

		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'required|matches[password]');

		if($this->form_validation->run() == FALSE){
			$this->load->view('user/regForm.php');
		}
		else{
			$this->load->view('product/list_candy.php');
		}
	}

	public function email_check ($email) {

		if (preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/",$email) == 0){

			$this->form_validation->set_message("email_check", "Invalid Email Address Format");
			return false;
		}
		return true;
	}
}
