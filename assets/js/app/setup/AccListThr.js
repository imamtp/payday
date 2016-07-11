// Ext.define('GridTreeAccListPaythr', {
//     itemId: 'GridTreeAccListPaythr',
//     id: 'GridTreeAccListPaythr',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccListPaythr',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     singleExpand: false,
//     expanded: false,
//     columns: [{
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'treecolumn',
//             text: 'accnumber',
//             minWidth: 200,
//             sortable: true,
//             dataIndex: 'accnumber'
//         }, {
//             xtype: 'treecolumn', //this is so we know which column will show the tree
//             text: 'Nama Akun',
//             // flex: 2,
//             minWidth: 300,
//             flex: 1,
//             sortable: true,
//             dataIndex: 'text'
//         }
//     ]
//     , dockedItems: [{
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccListPaythr')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnamepaythrSetup').setValue(selectedRecord.get('accnumber')+' '+selectedRecord.get('text'));
//                             Ext.getCmp('idaccountpaythrSetup').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('accnumberPaythr').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccListPaythr').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListPaythr').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListPaythr').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccListPaythr',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccListPaythr').getValue(),
//                                     }
//                                 });
//                             }
//                         }
//                     }
//                 }, {
// //                        itemId: 'reloadDataAcc',
//                     text: 'Cari',
//                     iconCls: 'add-icon'
//                     , handler: function() {
//                         storeAccountAktive.load({
//                             params: {
//                                 'accname': Ext.getCmp('searchAccListPaythr').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccListPaythr',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccListPaythr');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccListPaythr').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccListPaythr').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccListPaythr = Ext.create('widget.window', {
//     id: 'windowPopupAccListPaythr',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     minWidth: 750,
//     height: 550,
//     x: 300,
//     y: 50,
//     layout: 'fit',
//     border: false,
//     title: 'Pilih Akun Untuk Pembayaran THR',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccListPaythr'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccListPaythr = Ext.getCmp('windowPopupAccListPaythr');
//                 windowPopupAccListPaythr.hide();
//             }
//         }]
// });

Ext.define('AccListThr', {
    itemId: 'AccListThr',
    id: 'AccListThr',
    extend: 'Ext.grid.Panel',
    alias: 'widget.AccListThr',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
               setValueAcc(selectedRecord,'wAccListThr','paythrSetup');
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('AccListThr')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccListThr','paythrSetup');
                        }
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAcc',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wAccListThr = Ext.create('widget.window', {
    id: 'wAccListThr',
     title: 'Pilih Akun Untuk Pembayaran THR',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'AccListThr'
    }]
});

/////////////////////////////////////////////////////////////////////////////////////////////////
//beBAN THR

// Ext.define('GridTreeAccListThr', {
//     itemId: 'GridTreeAccListThr',
//     id: 'GridTreeAccListThr',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccListThr',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     singleExpand: false,
//     expanded: false,
//     columns: [{
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'treecolumn',
//             text: 'accnumber',
//             minWidth: 200,
//             sortable: true,
//             dataIndex: 'accnumber'
//         }, {
//             xtype: 'treecolumn', //this is so we know which column will show the tree
//             text: 'Nama Akun',
//             // flex: 2,
//             minWidth: 300,
//             flex: 1,
//             sortable: true,
//             dataIndex: 'text'
//         }
//     ]
//     , dockedItems: [{
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccListThr')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnamethrSetup').setValue(selectedRecord.get('accnumber')+' '+selectedRecord.get('text'));
//                             Ext.getCmp('idaccountthrSetup').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('accnumberThr').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccListThr').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListThr').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListThr').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccListThr',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccListThr').getValue(),
//                                     }
//                                 });
//                             }
//                         }
//                     }
//                 }, {
// //                        itemId: 'reloadDataAcc',
//                     text: 'Cari',
//                     iconCls: 'add-icon'
//                     , handler: function() {
//                         storeAccountAktive.load({
//                             params: {
//                                 'accname': Ext.getCmp('searchAccListThr').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccListThr',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccListThr');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccListThr').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccListThr').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccListThr = Ext.create('widget.window', {
//     id: 'windowPopupAccListThr',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     minWidth: 750,
//     height: 550,
//     x: 300,
//     y: 50,
//     layout: 'fit',
//     border: false,
//     title: 'Pilih Akun Untuk Pencatatan Beban THR',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccListThr'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccListThr = Ext.getCmp('windowPopupAccListThr');
//                 windowPopupAccListThr.hide();
//             }
//         }]
// });

Ext.define('AccListBebanThr', {
    itemId: 'AccListBebanThr',
    id: 'AccListBebanThr',
    extend: 'Ext.grid.Panel',
    alias: 'widget.AccListBebanThr',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
               setValueAcc(selectedRecord,'wAccListBebanThr','thrSetup');
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('AccListBebanThr')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccListBebanThr','thrSetup');
                        }
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAcc',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wAccListBebanThr = Ext.create('widget.window', {
    id: 'wAccListBebanThr',
     title: 'Pilih Akun Untuk Pembayaran THR',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'AccListBebanThr'
    }]
});