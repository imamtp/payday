Ext.define('GridKeluargaModel', {
    extend: 'Ext.data.Model',
    fields: ['idkeluarga','idpelamar','tempatlahir','tgllahir','pekerjaan','userin','datein','namalengkap','sexname','namaagama','namajenjang','namahubkeluarga'],
    idProperty: 'id'
});

var storeGridKeluarga = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKeluargaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Keluarga/personalia',
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


var formKeluarga = Ext.create('Ext.form.Panel', {
    id: 'formKeluarga',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Keluarga/personalia',
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
            name: 'statusformKeluarga',
            id: 'statusformKeluarga'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkeluarga',
            name: 'idkeluarga'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idpelamar_fkeluarga',
            id: 'idpelamar_fkeluarga',
            name: 'idpelamar'
        },
        {
            xtype:'comboxhubkeluarga'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nama Anggota Keluarga',
            allowBlank: false,
            name: 'namalengkap'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tempat Lahir',
            allowBlank: false,
            name: 'tempatlahir'
        },
         {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tgllahir',
            allowBlank: false,
            fieldLabel: 'Tgl Lahir'
        },
        {
            xtype:'comboxsextype'
        },
        {
            xtype:'comboxagama'
        },
        {
            xtype:'comboxjenjangpendidikan'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pekerjaan',
            allowBlank: false,
            name: 'pekerjaan'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupKeluarga');
                Ext.getCmp('formKeluarga').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKeluargaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formKeluarga').getForm().reset();
                            Ext.getCmp('windowPopupKeluarga').hide();
                            storeGridKeluarga.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKeluarga.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKeluarga = Ext.create('widget.window', {
    id: 'windowPopupKeluarga',
    title: 'Form Keluarga',
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
    items: [formKeluarga]
});


Ext.define('MY.searchGridKeluarga', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKeluarga',
    store: storeGridKeluarga,
    width: 180
});
var smGridKeluarga = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKeluarga.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKeluarga').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKeluarga').enable();
        }
    }
});
Ext.define('GridKeluarga', {
  width: 900,
    height:390,
    title: 'Keluarga',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKeluargaID',
    id: 'GridKeluargaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKeluarga',
    store: storeGridKeluarga,
    loadMask: true,
    columns: [
        {header: 'idkeluarga', dataIndex: 'idkeluarga', hidden: true},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Hubkeluarga', dataIndex: 'namahubkeluarga', minWidth: 150},
        {header: 'Tempat lahir', dataIndex: 'tempatlahir', minWidth: 150},
        {header: 'Tgl lahir', dataIndex: 'tgllahir', minWidth: 150},
        {header: 'pekerjaan', dataIndex: 'pekerjaan', minWidth: 150},
        {header: 'Jns Kelamin', dataIndex: 'sexname', minWidth: 150},
        {header: 'Agama', dataIndex: 'namaagama', minWidth: 150},
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
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 82
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wKeluarga.show();
                                    Ext.getCmp('statusformKeluarga').setValue('input');
                                    Ext.getCmp('idpelamar_fkeluarga').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                                    hubkeluargaStore.load();
                                    agamaStore.load();
                                    sextypeStore.load();
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
                                roleid: 83
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridKeluarga')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formKeluarga = Ext.getCmp('formKeluarga');
                                        formKeluarga.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Keluarga/1/personalia',
                                            params: {
                                                extraparams: 'a.idkeluarga:' + selectedRecord.data.idkeluarga
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wKeluarga.show();
                                        Ext.getCmp('statusformKeluarga').setValue('edit');
                                        Ext.getCmp('idpelamar_fkeluarga').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                                        hubkeluargaStore.load();
                                        agamaStore.load();
                                        sextypeStore.load();
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
                    id: 'btnDeleteKeluarga',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 84
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
                                                var grid = Ext.ComponentQuery.query('GridKeluarga')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Keluarga/personalia/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridKeluarga.remove(sm.getSelection());
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
                    xtype: 'searchGridKeluarga',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridKeluarga, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKeluarga.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
