<h2>Cart Items</h2>
<?php 
		
		echo "<table>";
		echo "<tr><th>Name</th><th>Description</th><th>Price</th><th>Photo</th></tr>";
		echo sizeof($cart_items);
		foreach ($cart_items as $item) {
			echo "<tr>";
			echo "<td>" . $item->name . "</td>";
			echo "<td>" . $item->description . "</td>";
			echo "<td>" . $item->price . "</td>";
			echo "<td><img src='" . base_url() . "images/product/" . $item->photo_url . "' width='100px' /></td>";

			echo "<td>" . anchor("shopping_cart/delete/$customer->id",'Remove from cart',"onClick='return confirm(\"Do you really want to delete this record?\");'") . "</td>";
			echo "<td>" . anchor("shopping_cart/read/$customer->id",'View') . "</td>";
				
			echo "</tr>";
		}
		echo "<table>";
?>	

