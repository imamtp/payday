
var formRulesBenefit = Ext.create('Ext.form.Panel', {
    id: 'formRulesBenefit',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/RulesBenefit/kompensasi',
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
            name: 'statusformRulesBenefit',
            id: 'statusformRulesBenefit'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanbenefit',
            name: 'idkebijakanbenefit'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanpengupahan',
            id: 'idkebijakanpengupahan_fRulesBenefit',
            name: 'idkebijakanpengupahan'
        },{
            xtype:'comboxBenefit',
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
                var win = Ext.getCmp('windowPopupRulesBenefit');
                Ext.getCmp('formRulesBenefit').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRulesBenefitSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formRulesBenefit').getForm().reset();
                            Ext.getCmp('windowPopupRulesBenefit').hide();
                            storeGridRulesBenefit.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridRulesBenefit.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wRulesBenefit = Ext.create('widget.window', {
    id: 'windowPopupRulesBenefit',
    title: 'Form Benefit',
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
    items: [formRulesBenefit]
});

Ext.define('GridRulesBenefitModel', {
    extend: 'Ext.data.Model',
    fields: ['idkebijakanbenefit','idkebijakanpengupahan','idbenefit','idlevel','nilai','urutan','levelname','namabenefit'],
    idProperty: 'id'
});

var storeGridRulesBenefit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRulesBenefitModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RulesBenefit/kompensasi',
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
Ext.define('MY.searchGridRulesBenefit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRulesBenefit',
    store: storeGridRulesBenefit,
    width: 180
});
var smGridRulesBenefit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRulesBenefit.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRulesBenefit').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRulesBenefit').enable();
        }
    }
});
Ext.define('GridRulesBenefit', {
    width:300,
    height:250,
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRulesBenefit,
    // title: 'Komponen Upah Tetap',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRulesBenefitID',
    id: 'GridRulesBenefitID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRulesBenefit',
    store: storeGridRulesBenefit,
    loadMask: true,
    columns: [
        {header: 'idkebijakanbenefit', dataIndex: 'idkebijakanbenefit', hidden: true},
        {header: 'Nama Benefit', flex:1,dataIndex: 'namabenefit', minWidth: 150},
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
                        wRulesBenefit.show();
                        Ext.getCmp('statusformRulesBenefit').setValue('input');
                        Ext.getCmp('idkebijakanpengupahan_fRulesBenefit').setValue(Ext.getCmp('idkebijakanpengupahan').getValue());
                        benefitStore.load();
                        levelStore.load();
                    }
                },
                {
                    text: 'Ubah Komponen',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridRulesBenefit')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formRulesBenefit = Ext.getCmp('formRulesBenefit');
                            formRulesBenefit.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/RulesBenefit/1/kompensasi',
                                params: {
                                    extraparams: 'a.idkebijakanbenefit:' + selectedRecord.data.idkebijakanbenefit
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wRulesBenefit.show();
                            Ext.getCmp('statusformRulesBenefit').setValue('edit');
                            benefitStore.load();
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
                                    var grid = Ext.ComponentQuery.query('GridRulesBenefit')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/RulesBenefit/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridRulesBenefit.remove(sm.getSelection());
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
            store: storeGridRulesBenefit, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRulesBenefit.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

        }
    }
});
