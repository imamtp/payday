
var formStatusKawin_Natadaya = Ext.create('Ext.form.Panel', {
    id: 'formStatusKawin_Natadaya',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/StatusKawin/natadaya',
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
            name: 'statusformStatusKawin',
            id: 'statusformStatusKawin_Natadaya'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idstatuskawin',
            name: 'idstatuskawin'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Status Kawin',
            allowBlank: false,
            name: 'kodestatuskawin'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Status kawin',
            allowBlank: false,
            name: 'namastatuskawin'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupStatusKawin_Natadaya');
                Ext.getCmp('formStatusKawin_Natadaya').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnStatusKawin_NatadayaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formStatusKawin_Natadaya').getForm().reset();
                            Ext.getCmp('windowPopupStatusKawin_Natadaya').hide();
                            storeGridStatusKawin_Natadaya.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridStatusKawin_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wStatusKawin_Natadaya = Ext.create('widget.window', {
    id: 'windowPopupStatusKawin_Natadaya',
    title: 'Form Status Kawin',
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
    items: [formStatusKawin_Natadaya]
});

Ext.define('GridStatusKawin_NatadayaModel', {
    extend: 'Ext.data.Model',
    fields: ['idstatuskawin','namastatuskawin','status','idcompany','kodestatuskawin','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridStatusKawin_Natadaya = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStatusKawin_NatadayaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/StatusKawin/natadaya',
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
Ext.define('MY.searchGridStatusKawin_Natadaya', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridStatusKawin_Natadaya',
    store: storeGridStatusKawin_Natadaya,
    width: 180
});
var smGridStatusKawin_Natadaya = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridStatusKawin_Natadaya.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteStatusKawin_Natadaya').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteStatusKawin_Natadaya').enable();
        }
    }
});
Ext.define('GridStatusKawin_Natadaya', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridStatusKawin_Natadaya,
    title: 'Status Perkawinan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridStatusKawin_NatadayaID',
    id: 'GridStatusKawin_NatadayaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStatusKawin_Natadaya',
    store: storeGridStatusKawin_Natadaya,
    loadMask: true,
    columns: [
        {header: 'idstatuskawin', dataIndex: 'idstatuskawin', hidden: true},
        {header: 'Kode Status Perkawinan', dataIndex: 'kodestatuskawin', minWidth: 100},
        {header: 'Nama Status Perkawinan', dataIndex: 'namastatuskawin', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        // {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
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
                        wStatusKawin_Natadaya.show();
                        Ext.getCmp('statusformStatusKawin_Natadaya').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridStatusKawin_Natadaya')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formStatusKawin_Natadaya = Ext.getCmp('formStatusKawin_Natadaya');
                            formStatusKawin_Natadaya.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/StatusKawin/1/natadaya',
                                params: {
                                    extraparams: 'a.statuskawin:' + selectedRecord.data.statuskawin
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wStatusKawin_Natadaya.show();
                            Ext.getCmp('statusformStatusKawin_Natadaya').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteStatusKawin_Natadaya',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridStatusKawin_Natadaya')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/StatusKawin/natadaya/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridStatusKawin_Natadaya.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridStatusKawin_Natadaya',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStatusKawin_Natadaya, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridStatusKawin_Natadaya.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formStatusKawin_Natadaya = Ext.getCmp('formStatusKawin_Natadaya');
            wStatusKawin_Natadaya.show();
            formStatusKawin_Natadaya.getForm().load({
                url: SITE_URL + 'backend/loadFormData/StatusKawin/1/natadaya',
                params: {
                    extraparams: 'a.statuskawin:' + record.data.statuskawin
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformStatusKawin_Natadaya').setValue('edit');
        }
    }
});
