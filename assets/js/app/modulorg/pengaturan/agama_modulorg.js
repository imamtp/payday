
var formAgama_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formAgama_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Agama/natadaya',
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
            name: 'statusformAgama',
            id: 'statusformAgama_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idagama',
            name: 'idagama'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Agama',
            allowBlank: false,
            name: 'kodeagama'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Agama',
            allowBlank: false,
            name: 'namaagama'
        },{
            xtype:'comboxstatus',hidden:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAgama_ModulOrg');
                Ext.getCmp('formAgama_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAgama_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formAgama_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupAgama_ModulOrg').hide();
                            storeGridAgama_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridAgama_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wAgama_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupAgama_ModulOrg',
    title: 'Form Agama',
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
    items: [formAgama_ModulOrg]
});

Ext.define('GridAgama_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idagama','namaagama','status','idcompany','kodeagama','urutan','userin','datein','companyname'],
    idProperty: 'id'
});

var storeGridAgama_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAgama_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Agama/natadaya',
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
Ext.define('MY.searchGridAgama_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAgama_ModulOrg',
    store: storeGridAgama_ModulOrg,
    width: 180
});
var smGridAgama_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridAgama_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAgama_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteAgama_ModulOrg').enable();
        }
    }
});
Ext.define('GridAgama_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridAgama_ModulOrg,
    title: 'Data Agama',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridAgama_ModulOrgID',
    id: 'GridAgama_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAgama_ModulOrg',
    store: storeGridAgama_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idagama', dataIndex: 'idagama', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Agama', dataIndex: 'kodeagama', minWidth: 100},
        {header: 'Nama Agama', dataIndex: 'namaagama', minWidth: 200,flex:1},
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
                                roleid: 48
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wAgama_ModulOrg.show();
                                    Ext.getCmp('statusformAgama_ModulOrg').setValue('input');
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
                                roleid: 49
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridAgama_ModulOrg')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formAgama_ModulOrg = Ext.getCmp('formAgama_ModulOrg');
                                        formAgama_ModulOrg.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Agama/1/natadaya',
                                            params: {
                                                extraparams: 'a.idagama:' + selectedRecord.data.idagama
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wAgama_ModulOrg.show();
                                        Ext.getCmp('statusformAgama_ModulOrg').setValue('edit');
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
                    id: 'btnDeleteAgama_ModulOrg',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 50
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
                                                var grid = Ext.ComponentQuery.query('GridAgama_ModulOrg')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Agama/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridAgama_ModulOrg.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridAgama_ModulOrg.remove(sm.getSelection());
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
                    xtype: 'searchGridAgama_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridAgama_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAgama_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formAgama_ModulOrg = Ext.getCmp('formAgama_ModulOrg');
            wAgama_ModulOrg.show();
            formAgama_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Agama/1/natadaya',
                params: {
                    extraparams: 'a.idagama:' + record.data.idagama
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformAgama_ModulOrg').setValue('edit');
        }
    }
});
