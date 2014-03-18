<?php

class Admin_customers extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
    }

    // function index() {
    // 		$this->load->model('product_model');
    // 		$products = $this->product_model->getAll();
    // 		$data['products']=$products;
    // 		$this->load->view('template.php',$data);
    // }

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
      
}

