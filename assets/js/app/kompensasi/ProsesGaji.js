
Ext.define('GridProsesGajiModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','startdate','enddate','masapajaksetahun','namalengkap','kehadiran','punyanpwp','durasi','hitungpajak','tglgajipertama','masakerja','tglmasuk','nilaiptkp','kodeptkp','totalUT','totalUTT','upahlemburPajak','upahlemburNoPajak','totallembur','benefitCmpBruto','benefitCmpNet','benefitEmpBruto','benefitEmpNet','numdayswork','totalpendapatan','penerimaanbruto','tunjanganpajak','biayajabatan','penerimaannet','netosetahun','pkpsetahun','pph5tahun','pph15tahun','pph25tahun','pph35tahun','pphsettahun','pphsebulan','takehomepay','nilaiPotongan','totallembur','nilaiPotongan','benefitCmp','benefitEmp','tglakhirjabatan','pphterminasi','pajakjantonov','pajakterminasi','pajakterbayar','pajakterutangdes','pajaktotalbayarsetahun','nik','companycode','kodeorg','namajabatan','nilaiptkp','penerimaannetTT','pkpsetahunteratur','selisihpph','penerimaanbruto_total'],
    idProperty: 'id'
});

var storeGridProsesGaji = Ext.create('Ext.data.Store', {
    pageSize: 1000,
    model: 'GridProsesGajiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'kompensasi/penggajian',
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
    }],
    listeners: {
        load: function(store, records, success) {
            // console.log(success);
        }
    }

});

// storeGridProsesGaji.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'idcompany': Ext.getCmp('companyname_filterProsesGaji').getValue(),
//                     'idjabatan': Ext.getCmp('namajabatan_filterProsesGaji').getValue(),
//                     'idorganisasi':Ext.getCmp('namaorg_filterProsesGaji').getValue(),
//                     'startdate': Ext.getCmp('startdate_ProsesGaji').getSubmitValue(),
//                     'enddate': Ext.getCmp('enddate_ProsesGaji').getSubmitValue(),
//                   };
//               });

Ext.define('MY.searchGridProsesGaji', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProsesGaji',
    store: storeGridProsesGaji,
    width: 180
});
var smGridProsesGaji = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridProsesGaji.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteProsesGaji').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteProsesGaji').enable();
        }
    }
});
Ext.define('GridProsesGaji', {
    // renderTo:'mytabpanel',
    multiSelect: true,
//    selModel: smGridProsesGaji,
    title: 'Hitung Pengupahan Karyawan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridProsesGajiID',
    id: 'GridProsesGajiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProsesGaji',
    store: storeGridProsesGaji,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 250},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Kode Org', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 180},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'Tgl Masuk', dataIndex: 'tglmasuk', minWidth: 150},
        {header: 'Tgl Terminasi', dataIndex: 'tglakhirjabatan', minWidth: 150},
        {header: 'Punya NPWP', dataIndex: 'punyanpwp', minWidth: 150},
        {header: 'Jumlah Hari', dataIndex: 'durasi', minWidth: 150},
		{header: 'Jumlah Kehadiran', dataIndex: 'kehadiran', minWidth: 150},
        {header: 'Potong PPH', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'Tgl Pertama Gaji', dataIndex: 'tglgajipertama', minWidth: 150},
        {header: 'Masa Kerja(bulan)', dataIndex: 'masakerja', minWidth: 150},
        {header: 'Masa Pajak Setahun', dataIndex: 'masapajaksetahun', minWidth: 150},
        // {header: 'Tgl Masuk', dataIndex: 'tglmasuk', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Upah Tetap', dataIndex: 'totalUT', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Upah Tdk Tetap', dataIndex: 'totalUTT', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Lembur', dataIndex: 'totallembur', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Benefit (perusahaan)', dataIndex: 'benefitCmp', minWidth: 170, xtype:'numbercolumn',align:'right'},
        {header: 'Benefit (karyawan)', dataIndex: 'benefitEmp', minWidth: 170, xtype:'numbercolumn',align:'right'},
        {header: 'Total Potongan Lainnya', dataIndex: 'nilaiPotongan', minWidth: 170, xtype:'numbercolumn',align:'right'},
        {header: 'Total pendapatan', dataIndex: 'totalpendapatan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Bruto', dataIndex: 'penerimaanbruto_total', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Tunjangan Pajak', dataIndex: 'tunjanganpajak', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Biaya Jabatan', dataIndex: 'biayajabatan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Neto Sebulan', dataIndex: 'penerimaannet', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Neto TT', dataIndex: 'penerimaannetTT', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Neto Setahun', dataIndex: 'netosetahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PTKP', dataIndex: 'nilaiptkp', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PKP Setahun', dataIndex: 'pkpsetahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PKP Setahun Teratur', dataIndex: 'pkpsetahunteratur', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PPH5 Setahun', dataIndex: 'pph5tahun', minWidth: 150, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'PPH15 Setahun', dataIndex: 'pph15tahun', minWidth: 150, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'PPH25 Setahun', dataIndex: 'pph25tahun', minWidth: 150, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'PPH35 Setahun', dataIndex: 'pph35tahun', minWidth: 150, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'PPH Setahun', dataIndex: 'pphsettahun', minWidth: 150, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'PPH Terbayar JAN-NOV', dataIndex: 'pajakjantonov', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Karyawan Terminasi', dataIndex: 'pphterminasi', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Terbayar', dataIndex: 'pajakterbayar', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Terhutang DES', dataIndex: 'pajakterutangdes', minWidth: 180, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Total Bayar Pajak Setahun', dataIndex: 'pajaktotalbayarsetahun', minWidth: 180, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Selisih PPH', dataIndex: 'selisihpph', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Bulan Ini', dataIndex: 'pphsebulan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Take Home Pay', dataIndex: 'takehomepay', minWidth: 150, xtype:'numbercolumn',align:'right'}
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
                        hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_companyProsesGaji',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyProsesGaji').getValue())
                                    {
                                        Ext.getCmp('companyname_filterProsesGaji').setValue(null);
                                        Ext.getCmp('companyname_filterProsesGaji').setDisabled(true);
                                        // storeGridProsesGaji.load();
                                    } else {
                                        Ext.getCmp('companyname_filterProsesGaji').setDisabled(false);
                                        // storeGridProsesGaji.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterProsesGaji',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridProsesGaji.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        hidden:true,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_orgProsesGaji',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgProsesGaji').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterProsesGaji').setValue(null);
                                        Ext.getCmp('namaorg_filterProsesGaji').setDisabled(true);
                                        // storeGridProsesGaji.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterProsesGaji').setDisabled(false);
                                        // storeGridProsesGaji.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        hidden:true,
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterProsesGaji',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridProsesGaji.load();
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
                        hidden:true,
                        name: 'checkbox1',
                        id:'filtercb_jabatanProsesGaji',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanProsesGaji').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterProsesGaji').setValue(null);
                                        Ext.getCmp('namajabatan_filterProsesGaji').setDisabled(true);
                                        // storeGridProsesGaji.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterProsesGaji').setDisabled(false);
                                        // storeGridProsesGaji.load();
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
                        id: 'namajabatan_filterProsesGaji',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridProsesGaji.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'startdate_ProsesGaji',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Periode Pengupahan',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_ProsesGaji').getValue() != null && Ext.getCmp('enddate_ProsesGaji').getValue() != null)
                                        // {
                                           // storeGridProsesGaji.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_ProsesGaji',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_ProsesGaji').getValue() != null && Ext.getCmp('enddate_ProsesGaji').getValue() != null)
                                        // {
                                           // storeGridProsesGaji.load()
                                        // }
                                    }
                                }
                            }                            ,
                            {
                                text: 'Hitung Pengupahan',
                                iconCls: 'cog-icon',
                                handler: function() {

                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sistem/cekakses',
                                        method: 'POST',
                                        params: {
                                            roleid: 164
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if(d.success)
                                            {
                                                if(Ext.getCmp('companyname_filterProsesGaji').getValue()==null)
                                                {
                                                    Ext.Msg.alert("Info", 'Tentukan perusahaan!');
                                                } else if (Ext.getCmp('startdate_ProsesGaji').getValue() == null && Ext.getCmp('enddate_ProsesGaji').getValue() == null)
                                                    {
                                                       Ext.Msg.alert("Info", 'Tentukan periode Pengupahan!');
                                                    } else {
                                                        storeGridProsesGaji.on('beforeload',function(store, operation,eOpts){
                                                            operation.params={
                                                                        'idcompany': Ext.getCmp('companyname_filterProsesGaji').getValue(),
                                                                        'idjabatan': Ext.getCmp('namajabatan_filterProsesGaji').getValue(),
                                                                        'idorganisasi':Ext.getCmp('namaorg_filterProsesGaji').getValue(),
                                                                        'startdate': Ext.getCmp('startdate_ProsesGaji').getSubmitValue(),
                                                                        'enddate': Ext.getCmp('enddate_ProsesGaji').getSubmitValue(),
                                                                      };
                                                                  });
                                                        storeGridProsesGaji.load({
                                                                // params:{'id':d.data.category_id},
                                                                scope: this,
                                                                callback: function(records, operation, success) {
                                                                    var resp = Ext.decode(operation.response.responseText);
                                                                    // console.log(resp.summary);
                                                                    var footer = resp.summary;
                                                                    // console.log(footer);
                                                                    Ext.getCmp('footerUT').setValue(footer.footerUT);
                                                                    Ext.getCmp('footerUTT').setValue(footer.footerUTT);
                                                                    Ext.getCmp('footerLembur').setValue(footer.footerLembur);
                                                                    Ext.getCmp('footerBenefitCmp').setValue(footer.footerBenefitCmp);
                                                                    Ext.getCmp('footerBenefitEmp').setValue(footer.footerBenefitEmp);
                                                                    Ext.getCmp('footerPotongan').setValue(footer.footerPotongan);
                                                                    Ext.getCmp('footerPendapatan').setValue(footer.footerPendapatan);
                                                                    Ext.getCmp('footerBruto').setValue(footer.footerBruto);
                                                                    Ext.getCmp('footerPajak').setValue(footer.footerPajak);
                                                                    Ext.getCmp('footerTHP').setValue(footer.footerTHP);
                                                                    Ext.getCmp('footerPPH').setValue(footer.footerPPH);
                                                                }
                                                            });

                                                        var jsonData = Ext.encode(Ext.pluck(storeGridProsesGaji, 'data'));
                                                        console.log(jsonData);
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
                            },
                            {
                                    text: 'Hapus Filter',
                                    iconCls: 'refresh',
                                    handler: function() {
                                        Ext.getCmp('companyname_filterProsesGaji').setValue(null);
                                        Ext.getCmp('namaorg_filterProsesGaji').setValue(null);
                                        Ext.getCmp('namajabatan_filterProsesGaji').setValue(null);
                                        Ext.getCmp('startdate_ProsesGaji').setValue(null);
                                        Ext.getCmp('enddate_ProsesGaji').setValue(null);
                                        storeGridProsesGaji.reload();

                                        Ext.getCmp('footerPPH').hide();
                                        Ext.getCmp('footerTHP').hide();
                                    }
                            }
                ]
        },
//        {
//            xtype: 'toolbar',
//            dock: 'top',
//            items: [
//                        
//                ]
//        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Tambah',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         WindowKaryawan.show();
                //         Ext.getCmp('statusformProsesGaji').setValue('input');
                //         Ext.getCmp('formProsesGaji').getForm().reset();
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


                //             Ext.getCmp('companyname_filterProsesGaji').setValue(null);
                //             Ext.getCmp('namaorg_filterProsesGaji').setValue(null);
                //             Ext.getCmp('namajabatan_filterProsesGaji').setValue(null);
                //             Ext.getCmp('startdate_ProsesGaji').setValue(null);
                //             Ext.getCmp('enddate_ProsesGaji').setValue(null);
                //             storeGridProsesGaji.reload();
                //         }
                // },
                {
                    text: 'Detail',
                    hidden:true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridProsesGaji')[0];
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
                // {
                //     xtype: 'button',
                //     text: 'Export Excel',
                //     iconCls: 'page_excel',
                //     listeners: {
                //         click: function(component) {
                //            // window.location = SITE_URL+"laporan/ProsesGaji/" + Ext.getCmp('companyname_filterProsesGaji').getValue()+'/'+Ext.getCmp('namajabatan_filterProsesGaji').getValue()+'/'+Ext.getCmp('namaorg_filterProsesGaji').getValue() + '/'+ Ext.getCmp('startdate_ProsesGaji').getSubmitValue() + '/' + Ext.getCmp('enddate_ProsesGaji').getSubmitValue();
                //         }
                //     }
                // },
                {
                    xtype: 'button',
                    text: 'Simpan Data Pengupahan',
                    iconCls: 'save-icon',
                    listeners: {
                        click: function(component) {
                            // storeGridProsesGaji.on('beforeload',function(store, operation,eOpts){
                            // operation.params={
                            //             'idcompany': Ext.getCmp('companyname_filterProsesGaji').getValue(),
                            //             'idjabatan': Ext.getCmp('namajabatan_filterProsesGaji').getValue(),
                            //             'idorganisasi':Ext.getCmp('namaorg_filterProsesGaji').getValue(),
                            //             'startdate': Ext.getCmp('startdate_ProsesGaji').getSubmitValue(),
                            //             'enddate': Ext.getCmp('enddate_ProsesGaji').getSubmitValue(),
                            //             'option':'save'
                            //           };
                            //       });
                            // storeGridProsesGaji.load();

                            Ext.Ajax.request({
                                    url: SITE_URL + 'sistem/cekakses',
                                    method: 'POST',
                                    params: {
                                        roleid: 165
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if(d.success)
                                        {
                                            kotakLoading();
                                            Ext.Ajax.request({
                                                url: SITE_URL + 'kompensasi/penggajian',
                                                method: 'POST',
                                                params: {
                                                    'idcompany': Ext.getCmp('companyname_filterProsesGaji').getValue(),
                                                    'idjabatan': Ext.getCmp('namajabatan_filterProsesGaji').getValue(),
                                                    'idorganisasi':Ext.getCmp('namaorg_filterProsesGaji').getValue(),
                                                    'startdate': Ext.getCmp('startdate_ProsesGaji').getSubmitValue(),
                                                    'enddate': Ext.getCmp('enddate_ProsesGaji').getSubmitValue(),
                                                    'option':'save'
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    Ext.Msg.alert('Info', d.message);
                                                    storeGridProsesGaji.load();
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
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

                            
                           // window.location = SITE_URL+"laporan/ProsesGaji/" + Ext.getCmp('companyname_filterProsesGaji').getValue()+'/'+Ext.getCmp('namajabatan_filterProsesGaji').getValue()+'/'+Ext.getCmp('namaorg_filterProsesGaji').getValue() + '/'+ Ext.getCmp('startdate_ProsesGaji').getSubmitValue() + '/' + Ext.getCmp('enddate_ProsesGaji').getSubmitValue();
                        }
                    }
                },
                '->',
                {
                        text: 'Show Summary',
                        hidden:true,
                        id:'showSummary',
                        // iconCls: 'refresh',
                        handler: function() {
                            Ext.getCmp('hideSummary').show();
                            Ext.getCmp('showSummary').hide();

                            Ext.getCmp('footerBenefitCmp').show();
                            Ext.getCmp('footerBenefitEmp').show();
                            Ext.getCmp('footerPotongan').show();
                            Ext.getCmp('footerLembur').show();
                            Ext.getCmp('footerUTT').show();
                            Ext.getCmp('footerUT').show();
                            Ext.getCmp('footerPajak').show();
                            Ext.getCmp('footerBruto').show();
                            Ext.getCmp('footerPendapatan').show();
                            Ext.getCmp('footerPPH').show();
                            Ext.getCmp('footerTHP').show();
                        }
                },
                {
                        text: 'Hide Summary',
                        id:'hideSummary',
                        // iconCls: 'refresh',
                        handler: function() {
                            Ext.getCmp('showSummary').show();
                            Ext.getCmp('hideSummary').hide();

                            Ext.getCmp('footerBenefitCmp').hide();
                            Ext.getCmp('footerBenefitEmp').hide();
                            Ext.getCmp('footerPotongan').hide();
                            Ext.getCmp('footerLembur').hide();
                            Ext.getCmp('footerUTT').hide();
                            Ext.getCmp('footerUT').hide();
                            Ext.getCmp('footerPajak').hide();
                            Ext.getCmp('footerBruto').hide();
                            Ext.getCmp('footerPendapatan').hide();
                            Ext.getCmp('footerPPH').hide();
                            Ext.getCmp('footerTHP').hide();
                        }
                },'-',
                'Pencarian Nama Karyawan: ', ' ',
                {
                    xtype: 'searchGridProsesGaji',
                    text: 'Left Button'
                }

            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerPPH',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total PPH'
                },
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerTHP',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Take Home Pay'
                }
            ]
        },
          {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype:'textfield',
                    id:'footerPendapatan',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Pendapatan'
                },
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerBruto',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Pendapatan Bruto'
                },
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerPajak',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Tunjangan Pajak'
                }
            ]
        },
          {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype:'textfield',
                    id:'footerUT',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Upah Tetap'
                },
                {
                    xtype:'textfield',
                    id:'footerUTT',
                    labelWidth:150,
                    fieldStyle:'text-align:right;',
                    readOnly:true,
                    fieldLabel:'Total Upah TT'
                },
                {
                    xtype:'textfield',
                    id:'footerLembur',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Lembur'
                }
            ]
        },
          {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [                
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerBenefitCmp',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Benefit Perusahaan'
                },
                {
                    xtype:'textfield',
                    id:'footerBenefitEmp',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Benefit Karyawan'
                },
                {
                    xtype:'textfield',
                    id:'footerPotongan',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Potongan'
                },
            ]
        },
         {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridProsesGaji, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridProsesGaji.load();
                 // tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisProsesGajipStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

           // var formPekerjaan2 = Ext.getCmp('formPekerjaan2');
           //                  formPekerjaan2.getForm().load({
           //                      url: SITE_URL + 'backend/loadFormData/Pekerjaan/1/personalia',
           //                      params: {
           //                          extraparams: 'a.idpelamar:' + record.data.idpelamar
           //                      },
           //                      success: function(form, action) {
           //                          var d = Ext.decode(action.response.responseText);
           //                          // console.log(action)
           //                          // getFotoPegawai(d.data.idpelamar);
           //                          // setValueHeader(d);
           //                          // Ext.Msg.alert("Load failed", action.result.errorMessage);
           //                      },
           //                      failure: function(form, action) {
           //                          Ext.Msg.alert("Load failed", action.result.errorMessage);
           //                      }
           //                  })

           //                  wPekerjaan2.show();

            // Ext.getCmp('statusformProsesGaji').setValue('edit');
        }
    }
});
