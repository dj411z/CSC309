<?php
class Shopping_cart_model extends CI_Model {

	
	function getItems($id){
		return $id->items;
	}
	
	function delete($id) {
		$i = $_SESSION['items'];
		unset($i[$id]);
		$_SESSION['items'] = $i;
	}
		
	// function insert($id) {
	// 	array_push($_SESSION['items'], $id);
	// }

	// function setTotal($id) {
	// 	int $total = 0;
	// 	foreach($id->$items as $product){
	// 		$total += $product->price;
	// 	}
	// 	$id->total = $total;
	// }

	//Increment and decrement quantities 
	// make sure to update total 
}
?>