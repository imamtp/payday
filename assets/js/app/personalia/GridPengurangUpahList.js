Ext.define('GridPengurangUpahListModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengurangupah','idcompany','kodepengurangupah','namapengurangupah','komponenpengurang','jenisnilaipengurang','faktorpembagipengurangupah','angkatetappengurangupah','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','persenpengurangupah'],
    idProperty: 'id'
});

var storeGridPengurangUpahList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPengurangUpahListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigPengurangUpah/kompensasi',
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

// storeGridPengurangUpahList.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                      'extraparams': 'k.statuscalon:Disetujui'
//                   };
//                });

Ext.define('MY.searchPengurangUpahList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPengurangUpahList',
    store: storeGridPengurangUpahList,
    width: 180
});

var smGridPengurangUpahList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPengurangUpahList', {
    itemId: 'GridPengurangUpahList',
    id: 'GridPengurangUpahList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPengurangUpahList',
    store: storeGridPengurangUpahList,
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
                    var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    // Ext.getCmp('idpelamaratasan_fPergerakanP').setValue(selectedRecord.get('idpelamar'));

                    Ext.Ajax.request({
                        url: SITE_URL + 'kompensasi/insertPengurangUpahPegawai',
                        method: 'POST',
                        params: {
                            idpelamar: idpelamar,
                            idpengurangupah: selectedRecord.get('idpengurangupah'),
                            penyesuaian: Ext.getCmp('tipePenyesuaianUpah').getValue(),
                            idpekerjaan: Ext.getCmp('idpekerjaanPenyesuaianUpah').getValue(),
                        },
                        success: function(form, action) {
                            // var d = Ext.decode(form.responseText);
                            storeGridPengurangUpah.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });

                    Ext.getCmp('wGridPengurangUpahListPopup').hide();
            }
        },
        {header: 'idpengurangupah', dataIndex: 'idpengurangupah', hidden: true},
        {header: 'Kode Pengurang Upah', dataIndex: 'kodepengurangupah', minWidth: 170},
        {header: 'Nama Pengurang Upah', dataIndex: 'namapengurangupah', minWidth: 170,flex:1},
        // {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        // {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        // {header: 'Fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
        {header: 'Faktor Pembagi', dataIndex: 'faktorpembagipengurangupah', minWidth: 150},
        {header: 'Angka Tetap', dataIndex: 'angkatetappengurangupah', minWidth: 150},
        {header: 'Persentase', dataIndex: 'persenpengurangupah', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPengurangUpahList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPengurangUpahList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPengurangUpahListPopup = Ext.create('widget.window', {
    id: 'wGridPengurangUpahListPopup',
    title: 'Pilih Komponen Pengurang Upah',
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
            xtype:'GridPengurangUpahList'
    }]
});
