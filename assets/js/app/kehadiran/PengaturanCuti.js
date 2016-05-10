
var formPengaturanCuti = Ext.create('Ext.form.Panel', {
    id: 'formPengaturanCuti',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/PengaturanCuti/kehadiran',
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
            name: 'statusformPengaturanCuti',
            id: 'statusformPengaturanCuti'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpengaturancuti',
            name: 'idpengaturancuti'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Pengaturan Cuti',
            allowBlank: false,
            name: 'kodepengcuti'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Pengaturan Cuti',
            allowBlank: false,
            name: 'namapengcuti'
        },
         {
            xtype: 'numberfield',
            fieldLabel: 'Jumlah Cuti',
            minValue:1,
            allowBlank: false,
            name: 'jumlahcuti'
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Diberikan setelah',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
                // flex: 1,
                hideLabel: true
            },
            items: [{
                        xtype: 'numberfield',
                        minValue:1,
                        width:80,
                        fieldLabel: 'Diberikan setelah',
                        allowBlank: false,
                        name: 'bulanbericuti'
                    },{
                       xtype: 'displayfield',
                       margin: '0 0 0 5',
                       value: 'Bulan'
                   }
            ]
        },
        // {
        //     xtype: 'fieldcontainer',
        //     fieldLabel: 'Penambahan Cuti per',
        //     combineErrors: true,
        //     msgTarget : 'side',
        //     layout: 'hbox',
        //     defaults: {
        //         // flex: 1,
        //         hideLabel: true
        //     },
        //     items: [{
        //                 xtype: 'numberfield',
        //                 minValue:1,
        //                 width:80,
        //                 allowBlank: false,
        //                 name: 'bulantambahcuti'
        //             },{
        //                xtype: 'displayfield',
        //                margin: '0 5 0 5',
        //                value: 'Bulan'
        //            },
        //            {
        //                 xtype: 'textfield',
        //                 width:80,
        //                 allowBlank: false,
        //                 name: 'haritambahcuti'
        //             },{
        //                xtype: 'displayfield',
        //                margin: '0 0 0 5',
        //                value: 'Hari'
        //            }
        //     ]
        // },
        // {
        //     xtype: 'fieldcontainer',
        //     fieldLabel: 'Pengurangan Sisa Cuti',
        //     combineErrors: true,
        //     msgTarget : 'side',
        //     layout: 'hbox',
        //     defaults: {
        //         // flex: 1,
        //         hideLabel: true
        //     },
        //     items: [{
        //                 xtype: 'comboxJenPengurangCuti',
        //                 width:120,
        //                 margin: '0 5 0 0',
        //                 allowBlank: false
        //             },
        //             {
        //                 xtype: 'numberfield',
        //                 minValue:1,
        //                 width:80,
        //                 allowBlank: false,
        //                 name: 'jumpengurangcuti'
        //             },{
        //                xtype: 'displayfield',
        //                margin: '0 0 0 5',
        //                value: 'Hari'
        //            }
        //     ]
        // },
        // {
        //     xtype:'comboxYaTidak',
        //     fieldLabel: 'Hitung Sisa Cuti',
        //     name:'hitungsisacuti'
        // }
        ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPengaturanCuti');
                Ext.getCmp('formPengaturanCuti').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPengaturanCutiSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPengaturanCuti').getForm().reset();
                            Ext.getCmp('windowPopupPengaturanCuti').hide();
                            storeGridPengaturanCuti.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPengaturanCuti.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPengaturanCuti = Ext.create('widget.window', {
    id: 'windowPopupPengaturanCuti',
    title: 'Form Pengaturan Cuti',
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
    items: [formPengaturanCuti]
});

Ext.define('GridPengaturanCutiModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengaturancuti','kodepengcuti','namapengcuti','jumlahcuti','bulanbericuti','bulantambahcuti','haritambahcuti','jenpengurangcuti','jumpengurangcuti','hitungsisacuti','idcompany','userin','usermod','companyname','companycode','companyname'],
    idProperty: 'id'
});

var storeGridPengaturanCuti = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPengaturanCutiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PengaturanCuti/kehadiran',
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
Ext.define('MY.searchGridPengaturanCuti', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPengaturanCuti',
    store: storeGridPengaturanCuti,
    width: 180
});
var smGridPengaturanCuti = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPengaturanCuti.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePengaturanCuti').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePengaturanCuti').enable();
        }
    }
});
Ext.define('GridPengaturanCuti', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPengaturanCuti,
    title: 'Pengaturan Cuti',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPengaturanCutiID',
    id: 'GridPengaturanCutiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPengaturanCuti',
    store: storeGridPengaturanCuti,
    loadMask: true,
    columns: [
        {header: 'idpengaturancuti', dataIndex: 'idpengaturancuti', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Pengaturan', dataIndex: 'kodepengcuti', minWidth: 150},
        {header: 'Nama Pengaturan', dataIndex: 'namapengcuti', minWidth: 150},
        {header: 'Kuota Cuti', dataIndex: 'jumlahcuti',align:'right', minWidth: 150},
        {header: 'Bulan Pemberian Cuti', dataIndex: 'bulanbericuti',align:'right', minWidth: 150},
        // {header: 'Jenis Pengurang Cuti', dataIndex: 'jenpengurangcuti', minWidth: 150},
        // {header: 'Jumlah Pengurang Cuti', dataIndex: 'jumpengurangcuti', minWidth: 180},
        // {header: 'Hitung Sisa Cuti', dataIndex: 'hitungsisacuti', minWidth: 150}
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
                                roleid: 120
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPengaturanCuti.show();
                                    Ext.getCmp('statusformPengaturanCuti').setValue('input');
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
                                roleid: 121
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPengaturanCuti')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPengaturanCuti = Ext.getCmp('formPengaturanCuti');
                                        formPengaturanCuti.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/PengaturanCuti/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idpengaturancuti:' + selectedRecord.data.idpengaturancuti
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                // Ext.getCmp('price_fPengaturanCuti').setValue(renderNomor(d.data.price));
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPengaturanCuti.show();
                                        Ext.getCmp('statusformPengaturanCuti').setValue('edit');
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
                    id: 'btnDeletePengaturanCuti',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 122
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
                                                var grid = Ext.ComponentQuery.query('GridPengaturanCuti')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/PengaturanCuti/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPengaturanCuti.remove(sm.getSelection());
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
                    xtype: 'searchGridPengaturanCuti',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPengaturanCuti, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPengaturanCuti.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formPengaturanCuti = Ext.getCmp('formPengaturanCuti');
            // wPengaturanCuti.show();
            // formPengaturanCuti.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PengaturanCuti/1/natadaya',
            //     params: {
            //         extraparams: 'a.PengaturanCutiid:' + record.data.PengaturanCutiid
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPengaturanCuti').setValue('edit');
        }
    }
});
