var formIdentitas = Ext.create('Ext.form.Panel', {
    url: SITE_URL + 'backend/saveform/Identitas/personalia',
    id: 'formIdentitas',
    width: 890,
    title: 'Identitas',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 180,
        // anchor:'100%'
        width: 430
    },
    layout: 'hbox',
    defaults: {
        padding: '5 5 5 5'
    },
    items: [{
        items: [{
            xtype: 'hiddenfield',
            name: 'statusformIdentitas',
            id: 'statusformIdentitas'
        }, {
            xtype: 'hiddenfield',
            id: 'idpelamar_fIdentitas',
            fieldLabel: 'idpelamar',
            name: 'idpelamar'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nomor Ktp',
            allowBlank: false,
            id:'nomorktp_fIdentitas',
            name: 'nomorktp'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            fieldLabel: 'Masa Berlaku Ktp',
            allowBlank: false,
            name: 'masberlakuktp'
        },{
            xtype: 'textfield',
            fieldLabel: 'Nomor Pasport',
            // allowBlank: false,
            name: 'nomorpasport'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            fieldLabel: 'Masa Berlaku Passport',
            // allowBlank: false,
            name: 'masaberlakupassport'
        },{
            xtype: 'textfield',
            fieldLabel: 'Nomor NPWP',
            // allowBlank: false,
            name: 'nonpwp'
        },{
            xtype:'comboxjenisptkp',
            hidden:true
        }]
    }, {
        items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Nomor Sim 1',
            // allowBlank: false,
            name: 'nomorsim1'
        }, {
            xtype: 'comboxjenisSim',
            name: 'jenissim1'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name: 'masaberlakusim1',
            // allowBlank: false,
            fieldLabel: 'Masa Berlaku Sim 1'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nomor Sim 2',
            // allowBlank: false,
            name: 'nomorsim2'
        }, {
            xtype: 'comboxjenisSim',
            name: 'jenissim2'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name: 'masaberlakusim2',
            // allowBlank: false,
            fieldLabel: 'Masa Berlaku Sim 2'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nomor Sim 3',
            // allowBlank: false,
            name: 'nomorsim3'
        }, {
            xtype: 'comboxjenisSim',
            name: 'jenissim3'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name: 'masaberlakusim3',
            // allowBlank: false,
            fieldLabel: 'Masa Berlaku Sim 3'
        }]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowKaryawan');
            Ext.getCmp('formIdentitas').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnIdentitasSimpan',
        text: 'Simpan',
        handler: function() {
            if(Ext.getCmp('idpelamar_dkaryawan').getValue()!='')
            {
                Ext.getCmp('statusformIdentitas').setValue('edit');
            } else {
                Ext.getCmp('statusformIdentitas').setValue('input');
            }

            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        // Ext.getCmp('formIdentitas').getForm().reset();
                        // Ext.getCmp('windowPopupIdentitas').hide();
                        // storeGridIdentitas.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridIdentitas.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});