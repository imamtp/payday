<?php /* Smarty version Smarty-3.1.15, created on 2014-01-08 17:56:25
         compiled from "/var/www/bablast/assets/template/templates/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:161074113552876134217107-44334046%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '109e4100f0f0c43f0f337f7e88d5df753fda3d97' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/login.tpl',
      1 => 1389178579,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '161074113552876134217107-44334046',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_528761342429e6_12817848',
  'variables' => 
  array (
    'appname' => 0,
    'assets_url' => 0,
    'site_url' => 0,
    'msg' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_528761342429e6_12817848')) {function content_528761342429e6_12817848($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">

<head> 
<meta charset="utf-8"> 
<title><?php echo $_smarty_tpl->tpl_vars['appname']->value;?>

</title> 
<meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['appname']->value;?>
"> 
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> 

<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/css/app.v1.css"> 

<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
css/font.css" cache="false"> 
<!--[if lt IE 9]> 
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/ie/respond.min.js" cache="false">
</script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/ie/html5.js" cache="false">
</script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/ie/fix.js" cache="false">
</script> <![endif]-->
</head>

<body> <section id="content" class="m-t-lg wrapper-md animated fadeInUp"> <a class="nav-brand" href="index.html"><?php echo $_smarty_tpl->tpl_vars['appname']->value;?>
</a> 

<div class="row m-n"> 

<div class="col-md-4 col-md-offset-4 m-t-lg"> <section class="panel"> 

<header class="panel-heading text-center"> Sign in </header> 

<form action="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/login/process" class="panel-body" method="post"> 
<center><?php echo $_smarty_tpl->tpl_vars['msg']->value;?>
</center>
<div class="form-group"> 
<label class="control-label">Email
</label> 
<input type="email" name="email" placeholder="your email" class="form-control"> 
</div> 

<div class="form-group"> 
<label class="control-label">Password
</label> 
<input type="password" name="password" id="inputPassword" placeholder="your password" class="form-control"> 
</div> 

<div class="checkbox"> 
<label> 
<input type="checkbox"> Keep me logged in 
</label> 
</div> <a href="#" class="pull-right m-t-xs"><small>Forgot password?</small></a> <button type="submit" class="btn btn-info">Sign in</button> 

<div class="line line-dashed">
</div> <a href="#" class="btn btn-facebook btn-block m-b-sm"><i class="icon-facebook pull-left"></i>Sign in with Facebook</a> <a href="#" class="btn btn-twitter btn-block"><i class="icon-twitter pull-left"></i>Sign in with Twitter</a> 

<div class="line line-dashed">
</div> 

<p class="text-muted text-center"><small>Do not have an account?</small></p> <a href="signup.html" class="btn btn-white btn-block">Create an account</a> 
</form> </section> 
</div> 
</div> </section> 
<!-- footer --> <footer id="footer"> 

<div class="text-center padder clearfix"> 

<p> <small><?php echo $_smarty_tpl->tpl_vars['appname']->value;?>

<br>&copy; 2013</small> </p> 
</div> </footer> 
<!-- / footer -->
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
css/app.v1.js">
</script> 
<!-- Bootstrap --> 
<!-- app --> 
</body>
</html>
<?php }} ?>
