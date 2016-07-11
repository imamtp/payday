// Ext.define('GridTreeAccKasListPayroll', {
//     itemId: 'GridTreeAccKasListPayroll',
//     id: 'GridTreeAccKasListPayroll',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccKasListPayroll',
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
//                         var grid = Ext.ComponentQuery.query('GridTreeAccKasListPayroll')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnamePayrollKas').setValue(selectedRecord.get('accnumber')+' '+selectedRecord.get('text'));
//                             Ext.getCmp('idaccountPayrollKas').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('accnumberPayrollKas').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccKasListPayroll').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccKasListPayroll').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccKasListPayroll').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccKasListPayroll',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccKasListPayroll').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccKasListPayroll').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccKasListPayroll',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccKasListPayroll');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccKasListPayroll').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccKasListPayroll').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccKasListPayroll = Ext.create('widget.window', {
//     id: 'windowPopupAccKasListPayroll',
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
//     title: 'Pilih Akun Kas Untuk Pembayaran Gaji',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccKasListPayroll'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccKasListPayroll = Ext.getCmp('windowPopupAccKasListPayroll');
//                 windowPopupAccKasListPayroll.hide();
//             }
//         }]
// });

Ext.define('GridAccKasListPayroll', {
    itemId: 'GridAccKasListPayroll',
    id: 'GridAccKasListPayroll',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccKasListPayroll',
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
               setValueAcc(selectedRecord,'wAccKasListPayroll','PayrollKas');
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
                        var grid = Ext.ComponentQuery.query('GridAccKasListPayroll')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccKasListPayroll','PayrollKas');
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

var wAccKasListPayroll = Ext.create('widget.window', {
    id: 'wAccKasListPayroll',
    title: 'Pilih Akun Kas Untuk Pembayaran Gaji',
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
            xtype:'GridAccKasListPayroll'
    }]
});