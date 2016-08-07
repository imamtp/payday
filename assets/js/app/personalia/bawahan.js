
var formBawahan = Ext.create('Ext.form.Panel', {
    id: 'formBawahan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'personalia/savePergerakanBawahan',
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
            name: 'statusformBawahan',
            id: 'statusformBawahan'
        },{
            xtype: 'hiddenfield',
            id: 'idpergerakanpersonil_fBawahan',
            name: 'idpergerakanpersonil'
        },
        {
            xtype: 'hiddenfield',
            id: 'statuspergerakan_fBawahan',
            name: 'statuspergerakan'
        },
        {
            xtype: 'hiddenfield',
            // id: 'idpergerakanpersonil_fBawahan',
            name: 'idpelamar'
        },

        {
            xtype: 'hiddenfield',
            // id: 'idpergerakanpersonil_fBawahan',
            name: 'idpekerjaan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'NIK',
            id:'nik_fBawahan',
            name: 'nik'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Lengkap',
            id:'namalengkap_fBawahan',
            name: 'namalengkap'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Lokasi',
            id:'namalokasi_fBawahan',
            name: 'namalokasi'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamaratasan_fBawahan',
            name: 'idpelamaratasan'
        },
         Ext.define('Ext.ux.namaatasan_fPergerakanP', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namaatasan_fBawahan',
            editable: false,
            fieldLabel: 'Nama Atasan',
            allowBlank: false,
            id:'namaatasan_fBawahan',
            name: 'namaatasan',
            emptyText: 'Pilih Atasan...',
            onTriggerClick: function() {
                 wGridNamaAtasanFormBawahanListPopup.show();
                storeGridNamaAtasanFormBawahanList.load();
            }
        }),
        {
            xtype: 'displayfield',
            fieldLabel: 'Jabatan Atasan',
            allowBlank:false,
            id:'namajabatanatasan_fBawahan',
            name: 'namajabatanatasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Organisasi Atasan',
            id:'namaorgatasan_fBawahan',
            name: 'namaorgatasan',
            readOnly:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupBawahan');
                Ext.getCmp('formBawahan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnBawahanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formBawahan').getForm().reset();
                            Ext.getCmp('windowPopupBawahan').hide();
                            storeGridBawahan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridBawahan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wBawahan = Ext.create('widget.window', {
    id: 'windowPopupBawahan',
    title: 'Form Data Bawahan',
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
    items: [formBawahan]
});

Ext.define('GridBawahanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpekerjaan','idpelamar','nik','idpelamaratasan','tglmasuk','tglberakhir','namaatasan','userin','datein','namalengkap','levelname','namalokasi','kekaryaanname','idjabatan','idjabatanatasan','idstrukturjabatan','namajabatan','kodejabatan','levelname','namajabatanatasan','kodejabatanatasan','lokasiatasan','idlevelindividu','levelnameindividu','namaorg','kodeorg','namaorgatasan','kodeorgatasan'],
    idProperty: 'id'
});

var storeGridBawahan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBawahanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/listbawahan/personalia',
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
Ext.define('MY.searchGridBawahan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBawahan',
    store: storeGridBawahan,
    width: 180
});
var smGridBawahan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridBawahan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteBawahan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteBawahan').enable();
        }
    }
});
Ext.define('GridBawahan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridBawahan,
    width: 730,
    // autoScroll: true,
    title: 'Daftar Bawahan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridBawahanID',
    id: 'GridBawahanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridBawahan',
    store: storeGridBawahan,
    loadMask: true,
    //  defaults: {
    //     padding: '5 5 15 5'
    // },
    columns: [
        {
            text: 'Ubah Utasan',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Ubah Utasan',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                    // Ext.getCmp('companynameOrganisasi').setValue(selectedRecord.get('companyname'));
                    // console.log(selectedRecord.get('idpekerjaan'));
                    
                      var formBawahan = Ext.getCmp('formBawahan');
                            formBawahan.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/pekerjaan/1/personalia',
                                params: {
                                    extraparams: 'a.idpekerjaan:' + selectedRecord.get('idpekerjaan')
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wBawahan.show();
                            Ext.getCmp('statusformBawahan').setValue('edit');
                            Ext.getCmp('idpergerakanpersonil_fBawahan').setValue(Ext.getCmp('idpergerakanpersonil_fPergerakanP').getValue());
                            Ext.getCmp('statuspergerakan_fBawahan').setValue(Ext.getCmp('statuspergerakan_fPergerakanP').getValue());
            }
        },
        {header: 'idpekerjaan', dataIndex: 'idpekerjaan', hidden: true},
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150, flex:1},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150}
        // {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        // {header: 'Jabatan Atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        // {header: 'Organisasi Atasan', dataIndex: 'namaorgatasan', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Tambah',
                //     id:'tambahBawahanBtn',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         wBawahan.show();
                //         Ext.getCmp('statusformBawahan').setValue('input');
                //         Ext.getCmp('idpergerakanpersonil_fBawahan').setValue(Ext.getCmp('idpergerakanpersonil_fPergerakanP').getValue());
                //         Ext.getCmp('idpelamar_fBawahan').setValue(Ext.getCmp('idpelamar_fPergerakanP').getValue());
                //     }
                // },
                {
                    text: 'Ubah Atasanx',
                    hidden:true,
                    id:'btnDetailBawahanPergerakanx',
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GridBawahan')[0];
                        var grid = Ext.getCmp('GridBawahanID');
                        // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        console.log(grid);
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formBawahan = Ext.getCmp('formBawahan');
                            formBawahan.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/pekerjaan/1/personalia',
                                params: {
                                    extraparams: 'a.idpekerjaan:' + selectedRecord.data.idpekerjaan
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wBawahan.show();
                            Ext.getCmp('statusformBawahan').setValue('edit');
                            Ext.getCmp('idpergerakanpersonil_fBawahan').setValue(Ext.getCmp('idpergerakanpersonil_fPergerakanP').getValue());
                            Ext.getCmp('statuspergerakan_fBawahan').setValue(Ext.getCmp('statuspergerakan_fPergerakanP').getValue());
                            
                        }

                    }
                },
//                  {
//                     id: 'btnDeleteBawahan',
//                     text: 'Hapus',
//                     iconCls: 'delete-icon',
//                     handler: function() {
//                         Ext.Msg.show({
//                             title: 'Konfirmasi',
//                             msg: 'Hapus data terpilih ?',
//                             buttons: Ext.Msg.YESNO,
//                             fn: function(btn) {
//                                 if (btn == 'yes') {
//                                     var grid = Ext.ComponentQuery.query('GridBawahan')[0];
//                                     var sm = grid.getSelectionModel();
//                                     selected = [];
//                                     Ext.each(sm.getSelection(), function(item) {
//                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                     });
//                                     Ext.Ajax.request({
//                                         url: SITE_URL + 'backend/ext_delete/Bawahan/natadaya/hidden',
//                                         method: 'POST',
//                                         params: {postdata: Ext.encode(selected)}
//                                     });
//                                     storeGridBawahan.remove(sm.getSelection());
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
                    xtype: 'searchGridBawahan',
                    text: 'Left Button'
                }

            ]
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridBawahan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formBawahan = Ext.getCmp('formBawahan');
            // wBawahan.show();
            // formBawahan.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/pekerjaan/1/personalia',
            //     params: {
            //         extraparams: 'a.idpekerjaan:' + record.data.idpekerjaan
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformBawahan').setValue('edit');
        }
    }
});
