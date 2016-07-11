
var formPerencanaan = Ext.create('Ext.form.Panel', {
    id: 'formPerencanaan',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/datarawptk/ptk',
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
            xtype: 'hiddenfield',
            name: 'statusformdatarawptk',
            id: 'statusformdatarawptk'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idperencanaantk',
            name: 'idperencanaantk'
        },{
            xtype: 'hiddenfield',
            id: 'revisistatus_formPerencanaan',
            name: 'revisistatus'
        },
        {
            xtype: 'hiddenfield',
            value:'saved',
            name: 'status'
        },
        {
            xtype: 'comboxcompany',
            id:'companyname_fRevisiPerencanaan',
            allowBlank: false,
            name: 'companyname'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Tahun',
            id:'tahun_fRevisiPerencanaan',
            allowBlank: false,
            name: 'tahun'
        },

        {
            xtype:'hiddenfield',
            id:'idjabatan_formPerencanaan',
            name:'idjabatan'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jabatan',
            name: 'namajabatan',
            allowBlank:false,
            id: 'namajabatan_formPerencanaan',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        // wGridStrukturJabatanList_formPerencanaanPopup.show();
                        // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                        //             operation.params={
                        //                         'idunit': Ext.getCmp('idunitPerencanaanTK').getValue(),
                        //                         'idaccounttype': '12,16,11'
                        //             };
                        //         });
                                // storeGridStrukturJabatanList_formPerencanaan.load();
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Jabatan',
            id:'kodejabatan_formPerencanaan',
            name: 'kodejabatan',
            readOnly:true
        },
        {
            xtype:'hiddenfield',
            id:'idlevel_formPerencanaan',
            name:'idlevel'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Level Jabatan',
            id:'levelname_formPerencanaan',
            name: 'kodelevel',
            readOnly:true
        },
        {
            xtype:'hiddenfield',
            id:'idorganisasi_formPerencanaan',
            name:'idorganisasi'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi Jabatan',
            id:'namaorg_formPerencanaan',
            name: 'namaorg',
            readOnly:true
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Budget Organisasi',
            id:'kodebudgetorg_formPerencanaan',
            name: 'kodebudgetorg',
            readOnly:true
        },        
        {
            xtype:'hiddenfield',
            id:'idjabatanatasan_formPerencanaan',
            name:'idjabatanatasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan Atasan',
            id:'namajabatanatasan_formPerencanaan',
            name: 'namajabatanatasan',
            readOnly:true
        },
        {
            xtype:'comboxlokasi',
            valueField:'idlokasiorg',
            id:'lokasi_fRevisiPerencanaan'
        },
        {
            xtype:'comboxbulan',
            id:'bulan_fRevisiPerencanaan'
        },
         {
            xtype: 'numberfield',
            fieldLabel: 'Jumlah',
            allowBlank: false,
             id: 'jumlah_formPerencanaan',
            name: 'jumlah'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Revisi',
            allowBlank: false,
            id: 'revisi_formPerencanaan',
            name: 'revisi'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Jumlah Revisi',
            id:'jumlahrevisi_formPerencanaanDisplay',
            name: 'jumlahrevisi_display'
        }, 
         {
            xtype: 'hiddenfield',
            fieldLabel: 'Jumlah',
            id: 'jumlahrevisi_formPerencanaan',
            name: 'jumlahrevisi'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPerencanaan');
                Ext.getCmp('formPerencanaan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPerencanaanSimpan',
            text: 'Simpan',
            handler: function() {
                kotakLoading();
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPerencanaan').getForm().reset();
                            Ext.getCmp('windowPopupPerencanaan').hide();
                            storeGridPerencanaan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPerencanaan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPerencanaan = Ext.create('widget.window', {
    id: 'windowPopupPerencanaan',
    title: 'Form Perencanaan Tenaga Kerja',
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
    items: [formPerencanaan]
});


storeGridPerencanaan.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.status:saved'+','+
                    'a.tahun:'+Ext.getCmp('tahun_filterptk').getValue()+','+
                    'a.idcompany:'+Ext.getCmp('companyname_filterptk').getValue()+','+
                    'a.namabulan:'+Ext.getCmp('namabulan_filterptk').getValue()+','+
                    'a.idjabatan:'+Ext.getCmp('namajabatan_filterptk').getValue()+','+
                    'a.idorganisasi:'+Ext.getCmp('namaorg_filterptk').getValue()
                  };
              });

Ext.define('MY.searchGridPerencanaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPerencanaan',
    store: storeGridPerencanaan,
    width: 180
});

var smGridPerencanaan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPerencanaan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePerencanaan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePerencanaan').enable();
        }
    }
});
Ext.define('GridPerencanaan', {
    // renderTo:'mytabpanel',
   multiSelect: true,
//    selModel: smGridPerencanaan,
    title: 'Daftar Perencanaan Tenaga Kerja',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPerencanaanID',
    id: 'GridPerencanaanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPerencanaan',
    store: storeGridPerencanaan,
    loadMask: true,
    columns: [
         {
            header: 'idperencanaantk',
            hidden: true,
            dataIndex: 'idperencanaantk'
        },
        {
            header: 'tahunperencanaan',
            hidden: true,
            dataIndex: 'idjabatan'
        },{
            header: 'idcompany',
            hidden: true,
            dataIndex: 'idcompany'
        },{
            header: 'idjabatan',
            hidden: true,
            dataIndex: 'idjabatan'
        },{
            header: 'idlevel',
            hidden: true,
            dataIndex: 'idlevel'
        },{
            header: 'idorganisasi',
            hidden: true,
            dataIndex: 'idorganisasi'
        },{
            header: 'idlokasi',
            hidden: true,
            dataIndex: 'idlokasi'
        },{
            header: 'idjabatanatasan',
            hidden: true,
            dataIndex: 'idjabatanatasan'
        },{
            header: 'idupload',
            hidden: true,
            dataIndex: 'idupload'
        },{
            header: 'Perusahaan',
            dataIndex: 'companyname',
            width: 200
        },{
            header: 'Kode Jabatan',
            dataIndex: 'kodejabatan',
            width: 100
        }, {
            header: 'Nama Jabatan',
            dataIndex: 'namajabatan',
            flex:1,
            minWidth: 120
        }, {
            header: 'Level Jabatan',
            dataIndex: 'kodelevel',
            width: 150
        }, {
            header: 'Nama Organisasi',
            dataIndex: 'namaorg',
            width: 150
        }, {
            header: 'Lokasi',
            dataIndex: 'namalokasi',
            width: 150
        }, {
            header: 'Nama Jabatan Atasan',
            dataIndex: 'namajabatanatasan',
            width: 150
        }, {
            header: 'Tahun',
            dataIndex: 'tahun',
            width: 80
        }, 
        {
            header: 'Bulan',
            sortable: false,
            dataIndex: 'namabulan',
            width: 130
        },
        {
            header: 'Jumlah',
            dataIndex: 'jumlah',
            align: 'right'
        },{
            header: 'Revisi',
            dataIndex: 'revisi',
            align: 'right'
        },{
            header: 'Jumlah Revisi',
            dataIndex: 'jumlahrevisi',
            align: 'right',
            width: 150
        }
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype:'comboxTahunTK',
                        id: 'tahun_filterptk',
                        listeners: {
                        select: function() { 
                                storeGridPerencanaan.load();
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
                        id:'filtercb_companyPtk',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_companyPtk').getValue())
                                    {
                                        Ext.getCmp('companyname_filterptk').setValue(null);
                                        Ext.getCmp('companyname_filterptk').setDisabled(true);
                                        storeGridPerencanaan.load();

                                        filter_rtk(true);
                                    } else {
                                        Ext.getCmp('companyname_filterptk').setDisabled(false);
                                        storeGridPerencanaan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterptk',
                        valueField:'idcompany',
                        name: 'companyname',
                        labelWidth: 70,
                        listeners: {
                        select: function(n,v) { 
                                filter_rtk(false);
                                storeGridPerencanaan.load();

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
                        id:'df_org_ptk',
                        disabled:true,
                        labelWidth:72,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        disabled:true,
                        name: 'checkbox1',
                        id:'filtercb_orgPtk',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_orgPtk').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterptk').setValue(null);
                                        Ext.getCmp('namaorg_filterptk').setDisabled(true);
                                        storeGridPerencanaan.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterptk').setDisabled(false);
                                        storeGridPerencanaan.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        disabled:true,
                        fieldLabel:'',
                        id: 'namaorg_filterptk',
                        valueField:'idorganisasi',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridPerencanaan.load();
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
                        id:'filtercb_bulanPtk',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){2
                                    if(Ext.getCmp('filtercb_bulanPtk').getValue())
                                    {
                                        Ext.getCmp('namabulan_filterptk').setValue(null);
                                        Ext.getCmp('namabulan_filterptk').setDisabled(true);
                                        storeGridPerencanaan.load();
                                    } else {
                                        Ext.getCmp('namabulan_filterptk').setDisabled(false);
                                        storeGridPerencanaan.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxbulan',
                        fieldLabel:'',
                        id: 'namabulan_filterptk',
                        name: 'namabulan',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridPerencanaan.load();
                                // console.log(this.value)
                            }
                        }
                    },

                    {
                        xtype:'displayfield',
                        id:'df_jabatan_ptk',
                        disabled:true,
                        labelWidth:72,
                        fieldLabel:'Jabatan'
                    },
                    {
                        xtype: 'checkboxfield',
                        disabled:true,
                        name: 'checkbox1',
                        id:'filtercb_jabatanPtk',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){ 
                                    if(Ext.getCmp('filtercb_jabatanPtk').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterptk').setValue(null);
                                        Ext.getCmp('namajabatan_filterptk').setDisabled(true);
                                        storeGridPerencanaan.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterptk').setDisabled(false);
                                        storeGridPerencanaan.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        disabled:true,
                        fieldLabel:'',
                        id: 'namajabatan_filterptk',
                        valueField:'idjabatan',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() { 
                                storeGridPerencanaan.load();
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
                    text: 'Tambah Perencanaan',
                    iconCls: 'add-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 66
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wEntryPerencanaanTK.show();
                                    Ext.getCmp('statusformdatarawptk').setValue('input');
                                    lokasiStore.load();
                                    companyStore.load();
                                    clearFormKTK();
                                    Ext.getCmp('revisi_addRowktk').setDisabled(true);
                                    Ext.getCmp('jumlahrevisi_addRowktk').setDisabled(true);
                                    Ext.getCmp('jumlah_addRowKtk').setReadOnly(false);
                                    Ext.getCmp('lokasi_fRevisiPerencanaan').setReadOnly(false);
                                    PerencanaanTKGridStore.load();
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });
                        
                        // Ext.getCmp('revisi_addRowktk').setValue(true);
                    }
                },
                 {
                    text: 'Import Perencanaan',
                    iconCls: 'page_excel',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 67
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    winImportPerencanaan.show();
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
                    xtype: 'button',
                    text: 'Export Data',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            Ext.Ajax.request({
                                url: SITE_URL + 'sistem/cekakses',
                                method: 'POST',
                                params: {
                                    roleid: 176
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(d.success)
                                    {
                                        window.location = SITE_URL+"laporan/perencanaantk/" + 
                                       filter_clear(Ext.getCmp('tahun_filterptk').getValue())+'/'+
                                       filter_clear(Ext.getCmp('companyname_filterptk').getValue())+'/'+ 
                                       filter_clear(Ext.getCmp('namabulan_filterptk').getSubmitValue()) + '/' + 
                                       filter_clear(Ext.getCmp('namajabatan_filterptk').getSubmitValue()) + '/' + 
                                       filter_clear(Ext.getCmp('namaorg_filterptk').getSubmitValue());

                                       // console.log(l);
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
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 68
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPerencanaan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                                    } else {
                                        // console.log(selectedRecord.data.idupload)
                                        if(selectedRecord.data.idupload!=null)
                                        {
                                            Ext.Msg.alert('Failure', 'Data ini tidak bisa diubah.');
                                        } else {
                                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                            var formPerencanaan = Ext.getCmp('formPerencanaan');
                                            formPerencanaan.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/datarawptk/1/ptk',
                                                params: {
                                                    extraparams: 'a.idperencanaantk:' + selectedRecord.data.idperencanaantk
                                                },
                                                success: function(form, action) {
                                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            })

                                            wPerencanaan.show();
                                            Ext.getCmp('statusformdatarawptk').setValue('edit');
                                            Ext.getCmp('revisistatus_formPerencanaan').setValue('false');
                                            Ext.getCmp('revisi_formPerencanaan').setReadOnly(true);
                                            Ext.getCmp('jumlahrevisi_formPerencanaan').setDisabled(true);
                                            Ext.getCmp('companyname_fRevisiPerencanaan').setReadOnly(true);
                                            Ext.getCmp('tahun_fRevisiPerencanaan').setReadOnly(true);
                                            Ext.getCmp('namajabatan_formPerencanaan').setReadOnly(true);
                                            Ext.getCmp('lokasi_fRevisiPerencanaan').setReadOnly(true);
                                            Ext.getCmp('jumlah_formPerencanaan').setReadOnly(false);
                                            Ext.getCmp('bulan_fRevisiPerencanaan').setReadOnly(false);

                                             lokasiStore.load();

                                             Ext.getCmp('windowPopupPerencanaan').setTitle('Form Ubah Jumlah Perencanaan Tenaga Kerja');
                                        }
                                        
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
                    text: 'Revisi',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 69
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPerencanaan')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPerencanaan = Ext.getCmp('formPerencanaan');
                                        formPerencanaan.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/datarawptk/1/ptk',
                                            params: {
                                                extraparams: 'a.idperencanaantk:' + selectedRecord.data.idperencanaantk
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                Ext.getCmp('jumlahrevisi_formPerencanaanDisplay').setValue(d.data.jumlahrevisi);
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPerencanaan.show();
                                        Ext.getCmp('statusformdatarawptk').setValue('edit');
                                        Ext.getCmp('revisistatus_formPerencanaan').setValue('true');
                                        Ext.getCmp('jumlah_formPerencanaan').setReadOnly(true);
                                        Ext.getCmp('revisi_formPerencanaan').setReadOnly(false);

                                        Ext.getCmp('companyname_fRevisiPerencanaan').setReadOnly(true);
                                        Ext.getCmp('tahun_fRevisiPerencanaan').setReadOnly(true);
                                        Ext.getCmp('namajabatan_formPerencanaan').setReadOnly(true);
                                        Ext.getCmp('bulan_fRevisiPerencanaan').setReadOnly(true);
                                        Ext.getCmp('lokasi_fRevisiPerencanaan').setReadOnly(true);
                                        Ext.getCmp('lokasi_fRevisiPerencanaan').setReadOnly(true);
                                        // Ext.getCmp('jumlahrevisi_formPerencanaan').setDisabled(false);

                                        Ext.getCmp('windowPopupPerencanaan').setTitle('Form Revisi Perencanaan Tenaga Kerja');


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
                    id: 'btnDeletePerencanaan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        // alert(group_id)
                        // if(group_id==1)
                        // {
                        //     Ext.Msg.alert("Info", 'Data tidak bisa dihapus');
                        // } else {
                            Ext.Ajax.request({
                                url: SITE_URL + 'sistem/cekakses',
                                method: 'POST',
                                params: {
                                    roleid: 70
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
                                                    var grid = Ext.ComponentQuery.query('GridPerencanaan')[0];
                                                    var sm = grid.getSelectionModel();
                                                    selected = [];
                                                    Ext.each(sm.getSelection(), function(item) {
                                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                                    });
                                                    Ext.Ajax.request({
                                                        url: SITE_URL + 'backend/ext_delete/datarawptk/ptk/hidden',
                                                        method: 'POST',
                                                        params: {postdata: Ext.encode(selected)},
                                                        success: function(form, action) {
                                                            var d = Ext.decode(form.responseText);
                                                            if(!d.success)
                                                            {
                                                                Ext.Msg.alert('Info', d.message);
                                                            } else {
                                                                storeGridPerencanaan.load();
                                                            }
                                                        },
                                                        failure: function(form, action) {
                                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                        }
                                                    });
                                                    // storeGridPerencanaan.remove(sm.getSelection());
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
                            
                        // }
                        
                    },
//                    disabled: true
                },'-',
                    {
                        text: 'Reset',
                        iconCls: 'refresh',
                        handler: function() {


                            Ext.getCmp('namabulan_filterptk').setValue(null);
                            Ext.getCmp('companyname_filterptk').setValue(null);
                            Ext.getCmp('tahun_filterptk').setValue(null);
                            Ext.getCmp('namaorg_filterptk').setValue(null);
                            Ext.getCmp('namajabatan_filterptk').setValue(null);
                            
                            storeGridPerencanaan.reload();

                            filter_rtk(true);
                        }
                    },'->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPerencanaan',
                    hidden:true,
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPerencanaan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPerencanaan.load();
                tahunTKStore.load();
                companyStore.load();
                // jabatanStore.load();
                // orgStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formPerencanaan = Ext.getCmp('formPerencanaan');
            // wPerencanaan.show();
            // formPerencanaan.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/Perencanaan/1/natadaya',
            //     params: {
            //         extraparams: 'a.Perencanaanid:' + record.data.Perencanaanid
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPerencanaan').setValue('edit');
        }
    }
});

function filter_clear(v)
{
    console.log(v);
    if(v=='')
    {
        return 'null';
    } else {
        return v;
    }
}

function clearFormKTK()
{
    Ext.Ajax.request({
        url: SITE_URL + 'ptk/clearFormKTK',
        method: 'GET'
    });
    // PerencanaanTKGridStore.load();
    // PerencanaanTKGridStore.remove();
}

function filter_rtk(opt)
{
    Ext.getCmp('df_org_ptk').setDisabled(opt);
    Ext.getCmp('filtercb_orgPtk').setDisabled(opt);
    Ext.getCmp('namaorg_filterptk').setDisabled(opt);
    Ext.getCmp('df_jabatan_ptk').setDisabled(opt);
    Ext.getCmp('filtercb_jabatanPtk').setDisabled(opt);
    Ext.getCmp('namajabatan_filterptk').setDisabled(opt);

    if(opt===true)
    {
        Ext.getCmp('filtercb_orgPtk').setValue(null);
        Ext.getCmp('namaorg_filterptk').setValue(null);
        Ext.getCmp('filtercb_jabatanPtk').setValue(null);
        Ext.getCmp('namajabatan_filterptk').setValue(null);
    } 
}