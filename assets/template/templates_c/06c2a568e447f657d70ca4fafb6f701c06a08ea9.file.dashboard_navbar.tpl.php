<?php /* Smarty version Smarty-3.1.15, created on 2014-01-12 14:51:08
         compiled from "/var/www/bablast/assets/template/templates/dashboard_navbar.tpl" */ ?>
<?php /*%%SmartyHeaderCode:267697227528828f5a01d94-07229370%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '06c2a568e447f657d70ca4fafb6f701c06a08ea9' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/dashboard_navbar.tpl',
      1 => 1389513067,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '267697227528828f5a01d94-07229370',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_528828f5a07649_99307637',
  'variables' => 
  array (
    'site_url' => 0,
    'menu' => 0,
    'v' => 0,
    'vv' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_528828f5a07649_99307637')) {function content_528828f5a07649_99307637($_smarty_tpl) {?><!-- .aside --> <aside class="bg-primary aside-sm" id="nav"> <section class="vbox"> 

<header class="dker nav-bar"> <a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen" data-target="body"> <i class="icon-reorder"></i> </a> <a href="#" class="nav-brand" data-toggle="fullscreen">bablast</a> <a class="btn btn-link visible-xs" data-toggle="class:show" data-target=".nav-user"> <i class="icon-comment-alt"></i> </a> </header> 
<footer class="footer bg-gradient hidden-xs"> <a href="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/logout" class="btn btn-sm btn-link m-r-n-xs pull-right"> <i class="icon-off"></i> </a> <a href="#nav" data-toggle="class:nav-vertical" class="btn btn-sm btn-link m-l-n-sm"> <i class="icon-reorder"></i> </a> </footer> <section> 
<!-- user --> 






<!-- / user --> 
<!-- nav --> 
<nav class="nav-primary hidden-xs"> 
<ul class="nav"> 

<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['menu']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['v']->key;
?>
    <?php if ($_smarty_tpl->tpl_vars['v']->value['submenu']!=false) {?>
        <li class="dropdown-submenu">
    <?php } else { ?>
        <li>
    <?php }?> 
 
    <a> <i class="icon-envelope-alt"></i> 
        <span><?php echo $_smarty_tpl->tpl_vars['v']->value['menu_title'];?>
</span> 
    </a> 
    <?php if ($_smarty_tpl->tpl_vars['v']->value['submenu']!=false) {?>
        <ul class="dropdown-menu" id="nav"> 
            <?php  $_smarty_tpl->tpl_vars['vv'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['vv']->_loop = false;
 $_smarty_tpl->tpl_vars['kk'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['v']->value['submenu']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['vv']->key => $_smarty_tpl->tpl_vars['vv']->value) {
$_smarty_tpl->tpl_vars['vv']->_loop = true;
 $_smarty_tpl->tpl_vars['kk']->value = $_smarty_tpl->tpl_vars['vv']->key;
?>
                <li> <a href="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['vv']->value['menu_command'];?>
" alt="<?php echo $_smarty_tpl->tpl_vars['vv']->value['menu_title'];?>
"><?php echo $_smarty_tpl->tpl_vars['vv']->value['menu_title'];?>
</a></li> 
            <?php } ?>                
        </ul> 
    <?php }?>    
</li> 
<?php } ?>

</ul> 

</nav> 
<!-- / nav --> 
<!-- note --> 


<!-- / note --> </section> </section> </aside> 
<!-- /.aside --> 
<!-- .vbox --> <section id="content"> <section class="vbox"> <?php }} ?>
