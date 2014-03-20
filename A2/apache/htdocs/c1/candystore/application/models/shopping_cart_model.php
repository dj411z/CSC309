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
		
	function insert($id, $product) {
		$i = $_SESSION['items'];
		if(isset($i[$id])){
			$i[$id][1] += 1;
		}
		else{
			$i[$id] = array($product, 1);
		}
		$_SESSION['items'] = $i;
	}

	function add($id) {
		$i = $_SESSION['items'];
		$i[$id][1] += 1;
		$_SESSION['items'] = $i;
	}

	function subtract($id) {
		$i = $_SESSION['items'];
		$i[$id][1] -= 1;
		$_SESSION['items'] = $i;
	}

	function getTotal() {
		$total = 0;
		foreach ($_SESSION['items'] as $item) {

			$total += $item[1] * $item[0]->price;
		}
		return $total;
	}

	//Increment and decrement quantities 
	// make sure to update total 
}
?>