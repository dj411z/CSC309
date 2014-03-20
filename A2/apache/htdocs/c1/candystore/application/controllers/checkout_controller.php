<?php
//controller to handle the checking out process
//key method is the fillForm with form validation for checking correct creditcard info

class Checkout_controller extends CI_Controller {
   
     
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	    	session_start();

    }

    function showAll() {
    	$data['title'] ='checkout';
    	$data['main'] ='checkout/page.php';
    	$data['admin'] = false;
    	$this->load->view('template.php',$data);
   	 }

   	 function newForm() {
   	 	$this->load->model('customer_model');
   	 	$customer = $this->customer_model->get($_SESSION['customerId']);
   	 	$data['customer'] = $customer;
   	 	$data['title'] ='checkout';
    	$data['main'] ='checkout/form.php';
    	$data['admin'] = false;
    	$this->load->view('template.php', $data);
    }
    
	function fillForm() {
		$this->load->library('form_validation');
		$this->form_validation->set_rules('first','FirstName','required');
		$this->form_validation->set_rules('last','LastName','required');
		$this->form_validation->set_rules('email','Email','required');
		$this->form_validation->set_rules('creditcard_number','Creditcard Number','required');
		$this->form_validation->set_rules('creditcard_month','Creditcard Expiry Month','required');
		$this->form_validation->set_rules('creditcard_year','Creditcard Expiry Year','required');
	
		if ($this->form_validation->run() == false) {
			$this->load->model('order_model');
			$this->load->model('order_item_model');
			//Create order object and populate fields
			$order = new Order();
			$order->customer_id = $_SESSION['customerId'];
			$order->order_date = date('m-d-Y');
			$order->order_time = date('H:i');
			$order->total = $_SESSION['total'];
			$order->creditcard_number = $this->input->get_post('creditcard_number');
			$order->creditcard_month = $this->input->get_post('creditcard_month');
			$order->creditcard_year = $this->input->get_post('creditcard_year');
			//Insert into db table
			$this->order_model->insert($order);

			$i = $_SESSION['items'];

			foreach ($i as $item) {
				$order_item = new Order_item();
				$order_item->order_id = ($order->id);
				$order_item->product_id = $item[0]->id;
				$order_item->quantity = $item[1];
				$pass = $this->order_item_model->insert($order_item);
			}

			//make final_order object here

			$this->load->model('final_order');

			$final_order = new Final_order();
			$final_order->order_id = $order->id;

			$final_order->customer_id = $_SESSION['customerId'];
			$final_order->first= $this->input->get_post('firstName');
			$final_order->last = $this->input->get_post('lastName');
			$final_order->email= $this->input->get_post('email');
			$final_order->creditcard_number = $this->input->get_post('creditcard_number');
			$final_order->creditcard_month = $this->input->get_post('creditcard_month');
			$final_order->creditcard_year = $this->input->get_post('creditcard_year');

			$final_order->order_date = date('m-d-Y');
			$final_order->order_time = date('H:i');
			$final_order->total = $_SESSION['total'];

			$data['final_order'] = $final_order;
			$_SESSION['final_order'] = $final_order;
			$data['order_items'] = $i;
			$_SESSION['email'] = $final_order->email;

			//Clear shopping cart 
			$_SESSION['items'] = array();
			setcookie('items');
			
			//Then we redirect to the index page again
			//redirect('main/showAll', 'refresh');
			//redirect('checkout_controller/displayReceipt', 'refresh');
			$data['title'] ='receipt';
	    	$data['main'] ='checkout/receipt.php';
	    	$data['admin'] = false;
	    	$this->load->view('template.php', $data);
		}
		else {
				echo "Checkout didn't work";
				redirect('checkout_controller/newForm', 'refresh');
			}
	}

}
?>
