<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8" />
  <title><?php session_start(); echo $title; ?></title>
  <link rel="stylesheet" href="<?=  base_url(); ?>css/template.css">
</head>
<body>
  <div id="header">
  <?php $this->load->view('header');?>
  </div>

  <div id="nav">
  <?php
  if($admin == true){
    $this->load->view('admin_navigation.php');
  }
  else{
    $this->load->view('user_navigation.php');
  }
  ?>
  </div>
  <div id="main">
  <?php $this->load->view($main, '$data');?>
  </div>
  
</body>
</html>
