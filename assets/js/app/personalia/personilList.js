Ext.define('GridPersonilListModel', {
     extend: 'Ext.data.Model',
   fields: ['idpelamar','idpekerjaan','idstrukturjabatan','ni','nik','namalengkap','companyname','tgllahir','idjabatan','kodejabatan','namajabatan','levelnamejabatan','levelnameindividu','namalokasi','idorganisasi','kodeorg','namaorg','namalokasi','tglmasuk','tglberakhir','kekaryaanname','idjabatan','idlevelindividu','idleveljabatan'],
    idProperty: 'id'
});

var storeGridPersonilList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPersonilListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/personil4pergerakan/personalia',
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

storeGridPersonilList.on('beforeload',function(store, operation,eOpts){
        operation.params={
                     'extraparams': 'b.statuscalon:Disetujui'
                  };
               });

Ext.define('MY.searchPersonilList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPersonilList',
    store: storeGridPersonilList,
    width: 180
});

var smGridPersonilList = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchase.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemPurchase').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemPurchase').enable();
        }
    }
});

Ext.define('GridPersonilList', {
    itemId: 'GridPersonilList',
    id: 'GridPersonilList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPersonilList',
    store: storeGridPersonilList,
    loadMask: true,
    columns: [
    {
            text: 'Pilih',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                    var comboxkekaryaan_fPergerakanP = Ext.getCmp('comboxkekaryaan_fPergerakanP');

                    var idjabatan_fPergerakanP = Ext.getCmp('idjabatan_fPergerakanP');
                    var namajabatan_fPergerakanP = Ext.getCmp('namajabatan_fPergerakanP');
                    var levelnameJabatan_fPergerakanP = Ext.getCmp('levelnameJabatan_fPergerakanP');
                    var idlevelindividu_fPergerakanP = Ext.getCmp('idlevelindividu_fPergerakanP');
                    var levelnameindividu_fPergerakanP = Ext.getCmp('levelnameindividu_fPergerakanP');


                    // comboxkekaryaan_fPergerakanP.setReadOnly(false);
                    // comboxkekaryaan_fPergerakanP.show();

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PERUBAHAN STATUS')
                    {
                        if(selectedRecord.get('kekaryaanname')!=='KONTRAK')
                        {
                            Ext.Msg.alert('Info', 'Pergerakan <b>PERUBAHAN STATUS</b> hanya bisa dilakukan untuk status kekaryawanan <b>KONTRAK</b>');
                           
                            return false;
                        } else {
                            idjabatan_fPergerakanP.setValue(selectedRecord.get('idjabatan'));
                            namajabatan_fPergerakanP.setValue(selectedRecord.get('namajabatan'));
                            namajabatan_fPergerakanP.setReadOnly(true);
                            levelnameJabatan_fPergerakanP.setValue(selectedRecord.get('levelnamejabatan'));
                            idlevelindividu_fPergerakanP.setValue(selectedRecord.get('idlevelindividu'));
                            levelnameindividu_fPergerakanP.setValue(selectedRecord.get('levelnameindividu'));
                            levelnameindividu_fPergerakanP.setReadOnly(true);

                            comboxkekaryaan_fPergerakanP.setValue('TETAP');
                            comboxkekaryaan_fPergerakanP.setReadOnly(true);
                        }
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='LULUS PERCOBAAN')
                    {
                        if(selectedRecord.get('kekaryaanname')!=='PERCOBAAN')
                        {
                             Ext.Msg.alert('Info', 'Pergerakan <b>LULUS PERCOBAAN</b> hanya bisa dilakukan untuk status kekaryawanan <b>PERCOBAAN</b>');                                                     
                            return false;
                        } else {
                            idjabatan_fPergerakanP.setValue(selectedRecord.get('idjabatan'));
                            namajabatan_fPergerakanP.setValue(selectedRecord.get('namajabatan'));
                            namajabatan_fPergerakanP.setReadOnly(true);
                            levelnameJabatan_fPergerakanP.setValue(selectedRecord.get('levelnamejabatan'));
                            idlevelindividu_fPergerakanP.setValue(selectedRecord.get('idlevelindividu'));
                            levelnameindividu_fPergerakanP.setValue(selectedRecord.get('levelnameindividu'));
                            levelnameindividu_fPergerakanP.setReadOnly(true);

                            comboxkekaryaan_fPergerakanP.setValue('TETAP');
                            comboxkekaryaan_fPergerakanP.setReadOnly(true);
                        }
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='LULUS ORIENTASI')
                    {
                            idjabatan_fPergerakanP.setValue(selectedRecord.get('idjabatan'));
                            namajabatan_fPergerakanP.setValue(selectedRecord.get('namajabatan'));
                            namajabatan_fPergerakanP.setReadOnly(true);
                            levelnameJabatan_fPergerakanP.setValue(selectedRecord.get('levelnamejabatan'));
                            idlevelindividu_fPergerakanP.setValue(selectedRecord.get('idlevelindividu'));
                            levelnameindividu_fPergerakanP.setValue(selectedRecord.get('levelnameindividu'));
                            levelnameindividu_fPergerakanP.setReadOnly(true);

                            if(selectedRecord.get('kekaryaanname')==='PERCOBAAN')
                            {
                                comboxkekaryaan_fPergerakanP.setValue('TETAP');
                                comboxkekaryaan_fPergerakanP.setReadOnly(true);
                            } else if(selectedRecord.get('kekaryaanname')==='TETAP')
                                {
                                    comboxkekaryaan_fPergerakanP.setValue('TETAP');
                                    comboxkekaryaan_fPergerakanP.setReadOnly(true);
                                } else {
                                        comboxkekaryaan_fPergerakanP.setReadOnly(false);
                                    }
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PENINGKATAN LEVEL INDIVIDU' || Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PENURUNAN LEVEL INDIVIDU')
                    {
                        idjabatan_fPergerakanP.setValue(selectedRecord.get('idjabatan'));
                        namajabatan_fPergerakanP.setValue(selectedRecord.get('namajabatan'));
                        namajabatan_fPergerakanP.setReadOnly(true);
                        levelnameJabatan_fPergerakanP.setValue(selectedRecord.get('levelnamejabatan'));

                        comboxkekaryaan_fPergerakanP.setValue(selectedRecord.get('kekaryaanname'));
                        comboxkekaryaan_fPergerakanP.setReadOnly(true);
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PROMOSI')
                    {
                        comboxkekaryaan_fPergerakanP.setValue(selectedRecord.get('kekaryaanname'));
                        comboxkekaryaan_fPergerakanP.setReadOnly(true);
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='MUTASI' && Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='TERMINASI')
                    {
                        idjabatan_fPergerakanP.setValue(selectedRecord.get('idjabatan'));
                        namajabatan_fPergerakanP.setValue(selectedRecord.get('namajabatan'));
                        namajabatan_fPergerakanP.setReadOnly(true);
                        levelnameJabatan_fPergerakanP.setValue(selectedRecord.get('levelnamejabatan'));
                        idlevelindividu_fPergerakanP.setValue(selectedRecord.get('idlevelindividu'));
                        levelnameindividu_fPergerakanP.setValue(selectedRecord.get('levelnameindividu'));
                        levelnameindividu_fPergerakanP.setReadOnly(true);

                        comboxkekaryaan_fPergerakanP.setValue(selectedRecord.get('kekaryaanname'));
                        comboxkekaryaan_fPergerakanP.setReadOnly(true);
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PERPANJANGAN KONTRAK')
                    {
                         if(selectedRecord.get('kekaryaanname')!=='KONTRAK')
                        {
                             Ext.Msg.alert('Info', 'Pergerakan <b>PERPANJANGAN KONTRAK</b> hanya bisa dilakukan untuk status kekaryawanan <b>KONTRAK</b>');                                                     
                            return false;
                        } else {
                            idjabatan_fPergerakanP.setValue(selectedRecord.get('idjabatan'));
                            namajabatan_fPergerakanP.setValue(selectedRecord.get('namajabatan'));
                            namajabatan_fPergerakanP.setReadOnly(true);
                            levelnameJabatan_fPergerakanP.setValue(selectedRecord.get('levelnamejabatan'));
                            idlevelindividu_fPergerakanP.setValue(selectedRecord.get('idlevelindividu'));
                            levelnameindividu_fPergerakanP.setValue(selectedRecord.get('levelnameindividu'));
                            levelnameindividu_fPergerakanP.setReadOnly(true);

                            comboxkekaryaan_fPergerakanP.setValue(selectedRecord.get('kekaryaanname'));
                            comboxkekaryaan_fPergerakanP.setReadOnly(true);
                        }
                    }



                    Ext.getCmp('idpelamar_fPergerakanP_from').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('idperkerjaan_fPergerakanP_from').setValue(selectedRecord.get('idpekerjaan'));
                    // Ext.getCmp('idcompany_fPergerakanP_from').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('namalengkap_fPergerakanP_from').setValue(selectedRecord.get('namalengkap'));
                    Ext.getCmp('companyname_fPergerakanP_from').setValue(selectedRecord.get('companyname'));
                    Ext.getCmp('nik_fPergerakanP_from').setValue(selectedRecord.get('nik'));
                    Ext.getCmp('ni_fPergerakanP_from').setValue(selectedRecord.get('ni'));
                    // Ext.getCmp('idjabatan_fPergerakanP_from').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('namajabatan_fPergerakanP_from').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('idleveljabatan_fPergerakanP_from').setValue(selectedRecord.get('idleveljabatan'));
                    Ext.getCmp('levelnameJabatan_fPergerakanP_from').setValue(selectedRecord.get('levelnamejabatan'));
                    Ext.getCmp('idlevelindividu_fPergerakanP_from').setValue(selectedRecord.get('idlevelindividu'));
                    Ext.getCmp('levelnameindividu_fPergerakanP_from').setValue(selectedRecord.get('levelnameindividu'));
                    Ext.getCmp('namalokasi_fPergerakanP_from').setValue(selectedRecord.get('namalokasi'));
                    // Ext.getCmp('idorganisasi_fPergerakanP_from').setValue(selectedRecord.get('idorganisasi'));
                    Ext.getCmp('namaorg_fPergerakanP_from').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('idstrukturjabatan_fPergerakanP_from').setValue(selectedRecord.get('idstrukturjabatan'));

                    Ext.getCmp('kekaryaanname_fPergerakanP_from').setValue(selectedRecord.get('kekaryaanname'));
                    Ext.getCmp('tglmasuk_fPergerakanP_from').setValue(selectedRecord.get('tglmasuk'));
                    Ext.getCmp('tglberakhir_fPergerakanP_from').setValue(selectedRecord.get('tglberakhir'));
                    Ext.getCmp('namaatasan_fPergerakanP_from').setValue(selectedRecord.get('namaatasan'));
                    Ext.getCmp('namajabatanatasan_fPergerakanP_from').setValue(selectedRecord.get('namajabatanatasan'));
                    Ext.getCmp('namaorgatasan_fPergerakanP_from').setValue(selectedRecord.get('namaorgatasan'));
                    // Ext.getCmp('namajabatanatasan_fPergerakanP_from').setValue(selectedRecord.get('namajabatanatasan'));

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PROMOSI')
                    {
                        Ext.getCmp('comboxkekaryaan_fPergerakanP').setValue(selectedRecord.get('kekaryaanname'));
                    }

                    if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PENEMPATAN BARU')
                    {
                        namajabatan_fPergerakanP.setReadOnly(false);
                        levelnameindividu_fPergerakanP.setReadOnly(false);
                        comboxkekaryaan_fPergerakanP.setReadOnly(false);
                    }

                    // if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PERUBAHAN STATUS')
                    // {
                    //     // alert(selectedRecord.get('namajabatan_fPergerakanP_from'));
                    //     Ext.getCmp('idpekerjaan_fPergerakanP').setValue(selectedRecord.get('idpekerjaan'));
                    //     // Ext.getCmp('nopergerakan_fPergerakanP').setValue();
                    //     insertNoRef('nopergerakan','nopergerakan_fPergerakanP','PP');
                    //     Ext.getCmp('idstrukturjabatan_fPergerakanP').setValue(selectedRecord.get('idstrukturjabatan'));
                    //     Ext.getCmp('idjabatan_fPergerakanP').setValue(selectedRecord.get('idjabatan'));
                    //     Ext.getCmp('namajabatan_fPergerakanP').setValue(selectedRecord.get('namajabatan'));
                    //     Ext.getCmp('levelnameJabatan_fPergerakanP').setValue(selectedRecord.get('levelnamejabatan'));
                    //     Ext.getCmp('namajabatan_fPergerakanP').setValue(selectedRecord.get('namajabatan'));

                    //     Ext.getCmp('idlevelindividu_fPergerakanP').setValue(selectedRecord.get('idlevelindividu'));
                    //     Ext.getCmp('levelnameindividu_fPergerakanP').setValue(selectedRecord.get('levelnameindividu'));
                    //     Ext.getCmp('namalokasi_fPergerakanP').setValue(selectedRecord.get('namalokasi'));
                    //     Ext.getCmp('idorganisasi_fPergerakanP').setValue(selectedRecord.get('idorganisasi'));
                    //     Ext.getCmp('namaorg_fPergerakanP').setValue(selectedRecord.get('namaorg'));
                    //     Ext.getCmp('idorganisasi_fPergerakanP').setValue(selectedRecord.get('idorganisasi'));
                    //     Ext.getCmp('comboxkekaryaan_fPergerakanP').setValue(selectedRecord.get('kekaryaanname'));
                    //     Ext.getCmp('tglmasuk_fPergerakanP').setValue(selectedRecord.get('tglmasuk'));
                    //     Ext.getCmp('tglberakhir_fPergerakanP').setValue(selectedRecord.get('tglberakhir'));
                    //     // Ext.getCmp('kekaryaanname_fPergerakanBaru').setValue(selectedRecord.get('namajabatan'));
                    //     // Ext.getCmp('tglberakhir_fPergerakanP').setValue(selectedRecord.get('namajabatan'));
                        
                    //     Ext.getCmp('periodekekaryaan_fPergerakanBaru').setValue(selectedRecord.get('namajabatan'));
                    //     Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setValue(selectedRecord.get('namajabatan'));
                    //     Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setValue(selectedRecord.get('namajabatan'));
                    //     Ext.getCmp('idpelamaratasan_fPergerakanP').setValue(selectedRecord.get('idpelamaratasan'));
                    //     Ext.getCmp('namaatasan_fPergerakanP').setValue(selectedRecord.get('namaatasan'));
                    //     Ext.getCmp('namajabatanatasan_fPergerakanP').setValue(selectedRecord.get('namajabatanatasan'));
                    //     Ext.getCmp('kodejabatanatasan_fPergerakanP').setValue(selectedRecord.get('odejabatanatasan'));
                    //     Ext.getCmp('namaorgatasan_fPergerakanP').setValue(selectedRecord.get('namaorgatasan'));
                    //     Ext.getCmp('kodeorgatasan_fPergerakanP').setValue(selectedRecord.get('kodeorgatasan'));
                    // }

                    Ext.getCmp('wGridPersonilListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kekaryawanan', dataIndex: 'kekaryaanname', minWidth: 100},
        {header: 'NIK', dataIndex: 'nik', minWidth: 100},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPersonilList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPersonilList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPersonilListPopup = Ext.create('widget.window', {
    id: 'wGridPersonilListPopup',
    title: 'Pilih Personil',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
     width: 680,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridPersonilList'
    }]
});
