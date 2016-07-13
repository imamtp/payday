Ext.define('GridSuratLemburModel', {
    extend: 'Ext.data.Model',
    fields: ['idlembur','idpelamar','idwaktulembur','tgllembur','namarumuslembur','formulalembur','idformulalembur','waktulembur','datein','userin','mulailembur_jam','mulailembur_menit','akhirlembur_jam','akhirlembur_menit','jammulailembur','jamakhirlembur','durasi','namalengkap','namajabatan','namaorg','namaatasan','namajabatanatasan','namaorgatasan','nik','display','idcompany','companyname','namajamkerja','durasi_istirahat','durasi_total'],
    idProperty: 'id'
});

var storeJamKerja = Ext.create('Ext.data.Store', {
        fields: ['idjamkerjaharian', 'namajamkerja'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jamkerjaharian',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboJamKerja', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboJamKerja',
    fieldLabel: 'Jam Kerja',
    editable: false,
    triggerAction: 'all',
    displayField: 'namajamkerja',
    valueField: 'idjamkerjaharian',
    name: 'namajamkerja',
    store: storeJamKerja
})

var storeGridSuratLembur = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSuratLemburModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/VSuratLembur/kehadiran',
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

var formSuratLembur = Ext.create('Ext.form.Panel', {
    id: 'formSuratLembur',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/SuratLembur/kehadiran',
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
    defaults: {
        layout: {
            type: 'hbox',
            defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformSuratLembur',
            id: 'statusformSuratLembur'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idlembur',
            name: 'idlembur'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamar_fSuratLembur',
            name: 'idpelamar'
        },
         Ext.define('Ext.ux.namaatasan_fPergerakanP', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namalengkap_fSuratLembur',
            editable: false,
            fieldLabel: 'Nama Karyawan',
            allowBlank: false,
            id:'namalengkap_fSuratLembur',
            name: 'namalengkap',
            emptyText: 'Pilih Karyawan...',
            onTriggerClick: function() {
                 wGridNamaPegFormLemburListPopup.show();
                storeGridNamaPegFormLemburList.load();
            }
        }),
         {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan',
            name:'namajabatan',
            id: 'namajabatan_fSuratLembur'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi',
            name:'namaorg',
            id: 'namaorg_fSuratLembur'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Atasan',
            name:'namaatasan',
            id: 'namaatasan_fSuratLembur'
        },
        {
            xtype:'comboxWaktuLembur'
        },
        {
            xtype:'comboJamKerja',
            id:'comboJamKerja'
        }
        ,{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tgllembur',
            allowBlank: false,
            fieldLabel: 'Tgl Lembur'
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Mulai Lembur',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'mulailembur_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'mulailembur_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ' (hh:mm)'
               }
            ]
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Selesai Lembur',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'akhirlembur_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'akhirlembur_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ' (hh:mm)'
               }
            ]
        },
        {
            xtype:'numberfield',
            minValue:30,
            fieldLabel:'Durasi Istirahat (Menit)',
            name:'durasi_istirahat',
            allowBlank:false
        },
        {
            xtype: 'hiddenfield',
            fieldLabel: 'idformulalembur',
            id:'idformulalembur_fRumusLembur',
            name: 'idformulalembur'
        },
        Ext.define('Ext.ux.namarumuslembur_fRumusLembur', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namarumuslembur_fRumusLembur',
            fieldLabel: 'Formula Lembur',
            allowBlank: false,
            editable:false,
            id: 'namarumuslembur_fRumusLembur',
            name: 'namarumuslembur',
            emptyText: 'Pilih Formula Lembur...',
            onTriggerClick: function() {
                wGridFormulaLemburListPopup.show();
                // storeGridPelamarList.on('beforeload',function(store, operation,eOpts){
                //     operation.params={
                //                 'extraparams': 'a.status:Diajukan'
                //     };
                // });
                storeGridFormulaLemburList.load();
            }
        })
        // {
        //     xtype:'comboxJenisFormLembur',
        //     allowBlank: false
        // }
        ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSuratLembur');
                Ext.getCmp('formSuratLembur').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnSuratLemburSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formSuratLembur').getForm().reset();
                            Ext.getCmp('windowPopupSuratLembur').hide();
                            storeGridSuratLembur.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSuratLembur.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wSuratLembur = Ext.create('widget.window', {
    id: 'windowPopupSuratLembur',
    title: 'Form Lembur',
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
    items: [formSuratLembur]
});


Ext.define('MY.searchGridSuratLembur', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSuratLembur',
    store: storeGridSuratLembur,
    width: 180
});
var smGridSuratLembur = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSuratLembur.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSuratLembur').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSuratLembur').enable();
        }
    }
});
Ext.define('GridSuratLembur', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSuratLembur,
    title: 'Daftar Lembur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSuratLemburID',
    id: 'GridSuratLemburID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSuratLembur',
    store: storeGridSuratLembur,
    loadMask: true,
    columns: [
        {header: 'idlembur', dataIndex: 'idlembur', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Organisasi', dataIndex: 'namaorg', minWidth: 150},       
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        {header: 'Jabatan atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        {header: 'Org atasan', dataIndex: 'namaorgatasan', minWidth: 150},
        {header: 'Waktu Lembur', dataIndex: 'waktulembur', minWidth: 150},
        {header: 'Tgl Lembur', dataIndex: 'tgllembur', minWidth: 150},
        {header: 'Jam Kerja', dataIndex: 'namajamkerja', minWidth: 150},
        {header: 'Jam Mulai', dataIndex: 'jammulailembur', minWidth: 150},
        {header: 'Jam Selesai', dataIndex: 'jamakhirlembur', minWidth: 150},
        {header: 'Istirahat (Menit)', dataIndex: 'durasi_istirahat', minWidth: 150},
        {header: 'Durasi Lembur (Jam)', dataIndex: 'durasi_total', minWidth: 150},
        {header: 'Formula', dataIndex: 'namarumuslembur', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 132
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wSuratLembur.show();
                                    Ext.getCmp('statusformSuratLembur').setValue('input');
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 133
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    storeJamKerja.load();

                                    var grid = Ext.ComponentQuery.query('GridSuratLembur')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formSuratLembur = Ext.getCmp('formSuratLembur');
                                        formSuratLembur.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/VSuratLembur/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idlembur:' + selectedRecord.data.idlembur
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                Ext.getCmp('comboJamKerja').setValue(d.data.idjamkerjaharian);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wSuratLembur.show();
                                        Ext.getCmp('statusformSuratLembur').setValue('edit');
                                    }
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        

                    }
                }, {
                    id: 'btnDeleteSuratLembur',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 134
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.Msg.show({
                                        title: 'Konfirmasi',
                                        msg: 'Hapus data terpilih ?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                                var grid = Ext.ComponentQuery.query('GridSuratLembur')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/SuratLemburdel/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridSuratLembur.remove(sm.getSelection());
                                                sm.select(0);
                                            }
                                        }
                                    });
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSuratLembur',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridSuratLembur, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSuratLembur.load();
                jenisizinStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formSuratLembur = Ext.getCmp('formSuratLembur');
            wSuratLembur.show();
            formSuratLembur.getForm().load({
                url: SITE_URL + 'backend/loadFormData/VSuratLembur/1/kehadiran',
                params: {
                    extraparams: 'a.idlembur:' + record.data.idlembur
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformSuratLembur').setValue('edit');
        }
    }
});
