<?php

//controller sends a receipt in an email to the customer
class Email_controller extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	    	session_start();

	    	//email configuration settings
	    	$config['smtp_host'] = "smtp.gmail.com";
	    	$config['smtp_user'] = "dennis.jiang411z@gmail.com";
	    	$config['smtp_pass'] = "candy923";
	    	$config['smtp_port'] = "465";

    }

	function sendEmail() {
		$final_order = $_SESSION['final_order'];
		$receipt = "Name: $final_order->first $final_order->last \n Email: $final_order->email \n Creditcard Number: $final_order->creditcard_number
		\n Expires: $final_order->creditcard_month / $final_order->creditcard_year \n Date of Order: $final_order->order_date at $final_order->order_time
		\n Total in CAD: $final_order->total";

		$email = $_SESSION['email'];
		$this->load->library('email');

		$this->email->from('admin@candystore.com', 'Admin');
		$this->email->to($email);

		$this->email->subject('Candystore Receipt');
		$this->email->message("Thank you for your purchase. Here is your receipt: \n\n $receipt" . "\n\n");

		$this->email->send();

		redirect('shopping_cart/showAll', 'refresh');
	}

}
