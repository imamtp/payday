
var formKekaryaan_ModulOrg = Ext.create('Ext.form.Panel', {
    id: 'formKekaryaan_ModulOrg',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Kekaryaan/natadaya',
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
            name: 'statusformKekaryaan',
            id: 'statusformKekaryaan_ModulOrg'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idcompany',
            name: 'idcompany'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkekaryaan',
            name: 'idkekaryaan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Kekaryaan',
            allowBlank: false,
            name: 'kodekekaryaan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Kekaryaan',
            allowBlank: false,
            name: 'kekaryaanname'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            // allowBlank: false,
            name: 'description'
        },{
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupKekaryaan_ModulOrg');
                Ext.getCmp('formKekaryaan_ModulOrg').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKekaryaan_ModulOrgSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formKekaryaan_ModulOrg').getForm().reset();
                            Ext.getCmp('windowPopupKekaryaan_ModulOrg').hide();
                            storeGridKekaryaan_ModulOrg.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKekaryaan_ModulOrg.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKekaryaan_ModulOrg = Ext.create('widget.window', {
    id: 'windowPopupKekaryaan_ModulOrg',
    title: 'Form Status Kekaryawanan',
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
    items: [formKekaryaan_ModulOrg]
});

Ext.define('GridKekaryaan_ModulOrgModel', {
    extend: 'Ext.data.Model',
    fields: ['idkekaryaan','kekaryaanname','description','status','idcompany','kodekekaryaan','userin','datein'],
    idProperty: 'id'
});

var storeGridKekaryaan_ModulOrg = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKekaryaan_ModulOrgModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Kekaryaan/natadaya',
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
Ext.define('MY.searchGridKekaryaan_ModulOrg', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKekaryaan_ModulOrg',
    store: storeGridKekaryaan_ModulOrg,
    width: 180
});
var smGridKekaryaan_ModulOrg = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKekaryaan_ModulOrg.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKekaryaan_ModulOrg').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKekaryaan_ModulOrg').enable();
        }
    }
});
Ext.define('GridKekaryaan_ModulOrg', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKekaryaan_ModulOrg,
    title: 'Status Kekaryawanan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKekaryaan_ModulOrgID',
    id: 'GridKekaryaan_ModulOrgID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKekaryaan_ModulOrg',
    store: storeGridKekaryaan_ModulOrg,
    loadMask: true,
    columns: [
        {header: 'kekaryaan', dataIndex: 'kekaryaan', hidden: true},
        {header: 'Kode Kekaryawanan', dataIndex: 'kodekekaryaan', minWidth: 100},
        {header: 'Nama Kekaryawanan', dataIndex: 'kekaryaanname', minWidth: 200,flex:1},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
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
//                         wKekaryaan_ModulOrg.show();
//                         Ext.getCmp('statusformKekaryaan_ModulOrg').setValue('input');
//                     }
//                 },
//                 {
//                     text: 'Ubah',
//                     iconCls: 'edit-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridKekaryaan_ModulOrg')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
//                         } else {
//                             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                             var formKekaryaan_ModulOrg = Ext.getCmp('formKekaryaan_ModulOrg');
//                             formKekaryaan_ModulOrg.getForm().load({
//                                 url: SITE_URL + 'backend/loadFormData/Kekaryaan/1/natadaya',
//                                 params: {
//                                     extraparams: 'a.idkekaryaan:' + selectedRecord.data.idkekaryaan
//                                 },
//                                 success: function(form, action) {
//                                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 },
//                                 failure: function(form, action) {
//                                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 }
//                             })

//                             wKekaryaan_ModulOrg.show();
//                             Ext.getCmp('statusformKekaryaan_ModulOrg').setValue('edit');
//                         }

//                     }
//                 }, {
//                     id: 'btnDeleteKekaryaan_ModulOrg',
//                     text: 'Hapus',
//                     iconCls: 'delete-icon',
//                     handler: function() {
//                         Ext.Msg.show({
//                             title: 'Konfirmasi',
//                             msg: 'Hapus data terpilih ?',
//                             buttons: Ext.Msg.YESNO,
//                             fn: function(btn) {
//                                 if (btn == 'yes') {
//                                     var grid = Ext.ComponentQuery.query('GridKekaryaan_ModulOrg')[0];
//                                     var sm = grid.getSelectionModel();
//                                     selected = [];
//                                     Ext.each(sm.getSelection(), function(item) {
//                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                     });
//                                     Ext.Ajax.request({
//                                         url: SITE_URL + 'backend/ext_delete/Kekaryaan/natadaya/hidden',
//                                         method: 'POST',
//                                         params: {postdata: Ext.encode(selected)}
//                                     });
//                                     storeGridKekaryaan_ModulOrg.remove(sm.getSelection());
//                                     sm.select(0);
//                                 }
//                             }
//                         });
//                     },
// //                    disabled: true
//                 }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridKekaryaan_ModulOrg',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridKekaryaan_ModulOrg, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKekaryaan_ModulOrg.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formKekaryaan_ModulOrg = Ext.getCmp('formKekaryaan_ModulOrg');
            wKekaryaan_ModulOrg.show();
            formKekaryaan_ModulOrg.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Kekaryaan/1/natadaya',
                params: {
                    extraparams: 'a.idkekaryaan:' + record.data.idkekaryaan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformKekaryaan_ModulOrg').setValue('edit');
        }
    }
});
