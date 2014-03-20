<?php 
	echo "<table>";
	echo "<tr><th>First</th><th>Last</th><th>Email</th><th>Creditcard Number</th><th>Expiry Month</th><th>Expiry Year</th><th>Order Date</th><th>Order Time</th><th>Total</th><th>Items</th></tr>";

	
	echo "<tr>";
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

	
	//hardcoded send email
	echo "<p>" . anchor('email_controller/sendEmail','Send email') . "</p>";
	echo "<td>" . anchor("checkout_controller/openPrintable",'Print Receipt') . "</td>";
?>
