Ext.define('GridGantiProdukListModel', {
    extend: 'Ext.data.Model',
    fields: ['productid','productname','status','price','startdate','enddate','status','productcode','maxemployee','startdate','enddate','userin','datein','description'],
    idProperty: 'id'
});

var storeGridGantiProdukList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridGantiProdukListModel',
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
              
Ext.define('MY.searchGantiProdukList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGantiProdukList',
    store: storeGridGantiProdukList,
    width: 180
});

var smGridGantiProdukList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridGantiProdukList', {
    itemId: 'GridGantiProdukList',
    id: 'GridGantiProdukList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGantiProdukList',
    store: storeGridGantiProdukList,
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
                // alert(Ext.getCmp('totalkaryawan_GantiProduk').getValue()*1+'>'+selectedRecord.get('maxemployee')*1);

                if(selectedRecord.get('maxemployee')*1==0)
                {
                    //unlimited
                    Ext.getCmp('idproductnew_GantiProduk').setValue(selectedRecord.get('productid'));
                    Ext.getCmp('productcodenew_GantiProduk').setValue(selectedRecord.get('productcode'));
                    Ext.getCmp('productnamenew_GantiProduk').setValue(selectedRecord.get('productname'));

                    Ext.getCmp('wGridGantiProdukListPopup').hide();
                } else if(Ext.getCmp('idproduct_GantiProduk').getValue()==selectedRecord.get('productid'))
                    {
                        Ext.Msg.alert('Info', 'Produk Tidak Boleh Sama');
                    } else {
                        // console.log(Ext.getCmp('balance_GantiProduk').getValue()*1+'<'+selectedRecord.get('price')*1);
                        if(Ext.getCmp('balance_GantiProduk').getValue()*1<selectedRecord.get('price')*1)
                        {
                            Ext.Msg.alert('Info', 'Saldo tidak mencukupi');
                        } else if(Ext.getCmp('totalkaryawan_GantiProduk').getValue()*1>selectedRecord.get('maxemployee')*1)
                            {
                                Ext.Msg.alert('Info', 'Jumlah karyawan yang ada melebih batas maksimum yang diperbolehkan');
                            } else {
                                Ext.getCmp('idproductnew_GantiProduk').setValue(selectedRecord.get('productid'));
                                Ext.getCmp('productcodenew_GantiProduk').setValue(selectedRecord.get('productcode'));
                                Ext.getCmp('productnamenew_GantiProduk').setValue(selectedRecord.get('productname'));

                                Ext.getCmp('wGridGantiProdukListPopup').hide();
                            }
                       
                    }
                   
            }
        },
        {header: 'productid', dataIndex: 'productid', hidden: true},
        {header: 'Kode Produk', dataIndex: 'productcode', minWidth: 150},
        {header: 'Nama Produk', dataIndex: 'productname', minWidth: 150},
        {header: 'Harga', xtype:'numbercolumn',align:'right',dataIndex: 'price', minWidth: 150},
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
                    xtype: 'searchGantiProdukList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridGantiProdukList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridGantiProdukListPopup = Ext.create('widget.window', {
    id: 'wGridGantiProdukListPopup',
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
            xtype:'GridGantiProdukList'
    }]
});