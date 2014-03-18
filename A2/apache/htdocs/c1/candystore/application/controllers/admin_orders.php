<?php

class Admin_orders extends CI_Controller {
   
     
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
    	$this->load->model('final_order_model');
    	$orders = $this->final_order_model->get();
    	$data['orders'] = $orders;
    	$data['title'] ='orders';
    	$data['main'] ='order/list.php';
    	$data['admin'] = true;
    	// $this->load->view('template.php',$data);
    }
    
	function read() {
		$this->load->model('final_order_model');
		$orders = $this->final_order_model->getAll();
		$data['order']=$order;
		$this->load->view('order/read.php',$data);
	}

    function read_item_details($id) {
        $this->load->model('final_order_model');
        $order_items = $this->final_order_model->get_order_items($id);
        $data['order_items'] = $order_items;
        $this->load->view('order/read.php',$data);
    }
	
	function delete($id) {
		$this->load->model('order_model');
		
		if (isset($id)) 
			$this->order_model->delete($id);
		
		//Then we redirect to the index page again
		redirect('admin_orders/showAll', 'refresh');
	}
      
}

