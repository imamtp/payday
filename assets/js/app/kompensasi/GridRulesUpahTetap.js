
var formRulesUpahTetap = Ext.create('Ext.form.Panel', {
    id: 'formRulesUpahTetap',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/RulesUpahTetap/kompensasi',
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
            name: 'statusformRulesUpahTetap',
            id: 'statusformRulesUpahTetap'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanupahtetap',
            name: 'idkebijakanupahtetap'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanpengupahan',
            id: 'idkebijakanpengupahan_fRulesUpahTetap',
            name: 'idkebijakanpengupahan'
        },{
            xtype:'comboxdasarKomponenUpah',
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
                var win = Ext.getCmp('windowPopupRulesUpahTetap');
                Ext.getCmp('formRulesUpahTetap').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRulesUpahTetapSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formRulesUpahTetap').getForm().reset();
                            Ext.getCmp('windowPopupRulesUpahTetap').hide();
                            storeGridRulesUpahTetap.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridRulesUpahTetap.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wRulesUpahTetap = Ext.create('widget.window', {
    id: 'windowPopupRulesUpahTetap',
    title: 'Form Komponen Upah Tetap',
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
    items: [formRulesUpahTetap]
});

Ext.define('GridRulesUpahTetapModel', {
    extend: 'Ext.data.Model',
    fields: ['idkebijakanupahtetap','idkomponenupah','idkebijakanpengupahan','idlevel','nilai','urutan','levelname','namakomponen'],
    idProperty: 'id'
});

var storeGridRulesUpahTetap = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRulesUpahTetapModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RulesUpahTetap/kompensasi',
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
Ext.define('MY.searchGridRulesUpahTetap', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRulesUpahTetap',
    store: storeGridRulesUpahTetap,
    width: 180
});
var smGridRulesUpahTetap = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRulesUpahTetap.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRulesUpahTetap').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRulesUpahTetap').enable();
        }
    }
});
Ext.define('GridRulesUpahTetap', {
    width:300,
    height:250,
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRulesUpahTetap,
    // title: 'Komponen Upah Tetap',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRulesUpahTetapID',
    id: 'GridRulesUpahTetapID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRulesUpahTetap',
    store: storeGridRulesUpahTetap,
    loadMask: true,
    columns: [
        {header: 'idkebijakanupahtetap', dataIndex: 'idkebijakanupahtetap', hidden: true},
        {header: 'Nama Komponen', flex:1,dataIndex: 'namakomponen', minWidth: 150},
        {header: 'No Level', dataIndex: 'urutan', minWidth: 80},
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
                        wRulesUpahTetap.show();
                        Ext.getCmp('statusformRulesUpahTetap').setValue('input');
                        Ext.getCmp('idkebijakanpengupahan_fRulesUpahTetap').setValue(Ext.getCmp('idkebijakanpengupahan').getValue());
                        upahTetapStore.load();
                        levelStore.load();
                    }
                },
                {
                    text: 'Ubah Komponen',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridRulesUpahTetap')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formRulesUpahTetap = Ext.getCmp('formRulesUpahTetap');
                            formRulesUpahTetap.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/RulesUpahTetap/1/kompensasi',
                                params: {
                                    extraparams: 'a.idkebijakanupahtetap:' + selectedRecord.data.idkebijakanupahtetap
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wRulesUpahTetap.show();
                            Ext.getCmp('statusformRulesUpahTetap').setValue('edit');
                            upahTetapStore.load();
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
                                    var grid = Ext.ComponentQuery.query('GridRulesUpahTetap')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/RulesUpahTetap/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridRulesUpahTetap.remove(sm.getSelection());
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
            store: storeGridRulesUpahTetap, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRulesUpahTetap.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

        }
    }
});
