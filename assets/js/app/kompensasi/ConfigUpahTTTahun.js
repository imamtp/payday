Ext.define('GridConfigUpahTTTahunModel', {
    extend: 'Ext.data.Model',
    fields: ['idkomponenupah','idcompany','kodekomponen','namakomponen','dasarupahtt','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','companyname'],
    idProperty: 'id'
});

var storeGridConfigUpahTTTahun = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridConfigUpahTTTahunModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigUpahTTTahun/kompensasi',
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


var formConfigUpahTTTahun = Ext.create('Ext.form.Panel', {
    id: 'formConfigUpahTTTahun',
    title:'Komponen',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigUpahTTTahun/kompensasi',
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
            name: 'statusformConfigUpahTTTahun',
            id: 'statusformConfigUpahTTTahun'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idkomponenupah',
            id:'idkomponenupah_fConfigUpahTTTahun',
            name: 'idkomponenupah'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idcompany',
            id:'idcompany_fConfigUpahTTTahun',
            name:'idcompany'
        },
        Ext.define('Ext.ux.companyname_fConfigUpahTTTahun', {
            labelWidth:140,
            width:470,
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.companyname_fConfigUpahTTTahun',
            name: 'companyname',
            editable: false,
            id: 'companyname_fConfigUpahTTTahun',
            fieldLabel: 'Perusahaan',
            emptyText: 'Pilih Perusahaan...',
            onTriggerClick: function() {
                 wGridCompanyConfigUTTTahunListPopup.show();
                 storeGridCompanyConfigUTTTahunList.load();
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
        {
            xtype: 'comboxJenisNilai',
            name: 'jenisnilai',
            id: 'jenisnilai_fConfigUpahTTTahun',
            listeners: {
                select: {
                    fn: function(combo, value) {
                        setJenisNilaiUTTTahun(combo.getValue());
                    }
                }
            }
        },
        {
            xtype:'comboxdasarPerhitunganUTT',
            hidden:true,
            name:'dasarupahtt'
        },
        {
            xtype:'comboxdasarKomponenUpah',
            multiSelect:true,
            id:'idconfigupahTTTahun',
            name:'komponenupah[]'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Faktor Pembagi',
            id: 'pembagi_fConfigUpahTTTahun',
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
            id: 'angkatetap_fConfigUpahTTTahun',
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
            id:'persenuttbulan_fConfigUpahTTTahun',
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
            fieldLabel: 'Kena Pajak',
            name:'kenapajak',
            listeners: {
                select: {
                    fn: function(combo, value) {
                        if(combo.getValue()=='TIDAK')
                        {
                            Ext.getCmp('comboxFungsiPajak_configUTTtahun').setDisabled(true);
                        } else {
                            Ext.getCmp('comboxFungsiPajak_configUTTtahun').setDisabled(false);
                        }
                    }
                }
            }
        },
        {
            xtype:'comboxFungsiPajak',
            id:'comboxFungsiPajak_configUTTtahun',
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
                var win = Ext.getCmp('windowPopupConfigUpahTTTahun');
                Ext.getCmp('formConfigUpahTTTahun').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigUpahTTTahunSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigUpahTTTahun').getForm().reset();
                            Ext.getCmp('windowPopupConfigUpahTTTahun').hide();
                            storeGridConfigUpahTTTahun.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridConfigUpahTTTahun.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

Ext.define('TabItemConfigTTTahun', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemConfigTTTahun',
    alias: 'widget.TabItemConfigTTTahun',
    activeTab: 0,
    // plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    listeners: {
        render: function() {
            this.items.each(function(i){               
                i.tab.on('click', function(){
                    // alert(i.title);
                    var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    if(i.title=='Jadwal Pengupahan')
                    {
                        storeGridJadwalUpahTahunan.on('beforeload',function(store, operation,eOpts){
                                operation.params={
                                            'extraparams': 'a.idkomponenupah:'+Ext.getCmp('idkomponenupah_fConfigUpahTTTahun').getValue()
                                          };
                                      });
                        storeGridJadwalUpahTahunan.load();
                    } 
                    // else if(i.title=='Benefit')
                    // {
                    //     var formBenefit = Ext.getCmp('formBenefit');
                    //         formBenefit.getForm().load({
                    //             url: SITE_URL + 'backend/loadFormData/Benefit/1/personalia',
                    //             params: {
                    //                 extraparams: 'a.idpelamar:' + idpelamar
                    //             },
                    //             success: function(form, action) {
                    //                 var d = Ext.decode(action.response.responseText);
                    //                 // alert(d.data.nomorktp)
                    //                 // Ext.getCmp('idpelamar_fIdentitas').setValue(idpelamar);

                    //                 // if(Ext.getCmp('nomorktp_fIdentitas').getValue()=='')
                    //                 // {
                    //                 //     Ext.getCmp('statusformIdentitas').setValue('input');
                    //                 // } else {
                    //                     Ext.getCmp('statusformBenefit').setValue('edit');
                    //                 // }
                    //             },
                    //             failure: function(form, action) {
                    //                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    //                  Ext.getCmp('statusformBenefit').setValue('input');
                    //             }
                    //         })
                    //     Ext.getCmp('idpelamar_fBenefit').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                    // }

                });
            });
        }
    },
    items: [
        formConfigUpahTTTahun,
        {
            xtype:'GridJadwalUpahTahunan',
            listeners: {
                activate: function() {
                    // storeGridPekerjaan.on('beforeload',function(store, operation,eOpts){
                    // operation.params={
                    //             'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                    //           };
                    //       });
                    // storeGridPekerjaan.load();
                }
            }
        }
    ]
});


var wConfigUpahTTTahun = Ext.create('widget.window', {
    id: 'windowPopupConfigUpahTTTahun',
    title: 'Form Komponen Upah Tidak Tetap Tahunan',
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
    items: [{
        xtype:'TabItemConfigTTTahun'
    }]
});


Ext.define('MY.searchGridConfigUpahTTTahun', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridConfigUpahTTTahun',
    store: storeGridConfigUpahTTTahun,
    width: 180
});
var smGridConfigUpahTTTahun = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridConfigUpahTTTahun.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigUpahTTTahun').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigUpahTTTahun').enable();
        }
    }
});
Ext.define('GridConfigUpahTTTahun', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridConfigUpahTTTahun,
    title: 'Komponen Upah Tidak Tetap Tahunan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GrididConfigUpahTTTahun',
    id: 'GrididConfigUpahTTTahun',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridConfigUpahTTTahun',
    store: storeGridConfigUpahTTTahun,
    loadMask: true,
    columns: [
        {header: 'idkomponenupah', dataIndex: 'idkomponenupah', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode komponen', dataIndex: 'kodekomponen', minWidth: 150},
        {header: 'Nama komponen', dataIndex: 'namakomponen', minWidth: 150},
       // {header: 'Dasar Upah', dataIndex: 'dasarupahtt', minWidth: 150},
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
                        Ext.getCmp('formConfigUpahTTTahun').getForm().reset();
                        
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 145
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wConfigUpahTTTahun.show();
                                    Ext.getCmp('statusformConfigUpahTTTahun').setValue('input');
                                    dasarPerhitunganUTTStore.load();
                                    dasarKomponenUpahStore.load();

                                    var TabItemConfigTTTahun = Ext.getCmp('TabItemConfigTTTahun');
                                    TabItemConfigTTTahun.items.getAt(1).setDisabled(true);    
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
                                roleid: 146
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridConfigUpahTTTahun')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        Ext.getCmp('idconfigupahTTTahun').setDisabled(false);
                                        Ext.getCmp('angkatetap_fConfigUpahTTTahun').setDisabled(false);
                                        Ext.getCmp('persenuttbulan_fConfigUpahTTTahun').setDisabled(false);
                                        Ext.getCmp('pembagi_fConfigUpahTTTahun').setDisabled(false);
                                                    
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formConfigUpahTTTahun = Ext.getCmp('formConfigUpahTTTahun');
                                        formConfigUpahTTTahun.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/ConfigUpahTTTahun/1/kompensasi',
                                            params: {
                                                extraparams: 'a.idkomponenupah:' + selectedRecord.data.idkomponenupah
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                console.log(d);
                                                if(d.data.jenisnilai=='Komponen Upah')
                                                {
                                                    Ext.getCmp('angkatetap_fConfigUpahTTTahun').setDisabled(true);
                                                    Ext.getCmp('persenuttbulan_fConfigUpahTTTahun').setDisabled(true);
                                                } else if(d.data.jenisnilai=='Nilai Tetap')
                                                    {
                                                        Ext.getCmp('idconfigupahTTTahun').setDisabled(true);
                                                        Ext.getCmp('pembagi_fConfigUpahTTTahun').setDisabled(true);
                                                        Ext.getCmp('persenuttbulan_fConfigUpahTTTahun').setDisabled(true);
                                                    } else if(d.data.jenisnilai=='Persentase')
                                                        {
                                                            Ext.getCmp('pembagi_fConfigUpahTTTahun').setDisabled(true);
                                                            Ext.getCmp('angkatetap_fConfigUpahTTTahun').setDisabled(true);
                                                        }
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wConfigUpahTTTahun.show();
                                        Ext.getCmp('statusformConfigUpahTTTahun').setValue('edit');
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
                                                    Ext.getCmp('idconfigupahTTTahun').setValue(valUnit);
                                                    // formInventory.findField('namaunitFormInvX').setValue(valUnit);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            });

                                        var TabItemConfigTTTahun = Ext.getCmp('TabItemConfigTTTahun');
                                        TabItemConfigTTTahun.items.getAt(1).setDisabled(false);    
                                        TabItemConfigTTTahun.setActiveTab(0);
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
                    id: 'btnDeleteConfigUpahTTTahun',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 147
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
                                                var grid = Ext.ComponentQuery.query('GridConfigUpahTTTahun')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/ConfigUpahTTTahun/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridConfigUpahTTTahun.remove(sm.getSelection());
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
                    xtype: 'searchGridConfigUpahTTTahun',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridConfigUpahTTTahun, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridConfigUpahTTTahun.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formConfigUpahTTTahun = Ext.getCmp('formConfigUpahTTTahun');
            // wConfigUpahTTTahun.show();
            // formConfigUpahTTTahun.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/ConfigUpahTTTahun/1/kompensasi',
            //     params: {
            //         extraparams: 'a.idConfigUpahTTTahun:' + record.data.idConfigUpahTTTahun
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformConfigUpahTTTahun').setValue('edit');
        }
    }
});

function setJenisNilaiUTTTahun(val)
{
    if (val == 'Komponen Upah') {
        Ext.getCmp('idconfigupahTTTahun').setDisabled(false);
        Ext.getCmp('pembagi_fConfigUpahTTTahun').setDisabled(false);
        Ext.getCmp('angkatetap_fConfigUpahTTTahun').setDisabled(true);
        Ext.getCmp('persenuttbulan_fConfigUpahTTTahun').setDisabled(true);
    } else if (val == 'Persentase') {
        Ext.getCmp('idconfigupahTTTahun').setDisabled(false);
        Ext.getCmp('pembagi_fConfigUpahTTTahun').setDisabled(true);
        Ext.getCmp('angkatetap_fConfigUpahTTTahun').setDisabled(true);
        Ext.getCmp('persenuttbulan_fConfigUpahTTTahun').setDisabled(false);
    } else {
        //angka tetap
        Ext.getCmp('idconfigupahTTTahun').setDisabled(true);
        Ext.getCmp('pembagi_fConfigUpahTTTahun').setDisabled(true);
        Ext.getCmp('angkatetap_fConfigUpahTTTahun').setDisabled(false);
        Ext.getCmp('persenuttbulan_fConfigUpahTTTahun').setDisabled(true);
    }
}