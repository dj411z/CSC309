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
	    	if(!isset($_SESSION['items'])){
	    		$items = array();
	    		$_SESSION['items'] = $items;
	    	}
	    	   	
    }

    function showAll() {
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
		$i = $_SESSION['items'];
		$i[$id] = $product;
		$_SESSION['items'] = $i;
		redirect('shopping_cart/showAll', 'refresh');
	}
	 	
	function delete($id) {
		$this->load->model('shopping_cart_model');
		$i = $_SESSION['items'];
		unset($i[$id]);
		$_SESSION['items'] = $i;
		
		//Then we redirect to the index page again
		redirect('shopping_cart/showAll', 'refresh');
	}
      
}

