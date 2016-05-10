<?php /* Smarty version Smarty-3.1.15, created on 2014-07-07 13:09:16
         compiled from "/var/www/hrdpay//assets/template/templates/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:541307096533c810a7fa4f1-61552927%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5e0ca58b4f528ee67a5e486fc94219f1bead3579' => 
    array (
      0 => '/var/www/hrdpay//assets/template/templates/login.tpl',
      1 => 1404709706,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '541307096533c810a7fa4f1-61552927',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_533c810a84a7c1_56636551',
  'variables' => 
  array (
    'appname' => 0,
    'assets_url' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_533c810a84a7c1_56636551')) {function content_533c810a84a7c1_56636551($_smarty_tpl) {?><!DOCTYPE html>
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
</head>
<body>
    <div style="position: absolute;
    top: 10%;
    left: 45%;
    margin-top: -50px;
    margin-left: -50px;
    align:center; 
    margin-top:5%;"><img src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/images/HP_trans.png"/></div>
</body>
</html>
<?php }} ?>
