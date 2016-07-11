
var formJabatan = Ext.create('Ext.form.Panel', {
    id: 'formJabatan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Jabatan/desainorg',
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
            name: 'statusformJabatan',
            id: 'statusformJabatan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idjabatan',
            name: 'idjabatan'
        },{
            xtype: 'hiddenfield',
            id: 'idcompanyJabatan',
            name: 'idcompany'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Pilih Kode Perusahaan',
            allowBlank: false,
            id: 'companycodeJabatan',
            name: 'companycode',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wGridJabatanCompanyListPopup.show();
                            // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                            //             operation.params={
                            //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                            //                         'idaccounttype': '12,16,11'
                            //             };
                            //         });
                            storeGridJabatanCompanyList.load();
                        });
                    }
                }
        },{
            xtype: 'displayfield',
            fieldLabel: 'Nama Perusahaan',
            id: 'companynameJabatan',
            name: 'companyname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Jabatan',
            allowBlank: false,
            name: 'kodejabatan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Jabatan',
            allowBlank: false,
            name: 'namajabatan'
        },
        {
            xtype: 'hiddenfield',
            id: 'idlevelJabatan',
            name: 'idlevel'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pilih Level',
            allowBlank: false,
            id: 'levelnameJabatan',
            name: 'levelname',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wGridLevelJabatanListPopup.show();
                            // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                            //             operation.params={
                            //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                            //                         'idaccounttype': '12,16,11'
                            //             };
                            //         });
                            storeGridLevelJabatanList.load();
                        });
                    }
                }
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'deskripsi'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Aktif'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Terminasi'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJabatan');
                Ext.getCmp('formJabatan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJabatanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJabatan').getForm().reset();
                            Ext.getCmp('windowPopupJabatan').hide();
                            storeGridJabatan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJabatan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJabatan = Ext.create('widget.window', {
    id: 'windowPopupJabatan',
    title: 'Form Jabatan',
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
    items: [formJabatan]
});

Ext.define('GridJabatanModel', {
    extend: 'Ext.data.Model',
    fields: ['idjabatan','idlevel','idcompany','kodejabatan','namajabatan','deskripsi','startdate','enddate','status','userin','datein','levelname','companycode','companyname'],
    idProperty: 'id'
});

var storeGridJabatan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJabatanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Jabatan/desainorg',
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

storeGridJabatan.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterJabatan').getValue()+','+'a.idjabatan:'+Ext.getCmp('namajabatan_filterJabatan').getValue(),
                    'startdate': Ext.getCmp('startdate_Jabatan').getSubmitValue(),
                    'enddate': Ext.getCmp('enddate_Jabatan').getSubmitValue(),
                  };
              });

Ext.define('MY.searchGridJabatan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJabatan',
    store: storeGridJabatan,
    width: 180
});
var smGridJabatan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridJabatan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteJabatan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteJabatan').enable();
        }
    }
});
Ext.define('GridJabatan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJabatan,
    title: 'Daftar Jabatan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJabatanID',
    id: 'GridJabatanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJabatan',
    store: storeGridJabatan,
    loadMask: true,
    columns: [
        {header: 'idjabatan', dataIndex: 'idjabatan', hidden: true},
        {header: 'Kode Jabatan', dataIndex: 'kodejabatan', minWidth: 150},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 200},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150},        
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        {header: 'Tgl Aktif', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Terminasi', dataIndex: 'enddate', minWidth: 150},
        {header: 'User input', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'Date input', dataIndex: 'datein', minWidth: 150,hidden:true},
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
                        id:'filtercb_companyJabatan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_companyJabatan').getValue())
                                    {
                                        Ext.getCmp('companyname_filterJabatan').setValue(null);
                                        Ext.getCmp('companyname_filterJabatan').setDisabled(true);
                                        storeGridJabatan.load();
                                    } else {
                                        Ext.getCmp('companyname_filterJabatan').setDisabled(false);
                                        storeGridJabatan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterJabatan',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridJabatan.load();
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
                        id:'filtercb_orgJabatan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_orgJabatan').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterJabatan').setValue(null);
                                        Ext.getCmp('namajabatan_filterJabatan').setDisabled(true);
                                        storeGridJabatan.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterJabatan').setDisabled(false);
                                        storeGridJabatan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        id: 'namajabatan_filterJabatan',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridJabatan.load();
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
                                id:'startdate_Jabatan',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Aktif',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        if (Ext.getCmp('startdate_Jabatan').getSubmitValue() != null && Ext.getCmp('enddate_Jabatan').getSubmitValue() != null)
                                        {
                                           storeGridJabatan.load()
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_Jabatan',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        if (Ext.getCmp('startdate_Jabatan').getSubmitValue() != '' && Ext.getCmp('enddate_Jabatan').getSubmitValue() != '')
                                        {
                                            // console.log('run')
                                           storeGridJabatan.load()
                                        }
                                    }
                                }
                            },
                            '-',
                            {
                                text: 'Clear Filter',
                                iconCls: 'refresh',
                                handler: function() {
                                    Ext.getCmp('companyname_filterJabatan').setValue(null);
                                    Ext.getCmp('namajabatan_filterJabatan').setValue(null);
                                    Ext.getCmp('filtercb_companyJabatan').setValue(null);
                                    Ext.getCmp('filtercb_orgJabatan').setValue(null);
                                    Ext.getCmp('startdate_Jabatan').setValue(null);
                                    Ext.getCmp('enddate_Jabatan').setValue(null);

                                    storeGridJabatan.reload();
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
                                roleid: 60
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wJabatan.show();
                                    Ext.getCmp('statusformJabatan').setValue('input');
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
                                roleid: 61
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                   var grid = Ext.ComponentQuery.query('GridJabatan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formJabatan = Ext.getCmp('formJabatan');
                                        formJabatan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Jabatan/1/desainorg',
                                            params: {
                                                extraparams: 'a.idjabatan:' + selectedRecord.data.idjabatan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wJabatan.show();
                                        Ext.getCmp('statusformJabatan').setValue('edit');
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
                    id: 'btnDeleteJabatan',
                    text: 'Ubah Menjadi Nonaktif',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 62
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
                                                var grid = Ext.ComponentQuery.query('GridJabatan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Jabatan/desainorg/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridJabatan.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridJabatan.remove(sm.getSelection());
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
                },
                {
                    xtype: 'button',
                    text: 'Export Data',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            Ext.Ajax.request({
                                url: SITE_URL + 'sistem/cekakses',
                                method: 'POST',
                                params: {
                                    roleid: 174
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(d.success)
                                    {
                                       window.location = SITE_URL+"laporan/datajabatan/" + Ext.getCmp('companyname_filterJabatan').getValue()+'/'+
                                       Ext.getCmp('namajabatan_filterJabatan').getValue()+'/'+ Ext.getCmp('startdate_Jabatan').getSubmitValue() + '/' + Ext.getCmp('enddate_Jabatan').getSubmitValue();
                                    } else {
                                         Ext.Msg.alert("Info", d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                }
                            });
                           
                        }
                    }
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridJabatan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridJabatan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJabatan.load();
                companyStore.load();
                jabatanStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formJabatan = Ext.getCmp('formJabatan');
            wJabatan.show();
            formJabatan.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Jabatan/1/desainorg',
                params: {
                    extraparams: 'a.idjabatan:' + record.data.idjabatan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformJabatan').setValue('edit');
        }
    }
});
