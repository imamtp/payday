<?php /* Smarty version Smarty-3.1.15, created on 2014-01-12 14:40:04
         compiled from "/var/www/bablast/assets/template/templates/dashboard_header.tpl" */ ?>
<?php /*%%SmartyHeaderCode:631497856528827cd0cad63-03165649%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0254acc5888dd612fbbc4532a1446cf35ef1e194' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/dashboard_header.tpl',
      1 => 1389512400,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '631497856528827cd0cad63-03165649',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_528827cd0cbe99_11508790',
  'variables' => 
  array (
    'titleweb' => 0,
    'appname' => 0,
    'assets_url' => 0,
    'base_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_528827cd0cbe99_11508790')) {function content_528827cd0cbe99_11508790($_smarty_tpl) {?><meta charset="utf-8"> 
<title><?php echo $_smarty_tpl->tpl_vars['titleweb']->value;?>
 - <?php echo $_smarty_tpl->tpl_vars['appname']->value;?>

</title> 
<meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav"> 
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> 

<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
css/app.v1.css"> 
<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
assets/js/nprogress/nprogress.css"> 

<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
css/font.css" cache="false"> 

<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/jquery-1.10.2.min.js"></script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
assets/js/nprogress/nprogress.js"></script> 

<!--[if lt IE 9]> 
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/ie/respond.min.js" cache="false">
</script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/ie/html5.js" cache="false">
</script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/ie/fix.js" cache="false">
</script> <![endif]--><?php }} ?>
