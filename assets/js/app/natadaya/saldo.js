
var formSaldo = Ext.create('Ext.form.Panel', {
    id: 'formSaldo',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Saldo/natadaya',
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
            name: 'statusformSaldo',
            id: 'statusformSaldo'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'Saldoid',
            name: 'Saldoid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Produk',
            allowBlank: false,
            name: 'Saldocode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Produk',
            allowBlank: false,
            name: 'Saldoname'
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            name:'price',
            id:'price_fSaldo',
            fieldLabel: 'Harga',
            fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        // updateSelisih();
                    }, c);
                }
            }
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Maksimal Pegawai',
            allowBlank: false,
            name: 'maxemployee'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'description'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Akhir'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSaldo');
                Ext.getCmp('formSaldo').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnSaldoSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formSaldo').getForm().reset();
                            Ext.getCmp('windowPopupSaldo').hide();
                            storeGridSaldo.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSaldo.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wSaldo = Ext.create('widget.window', {
    id: 'windowPopupSaldo',
    title: 'Form Produk',
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
    items: [formSaldo]
});

Ext.define('GridSaldoModel', {
    extend: 'Ext.data.Model',
    fields: ['idsuperadmin','startdate','enddate','balance','holdbalance','companycode','companyname','productcode','productname'],
    idProperty: 'id'
});

var storeGridSaldo = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSaldoModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Saldo/natadaya',
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
Ext.define('MY.searchGridSaldo', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSaldo',
    store: storeGridSaldo,
    width: 180
});
var smGridSaldo = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSaldo.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSaldo').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSaldo').enable();
        }
    }
});
Ext.define('GridSaldo', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSaldo,
    title: 'Daftar Saldo',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSaldoID',
    id: 'GridSaldoID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSaldo',
    store: storeGridSaldo,
    loadMask: true,
    columns: [
        {header: 'Saldoid', dataIndex: 'Saldoid', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan Produk', dataIndex: 'companyname', minWidth: 150,flex:1},
        {header: 'Kode Produk', dataIndex: 'productcode', minWidth: 150},
        {header: 'Nama Produk', dataIndex: 'productname', minWidth: 150},
        {header: 'Sisa Saldo', dataIndex: 'balance', xtype:'numbercolumn', align:'right',minWidth: 150},
        {header: 'Saldo Terkunci', dataIndex: 'holdbalance', xtype:'numbercolumn', align:'right',minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                 {
//                     text: 'Tambah',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         wSaldo.show();
//                         Ext.getCmp('statusformSaldo').setValue('input');
//                     }
//                 },
//                 {
//                     text: 'Ubah',
//                     iconCls: 'edit-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridSaldo')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
//                         } else {
//                             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                             var formSaldo = Ext.getCmp('formSaldo');
//                             formSaldo.getForm().load({
//                                 url: SITE_URL + 'backend/loadFormData/Saldo/1/natadaya',
//                                 params: {
//                                     extraparams: 'a.Saldoid:' + selectedRecord.data.Saldoid
//                                 },
//                                 success: function(form, action) {
//                                     var d = Ext.decode(action.response.responseText);
//                                     Ext.getCmp('price_fSaldo').setValue(renderNomor(d.data.price));
//                                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 },
//                                 failure: function(form, action) {
//                                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 }
//                             })

//                             wSaldo.show();
//                             Ext.getCmp('statusformSaldo').setValue('edit');
//                         }

//                     }
//                 }, {
//                     id: 'btnDeleteSaldo',
//                     text: 'Hapus',
//                     iconCls: 'delete-icon',
//                     handler: function() {
//                         Ext.Msg.show({
//                             title: 'Confirm',
//                             msg: 'Delete Selected ?',
//                             buttons: Ext.Msg.YESNO,
//                             fn: function(btn) {
//                                 if (btn == 'yes') {
//                                     var grid = Ext.ComponentQuery.query('GridSaldo')[0];
//                                     var sm = grid.getSelectionModel();
//                                     selected = [];
//                                     Ext.each(sm.getSelection(), function(item) {
//                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                     });
//                                     Ext.Ajax.request({
//                                         url: SITE_URL + 'backend/ext_delete/Saldo/natadaya/hidden',
//                                         method: 'POST',
//                                         params: {postdata: Ext.encode(selected)}
//                                     });
//                                     storeGridSaldo.remove(sm.getSelection());
//                                     sm.select(0);
//                                 }
//                             }
//                         });
//                     },
// //                    disabled: true
//                 }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSaldo',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSaldo, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSaldo.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formSaldo = Ext.getCmp('formSaldo');
            // wSaldo.show();
            // formSaldo.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/Saldo/1/natadaya',
            //     params: {
            //         extraparams: 'a.Saldoid:' + record.data.Saldoid
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformSaldo').setValue('edit');
        }
    }
});
