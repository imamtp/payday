Ext.define('GridPermintaanModel', {
    extend: 'Ext.data.Model',
    fields: ['idpermintaantk','nomorpermintaantk','namaatasan','jumlahrencana','periodekekaryaan','rencanatglmasuk','jumlahsaatini','selisih','tujuan','levelname','kodelevel','kodejabatan','statusperencanaan','tahun','idcompany','idjabatan','idorganisasi','idlokasiorg','idjabatanatasan','namabulan','jumlahpermintaantk','jumlahbulankekaryaan','tglakhirkekaryaan','status','userin','usermod','companyname','companycode','kodeorg','kodebudgetorg','namaorg','namalokasi','namajabatan','namajabatanatasan','kekaryaanname'],
    idProperty: 'id'
});

var storeGridPermintaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPermintaanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Permintaantk/ptk',
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

storeGridPermintaan.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams':  'a.tahun:'+Ext.getCmp('tahun_filterPermintaanTK').getValue()+','+'b.companyname:'+Ext.getCmp('companyname_filterPermintaanTK').getValue()+','+'a.namabulan:'+Ext.getCmp('namabulan_filterPermintaanTK').getValue()+','+'e.namajabatan:'+Ext.getCmp('namajabatan_filterPermintaanTK').getValue()+','+'c.namaorg:'+Ext.getCmp('namaorg_filterPermintaanTK').getValue()
                  };
              });

var formPermintaan = Ext.create('Ext.form.Panel', {
    id: 'formPermintaan',
    // title:'Data Pribadi',
    url: SITE_URL + 'backend/saveform/Permintaantk/ptk',
    bodyStyle: 'padding:5px',
    autoWidth: true,
    autoHeight: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 210,
        anchor:'100%'
        // width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
        items: [{
                        xtype: 'fieldset',
                        title: 'Data Perencanaan',
                        // collapsible: true,
                        items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'statusformPermintaantk',
                                    id: 'statusformPermintaan'
                                }, {
                                    xtype: 'hiddenfield',
                                    fieldLabel: 'idpermintaantk',
                                    name: 'idpermintaantk'
                                }, 
                    // {
                    //     xtype: 'displayfield',
                    //     id:'nomorpermintaantk_fPermintaan',
                    //     name: 'nomorpermintaantk',
                        // listeners: {
                        //     render: function(component) {
                        //         component.getEl().on('click', function(event, el) {
                        //             insertNoRef('nomorpermintaantk','nomorpermintaantk_fPermintaan','PTK');
                        //         });
                        //     }
                        // }
                    // },      
                    {
                        xtype: 'textfield',
                        readOnly:true,
                        fieldLabel: 'Nomor PTK',
                        name: 'nomorpermintaantk',
                        id:'nomorpermintaantk_fPermintaan'
                    },
                    // {
                    //     xtype: 'hiddenfield',
                    //     id:'idcompany_fPermintaan',
                    //     name: 'idcompany'
                    // },                     
                    {
                        xtype: 'comboxcompany',
                        // valueField:'idcompany',
                        id: 'companyname_fPermintaan',
                        allowBlank:false,
                        name: 'companyname',
                        listeners: {
                        select: function() { 
                                // storeGridPermintaan.load();
                                getNumPerencanaan();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'comboxTahunTK',
                        allowBlank:false,
                        id: 'tahun_fPermintaan',
                        listeners: {
                        select: function() { 
                            getNumPerencanaan();
                                // storeGridPermintaan.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype: 'comboxbulan',
                        allowBlank:false,
                        id: 'namabulan_fPermintaan',
                        name: 'namabulan',
                        listeners: {
                        select: function() { 
                            getNumPerencanaan();
                                // console.log(this.value)
                                // kotakLoading();

                                 // Ext.Ajax.request({
                                 //        url: SITE_URL + 'ptk/getPerencanaan',
                                 //        method: 'POST',
                                 //        params: {
                                 //            tahun: Ext.getCmp('tahun_fPermintaan').getValue(),
                                 //            idcompany: Ext.getCmp('companyname_fPermintaan').getValue(),
                                 //            namabulan: this.value
                                 //        },
                                 //        success: function(form, action) {
                                 //            var d = Ext.decode(form.responseText);
                                 //            console.log(d.data);
                                 //            if (!d.success) {
                                 //                // Ext.Msg.alert('Peringatan', d.message);
                                 //            } else {
                                 //                // Ext.Msg.alert('Success', d.message);
                                 //                //   
                                 //                Ext.getCmp('idcompany_fPermintaan').setValue(d.data.idcompany); 
                                 //                Ext.getCmp('idjabatan_fPermintaan').setValue(d.data.idjabatan);                     
                                 //                Ext.getCmp('namajabatan_fPermintaan').setValue(d.data.namajabatan);
                                 //                Ext.getCmp('levelname_fPermintaan').setValue(d.data.levelname);
                                 //                Ext.getCmp('idorganisasi_fPermintaan').setValue(d.data.idorganisasi); 
                                 //                Ext.getCmp('namaorg_fPermintaan').setValue(d.data.namaorg);
                                 //                Ext.getCmp('idlokasiorg_fPermintaan').setValue(d.data.idlokasiorg); 
                                 //                Ext.getCmp('namalokasi_fPermintaan').setValue(d.data.namalokasi);
                                 //                Ext.getCmp('idjabatanatasan_fPermintaan').setValue(d.data.idjabatanatasan);
                                 //                Ext.getCmp('namajabatanatasan_fPermintaan').setValue(d.data.namajabatanatasan);

                                 //                // jumlahperencanaan
                                 //                Ext.getCmp('jumlahrencana_fPermintaan').setValue(d.data.jumlahperencanaan);
                                 //                Ext.Msg.hide();
                                 //            }
                                 //        },
                                 //        failure: function(form, action) {
                                 //            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                 //            Ext.Msg.hide();
                                 //        }
                                 //    });
                            }
                        }
                    },{
                        xtype:'comboxlokasi',
                        valueField:'idlokasiorg',
                        id:'idlokasiorg_fPermintaan',
                        name: 'idlokasiorg',
                        listeners: {
                        select: function() { 
                                getNumPerencanaan();
                            }
                        }
                    },
                    {
                        xtype:'hiddenfield',
                        id:'idstrukturjabatan_fPermintaan',
                        name:'idstrukturjabatan'
                    },
                    {
                        xtype:'hiddenfield',
                        id:'idjabatan_fPermintaan',
                        name:'idjabatan'
                    },
                    Ext.define('Ext.ux.namajabatan_fPermintaan', {
                        extend: 'Ext.form.field.Trigger',
                        alias: 'widget.namajabatan_fPermintaan',
                        fieldLabel: 'Pilih Jabatan',
                        name: 'namajabatan',
                        allowBlank:false,
                        id: 'namajabatan_fPermintaan',
                        emptyText: 'Pilih Jabatan...',
                        onTriggerClick: function() {
                            wGridStrukturJabatanList_fPermintaanPopup.show();
                            storeGridStrukturJabatanList_fPermintaan.load();
                        }
                    }),
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Kode Jabatan',
                        id:'kodejabatan_fPermintaan',
                        name: 'kodejabatan',
                        readOnly:true
                    },
                    {
                        xtype:'hiddenfield',
                        id:'idlevel_fPermintaan',
                        name:'idlevel'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Level Jabatan',
                        id:'levelname_fPermintaan',
                        name: 'levelname',
                        readOnly:true
                    },
                    {
                        xtype:'hiddenfield',
                        id:'idorganisasi_fPermintaan',
                        name:'idorganisasi'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Nama Organisasi Jabatan',
                        id:'namaorg_fPermintaan',
                        name: 'namaorg',
                        readOnly:true
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Kode Budget Organisasi',
                        id:'kodebudgetorg_fPermintaan',
                        name: 'kodebudgetorg',
                        readOnly:true
                    },        
                    {
                        xtype:'hiddenfield',
                        id:'idjabatanatasan_fPermintaan',
                        name:'idjabatanatasan'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Nama Jabatan Atasan',
                        id:'namajabatanatasan_fPermintaan',
                        name: 'namajabatanatasan',
                        readOnly:true
                    },
                    // {
                    //     xtype: 'hiddenfield',
                    //     id:'idjabatan_fPermintaan',
                    //     name: 'idjabatan'
                    // },
                    // {
                    //     xtype: 'displayfield',
                    //     fieldLabel: 'Nama Jabatan',
                    //     allowBlank: false,
                    //     id:'namajabatan_fPermintaan',
                    //     name: 'namajabatan'
                    // },
                    // {
                    //     xtype: 'displayfield',
                    //     fieldLabel: 'Level Jabatan',
                    //     allowBlank: false,
                    //     id:'levelname_fPermintaan',
                    //     name: 'levelname'
                    // },
                    // {
                    //     xtype: 'hiddenfield',
                    //     id:'idorganisasi_fPermintaan',
                    //     name: 'idorganisasi'
                    // },
                    // {
                    //     xtype: 'displayfield',
                    //     fieldLabel: 'Nama Organisasi',
                    //     allowBlank: false,
                    //     id:'namaorg_fPermintaan',
                    //     name: 'namaorg'
                    // },
                    
                    // {
                    //     xtype: 'hiddenfield',
                    //     id:'idlokasiorg_fPermintaan',
                    //     name: 'idlokasiorg'
                    // },
                    // {
                    //     xtype: 'displayfield',
                    //     fieldLabel: 'Lokasi',
                    //     allowBlank: false,
                    //     id:'namalokasi_fPermintaan',
                    //     name: 'namalokasi'
                    // },
                    // {
                    //     xtype: 'hiddenfield',
                    //     id:'idjabatanatasan_fPermintaan',
                    //     name: 'idjabatanatasan'
                    // },   
                    // {
                    //     xtype: 'displayfield',
                    //     fieldLabel: 'Nama Jabatan Atasan',
                    //     id:'namajabatanatasan_fPermintaan',
                    //     name: 'namajabatanatasan'
                    // },  
                    // {
                    //     xtype: 'textfield',
                    //     allowBlank:false,
                    //     fieldLabel: 'Nama Atasan',
                    //     // id:'namajabatanatasan_addRowktk',
                    //     name: 'namaatasan'
                    // },     
                    {
                        xtype: 'hiddenfield',
                        id: 'idpelamaratasan_fPermintaan',
                        name: 'idpelamaratasan'
                    },
                    Ext.define('Ext.ux.namaatasan_fPermintaan', {
                        extend: 'Ext.form.field.Trigger',
                        alias: 'widget.namaatasan_fPermintaan',
                        editable: false,
                        fieldLabel: 'Nama Atasan',
                        // allowBlank: false,
                        id: 'namaatasan_fPermintaan',
                        name: 'namaatasan',
                        emptyText: 'Pilih Atasan...',
                        onTriggerClick: function() {
                            wGridNamaAtasanPermintaanTKListPopup.show();
                            storeGridNamaAtasanPermintaanTKList.load();
                        }
                    }), 
                              
                    {
                        xtype: 'textfield',
                        readOnly:true,
                        allowBlank:false,
                        fieldLabel: 'Jumlah Perencanaan Tenaga Kerja',
                        id:'jumlahrencana_fPermintaan',
                        name: 'jumlahrencana'
                    },
                    {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        name:'rencanatglmasuk',
                        id:'rencanatglmasuk',
                        allowBlank: false,
                        fieldLabel: 'Rencana Tanggal Masuk'
                    }]
        }]
    }, {
        items: [
        {
            xtype: 'fieldset',
            title: 'Data Permintaan',
            // collapsible: true,
            items: [{
                        xtype: 'numberfield',
                        readOnly:true,
                        allowBlank:false,
                        fieldLabel: 'Jumlah Tenaga Kerja Saat Ini',
                        id:'jumlahsaatini_fPermintaan',
                        // allowBlank: false,
                        name: 'jumlahsaatini'
                    },{
                        xtype: 'numberfield',
                        readOnly:true,
                        allowBlank:false,
                        fieldLabel: 'Selisih',
                        id:'selisih_fPermintaan',
                        // allowBlank: false,
                        name: 'selisih'
                    },{
                        xtype: 'textarea',
                        fieldLabel: 'Tujuan Permintaan',
                        allowBlank:false,
                        // allowBlank: false,
                        name: 'tujuan'
                    },
                    {
                        xtype:'comboxPerencanaan',
                        allowBlank:false,
                        name:'statusperencanaan'
                    },
                    {
                        xtype:'comboxkekaryaan',
                        // allowBlank:false,
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                if(newValue=='TETAP')
                                {
                                    Ext.getCmp('periodekekaryaan').setDisabled(true);
                                    Ext.getCmp('jumlahbulankekaryaan').setDisabled(true);
                                    Ext.getCmp('tglakhirkekaryaan').setValue('31-12-9999');
                                } else if(newValue=='PERCOBAAN')
                                {
                                    Ext.getCmp('periodekekaryaan').setDisabled(true);
                                    Ext.getCmp('jumlahbulankekaryaan').setDisabled(true);
                                    Ext.getCmp('tglakhirkekaryaan').setValue('31-12-9999');
                                } else if(newValue=='KONTRAK')
                                {
                                    Ext.getCmp('periodekekaryaan').setDisabled(false);
                                    Ext.getCmp('jumlahbulankekaryaan').setDisabled(false);
                                    Ext.getCmp('tglakhirkekaryaan').setDisabled(false);
                                    Ext.getCmp('tglakhirkekaryaan').setReadOnly(true);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'radiogroup',
                        allowBlank:false,
                        id:'periodekekaryaan',
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
                                    Ext.getCmp('jumlahbulankekaryaan').setDisabled(false);
                                    // Ext.getCmp('tglakhirkekaryaan').setDisabled(true);
                                } else if (newValue.periodekekaryaan == 2){
                                    Ext.getCmp('jumlahbulankekaryaan').setDisabled(true);
                                    Ext.getCmp('tglakhirkekaryaan').setDisabled(false);
                                    Ext.getCmp('tglakhirkekaryaan').setReadOnly(false);
                                }
                            }
                        }
                                            // listeners: {
                        //     change: function (field, newValue, oldValue) 

                        //         switch (newValue['periodekekaryaan']) {
                        //             case 1:
                        //                 Ext.getCmp('jumlahbulankekaryaan').show();
                        //                 Ext.getCmp('tglakhirkekaryaan').hide();
                        //                 break;
                        //             case 2:
                        //                 Ext.getCmp('jumlahbulankekaryaan').hide();
                        //                 Ext.getCmp('tglakhirkekaryaan').show();
                        //                 break;
                        //         }
                        //     }
                        // }
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank:false,
                        // hidden:true,
                        fieldLabel: 'Jumlah Bulan Kekaryawanan',
                        // allowBlank: false,
                        // value:1,
                        minValue:1,
                        id: 'jumlahbulankekaryaan',
                        name: 'jumlahbulankekaryaan',
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                // console.log(Ext.getCmp('rencanatglmasuk').getSubmitValue())

                                var tgl = moment(Ext.getCmp('rencanatglmasuk').getSubmitValue(), "DD-MM-YYYY").add(newValue, 'months');
                                // var tglakhir = tgl.format('DD-MM-YYYY');
                                // console.log(tgl.format('DD-MM-YYYY'))
                                var tglakhir = moment(tgl.format('DD-MM-YYYY'), "DD-MM-YYYY").subtract(1, 'days');
                                 // console.log(tglakhir.format('DD-MM-YYYY'))
                                Ext.getCmp('tglakhirkekaryaan').setValue(tglakhir.format('DD-MM-YYYY'));
                            }
                        }
                    },
                    {
                        xtype: 'datefield',
                        // hidden:true,
                        format: 'd-m-Y',
                        allowBlank:false,
                        id:'tglakhirkekaryaan',
                        name:'tglakhirkekaryaan',
                        // allowBlank: false,
                        fieldLabel: 'Tgl Akhir Kekaryawanan'
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank:false,
                        fieldLabel: 'Jumlah Permintaan Tenaga Kerja',
                        // allowBlank: false,
                        name: 'jumlahpermintaantk'
                    }
                ]
        }]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupPermintaan');
            Ext.getCmp('formPermintaan').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnPermintaanTkSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formPermintaan').getForm().reset();
                        Ext.getCmp('windowPopupPermintaan').hide();
                        storeGridPermintaan.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridemployeeGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});


var wPermintaan = Ext.create('widget.window', {
    id: 'windowPopupPermintaan',
    title: 'Form Permintaan Tenaga Kerja',
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
    items: [formPermintaan]
});


Ext.define('MY.searchGridPermintaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPermintaan',
    store: storeGridPermintaan,
    width: 180
});
var smGridPermintaan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPermintaan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePermintaan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePermintaan').enable();
        }
    }
});
Ext.define('GridPermintaan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPermintaan,
    title: 'Daftar Permintaan Tenaga Kerja (PTK)',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPermintaanID',
    id: 'GridPermintaanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPermintaan',
    store: storeGridPermintaan,
    loadMask: true,
    columns: [
       {header: 'idpermintaantk', dataIndex: 'idpermintaantk', hidden: true},
        {header: 'No PTK', dataIndex: 'nomorpermintaantk', minWidth: 190},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 190},
        {header: 'Tgl PTK', dataIndex: 'rencanatglmasuk', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Bulan Dibutuhkan', dataIndex: 'namabulan', minWidth: 150},
        {header: 'Jumlah Rencana(revisi)', dataIndex: 'jumlahrencana', minWidth: 180},
        {header: 'Jumlah Saat Ini', dataIndex: 'jumlahsaatini', minWidth: 150},
        {header: 'Selisih', dataIndex: 'selisih', minWidth: 150},
        {header: 'Jumlah PTK', dataIndex: 'jumlahpermintaantk', minWidth: 150},
        {header: 'Tujuan', dataIndex: 'tujuan', minWidth: 150},
        {header: 'Status', dataIndex: 'statusperencanaan', minWidth: 150}
    ]
    , dockedItems: [
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype:'comboxTahunTK',
                        id: 'tahun_filterPermintaanTK',
                        listeners: {
                        select: function() { 
                                storeGridPermintaan.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Perusahaan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_companyPermintaanTK',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_companyPermintaanTK').getValue())
                                    {
                                        filter_prtk(true);

                                        Ext.getCmp('companyname_filterPermintaanTK').setValue(null);
                                        Ext.getCmp('companyname_filterPermintaanTK').setDisabled(true);
                                        storeGridPermintaan.load();
                                    } else {
                                        Ext.getCmp('companyname_filterPermintaanTK').setDisabled(false);
                                        storeGridPermintaan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterPermintaanTK',
                        name: 'companyname',
                        labelWidth: 70,
                        listeners: {
                        select: function(n,v) { 
                                filter_prtk(false);

                                storeGridPermintaan.load();

                                 orgStore.load({
                                    params:{
                                         idcompany:v[0].data.idcompany
                                    }
                                });
                                 jabatanStore.load({
                                    params:{
                                         idcompany:v[0].data.idcompany
                                    }
                                });
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        disabled:true,
                        id:'df_org_prtk',
                        labelWidth:72,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        disabled:true,
                        name: 'checkbox1',
                        id:'filtercb_orgPermintaanTK',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_orgPermintaanTK').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterPermintaanTK').setValue(null);
                                        Ext.getCmp('namaorg_filterPermintaanTK').setDisabled(true);
                                        storeGridPermintaan.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterPermintaanTK').setDisabled(false);
                                        storeGridPermintaan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        disabled:true,
                        fieldLabel:'',
                        id: 'namaorg_filterPermintaanTK',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridPermintaan.load();
                                // console.log(this.value)
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
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Bulan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_bulanPermintaanTK',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){2
                                    if(Ext.getCmp('filtercb_bulanPermintaanTK').getValue())
                                    {
                                        Ext.getCmp('namabulan_filterPermintaanTK').setValue(null);
                                        Ext.getCmp('namabulan_filterPermintaanTK').setDisabled(true);
                                        storeGridPermintaan.load();
                                    } else {
                                        Ext.getCmp('namabulan_filterPermintaanTK').setDisabled(false);
                                        storeGridPermintaan.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxbulan',
                        fieldLabel:'',
                        id: 'namabulan_filterPermintaanTK',
                        name: 'namabulan',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridPermintaan.load();
                                // console.log(this.value)
                            }
                        }
                    },

                    {
                        xtype:'displayfield',
                        id:'df_jabatan_prtk',
                        disabled:true,
                        labelWidth:72,
                        fieldLabel:'Jabatan'
                    },
                    {
                        xtype: 'checkboxfield',
                        disabled:true,
                        name: 'checkbox1',
                        id:'filtercb_jabatanPermintaanTK',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_jabatanPermintaanTK').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterPermintaanTK').setValue(null);
                                        Ext.getCmp('namajabatan_filterPermintaanTK').setDisabled(true);
                                        storeGridPermintaan.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterPermintaanTK').setDisabled(false);
                                        storeGridPermintaan.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        disabled:true,
                        fieldLabel:'',
                        id: 'namajabatan_filterPermintaanTK',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridPermintaan.load();
                                // console.log(this.value)
                            }
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
                        Ext.getCmp('formPermintaan').getForm().reset();

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 71
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                     wPermintaan.show();
                                        Ext.getCmp('statusformPermintaan').setValue('input');
                                        lokasiStore.load();
                                        companyStore.load();
                                        kekaryaanStore.load();
                                        tahunTKStore.load();
                                        insertNoRef('nomorpermintaantk','nomorpermintaantk_fPermintaan','PTK');
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });
                       

                         // Ext.getCmp('nomorpermintaantk_fPermintaan_display').setValue(Ext.getCmp('nomorpermintaantk_fPermintaan').getValue());
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
                                roleid: 72
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPermintaan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPermintaan = Ext.getCmp('formPermintaan');
                                        formPermintaan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/Permintaantk/1/ptk',
                                            params: {
                                                extraparams: 'a.idpermintaantk:' + selectedRecord.data.idpermintaantk
                                            },
                                            success: function(form, action) {
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPermintaan.show();
                                        Ext.getCmp('statusformPermintaan').setValue('edit');
                                        lokasiStore.load();
                                        companyStore.load();
                                        kekaryaanStore.load();
                                        tahunTKStore.load();
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
                    id: 'btnDeletePermintaan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 73
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
                                                var grid = Ext.ComponentQuery.query('GridPermintaan')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/Permintaantk/ptk/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPermintaan.remove(sm.getSelection());
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
                    xtype: 'searchGridPermintaan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPermintaan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPermintaan.load();
                  tahunTKStore.load();
                companyStore.load();
                // jabatanStore.load();
                // orgStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPermintaan = Ext.getCmp('formPermintaan');
            wPermintaan.show();
            formPermintaan.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Permintaantk/1/ptk',
                params: {
                    extraparams: 'a.idpermintaantk:' + record.data.idpermintaantk
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformPermintaan').setValue('edit');
        }
    }
});


function getNumPerencanaan()
{
    var tahun = Ext.getCmp('tahun_fPermintaan').getValue();
    var companyname = Ext.getCmp('companyname_fPermintaan').getValue();
    var namabulan = Ext.getCmp('namabulan_fPermintaan').getValue();
    var idstrukturjabatan = Ext.getCmp('idstrukturjabatan_fPermintaan').getValue();
    var idlokasiorg = Ext.getCmp('idlokasiorg_fPermintaan').getValue();    
    console.log('idstrukturjabatan '+idstrukturjabatan);
    if(idcompany==null)
    {
        Ext.Msg.alert('Info', 'Pilih perusahaan terlebih dahulu');
        // Ext.getCmp('idlokasiorg_fPermintaan').setValue(null);
    } else
    if(tahun==null)
    {
        Ext.Msg.alert('Info', 'Pilih tahun');
        // Ext.getCmp('idlokasiorg_fPermintaan').setValue(null);
    } else 
    
    if(namabulan==null)
    {
        Ext.Msg.alert('Info', 'Pilih bulan');
        // Ext.getCmp('idlokasiorg_fPermintaan').setValue(null);
    } else
    if(idstrukturjabatan==null)
    {
        Ext.Msg.alert('Info', 'Pilih jabatan');
        // Ext.getCmp('idlokasiorg_fPermintaan').setValue(null);
    } else
    if(idlokasiorg==null)
    {
        Ext.Msg.alert('Info', 'Pilih lokasi');
        // Ext.getCmp('idlokasiorg_fPermintaan').setValue(null);
    } else {
                // console.log(this.value)
                kotakLoading();

                 Ext.Ajax.request({
                        url: SITE_URL + 'ptk/getNumPerencanaan',
                        method: 'POST',
                        params: {
                            tahun: tahun,
                            companyname: companyname,
                            namabulan: namabulan,
                            idlokasiorg: idlokasiorg,
                            idstrukturjabatan: idstrukturjabatan
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d.data);
                            if (!d.success) {
                                // Ext.Msg.alert('Peringatan', d.message);
                            } else {                                                        
                                // jumlahperencanaan
                                if(!d.num)
                                {
                                    Ext.Msg.alert('Peringatan', 'Permintaan tenaga kerja tidak bisa dilanjutkan karena perencanaan tenaga kerja '+Ext.getCmp('companyname_fPermintaan').getValue()+' untuk '+Ext.getCmp('namajabatan_fPermintaan').getValue()+' '+Ext.getCmp('namabulan_fPermintaan').getValue()+' '+Ext.getCmp('tahun_fPermintaan').getValue()+' belum ada');
                                    Ext.getCmp('jumlahrencana_fPermintaan').setValue(0);
                                    Ext.getCmp('BtnPermintaanTkSimpan').setDisabled(true);
                                } else {
                                    Ext.getCmp('jumlahrencana_fPermintaan').setValue(d.num);
                                    Ext.getCmp('BtnPermintaanTkSimpan').setDisabled(false);
                                    Ext.Msg.hide();
                                }
                                Ext.getCmp('jumlahsaatini_fPermintaan').setValue(d.numemployee);
                                Ext.getCmp('selisih_fPermintaan').setValue(d.selisih);
                                // 
                            }
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            Ext.Msg.hide();
                        }
                    });
            }
}

function filter_prtk(opt)
{
    Ext.getCmp('df_org_prtk').setDisabled(opt);
    Ext.getCmp('filtercb_orgPermintaanTK').setDisabled(opt);
    Ext.getCmp('namaorg_filterPermintaanTK').setDisabled(opt);
    Ext.getCmp('df_jabatan_prtk').setDisabled(opt);
    Ext.getCmp('filtercb_jabatanPermintaanTK').setDisabled(opt);
    Ext.getCmp('namajabatan_filterPermintaanTK').setDisabled(opt);

    if(opt===true)
    {
        Ext.getCmp('filtercb_orgPermintaanTK').setValue(null);
        Ext.getCmp('namaorg_filterPermintaanTK').setValue(null);
        Ext.getCmp('filtercb_jabatanPermintaanTK').setValue(null);
        Ext.getCmp('namajabatan_filterPermintaanTK').setValue(null);
    }
}