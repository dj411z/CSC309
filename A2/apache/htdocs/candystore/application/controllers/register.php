<?php

class Register extends CI_Controller {

	function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	}

	function index(){
		$this->load->view('register/regForm.php');
	}

	function register(){

		$this->load->library('form_validation');

		$this->form_validation->set_rules('email', 'Email', 'required|callback_email_check');


		// $this->form_validation->set_rules('creditcardNum', 'Credit Card Number', 'required');

		// $this->form_validation->set_rules('creditcardEx', 'Credit Card Expiry Date', 'required');

		$this->form_validation->set_rules('password', 'Password', 'required|minlength[6]');

		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'required|matches[password]');

		if($this->form_validation->run() == FALSE){
			$this->load->view('register/regForm.php');
		}
		else{
			$this->load->view('product/list.php');
		}
	}

	public function email_check ($email) {

		if (preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/",$email) == 0){

			$this->form_validation->set_message("email_check", "Invalid Email Address Format");
			return false;
		}
		return true;
	}
 ?>