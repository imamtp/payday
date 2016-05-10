<?php /* Smarty version Smarty-3.1.15, created on 2014-01-09 10:05:01
         compiled from "/var/www/bablast/assets/template/templates/contact/contact_group_list.tpl" */ ?>
<?php /*%%SmartyHeaderCode:177309645152ce104ab56bd6-34680469%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b51a6ca4b23904b5b892096860204644faefe7e5' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/contact/contact_group_list.tpl',
      1 => 1389236698,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '177309645152ce104ab56bd6-34680469',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52ce104abb7963_13382046',
  'variables' => 
  array (
    'assets_url' => 0,
    'base_url' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52ce104abb7963_13382046')) {function content_52ce104abb7963_13382046($_smarty_tpl) {?>

<section class="scrollable wrapper"> 

<div class="tab-pane" id="datatable"> <section class="panel"> 



<div class="table-responsive"> 
<table id="xxx" class="table table-striped m-b-none" width="100%"> 
<thead> 
<tr> 
<th>Group Name</th> 
<th>Description</th> 
<th>Total Contact</th> 
</tr> </thead> <tbody> </tbody> 
</table> 
</div> </section> 
</div> 
</section>
    
    <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="body"></a> </section> 
<!-- /.vbox -->



<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/jquery-1.10.2.min.js"></script> 
<script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/assets/js/datatables/media/js/jquery.dataTables.min.js"></script> 
<script type="text/javascript" charset="utf-8">

        var oTable = $('#xxx').dataTable({

            "bFilter": true,


            "sPaginationType": "full_numbers",
            "bProcessing": true,
            "bServerSide": true,
            "sServerMethod": "GET",
            "sAjaxSource": '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/data/getTable/contact_group_user',
          
        });
         


</script>  <?php }} ?>
