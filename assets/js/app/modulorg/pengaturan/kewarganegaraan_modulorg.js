
var formKewarganegaraan_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formKewarganegaraan_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Kewarganegaraan/natadaya',
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
            name: 'statusformKewarganegaraan',
            id: 'statusformKewarganegaraan_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkewarganegaraan',
            name: 'idkewarganegaraan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Kewarganegaraan',
            allowBlank: false,
            name: 'kodekewarganegaraan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Kewarganegaraan',
            allowBlank: false,
            name: 'namakewarganegaraan'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupKewarganegaraan_ModulOrg');
                Ext.getCmp('formKewarganegaraan_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKewarganegaraan_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formKewarganegaraan_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupKewarganegaraan_ModulOrg').hide();
                            storeGridKewarganegaraan_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKewarganegaraan_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKewarganegaraan_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupKewarganegaraan_ModulOrg',
    title: 'Form Kewarganegaraan',
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
    items: [formKewarganegaraan_ModulOrg]
});

Ext.define('GridKewarganegaraan_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idkewarganegaraan','namakewarganegaraan','status','idcompany','kodekewarganegaraan','urutan','userin','datein','companyname'],
    idProperty: 'id'
});

var storeGridKewarganegaraan_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKewarganegaraan_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Kewarganegaraan/natadaya',
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
Ext.define('MY.searchGridKewarganegaraan_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKewarganegaraan_ModulOrg',
    store: storeGridKewarganegaraan_ModulOrg,
    width: 180
});
var smGridKewarganegaraan_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKewarganegaraan_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKewarganegaraan_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKewarganegaraan_ModulOrg').enable();
        }
    }
});
Ext.define('GridKewarganegaraan_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKewarganegaraan_ModulOrg,
    title: 'Kewarganegaraan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKewarganegaraan_ModulOrgID',
    id: 'GridKewarganegaraan_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKewarganegaraan_ModulOrg',
    store: storeGridKewarganegaraan_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idkewarganegaraan', dataIndex: 'idkewarganegaraan', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Kewarganegaraan', dataIndex: 'kodekewarganegaraan', minWidth: 100},
        {header: 'Nama Kewarganegaraan', dataIndex: 'namakewarganegaraan', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        // {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
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
                                roleid: 54
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wKewarganegaraan_ModulOrg.show();
                                    Ext.getCmp('statusformKewarganegaraan_ModulOrg').setValue('input');
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
                                roleid: 55
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                   var grid = Ext.ComponentQuery.query('GridKewarganegaraan_ModulOrg')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formKewarganegaraan_ModulOrg = Ext.getCmp('formKewarganegaraan_ModulOrg');
                                        formKewarganegaraan_ModulOrg.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Kewarganegaraan/1/natadaya',
                                            params: {
                                                extraparams: 'a.idkewarganegaraan:' + selectedRecord.data.idkewarganegaraan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wKewarganegaraan_ModulOrg.show();
                                        Ext.getCmp('statusformKewarganegaraan_ModulOrg').setValue('edit');
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
                    id: 'btnDeleteKewarganegaraan_ModulOrg',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 56
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
                                                var grid = Ext.ComponentQuery.query('GridKewarganegaraan_ModulOrg')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Kewarganegaraan/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridKewarganegaraan_ModulOrg.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridKewarganegaraan_ModulOrg.remove(sm.getSelection());
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
                    xtype: 'searchGridKewarganegaraan_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridKewarganegaraan_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKewarganegaraan_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formKewarganegaraan_ModulOrg = Ext.getCmp('formKewarganegaraan_ModulOrg');
            wKewarganegaraan_ModulOrg.show();
            formKewarganegaraan_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Kewarganegaraan/1/natadaya',
                params: {
                    extraparams: 'a.kewarganegaraan:' + record.data.kewarganegaraan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformKewarganegaraan_ModulOrg').setValue('edit');
        }
    }
});
