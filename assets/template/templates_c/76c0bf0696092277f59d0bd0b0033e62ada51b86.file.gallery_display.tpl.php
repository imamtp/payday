<?php /* Smarty version Smarty-3.1.15, created on 2014-01-13 05:21:38
         compiled from "/var/www/bablast/assets/template/templates/template/gallery_display.tpl" */ ?>
<?php /*%%SmartyHeaderCode:22528785152d24592b3eac5-07326472%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '76c0bf0696092277f59d0bd0b0033e62ada51b86' => 
    array (
      0 => '/var/www/bablast/assets/template/templates/template/gallery_display.tpl',
      1 => 1389565296,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '22528785152d24592b3eac5-07326472',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_52d24592bf2b49_19706619',
  'variables' => 
  array (
    'template' => 0,
    'base_url' => 0,
    'r' => 0,
    'site_url' => 0,
    'assets_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52d24592bf2b49_19706619')) {function content_52d24592bf2b49_19706619($_smarty_tpl) {?><style>
.grid {
    padding: 20px 20px 100px 20px;
    max-width: 1300px;
    margin: 0 auto;
    list-style: none;
    text-align: center;
    position: inherit;
}
 
.grid li {
    display: inline-block;
    width: 215px;
    margin: 0;
    padding: 20px;
    text-align: left;
    position: relative;
}

.grid figure {
    margin: 0;
    position: fixed;
}
.grid figure img {
    max-width: 100%;

    position: relative;
}
.grid figcaption {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    background: #2c3f52;
    color: #ed4e6e;
}
.grid figcaption h3 {
    margin: 0;
    padding: 0;
    color: #fff;
}
 
.grid figcaption span:before {
    content: 'by ';
}
 
.grid figcaption a {
    text-align: center;
    padding: 5px 10px;
    border-radius: 2px;
    display: inline-block;
    background: #ed4e6e;
    color: #fff;
}

.tblpreview {
    width:84px;

    background: #ed4e6e;
    color: #fff;
}
.tbluse {
    width:84px;

    background: #ed4e6e;
    color: #fff;
}

@media screen and (max-width: 31.5em) {
    .grid {
        padding: 10px 10px 100px 10px;
    }
    .grid li {
        width: 100%;
        min-width: 300px;
    }
}

.cs-style-1 figcaption {
    height: 100%;
    width: 100%;
    opacity: 0;
    text-align: center;
    backface-visibility: hidden;
    transition: transform 0.3s, opacity 0.3s;
}


/* Caption Style 6 */
.cs-style-6 figure img {
	z-index: 10;
	-webkit-transition: -webkit-transform 0.4s;
	-moz-transition: -moz-transform 0.4s;
	transition: transform 0.4s;
}

.no-touch .cs-style-6 figure:hover img,
.cs-style-6 figure.cs-hover img {
	-webkit-transform: translateY(-50px) scale(0.5);
	-moz-transform: translateY(-50px) scale(0.5);
	-ms-transform: translateY(-50px) scale(0.5);
	transform: translateY(-50px) scale(0.5);
}

.cs-style-6 figcaption {
	height: 100%;
	width: 100%;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
}

.cs-style-6 figcaption h3 {
	margin-top: 80%;
}

                        </style>
                       
<ul class="grid cs-style-6">
     <?php  $_smarty_tpl->tpl_vars['r'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['r']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['template']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['r']->key => $_smarty_tpl->tpl_vars['r']->value) {
$_smarty_tpl->tpl_vars['r']->_loop = true;
?>
    <li>
        <figure>
            <img src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/template/thumb/<?php echo $_smarty_tpl->tpl_vars['r']->value->image;?>
" width="215" alt="img01">
            <figcaption>
                <h3><?php echo $_smarty_tpl->tpl_vars['r']->value->template_name;?>
</h3>
                <a class="tblpreview nyroModal" href="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/template/preview/<?php echo $_smarty_tpl->tpl_vars['r']->value->template_master_id;?>
">Preview</a> 
                <a class="tbluse" href="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/template/use/<?php echo $_smarty_tpl->tpl_vars['r']->value->template_master_id;?>
">Use</a>
            </figcaption>
        </figure>
    </li>
    <?php } ?>
</ul>
      


<script src="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/jquery-1.10.2.min.js"></script> 
<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/assets/js/modal/styles/nyroModal.css" type="text/css" media="screen" />

<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/assets/js/modal/js/jquery.nyroModal.custom.js"></script>

<!--[if IE 6]>
	<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/assets/js/modal/js/jquery.nyroModal-ie6.min.js"></script>
<![endif]-->

<script type='text/javascript'>
    
$(function() {
  $('.nyroModal').nyroModal();
});

       $( document ).ready(function() {
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
