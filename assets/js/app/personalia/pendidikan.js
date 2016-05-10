Ext.define('GridPendidikanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpendidikan','idpelamar','fakultas','jurusan','tahunmulai','tahunselesai','namainstansi','userin','datein','namajenjang'],
    idProperty: 'id'
});

var storeGridPendidikan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPendidikanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Pendidikan/personalia',
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

var formPendidikan = Ext.create('Ext.form.Panel', {
    id: 'formPendidikan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Pendidikan/personalia',
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
            name: 'statusformPendidikan',
            id: 'statusformPendidikan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpendidikan',
            name: 'idpendidikan'
        },{
            xtype: 'hiddenfield',
            id: 'idpelamar_fPendidikan',
            name: 'idpelamar'
        },
        {
            xtype:'comboxjenjangpendidikan'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Nama Instansi',
            allowBlank: false,
            name: 'namainstansi'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Fakultas',
            allowBlank: false,
            name: 'fakultas'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Jurusan',
            allowBlank: false,
            name: 'jurusan'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Tahun mulai',
            allowBlank: false,
            name: 'tahunmulai'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Tahun selesai',
            allowBlank: false,
            name: 'tahunselesai'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPendidikan');
                Ext.getCmp('formPendidikan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPendidikanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPendidikan').getForm().reset();
                            Ext.getCmp('windowPopupPendidikan').hide();
                            storeGridPendidikan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPendidikan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPendidikan = Ext.create('widget.window', {
    id: 'windowPopupPendidikan',
    title: 'Form Pendidikan',
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
    items: [formPendidikan]
});


Ext.define('MY.searchGridPendidikan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPendidikan',
    store: storeGridPendidikan,
    width: 180
});
var smGridPendidikan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPendidikan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePendidikan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePendidikan').enable();
        }
    }
});
Ext.define('GridPendidikan', {
 width: 900,
    height:390,
    title: 'Pendidikan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPendidikanID',
    id: 'GridPendidikanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPendidikan',
    store: storeGridPendidikan,
    loadMask: true,
    columns: [
        {header: 'idpendidikan', dataIndex: 'idpendidikan', hidden: true},
        {header: 'Nama instansi', dataIndex: 'namainstansi', minWidth: 150},
        {header: 'Nama jenjang', dataIndex: 'namajenjang', minWidth: 150},
        {header: 'Fakultas', dataIndex: 'fakultas', minWidth: 150},
        {header: 'Jurusan', dataIndex: 'jurusan', minWidth: 150},
        {header: 'Tahun mulai', dataIndex: 'tahunmulai', minWidth: 150},
        {header: 'Tahun selesai', dataIndex: 'tahunselesai', minWidth: 150},
        {header: 'User in', dataIndex: 'userin', minWidth: 150},
        {header: 'Date in', dataIndex: 'datein', minWidth: 150}
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
                                roleid: 85
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPendidikan.show();
                                    Ext.getCmp('statusformPendidikan').setValue('input');
                                    Ext.getCmp('idpelamar_fPendidikan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());                        
                                    jenjangpendidikanStore.load();
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
                                roleid: 86
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPendidikan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPendidikan = Ext.getCmp('formPendidikan');
                                        formPendidikan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Pendidikan/1/personalia',
                                            params: {
                                                extraparams: 'a.idpendidikan:' + selectedRecord.data.idpendidikan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPendidikan.show();
                                        Ext.getCmp('statusformPendidikan').setValue('edit');
                                        Ext.getCmp('idpelamar_fPendidikan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                                        jenjangpendidikanStore.load();
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
                    id: 'btnDeletePendidikan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 87
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
                                                var grid = Ext.ComponentQuery.query('GridPendidikan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Pendidikan/personalia/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPendidikan.remove(sm.getSelection());
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
                    xtype: 'searchGridPendidikan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPendidikan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPendidikan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
