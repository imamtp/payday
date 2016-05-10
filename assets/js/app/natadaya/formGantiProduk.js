var formGantiProduk = Ext.create('Ext.form.Panel', {
    id: 'formGantiProduk',
    // title:'Data Pribadi',
    url: SITE_URL + 'backend/saveform/GantiProduk/natadaya',
    bodyStyle: 'padding:5px',
    autoWidth: true,
    autoHeight: true,
    waitMsg : 'Sedang Memproses...',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 160,
        width: 400
    },
    items: [
            {
                xtype: 'hiddenfield',
                name: 'statusformGantiProduk',
                id: 'statusformGantiProduk'
            },{
                xtype: 'hiddenfield',
                fieldLabel: 'balance',
                id: 'balance_GantiProduk',
                name: 'balance'
            },{
                xtype: 'hiddenfield',
                fieldLabel: 'totalkaryawan',
                id: 'totalkaryawan_GantiProduk',
                name: 'totalkaryawan'
            },{
                xtype: 'hiddenfield',
                fieldLabel: 'idproduct',
                id: 'idproduct_GantiProduk',
                name: 'idproduct'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'aggrementno',
                id: 'aggrementno_GantiProduk',
                name: 'aggrementno'
            },{
                xtype: 'displayfield',
                id: 'productcode_GantiProduk',
                fieldLabel: 'Kode Produk Lama'
            },
            {
                xtype: 'displayfield',
                id: 'productname_GantiProduk',
                fieldLabel: 'Nama Produk Lama'
            },
            {
                xtype: 'hiddenfield',
                fieldLabel: 'idproductnew',
                id: 'idproductnew_GantiProduk',
                name: 'idproductnew'
            },  {
                xtype: 'textfield',
                // readOnly:true,
                fieldLabel: 'Pilih Kode Produk Baru',
                // allowBlank: false,
                id: 'productcodenew_GantiProduk',
                name: 'productcodenew',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wGridGantiProdukListPopup.show();
                            storeGridGantiProdukList.load();
                        });
                    }
                }
            }, {
                xtype: 'displayfield',
                readOnly:true,
                fieldLabel: 'Nama Produk Baru',
                // allowBlank: false,
                id: 'productnamenew_GantiProduk',
                name: 'productnamenew'
            }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupGantiProduk');
            Ext.getCmp('formGantiProduk').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnemployeeGridSimpan',
        text: 'Simpan',
        handler: function() {
            kotakLoading();

            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formGantiProduk').getForm().reset();
                        Ext.getCmp('windowPopupGantiProduk').hide();
                        storeGridGantiProduk.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridemployeeGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wGantiProduk = Ext.create('widget.window', {
    id: 'windowPopupGantiProduk',
    title: 'Form Ganti Produk',
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
    items: [formGantiProduk]
});