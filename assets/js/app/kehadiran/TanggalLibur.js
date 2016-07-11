
var formTanggalLibur = Ext.create('Ext.form.Panel', {
    id: 'formTanggalLibur',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/TanggalLibur/kehadiran',
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
            name: 'statusformTanggalLibur',
            id: 'statusformTanggalLibur'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idtanggallibur',
            name: 'idtanggallibur'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Libur',
            allowBlank: false,
            name: 'namalibur'
        }, {
            xtype: 'numberfield',
            maxValue:31,
            minValue:1,
            fieldLabel: 'Tgl Libur',
            allowBlank: false,
            name: 'tanggallibur'
        },{
            allowBlank: false,
            // valueField:'nobulan',
            name:'bulanlibur',
            xtype:'comboxbulan'
        },{
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            // allowBlank: false,
            name: 'deskripsi'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupTanggalLibur');
                Ext.getCmp('formTanggalLibur').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnTanggalLiburSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formTanggalLibur').getForm().reset();
                            Ext.getCmp('windowPopupTanggalLibur').hide();
                            storeGridtanggallibur.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridtanggallibur.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wTanggalLibur = Ext.create('widget.window', {
    id: 'windowPopupTanggalLibur',
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
    items: [formTanggalLibur]
});

Ext.define('GridtanggalliburModel', {
    extend: 'Ext.data.Model',
    fields: ['idtanggallibur','namalibur','tanggallibur','bulanlibur','deskripsi','usermod','datemod','companyname'],
    idProperty: 'id'
});

var storeGridtanggallibur = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridtanggalliburModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/TanggalLibur/kehadiran',
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
Ext.define('MY.searchGridtanggallibur', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridtanggallibur',
    store: storeGridtanggallibur,
    width: 180
});
var smGridtanggallibur = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridtanggallibur.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteTanggalLibur').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteTanggalLibur').enable();
        }
    }
});
Ext.define('Gridtanggallibur', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridtanggallibur,
    title: 'Daftar Tanggal Libur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridtanggalliburID',
    id: 'GridtanggalliburID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridtanggallibur',
    store: storeGridtanggallibur,
    loadMask: true,
    columns: [
        {header: 'idtanggallibur', dataIndex: 'idtanggallibur', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Nama Libur', dataIndex: 'namalibur', minWidth: 150},
        {header: 'Tanggal', dataIndex: 'tanggallibur', minWidth: 150},
        {header: 'Bulan', dataIndex: 'bulanlibur', minWidth: 150},
        {header: 'keterangan', dataIndex: 'deskripsi', minWidth: 150}
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
                                roleid: 117
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wTanggalLibur.show();
                                    Ext.getCmp('statusformTanggalLibur').setValue('input');
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
                                roleid: 118
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('Gridtanggallibur')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formTanggalLibur = Ext.getCmp('formTanggalLibur');
                                        formTanggalLibur.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/TanggalLibur/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idtanggallibur:' + selectedRecord.data.idtanggallibur
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wTanggalLibur.show();
                                        Ext.getCmp('statusformTanggalLibur').setValue('edit');
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
                    id: 'btnDeleteTanggalLibur',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 119
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
                                                var grid = Ext.ComponentQuery.query('Gridtanggallibur')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/TanggalLibur/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        if(!d.success)
                                                        {
                                                            Ext.Msg.alert('Info', d.message);
                                                        } else {
                                                            storeGridtanggallibur.load();
                                                        }
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridtanggallibur.remove(sm.getSelection());
                                                // sm.select(0);
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
                    xtype: 'searchGridtanggallibur',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridtanggallibur, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridtanggallibur.load();
                storeBulan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formTanggalLibur = Ext.getCmp('formTanggalLibur');
            wTanggalLibur.show();
            formTanggalLibur.getForm().load({
                url: SITE_URL + 'backend/loadFormData/TanggalLibur/1/kehadiran',
                params: {
                    extraparams: 'a.idtanggallibur:' + record.data.idtanggallibur
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformTanggalLibur').setValue('edit');
        }
    }
});
