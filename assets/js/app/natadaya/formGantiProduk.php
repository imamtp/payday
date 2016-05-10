var formGantiProduk = Ext.create('Ext.form.Panel', {
    id: 'formGantiProduk',
    // title:'Data Pribadi',
    url: SITE_URL + 'natadaya/saveGantiProduk',
    bodyStyle: 'padding:5px',
    autoWidth: true,
    autoHeight: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 160,
        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [
            {
                xtype: 'hiddenfield',
                name: 'statusformGantiProduk',
                id: 'statusformGantiProduk'
            },{
                xtype: 'hiddenfield',
                fieldLabel: 'idsuperadmin',
                name: 'idsuperadmin'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'idcompany',
                name: 'idcompany'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'productid',
                id: 'productid_GantiProduk',
                name: 'productid'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'user_id',
                name: 'user_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kode User',
                allowBlank: false,
                name: 'usercode'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Lengkap',
                allowBlank: false,
                name: 'realname'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Username Natadaya',
                allowBlank: false,
                name: 'username'
            }, {
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'Password Natadaya',
                allowBlank: false,
                name: 'password'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email',
                allowBlank: false,
                name: 'email'
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
    title: 'Form Admin Super',
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