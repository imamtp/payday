Ext.define('GridConfigBenefitModel', {
    extend: 'Ext.data.Model',
    fields: ['idbenefit','idcompany','nip','kodebenefit','namabenefit','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','companyname'],
    idProperty: 'id'
});

var storeGridConfigBenefit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridConfigBenefitModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigBenefit/kompensasi',
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


var formConfigBenefit = Ext.create('Ext.form.Panel', {
    id: 'formConfigBenefit',
    width:'100%',
    // width: 800,
//    height: 300,
    url: SITE_URL + 'backend/saveform/ConfigBenefit/kompensasi',
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
    items: [
    {
        layout: 'hbox',
        defaults: {
            padding: '5 10 5 5'
        },            
        items: [
            {
                items: [ 
                            {
                                xtype: 'hiddenfield',
                                name: 'statusformConfigBenefit',
                                id: 'statusformConfigBenefit'
                            }, {
                                xtype: 'hiddenfield',
                                fieldLabel: 'idbenefit',
                                name: 'idbenefit'
                            },
                            {
                                xtype:'hiddenfield',
                                fieldLabel:'idcompany',
                                id:'idcompany_fConfigBenefit',
                                name:'idcompany'
                            },
                            Ext.define('Ext.ux.companyname_fConfigBenefit', {
                                labelWidth:140,
                                width:380,
                                extend: 'Ext.form.field.Trigger',
                                alias: 'widget.companyname_fConfigBenefit',
                                name: 'companyname',
                                editable: false,
                                id: 'companyname_fConfigBenefit',
                                fieldLabel: 'Perusahaan',
                                emptyText: 'Pilih Perusahaan...',
                                onTriggerClick: function() {
                                     wGridCompanyConfigBenefitListPopup.show();
                                     storeGridCompanyConfigBenefitList.load();
                                }
                            }),
                            {
                                xtype: 'textfield',
                                width:380,
                                fieldLabel: 'NIP',
                                name: 'nip'
                            },
                            {
                                xtype: 'checkboxgroup',
                                fieldLabel: 'Ditanggung Oleh',
                                listeners: {
                                    change: function(field, newValue, oldValue, eOpts){
                                        var fieldsetCmp = Ext.getCmp('fieldsetCmp');
                                        var fieldsetEmp = Ext.getCmp('fieldsetEmp');

                                        if(newValue.ditanggungperusahaan=='on')
                                        {
                                            fieldsetCmp.setDisabled(false);
                                        } else {
                                            fieldsetCmp.setDisabled(true);
                                        }

                                        if(newValue.ditanggungkaryawan=='on')
                                        {
                                            fieldsetEmp.setDisabled(false);
                                        } else {
                                            fieldsetEmp.setDisabled(true);
                                        }
                                        // console.log('change:' + newValue.ditanggungperusahaan + ' ' + newValue.ditanggungkaryawan);
                                    }
                                },
                                items: [
                                    {boxLabel: 'Perusahaan', id:'ditanggungperusahaan', width:120,name: 'ditanggungperusahaan',value:1},
                                    {boxLabel: 'Karyawan', id:'ditanggungkaryawan', name: 'ditanggungkaryawan',value:2}
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Ditanggung Perusahaan',
                                id:'fieldsetCmp',
                                disabled:true,
                                items: [{
                                            xtype: 'comboxJenisNilai',
                                            name: 'jenisnilaibenefitcmp',
                                            id: 'jenisnilaibenefitcmp',
                                            listeners: {
                                                select: {
                                                    fn: function(combo, value) {
                                                        setJenisNilaiBenefit(combo.getValue(),'cmp');
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'comboxdasarKomponenUpah',
                                            allowBlank:false,
                                            multiSelect:true,
                                            id:'komponenupahbenefitcmp',
                                            name:'komponenupahbenefitcmp[]'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Faktor Pembagi',
                                            id: 'pembagibenefitcmp',
                                            name: 'pembagibenefitcmp',
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
                                            id: 'angkatetapbenefitcmp',
                                            name: 'angkatetapbenefitcmp',
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
                                            id:'persenbenefitcmp',
                                            name:'persenbenefitcmp'
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
                                            name:'kenapajakcmp',
                                            listeners: {
                                                select: {
                                                    fn: function(combo, value) {
                                                        if(combo.getValue()=='YA')
                                                        {
                                                            setPajakBenefit(false,'cmp');
                                                        } else {
                                                            setPajakBenefit(true,'cmp');
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'comboxFungsiPajak',
                                            name:'fungsipajakcmp',
                                            id:'fungsipajakcmp',
                                            allowBlank: false
                                        },
                                        {
                                            xtype:'comboxHitungPajak',
                                            disabled:true,
                                            hidden:true,
                                            name:'hitungpajakcmp',
                                            id:'hitungpajakcmp'
                                            // allowBlank: false
                                        },
                                         {
                                            xtype:'comboxYaTidak',
                                            allowBlank: false,
                                            fieldLabel: 'Maksimum Plafon',
                                            id:'maxplafoncmp_cmb',
                                            name:'maxplafoncmp_cmb',
                                            listeners: {
                                                select: {
                                                    fn: function(combo, value) {
                                                        if(combo.getValue()=='YA')
                                                        {
                                                           Ext.getCmp('maxplafoncmp').setDisabled(false);
                                                        } else {
                                                          Ext.getCmp('maxplafoncmp').setDisabled(true);
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'numberfield',
                                            name:'maxplafoncmp',
                                            id:'maxplafoncmp',
                                            disabled:true,
                                            fieldLabel:'Jumlah Max Plafon',
                                            hideTrigger:true
                                            // listeners: {
                                            //     'render': function(c) {
                                            //         c.getEl().on('keyup', function() {
                                            //             this.setRawValue(renderNomor(this.getValue()));
                                            //         }, c);
                                            //     }
                                            // }
                                        }
                                    ]
                            }
                    ]
            },
            {
                items: [
                {
                    xtype: 'textfield',
                    width:380,
                    fieldLabel: 'Kode Benefit',
                    allowBlank: false,
                    name: 'kodebenefit'
                }, {
                    xtype: 'textfield',
                    width:380,
                    fieldLabel: 'Nama Benefit',
                    allowBlank: false,
                    name: 'namabenefit'
                },{
                    xtype:'displayfield'
                },
                            {
                                xtype: 'fieldset',
                                title: 'Ditanggung Karyawan (Pengurang Upah)',
                                id:'fieldsetEmp',
                                disabled:true,
                                items: [{
                                            xtype: 'comboxJenisNilai',
                                            name: 'jenisnilaibenefitemp',
                                            id: 'jenisnilaibenefitemp',
                                            listeners: {
                                                select: {
                                                    fn: function(combo, value) {
                                                        setJenisNilaiBenefit(combo.getValue(),'emp');
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'comboxdasarKomponenUpah',
                                            multiSelect:true,
                                            allowBlank:false,
                                            id:'komponenupahbenefitemp',
                                            name:'komponenupahbenefitemp[]'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Faktor Pembagi',
                                            id: 'pembagibenefitemp',
                                            name: 'pembagibenefitemp',
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
                                            id: 'angkatetapbenefitemp',
                                            name: 'angkatetapbenefitemp',
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
                                            id:'persenbenefitemp',
                                            name:'persenbenefitemp'                                            
                                        },
                                        {
                                            xtype:'comboxYaTidak',
                                            allowBlank: false,
                                            fieldLabel: 'Masuk Pajak',
                                            name:'kenapajakemp',
                                            listeners: {
                                                select: {
                                                    fn: function(combo, value) {
                                                        if(combo.getValue()=='YA')
                                                        {
                                                            setPajakBenefit(false,'emp');
                                                        } else {
                                                            setPajakBenefit(true,'emp');
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'comboxFungsiPajak',
                                            name:'fungsipajakemp',
                                            id:'fungsipajakemp',
                                            allowBlank: false
                                        },
                                        {
                                            xtype:'comboxHitungPajak',
                                            disabled:true,
                                            hidden:true,
                                            name:'hitungpajakemp',
                                            id:'hitungpajakemp'
                                            // allowBlank: false
                                        },
                                         {
                                            xtype:'comboxYaTidak',
                                            allowBlank: false,
                                            fieldLabel: 'Maksimum Plafon',
                                            id:'maxplafonemp_cmb',
                                            name:'maxplafonemp_cmb',
                                            listeners: {
                                                select: {
                                                    fn: function(combo, value) {
                                                        if(combo.getValue()=='YA')
                                                        {
                                                           Ext.getCmp('maxplafonemp').setDisabled(false);
                                                        } else {
                                                          Ext.getCmp('maxplafonemp').setDisabled(true);
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'numberfield',
                                            name:'maxplafonemp',
                                            id:'maxplafonemp',
                                            disabled:true,
                                            fieldLabel:'Jumlah Max Plafon',
                                            hideTrigger:true
                                            // listeners: {
                                            //     'render': function(c) {
                                            //         c.getEl().on('keyup', function() {
                                            //             this.setRawValue(renderNomor(this.getValue()));
                                            //         }, c);
                                            //     }
                                            // }
                                        }
                                    ]
                            }]
            }
        ]
    },
    // {
    //     xtype: 'datefield',
    //     width:380,
    //     format: 'd-m-Y',
    //     name:'startdate',
    //     allowBlank: false,
    //     fieldLabel: 'Tgl Aktivasi'
    // }, {
    //     xtype: 'datefield',
    //     width:380,
    //     format: 'd-m-Y',
    //     allowBlank: false,
    //     name:'enddate',
    //     fieldLabel: 'Tgl Terminasi'
    // },
    {
        xtype: 'displayfield'
    },
    Ext.panel.Panel({
                       html: "<div style='font-size:11px; font-style:italic;'>* : Koma (,) pada persentase menggunakan titik (.)</div>"
                   })],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupConfigBenefit');
                Ext.getCmp('formConfigBenefit').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnConfigBenefitSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formConfigBenefit').getForm().reset();
                            Ext.getCmp('windowPopupConfigBenefit').hide();
                            storeGridConfigBenefit.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridConfigBenefit.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wConfigBenefit = Ext.create('widget.window', {
    id: 'windowPopupConfigBenefit',
    title: 'Form Benefit',
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
    items: [formConfigBenefit]
});


Ext.define('MY.searchGridConfigBenefit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridConfigBenefit',
    store: storeGridConfigBenefit,
    width: 180
});
var smGridConfigBenefit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridConfigBenefit.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteConfigBenefit').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteConfigBenefit').enable();
        }
    }
});
Ext.define('GridConfigBenefit', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridConfigBenefit,
    title: 'Komponen Benefit',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GrididConfigBenefit',
    id: 'GrididConfigBenefit',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridConfigBenefit',
    store: storeGridConfigBenefit,
    loadMask: true,
    columns: [
        {header: 'idbenefit', dataIndex: 'idbenefit', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIP', dataIndex: 'nip', minWidth: 150},
        {header: 'Kode Benefit', dataIndex: 'kodebenefit', minWidth: 150},
        {header: 'Nama Benefit', dataIndex: 'namabenefit', minWidth: 150,flex:1},       
        // {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        // {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150}
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
                        Ext.getCmp('formConfigBenefit').getForm().reset();
                        
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 151
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                     wConfigBenefit.show();
                                    Ext.getCmp('statusformConfigBenefit').setValue('input');
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
                                roleid: 152
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                        kotakLoading();

                                        var grid = Ext.ComponentQuery.query('GridConfigBenefit')[0];
                                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                        var data = grid.getSelectionModel().getSelection();
                                        if (data.length == 0)
                                        {
                                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                        } else {
                                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                            var formConfigBenefit = Ext.getCmp('formConfigBenefit');
                                            formConfigBenefit.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/ConfigBenefit/1/kompensasi',
                                                params: {
                                                    extraparams: 'a.idbenefit:' + selectedRecord.data.idbenefit
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(action.response.responseText);

                                                    if(d.data.ditanggungperusahaan=='t')
                                                    {
                                                        Ext.getCmp('ditanggungperusahaan').setValue(true); 

                                                        setJenisNilaiBenefit(d.data.jenisnilaibenefitcmp,'cmp');

                                                        if(d.data.kenapajakcmp=='TIDAK')
                                                        {
                                                            Ext.getCmp('fungsipajakcmp').setDisabled(true);
                                                        } else {
                                                            Ext.getCmp('fungsipajakcmp').setDisabled(false);
                                                        }
                                                    }

                                                    if(d.data.ditanggungkaryawan=='t')
                                                    {
                                                        Ext.getCmp('ditanggungkaryawan').setValue(true); 

                                                        setJenisNilaiBenefit(d.data.jenisnilaibenefitemp,'emp');

                                                        if(d.data.kenapajakemp=='TIDAK')
                                                        {
                                                            Ext.getCmp('fungsipajakemp').setDisabled(true);
                                                        } else {
                                                            Ext.getCmp('fungsipajakemp').setDisabled(false);
                                                        }
                                                    }

                                                    Ext.Ajax.request({
                                                        url: SITE_URL+'kompensasi/getdasarkomponenBenefit',
                                                        method: 'POST',
                                                        params: { idbenefit: selectedRecord.data.idbenefit },
                                                        success: function(form, action) {
                                                            // console.log(form.responseText)
                                                            var str = form.responseText;
                                                            var strExp = explode('=',str);

                                                            var valUnitcmp = strExp[0].split(',');
                                                            var valUnitemp = strExp[1].split(',');
                                                            Ext.getCmp('komponenupahbenefitcmp').setValue(valUnitcmp);
                                                            Ext.getCmp('komponenupahbenefitemp').setValue(valUnitemp);
                                                            // formInventory.findField('namaunitFormInvX').setValue(valUnit);
                                                            Ext.Msg.hide();
                                                        },
                                                        failure: function(form, action) {
                                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                        }
                                                    });

                                                    if(d.data.maxplafoncmp=='' || d.data.maxplafoncmp=='0.00')
                                                    {
                                                        Ext.getCmp('maxplafoncmp_cmb').setValue('TIDAK');     
                                                        Ext.getCmp('maxplafoncmp').setDisabled(true); 
                                                    } else {
                                                        Ext.getCmp('maxplafoncmp_cmb').setValue('YA');
                                                        Ext.getCmp('maxplafoncmp').setDisabled(false);
                                                    }

                                                    if(d.data.maxplafonemp=='' || d.data.maxplafonemp=='0.00')
                                                    {
                                                        Ext.getCmp('maxplafonemp_cmb').setValue('TIDAK');     
                                                        Ext.getCmp('maxplafonemp').setDisabled(true); 
                                                    } else {
                                                        Ext.getCmp('maxplafonemp_cmb').setValue('YA');
                                                        Ext.getCmp('maxplafonemp').setDisabled(false);
                                                    }
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            })

                                            wConfigBenefit.show();
                                            dasarKomponenUpahStore.load();
                                            Ext.getCmp('statusformConfigBenefit').setValue('edit');

                                             
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
                    id: 'btnDeleteConfigBenefit',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 153
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
                                                var grid = Ext.ComponentQuery.query('GridConfigBenefit')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/ConfigBenefit/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridConfigBenefit.remove(sm.getSelection());
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
                    xtype: 'searchGridConfigBenefit',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridConfigBenefit, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridConfigBenefit.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formConfigBenefit = Ext.getCmp('formConfigBenefit');
            // wConfigBenefit.show();
            // formConfigBenefit.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/ConfigBenefit/1/kompensasi',
            //     params: {
            //         extraparams: 'a.idConfigBenefit:' + record.data.idConfigBenefit
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformConfigBenefit').setValue('edit');
        }
    }
});


function setJenisNilaiBenefit(val,tipe)
{
    if (val == 'Komponen Upah') {
        Ext.getCmp('komponenupahbenefit'+tipe).setDisabled(false);
        Ext.getCmp('pembagibenefit'+tipe).setDisabled(false);
        Ext.getCmp('angkatetapbenefit'+tipe).setDisabled(true);
        Ext.getCmp('persenbenefit'+tipe).setDisabled(true);
    } else if (val == 'Persentase') {
        Ext.getCmp('komponenupahbenefit'+tipe).setDisabled(false);
        Ext.getCmp('pembagibenefit'+tipe).setDisabled(true);
        Ext.getCmp('angkatetapbenefit'+tipe).setDisabled(true);
        Ext.getCmp('persenbenefit'+tipe).setDisabled(false);
    } else {
        //angka tetap
        Ext.getCmp('komponenupahbenefit'+tipe).setDisabled(true);
        Ext.getCmp('pembagibenefit'+tipe).setDisabled(true);
        Ext.getCmp('angkatetapbenefit'+tipe).setDisabled(false);
        Ext.getCmp('persenbenefit'+tipe).setDisabled(true);
    }
}

function setPajakBenefit(val,tipe)
{
    Ext.getCmp('fungsipajak'+tipe).setDisabled(val);
    Ext.getCmp('hitungpajak'+tipe).setDisabled(val);
}