
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
        this.width = 500;

        Ext.apply(this, {
            store: storeSysMenu4Akses,
            columns: [
                { xtype: 'treecolumn', text: 'id', dataIndex: 'id', hidden: true }
                , { xtype: 'treecolumn', text: 'Nama', dataIndex: 'text', minWidth: 250,flex:1 }
                , { text: 'menu_link', dataIndex: 'menu_link', hidden: true }
                , { text: 'parent', dataIndex: 'parent', hidden: true }
                , { text: 'Urutan', dataIndex: 'sort', minWidth: 40,sortable: false }
            ]
            , dockedItems: [
                // {
                //     xtype: 'toolbar',
                //     dock: 'top',
                //     items: [
                //         {
                //             xtype: 'textfield',
                //             id: 'searchMenu',
                //             fieldLabel: 'Pencarian',
                //             listeners: {
                //                 specialkey: function (f, e) {
                //                     if (e.getKey() == e.ENTER) {
                //                         storeSysMenu4Akses.load({
                //                             params: {
                //                                 'Menuname': Ext.getCmp('searchMenu').getValue(),
                //                                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenu').getValue()
                //                             }
                //                         });
                //                     }
                //                 }
                //             }
                //         }, {
                //             //                        itemId: 'reloadDataMenu',
                //             text: 'Cari',
                //             iconCls: 'search'
                //             , handler: function () {
                //                 storeSysMenu4Akses.load({
                //                     params: {
                //                         'Menuname': Ext.getCmp('searchMenu').getValue(),
                //                     }
                //                 });
                //             }
                //         }, {
                //             // itemId: 'reloadDataMenu',
                //             text: 'Refresh',
                //             iconCls: 'refresh',
                //             handler: function () {
                //                 // var grid = Ext.getCmp('GridTreeSysMenu4Akses');
                //                 // grid.getView().refresh();
                //                 // storeSysMenu.load({
                //                 //             params: {
                //                 //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenu').getValue()
                //                 //             }
                //                 //         });
                //                 // Ext.getCmp('searchMenu').setValue(null)
                //                 // Ext.getCmp('GridTreeSysMenu4Akses').expandAll();
                //                 storeSysMenu4Akses.load();
                //             }
                //         }
                //     ]
                // }
            ]
        });
        this.callParent();
    }
});


// Ext.define('GridTreeSysGroupAksesMenu', {
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeSysGroupAksesMenu',
//     id: 'GridTreeSysGroupAksesMenu',
//     xtype: 'tree-grid',
//     //    title: 'Hak Akses Menu',
//     height: 500,
//     //    useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     singleExpand: true,
//     loadMask: true,
//     enableColumnResize: true,
//     rowLines: true,
//     listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {}
//         }
//     },
//     viewConfig: {
//         //        stripeRows: false, 
//         getRowClass: function(record) {
//             //            if (record.get('active') == 't')
//             //            {
//             //                return 'null';
//             //            } else if (record.get('active') == 'f')
//             //            {
//             //                return 'child-row';
//             //            } else if (record.get('id') == 0)
//             //            {
//             //                return 'adult-row';
//             //            }
//         }
//     },
//     initComponent: function() {
//         this.width = 760;
//         // this.autoWidth = true;
//         this.cellEditing = new Ext.grid.plugin.CellEditing({
//             clicksToEdit: 1
//         });
//         Ext.apply(this, {
//             plugins: [this.cellEditing],
//             store: storeSysMenu,
//             columns: [{
//                 xtype: 'treecolumn',
//                 text: 'id',
//                 dataIndex: 'id',
//                 hidden: true
//             }, {
//                 xtype: 'treecolumn',
//                 text: 'Menu',
//                 dataIndex: 'text',
//                 minWidth: 400
//             },
//             {
//                 text: 'Hak Akses',
//                 columns: [ 
//                     {
//                         header: 'Lihat',
//                         xtype: 'checkcolumn',
//                         dataIndex: 'akseslihat',
//                         width: 90,
//                         editor: {
//                             xtype: 'checkboxfield',
//                             name: 'akseslihat'
//                         },
//                         listeners: {
//                             checkchange: function(column, recordIndex, checked) {
//                                 alert(checked);
//                                 alert("hi");
//                             }
//                         }
//                     },
//                     {
//                         header: 'Tambah',
//                         xtype: 'checkcolumn',
//                         dataIndex: 'aksestambah',
//                         width: 90,
//                         editor: {
//                             xtype: 'checkboxfield',
//                             name: 'aksestambah'
//                         },
//                         listeners: {
//                             checkchange: function(column, recordIndex, checked) {
//                                 alert(checked);
//                                 alert("hi");
//                             }
//                         }
//                     },
//                     {
//                         header: 'Ubah',
//                         xtype: 'checkcolumn',
//                         dataIndex: 'aksesubah',
//                         width: 90,
//                         editor: {
//                             xtype: 'checkboxfield',
//                             name: 'aksesubah'
//                         },
//                         listeners: {
//                             checkchange: function(column, recordIndex, checked) {
//                                 alert(checked);
//                                 alert("hi");
//                             }
//                         }
//                     },
//                     {
//                         header: 'Hapus',
//                         xtype: 'checkcolumn',
//                         dataIndex: 'aksesubah',
//                         width: 90,
//                         editor: {
//                             xtype: 'checkboxfield',
//                             name: 'aksesubah'
//                         },
//                         listeners: {
//                             checkchange: function(column, recordIndex, checked) {
//                                 alert(checked);
//                                 alert("hi");
//                             }
//                         }
//                     }
//                 ]
//             }],
//             listeners: {
//                 itemclick: function(dv, record, item, index, e) {
//                     GroupRulesStore.load({
//                         params: {
//                             'extraparams': 'a.sys_menu_id:' + record.data.id
//                         }
//                     });
//                     Ext.getCmp('sys_menu_id_val').setValue(record.data.id);
//                 }
//             },
//             dockedItems: [
//                 //                {
//                 //                    xtype: 'toolbar',
//                 //                    items: {
//                 //                        text: 'Get checked nodes',
//                 //                        handler: function(){
//                 //                            var records = Ext.getCmp('GridTreeSysGroupAksesMenu').getView().getChecked(),
//                 //                                names = [];
//                 //                            
//                 //                            Ext.Array.each(records, function(rec){
//                 //                                names.push(rec.get('id'));
//                 //                            });
//                 //                            
//                 //                            Ext.MessageBox.show({
//                 //                                title: 'Selected Nodes',
//                 //                                msg: names.join('<br />'),
//                 //                                icon: Ext.MessageBox.INFO
//                 //                            });
//                 //                        }
//                 //                    }
//                 //                },
//                 {
//                     xtype: 'toolbar',
//                     dock: 'top',
//                     items: [{
//                         // itemId: 'reloadDataMenu',
//                         text: 'Refresh',
//                         iconCls: 'refresh',
//                         handler: function() {
//                             // var grid = Ext.getCmp('GridTreeSysGroupAksesMenu');
//                             // grid.getView().refresh();
//                             // storeSysGroupAksesMenu.load({
//                             //             params: {
//                             //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysGroupAksesMenu').getValue()
//                             //             }
//                             //         });
//                             // Ext.getCmp('searchMenu').setValue(null)
//                             // Ext.getCmp('GridTreeSysGroupAksesMenu').expandAll();
//                             storeSysMenu.load();
//                         }
//                     }]
//                 }
//             ]
//         });
//         this.callParent();
//     }
// });

Ext.define('GridRolesMenuModel', {
    extend: 'Ext.data.Model',
    fields: ['roleid','rolename','status','sys_menu_id'],
    idProperty: 'id'
});

var storeGridRolesMenu = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRolesMenuModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RolesMenu/pengaturanakses',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

Ext.define('GridTreeSysGroupAksesMenu', {
     alias: 'widget.GridTreeSysGroupAksesMenu',
    id: 'GridTreeSysGroupAksesMenu',
    extend: 'Ext.container.Container',
    xtype: 'dd-grid-to-grid',
    width: 950,
    height: 500,
    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },    
    initComponent: function(){
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

         this.items = [
         {
            xtype:'GridTreeSysMenu4Akses',
            margins: '0 5 0 0',
            listeners: {
                    itemclick: function(dv, record, item, index, e) {
                        storeGridRolesMenu.on('beforeload',function(store, operation,eOpts){
                                        operation.params={
                                                    'group_id': Ext.getCmp('sys_group_role').getValue(),
                                                    'sys_menu_id': record.data.id
                                        };
                                    });
                        // console.log(record.data.id);
                        storeGridRolesMenu.load();  

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/getvisible',
                            method: 'POST',
                            params: {
                                visible: this.value,
                                sys_group_role:Ext.getCmp('sys_group_role').getValue(),
                                sys_menu_id:record.data.id
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                Ext.getCmp('visiblemenu').setValue(d.value);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });                            
                    }
                },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'hiddenfield',
                            value:'asdsad'
                        }
                    ]
                }
            ]
         }
        //  {
        //     itemId: 'grid1',
        //     flex: 1,
        //     xtype: 'storeSysMenu4Akses',
        //     multiSelect: true,
        //         viewConfig: {
        //         // plugins: {
        //         //     ptype: 'gridviewdragdrop',
        //         //     dragGroup: group1,
        //         //     dropGroup: group2
        //         // },
        //         listeners: {
        //             // drop: function(node, data, dropRec, dropPosition) {
        //             //     var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
        //             //     Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
        //             // }
        //             itemclick: function(dv, record, item, index, e) {
        //                 storeGridRolesMenu.on('beforeload',function(store, operation,eOpts){
        //                                 operation.params={
        //                                             'group_id': Ext.getCmp('sys_group_role').getValue(),
        //                                             'sys_menu_id': record.data.id
        //                                 };
        //                             });
        //                 // console.log(record.data.id);
        //                 storeGridRolesMenu.load();                              
        //             }
        //         }
        //     },
        //     // store: storeSysMenu,
        //     // columns: [{
        //     //     xtype: 'treecolumn',
        //     //     text: 'id',
        //     //     dataIndex: 'id',
        //     //     hidden: true
        //     // }, {
        //     //     xtype: 'treecolumn',
        //     //     text: 'Menu',
        //     //     dataIndex: 'text',
        //     //     minWidth: 400
        //     // }],
        //     stripeRows: true,
        //     title: 'Daftar Menu',
        //     margins: '0 5 0 0'
        // }
        , {
            itemId: 'grid2',
            plugins: [this.cellEditing],
            listeners : {
                edit : this.recordData
            },
            flex: 1,
            xtype: 'grid',
            viewConfig: {
                // plugins: {
                //     ptype: 'gridviewdragdrop',
                //     dragGroup: group2,
                //     dropGroup: group1
                // },
                // listeners: {
                //     drop: function(node, data, dropRec, dropPosition) {
                //         var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                //         Ext.example.msg('Drag from left to right', 'Dropped ' + data.records[0].get('name') + dropOn);
                //     }
                // }
            },
            store: storeGridRolesMenu,
            columns: [
                {header: 'roleid', dataIndex: 'roleid', hidden: true},
                {header: 'sys_menu_id', dataIndex: 'sys_menu_id', hidden: true},
                {header: 'Nama Role', dataIndex: 'rolename', minWidth: 200,flex:1},
                {
                    header: 'Status',
                    dataIndex: 'status',
                    width: 130,
                    editor: new Ext.form.field.ComboBox({
                        typeAhead: true,
                        triggerAction: 'all',
                        store: [
                            ['YA','YA'],
                            ['TIDAK','TIDAK']
                        ]
                    })
                }
            ],dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'hiddenfield',
                            id:'sys_group_role'
                        },
                        {
                                xtype:'checkboxfield',
                                id:'visiblemenu',
                                name:'visiblemenu',
                                fieldLabel:'Akses Menu',
                                listeners: {
                                    change: function() {
                                            console.log(this.value)
                                            var grid = Ext.ComponentQuery.query('GridTreeSysMenu4Akses')[0];
                                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                            var data = grid.getSelectionModel().getSelection();


                                            if(this.value)
                                            {
                                              
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'sistem/savevisible',
                                                    method: 'POST',
                                                    params: {
                                                        visible: this.value,
                                                        sys_group_role:Ext.getCmp('sys_group_role').getValue(),
                                                        sys_menu_id:selectedRecord.data.id
                                                    },
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                                    }
                                                });
                                            } else {
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'sistem/deletevisible',
                                                    method: 'POST',
                                                    params: {
                                                        visible: this.value,
                                                        sys_group_role:Ext.getCmp('sys_group_role').getValue(),
                                                        sys_menu_id:selectedRecord.data.id
                                                    },
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                                    }
                                                });
                                            }
                                }
                            }
                        }
                    ]
                }
            ],
            stripeRows: true,
            title: 'Daftar Akses'
        }];

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        }); 

        this.on('afteredit', this.onAfterEdit, this); 

        this.on({
            scope: this,
            edit: function() {
                alert('asdsad');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
       alert('after edit');
    },
    recordDataPrint: function(button, event, mode) {
        console.log(mode)
    },
    recordData: function(button, event, mode) {
        // if (validasiReceive()) {
            var json = Ext.encode(Ext.pluck(storeGridRolesMenu.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPerencanaanTK').getValue());
            Ext.Ajax.request({
                url: SITE_URL + 'sistem/saveRoleMenu',
                method: 'POST',
                params: {
                    dataGrid: json,
                    group_id:Ext.getCmp('sys_group_role').getValue()
                },
                success: function(form, action) {
                    // var d = Ext.decode(form.responseText);
                    // if (!d.success) {
                    //     Ext.Msg.alert('Peringatan', d.message);
                    // } else {
                        storeGridRolesMenu.load();
                    // }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        // }
    }
});