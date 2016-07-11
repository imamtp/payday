Ext.define('GridUpahKaryBaruModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','idpekerjaan','ni','nik','namalengkap','tgllahir','namajabatan','namalokasi','tglmasuk','tglberakhir','kekaryaanname','tipe'],
    idProperty: 'id'
});

var storeGridUpahKaryBaru = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUpahKaryBaruModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/penyesuaianupah/kompensasi',
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

storeGridUpahKaryBaru.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterUpahKaryBaru').getValue()+','+'b.idjabatan:'+Ext.getCmp('namajabatan_filterUpahKaryBaru').getValue()+','+'b.idorganisasi:'+Ext.getCmp('namaorg_filterUpahKaryBaru').getValue(),
                    'tglmasuk1': Ext.getCmp('startdate_UpahKaryBaru').getSubmitValue(),
                    'tglmasuk2': Ext.getCmp('enddate_UpahKaryBaru').getSubmitValue(),
                    'tipe': 'baru',
                  };
              });

Ext.define('MY.searchGridUpahKaryBaru', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridUpahKaryBaru',
    store: storeGridUpahKaryBaru,
    width: 180
});
var smGridUpahKaryBaru = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridUpahKaryBaru.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteUpahKaryBaru').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteUpahKaryBaru').enable();
        }
    }
});
Ext.define('GridUpahKaryBaru', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridUpahKaryBaru,
    title: 'Pengupahan Karyawan Baru',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridUpahKaryBaruID',
    id: 'GridUpahKaryBaruID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUpahKaryBaru',
    store: storeGridUpahKaryBaru,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'idpekerjaan', dataIndex: 'idpekerjaan', hidden: true},
        // {header: 'NI', dataIndex: 'ni', minWidth: 150},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150},
        //
        {header: 'Tgl Lahir', dataIndex: 'tgllahir', minWidth: 150},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Kekaryawanan', dataIndex: 'kekaryaanname', minWidth: 150},
        {header: 'Tgl Masuk', dataIndex: 'tglmasuk', minWidth: 150},
        {header: 'Tgl Berakhir', dataIndex: 'tglberakhir', minWidth: 150},
        // {header: 'Status', dataIndex: 'status', minWidth: 150},
        // {header: 'user in', dataIndex: 'userin', minWidth: 150},
        // {header: 'date in', dataIndex: 'datein', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Perusahaan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_companyUpahKaryBaru',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyUpahKaryBaru').getValue())
                                    {
                                        Ext.getCmp('companyname_filterUpahKaryBaru').setValue(null);
                                        Ext.getCmp('companyname_filterUpahKaryBaru').setDisabled(true);
                                        storeGridUpahKaryBaru.load();
                                    } else {
                                        Ext.getCmp('companyname_filterUpahKaryBaru').setDisabled(false);
                                        storeGridUpahKaryBaru.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterUpahKaryBaru',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridUpahKaryBaru.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_orgUpahKaryBaru',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgUpahKaryBaru').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterUpahKaryBaru').setValue(null);
                                        Ext.getCmp('namaorg_filterUpahKaryBaru').setDisabled(true);
                                        storeGridUpahKaryBaru.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterUpahKaryBaru').setDisabled(false);
                                        storeGridUpahKaryBaru.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterUpahKaryBaru',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridUpahKaryBaru.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Jabatan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_jabatanUpahKaryBaru',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanUpahKaryBaru').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterUpahKaryBaru').setValue(null);
                                        Ext.getCmp('namajabatan_filterUpahKaryBaru').setDisabled(true);
                                        storeGridUpahKaryBaru.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterUpahKaryBaru').setDisabled(false);
                                        storeGridUpahKaryBaru.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        id: 'namajabatan_filterUpahKaryBaru',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridUpahKaryBaru.load();
                                // console.log(this.value)
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
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'startdate_UpahKaryBaru',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Aktif Jabatan',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_UpahKaryBaru').getValue() != null && Ext.getCmp('enddate_UpahKaryBaru').getValue() != null)
                                        // {
                                           storeGridUpahKaryBaru.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_UpahKaryBaru',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_UpahKaryBaru').getValue() != null && Ext.getCmp('enddate_UpahKaryBaru').getValue() != null)
                                        // {
                                           storeGridUpahKaryBaru.load()
                                        // }
                                    }
                                }
                            }                            ,
                            {
                                text: 'Proses',
                                iconCls: 'cog-icon',
                                handler: function() {
                                    storeGridUpahKaryBaru.load();
                                }
                            },
                            {
                                    text: 'Hapus Filter',
                                    iconCls: 'refresh',
                                    handler: function() {
                                        Ext.getCmp('companyname_filterUpahKaryBaru').setValue(null);
                                        Ext.getCmp('namaorg_filterUpahKaryBaru').setValue(null);
                                        Ext.getCmp('namajabatan_filterUpahKaryBaru').setValue(null);
                                        Ext.getCmp('startdate_UpahKaryBaru').setValue(null);
                                        Ext.getCmp('enddate_UpahKaryBaru').setValue(null);
                                        storeGridUpahKaryBaru.reload();
                                    }
                            }
                ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Tambah',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         WindowKaryawan.show();
                //         Ext.getCmp('statusformUpahKaryBaru').setValue('input');
                //         Ext.getCmp('formUpahKaryBaru').getForm().reset();
                //         Ext.getCmp('namalengkap_dkaryawan').setValue(null);
                //         Ext.getCmp('companyname_dkaryawan').setValue(null);
                //         Ext.getCmp('status_dkaryawan').setValue(null);
                //         Ext.getCmp('ni_dkaryawan').setValue(null);
                //         Ext.getCmp('nik_dkaryawan').setValue(null);
                //     }
                // },
                // {
                //         text: 'Clear Filter',
                //         iconCls: 'refresh',
                //         handler: function() {


                //             Ext.getCmp('companyname_filterUpahKaryBaru').setValue(null);
                //             Ext.getCmp('namaorg_filterUpahKaryBaru').setValue(null);
                //             Ext.getCmp('namajabatan_filterUpahKaryBaru').setValue(null);
                //             Ext.getCmp('startdate_UpahKaryBaru').setValue(null);
                //             Ext.getCmp('enddate_UpahKaryBaru').setValue(null);
                //             storeGridUpahKaryBaru.reload();
                //         }
                // },
                {
                    text: 'Penyesuaian',
                    iconCls: 'edit-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 160
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridUpahKaryBaru')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                            Ext.getCmp('idpelamar_dkaryawan').setValue( selectedRecord.data.idpelamar);

                                            var formDataKaryawan = Ext.getCmp('formDataKaryawan');
                                            formDataKaryawan.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/VDataKaryawan/1/personalia',
                                                params: {
                                                    extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(action.response.responseText);
                                                    getFotoPegawai(d.data.idpelamar);
                                                    setValueHeader(d);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            })

                                            WindowKaryawan.show();

                                            funcTabDataKaryawan(false);

                                            var formIdentitas = Ext.getCmp('formIdentitas');
                                            formIdentitas.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/Identitas/1/personalia',
                                                params: {
                                                    extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                                },
                                                success: function(form, action) {
                                                     Ext.MessageBox.hide();
                                                },
                                                failure: function(form, action) {
                                                    Ext.MessageBox.hide();
                                                }
                                            })
                                            Ext.getCmp('companyname_dkaryawan').setReadOnly(true);

                                            Ext.getCmp('TabItemKaryawan').setActiveTab(8);

                                            Ext.getCmp('tipePenyesuaianUpah').setValue('baru');
                                            Ext.getCmp('idpekerjaanPenyesuaianUpah').setValue(selectedRecord.data.idpekerjaan);



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
                },

                 '->',
                'Pencarian Nama Karyawan: ', ' ',
                {
                    xtype: 'searchGridUpahKaryBaru',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridUpahKaryBaru, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridUpahKaryBaru.load();
                 tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisUpahKaryBarupStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {


        }
    }
});
