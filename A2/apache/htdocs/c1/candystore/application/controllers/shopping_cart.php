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

	    	session_start();
	    	// header("Cache-Control: no-cache, must-revalidate");
	    	$items = array();
	    	$test = 0;
	    	$_SESSION["items"] = $items;
	    	$_SESSION['test'] = $test;
	    	
	    	
    }

    function showAll() {
    	// $this->load->model('shopping_cart_model');
    	// $cart_items = $this->shopping_cart_model->getItems();
    	echo $_SESSION['test'];
    	$data['cart_items'] = $_SESSION['items'];
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
		array_push($_SESSION['items'], $product);
		$_SESSION['test'] += 1;
		echo sizeof($_SESSION['items']);
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

