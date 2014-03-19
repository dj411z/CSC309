<?php

class Checkout_controller extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();

    }

    function showAll() {
    	$data['title'] ='checkout';
    	$data['main'] ='checkout/form.php';
    	$data['admin'] = false;
    	$this->load->view('template.php',$data);
    }
    
	function fillForm() {
		$this->load->library('form_validation');
		$this->form_validation->set_rules('first','FirstName','required');
		$this->form_validation->set_rules('last','LastName','required');
		$this->form_validation->set_rules('email','Email','required');
		$this->form_validation->set_rules('creditcard_number','Creditcard Number','required|min_length[16]|max_length[16]');
		$this->form_validation->set_rules('creditcard_month','Creditcard Expiry Month','required');
		$this->form_validation->set_rules('creditcard_year','Creditcard Expiry Year','required');
		
		if ($this->form_validation->run() == true) {
			$order = new Order();
			//$order->customer_id = 
			$order->order_date = date('m-d-Y');
			$order->order_time = date('H:i');
			//$order->total = 
			$order->creditcard_number = $this->input->get_post('creditcard_number');
			$order->creditcard_month = $this->input->get_post('creditcard_month');
			$order->creditcard_year = $this->input->get_post('creditcard_year');

			$this->load->model('order_model');
			$this->order_model->update($order);
			//Then we redirect to the index page again
			redirect('checkout_controller/showAll', 'refresh');
		}
		else {
			echo "Checkout didn't work";
			redirect('checkout_controller/showAll', 'refresh');
	}

		//found online
		public function date_check($month, $year) {
			/* Get timestamp of midnight on day after expiration month. */
			$exp_ts = mktime(0, 0, 0, $month + 1, 1, $year);

			$cur_ts = time();
			/* Don't validate for dates more than 10 years in future. */
			$max_ts = $cur_ts + (10 * 365 * 24 * 60 * 60);

			if ($exp_ts > $cur_ts && $exp_ts < $max_ts) {
				return true;
			} 
			else {
				return false;
		}

	function checkout() {
		//display finalized order information, print receipt, send email
	}
      
}


?>