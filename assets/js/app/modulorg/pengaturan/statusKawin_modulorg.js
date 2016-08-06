
var formStatusKawin_ModulOrgaya = Ext.create('Ext.form.Panel', {
    id: 'formStatusKawin_ModulOrgaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/StatusKawin/natadaya',
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
            name: 'statusformStatusKawin',
            id: 'statusformStatusKawin_ModulOrgaya'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idstatuskawin',
            name: 'idstatuskawin'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Status Kawin',
            allowBlank: false,
            name: 'kodestatuskawin'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Status kawin',
            allowBlank: false,
            name: 'namastatuskawin'
        },{
            xtype:'comboxstatus',hidden:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupStatusKawin_ModulOrgaya');
                Ext.getCmp('formStatusKawin_ModulOrgaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnStatusKawin_ModulOrgayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formStatusKawin_ModulOrgaya').getForm().reset();
                            Ext.getCmp('windowPopupStatusKawin_ModulOrgaya').hide();
                            storeGridStatusKawin_ModulOrgaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridStatusKawin_ModulOrgaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wStatusKawin_ModulOrgaya = Ext.create('widget.window', {
    id: 'windowPopupStatusKawin_ModulOrgaya',
    title: 'Form Status Kawin',
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
    items: [formStatusKawin_ModulOrgaya]
});

Ext.define('GridStatusKawin_ModulOrgayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idstatuskawin','namastatuskawin','status','idcompany','kodestatuskawin','urutan','companyname','userin','datein','usermod','datemod'],
    idProperty: 'id'
});

var storeGridStatusKawin_ModulOrgaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStatusKawin_ModulOrgayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/StatusKawin/natadaya',
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
Ext.define('MY.searchGridStatusKawin_ModulOrgaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridStatusKawin_ModulOrgaya',
    store: storeGridStatusKawin_ModulOrgaya,
    width: 180
});
var smGridStatusKawin_ModulOrgaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridStatusKawin_ModulOrgaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteStatusKawin_ModulOrgaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteStatusKawin_ModulOrgaya').enable();
        }
    }
});
Ext.define('GridStatusKawin_ModulOrgaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridStatusKawin_ModulOrgaya,
    title: 'Status Perkawinan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridStatusKawin_ModulOrgayaID',
    id: 'GridStatusKawin_ModulOrgayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStatusKawin_ModulOrgaya',
    store: storeGridStatusKawin_ModulOrgaya,
    loadMask: true,
    columns: [
        {header: 'idstatuskawin', dataIndex: 'idstatuskawin', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Status Perkawinan', dataIndex: 'kodestatuskawin', minWidth: 100},
        {header: 'Nama Status Perkawinan', dataIndex: 'namastatuskawin', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        // {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150,hidden:true},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true},
        {header: 'user last update', dataIndex: 'usermod', minWidth: 150,hidden:true},
        {header: 'last update', dataIndex: 'datemod', minWidth: 150,hidden:true}
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
                                roleid: 51
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wStatusKawin_ModulOrgaya.show();
                                    Ext.getCmp('statusformStatusKawin_ModulOrgaya').setValue('input');
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
                                roleid: 52
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridStatusKawin_ModulOrgaya')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formStatusKawin_ModulOrgaya = Ext.getCmp('formStatusKawin_ModulOrgaya');
                                        formStatusKawin_ModulOrgaya.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/StatusKawin/1/natadaya',
                                            params: {
                                                extraparams: 'a.idstatuskawin:' + selectedRecord.data.idstatuskawin
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wStatusKawin_ModulOrgaya.show();
                                        Ext.getCmp('statusformStatusKawin_ModulOrgaya').setValue('edit');
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
                    id: 'btnDeleteStatusKawin_ModulOrgaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 53
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
                                                var grid = Ext.ComponentQuery.query('GridStatusKawin_ModulOrgaya')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/StatusKawin/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridStatusKawin_ModulOrgaya.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridStatusKawin_ModulOrgaya.remove(sm.getSelection());
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
                    xtype: 'searchGridStatusKawin_ModulOrgaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridStatusKawin_ModulOrgaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridStatusKawin_ModulOrgaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formStatusKawin_ModulOrgaya = Ext.getCmp('formStatusKawin_ModulOrgaya');
            wStatusKawin_ModulOrgaya.show();
            formStatusKawin_ModulOrgaya.getForm().load({
                url: SITE_URL + 'backend/loadFormData/StatusKawin/1/natadaya',
                params: {
                    extraparams: 'a.statuskawin:' + record.data.statuskawin
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformStatusKawin_ModulOrgaya').setValue('edit');
        }
    }
});
