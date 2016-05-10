
var formAgama_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formAgama_Natadaya',
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
            id: 'statusformAgama_Natadaya'
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
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAgama_Natadaya');
                Ext.getCmp('formAgama_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAgama_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formAgama_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupAgama_Natadaya').hide();
                            storeGridAgama_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridAgama_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wAgama_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupAgama_Natadaya',
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
    items: [formAgama_Natadaya]
});

Ext.define('GridAgama_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idagama','namaagama','status','idcompany','kodeagama','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridAgama_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAgama_NatadayaModel',
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
Ext.define('MY.searchGridAgama_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAgama_Natadaya',
    store: storeGridAgama_Natadaya,
    width: 180
});
var smGridAgama_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridAgama_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAgama_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteAgama_Natadaya').enable();
        }
    }
});
Ext.define('GridAgama_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridAgama_Natadaya,
    title: 'Data Agama',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridAgama_NatadayaID',
    id: 'GridAgama_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAgama_Natadaya',
    store: storeGridAgama_Natadaya,
    loadMask: true,
    columns: [
        {header: 'idagama', dataIndex: 'idagama', hidden: true},
        {header: 'Kode Agama', dataIndex: 'kodeagama', minWidth: 100},
        {header: 'Nama Agama', dataIndex: 'namaagama', minWidth: 200,flex:1},
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
                        wAgama_Natadaya.show();
                        Ext.getCmp('statusformAgama_Natadaya').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridAgama_Natadaya')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formAgama_Natadaya = Ext.getCmp('formAgama_Natadaya');
                            formAgama_Natadaya.getForm().load({
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

                            wAgama_Natadaya.show();
                            Ext.getCmp('statusformAgama_Natadaya').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteAgama_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridAgama_Natadaya')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/Agama/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridAgama_Natadaya.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAgama_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAgama_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAgama_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formAgama_Natadaya = Ext.getCmp('formAgama_Natadaya');
            wAgama_Natadaya.show();
            formAgama_Natadaya.getForm().load({
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

            Ext.getCmp('statusformAgama_Natadaya').setValue('edit');
        }
    }
});
