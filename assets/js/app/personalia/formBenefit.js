var formBenefit = Ext.create('Ext.form.Panel', {
    url: SITE_URL + 'backend/saveform/Benefit/personalia',
    id: 'formBenefit',
    width: 890,
    title: 'Data Benefit',
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
            name: 'statusformBenefit',
            id: 'statusformBenefit'
        }, {
            xtype: 'hiddenfield',
            id: 'idbenefit_fBenefit',
            fieldLabel: 'idbenefit',
            name: 'idbenefit'
        }, {
            xtype: 'hiddenfield',
            id: 'idpelamar_fBenefit',
            fieldLabel: 'idpelamar',
            name: 'idpelamar'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nomor Rekening',
            // allowBlank: false,
            name: 'nomorrekening'
        },{
            xtype: 'textfield',
            fieldLabel: 'Nama Akun Rekening',
            // allowBlank: false,
            name: 'namaakunrekening'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Bank',
            // allowBlank: false,
            name: 'namabank'
        },{
            xtype: 'textfield',
            fieldLabel: 'Cabang Bank',
            // allowBlank: false,
            name: 'cabangbank'
        }]
    }, {
        items: [
       {
            xtype: 'textfield',
            fieldLabel: 'No Polis Asuransi',
            // allowBlank: false,
            name: 'nopolisasuransi'
        },{
            xtype: 'textfield',
            fieldLabel: 'No BPJS Kesehatan',
            // allowBlank: false,
            name: 'nobpjskesehatan'
        },{
            xtype: 'textfield',
            fieldLabel: 'No BPJS Tenagakerja',
            // allowBlank: false,
            name: 'nobpjstenagakerja'
        }]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowKaryawan');
            Ext.getCmp('formBenefit').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnBenefitSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        // Ext.getCmp('formBenefit').getForm().reset();
                        // Ext.getCmp('windowPopupBenefit').hide();
                        // storeGridBenefit.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridBenefit.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});