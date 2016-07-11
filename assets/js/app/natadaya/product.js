
var formProduct = Ext.create('Ext.form.Panel', {
    id: 'formProduct',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Product/natadaya',
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
            name: 'statusformProduct',
            id: 'statusformProduct'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'productid',
            name: 'productid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Produk',
            allowBlank: false,
            name: 'productcode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Produk',
            allowBlank: false,
            name: 'productname'
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            name:'price',
            id:'price_fProduct',
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
            id:'max_num_quota_product',
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
                var win = Ext.getCmp('windowPopupProduct');
                Ext.getCmp('formProduct').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnProductSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formProduct').getForm().reset();
                            Ext.getCmp('windowPopupProduct').hide();
                            storeGridProduct.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridProduct.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wProduct = Ext.create('widget.window', {
    id: 'windowPopupProduct',
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
    items: [formProduct]
});

Ext.define('GridProductModel', {
    extend: 'Ext.data.Model',
    fields: ['productid','productname','status','startdate','enddate','status','productcode','maxemployee','price','startdate','enddate','userin','datein','description'],
    idProperty: 'id'
});

var storeGridProduct = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProductModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Product/natadaya',
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
Ext.define('MY.searchGridProduct', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProduct',
    store: storeGridProduct,
    width: 180
});
var smGridProduct = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridProduct.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteProduct').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteProduct').enable();
        }
    }
});
Ext.define('GridProduct', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridProduct,
    title: 'Daftar Produk',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridProductID',
    id: 'GridProductID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProduct',
    store: storeGridProduct,
    loadMask: true,
    columns: [
        {header: 'productid', dataIndex: 'productid', hidden: true},
        {header: 'Kode Produk', dataIndex: 'productcode', minWidth: 150},
        {header: 'Nama Produk', dataIndex: 'productname', minWidth: 150},
        {header: 'Harga', dataIndex: 'price', xtype:'numbercolumn', align:'right',minWidth: 150},
        {header: 'Batas Jumlah Pegawai', dataIndex: 'maxemployee', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 150},
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
                    id:'addBtnProduk',
                    iconCls: 'add-icon',
                    handler: function() {
                        Ext.getCmp('formProduct').getForm().reset();

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 1
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wProduct.show();
                                    Ext.getCmp('statusformProduct').setValue('input');
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });
                       
                       Ext.getCmp('max_num_quota_product').setReadOnly(false);
                    }
                },
                {
                    text: 'Ubah',
                    id:'editBtnProduk',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 2
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                        var grid = Ext.ComponentQuery.query('GridProduct')[0];
                                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                        var data = grid.getSelectionModel().getSelection();
                                        if (data.length == 0)
                                        {
                                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                        } else {
                                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                            var formProduct = Ext.getCmp('formProduct');
                                            formProduct.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/Product/1/natadaya',
                                                params: {
                                                    extraparams: 'a.productid:' + selectedRecord.data.productid
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(action.response.responseText);
                                                    Ext.getCmp('price_fProduct').setValue(renderNomor(d.data.price));
                                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            })

                                            wProduct.show();
                                            Ext.getCmp('statusformProduct').setValue('edit');
                                        }
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        Ext.getCmp('max_num_quota_product').setReadOnly(true);

                    }
                }, {
                    id: 'delBtnProduk',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 3
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
                                                var grid = Ext.ComponentQuery.query('GridProduct')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Product/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridProduct.remove(sm.getSelection());
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
                    xtype: 'searchGridProduct',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridProduct, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridProduct.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formProduct = Ext.getCmp('formProduct');
            // wProduct.show();
            // formProduct.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/Product/1/natadaya',
            //     params: {
            //         extraparams: 'a.productid:' + record.data.productid
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformProduct').setValue('edit');
        }
    }
});
