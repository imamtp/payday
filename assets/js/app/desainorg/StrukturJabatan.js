
var formStrukturJabatan = Ext.create('Ext.form.Panel', {
    id: 'formStrukturJabatan',
    width: 905,
//    height: 300,
    url: SITE_URL + 'backend/saveform/StrukturJabatan/desainorg',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 100,
        anchor:'100%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformStrukturJabatan',
            id: 'statusformStrukturJabatan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idstrukturjabatan',
            name: 'idstrukturjabatan'
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Perusahaan',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
                // flex: 1,
                hideLabel: true
            },
            items: [
                    {
                        xtype: 'hiddenfield',
                        id: 'idcompanyStrukturJabatan',
                        name: 'idcompany'
                    },{
                        xtype: 'textfield',
                        flex:1,
                        margin: '0 5 0 0',
                        fieldLabel: 'Pilih Perusahaan',
                        id: 'companynameStrukturJabatan',
                        name: 'companyname',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        wGridStrukturJabatanCompanyListPopup.show();
                                        // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        //             operation.params={
                                        //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                                        //                         'idaccounttype': '12,16,11'
                                        //             };
                                        //         });
                                        storeGridStrukturJabatanCompanyList.load();
                                    });
                                }
                            }
                    }, {
                       xtype: 'displayfield',
                       margin: '0 5 0 0',
                       value: 'Kode Perusahaan'
                   }, {
                        xtype: 'textfield',
                        readOnly:true,
                        name:'companycode',
                        id: 'companycodeStrukturJabatan'
                    }
            ]
        },
        {
                xtype: 'fieldcontainer',
                fieldLabel: 'Jabatan',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    // flex: 1,
                    hideLabel: true
                },
                items: [
                            {
                                xtype: 'hiddenfield',
                                id: 'idjabatanStrukturJabatan',
                                name: 'idjabatan'
                            },{
                                xtype: 'textfield',
                                margin: '0 5 0 0',
                                fieldLabel: 'Pilih Jabatan',
                                id: 'namajabatanStrukturJabatan',
                                name: 'namajabatan',
                                    listeners: {
                                        render: function(component) {
                                            component.getEl().on('click', function(event, el) {
                                                wGridStrukturJabatanList2Popup.show();
                                                // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                //             operation.params={
                                                //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                                                //                         'idaccounttype': '12,16,11'
                                                //             };
                                                //         });
                                                storeGridStrukturJabatanList2.load();
                                            });
                                        }
                                    }
                            },
                            {
                                   xtype: 'displayfield',
                                   margin: '0 5 0 0',
                                   value: 'Kode Jabatan'
                            }, {
                                xtype: 'textfield',
                                readOnly:true,
                                margin: '0 5 0 0',
                                // fieldLabel: 'Kode Jabatan',
                                // allowBlank: false,
                                id: 'kodejabatanStrukturJabatan',
                                name: 'kodejabatan'
                            }, 
                            {
                                xtype: 'hiddenfield',
                                id: 'idlevelStrukturJabatan',
                                name: 'idlevel'
                            },
                            {
                                   xtype: 'displayfield',
                                   margin: '0 5 0 0',
                                   value: 'Level Jabatan'
                            },{
                                xtype: 'textfield',
                                flex:1,
                                readOnly:true,
                                // fieldLabel: 'Level Jabatan',
                                // allowBlank: false,
                                id: 'levelnameStrukturJabatan',
                                name: 'levelname'
                            }
                ]
        },
        {
                xtype: 'fieldcontainer',
                fieldLabel: 'Organisasi',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    // flex: 1,
                    hideLabel: true
                },
                items: [
                     {
                        xtype: 'hiddenfield',
                        id: 'idorganisasiStrukturJabatan',
                        name: 'idorganisasi'
                    },
                    {
                        xtype: 'textfield',
                        margin: '0 5 0 0',
                        // flex:1,
                        fieldLabel: 'Pilih Organisasi',
                        id: 'namaorgStrukturJabatan',
                        name: 'namaorg',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        wGridStrukturJabatanOrganisasiListPopup.show();
                                        // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        //             operation.params={
                                        //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                                        //                         'idaccounttype': '12,16,11'
                                        //             };
                                        //         });
                                        storeGridStrukturJabatanOrganisasiList.load();
                                    });
                                }
                            }
                    },{
                           xtype: 'displayfield',
                           margin: '0 5 0 0',
                           value: 'Kode Organisasi'
                    }, {
                        xtype: 'textfield',
                        // fieldLabel: 'Kode StrukturJabatan',
                        id: 'kodeorgStrukturJabatan',
                        name: 'kodeorg'
                    }, 
                ]
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Jabatan Atasan',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    // flex: 1,
                    hideLabel: true
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        id: 'idjabatanatasanStrukturJabatan',
                        name: 'idjabatanatasan'
                    },{
                        xtype: 'textfield',
                        margin: '0 5 0 0',
                        fieldLabel: 'Pilih Jabatan Atasan',
                        id: 'namajabatanatasanStrukturJabatan',
                        name: 'namajabatanatasan',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        wGridStrukturJabatanAtasanListPopup.show();
                                        // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        //             operation.params={
                                        //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                                        //                         'idaccounttype': '12,16,11'
                                        //             };
                                        //         });
                                        storeGridStrukturJabatanAtasanList.load();
                                    });
                                }
                            }
                    }, {
                           xtype: 'displayfield',
                           margin: '0 5 0 0',
                           value: 'Kode Jabatan Atasan'
                    },{
                        xtype: 'textfield',
                        readOnly:true,
                        // fieldLabel: 'Kode Jabatan Atasan',
                        // allowBlank: false,
                        id: 'kodejabatanatasanStrukturJabatan',
                        name: 'kodejabatanatasan'
                    }
                ]
            },   
            {
                xtype: 'textarea',
                fieldLabel: 'Deskripsi',
                // allowBlank: false,
                name: 'deskripsi',
                anchor:'50%'
            },{
                xtype: 'datefield',
                format: 'd-m-Y',
                name:'startdate',
                allowBlank: false,
                fieldLabel: 'Tgl Aktif',
                anchor:'50%'
            }, {
                xtype: 'datefield',
                format: 'd-m-Y',
                allowBlank: false,
                name:'enddate',
                fieldLabel: 'Tgl Terminasi',
                anchor:'50%'
            },{
                xtype:'comboxstatus',
                anchor:'50%'
            }],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var win = Ext.getCmp('windowPopupStrukturJabatan');
                Ext.getCmp('formStrukturJabatan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnStrukturJabatanSimpan',
            text: 'Simpan',
            handler: function() {
                var idjabatanStrukturJabatan = Ext.getCmp('idjabatanStrukturJabatan').getValue();
                var idjabatanatasanStrukturJabatan = Ext.getCmp('idjabatanatasanStrukturJabatan').getValue();

                if(idjabatanatasanStrukturJabatan==idjabatanStrukturJabatan)
                {
                    Ext.Msg.alert("Info", "Jabatan atasan tidak bisa membawahi jabatan yang sama");
                } else {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, action) {

                                Ext.Msg.alert('Success', action.result.message);
                                Ext.getCmp('formStrukturJabatan').getForm().reset();
                                Ext.getCmp('windowPopupStrukturJabatan').hide();
                                storeGridStrukturJabatan.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //                            storeGridStrukturJabatan.load();
                            }
                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
                }

                
            }
        }]
});
var wStrukturJabatan = Ext.create('widget.window', {
    id: 'windowPopupStrukturJabatan',
    title: 'Form Struktur Jabatan',
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
    items: [formStrukturJabatan]
});

Ext.define('GridStrukturJabatanModel', {
    extend: 'Ext.data.Model',
    fields: ['idstrukturjabatan','idcompany','idjabatan','startdate','enddate','idstrukturjabatan','idjabatanatasan','status','userin','datein','deskripsi','companycode','companyname','kodejabatan','namajabatan','kodeorg','namaorg','idlevel','kodelevel','levelname','kodejabatanatasan','namajabatanatasan'],
    idProperty: 'id'
});

var storeGridStrukturJabatan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/StrukturJabatan/desainorg',
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

storeGridStrukturJabatan.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterStrukturJabatan').getValue()+','+
                    'a.idorganisasi:'+Ext.getCmp('namaorg_filterStrukturJabatan').getValue(),
                    'startdate': Ext.getCmp('startdate_StrukturJabatan').getSubmitValue(),
                    'enddate': Ext.getCmp('enddate_StrukturJabatan').getSubmitValue(),
                  };
              });

Ext.define('MY.searchGridStrukturJabatan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridStrukturJabatan',
    store: storeGridStrukturJabatan,
    width: 180
});
var smGridStrukturJabatan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridStrukturJabatan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteStrukturJabatan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteStrukturJabatan').enable();
        }
    }
});
Ext.define('GridStrukturJabatan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridStrukturJabatan,
    title: 'Daftar Struktur Jabatan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridStrukturJabatanID',
    id: 'GridStrukturJabatanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatan',
    store: storeGridStrukturJabatan,
    loadMask: true,
    columns: [
        {header: 'idstrukturjabatan', dataIndex: 'idstrukturjabatan', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Kode Jabatan', dataIndex: 'kodejabatan', minWidth: 200},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 200},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'Kode jabatan atasan', dataIndex: 'kodejabatanatasan', minWidth: 150},
        {header: 'Nama jabatan atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150},     
        {header: 'Tgl Aktif', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Terminasi', dataIndex: 'enddate', minWidth: 150},   
        {header: 'Status', dataIndex: 'status', minWidth: 150}
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
                        id:'filtercb_companyStrukturJabatan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_companyStrukturJabatan').getValue())
                                    {
                                        Ext.getCmp('companyname_filterStrukturJabatan').setValue(null);
                                        Ext.getCmp('companyname_filterStrukturJabatan').setDisabled(true);
                                        storeGridStrukturJabatan.load();
                                    } else {
                                        Ext.getCmp('companyname_filterStrukturJabatan').setDisabled(false);
                                        storeGridStrukturJabatan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterStrukturJabatan',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridStrukturJabatan.load();
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
                        id:'filtercb_orgStrukturJabatan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_orgStrukturJabatan').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterStrukturJabatan').setValue(null);
                                        Ext.getCmp('namaorg_filterStrukturJabatan').setDisabled(true);
                                        storeGridStrukturJabatan.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterStrukturJabatan').setDisabled(false);
                                        storeGridStrukturJabatan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterStrukturJabatan',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridStrukturJabatan.load();
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
                                id:'startdate_StrukturJabatan',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Aktif',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        if (Ext.getCmp('startdate_StrukturJabatan').getSubmitValue() != null && Ext.getCmp('enddate_StrukturJabatan').getSubmitValue() != null)
                                        {
                                           storeGridStrukturJabatan.load()
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_StrukturJabatan',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        if (Ext.getCmp('startdate_StrukturJabatan').getSubmitValue() != null && Ext.getCmp('enddate_StrukturJabatan').getSubmitValue() != null)
                                        {
                                           storeGridStrukturJabatan.load()
                                        }
                                    }
                                }
                            },
                            '-',
                            {
                                text: 'Clear Filter',
                                iconCls: 'refresh',
                                handler: function() {
                                    Ext.getCmp('companyname_filterStrukturJabatan').setValue(null);
                                    Ext.getCmp('namaorg_filterStrukturJabatan').setValue(null);
                                    Ext.getCmp('filtercb_companyStrukturJabatan').setValue(null);
                                    Ext.getCmp('filtercb_orgStrukturJabatan').setValue(null);
                                    Ext.getCmp('startdate_StrukturJabatan').setValue(null);
                                    Ext.getCmp('enddate_StrukturJabatan').setValue(null);

                                    storeGridStrukturJabatan.reload();
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
                                roleid: 63
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wStrukturJabatan.show();
                                    Ext.getCmp('statusformStrukturJabatan').setValue('input');
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
                    text: 'Detail',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 64
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridStrukturJabatan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formStrukturJabatan = Ext.getCmp('formStrukturJabatan');
                                        formStrukturJabatan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/StrukturJabatan/1/desainorg',
                                            params: {
                                                extraparams: 'a.idstrukturjabatan:' + selectedRecord.data.idstrukturjabatan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wStrukturJabatan.show();
                                        Ext.getCmp('statusformStrukturJabatan').setValue('edit');
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
                    xtype: 'button',
                    text: 'Export Data',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            Ext.Ajax.request({
                                url: SITE_URL + 'sistem/cekakses',
                                method: 'POST',
                                params: {
                                    roleid: 175
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(d.success)
                                    {
                                       window.location = SITE_URL+"laporan/datastrukturjabatan/" + Ext.getCmp('companyname_filterStrukturJabatan').getValue()+'/'+
                                       Ext.getCmp('namaorg_filterStrukturJabatan').getValue()+'/'+ Ext.getCmp('startdate_StrukturJabatan').getSubmitValue() + '/' + Ext.getCmp('enddate_StrukturJabatan').getSubmitValue();
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
                }, {
                    id: 'btnDeleteStrukturJabatan',
                    text: 'Ubah Menjadi Nonaktif',
                    iconCls: 'delete-icon',
                    handler: function() {
                        
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 65
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
                                                var grid = Ext.ComponentQuery.query('GridStrukturJabatan')[0];
                                                var sm = grid.getSelectionModel();
                                                // console.log(sm);
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    // console.log(item.data.idstrukturjabatan)
                                                    // selected.push(item.data[Object.keys(item.data)[0]]);
                                                    selected.push(item.data.idstrukturjabatan);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/StrukturJabatan/desainorg/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridStrukturJabatan.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridStrukturJabatan.remove(sm.getSelection());
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
                    xtype: 'searchGridStrukturJabatan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStrukturJabatan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridStrukturJabatan.load();
                 companyStore.load();
                orgStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formStrukturJabatan = Ext.getCmp('formStrukturJabatan');
            wStrukturJabatan.show();
            formStrukturJabatan.getForm().load({
                url: SITE_URL + 'backend/loadFormData/StrukturJabatan/1/desainorg',
                params: {
                    extraparams: 'a.idstrukturjabatan:' + record.data.idstrukturjabatan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformStrukturJabatan').setValue('edit');
        }
    }
});
