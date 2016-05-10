Ext.define('GridConfigUpahTTBulanModel', {
    extend: 'Ext.data.Model',
    fields: ['idkomponenupah','idcompany','kodekomponen','namakomponen','dasarupahtt','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','jenisnilai','pembagi','angkatetap','persen','companyname'],
    idProperty: 'id'
});

var storeGridConfigUpahTTBulan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridConfigUpahTTBulanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigUpahTTBulan/kompensasi',
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

///////////////////////////////////////////////////////////////


var formConfigUpahTTBulan = Ext.create('Ext.form.Panel', {
    id: 'formConfigUpahTTBulan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigUpahTTBulan/kompensasi',
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
            name: 'statusformConfigUpahTTBulan',
            id: 'statusformConfigUpahTTBulan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkomponenupah',
            name: 'idkomponenupah'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idcompany',
            id:'idcompany_fConfigUpahTTBulan',
            name:'idcompany'
        },
        Ext.define('Ext.ux.companyname_fConfigUpahTTBulan', {
            labelWidth:140,
            width:470,
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.companyname_fConfigUpahTTBulan',
            name: 'companyname',
            editable: false,
            id: 'companyname_fConfigUpahTTBulan',
            fieldLabel: 'Perusahaan',
            emptyText: 'Pilih Perusahaan...',
            onTriggerClick: function() {
                 wGridCompanyConfigUTTBulanListPopup.show();
                 storeGridCompanyConfigUTTBulanList.load();
            }
        }),
         {
            xtype: 'textfield',
            fieldLabel: 'Kode Komponen',
            allowBlank: false,
            name: 'kodekomponen'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Komponen',
            allowBlank: false,
            name: 'namakomponen'
        },
        // {
        //     xtype:'comboxdasarPerhitunganUTT',
        //     name:'dasarupahtt'
        // },
        {
            xtype: 'comboxJenisNilai',
            name: 'jenisnilai',
            id: 'jenisnilai_fConfigUpahTTBulan',
            listeners: {
                select: {
                    fn: function(combo, value) {
                        setJenisNilaiUTTBulan(combo.getValue());
                    }
                }
            }
        },
        {
            xtype:'comboxdasarKomponenUpah',
            multiSelect:true,
            id:'idconfigupahTTBulan',
            name:'komponenupah[]'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Faktor Pembagi',
            id: 'pembagi_fConfigUpahTTBulan',
            name: 'pembagi',
            fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Angka Tetap',
            id: 'angkatetap_fConfigUpahTTBulan',
            name: 'angkatetap',
            fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
        },
        {
            xtype:'textfield',
            fieldLabel:'Persentase *',
            id:'persenuttbulan_fConfigUpahTTBulan',
            name:'persen'
            // fieldStyle: 'text-align: right;',
            //     listeners: {
            //         'render': function(c) {
            //             c.getEl().on('keyup', function() {
            //                 this.setRawValue(renderNomor(this.getValue()));
            //                 // updateSelisih();
            //             }, c);
            //         }
            //     }
        },
        {
            xtype:'comboxYaTidak',
            allowBlank: false,
            fieldLabel: 'Masuk Pajak',
            name:'kenapajak',
            listeners: {
                select: {
                    fn: function(combo, value) {
                        if(combo.getValue()=='YA')
                        {
                            Ext.getCmp('comboxFungsiPajakConfigUTT').setDisabled(false);
                        } else {
                            Ext.getCmp('comboxFungsiPajakConfigUTT').setDisabled(true);
                        }
                    }
                }
            }
        },
        {
            xtype:'comboxFungsiPajak',
            id:'comboxFungsiPajakConfigUTT',
            allowBlank: false
        },
        // {
        //     xtype:'comboxHitungPajak',
        //     hidden:true,
        //     allowBlank: false
        // },
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
                var win = Ext.getCmp('windowPopupConfigUpahTTBulan');
                Ext.getCmp('formConfigUpahTTBulan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigUpahTTBulanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigUpahTTBulan').getForm().reset();
                            Ext.getCmp('windowPopupConfigUpahTTBulan').hide();
                            storeGridConfigUpahTTBulan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridConfigUpahTTBulan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wConfigUpahTTBulan = Ext.create('widget.window', {
    id: 'windowPopupConfigUpahTTBulan',
    title: 'Form Komponen Upah Tidak Tetap Bulanan',
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
    items: [formConfigUpahTTBulan]
});


Ext.define('MY.searchGridConfigUpahTTBulan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridConfigUpahTTBulan',
    store: storeGridConfigUpahTTBulan,
    width: 180
});
var smGridConfigUpahTTBulan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridConfigUpahTTBulan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigUpahTTBulan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigUpahTTBulan').enable();
        }
    }
});
Ext.define('GridConfigUpahTTBulan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridConfigUpahTTBulan,
    title: 'Komponen Upah Tidak Tetap Bulanan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GrididConfigUpahTTBulan',
    id: 'GrididConfigUpahTTBulan',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridConfigUpahTTBulan',
    store: storeGridConfigUpahTTBulan,
    loadMask: true,
    columns: [
        {header: 'idkomponenupah', dataIndex: 'idkomponenupah', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode komponen', dataIndex: 'kodekomponen', minWidth: 150},
        {header: 'Nama komponen', dataIndex: 'namakomponen', minWidth: 150,flex:1},
       // {header: 'Dasar Upah', dataIndex: 'dasarupahtt', minWidth: 150},
        {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        // {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        // {header: 'user in', dataIndex: 'userin', minWidth: 150},
        // {header: 'date in', dataIndex: 'datein', minWidth: 150}
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
                                roleid: 1
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wConfigUpahTTBulan.show();
                                    Ext.getCmp('statusformConfigUpahTTBulan').setValue('input');
                                    dasarPerhitunganUTTStore.load();
                                    dasarKomponenUpahStore.load();
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
                                roleid: 143
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridConfigUpahTTBulan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formConfigUpahTTBulan = Ext.getCmp('formConfigUpahTTBulan');
                                        formConfigUpahTTBulan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/ConfigUpahTTBulan/1/kompensasi',
                                            params: {
                                                extraparams: 'a.idkomponenupah:' + selectedRecord.data.idkomponenupah
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                setJenisNilaiUTTBulan(d.data.jenisnilai);
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wConfigUpahTTBulan.show();
                                        Ext.getCmp('statusformConfigUpahTTBulan').setValue('edit');
                                        dasarPerhitunganUTTStore.load();
                                         dasarKomponenUpahStore.load();

                                         Ext.Ajax.request({
                                                url: SITE_URL+'kompensasi/getdasarkomponenupah',
                                                method: 'POST',
                                                params: { idkomponenupah: selectedRecord.data.idkomponenupah },
                                                success: function(form, action) {
                                                    // console.log(form.responseText)
                                                    var str = form.responseText;
                                                    var valUnit = str.split(',');
                                                    Ext.getCmp('idconfigupahTTBulan').setValue(valUnit);
                                                    // formInventory.findField('namaunitFormInvX').setValue(valUnit);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            });
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
                    id: 'btnDeleteConfigUpahTTBulan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 144
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
                                                var grid = Ext.ComponentQuery.query('GridConfigUpahTTBulan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/ConfigUpahTTBulan/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridConfigUpahTTBulan.remove(sm.getSelection());
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
                    xtype: 'searchGridConfigUpahTTBulan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridConfigUpahTTBulan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridConfigUpahTTBulan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formConfigUpahTTBulan = Ext.getCmp('formConfigUpahTTBulan');
            // wConfigUpahTTBulan.show();
            // formConfigUpahTTBulan.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/ConfigUpahTTBulan/1/kompensasi',
            //     params: {
            //         extraparams: 'a.idConfigUpahTTBulan:' + record.data.idConfigUpahTTBulan
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformConfigUpahTTBulan').setValue('edit');
        }
    }
});


function setJenisNilaiUTTBulan(val)
{
    if (val == 'Komponen Upah') {
        Ext.getCmp('idconfigupahTTBulan').setDisabled(false);
        Ext.getCmp('pembagi_fConfigUpahTTBulan').setDisabled(false);
        Ext.getCmp('angkatetap_fConfigUpahTTBulan').setDisabled(true);
        Ext.getCmp('persenuttbulan_fConfigUpahTTBulan').setDisabled(true);
    } else if (val == 'Persentase') {
        Ext.getCmp('idconfigupahTTBulan').setDisabled(false);
        Ext.getCmp('pembagi_fConfigUpahTTBulan').setDisabled(true);
        Ext.getCmp('angkatetap_fConfigUpahTTBulan').setDisabled(true);
        Ext.getCmp('persenuttbulan_fConfigUpahTTBulan').setDisabled(false);
    } else {
        //angka tetap
        Ext.getCmp('idconfigupahTTBulan').setDisabled(true);
        Ext.getCmp('pembagi_fConfigUpahTTBulan').setDisabled(true);
        Ext.getCmp('angkatetap_fConfigUpahTTBulan').setDisabled(false);
        Ext.getCmp('persenuttbulan_fConfigUpahTTBulan').setDisabled(true);
    }
}