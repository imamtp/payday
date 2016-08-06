<?php /* Smarty version Smarty-3.1.15, created on 2014-01-12 15:47:28
         compiled from "/var/www/bablast/assets/template/templates/template/create_new.tpl" */ ?>
<?php /*%%SmartyHeaderCode:209474898552d256a0d43099-84590965%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '70680d5e1ede91733a28e581e10d1afd4a6c22b8' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/template/create_new.tpl',
      1 => 1389516385,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '209474898552d256a0d43099-84590965',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'lang' => 0,
    'assets_url' => 0,
    'site_url' => 0,
    'base_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52d256a0dad7f8_26054207',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52d256a0dad7f8_26054207')) {function content_52d256a0dad7f8_26054207($_smarty_tpl) {?><section class="scrollable wrapper"> 
    <section class="panel"> 
<div class="tab-content"> 

    <section class="tab-pane active" id="basic"> 

<form name="multiform" id="multiform" action="save" class="form-horizontal" method="post" data-validate="parsley" enctype="multipart/form-data"> 

<div class="form-group m-t-lg"> 
<label class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][2];?>


</label> 

<div class="col-sm-4 media m-t-none"> 

<div class="bg-light pull-left text-center media-lg thumb-lg padder-v"><i class="icon-user inline icon-light icon-3x m-t-lg m-b-lg"></i>
</div> 

<div class="media-body"> 
<input id="photo" type="file" name="photo" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['general'][1];?>
" class="btn btn-sm btn-info m-b-sm">
<br> <button class="btn btn-sm btn-default"><?php echo $_smarty_tpl->tpl_vars['lang']->value['general'][2];?>
</button> 
</div> 
</div> 
</div> 

<div class="form-group"> 
<label class="col-sm-3 control-label">Email
</label> 

<div class="col-sm-4"> 
<input type="text" name="email" class="bg-focus form-control parsley-validated" data-required="true" data-type="email"> 
</div> 
</div> 


<div class="form-group"> 
<label class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][3];?>

</label> 

<div class="col-sm-4"> 
<input type="text" name="name" placeholder="Username" class="form-control parsley-validated"> 
</div> 
</div> 





<div class="form-group"> 
<label class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][4];?>

</label> 

    <div class="col-sm-4"> 
    <div id="combox"> </div> 
    </div> 
</div> 





<div class="form-group"> 
<label class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][5];?>

</label> 

<div class="col-sm-5"> 
<textarea name="notes" placeholder="Notes" rows="5" data-trigger="keyup" data-rangelength="[2,200]" class="form-control parsley-validated"></textarea> 

<div class="checkbox"> 
<label> 
<input name="agree" type="checkbox" data-required="true"> <?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][6];?>
 
</label> 
</div> 
</div> 
</div> 

<div class="form-group"> 

<div class="col-sm-4 col-sm-offset-3"> 
    <button type="submit" class="btn btn-white"><?php echo $_smarty_tpl->tpl_vars['lang']->value['general'][3];?>
 </button> 
    <button type="submit" class="btn btn-primary"><?php echo $_smarty_tpl->tpl_vars['lang']->value['general'][4];?>
</button> 
</div> 
</div> 
</form> 
    
    </section>


</div> 
</section>
</section>
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/jquery-1.10.2.min.js"></script> 
<script type='text/javascript'>
    
       $( document ).ready(function() {
       //load combox campaign
        $.ajax({
                        url: '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/loader/combox/contact_group/true',
			type: "GET",
                        cache: false,
			processData:false,
			success: function(data, textStatus, jqXHR)
                        {
                            console.log(data)
                            $('#combox').html(data);
                        },
		  	error: function(jqXHR, textStatus, errorThrown) 
                        {
                            $('#combox').html(jqXHR);
                        }    
	   });   
    });
    
    /* attach a submit handler to the form */
    $("#multiform").submit(function(event) {

      /* stop form from submitting normally */
      event.preventDefault();

      /* get some values from elements on the page: */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post */
      var formData = new FormData(this);
        
        if ( $(this).parsley('validate') ) {
            $.ajax({
                        url: url,
			type: "POST",
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
                        cache: false,
			processData:false,
			success: function(data, textStatus, jqXHR)
                        {
                             var obj = jQuery.parseJSON(data);
                             $('#alert').append(obj.msg);
                             
                             $("#photo").val("");
                             $(':input','#multiform')
                                .not(':button, :file, :submit, :reset, :hidden')
                                .val('')
                                .removeAttr('checked')
                                .removeAttr('selected');
                        },
		  	error: function(jqXHR, textStatus, errorThrown) 
                        {
                            $('#alert').append(data);
                        }    
	   });   
        }
           

    });
    
    
    

</script>
<script src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
assets/js/parsley.js"></script> <?php }} ?>
