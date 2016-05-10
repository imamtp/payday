
var formRulesUpahTidakTetap = Ext.create('Ext.form.Panel', {
    id: 'formRulesUpahTidakTetap',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/RulesUpahTidakTetap/kompensasi',
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
            name: 'statusformRulesUpahTidakTetap',
            id: 'statusformRulesUpahTidakTetap'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanupahtidaktetap',
            name: 'idkebijakanupahtidaktetap'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanpengupahan',
            id: 'idkebijakanpengupahan_fRulesUpahTidakTetap',
            name: 'idkebijakanpengupahan'
        },{
            xtype:'comboxKomponenTidakUpah',
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
                var win = Ext.getCmp('windowPopupRulesUpahTidakTetap');
                Ext.getCmp('formRulesUpahTidakTetap').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRulesUpahTidakTetapSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formRulesUpahTidakTetap').getForm().reset();
                            Ext.getCmp('windowPopupRulesUpahTidakTetap').hide();
                            storeGridRulesUpahTidakTetap.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridRulesUpahTidakTetap.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wRulesUpahTidakTetap = Ext.create('widget.window', {
    id: 'windowPopupRulesUpahTidakTetap',
    title: 'Form Komponen Upah Tidak Tetap',
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
    items: [formRulesUpahTidakTetap]
});

Ext.define('GridRulesUpahTidakTetapModel', {
    extend: 'Ext.data.Model',
    fields: ['idkebijakanupahtidaktetap','idkomponenupah','idkebijakanpengupahan','idlevel','nilai','urutan','levelname','namakomponen'],
    idProperty: 'id'
});

var storeGridRulesUpahTidakTetap = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRulesUpahTidakTetapModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RulesUpahTidakTetap/kompensasi',
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
Ext.define('MY.searchGridRulesUpahTidakTetap', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRulesUpahTidakTetap',
    store: storeGridRulesUpahTidakTetap,
    width: 180
});
var smGridRulesUpahTidakTetap = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRulesUpahTidakTetap.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRulesUpahTidakTetap').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRulesUpahTidakTetap').enable();
        }
    }
});
Ext.define('GridRulesUpahTidakTetap', {
    width:300,
    height:250,
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRulesUpahTidakTetap,
    // title: 'Komponen Upah Tetap',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRulesUpahTidakTetapID',
    id: 'GridRulesUpahTidakTetapID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRulesUpahTidakTetap',
    store: storeGridRulesUpahTidakTetap,
    loadMask: true,
    columns: [
        {header: 'idkebijakanupahtidaktetap', dataIndex: 'idkebijakanupahtidaktetap', hidden: true},
        {header: 'Nama Komponen', flex:1,dataIndex: 'namakomponen', minWidth: 150},
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
                        wRulesUpahTidakTetap.show();
                        Ext.getCmp('statusformRulesUpahTidakTetap').setValue('input');
                        Ext.getCmp('idkebijakanpengupahan_fRulesUpahTidakTetap').setValue(Ext.getCmp('idkebijakanpengupahan').getValue());
                        upahTidakTetapStore.load();
                        levelStore.load();
                    }
                },
                {
                    text: 'Ubah Komponen',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridRulesUpahTidakTetap')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formRulesUpahTidakTetap = Ext.getCmp('formRulesUpahTidakTetap');
                            formRulesUpahTidakTetap.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/RulesUpahTidakTetap/1/kompensasi',
                                params: {
                                    extraparams: 'a.idkebijakanupahtidaktetap:' + selectedRecord.data.idkebijakanupahtidaktetap
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wRulesUpahTidakTetap.show();
                            Ext.getCmp('statusformRulesUpahTidakTetap').setValue('edit');
                            upahTidakTetapStore.load();
                            levelStore.load();
                        }

                    }
                }, {
                    text: 'Hapus Komponen',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridRulesUpahTidakTetap')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/RulesUpahTidakTetap/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridRulesUpahTidakTetap.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridRulesUpahTidakTetap, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRulesUpahTidakTetap.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

        }
    }
});
