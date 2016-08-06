<?php /* Smarty version Smarty-3.1.15, created on 2013-12-20 07:07:48
         compiled from "/var/www/bablast/assets/template/templates/contact/contact_list.tpl" */ ?>
<?php /*%%SmartyHeaderCode:57687990152b360938a2b42-83262540%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2fd8d8903736e0fcabbbb7241892b35610bf9beb' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/contact/contact_list.tpl',
      1 => 1387498067,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '57687990152b360938a2b42-83262540',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52b360938abdb4_28573760',
  'variables' => 
  array (
    'assets_url' => 0,
    'base_url' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52b360938abdb4_28573760')) {function content_52b360938abdb4_28573760($_smarty_tpl) {?>

<section class="scrollable wrapper"> 

<div class="tab-pane" id="datatable"> <section class="panel"> 



<div class="table-responsive"> 
<table id="xxx" class="table table-striped m-b-none" width="100%"> 
<thead> 
<tr> 
<th>contact_user</th> 
<th>name</th> 
<th>email</th> 
<th>groupcontact</th> 
<th>notes</th> 
<th>datein</th> 
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
/data/getTable/contact_user',
          
        });
         


</script>  <?php }} ?>
