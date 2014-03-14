<?php
class Shopping_cart_model extends CI_Model {

	function getItems($id){
		return $id->items;
	}
	
	function deleteItem($id, $product_id) {
		for ($i=0; $i <= sizeof($id->items); $i++){
			if ($id->items[i]->id == $product_id){
				unset($id->items[i]);
			}
		}
	}
		
	function insertItem($id, $product) {
		array_push($id->items, $product);
	}

	function setTotal($id) {
		int $total = 0;
		foreach($id->$items as $product){
			$total += $product->price;
		}
		$id->total = $total;
	}

	//Increment and decrement quantities 
	// make sure to update total 
}
?>