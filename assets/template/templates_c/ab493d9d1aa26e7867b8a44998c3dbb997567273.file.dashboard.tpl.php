<?php /* Smarty version Smarty-3.1.15, created on 2015-05-06 11:38:19
         compiled from "C:\xampp\htdocs\natadaya\\assets\template\templates\dashboard.tpl" */ ?>
<?php /*%%SmartyHeaderCode:141275549e10b5183a5-85898002%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ab493d9d1aa26e7867b8a44998c3dbb997567273' => 
    array (
      0 => 'C:\\xampp\\htdocs\\natadaya\\\\assets\\template\\templates\\dashboard.tpl',
      1 => 1430905052,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '141275549e10b5183a5-85898002',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'assets_url' => 0,
    'site_url' => 0,
    'base_url' => 0,
    'unit' => 0,
    'idunit' => 0,
    'idcompany' => 0,
    'group_id' => 0,
    'logoheader' => 0,
    'companyname' => 0,
    'username' => 0,
    'periode' => 0,
    'usergroup' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_5549e10b6f55e7_58262817',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5549e10b6f55e7_58262817')) {function content_5549e10b6f55e7_58262817($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Natadaya HRIS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/css/icons.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/TabScrollerMenu.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/css/offline-theme-slide.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/css/offline-language-english-indicator.css" />
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
            .child-row .x-grid-cell { 
                background-color: #ffe2e2; 
                color: #900; 
            } 

            .adult-row .x-grid-cell { 
                background-color: #e2ffe2; 
                color: #090; 
            }

            .journal-row .x-grid-cell { 
                background-color: #f6f7ff; 

            }
        </style>

        <script type="text/javascript">
            var SITE_URL = '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
';
            var BASE_URL = '<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
';
            var pegawainid;
            var curnipeg = '';
            var namaunit = '<?php echo $_smarty_tpl->tpl_vars['unit']->value;?>
';
            var idunit = '<?php echo $_smarty_tpl->tpl_vars['idunit']->value;?>
';
            var idcompany = '<?php echo $_smarty_tpl->tpl_vars['idcompany']->value;?>
';
            var group_id = '<?php echo $_smarty_tpl->tpl_vars['group_id']->value;?>
';
            var logoheader = '<?php echo $_smarty_tpl->tpl_vars['logoheader']->value;?>
';
            var companyname = '<?php echo $_smarty_tpl->tpl_vars['companyname']->value;?>
';
        </script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-all.js'></script>
        <!--  -->
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-theme-neptune.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/SearchField4.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/TabScrollerMenu.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/form/ItemSelector.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/form/MultiSelect.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/layout/component/form/ItemSelector.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/layout/component/form/MultiSelect.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/combox.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/util.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/offline.min.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/NumericField.js'></script>


        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/pengaturan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/UserManagement.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/accountList.js'></script>

        
        

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/navtree.js'></script>
        <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
            <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/src/ux/css/ItemSelector.css" rel="stylesheet">
    </head>
    <body>

        <script type="text/javascript">

            // Offline.options({
            //   checkOnLoad: false,
            //   interceptRequests: true,
            //   reconnect: {
            //     initialDelay: 1
            //   },
            //   requests: true,
            //   game: (false)
            // });
            

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

            var heightPort = (windowH*1)/(2*1)-90*1;
            // console.log(heightPort)

            var panelHeight =  Ext.getBody().getViewSize().height*0.7;
            // alert(panelHeight);
            Ext.onReady(function() {


                

                Ext.QuickTips.init();
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
                
                if(logoheader=='')
                {
                    var htmlHeader = "&nbsp;&nbsp;<font style='font-size:22px;color:#FFFFF0;'>"+companyname+"</font><div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> ";
                } else {
                    var htmlHeader = "&nbsp;&nbsp;<img src=<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
/upload/<?php echo $_smarty_tpl->tpl_vars['logoheader']->value;?>
 height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> ";
                }
                
                var viewport = Ext.create('Ext.Viewport', {
                    id: 'border-example',
                    layout: 'border',
                    items: [
                        // create instance immediately
                        Ext.create('Ext.Component', {
                            region: 'north',
                            // tbar:menu,
                            height: 62, // give north and south regions a height
                            autoEl: {
                                tag: 'div',
                                html: htmlHeader
                            }
                        }),
                         {
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
                            width: 270,
                            minWidth: 172,
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
                                }]
                        },
                        tabPanel]
                });

                // get a reference to the HTML element with id "hideit" and add a click listener to it
                Ext.get("hideit").on('click', function() {

                    // get a reference to the Panel that was created with id = 'west-panel'
                    var w = Ext.getCmp('rTabPanel');
                    // expand or collapse that Panel based on its collapsed property state
                    w.collapsed ? w.expand() : w.collapse();
                });


//setInterval(updateTime, 1000);

                var periode = '<?php echo $_smarty_tpl->tpl_vars['periode']->value;?>
';
                var usergroup = '<?php echo $_smarty_tpl->tpl_vars['usergroup']->value;?>
';
                console.log('periode'+periode);
                if(periode!='' && usergroup!='Administrator')
                {
                    Ext.create('Ext.Button', {
                        id:'periodeBtn',
                        text: 'Periode: <?php echo $_smarty_tpl->tpl_vars['periode']->value;?>
',
                        renderTo: 'bloggout'
                    });
                }
                
                Ext.create('Ext.Button', {
                    text: 'Logged as <?php echo $_smarty_tpl->tpl_vars['username']->value;?>
',
                    renderTo: 'bloggout'
                });

             

                Ext.create('Ext.Button', {
                    id: 'timeBtn',
                    text: usergroup,
                    renderTo: 'bloggout'
                });

                var unit = '<?php echo $_smarty_tpl->tpl_vars['unit']->value;?>
';
                if (unit != '')
                {
                    Ext.create('Ext.Button', {
                        text: '<?php echo $_smarty_tpl->tpl_vars['unit']->value;?>
',
                        renderTo: 'bloggout'
                    });
                }

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
            });
</script>



        <style type="text/css"> 
           /* */
        </style>



        <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
        <div id="west" class="x-hide-display">
            <p>Hi. I'm the west panel.</p>
        </div>
        <div id="center2" class="x-hide-display">
            <a id="hideit" href="#">
                <!-- Toggle the west region -->
            </a>

           <!--   -->
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

        <!-- // <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/app/account/treeAccount.js'></script> -->
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/siswa/ImportDataSiswa.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/siswaGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/pelangganGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/supplierGrid.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/app/account/treeAccount2.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/app/account/accListAkunInduk.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/app/account/gridAccount.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
js/app/hutangpiutang/regPiutang.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/company.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/companyUnit.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/setupCompanyTab.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/references/refTambahanGaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/references/refTunjanganType.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/references/refPotonganType.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/references/refCatInventory.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/MenuIndukListPopup.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/AccKasListPayroll.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/AccListPayroll.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/AccListThr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/employeetype.js'></script>  
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/GridTreeAccUnitSetup.js'></script> 
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/linkedacc.js'></script>     
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/linkedacc2.js'></script>  
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/accountListCollected.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/accountListPaid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/taxcode.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/entryOpeningBalance.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/linkpiutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/AccListInsuranceEmpSetup.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/AccListInsuranceCmpSetup.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/popupSupplierOpeningHutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/formRegHutangOpening.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/entryOpeningHutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/formRegPiutangOpening.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/entryOpeningPiutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/AccListInventoryOpening.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/formRegPersediaanOpening.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/entryOpeningPersediaan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/SetupUnitInsurance.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/setup/supplierInvOpeningPopup.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/accListInventory.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryProfileForm.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryBuyForm.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventorySellForm.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryInvForm.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryHistory.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/formInventoryV2.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/formInventoryV2.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/GridAccInventory.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/GridDepresiasiInventoryTab.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryWindow.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/func.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryAllGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryInvGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryBuyGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventorySellGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryTab.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/treeAddRowAdj.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/gridAddRowAdj.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/formaddrowAdj.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/gridHistoryAdj.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/inventoryTabAdj.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/inventory/entryAdj.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/supplier/formInventorySupplier.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/supplier/GridInventorySupplier.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/AccList.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/formaddrow.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/formRecurring.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/gridRecurringPopup.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/gridRecurringDetail.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/formRecurringDetail.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/gridRecurring.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/gridJournalTransDisburs.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/gridJournalTransGeneral.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/tabJournalTransaction.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/jurnal/entry.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/hutangpiutang/popupPelangganPiutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/hutangpiutang/popupSupplierHutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/hutangpiutang/formPembayaranHutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/hutangpiutang/gridHutangLain.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/hutangpiutang/gridHutangPurchase.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/model.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/addressPopUp.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/gridItemPopUp.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/wSelectAccListAssetPurchase.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/accListPurchase.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/accListPayment.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/entry.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/entryPayment.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/gridPurchaseAll.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/gridReturn.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/TabReturn.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/gridPaymentHistory.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/gridDebt.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/TabTransPurchase.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/acclistReturn.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/formaddrowReturn.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/purchase/entryReturn.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/hutangpiutang/RegHutang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridReceiveMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/AccListAddRowReceive.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/formaddrowReceive.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/accListReceive.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/entryReceiveMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabReceiveMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/transferKasForm.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridTransferMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/SiswaListAddRowReceiveSiswa.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/AccListAddRowReceiveSiswa.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/formaddrowReceiveSiswa.js'></script> 
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/accListReceiveSiswa.js'></script>  
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridReceiveMoneySiswa.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/entryReceiveMoneySiswa.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabReceiveMoneySiswa.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/AccListAddRowImportReceive.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/importReceiveMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridImportReceiveMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabImportReceiveMoney.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/AccListAddRowImportSpend.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/importSpendMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridImportSpendMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabImportSpendMoney.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridSpendMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/AccListAddRowSpend.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/formaddrowSpend.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/accListSpend.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/entrySpendMoney.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabSpendMoney.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/accListReconcile.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/accListReconcileEntryBank.js'></script>   
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/accListReconcileOther.js'></script> 
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/formaddrowReconcile.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/formaddrowReconcileOther.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/gridReconcile.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/entryReconcile.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabReconcile.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/money/TabTransferMoney.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/importDataPotongan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/importDataTunjangan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/gridAsuransiPopup.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/sutriGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/anakGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/dataGaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/tunjanganGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/potonganGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/asuransiEmpGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/payrollHistoryGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/TambahanGaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/employeeGrid.js'></script>        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/employee/dataTHRGrid.js'></script>  
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/PilihPegawaiThr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/ProsesThr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/TunjanganPayroll.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/PotonganPayroll.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/PilihPegawaiPayroll.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/prosesGaji2.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/prosesGaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/dataGajiGrid.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/penggajian/dataPayroll.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/clossing/clossingFormMonth.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/clossing/clossingFormYear.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/neraca.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/labarugi.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/generalledger.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/jurnalumum.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/kaskeluar.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/kasmasuk.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/neracasaldo.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/daftarbarang.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/barangdibeli.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/daftarakun.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/aruskas.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekapgaji.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekappremikaryawan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekappremiperusahaan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekapph21.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekapthr.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekaptunjangankaryawan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penggajian/rekappotongankaryawan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penerimaansiswabulanan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/penerimaantahunan.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/report/pengeluarantahunan.js'></script>
                     
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/editRules.js'></script> 
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/sysMenuTree.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/sysGroupMenuAkses.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/gridRules.js'></script>   
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/portGroupAkses.js'></script>
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/sistem/SysGroup.js'></script>   
          
                        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/siswa/pembayaranGrid.js'></script>
        
        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/customerGrid.js'></script>

        <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/commonfunc.js'></script>


    </body>
</html>
<?php }} ?>
