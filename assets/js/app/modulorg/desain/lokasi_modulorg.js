
var formLokasi_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formLokasi_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/LokasiOrg/modulorg',
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
            name: 'statusformLokasiOrg',
            id: 'statusformLokasi_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idlokasiorg',
            name: 'idlokasiorg'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Budget Lokasi',
            allowBlank: false,
            name: 'kodebudgelokasi'
        },{
            xtype:'comboxtingkatlokasi'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Lokasi',
            allowBlank: false,
            name: 'namalokasi'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'description'
        },{
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
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupLokasi_ModulOrg');
                Ext.getCmp('formLokasi_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnLokasi_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formLokasi_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupLokasi_ModulOrg').hide();
                            storeGridLokasi_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridLokasi_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wLokasi_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupLokasi_ModulOrg',
    title: 'Form Lokasi Organisasi',
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
    items: [formLokasi_ModulOrg]
});

Ext.define('GridLokasi_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idlokasiorg','kodebudgelokasi','companycode','namalokasi','idcompany','idtingkatlokasi','startdate','enddate','description','status','userin','datein','tingkatlokasi','companyname'],
    idProperty: 'id'
});

var storeGridLokasi_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridLokasi_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/LokasiOrg/modulorg',
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
Ext.define('MY.searchGridLokasi_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridLokasi_ModulOrg',
    store: storeGridLokasi_ModulOrg,
    width: 180
});
var smGridLokasi_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridLokasi_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteLokasi_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteLokasi_ModulOrg').enable();
        }
    }
});
Ext.define('GridLokasi_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridLokasi_ModulOrg,
    title: 'Lokasi Organisasi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridLokasi_ModulOrgID',
    id: 'GridLokasi_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridLokasi_ModulOrg',
    store: storeGridLokasi_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idlokasiorg', dataIndex: 'idlokasiorg', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Kode budget lokasi', dataIndex: 'kodebudgelokasi', minWidth: 150},
        {header: 'Nama Lokasi', dataIndex: 'namalokasi', minWidth: 200,flex:1},
        {header: 'Tingkat lokasi', dataIndex: 'tingkatlokasi', minWidth: 150},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        {header: 'start date', dataIndex: 'startdate', minWidth: 150},
        {header: 'end date', dataIndex: 'enddate', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
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
                                roleid: 36
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wLokasi_ModulOrg.show();
                                    Ext.getCmp('statusformLokasi_ModulOrg').setValue('input');
                                    tingkatlokasiStore.load();
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
                                roleid: 37
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridLokasi_ModulOrg')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formLokasi_ModulOrg = Ext.getCmp('formLokasi_ModulOrg');
                                        formLokasi_ModulOrg.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/LokasiOrg/1/modulorg',
                                            params: {
                                                extraparams: 'a.idlokasiorg:' + selectedRecord.data.idlokasiorg
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wLokasi_ModulOrg.show();
                                        Ext.getCmp('statusformLokasi_ModulOrg').setValue('edit');
                                        tingkatlokasiStore.load();
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
                    id: 'btnDeleteLokasi_ModulOrg',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 38
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
                                                var grid = Ext.ComponentQuery.query('GridLokasi_ModulOrg')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/LokasiOrg/modulorg/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridLokasi_ModulOrg.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                
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
                    xtype: 'searchGridLokasi_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridLokasi_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridLokasi_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formLokasi_ModulOrg = Ext.getCmp('formLokasi_ModulOrg');
            wLokasi_ModulOrg.show();
            formLokasi_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/LokasiOrg/1/modulorg',
                params: {
                    extraparams: 'a.idlokasiorg:' + record.data.idlokasiorg
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformLokasi_ModulOrg').setValue('edit');
            tingkatlokasiStore.load();
        }
    }
});
