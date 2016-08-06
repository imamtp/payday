
var formJenjangPendidikan_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formJenjangPendidikan_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/JenjangPendidikan/natadaya',
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
            name: 'statusformJenjangPendidikan',
            id: 'statusformJenjangPendidikan_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idjenjangpendidikan',
            name: 'idjenjangpendidikan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Jenjang Pendidikan',
            allowBlank: false,
            name: 'kodejenjang'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Jenjang Pendidikan',
            allowBlank: false,
            name: 'namajenjang'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Urutan',
            allowBlank: false,
            name: 'urutan'
        },{
            xtype:'comboxstatus',hidden:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJenjangPendidikan_ModulOrg');
                Ext.getCmp('formJenjangPendidikan_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJenjangPendidikan_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJenjangPendidikan_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupJenjangPendidikan_ModulOrg').hide();
                            storeGridJenjangPendidikan_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJenjangPendidikan_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJenjangPendidikan_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupJenjangPendidikan_ModulOrg',
    title: 'Form Jenjang Pendidikan',
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
    items: [formJenjangPendidikan_ModulOrg]
});

Ext.define('GridJenjangPendidikan_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idjenjangpendidikan','namajenjang','kodejenjang','status','idcompany','companyname','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridJenjangPendidikan_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJenjangPendidikan_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JenjangPendidikan/natadaya',
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
Ext.define('MY.searchGridJenjangPendidikan_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJenjangPendidikan_ModulOrg',
    store: storeGridJenjangPendidikan_ModulOrg,
    width: 180
});
var smGridJenjangPendidikan_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridJenjangPendidikan_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteJenjangPendidikan_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteJenjangPendidikan_ModulOrg').enable();
        }
    }
});
Ext.define('GridJenjangPendidikan_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJenjangPendidikan_ModulOrg,
    title: 'Jenjang Pendidikan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJenjangPendidikan_ModulOrgID',
    id: 'GridJenjangPendidikan_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJenjangPendidikan_ModulOrg',
    store: storeGridJenjangPendidikan_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idjenjangpendidikan', dataIndex: 'idjenjangpendidikan', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Jenjang Pendidikan', dataIndex: 'kodejenjang', minWidth: 100},
        {header: 'Nama Jenjang Pendidikan', dataIndex: 'namajenjang', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
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
                                roleid: 42
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wJenjangPendidikan_ModulOrg.show();
                                    Ext.getCmp('statusformJenjangPendidikan_ModulOrg').setValue('input');
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
                                roleid: 43
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridJenjangPendidikan_ModulOrg')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formJenjangPendidikan_ModulOrg = Ext.getCmp('formJenjangPendidikan_ModulOrg');
                                        formJenjangPendidikan_ModulOrg.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/JenjangPendidikan/1/natadaya',
                                            params: {
                                                extraparams: 'a.idjenjangpendidikan:' + selectedRecord.data.idjenjangpendidikan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wJenjangPendidikan_ModulOrg.show();
                                        Ext.getCmp('statusformJenjangPendidikan_ModulOrg').setValue('edit');
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
                    id: 'btnDeleteJenjangPendidikan_ModulOrg',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 44
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
                                                var grid = Ext.ComponentQuery.query('GridJenjangPendidikan_ModulOrg')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/JenjangPendidikan/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridJenjangPendidikan_ModulOrg.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridJenjangPendidikan_ModulOrg.remove(sm.getSelection());
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
                    xtype: 'searchGridJenjangPendidikan_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridJenjangPendidikan_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJenjangPendidikan_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formJenjangPendidikan_ModulOrg = Ext.getCmp('formJenjangPendidikan_ModulOrg');
            wJenjangPendidikan_ModulOrg.show();
            formJenjangPendidikan_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/JenjangPendidikan/1/natadaya',
                params: {
                    extraparams: 'a.idjenjangpendidikan:' + record.data.idjenjangpendidikan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformJenjangPendidikan_ModulOrg').setValue('edit');
        }
    }
});
