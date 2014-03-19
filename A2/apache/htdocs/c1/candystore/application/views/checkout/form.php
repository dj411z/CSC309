<h2>Checkout</h2>

<style>
	input { display: block;}
	
</style>
<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script>
		function checkCCNum(){

			var cc_num = document.getElementByID("cc_num");
			if(strlen(cc_num)) == 16{
				ccnum.setCustomValidity("");
				return true;
			}
			else{
				ccnum.setCustomValidity("Invalid Creditcard Number Length.");
				return false;
			}

		function checkCCExpire(){

			var cc_month = document.getElementByID("cc_month");
			var cc_year = document.getElementByID("cc_year");

			today = new Date();
			expiry = new Date(cc_year, cc_month);

			if (today.getTime() < expiry.getTime())
				cc_year.setCustomValidity("");
				return true;

			else{
				cc_year.setCustomValidity("Creditcard has Expired.");
				return false;
			}	
		}
	</script>


<?php 
	echo "<p>" . anchor('checkout_controller/showAll','Back') . "</p>";

	echo form_open_multipart('checkout_controller/fillForm');
		
	echo form_label('First Name'); 
	echo form_error('firstName');
	echo form_input('firstName',$customer->first,"required");

	echo form_label('Last Name'); 
	echo form_error('lastName');
	echo form_input('lastName',$customer->last,"required");

	echo form_label('Email'); 
	echo form_error('email');
	echo form_input('email',$customer->email,"
		required pattern='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$' title='Invalid Email'");
	
	echo form_label('Creditcard Number');
	echo form_error('creditcard_number');
	echo form_input('creditcard_number', "", "id='cc_num' required oninput=checkCCNum()");
	
	echo form_label('Creditcard Expiry Month');
	echo form_error('creditcard_month');
	echo form_input('creditcard_month', "", "id='cc_month' required");

	echo form_label('Creditcard Number');
	echo form_error('creditcard_year');
	echo form_input('creditcard_year', "", "id='cc_year' required oninput=checkCCExpire()");

	echo form_submit('submit', 'Continue');
	echo form_close();
?>	