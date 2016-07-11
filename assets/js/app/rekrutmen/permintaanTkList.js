Ext.define('GridPermintaanTkListModel', {
   extend: 'Ext.data.Model',
    fields: ['idpermintaantk','idpelamaratasan','nomorpermintaantk','namaatasan','jumlahrencana','periodekekaryaan','rencanatglmasuk','jumlahsaatini','selisih','tujuan','levelname','kodelevel','kodejabatan','statusperencanaan','tahun','idcompany','idjabatan','idorganisasi','idlokasiorg','idjabatanatasan','namabulan','jumlahpermintaantk','jumlahbulankekaryaan','tglakhirkekaryaan','status','userin','usermod','companyname','companycode','kodeorg','kodebudgetorg','namaorg','namalokasi','namajabatan','namajabatanatasan','kekaryaanname'],
    idProperty: 'id'
});

var storeGridPermintaanTkList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPermintaanTkListModel',
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

// storeGridAccount.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchPermintaanTkList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPermintaanTkList',
    store: storeGridPermintaanTkList,
    width: 180
});

var smGridPermintaanTkList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPermintaanTkList', {
    itemId: 'GridPermintaanTkList',
    id: 'GridPermintaanTkList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPermintaanTkList',
    store: storeGridPermintaanTkList,
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
                    Ext.getCmp('idpermintaantk_fSeleksiPelamar').setValue(selectedRecord.get('idpermintaantk'));
                    Ext.getCmp('nomorpermintaantk_fSeleksiPelamar').setValue(selectedRecord.get('nomorpermintaantk'));
                    Ext.getCmp('namajabatan_fSeleksiPelamar').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('levelname_fSeleksiPelamar').setValue(selectedRecord.get('levelname'));
                    Ext.getCmp('namaorg_fSeleksiPelamar').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('namajabatanatasan_fSeleksiPelamar').setValue(selectedRecord.get('namajabatanatasan'));
                    Ext.getCmp('namaatasan_fSeleksiPelamar').setValue(selectedRecord.get('namaatasan'));
                    Ext.getCmp('idpelamaratasan_fSeleksiPelamar').setValue(selectedRecord.get('idpelamaratasan'));
                    Ext.getCmp('kekaryaanname_fSeleksiPelamar').setValue(selectedRecord.get('kekaryaanname'));


                    Ext.getCmp('wGridPermintaanTkListPopup').hide();
            }
        },
        {header: 'idpermintaantk', dataIndex: 'idpermintaantk', hidden: true},
        {header: 'No PTK', dataIndex: 'nomorpermintaantk', minWidth: 190},
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
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPermintaanTkList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPermintaanTkList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPermintaanTkListPopup = Ext.create('widget.window', {
    id: 'wGridPermintaanTkListPopup',
    title: 'Pilih Data Permintaan Tenaga Kerja',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 880,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridPermintaanTkList'
    }]
});