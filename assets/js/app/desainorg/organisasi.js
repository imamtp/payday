
var formOrganisasi = Ext.create('Ext.form.Panel', {
    id: 'formOrganisasi',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Organisasi/desainorg',
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
            name: 'statusformOrganisasi',
            id: 'statusformOrganisasi'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idorganisasi',
            name: 'idorganisasi'
        },{
            xtype: 'hiddenfield',
            id: 'idcompanyOrganisasi',
            name: 'idcompany'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Perusahaan',
            allowBlank: false,
            id: 'companycodeOrganisasi',
            name: 'companycode',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wGridOrganisasiCompanyListPopup.show();
                            // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                            //             operation.params={
                            //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                            //                         'idaccounttype': '12,16,11'
                            //             };
                            //         });
                            storeGridOrganisasiCompanyList.load();
                        });
                    }
                }
        },{
            xtype: 'displayfield',
            fieldLabel: 'Nama Perusahaan',
            id: 'companynameOrganisasi',
            name: 'companyname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Organisasi',
            allowBlank: false,
            name: 'kodeorg'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Organisasi',
            allowBlank: false,
            name: 'namaorg'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Kode Budget Organisasi',
            allowBlank: false,
            name: 'kodebudgetorg'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'deskripsi'
        },
         {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai Aktif'
        },
         {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'enddate',
            allowBlank: false,
            fieldLabel: 'Tgl Non Aktif'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupOrganisasi');
                Ext.getCmp('formOrganisasi').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnOrganisasiSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formOrganisasi').getForm().reset();
                            Ext.getCmp('windowPopupOrganisasi').hide();
                            storeGridOrganisasi.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridOrganisasi.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wOrganisasi = Ext.create('widget.window', {
    id: 'windowPopupOrganisasi',
    title: 'Form Organisasi',
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
    items: [formOrganisasi]
});

Ext.define('GridOrganisasiModel', {
    extend: 'Ext.data.Model',
    fields: ['idorganisasi','kodeorg','namaorg','kodebudgetorg','deskripsi','idcompany','userin','datein','status','idcompany','companyname','companycode','startdate','enddate'],
    idProperty: 'id'
});

var storeGridOrganisasi = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridOrganisasiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Organisasi/desainorg',
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

storeGridOrganisasi.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterOrganisasi').getValue()+','+'a.idorganisasi:'+Ext.getCmp('namaorg_filterOrganisasi').getValue(),
                    'startdate': Ext.getCmp('startdate_Organisasi').getSubmitValue(),
                    'enddate': Ext.getCmp('enddate_Organisasi').getSubmitValue(),
                  };
              });

Ext.define('MY.searchGridOrganisasi', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridOrganisasi',
    store: storeGridOrganisasi,
    width: 180
});
var smGridOrganisasi = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridOrganisasi.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteOrganisasi').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteOrganisasi').enable();
        }
    }
});
Ext.define('GridOrganisasi', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridOrganisasi,
    title: 'Daftar Organisasi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridOrganisasiID',
    id: 'GridOrganisasiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridOrganisasi',
    store: storeGridOrganisasi,
    loadMask: true,
    columns: [
        {header: 'idorganisasi', dataIndex: 'idorganisasi', hidden: true},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Kode budget org', dataIndex: 'kodebudgetorg', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},    
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},    
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150}    
        // {header: 'Status', dataIndex: 'status', minWidth: 150}
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
                        id:'filtercb_companyOrganisasi',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_companyOrganisasi').getValue())
                                    {
                                        Ext.getCmp('companyname_filterOrganisasi').setValue(null);
                                        Ext.getCmp('companyname_filterOrganisasi').setDisabled(true);
                                        // storeGridOrganisasi.load();
                                    } else {
                                        Ext.getCmp('companyname_filterOrganisasi').setDisabled(false);
                                        // storeGridOrganisasi.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterOrganisasi',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                // storeGridOrganisasi.load();
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
                        id:'filtercb_orgOrganisasi',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_orgOrganisasi').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterOrganisasi').setValue(null);
                                        Ext.getCmp('namaorg_filterOrganisasi').setDisabled(true);
                                        // storeGridOrganisasi.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterOrganisasi').setDisabled(false);
                                        // storeGridOrganisasi.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterOrganisasi',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                // storeGridOrganisasi.load();
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
                                id:'startdate_Organisasi',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Aktif',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        if (Ext.getCmp('startdate_Organisasi').getSubmitValue() != null && Ext.getCmp('enddate_Organisasi').getSubmitValue() != null)
                                        {
                                           // storeGridOrganisasi.load()
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_Organisasi',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        if (Ext.getCmp('startdate_Organisasi').getSubmitValue() != null && Ext.getCmp('enddate_Organisasi').getSubmitValue() != null)
                                        {
                                           // storeGridOrganisasi.load()
                                        }
                                    }
                                }
                            },                            
                            {
                                text: 'Proses',
                                iconCls: 'cog-icon',
                                handler: function () {
                                    if (Ext.getCmp('startdate_Organisasi').getSubmitValue() !== '' && Ext.getCmp('enddate_Organisasi').getSubmitValue() === '')
                                    {
                                       // storeGridOrganisasi.load()
                                       Ext.Msg.alert("Info",'Harap Masukkan Tanggal Akhir');
                                    } else {
                                        storeGridOrganisasi.load();
                                    }

                                    if (Ext.getCmp('enddate_Organisasi').getSubmitValue() !== '' && Ext.getCmp('startdate_Organisasi').getSubmitValue() === '')
                                    {
                                       // storeGridOrganisasi.load()
                                       Ext.Msg.alert("Info",'Harap Masukkan Tanggal Mulai');
                                    } else {
                                        storeGridOrganisasi.load();
                                    }
                                    
                                    if (Ext.getCmp('startdate_Organisasi').getSubmitValue() == '' && Ext.getCmp('enddate_Organisasi').getSubmitValue() == '')
                                    {
                                        storeGridOrganisasi.load();
                                    }
                                }
                            },
                            '-',
                            {
                                text: 'Clear Filter',
                                iconCls: 'refresh',
                                handler: function() {
                                    Ext.getCmp('companyname_filterOrganisasi').setValue(null);
                                    Ext.getCmp('namaorg_filterOrganisasi').setValue(null);
                                    Ext.getCmp('filtercb_companyOrganisasi').setValue(null);
                                    Ext.getCmp('filtercb_orgOrganisasi').setValue(null);
                                    Ext.getCmp('startdate_Organisasi').setValue(null);
                                    Ext.getCmp('enddate_Organisasi').setValue(null);

                                    storeGridOrganisasi.reload();
                                }
                            },
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
                                roleid: 57
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wOrganisasi.show();
                                    Ext.getCmp('statusformOrganisasi').setValue('input');
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
                                roleid: 58
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridOrganisasi')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formOrganisasi = Ext.getCmp('formOrganisasi');
                                        formOrganisasi.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Organisasi/1/desainorg',
                                            params: {
                                                extraparams: 'a.idorganisasi:' + selectedRecord.data.idorganisasi
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wOrganisasi.show();
                                        Ext.getCmp('statusformOrganisasi').setValue('edit');
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
                    id: 'btnDeleteOrganisasi',
                    text: 'Ubah Menjadi Nonaktif',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 59
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                   Ext.Msg.show({
                                        title: 'Konfirmasi',
                                        msg: 'Ubah menjadi nonaktif ?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                                var grid = Ext.ComponentQuery.query('GridOrganisasi')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Organisasi/desainorg/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridOrganisasi.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridOrganisasi.remove(sm.getSelection());
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
                    xtype: 'searchGridOrganisasi',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridOrganisasi, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridOrganisasi.load();
                companyStore.load();
                orgStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formOrganisasi = Ext.getCmp('formOrganisasi');
            wOrganisasi.show();
            formOrganisasi.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Organisasi/1/desainorg',
                params: {
                    extraparams: 'a.idorganisasi:' + record.data.idorganisasi
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformOrganisasi').setValue('edit');
        }
    }
});
