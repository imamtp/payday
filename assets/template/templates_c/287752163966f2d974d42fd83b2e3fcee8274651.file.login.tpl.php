<?php /* Smarty version Smarty-3.1.15, created on 2016-02-03 16:09:16
         compiled from "/var/www/natadaya//assets/template/templates/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:18684658425549e341338a11-66431950%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '287752163966f2d974d42fd83b2e3fcee8274651' => 
    array (
      0 => '/var/www/natadaya//assets/template/templates/login.tpl',
      1 => 1454489007,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '18684658425549e341338a11-66431950',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_5549e3413b6196_55103539',
  'variables' => 
  array (
    'appname' => 0,
    'assets_url' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5549e3413b6196_55103539')) {function content_5549e3413b6196_55103539($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?php echo $_smarty_tpl->tpl_vars['appname']->value;?>
</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-all.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-theme-neptune.js'></script>
    <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">


    <script type="text/javascript">
    var SITE_URL = '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
';
    </script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/login.js'></script>
    <style>
    body{
        position:relative;
        /*background: url(http://8pic.ir/images/cgnd518gxezm1m2blqo7.jpg) no-repeat center center fixed;*/
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        width:100%;
        height:100%;
        margin:0
    }
    body:after{
        opacity: 0.19;
        position:fixed;
        content:"";
        top:0;
        left:0;
        right:0;
        bottom:0;
        /*background:rgba(0,0,255,0.5);*/
        background: url(<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/images/FLAT8.png) no-repeat center center fixed;
        z-index:-1;
    }
    </style>
</head>
<body>
</body>
</html>
<?php }} ?>
