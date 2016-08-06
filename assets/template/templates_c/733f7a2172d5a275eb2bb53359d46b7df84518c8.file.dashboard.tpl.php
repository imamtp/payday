<?php /* Smarty version Smarty-3.1.15, created on 2014-01-12 14:38:24
         compiled from "/var/www/bablast/assets/template/templates/dashboard.tpl" */ ?>
<?php /*%%SmartyHeaderCode:558200831528827be5d7a81-03485455%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '733f7a2172d5a275eb2bb53359d46b7df84518c8' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/dashboard.tpl',
      1 => 1389512303,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '558200831528827be5d7a81-03485455',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_528827be90b553_23986090',
  'variables' => 
  array (
    'account_type' => 0,
    'tplfile' => 0,
    'assets_url' => 0,
    'base_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_528827be90b553_23986090')) {function content_528827be90b553_23986090($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head> 
<?php echo $_smarty_tpl->getSubTemplate ('dashboard_header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</head>

<body style='display: none'> 
  
       <section class="hbox stretch"> 
        
        <?php echo $_smarty_tpl->getSubTemplate ('dashboard_navbar.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

       
        <header class="header bg-white b-b"> 
            <p><span id="title_page"> </span></p> 
            <div id="accType" style="float:right; margin-top: 15px;">Account Type: 
                <div class="btn-group"> 
                  <a href="#" class="btn btn-default btn-xs"><?php echo $_smarty_tpl->tpl_vars['account_type']->value;?>
</a>
                  
                   
                </div> 
            </div>
        </header> 
       
        <section class="scrollable wrapper"> </section> 

        <section> <div id="alert" style="right:50%;"> </div>
            <a href="dasdsa" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="body"></a> 
        </section> 
        
        <div id="contentdiv"></div>
        <!-- /.vbox --> 
        <?php if (isset($_smarty_tpl->tpl_vars['tplfile']->value)) {?>
            <?php echo $_smarty_tpl->getSubTemplate (((string)$_smarty_tpl->tpl_vars['tplfile']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        <?php }?>

    </section>
 
   
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
css/app.v1s.js"></script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
assets/js/apps2.js"></script> 
</body>
</html>
<?php }} ?>
