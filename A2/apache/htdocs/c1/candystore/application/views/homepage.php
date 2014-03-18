<h2>Sign In</h2>

<style>
	input { display: block;}
	
</style>

<?php 

	echo validation_errors(); 

	if (isset($errormsg)){
		echo $errormsg;
		unset($errormsg);
	}

	if(isset($msg)){
		echo $msg;
		unset($msg);
	}

	echo "<p>" . anchor('main/register','Create') . "</p>";
	
	echo form_open_multipart('main/login');
		
	echo form_label('Login'); 
	echo form_error('login');
	echo form_input('login',"","required");
	
	echo form_label('Password');
	echo form_error('password');
	echo form_input('password', "","required");
	
	echo form_submit('submit', 'Login');
	echo form_close();
?>	