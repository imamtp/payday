
var formPengajuanIzin = Ext.create('Ext.form.Panel', {
    id: 'formPengajuanIzin',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/PengajuanIzinCrud/kehadiran',
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
            name: 'statusformPengajuanIzinCrud',
            id: 'statusformPengajuanIzinCrud'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpengajuanizin',
            name: 'idpengajuanizin'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamar_fPengajuanIzin',
            name: 'idpelamar'
        },
         Ext.define('Ext.ux.namaatasan_fPergerakanP', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namalengkap_fPengajuanIzin',
            editable: false,
            fieldLabel: 'Nama Karyawan',
            allowBlank: false,
            id:'namalengkap_fPengajuanIzin',
            name: 'namalengkap',
            emptyText: 'Pilih Karyawan...',
            onTriggerClick: function() {
                 wGridNamaPegFormIzinListPopup.show();
                storeGridNamaPegFormIzinList.load();
            }
        }),
         {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan',
            name:'namajabatan',
            id: 'namajabatan_fPengajuanIzin'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi',
            name:'namaorg',
            id: 'namaorg_fPengajuanIzin'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Atasan',
            name:'namaatasan',
            id: 'namaatasan_fPengajuanIzin'
        },
        {
            xtype:'comboxjenisizin',
            allowBlank:false
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Akhir'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPengajuanIzin');
                Ext.getCmp('formPengajuanIzin').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPengajuanIzinSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPengajuanIzin').getForm().reset();
                            Ext.getCmp('windowPopupPengajuanIzin').hide();
                            storeGridPengajuanIzin.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPengajuanIzin.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPengajuanIzin = Ext.create('widget.window', {
    id: 'windowPopupPengajuanIzin',
    title: 'Form Pengajuan Izin',
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
    items: [formPengajuanIzin]
});

Ext.define('GridPengajuanIzinModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengajuanizin','idpelamar','idjenisizin','startdate','enddate','namalengkap','durasi','namaatasan','namajabatanatasan','namaorgatasan','namaizin','namajabatan','namaorg','nik','companyname'],
    idProperty: 'id'
});

var storeGridPengajuanIzin = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPengajuanIzinModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PengajuanIzin/kehadiran',
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
Ext.define('MY.searchGridPengajuanIzin', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPengajuanIzin',
    store: storeGridPengajuanIzin,
    width: 180
});
var smGridPengajuanIzin = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPengajuanIzin.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePengajuanIzin').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePengajuanIzin').enable();
        }
    }
});
Ext.define('GridPengajuanIzin', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPengajuanIzin,
    title: 'Daftar Pengajuan Izin',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPengajuanIzinID',
    id: 'GridPengajuanIzinID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPengajuanIzin',
    store: storeGridPengajuanIzin,
    loadMask: true,
    columns: [
        {header: 'idpengajuanizin', dataIndex: 'idpengajuanizin', hidden: true},
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Organisasi', dataIndex: 'namaorg', minWidth: 150},       
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        {header: 'Jabatan atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        {header: 'Org atasan', dataIndex: 'namaorgatasan', minWidth: 150},
        {header: 'Nama izin', dataIndex: 'namaizin', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'Durasi(hari)', dataIndex: 'durasi', minWidth: 150},
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
                                roleid: 126
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPengajuanIzin.show();
                                    Ext.getCmp('statusformPengajuanIzinCrud').setValue('input');
                                    storeGridJenisIzin.load();
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
                                roleid: 127
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPengajuanIzin')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPengajuanIzin = Ext.getCmp('formPengajuanIzin');
                                        formPengajuanIzin.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/PengajuanIzin/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idpengajuanizin:' + selectedRecord.data.idpengajuanizin
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPengajuanIzin.show();
                                        Ext.getCmp('statusformPengajuanIzinCrud').setValue('edit');
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
                    id: 'btnDeletePengajuanIzin',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 128
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
                                                var grid = Ext.ComponentQuery.query('GridPengajuanIzin')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/PengajuanIzindel/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPengajuanIzin.remove(sm.getSelection());
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
                    xtype: 'searchGridPengajuanIzin',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPengajuanIzin, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPengajuanIzin.load();
                jenisizinStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formPengajuanIzin = Ext.getCmp('formPengajuanIzin');
            // wPengajuanIzin.show();
            // formPengajuanIzin.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PengajuanIzin/1/kehadiran',
            //     params: {
            //         extraparams: 'a.idpengajuanizin:' + record.data.idpengajuanizin
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPengajuanIzinCrud').setValue('edit');
        }
    }
});
