
var formConfigUpahT = Ext.create('Ext.form.Panel', {
    id: 'formConfigUpahT',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigUpahT/kompensasi',
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
            name: 'statusformConfigUpahT',
            id: 'statusformConfigUpahT'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkomponenupah',
            name: 'idkomponenupah'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idcompany',
            id:'idcompany_fConfigUpahT',
            name:'idcompany'
        },
        Ext.define('Ext.ux.companyname_fConfigUpahT', {
            labelWidth:140,
            width:470,
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.companyname_fConfigUpahT',
            name: 'companyname',
            editable: false,
            id: 'companyname_fConfigUpahT',
            fieldLabel: 'Perusahaan',
            emptyText: 'Pilih Perusahaan...',
            onTriggerClick: function() {
                 wGridCompanyConfigUTListPopup.show();
                 storeGridCompanyConfigUTList.load();
            }
        }),
         {
            xtype: 'textfield',
            fieldLabel: 'Kode Komponen Upah',
            allowBlank: false,
            name: 'kodekomponen'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Komponen Upah',
            allowBlank: false,
            name: 'namakomponen'
        },
        {
            xtype:'comboxYaTidak',
            allowBlank: false,
            fieldLabel: 'Masuk Pajak',
            name:'kenapajak',
            listeners: {
                select: {
                    fn: function(combo, value) {
                        if(combo.getValue()=='YA')
                        {
                            Ext.getCmp('comboxFungsiPajakConfigUT').setDisabled(false);
                        } else {
                            Ext.getCmp('comboxFungsiPajakConfigUT').setDisabled(true);
                        }
                    }
                }
            }
        },
        {
            xtype:'comboxFungsiPajak',
            id:'comboxFungsiPajakConfigUT',
            allowBlank: false
        },
        // {
        //     xtype:'comboxHitungPajak',
        //    // hidden:true,
        //     allowBlank: false
        // },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai Berlaku'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Akhir Berlaku'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupConfigUpahT');
                Ext.getCmp('formConfigUpahT').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigUpahTSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigUpahT').getForm().reset();
                            Ext.getCmp('windowPopupConfigUpahT').hide();
                            storeGridKomponenUpahTetap.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKomponenUpahTetap.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wConfigUpahT = Ext.create('widget.window', {
    id: 'windowPopupConfigUpahT',
    title: 'Form Pengaturan Upah Tetap',
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
    items: [formConfigUpahT]
});

Ext.define('GridKomponenUpahTetapModel', {
    extend: 'Ext.data.Model',
    fields: ['idkomponenupah','idcompany','kodekomponen','namakomponen','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','companyname'],
    idProperty: 'id'
});

var storeGridKomponenUpahTetap = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKomponenUpahTetapModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigUpahT/kompensasi',
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
Ext.define('MY.searchGridKomponenUpahTetap', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKomponenUpahTetap',
    store: storeGridKomponenUpahTetap,
    width: 180
});
var smGridKomponenUpahTetap = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKomponenUpahTetap.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigUpahT').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigUpahT').enable();
        }
    }
});
Ext.define('GridKomponenUpahTetap', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKomponenUpahTetap,
    title: 'Komponen Upah Tetap',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'Grididkomponenupah',
    id: 'Grididkomponenupah',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKomponenUpahTetap',
    store: storeGridKomponenUpahTetap,
    loadMask: true,
    columns: [
        {header: 'idkomponenupah', dataIndex: 'idkomponenupah', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Upah', dataIndex: 'kodekomponen', minWidth: 150},
        {header: 'Nama Upah', dataIndex: 'namakomponen', minWidth: 150,flex:1},
        {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        // {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        // {header: 'user in', dataIndex: 'userin', minWidth: 150},
        // {header: 'date in', dataIndex: 'datein', minWidth: 150}
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
                                roleid: 139
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wConfigUpahT.show();
                                    Ext.getCmp('statusformConfigUpahT').setValue('input');
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
                                roleid: 140
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridKomponenUpahTetap')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formConfigUpahT = Ext.getCmp('formConfigUpahT');
                                        formConfigUpahT.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/ConfigUpahT/1/kompensasi',
                                            params: {
                                                extraparams: 'a.idkomponenupah:' + selectedRecord.data.idkomponenupah
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wConfigUpahT.show();
                                        Ext.getCmp('statusformConfigUpahT').setValue('edit');
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
                    id: 'btnDeleteConfigUpahT',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 141
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
                                                var grid = Ext.ComponentQuery.query('GridKomponenUpahTetap')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/ConfigUpahT/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridKomponenUpahTetap.remove(sm.getSelection());
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
                    xtype: 'searchGridKomponenUpahTetap',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridKomponenUpahTetap, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKomponenUpahTetap.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formConfigUpahT = Ext.getCmp('formConfigUpahT');
            wConfigUpahT.show();
            formConfigUpahT.getForm().load({
                url: SITE_URL + 'backend/loadFormData/ConfigUpahT/1/kompensasi',
                params: {
                    extraparams: 'a.idkomponenupah:' + record.data.idkomponenupah
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformConfigUpahT').setValue('edit');
        }
    }
});
