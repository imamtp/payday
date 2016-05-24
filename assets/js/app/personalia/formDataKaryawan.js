// Ext.define('GridDataKaryawan', {
//     // renderTo:'mytabpanel',
// //    multiSelect: true,
// //    selModel: smGridDataKaryawan,
//     title: 'Daftar Karyawan',
//     // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
//     itemId: 'GridDataKaryawanID',
//     id: 'GridDataKaryawanID',
//     extend: 'Ext.grid.Panel',
//     alias: 'widget.GridDataKaryawan',


Ext.define('formDataKaryawan', {
    itemId: 'formDataKaryawan',
    // id: 'GridDataKaryawanID',
    extend: 'Ext.form.Panel',
    alias: 'widget.formDataKaryawan',
    url: SITE_URL + 'personalia/saveDataKaryawan',    
    id: 'formDataKaryawan',
    // autoWidth:true,
    title:'Biodata',
    width: 890,
//    height: 300,    
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
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowKaryawan');
            Ext.getCmp('formDataKaryawan').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnDataKaryawanSimpan',
        text: 'Simpan',
        handler: function() {
            var idpelamar_dkaryawan = Ext.getCmp('idpelamar_dkaryawan').getValue();
            var namalengkap_dkaryawan = Ext.getCmp('namalengkap_dkaryawan').getValue();
            var idcompany_dkaryawan = Ext.getCmp('idcompany_dkaryawan').getValue();
            var status_dkaryawan = Ext.getCmp('status_dkaryawan').getValue();
            // var ni_dkaryawan = Ext.getCmp('ni_dkaryawan').getValue();
            var nik_dkaryawan = Ext.getCmp('nik_dkaryawan').getValue();
            var comboxJadwalKerja = Ext.getCmp('comboxJadwalKerjaFormKaryawan').getValue();

            if(namalengkap_dkaryawan=='')
            {
                Ext.Msg.alert("Error!", "Nama karyawan belum ditentukan");
            } if(idcompany_dkaryawan=='')
            {
                Ext.Msg.alert("Error!", "Perusahaan belum ditentukan");
            } if(status_dkaryawan=='')
            {
                Ext.Msg.alert("Error!", "Status karyawan belum ditentukan");
            } if(nik_dkaryawan=='')
            {
                Ext.Msg.alert("Error!", "NIK belum ditentukan");
            }  if(comboxJadwalKerja=='')
            {
                Ext.Msg.alert("Error!", "Jadwal Kerja belum ditentukan");
            } else {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        params:{
                            idpelamar:idpelamar_dkaryawan,
                            namalengkap:namalengkap_dkaryawan,
                            idcompany:idcompany_dkaryawan,
                            status:status_dkaryawan,
                            ni:ni_dkaryawan,
                            nik:nik_dkaryawan,
                            idjadwalkerja:comboxJadwalKerja
                        },
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            
                            var WindowKaryawan = Ext.getCmp('WindowKaryawan');
                            // Ext.getCmp('formDataKaryawan').getForm().reset();
                            WindowKaryawan.hide();
                            // funcTabDataKaryawan(false);
                            // Ext.getCmp('formDataKaryawan').getForm().reset();
                            // Ext.getCmp('windowPopupDataKaryawan').hide();
                            // storeGridDataKaryawan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //                            storeGridDataKaryawan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Data belum lengkap");
                }
            }
            
        }
    }],
    items: [{
        items: [{
            xtype: 'hiddenfield',
            fieldLabel:'statusformDataKaryawan',
            name: 'statusformDataKaryawan',
            id: 'statusformDataKaryawan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpelamar',
            id:'idpelamar_dkaryawan',
            name: 'idpelamar'
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Foto',
            combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'filefield',
                margin: '0 15 0 0',
                emptyText: 'Upload Foto',
                fieldLabel: 'Logo',
                name: 'fotokaryawan',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'imgupload-icon'
                }
            }]
        }, {
            xtype: 'button',
            align: 'right',
            // bodyStyle:'float:right;',
            margin: '0 0 5 180',
            anchor: '40%',
            text: 'Hapus Foto',
            handler: function() {
                Ext.Ajax.request({
                    url: SITE_URL + 'setup/hapusfoto',
                    method: 'POST',
                    success: function(form, action) {
                        Ext.getCmp('fotokaryawanthumb').el.dom.src = BASE_URL + "/upload/" + null;
                    },
                    failure: function(form, action) {
                        // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            }
        },  {
            xtype: 'textfield',
            fieldLabel: 'Tempat Lahir',
            allowBlank: false,
            name: 'tempatlahir'
        },  {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tgllahir',
            allowBlank: false,
            fieldLabel: 'Tgl Lahir'
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Usia',
            allowBlank: false,
            name: 'umur'
        }, {
            xtype:'comboxsextype'
        }, {
            xtype:'comboxstatuskawin'
        },{
            xtype: 'textfield',
            fieldLabel: 'Golongan Darah',
            // allowBlank: false,
            name: 'golongandarah'
        },{
            xtype: 'textfield',
            fieldLabel: 'Daerah Asal Rekrut',
            allowBlank: false,
            name: 'daerahrekrut'
        },{
            xtype: 'textfield',
            fieldLabel: 'Gelar Akademik',
            // allowBlank: false,
            name: 'gelarakademik'
        },
        {
            xtype:'comboxkewarganegaraan',
            allowBlank:false
        },
        {
            xtype:'comboxagama',
            allowBlank:false
        }]
    }, {
        items: [
        {
            xtype: 'textfield',
            fieldLabel: 'No Telepon 1',
            allowBlank: false,
            name: 'notelp'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No Telepon 2',
            // allowBlank: false,
            name: 'notelp2'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No Ponsel 1',
            allowBlank: false,
            name: 'nohandphone'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No Ponsel 2',
            // allowBlank: false,
            name: 'nohandphone2'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Alamat Email 1',
            allowBlank: false,
            name: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Alamat Email 2',
            // allowBlank: false,
            name: 'email2'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Alamat Saat ini',
            allowBlank: false,
            name: 'alamat'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Alamat KTP',
            allowBlank: false,
            name: 'alamatktp'
        }
        // ,{
        //     xtype: 'button',
        //     align: 'right',
        //     // bodyStyle:'float:right;',
        //     margin: '0 0 5 250',
        //     anchor: '90%',
        //     text: 'Simpan Perubahan Data',
        //     handler: function() {
                
        //         var form = this.up('form').getForm();
        //         if (form.isValid()) {
        //             form.submit({
        //                 success: function(form, action) {
        //                     Ext.Msg.alert('Success', action.result.message);
        //                     Ext.getCmp('formDataKaryawan').getForm().reset();
        //                     Ext.getCmp('windowPopupDataKaryawan').hide();
        //                     storeGridDataKaryawan.load();
        //                 },
        //                 failure: function(form, action) {
        //                     Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        //                     //                            storeGridDataKaryawan.load();
        //                 }
        //             });
        //         } else {
        //             Ext.Msg.alert("Error!", "Your form is invalid!");
        //         }
        //     }
        // }
        ]
    }]
});