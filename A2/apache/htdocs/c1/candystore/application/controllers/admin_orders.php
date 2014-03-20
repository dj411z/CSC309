<?php

class Admin_orders extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
            session_start();
    }

    function showAll() {
    	$this->load->model('final_order_model');
    	$orders = $this->final_order_model->getAll();
        
    	$data['orders'] = $orders;
    	$data['title'] ='orders';
    	$data['main'] ='order/list.php';
    	$data['admin'] = true;
    	$this->load->view('template.php',$data);
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
        echo sizeof($order_items);
        $data['order_items'] = $order_items;
        $this->load->view('order/read.php',$data);
    }
	
	function delete() {
		$this->load->model('order_model');
		$orders = $this->order_model->getAll();

        $orderIDarray = array();
        
        foreach ($orders as $order) {
            array_push($orderIDarray, $order->id);
        }

        echo sizeof($orderIDarray);
        foreach ($orderIDarray as $orderID) {
             $this->order_model->delete($orderID);
        }
		
		//Then we redirect to the index page again
		redirect('admin_orders/showAll', 'refresh');
	}
      
}

