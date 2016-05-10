Ext.define('GridBenefitKaryawanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','idbenefit','kodebenefit','nip','namabenefit'],
    idProperty: 'id'
});

var storeGridBenefitKaryawan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBenefitKaryawanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/BenefitKaryawan/kompensasi',
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


Ext.define('MY.searchGridBenefitKaryawan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBenefitKaryawan',
    store: storeGridBenefitKaryawan,
    width: 180
});
var smGridBenefitKaryawan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridBenefitKaryawan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteBenefitKaryawan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteBenefitKaryawan').enable();
        }
    }
});
Ext.define('GridBenefitKaryawan', {
 width: 900,
    height:390,
    title: 'Komponen Benefit',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridBenefitKaryawanID',
    id: 'GridBenefitKaryawanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridBenefitKaryawan',
    store: storeGridBenefitKaryawan,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'idbenefit', dataIndex: 'idbenefit', hidden: true},
        {header: 'NIP', dataIndex: 'nip', minWidth: 150},
        {header: 'Kode Benefit', dataIndex: 'kodebenefit', minWidth: 150},
        {header: 'Nama Benefit', dataIndex: 'namabenefit', minWidth: 150,flex:1}
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
                                roleid: 91
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wGridBenefitListPopup.show();
                                    // Ext.getCmp('statusformBenefitKaryawan').setValue('input');
                                    // Ext.getCmp('idpelamar_fBenefitKaryawan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());                        
                                    storeGridBenefitList.on('beforeload',function(store, operation,eOpts){
                                        operation.params={
                                                    'idpelamar':Ext.getCmp('idpelamar_dkaryawan').getValue()
                                                  };
                                              });
                                    storeGridBenefitList.load();
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
                // {
                //     text: 'Ubah',
                //     iconCls: 'edit-icon',
                //     handler: function() {
                //         var grid = Ext.ComponentQuery.query('GridBenefitKaryawan')[0];
                //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
                //         var data = grid.getSelectionModel().getSelection();
                //         if (data.length == 0)
                //         {
                //             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                //         } else {
                //             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                //             var formBenefitKaryawan = Ext.getCmp('formBenefitKaryawan');
                //             formBenefitKaryawan.getForm().load({
                //                 url: SITE_URL + 'backend/loadFormData/BenefitKaryawan/1/personalia',
                //                 params: {
                //                     extraparams: 'a.idsuratket:' + selectedRecord.data.idsuratket
                //                 },
                //                 success: function(form, action) {
                //                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
                //                 },
                //                 failure: function(form, action) {
                //                     Ext.Msg.alert("Load failed", action.result.errorMessage);
                //                 }
                //             })

                //             wBenefitKaryawan.show();
                //             Ext.getCmp('statusformBenefitKaryawan').setValue('edit');
                //             Ext.getCmp('idpelamar_fBenefitKaryawan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                //             jenjangBenefitKaryawanStore.load();
                //         }

                //     }
                // }, 
                {
                    id: 'btnDeleteBenefitKaryawan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 92
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
                                                var grid = Ext.ComponentQuery.query('GridBenefitKaryawan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]+'&'+item.data[Object.keys(item.data)[1]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_deletes/benefitkaryawan/kompensasi',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        storeGridBenefitKaryawan.load();
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                                // storeGridBenefitKaryawan.remove(sm.getSelection());
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
                    xtype: 'searchGridBenefitKaryawan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridBenefitKaryawan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridBenefitKaryawan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
