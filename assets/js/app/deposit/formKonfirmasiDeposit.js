var formDepositKonfirm = Ext.create('Ext.form.Panel', {
    id: 'formDepositKonfirm',
    width: 450,
    //    height: 300,
    url: SITE_URL + 'backend/saveform/historydeposit',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 190,
        anchor: '100%'
        //        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformhistorydeposit',
        id: 'statusformhistorydeposit'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'iddeposit',
        name: 'iddeposit'
    },  {
        xtype: 'hiddenfield',
        fieldLabel: 'aggrementno',
        id: 'aggrementno_DepositKonfirm',
        name: 'aggrementno'
    },
     {
        xtype: 'displayfield',
        fieldLabel: 'No Perjanjian',
        id: 'aggrementno_DepositKonfirm2'
    }, {
        xtype: 'displayfield',
        readOnly:true,
        fieldLabel: 'Kode Produk',
        // allowBlank: false,
        id: 'productcode_DepositKonfirm',
        name: 'productcode'
    }, {
        xtype: 'displayfield',
        readOnly:true,
        fieldLabel: 'Nama Produk',
        // allowBlank: false,
        id:'productname_DepositKonfirm',
        name: 'productname'
    },{
        xtype: 'displayfield',
        readOnly:true,
         fieldStyle: 'text-align: right;',
        fieldLabel: 'Minimal Deposit',
        // allowBlank: false,
        id:'minimaldeposit_DepositKonfirm',
        name: 'minimaldeposit_DepositKonfirm'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Jumlah Deposit',
        allowBlank: false,
        id:'amount_DepositKonfirm',
        name: 'amount',
        fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        // updateSelisih();
                    }, c);
                }
            }
    },
    {
        xtype: 'textfield',
        fieldLabel: 'No Referensi',
        // allowBlank: false,
        name: 'noref'
    },
    {
        xtype:'comboxrekNatadaya',
        allowBlank: false
    },
    {
        xtype: 'comboxTransferMethod',
        allowBlank: false,
        fieldLabel: 'Metode Bayar'
    },
    {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'depositdate',
            allowBlank: false,
            fieldLabel: 'Tanggal Bayar'
        },
    {
        xtype: 'textfield',
        fieldLabel: 'No Rekening Pengirim',
        // allowBlank: false,
        name: 'accnumber'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nama Akun Bank Pengirim',
        // allowBlank: false,
        name: 'accname'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nama Bank Pengirim',
        // allowBlank: false,
        name: 'bankname'
    },
    {
        xtype: 'comboxstatusDeposit',
        hidden:true,
        id:'statusDeposit_konfirm'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('windowPopupDepositKonfirm');
            Ext.getCmp('formDepositKonfirm').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnDepositKonfirmSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', 'Konfirmasi Deposit Baru Telah Diterima');
                        Ext.getCmp('formDepositKonfirm').getForm().reset();
                        Ext.getCmp('windowPopupDepositKonfirm').hide();
                        storeGridDepositKonfirm.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridDepositKonfirm.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wDepositKonfirm = Ext.create('widget.window', {
    id: 'windowPopupDepositKonfirm',
    title: 'Form Konfirmasi Deposit',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formDepositKonfirm]
});