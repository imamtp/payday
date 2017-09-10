
if(group_id=='2'){
    var hapusDataBtn = false;
} else {
    var hapusDataBtn = true;
}

Ext.define('GridDataKaryawanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar', 'namalengkap', 'tgllahir', 'namaagama', 'email2', 'nohandphone2', 'noktp', 'alamat', 'notelp', 'nohandphone', 'jabatandituju', 'tgllamaran', 'status', 'userin', 'usermod', 'datein', 'datemod', 'tempatlahir', 'email', 'daerahrekrut', 'alamatktp', 'fakultas', 'jurusan', 'foto', 'cv', 'referensi', 'sumberlamaran', 'gelarakademik', 'kewarganegaraan', 'idagama', 'notelp2', 'sexname', 'namastatuskawin', 'namajenjang', 'umur', 'companyname', 'companycode', 'tglmasuk', 'tglberakhir', 'nik', 'ni', 'status', 'kekaryaanname', 'tglmasukpeg'],
    idProperty: 'id'
});

var storeGridDataKaryawan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDataKaryawanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/VDataKaryawangrid/personalia',
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

storeGridDataKaryawan.on('beforeload', function (store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.idcompany:' + Ext.getCmp('companyname_filterDataKaryawan').getValue() + ',' + 'e.idorganisasi:' + Ext.getCmp('namaorg_filterDataKaryawan').getValue() + ',' + 'e.idjabatan:' + Ext.getCmp('namajabatan_filterDataKaryawan').getValue(),
        'tglmasuk1': Ext.getCmp('startdate_DataKaryawan').getSubmitValue(),
        'tglmasuk2': Ext.getCmp('enddate_DataKaryawan').getSubmitValue(),
        'tglkeluar1': Ext.getCmp('startTerminatedate_DataKaryawan').getSubmitValue(),
        'tglkeluar2': Ext.getCmp('endTerminatedate_DataKaryawan').getSubmitValue(),
        'aktif': Ext.getCmp('keaktifanDataKaryawan').getValue()
    };
});


Ext.define('MY.searchGridDataKaryawan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDataKaryawan',
    store: storeGridDataKaryawan,
    width: 180
});
var smGridDataKaryawan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridDataKaryawan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteDataKaryawan').disable();
            }
        },
        select: function (model, record, index) {
            Ext.getCmp('btnDeleteDataKaryawan').enable();
        }
    }
});
Ext.define('GridDataKaryawan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridDataKaryawan,
    title: 'Daftar Karyawan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDataKaryawanID',
    id: 'GridDataKaryawanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDataKaryawan',
    store: storeGridDataKaryawan,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 190, flex: 1},
        // {header: 'NI', dataIndex: 'ni', minWidth: 150},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        // {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Tgl Lahir', dataIndex: 'tgllahir', minWidth: 150},
        {header: 'Jenis Kelamin', dataIndex: 'sexname', minWidth: 150},
        {header: 'No KTP', dataIndex: 'noktp', minWidth: 150},
        {header: 'No Telp', dataIndex: 'notelp', minWidth: 150},
        {header: 'No Ponsel', dataIndex: 'nohandphone', minWidth: 150},
        {header: 'Tgl Masuk', dataIndex: 'tglmasukpeg', minWidth: 150},
        {header: 'Tgl Berakhir', dataIndex: 'tglberakhir', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 220
                    // ,
                    //     renderer: function(value, metaData, record, row, col, store, gridView){
                    //         if(value==null)
                    //         {
                    //             return 'Belum ada pergerakan personil';
                    //         } else {
                    //             return value;
                    //         }
                    //     // return this.renderMarca(value, record);
                    //   }
        },
        // {header: 'user in', dataIndex: 'userin', minWidth: 150},
        // {header: 'date in', dataIndex: 'datein', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'displayfield',
                    labelWidth: 72,
                    fieldLabel: 'Perusahaan'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'checkbox1',
                    id: 'filtercb_companyDataKaryawan',
                    // fieldLabel: 'Semua',
                    boxLabel: 'Semua',
                    listeners: {
                        click: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function () {
                                if (Ext.getCmp('filtercb_companyDataKaryawan').getValue())
                                {
                                    Ext.getCmp('companyname_filterDataKaryawan').setValue(null);
                                    Ext.getCmp('companyname_filterDataKaryawan').setDisabled(true);
                                    // storeGridDataKaryawan.load();
                                    disableCbFilter(true);
                                } else {
                                    Ext.getCmp('companyname_filterDataKaryawan').setDisabled(false);
                                    // storeGridDataKaryawan.load();
                                    disableCbFilter(true);
                                }
                            }
                        }
                    }
                }, {
                    xtype: 'comboxcompany',
                    fieldLabel: '',
                    id: 'companyname_filterDataKaryawan',
                    name: 'companyname',
                    valueField: 'idcompany',
                    labelWidth: 70,
                    listeners: {
                        select: function (n,v) {
                            Ext.getCmp('filtercb_orgDataKaryawan').setDisabled(false);
                            Ext.getCmp('namaorg_filterDataKaryawan').setDisabled(false);
                            Ext.getCmp('filtercb_jabatanDataKaryawan').setDisabled(false);
                            Ext.getCmp('namajabatan_filterDataKaryawan').setDisabled(false);

                            // storeGridDataKaryawan.load();
                            orgStore.load({
                                params:{
                                    idcompany:v[0].data.idcompany
                                }
                            });
                            jabatanStore.load({
                                params:{
                                    idcompany:v[0].data.idcompany
                                }
                            });
                            // console.log(this.value)
                        }
                    }
                },
                {
                    xtype: 'displayfield',
                    id:'dfOrg',
                    labelWidth: 72,
                    fieldLabel: 'Organisasi'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'checkbox1',
                    id: 'filtercb_orgDataKaryawan',
                    // fieldLabel: 'Semua',
                    boxLabel: 'Semua',
                    listeners: {
                        click: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function () {
                                if (Ext.getCmp('filtercb_orgDataKaryawan').getValue())
                                {
                                    Ext.getCmp('namaorg_filterDataKaryawan').setValue(null);
                                    Ext.getCmp('namaorg_filterDataKaryawan').setDisabled(true);
                                    // storeGridDataKaryawan.load();
                                } else {
                                    Ext.getCmp('namaorg_filterDataKaryawan').setDisabled(false);
                                    // storeGridDataKaryawan.load();
                                }
                            }
                        }
                    }
                }, {
                    xtype: 'comboxOrg',
                    valueField: 'idorganisasi',
                    fieldLabel: '',
                    id: 'namaorg_filterDataKaryawan',
                    name: 'namaorg',
                    labelWidth: 70,
                    listeners: {
                        select: function () {
                            // storeGridDataKaryawan.load();
                            // console.log(this.value)
                        }
                    }
                },
                {
                    xtype: 'displayfield',
                    id:'dfJabatan',
                    labelWidth: 72,
                    fieldLabel: 'Jabatan'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'checkbox1',
                    id: 'filtercb_jabatanDataKaryawan',
                    // fieldLabel: 'Semua',
                    boxLabel: 'Semua',
                    listeners: {
                        click: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function () {
                                if (Ext.getCmp('filtercb_jabatanDataKaryawan').getValue())
                                {
                                    Ext.getCmp('namajabatan_filterDataKaryawan').setValue(null);
                                    Ext.getCmp('namajabatan_filterDataKaryawan').setDisabled(true);
                                    // storeGridDataKaryawan.load();
                                } else {
                                    Ext.getCmp('namajabatan_filterDataKaryawan').setDisabled(false);
                                    // storeGridDataKaryawan.load();
                                }
                            }
                        }
                    }
                },
                {
                    xtype: 'comboxJabatan',
                    valueField: 'idjabatan',
                    fieldLabel: '',
                    id: 'namajabatan_filterDataKaryawan',
                    name: 'namajabatan',
                    labelWidth: 70,
                    listeners: {
                        select: function () {
                            // storeGridDataKaryawan.load();
                            // console.log(this.value)
                        }
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            hidden:true,
            items: [
                {
                    xtype: 'checkbox',
                    checked: false,
                    name: 'cbPeriodeAktif',
                    id: 'cbPeriodeAktif',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            if (newValue)
                            {
                                Ext.getCmp('startdate_DataKaryawan').setDisabled(false);
                                Ext.getCmp('enddate_DataKaryawan').setDisabled(false);

                                Ext.getCmp('startTerminatedate_DataKaryawan').setValue(null);
                                Ext.getCmp('endTerminatedate_DataKaryawan').setValue(null);

                                Ext.getCmp('startTerminatedate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('endTerminatedate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('cbPeriodeTerminate').setValue(false);

                                Ext.getCmp('keaktifanDataKaryawan').setValue(false);
                                Ext.getCmp('keaktifanDataKaryawan').setDisabled(true);
                            } else {
                                Ext.getCmp('startdate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('enddate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('keaktifanDataKaryawan').setDisabled(false);
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    disabled: true,
                    hidden:true,
                    format: 'd-m-Y',
                    id: 'startdate_DataKaryawan',
                    labelWidth: 170,
                    name: 'startdate',
                    // allowBlank: false,
                    fieldLabel: 'Tanggal Masuk',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            // if (Ext.getCmp('startdate_DataKaryawan').getValue() != null && Ext.getCmp('enddate_DataKaryawan').getValue() != null)
                            // {
                            // storeGridDataKaryawan.load()
                            // }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    disabled: true,
                    format: 'd-m-Y',
                    hidden:true,
                    id: 'enddate_DataKaryawan',
                    name: 'enddate',
                    labelWidth: 30,
                    // allowBlank: false,
                    fieldLabel: 's/d',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            // if (Ext.getCmp('startdate_DataKaryawan').getValue() != null && Ext.getCmp('enddate_DataKaryawan').getValue() != null)
                            // {
                            // storeGridDataKaryawan.load()
                            // }
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
                    xtype: 'checkbox',
                    checked: false,
                    name: 'cbPeriodeTerminate',
                    id: 'cbPeriodeTerminate',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            if (newValue)
                            {
                                Ext.getCmp('startdate_DataKaryawan').setValue(null);
                                Ext.getCmp('enddate_DataKaryawan').setValue(null);

                                Ext.getCmp('startTerminatedate_DataKaryawan').setDisabled(false);
                                Ext.getCmp('endTerminatedate_DataKaryawan').setDisabled(false);

                                Ext.getCmp('startdate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('enddate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('cbPeriodeAktif').setValue(false);

                                Ext.getCmp('keaktifanDataKaryawan').setValue(false);
                                Ext.getCmp('keaktifanDataKaryawan').setDisabled(true);
                            } else {
                                Ext.getCmp('startdate_DataKaryawan').setDisabled(false);
                                Ext.getCmp('enddate_DataKaryawan').setDisabled(false);
                                Ext.getCmp('keaktifanDataKaryawan').setDisabled(false);

                                Ext.getCmp('startTerminatedate_DataKaryawan').setDisabled(true);
                                Ext.getCmp('endTerminatedate_DataKaryawan').setDisabled(true);
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    disabled: true,
                    format: 'd-m-Y',
                    id: 'startTerminatedate_DataKaryawan',
                    labelWidth: 170,
                    name: 'startTerminatedate',
                    // allowBlank: false,
                    fieldLabel: 'Tanggal Terminasi',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            // if (Ext.getCmp('startdate_DataKaryawan').getValue() != null && Ext.getCmp('enddate_DataKaryawan').getValue() != null)
                            // {
                            storeGridDataKaryawan.load()
                            // }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    disabled: true,
                    format: 'd-m-Y',
                    id: 'endTerminatedate_DataKaryawan',
                    name: 'endTerminatedate',
                    labelWidth: 30,
                    // allowBlank: false,
                    fieldLabel: 's/d',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            // if (Ext.getCmp('startdate_DataKaryawan').getValue() != null && Ext.getCmp('enddate_DataKaryawan').getValue() != null)
                            // {
                            storeGridDataKaryawan.load()
                            // }
                        }
                    }
                },
                {
                    xtype: 'checkbox',
                    // hidden:true,
                    labelWidth: 110,
                    checked: true,
                    fieldLabel: 'Status Keaktifan',
                    boxLabel: 'Aktif',
                    name: 'keaktifanDataKaryawan',
                    id: 'keaktifanDataKaryawan',
                    inputValue: '1',
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            console.log(newValue)
                            storeGridDataKaryawan.load()
                            // if(newValue)
                            // {
                            // Ext.getCmp('startdate_DataKaryawan').setDisabled(true);
                            // Ext.getCmp('enddate_DataKaryawan').setDisabled(true);											
                            // } else {
                            // Ext.getCmp('startdate_DataKaryawan').setDisabled(false);
                            // Ext.getCmp('enddate_DataKaryawan').setDisabled(false);
                            // }
                        }
                    }
                },
                {
                    text: 'Proses',
                    iconCls: 'cog-icon',
                    handler: function () {
                        storeGridDataKaryawan.load();
                    }
                },
                {
                    text: 'Hapus Filter',
                    iconCls: 'refresh',
                    handler: function () {
                        Ext.getCmp('filtercb_companyDataKaryawan').setValue(null);
                        Ext.getCmp('companyname_filterDataKaryawan').setValue(null);
                        Ext.getCmp('filtercb_orgDataKaryawan').setValue(null);
                        Ext.getCmp('namaorg_filterDataKaryawan').setValue(null);
                        Ext.getCmp('filtercb_jabatanDataKaryawan').setValue(null);
                        Ext.getCmp('namajabatan_filterDataKaryawan').setValue(null);
                        Ext.getCmp('startdate_DataKaryawan').setValue(null);
                        Ext.getCmp('enddate_DataKaryawan').setValue(null);
                        Ext.getCmp('startTerminatedate_DataKaryawan').setValue(null);
                        Ext.getCmp('endTerminatedate_DataKaryawan').setValue(null);
                        Ext.getCmp('keaktifanDataKaryawan').setValue(false);

                        Ext.getCmp('filtercb_orgDataKaryawan').setDisabled(true);
                        Ext.getCmp('namaorg_filterDataKaryawan').setDisabled(true);
                        Ext.getCmp('filtercb_jabatanDataKaryawan').setDisabled(true);
                        Ext.getCmp('namajabatan_filterDataKaryawan').setDisabled(true);

                        storeGridDataKaryawan.reload();
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
                    handler: function () {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cek_kuota',
                            method: 'GET',
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                     Ext.Ajax.request({
                                        url: SITE_URL + 'sistem/cekakses',
                                        method: 'POST',
                                        params: {
                                            roleid: 80
                                        },
                                        success: function (form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (d.success)
                                            {
                                                jadwalKerjaStore.load();

                                                WindowKaryawan.show();

                                                Ext.getCmp('formDataKaryawan').getForm().reset();
                                                Ext.getCmp('namalengkap_dkaryawan').setValue(null);
                                                Ext.getCmp('companyname_dkaryawan').setValue(null);
                                                Ext.getCmp('status_dkaryawan').setValue(null);
                                                Ext.getCmp('ni_dkaryawan').setValue(null);
                                                Ext.getCmp('nik_dkaryawan').setValue(null);

                                                agamaStore.load();
                                                sextypeStore.load();
                                                statuskawinStore.load();

                                                funcTabDataKaryawan(true);

                                                Ext.getCmp('statusformDataKaryawan').setValue('input');
                                                // Ext.getCmp('ni_dkaryawan').setReadOnly(false);
                                                Ext.getCmp('nik_dkaryawan').setReadOnly(false);
                                                Ext.getCmp('companyname_dkaryawan').setReadOnly(false);

                                                Ext.getCmp("fotokaryawanthumb").el.dom.src = null;

                                                Ext.getCmp('tipePenyesuaianUpah').setValue(null);
                                                Ext.getCmp('idpekerjaanPenyesuaianUpah').setValue(null);

                                                Ext.getCmp('TabItemKaryawan').setActiveTab(0);


                                            } else {
                                                Ext.Msg.alert("Info", d.message);
                                            }
                                        },
                                        failure: function (form, action) {
                                            Ext.Msg.alert("Load failed", Ext.decode(action.responseText));
                                        }
                                    });
                                } else {
                                     //melebihi kuota
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
                    handler: function () {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 81
                            },
                            success: function (form, action) {
                                var d = Ext.decode(form.responseText);
                                if (d.success)
                                {
                                    kotakLoading();
                                    jadwalKerjaStore.load();

                                    var grid = Ext.ComponentQuery.query('GridDataKaryawan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formDataKaryawan = Ext.getCmp('formDataKaryawan');
                                        formDataKaryawan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/VDataKaryawan/1/personalia',
                                            params: {
                                                extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                            },
                                            success: function (form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                // console.log(action)
                                                getFotoPegawai(d.data.idpelamar);
                                                setValueHeader(d);

                                                Ext.getCmp('comboxJadwalKerjaFormKaryawan').setValue(d.data.idjadwalkerja);
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        WindowKaryawan.show();

                                        funcTabDataKaryawan(false);

                                        Ext.getCmp('statusformDataKaryawan').setValue('edit');

                                        // Ext.getCmp('TabItemKaryawan').setActiveItem(0);
                                        agamaStore.load();
                                        sextypeStore.load();
                                        statuskawinStore.load();

                                        var formIdentitas = Ext.getCmp('formIdentitas');
                                        formIdentitas.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Identitas/1/personalia',
                                            params: {
                                                extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                            },
                                            success: function (form, action) {
                                                // var d = Ext.decode(action.responseText);
                                                // console.log(action)
                                                // getFotoPegawai(d.data.idpelamar);
                                                // setValueHeader(d);
                                                // // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                Ext.MessageBox.hide();
                                            },
                                            failure: function (form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                Ext.MessageBox.hide();
                                            }
                                        })

                                        // Ext.getCmp('ni_dkaryawan').setReadOnly(true);
                                        // Ext.getCmp('nik_dkaryawan').setReadOnly(true);
                                        Ext.getCmp('companyname_dkaryawan').setReadOnly(true);

                                        Ext.getCmp('TabItemKaryawan').setActiveTab(0);

                                        Ext.getCmp('tipePenyesuaianUpah').setValue(null);
                                        Ext.getCmp('idpekerjaanPenyesuaianUpah').setValue(null);

                                        TabKaryawanRights();

                                    }
                                } else {
                                    Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert("Load failed", Ext.decode(action.responseText));
                            }
                        });


                    }
                },
                {
                    xtype: 'splitbutton',
                    text: 'Ekspor Data',
                    iconCls: 'page_excel',
                    menu: [
                        {
                            text: 'Data Karyawan',
                            listeners: {
                                click: function (component) {
                                    window.location = SITE_URL + "laporan/datakaryawan/" + nullvalue(Ext.getCmp('companyname_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('namajabatan_filterDataKaryawan').getValue()) + '/' + nullvalue(Ext.getCmp('namaorg_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('startdate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataKaryawan').getSubmitValue()) + '/' +
                                            nullvalue(Ext.getCmp('startTerminatedate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('endTerminatedate_DataKaryawan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataKaryawan').getValue());
                                }
                            }
                        },
                        {
                            text: 'Data Identitas',
                            listeners: {
                                click: function (component) {
                                    window.location = SITE_URL + "laporan/dataidentitas/" + nullvalue(Ext.getCmp('companyname_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('namajabatan_filterDataKaryawan').getValue()) + '/' + nullvalue(Ext.getCmp('namaorg_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('startdate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataKaryawan').getSubmitValue()) + '/' +
                                            nullvalue(Ext.getCmp('startTerminatedate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('endTerminatedate_DataKaryawan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataKaryawan').getValue());
                                }
                            }
                        },
                        {
                            text: 'Data Keluarga',
                            listeners: {
                                click: function (component) {
                                    window.location = SITE_URL + "laporan/datakeluarga/" + nullvalue(Ext.getCmp('companyname_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('namajabatan_filterDataKaryawan').getValue()) + '/' + nullvalue(Ext.getCmp('namaorg_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('startdate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataKaryawan').getSubmitValue()) + '/' +
                                            nullvalue(Ext.getCmp('startTerminatedate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('endTerminatedate_DataKaryawan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataKaryawan').getValue());
                                }
                            }
                        },
                        {
                            text: 'Data Pendidikan',
                            listeners: {
                                click: function (component) {
                                    window.location = SITE_URL + "laporan/datapendidikan/" + nullvalue(Ext.getCmp('companyname_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('namajabatan_filterDataKaryawan').getValue()) + '/' + nullvalue(Ext.getCmp('namaorg_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('startdate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataKaryawan').getSubmitValue()) + '/' +
                                            nullvalue(Ext.getCmp('startTerminatedate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('endTerminatedate_DataKaryawan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataKaryawan').getValue());
                                }
                            }
                        },
                        {
                            text: 'Data Pelatihan',
                            listeners: {
                                click: function (component) {
                                    window.location = SITE_URL + "laporan/datapelatihan/" + nullvalue(Ext.getCmp('companyname_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('namajabatan_filterDataKaryawan').getValue()) + '/' + nullvalue(Ext.getCmp('namaorg_filterDataKaryawan').getValue()) + '/' +
                                            nullvalue(Ext.getCmp('startdate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataKaryawan').getSubmitValue()) + '/' +
                                            nullvalue(Ext.getCmp('startTerminatedate_DataKaryawan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('endTerminatedate_DataKaryawan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataKaryawan').getValue());
                                }
                            }
                        }
                    ]
                },
                {
                    text: 'Hapus Data',
                    hidden:hapusDataBtn,
                    iconCls: 'delete-icon',
                    handler: function () {
                        var grid = Ext.ComponentQuery.query('GridDataKaryawan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.Msg.show({
                                title: 'Konfirmasi',
                                msg: 'Apakah anda yakin untuk menghapus data secara permanen ?',
                                buttons: Ext.Msg.YESNO,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        Ext.Ajax.request({
                                            url: SITE_URL + 'personalia/hapus',
                                            method: 'POST',
                                            params: {
                                                idpelamar: selectedRecord.data.idpelamar
                                            },
                                            success: function (form, action) {
                                                var d = Ext.decode(form.responseText);
                                                Ext.Msg.alert("Info", d.message);
            
                                                Ext.getCmp('GridDataKaryawanID').getStore().load();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("Load failed", Ext.decode(action.responseText));
                                            }
                                        });
                                    }
                                }
                            });
                            
                        }
                    }
                },
                // {
//                     id: 'btnDeleteDataKaryawan',
//                     text: 'Ubah Menjadi Nonaktif',
//                     iconCls: 'delete-icon',
//                     handler: function() {

//                         if(group_id==1 || group_id==2)
//                         {
//                             Ext.Msg.show({
//                                 title: 'Konfirmasi',
//                                 msg: 'Apakah anda yakin untuk membuat karyawan terpilih menjadi nonaktif ?',
//                                 buttons: Ext.Msg.YESNO,
//                                 fn: function(btn) {
//                                     if (btn == 'yes') {
//                                         var grid = Ext.ComponentQuery.query('GridDataKaryawan')[0];
//                                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                                         var data = grid.getSelectionModel().getSelection();
//                                         if (data.length == 0)
//                                         {
//                                             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
//                                         } else {
//                                                     // var grid = Ext.ComponentQuery.query('GridDataKaryawan')[0];
//                                                     var sm = grid.getSelectionModel();
//                                                     selected = [];
//                                                     Ext.each(sm.getSelection(), function(item) {
//                                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                                     });
//                                                     Ext.Ajax.request({
//                                                         url: SITE_URL + 'personalia/setnonaktif',
//                                                         method: 'POST',
//                                                         params: {postdata: Ext.encode(selected)},
//                                                         success: function(form, action) {
//                                                             console.log(form)
//                                                            var d = Ext.decode(form.responseText);
//                                                            Ext.Msg.alert("Info", d.message);
//                                                            storeGridDataKaryawan.load();
//                                                         },
//                                                         failure: function(form, action) {
//                                                             Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                                         }
//                                                     });
//                                                 }
//                                     }
//                                 }
//                             });
//                         } else {
//                             Ext.Msg.alert('Info', 'Anda tidak memiliki hak akses untuk memproses ini');
//                         }


//                     },
// //                    disabled: true
//                 },
                '->',
                {
                    xtype: 'searchGridDataKaryawan',
                    emptyText: 'Cari Nama/NIK...',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridDataKaryawan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true,
            displayMsg:'Menampilkan {0} - {1} dari {2}',
            emptyMsg: 'Belum ada data'
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                storeGridDataKaryawan.load();
                jenisptkpStore.load();
                kewarganegaraanStore.load();
                companyStore.load();
                // jabatanStore.load();
                // orgStore.load();

                Ext.getCmp('filtercb_orgDataKaryawan').setDisabled(true);
                Ext.getCmp('namaorg_filterDataKaryawan').setDisabled(true);
                Ext.getCmp('filtercb_jabatanDataKaryawan').setDisabled(true);
                Ext.getCmp('namajabatan_filterDataKaryawan').setDisabled(true);

                if(group_id*1==2)
                {
                    //super admin
                    Ext.getCmp('filtercb_orgDataKaryawan').hide();
                    Ext.getCmp('namaorg_filterDataKaryawan').hide();
                    Ext.getCmp('filtercb_jabatanDataKaryawan').hide();
                    Ext.getCmp('namajabatan_filterDataKaryawan').hide();
                    Ext.getCmp('dfOrg').hide();
                    Ext.getCmp('dfJabatan').hide();
                } else {
                    Ext.getCmp('filtercb_orgDataKaryawan').show();
                    Ext.getCmp('namaorg_filterDataKaryawan').show();
                    Ext.getCmp('filtercb_jabatanDataKaryawan').show();
                    Ext.getCmp('namajabatan_filterDataKaryawan').show();
                    Ext.getCmp('dfOrg').show();
                    Ext.getCmp('dfJabatan').show();
                }
            }
        },
        itemdblclick: function (dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formDataKaryawan = Ext.getCmp('formDataKaryawan');
            // WindowKaryawan.show();
            // formDataKaryawan.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/VDataKaryawan/1/personalia',
            //     params: {
            //         extraparams: 'a.idpelamar:' + record.data.idpelamar
            //     },
            //     success: function(form, action) {
            //          var d = Ext.decode(action.response.responseText);
            //         getFotoPegawai(d.data.idpelamar);
            //         setValueHeader(d);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformDataKaryawan').setValue('edit');
            // funcTabDataKaryawan(false);
        }
    }
});


function getFotoPegawai(idpelamar)
{
    Ext.Ajax.request({
        url: SITE_URL + 'rekrutmen/getFotoPelamar',
        method: 'POST',
        params: {
            idpelamar: idpelamar
        },
        success: function (form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp("fotokaryawanthumb").el.dom.src = BASE_URL + "/upload/foto/" + d.foto;
        },
        failure: function (form, action) {
            // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function setValueHeader(d)
{
    Ext.getCmp('idpelamar_dkaryawan').setValue(d.data.idpelamar);
    Ext.getCmp('namalengkap_dkaryawan').setValue(d.data.namalengkap);
    Ext.getCmp('companyname_dkaryawan').setValue(d.data.companyname);
    Ext.getCmp('idcompany_dkaryawan').setValue(d.data.idcompany);
    if (d.data.kekaryaanname == '')
    {
        Ext.getCmp('status_dkaryawan').setValue('Belum ada pergerakan personil');
        Ext.getCmp('nik_dkaryawan').setReadOnly(false);
    } else {
        Ext.getCmp('status_dkaryawan').setValue(d.data.kekaryaanname);
        Ext.getCmp('nik_dkaryawan').setReadOnly(true);
    }


    // if(d.data.status=='Pelamar')
    // {
    //     //Belum ada status. Baru diseleksi dari calon pelamar, jadi harus dari pergerakan personil
    //     Ext.getCmp('status_dkaryawan').setValue(d.data.statuscalon);
    // } else {
    //     Ext.getCmp('status_dkaryawan').setValue(d.data.status);
    // }
    Ext.getCmp('ni_dkaryawan').setValue(d.data.ni);
    Ext.getCmp('nik_dkaryawan').setValue(d.data.nik);

    if (group_id == 1 || group_id == 2)
    {
        // Ext.getCmp('nik_dkaryawan').setReadOnly(false);
    } else {
        // Ext.getCmp('nik_dkaryawan').setReadOnly(true);
    }

    storeGridUpahTetap.load();
}

function funcTabDataKaryawan(opsi)
{
    var TabItemKaryawan = Ext.getCmp('TabItemKaryawan');
    TabItemKaryawan.items.getAt(1).setDisabled(opsi);
    TabItemKaryawan.items.getAt(2).setDisabled(opsi);
    TabItemKaryawan.items.getAt(3).setDisabled(opsi);
    TabItemKaryawan.items.getAt(4).setDisabled(opsi);
    TabItemKaryawan.items.getAt(5).setDisabled(opsi);
    TabItemKaryawan.items.getAt(6).setDisabled(opsi);
    TabItemKaryawan.items.getAt(7).setDisabled(opsi);
    TabItemKaryawan.items.getAt(8).setDisabled(opsi);
}

function TabKaryawanRights()
{
    Ext.Ajax.request({
        url: SITE_URL + 'sistem/cekakses',
        method: 'POST',
        params: {
            roleid: 168
        },
        success: function (form, action) {
            var d = Ext.decode(form.responseText);
            if (d.success)
            {

            } else {
                Ext.getCmp('TabPengupahan').setDisabled(true);
            }
        },
        failure: function (form, action) {
            //Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
        }
    });
}

function disableCbFilter(opt)
{
    Ext.getCmp('filtercb_orgDataKaryawan').setDisabled(opt);
    Ext.getCmp('namaorg_filterDataKaryawan').setDisabled(opt);
    Ext.getCmp('filtercb_jabatanDataKaryawan').setDisabled(opt);
    Ext.getCmp('namajabatan_filterDataKaryawan').setDisabled(opt);
}