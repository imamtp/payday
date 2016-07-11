Ext.define('GridPelatihanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelatihan','idpelamar','namapelatihan','jenispelatihan','tglpelatihan','nosertifikat','jenissertifikat','userin','datein'],
    idProperty: 'id'
});

var storeGridPelatihan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPelatihanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Pelatihan/personalia',
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

var formPelatihan = Ext.create('Ext.form.Panel', {
    id: 'formPelatihan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Pelatihan/personalia',
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
            name: 'statusformPelatihan',
            id: 'statusformPelatihan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpelatihan',
            name: 'idpelatihan'
        },{
            xtype: 'hiddenfield',
            id: 'idpelamar_fPelatihan',
            name: 'idpelamar'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Nama pelatihan',
            allowBlank: false,
            name: 'namapelatihan'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Jenis pelatihan',
            // allowBlank: false,
            name: 'jenispelatihan'
        },
         {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tglpelatihan',
            // allowBlank: false,
            fieldLabel: 'Tgl pelatihan'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'No sertifikat',
            // allowBlank: false,
            name: 'nosertifikat'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Jenis sertifikat',
            // allowBlank: false,
            name: 'jenissertifikat'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPelatihan');
                Ext.getCmp('formPelatihan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPelatihanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPelatihan').getForm().reset();
                            Ext.getCmp('windowPopupPelatihan').hide();
                            storeGridPelatihan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPelatihan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPelatihan = Ext.create('widget.window', {
    id: 'windowPopupPelatihan',
    title: 'Form Pelatihan',
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
    items: [formPelatihan]
});


Ext.define('MY.searchGridPelatihan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPelatihan',
    store: storeGridPelatihan,
    width: 180
});
var smGridPelatihan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPelatihan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePelatihan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePelatihan').enable();
        }
    }
});
Ext.define('GridPelatihan', {
 width: 900,
    height:390,
    title: 'Pelatihan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPelatihanID',
    id: 'GridPelatihanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPelatihan',
    store: storeGridPelatihan,
    loadMask: true,
    columns: [
        {header: 'idpelatihan', dataIndex: 'idpelatihan', hidden: true},
        {header: 'nama pelatihan', dataIndex: 'namapelatihan', minWidth: 150},
        {header: 'jenis pelatihan', dataIndex: 'jenispelatihan', minWidth: 150},
        {header: 'tgl pelatihan', dataIndex: 'tglpelatihan', minWidth: 150},
        {header: 'no sertifikat', dataIndex: 'nosertifikat', minWidth: 150},
        {header: 'jenis sertifikat', dataIndex: 'jenissertifikat', minWidth: 150},
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
                                roleid: 88
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPelatihan.show();
                                    Ext.getCmp('statusformPelatihan').setValue('input');
                                    Ext.getCmp('idpelamar_fPelatihan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());                        
                                    storeGridPelatihan.load();
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
                                roleid: 89
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPelatihan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPelatihan = Ext.getCmp('formPelatihan');
                                        formPelatihan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Pelatihan/1/personalia',
                                            params: {
                                                extraparams: 'a.idpelatihan:' + selectedRecord.data.idpelatihan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPelatihan.show();
                                        Ext.getCmp('statusformPelatihan').setValue('edit');
                                        Ext.getCmp('idpelamar_fPelatihan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                                        jenjangPelatihanStore.load();
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
                    id: 'btnDeletePelatihan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 90
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
                                                var grid = Ext.ComponentQuery.query('GridPelatihan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Pelatihan/personalia/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPelatihan.remove(sm.getSelection());
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
                    xtype: 'searchGridPelatihan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPelatihan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPelatihan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
