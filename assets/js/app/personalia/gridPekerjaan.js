Ext.define('GridPekerjaanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpekerjaan','idpergerakanpersonil','tglmasuk','tglberakhir','namaatasan','usermod','datemod','status','namalengkap','levelname','namalokasi','namalokasiatasan','kekaryaanname','idjabatan','idjabatanatasan','idstrukturjabatan','namajabatan','kodejabatan','levelname','namajabatanatasan','kodejabatanatasan','lokasiatasan','idlevelindividu','levelnameindividu','namaorg','kodeorg','namaorgatasan','kodeorgatasan'],
    idProperty: 'id'
});

var storeGridPekerjaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPekerjaanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Pekerjaan/personalia',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});
Ext.define('MY.searchGridPekerjaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPekerjaan',
    store: storeGridPekerjaan,
    width: 180
});

////////////////////////////////////////////////////////////////////////////
Ext.define('Ext.ux.CustomTrigger', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.customtrigger',

    // override onTriggerClick
    onTriggerClick: function() {
         wGridStrukturJabatanFormPekerjaanListPopup.show();
        storeGridStrukturJabatanFormPekerjaanList.load();
    }
});

var formPekerjaan = Ext.create('Ext.form.Panel', {
    id: 'formPekerjaan',
    width: 450,
   // height: 500,
    url: SITE_URL + 'backend/saveform/Pekerjaan/personalia',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformPekerjaan',
            id: 'statusformPekerjaan'
        },{
            xtype:'hiddenfield',
            id:'idpelamar_fPekerjaan',
            fieldLabel:'idpelamar',
            name:'idpelamar'
        }, {
            xtype:'hiddenfield',
            fieldLabel:'idpekerjaan',
            name:'idpekerjaan'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idstrukturjabatan_fPekerjaan',
            id:'idstrukturjabatan_fPekerjaan',
            name:'idstrukturjabatan'
        },
        Ext.define('Ext.ux.namajabatan_fPekerjaan', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajabatan_fPekerjaan',
            name: 'namajabatan',
            editable: false,
            id: 'namajabatan_fPekerjaan',
            fieldLabel: 'Jabatan',
            emptyText: 'Pilih Jabatan...',
            onTriggerClick: function() {
                 wGridStrukturJabatanFormPekerjaanListPopup.show();
                storeGridStrukturJabatanFormPekerjaanList.load();
            }
        }),
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idjabatan_fPekerjaan',
        //     id:'idjabatan_fPekerjaan',
        //     name:'idjabatan'
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Pilih Jabatan',
        //     name: 'namajabatan',
        //     allowBlank:false,
        //     id: 'namajabatan_fPekerjaan',
        //     listeners: {
        //         render: function(component) {
        //             component.getEl().on('click', function(event, el) {
        //                 wGridStrukturJabatanFormPekerjaanListPopup.show();
        //                 storeGridStrukturJabatanFormPekerjaanList.load();
        //             });
        //         }
        //     },
        //     afterLabelTextTpl: '<img src="http://192.168.56.111/natadaya/assets/icons/fam/accept.gif" class="info_image" data-qtip="your help text or even html comes here...."></img>'
        // },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Jabatan',
            id:'kodejabatan_fPekerjaan',
            name: 'kodejabatan',
            readOnly:true
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idlevel_fPekerjaan',
        //     id:'idlevel_fPekerjaan',
        //     name:'idlevel'
        // },
        {
            xtype: 'displayfield',
            fieldLabel: 'Level Jabatan',
            id:'levelname_fPekerjaan',
            name: 'levelname',
            readOnly:true
        },
         {
            xtype: 'hiddenfield',
            id: 'idlevelindividu_fPekerjaan',
            name: 'idlevelindividu'
        },
         Ext.define('Ext.ux.levelnameindividu_fPekerjaan', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.levelnameindividu_fPekerjaan',
            editable: false,
            fieldLabel: 'Level Individu',
            allowBlank: false,
            id: 'levelnameindividu_fPekerjaan',
            name: 'levelnameindividu',
            emptyText: 'Pilih Level Individu...',
            onTriggerClick: function() {
                 wGridLevelIndividuPekerjaanListPopup.show();
                storeGridLevelIndividuPekerjaanList.load();
            }
        }),
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Pilih Level Individu',
        //     allowBlank: false,
        //     id: 'levelnameindividu_fPekerjaan',
        //     name: 'levelnameindividu',
        //         listeners: {
        //             render: function(component) {
        //                 component.getEl().on('click', function(event, el) {
        //                     wGridLevelIndividuListPopup.show();
        //                     // storeGridAccount.on('beforeload',function(store, operation,eOpts){
        //                     //             operation.params={
        //                     //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
        //                     //                         'idaccounttype': '12,16,11'
        //                     //             };
        //                     //         });
        //                     storeGridLevelIndividuList.load();
        //                 });
        //             }
        //         }
        // },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idorganisasi_fPekerjaan',
        //     id:'idorganisasi_fPekerjaan',
        //     name:'idorganisasi'
        // },
        {
            xtype:'comboxlokasi'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi Jabatan',
            id:'namaorg_fPekerjaan',
            name: 'namaorg',
            readOnly:true
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idjabatanatasan_fPekerjaan',
        //     id:'idjabatanatasan_fPekerjaan',
        //     name:'idjabatanatasan'
        // },
        {
            xtype:'comboxkekaryaan',
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tglmasuk',
            allowBlank: false,
            fieldLabel: 'Tgl Masuk'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tglberakhir',
            allowBlank: false,
            fieldLabel: 'Tgl Akhir'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamaratasan_fPekerjaan',
            name: 'idpelamaratasan'
        },
         Ext.define('Ext.ux.namaatasan_fPekerjaan', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namaatasan_fPekerjaan',
            editable: false,
            fieldLabel: 'Nama Atasan',
            allowBlank: false,
            id:'namaatasan_fPekerjaan',
            name: 'namaatasan',
            emptyText: 'Pilih Atasan...',
            onTriggerClick: function() {
                 wGridNamaAtasanFormPekerjaanListPopup.show();
                storeGridNamaAtasanFormPekerjaanList.load();
            }
        }),
        {
            xtype: 'displayfield',
            fieldLabel: 'Jabatan Atasan',
            allowBlank:false,
            id:'namajabatanatasan_fPekerjaan',
            name: 'namajabatanatasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Jabatan Atasan',
            id:'kodejabatanatasan_fPekerjaan',
            name: 'kodejabatanatasan',
            readOnly:true
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Organisasi Atasan',
            id:'namaorgatasan_fPekerjaan',
            name: 'namaorgatasan',
            readOnly:true
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Organisasi Atasan',
            id:'kodeorgatasan_fPekerjaan',
            name: 'kodeorgatasan',
            readOnly:true
        },
        {
            xtype: 'hiddenfield',
            fieldLabel:'Lokasi Atasan',
            id:'lokasiatasan_fPekerjaan',
            name:'lokasiatasan'
        }
        // Ext.define('Ext.ux.namalengkap_fPekerjaan', {
        //     extend: 'Ext.form.field.Trigger',
        //     alias: 'widget.namalengkap_fPekerjaan',
        //     name: 'namalengkap',
        //     editable: false,
        //     id: 'namalengkap_fPekerjaan',
        //     fieldLabel: 'Nama Personil',
        //     emptyText: 'Pilih Personil...',
        //     onTriggerClick: function() {
        //         wGridPersonilListPopup.show();
        //         storeGridPersonilList.load();
        //     }
        // }),
        //  {
        //     xtype:'textfield',
        //     fieldLabel: 'Nama Atasan',
        //     id:'namaatasan_fPekerjaan',
        //     name:'namaatasan'
        // },
        // {
        //     xtype: 'hiddenfield',
        //     id: 'idjabatanatasan_fPekerjaan',
        //     name: 'idjabatanatasan'
        // },
        // {
        //     xtype: 'displayfield',
        //     fieldLabel: 'Jabatan Atasan',
        //     name: 'namajabatanatasan',
        //     allowBlank:false,
        //     id: 'namajabatanatasan_fPekerjaan'
        // },
        // {
        //     xtype: 'displayfield',
        //     fieldLabel: 'Kode Jabatan Atasan',
        //     id:'kodejabatanatasan_fPekerjaan',
        //     name: 'kodejabatanatasan',
        //     readOnly:true
        // },
        // {
        //     xtype:'hiddenfield',
        //     fieldLabel:'idorganisasi_fPekerjaan',
        //     id:'idorganisasiatasan_fPekerjaan',
        //     name:'idorganisasiatasan'
        // },
        //  Ext.define('Ext.ux.namaorgatasan_fPekerjaan', {
        //     extend: 'Ext.form.field.Trigger',
        //     alias: 'widget.namaorgatasan_fPekerjaan',
        //     editable: false,
        //     fieldLabel: 'Pilih Organisasi Atasan',
        //     allowBlank:false,
        //     id:'namaorgatasan_fPekerjaan',
        //     name: 'namaorgatasan',
        //     emptyText: 'Pilih Organisasi Atasan...',
        //     onTriggerClick: function() {
        //          wGridPekerjaanOrganisasiListPopup.show();
        //         storeGridPekerjaanOrganisasiList.load();
        //     }
        // }),
        // {
        //     xtype: 'displayfield',
        //     fieldLabel: 'Kode Organisasi Atasan',
        //     id:'kodeorgatasan_fPekerjaan',
        //     name: 'kodeorgatasan',
        //     readOnly:true
        // },
        // {
        //     xtype:'comboxlokasi',
        //     fieldLabel:'Lokasi Atasan',
        //     name:'lokasiatasan'
        // }
        ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPekerjaan');
                Ext.getCmp('formPekerjaan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPekerjaanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPekerjaan').getForm().reset();
                            Ext.getCmp('windowPopupPekerjaan').hide();
                            storeGridPekerjaan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPekerjaan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPekerjaan = Ext.create('widget.window', {
    id: 'windowPopupPekerjaan',
    title: 'Form Pekerjaan',
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
    items: [formPekerjaan]
});



Ext.define('GridPekerjaan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPekerjaan,
    width: 900,
    height:390,
    title: 'Pekerjaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPekerjaanID',
    id: 'GridPekerjaanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPekerjaan',
    store: storeGridPekerjaan,
    loadMask: true,
    columns: [
        {header: 'idpekerjaan', dataIndex: 'idpekerjaan', hidden: true},
        {header: 'idpergerakanpersonil', dataIndex: 'idpergerakanpersonil', hidden: true},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Level Jabatan', dataIndex: 'levelname', minWidth: 150},
        {header: 'Level Individu', dataIndex: 'levelnameindividu', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Kekaryawanan', dataIndex: 'kekaryaanname', minWidth: 150},
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        {header: 'Nama Jabatan Atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        {header: 'Lokasi Atasan', dataIndex: 'namalokasiatasan', minWidth: 150},
        {header: 'Tgl Aktivasi', dataIndex: 'tglmasuk', minWidth: 150},
        {header: 'Tgl Terminasi', dataIndex: 'tglberakhir', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        // {header: 'User Modified', dataIndex: 'usermod', minWidth: 150},
        // {header: 'Date Modified', dataIndex: 'datemod', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Tambah',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         wPekerjaan.show();
                //         Ext.getCmp('statusformPekerjaan').setValue('input');
                //         Ext.getCmp('idpelamar_fPekerjaan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                //         kekaryaanStore.load();
                //         lokasiStore.load();
                //     }
                // },
                {
                    text: 'Detail',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridPekerjaan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                              editPekerjaanForm(selectedRecord,selectedRecord.data.status);

                            // if(selectedRecord.data.status=='Nonaktif')
                            // {
                            //     // Ext.Msg.alert("Data Pekerjaan", 'Data tidak bisa diubah');
                            //     Ext.getCmp('BtnUbahPergerakan').setDisabled(true);
                            // } else {
                            //     Ext.getCmp('BtnUbahPergerakan').setDisabled(false);
                            // }
                           
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);

                        }

                    }
                },
//                  {
//                     id: 'btnDeletePekerjaan',
//                     text: 'Hapus',
//                     iconCls: 'delete-icon',
//                     handler: function() {
//                         Ext.Msg.show({
//                             title: 'Confirm',
//                             msg: 'Delete Selected ?',
//                             buttons: Ext.Msg.YESNO,
//                             fn: function(btn) {
//                                 if (btn == 'yes') {
//                                     var grid = Ext.ComponentQuery.query('GridPekerjaan')[0];
//                                     var sm = grid.getSelectionModel();
//                                     selected = [];
//                                     Ext.each(sm.getSelection(), function(item) {
//                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                     });
//                                     Ext.Ajax.request({
//                                         url: SITE_URL + 'backend/ext_delete/Pekerjaan/personalia/hidden',
//                                         method: 'POST',
//                                         params: {postdata: Ext.encode(selected)}
//                                     });
//                                     storeGridPekerjaan.remove(sm.getSelection());
//                                     sm.select(0);
//                                 }
//                             }
//                         });
//                     },
// //                    disabled: true
//                 },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPekerjaan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPekerjaan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridPekerjaan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

function editPekerjaanForm(selectedRecord,status)
{

        // var formPergerakanPersonel = Ext.getCmp('formPergerakanPersonel');
        // formPergerakanPersonel.getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/PergerakanPersonil/1/personalia',
        //     params: {
        //         extraparams: 'a.idpergerakanpersonil:' + selectedRecord.data.idpergerakanpersonil
        //     },
        //     success: function(form, action) {
        //         var d = Ext.decode(action.response.responseText);
        //         // console.log(action)
        //         // getFotoPegawai(d.data.idpelamar);
        //         // setValueHeader(d);
        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //         Ext.MessageBox.hide();
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     }
        // })

        // wPergerakanPersonel.show();
        // Ext.getCmp('statusformPergerakanPersonel').setValue('edit');
        // levelStore.load();
        // kekaryaanStore.load();
        // lokasiStore.load();
        // pergerakanStore.load();

        // Ext.getCmp('BtnUbahPergerakan').show();
        // Ext.getCmp('BtnDisetujuiPergerakan').hide();
        // Ext.getCmp('BtnDiajukanPergerakan').hide();

        

        // Ext.getCmp('TabItemPergerakanPersonil').items.getAt(1).setDisabled(true);

        // Ext.getCmp('namalengkap_fPergerakanP_from').setReadOnly(true);
        // Ext.getCmp('comboxpergerakan_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('nopergerakan_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('namajabatan_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('levelnameindividu_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('namalokasi_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('comboxkekaryaan_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('tglmasuk_fPergerakanP').setReadOnly(true);
        // Ext.getCmp('tglberakhir_fPergerakanP').setReadOnly(true);
        // // Ext.getCmp('comboxkekaryaan_fPergerakanP').setReadOnly(true);

        // if(status=='Nonaktif')
        // {
        //      Ext.getCmp('BtnUbahPergerakan').setDisabled(true);
        //      Ext.getCmp('namaatasan_fPergerakanP').setReadOnly(true);
        // } else {
        //      Ext.getCmp('BtnUbahPergerakan').setDisabled(false);
        //      Ext.getCmp('namaatasan_fPergerakanP').setReadOnly(false);
        // }

        var formDetailPekerjaan = Ext.getCmp('formDetailPekerjaan');
        formDetailPekerjaan.getForm().load({
            url: SITE_URL + 'backend/loadFormData/PergerakanPersonil/1/personalia',
            params: {
                extraparams: 'a.idpergerakanpersonil:' + selectedRecord.data.idpergerakanpersonil
            },
            success: function(form, action) {
                var d = Ext.decode(action.response.responseText);

                Ext.MessageBox.hide();
            },
            failure: function(form, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
        })

        wDetailPekerjaan.show();

        Ext.getCmp('TabItemDetailPekerjaan').setActiveTab(0);
}
