Ext.define('GridJabatanListModel', {
    extend: 'Ext.data.Model',
    fields: ['idstrukturjabatan','idjabatan','idlevel','kodejabatan','namajabatan','levelname','idorganisasi','kodeorg','namaorg','companyname'],
    idProperty: 'id'
});

var storeGridJabatanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJabatanListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/strukturjabatan/desainorg',
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
              
Ext.define('MY.searchJabatanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchJabatanList',
    store: storeGridJabatanList,
    width: 180
});

var smGridJabatanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridJabatanList', {
    itemId: 'GridJabatanList',
    id: 'GridJabatanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJabatanList',
    store: storeGridJabatanList,
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
                    Ext.getCmp('idstrukturjabatan_fPergerakanP').setValue(selectedRecord.get('idstrukturjabatan'));
                    Ext.getCmp('namajabatan_fPergerakanP').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('idjabatan_fPergerakanP').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('levelnameJabatan_fPergerakanP').setValue(selectedRecord.get('levelname'));                  
                    Ext.getCmp('idorganisasi_fPergerakanP').setValue(selectedRecord.get('idorganisasi'));         
                    Ext.getCmp('namaorg_fPergerakanP').setValue(selectedRecord.get('namaorg'));               

                    Ext.getCmp('wGridJabatanListPopup').hide();
            }
        },
        {header: 'idjabatan', dataIndex: 'idjabatan', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 250},
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
                    xtype: 'searchJabatanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJabatanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridJabatanListPopup = Ext.create('widget.window', {
    id: 'wGridJabatanListPopup',
    title: 'Pilih Jabatan',
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
            xtype:'GridJabatanList'
    }]
});