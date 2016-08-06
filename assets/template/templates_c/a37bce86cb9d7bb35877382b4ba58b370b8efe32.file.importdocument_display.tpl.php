<?php /* Smarty version Smarty-3.1.15, created on 2014-01-10 03:55:15
         compiled from "/var/www/bablast/assets/template/templates/contact/importdocument_display.tpl" */ ?>
<?php /*%%SmartyHeaderCode:165363599652c13d9627f240-90784849%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a37bce86cb9d7bb35877382b4ba58b370b8efe32' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/contact/importdocument_display.tpl',
      1 => 1389300913,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '165363599652c13d9627f240-90784849',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52c13d962851c9_88602289',
  'variables' => 
  array (
    'lang' => 0,
    'site_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52c13d962851c9_88602289')) {function content_52c13d962851c9_88602289($_smarty_tpl) {?><section class="scrollable wrapper"> 

<div class="tab-content"> <section class="tab-pane active" id="basic"> 

<form name="multiform" id="multiform" action="contact/save_import_doc" class="form-horizontal" method="post" data-validate="parsley" enctype="multipart/form-data"> 

<div class="form-group"> 
<label class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][16];?>

</label> 

    <div class="col-sm-4"> 
    <div id="combox"> </div> 
    </div> 
</div> 
    
<div class="form-group m-t-lg"> 
    <label class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['lang']->value['contact'][10];?>

    </label> 
    <div class="col-sm-5"> 
        <input type="file" name="docs" data-required="true"/>Supported file type: csv
        <div id="contactError"> </div>
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
    <div id="msg"></div>
</div> 
</div> 
</form> 
    
    </section>


</div> </section>
<script type='text/javascript'>
    
   $( document ).ready(function() {
       //load combox campaign
        $.ajax({
                        url: '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/loader/comboCampaign',
			type: "GET",
                        cache: false,
			processData:false,
			success: function(data, textStatus, jqXHR)
                        {
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
            $('#contactError').html(" ");
            
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
                             $("#msg").html("");
                             
                             var obj = jQuery.parseJSON(data);
                                   if(obj.valid)
                                    {
                                       $('#alert').append(obj.msg);
                                       clearForm();                                      
                                    } else {
                                        $('#msg').append('<center><font color=red>'+obj.msg+'</font></center>');
                                    }
                             
                            
                        },
		  	error: function(jqXHR, textStatus, errorThrown) 
                        {
                            $('#alert').append(data);
                        }    
	   });   
        }
           

    });
</script>
    <?php }} ?>
