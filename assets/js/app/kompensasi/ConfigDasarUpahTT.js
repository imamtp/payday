
var formConfigDasarUpahTT = Ext.create('Ext.form.Panel', {
    id: 'formConfigDasarUpahTT',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigDasarUpahTT/kompensasi',
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
            name: 'statusformConfigDasarUpahTT',
            id: 'statusformConfigDasarUpahTT'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idconfigdasarupahtt',
            name: 'idconfigdasarupahtt'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idcompany',
            id:'idcompany_fConfigDasarUpahTT',
            name:'idcompany'
        },
        Ext.define('Ext.ux.companyname_fConfigDasarUpahTT', {
            labelWidth:140,
            width:470,
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.companyname_fConfigDasarUpahTT',
            name: 'companyname',
            editable: false,
            id: 'companyname_fConfigDasarUpahTT',
            fieldLabel: 'Perusahaan',
            emptyText: 'Pilih Perusahaan...',
            onTriggerClick: function() {
                 wGridCompanyConfigDasarUTTListPopup.show();
                 storeGridCompanyConfigDasarUTTList.load();
            }
        }),
         {
            xtype: 'textfield',
            fieldLabel: 'Kode Dasar Perhitungan',
            allowBlank: false,
            name: 'kodedasarupahtt'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Dasar Perhitungan',
            allowBlank: false,
            name: 'dasarupahtt'
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
                var win = Ext.getCmp('windowPopupConfigDasarUpahTT');
                Ext.getCmp('formConfigDasarUpahTT').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigDasarUpahTTSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigDasarUpahTT').getForm().reset();
                            Ext.getCmp('windowPopupConfigDasarUpahTT').hide();
                            storeGridconfigdasarupahtt.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridconfigdasarupahtt.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wConfigDasarUpahTT = Ext.create('widget.window', {
    id: 'windowPopupConfigDasarUpahTT',
    title: 'Form Dasar Perhitungan Upah Tidak Tetap',
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
    items: [formConfigDasarUpahTT]
});

Ext.define('GridconfigdasarupahttModel', {
    extend: 'Ext.data.Model',
    fields: ['idconfigdasarupahtt','idcompany','companyname','kodedasarupahtt','dasarupahtt','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridconfigdasarupahtt = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridconfigdasarupahttModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigDasarUpahTT/kompensasi',
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
Ext.define('MY.searchGridconfigdasarupahtt', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridconfigdasarupahtt',
    store: storeGridconfigdasarupahtt,
    width: 180
});
var smGridconfigdasarupahtt = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridconfigdasarupahtt.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigDasarUpahTT').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigDasarUpahTT').enable();
        }
    }
});
Ext.define('Gridconfigdasarupahtt', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridconfigdasarupahtt,
    title: 'Pengaturan Dasar Upah Tidak Tetap',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'Gridconfigdasarupahtt',
    id: 'Gridconfigdasarupahtt',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridconfigdasarupahtt',
    store: storeGridconfigdasarupahtt,
    loadMask: true,
    columns: [
        {header: 'idconfigdasarupahtt', dataIndex: 'idconfigdasarupahtt', hidden: true},
        {header: 'Kode Dasar Upah', dataIndex: 'kodedasarupahtt', minWidth: 150},
        {header: 'Nama Dasar Upah', dataIndex: 'dasarupahtt', minWidth: 150},
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
                        wConfigDasarUpahTT.show();
                        Ext.getCmp('statusformConfigDasarUpahTT').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('Gridconfigdasarupahtt')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formConfigDasarUpahTT = Ext.getCmp('formConfigDasarUpahTT');
                            formConfigDasarUpahTT.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/ConfigDasarUpahTT/1/kompensasi',
                                params: {
                                    extraparams: 'a.idconfigdasarupahtt:' + selectedRecord.data.idconfigdasarupahtt
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wConfigDasarUpahTT.show();
                            Ext.getCmp('statusformConfigDasarUpahTT').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteConfigDasarUpahTT',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('Gridconfigdasarupahtt')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/ConfigDasarUpahTT/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridconfigdasarupahtt.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridconfigdasarupahtt',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridconfigdasarupahtt, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridconfigdasarupahtt.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formConfigDasarUpahTT = Ext.getCmp('formConfigDasarUpahTT');
            wConfigDasarUpahTT.show();
            formConfigDasarUpahTT.getForm().load({
                url: SITE_URL + 'backend/loadFormData/ConfigDasarUpahTT/1/kompensasi',
                params: {
                    extraparams: 'a.idconfigdasarupahtt:' + record.data.idconfigdasarupahtt
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformConfigDasarUpahTT').setValue('edit');
        }
    }
});
