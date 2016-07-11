Ext.define('GridHistoryDepositModel', {
    extend: 'Ext.data.Model',
    fields: ['iddeposit','aggrementno','idcompany','amount','depositdate','noref','amount','via','status'],
    idProperty: 'id'
});

var storeGridHistoryDeposit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridHistoryDepositModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/historyDeposit',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

Ext.define('MY.searchGridHistoryDeposit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridHistoryDeposit',
    store: storeGridHistoryDeposit,
    width: 180
});

var smGridHistoryDeposit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridHistoryDeposit.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteHistoryDeposit').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteHistoryDeposit').enable();
        }
    }
});

Ext.define('GridHistoryDeposit', {
    title: 'Riwayat Deposit',
    itemId: 'GridHistoryDepositID',
    id: 'GridHistoryDepositID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridHistoryDeposit',
    store: storeGridHistoryDeposit,
    loadMask: true,
    columns: [
        {header: 'iddeposit', dataIndex: 'iddeposit', hidden: true},
        {header: 'Tgl Deposit', dataIndex: 'depositdate', minWidth: 200},
        {header: 'No Perjanjian', dataIndex: 'aggrementno', minWidth: 200},       
        {header: 'Jumlah Deposit', dataIndex: 'amount', minWidth: 200, xtype: 'numbercolumn', align: 'right'},
        {header: 'Pembayaran Via', dataIndex: 'via', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
               {
                   // itemId: 'addHistoryDeposit',
                   text: 'Lihat Detail',
                   iconCls: 'open-folder',
                   handler: function() {
                        var grid = Ext.ComponentQuery.query('GridHistoryDeposit')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formDepositKonfirm = Ext.getCmp('formDepositKonfirm');
                            formDepositKonfirm.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/historydeposit',
                                params: {
                                    extraparams: 'a.iddeposit:' + selectedRecord.data.iddeposit
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(action.response.responseText);
                                    console.log(d)
                                     Ext.getCmp('aggrementno_DepositKonfirm').setValue(d.data.aggrementno);
                                  Ext.getCmp('aggrementno_DepositKonfirm2').setValue(d.data.aggrementno);
                                  Ext.getCmp('minimaldeposit_DepositKonfirm').setValue(renderNomor(d.data.price));
                                  Ext.getCmp('amount_DepositKonfirm').setValue(renderNomor(d.data.amount));
                                    // console.log(d)
                                    // // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                    // Ext.getCmp('statusDeposit_konfirm').show();
                                    // Ext.getCmp('statusDeposit_konfirm').setReadOnly(true);
                                    // Ext.getCmp('statusDeposit_konfirm').setValue(d.data.status);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })
                            wDepositKonfirm.show();
                            Ext.getCmp('statusformhistorydeposit').setValue('edit');
                            Ext.getCmp('statusDeposit_konfirm').show();
                            Ext.getCmp('statusDeposit_konfirm').setReadOnly(true);
                            Ext.getCmp('BtnDepositKonfirmSimpan').hide();
                            
                        }
                   }
               },
               // {
               //     itemId: 'cetakDeposit',
               //     text: 'Cetak',
               //     iconCls: 'print-icon',
               //     handler: function() {
               //         var grid = Ext.ComponentQuery.query('GridHistoryDeposit')[0];
               //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
               //         var data = grid.getSelectionModel().getSelection();
               //         if (data.length == 0)
               //         {
               //             Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
               //         } else {
               //          var src = SITE_URL+"backend/cetak/penerimaansiswa/" + selectedRecord.data.idsiswapembayaran;
                           
               //           var myWin = Ext.create("Ext.window.Window", {
               //                  title: 'Cetak Kwitansi',
               //                  modal: true,
               //                  html: '<iframe src="'+src+'" width="100%" height="100%" ></iframe>',
               //                  width: 700,
               //                  height: 500
               //              });
               //              myWin.show();
               //             // Ext.getCmp('GridHistoryDeposit').body.update("<iframe style='border:0;' width='100%' height='100%' id='GridHistoryDeposit' src='"+SITE_URL+"backend/cetak/penerimaansiswa/" + selectedRecord.data.idsiswapembayaran + "'>");
               //             // Ext.Ajax.request({
               //             //     url: SITE_URL + 'backend/cetak',
               //             //     method: 'GET',
               //             //     params: {
               //             //          id: selectedRecord.data.idsiswapembayaran,
               //             //          modul:'penerimaansiswa'
               //             //      }
               //             // });
               //         }

               //     }
               // },
//                {
//                    id: 'btnDeleteHistoryDeposit',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Konfirmasi',
//                            msg: 'Hapus data terpilih ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridHistoryDeposit')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/HistoryDeposit/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridHistoryDeposit.remove(sm.getSelection());
//                                    sm.select(0);
//                                }
//                            }
//                        });
//                    },
////                    disabled: true
//                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridHistoryDeposit',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridHistoryDeposit, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridHistoryDeposit.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

//             Ext.Ajax.request({
//                 url: SITE_URL + 'purchase/getPurchase',
//                 method: 'POST',
//                 params: {
//                     idpurchase: record.data.idpurchase
//                 },
//                 success: function(form, action) {

//                     var d = Ext.decode(form.responseText);
//                     if (!d.success)
//                     {
//                         Ext.Msg.alert('Peringatan', d.message);
//                     } else {
// //                        Ext.Msg.alert('Success', d.message);
// //                        console.log(d.data.namepayment)
//                         wEntryPayment.show();
//                         Ext.getCmp('idpurchasePayment').setValue(d.data.idpurchase);
//                         Ext.getCmp('shipaddressPayment').setValue(d.data.shipaddress);
//                         Ext.getCmp('nojurnalPayment').setValue(d.data.nopurchase);
// //                        Ext.getCmp('memoPayment').setValue(d.data.memo);
//                         Ext.getCmp('totalPajakPayment').setValue(d.data.tax);
//                         Ext.getCmp('angkutPayment').setValue(d.data.freigthcost);
//                         Ext.getCmp('sisaBayarPayment').setValue(d.data.totalowed);
//                         Ext.getCmp('paymentPayment').setValue(d.data.namepayment);
//                         Ext.getCmp('tglPelunasanPayment').setValue(d.data.duedate);
//                         Ext.getCmp('totalPayment').setValue(d.data.totalamount);
//                         Ext.getCmp('idunitPayment').setValue(d.data.idunit);

//                         PaymentGridStore.load({
//                             params: {
//                                 'extraparams': 'a.idpurchase:'+d.data.idpurchase
//                             }
//                         });

//                     }

//                 },
//                 failure: function(form, action) {
//                     Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                 }
//             });
        }
    }
});