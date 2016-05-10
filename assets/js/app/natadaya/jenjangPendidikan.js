
var formJenjangPendidikan_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formJenjangPendidikan_Natadaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/JenjangPendidikan/natadaya',
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
            name: 'statusformJenjangPendidikan',
            id: 'statusformJenjangPendidikan_Natadaya'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idjenjangpendidikan',
            name: 'idjenjangpendidikan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Jenjang Pendidikan',
            allowBlank: false,
            name: 'kodejenjang'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Jenjang Pendidikan',
            allowBlank: false,
            name: 'namajenjang'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Urutan',
            allowBlank: false,
            name: 'urutan'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJenjangPendidikan_Natadaya');
                Ext.getCmp('formJenjangPendidikan_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJenjangPendidikan_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJenjangPendidikan_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupJenjangPendidikan_Natadaya').hide();
                            storeGridJenjangPendidikan_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJenjangPendidikan_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJenjangPendidikan_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupJenjangPendidikan_Natadaya',
    title: 'Form Jenjang Pendidikan',
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
    items: [formJenjangPendidikan_Natadaya]
});

Ext.define('GridJenjangPendidikan_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idjenjangpendidikan','namajenjang','kodejenjang','status','idcompany','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridJenjangPendidikan_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJenjangPendidikan_NatadayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JenjangPendidikan/natadaya',
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
Ext.define('MY.searchGridJenjangPendidikan_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJenjangPendidikan_Natadaya',
    store: storeGridJenjangPendidikan_Natadaya,
    width: 180
});
var smGridJenjangPendidikan_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridJenjangPendidikan_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteJenjangPendidikan_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteJenjangPendidikan_Natadaya').enable();
        }
    }
});
Ext.define('GridJenjangPendidikan_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJenjangPendidikan_Natadaya,
    title: 'Jenjang Pendidikan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJenjangPendidikan_NatadayaID',
    id: 'GridJenjangPendidikan_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJenjangPendidikan_Natadaya',
    store: storeGridJenjangPendidikan_Natadaya,
    loadMask: true,
    columns: [
        {header: 'idjenjangpendidikan', dataIndex: 'idjenjangpendidikan', hidden: true},
        {header: 'Kode Jenjang Pendidikan', dataIndex: 'kodejenjang', minWidth: 100},
        {header: 'Nama Jenjang Pendidikan', dataIndex: 'namajenjang', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150},
        {header: 'date in', dataIndex: 'datein', minWidth: 150}
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
                        wJenjangPendidikan_Natadaya.show();
                        Ext.getCmp('statusformJenjangPendidikan_Natadaya').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridJenjangPendidikan_Natadaya')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formJenjangPendidikan_Natadaya = Ext.getCmp('formJenjangPendidikan_Natadaya');
                            formJenjangPendidikan_Natadaya.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/JenjangPendidikan/1/natadaya',
                                params: {
                                    extraparams: 'a.idjenjangpendidikan:' + selectedRecord.data.idjenjangpendidikan
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wJenjangPendidikan_Natadaya.show();
                            Ext.getCmp('statusformJenjangPendidikan_Natadaya').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteJenjangPendidikan_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridJenjangPendidikan_Natadaya')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/JenjangPendidikan/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridJenjangPendidikan_Natadaya.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridJenjangPendidikan_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJenjangPendidikan_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJenjangPendidikan_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formJenjangPendidikan_Natadaya = Ext.getCmp('formJenjangPendidikan_Natadaya');
            wJenjangPendidikan_Natadaya.show();
            formJenjangPendidikan_Natadaya.getForm().load({
                url: SITE_URL + 'backend/loadFormData/JenjangPendidikan/1/natadaya',
                params: {
                    extraparams: 'a.idjenjangpendidikan:' + record.data.idjenjangpendidikan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformJenjangPendidikan_Natadaya').setValue('edit');
        }
    }
});
