Ext.define('GridJamKerja4ListModel', {
    extend: 'Ext.data.Model',
    fields: ['idjamkerjaharian','idcompany','kodejamkerja','namajamkerja','jammasuk','jamkeluar','toleransihadir_menit','mulaiistirahat','akhiristirahat','toleransiistirahat_menit'],
    idProperty: 'id'
});

var storeGridJamKerja4List = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJamKerja4ListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/vjamkerjaharian/kehadiran',
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
              
Ext.define('MY.searchJamKerja4List', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchJamKerja4List',
    store: storeGridJamKerja4List,
    width: 180
});

var smGridJamKerja4List = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridJamKerja4List', {
    itemId: 'GridJamKerja4List',
    id: 'GridJamKerja4List',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJamKerja4List',
    store: storeGridJamKerja4List,
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
                    Ext.getCmp('idjamkerjaharian4_fJadwalKerja').setValue(selectedRecord.get('idjamkerjaharian'));
                    Ext.getCmp('namajamkerja4_fJadwalKerja').setValue(selectedRecord.get('namajamkerja'));

                    Ext.getCmp('wGridJamKerja4ListPopup').hide();
            }
        },
        {header: 'idjamkerjaharian', dataIndex: 'idjamkerjaharian', hidden: true},
        {header: 'Nama jam kerja', dataIndex: 'namajamkerja', minWidth: 150,flex:1},
        {header: 'Jam masuk', dataIndex: 'jammasuk', minWidth: 100},
        {header: 'Jam keluar', dataIndex: 'jamkeluar', minWidth: 100},
        {header: 'Toleransi keterlambatan(menit)', dataIndex: 'toleransihadir_menit', minWidth: 170},
        {header: 'Mulai istirahat', dataIndex: 'mulaiistirahat', minWidth: 150},
        {header: 'Akhir istirahat', dataIndex: 'akhiristirahat', minWidth: 150},
        {header: 'Toleransi istirahat(menit)', dataIndex: 'toleransiistirahat_menit', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchJamKerja4List',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridJamKerja4List, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridJamKerja4ListPopup = Ext.create('widget.window', {
    id: 'wGridJamKerja4ListPopup',
    title: 'Pilih Jam Kerja',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 880,
    height: 300,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridJamKerja4List'
    }]
});