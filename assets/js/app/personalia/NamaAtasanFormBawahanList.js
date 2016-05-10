Ext.define('GridNamaAtasanFormBawahanListModel', {
    extend: 'Ext.data.Model',
   fields: ['idpelamar','ni','nik','namalengkap','tgllahir','idjabatan','kodejabatan','namajabatan','namalokasi','idorganisasi','kodeorg','namaorg','namalokasi','tglmasuk','tglberakhir','kekaryaanname'],
    idProperty: 'id'
});

var storeGridNamaAtasanFormBawahanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridNamaAtasanFormBawahanListModel',
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

// storeGridAccount.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchNamaAtasanFormBawahanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchNamaAtasanFormBawahanList',
    store: storeGridNamaAtasanFormBawahanList,
    width: 180
});

var smGridNamaAtasanFormBawahanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridNamaAtasanFormBawahanList', {
    itemId: 'GridNamaAtasanFormBawahanList',
    id: 'GridNamaAtasanFormBawahanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridNamaAtasanFormBawahanList',
    store: storeGridNamaAtasanFormBawahanList,
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
                    Ext.getCmp('idpelamaratasan_fBawahan').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('namaatasan_fBawahan').setValue(selectedRecord.get('namalengkap'));
                    Ext.getCmp('namajabatanatasan_fBawahan').setValue(selectedRecord.get('namajabatan'));                  
                    // Ext.getCmp('kodejabatanatasan_fPekerjaan').setValue(selectedRecord.get('kodejabatan'));         
                    Ext.getCmp('namaorgatasan_fBawahan').setValue(selectedRecord.get('namaorg'));               
                    // Ext.getCmp('kodeorgatasan_fPekerjaan').setValue(selectedRecord.get('kodeorg'));    
                    // Ext.getCmp('lokasiatasan_fPekerjaan').setValue(selectedRecord.get('namalokasi'));  
                    

                    Ext.getCmp('wGridNamaAtasanFormBawahanListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Kode jabatan', dataIndex: 'kodejabatan', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'kode org', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'nama lokasi', dataIndex: 'namalokasi', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchNamaAtasanFormBawahanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridNamaAtasanFormBawahanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridNamaAtasanFormBawahanListPopup = Ext.create('widget.window', {
    id: 'wGridNamaAtasanFormBawahanListPopup',
    title: 'Pilih Atasan',
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
            xtype:'GridNamaAtasanFormBawahanList'
    }]
});