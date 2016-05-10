
var formKewarganegaraan_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formKewarganegaraan_Natadaya',
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
            id: 'statusformKewarganegaraan_Natadaya'
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
                var win = Ext.getCmp('windowPopupKewarganegaraan_Natadaya');
                Ext.getCmp('formKewarganegaraan_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKewarganegaraan_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formKewarganegaraan_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupKewarganegaraan_Natadaya').hide();
                            storeGridKewarganegaraan_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKewarganegaraan_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKewarganegaraan_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupKewarganegaraan_Natadaya',
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
    items: [formKewarganegaraan_Natadaya]
});

Ext.define('GridKewarganegaraan_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idkewarganegaraan','namakewarganegaraan','status','idcompany','kodekewarganegaraan','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridKewarganegaraan_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKewarganegaraan_NatadayaModel',
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
Ext.define('MY.searchGridKewarganegaraan_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKewarganegaraan_Natadaya',
    store: storeGridKewarganegaraan_Natadaya,
    width: 180
});
var smGridKewarganegaraan_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKewarganegaraan_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKewarganegaraan_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKewarganegaraan_Natadaya').enable();
        }
    }
});
Ext.define('GridKewarganegaraan_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKewarganegaraan_Natadaya,
    title: 'Kewarganegaraan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKewarganegaraan_NatadayaID',
    id: 'GridKewarganegaraan_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKewarganegaraan_Natadaya',
    store: storeGridKewarganegaraan_Natadaya,
    loadMask: true,
    columns: [
        {header: 'idkewarganegaraan', dataIndex: 'idkewarganegaraan', hidden: true},
        {header: 'Kode Kewarganegaraan', dataIndex: 'kodekewarganegaraan', minWidth: 100},
        {header: 'Nama Kewarganegaraan', dataIndex: 'namakewarganegaraan', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        // {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150},
        {header: 'date in', dataIndex: 'datein', minWidth: 150}
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
                        wKewarganegaraan_Natadaya.show();
                        Ext.getCmp('statusformKewarganegaraan_Natadaya').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridKewarganegaraan_Natadaya')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formKewarganegaraan_Natadaya = Ext.getCmp('formKewarganegaraan_Natadaya');
                            formKewarganegaraan_Natadaya.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Kewarganegaraan/1/natadaya',
                                params: {
                                    extraparams: 'a.kewarganegaraan:' + selectedRecord.data.kewarganegaraan
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wKewarganegaraan_Natadaya.show();
                            Ext.getCmp('statusformKewarganegaraan_Natadaya').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteKewarganegaraan_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridKewarganegaraan_Natadaya')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/Kewarganegaraan/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridKewarganegaraan_Natadaya.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridKewarganegaraan_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridKewarganegaraan_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKewarganegaraan_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formKewarganegaraan_Natadaya = Ext.getCmp('formKewarganegaraan_Natadaya');
            wKewarganegaraan_Natadaya.show();
            formKewarganegaraan_Natadaya.getForm().load({
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

            Ext.getCmp('statusformKewarganegaraan_Natadaya').setValue('edit');
        }
    }
});
