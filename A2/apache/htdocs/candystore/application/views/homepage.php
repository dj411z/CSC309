<?php 
		session_start();
		header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		
		$count = 1;
	 	$loggedIn = false;
		
		if ((isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]) || 
			(isset($_REQUEST["username"]) && isset($_REQUEST["password"]) &&
			 $_REQUEST["username"] == "John" && $_REQUEST["password"] == "Smith")) {
			$loggedIn = true; 

			if (isset($_SESSION["count"]))
				$count = $_SESSION["count"] + 1;

			$_SESSION["loggedIn"] = true;
			$_SESSION["count"] = $count;			
			
		}
?>
	
<!DOCTYPE html>
<html>
	<head>
		<title>Welcome</title>
	</head>
	<body>
		<h1>Login Page</h1>
	<?php 
		if ($loggedIn) {
	?>
			<p>
			You have visited this this page <?= $count?> times.
			</p>		
			<p>
			<a href="homepage.php">Count</a>
			</p>
			<!-- <p>
			<a href="logout.php">Logout</a>
			</p> -->
	<?php 		
		}
		else {
	?>
			<form action="homepage.php">
				Username <input type="text" name="username" />
				Password <input type="text" name="password" />
				<input type="submit" value="Login" />
			</form>
	
	<?php 		
		}
	?>
	</body>
</html> 