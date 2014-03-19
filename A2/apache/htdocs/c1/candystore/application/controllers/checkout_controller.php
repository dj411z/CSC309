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
    
	function fillForm($id) {
		$this->load->library('form_validation');
		$this->form_validation->set_rules('first','FirstName','required');
		$this->form_validation->set_rules('last','LastName','required');
		$this->form_validation->set_rules('email','Email','required');
		$this->form_validation->set_rules('creditcard_number','Creditcard Number','required|min_length[16]|max_length[16]');
		$this->form_validation->set_rules('creditcard_month','Creditcard Expiry Month','required');
		$this->form_validation->set_rules('creditcard_year','Creditcard Expiry Year','required');
		
		if ($this->form_validation->run() == true) {
			$customer = new Customer();
			$customer->first = $this->input->get_post('firstName');
			$customer->last = $this->input->get_post('lastName');
			$customer->login = $this->input->get_post('login');
			$customer->password = $this->input->get_post('password');
			$customer->email = $this->input->get_post('email');
			
			$this->load->model('customer_model');
			$this->customer_model->update($customer);
			//Then we redirect to the index page again
			redirect('user_account_controller/showAll', 'refresh');
		}
		else {
			$customer = new Customer();
			$customer->id = $id;
			$customer->first = set_value('first');
			$customer->last = set_value('last');
			$customer->email = set_value('email');
			$customer->login = set_value('login');
			$customer->password = set_value('password');

			$data['customer']=$customer;
			$data['main'] = 'account/editAccount.php';
			$this->load->view('template.php', $data);
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