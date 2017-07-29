Ext.define('GridSeleksiPelamarModel', {
    extend: 'Ext.data.Model',
    fields: ['idcalonpelamar','idpelamar','idpermintaantk','nik','idlevel','namalokasi','rencanatglmasuk','tanggalakhirkontrak','namalengkap','noktp','nomorpermintaantk','namajabatan','levelname','namaorg','namajabatanatasan','namaatasan','kekaryaanname','statuscalon','levelindividu','userin','datein','companyname'],
    idProperty: 'id'
});

var storeGridSeleksiPelamar = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSeleksiPelamarModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SeleksiPelamar/rekrutmen',
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

storeGridSeleksiPelamar.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.statuscalon:'+Ext.getCmp('comboxstatusPelamar_seleksiPelamar').getValue()
                  };
              });

var formSeleksiPelamar = Ext.create('Ext.form.Panel', {
    id: 'formSeleksiPelamar',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/SeleksiPelamar/rekrutmen',
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
            name: 'statusformSeleksiPelamar',
            id: 'statusformSeleksiPelamar'
        }, {
            xtype: 'hiddenfield',
            name: 'idcalonpelamar'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamar_fSeleksiPelamar',
            name: 'idpelamar'
        },
        {
            xtype: 'hiddenfield',
            id: 'companyname_fSeleksiPelamar',
            name: 'companyname'
        },
        Ext.define('Ext.ux.namajabatan_fPermintaan', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namajabatan_fPermintaan',
            fieldLabel: 'Nama Pelamar',
            allowBlank: false,
            editable:false,
            id: 'namalengkap_fSeleksiPelamar',
            name: 'namalengkap',
            emptyText: 'Pilih Pelamar...',
            onTriggerClick: function() {
               wGridPelamarListPopup.show();
                        // storeGridPelamarList.on('beforeload',function(store, operation,eOpts){
                        //     operation.params={
                        //                 'extraparams': 'a.status:Diajukan'
                        //     };
                        // });
                        storeGridPelamarList.load();
            }
        }),
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Nama Pelamar',
        //     allowBlank: false,
        //     id: 'namalengkap_fSeleksiPelamar',
        //     name: 'namalengkap',
        //     listeners: {
        //         render: function(component) {
        //             component.getEl().on('click', function(event, el) {
        //                 wGridPelamarListPopup.show();
        //                 storeGridPelamarList.on('beforeload',function(store, operation,eOpts){
        //                             operation.params={
        //                                         'extraparams': 'a.status:Diajukan'
        //                             };
        //                         });
        //                         storeGridPelamarList.load();
        //             });
        //         }
        //     }
        // },
        {
            xtype: 'hiddenfield',
            id: 'idpermintaantk_fSeleksiPelamar',
            name: 'idpermintaantk'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No PTK',
            allowBlank: false,
            id:'nomorpermintaantk_fSeleksiPelamar',
            name: 'nomorpermintaantk',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wGridPermintaanTkListPopup.show();
                        // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                        //             operation.params={
                        //                         'extraparams': 'a.status:Pelamar'
                        //             };
                        //         });
                                storeGridPermintaanTkList.load();
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan',
            readOnly: true,
            id: 'namajabatan_fSeleksiPelamar',
            name: 'namajabatan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Level Jabatan',
            readOnly: true,
            id: 'levelname_fSeleksiPelamar',
            name: 'levelnamejabatan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi',
            readOnly: true,
            id: 'namaorg_fSeleksiPelamar',
            name: 'namaorg'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan Atasan',
            readOnly: true,
            id: 'namajabatanatasan_fSeleksiPelamar',
            name: 'namajabatanatasan'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamaratasan_fSeleksiPelamar',
            name: 'idpelamaratasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Atasan',
            readOnly: true,
            id: 'namaatasan_fSeleksiPelamar',
            name: 'namaatasan'
        },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Status Kekaryawanan',
        //     readOnly: true,
        //     id: 'kekaryaanname_fSeleksiPelamar',
        //     name: 'kekaryaanname'
        // },
        {
            xtype: 'textfield',
            fieldLabel: 'NIK',
            allowBlank: false,
            name: 'nik'
        },
        {
            xtype:'comboxlevel',
            allowBlank: false,
            fieldLabel: 'Level Individu',
            name:'levelindividu'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'rencanatglmasuk',
            id:'rencanatglmasuk_fSeleksiPelamar',
            fieldLabel: 'Rencana Tgl Masuk'
        },
        // {
        //     xtype:'comboxjeniskontrak',
        //     id: 'kekaryaanname_fSeleksiPelamar'
        // },
        {
            xtype:'comboxkekaryaan',
            id: 'kekaryaanname_fSeleksiPelamar',
            allowBlank:false,
            listeners: {
                change: function(field, newValue, oldValue) {
                    if(newValue=='TETAP')
                    {
                        Ext.getCmp('periodekekaryaan_fSeleksiPelamar').setDisabled(true);
                        Ext.getCmp('jumlahbulankekaryaan_fSeleksiPelamar').setDisabled(true);
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setValue('31-12-9999');
                    } else if(newValue=='PERCOBAAN')
                    {
                        Ext.getCmp('periodekekaryaan_fSeleksiPelamar').setDisabled(true);
                        Ext.getCmp('jumlahbulankekaryaan_fSeleksiPelamar').setDisabled(true);
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setValue('31-12-9999');
                    } else if(newValue=='KONTRAK')
                    {
                        Ext.getCmp('periodekekaryaan_fSeleksiPelamar').setDisabled(false);
                        Ext.getCmp('jumlahbulankekaryaan_fSeleksiPelamar').setDisabled(false);
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setDisabled(false);
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setReadOnly(true);
                    }
                }
            }
        },
        {
            xtype: 'radiogroup',
            allowBlank:false,
            id:'periodekekaryaan_fSeleksiPelamar',
            fieldLabel: 'Periode Kekaryawanan',
            items: [
               {boxLabel: 'Bulan', name: 'periodekekaryaan', width:70, inputValue: 1},
                {boxLabel: 'Tanggal', name: 'periodekekaryaan', width:70, inputValue: 2},
            ],
            listeners: {
                change: function(field, newValue, oldValue) {
                    // var value = newValue.show;
                    // console.log(value)
                    // console.log(newValue.periodekekaryaan)
                    // if (Ext.isArray(value)) {
                    //     return;
                    // }
                    if (newValue.periodekekaryaan == 1) {
                        Ext.getCmp('jumlahbulankekaryaan_fSeleksiPelamar').setDisabled(false);
                        // Ext.getCmp('tglakhirkekaryaan').setDisabled(true);
                    } else if (newValue.periodekekaryaan == 2){
                        Ext.getCmp('jumlahbulankekaryaan_fSeleksiPelamar').setDisabled(true);
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setDisabled(false);
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setReadOnly(false);
                    }
                }
            }
        },
        {
            xtype: 'numberfield',
            allowBlank:false,
            // hidden:true,
            fieldLabel: 'Jumlah Bulan',
            // allowBlank: false,
            // value:1,
            minValue:1,
            id: 'jumlahbulankekaryaan_fSeleksiPelamar',
            name: 'jumlahbulankekaryaan',
            listeners: {
                change: function(field, newValue, oldValue) {
                    // console.log(Ext.getCmp('rencanatglmasuk').getSubmitValue())
                    var rencanatglmasuk = Ext.getCmp('rencanatglmasuk_fSeleksiPelamar').getSubmitValue();
                    if(rencanatglmasuk==null)
                    {
                        Ext.Msg.alert('Info', 'Input tanggal rencana masuk terlebih dahulu');
                    } else {
                         var tgl = moment(rencanatglmasuk, "DD-MM-YYYY").add(newValue, 'months');
                    // var tglakhir = tgl.format('DD-MM-YYYY');
                    // console.log(tgl.format('DD-MM-YYYY'))
                        var tglakhir = moment(tgl.format('DD-MM-YYYY'), "DD-MM-YYYY").subtract(1, 'days');
                         // console.log(tglakhir.format('DD-MM-YYYY'))
                        Ext.getCmp('tglakhirkekaryaan_fSeleksiPelamar').setValue(tglakhir.format('DD-MM-YYYY'));
                    }

                }
            }
        },
        {
            xtype: 'datefield',
            // hidden:true,
            format: 'd-m-Y',
            allowBlank:false,
            id:'tglakhirkekaryaan_fSeleksiPelamar',
            name:'tglakhirkekaryaan',
            // allowBlank: false,
            fieldLabel: 'Tgl Akhir Kekaryawanan'
        },


        // {
        //     xtype: 'datefield',
        //     format: 'd-m-Y',
        //     name:'tanggalakhirkontrak',
        //     allowBlank: false,
        //     fieldLabel: 'Tgl Akhir Kontrak'
        // },
        {
            xtype:'comboxstatusCalonPelamar',
            id:'comboxstatusCalonPelamar_fSeleksiPelamar',
            allowBlank: false
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSeleksiPelamar');
                Ext.getCmp('formSeleksiPelamar').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnSeleksiPelamarSimpan',
            text: 'Simpan',
            handler: function() {

                if(Ext.getCmp('comboxstatusCalonPelamar_fSeleksiPelamar').getValue()=='Disetujui')
                {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 178
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    // alert('auth');
                                     // kirimSeleksi(this.up('form').getForm());
                                     kirimSeleksi(Ext.getCmp('formSeleksiPelamar').getForm());
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                } else {
                    // alert('no auth');
                    //langsung saja kalau statusnya masih diajukan/tanpa pengecekan akses
                    kirimSeleksi(Ext.getCmp('formSeleksiPelamar').getForm());
                }



            }
        }]
});
var wSeleksiPelamar = Ext.create('widget.window', {
    id: 'windowPopupSeleksiPelamar',
    title: 'Form Seleksi Pelamar',
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
    items: [formSeleksiPelamar]
});


Ext.define('MY.searchGridSeleksiPelamar', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSeleksiPelamar',
    store: storeGridSeleksiPelamar,
    width: 180
});
var smGridSeleksiPelamar = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSeleksiPelamar.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSeleksiPelamar').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSeleksiPelamar').enable();
        }
    }
});
Ext.define('GridSeleksiPelamar', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSeleksiPelamar,
    title: 'Daftar Seleksi Pelamar',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSeleksiPelamarID',
    id: 'GridSeleksiPelamarID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSeleksiPelamar',
    store: storeGridSeleksiPelamar,
    loadMask: true,
    columns: [
        {header: 'idcalonpelamar', dataIndex: 'idcalonpelamar', hidden: true},
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 200,flex:1},
        {header: 'No PTK', dataIndex: 'nomorpermintaantk', minWidth: 190},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Level Jabatan', dataIndex: 'levelindividu', minWidth: 190},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 150},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Status', dataIndex: 'statuscalon', minWidth: 150},
        // {header: 'User in', dataIndex: 'userin', minWidth: 150},
        {header: 'Tanggal Input', dataIndex: 'datein', minWidth: 150}
    ]
    , dockedItems: [
      {
          xtype: 'toolbar',
          dock: 'top',
          items: [
                  {
                      xtype:'comboxstatusPelamar',
                      id:'comboxstatusPelamar_seleksiPelamar',
                      listeners: {
                      select: function() {
                              storeGridSeleksiPelamar.load();
                          }
                      }
                  },
                  {
                    xtype:'checkbox',
                    fieldLabel:'Dihapus',
                    name:'dihapus',
                    listeners: {
                     change: function(field, newValue, oldValue, eOpts) {
                            if(newValue)
                            {
                                storeGridSeleksiPelamar.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'dihapus': 'true'
                                              };
                                          });
                            } else {
                                storeGridSeleksiPelamar.on('beforeload',function(store, operation,eOpts){
                                operation.params={
                                            'extraparams': 'a.statuscalon:'+Ext.getCmp('comboxstatusPelamar_seleksiPelamar').getValue()
                                          };
                                      });
                            }
                            storeGridSeleksiPelamar.load();
                              
                        }
                    }
                  }
              ]
      },
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
                                roleid: 77
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wSeleksiPelamar.show();
                                    Ext.getCmp('formSeleksiPelamar').getForm().reset();
                                    Ext.getCmp('statusformSeleksiPelamar').setValue('input');
                                    jeniskontrakStore.load();
                                    levelStore.load();
                                    Ext.getCmp('BtnSeleksiPelamarSimpan').setDisabled(false);
                                    Ext.getCmp('comboxstatusCalonPelamar_fSeleksiPelamar').setReadOnly(false);
                                    
                                    Ext.getCmp('nomorpermintaantk_fSeleksiPelamar').hide();
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
                                roleid: 78
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridSeleksiPelamar')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formSeleksiPelamar = Ext.getCmp('formSeleksiPelamar');
                                        formSeleksiPelamar.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/SeleksiPelamar/1/rekrutmen',
                                            params: {
                                                extraparams: 'a.idcalonpelamar:' + selectedRecord.data.idcalonpelamar
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                if(d.data.statuscalon=='Disetujui')
                                                {
                                                    Ext.getCmp('BtnSeleksiPelamarSimpan').setDisabled(true);
                                                    Ext.getCmp('comboxstatusCalonPelamar_fSeleksiPelamar').setReadOnly(true);
                                                } else {
                                                    Ext.getCmp('BtnSeleksiPelamarSimpan').setDisabled(false);
                                                    Ext.getCmp('comboxstatusCalonPelamar_fSeleksiPelamar').setReadOnly(false);
                                                }
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);

                                                Ext.getCmp('nomorpermintaantk_fSeleksiPelamar').show();
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wSeleksiPelamar.show();
                                        Ext.getCmp('statusformSeleksiPelamar').setValue('edit');
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
                    id: 'btnDeleteSeleksiPelamar',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 79
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
                                                var grid = Ext.ComponentQuery.query('GridSeleksiPelamar')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/SeleksiPelamar/rekrutmen/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridSeleksiPelamar.remove(sm.getSelection());
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
                    xtype: 'searchGridSeleksiPelamar',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridSeleksiPelamar, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSeleksiPelamar.load();
                kekaryaanStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formSeleksiPelamar = Ext.getCmp('formSeleksiPelamar');
            wSeleksiPelamar.show();
            formSeleksiPelamar.getForm().load({
                url: SITE_URL + 'backend/loadFormData/SeleksiPelamar/1/rekrutmen',
                params: {
                    extraparams: 'a.idcalonpelamar:' + record.data.idcalonpelamar
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    Ext.getCmp('nomorpermintaantk_fSeleksiPelamar').show();
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformSeleksiPelamar').setValue('edit');
        },
        itemclick: function (dv, record, item, index, e) {
            if(record.data.statuscalon=='Disetujui')
            {
                Ext.getCmp('btnDeleteSeleksiPelamar').setDisabled(true);
            } else {
                Ext.getCmp('btnDeleteSeleksiPelamar').setDisabled(false);
            }
        }
    }
});


function kirimSeleksi(form)
{
     kotakLoading();
   
    if (form.isValid()) {
        form.submit({
            success: function(form, action) {

                Ext.Msg.alert('Success', action.result.message);
                Ext.getCmp('formSeleksiPelamar').getForm().reset();
                Ext.getCmp('windowPopupSeleksiPelamar').hide();
                storeGridSeleksiPelamar.load();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            //                            storeGridSeleksiPelamar.load();
            }
        });
    } else {
        Ext.Msg.alert("Error!", "Your form is invalid!");
    }
}
