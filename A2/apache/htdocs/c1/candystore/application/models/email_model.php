<?php
class Email_model extends CI_Model {

	function sendEmail($email) {

		$this->load->library('email');

		$this->email->from('dennis.jiang411z@gmail.com', 'Dennis Jiang');
		$this->email->to("$email");

		$this->email->subject('Candystore Receipt');
		$this->email->message('Here is your receipt.';

		//cannot attach receipt file because not a file / hard to do

		$this->email->send();

		echo $this->email->print_debugger();
	}
?>