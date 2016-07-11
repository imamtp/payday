

Ext.define('GridDataPergerakanPersonelModel', {
    extend: 'Ext.data.Model',
    fields: ['idpergerakanpersonil','nopergerakan','idpelamar','idcompany','idjabatan','idlevelindividu','idorganisasi','idjabatanatasan','idorganisasiatasan','namaatasan','tglmasuk','tglberakhir','statuspergerakan','userin','datein','namalengkap','companyname','namajabatan','kodejabatan','levelnameJabatan','levelnameindividu','kodeorg','namaorg','kekaryaanname','namalokasi','namajabatanatasan','namaorgatasan','kodeorgatasan','lokasiatasan','namapergerakan','ni','nik','catatanpenyesuaian','namajabatan_from','namalokasi_from','namaorg_from'],
    idProperty: 'id'
});

var storeGridDataPergerakanPersonel = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDataPergerakanPersonelModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/pergerakanpersonil/personalia',
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

storeGridDataPergerakanPersonel.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.statuspergerakan:'+Ext.getCmp('statuspergerakan_filterPergerakan').getValue(),
                    'startdate': Ext.getCmp('startdate_filterPergerakan').getValue(),
                    'enddate': Ext.getCmp('enddate_filterPergerakan').getValue()
                  };
              });

////////////////////////////////////////////////////////////////////////





Ext.define('TabItemPergerakanPersonil', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemPergerakanPersonil',
    alias: 'widget.TabItemPergerakanPersonil',
    activeTab: 0,
    // plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    // plugins: [{
    //     ptype: 'tabscrollermenu',
    //     maxText: 15,
    //     pageSize: 20
    // }],
    listeners: {
        render: function() {
            this.items.each(function(i){
                i.tab.on('click', function(){
                    if(i.title=='Daftar Bawahan')
                    {
                        storeGridBawahan.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        'extraparams': 'aa.idpelamaratasan:'+Ext.getCmp('idpelamar_fPergerakanP_from').getValue()
                                      };
                                  });
                        storeGridBawahan.load();

                        // var idpergerakanpersonil = Ext.getCmp('idpergerakanpersonil_fPergerakanP').getValue();
                        // if(idpergerakanpersonil=='')
                        // {
                        //     Ext.Msg.alert("Info", "Data Pergerakan Personil Belum Diinput");
                        //     // Ext.getCmp('tambahBawahanBtn').setDisabled(true);
                        //     // var tabs = btn.up('tabpanel');
                        //     Ext.getCmp('TabItemPergerakanPersonil').setActiveTab(0);
                        //     Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(true);
                        // }  else {
                        //     // Ext.getCmp('tambahBawahanBtn').setDisabled(false);
                        //     storeGridBawahan.on('beforeload',function(store, operation,eOpts){
                        //     operation.params={
                        //                 'extraparams': 'aa.idpelamaratasan:'+Ext.getCmp('idpelamar_fPergerakanP_from').getValue()
                        //               };
                        //           });
                        //     storeGridBawahan.load();
                        //     // Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);

                        //     if(Ext.getCmp('statuspergerakan_fPergerakanP').getValue()=='Disetujui')
                        //     {
                        //         Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(true);
                        //     } else {
                        //         Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);
                        //     }
                        // }
                    }
                });
            });
        }
    },
    items: [
        formPergerakanPersonel,
        {
            xtype:'GridBawahan'
            // listeners: {
            //     activate: function() {
            //         storeGridBawahan.load();
            //     }
            // }
        }
    ]
});


var wPergerakanPersonel = Ext.create('widget.window', {
    id: 'windowPopupPergerakanPersonel',
    title: 'Form Pergerakan Personel',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    modal:true,
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
    {
        xtype:'TabItemPergerakanPersonil'
    }]
});



////////////////////////////////////////////////////////////////////////

Ext.define('MY.searchGridDataPergerakanPersonel', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDataPergerakanPersonel',
    store: storeGridDataPergerakanPersonel,
    width: 180
});
var smGridDataPergerakanPersonel = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDataPergerakanPersonel.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteDataPergerakanPersonel').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteDataPergerakanPersonel').enable();
        }
    }
});
Ext.define('GridDataPergerakanPersonel', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridDataPergerakanPersonel,
    title: 'Data Pergerakan Personel',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDataPergerakanPersonelID',
    id: 'GridDataPergerakanPersonelID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDataPergerakanPersonel',
    store: storeGridDataPergerakanPersonel,
    loadMask: true,
    columns: [
        {header: 'idpergerakanpersonil', dataIndex: 'idpergerakanpersonil', hidden: true},
        {header: 'No Pergerakan', dataIndex: 'nopergerakan', minWidth: 150},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Jenis Pergerakan', dataIndex: 'namapergerakan', minWidth: 200},
        // {header: 'NI', dataIndex: 'ni', minWidth: 150},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Jabatan Sebelumnya', dataIndex: 'namajabatan_from', minWidth: 150},
        {header: 'Jabatan Baru', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Lokasi Sebelumnya', dataIndex: 'namalokasi_from', minWidth: 150},
        {header: 'Lokasi Baru', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Organisasi Sebelumnya', dataIndex: 'namaorg_from', minWidth: 150},
        {header: 'Organisasi Baru', dataIndex: 'namaorg', minWidth: 150},
        {header: 'Tgl Mulai Jabatan', dataIndex: 'tglmasuk', minWidth: 130},
        {header: 'Tgl Akhir Jabatan', dataIndex: 'tglberakhir', minWidth: 130},
        {header: 'Catatan', dataIndex: 'catatanpenyesuaian', minWidth: 350},
        {header: 'Status', dataIndex: 'statuspergerakan', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                        xtype: 'comboxstatusPelamar',
                        fieldLabel:'Status Pergerakan',
                        id: 'statuspergerakan_filterPergerakan',
                        name: 'statuspergerakan',
                        labelWidth: 160,
                        listeners: {
                        select: function() {
                                storeGridDataPergerakanPersonel.load();
                            }
                        }
                    }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype: 'datefield',
                        id: 'startdate_filterPergerakan',
                        format: 'd-m-Y',
                        labelWidth: 160,
                        fieldLabel: 'Periode Aktif Pergerakan',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    if (Ext.getCmp('startdate_filterPergerakan').getValue() != null && Ext.getCmp('enddate_filterPergerakan').getValue() != null)
                                    {
                                       storeGridDataPergerakanPersonel.load()
                                    }
                                }
                            }
                    }, {
                        xtype: 'datefield',
                        id: 'enddate_filterPergerakan',
                        format: 'd-m-Y',
                        labelWidth: 40,
                        fieldLabel: 's/d',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    if (Ext.getCmp('enddate_filterPergerakan').getValue() != null && Ext.getCmp('startdate_filterPergerakan').getValue() != null)
                                    {
                                       storeGridDataPergerakanPersonel.load()
                                    }
                                }
                            }
                    },'-',
                    {
                        text: 'Proses',
                        iconCls: 'cog-icon',
                        handler: function() {
                            storeGridDataPergerakanPersonel.load();
                        }
                    },
                    {
                            text: 'Hapus Filter',
                            iconCls: 'refresh',
                            handler: function() {
                                Ext.getCmp('enddate_filterPergerakan').setValue(null);
                                Ext.getCmp('startdate_filterPergerakan').setValue(null);
                                Ext.getCmp('statuspergerakan_filterPergerakan').setValue(null);
                                storeGridDataPergerakanPersonel.reload();
                            }
                    }]
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
                                roleid: 105
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                   wPergerakanPersonel.show();
                                    Ext.getCmp('formPergerakanPersonel').getForm().reset();
                                    Ext.getCmp('statusformPergerakanPersonel').setValue('input');
                                    levelStore.load();
                                    kekaryaanStore.load();
                                    lokasiStore.load();
                                    pergerakanStore.load();

                                    Ext.getCmp('BtnUbahPergerakan').hide();
                                    Ext.getCmp('BtnDisetujuiPergerakan').show();
                                    Ext.getCmp('BtnDiajukanPergerakan').show();

                                    Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);

                                    Ext.getCmp('TabItemPergerakanPersonil').items.getAt(1).setDisabled(false);

                                    Ext.getCmp('namalengkap_fPergerakanP_from').setReadOnly(false);
                                    Ext.getCmp('comboxpergerakan_fPergerakanP').setReadOnly(false);
                                    // Ext.getCmp('nopergerakan_fPergerakanP').setReadOnly(false);
                                    Ext.getCmp('namajabatan_fPergerakanP').setReadOnly(false);
                                    Ext.getCmp('levelnameindividu_fPergerakanP').setReadOnly(false);
                                    Ext.getCmp('namalokasi_fPergerakanP').setReadOnly(false);
                                    Ext.getCmp('comboxkekaryaan_fPergerakanP').setReadOnly(false);
                                    Ext.getCmp('tglmasuk_fPergerakanP').setReadOnly(false);
                                    Ext.getCmp('tglberakhir_fPergerakanP').setReadOnly(false);

                                    insertNoRef('nopergerakan','nopergerakan_fPergerakanP','PP');

                                    Ext.getCmp('BtnDisetujuiPergerakan').setDisabled(false);
                                    Ext.getCmp('BtnDiajukanPergerakan').setDisabled(false);
                                    Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);    

                                    Ext.getCmp('TabItemPergerakanPersonil').setActiveTab(0);
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
                    text: 'Detil',
                    iconCls: 'edit-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 106
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    kotakLoading()

                                    var grid = Ext.ComponentQuery.query('GridDataPergerakanPersonel')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setValue(null);
                                        
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPergerakanPersonel = Ext.getCmp('formPergerakanPersonel');
                                        formPergerakanPersonel.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/PergerakanPersonil/1/personalia',
                                            params: {
                                                extraparams: 'a.idpergerakanpersonil:' + selectedRecord.data.idpergerakanpersonil
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                 if(d.data.statuspergerakan=='Disetujui')
                                                {
                                                     Ext.getCmp('BtnDisetujuiPergerakan').setDisabled(true);
                                                     Ext.getCmp('BtnDiajukanPergerakan').setDisabled(true);
                                                     Ext.getCmp('BtnDitolakPergerakan').setDisabled(true);
                                                     // Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(true);                                         
                                                } else if(d.data.statuspergerakan=='Ditolak')
                                                {
                                                     Ext.getCmp('BtnDisetujuiPergerakan').setDisabled(true);
                                                     Ext.getCmp('BtnDiajukanPergerakan').setDisabled(true);
                                                     Ext.getCmp('BtnDitolakPergerakan').setDisabled(true);
                                                     // Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(true);                                         
                                                } else {
                                                     Ext.getCmp('BtnDisetujuiPergerakan').setDisabled(false);
                                                     Ext.getCmp('BtnDiajukanPergerakan').setDisabled(false);
                                                     Ext.getCmp('BtnDitolakPergerakan').setDisabled(false);
                                                     // Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);
                                                }

                                                if(d.data.namapergerakan=='PENEMPATAN BARU')
                                                {
                                                  Ext.getCmp('kekaryaanname_fPergerakanBaru').setValue(d.data.kekaryaanname);
                                                }
                                                Ext.MessageBox.hide();
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPergerakanPersonel.show();
                                        Ext.getCmp('statusformPergerakanPersonel').setValue('edit');
                                        levelStore.load();
                                        kekaryaanStore.load();
                                        lokasiStore.load();
                                        pergerakanStore.load();

                                        Ext.getCmp('BtnUbahPergerakan').hide();
                                        Ext.getCmp('BtnDisetujuiPergerakan').show();
                                        Ext.getCmp('BtnDiajukanPergerakan').show();

                                        Ext.getCmp('TabItemPergerakanPersonil').items.getAt(1).setDisabled(false);

                                        Ext.getCmp('TabItemPergerakanPersonil').setActiveTab(0);
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
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            window.location = SITE_URL+"laporan/datapergerakan/" + Ext.getCmp('statuspergerakan_filterPergerakan').getValue() +'/'+Ext.getCmp('startdate_filterPergerakan').getSubmitValue()+'/'+Ext.getCmp('enddate_filterPergerakan').getSubmitValue();
                        }
                    }
                }, {
                    id: 'btnDeleteDataPergerakanPersonel',
                    text: 'Hapus',
                    hidden:true,
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 107
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
                                                var grid = Ext.ComponentQuery.query('GridDataPergerakanPersonel')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/PergerakanPersonil/personalia/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                       var d = Ext.decode(form.responseText);
                                                       Ext.Msg.alert("Info", d.message);
                                                       storeGridDataPergerakanPersonel.load();
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", 'Error occured, please try again');
                                                    }
                                                });
                                                // storeGridDataPergerakanPersonel.remove(sm.getSelection());
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
                },
                 '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridDataPergerakanPersonel',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridDataPergerakanPersonel, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridDataPergerakanPersonel.load();
                jenisptkpStore.load();
                agamaStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formDataPergerakanPersonel = Ext.getCmp('formDataPergerakanPersonel');
            // WindowKaryawan.show();
            // formDataPergerakanPersonel.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/DataPergerakanPersonel/1/personalia',
            //     params: {
            //         extraparams: 'a.idpelamar:' + record.data.idpelamar
            //     },
            //     success: function(form, action) {
            //          var d = Ext.decode(action.response.responseText);
            //         getFotoPegawai(d.data.idpelamar);
            //         setValueHeader(d);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformDataPergerakanPersonel').setValue('edit');
        }
    }
});

function loadFormDataPergerakanPersonil()
{
    var formPergerakanPersonel = Ext.getCmp('formPergerakanPersonel');
    formPergerakanPersonel.getForm().load({
        url: SITE_URL + 'backend/loadFormData/pergerakanpersonil/1/personalia',
        params: {
            extraparams: 'a.idpergerakanpersonil:' + Ext.getCmp('idpergerakanpersonil_fPergerakanP').getValue()
        },
        success: function(form, action) {
            var d = Ext.decode(action.response.responseText);
            // alert(d.data.nomorktp)
            // Ext.getCmp('idpelamar_fIdentitas').setValue(idpelamar);

            // if(Ext.getCmp('nomorktp_fIdentitas').getValue()=='')
            // {
            //     Ext.getCmp('statusformIdentitas').setValue('input');
            // } else {
                Ext.getCmp('statusformPergerakanPersonel').setValue('edit');
            // }
        },
        failure: function(form, action) {
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
             Ext.getCmp('statusformPergerakanPersonel').setValue('input');
        }
    })
}
