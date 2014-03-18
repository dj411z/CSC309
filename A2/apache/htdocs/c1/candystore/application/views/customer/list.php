<h2>Customer Table</h2>
<?php 
		echo "<table>";
		echo "<tr><th>First</th><th>Last</th><th>Login</th><th>Email</th></tr>";
		
		foreach ($customers as $customer) {
			echo "<tr>";
			echo "<td>" . $customer->first . "</td>";
			echo "<td>" . $customer->last . "</td>";
			echo "<td>" . $customer->login . "</td>";
			echo "<td>" . $customer->email . "</td>";
			// echo "<td>" . $customer->password . "</td>";

			echo "<td>" . anchor("admin_customers/delete/$customer->id",'Delete',"onClick='return confirm(\"Do you really want to delete this record?\");'") . "</td>";
			echo "<td>" . anchor("admin_customers/read/$customer->id",'View') . "</td>";
				
			echo "</tr>";
		}
		echo "<table>";
?>	

