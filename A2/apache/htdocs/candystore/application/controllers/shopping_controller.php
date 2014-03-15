<?php

class Shopping_controller extends CI_Controller {
   
     $cart;

    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	    	
	    	session_start();
    }

    function initCart(){
        $this->load->model('shopping_cart_model');
        $cart = new Shopping_cart();
        //assume that the array of products is initialized

        //maybe give this cart a unique id?

    }
    
	//takes in product id, adds it to shopping cart
	function addToCart($productid) {

        $this->load->model('shopping_cart_model');
        $this->load->model('product_model');

        $candy = $this->product_model->get($id);

        //call insertItems in shopping_cart_model

        //load next view
	}
    
	
	
}

