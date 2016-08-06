<?php /* Smarty version Smarty-3.1.15, created on 2014-08-06 08:37:06
         compiled from "/var/www/hrdpay//assets/template/templates/dashboard.tpl" */ ?>
<?php /*%%SmartyHeaderCode:120876137053389aea0b77b2-99042912%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '4194cc069b19d72aafe358659d8e81b364472094' => 
    array (
      0 => '/var/www/hrdpay//assets/template/templates/dashboard.tpl',
      1 => 1407289007,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '120876137053389aea0b77b2-99042912',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_53389aea13d154_70190558',
  'variables' => 
  array (
    'assets_url' => 0,
    'site_url' => 0,
    'base_url' => 0,
    'username' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53389aea13d154_70190558')) {function content_53389aea13d154_70190558($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Payroll Automation System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/css/icons.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/TabScrollerMenu.css" />
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
                    var BASE_URL = '<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
';
                    var pegawainid;
                    var curnipeg = '';        </script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-all.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-theme-neptune.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/SearchField4.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/TabScrollerMenu.js'></script>
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
/js/app/master/ms_tjabfungsional.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tjabstruktural.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_jabatankso.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_anggaranksodetail.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_anggarankso.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_region.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tjurdik.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tkawin.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tunjanganstruktural.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_tunjanganfungsional.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/master/ms_jenispembayaran.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/penggajian_main.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/slipgajigrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/prosesThr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/hapusGaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/penggajian_kso.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/DNDstopgaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/DNDlanjutgaji.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/gridpayrollbank.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridlembur.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridcuti.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridskpp.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridDNDmutasi.js'></script>


        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapkaryawan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapdekom.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapdekomtransport.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapdireksi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekaptugaskarya.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekappkwt.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekappkwthpi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapcuti.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapthr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapcutitahunan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekappulsa.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekaptransportasi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapiuranpensiun.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapbprp.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapjamsostek.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapbpjs.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapskpp.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekaplembur.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapksogaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapksojamsostek.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapksopesangon.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapksopph.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekapdireksioperasional.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekaporganik.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekappphpkwt.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekappphhpi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/laporan/rekaptugaskaryaoperasional.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/organisasi2.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/pengaturan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/manajemen_user.js'></script>
        <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
    </head>
    <body>

        <script type="text/javascript">
                    Ext.require(['*']);
                    var windowH = Ext.getBody().getViewSize().height;
                    if (windowH <= 682)
                    {
                    //laptop 14'
                    var sizeH = windowH - 100;
                    } else if (windowH > 682) {
                    //desktop
                    var sizeH = windowH - 200;
                    }

            Ext.onReady(function() {

            Ext.QuickTips.init();
                    // NOTE: This is an example showing simple state management. During development,
                    // it is generally best to disable state management as dynamically-generated ids
                    // can change across page loads, leading to unpredictable results.  The developer
                    // should ensure that stable state ids are set for stateful components in real apps.
                    // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));


                    //  var dynamicPanel = new Ext.Component({
                    //   loader: {
                    //     /*load contents from this url*/
                    //    url: 'http://it.wikipedia.org/wiki/Robot',
                    //    renderer: 'html',
                    //    autoLoad: true,
                    //    scripts: true
                    //    }
                    // });

                    // var tabPanel = Ext.create('Ext.tab.Panel', {
                    //         region: 'center', // a center region is ALWAYS required for border layout
                    //         deferredRender: false,                
                    //         activeTab: 0,     // first tab initially active
                    //         items: [{
                    //              id:'tabcontent',
                    //             contentEl: 'center2',
                    //             title: 'Close Me',
                    //             closable: true
                    //         }],
                    //         closeAction:'hide'
                    //     });

                    // tab generation code
                    // var index = 0;
                    // while(index < 3){
                    //     addTab(index % 2);
                    // }

                    // function addTab (src) {
                    //     var index = Ext.id();
                    //     tabPanel.add({
                    //         layout:'fit',
                    //         title: 'New Tab ' + index,
                    //         iconCls: 'tabs',
                    //         // html: '<iframe  width ="100%" height="100%" id="myIframe" src="'+src+'"></iframe>',
                    //         items: [grid],
                    //         closable : true,
                    //         closeAction:'hide'
                    //     }).show();
                    //      var w = Ext.getCmp('south-panel');
                    //      // w.show();
                    //      // w.expand();
                    // }



                    var rTabPanel = Ext.create('Ext.tab.Panel', {
                    hidden: true,
                            id: 'rTabPanel',
                            xtype: 'tabpanel',
                            region: 'east',
                            title: 'East Side',
                            dockedItems: [{
                            dock: 'top',
                                    xtype: 'toolbar',
                                    items: ['->', {
                                    xtype: 'button',
                                            text: 'test',
                                            tooltip: 'Test Button'
                                    }]
                            }],
                            animCollapse: true,
                            collapsible: true,
                            split: true,
                            width: 225, // give east and west regions a width
                            minSize: 175,
                            maxSize: 400,
                            margins: '0 5 0 0',
                            activeTab: 1,
                            tabPosition: 'bottom',
                            items: [{
                            html: '<p>A TabPanel component can be a region.</p>',
                                    title: 'A Tab',
                                    autoScroll: true
                            }, Ext.create('Ext.grid.PropertyGrid', {
                            title: 'Property Grid',
                                    closable: true,
                                    source: {
                                    "(name)": "Properties Grid",
                                            "grouping": false,
                                            "autoFitColumns": true,
                                            "productionQuality": false,
                                            "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                                            "tested": false,
                                            "version": 0.01,
                                            "borderWidth": 1
                                    }
                            })]
                    });
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
                                                    html: "<img src=<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
images/HP_trans_2.png height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> "
                                            }
                                    }), {
                            // lazily created panel (xtype:'panel' is default)
                            hidden: true,
                                    id: 'south-panel',
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
                            }, rTabPanel, {
                            region: 'west',
                                    stateId: 'navigation-panel',
                                    id: 'west-panel', // see Ext.getCmp() below
                                    title: 'Navigation',
                                    split: true,
                                    width: 300,
                                    minWidth: 175,
                                    maxWidth: 400,
                                    collapsible: true,
                                    animCollapse: true,
                                    margins: '0 0 0 5',
                                    layout: 'accordion',
                                    defaults: {
                                    // closeAction: 'hide',
                                    autoScroll: true
                                            // bodyPadding: 3
                                    }
                            , dockedItems: [
                            {
                            xtype: 'toolbar',
                                    dock: 'bottom',
                                    items: [
                                    {
                                    xtype: 'button',
//                            width:100,
                                            handler: function(button, event) {
                                            expandnav();
                                            },
                                            flex: 1,
                                            text: 'Expand'
                                    }, {
                                    xtype: 'button',
                                            handler: function(button, event) {
                                            collapsenav();
                                            },
                                            flex: 1,
                                            text: 'Collapse'
                                    }, {
                                    xtype: 'button',
                                            handler: function(button, event) {
                                            closeAllTab();
                                            },
                                            flex: 1,
                                            text: 'Close Tab'
                                    }]
                            }],
                                    items: [
                                    {
                                    title: 'Welcome <?php echo $_smarty_tpl->tpl_vars['username']->value;?>
',
                                            items: [treeNavigation]
                                    }
            
                                    // {
                                    //     // contentEl: 'west',
                                    //     items :[treeNavigation],
                                    //     // autoScroll: true,
                                    //     title: 'Karyawan',
                                    //     iconCls: 'karyawan-icon' // see the HEAD section for style used
                                    // }, {
                                    //     title: 'Personalia',
                                    //      items :[treePersonalia],
                                    //     iconCls: 'personalia-icon'
                                    // }, {
                                    //     title: 'Penggajian',
                                    //      items :[treePenggajian],
                                    //     iconCls: 'penggajian-icon'
                                    // }, {
                                    //     title: 'Laporan',
                                    //      items :[treeLaporan],
                                    //     iconCls: 'laporan-icon'
                                    // }, {
                                    //     title: 'Master Data',
                                    //      items :[treeMaster],
                                    //     iconCls: 'masterdata-icon'
                                    // }
            
                                    ]
                            },
                                    // in this instance the TabPanel is not wrapped by another panel
                                    // since no title is needed, this Panel is added directly
                                    // as a Container
                                    tabPanel]
                    });
                    // get a reference to the HTML element with id "hideit" and add a click listener to it
                    Ext.get("hideit").on('click', function() {

            // get a reference to the Panel that was created with id = 'west-panel'
            var w = Ext.getCmp('rTabPanel');
                    // expand or collapse that Panel based on its collapsed property state
                    w.collapsed ? w.expand() : w.collapse();
            });
                    setInterval(updateTime, 1000);
                    Ext.create('Ext.Button', {
                    id: 'timeBtn',
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
            p.cellAttr = 'rowspan="' + this.rowspan + '"';
            }
            var st = record.store;
                    if (st.lastOptions.page != undefined && st.lastOptions.start != undefined && st.lastOptions.limit != undefined) {
            var page = st.lastOptions.page - 1;
                    var limit = st.lastOptions.limit;
                    return limit * page + rowIndex + 1;
            } else {
            return rowIndex + 1;
            }
            }
            });
                    Ext.window.Window.override({
                    animateTarget: Ext.getDoc(), //animate on show/close from top left of document

                            maximize: function() {
                            this.callParent([true]); //animate
                            },
                            restore: function() {
                            this.callParent([true]); //animate
                            }
                    });
            });        </script>



        <style type="text/css"> 
            
        </style>



        <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
        <div id="west" class="x-hide-display">
            <p>Hi. I'm the west panel.</p>
        </div>
        <div id="center2" class="x-hide-display">
            <a id="hideit" href="#">
                <!-- Toggle the west region -->
            </a>

            <iframe id="tree" name="tree" src="<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/dashboard/page"  frameborder="0" marginheight="0" marginwidth="0" width="100%" height=600" scrolling="auto"></iframe> 
            <!--  <p>My closable attribute is set to false so you can't close me. The other center panels can be closed.</p>
             <p>The center panel automatically grows to fit the remaining space in the container that isn't taken up by the border regions.</p> -->

        </div>

        <div id="center1" class="x-hide-display">
            <div id="center1content"> </div>
        </div>

        <div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">
        </div>
        <div id="south" class="x-hide-display">
            <!-- <p>south - generally for informational stuff, also could be for status bar</p> -->
        </div>

        <!--start window pegawai-->
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/comboxpeg.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datakepegawaian.js'></script>
        <script>
                    var FormKepegawaian = Ext.getCmp('FormKepegawaian');        </script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datagaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/dataanak.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datacuti.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/dataistri.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datagrade.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/dataphdp.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datajabatan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datajabatanpkwthpi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datajabatanpkwt.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datajabatankso.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datajabatandireksi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/dataabsensi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datapensiun.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datajamsostek.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datapotongan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/GridRiwayatPotongan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datapembayaran.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/GridRiwayatPembayaran.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/GridRiwayatPembayaranThr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/GridRiwayatPembayaranWinduan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/GridRiwayatCutiTahunan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datardiklat.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/sertifikasi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datartugas.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/rtalenta.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/rgolongan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/rkondite.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/windowkepegawaian.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/disableenabled.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/ms_karyawan_org.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/ms_karyawan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/import_karyawan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/windowOrg.js'></script>
        <script type="text/javascript">
                    var namapegawai = "pegawainama";        </script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/personalia/gridcuti.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/datacuti.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/karyawan/windowKaryawan.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/commonfunc.js'></script>
        <!--end window pegawai-->

    </body>
</html>
<?php }} ?>
