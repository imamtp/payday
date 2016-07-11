
var formHubKeluarga_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formHubKeluarga_Natadaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/HubKeluarga/natadaya',
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
            name: 'statusformHubKeluarga',
            id: 'statusformHubKeluarga_Natadaya'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idhubkeluarga',
            name: 'idhubkeluarga'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Hub Keluarga',
            allowBlank: false,
            name: 'kodehubkeluarga'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Hubungan Keluarga',
            allowBlank: false,
            name: 'namahubkeluarga'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupHubKeluarga_Natadaya');
                Ext.getCmp('formHubKeluarga_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnHubKeluarga_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formHubKeluarga_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupHubKeluarga_Natadaya').hide();
                            storeGridHubKeluarga_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridHubKeluarga_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wHubKeluarga_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupHubKeluarga_Natadaya',
    title: 'Form Hubungan Keluarga',
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
    items: [formHubKeluarga_Natadaya]
});

Ext.define('GridHubKeluarga_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idhubkeluarga','namahubkeluarga','status','idcompany','kodehubkeluarga','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridHubKeluarga_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridHubKeluarga_NatadayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/HubKeluarga/natadaya',
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
Ext.define('MY.searchGridHubKeluarga_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridHubKeluarga_Natadaya',
    store: storeGridHubKeluarga_Natadaya,
    width: 180
});
var smGridHubKeluarga_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridHubKeluarga_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteHubKeluarga_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteHubKeluarga_Natadaya').enable();
        }
    }
});
Ext.define('GridHubKeluarga_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridHubKeluarga_Natadaya,
    title: 'Hubungan Keluarga',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridHubKeluarga_NatadayaID',
    id: 'GridHubKeluarga_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridHubKeluarga_Natadaya',
    store: storeGridHubKeluarga_Natadaya,
    loadMask: true,
    columns: [
        {header: 'idhubkeluarga', dataIndex: 'idhubkeluarga', hidden: true},
        {header: 'Kode Hub Keluarga', dataIndex: 'kodehubkeluarga', minWidth: 100},
        {header: 'Nama Hub Keluarga', dataIndex: 'namahubkeluarga', minWidth: 200,flex:1},
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
                        wHubKeluarga_Natadaya.show();
                        Ext.getCmp('statusformHubKeluarga_Natadaya').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridHubKeluarga_Natadaya')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formHubKeluarga_Natadaya = Ext.getCmp('formHubKeluarga_Natadaya');
                            formHubKeluarga_Natadaya.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/HubKeluarga/1/natadaya',
                                params: {
                                    extraparams: 'a.idhubkeluarga:' + selectedRecord.data.idhubkeluarga
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wHubKeluarga_Natadaya.show();
                            Ext.getCmp('statusformHubKeluarga_Natadaya').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteHubKeluarga_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Hapus data terpilih ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridHubKeluarga_Natadaya')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/HubKeluarga/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridHubKeluarga_Natadaya.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridHubKeluarga_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridHubKeluarga_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridHubKeluarga_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formHubKeluarga_Natadaya = Ext.getCmp('formHubKeluarga_Natadaya');
            wHubKeluarga_Natadaya.show();
            formHubKeluarga_Natadaya.getForm().load({
                url: SITE_URL + 'backend/loadFormData/HubKeluarga/1/natadaya',
                params: {
                    extraparams: 'a.idhubkeluarga:' + record.data.idhubkeluarga
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformHubKeluarga_Natadaya').setValue('edit');
        }
    }
});
