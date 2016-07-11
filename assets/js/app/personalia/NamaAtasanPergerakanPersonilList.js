Ext.define('GridNamaAtasanPergerakanPersonilListModel', {
    extend: 'Ext.data.Model',
   fields: ['idpelamar','ni','nik','namalengkap','tgllahir','idjabatan','kodejabatan','namajabatan','namalokasi','idorganisasi','kodeorg','namaorg','namalokasi','tglmasuk','tglberakhir','kekaryaanname','companyname'],
    idProperty: 'id'
});

var storeGridNamaAtasanPergerakanPersonilList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridNamaAtasanPergerakanPersonilListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/VDataKaryawangrid/personalia',
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



// storeGridNamaAtasanPergerakanPersonilList.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                      'extraparams': 'k.statuscalon:Disetujui'
//                   };
//                });
              
Ext.define('MY.searchNamaAtasanPergerakanPersonilList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchNamaAtasanPergerakanPersonilList',
    store: storeGridNamaAtasanPergerakanPersonilList,
    width: 180
});

var smGridNamaAtasanPergerakanPersonilList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridNamaAtasanPergerakanPersonilList', {
    itemId: 'GridNamaAtasanPergerakanPersonilList',
    id: 'GridNamaAtasanPergerakanPersonilList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridNamaAtasanPergerakanPersonilList',
    store: storeGridNamaAtasanPergerakanPersonilList,
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
                    Ext.getCmp('idpelamaratasan_fPergerakanP').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('namaatasan_fPergerakanP').setValue(selectedRecord.get('namalengkap'));
                    Ext.getCmp('namajabatanatasan_fPergerakanP').setValue(selectedRecord.get('namajabatan'));                  
                    // Ext.getCmp('kodejabatanatasan_fPergerakanP').setValue(selectedRecord.get('kodejabatan'));         
                    Ext.getCmp('namaorgatasan_fPergerakanP').setValue(selectedRecord.get('namaorg'));               
                    Ext.getCmp('kodeorgatasan_fPergerakanP').setValue(selectedRecord.get('kodeorg'));    
                    // Ext.getCmp('lokasiatasan_fPergerakanP').setValue(selectedRecord.get('namalokasi'));  
                    

                    Ext.getCmp('wGridNamaAtasanPergerakanPersonilListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama jabatan', dataIndex: 'namajabatan', minWidth: 150},
        // {header: 'Kode jabatan', dataIndex: 'kodejabatan', minWidth: 150},
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
                    xtype: 'searchNamaAtasanPergerakanPersonilList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridNamaAtasanPergerakanPersonilList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridNamaAtasanPergerakanPersonilListPopup = Ext.create('widget.window', {
    id: 'wGridNamaAtasanPergerakanPersonilListPopup',
    title: 'Pilih Jabatan Atasan',
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
            xtype:'GridNamaAtasanPergerakanPersonilList'
    }]
});