<h2>Cart Items</h2>
<?php 
	
		
		echo "<table>";
		echo "<tr><th>Name</th><th>Description</th><th>Price</th><th>Photo</th><th>Quantity</th></tr>";
		
		foreach ($cart_items as $item) {
			echo "<tr>";
			echo "<td>" . $item[0]->name . "</td>";
			echo "<td>" . $item[0]->description . "</td>";
			echo "<td>" . $item[0]->price . "</td>";
			echo "<td><img src='" . base_url() . "images/product/" . $item[0]->photo_url . "' width='100px' /></td>";
			echo "<td>" . $item[1] . "</td>";
			$id = $item[0]->id;

			echo "<td>" . anchor("shopping_cart/add/$id",'  +  ') . "</td>";
			echo "<td>" . anchor("shopping_cart/subtract/$id",'  -  ') . "</td>";
			echo "<td>" . anchor("shopping_cart/delete/$id",'Remove from cart',"onClick='return confirm(\"Do you really want to delete this record?\");'") . "</td>";
			echo "<td>" . anchor("shopping_cart/read/$id",'View') . "</td>";
				
			echo "</tr>";
		}
		echo "<table>";

		echo "<div><strong>Total : \$ $total CAD</strong></div>";
		echo "<div>" . anchor("checkout_controller/newForm", 'Checkout') . "</div>";

		// echo "<div>" . anchor("checkout_controller/showAll", 'Checkout') . "</div>";
?>	

