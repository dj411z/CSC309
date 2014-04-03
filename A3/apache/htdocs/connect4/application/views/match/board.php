
<!DOCTYPE html>

<html>
	<head>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script src="<?= base_url() ?>/js/jquery.timers.js"></script>

	<script>

		var otherUser = "<?= $otherUser->login ?>";
		var user = "<?= $user->login ?>";
		var status = "<?= $status ?>";

		var currTurn = 1;

		function makeMove(move, piece){
				dropPiece(move,piece);
		}

		function turn(){
			if (currTurn == 1)
				currTurn = 2;
			else
				currTurn = 1;
		}

		var p1 = "<?= $player1 ?>";
		var p2 = "<?= $player2 ?>";
		
		$(function(){
			$('body').everyTime(2000,function(){
					if (status == 'waiting') {
						$.getJSON('<?= base_url() ?>arcade/checkInvitation',function(data, text, jqZHR){
								if (data && data.status=='rejected') {
									alert("Sorry, your invitation to play was declined!");
									window.location.href = '<?= base_url() ?>arcade/index';
								}
								if (data && data.status=='accepted') {
									status = 'playing';
									$('#status').html('Playing ' + otherUser);
								}
								
						});
					}
					var url = "<?= base_url() ?>board/getMsg";
					$.getJSON(url, function (data,text,jqXHR){
						if (data && data.status=='success') {
							var conversation = $('[name=conversation]').val();
							var msg = data.message;
							if (msg.length > 0){
								$('[name=conversation]').val(conversation + "\n" + otherUser + ": " + msg);
								makeMove(Number(msg), currTurn);
								turn();
							}
						}
					});

					// var url0 = "<?= base_url() ?>board/getMove";
					// $.getJSON(url0, function (data,text,jqXHR){
					// 	if (data && data.status=='success') {
					// 		var move = data.move;
					// 		console.log(move);
					// 		var player = data.player;
					// 		if (move.length > 0){
					// 			dropPiece(move, player);
					// 			drawPieces();
					// 		}
					// 	}
					// });


			});	
	
			$('form').submit(function(){
				var arguments = $(this).serialize();
				var url = "<?= base_url() ?>board/postMsg";
				$.post(url,arguments, function (data,textStatus,jqXHR){
						var conversation = $('[name=conversation]').val();
						var msg = $('[name=msg]').val();
						$('[name=conversation]').val(conversation + "\n" + user + ": " + msg);
						makeMove(Number(msg), currTurn);
						turn();

					});
				

				// var url2 = "<?= base_url() ?>board/postMove";
				// $.post(url2,arguments, function (data,textStatus,jqXHR){
				// 		var move = $('[name=move]').val();
				// 		dropPiece(move, 1);
				// 		drawPieces();
				// 		});
				return false;
			});	
		});
	
	</script>
	</head> 
<body>  
	<h1>Game Area</h1>

	<div>
	Hello <?= $user->fullName() ?>  <?= anchor('account/logout','(Logout)') ?>  
	</div>
	<canvas id="canvas" height="500" width="500"></canvas>
	<div id='status'> 
	<?php 
		if ($status == "playing")
			echo "Playing " . $otherUser->login;
		else
			echo "Wating on " . $otherUser->login;
	?>
	</div>
	
<?php 
	
	echo form_textarea('conversation');
	echo form_open();
	echo form_input('msg');
	//echo form_input('move');
	echo form_submit('Send','Send');
	echo form_close();
	
?>
		
</body>
<script src="<?= base_url() ?>/js/connect4.js"></script>
</html>

