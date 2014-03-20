<?php

class Main extends CI_Controller {
   
    function __construct() {
    		// Call the Controller constructor
	    	parent::__construct();
	    	session_start();

    }

    function showAll() {
    		$this->load->model('product_model');
    		$products = $this->product_model->getAll();
    		$data['products']=$products;
    		$data['title'] ='List of Candy';
    		$data['main'] ='list_candy.php';
    		$data['admin'] = false;
    		$this->load->view('template.php',$data);
    }

    function index() {
    	$this->load->view("homepage.php");
    }

    function register() {
    	$this->load->view('regForm.php');
    }

    function create() {
    	$this->load->library('form_validation');

		$this->form_validation->set_rules('email', 'Email', 'required|callback_email_check|is_unique[customer.email]');
		$this->form_validation->set_rules('firstName', 'First Name', 'required');
		$this->form_validation->set_rules('lastName', 'Last Name', 'required');
		$this->form_validation->set_rules('login', 'Login', 'required|is_unique[customer.login]');
		$this->form_validation->set_rules('password', 'Password', 'required|minlength[6]');
		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'required|matches[password]');

		if($this->form_validation->run() == FALSE){
			$this->load->view('regForm.php');
		}
		else{
			$this->load->model('customer_model');

			$customer = new Customer();
			$customer->first = $this->input->get_post('firstName');
			$customer->last = $this->input->get_post('lastName');
			$customer->login = $this->input->get_post('login');
			$customer->password = $this->input->get_post('password');
			$customer->email = $this->input->get_post('email');

			$this->customer_model->insert($customer);
			

			$data['msg'] = 'Account successfully created. Please login now.'; 
			//Then we redirect to the index page again
			$this->load->view('homepage.php', $data);
		}
    }

    function login(){
    	$this->load->library('form_validation');

    	$this->form_validation->set_rules('login', 'Login', 'required');

		$this->form_validation->set_rules('password', 'Password', 'required');

		$this->load->model('customer_model');

		$correctUser = false;
		$admin = false;


		if($this->form_validation->run() == FALSE){
			$this->load->view('homepage.php');
		}
		else{
			$customers = $this->customer_model->getAll();

			foreach ($customers as $customer) {
				if ($this->input->get_post('login') == 'admin' &&
					'admin' == $this->input->get_post('password')){
					$admin = true;
					break;
				}

				else if($customer->login == $this->input->get_post('login') &&
					$customer->password == $this->input->get_post('password')){
					$correctUser = true;
					//also save correct customer to use later on for account stuff
					$_SESSION['customerId'] = $customer->id;
					break;
				}
			}

			if($admin){
				//load and pass in admin template
				$this->load->model('product_model');
		    	$products = $this->product_model->getAll();
		    	$data['products']=$products;
		    	$data['admin'] = true;
		    	$data['main'] = "product/list.php";
				$this->load->view('template.php', $data);
			}
			else if($correctUser){
				$this->load->model('product_model');
		    	$products = $this->product_model->getAll();
		    	$data['products']=$products;
		    	$data['admin'] = false;
		    	$data['main'] = "list_candy.php";
				$this->load->view('template.php', $data);
			}
			else {
				$data['errormsg'] = 'Invalid Username/password combination';
				$this->load->view('homepage.php',$data);
			}	
		}
    }

    public function email_check ($email) {

		if (preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/",$email) == 0){

			$this->form_validation->set_message("email_check", "Invalid Email Address Format");
			return false;
		}
		return true;
	}

}
