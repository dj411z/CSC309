<!DOCTYPE html>
<html>
<head>
	<style>
		input{
			display: block;
		}
	</style>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script>
		function checkPassword(){

			var p1 = document.getElementByID("pass1");
			var p2 = document.getElementByID("pass2");

			if(p1.value == p2.value){
				p2.setCustomValidity("");
				return true;
			}
			else{
				p2.setCustomValidity("Passwords do not match.");
				return false;
			}
		}
	</script>
</head>
<body>
	<h1>User Registration</h1>
	<?php

		echo form_open('register/register');
		echo form_label('Email');
		echo form_error('email');
		echo form_input('email', set_value("email"), 
			"required pattern='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$' title='Invalid Email'");
		
		echo form_label('Password');
		echo form_error('password');
		echo form_input('password', "","id='pass1' required");

		echo form_label('Password Confirmation');
		echo form_error('passconf');
		echo form_input('passconf', "","id='pass2' required oninput=checkPassword()");

		echo form_submit('submit', 'Register');
		echo form_close();

	?>
</body>
</html>