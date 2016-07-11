
var formLokasi = Ext.create('Ext.form.Panel', {
    id: 'formLokasi',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Lokasi/natadaya',
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
            name: 'statusformLokasi',
            id: 'statusformLokasi'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idlokasi',
            name: 'idlokasi'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Lokasi',
            allowBlank: false,
            name: 'kodelokasi'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama lokasi',
            allowBlank: false,
            name: 'namalokasi'
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
                var win = Ext.getCmp('windowPopupLokasi');
                Ext.getCmp('formLokasi').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnLokasiSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formLokasi').getForm().reset();
                            Ext.getCmp('windowPopupLokasi').hide();
                            storeGridLokasi.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridLokasi.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wLokasi = Ext.create('widget.window', {
    id: 'windowPopupLokasi',
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
    items: [formLokasi]
});

Ext.define('GridLokasiModel', {
    extend: 'Ext.data.Model',
    fields: ['idLokasi','Lokasi','kodeLokasi','deskripsi','status','userin','datein'],
    idProperty: 'id'
});

var storeGridLokasi = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridLokasiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Lokasi/natadaya',
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
Ext.define('MY.searchGridLokasi', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridLokasi',
    store: storeGridLokasi,
    width: 180
});
var smGridLokasi = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridLokasi.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteLokasi').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteLokasi').enable();
        }
    }
});
Ext.define('GridLokasi', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridLokasi,
    title: 'Tingkatan Lokasi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridLokasiID',
    id: 'GridLokasiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridLokasi',
    store: storeGridLokasi,
    loadMask: true,
    columns: [
        {header: 'idLokasi', dataIndex: 'idLokasi', hidden: true},
        {header: 'Kode Tingkat Lokasi', dataIndex: 'kodeLokasi', minWidth: 150},
        {header: 'Nama Tingkat Lokasi', dataIndex: 'Lokasi', minWidth: 150},
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
                        wLokasi.show();
                        Ext.getCmp('statusformLokasi').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridLokasi')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formLokasi = Ext.getCmp('formLokasi');
                            formLokasi.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Lokasi/1/natadaya',
                                params: {
                                    extraparams: 'a.idLokasi:' + selectedRecord.data.idLokasi
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wLokasi.show();
                            Ext.getCmp('statusformLokasi').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteLokasi',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Hapus data terpilih ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridLokasi')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/Lokasi/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridLokasi.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridLokasi',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridLokasi, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridLokasi.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formLokasi = Ext.getCmp('formLokasi');
            wLokasi.show();
            formLokasi.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Lokasi/1/natadaya',
                params: {
                    extraparams: 'a.idLokasi:' + record.data.idLokasi
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformLokasi').setValue('edit');
        }
    }
});
