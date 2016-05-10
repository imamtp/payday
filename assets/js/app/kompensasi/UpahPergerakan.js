Ext.define('GridUpahPergerakanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','idpekerjaan','ni','nik','namalengkap','tgllahir','namajabatan','namalokasi','tglmasuk','tglberakhir','kekaryaanname','tipe'],
    idProperty: 'id'
});

var storeGridUpahPergerakan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUpahPergerakanModel',
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

storeGridUpahPergerakan.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterUpahPergerakan').getValue()+','+'b.idjabatan:'+Ext.getCmp('namajabatan_filterUpahPergerakan').getValue()+','+'b.idorganisasi:'+Ext.getCmp('namaorg_filterUpahPergerakan').getValue(),
                    'tglmasuk1': Ext.getCmp('startdate_UpahPergerakan').getSubmitValue(),
                    'tglmasuk2': Ext.getCmp('enddate_UpahPergerakan').getSubmitValue(),
                    'tipe': 'pergerakan',
                  };
              });

Ext.define('MY.searchGridUpahPergerakan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridUpahPergerakan',
    store: storeGridUpahPergerakan,
    width: 180
});
var smGridUpahPergerakan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridUpahPergerakan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteUpahPergerakan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteUpahPergerakan').enable();
        }
    }
});
Ext.define('GridUpahPergerakan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridUpahPergerakan,
    title: 'Pengupahan Pergerakan Personil',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridUpahPergerakanID',
    id: 'GridUpahPergerakanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUpahPergerakan',
    store: storeGridUpahPergerakan,
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
                        id:'filtercb_companyUpahPergerakan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyUpahPergerakan').getValue())
                                    {
                                        Ext.getCmp('companyname_filterUpahPergerakan').setValue(null);
                                        Ext.getCmp('companyname_filterUpahPergerakan').setDisabled(true);
                                        storeGridUpahPergerakan.load();
                                    } else {
                                        Ext.getCmp('companyname_filterUpahPergerakan').setDisabled(false);
                                        storeGridUpahPergerakan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterUpahPergerakan',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridUpahPergerakan.load();
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
                        id:'filtercb_orgUpahPergerakan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgUpahPergerakan').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterUpahPergerakan').setValue(null);
                                        Ext.getCmp('namaorg_filterUpahPergerakan').setDisabled(true);
                                        storeGridUpahPergerakan.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterUpahPergerakan').setDisabled(false);
                                        storeGridUpahPergerakan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterUpahPergerakan',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridUpahPergerakan.load();
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
                        id:'filtercb_jabatanUpahPergerakan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanUpahPergerakan').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterUpahPergerakan').setValue(null);
                                        Ext.getCmp('namajabatan_filterUpahPergerakan').setDisabled(true);
                                        storeGridUpahPergerakan.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterUpahPergerakan').setDisabled(false);
                                        storeGridUpahPergerakan.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        id: 'namajabatan_filterUpahPergerakan',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridUpahPergerakan.load();
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
                                id:'startdate_UpahPergerakan',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Aktif Jabatan',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_UpahPergerakan').getValue() != null && Ext.getCmp('enddate_UpahPergerakan').getValue() != null)
                                        // {
                                           storeGridUpahPergerakan.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_UpahPergerakan',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_UpahPergerakan').getValue() != null && Ext.getCmp('enddate_UpahPergerakan').getValue() != null)
                                        // {
                                           storeGridUpahPergerakan.load()
                                        // }
                                    }
                                }
                            }                            ,
                            {
                                text: 'Proses',
                                iconCls: 'cog-icon',
                                handler: function() {
                                    storeGridUpahPergerakan.load();
                                }
                            },
                            {
                                    text: 'Hapus Filter',
                                    iconCls: 'refresh',
                                    handler: function() {
                                        Ext.getCmp('companyname_filterUpahPergerakan').setValue(null);
                                        Ext.getCmp('namaorg_filterUpahPergerakan').setValue(null);
                                        Ext.getCmp('namajabatan_filterUpahPergerakan').setValue(null);
                                        Ext.getCmp('startdate_UpahPergerakan').setValue(null);
                                        Ext.getCmp('enddate_UpahPergerakan').setValue(null);
                                        storeGridUpahPergerakan.reload();
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
                //         Ext.getCmp('statusformUpahPergerakan').setValue('input');
                //         Ext.getCmp('formUpahPergerakan').getForm().reset();
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


                //             Ext.getCmp('companyname_filterUpahPergerakan').setValue(null);
                //             Ext.getCmp('namaorg_filterUpahPergerakan').setValue(null);
                //             Ext.getCmp('namajabatan_filterUpahPergerakan').setValue(null);
                //             Ext.getCmp('startdate_UpahPergerakan').setValue(null);
                //             Ext.getCmp('enddate_UpahPergerakan').setValue(null);
                //             storeGridUpahPergerakan.reload();
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
                                roleid: 161
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridUpahPergerakan')[0];
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

                                            Ext.getCmp('TabItemKaryawan').setActiveTab(8);

                                            Ext.getCmp('tipePenyesuaianUpah').setValue('pergerakan');
                                            Ext.getCmp('idpekerjaanPenyesuaianUpah').setValue(selectedRecord.data.idpekerjaan);

                                            Ext.getCmp('btnUbahNilaiUT').show();

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
                    xtype: 'searchGridUpahPergerakan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridUpahPergerakan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridUpahPergerakan.load();
                 tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisUpahPergerakanpStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {


        }
    }
});
