
var formPolaKerja = Ext.create('Ext.form.Panel', {
    id: 'formPolaKerja',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/PolaKerja/kehadiran',
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
            name: 'statusformPolaKerja',
            id: 'statusformPolaKerja'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpolakerja',
            name: 'idpolakerja'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Pola Kerja',
            allowBlank: false,
            name: 'kodepolakerja'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Pola',
            allowBlank: false,
            name: 'namapola'
        },{
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            // allowBlank: false,
            name: 'keterangan'
        },
        // {
        //     xtype: 'datefield',
        //     format: 'd-m-Y',
        //     name:'startdate',
        //     allowBlank: false,
        //     fieldLabel: 'Tgl Mulai'
        // }, {
        //     xtype: 'datefield',
        //     format: 'd-m-Y',
        //     allowBlank: false,
        //     name:'enddate',
        //     fieldLabel: 'Tgl Akhir'
        // }
        ,{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPolaKerja');
                Ext.getCmp('formPolaKerja').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPolaKerjaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPolaKerja').getForm().reset();
                            Ext.getCmp('windowPopupPolaKerja').hide();
                            storeGridPolaKerja.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPolaKerja.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPolaKerja = Ext.create('widget.window', {
    id: 'windowPopupPolaKerja',
    title: 'Form Pola Kerja',
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
    items: [formPolaKerja]
});

Ext.define('GridPolaKerjaModel', {
    extend: 'Ext.data.Model',
    fields: ['idpolakerja','kodepolakerja','namapola','startdate','enddate','keterangan','status','startdate','enddate','userin','datein'],
    idProperty: 'id'
});

var storeGridPolaKerja = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPolaKerjaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PolaKerja/kehadiran',
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
Ext.define('MY.searchGridPolaKerja', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPolaKerja',
    store: storeGridPolaKerja,
    width: 180
});
var smGridPolaKerja = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPolaKerja.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePolaKerja').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePolaKerja').enable();
        }
    }
});
Ext.define('GridPolaKerja', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPolaKerja,
    title: 'Daftar Pola Kerja',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPolaKerjaID',
    id: 'GridPolaKerjaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPolaKerja',
    store: storeGridPolaKerja,
    loadMask: true,
    columns: [
        {header: 'idpolakerja', dataIndex: 'idpolakerja', hidden: true},
        {header: 'kode pola kerja', dataIndex: 'kodepolakerja', minWidth: 150},
        {header: 'nama pola', dataIndex: 'namapola', minWidth: 150},
        {header: 'keterangan', dataIndex: 'deskripsi', minWidth: 150},
        // {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        // {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
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
                                roleid: 108
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPolaKerja.show();
                                    Ext.getCmp('statusformPolaKerja').setValue('input');
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
                                roleid: 109
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPolaKerja')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPolaKerja = Ext.getCmp('formPolaKerja');
                                        formPolaKerja.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/PolaKerja/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idpolakerja:' + selectedRecord.data.idpolakerja
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPolaKerja.show();
                                        Ext.getCmp('statusformPolaKerja').setValue('edit');
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
                    id: 'btnDeletePolaKerja',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 110
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
                                                var grid = Ext.ComponentQuery.query('GridPolaKerja')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/PolaKerja/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPolaKerja.remove(sm.getSelection());
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
                    xtype: 'searchGridPolaKerja',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPolaKerja, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPolaKerja.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPolaKerja = Ext.getCmp('formPolaKerja');
            wPolaKerja.show();
            formPolaKerja.getForm().load({
                url: SITE_URL + 'backend/loadFormData/PolaKerja/1/kehadiran',
                params: {
                    extraparams: 'a.idpolakerja:' + record.data.idpolakerja
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformPolaKerja').setValue('edit');
        }
    }
});
