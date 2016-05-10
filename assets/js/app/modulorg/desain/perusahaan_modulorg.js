
var formPerusahaan_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formPerusahaan_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Perusahaan_ModulOrg/modulorg',
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
            name: 'statusformPerusahaan_ModulOrg',
            id: 'statusformPerusahaan_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Perusahaan',
            allowBlank: false,
            name: 'companycode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Budget Perusahaan',
            allowBlank: false,
            name: 'kodebudget'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Perusahaan',
            allowBlank: false,
            name: 'companyname'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Urutan',
            allowBlank: false,
            name: 'sort'
        },{
            xtype: 'textarea',
            fieldLabel: 'Alamat',
            // allowBlank: false,
            name: 'companyaddress'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Aktivasi'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Terminasi'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPerusahaan_ModulOrg');
                Ext.getCmp('formPerusahaan_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPerusahaan_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPerusahaan_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupPerusahaan_ModulOrg').hide();
                            storeGridPerusahaan_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPerusahaan_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPerusahaan_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupPerusahaan_ModulOrg',
    title: 'Form Perusahaan',
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
    items: [formPerusahaan_ModulOrg]
});

Ext.define('GridPerusahaan_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','kodebudget','sort','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridPerusahaan_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPerusahaan_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Perusahaan_ModulOrg/modulorg',
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
Ext.define('MY.searchGridPerusahaan_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPerusahaan_ModulOrg',
    store: storeGridPerusahaan_ModulOrg,
    width: 180
});
var smGridPerusahaan_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPerusahaan_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePerusahaan_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePerusahaan_ModulOrg').enable();
        }
    }
});
Ext.define('GridPerusahaan_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPerusahaan_ModulOrg,
    title: 'Daftar Perusahaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPerusahaan_ModulOrgID',
    id: 'GridPerusahaan_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPerusahaan_ModulOrg',
    store: storeGridPerusahaan_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idcompany', dataIndex: 'idcompany', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Kode Budget Perusahaan', dataIndex: 'kodebudget', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 200,flex:1},
        {header: 'Tgl Aktivasi', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Terminasi', dataIndex: 'enddate', minWidth: 150},
        {header: 'Urutan', dataIndex: 'sort', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150}
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
                        wPerusahaan_ModulOrg.show();
                        Ext.getCmp('statusformPerusahaan_ModulOrg').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridPerusahaan_ModulOrg')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formPerusahaan_ModulOrg = Ext.getCmp('formPerusahaan_ModulOrg');
                            formPerusahaan_ModulOrg.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Perusahaan_ModulOrg/1/modulorg',
                                params: {
                                    extraparams: 'a.idcompany:' + selectedRecord.data.idcompany
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wPerusahaan_ModulOrg.show();
                            Ext.getCmp('statusformPerusahaan_ModulOrg').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeletePerusahaan_ModulOrg',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridPerusahaan_ModulOrg')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/Perusahaan_ModulOrg/modulorg/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if(!d.success)
                                            {
                                                Ext.Msg.alert('Info', d.message);
                                            } else {
                                                storeGridPerusahaan_ModulOrg.load();
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                                        }
                                    });
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPerusahaan_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPerusahaan_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPerusahaan_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPerusahaan_ModulOrg = Ext.getCmp('formPerusahaan_ModulOrg');
            wPerusahaan_ModulOrg.show();
            formPerusahaan_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Perusahaan_ModulOrg/1/modulorg',
                params: {
                    extraparams: 'a.idcompany:' + record.data.idcompany
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformPerusahaan_ModulOrg').setValue('edit');
        }
    }
});
