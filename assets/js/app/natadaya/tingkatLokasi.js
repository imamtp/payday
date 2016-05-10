
var formTingkatLokasi = Ext.create('Ext.form.Panel', {
    id: 'formTingkatLokasi',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/TingkatLokasi/natadaya',
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
            name: 'statusformTingkatLokasi',
            id: 'statusformTingkatLokasi'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idtingkatlokasi',
            name: 'idtingkatlokasi'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Tingkat Lokasi',
            allowBlank: false,
            name: 'kodetingkatlokasi'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama tingkat lokasi',
            allowBlank: false,
            name: 'tingkatlokasi'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'deskripsi'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupTingkatLokasi');
                Ext.getCmp('formTingkatLokasi').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnTingkatLokasiSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formTingkatLokasi').getForm().reset();
                            Ext.getCmp('windowPopupTingkatLokasi').hide();
                            storeGridTingkatLokasi.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridTingkatLokasi.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wTingkatLokasi = Ext.create('widget.window', {
    id: 'windowPopupTingkatLokasi',
    title: 'Form Tingkatan Lokasi',
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
    items: [formTingkatLokasi]
});

Ext.define('GridTingkatLokasiModel', {
    extend: 'Ext.data.Model',
    fields: ['idtingkatlokasi','tingkatlokasi','kodetingkatlokasi','deskripsi','status','userin','datein'],
    idProperty: 'id'
});

var storeGridTingkatLokasi = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTingkatLokasiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/TingkatLokasi/natadaya',
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
Ext.define('MY.searchGridTingkatLokasi', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridTingkatLokasi',
    store: storeGridTingkatLokasi,
    width: 180
});
var smGridTingkatLokasi = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridTingkatLokasi.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteTingkatLokasi').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteTingkatLokasi').enable();
        }
    }
});
Ext.define('GridTingkatLokasi', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridTingkatLokasi,
    title: 'Tingkatan Lokasi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridTingkatLokasiID',
    id: 'GridTingkatLokasiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridTingkatLokasi',
    store: storeGridTingkatLokasi,
    loadMask: true,
    columns: [
        {header: 'idtingkatlokasi', dataIndex: 'idtingkatlokasi', hidden: true},
        {header: 'Kode Tingkat Lokasi', dataIndex: 'kodetingkatlokasi', minWidth: 150},
        {header: 'Nama Tingkat Lokasi', dataIndex: 'tingkatlokasi', minWidth: 150},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150},
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
                        wTingkatLokasi.show();
                        Ext.getCmp('statusformTingkatLokasi').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTingkatLokasi')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formTingkatLokasi = Ext.getCmp('formTingkatLokasi');
                            formTingkatLokasi.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/TingkatLokasi/1/natadaya',
                                params: {
                                    extraparams: 'a.idtingkatlokasi:' + selectedRecord.data.idtingkatlokasi
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wTingkatLokasi.show();
                            Ext.getCmp('statusformTingkatLokasi').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteTingkatLokasi',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridTingkatLokasi')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/TingkatLokasi/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridTingkatLokasi.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridTingkatLokasi',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridTingkatLokasi, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridTingkatLokasi.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formTingkatLokasi = Ext.getCmp('formTingkatLokasi');
            wTingkatLokasi.show();
            formTingkatLokasi.getForm().load({
                url: SITE_URL + 'backend/loadFormData/TingkatLokasi/1/natadaya',
                params: {
                    extraparams: 'a.idtingkatlokasi:' + record.data.idtingkatlokasi
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformTingkatLokasi').setValue('edit');
        }
    }
});
