Ext.define('GridProsesUpahModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','idpekerjaan','ni','nik','namalengkap','kehadiran','tgllahir','namajabatan','namalokasi','tglmasuk','tglberakhir','kekaryaanname','tipe'],
    idProperty: 'id'
});

var storeGridProsesUpah = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProsesUpahModel',
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

storeGridProsesUpah.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterProsesUpah').getValue()+','+'b.idjabatan:'+Ext.getCmp('namajabatan_filterProsesUpah').getValue()+','+'b.idorganisasi:'+Ext.getCmp('namaorg_filterProsesUpah').getValue(),
                    'startdate': Ext.getCmp('startdate_gaji').getSubmitValue(),
                    'enddate': Ext.getCmp('enddate_gaji').getSubmitValue()
                    // 'tglmasuk2': Ext.getCmp('enddate_ProsesUpah').getSubmitValue(),
                    // 'tipe': 'pergerakan',
                  };
              });

Ext.define('MY.searchGridProsesUpah', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProsesUpah',
    store: storeGridProsesUpah,
    width: 180
});
var smGridProsesUpah = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridProsesUpah.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteProsesUpah').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteProsesUpah').enable();
        }
    }
});
Ext.define('GridProsesUpah', {
    title: 'Proses Pengupahan Karyawan',
    itemId: 'GridProsesUpahID',
    id: 'GridProsesUpahID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProsesUpah',
    store: storeGridProsesUpah,
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
                        id:'filtercb_companyProsesUpah',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyProsesUpah').getValue())
                                    {
                                        Ext.getCmp('companyname_filterProsesUpah').setValue(null);
                                        Ext.getCmp('companyname_filterProsesUpah').setDisabled(true);
                                        // storeGridProsesUpah.load();
                                    } else {
                                        Ext.getCmp('companyname_filterProsesUpah').setDisabled(false);
                                        // storeGridProsesUpah.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterProsesUpah',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridProsesUpah.load();
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
                        id:'filtercb_orgProsesUpah',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgProsesUpah').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterProsesUpah').setValue(null);
                                        Ext.getCmp('namaorg_filterProsesUpah').setDisabled(true);
                                        // storeGridProsesUpah.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterProsesUpah').setDisabled(false);
                                        // storeGridProsesUpah.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterProsesUpah',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridProsesUpah.load();
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
                        id:'filtercb_jabatanProsesUpah',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanProsesUpah').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterProsesUpah').setValue(null);
                                        Ext.getCmp('namajabatan_filterProsesUpah').setDisabled(true);
                                        // storeGridProsesUpah.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterProsesUpah').setDisabled(false);
                                        // storeGridProsesUpah.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        id: 'namajabatan_filterProsesUpah',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridProsesUpah.load();
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
                        labelWidth:150,
                        format: 'd-m-y',
                        allowBlank: false,
                        name:'startdate',
                        id:'startdate_gaji',
                        fieldLabel: 'Periode Penggajian'
                    },
                    {
                        xtype: 'datefield',
                        labelWidth:60,
                        format: 'd-m-y',
                        allowBlank: false,
                        name:'enddate',
                        id:'enddate_gaji',
                        fieldLabel: 's/d'
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
                //         Ext.getCmp('statusformProsesUpah').setValue('input');
                //         Ext.getCmp('formProsesUpah').getForm().reset();
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


                //             Ext.getCmp('companyname_filterProsesUpah').setValue(null);
                //             Ext.getCmp('namaorg_filterProsesUpah').setValue(null);
                //             Ext.getCmp('namajabatan_filterProsesUpah').setValue(null);
                //             Ext.getCmp('startdate_ProsesUpah').setValue(null);
                //             Ext.getCmp('enddate_ProsesUpah').setValue(null);
                //             storeGridProsesUpah.reload();
                //         }
                // },
                {
                                text: 'Jalankan Filter',
                                iconCls: 'cog-icon',
                                handler: function() {
                                    storeGridProsesUpah.load();
                        }
                    },
                    {
                            text: 'Hapus Filter',
                            iconCls: 'refresh',
                            handler: function() {
                                Ext.getCmp('companyname_filterProsesUpah').setValue(null);
                                Ext.getCmp('namaorg_filterProsesUpah').setValue(null);
                                Ext.getCmp('namajabatan_filterProsesUpah').setValue(null);
                                storeGridProsesUpah.reload();
                            }
                    },
                {
                    text: 'Detail Karyawan',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridProsesUpah')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
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

                        }

                    }
                },
                {
                    text: 'Proses Pengupahan',
                    iconCls: 'penggajian-icon',
                    handler: function() {
                        storeGridProsesUpah.load();
                    }
                },
                 '->',
                'Pencarian Nama Karyawan: ', ' ',
                {
                    xtype: 'searchGridProsesUpah',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridProsesUpah, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridProsesUpah.load();
                 tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisProsesUpahpStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {


        }
    }
});
