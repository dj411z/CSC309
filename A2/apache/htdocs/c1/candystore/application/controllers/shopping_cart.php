<?php

class Shopping_cart extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	    	
	    	
	    	$config['upload_path'] = './images/product/';
	    	$config['allowed_types'] = 'gif|jpg|png';
/*	    	$config['max_size'] = '100';
	    	$config['max_width'] = '1024';
	    	$config['max_height'] = '768';
*/
	    		    	
	    	$this->load->library('upload', $config);
	    	$this->load->library('session');

	    	$items = array();
	 
	    	$this->session->set_userdata('items', $items);
	 
	    	
	    	
    }

    function showAll() {
    	// $this->load->model('shopping_cart_model');
    	// $cart_items = $this->shopping_cart_model->getItems();
    	$i = $this->session->userdata('items');
    	$data['cart_items'] = $i;
    	$data['title'] ='cart items';
    	$data['main'] ='cart/list.php';
    	$data['admin'] = false;
    	$this->load->view('template.php',$data);
    }
    
	function read($id) {
		$this->load->model('product_model');
		$product = $this->product_model->get($id);
		$data['product']=$product;
		$this->load->view('product/read.php',$data);
	}

	function addToCart($id){
		$this->load->model('product_model');
		$product = $this->product_model->get($id);
		$i = $this->session->userdata('items');
		array_push($i, $product);
		$this->session->set_userdata('items', $i);
		$f = $this->session->userdata('items');
		redirect('main/showAll', 'refresh');

	}
	 	
	function delete($id) {
		$this->load->model('shopping_cart_model');
		
		if (isset($id)) 
			$this->shopping_cart_model->delete($id);
		
		//Then we redirect to the index page again
		redirect('shopping_cart/showAll', 'refresh');
	}
      
}

