<?php /* Smarty version Smarty-3.1.15, created on 2014-03-18 09:36:16
         compiled from "/var/www/testing/adminpanelci//assets/template/templates/dashboard.tpl" */ ?>
<?php /*%%SmartyHeaderCode:558622964532324f4623284-70705691%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '739aba917148f45a0f5a4731a2e1459bac7d0743' => 
    array (
      0 => '/var/www/testing/adminpanelci//assets/template/templates/dashboard.tpl',
      1 => 1395110174,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '558622964532324f4623284-70705691',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_532324f465ee55_33161268',
  'variables' => 
  array (
    'site_url' => 0,
    'base_url' => 0,
    'assets_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_532324f465ee55_33161268')) {function content_532324f465ee55_33161268($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Login Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <style type="text/css">
    p {
        margin:5px;
    }
    .settings {
        background-image:url(../assets/icons/fam/folder_wrench.png);
    }
    .nav {
        background-image:url(../assets/icons/fam/folder_go.png);
    }
    .info {
        background-image:url(../assets/icons/fam/information.png);
    }
    .icon-folder {
    background: url('http://icons.iconarchive.com/icons/sekkyumu/developpers/16/Play-Green-Button-icon.png') no-repeat center center !important;
    }
   
    </style>

    <script type="text/javascript">
    var SITE_URL = '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/';
    var BASE_URL='<?php echo $_smarty_tpl->tpl_vars['base_url']->value;?>
';
    </script>

    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-all.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/ext-theme-neptune.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/SearchField4.js'></script>
    <script src='<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/js/app/menu_grid.js'></script>

    <link href="<?php echo $_smarty_tpl->tpl_vars['assets_url']->value;?>
/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
</head>
<body>
<script type="text/javascript">
    Ext.require(['*']);

    Ext.onReady(function() {

        Ext.QuickTips.init();

        // NOTE: This is an example showing simple state management. During development,
        // it is generally best to disable state management as dynamically-generated ids
        // can change across page loads, leading to unpredictable results.  The developer
        // should ensure that stable state ids are set for stateful components in real apps.
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));



       //  var dynamicPanel = new Ext.Component({
       //   loader: {
       //     /*load contents from this url*/
       //    url: 'http://it.wikipedia.org/wiki/Robot',
       //    renderer: 'html',
       //    autoLoad: true,
       //    scripts: true
       //    }
       // });

        var tabPanel = Ext.create('Ext.tab.Panel', {
                region: 'center', // a center region is ALWAYS required for border layout
                deferredRender: false,                
                activeTab: 0,     // first tab initially active
                items: [{
                     id:'tabcontent',
                    contentEl: 'center2',
                    title: 'Close Me',
                    closable: true
                }]
            });

        // tab generation code
        // var index = 0;
        // while(index < 3){
        //     addTab(index % 2);
        // }

        function addTab (src) {
            var index = Ext.id();
            tabPanel.add({
                layout:'fit',
                title: 'New Tab ' + index,
                iconCls: 'tabs',
                // html: '<iframe  width ="100%" height="100%" id="myIframe" src="'+src+'"></iframe>',
                items: [grid],
                closable : true
            }).show();
             var w = Ext.getCmp('south-panel');
             // w.show();
             // w.expand();
        }

        var navtree = Ext.create('Ext.tree.Panel', {
            id: 'usersTreePanel',
            // title: 'Admin Control Panel',
            autoHeight: true,
            width: 300,
            store: new Ext.data.TreeStore({
                    proxy: {
                        type: 'ajax',
                        url: '<?php echo $_smarty_tpl->tpl_vars['site_url']->value;?>
/dashboard/getTreeMenu'
                    },
                    root: {
                        text: 'Ext JS',
                        id: '0',
                        expanded: true
                    },
                    folderSort: true,
                    sorters: [{
                        property: 'text',
                        direction: 'ASC'
                    }]

                })
            ,listeners: {
            itemclick: {
                fn: function (view, record, item, index, e) {
                    console.log(record);
                    // Ext.getCmp('center1content').add(dynamicPanel);
                    addTab('http://gizmodo.com');

                  }
              }
          }
            ,rootVisible: false
        });

        var rTabPanel = Ext.create('Ext.tab.Panel', {
              hidden:true,
               id:'rTabPanel',
                xtype: 'tabpanel',
                region: 'east',
                title: 'East Side',
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [ '->', {
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
                    html:'<p>north - generally for header, menus, toolbars and/or advertisements</p>'
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
            }, rTabPanel, {
                region: 'west',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'West',
                split: true,
                width: 300,
                minWidth: 175,
                maxWidth: 400,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
                layout: 'accordion',
                items: [{
                    // contentEl: 'west',
                    items :[navtree],
                    autoScroll: true,
                    title: 'Karyawan',
                    iconCls: 'nav' // see the HEAD section for style used
                }, {
                    title: 'Personalia',
                    html: '<p>Some settings in here.</p>',
                    iconCls: 'info'
                }, {
                    title: 'Penggajian',
                    html: '<p>Some settings in here.</p>',
                    iconCls: 'info'
                }, {
                    title: 'Laporan',
                    html: '<p>Some info in here.</p>',
                    iconCls: 'info'
                }, {
                    title: 'Master Data',
                    html: '<p>Some info in here.</p>',
                    iconCls: 'settings'
                }, {
                    title: 'Pengaturan',
                    html: '<p>Some info in here.</p>',
                    iconCls: 'settings'
                }]
            },
            // in this instance the TabPanel is not wrapped by another panel
            // since no title is needed, this Panel is added directly
            // as a Container
            tabPanel]
        });
        // get a reference to the HTML element with id "hideit" and add a click listener to it
        Ext.get("hideit").on('click', function(){

            // get a reference to the Panel that was created with id = 'west-panel'
            var w = Ext.getCmp('rTabPanel');
            // expand or collapse that Panel based on its collapsed property state
            w.collapsed ? w.expand() : w.collapse();
        });
    });
    </script>





      <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="west" class="x-hide-display">
        <p>Hi. I'm the west panel.</p>
    </div>
    <div id="center2" class="x-hide-display">
        <a id="hideit" href="#">Toggle the west region</a>
        <p>My closable attribute is set to false so you can't close me. The other center panels can be closed.</p>
        <p>The center panel automatically grows to fit the remaining space in the container that isn't taken up by the border regions.</p>
      
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
