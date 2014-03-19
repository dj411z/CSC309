<?php

class Email extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();

	    	//email configuration settings
	    	$config['smtp_host'] = "smtp.gmail.com";
	    	$config['smtp_user'] = "dennis.jiang411z@gmail.com";
	    	$config['smtp_pass'] = "candy923";
	    	$config['smtp_port'] = "465";

    }

    function showAll() {
    	$data['title'] ='email';
    	$data['main'] ='email/email.php';
    	$data['admin'] = false;
    	$this->load->view('template.php',$data);
    }
    
	function sendEmail($email) {
		$this->load->model('email_model');

		$this->email_model->sendEmail($email);

		redirect('email/showAll', 'refresh');
	}

      
}