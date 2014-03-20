<?php

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
		$this->form_validation->set_rules('creditcard_number','Creditcard Number','required|min_length[16]|max_length[16]');
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
				$order_item->order_id = $order->id;
				$order_item->product_id = $item[0]->id;
				$order_item->quantity = $item[1];
				$this->order_item_model->insert($order_item);
			}
			//Clear shopping cart 
			$_SESSION = array();
			setcookie('items');
			
			//Then we redirect to the index page again
			//redirect('main/showAll', 'refresh');
			redirect('checkout_controller/displayReceipt', 'refresh');
		}
		else {
				echo "Checkout didn't work";
				redirect('checkout_controller/newForm', 'refresh');
			}
	}

		// //found online
		// public function date_check($month, $year) {
		// 	/* Get timestamp of midnight on day after expiration month. */
		// 	$exp_ts = mktime(0, 0, 0, $month + 1, 1, $year);

		// 	$cur_ts = time();
		// 	 Don't validate for dates more than 10 years in future. 
		// 	$max_ts = $cur_ts + (10 * 365 * 24 * 60 * 60);

		// 	if ($exp_ts > $cur_ts && $exp_ts < $max_ts) {
		// 		return true;
		// 	} 
		// 	else {
		// 		return false;
		// 	}
		// }

	function displayReceipt() {
		//display finalized order information with a button to display printable receipt, and button to send email
		$data['title'] ='receipt';
    	$data['main'] ='checkout/receipt.php';
    	$data['admin'] = false;
    	$this->load->view('template.php', $data);
	}

	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script>
	function openPrintable(){
		top.wRef=window.open('', 'myconsole', 'width=500, height=450, left=10, top=10, 
			menubar=1, toolbar=0, status=1, scrollbars=1, resizable=1')
		top.wRef.document.writeIn(
			//write receipt
			'<html><head><title>Candystore Receipt</title></head>
			<body><center><font color=red><b><i>Press Ctrl+P to print</i></b></font>
			<?php 
				echo "<table>";
				echo "<tr><th>First</th><th>Last</th><th>Email</th><th>Creditcard Number</th><th>Expiry Month</th>
					<th>Expiry Year</th><th>Order Date</th><th>Order Time</th><th>Total</th><th>Items</th></tr>";

	
					echo "<tr>";
					echo "<td>" . anchor("admin_customers/read/$final_order->customer_id",'View') . "</td>";
					echo "<td>" . $final_order->first . "</td>";
					echo "<td>" . $final_order->last . "</td>";
					echo "<td>" . $final_order->email . "</td>";

					echo "<td>" . $final_order->creditcard_number . "</td>";
					echo "<td>" . $final_order->creditcard_month . "</td>";
					echo "<td>" . $final_order->creditcard_year . "</td>";
					echo "<td>" . $final_order->order_date . "</td>";
					echo "<td>" . $final_order->order_time . "</td>";
					echo "<td>" . $final_order->total . "</td>";

					//link to display order items
					echo "<td>" . anchor("admin_orders/showAll",'Items') . "</td>";

					echo "</tr>";

					echo "<table>";

			?>
			</center></body></html>'
		);
		top.wRef.document.close();
	}
     </script>
}


?>
