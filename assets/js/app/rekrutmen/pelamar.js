Ext.define('GridPelamarCompanyListModel', {
   extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridPelamarCompanyList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPelamarCompanyListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        // url: SITE_URL + 'backend/ext_get_all/Organisasi/desainorg',
        url: SITE_URL + 'backend/ext_get_all/Perusahaan_ModulOrg/modulorg',
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

// storeGridAccount.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchPelamarCompanyList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPelamarCompanyList',
    store: storeGridPelamarCompanyList,
    width: 180
});

var smGridPelamarCompanyList = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchase.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemPurchase').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemPurchase').enable();
        }
    }
});

Ext.define('GridPelamarCompanyList', {
    itemId: 'GridPelamarCompanyList',
    id: 'GridPelamarCompanyList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPelamarCompanyList',
    store: storeGridPelamarCompanyList,
    loadMask: true,
    columns: [
    {
            text: 'Pilih',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                    Ext.getCmp('idcompany_fPelamar').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companyname_fPelamar').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridPelamarCompanyListPopup').hide();
            }
        },
        {header: 'idcompany', dataIndex: 'idcompany', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 200,flex:1},
        {header: 'Tgl Aktivasi', dataIndex: 'startdate', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 80}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPelamarCompanyList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPelamarCompanyList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPelamarCompanyListPopup = Ext.create('widget.window', {
    id: 'wGridPelamarCompanyListPopup',
    title: 'Pilih Perusahaan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 680,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridPelamarCompanyList'
    }]
});
//end company list

Ext.define('fotopelamarthumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotopelamarthumb',
    fieldLabel: 'Foto',
    autoEl: {tag: 'img', width: 80, height: 50}
});


var formPelamar = Ext.create('Ext.form.Panel', {
    id: 'formPelamar',
    // title:'Data Pribadi',
    url: SITE_URL + 'backend/saveform/Pelamar/rekrutmen',
    bodyStyle: 'padding:5px',
    autoWidth: true,
    autoHeight: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 150,
        // anchor:'100%'
        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
        items: [{
            xtype: 'hiddenfield',
            name: 'statusformPelamar',
            id: 'statusformPelamar'
        }, {
            xtype: 'hiddenfield',
            id: 'idpelamar_fPelamar',
            fieldLabel: 'idpelamar',
            name: 'idpelamar'
        },
        {
            xtype: 'hiddenfield',
            id: 'idcompany_fPelamar',
            name: 'idcompany'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Nama Perusahaan',
            id: 'companyname_fPelamar',
            name: 'companyname',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wGridPelamarCompanyListPopup.show();
                        storeGridPelamarCompanyList.load();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jabatan Dituju',
            allowBlank: false,
            name: 'jabatandituju'
        },
        {
          xtype: 'datefield',
            format: 'd-m-Y',
            name:'tgllamaran',
            allowBlank: false,
            fieldLabel: 'Tgl Lamaran'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Lengkap',
            allowBlank: false,
            name: 'namalengkap'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tempat Lahir',
            allowBlank: false,
            name: 'tempatlahir'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tgllahir',
            allowBlank: false,
            fieldLabel: 'Tgl Lahir'
        },{
            xtype:'comboxsextype',
            allowBlank: false
        },
        {
            xtype:'comboxstatuskawin',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No Telp',
            allowBlank: false,
            name: 'notelp'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'No Handphone',
            allowBlank: false,
            name: 'nohandphone'
        },
        {
            xtype: 'textfield',
            vtype: 'email',
            fieldLabel: 'Email',
            allowBlank: false,
            name: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Daerah Asal Rekrut',
            allowBlank: false,
            name: 'daerahrekrut'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Alamat KTP',
            anchor:'100%',
            // allowBlank: false,
            name: 'alamatktp'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Alamat Tinggal',
            anchor:'100%',
            // allowBlank: false,
            name: 'alamat'
        }]
    }, {
        items: [
                 {
                    xtype: 'textfield',
                    fieldLabel: 'No ktp',
                    allowBlank: false,
                    name: 'noktp'
                },
                {
                    xtype:'comboxjenjangpendidikan'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fakultas',
                    allowBlank: false,
                    name: 'fakultas'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jurusan',
                    allowBlank: false,
                    name: 'jurusan'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Referensi',
                    // allowBlank: false,
                    name: 'referensi'
                },
                 {
                    xtype: 'textfield',
                    fieldLabel: 'Sumber Lamaran',
                    // allowBlank: false,
                    name: 'sumberlamaran'
                },
                {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Upload Foto',
                        combineErrors: true,
                        msgTarget : 'side',
                        layout: 'hbox',
                        defaults: {
                            flex: 1,
                            hideLabel: true
                        },
                        items: [
                                {
                                    xtype: 'filefield',
                                    margin: '0 1 0 0',
                                    emptyText: 'Upload Foto',
                                    fieldLabel: 'Foto pelamar',
                                    name: 'foto',
                                    buttonText: '',
                                    buttonConfig: {
                                        iconCls: 'imgupload-icon'
                                    }
                                },
                             {
                                xtype: 'fotopelamarthumb',
                                id: 'fotopelamarthumb',
                                fieldLabel: 'Foto',
                                anchor:'20%',
                                width: 87,
                                height: 100,
                            }
                        ]
                    },
                    Ext.panel.Panel({
                       html: "<div style='font-size:11px; font-style:italic;'>Ketentuan: Tipe file foto yang diperbolehkan gif,jpg,png. <br/>Ukuran file maksimal 1 MB dengan maksimal resolusi 1024x768</div>"
                   }),
                {
                    xtype: 'filefield',
                    // margin: '0 1 0 0',
                    emptyText: 'Upload CV',
                    fieldLabel: 'CV pelamar',
                    name: 'cv',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'laporan-icon'
                    }
                },
                 {
                    xtype: 'button',
                    align:'right',
                    id:'btnDownloadCV',
                    // bodyStyle:'float:right;',
                    margin: '0 0 5 155',
                    anchor:'40%',
                    text:'Download CV',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'rekrutmen/downloadcv',
                            params:{
                                idpelamar:Ext.getCmp('idpelamar_fPelamar').getValue()
                            },
                            method: 'POST',
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(!d.success)
                                {
                                    Ext.Msg.alert('Pelamar', d.message);
                                } else {
                                    // window.location = BASE_URL+"upload/cv/"+d.cv;
                                    window.open(BASE_URL+"upload/cv/"+d.cv,'_blank');
                                }
                                // Ext.getCmp('logoheaderthumb').el.dom.src = BASE_URL + "/upload/" + null;
                            },
                            failure: function(form, action) {
                                // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }
                },
                Ext.panel.Panel({
                   html: "<div style='font-size:11px; font-style:italic;'>Ketentuan: Tipe file CV yang diperbolehkan pdf,doc,docx. <br/>Ukuran file maksimal 5 MB</div>"
               }),
                {
                    xtype:'comboxstatusPelamar',
                    name:'statuscalon',
                    id:'comboxstatusPelamarPengajuan',
                    allowBlank: false
                }
            ]

    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupPelamar');
            Ext.getCmp('formPelamar').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnPelamarSimpan',
        text: 'Simpan',
        handler: function() {
            kotakLoading();
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPelamar').getForm().reset();
                            Ext.getCmp('windowPopupPelamar').hide();
                            storeGridPelamar.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridemployeeGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});


// var formPelamar = Ext.create('Ext.form.Panel', {
//     id: 'formPelamar',
//     width: 450,
// //    height: 300,
//     url: SITE_URL + 'backend/saveform/Pelamar/rekrutmen',
//     bodyStyle: 'padding:5px',
//     labelAlign: 'top',
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         labelWidth: 160,
//         anchor:'100%'
// //        width: 400
//     },
//     items: [{
//             xtype:'comboxstatusPelamar'
//         }],
//     buttons: [{
//             text: 'Batal',
//             handler: function() {
//                 var win = Ext.getCmp('windowPopupPelamar');
//                 Ext.getCmp('formPelamar').getForm().reset();
//                 win.hide();
//             }
//         }, {
//             id: 'BtnPelamarSimpan',
//             text: 'Simpan',
//             handler: function() {
//                 var form = this.up('form').getForm();
//                 if (form.isValid()) {
//                     form.submit({
//                         success: function(form, action) {

//                             Ext.Msg.alert('Success', action.result.message);
//                             Ext.getCmp('formPelamar').getForm().reset();
//                             Ext.getCmp('windowPopupPelamar').hide();
//                             storeGridPelamar.load();
//                         },
//                         failure: function(form, action) {
//                             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
// //                            storeGridPelamar.load();
//                         }
//                     });
//                 } else {
//                     Ext.Msg.alert("Error!", "Your form is invalid!");
//                 }
//             }
//         }]
// });
var wPelamar = Ext.create('widget.window', {
    id: 'windowPopupPelamar',
    title: 'Form Pelamar',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    modal:true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formPelamar]
});

Ext.define('GridPelamarModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','namalengkap','companyname','tgllahir','idsex','sexname','noktp','alamat','notelp','nohandphone','jabatandituju','tgllamaran','status','userin','datein','tempatlahir','idstatuskawin','email','daerahrekrut','alamatktp','idjenjangpendidikan','fakultas','jurusan','foto','cv','referensi','sumberlamaran','namastatuskawin','keterangan','statuscalon'],
    idProperty: 'id'
});

var storeGridPelamar = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPelamarModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Pelamar/rekrutmen',
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

storeGridPelamar.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'e.statuscalon:'+Ext.getCmp('comboxstatusPelamar_pelamar').getValue(),
                    'startdate': Ext.getCmp('periodePelamar1').getSubmitValue(),
                    'enddate': Ext.getCmp('periodePelamar2').getSubmitValue(),
                  };
              });

Ext.define('MY.searchGridPelamar', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPelamar',
    store: storeGridPelamar,
    width: 180
});
var smGridPelamar = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPelamar.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePelamar').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePelamar').enable();
        }
    }
});
Ext.define('GridPelamar', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPelamar,
    title: 'Daftar Pelamar',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPelamarID',
    id: 'GridPelamarID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPelamar',
    store: storeGridPelamar,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Tgl Lahir', dataIndex: 'tgllahir', minWidth: 150},
        {header: 'Jenis Kelamin', dataIndex: 'sexname', minWidth: 150},
        {header: 'No Ktp', dataIndex: 'noktp', minWidth: 150},
        {header: 'Alamat', dataIndex: 'alamat', minWidth: 150},
        {header: 'Notelp', dataIndex: 'notelp', minWidth: 150},
        {header: 'Nohandphone', dataIndex: 'nohandphone', minWidth: 150},
        {header: 'Jabatan Dituju', dataIndex: 'jabatandituju', minWidth: 150},
        {header: 'Tgl Lamaran', dataIndex: 'tgllamaran', minWidth: 150},
        {header: 'Status', dataIndex: 'statuscalon', minWidth: 150},
        {header: 'Keterangan', dataIndex: 'keterangan', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype: 'datefield',
                        id: 'periodePelamar1',
                        format: 'd-m-Y',
                        labelWidth: 120,
                        fieldLabel: 'Periode Lamaran',
                        listeners: {
                            'change': function(field, newValue, oldValue) {
                                if (Ext.getCmp('periodePelamar1').getValue() != null && Ext.getCmp('periodePelamar2').getValue() != null)
                                {
                                   storeGridPelamar.load()
                                }
                            }
                        }
                    }, {
                        xtype: 'datefield',
                        id: 'periodePelamar2',
                        format: 'd-m-Y',
                        labelWidth: 40,
                        fieldLabel: 's/d',
                        listeners: {
                            'change': function(field, newValue, oldValue) {
                                if (Ext.getCmp('periodePelamar1').getValue() != null && Ext.getCmp('periodePelamar2').getValue() != null)
                                {
                                   storeGridPelamar.load()
                                }
                            }
                        }
                    },
                    {
                        xtype:'comboxstatusPelamar',
                        value:'Diajukan',
                        id:'comboxstatusPelamar_pelamar',
                        listeners: {
                        select: function() {
                                storeGridPelamar.load();
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
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cek_kuota',
                            method: 'GET',
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.getCmp('formPelamar').getForm().reset();
                        
                                    storeStatusPelamar.load();
                                    
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sistem/cekakses',
                                        method: 'POST',
                                        params: {
                                            roleid: 74
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if(d.success)
                                            {
                                                wPelamar.show();
                                                Ext.getCmp('statusformPelamar').setValue('input');
                                                sextypeStore.load();
                                                jenjangpendidikanStore.load();
                                                statuskawinStore.load();
                                                Ext.getCmp('BtnPelamarSimpan').setDisabled(false);
                                                Ext.getCmp('fotopelamarthumb').el.dom.src = null ;
                                            } else {
                                                 Ext.Msg.alert("Info", d.message);
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                        }
                                    });
                                    var cbStatus = Ext.getCmp('comboxstatusPelamarPengajuan');
                                    cbStatus.setValue('Diajukan');
                                    cbStatus.setReadOnly(true);
                                    Ext.getCmp('btnDownloadCV').hide();

                                    var cbCompany = Ext.getCmp('companyname_fPelamar');
                                    if(group_id*1>2){
                                        cbCompany.setReadOnly(true);
                                        cbCompany.setValue(companyname);
                                        Ext.getCmp('idcompany_fPelamar').setValue(idcompany);
                                    } else {    
                                        cbCompany.setReadOnly(false);
                                    }
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
                    handler: function() {
                        Ext.getCmp('formPelamar').getForm().reset();
                        
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 75
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPelamar')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPelamar = Ext.getCmp('formPelamar');
                                        formPelamar.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Pelamar/1/rekrutmen',
                                            params: {
                                                extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                // alert(d.data.statuscalon)
                                                if(d.data.statuscalon=='Disetujui')
                                                {
                                                     Ext.getCmp('BtnPelamarSimpan').setDisabled(true);
                                                } else {
                                                     Ext.getCmp('BtnPelamarSimpan').setDisabled(false);
                                                }
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                getFotoPelamar()
                                                getCVPelamar()

                                                var cbStatus = Ext.getCmp('comboxstatusPelamarPengajuan');
                                                cbStatus.setReadOnly(true);

                                                var cbCompany = Ext.getCmp('companyname_fPelamar');
                                                if(group_id*1>2){
                                                    cbCompany.setReadOnly(true);
                                                } else {    
                                                    cbCompany.setReadOnly(false);
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPelamar.show();
                                        Ext.getCmp('statusformPelamar').setValue('edit');
                                        
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
                    id: 'btnDeletePelamar',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 76
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
                                                var grid = Ext.ComponentQuery.query('GridPelamar')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Pelamar/rekrutmen/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridPelamar.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridPelamar.remove(sm.getSelection());
                                                // sm.select(0);
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
                    xtype: 'searchGridPelamar',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPelamar, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPelamar.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // companyStore2.load();

            // // var formAgama = Ext.create('formAgama');
            // var formPelamar = Ext.getCmp('formPelamar');
            // wPelamar.show();
            // formPelamar.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/Pelamar/1/rekrutmen',
            //     params: {
            //         extraparams: 'a.idpelamar:' + record.data.idpelamar
            //     },
            //     success: function(form, action) {
            //         var d = Ext.decode(action.response.responseText);
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //         getFotoPelamar()
            //          getCVPelamar()

            //         var cbCompany = Ext.getCmp('companyname_fPelamar');
            //         if(group_id*1>2){
            //             cbCompany.setReadOnly(true);
            //         } else {    
            //             cbCompany.setReadOnly(false);
            //         }
            //         // cbCompany.setValue(d.data.companyname);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPelamar').setValue('edit');

        }
    }
});

function getFotoPelamar()
{
    Ext.Ajax.request({
        url: SITE_URL + 'rekrutmen/getFotoPelamar',
        method: 'POST',
        params: {
            idpelamar: Ext.getCmp('idpelamar_fPelamar').getValue()
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('fotopelamarthumb').el.dom.src = BASE_URL + "/upload/foto/" + d.foto;
        },
        failure: function(form, action) {
            // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function getCVPelamar()
{
    Ext.Ajax.request({
        url: SITE_URL + 'rekrutmen/downloadcv',
        params:{
            idpelamar:Ext.getCmp('idpelamar_fPelamar').getValue()
        },
        method: 'POST',
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if(!d.success)
            {
                Ext.getCmp('btnDownloadCV').hide();
            } else {
                Ext.getCmp('btnDownloadCV').show();
            }
        },
        failure: function(form, action) {
            // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}
