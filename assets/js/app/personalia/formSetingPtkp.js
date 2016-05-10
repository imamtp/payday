
var formSetingPtkp = Ext.create('Ext.form.Panel', {
    id: 'formSetingPtkp',
    title:'Pengaturan Pengupahan',
    width: 900,
//    height: 300,
    url: SITE_URL + 'personalia/updateptkp',
    params: {
        // idpelamar: Ext.getCmp('idpelamar_dkaryawan').getValue()
    },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 150,
        // anchor:'100%'
        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'idptkp',
            id: 'idptkp_fSetingPtkp'
        },{
            xtype: 'comboxjenisptkp',
            name: 'namaptkp',
            id: 'namaptkp'
        }],
    buttons: [{
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert("Info", "Perubahan telah tersimpan");
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});