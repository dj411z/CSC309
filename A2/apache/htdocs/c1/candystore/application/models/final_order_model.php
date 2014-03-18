<?php
class Final_order_model extends CI_Model {

	function getAll()
	{  
		$query = $this->db->get('order');
		return $query->result('Order');
	}  
	
	function get()
	{
		$query = $this->db->query("select * from order;");
		
		// $query = $this->db->query("select * from order_item;");
		return $query->result();
	}

	function get_order_items($order_id)
	{
		$query = $this->db->query("select OT.product_id as 'product_id', OT.quantity as 'quantity'
								   from order_item OT
								   where OT.order_id = $order_id;");
		
		return $query->result();
	}
	
	function delete($id) {
		return $this->db->delete("order",array('id' => $id ));
	}
	
	
	function insert($order) {
		return $this->db->insert("order", array('id' => $order->id,
				                                  'customer_id' => $order->customer_id,
											      'order_date' => $order->order_date,
											      'order_time' => $order->order_time, 
											      'total' => $order->total, 
											      'creditcard_number' => $order->creditcard_number,
											      'creditcard_month' => $order->creditcard_month,
											      'creditcard_year' => $order->creditcard_year));
	}
}
?>