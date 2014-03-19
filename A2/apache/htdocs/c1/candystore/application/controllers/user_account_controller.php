<?php

class User_account_controller extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	
    }
    //edit first and last names, login, email, and password

    function showAll() {
    	$this->load->model('customer_model');
    	$customer = $this->customer_model->get($customerID);

    	$data['title'] ='account info';
    	$data['main'] ='account/list.php';
    	$data['admin'] = true;
    	$this->load->view('template.php',$data);
    }
	
	function editForm($id) {
		$this->load->model('customer_model');
		$customer = $this->customer_model->get($id);
		$data['customer']=$customer;
		$this->load->view('account/editAccount.php',$data);
	}
	
	function update($id) {

		$this->load->library('form_validation');
		$this->form_validation->set_rules('email', 'Email', 'required|callback_email_check|is_unique[customer.email]');
		$this->form_validation->set_rules('firstName', 'First Name', 'required');
		$this->form_validation->set_rules('lastName', 'Last Name', 'required');
		$this->form_validation->set_rules('login', 'Login', 'required|is_unique[customer.login]');
		$this->form_validation->set_rules('password', 'Password', 'required|minlength[6]');
		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'required|matches[password]');

		
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
			// $this->load->view('customer/editForm.php', $data);
		}
	}
}
