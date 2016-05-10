
var formJenisIzin = Ext.create('Ext.form.Panel', {
    id: 'formJenisIzin',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/JenisIzin/kehadiran',
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
            name: 'statusformJenisIzin',
            id: 'statusformJenisIzin'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idjenisizin',
            name: 'idjenisizin'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Izin',
            allowBlank: false,
            name: 'kodeizin'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Izin',
            allowBlank: false,
            name: 'namaizin'
        },{
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            // allowBlank: false,
            name: 'keterangan'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJenisIzin');
                Ext.getCmp('formJenisIzin').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJenisIzinSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJenisIzin').getForm().reset();
                            Ext.getCmp('windowPopupJenisIzin').hide();
                            storeGridJenisIzin.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJenisIzin.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJenisIzin = Ext.create('widget.window', {
    id: 'windowPopupJenisIzin',
    title: 'Form Jenis Izin',
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
    items: [formJenisIzin]
});

Ext.define('GridJenisIzinModel', {
    extend: 'Ext.data.Model',
    fields: ['idjenisizin','kodeizin','namaizin','keterangan','userin','datein','companyname'],
    idProperty: 'id'
});

var storeGridJenisIzin = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJenisIzinModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JenisIzin/kehadiran',
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
Ext.define('MY.searchGridJenisIzin', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJenisIzin',
    store: storeGridJenisIzin,
    width: 180
});
var smGridJenisIzin = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridJenisIzin.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteJenisIzin').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteJenisIzin').enable();
        }
    }
});
Ext.define('GridJenisIzin', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJenisIzin,
    title: 'Daftar Jenis Izin',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJenisIzinID',
    id: 'GridJenisIzinID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJenisIzin',
    store: storeGridJenisIzin,
    loadMask: true,
    columns: [
        {header: 'idjenisizin', dataIndex: 'idjenisizin', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode izin', dataIndex: 'kodeizin', minWidth: 150},
        {header: 'Nama izin', dataIndex: 'namaizin', minWidth: 150},
        {header: 'keterangan', dataIndex: 'keterangan', minWidth: 150},
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
                                roleid: 123
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wJenisIzin.show();
                                    Ext.getCmp('statusformJenisIzin').setValue('input');
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
                                roleid: 124
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridJenisIzin')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangJenis').setReadOnly(false);
                                        var formJenisIzin = Ext.getCmp('formJenisIzin');
                                        formJenisIzin.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/JenisIzin/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idjenisizin:' + selectedRecord.data.idjenisizin
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wJenisIzin.show();
                                        Ext.getCmp('statusformJenisIzin').setValue('edit');
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
                    id: 'btnDeleteJenisIzin',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 125
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
                                                var grid = Ext.ComponentQuery.query('GridJenisIzin')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/JenisIzin/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridJenisIzin.remove(sm.getSelection());
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
                    xtype: 'searchGridJenisIzin',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJenisIzin, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJenisIzin.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formJenisIzin = Ext.getCmp('formJenisIzin');
            wJenisIzin.show();
            formJenisIzin.getForm().load({
                url: SITE_URL + 'backend/loadFormData/JenisIzin/1/kehadiran',
                params: {
                    extraparams: 'a.idjenisizin:' + record.data.idjenisizin
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformJenisIzin').setValue('edit');
        }
    }
});
