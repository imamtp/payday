Ext.define('GridJabatanAtasanPergerakanPersonilListModel', {
    extend: 'Ext.data.Model',
   fields: ['idjabatan','idlevel','kodejabatan','namajabatan','levelname','idorganisasi','kodeorg','namaorg'],
    idProperty: 'id'
});

var storeGridJabatanAtasanPergerakanPersonilList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJabatanAtasanPergerakanPersonilListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/strukturJabatan/desainorg',
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
              
Ext.define('MY.searchJabatanAtasanPergerakanPersonilList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchJabatanAtasanPergerakanPersonilList',
    store: storeGridJabatanAtasanPergerakanPersonilList,
    width: 180
});

var smGridJabatanAtasanPergerakanPersonilList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridJabatanAtasanPergerakanPersonilList', {
    itemId: 'GridJabatanAtasanPergerakanPersonilList',
    id: 'GridJabatanAtasanPergerakanPersonilList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJabatanAtasanPergerakanPersonilList',
    store: storeGridJabatanAtasanPergerakanPersonilList,
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
                    Ext.getCmp('namajabatanatasan_fPergerakanP').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('idjabatanatasan_fPergerakanP').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('kodejabatanatasan_fPergerakanP').setValue(selectedRecord.get('kodejabatan'));                  
                    Ext.getCmp('idorganisasiatasan_fPergerakanP').setValue(selectedRecord.get('idorganisasi'));         
                    Ext.getCmp('namaorgatasan_fPergerakanP').setValue(selectedRecord.get('namaorg'));               
                    Ext.getCmp('kodeorgatasan_fPergerakanP').setValue(selectedRecord.get('kodeorg'));    

                    Ext.getCmp('wGridJabatanAtasanPergerakanPersonilListPopup').hide();
            }
        },
        {header: 'idjabatan', dataIndex: 'idjabatan', hidden: true},
        {header: 'Kode jabatan', dataIndex: 'kodejabatan', minWidth: 150},
        {header: 'Nama jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Level jabatan', dataIndex: 'levelname', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchJabatanAtasanPergerakanPersonilList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridJabatanAtasanPergerakanPersonilList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridJabatanAtasanPergerakanPersonilListPopup = Ext.create('widget.window', {
    id: 'wGridJabatanAtasanPergerakanPersonilListPopup',
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
            xtype:'GridJabatanAtasanPergerakanPersonilList'
    }]
});