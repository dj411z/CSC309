<?php

class Admin_customers extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
    }

    function showAll() {
    	$this->load->model('customer_model');
    	$customers = $this->customer_model->getAll();
    	$data['customers'] = $customers;
    	$data['title'] ='customers';
    	$data['main'] ='customer/list.php';
    	$data['admin'] = true;
    	$this->load->view('template.php',$data);
    }
    
	function read($id) {
		$this->load->model('customer_model');
		$customer = $this->customer_model->get($id);
		$data['customer']=$customer;
		$this->load->view('customer/read.php',$data);
	}
	
	function delete($id) {
		$this->load->model('customer_model');
		
		if (isset($id)) 
			$this->customer_model->delete($id);
		
		//Then we redirect to the index page again
		redirect('admin_customers/showAll', 'refresh');
	}

    function deleteAll() {
        $this->load->model('customer_model');
        $customers = $this->customer_model->getAll();

        $customerIDarray = array();
        
        foreach ($customers as $customer) {
            array_push($customerIDarray, $customer->id);
        }

        foreach ($customerIDarray as $customerID) {
             $this->customer_model->delete($customerID);
        }

        redirect('admin_customers/showAll', 'refresh');
    }
      
}

