
var formPtkp_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formPtkp_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Ptkp/ModulOrg',
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
            name: 'statusformPtkp',
            id: 'statusformPtkp_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idptkp',
            name: 'idptkp'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode PTKP',
            allowBlank: false,
            name: 'kodeptkp'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama PTKP',
            allowBlank: false,
            name: 'namaptkp'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Nilai PTKP',
            allowBlank: false,
            name: 'nilaiptkp'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPtkp_ModulOrg');
                Ext.getCmp('formPtkp_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPtkp_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPtkp_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupPtkp_ModulOrg').hide();
                            storeGridPtkp_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPtkp_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPtkp_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupPtkp_ModulOrg',
    title: 'Form PTKP',
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
    items: [formPtkp_ModulOrg]
});

Ext.define('GridPtkp_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idptkp','namaptkp','status','idcompany','nilaiptkp','kodeptkp','userin','datein'],
    idProperty: 'id'
});

var storeGridPtkp_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPtkp_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Ptkp/natadaya',
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
Ext.define('MY.searchGridPtkp_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPtkp_ModulOrg',
    store: storeGridPtkp_ModulOrg,
    width: 180
});
var smGridPtkp_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPtkp_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePtkp_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePtkp_ModulOrg').enable();
        }
    }
});
Ext.define('GridPtkp_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPtkp_ModulOrg,
    title: 'sadsds',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPtkp_ModulOrgID',
    id: 'GridPtkp_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPtkp_ModulOrg',
    store: storeGridPtkp_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'idptkp', dataIndex: 'idptkp', hidden: true},
        {header: 'Kode PTKP', dataIndex: 'kodeptkp', minWidth: 100},
        {header: 'Nama PTKP', dataIndex: 'namaptkp', minWidth: 200,flex:1},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        {header: 'Nilai PTKP', dataIndex: 'nilaiptkp', minWidth: 150, xtype:'numbercolumn'},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                 {
//                     text: 'Tambah',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         wPtkp_ModulOrg.show();
//                         Ext.getCmp('statusformPtkp_ModulOrg').setValue('input');
//                     }
//                 },
//                 {
//                     text: 'Ubah',
//                     iconCls: 'edit-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridPtkp_ModulOrg')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
//                         } else {
//                             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                             var formPtkp_ModulOrg = Ext.getCmp('formPtkp_ModulOrg');
//                             formPtkp_ModulOrg.getForm().load({
//                                 url: SITE_URL + 'backend/loadFormData/Ptkp/1/ModulOrg',
//                                 params: {
//                                     extraparams: 'a.idptkp:' + selectedRecord.data.idptkp
//                                 },
//                                 success: function(form, action) {
//                                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 },
//                                 failure: function(form, action) {
//                                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 }
//                             })

//                             wPtkp_ModulOrg.show();
//                             Ext.getCmp('statusformPtkp_ModulOrg').setValue('edit');
//                         }

//                     }
//                 }, {
//                     id: 'btnDeletePtkp_ModulOrg',
//                     text: 'Hapus',
//                     iconCls: 'delete-icon',
//                     handler: function() {
//                         Ext.Msg.show({
//                             title: 'Confirm',
//                             msg: 'Delete Selected ?',
//                             buttons: Ext.Msg.YESNO,
//                             fn: function(btn) {
//                                 if (btn == 'yes') {
//                                     var grid = Ext.ComponentQuery.query('GridPtkp_ModulOrg')[0];
//                                     var sm = grid.getSelectionModel();
//                                     selected = [];
//                                     Ext.each(sm.getSelection(), function(item) {
//                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                     });
//                                     Ext.Ajax.request({
//                                         url: SITE_URL + 'backend/ext_delete/Ptkp/ModulOrg/hidden',
//                                         method: 'POST',
//                                         params: {postdata: Ext.encode(selected)}
//                                     });
//                                     storeGridPtkp_ModulOrg.remove(sm.getSelection());
//                                     sm.select(0);
//                                 }
//                             }
//                         });
//                     },
// //                    disabled: true
//                 }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPtkp_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPtkp_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPtkp_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formPtkp_ModulOrg = Ext.getCmp('formPtkp_ModulOrg');
            // wPtkp_ModulOrg.show();
            // formPtkp_ModulOrg.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/Ptkp/1/ModulOrg',
            //     params: {
            //         extraparams: 'a.idptkp:' + record.data.idptkp
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPtkp_ModulOrg').setValue('edit');
        }
    }
});
