
var formRekNatadaya = Ext.create('Ext.form.Panel', {
    id: 'formRekNatadaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/RekNatadaya/natadaya',
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
            name: 'statusformRekNatadaya',
            id: 'statusformRekNatadaya'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idreknatadaya',
            name: 'idreknatadaya'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Bank',
            allowBlank: false,
            name: 'bankname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nomor Rekening',
            allowBlank: false,
            name: 'norek'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Akun',
            allowBlank: false,
            name: 'accname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Cabang',
            allowBlank: false,
            name: 'branchname'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat',
            allowBlank: false,
            name: 'address'
        },],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupRekNatadaya');
                Ext.getCmp('formRekNatadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRekNatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formRekNatadaya').getForm().reset();
                            Ext.getCmp('windowPopupRekNatadaya').hide();
                            storeGridRekNatadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridRekNatadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wRekNatadaya = Ext.create('widget.window', {
    id: 'windowPopupRekNatadaya',
    title: 'Form Rekening Natadaya',
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
    items: [formRekNatadaya]
});

Ext.define('GridRekNatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idreknatadaya','norek','accname','accnumber','bankname','branchname','address'],
    idProperty: 'id'
});

var storeGridRekNatadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRekNatadayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RekNatadaya/natadaya',
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
Ext.define('MY.searchGridRekNatadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRekNatadaya',
    store: storeGridRekNatadaya,
    width: 180
});
var smGridRekNatadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRekNatadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRekNatadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRekNatadaya').enable();
        }
    }
});
Ext.define('GridRekNatadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRekNatadaya,
    title: 'Daftar Rekening Natadaya',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'Grididreknatadaya',
    id: 'Grididreknatadaya',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRekNatadaya',
    store: storeGridRekNatadaya,
    loadMask: true,
    columns: [
        {header: 'idreknatadaya', dataIndex: 'idreknatadaya', hidden: true},
        {header: 'Nomor Rekening', dataIndex: 'norek', minWidth: 150},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150},
        {header: 'Nama Bank', dataIndex: 'bankname', minWidth: 150},
        {header: 'Cabang', dataIndex: 'branchname', minWidth: 150},
        {header: 'Alamat', dataIndex: 'address', minWidth: 150}
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
                                roleid: 26
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wRekNatadaya.show();
                                    Ext.getCmp('statusformRekNatadaya').setValue('input');
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
                                roleid: 27
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridRekNatadaya')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formRekNatadaya = Ext.getCmp('formRekNatadaya');
                                        formRekNatadaya.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/RekNatadaya/1/natadaya',
                                            params: {
                                                extraparams: 'a.idreknatadaya:' + selectedRecord.data.idreknatadaya
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                Ext.getCmp('price_fRekNatadaya').setValue(renderNomor(d.data.price));
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wRekNatadaya.show();
                                        Ext.getCmp('statusformRekNatadaya').setValue('edit');
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
                    id: 'btnDeleteRekNatadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 28
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
                                                var grid = Ext.ComponentQuery.query('GridRekNatadaya')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/RekNatadaya/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridRekNatadaya.remove(sm.getSelection());
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
                    xtype: 'searchGridRekNatadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridRekNatadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRekNatadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formRekNatadaya = Ext.getCmp('formRekNatadaya');
            // wRekNatadaya.show();
            // formRekNatadaya.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/RekNatadaya/1/natadaya',
            //     params: {
            //         extraparams: 'a.idreknatadaya:' + record.data.idreknatadaya
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformRekNatadaya').setValue('edit');
        }
    }
});
