<?php /* Smarty version Smarty-3.1.15, created on 2014-08-14 03:44:37
         compiled from "/var/www/hrdpay//assets/template/templates/dashboard_user.tpl" */ ?>
<?php /*%%SmartyHeaderCode:121821631753620fad5cccd8-98569191%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'de8ae8eef9a5f9b3ff9a5dcc81eff382f5bf2c8b' => 
    array (
      0 => '/var/www/hrdpay//assets/template/templates/dashboard_user.tpl',
      1 => 1404709708,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '121821631753620fad5cccd8-98569191',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_53620fad682cb8_26311388',
  'variables' => 
  array (
    'assets_url' => 0,
    'site_url' => 0,
    'base_url' => 0,
    'pegawainid' => 0,
    'username' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53620fad682cb8_26311388')) {function content_53620fad682cb8_26311388($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Payroll Automation System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/css/icons.css" rel="stylesheet">
    <style type="text/css">
    p {
        margin:5px;
    }
    a {
        text-decoration: none;
    }
    body {
        background-color:#b0c4de;
    }
    </style>

    <script type="text/javascript">
        var SITE_URL = '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/';
        var BASE_URL='<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
';
        var pegawainid;
        var curnipeg = '<?php echo $_smarty_tpl->tpl_vars['pegawainid']->value;?>
';
    </script>

    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-all.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-theme-neptune.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/SearchField4.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/combox.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/util.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/penggajian_app.js'></script>

    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/navtree.js'></script>

    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_agama.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_jenispegawai.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_keljab.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tphdp.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_grade.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tbaktif.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_bank.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_golongan.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tgoldarah.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_kelamin.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_trumah.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_jenjang.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_ttunjangankompetensi.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_ttingdik.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tbiddik.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_jenpot.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tkarya.js'></script>

    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/ms_karyawan.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/penggajian_main.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/slipgajigrid.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/gridpayrollbank.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridlembur.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridcuti.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapbulanan.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/organisasi2.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/pengaturan.js'></script>

    <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
</head>
<body>
<script type="text/javascript">
    Ext.require(['*']);

    var windowH = Ext.getBody().getViewSize().height;
    if(windowH<=682)
    {
        //laptop 14'
        var sizeH = windowH-100;
    } else if(windowH>682){
        //desktop
        var sizeH = windowH-200;
    }

    Ext.onReady(function() {

        Ext.QuickTips.init();



        var viewport = Ext.create('Ext.Viewport', {
            id: 'border-example',
            layout: 'border',
            items: [
            // create instance immediately
            Ext.create('Ext.Component', {
                region: 'north',
                height: 62, // give north and south regions a height
                autoEl: {
                    tag: 'div',
                    html:"<img src=<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
images/HP_trans_2.png height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div>"
                }
            }), {
                // lazily created panel (xtype:'panel' is default)
                hidden:true,
                id:'south-panel',
                region: 'south',
                contentEl: 'south',
                split: true,
                height: 100,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                collapsed: true,
                title: 'South',
                margins: '0 0 0 0'
            },
            tabPanel]
        });

       
        setInterval(updateTime, 1000);

        Ext.create('Ext.Button', {
            id:'timeBtn',
            // text: 'Logged as <?php echo $_smarty_tpl->tpl_vars['username']->value;?>
',
            renderTo: 'bloggout'
        });

        Ext.create('Ext.Button', {
            text: 'Logged as <?php echo $_smarty_tpl->tpl_vars['username']->value;?>
',
            renderTo: 'bloggout'
        });

         Ext.create('Ext.Button', {
            text: 'Logout',
            renderTo: 'bloggout',
            handler: function() {
                 window.location.href = 'dashboard/logout';
            }
        });
         

         Ext.override(Ext.grid.RowNumberer, {
            renderer: function(v, p, record, rowIndex) {
                if (this.rowspan) {
                    p.cellAttr = 'rowspan="'+this.rowspan+'"';
                }
                var st = record.store;

                if (st.lastOptions.page != undefined && st.lastOptions.start != undefined && st.lastOptions.limit != undefined) {
                    var page = st.lastOptions.page - 1;
                    var limit = st.lastOptions.limit;
                    return limit*page + rowIndex+1;
                } else {
                    return rowIndex+1;
                }
            }
        });

        Ext.window.Window.override({

          animateTarget: Ext.getDoc(), //animate on show/close from top left of document
          
          maximize: function(){
            this.callParent([true]); //animate
          },

          restore: function(){
            this.callParent([true]); //animate
          }  
        });

       


    });
    </script>


<style type="text/css"> 
html { overflow: auto; } 
html, body, div, iframe { margin: 0px; padding: 0px; height: 100%; border: none; } 
iframe { display: block; width: 100%; border: none; overflow-y: auto; overflow-x: hidden; } 
</style>



      <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="west" class="x-hide-display">
        <p>Hi. I'm the west panel.</p>
    </div>
    <div id="center2" class="x-hide-display">
      
      <iframe id="tree" name="tree" src="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/karyawan/windowKaryawan/<?php echo $_smarty_tpl->tpl_vars['pegawainid']->value;?>
" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%" scrolling="auto"></iframe> 
    </div>
    
    <div id="center1" class="x-hide-display">
        <div id="center1content"> </div>
    </div>

    <div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">
    </div>
    <div id="south" class="x-hide-display">
        <p>south - generally for informational stuff, also could be for status bar</p>
    </div>
</body>
</html>
<?php }} ?>
