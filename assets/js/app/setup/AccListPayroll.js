// Ext.define('GridTreeAccListPayroll', {
//     itemId: 'GridTreeAccListPayroll',
//     id: 'GridTreeAccListPayroll',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccListPayroll',
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
//                         var grid = Ext.ComponentQuery.query('GridTreeAccListPayroll')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnamePayroll').setValue(selectedRecord.get('accnumber')+' '+selectedRecord.get('text'));
//                             Ext.getCmp('idaccountPayroll').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('accnumberPayroll').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccListPayroll').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListPayroll').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListPayroll').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccListPayroll',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccListPayroll').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccListPayroll').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccListPayroll',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccListPayroll');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccListPayroll').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccListPayroll').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccListPayroll = Ext.create('widget.window', {
//     id: 'windowPopupAccListPayroll',
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
//     title: 'Pilih Akun Untuk Pencatatan Gaji',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccListPayroll'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccListPayroll = Ext.getCmp('windowPopupAccListPayroll');
//                 windowPopupAccListPayroll.hide();
//             }
//         }]
// });

Ext.define('GridAccListPayroll', {
    itemId: 'GridAccListPayroll',
    id: 'GridAccListPayroll',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccListPayroll',
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
               setValueAcc(selectedRecord,'wAccListPayroll','Payroll');
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
                        var grid = Ext.ComponentQuery.query('GridAccListPayroll')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccListPayroll','Payroll');
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

var wAccListPayroll = Ext.create('widget.window', {
    id: 'wAccListPayroll',
    title: 'Pilih Akun Untuk Pencatatan Beban Gaji',
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
            xtype:'GridAccListPayroll'
    }]
});