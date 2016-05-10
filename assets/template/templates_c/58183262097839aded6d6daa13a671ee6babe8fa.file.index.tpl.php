<?php /* Smarty version Smarty-3.1.15, created on 2013-11-15 21:18:11
         compiled from "/var/www/bablast/assets/template/templates/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:10753762395286238c53e233-21573319%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '58183262097839aded6d6daa13a671ee6babe8fa' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/index.tpl',
      1 => 1384525090,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '10753762395286238c53e233-21573319',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_5286238c56b146_96867254',
  'variables' => 
  array (
    'name' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5286238c56b146_96867254')) {function content_5286238c56b146_96867254($_smarty_tpl) {?>
Hello <?php echo $_smarty_tpl->tpl_vars['name']->value;?>
, welcome to Smarty!

<?php echo $_SERVER['SCRIPT_NAME'];?>
<?php }} ?>
