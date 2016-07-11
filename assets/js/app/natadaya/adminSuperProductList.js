Ext.define('GridProductListModel', {
    extend: 'Ext.data.Model',
    fields: ['productid','productname','status','startdate','enddate','status','productcode','maxemployee','startdate','enddate','userin','datein','description'],
    idProperty: 'id'
});

var storeGridProductList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProductListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Product/natadaya',
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
              
Ext.define('MY.searchProductList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchProductList',
    store: storeGridProductList,
    width: 180
});

var smGridProductList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridProductList', {
    itemId: 'GridProductList',
    id: 'GridProductList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProductList',
    store: storeGridProductList,
    loadMask: true,
    columns: [
    {
            text: 'Pilih',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Produk Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                    Ext.getCmp('productid_adminsuper').setValue(selectedRecord.get('productid'));
                    Ext.getCmp('productcode_adminsuper').setValue(selectedRecord.get('productcode'));
                    Ext.getCmp('productname_adminsuper').setValue(selectedRecord.get('productname'));

                    Ext.getCmp('wGridProductListPopup').hide();
            }
        },
        {header: 'productid', dataIndex: 'productid', hidden: true},
        {header: 'Kode Produk', dataIndex: 'productcode', minWidth: 150},
        {header: 'Nama Produk', dataIndex: 'productname', minWidth: 150},
        {header: 'Batas Jumlah Pegawai', dataIndex: 'maxemployee', minWidth: 180},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150, hidden: true},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150, hidden: true},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150, hidden: true},
        {header: 'user in', dataIndex: 'userin', minWidth: 150, hidden: true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150, hidden: true}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchProductList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridProductList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridProductListPopup = Ext.create('widget.window', {
    id: 'wGridProductListPopup',
    title: 'Pilih Produk',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridProductList'
    }]
});