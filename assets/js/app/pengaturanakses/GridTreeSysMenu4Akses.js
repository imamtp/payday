
Ext.define('sysMenuTreeModel4Akses', {
    extend: 'Ext.data.Model',
    fields: [
        'text', 'id', 'menu_link', 'parent','menuinduk','sys_menu_id_induk', 'sort', 'icon', 'description', 'status','leaf'
    ]
});


var storeSysMenu4Akses = new Ext.data.TreeStore({
    model: 'sysMenuTreeModel4Akses',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'sistem/sysmenudata/0'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    }
    , autoload: false
});

Ext.define('GridTreeSysMenu4Akses', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeSysMenu4Akses',
    id: 'GridTreeSysMenu4Akses',
    xtype: 'tree-grid',
    title: 'Menu Aplikasi',
    height: 300,
//    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    loadMask: true,
    enableColumnResize: true,
    rowLines: true,
    listeners: {
        render: {
            scope: this,
            fn: function (grid) {

            }
        }
    },
    viewConfig: {
        //        stripeRows: false, 
        getRowClass: function (record) {
        }
    },
    initComponent: function () {
        this.width = 600;

        Ext.apply(this, {
            store: storeSysMenu4Akses,
            columns: [
                { xtype: 'treecolumn', text: 'id', dataIndex: 'id', hidden: true }
                , { xtype: 'treecolumn', text: 'Nama', dataIndex: 'text', minWidth: 250 }
                , { text: 'menu_link', dataIndex: 'menu_link', hidden: true }
                , { text: 'parent', dataIndex: 'parent', hidden: true }
                , { text: 'Urutan', dataIndex: 'sort', minWidth: 40,sortable: false }
                , { text: 'Deskripsi', dataIndex: 'description', minWidth: 550 }
                , { text: 'Status', dataIndex: 'status', minWidth: 40 }
            ]
            , dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'searchMenu',
                            fieldLabel: 'Pencarian',
                            listeners: {
                                specialkey: function (f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeSysMenu4Akses.load({
                                            params: {
                                                'Menuname': Ext.getCmp('searchMenu').getValue(),
                                                'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenu').getValue()
                                            }
                                        });
                                    }
                                }
                            }
                        }, {
                            //                        itemId: 'reloadDataMenu',
                            text: 'Cari',
                            iconCls: 'search'
                            , handler: function () {
                                storeSysMenu4Akses.load({
                                    params: {
                                        'Menuname': Ext.getCmp('searchMenu').getValue(),
                                    }
                                });
                            }
                        }, {
                            // itemId: 'reloadDataMenu',
                            text: 'Refresh',
                            iconCls: 'refresh',
                            handler: function () {
                                // var grid = Ext.getCmp('GridTreeSysMenu4Akses');
                                // grid.getView().refresh();
                                // storeSysMenu.load({
                                //             params: {
                                //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenu').getValue()
                                //             }
                                //         });
                                // Ext.getCmp('searchMenu').setValue(null)
                                // Ext.getCmp('GridTreeSysMenu4Akses').expandAll();
                                storeSysMenu4Akses.load();
                            }
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});
