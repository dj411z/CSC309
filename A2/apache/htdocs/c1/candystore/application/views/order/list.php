<h2>Order Table</h2>
<?php 
		echo "<table>";
		echo "<tr><th>Customer ID</th><th>Order Date</th><th>Order Time</th><th>Total</th><th>Creditcard Number</th><th>Expiry Month</th><th>Expiry Year</th></tr>";
		
		foreach ($orders as $order) {
			echo "<tr>";
			echo "<td>" . $order->order_id . "</td>";
			echo "<td>" . $order->first . "</td>";
			echo "<td>" . $order->last . "</td>";
			echo "<td>" . $order->order_date . "</td>";
			echo "<td>" . $order->total . "</td>";

			echo "<td>" . anchor("admin_orders/delete/$order->order_id",'Delete',"onClick='return confirm(\"Do you really want to delete this record?\");'") . "</td>";
			echo "<td>" . anchor("admin_orders/read_item_details/$order->order_id",'View') . "</td>";
				
			echo "</tr>";
		}
		echo "<table>";
?>	
