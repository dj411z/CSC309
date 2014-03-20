<h2>Order Table</h2>
<?php 

		echo "<table>";
		echo "<tr><th>Customer Info</th><th>Order Date</th><th>Order Time</th><th>Total</th><th>Creditcard Number</th><th>Expiry Month</th><th>Expiry Year</th><th>Items</th></tr>";
		
		foreach ($orders as $order) {
			echo "<tr>";
			echo "<td>" . anchor("admin_customers/read/$order->customer_id",'View') . "</td>";
			echo "<td>" . $order->order_date . "</td>";
			echo "<td>" . $order->order_time . "</td>";
			echo "<td> $" . $order->total . "</td>";
			echo "<td>" . $order->creditcard_number . "</td>";
			echo "<td>" . $order->creditcard_month . "</td>";
			echo "<td>" . $order->creditcard_year . "</td>";
			

			echo "<td>" . anchor("admin_orders/read_item_details/$order->id",'View') . "</td>";
				
			echo "</tr>";

		}
		echo "<table>";

		echo "<div>" . anchor("admin_orders/delete",'Remove All Orders',"onClick='return confirm(\"Do you really want to delete this record?\");'") . "</div>";
?>	
