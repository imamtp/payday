
var formConfigUmumLembur = Ext.create('Ext.form.Panel', {
    id: 'formConfigUmumLembur',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigUmumLembur/kompensasi',
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
            name: 'statusformConfigUmumLembur',
            id: 'statusformConfigUmumLembur'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpengaturanlembur',
            name: 'idpengaturanlembur'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idcompany',
            id:'idcompany_fConfigUmumLembur',
            name:'idcompany'
        },
        Ext.define('Ext.ux.companyname_fConfigUmumLembur', {
            labelWidth:140,
            width:470,
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.companyname_fConfigUmumLembur',
            name: 'companyname',
            editable: false,
            id: 'companyname_fConfigUmumLembur',
            fieldLabel: 'Perusahaan',
            emptyText: 'Pilih Perusahaan...',
            onTriggerClick: function() {
                 wGridCompanyConfigLemburListPopup.show();
                 storeGridCompanyConfigLemburList.load();
            }
        }),
         {
            xtype: 'textfield',
            fieldLabel: 'Kode Pengaturan Lembur',
            allowBlank: false,
            name: 'kodepenglembur'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Pengaturan Lembur',
            allowBlank: false,
            name: 'namapenglembur'
        },
        {
            xtype:'comboxYaTidak',
            allowBlank: false,
            fieldLabel: 'Masuk Pajak',
            name:'kenapajak'
        },
        {
            xtype:'comboxFungsiPajak',
            allowBlank: false
        },
        {
            xtype:'comboxHitungPajak',
            allowBlank: false
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai Berlaku'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Akhir Berlaku'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupConfigUmumLembur');
                Ext.getCmp('formConfigUmumLembur').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigUmumLemburSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigUmumLembur').getForm().reset();
                            Ext.getCmp('windowPopupConfigUmumLembur').hide();
                            storeGridpengaturanlembur.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridpengaturanlembur.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wConfigUmumLembur = Ext.create('widget.window', {
    id: 'windowPopupConfigUmumLembur',
    title: 'Form Pengaturan Umum Lebur',
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
    items: [formConfigUmumLembur]
});

Ext.define('GridpengaturanlemburModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengaturanlembur','idcompany','kodepenglembur','namapenglembur','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridpengaturanlembur = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpengaturanlemburModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigUmumLembur/kompensasi',
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
Ext.define('MY.searchGridpengaturanlembur', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpengaturanlembur',
    store: storeGridpengaturanlembur,
    width: 180
});
var smGridpengaturanlembur = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpengaturanlembur.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigUmumLembur').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigUmumLembur').enable();
        }
    }
});
Ext.define('Gridpengaturanlembur', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridpengaturanlembur,
    title: 'Pengaturan Umum Lembur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'Grididpengaturanlembur',
    id: 'Grididpengaturanlembur',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridpengaturanlembur',
    store: storeGridpengaturanlembur,
    loadMask: true,
    columns: [
        {header: 'idpengaturanlembur', dataIndex: 'idpengaturanlembur', hidden: true},
        {header: 'Kode Pengaturan', dataIndex: 'kodepenglembur', minWidth: 150},
        {header: 'Nama Pengaturan', dataIndex: 'namapenglembur', minWidth: 150},
        {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
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
                        wConfigUmumLembur.show();
                        Ext.getCmp('statusformConfigUmumLembur').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('Gridpengaturanlembur')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formConfigUmumLembur = Ext.getCmp('formConfigUmumLembur');
                            formConfigUmumLembur.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/ConfigUmumLembur/1/kompensasi',
                                params: {
                                    extraparams: 'a.idpengaturanlembur:' + selectedRecord.data.idpengaturanlembur
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wConfigUmumLembur.show();
                            Ext.getCmp('statusformConfigUmumLembur').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteConfigUmumLembur',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Hapus data terpilih ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('Gridpengaturanlembur')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/ConfigUmumLembur/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridpengaturanlembur.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridpengaturanlembur',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridpengaturanlembur, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpengaturanlembur.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formConfigUmumLembur = Ext.getCmp('formConfigUmumLembur');
            wConfigUmumLembur.show();
            formConfigUmumLembur.getForm().load({
                url: SITE_URL + 'backend/loadFormData/ConfigUmumLembur/1/kompensasi',
                params: {
                    extraparams: 'a.idpengaturanlembur:' + record.data.idpengaturanlembur
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformConfigUmumLembur').setValue('edit');
        }
    }
});
