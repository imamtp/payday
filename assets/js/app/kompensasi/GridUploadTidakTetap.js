Ext.define('GridUploadTidakTetapModel', {
    extend: 'Ext.data.Model',
    fields: ['upload_upahtt_id','idpelamar','startdate','enddate','masukpajak','nominal','fungsipajak','jenisupah','namalengkap','companyname'],
    idProperty: 'id'
});

var storeGridUploadTidakTetap = Ext.create('Ext.data.Store', {
    pageSize: 1000,
    model: 'GridUploadTidakTetapModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/upload_upahtt/kompensasi',
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

storeGridUploadTidakTetap.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'idcompany': Ext.getCmp('companyname_filterUploadUTT').getValue(),
                    'jenisupah': Ext.getCmp('comboxJenisUTT_uploadutt').getValue(),
                    // 'idorganisasi':Ext.getCmp('namaorg_filterUploadUTT').getValue(),
                    'startdate': Ext.getCmp('startdate_UploadUTT').getSubmitValue(),
                    'enddate': Ext.getCmp('enddate_UploadUTT').getSubmitValue(),
                  };
              });
////////////////////////

var formImportUpahTT = Ext.create('Ext.form.Panel', {
        id: 'formImportUpahTT',
        width: 700,
        height: 220,
        url: SITE_URL + 'kompensasi/importupahtt',
        bodyStyle: 'padding:5px',
        labelAlign: 'top',
        autoScroll: true,
        fieldDefaults: {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 150
            // width: 400
        },
        items: [
        {
            xtype: 'filefield',
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            // id: 'filexlsxImportPerencanaanXlsx',
            anchor: '50%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
               window.location = BASE_URL+"assets/xlsx/tempate_import_upahtt.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Upah Tidak Tetap:<br><li>Isi sesuai urutan kolom yang telah disediakan</li><li>NIK adalah kode kepegawaian yang ada pada menu Personalia -> Data Karyawan</li><li>Format tangal dd.mm.yyy (tanggal.bulan.tahun). Contoh 01.05.2015</li><li>Kolom Masuk Pajak : YA atau TIDAK</li><li>Kode Fungsi Pajak : 1. Penambah 2. Pengurang 3. Netral</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('winImportUpahTT');
                Ext.getCmp('formImportUpahTT').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Import',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            // params: {idunit:Ext.getCmp('idunitKehadiran').getValue()},
                            success: function(form, action) {
                                // msg.hide();
                                var win = Ext.getCmp('winImportUpahTT');
                                Ext.getCmp('formImportRowKehadiran').getForm().reset();
                                Ext.Msg.alert('Import Upah Tidak Tetap', action.result.message);
                                win.hide();
                                storeGridUploadTidakTetap.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Import Data Gagal', action.result ? action.result.message : 'No response');
                                // msg.hide();
                //                            storeGridSetupTax.load();
                            }

                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
            }
        }]
});

var winImportUpahTT = Ext.create('widget.window', {
    id: 'winImportUpahTT',
    title: 'Import Upah Tidak Tetap',
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    modal:true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportUpahTT]
})
////////////



Ext.define('MY.searchGridUploadTidakTetap', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridUploadTidakTetap',
    store: storeGridUploadTidakTetap,
    width: 180
});
var smGridUploadTidakTetap = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridUploadTidakTetap.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteUploadUTT').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteUploadUTT').enable();
        }
    }
});
Ext.define('GridUploadTidakTetap', {
    // renderTo:'mytabpanel',
    multiSelect: true,
//    selModel: smGridUploadTidakTetap,
    title: 'Upload Upah Tidak Tetap Karyawan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridUploadTidakTetapID',
    id: 'GridUploadTidakTetapID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUploadTidakTetap',
    store: storeGridUploadTidakTetap,
    loadMask: true,
    columns: [
        {header: 'upload_upahtt_id', dataIndex: 'upload_upahtt_id', hidden: true},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 250},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 150},
        // {header: 'Kode Org', dataIndex: 'kodeorg', minWidth: 150},
        // {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 180},
        // {header: 'Jenis Upah', dataIndex: 'jenisupah', minWidth: 150},        
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'Nominal', dataIndex: 'nominal', minWidth: 150,align:'right',xtype:'numbercolumn'},
        {header: 'Masuk Pajak', dataIndex: 'masukpajak', minWidth: 150},
        {header: 'Fungsi Pajak', dataIndex: 'fungsipajak', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    // {
                    //     xtype:'displayfield',
                    //     // labelWidth:72,
                    //     fieldLabel:'Perusahaan'
                    // },
                    {
                        xtype: 'checkboxfield',
                        hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_companyUploadUTT',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyUploadUTT').getValue())
                                    {
                                        Ext.getCmp('companyname_filterUploadUTT').setValue(null);
                                        Ext.getCmp('companyname_filterUploadUTT').setDisabled(true);
                                        // storeGridUploadTidakTetap.load();
                                    } else {
                                        Ext.getCmp('companyname_filterUploadUTT').setDisabled(false);
                                        // storeGridUploadTidakTetap.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'Perusahaan',
                        id: 'companyname_filterUploadUTT',
                        name: 'companyname',
                        valueField:'idcompany',
                        // labelWidth: 90,
                        listeners: {
                        select: function() {
                                // storeGridUploadTidakTetap.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        hidden:true,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_orgUploadUTT',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgUploadUTT').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterUploadUTT').setValue(null);
                                        Ext.getCmp('namaorg_filterUploadUTT').setDisabled(true);
                                        // storeGridUploadTidakTetap.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterUploadUTT').setDisabled(false);
                                        // storeGridUploadTidakTetap.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        hidden:true,
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterUploadUTT',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridUploadTidakTetap.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        hidden:true,
                        fieldLabel:'Jabatan'
                    },
                    {
                        xtype: 'checkboxfield',
                        hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_jabatanUploadUTT',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanUploadUTT').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterUploadUTT').setValue(null);
                                        Ext.getCmp('namajabatan_filterUploadUTT').setDisabled(true);
                                        // storeGridUploadTidakTetap.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterUploadUTT').setDisabled(false);
                                        // storeGridUploadTidakTetap.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        hidden:true,
                        fieldLabel:'',
                        id: 'namajabatan_filterUploadUTT',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridUploadTidakTetap.load();
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
                xtype:'comboxJenisUTT',
                 valueField: 'jenisutt_name',
                id:'comboxJenisUTT_uploadutt'
               },
                    {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'startdate_UploadUTT',
                                labelWidth:90,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Periode',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_UploadUTT').getValue() != null && Ext.getCmp('enddate_UploadUTT').getValue() != null)
                                        // {
                                           // storeGridUploadTidakTetap.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_UploadUTT',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_UploadUTT').getValue() != null && Ext.getCmp('enddate_UploadUTT').getValue() != null)
                                        // {
                                           // storeGridUploadTidakTetap.load()
                                        // }
                                    }
                                }
                            }                            ,
                            {
                                text: 'Cari',
                                iconCls: 'cog-icon',
                                handler: function() {

                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sistem/cekakses',
                                        method: 'POST',
                                        params: {
                                            roleid: 164
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if(d.success)
                                            {
                                                if(Ext.getCmp('companyname_filterUploadUTT').getValue()==null)
                                                {
                                                    Ext.Msg.alert("Info", 'Tentukan perusahaan!');
                                                } else if (Ext.getCmp('startdate_UploadUTT').getValue() == null && Ext.getCmp('enddate_UploadUTT').getValue() == null)
                                                    {
                                                       Ext.Msg.alert("Info", 'Tentukan periode Pengupahan!');
                                                    } else {
                                                        // storeGridUploadTidakTetap.on('beforeload',function(store, operation,eOpts){
                                                        //     operation.params={
                                                        //                 'idcompany': Ext.getCmp('companyname_filterUploadUTT').getValue(),
                                                        //                 'idjabatan': Ext.getCmp('namajabatan_filterUploadUTT').getValue(),
                                                        //                 'idorganisasi':Ext.getCmp('namaorg_filterUploadUTT').getValue(),
                                                        //                 'startdate': Ext.getCmp('startdate_UploadUTT').getSubmitValue(),
                                                        //                 'enddate': Ext.getCmp('enddate_UploadUTT').getSubmitValue(),
                                                        //               };
                                                        //           });
                                                        storeGridUploadTidakTetap.load();
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
                            {
                                    text: 'Hapus Filter',
                                    iconCls: 'refresh',
                                    handler: function() {
                                        Ext.getCmp('companyname_filterUploadUTT').setValue(null);
                                        Ext.getCmp('namaorg_filterUploadUTT').setValue(null);
                                        Ext.getCmp('namajabatan_filterUploadUTT').setValue(null);
                                        Ext.getCmp('startdate_UploadUTT').setValue(null);
                                        Ext.getCmp('enddate_UploadUTT').setValue(null);
                                        storeGridUploadTidakTetap.reload();
                                    }
                            }
           ]
       },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Import',
                    iconCls: 'add-icon',
                    handler: function() {
                        winImportUpahTT.show();
                    }
                },
               {
                        text: 'Hapus',
                        handler: function() {
                            
                            var grid = Ext.ComponentQuery.query('GridUploadTidakTetap')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0)
                            {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                Ext.Msg.show({
                                            title: 'Confirm',
                                            msg: 'Delete Selected ?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn) {
                                                if (btn == 'yes') {
                                                    var grid = Ext.ComponentQuery.query('GridUploadTidakTetap')[0];
                                                    var sm = grid.getSelectionModel();
                                                    selected = [];
                                                    Ext.each(sm.getSelection(), function(item) {
                                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                                    });
                                                    Ext.Ajax.request({
                                                        url: SITE_URL + 'kompensasi/hapus_upload_upahtt',
                                                        method: 'POST',
                                                        params: {postdata: Ext.encode(selected)},
                                                        success: function(form, action) {
                                                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                            storeGridUploadTidakTetap.load();
                                                        },
                                                        failure: function(form, action) {
                                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                            storeGridUploadTidakTetap.load();
                                                        }
                                                    });
                                                }
                                            }
                                });
                            }
                            
                        }
                },
                {
                    text: 'Detail',
                    hidden:true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridUploadTidakTetap')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formPekerjaan2 = Ext.getCmp('formPekerjaan2');
                            formPekerjaan2.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Pekerjaan/1/personalia',
                                params: {
                                    extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(action.response.responseText);
                                    // console.log(action)
                                    // getFotoPegawai(d.data.idpelamar);
                                    // setValueHeader(d);
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wPekerjaan2.show();
                            // Ext.getCmp('statusformPekerjaan').setValue('edit');

                            // Ext.getCmp('TabItemKaryawan').setActiveItem(0);
                        }

                    }
                },
                // {
                //     xtype: 'button',
                //     text: 'Export Excel',
                //     iconCls: 'page_excel',
                //     listeners: {
                //         click: function(component) {
                //            // window.location = SITE_URL+"laporan/UploadUTT/" + Ext.getCmp('companyname_filterUploadUTT').getValue()+'/'+Ext.getCmp('namajabatan_filterUploadUTT').getValue()+'/'+Ext.getCmp('namaorg_filterUploadUTT').getValue() + '/'+ Ext.getCmp('startdate_UploadUTT').getSubmitValue() + '/' + Ext.getCmp('enddate_UploadUTT').getSubmitValue();
                //         }
                //     }
                // },
                {
                    xtype: 'button',
                    hidden:true,
                    text: 'Simpan Data Pengupahan',
                    iconCls: 'save-icon',
                    listeners: {
                        click: function(component) {
                            // storeGridUploadTidakTetap.on('beforeload',function(store, operation,eOpts){
                            // operation.params={
                            //             'idcompany': Ext.getCmp('companyname_filterUploadUTT').getValue(),
                            //             'idjabatan': Ext.getCmp('namajabatan_filterUploadUTT').getValue(),
                            //             'idorganisasi':Ext.getCmp('namaorg_filterUploadUTT').getValue(),
                            //             'startdate': Ext.getCmp('startdate_UploadUTT').getSubmitValue(),
                            //             'enddate': Ext.getCmp('enddate_UploadUTT').getSubmitValue(),
                            //             'option':'save'
                            //           };
                            //       });
                            // storeGridUploadTidakTetap.load();

                            Ext.Ajax.request({
                                    url: SITE_URL + 'sistem/cekakses',
                                    method: 'POST',
                                    params: {
                                        roleid: 165
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if(d.success)
                                        {
                                            kotakLoading();
                                            Ext.Ajax.request({
                                                url: SITE_URL + 'kompensasi/penggajian',
                                                method: 'POST',
                                                params: {
                                                    'idcompany': Ext.getCmp('companyname_filterUploadUTT').getValue(),
                                                    'idjabatan': Ext.getCmp('namajabatan_filterUploadUTT').getValue(),
                                                    'idorganisasi':Ext.getCmp('namaorg_filterUploadUTT').getValue(),
                                                    'startdate': Ext.getCmp('startdate_UploadUTT').getSubmitValue(),
                                                    'enddate': Ext.getCmp('enddate_UploadUTT').getSubmitValue(),
                                                    'option':'save'
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    Ext.Msg.alert('Info', d.message);
                                                    storeGridUploadTidakTetap.load();
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
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

                            
                           // window.location = SITE_URL+"laporan/UploadUTT/" + Ext.getCmp('companyname_filterUploadUTT').getValue()+'/'+Ext.getCmp('namajabatan_filterUploadUTT').getValue()+'/'+Ext.getCmp('namaorg_filterUploadUTT').getValue() + '/'+ Ext.getCmp('startdate_UploadUTT').getSubmitValue() + '/' + Ext.getCmp('enddate_UploadUTT').getSubmitValue();
                        }
                    }
                },
                 '->',
                'Pencarian Nama Karyawan: ', ' ',
                {
                    xtype: 'searchGridUploadTidakTetap',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridUploadTidakTetap, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridUploadTidakTetap.load();
                 // tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisUploadUTTpStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

           // var formPekerjaan2 = Ext.getCmp('formPekerjaan2');
           //                  formPekerjaan2.getForm().load({
           //                      url: SITE_URL + 'backend/loadFormData/Pekerjaan/1/personalia',
           //                      params: {
           //                          extraparams: 'a.idpelamar:' + record.data.idpelamar
           //                      },
           //                      success: function(form, action) {
           //                          var d = Ext.decode(action.response.responseText);
           //                          // console.log(action)
           //                          // getFotoPegawai(d.data.idpelamar);
           //                          // setValueHeader(d);
           //                          // Ext.Msg.alert("Load failed", action.result.errorMessage);
           //                      },
           //                      failure: function(form, action) {
           //                          Ext.Msg.alert("Load failed", action.result.errorMessage);
           //                      }
           //                  })

           //                  wPekerjaan2.show();

            // Ext.getCmp('statusformUploadUTT').setValue('edit');
        }
    }
});
