Ext.define('TabItemConfigKebijakan', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemConfigKebijakan',
    alias: 'widget.TabItemConfigKebijakan',
    activeTab: 0,
    plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    listeners: {
        render: function() {
            this.items.each(function(i){               
                i.tab.on('click', function(){
                    // alert(i.title);
                    // var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    var idkebijakanpengupahan = Ext.getCmp('idkebijakanpengupahan').getValue();
                    if(i.title=='Upah Tetap')
                    {
                        storeGridRulesUpahTetap.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'extraparams': 'a.idkebijakanpengupahan:'+idkebijakanpengupahan
                                              };
                                          });
                        storeGridRulesUpahTetap.load();
                    } else if(i.title=='Upah Tidak Tetap')
                    {
                        storeGridRulesUpahTidakTetap.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'extraparams': 'a.idkebijakanpengupahan:'+idkebijakanpengupahan
                                              };
                                          });
                        storeGridRulesUpahTidakTetap.load();
                    } else if(i.title=='Benefit')
                    {
                        storeGridRulesBenefit.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'extraparams': 'a.idkebijakanpengupahan:'+idkebijakanpengupahan
                                              };
                                          });
                        storeGridRulesBenefit.load();
                    } else if(i.title=='Pengurang Upah')
                    {
                        storeGridRulesPengurangUpah.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'extraparams': 'a.idkebijakanpengupahan:'+idkebijakanpengupahan
                                              };
                                          });
                        storeGridRulesPengurangUpah.load();
                    }

                });
            });
        }
    },
    items: [
       {
        xtype:'GridRulesUpahTetap',
        title: 'Upah Tetap'
       },
       {
        xtype:'GridRulesUpahTidakTetap',
        title:'Upah Tidak Tetap'
       },
       {
        xtype:'GridRulesBenefit',
        title:'Benefit'
       },
       {
        xtype:'GridRulesPengurangUpah',
        title:'Pengurang Upah'
       }
    ]
});

var formKebijakanPengupahan = Ext.create('Ext.form.Panel', {
    id: 'formKebijakanPengupahan',
    width: 830,
   height: 500,
    url: SITE_URL + 'backend/saveform/KebijakanPengupahan/kompensasi',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
         anchor:'50%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformKebijakanPengupahan',
            id: 'statusformKebijakanPengupahan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkebijakanpengupahan',
            id:'idkebijakanpengupahan',
            name: 'idkebijakanpengupahan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Kebijakan',
            allowBlank: false,
            name: 'kodekebijakan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Kebijakan',
            allowBlank: false,
            name: 'namakebijakan'
        },
        {
            xtype: 'comboxJenisLevel'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Akhir'
        },{
            xtype:'TabItemConfigKebijakan'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupKebijakanPengupahan');
                Ext.getCmp('formKebijakanPengupahan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnKebijakanPengupahanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            // Ext.getCmp('formKebijakanPengupahan').getForm().reset();
                            // Ext.getCmp('windowPopupKebijakanPengupahan').hide();
                            funcTabDataKebijakan(false);
                            storeGridKebijakanPengupahan.load();

                            Ext.getCmp('idkebijakanpengupahan').setValue(action.result.id);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridKebijakanPengupahan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wKebijakanPengupahan = Ext.create('widget.window', {
    id: 'windowPopupKebijakanPengupahan',
    title: 'Form Kebijakan Pengupahan',
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
    items: [formKebijakanPengupahan]
});

Ext.define('GridKebijakanPengupahanModel', {
    extend: 'Ext.data.Model',
    fields: ['idkebijakanpengupahan','kodekebijakan','namakebijakan','jenislevel','startdate','enddate','status','startdate','enddate','userin','datein'],
    idProperty: 'id'
});

var storeGridKebijakanPengupahan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridKebijakanPengupahanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/KebijakanPengupahan/kompensasi',
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
Ext.define('MY.searchGridKebijakanPengupahan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridKebijakanPengupahan',
    store: storeGridKebijakanPengupahan,
    width: 180
});
var smGridKebijakanPengupahan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridKebijakanPengupahan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteKebijakanPengupahan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteKebijakanPengupahan').enable();
        }
    }
});
Ext.define('GridKebijakanPengupahan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridKebijakanPengupahan,
    title: 'Kebijakan Pengupahan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridKebijakanPengupahanID',
    id: 'GridKebijakanPengupahanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridKebijakanPengupahan',
    store: storeGridKebijakanPengupahan,
    loadMask: true,
    columns: [
        {header: 'idkebijakanpengupahan', dataIndex: 'idkebijakanpengupahan', hidden: true},
        {header: 'Kode Kebijakan', dataIndex: 'kodekebijakan', minWidth: 150},
        {header: 'Nama Kebijakan', dataIndex: 'namakebijakan', minWidth: 150},
        {header: 'Jenis Level', dataIndex: 'jenislevel', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
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
                                roleid: 157
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wKebijakanPengupahan.show();
                                    Ext.getCmp('statusformKebijakanPengupahan').setValue('input');
                                    funcTabDataKebijakan(true);
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
                                roleid: 158
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                   var grid = Ext.ComponentQuery.query('GridKebijakanPengupahan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        funcTabDataKebijakan(false);
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formKebijakanPengupahan = Ext.getCmp('formKebijakanPengupahan');
                                        formKebijakanPengupahan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/KebijakanPengupahan/1/kompensasi',
                                            params: {
                                                extraparams: 'a.idkebijakanpengupahan:' + selectedRecord.data.idkebijakanpengupahan
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wKebijakanPengupahan.show();
                                        Ext.getCmp('statusformKebijakanPengupahan').setValue('edit');

                                        storeGridRulesUpahTetap.on('beforeload',function(store, operation,eOpts){
                                                operation.params={
                                                            'extraparams': 'a.idkebijakanpengupahan:'+selectedRecord.data.idkebijakanpengupahan
                                                          };
                                                      });
                                        storeGridRulesUpahTetap.load();
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
                    id: 'btnDeleteKebijakanPengupahan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 159
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
                                                var grid = Ext.ComponentQuery.query('GridKebijakanPengupahan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/KebijakanPengupahan/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridKebijakanPengupahan.remove(sm.getSelection());
                                                sm.select(0);
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
                    xtype: 'searchGridKebijakanPengupahan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridKebijakanPengupahan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridKebijakanPengupahan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
         
        }
    }
});

function funcTabDataKebijakan(opsi)
{
    var TabItemConfigKebijakan = Ext.getCmp('TabItemConfigKebijakan');
    TabItemConfigKebijakan.items.getAt(0).setDisabled(opsi);
    TabItemConfigKebijakan.items.getAt(1).setDisabled(opsi);
    TabItemConfigKebijakan.items.getAt(2).setDisabled(opsi);
    TabItemConfigKebijakan.items.getAt(3).setDisabled(opsi);
    // TabItemConfigKebijakan.items.getAt(5).setDisabled(opsi);
    // TabItemConfigKebijakan.items.getAt(6).setDisabled(opsi);
    // TabItemConfigKebijakan.items.getAt(7).setDisabled(opsi);
}