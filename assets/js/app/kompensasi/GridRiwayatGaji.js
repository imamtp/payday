Ext.define('GridRiwayatGajiModel', {
    extend: 'Ext.data.Model',
    fields: ['idpayroll','idpelamar','startdate','enddate','bulan','tahun','masapajaksetahun','namalengkap','punyanpwp','durasi','hitungpajak','tglgajipertama','masakerja','tglmasuk','nilaiptkp','kodeptkp','totalut','totalutt','upahlemburpajak','upahlemburnopajak','benefitcmpbruto','benefitcmpnet','benefitempbruto','benefitempnet','numdayswork','totalpendapatan','penerimaanbruto','tunjanganpajak','biayajabatan','penerimaannet','netosetahun','pkpsetahun','pph5tahun','pph15tahun','pph25tahun','pph35tahun','pphsettahun','pphsebulan','takehomepay','nilaipotongan','totallembur','nilaipotongan','namalengkap','benefitcmp','benefitemp','pajakterminasi','pajakjantonov','pajakterminasi','pajakterbayar','pajakterutangdes','pajaktotalbayarsetahun','tglakhirjabatan','selisihpph','nik','companycode','kodeorg','namajabatan','prevtakehomepay'],
    idProperty: 'id'
});

var storeGridRiwayatGaji = Ext.create('Ext.data.Store', {
    pageSize: 1000,
    model: 'GridRiwayatGajiModel',
    //remoteSort: true,
    autoload:false,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/riwayatgaji/kompensasi',
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
        load: {
            fn: function(store, operation,eOpts){
                console.log(eOpts);
            }
        },
        exception: function(misc) {
            alert("Holy cow, we're getting an exception!");
        }
    }
});

storeGridRiwayatGaji.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'idcompany': Ext.getCmp('companyname_filterRiwayatGaji').getValue(),
                    'idjabatan': Ext.getCmp('namajabatan_filterRiwayatGaji').getValue(),
                    'idorganisasi':Ext.getCmp('namaorg_filterRiwayatGaji').getValue(),
                    'startdate': Ext.getCmp('startdate_RiwayatGaji').getSubmitValue(),
                    'enddate': Ext.getCmp('enddate_RiwayatGaji').getSubmitValue(),
                  };
              });

// storeGridRiwayatGaji.on('load',function(store, operation,eOpts){
// console.log(store);
                // if(!operation)
                //     {
                //         var resp = Ext.decode(operation.response.responseText);
                //         // console.log(resp.summary);
                //         var footerRiwayat = resp.summary;
                //         console.log(footerRiwayat);
                //     }
                //     Ext.getCmp('footerRiwayatUT').setValue(footerRiwayat.footerRiwayatUT);
                //     Ext.getCmp('footerRiwayatUTT').setValue(footerRiwayat.footerRiwayatUTT);
                //     Ext.getCmp('footerRiwayatLembur').setValue(footerRiwayat.footerRiwayatLembur);
                //     Ext.getCmp('footerRiwayatBenefitCmp').setValue(footerRiwayat.footerRiwayatBenefitCmp);
                //     Ext.getCmp('footerRiwayatBenefitEmp').setValue(footerRiwayat.footerRiwayatBenefitEmp);
                //     Ext.getCmp('footerRiwayatPotongan').setValue(footerRiwayat.footerRiwayatPotongan);
                //     Ext.getCmp('footerRiwayatPendapatan').setValue(footerRiwayat.footerRiwayatPendapatan);
                //     Ext.getCmp('footerRiwayatBruto').setValue(footerRiwayat.footerRiwayatBruto);
                //     Ext.getCmp('footerRiwayatPajak').setValue(footerRiwayat.footerRiwayatPajak);
                //     Ext.getCmp('footerRiwayatTHP').setValue(footerRiwayat.footerRiwayatTHP);
                //     Ext.getCmp('footerRiwayatPPH').setValue(footerRiwayat.footerRiwayatPPH);
              // });

Ext.define('MY.searchGridRiwayatGaji', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRiwayatGaji',
    store: storeGridRiwayatGaji,
    width: 180
});
var smGridRiwayatGaji = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRiwayatGaji.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRiwayatGaji').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRiwayatGaji').enable();
        }
    }
});
Ext.define('GridRiwayatGaji', {
    // renderTo:'mytabpanel',
   multiSelect: true,
//    selModel: smGridRiwayatGaji,
    title: 'Riwayat Pengupahan Karyawan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRiwayatGajiID',
    id: 'GridRiwayatGajiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRiwayatGaji',
    store: storeGridRiwayatGaji,
    loadMask: true,
    columns: [
       {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},      
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 250},
         {header: 'Tahun', dataIndex: 'tahun', minWidth: 5},
       {header: 'Bulan', dataIndex: 'bulan', minWidth: 50},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Kode Org', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 180},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'Tgl Masuk', dataIndex: 'tglmasuk', minWidth: 150},
        // {header: 'Tgl Terminasi', dataIndex: 'tglakhirjabatan', minWidth: 150},
        {header: 'Punya NPWP', dataIndex: 'punyanpwp', minWidth: 150},
        {header: 'Jumlah Hari', dataIndex: 'durasi', minWidth: 150},
        // {header: 'Jumlah Kehadiran', dataIndex: 'kehadiran', minWidth: 150},
        {header: 'Potong PPH', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'Tgl Pertama Gaji', dataIndex: 'tglgajipertama', minWidth: 150},
        {header: 'Masa Kerja(bulan)', dataIndex: 'masakerja', minWidth: 150},
        {header: 'Masa Pajak Setahun', dataIndex: 'masapajaksetahun', minWidth: 150},
        // {header: 'Tgl Masuk', dataIndex: 'tglmasuk', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Upah Tetap', dataIndex: 'totalut', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Upah Tdk Tetap', dataIndex: 'totalutt', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Lembur', dataIndex: 'totallembur', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Benefit (perusahaan)', dataIndex: 'benefitcmp', minWidth: 170, xtype:'numbercolumn',align:'right'},
        {header: 'Benefit (karyawan)', dataIndex: 'benefitemp', minWidth: 170, xtype:'numbercolumn',align:'right'},
        {header: 'Total Potongan Lainnya', dataIndex: 'nilaipotongan', minWidth: 170, xtype:'numbercolumn',align:'right'},
        {header: 'Total pendapatan', dataIndex: 'totalpendapatan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Penerimaan Bruto', dataIndex: 'penerimaanbruto', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Tunjangan Pajak', dataIndex: 'tunjanganpajak', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Biaya Jabatan', dataIndex: 'biayajabatan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Penerimaan NET', dataIndex: 'penerimaannet', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Neto Setahun', dataIndex: 'netosetahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PKP Setahun', dataIndex: 'pkpsetahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        // {header: 'PPH5 Setahun', dataIndex: 'pph5tahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        // {header: 'PPH15 Setahun', dataIndex: 'pph15tahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        // {header: 'PPH25 Setahun', dataIndex: 'pph25tahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        // {header: 'PPH35 Setahun', dataIndex: 'pph35tahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Setahun', dataIndex: 'pphsettahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Terbayar JAN-NOV', dataIndex: 'pajakjantonov', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Karyawan Terminasi', dataIndex: 'pajakterminasi', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'Selisih PPH', dataIndex: 'selisihpph', minWidth: 150, xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'PPH Terbayar', dataIndex: 'pajakterbayar', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Terhutang DES', dataIndex: 'pajakterutangdes', minWidth: 180, xtype:'numbercolumn',align:'right'},
        {header: 'Total Bayar Pajak Setahun', dataIndex: 'pajaktotalbayarsetahun', minWidth: 180, xtype:'numbercolumn',align:'right'},
        // {header: 'Selisih PPH21', dataIndex: 'pphsettahun', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PPH Bulan Ini', dataIndex: 'pphsebulan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Take Home Pay', dataIndex: 'takehomepay', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Take Home Pay Sebelumnya', dataIndex: 'prevtakehomepay', minWidth: 170, xtype:'numbercolumn',align:'right'}
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
                        id:'filtercb_companyRiwayatGaji',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyRiwayatGaji').getValue())
                                    {
                                        Ext.getCmp('companyname_filterRiwayatGaji').setValue(null);
                                        Ext.getCmp('companyname_filterRiwayatGaji').setDisabled(true);
                                        // storeGridRiwayatGaji.load();
                                    } else {
                                        Ext.getCmp('companyname_filterRiwayatGaji').setDisabled(false);
                                        // storeGridRiwayatGaji.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterRiwayatGaji',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridRiwayatGaji.load();
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
                        id:'filtercb_orgRiwayatGaji',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgRiwayatGaji').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterRiwayatGaji').setValue(null);
                                        Ext.getCmp('namaorg_filterRiwayatGaji').setDisabled(true);
                                        // storeGridRiwayatGaji.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterRiwayatGaji').setDisabled(false);
                                        // storeGridRiwayatGaji.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        hidden:true,
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterRiwayatGaji',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridRiwayatGaji.load();
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
                        id:'filtercb_jabatanRiwayatGaji',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanRiwayatGaji').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterRiwayatGaji').setValue(null);
                                        Ext.getCmp('namajabatan_filterRiwayatGaji').setDisabled(true);
                                        // storeGridRiwayatGaji.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterRiwayatGaji').setDisabled(false);
                                        // storeGridRiwayatGaji.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        hidden:true,
                        id: 'namajabatan_filterRiwayatGaji',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridRiwayatGaji.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'startdate_RiwayatGaji',
                                labelWidth:150,
                                name:'startdate',
                                // allowBlank: false,
                                fieldLabel: 'Periode Pengupahan',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_RiwayatGaji').getValue() != null && Ext.getCmp('enddate_RiwayatGaji').getValue() != null)
                                        // {
                                           // storeGridRiwayatGaji.load()
                                        // }
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                id:'enddate_RiwayatGaji',
                                name:'enddate',
                                labelWidth:30,
                                // allowBlank: false,
                                fieldLabel: 's/d',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                        // if (Ext.getCmp('startdate_RiwayatGaji').getValue() != null && Ext.getCmp('enddate_RiwayatGaji').getValue() != null)
                                        // {
                                           // storeGridRiwayatGaji.load()
                                        // }
                                    }
                                }
                            }                            ,
                            {
                                text: 'Cari',
                                iconCls: 'search',
                                handler: function() {

                                    if(Ext.getCmp('companyname_filterRiwayatGaji').getValue()==null)
                                    {
                                        Ext.Msg.alert("Info", 'Tentukan perusahaan!');
                                    } else if (Ext.getCmp('startdate_RiwayatGaji').getValue() == null && Ext.getCmp('enddate_RiwayatGaji').getValue() == null)
                                        {
                                           Ext.Msg.alert("Info", 'Tentukan periode Pengupahan!');
                                        } else {
                                            storeGridRiwayatGaji.on('beforeload',function(store, operation,eOpts){
                                                operation.params={
                                                            'idcompany': Ext.getCmp('companyname_filterRiwayatGaji').getValue(),
                                                            'idjabatan': Ext.getCmp('namajabatan_filterRiwayatGaji').getValue(),
                                                            'idorganisasi':Ext.getCmp('namaorg_filterRiwayatGaji').getValue(),
                                                            'startdate': Ext.getCmp('startdate_RiwayatGaji').getSubmitValue(),
                                                            'enddate': Ext.getCmp('enddate_RiwayatGaji').getSubmitValue(),
                                                          };
                                                      });
                                            storeGridRiwayatGaji.load({
                                                                // params:{'id':d.data.category_id},
                                                                scope: this,
                                                                callback: function(records, operation, success) {
                                                                    var resp = Ext.decode(operation.response.responseText);
                                                                    // console.log(resp.summary);
                                                                    var footerRiwayat = resp.summary;
                                                                    // console.log(footer);
                                                                        Ext.getCmp('footerRiwayatUT').setValue(footerRiwayat.footerUT);
                                                                        Ext.getCmp('footerRiwayatUTT').setValue(footerRiwayat.footerUTT);
                                                                        Ext.getCmp('footerRiwayatLembur').setValue(footerRiwayat.footerLembur);
                                                                        Ext.getCmp('footerRiwayatBenefitCmp').setValue(footerRiwayat.footerBenefitCmp);
                                                                        Ext.getCmp('footerRiwayatBenefitEmp').setValue(footerRiwayat.footerBenefitEmp);
                                                                        Ext.getCmp('footerRiwayatPotongan').setValue(footerRiwayat.footerPotongan);
                                                                        Ext.getCmp('footerRiwayatPendapatan').setValue(footerRiwayat.footerPendapatan);
                                                                        Ext.getCmp('footerRiwayatBruto').setValue(footerRiwayat.footerBruto);
                                                                        Ext.getCmp('footerRiwayatPajak').setValue(footerRiwayat.footerPajak);
                                                                        Ext.getCmp('footerRiwayatTHP').setValue(footerRiwayat.footerTHP);
                                                                        Ext.getCmp('footerRiwayatPPH').setValue(footerRiwayat.footerPPH);
                                                                }
                                                            });
                                        }
                                    
                                }
                            },
                            {
                                    text: 'Hapus Filter',
                                    iconCls: 'refresh',
                                    handler: function() {
                                        Ext.getCmp('companyname_filterRiwayatGaji').setValue(null);
                                        Ext.getCmp('namaorg_filterRiwayatGaji').setValue(null);
                                        Ext.getCmp('namajabatan_filterRiwayatGaji').setValue(null);
                                        Ext.getCmp('startdate_RiwayatGaji').setValue(null);
                                        Ext.getCmp('enddate_RiwayatGaji').setValue(null);

                                         storeGridRiwayatGaji.load({
                                                                // params:{'id':d.data.category_id},
                                                                scope: this,
                                                                callback: function(records, operation, success) {
                                                                    var resp = Ext.decode(operation.response.responseText);
                                                                    // console.log(resp.summary);
                                                                    var footerRiwayat = resp.summary;
                                                                    // console.log(footer);
                                                                        Ext.getCmp('footerRiwayatUT').setValue(footerRiwayat.footerUT);
                                                                        Ext.getCmp('footerRiwayatUTT').setValue(footerRiwayat.footerUTT);
                                                                        Ext.getCmp('footerRiwayatLembur').setValue(footerRiwayat.footerLembur);
                                                                        Ext.getCmp('footerRiwayatBenefitCmp').setValue(footerRiwayat.footerBenefitCmp);
                                                                        Ext.getCmp('footerRiwayatBenefitEmp').setValue(footerRiwayat.footerBenefitEmp);
                                                                        Ext.getCmp('footerRiwayatPotongan').setValue(footerRiwayat.footerPotongan);
                                                                        Ext.getCmp('footerRiwayatPendapatan').setValue(footerRiwayat.footerPendapatan);
                                                                        Ext.getCmp('footerRiwayatBruto').setValue(footerRiwayat.footerBruto);
                                                                        Ext.getCmp('footerRiwayatPajak').setValue(footerRiwayat.footerPajak);
                                                                        Ext.getCmp('footerRiwayatTHP').setValue(footerRiwayat.footerTHP);
                                                                        Ext.getCmp('footerRiwayatPPH').setValue(footerRiwayat.footerPPH);
                                                                }
                                                            });
                                    }
                            }
                ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            hidden:true,
            items: [
                        
                ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Tambah',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         WindowKaryawan.show();
                //         Ext.getCmp('statusformRiwayatGaji').setValue('input');
                //         Ext.getCmp('formRiwayatGaji').getForm().reset();
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


                //             Ext.getCmp('companyname_filterRiwayatGaji').setValue(null);
                //             Ext.getCmp('namaorg_filterRiwayatGaji').setValue(null);
                //             Ext.getCmp('namajabatan_filterRiwayatGaji').setValue(null);
                //             Ext.getCmp('startdate_RiwayatGaji').setValue(null);
                //             Ext.getCmp('enddate_RiwayatGaji').setValue(null);
                //             storeGridRiwayatGaji.reload();
                //         }
                // },
                {
                    text: 'Detail',
                    hidden:true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridRiwayatGaji')[0];
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
                        text: 'Hapus Data Upah',
                        handler: function() {
                            Ext.Ajax.request({
                                url: SITE_URL + 'sistem/cekakses',
                                method: 'POST',
                                params: {
                                    roleid: 166
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(d.success)
                                    {
                                            var grid = Ext.ComponentQuery.query('GridRiwayatGaji')[0];
                                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                            var data = grid.getSelectionModel().getSelection();
                                            if (data.length == 0)
                                            {
                                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                            } else {
                                                Ext.Msg.show({
                                                            title: 'Konfirmasi',
                                                            msg: 'Hapus data terpilih ?',
                                                            buttons: Ext.Msg.YESNO,
                                                            fn: function(btn) {
                                                                if (btn == 'yes') {
                                                                    var grid = Ext.ComponentQuery.query('GridRiwayatGaji')[0];
                                                                    var sm = grid.getSelectionModel();
                                                                    selected = [];
                                                                    Ext.each(sm.getSelection(), function(item) {
                                                                        selected.push(item.data[Object.keys(item.data)[0]]+','+item.data[Object.keys(item.data)[1]]);
                                                                    });
                                                                    Ext.Ajax.request({
                                                                        url: SITE_URL + 'kompensasi/hapusgaji',
                                                                        method: 'POST',
                                                                        params: {postdata: Ext.encode(selected)},
                                                                        success: function(form, action) {
                                                                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                                            storeGridRiwayatGaji.load({
                                                                                    // params:{'id':d.data.category_id},
                                                                                    scope: this,
                                                                                    callback: function(records, operation, success) {
                                                                                        var resp = Ext.decode(operation.response.responseText);
                                                                                        // console.log(resp.summary);
                                                                                        var footerRiwayat = resp.summary;
                                                                                        // console.log(footer);
                                                                                            Ext.getCmp('footerRiwayatUT').setValue(footerRiwayat.footerUT);
                                                                                            Ext.getCmp('footerRiwayatUTT').setValue(footerRiwayat.footerUTT);
                                                                                            Ext.getCmp('footerRiwayatLembur').setValue(footerRiwayat.footerLembur);
                                                                                            Ext.getCmp('footerRiwayatBenefitCmp').setValue(footerRiwayat.footerBenefitCmp);
                                                                                            Ext.getCmp('footerRiwayatBenefitEmp').setValue(footerRiwayat.footerBenefitEmp);
                                                                                            Ext.getCmp('footerRiwayatPotongan').setValue(footerRiwayat.footerPotongan);
                                                                                            Ext.getCmp('footerRiwayatPendapatan').setValue(footerRiwayat.footerPendapatan);
                                                                                            Ext.getCmp('footerRiwayatBruto').setValue(footerRiwayat.footerBruto);
                                                                                            Ext.getCmp('footerRiwayatPajak').setValue(footerRiwayat.footerPajak);
                                                                                            Ext.getCmp('footerRiwayatTHP').setValue(footerRiwayat.footerTHP);
                                                                                            Ext.getCmp('footerRiwayatPPH').setValue(footerRiwayat.footerPPH);
                                                                                    }
                                                                                });
                                                                        },
                                                                        failure: function(form, action) {
                                                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                                             
                                                                             storeGridRiwayatGaji.load({
                                                                                    // params:{'id':d.data.category_id},
                                                                                    scope: this,
                                                                                    callback: function(records, operation, success) {
                                                                                        var resp = Ext.decode(operation.response.responseText);
                                                                                        // console.log(resp.summary);
                                                                                        var footerRiwayat = resp.summary;
                                                                                        // console.log(footer);
                                                                                            Ext.getCmp('footerRiwayatUT').setValue(footerRiwayat.footerUT);
                                                                                            Ext.getCmp('footerRiwayatUTT').setValue(footerRiwayat.footerUTT);
                                                                                            Ext.getCmp('footerRiwayatLembur').setValue(footerRiwayat.footerLembur);
                                                                                            Ext.getCmp('footerRiwayatBenefitCmp').setValue(footerRiwayat.footerBenefitCmp);
                                                                                            Ext.getCmp('footerRiwayatBenefitEmp').setValue(footerRiwayat.footerBenefitEmp);
                                                                                            Ext.getCmp('footerRiwayatPotongan').setValue(footerRiwayat.footerPotongan);
                                                                                            Ext.getCmp('footerRiwayatPendapatan').setValue(footerRiwayat.footerPendapatan);
                                                                                            Ext.getCmp('footerRiwayatBruto').setValue(footerRiwayat.footerBruto);
                                                                                            Ext.getCmp('footerRiwayatPajak').setValue(footerRiwayat.footerPajak);
                                                                                            Ext.getCmp('footerRiwayatTHP').setValue(footerRiwayat.footerTHP);
                                                                                            Ext.getCmp('footerRiwayatPPH').setValue(footerRiwayat.footerPPH);
                                                                                    }
                                                                                });
                                                                        }
                                                                    });
                                                                    // storeGridConfigBenefit.remove(sm.getSelection());
                                                                    // sm.select(0);
                                                                }
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
                },
                {
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var cp = Ext.getCmp('companyname_filterRiwayatGaji').getValue();
                            var sd = Ext.getCmp('startdate_RiwayatGaji').getSubmitValue();
                            var nd = Ext.getCmp('enddate_RiwayatGaji').getSubmitValue();

                            if(cp==null)
                            {
                                Ext.Msg.alert("Info", 'Tentukan Perusahaan Terlebih Dahulu');                                
                            } else if(sd=='')
                                {
                                    Ext.Msg.alert("Info", 'Tentukan Periode Awal Pengupahan Terlebih Dahulu');
                                } else if(nd=='')
                                    {
                                        Ext.Msg.alert("Info", 'Tentukan Periode Akhir Pengupahan Terlebih Dahulu');
                                    } else {
                                            Ext.Ajax.request({
                                                url: SITE_URL + 'sistem/cekakses',
                                                method: 'POST',
                                                params: {
                                                    roleid: 167
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    if(d.success)
                                                    {
                                                        window.location = SITE_URL+"kompensasi/eksportxls/" + sd +'/'+nd+'/'+ cp;
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
                    }
                },
                {
                    xtype: 'button',
                    text: 'Export e-SPT PPh21',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var cp = Ext.getCmp('companyname_filterRiwayatGaji').getValue();
                            var sd = Ext.getCmp('startdate_RiwayatGaji').getSubmitValue();
                            var nd = Ext.getCmp('enddate_RiwayatGaji').getSubmitValue();

                            if(cp==null)
                            {
                                Ext.Msg.alert("Info", 'Tentukan Perusahaan Terlebih Dahulu');                                
                            } else if(sd=='')
                                {
                                    Ext.Msg.alert("Info", 'Tentukan Periode Awal Pengupahan Terlebih Dahulu');
                                } else if(nd=='')
                                    {
                                        Ext.Msg.alert("Info", 'Tentukan Periode Akhir Pengupahan Terlebih Dahulu');
                                    } else {
                                            Ext.Ajax.request({
                                                url: SITE_URL + 'sistem/cekakses',
                                                method: 'POST',
                                                params: {
                                                    roleid: 167
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    if(d.success)
                                                    {
                                                        window.location = SITE_URL+"kompensasi/eksportcsv/" + sd +'/'+nd+'/'+ cp;
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
                    }
                },
                '->',
                {
                        text: 'Show Summary',
                        hidden:true,
                        id:'showRiwayatSummary',
                        // iconCls: 'refresh',
                        handler: function() {
                            Ext.getCmp('hideRiwayatSummary').show();
                            Ext.getCmp('showRiwayatSummary').hide();

                            Ext.getCmp('footerRiwayatBenefitCmp').show();
                            Ext.getCmp('footerRiwayatBenefitEmp').show();
                            Ext.getCmp('footerRiwayatPotongan').show();
                            Ext.getCmp('footerRiwayatLembur').show();
                            Ext.getCmp('footerRiwayatUTT').show();
                            Ext.getCmp('footerRiwayatUT').show();
                            Ext.getCmp('footerRiwayatPajak').show();
                            Ext.getCmp('footerRiwayatBruto').show();
                            Ext.getCmp('footerRiwayatPendapatan').show();
                            Ext.getCmp('footerRiwayatPPH').show();
                            Ext.getCmp('footerRiwayatTHP').show();
                        }
                },
                {
                        text: 'Hide Summary',
                        id:'hideRiwayatSummary',
                        // iconCls: 'refresh',
                        handler: function() {
                            Ext.getCmp('showRiwayatSummary').show();
                            Ext.getCmp('hideRiwayatSummary').hide();

                            Ext.getCmp('footerRiwayatBenefitCmp').hide();
                            Ext.getCmp('footerRiwayatBenefitEmp').hide();
                            Ext.getCmp('footerRiwayatPotongan').hide();
                            Ext.getCmp('footerRiwayatLembur').hide();
                            Ext.getCmp('footerRiwayatUTT').hide();
                            Ext.getCmp('footerRiwayatUT').hide();
                            Ext.getCmp('footerRiwayatPajak').hide();
                            Ext.getCmp('footerRiwayatBruto').hide();
                            Ext.getCmp('footerRiwayatPendapatan').hide();
                            Ext.getCmp('footerRiwayatPPH').hide();
                            Ext.getCmp('footerRiwayatTHP').hide();
                        }
                },
                'Pencarian Nama Karyawan: ', ' ',
                {
                    xtype: 'searchGridRiwayatGaji',
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
                    id:'footerRiwayatPPH',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total PPH'
                },
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerRiwayatTHP',
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
                    id:'footerRiwayatPendapatan',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Pendapatan'
                },
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerRiwayatBruto',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Pendapatan Bruto'
                },
                {
                    xtype:'textfield',
                    fieldStyle:'text-align:right;',
                    id:'footerRiwayatPajak',
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
                    id:'footerRiwayatUT',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Upah Tetap'
                },
                {
                    xtype:'textfield',
                    id:'footerRiwayatUTT',
                    labelWidth:150,
                    fieldStyle:'text-align:right;',
                    readOnly:true,
                    fieldLabel:'Total Upah TT'
                },
                {
                    xtype:'textfield',
                    id:'footerRiwayatLembur',
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
                    id:'footerRiwayatBenefitCmp',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Benefit Perusahaan'
                },
                {
                    xtype:'textfield',
                    id:'footerRiwayatBenefitEmp',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Benefit Karyawan'
                },
                {
                    xtype:'textfield',
                    id:'footerRiwayatPotongan',
                    fieldStyle:'text-align:right;',
                    labelWidth:150,
                    readOnly:true,
                    fieldLabel:'Total Potongan'
                },
            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridRiwayatGaji, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRiwayatGaji.load();
                 // tahunTKStore.load();
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
                // jenisRiwayatGajipStore.load();
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

            // Ext.getCmp('statusformRiwayatGaji').setValue('edit');
        }
    }
});
