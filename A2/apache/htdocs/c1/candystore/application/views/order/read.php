<h2>Order Entry</h2>
<?php 
	echo "<p>" . anchor('admin_orders/showAll','Back') . "</p>";

	foreach ($orders as $order) {

		echo "<p> Product ID = " . $order->product_id . "</p>";
		echo "<p> Quantity = " . $order->quantity . "</p>";
		
	}
		
?>	

