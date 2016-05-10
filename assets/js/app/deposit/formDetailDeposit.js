Ext.define('DetailFormDeposit', {
    title: 'Detail',
    itemId: 'DetailFormDeposit',
    id: 'DetailFormDeposit',
    extend: 'Ext.form.Panel',
    alias: 'widget.DetailFormDeposit',
    url: SITE_URL + 'clossing/closebook/bulan',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
        items: [{
            xtype: 'fieldset',
            title: 'Info Deposit',
            // collapsible: true,
            items: [
             {
                xtype: 'displayfield',
                id: 'balancedeposit',
                fieldLabel: 'Sisa Deposit'
            },
            {
                xtype: 'displayfield',
                id: 'lastdatedeposit',
                fieldLabel: 'Tanggal Terakhir Deposit'
            },{
                xtype: 'displayfield',
                id: 'lastamountdeposit',
                fieldLabel: 'Jumlah Deposit Terakhir'
            }]
        }]
    },
    {
        items: [{
            xtype: 'fieldset',
            title: 'Info Produk',
            // collapsible: true,
            items: [
             {
                xtype: 'displayfield',
                id: 'productname_deposit',
                fieldLabel: 'Kode Produk'
            },
            {
                xtype: 'displayfield',
                id: 'productcode_deposit',
                fieldLabel: 'Nama Produk'
            },{
                xtype: 'displayfield',
                id: 'startdate_deposit',
                fieldLabel: 'Tanggal Aktivasi'
            }]
        }]
    },
    //  {
    //     items: [
    //     {
    //         xtype: 'fieldset',
    //         title: 'Data Produk',
    //         // collapsible: true,
    //         items: [{
    //             xtype: 'textfield',
    //             fieldLabel: 'No Perjanjian',
    //             allowBlank: false,
    //             name: 'aggrementno'
    //         }, {
    //             xtype: 'textfield',
    //             // readOnly:true,
    //             fieldLabel: 'Kode Produk',
    //             // allowBlank: false,
    //             id: 'productcode_adminsuper',
    //             name: 'productcode',
    //             listeners: {
    //                 render: function(component) {
    //                     component.getEl().on('click', function(event, el) {
    //                         wGridProductListPopup.show();
    //                         // storeGridAccount.on('beforeload',function(store, operation,eOpts){
    //                         //             operation.params={
    //                         //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
    //                         //                         'idaccounttype': '12,16,11'
    //                         //             };
    //                         //         });
    //                         storeGridProductList.load();
    //                     });
    //                 }
    //             }
    //         }, {
    //             xtype: 'textfield',
    //             readOnly:true,
    //             fieldLabel: 'Nama Produk',
    //             // allowBlank: false,
    //             id: 'productname_adminsuper',
    //             name: 'productname'
    //         }, {
    //             xtype: 'datefield',
    //             format: 'd-m-Y',
    //             name: 'startdate',
    //             // allowBlank: false,
    //             fieldLabel: 'Tgl Aktivasi'
    //         }, {
    //             xtype: 'datefield',
    //             format: 'd-m-Y',
    //             // allowBlank: false,
    //             name: 'enddate',
    //             fieldLabel: 'Tgl Terminasi'
    //         },{
    //             xtype: 'comboxstatusAkun',
    //             name:'statusproduk',
    //             allowBlank: false,
    //         } ]
    //     }]
    // }
    ],
    buttons: [{
            text: 'Konfirmasi Deposit Baru',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridDaftarPerusahaanDeposit')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih perusahaan terlebih dahulu!');
                } else {
                    wDepositKonfirm.show();
                    Ext.getCmp('aggrementno_DepositKonfirm').setValue(selectedRecord.data.aggrementno);
                    Ext.getCmp('aggrementno_DepositKonfirm2').setValue(selectedRecord.data.aggrementno);
                    Ext.getCmp('minimaldeposit_DepositKonfirm').setValue(renderNomor(selectedRecord.data.price));
                    Ext.getCmp('productcode_DepositKonfirm').setValue(selectedRecord.data.productcode);
                    Ext.getCmp('productname_DepositKonfirm').setValue(selectedRecord.data.productname);
                    rekNatadayaStore.load();
                    storeTransferMethod.load();
                    Ext.getCmp('statusDeposit_konfirm').hide();
                    Ext.getCmp('BtnDepositKonfirmSimpan').show();
                }
               
            }
        },'->']
});