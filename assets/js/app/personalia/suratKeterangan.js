Ext.define('GridSuratKeteranganModel', {
    extend: 'Ext.data.Model',
    fields: ['idsuratket','idpelamar','nosurat','jenissurat','masberlaku','tujuan','userin','datein'],
    idProperty: 'id'
});

var storeGridSuratKeterangan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSuratKeteranganModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SuratKeterangan/personalia',
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

var formSuratKeterangan = Ext.create('Ext.form.Panel', {
    id: 'formSuratKeterangan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/SuratKeterangan/personalia',
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
            name: 'statusformSuratKeterangan',
            id: 'statusformSuratKeterangan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idsuratket',
            name: 'idsuratket'
        },{
            xtype: 'hiddenfield',
            id: 'idpelamar_fSuratKeterangan',
            name: 'idpelamar'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'No Surat',
            allowBlank: false,
            name: 'nosurat'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Jenis surat',
            allowBlank: false,
            name: 'jenissurat'
        },
         {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'masberlaku',
            allowBlank: false,
            fieldLabel: 'Masa Berlaku Sampai'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Tujuan',
            allowBlank: false,
            name: 'tujuan'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSuratKeterangan');
                Ext.getCmp('formSuratKeterangan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnSuratKeteranganSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formSuratKeterangan').getForm().reset();
                            Ext.getCmp('windowPopupSuratKeterangan').hide();
                            storeGridSuratKeterangan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSuratKeterangan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wSuratKeterangan = Ext.create('widget.window', {
    id: 'windowPopupSuratKeterangan',
    title: 'Form Surat Keterangan',
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
    items: [formSuratKeterangan]
});


Ext.define('MY.searchGridSuratKeterangan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSuratKeterangan',
    store: storeGridSuratKeterangan,
    width: 180
});
var smGridSuratKeterangan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSuratKeterangan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSuratKeterangan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSuratKeterangan').enable();
        }
    }
});
Ext.define('GridSuratKeterangan', {
 width: 900,
    height:390,
    title: 'Surat Keterangan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSuratKeteranganID',
    id: 'GridSuratKeteranganID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSuratKeterangan',
    store: storeGridSuratKeterangan,
    loadMask: true,
    columns: [
        {header: 'idsuratket', dataIndex: 'idsuratket', hidden: true},
        {header: 'No surat', dataIndex: 'nosurat', minWidth: 150},
        {header: 'Jenis surat', dataIndex: 'jenissurat', minWidth: 150},
        {header: 'Masa berlaku', dataIndex: 'masberlaku', minWidth: 150},
        {header: 'tujuan', dataIndex: 'tujuan', minWidth: 150},
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
                                roleid: 93
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wSuratKeterangan.show();
                                    Ext.getCmp('statusformSuratKeterangan').setValue('input');
                                    Ext.getCmp('idpelamar_fSuratKeterangan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());                        
                                    jenjangSuratKeteranganStore.load();
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
                                roleid: 94
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridSuratKeterangan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formSuratKeterangan = Ext.getCmp('formSuratKeterangan');
                                        formSuratKeterangan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/SuratKeterangan/1/personalia',
                                            params: {
                                                extraparams: 'a.idsuratket:' + selectedRecord.data.idsuratket
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wSuratKeterangan.show();
                                        Ext.getCmp('statusformSuratKeterangan').setValue('edit');
                                        Ext.getCmp('idpelamar_fSuratKeterangan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                                        jenjangSuratKeteranganStore.load();
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
                    id: 'btnDeleteSuratKeterangan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 95
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.Msg.show({
                                        title: 'Konfirmasi',
                                        msg: 'Hapus data terpilih ?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                                var grid = Ext.ComponentQuery.query('GridSuratKeterangan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/SuratKeterangan/personalia/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridSuratKeterangan.remove(sm.getSelection());
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
                    xtype: 'searchGridSuratKeterangan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridSuratKeterangan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSuratKeterangan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
