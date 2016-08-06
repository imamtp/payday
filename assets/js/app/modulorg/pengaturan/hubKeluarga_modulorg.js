
var formHubKeluarga_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formHubKeluarga_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/HubKeluarga/natadaya',
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
            name: 'statusformHubKeluarga',
            id: 'statusformHubKeluarga_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idhubkeluarga',
            name: 'idhubkeluarga'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Hub Keluarga',
            allowBlank: false,
            name: 'kodehubkeluarga'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Hubungan Keluarga',
            allowBlank: false,
            name: 'namahubkeluarga'
        },{
            xtype:'comboxstatus',hidden:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupHubKeluarga_ModulOrg');
                Ext.getCmp('formHubKeluarga_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnHubKeluarga_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formHubKeluarga_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupHubKeluarga_ModulOrg').hide();
                            storeGridHubKeluarga_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridHubKeluarga_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wHubKeluarga_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupHubKeluarga_ModulOrg',
    title: 'Form Hubungan Keluarga',
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
    items: [formHubKeluarga_ModulOrg]
});

Ext.define('GridHubKeluarga_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idhubkeluarga','namahubkeluarga','status','idcompany','companyname','kodehubkeluarga','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridHubKeluarga_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridHubKeluarga_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/HubKeluarga/natadaya',
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
Ext.define('MY.searchGridHubKeluarga_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridHubKeluarga_ModulOrg',
    store: storeGridHubKeluarga_ModulOrg,
    width: 180
});
var smGridHubKeluarga_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridHubKeluarga_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteHubKeluarga_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteHubKeluarga_ModulOrg').enable();
        }
    }
});
Ext.define('GridHubKeluarga_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridHubKeluarga_ModulOrg,
    title: 'Hubungan Keluarga',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridHubKeluarga_ModulOrgID',
    id: 'GridHubKeluarga_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridHubKeluarga_ModulOrg',
    store: storeGridHubKeluarga_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idhubkeluarga', dataIndex: 'idhubkeluarga', hidden: true},
         {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Hub Keluarga', dataIndex: 'kodehubkeluarga', minWidth: 100},
        {header: 'Nama Hub Keluarga', dataIndex: 'namahubkeluarga', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        // {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150,hidden:true},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
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
                                roleid: 45
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wHubKeluarga_ModulOrg.show();
                                    Ext.getCmp('statusformHubKeluarga_ModulOrg').setValue('input');
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
                                roleid: 46
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridHubKeluarga_ModulOrg')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formHubKeluarga_ModulOrg = Ext.getCmp('formHubKeluarga_ModulOrg');
                                        formHubKeluarga_ModulOrg.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/HubKeluarga/1/natadaya',
                                            params: {
                                                extraparams: 'a.idhubkeluarga:' + selectedRecord.data.idhubkeluarga
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wHubKeluarga_ModulOrg.show();
                                        Ext.getCmp('statusformHubKeluarga_ModulOrg').setValue('edit');
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
                    id: 'btnDeleteHubKeluarga_ModulOrg',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 47
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
                                                var grid = Ext.ComponentQuery.query('GridHubKeluarga_ModulOrg')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/HubKeluarga/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridHubKeluarga_ModulOrg.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridHubKeluarga_ModulOrg.remove(sm.getSelection());
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
                    xtype: 'searchGridHubKeluarga_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridHubKeluarga_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridHubKeluarga_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formHubKeluarga_ModulOrg = Ext.getCmp('formHubKeluarga_ModulOrg');
            wHubKeluarga_ModulOrg.show();
            formHubKeluarga_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/HubKeluarga/1/natadaya',
                params: {
                    extraparams: 'a.idhubkeluarga:' + record.data.idhubkeluarga
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformHubKeluarga_ModulOrg').setValue('edit');
        }
    }
});
