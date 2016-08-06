<?php /* Smarty version Smarty-3.1.15, created on 2016-07-17 16:16:12
         compiled from "/home/nana/natadayaweb//kopi/assets/template/templates/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:853403032578b4cdc105ce0-19651174%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '25220a2af72faf2255bde630f53f11e74081ab9d' => 
    array (
      0 => '/home/nana/natadayaweb//kopi/assets/template/templates/login.tpl',
      1 => 1463192680,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '853403032578b4cdc105ce0-19651174',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'appname' => 0,
    'assets_url' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_578b4cdc170198_78961714',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_578b4cdc170198_78961714')) {function content_578b4cdc170198_78961714($_smarty_tpl) {?><!DOCTYPE html>
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
