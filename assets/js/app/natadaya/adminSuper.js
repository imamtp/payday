Ext.define('GridAdminSuperModel', {
    extend: 'Ext.data.Model',
    fields: ['idsuperadmin','idcompany', 'productid', 'aggrementno', 'user_id','startdateakun', 'enddateakun', 'startdate', 'enddate', 'statusproduk', 'productname', 'productcode', 'usercode', 'realname', 'companyname', 'companycode','totalkaryawan','balance'],
    idProperty: 'id'
});
var storeGridAdminSuper = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAdminSuperModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/AdminSuper/natadaya',
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

/////////////////////////////////////////////////////////////////////////////////
var formAdminSuper = Ext.create('Ext.form.Panel', {
    id: 'formAdminSuper',
    // title:'Data Pribadi',
    url: SITE_URL + 'natadaya/saveAdminSuper',
    bodyStyle: 'padding:5px',
    autoWidth: true,
    autoHeight: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 160,
        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
        items: [{
            xtype: 'fieldset',
            title: 'Data Akun',
            // collapsible: true,
            items: [{
                xtype: 'hiddenfield',
                name: 'statusformAdminSuper',
                id: 'statusformAdminSuper'
            },{
                xtype: 'hiddenfield',
                fieldLabel: 'idsuperadmin',
                name: 'idsuperadmin'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'idcompany',
                name: 'idcompany'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'productid',
                id: 'productid_adminsuper',
                name: 'productid'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: 'user_id',
                name: 'user_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kode User',
                maxLength:30,
                allowBlank: false,
                id: 'usercode_adminsuper',
                name: 'usercode'
            }, {
                xtype: 'textfield',
                maxLength:30,
                fieldLabel: 'Nama Lengkap',
                allowBlank: false,
                name: 'realname'
            }, {
                xtype: 'textfield',
                maxLength:20,
                fieldLabel: 'Username Natadaya',
                allowBlank: false,
                name: 'username'
            }, {
                xtype: 'textfield',
                maxLength:223,
                inputType: 'password',
                fieldLabel: 'Password Natadaya',
                allowBlank: false,
                name: 'password'
            }, {
                xtype: 'textfield',
                vtype:'email',
                maxLength:50,
                fieldLabel: 'Email',
                allowBlank: false,
                name: 'email'
            },
            {
                xtype: 'datefield',
                format: 'd-m-Y',
                name: 'startdateakun',
                allowBlank: false,
                fieldLabel: 'Tgl Aktivasi'
            }, {
                xtype: 'datefield',
                format: 'd-m-Y',
                allowBlank: false,
                name: 'enddateakun',
                fieldLabel: 'Tgl Terminasi'
            }]
        },{
            xtype: 'fieldset',
            title: 'Data Perusahaan Induk',
            // collapsible: true,
            items: [{
                xtype: 'textfield',
                maxLength:30,
                fieldLabel: 'Kode Perusahaan',
                allowBlank: false,
                id: 'companycode_adminsuper',
                name: 'companycode'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Perusahaan',
                allowBlank: false,
                name: 'companyname'
            }, {
                xtype: 'textfield',
                maxLength:200,
                fieldLabel: 'Alamat Perusahaan',
                allowBlank: false,
                name: 'companyaddress'
            }, {
                xtype: 'textfield',
                maxLength:200,
                fieldLabel: 'No telp',
                name: 'telp'
            }, {
                xtype: 'textfield',
                maxLength:200,
                fieldLabel: 'No fax',
                name: 'fax'
            }]
        }]
    }, {
        items: [
        {
            xtype: 'fieldset',
            title: 'Data Produk',
            // collapsible: true,
            items: [{
                xtype: 'textfield',
                maxLength:50,
                fieldLabel: 'No Perjanjian',
                allowBlank: false,
                id: 'aggrementno_adminsuper',
                name: 'aggrementno'
            }, {
                xtype: 'textfield',
                // readOnly:true,
                fieldLabel: 'Kode Produk',
                allowBlank: false,
                id: 'productcode_adminsuper',
                name: 'productcode',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {

                            if(Ext.getCmp('statusformAdminSuper').getValue()!='edit')
                            {
                                    wGridProductListPopup.show();
                                // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                //             operation.params={
                                //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                                //                         'idaccounttype': '12,16,11'
                                //             };
                                //         });
                                storeGridProductList.load();
                            }
                        });
                    }
                }
            }, {
                xtype: 'displayfield',
                readOnly:true,
                fieldLabel: 'Nama Produk',
                // allowBlank: false,
                id: 'productname_adminsuper',
                name: 'productname'
            }, {
                xtype: 'datefield',
                format: 'd-m-Y',
                name: 'startdate',
                // allowBlank: false,
                fieldLabel: 'Tgl Aktivasi'
            }, {
                xtype: 'datefield',
                format: 'd-m-Y',
                // allowBlank: false,
                name: 'enddate',
                fieldLabel: 'Tgl Terminasi'
            },{
                xtype: 'comboxstatusAkun',
                name:'statusproduk',
                allowBlank: false,
            } ]
        },
        {
            xtype: 'fieldset',
            title: 'Data Deposit',
            // collapsible: true,
            items: [    {
                xtype: 'displayfield',
                fieldStyle: 'text-align: right;',
                id: 'balancedeposit_fAdminSuper',
                fieldLabel: 'Sisa Deposit'
            },
            {
                xtype: 'displayfield',
                fieldStyle: 'text-align: right;',
                id: 'lastdatedeposit_fAdminSuper',
                fieldLabel: 'Tanggal Terakhir Deposit'
            },{
                xtype: 'displayfield',
                fieldStyle: 'text-align: right;',
                id: 'lastamountdeposit_fAdminSuper',
                fieldLabel: 'Jumlah Deposit Terakhir'
            }]
        }

        ]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupAdminSuper');
            Ext.getCmp('formAdminSuper').getForm().reset();
            win.hide();
        }
    }, {
        // id: 'BtnemployeeGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formAdminSuper').getForm().reset();
                        Ext.getCmp('windowPopupAdminSuper').hide();
                        storeGridAdminSuper.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridemployeeGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
// var formAdminSuper = Ext.create('Ext.form.Panel', {
//     id: 'formAdminSuper',
//     width: 750,
//     //    height: 300,
//     url: SITE_URL + 'backend/saveform/AdminSuper/natadaya',
//     bodyStyle: 'padding:5px',
//     labelAlign: 'top',
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         labelWidth: 160,
//         anchor: '100%'
//         //        width: 400
//     },
//     items: [{
//         xtype: 'container',
//         layout: 'hbox',
//         items: [{
//             xtype: 'container',
//             flex:1,
//             border: false,
//             layout: 'anchor',
//             defaultType: 'textfield',
//             items: [{
//                 xtype: 'fieldset',
//                 title: 'Data Profil',
//                 items: [{
//                     xtype: 'hiddenfield',
//                     name: 'statusformAdminSuper',
//                     id: 'statusformAdminSuper'
//                 }, {
//                     xtype: 'hiddenfield',
//                     fieldLabel: 'idcompany',
//                     name: 'idcompany'
//                 }, {
//                     xtype: 'hiddenfield',
//                     fieldLabel: 'productid',
//                     name: 'productid'
//                 }, {
//                     xtype: 'hiddenfield',
//                     fieldLabel: 'user_id',
//                     name: 'user_id'
//                 },{
//                     xtype: 'textfield',
//                     fieldLabel: 'Kode User',
//                     allowBlank: false,
//                     name: 'usercode'
//                 }, {
//                     xtype: 'textfield',
//                     fieldLabel: 'Nama User',
//                     allowBlank: false,
//                     name: 'realname'
//                 }, {
//                     xtype: 'datefield',
//                     format: 'd-m-Y',
//                     name: 'startdate',
//                     allowBlank: false,
//                     fieldLabel: 'Tgl Aktivasi'
//                 }, {
//                     xtype: 'datefield',
//                     format: 'd-m-Y',
//                     allowBlank: false,
//                     name: 'enddate',
//                     fieldLabel: 'Tgl Terminasi'
//                 }, {
//                     xtype: 'comboxstatus'
//                 }]
//             },
//             {
//                         xtype: 'fieldset',
//                         title: 'Data Akun',
//                         items: [{
//                                     xtype: 'textfield',
//                                     fieldLabel: 'Kode Perusahaan',
//                                     allowBlank: false,
//                                     name: 'companycode'
//                                 }, {
//                                     xtype: 'textfield',
//                                     fieldLabel: 'Nama Perusahaan',
//                                     allowBlank: false,
//                                     name: 'companyname'
//                                 }, {
//                                     xtype: 'textfield',
//                                     fieldLabel: 'No Perjanjian',
//                                     allowBlank: false,
//                                     name: 'aggrementno'
//                                 }, {
//                                     xtype: 'textfield',
//                                     // readOnly:true,
//                                     fieldLabel: 'Kode Produk',
//                                     allowBlank: false,
//                                     name: 'productcode'
//                                 }, {
//                                     xtype: 'textfield',
//                                     // readOnly:true,
//                                     fieldLabel: 'Nama Produk',
//                                     allowBlank: false,
//                                     name: 'productname'
//                                 }]
//             }
//             ]
//         }]
//     }],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             var win = Ext.getCmp('windowPopupAdminSuper');
//             Ext.getCmp('formAdminSuper').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnAdminSuperSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form = this.up('form').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formAdminSuper').getForm().reset();
//                         Ext.getCmp('windowPopupAdminSuper').hide();
//                         storeGridAdminSuper.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridAdminSuper.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });
var wAdminSuper = Ext.create('widget.window', {
    id: 'windowPopupAdminSuper',
    title: 'Form Super Admin',
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
    items: [formAdminSuper]
});

Ext.define('MY.searchGridAdminSuper', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAdminSuper',
    store: storeGridAdminSuper,
    width: 180
});
var smGridAdminSuper = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridAdminSuper.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAdminSuper').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteAdminSuper').enable();
        }
    }
});
Ext.define('GridAdminSuper', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridAdminSuper,
    title: 'Daftar Super Admin',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridAdminSuperID',
    id: 'GridAdminSuperID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAdminSuper',
    store: storeGridAdminSuper,
    loadMask: true,
    columns: [
    {
        header: 'idsuperadmin',
        dataIndex: 'idsuperadmin',
        hidden: true
    },{
        header: 'balance',
        dataIndex: 'balance',
        hidden: true
    },{
        header: 'idcompany',
        dataIndex: 'idcompany',
        hidden: true
    }, {
        header: 'productid',
        dataIndex: 'productid',
        hidden: true
    }, {
        header: 'user_id',
        dataIndex: 'user_id',
        hidden: true
    }, {
        header: 'Kode User',
        dataIndex: 'usercode',
        minWidth: 150
    }, {
        header: 'Nama',
        dataIndex: 'realname',
        minWidth: 150
    }, {
        header: 'Kode Perusahaan',
        dataIndex: 'companycode',
        minWidth: 150
    }, {
        header: 'Nama Perusahaan',
        dataIndex: 'companyname',
        minWidth: 150
    }, {
        header: 'Total Karyawan',
        align:'right',
        dataIndex: 'totalkaryawan',
        minWidth: 110
    }, {
        header: 'Nama Produk',
        dataIndex: 'productname',
        minWidth: 150
    }, {
        header: 'No Perjanjian',
        dataIndex: 'aggrementno',
        minWidth: 150
    }, {
        header: 'Tgl Mulai Aktivasi',
        dataIndex: 'startdate',
        minWidth: 150
    }, {
        header: 'Tgl Akhir Aktivasi',
        dataIndex: 'enddate',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'statusproduk',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                    Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 7
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wAdminSuper.show();
                                    Ext.getCmp('statusformAdminSuper').setValue('input');
                                    Ext.getCmp('formAdminSuper').getForm().reset();

                                    Ext.getCmp('productcode_adminsuper').setReadOnly(false);
                                    Ext.getCmp('usercode_adminsuper').setReadOnly(false);
                                    Ext.getCmp('companycode_adminsuper').setReadOnly(false);
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
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 8
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                        kotakLoading();
                                        var grid = Ext.ComponentQuery.query('GridAdminSuper')[0];
                                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                        var data = grid.getSelectionModel().getSelection();
                                        if (data.length == 0) {
                                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                        } else {
                                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                            var formAdminSuper = Ext.getCmp('formAdminSuper');
                                            formAdminSuper.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/AdminSuper/1/natadaya',
                                                params: {
                                                    extraparams: 'a.idsuperadmin:' + selectedRecord.data.idsuperadmin
                                                },
                                                success: function(form, action) {
                                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            })
                                            wAdminSuper.show();
                                            Ext.getCmp('statusformAdminSuper').setValue('edit');

                                            Ext.getCmp('productcode_adminsuper').setReadOnly(true);
                                            Ext.getCmp('usercode_adminsuper').setReadOnly(true);
                                            Ext.getCmp('companycode_adminsuper').setReadOnly(true);

                                            Ext.Ajax.request({
                                                url: SITE_URL + 'deposit/getSummaryDeposit',
                                                method: 'GET',
                                                params: {
                                                    aggrementno: selectedRecord.data.aggrementno
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);

                                                    // Ext.getCmp('monthBeforeBtn').setDisabled(true);
                                                    Ext.getCmp('balancedeposit_fAdminSuper').setValue(d.balance);
                                                    Ext.getCmp('lastdatedeposit_fAdminSuper').setValue(d.depositdate);
                                                    Ext.getCmp('lastamountdeposit_fAdminSuper').setValue(d.lastdeposit);
                                                    // Ext.getCmp('productname_deposit').setValue(d.productname);
                                                    // Ext.getCmp('productcode_deposit').setValue(d.productcode);
                                                    // Ext.getCmp('startdate_deposit').setValue(d.startdate);
                                                    Ext.Msg.hide();
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                }
                                            });
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
        },{
            text: 'Ubah Produk',
            iconCls: 'edit-icon',
            handler: function() {
                Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 9
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridAdminSuper')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0) {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        wGantiProduk.show();
                                        Ext.getCmp('statusformGantiProduk').setValue('input');
                                        Ext.getCmp('idproduct_GantiProduk').setValue(selectedRecord.data.productid);
                                        Ext.getCmp('aggrementno_GantiProduk').setValue(selectedRecord.data.aggrementno);
                                        Ext.getCmp('productcode_GantiProduk').setValue(selectedRecord.data.productcode);
                                        Ext.getCmp('productname_GantiProduk').setValue(selectedRecord.data.productname);
                                        Ext.getCmp('balance_GantiProduk').setValue(selectedRecord.data.balance);
                                        Ext.getCmp('totalkaryawan_GantiProduk').setValue(selectedRecord.data.totalkaryawan);                                        
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
            id: 'btnDeleteAdminSuper',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 10
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
                                                var grid = Ext.ComponentQuery.query('GridAdminSuper')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/AdminSuper/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {
                                                        postdata: Ext.encode(selected)
                                                    }
                                                });
                                                storeGridAdminSuper.remove(sm.getSelection());
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
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridAdminSuper',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
        store: storeGridAdminSuper, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAdminSuper.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            // var formAdminSuper = Ext.getCmp('formAdminSuper');
            // wAdminSuper.show();
            // formAdminSuper.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/AdminSuper/1/natadaya',
            //     params: {
            //         extraparams: 'a.idsuperadmin:' + record.data.idsuperadmin
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })
            // Ext.getCmp('statusformAdminSuper').setValue('edit');
        }
    }
});