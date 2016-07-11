
var formJenisPergerakanPersonel = Ext.create('Ext.form.Panel', {
    id: 'formJenisPergerakanPersonel',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/PergerakanPersonel/natadaya',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 170,
        anchor:'100%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformPergerakanPersonel',
            id: 'statusformJenisPergerakanPersonel'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpergerakan',
            name: 'idpergerakan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Pergerakan Personel',
            allowBlank: false,
            name: 'kodepergerakan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Pergerakan Personel',
            allowBlank: false,
            name: 'namapergerakan'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'deskripsi'
        },{
            xtype:'comboxstatus',hidden:true
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJenisPergerakanPersonel');
                Ext.getCmp('formJenisPergerakanPersonel').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPergerakanPersonelSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJenisPergerakanPersonel').getForm().reset();
                            Ext.getCmp('windowPopupJenisPergerakanPersonel').hide();
                            storeGridJenisPergerakanPersonel.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPergerakanPersonel.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJenisPergerakanPersonel = Ext.create('widget.window', {
    id: 'windowPopupJenisPergerakanPersonel',
    title: 'Form Tingkatan PergerakanPersonel',
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
    items: [formJenisPergerakanPersonel]
});

Ext.define('GridJenisPergerakanPersonelModel', {
    extend: 'Ext.data.Model',
    fields: ['idpergerakan','kodepergerakan','namapergerakan','deskripsi','status','userin','datein'],
    idProperty: 'id'
});

var storeGridJenisPergerakanPersonel = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJenisPergerakanPersonelModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PergerakanPersonel/natadaya',
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
Ext.define('MY.searchGridJenisPergerakanPersonel', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJenisPergerakanPersonel',
    store: storeGridJenisPergerakanPersonel,
    width: 180
});
var smGridJenisPergerakanPersonel = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPergerakanPersonel.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePergerakanPersonel').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePergerakanPersonel').enable();
        }
    }
});
Ext.define('GridJenisPergerakanPersonel', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPergerakanPersonel,
    title: 'Pergerakan Personel',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJenisPergerakanPersonelID',
    id: 'GridJenisPergerakanPersonelID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJenisPergerakanPersonel',
    store: storeGridJenisPergerakanPersonel,
    loadMask: true,
    columns: [
        {header: 'idpergerakan', dataIndex: 'idpergerakan', hidden: true},
        {header: 'Kode Pergerakan', dataIndex: 'kodepergerakan', minWidth: 150},
        {header: 'Nama Pergerakan', dataIndex: 'namapergerakan', minWidth: 150,flex:1},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150},
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
                                roleid: 17
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wJenisPergerakanPersonel.show();
                                    Ext.getCmp('statusformJenisPergerakanPersonel').setValue('input');
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
                                roleid: 18
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridJenisPergerakanPersonel')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formJenisPergerakanPersonel = Ext.getCmp('formJenisPergerakanPersonel');
                                        formJenisPergerakanPersonel.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/PergerakanPersonel/1/natadaya',
                                            params: {
                                                extraparams: 'a.idpergerakan:' + selectedRecord.data.idpergerakan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wJenisPergerakanPersonel.show();
                                        Ext.getCmp('statusformJenisPergerakanPersonel').setValue('edit');
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
                    id: 'btnDeletePergerakanPersonel',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 19
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
                                                var grid = Ext.ComponentQuery.query('GridJenisPergerakanPersonel')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/PergerakanPersonel/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridJenisPergerakanPersonel.remove(sm.getSelection());
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
                    xtype: 'searchGridJenisPergerakanPersonel',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJenisPergerakanPersonel, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJenisPergerakanPersonel.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formPergerakanPersonel = Ext.getCmp('formPergerakanPersonel');
            // wPergerakanPersonel.show();
            // formPergerakanPersonel.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PergerakanPersonel/1/natadaya',
            //     params: {
            //         extraparams: 'a.idpergerakan:' + record.data.idpergerakan
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPergerakanPersonel').setValue('edit');
        }
    }
});
