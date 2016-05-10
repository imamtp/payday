Ext.define('sysMenuTreeIndukModel', {
    extend: 'Ext.data.Model',
    fields: ['text', 'id', 'menu_link', 'parent', 'menuinduk', 'sys_menu_id_induk', 'sort', 'icon', 'description', 'leaf']
});
var storeSysMenuInduk = new Ext.data.TreeStore({
    model: 'sysMenuTreeIndukModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'sistem/sysmenudata/0'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    },
    autoload: false
});
Ext.define('GridTreeSysMenuInduk', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeSysMenuInduk',
    id: 'GridTreeSysMenuInduk',
    xtype: 'tree-grid',
    //    title: 'Hak Akses Menu',
    height: 500,
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
            fn: function(grid) {}
        }
    },
    viewConfig: {
        //        stripeRows: false, 
        getRowClass: function(record) {
            //            if (record.get('active') == 't')
            //            {
            //                return 'null';
            //            } else if (record.get('active') == 'f')
            //            {
            //                return 'child-row';
            //            } else if (record.get('id') == 0)
            //            {
            //                return 'adult-row';
            //            }
        }
    },
    initComponent: function() {
        this.width = 440;
        // this.autoWidth = true;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: storeSysMenuInduk,
            columns: [{
                text: 'Edit',
                width: 45,
                // menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Pilih Menu Ini',
                align: 'center',
                icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
                handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                    console.log(selectedRecord);
                    Ext.getCmp('parentmenu').setValue(selectedRecord.data.id);
                    Ext.getCmp('menuinduk').setValue(selectedRecord.data.text);
                    Ext.getCmp('wSysMenuInduk').hide();
                }
            }, {
                xtype: 'treecolumn',
                text: 'id',
                dataIndex: 'id',
                hidden: true
            }, {
                xtype: 'treecolumn',
                text: 'Menu',
                dataIndex: 'text',
                minWidth: 400
            }],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    // GroupRulesStore.load({
                    //     params: {
                    //         'extraparams': 'a.sys_menu_id:' + record.data.id
                    //     }
                    // });
                    // Ext.getCmp('sys_menu_id_val').setValue(record.data.id);
                }
            },
            dockedItems: [
                //                {
                //                    xtype: 'toolbar',
                //                    items: {
                //                        text: 'Get checked nodes',
                //                        handler: function(){
                //                            var records = Ext.getCmp('GridTreeSysMenuInduk').getView().getChecked(),
                //                                names = [];
                //                            
                //                            Ext.Array.each(records, function(rec){
                //                                names.push(rec.get('id'));
                //                            });
                //                            
                //                            Ext.MessageBox.show({
                //                                title: 'Selected Nodes',
                //                                msg: names.join('<br />'),
                //                                icon: Ext.MessageBox.INFO
                //                            });
                //                        }
                //                    }
                //                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        // itemId: 'reloadDataMenu',
                        text: 'Refresh',
                        iconCls: 'refresh',
                        handler: function() {
                            // var grid = Ext.getCmp('GridTreeSysMenuInduk');
                            // grid.getView().refresh();
                            // storeSysMenuInduk.load({
                            //             params: {
                            //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenuInduk').getValue()
                            //             }
                            //         });
                            // Ext.getCmp('searchMenu').setValue(null)
                            // Ext.getCmp('GridTreeSysMenuInduk').expandAll();
                            storeSysMenuInduk.load();
                        }
                    }]
                }
            ]
        });
        this.callParent();
    }
});
var wSysMenuInduk = Ext.create('widget.window', {
    id: 'wSysMenuInduk',
    title: 'Pilih Menu Induk',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    // minWidth: 450,
    //    height: 350,
    autoHeight: true,
    layout: 'hbox',
    items: [{
        //            height:sizeH-50*1,
        xtype: 'GridTreeSysMenuInduk'
    }]
});