<?php /* Smarty version Smarty-3.1.15, created on 2014-10-08 08:19:57
         compiled from "/var/www/aktiva//assets/template/templates/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:57680374353f2cf27ef0945-70061897%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '60083f48b93bca343d0b57e0578d085b1fbfea35' => 
    array (
      0 => '/var/www/aktiva//assets/template/templates/login.tpl',
      1 => 1412742613,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '57680374353f2cf27ef0945-70061897',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_53f2cf280336e7_44861522',
  'variables' => 
  array (
    'appname' => 0,
    'assets_url' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53f2cf280336e7_44861522')) {function content_53f2cf280336e7_44861522($_smarty_tpl) {?><!DOCTYPE html>
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
/images/logo_aktiva2.png"  height=59/></div>
</body>
</html>
<?php }} ?>
