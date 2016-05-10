Ext.define('GridUpahTidakTetapListModel', {
    extend: 'Ext.data.Model',
    fields: ['idkomponenupah','idcompany','kodekomponen','namakomponen','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','jangkawaktu'],
    idProperty: 'id'
});

var storeGridUpahTidakTetapList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUpahTidakTetapListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/komponenupah/kompensasi',
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

// storeGridUpahTidakTetapList.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                      'extraparams': 'k.statuscalon:Disetujui'
//                   };
//                });

Ext.define('MY.searchUpahTidakTetapList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchUpahTidakTetapList',
    store: storeGridUpahTidakTetapList,
    width: 180
});

var smGridUpahTidakTetapList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridUpahTidakTetapList', {
    itemId: 'GridUpahTidakTetapList',
    id: 'GridUpahTidakTetapList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUpahTidakTetapList',
    store: storeGridUpahTidakTetapList,
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
                        url: SITE_URL + 'kompensasi/insertUpahPegawai',
                        method: 'POST',
                        params: {
                            idpelamar: idpelamar,
                            idkomponenupah: selectedRecord.get('idkomponenupah'),
                            penyesuaian: Ext.getCmp('tipePenyesuaianUpah').getValue(),
                            idpekerjaan: Ext.getCmp('idpekerjaanPenyesuaianUpah').getValue(),
                        },
                        success: function(form, action) {
                            // var d = Ext.decode(form.responseText);
                            storeGridUpahTidakTetap.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });

                    Ext.getCmp('wGridUpahTidakTetapListPopup').hide();
            }
        },
        {header: 'idkomponenupah', dataIndex: 'idkomponenupah', hidden: true},
        {header: 'Kode Upah', dataIndex: 'kodekomponen', minWidth: 150},
        {header: 'Nama Upah', dataIndex: 'namakomponen', minWidth: 150},
        {header: 'Jangka Waktu', dataIndex: 'jangkawaktu', minWidth: 150},
        {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchUpahTidakTetapList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridUpahTidakTetapList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridUpahTidakTetapListPopup = Ext.create('widget.window', {
    id: 'wGridUpahTidakTetapListPopup',
    title: 'Pilih Komponen Upah Tidak Tetap',
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
            xtype:'GridUpahTidakTetapList'
    }]
});
