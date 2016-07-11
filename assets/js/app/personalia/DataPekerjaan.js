var orgPekerjaanStore = Ext.create('Ext.data.Store', {
        fields: ['idorganisasi','namaorg'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxOrg',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxOrgPekerjaan', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxOrgPekerjaan',
    displayField: 'namaorg',
    fieldLabel: 'Organisasi',
    queryMode: 'local',
    labelWidth:150,
    name: 'namaorg',
    editable: false,
    triggerAction: 'all',
    valueField: 'namaorg',
    store: orgPekerjaanStore
});


var formPekerjaan2 = Ext.create('Ext.form.Panel', {
    id: 'formPekerjaan2',
    width: 450,
   // height: 500,
    url: SITE_URL + 'backend/saveform/Pekerjaan/personalia',
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
            name: 'statusformPekerjaan',
            // id: 'statusformPekerjaan'
        },{
            xtype:'hiddenfield',
            // id:'idpelamar_fPekerjaan',
            fieldLabel:'idpelamar',
            name:'idpelamar'
        }, {
            xtype:'hiddenfield',
            fieldLabel:'idpekerjaan',
            name:'idpekerjaan'
        },
        {
            xtype:'hiddenfield',
            fieldLabel:'idstrukturjabatan_fPekerjaan',
            // id:'idstrukturjabatan_fPekerjaan',
            name:'idstrukturjabatan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Jabatan',
            name: 'namajabatan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Jabatan',
            name: 'kodejabatan'
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idlevel_fPekerjaan',
        //     id:'idlevel_fPekerjaan',
        //     name:'idlevel'
        // },
        {
            xtype: 'displayfield',
            fieldLabel: 'Level Jabatan',
            // id:'levelname_fPekerjaan',
            name: 'levelname',
            readOnly:true
        },
         {
            xtype: 'hiddenfield',
            // id: 'idlevelindividu_fPekerjaan',
            name: 'idlevelindividu'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Level Individu',
            name: 'levelnameindividu'
        },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Pilih Level Individu',
        //     allowBlank: false,
        //     id: 'levelnameindividu_fPekerjaan',
        //     name: 'levelnameindividu',
        //         listeners: {
        //             render: function(component) {
        //                 component.getEl().on('click', function(event, el) {
        //                     wGridLevelIndividuListPopup.show();
        //                     // storeGridAccount.on('beforeload',function(store, operation,eOpts){
        //                     //             operation.params={
        //                     //                         'idunit': Ext.getCmp('idunitReceive').getValue(),
        //                     //                         'idaccounttype': '12,16,11'
        //                     //             };
        //                     //         });
        //                     storeGridLevelIndividuList.load();
        //                 });
        //             }
        //         }
        // },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idorganisasi_fPekerjaan',
        //     id:'idorganisasi_fPekerjaan',
        //     name:'idorganisasi'
        // },
         {
            xtype: 'displayfield',
            fieldLabel: 'Lokasi',
            name: 'namalokasi'
        },

        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi Jabatan',
            // id:'namaorg_fPekerjaan',
            name: 'namaorg',
            readOnly:true
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'idjabatanatasan_fPekerjaan',
        //     id:'idjabatanatasan_fPekerjaan',
        //     name:'idjabatanatasan'
        // },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kekaryawanan',
            name: 'kekaryaanname'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Tgl Masuk',
            name: 'tglmasuk'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Tgl Akhir',
            name: 'tglberakhir'
        },
        {
            xtype: 'hiddenfield',
            // id: 'idpelamaratasan_fPekerjaan',
            name: 'idpelamaratasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Atasan',
            name: 'namaatasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Jabatan Atasan',
            allowBlank:false,
            id:'namajabatanatasan_fPekerjaan',
            name: 'namajabatanatasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Jabatan Atasan',
            // id:'kodejabatanatasan_fPekerjaan',
            name: 'kodejabatanatasan',
            readOnly:true
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Organisasi Atasan',
            // id:'namaorgatasan_fPekerjaan',
            name: 'namaorgatasan',
            readOnly:true
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Organisasi Atasan',
            // id:'kodeorgatasan_fPekerjaan',
            name: 'kodeorgatasan',
            readOnly:true
        },
        {
            xtype: 'hiddenfield',
            fieldLabel:'Lokasi Atasan',
            // id:'lokasiatasan_fPekerjaan',
            name:'lokasiatasan'
        }
        // Ext.define('Ext.ux.namalengkap_fPekerjaan', {
        //     extend: 'Ext.form.field.Trigger',
        //     alias: 'widget.namalengkap_fPekerjaan',
        //     name: 'namalengkap',
        //     editable: false,
        //     id: 'namalengkap_fPekerjaan',
        //     fieldLabel: 'Nama Personil',
        //     emptyText: 'Pilih Personil...',
        //     onTriggerClick: function() {
        //         wGridPersonilListPopup.show();
        //         storeGridPersonilList.load();
        //     }
        // }),
        //  {
        //     xtype:'textfield',
        //     fieldLabel: 'Nama Atasan',
        //     id:'namaatasan_fPekerjaan',
        //     name:'namaatasan'
        // },
        // {
        //     xtype: 'hiddenfield',
        //     id: 'idjabatanatasan_fPekerjaan',
        //     name: 'idjabatanatasan'
        // },
        // {
        //     xtype: 'displayfield',
        //     fieldLabel: 'Jabatan Atasan',
        //     name: 'namajabatanatasan',
        //     allowBlank:false,
        //     id: 'namajabatanatasan_fPekerjaan'
        // },
        // {
        //     xtype: 'displayfield',
        //     fieldLabel: 'Kode Jabatan Atasan',
        //     id:'kodejabatanatasan_fPekerjaan',
        //     name: 'kodejabatanatasan',
        //     readOnly:true
        // },
        // {
        //     xtype:'hiddenfield',
        //     fieldLabel:'idorganisasi_fPekerjaan',
        //     id:'idorganisasiatasan_fPekerjaan',
        //     name:'idorganisasiatasan'
        // },
        //  Ext.define('Ext.ux.namaorgatasan_fPekerjaan', {
        //     extend: 'Ext.form.field.Trigger',
        //     alias: 'widget.namaorgatasan_fPekerjaan',
        //     editable: false,
        //     fieldLabel: 'Pilih Organisasi Atasan',
        //     allowBlank:false,
        //     id:'namaorgatasan_fPekerjaan',
        //     name: 'namaorgatasan',
        //     emptyText: 'Pilih Organisasi Atasan...',
        //     onTriggerClick: function() {
        //          wGridPekerjaanOrganisasiListPopup.show();
        //         storeGridPekerjaanOrganisasiList.load();
        //     }
        // }),
        // {
        //     xtype: 'displayfield',
        //     fieldLabel: 'Kode Organisasi Atasan',
        //     id:'kodeorgatasan_fPekerjaan',
        //     name: 'kodeorgatasan',
        //     readOnly:true
        // },
        // {
        //     xtype:'comboxlokasi',
        //     fieldLabel:'Lokasi Atasan',
        //     name:'lokasiatasan'
        // }
        ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var win = Ext.getCmp('windowPopupPekerjaan2');
                // Ext.getCmp('formPekerjaan').getForm().reset();
                win.hide();
            }
        }]
});
var wPekerjaan2 = Ext.create('widget.window', {
    id: 'windowPopupPekerjaan2',
    title: 'Data Pekerjaan',
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
    items: [formPekerjaan2]
});

Ext.define('GridDataPekerjaanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','ni','nik','namalengkap','tgllahir','namajabatan','namalokasi','tglmasuk','tglberakhir','kekaryaanname'],
    idProperty: 'id'
});

var storeGridDataPekerjaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDataPekerjaanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/datapekerjaan/personalia',
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

storeGridDataPekerjaan.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.idcompany:'+Ext.getCmp('companyname_filterDataPekerjaan').getValue()+','+'b.idjabatan:'+Ext.getCmp('namajabatan_filterDataPekerjaan').getValue()+','+'b.idorganisasi:'+Ext.getCmp('namaorg_filterDataPekerjaan').getValue(),
                    'tglmasuk1': Ext.getCmp('startdate_DataPekerjaan').getSubmitValue(),
                    'tglmasuk2': Ext.getCmp('enddate_DataPekerjaan').getSubmitValue(),
                    'tglkeluar1': Ext.getCmp('startTerminatedate_DataPekerjaan').getSubmitValue(),
                    'tglkeluar2': Ext.getCmp('endTerminatedate_DataPekerjaan').getSubmitValue(),
                    'aktif':Ext.getCmp('keaktifanDataPekerjaan').getValue()
                  };
              });

Ext.define('MY.searchGridDataPekerjaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDataPekerjaan',
    store: storeGridDataPekerjaan,
    width: 180
});
var smGridDataPekerjaan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDataPekerjaan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteDataPekerjaan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteDataPekerjaan').enable();
        }
    }
});
Ext.define('GridDataPekerjaan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridDataPekerjaan,
    title: 'Data Pekerjaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDataPekerjaanID',
    id: 'GridDataPekerjaanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDataPekerjaan',
    store: storeGridDataPekerjaan,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        // {header: 'NI', dataIndex: 'ni', minWidth: 150},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150},
        //
        {header: 'Tgl Lahir', dataIndex: 'tgllahir', minWidth: 150},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Kekaryawanan', dataIndex: 'kekaryaanname', minWidth: 150},
        {header: 'Tgl Masuk', dataIndex: 'tglmasuk', minWidth: 150},
        {header: 'Tgl Berakhir', dataIndex: 'tglberakhir', minWidth: 150},
        // {header: 'Status', dataIndex: 'status', minWidth: 150},
        // {header: 'user in', dataIndex: 'userin', minWidth: 150},
        // {header: 'date in', dataIndex: 'datein', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Perusahaan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_companyDataPekerjaan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyDataPekerjaan').getValue())
                                    {
                                        Ext.getCmp('companyname_filterDataPekerjaan').setValue(null);
                                        Ext.getCmp('companyname_filterDataPekerjaan').setDisabled(true);
                                        storeGridDataPekerjaan.load();
                                    } else {
                                        Ext.getCmp('companyname_filterDataPekerjaan').setDisabled(false);
                                        storeGridDataPekerjaan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterDataPekerjaan',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function(e,v) {
                            Ext.getCmp('df_org_pekerjaan').setDisabled(false);
                            Ext.getCmp('filtercb_orgDataPekerjaan').setDisabled(false);
                            // console.log(v);
                                storeGridDataPekerjaan.load();
                                // console.log(this.value)
                                orgPekerjaanStore.load({
                                    params:{
                                        idcompany:v[0].data.idcompany
                                    }
                                });
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        id:'df_org_pekerjaan',
                        disabled:true,
                        labelWidth:72,
                        // hidden:true,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        disabled:true,
                        // hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_orgDataPekerjaan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgDataPekerjaan').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterDataPekerjaan').setValue(null);
                                        Ext.getCmp('namaorg_filterDataPekerjaan').setDisabled(true);
                                        storeGridDataPekerjaan.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterDataPekerjaan').setDisabled(false);
                                        storeGridDataPekerjaan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrgPekerjaan',
                        // hidden:true,
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterDataPekerjaan',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridDataPekerjaan.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        hidden:true,
                        fieldLabel:'Jabatan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        hidden:true,
                        id:'filtercb_jabatanDataPekerjaan',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanDataPekerjaan').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterDataPekerjaan').setValue(null);
                                        Ext.getCmp('namajabatan_filterDataPekerjaan').setDisabled(true);
                                        storeGridDataPekerjaan.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterDataPekerjaan').setDisabled(false);
                                        storeGridDataPekerjaan.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        hidden:true,
                        fieldLabel:'',
                        id: 'namajabatan_filterDataPekerjaan',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridDataPekerjaan.load();
                                // console.log(this.value)
                            }
                        }
                    }
                ]
        },
        /////////////////////toolbar at row 2
        {
            xtype: 'toolbar',
            dock: 'top',
            // hidden:true,
            items: [
                        {
                                xtype:'checkbox',
                                checked:false,
                                name: 'cbPeriodeAktifPekerjaan',
                                id:'cbPeriodeAktifPekerjaan',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                           if(newValue)
                                           {
                                                Ext.getCmp('startdate_DataPekerjaan').setDisabled(false);
                                                Ext.getCmp('enddate_DataPekerjaan').setDisabled(false);  

                                                // Ext.getCmp('startTerminatedate_DataPekerjaan').setValue(null);
                                                // Ext.getCmp('endTerminatedate_DataPekerjaan').setValue(null); 

                                                // Ext.getCmp('startTerminatedate_DataPekerjaan').setDisabled(true);
                                                // Ext.getCmp('endTerminatedate_DataPekerjaan').setDisabled(true);
                                                // Ext.getCmp('cbPeriodeTerminatePekerjaan').setValue(false); 

                                                Ext.getCmp('keaktifanDataPekerjaan').setValue(false);
                                                Ext.getCmp('keaktifanDataPekerjaan').setDisabled(true);      

                                           } else {
                                                Ext.getCmp('cbPeriodeTerminatePekerjaan').setValue(true);

                                                Ext.getCmp('startdate_DataPekerjaan').setDisabled(true);
                                                Ext.getCmp('enddate_DataPekerjaan').setDisabled(true);
                                                
                                                Ext.getCmp('keaktifanDataPekerjaan').setDisabled(false); 
                                                Ext.getCmp('keaktifanDataPekerjaan').setValue(1);
                                           }
                                    }
                                }
                         },
                        {
                                xtype: 'datefield',
                                disabled:true,
                                format: 'd-m-Y',
                                id:'startdate_DataPekerjaan',
                                labelWidth:170,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Masuk',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_DataPekerjaan').getValue() != null && Ext.getCmp('enddate_DataPekerjaan').getValue() != null)
                                        // {
                                           storeGridDataPekerjaan.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                disabled:true,
                                format: 'd-m-Y',
                                id:'enddate_DataPekerjaan',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_DataPekerjaan').getValue() != null && Ext.getCmp('enddate_DataPekerjaan').getValue() != null)
                                        // {
                                           storeGridDataPekerjaan.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype:'checkbox',
                                // hidden:true,
                                labelWidth:110,
                                checked:true,
                                fieldLabel: 'Status Keaktifan',
                                boxLabel: 'Aktif',
                                name: 'keaktifanDataPekerjaan',
                                id:'keaktifanDataPekerjaan',
                                inputValue: '1',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                            console.log(newValue)
                                           storeGridDataPekerjaan.load()
                                           // if(newValue)
                                           // {
                                                // Ext.getCmp('startdate_DataPekerjaan').setDisabled(true);
                                                // Ext.getCmp('enddate_DataPekerjaan').setDisabled(true);                                            
                                           // } else {
                                               // Ext.getCmp('startdate_DataPekerjaan').setDisabled(false);
                                                // Ext.getCmp('enddate_DataPekerjaan').setDisabled(false);
                                           // }
                                    }
                                }
                            },
                            {
                                text: 'Proses',
                                iconCls: 'cog-icon',
                                handler: function() {
                                    storeGridDataPekerjaan.load();
                                }
                            },
                            {
                                    text: 'Hapus Filter',
                                    iconCls: 'refresh',
                                    handler: function() {
                                        Ext.getCmp('keaktifanDataPekerjaan').setValue(1);
                                        Ext.getCmp('filtercb_companyDataPekerjaan').setValue(null);
                                        Ext.getCmp('companyname_filterDataPekerjaan').setValue(null);
                                        Ext.getCmp('filtercb_orgDataPekerjaan').setValue(null);
                                        Ext.getCmp('namaorg_filterDataPekerjaan').setValue(null);
                                        Ext.getCmp('filtercb_jabatanDataPekerjaan').setValue(null);
                                        Ext.getCmp('namajabatan_filterDataPekerjaan').setValue(null);
                                        Ext.getCmp('startdate_DataPekerjaan').setValue(null);
                                        Ext.getCmp('enddate_DataPekerjaan').setValue(null);
                                        Ext.getCmp('startTerminatedate_DataPekerjaan').setValue(null);
                                        Ext.getCmp('endTerminatedate_DataPekerjaan').setValue(null);
                                        Ext.getCmp('keaktifanDataPekerjaan').setValue(false);
                                        storeGridDataPekerjaan.reload();
                                    }
                            }
                ]
        },
        {
            xtype: 'toolbar',
            hidden:true,
            dock: 'top',
            items: [
                        {
                                xtype:'checkbox',
                                checked:false,
                                name: 'cbPeriodeTerminatePekerjaan',
                                id:'cbPeriodeTerminatePekerjaan',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                           if(newValue)
                                           {
                                                Ext.getCmp('startdate_DataPekerjaan').setValue(null);
                                                Ext.getCmp('enddate_DataPekerjaan').setValue(null);

                                                Ext.getCmp('startTerminatedate_DataPekerjaan').setDisabled(false);
                                                Ext.getCmp('endTerminatedate_DataPekerjaan').setDisabled(false); 

                                                Ext.getCmp('startdate_DataPekerjaan').setDisabled(true);
                                                Ext.getCmp('enddate_DataPekerjaan').setDisabled(true);
                                                Ext.getCmp('cbPeriodeAktifPekerjaan').setValue(false);
                                                
                                                Ext.getCmp('keaktifanDataPekerjaan').setValue(false);
                                                Ext.getCmp('keaktifanDataPekerjaan').setDisabled(true);                                          
                                           } else {
                                                Ext.getCmp('startdate_DataPekerjaan').setDisabled(true);
                                                Ext.getCmp('enddate_DataPekerjaan').setDisabled(true);
                                                Ext.getCmp('keaktifanDataPekerjaan').setDisabled(false); 

                                                Ext.getCmp('startTerminatedate_DataPekerjaan').setDisabled(true);
                                                Ext.getCmp('endTerminatedate_DataPekerjaan').setDisabled(true); 
                                           }
                                    }
                                }
                         },
                        { 
                                xtype: 'datefield',  
                                disabled:true, 
                                format: 'd-m-Y',
                                id:'startTerminatedate_DataPekerjaan',
                                labelWidth:170, 
                                name:'startTerminatedate',
                                // allowBlank: false,
                                fieldLabel: 'Tanggal Terminasi',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_DataPekerjaan').getValue() != null && Ext.getCmp('enddate_DataPekerjaan').getValue() != null)
                                        // {
                                           storeGridDataPekerjaan.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                disabled:true,
                                format: 'd-m-Y',
                                id:'endTerminatedate_DataPekerjaan',
                                name:'endTerminatedate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_DataPekerjaan').getValue() != null && Ext.getCmp('enddate_DataPekerjaan').getValue() != null)
                                        // {
                                           storeGridDataPekerjaan.load()
                                        // }
                                    }
                                }
                            }
                ]
        },
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [
        //                 {
        //                         xtype: 'datefield',
        //                         format: 'd-m-Y',
        //                         id:'startdate_DataPekerjaan',
        //                         labelWidth:150,
        //                         name:'startdate',
        //                         // allowBlank: false,
        //                         fieldLabel: 'Tanggal Aktif Jabatan',
        //                         listeners: {
        //                             'change': function(field, newValue, oldValue) {
        //                                 // if (Ext.getCmp('startdate_DataPekerjaan').getValue() != null && Ext.getCmp('enddate_DataPekerjaan').getValue() != null)
        //                                 // {
        //                                    storeGridDataPekerjaan.load()
        //                                 // }
        //                             }
        //                         }
        //                     },
        //                     {
        //                         xtype: 'datefield',
        //                         format: 'd-m-Y',
        //                         id:'enddate_DataPekerjaan',
        //                         name:'enddate',
        //                         labelWidth:30,
        //                         // allowBlank: false,
        //                         fieldLabel: 's/d',
        //                         listeners: {
        //                             'change': function(field, newValue, oldValue) {
        //                                 // if (Ext.getCmp('startdate_DataPekerjaan').getValue() != null && Ext.getCmp('enddate_DataPekerjaan').getValue() != null)
        //                                 // {
        //                                    storeGridDataPekerjaan.load()
        //                                 // }
        //                             }
        //                         }
        //                     }                            ,
        //                     {
        //                         text: 'Proses',
        //                         iconCls: 'cog-icon',
        //                         handler: function() {
        //                             storeGridDataPekerjaan.load();
        //                         }
        //                     },
        //                     {
        //                             text: 'Hapus Filter',
        //                             iconCls: 'refresh',
        //                             handler: function() {
        //                                 Ext.getCmp('companyname_filterDataPekerjaan').setValue(null);
        //                                 Ext.getCmp('namaorg_filterDataPekerjaan').setValue(null);
        //                                 Ext.getCmp('namajabatan_filterDataPekerjaan').setValue(null);
        //                                 Ext.getCmp('startdate_DataPekerjaan').setValue(null);
        //                                 Ext.getCmp('enddate_DataPekerjaan').setValue(null);
        //                                 storeGridDataPekerjaan.reload();
        //                             }
        //                     }
        //         ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Tambah',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         WindowKaryawan.show();
                //         Ext.getCmp('statusformDataPekerjaan').setValue('input');
                //         Ext.getCmp('formDataPekerjaan').getForm().reset();
                //         Ext.getCmp('namalengkap_dkaryawan').setValue(null);
                //         Ext.getCmp('companyname_dkaryawan').setValue(null);
                //         Ext.getCmp('status_dkaryawan').setValue(null);
                //         Ext.getCmp('ni_dkaryawan').setValue(null);
                //         Ext.getCmp('nik_dkaryawan').setValue(null);
                //     }
                // },
                // {
                //         text: 'Clear Filter',
                //         iconCls: 'refresh',
                //         handler: function() {


                //             Ext.getCmp('companyname_filterDataPekerjaan').setValue(null);
                //             Ext.getCmp('namaorg_filterDataPekerjaan').setValue(null);
                //             Ext.getCmp('namajabatan_filterDataPekerjaan').setValue(null);
                //             Ext.getCmp('startdate_DataPekerjaan').setValue(null);
                //             Ext.getCmp('enddate_DataPekerjaan').setValue(null);
                //             storeGridDataPekerjaan.reload();
                //         }
                // },
                {
                    text: 'Detail',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridDataPekerjaan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formPekerjaan2 = Ext.getCmp('formPekerjaan2');
                            formPekerjaan2.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Pekerjaan/1/personalia',
                                params: {
                                    extraparams: 'a.idpelamar:' + selectedRecord.data.idpelamar
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(action.response.responseText);
                                    // console.log(action)
                                    // getFotoPegawai(d.data.idpelamar);
                                    // setValueHeader(d);
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wPekerjaan2.show();
                            // Ext.getCmp('statusformPekerjaan').setValue('edit');

                            // Ext.getCmp('TabItemKaryawan').setActiveItem(0);
                        }

                    }
                },
                {
                    xtype: 'button',
                    text: 'Export Data',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            Ext.Ajax.request({
                                url: SITE_URL + 'sistem/cekakses',
                                method: 'POST',
                                params: {
                                    roleid: 104
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(d.success)
                                    {
                                       //   var location = SITE_URL+"laporan/datapekerjaan/" + nullvalue(Ext.getCmp('companyname_filterDataPekerjaan').getValue())+'/'+
                                       // nullvalue(Ext.getCmp('namajabatan_filterDataPekerjaan').getValue())+'/'+nullvalue(Ext.getCmp('namaorg_filterDataPekerjaan').getValue()) + '/'+ 
                                       // nullvalue(Ext.getCmp('startdate_DataPekerjaan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataPekerjaan').getSubmitValue()) + '/'+ 
                                       // nullvalue(Ext.getCmp('startTerminatedate_DataPekerjaan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('endTerminatedate_DataPekerjaan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataPekerjaan').getValue());

                                        // window.location
                                       window.location = SITE_URL+"laporan/datapekerjaan/" + nullvalue(Ext.getCmp('companyname_filterDataPekerjaan').getValue())+'/'+
                                       nullvalue(Ext.getCmp('startdate_DataPekerjaan').getSubmitValue()) + '/' + nullvalue(Ext.getCmp('enddate_DataPekerjaan').getSubmitValue())+'/'+nullvalue(Ext.getCmp('keaktifanDataPekerjaan').getValue());
                                       // alert(location)
                                    } else {
                                         Ext.Msg.alert("Info", d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                }
                            });
                           
                        }
                    }
                },
                 '->',
                {
                    xtype: 'searchGridDataPekerjaan',
                    emptyText:'Cari Nama/NIK...',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridDataPekerjaan, // same store GridPanel is using
            dock: 'bottom',            
            displayMsg:'Menampilkan {0} - {1} dari {2}',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridDataPekerjaan.load();
                 tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisDataPekerjaanpStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

           var formPekerjaan2 = Ext.getCmp('formPekerjaan2');
                            formPekerjaan2.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Pekerjaan/1/personalia',
                                params: {
                                    extraparams: 'a.idpelamar:' + record.data.idpelamar
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(action.response.responseText);
                                    // console.log(action)
                                    // getFotoPegawai(d.data.idpelamar);
                                    // setValueHeader(d);
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wPekerjaan2.show();

            // Ext.getCmp('statusformDataPekerjaan').setValue('edit');
        }
    }
});


