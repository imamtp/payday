
var formKekaryaan_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formKekaryaan_Natadaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Kekaryaan/natadaya',
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
            name: 'statusformKekaryaan',
            id: 'statusformKekaryaan_Natadaya'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkekaryaan',
            name: 'idkekaryaan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Kekaryaan',
            allowBlank: false,
            name: 'kodekekaryaan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Kekaryaan',
            allowBlank: false,
            name: 'kekaryaanname'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'description'
        },{
            xtype:'comboxstatus',hidden:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupKekaryaan_Natadaya');
                Ext.getCmp('formKekaryaan_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKekaryaan_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formKekaryaan_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupKekaryaan_Natadaya').hide();
                            storeGridKekaryaan_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKekaryaan_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKekaryaan_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupKekaryaan_Natadaya',
    title: 'Form Status Kekaryawanan',
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
    items: [formKekaryaan_Natadaya]
});

Ext.define('GridKekaryaan_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idkekaryaan','kekaryaanname','description','status','idcompany','kodekekaryaan','userin','datein'],
    idProperty: 'id'
});

var storeGridKekaryaan_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKekaryaan_NatadayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Kekaryaan/natadaya',
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
Ext.define('MY.searchGridKekaryaan_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKekaryaan_Natadaya',
    store: storeGridKekaryaan_Natadaya,
    width: 180
});
var smGridKekaryaan_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKekaryaan_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKekaryaan_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKekaryaan_Natadaya').enable();
        }
    }
});
Ext.define('GridKekaryaan_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKekaryaan_Natadaya,
    title: 'Status Kekaryawanan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKekaryaan_NatadayaID',
    id: 'GridKekaryaan_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKekaryaan_Natadaya',
    store: storeGridKekaryaan_Natadaya,
    loadMask: true,
    columns: [
        {header: 'kekaryaan', dataIndex: 'kekaryaan', hidden: true},
        {header: 'Kode Kekaryaan', dataIndex: 'kodekekaryaan', minWidth: 100},
        {header: 'Nama Kekaryaan', dataIndex: 'kekaryaanname', minWidth: 200,flex:1},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
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
                                roleid: 20
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wKekaryaan_Natadaya.show();
                                    Ext.getCmp('statusformKekaryaan_Natadaya').setValue('input');
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
                                roleid: 21
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridKekaryaan_Natadaya')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formKekaryaan_Natadaya = Ext.getCmp('formKekaryaan_Natadaya');
                                        formKekaryaan_Natadaya.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Kekaryaan/1/natadaya',
                                            params: {
                                                extraparams: 'a.idkekaryaan:' + selectedRecord.data.idkekaryaan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wKekaryaan_Natadaya.show();
                                        Ext.getCmp('statusformKekaryaan_Natadaya').setValue('edit');
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
                    id: 'btnDeleteKekaryaan_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 22
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.Msg.show({
                                        title: 'Confirm',
                                        msg: 'Delete Selected ?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                                var grid = Ext.ComponentQuery.query('GridKekaryaan_Natadaya')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Kekaryaan/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridKekaryaan_Natadaya.remove(sm.getSelection());
                                                sm.select(0);
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
                    xtype: 'searchGridKekaryaan_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridKekaryaan_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKekaryaan_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formKekaryaan_Natadaya = Ext.getCmp('formKekaryaan_Natadaya');
            wKekaryaan_Natadaya.show();
            formKekaryaan_Natadaya.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Kekaryaan/1/natadaya',
                params: {
                    extraparams: 'a.idkekaryaan:' + record.data.idkekaryaan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformKekaryaan_Natadaya').setValue('edit');
        }
    }
});
