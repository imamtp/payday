Ext.define('GridConfigPengurangUpahModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengurangupah','idcompany','kodepengurangupah','namapengurangupah','komponenpengurang','jenisnilaipengurang','faktorpembagipengurangupah','angkatetappengurangupah','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','persenpengurangupah','companyname'],
    idProperty: 'id'
});

var storeGridConfigPengurangUpah = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridConfigPengurangUpahModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigPengurangUpah/kompensasi',
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


var formConfigPengurangUpah = Ext.create('Ext.form.Panel', {
    id: 'formConfigPengurangUpah',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigPengurangUpah/kompensasi',
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
            name: 'statusformConfigPengurangUpah',
            id: 'statusformConfigPengurangUpah'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpengurangupah',
            name: 'idpengurangupah'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idcompany',
            id:'idcompany_fConfigPengurangUpah',
            name:'idcompany'
        },
        Ext.define('Ext.ux.companyname_fConfigPengurangUpah', {
            labelWidth:140,
            width:470,
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.companyname_fConfigPengurangUpah',
            name: 'companyname',
            editable: false,
            id: 'companyname_fConfigPengurangUpah',
            fieldLabel: 'Perusahaan',
            emptyText: 'Pilih Perusahaan...',
            onTriggerClick: function() {
                 wGridCompanyConfigPengurangUpahListPopup.show();
                 storeGridCompanyConfigPengurangUpahList.load();
            }
        }),
         {
            xtype: 'textfield',
            fieldLabel: 'Kode Pengurang Upah',
            allowBlank: false,
            name: 'kodepengurangupah'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Pengurang Upah',
            allowBlank: false,
            name: 'namapengurangupah'
        },
        {
            xtype: 'comboxJenisNilai',
            name: 'jenisnilaipengurang',
            id: 'jenisnilaipengurang',
            listeners: {
                select: {
                    fn: function(combo, value) {
                       setJenisNilaiPengurang(combo.getValue());
                    }
                }
            }
        },
        {
            xtype:'comboxdasarKomponenUpah',
            multiSelect:true,
            id:'komponenpengurang',
            name:'komponenpengurang[]'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Faktor Pembagi',
            id: 'faktorpembagipengurangupah',
            name: 'faktorpembagipengurangupah'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Angka Tetap',
            id: 'angkatetappengurangupah',
            name: 'angkatetappengurangupah'
        },
        {
                xtype:'textfield',
                fieldLabel:'Persentase',
                id:'persenpengurangupah',
                name:'persenpengurangupah'
            },
        // {
        //     xtype:'comboxYaTidak',
        //     allowBlank: false,
        //     fieldLabel: 'Masuk Pajak',
        //     name:'kenapajak',
        //     listeners: {
        //         select: {
        //             fn: function(combo, value) {
        //                 if(combo.getValue()=='YA')
        //                 {
        //                     Ext.getCmp('comboxFungsiPajakPotongan').setDisabled(false);
        //                     Ext.getCmp('comboxHitungPajakPotongan').setDisabled(false);
        //                 } else {
        //                     Ext.getCmp('comboxFungsiPajakPotongan').setDisabled(true);
        //                     Ext.getCmp('comboxHitungPajakPotongan').setDisabled(true);
        //                 }
        //             }
        //         }
        //     }
        // },
        // {
        //     xtype:'comboxFungsiPajak',
        //     id:'comboxFungsiPajakPotongan',
        //     allowBlank: false
        // },
        // {
        //     xtype:'comboxHitungPajak',
        //     hidden:true,
        //     id:'comboxHitungPajakPotongan',
        //     allowBlank: false
        // },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            allowBlank: false,
            fieldLabel: 'Tgl Aktivasi'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            fieldLabel: 'Tgl Akhir Aktivasi'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupConfigPengurangUpah');
                Ext.getCmp('formConfigPengurangUpah').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigPengurangUpahSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigPengurangUpah').getForm().reset();
                            Ext.getCmp('windowPopupConfigPengurangUpah').hide();
                            storeGridConfigPengurangUpah.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridConfigPengurangUpah.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wConfigPengurangUpah = Ext.create('widget.window', {
    id: 'windowPopupConfigPengurangUpah',
    title: 'Form Pengurang Upah',
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
    items: [formConfigPengurangUpah]
});


Ext.define('MY.searchGridConfigPengurangUpah', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridConfigPengurangUpah',
    store: storeGridConfigPengurangUpah,
    width: 180
});
var smGridConfigPengurangUpah = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridConfigPengurangUpah.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigPengurangUpah').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigPengurangUpah').enable();
        }
    }
});
Ext.define('GridConfigPengurangUpah', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridConfigPengurangUpah,
    title: 'Komponen Pengurang Upah',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GrididConfigPengurangUpah',
    id: 'GrididConfigPengurangUpah',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridConfigPengurangUpah',
    store: storeGridConfigPengurangUpah,
    loadMask: true,
    columns: [
        {header: 'idpengurangupah', dataIndex: 'idpengurangupah', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Pengurang Upah', dataIndex: 'kodepengurangupah', minWidth: 150},
        {header: 'Nama Pengurang Upah', dataIndex: 'namapengurangupah', minWidth: 150,flex:1},
        // {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        // {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        // {header: 'Fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
        {header: 'Faktor Pembagi Pengurang', dataIndex: 'faktorpembagipengurangupah', minWidth: 150},
        {header: 'Angka Tetap', dataIndex: 'angkatetappengurangupah', minWidth: 150},
        {header: 'Persentase', dataIndex: 'persenpengurangupah', minWidth: 150},
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
                                roleid: 154
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wConfigPengurangUpah.show();
                                    Ext.getCmp('statusformConfigPengurangUpah').setValue('input');
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
                                roleid: 155
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    kotakLoading();
                                    var grid = Ext.ComponentQuery.query('GridConfigPengurangUpah')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formConfigPengurangUpah = Ext.getCmp('formConfigPengurangUpah');
                                        formConfigPengurangUpah.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/ConfigPengurangUpah/1/kompensasi',
                                            params: {
                                                extraparams: 'a.idpengurangupah:' + selectedRecord.data.idpengurangupah
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);

                                                setJenisNilaiPengurang(d.data.jenisnilaipengurang);

                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                Ext.Ajax.request({
                                                    url: SITE_URL+'kompensasi/getdasarkomponenPengurang',
                                                    method: 'POST',
                                                    params: { idpengurangupah: selectedRecord.data.idpengurangupah },
                                                    success: function(form, action) {
                                                        // console.log(form.responseText)
                                                        var str = form.responseText;
                                                        var valUnit = str.split(',');
                                                        
                                                        Ext.getCmp('komponenpengurang').setValue(valUnit);
                                                        Ext.Msg.hide();
                                                        // formInventory.findField('namaunitFormInvX').setValue(valUnit);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                });
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wConfigPengurangUpah.show();
                                        dasarKomponenUpahStore.load();
                                        Ext.getCmp('statusformConfigPengurangUpah').setValue('edit');


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
                    id: 'btnDeleteConfigPengurangUpah',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 156
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
                                                var grid = Ext.ComponentQuery.query('GridConfigPengurangUpah')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/ConfigPengurangUpah/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridConfigPengurangUpah.remove(sm.getSelection());
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
                    xtype: 'searchGridConfigPengurangUpah',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridConfigPengurangUpah, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridConfigPengurangUpah.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formConfigPengurangUpah = Ext.getCmp('formConfigPengurangUpah');
            // wConfigPengurangUpah.show();
            // formConfigPengurangUpah.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/ConfigPengurangUpah/1/kompensasi',
            //     params: {
            //         extraparams: 'a.idConfigPengurangUpah:' + record.data.idConfigPengurangUpah
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformConfigPengurangUpah').setValue('edit');
        }
    }
});


function setJenisNilaiPengurang(val)
{
     if (val == 'Komponen Upah') {
            Ext.getCmp('komponenpengurang').setDisabled(false);
            Ext.getCmp('faktorpembagipengurangupah').setDisabled(false);
            Ext.getCmp('angkatetappengurangupah').setDisabled(true);
            Ext.getCmp('persenpengurangupah').setDisabled(true);
        } else if (val == 'Persentase') {
            Ext.getCmp('komponenpengurang').setDisabled(false);
            Ext.getCmp('faktorpembagipengurangupah').setDisabled(true);
            Ext.getCmp('angkatetappengurangupah').setDisabled(true);
            Ext.getCmp('persenpengurangupah').setDisabled(false);
        } else {
               Ext.getCmp('komponenpengurang').setDisabled(true);
                Ext.getCmp('faktorpembagipengurangupah').setDisabled(true);
                Ext.getCmp('angkatetappengurangupah').setDisabled(false);
                Ext.getCmp('persenpengurangupah').setDisabled(true);
            }
}
