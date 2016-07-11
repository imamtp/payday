Ext.define('GridNamaAtasanPermintaanTKListModel', {
    extend: 'Ext.data.Model',
   fields: ['idpelamar','ni','nik','namalengkap','tgllahir','idjabatan','kodejabatan','namajabatan','namalokasi','idorganisasi','kodeorg','namaorg','namalokasi','tglmasuk','tglberakhir','kekaryaanname','idjabatanaatasan'],
    idProperty: 'id'
});

var storeGridNamaAtasanPermintaanTKList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridNamaAtasanPermintaanTKListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/personil/personalia',
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

storeGridNamaAtasanPermintaanTKList.on('beforeload',function(store, operation,eOpts){
        operation.params={
                     'extraparams': 'k.statuscalon:Disetujui'
      //                +','
					 // +'d.namalokasi:'+Ext.getCmp('namalokasi_filterPermintaanTKList').getValue()+','
					 // +'e.namaorg:'+Ext.getCmp('namaorg_filterPermintaanTKList').getValue()+','
					 // +'c.namajabatan:'+Ext.getCmp('namajabatan_filterPermintaanTKList').getValue()+','
      //                +'c.namajabatan:'+Ext.getCmp('namajabatan_filterPermintaanTKList').getValue()
                  };
               });
              
Ext.define('MY.searchNamaAtasanPermintaanTKList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchNamaAtasanPermintaanTKList',
    store: storeGridNamaAtasanPermintaanTKList,
    width: 180
});

var smGridNamaAtasanPermintaanTKList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridNamaAtasanPermintaanTKList', {
    itemId: 'GridNamaAtasanPermintaanTKList',
    id: 'GridNamaAtasanPermintaanTKList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridNamaAtasanPermintaanTKList',
    store: storeGridNamaAtasanPermintaanTKList,
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
                    Ext.getCmp('idpelamaratasan_fPermintaan').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('namaatasan_fPermintaan').setValue(selectedRecord.get('namalengkap'));
                    // Ext.getCmp('namajabatanatasan_fPermintaan').setValue(selectedRecord.get('namajabatan'));                  
                    // Ext.getCmp('idjabatanatasan_fPermintaan').setValue(selectedRecord.get('idjabatanaatasan'));         
                    // Ext.getCmp('namaorgatasan_fPergerakanP').setValue(selectedRecord.get('namaorg'));               
                    // Ext.getCmp('kodeorgatasan_fPergerakanP').setValue(selectedRecord.get('kodeorg'));    
                    // Ext.getCmp('lokasiatasan_fPergerakanP').setValue(selectedRecord.get('namalokasi'));  
                    

                    Ext.getCmp('wGridNamaAtasanPermintaanTKListPopup').hide();
            } 
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama jabatan', dataIndex: 'namajabatan', minWidth: 150},
        // {header: 'Kode jabatan', dataIndex: 'kodejabatan', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
    ]
    , dockedItems: [
		 // {
            // xtype: 'toolbar',
            // dock: 'top',
            // items: [
                    // {
                        // xtype:'displayfield',
                        // labelWidth:72,
                        // fieldLabel:'Lokasi'
                    // },
                    // {
                        // xtype: 'checkboxfield',
                        // name: 'checkbox1',
                        // id:'filtercb_namalokasiPermintaanTKList',
                        // // fieldLabel: 'Semua',
                        // boxLabel: 'Semua',
                        // listeners: {
                            // click: {
                                // element: 'el', //bind to the underlying el property on the panel
                                // fn: function(){ 
                                    // if(Ext.getCmp('filtercb_namalokasiPermintaanTKList').getValue())
                                    // {
                                        // Ext.getCmp('namalokasi_filterPermintaanTKList').setValue(null);
                                        // Ext.getCmp('namalokasi_filterPermintaanTKList').setDisabled(true);
                                        // storeGridNamaAtasanPermintaanTKList.load();
                                    // } else {
                                        // Ext.getCmp('namalokasi_filterPermintaanTKList').setDisabled(false);
                                        // storeGridNamaAtasanPermintaanTKList.load();
                                    // }
                                // }
                            // }
                        // }
                    // },{
                        // xtype: 'comboxlokasi',
                        // fieldLabel:'',
                        // id: 'namalokasi_filterPermintaanTKList',
                        // name: 'namalokasi',
                        // valueField:'idlokasiorg',
                        // labelWidth: 70,
                        // listeners: {
                        // select: function() { 
                                // storeGridNamaAtasanPermintaanTKList.load();
                                // // console.log(this.value)
                            // }
                        // }
                    // },'->',
                    // {
                        // xtype:'displayfield',
                        // labelWidth:72,
                        // fieldLabel:'Organisasi'
                    // },
                    // {
                        // xtype: 'checkboxfield',
                        // name: 'checkbox1',
                        // id:'filtercb_orgPermintaanTKList',
                        // // fieldLabel: 'Semua',
                        // boxLabel: 'Semua',
                        // listeners: {
                            // click: {
                                // element: 'el', //bind to the underlying el property on the panel
                                // fn: function(){ 
                                    // if(Ext.getCmp('filtercb_orgPermintaanTKList').getValue())
                                    // {
                                        // Ext.getCmp('namaorg_filterPermintaanTKList').setValue(null);
                                        // Ext.getCmp('namaorg_filterPermintaanTKList').setDisabled(true);
                                        // storeGridNamaAtasanPermintaanTKList.load();
                                    // } else {
                                        // Ext.getCmp('namaorg_filterPermintaanTKList').setDisabled(false);
                                        // storeGridNamaAtasanPermintaanTKList.load();
                                    // }
                                // }
                            // }
                        // }
                    // },{
                        // xtype: 'comboxOrg',
                        // valueField:'idorganisasi',
                        // fieldLabel:'',
                        // id: 'namaorg_filterPermintaanTKList',
                        // name: 'namaorg',
                        // labelWidth: 70,
                        // listeners: {
                        // select: function() { 
                                // storeGridNamaAtasanPermintaanTKList.load();
                                // // console.log(this.value)
                            // }
                        // }
                    // }
                // ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
					// {
                        // xtype:'displayfield',
                        // labelWidth:72,
                        // fieldLabel:'Jabatan'
                    // },
                    // {
                        // xtype: 'checkboxfield',
                        // name: 'checkbox1',
                        // id:'filtercb_jabatanPermintaanTKList',
                        // // fieldLabel: 'Semua',
                        // boxLabel: 'Semua',
                        // listeners: {
                            // click: {
                                // element: 'el', //bind to the underlying el property on the panel
                                // fn: function(){ 
                                    // if(Ext.getCmp('filtercb_jabatanPermintaanTKList').getValue())
                                    // {
                                        // Ext.getCmp('namajabatan_filterPermintaanTKList').setValue(null);
                                        // Ext.getCmp('namajabatan_filterPermintaanTKList').setDisabled(true);
                                        // storeGridNamaAtasanPermintaanTKList.load();
                                    // } else {
                                        // Ext.getCmp('namajabatan_filterPermintaanTKList').setDisabled(false);
                                        // storeGridNamaAtasanPermintaanTKList.load();
                                    // }
                                // }
                            // }
                        // }
                    // },
                    // {
                        // xtype: 'comboxJabatan',
                        // valueField:'idjabatan',
                        // fieldLabel:'',
                        // id: 'namajabatan_filterPermintaanTKList',
                        // name: 'namajabatan',
                        // labelWidth: 70,
                        // listeners: {
                        // select: function() { 
                                // storeGridNamaAtasanPermintaanTKList.load();
                                // // console.log(this.value)
                            // }
                        // }
                    // },
                '->', 
                'Pencarian: ', ' ',
                {
                    xtype: 'searchNamaAtasanPermintaanTKList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridNamaAtasanPermintaanTKList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridNamaAtasanPermintaanTKListPopup = Ext.create('widget.window', {
    id: 'wGridNamaAtasanPermintaanTKListPopup',
    title: 'Pilih Nama Atasan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 830,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridNamaAtasanPermintaanTKList'
    }]
});