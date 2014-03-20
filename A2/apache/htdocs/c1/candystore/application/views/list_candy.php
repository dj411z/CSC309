<h1>Candy</h1>
<?php 
		
		if (isset($errno))
			echo "<p>DB Error: ($errno) $errmsg</p>";


		echo "<table>";
		echo "<tr><th>id</th><th>Name</th><th>Photo URL</th><th>Description</th><th>Price</th></tr>";
		
		//echo sizeof($products);

		foreach ($products as $candy) {
			echo "<tr>";
			echo "<td>" . $candy->id . "</td>";
			echo "<td>" . $candy->name . "</td>";
			echo "<td><img src='" . base_url() . "images/product/" . $candy->photo_url . "' width='100px' /></td>";
			echo "<td>" . $candy->description . "</td>";
			echo "<td>" . $candy->price . "</td>";
			
			echo "<td>" . anchor("shopping_cart/addToCart/$candy->id",'Buy') . "</td>";
				
			echo "</tr>";

		}
		echo "<table>";
		
?>	
