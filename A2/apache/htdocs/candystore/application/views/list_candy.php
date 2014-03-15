<h2>Transaction</h2>
<?php 
		
		if (isset($errno))
			echo "<p>DB Error: ($errno) $errmsg</p>";

		echo "<h3>Candy</h3>";

		echo "<table>";
		echo "<tr><th>id</th><th>Name</th><th>Photo URL</th><th>Description</th><th>Price</th></tr>";
		
		foreach ($products as $candy) {
			echo "<tr>";
			echo "<td>" . $candy->id . "</td>";
			echo "<td>" . $candy->name . "</td>";
			echo "<td>" . $candy->photo_url . "</td>";
			echo "<td>" . $candy->description . "</td>";
			echo "<td>" . $candy->price . "</td>";
			
			//echo "<td>" . anchor("transaction/recordSale/$flight->id",'Ticket') . "</td>";
			echo "<td>" . anchor("shopping_controller/addToCart/$product->id",'Buy') . "</td>";
				
			echo "</tr>";
		}
		echo "<table>";
		
?>	
