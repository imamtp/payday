
var formKehadiran = Ext.create('Ext.form.Panel', {
    id: 'formKehadiran',
    width: 450,
//    height: 300,
    url: SITE_URL + 'kehadiran/saveKehadiran',
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
            name: 'statusformKehadiran',
            id: 'statusformKehadiran'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkehadiran',
            name: 'idkehadiran'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamar_fKehadiran',
            name: 'idpelamar'
        },
         Ext.define('Ext.ux.namaatasan_fPergerakanP', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namalengkap_fKehadiran',
            editable: false,
            fieldLabel: 'Nama Karyawan',
            allowBlank: false,
            id:'namalengkap_fKehadiran',
            name: 'namalengkap',
            emptyText: 'Pilih Karyawan...',
            onTriggerClick: function() {
                 wGridNamaPegFormHadirListPopup.show();
                storeGridNamaPegFormHadirList.load();
            }
        }),
         {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan',
            name:'namajabatan',
            id: 'namajabatan_fKehadiran'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi',
            name:'namaorg',
            id: 'namaorg_fKehadiran'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Atasan',
            name:'namaatasan',
            id: 'namaatasan_fKehadiran'
        },
        {
            xtype:'comboxjamKerja'
         },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tglhadir',
            allowBlank: false,
            fieldLabel: 'Tanggal'
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Masuk',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'jammasuk_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'jammasuk_menit',
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
            fieldLabel: 'Jam Pulang',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'jampulang_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'jampulang_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ' (hh:mm)'
               }
            ]
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupKehadiran');
                Ext.getCmp('formKehadiran').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKehadiranSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formKehadiran').getForm().reset();
                            Ext.getCmp('windowPopupKehadiran').hide();
                            storeGridKehadiran.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKehadiran.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKehadiran = Ext.create('widget.window', {
    id: 'windowPopupKehadiran',
    title: 'Form Kehadiran',
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
    items: [formKehadiran]
});

Ext.define('GridKehadiranModel', {
    extend: 'Ext.data.Model',
    fields: ['idkehadiran','idpelamar','tglhadir','jamhadir','jampulang','durasiistirahat','durasikerja','keterlambatan','nik','namalengkap','namajabatan','namaorg','namaatasan','namajabatanatasan','namaorgatasan','companyname'],
    idProperty: 'id'
});

var storeGridKehadiran = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKehadiranModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'kehadiran/datakehadiran',
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
storeGridKehadiran.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'startdate': Ext.getCmp('startdate_kehadiran').getValue(),
                    'enddate': Ext.getCmp('enddate_kehadiran').getValue()
                  };
              });
Ext.define('MY.searchGridKehadiran', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKehadiran',
    store: storeGridKehadiran,
    width: 180
});
var smGridKehadiran = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKehadiran.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKehadiran').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKehadiran').enable();
        }
    }
});
Ext.define('GridKehadiran', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKehadiran,
    title: 'Data Kehadiran',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKehadiranID',
    id: 'GridKehadiranID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKehadiran',
    store: storeGridKehadiran,
    loadMask: true,
    columns: [
        {header: 'idkehadiran', dataIndex: 'idkehadiran', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Organisasi', dataIndex: 'namaorg', minWidth: 150},       
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        {header: 'Tgl Hadir', dataIndex: 'tglhadir', minWidth: 150},    
        {header: 'Jam Hadir', dataIndex: 'jamhadir', minWidth: 150},    
        {header: 'Jam Pulang', dataIndex: 'jampulang', minWidth: 150},    
        {header: 'Durasi Istirahat', dataIndex: 'durasiistirahat', minWidth: 150},    
        {header: 'Durasi Kerja', dataIndex: 'durasikerja', minWidth: 150},    
        {header: 'Keterlambatan(menit)', dataIndex: 'keterlambatan', minWidth: 150},  
        // {header: 'Jabatan atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        // {header: 'Org atasan', dataIndex: 'namaorgatasan', minWidth: 150},
        // {header: 'Nama izin', dataIndex: 'namaizin', minWidth: 150},
        // {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        // {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        // {header: 'Durasi(hari)', dataIndex: 'durasi', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
               {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    id:'startdate_kehadiran',
                    name:'startdate',
                    allowBlank: false,
                    fieldLabel: 'Tanggal',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            if (Ext.getCmp('startdate_kehadiran').getValue() != null && Ext.getCmp('enddate_kehadiran').getValue() != null)
                            {
                               storeGridKehadiran.load()
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    id:'enddate_kehadiran',
                    name:'enddate',
                    labelWidth:30,
                    allowBlank: false,
                    fieldLabel: 's/d',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            if (Ext.getCmp('startdate_kehadiran').getValue() != null && Ext.getCmp('enddate_kehadiran').getValue() != null)
                            {
                               storeGridKehadiran.load()
                            }
                        }
                    }
                },{
                            // itemId: 'reloadDataJGeneral',
                    text: 'Cari',
                    iconCls: 'cog-icon',
                    handler: function() {
                        if (Ext.getCmp('startdate_kehadiran').getValue() != null && Ext.getCmp('enddate_kehadiran').getValue() != null)
                        {
                           storeGridKehadiran.load()
                        }
                    }
                },{
                    // itemId: 'reloadDataJGeneral',
                    text: 'Refresh',
                    iconCls: 'refresh',
                    handler: function() {
                        if (Ext.getCmp('startdate_kehadiran').getValue() != null && Ext.getCmp('enddate_kehadiran').getValue() != null)
                        {
                           storeGridKehadiran.load()
                        }
                    }   
                }
            ]
        },
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
                                roleid: 135
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wKehadiran.show();
                                    Ext.getCmp('statusformKehadiran').setValue('input');
                                    jamKerjaStore.load();
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
                    text: 'Import Kehadiran',
                    iconCls: 'page_excel',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 136
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    winImportKehadiran.show();
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
                                roleid: 137
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridKehadiran')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formKehadiran = Ext.getCmp('formKehadiran');
                                        formKehadiran.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Kehadiran/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idKehadiran:' + selectedRecord.data.idKehadiran
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wKehadiran.show();
                                        Ext.getCmp('statusformKehadiran').setValue('edit');
                                    }
                                    jamKerjaStore.load();
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
                    id: 'btnDeleteKehadiran',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 138
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
                                                var grid = Ext.ComponentQuery.query('GridKehadiran')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Kehadirandel/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridKehadiran.remove(sm.getSelection());
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
                    xtype: 'searchGridKehadiran',
                    emptyText:'NIK/Nama...',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridKehadiran, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKehadiran.load();
                jenisizinStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formKehadiran = Ext.getCmp('formKehadiran');
            wKehadiran.show();
            formKehadiran.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Kehadiran/1/kehadiran',
                params: {
                    extraparams: 'a.idKehadiran:' + record.data.idKehadiran
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformKehadiran').setValue('edit');
        }
    }
});
