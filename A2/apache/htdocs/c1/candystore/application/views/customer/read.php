<h2>Customer Entry</h2>
<?php 
	$referer = $_SERVER["HTTP_REFERER"];
	echo "<p>" . anchor("$referer", 'Back') . "</p>";

	echo "<p> ID = " . $customer->id . "</p>";
	echo "<p> First = " . $customer->first . "</p>";
	echo "<p> Last = " . $customer->last . "</p>";
	echo "<p> Login = " . $customer->login . "</p>";
	echo "<p> Email = " . $customer->email . "</p>";
	// echo "<p> Password = " . $customer->pasword . "</p>";

	
?>	
