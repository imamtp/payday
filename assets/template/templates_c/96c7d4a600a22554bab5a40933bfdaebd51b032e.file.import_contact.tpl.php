<?php /* Smarty version Smarty-3.1.15, created on 2014-01-10 01:09:17
         compiled from "/var/www/bablast/assets/template/templates/contact/import_contact.tpl" */ ?>
<?php /*%%SmartyHeaderCode:204208251752c129fb486121-84263678%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '96c7d4a600a22554bab5a40933bfdaebd51b032e' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/contact/import_contact.tpl',
      1 => 1389290951,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '204208251752c129fb486121-84263678',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52c129fb48bcc8_28047028',
  'variables' => 
  array (
    'assets_url' => 0,
    'lang' => 0,
    'site_url' => 0,
    'base_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52c129fb48bcc8_28047028')) {function content_52c129fb48bcc8_28047028($_smarty_tpl) {?><script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/jquery-1.10.2.min.js"></script> 

<section class="scrollable wrapper"> 
<section class="panel"> 

<header class="panel-heading bg-light"> 
<ul class="nav nav-tabs nav-justified"> 
    <li class="active"><a href="#copy" id="copy" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][11];?>
</a></li> 
    <li class=""><a href="#document" id="document" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][12];?>
</a></li> 
    <li class=""><a href="#email" id="email" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][13];?>
</a></li> 
    <li class=""><a href="#service" id="service" data-toggle="tab"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][14];?>
</a></li> 
</ul> 
</header> 

<div class="panel-body"> 

    <div class="tab-content"> 

        <div class="tab-pane active" id="copy">
            <div id="display"> </div>
        </div> 

        <div class="tab-pane" id="document">profile
            <div id="display"> </div>
        </div> 

        <div class="tab-pane" id="email">message
            <div id="display"> </div>
        </div> 
        
        <div class="tab-pane" id="service">message
            <div id="display"> </div>
        </div> 
    </div> 
</div> 

</section>
</section>

<script>
display('contact.importcontact_display');

$("li").click(function(event) {
    
    if(event.target.id=='copy')
    {
        display('contact.importcontact_display');
    } else if(event.target.id=='document')
    {     
        display('contact.importdocument_display');
    } else if(event.target.id=='email')
    {
        display('contact.importemail_display');
    } else if(event.target.id=='service')
    {
        display('contact.importservice_display');
    }
});

function display(tpl)
{
    $( "#display" ).empty();
    $( "#display" ).load("<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/loader/display/"+tpl, function() {
   
      });
}
</script>
<script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
assets/js/parsley.js"></script> 
   <?php }} ?>
