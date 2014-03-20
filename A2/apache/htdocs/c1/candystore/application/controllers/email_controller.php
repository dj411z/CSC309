<?php

class Email_controller extends CI_Controller {
   
     
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
    	$data['main'] ='email_send/email.php';
    	$data['admin'] = false;
    	$this->load->view('template.php',$data);

    }
    
	function sendEmail() {
		$this->load->library('email');

		$this->email->from('dennis.jiang411z@gmail.com', 'Dennis Jiang');
		$this->email->to("dj411z@yahoo.com");

		$this->email->subject('Candystore Receipt');
		$this->email->message('Here is your receipt');

		//cannot attach receipt file because not a file / hard to do

		$this->email->send();

		echo $this->email->print_debugger();
		//redirect('email_controller/showAll', 'refresh');
		//also needs to empty the shopping cart after checking out
		redirect('shopping_controller/showAll', 'refresh');
	}

      
}
