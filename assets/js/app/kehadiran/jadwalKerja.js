
var formJadwalKerja = Ext.create('Ext.form.Panel', {
    id: 'formJadwalKerja',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/JadwalKerja/kehadiran',
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
            name: 'statusformJadwalKerja',
            id: 'statusformJadwalKerja'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idjadwalkerja',
            name: 'idjadwalkerja'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Jadwal Kerja',
            allowBlank: false,
            name: 'kodejadwalkerja'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Jadwal',
            allowBlank: false,
            name: 'namajadwalkerja'
        },
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_1',
            id: 'idjamkerjaharian1_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja1_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja1_fJadwalKerja',
            name: 'namajamkerja1',
            editable: false,
            id: 'namajamkerja1_fJadwalKerja',
            fieldLabel: 'Jam Kerja Senin',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja1ListPopup.show();
                storeGridJamKerja1List.load();
            }
        }),     
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_2',
            id: 'idjamkerjaharian2_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja2_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja2_fJadwalKerja',
            name: 'namajamkerja2',
            editable: false,
            id: 'namajamkerja2_fJadwalKerja',
            fieldLabel: 'Jam Kerja Selasa',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja2ListPopup.show();
                storeGridJamKerja2List.load();
            }
        }), 
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_3',
            id: 'idjamkerjaharian3_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja3_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja3_fJadwalKerja',
            name: 'namajamkerja3',
            editable: false,
            id: 'namajamkerja3_fJadwalKerja',
            fieldLabel: 'Jam Kerja Rabu',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja3ListPopup.show();
                storeGridJamKerja3List.load();
            }
        }), 
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_4',
            id: 'idjamkerjaharian4_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja4_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja4_fJadwalKerja',
            name: 'namajamkerja4',
            editable: false,
            id: 'namajamkerja4_fJadwalKerja',
            fieldLabel: 'Jam Kerja Kamis',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja4ListPopup.show();
                storeGridJamKerja4List.load();
            }
        }), 
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_5',
            id: 'idjamkerjaharian5_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja5_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja5_fJadwalKerja',
            name: 'namajamkerja5',
            editable: false,
            id: 'namajamkerja5_fJadwalKerja',
            fieldLabel: 'Jam Kerja Jumat',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja5ListPopup.show();
                storeGridJamKerja5List.load();
            }
        }), 
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_6',
            id: 'idjamkerjaharian6_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja6_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja6_fJadwalKerja',
            name: 'namajamkerja6',
            editable: false,
            id: 'namajamkerja6_fJadwalKerja',
            fieldLabel: 'Jam Kerja Sabtu',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja6ListPopup.show();
                storeGridJamKerja6List.load();
            }
        }), 
        {
            xtype: 'hiddenfield',
            name: 'idjamkerjaharian_7',
            id: 'idjamkerjaharian7_fJadwalKerja'
        },
        Ext.define('Ext.ux.namajamkerja7_fJadwalKerja', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajamkerja7_fJadwalKerja',
            name: 'namajamkerja7',
            editable: false,
            id: 'namajamkerja7_fJadwalKerja',
            fieldLabel: 'Jam Kerja Minggu',
            emptyText: 'Pilih Jam Kerja...',
            onTriggerClick: function() {
                wGridJamKerja7ListPopup.show();
                storeGridJamKerja7List.load();
            }
        }),   
        {
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJadwalKerja');
                Ext.getCmp('formJadwalKerja').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJadwalKerjaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJadwalKerja').getForm().reset();
                            Ext.getCmp('windowPopupJadwalKerja').hide();
                            storeGridJadwalKerja.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJadwalKerja.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJadwalKerja = Ext.create('widget.window', {
    id: 'windowPopupJadwalKerja',
    title: 'Form Jadwal Kerja',
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
    items: [formJadwalKerja]
});

Ext.define('GridJadwalKerjaModel', {
    extend: 'Ext.data.Model',
    fields: ['idjadwalkerja','idpolakerja','kodejadwalkerja','namajadwalkerja','idjamkerjaharian_1','idjamkerjaharian_2','idjamkerjaharian_3','idjamkerjaharian_4','idjamkerjaharian_5','idjamkerjaharian_6','idjamkerjaharian_7','namajamkerja1','namajamkerja2','namajamkerja3','namajamkerja4','namajamkerja5','namajamkerja6','namajamkerja7','companyname'],
    idProperty: 'id'
});

var storeGridJadwalKerja = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJadwalKerjaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JadwalKerja/kehadiran',
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
Ext.define('MY.searchGridJadwalKerja', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJadwalKerja',
    store: storeGridJadwalKerja,
    width: 180
});
var smGridJadwalKerja = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridJadwalKerja.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteJadwalKerja').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteJadwalKerja').enable();
        }
    }
});
Ext.define('GridJadwalKerja', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJadwalKerja,
    title: 'Daftar Jadwal Kerja',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJadwalKerjaID',
    id: 'GridJadwalKerjaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJadwalKerja',
    store: storeGridJadwalKerja,
    loadMask: true,
    columns: [
        {header: 'idjadwalkerja', dataIndex: 'idjadwalkerja', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode jadwal kerja', dataIndex: 'kodejadwalkerja', minWidth: 150},
        {header: 'Nama jadwal kerja', dataIndex: 'namajadwalkerja', minWidth: 150},
        {header: 'Senin', dataIndex: 'namajamkerja1', minWidth: 150},
        {header: 'Selasa', dataIndex: 'namajamkerja2', minWidth: 150},
        {header: 'Rabu', dataIndex: 'namajamkerja3', minWidth: 150},
        {header: 'Kamis', dataIndex: 'namajamkerja4', minWidth: 150},
        {header: 'Jumat', dataIndex: 'namajamkerja5', minWidth: 150},
        {header: 'Sabtu', dataIndex: 'namajamkerja6', minWidth: 150},
        {header: 'Minggu', dataIndex: 'namajamkerja7', minWidth: 150},
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
                                roleid: 111
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wJadwalKerja.show();
                                    Ext.getCmp('statusformJadwalKerja').setValue('input');
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
                                roleid: 112
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridJadwalKerja')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formJadwalKerja = Ext.getCmp('formJadwalKerja');
                                        formJadwalKerja.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/JadwalKerja/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idjadwalkerja:' + selectedRecord.data.idjadwalkerja
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wJadwalKerja.show();
                                        Ext.getCmp('statusformJadwalKerja').setValue('edit');
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
                    id: 'btnDeleteJadwalKerja',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 113
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
                                                var grid = Ext.ComponentQuery.query('GridJadwalKerja')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/JadwalKerja/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridJadwalKerja.remove(sm.getSelection());
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
                    xtype: 'searchGridJadwalKerja',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJadwalKerja, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJadwalKerja.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formJadwalKerja = Ext.getCmp('formJadwalKerja');
            wJadwalKerja.show();
            formJadwalKerja.getForm().load({
                url: SITE_URL + 'backend/loadFormData/JadwalKerja/1/kehadiran',
                params: {
                    extraparams: 'a.idjadwalkerja:' + record.data.idjadwalkerja
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformJadwalKerja').setValue('edit');
        }
    }
});
