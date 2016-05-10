Ext.define('GridDepositModel', {
    extend: 'Ext.data.Model',
    fields: ['iddeposit','depositdate','noref','idsuperadmin','depositdate','amount','accname','bankname','accnumber','via','status','userin','datein','aggrementno','startdate','enddate','norek','productname','companyname','companycode'],
    idProperty: 'id'
});
var storeGridDeposit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDepositModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Deposit/natadaya',
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

var formDepositNatadaya = Ext.create('Ext.form.Panel', {
    id: 'formDepositNatadaya',
    width: 450,
    //    height: 300,
    url: SITE_URL + 'backend/saveform/Deposit/natadaya',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 190,
        anchor: '100%'
        //        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformDeposit',
        id: 'statusformDepositNatadaya'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'iddeposit',
        name: 'iddeposit'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idsuperadmin',
        id:'idsuperadmin_depositnatadaya',
        name: 'idsuperadmin'
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'idcompany',
        id:'idcompany_depositnatadaya',
        name: 'idcompany'
    },
     {
        xtype: 'textfield',
        fieldLabel: 'No Perjanjian',
        allowBlank: false,
        id: 'aggrementno_depositnatadaya',
        name: 'aggrementno',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    wGridAgreementListPopup.show();
                    // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                    //             operation.params={
                    //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
                    //                         'idaccounttype': '12,16,11'
                    //             };
                    //         });
                    storeGridAgreementList.load();
                });
            }
        }
    },{
        xtype: 'displayfield',
        fieldLabel: 'Kode Perusahaan',
        id: 'companycode_depositnatadaya',
        name: 'companycode'
    },{
        xtype: 'displayfield',
        fieldLabel: 'Nama Perusahaan',
        id: 'companyname_depositnatadaya',
        name: 'companyname'
    }, {
        xtype: 'displayfield',
        readOnly:true,
        fieldLabel: 'Kode Produk',
        // allowBlank: false,
        id: 'productcode_depositnatadaya',
        name: 'productcode'
    }, {
        xtype: 'displayfield',
        readOnly:true,
        fieldLabel: 'Nama Produk',
        // allowBlank: false,
        id:'productname_depositnatadaya',
        name: 'productname'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Jumlah Deposit',
        allowBlank: false,
        id:'amount_depositNatadaya',
        name: 'amount',
        fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                    }, c);
                }
            }
    },
    {
        xtype: 'textfield',
        fieldLabel: 'No Referensi',
        allowBlank: false,
        name: 'noref'
    },
    {
        xtype:'comboxrekNatadaya'
    },
    {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'depositdate',
            allowBlank: false,
            fieldLabel: 'Tanggal'
        },
    {
        xtype: 'textfield',
        fieldLabel: 'No Rekening Pengirim',
        allowBlank: false,
        name: 'accnumber'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nama Akun Bank Pengirim',
        allowBlank: false,
        name: 'accname'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nama Bank Pengirim',
        allowBlank: false,
        name: 'bankname'
    },
    {
        xtype: 'comboxTransferMethod'
    },
    {
        xtype: 'comboxstatusDeposit',
        id:'comboxstatusDeposit_fDeposit'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupDeposit');
            Ext.getCmp('formDepositNatadaya').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnDepositSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formDepositNatadaya').getForm().reset();
                        Ext.getCmp('windowPopupDeposit').hide();
                        storeGridDeposit.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridDeposit.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wDeposit = Ext.create('widget.window', {
    id: 'windowPopupDeposit',
    title: 'Form Deposit',
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
    items: [formDepositNatadaya]
});

Ext.define('MY.searchGridDeposit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDeposit',
    store: storeGridDeposit,
    width: 180
});
var smGridDeposit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDeposit.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteDeposit').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteDeposit').enable();
        }
    }
});
Ext.define('GridDeposit', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridDeposit,
    title: 'Deposit',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDepositID',
    id: 'GridDepositID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDeposit',
    store: storeGridDeposit,
    loadMask: true,
    columns: [{
        header: 'iddeposit',
        dataIndex: 'iddeposit',
        hidden: true
    },{
        header: 'Kode Perusahaan',
        dataIndex: 'companycode',
        minWidth: 150
    },{
        header: 'Nama Perusahaan',
        dataIndex: 'companyname',
        minWidth: 150
    }, {
        header: 'Tgl Deposit',
        dataIndex: 'depositdate',
        minWidth: 150
    },{
        header: 'No Referensi',
        dataIndex: 'noref',
        minWidth: 150
    },{
        header: 'Jumlah Deposit',
        xtype:'numbercolumn',
        align:'right',
        dataIndex: 'amount',
        minWidth: 150
    },{
        header: 'No Rek Tujuan',
        dataIndex: 'norek',
        minWidth: 150
    }, {
        header: 'No Perjanjian',
        dataIndex: 'aggrementno',
        minWidth: 150
    },{
        header: 'Nama Produk',
        dataIndex: 'productname',
        minWidth: 150
    },{
        header: 'via',
        dataIndex: 'via',
        minWidth: 150
    },{
        header: 'status',
        dataIndex: 'status',
        minWidth: 150
    }],
    dockedItems: [
    {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype:'comboxstatusDeposit',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGridDeposit.load({
                            params: {
                                'extraparams': 'a.status:'+this.value
                            }
                        });
                    }
                }
            }
        ]
    },
        {
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
                        roleid: 11
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if(d.success)
                        {
                            wDeposit.show();
                            Ext.getCmp('statusformDepositNatadaya').setValue('input');
                            Ext.getCmp('BtnDepositSimpan').setDisabled(false);
                            rekNatadayaStore.load();
                            storeTransferMethod.load();
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
                                roleid: 12
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridDeposit')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0) {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formDepositNatadaya = Ext.getCmp('formDepositNatadaya');
                                        formDepositNatadaya.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Deposit/1/natadaya',
                                            params: {
                                                extraparams: 'a.iddeposit:' + selectedRecord.data.iddeposit
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                Ext.getCmp('amount_depositNatadaya').setValue(renderNomor(d.data.amount));
                                                if(d.data.status=='Receive')
                                                {
                                                    Ext.getCmp('BtnDepositSimpan').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('BtnDepositSimpan').setDisabled(false);
                                                }
                                                // console.log(d)
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })
                                        wDeposit.show();
                                        Ext.getCmp('statusformDepositNatadaya').setValue('edit');
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
            id: 'btnDeleteDeposit',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 13
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
                                                var grid = Ext.ComponentQuery.query('GridDeposit')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Deposit/natadaya/hidden',
                                                    method: 'POST',
                                                    params: {
                                                        postdata: Ext.encode(selected)
                                                    }
                                                });
                                                storeGridDeposit.remove(sm.getSelection());
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
            xtype: 'searchGridDeposit',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridDeposit, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridDeposit.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            // var formDepositNatadaya = Ext.getCmp('formDepositNatadaya');
            // wDeposit.show();
            // formDepositNatadaya.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/Deposit/1/natadaya',
            //     params: {
            //         extraparams: 'a.iddeposit:' + record.data.iddeposit
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })
            // Ext.getCmp('statusformDepositNatadaya').setValue('edit');
        }
    }
});