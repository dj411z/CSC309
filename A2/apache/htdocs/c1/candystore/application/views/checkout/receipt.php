<?php 

	echo "<table>";
	echo "<tr><th>First</th><th>Last</th><th>Email</th><th>Creditcard Number</th><th>Expiry Month</th><th>Expiry Year</th><th>Order Date</th><th>Order Time</th><th>Total</th></tr>";

	
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
	// echo "<td>" . anchor("admin_orders/showItems/$order_items",'Items') . "</td>";

	echo "</tr>";
	echo "</table>";
	echo "<table align='center' border='1' style='width:300px'>";
	echo "<caption><strong>Products</strong></caption>";
	echo "<tr><th>Name</th><th>Description</th><th>Price</th><th>Photo</th></tr>";

	foreach ($order_items as $i) {
		echo "<td>" . $i[0]->name . "</td>";
			echo "<td>" . $i[0]->description . "</td>";
			echo "<td>" . $i[0]->price . "</td>";
			echo "<td><img src='" . base_url() . "images/product/" . $i[0]->photo_url . "' width='100px' /></td>";
		echo "</tr>";
	}
	echo "</table>";
	
	//save variables for javascript
	$f = $final_order->first;
	$l = $final_order->last;
	$e = $final_order->email;
	$n = $final_order->creditcard_number;
	$m = $final_order->creditcard_month;
	$y = $final_order->creditcard_year;
	$od = $final_order->order_date;
	$ot = $final_order->order_time;
	$t = $final_order->total;

	// $receipt = "<p>Name: $final_order->first $final_order->last </p><p>Email: $final_order->email</p>
	// 	<p>Creditcard Number: $final_order->creditcard_number</p><p>Expires: $final_order->creditcard_month / $final_order->creditcard_year</p>
	// 		<p>Date of Order: $final_order->order_date at $final_order->order_time</p><p>Total in CAD: $final_order->total</p>";

	// echo "<td>" . $receipt . "</td>";

	//hardcoded send email
	echo "<p>" . anchor('email_controller/sendEmail/$final_order->id','Send email') . "</p>";
?>

	<form>
		<input type="button" onclick="openPrintable()" value="Print Receipt"></input>
	</form>
	<script language ="Javascript">
		function openPrintable(){
			window.open("http://www.google.com");

			// top.wRef=window.open('','myconsole',
			// 'width=500,height=450,left=10,top=10'
			// +',menubar=1'
			// +',toolbar=0'
			// +',status=1'
			// +',scrollbars=1'
			// +',resizable=1');

			// var first = "<?php echo $f; ?>";
			// var last = "<?php echo $l; ?>";
			// var email = "<?php echo $e; ?>";
			// var cc_num = "<?php echo $n; ?>";
			// var cc_month = "<?php echo $m; ?>";
			// var cc_year = "<?php echo $y; ?>";
			// var order_date = "<?php echo $od; ?>";
			// var order_time = "<?php echo $ot; ?>";
			// var total = "<?php echo $t; ?>";
			// var receipt = "<?php echo $receipt; ?>";
			// alert(receipt);

			// top.wRef.document.writeln(
			// '<html><head><title>Candystore Receipt</title></head>'
			// +'<body bgcolor=white onLoad="self.focus()">'
			// +'<center><font color=red><b><i>For printing, <a href=# onclick="window.print();return false;">click here</a> or press Ctrl+P</i></b></font>'
			// +'<H3>Candystore Receipt</H3>'
			// +'<table border=0 cellspacing=3 cellpadding=3>'
			// +'<p>Name: '+ first + ' ' + last + '</p>'
			// + '<p>Email: '+ email + '</p>'
			// + '<p>Creditcard Number: ' + cc_num + '</p>'
			// + '<p>Expires: '+ cc_month + ' / ' + cc_year + '</p>'
			// + '<p>Date of Order: '+ order_date + ' at ' + order_time + '</p>'
			// + '<p>Total in CAD: '+ total + '</p>'
			// );

			// top.wRef.document.writeln('</table></center></body></html>');
			// top.wRef.document.close()
		}
	</script>

