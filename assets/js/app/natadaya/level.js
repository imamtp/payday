
var formLevel_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formLevel_Natadaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Level/natadaya',
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
            name: 'statusformLevel',
            id: 'statusformLevel_Natadaya'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idlevel',
            name: 'idlevel'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Level',
            allowBlank: false,
            name: 'kodelevel'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Level',
            allowBlank: false,
            name: 'levelname'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Urutan',
            allowBlank: false,
            name: 'urutan'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'description'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupLevel_Natadaya');
                Ext.getCmp('formLevel_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnLevel_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formLevel_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupLevel_Natadaya').hide();
                            storeGridLevel_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridLevel_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wLevel_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupLevel_Natadaya',
    title: 'Form Level',
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
    items: [formLevel_Natadaya]
});

Ext.define('GridLevel_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idlevel','levelname','description','status','idcompany','kodelevel','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridLevel_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridLevel_NatadayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Level/natadaya',
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
Ext.define('MY.searchGridLevel_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridLevel_Natadaya',
    store: storeGridLevel_Natadaya,
    width: 180
});
var smGridLevel_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridLevel_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteLevel_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteLevel_Natadaya').enable();
        }
    }
});
Ext.define('GridLevel_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridLevel_Natadaya,
    title: 'Level Jabatan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridLevel_NatadayaID',
    id: 'GridLevel_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridLevel_Natadaya',
    store: storeGridLevel_Natadaya,
    loadMask: true,
    columns: [
        {header: 'idlevel', dataIndex: 'idlevel', hidden: true},
        {header: 'Kode Level', dataIndex: 'kodelevel', minWidth: 100},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 200,flex:1},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
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
                        wLevel_Natadaya.show();
                        Ext.getCmp('statusformLevel_Natadaya').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridLevel_Natadaya')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formLevel_Natadaya = Ext.getCmp('formLevel_Natadaya');
                            formLevel_Natadaya.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Level/1/natadaya',
                                params: {
                                    extraparams: 'a.idlevel:' + selectedRecord.data.idlevel
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wLevel_Natadaya.show();
                            Ext.getCmp('statusformLevel_Natadaya').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteLevel_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Hapus data terpilih ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridLevel_Natadaya')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/Level/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridLevel_Natadaya.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridLevel_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridLevel_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridLevel_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formLevel_Natadaya = Ext.getCmp('formLevel_Natadaya');
            wLevel_Natadaya.show();
            formLevel_Natadaya.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Level/1/natadaya',
                params: {
                    extraparams: 'a.idlevel:' + record.data.idlevel
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformLevel_Natadaya').setValue('edit');
        }
    }
});
