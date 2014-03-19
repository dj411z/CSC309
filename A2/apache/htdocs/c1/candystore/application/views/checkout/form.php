<h2>Checkout</h2>

<style>
	input { display: block;}
	
</style>

<?php 
	echo "<p>" . anchor('checkout_controller/showAll','Back') . "</p>";

	echo form_open_multipart('checkout_controller/checkout');
		
	echo form_label('First Name'); 
	echo form_error('firstName');
	echo form_input('firstName',$customer->first,"required");

	echo form_label('Last Name'); 
	echo form_error('lastName');
	echo form_input('lastName',$customer->last,"required");

	echo form_label('Login'); 
	echo form_error('login');
	echo form_input('login',$customer->login,"required");
	
	echo form_label('Password');
	echo form_error('password');
	echo form_input('password', "","id='pass1' required");
	
	echo form_label('Password Confirmation');
	echo form_error('passconf');
	echo form_input('passconf', "","id='pass2' required oninput=checkPassword()");
	
	echo form_label('Email');
	echo form_error('email');
	echo form_input('email', $customer->email, 
		"required pattern='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$' title='Invalid Email'");


	echo form_submit('submit', 'Save');
	echo form_close();
?>	