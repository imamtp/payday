
var formRulesPengurangUpah = Ext.create('Ext.form.Panel', {
    id: 'formRulesPengurangUpah',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/RulesPengurangUpah/kompensasi',
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
    items: [
        {
            xtype: 'hiddenfield',
            name: 'statusformRulesPengurangUpah',
            id: 'statusformRulesPengurangUpah'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanpengurangupah',
            name: 'idkebijakanpengurangupah'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanpengupahan',
            id: 'idkebijakanpengupahan_fRulesPengurangUpah',
            name: 'idkebijakanpengupahan'
        },{
            xtype:'comboxPengurangUpah',
        }, {
            xtype: 'comboxlevel',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nilai',
            allowBlank: false,
            name: 'nilai'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupRulesPengurangUpah');
                Ext.getCmp('formRulesPengurangUpah').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRulesPengurangUpahSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formRulesPengurangUpah').getForm().reset();
                            Ext.getCmp('windowPopupRulesPengurangUpah').hide();
                            storeGridRulesPengurangUpah.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridRulesPengurangUpah.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wRulesPengurangUpah = Ext.create('widget.window', {
    id: 'windowPopupRulesPengurangUpah',
    title: 'Form Komponen Pengurang Upah',
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
    items: [formRulesPengurangUpah]
});

Ext.define('GridRulesPengurangUpahModel', {
    extend: 'Ext.data.Model',
    fields: ['idkebijakanpengurangupah','idpengurangupah','idkebijakanpengupahan','idlevel','nilai','urutan','levelname','namapengurangupah'],
    idProperty: 'id'
});

var storeGridRulesPengurangUpah = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRulesPengurangUpahModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RulesPengurangUpah/kompensasi',
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
Ext.define('MY.searchGridRulesPengurangUpah', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRulesPengurangUpah',
    store: storeGridRulesPengurangUpah,
    width: 180
});
var smGridRulesPengurangUpah = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRulesPengurangUpah.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRulesPengurangUpah').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRulesPengurangUpah').enable();
        }
    }
});
Ext.define('GridRulesPengurangUpah', {
    width:300,
    height:250,
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRulesPengurangUpah,
    // title: 'Komponen Upah Tetap',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRulesPengurangUpahID',
    id: 'GridRulesPengurangUpahID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRulesPengurangUpah',
    store: storeGridRulesPengurangUpah,
    loadMask: true,
    columns: [
        {header: 'idkebijakanpengurangupah', dataIndex: 'idkebijakanpengurangupah', hidden: true},
        {header: 'Nama Komponen', flex:1,dataIndex: 'namapengurangupah', minWidth: 150},
        {header: 'No Level', dataIndex: 'urutan', minWidth: 150},
        {header: 'Level Name', dataIndex: 'levelname', minWidth: 250},
        {header: 'Nilai', dataIndex: 'nilai', minWidth: 150,xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Tambah Komponen',
                    iconCls: 'add-icon',
                    handler: function() {
                        wRulesPengurangUpah.show();
                        Ext.getCmp('statusformRulesPengurangUpah').setValue('input');
                        Ext.getCmp('idkebijakanpengupahan_fRulesPengurangUpah').setValue(Ext.getCmp('idkebijakanpengupahan').getValue());
                        pengurangUpahStore.load();
                        levelStore.load();
                    }
                },
                {
                    text: 'Ubah Komponen',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridRulesPengurangUpah')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formRulesPengurangUpah = Ext.getCmp('formRulesPengurangUpah');
                            formRulesPengurangUpah.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/RulesPengurangUpah/1/kompensasi',
                                params: {
                                    extraparams: 'a.idkebijakanpengurangupah:' + selectedRecord.data.idkebijakanpengurangupah
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wRulesPengurangUpah.show();
                            Ext.getCmp('statusformRulesPengurangUpah').setValue('edit');
                            pengurangUpahStore.load();
                            levelStore.load();
                        }

                    }
                }, {
                    text: 'Hapus Komponen',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Hapus data terpilih ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridRulesPengurangUpah')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/RulesPengurangUpah/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridRulesPengurangUpah.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }
            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridRulesPengurangUpah, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRulesPengurangUpah.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

        }
    }
});
