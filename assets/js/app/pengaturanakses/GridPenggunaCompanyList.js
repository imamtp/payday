Ext.define('GridPenggunaCompanyListModel', {
   extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridPenggunaCompanyList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPenggunaCompanyListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Perusahaan_ModulOrg/modulorg',
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
              
Ext.define('MY.searchPenggunaCompanyList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPenggunaCompanyList',
    store: storeGridPenggunaCompanyList,
    width: 180
});

var smGridPenggunaCompanyList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPenggunaCompanyList', {
    itemId: 'GridPenggunaCompanyList',
    id: 'GridPenggunaCompanyList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPenggunaCompanyList',
    store: storeGridPenggunaCompanyList,
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
                    Ext.getCmp('idcompany_fPengguna').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companycode_pengguna').setValue(selectedRecord.get('companycode'));
                    Ext.getCmp('companyname_pengguna').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridPenggunaCompanyListPopup').hide();
            }
        },
        {header: 'idcompany', dataIndex: 'idcompany', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 200,flex:1},
        {header: 'Tgl Aktivasi', dataIndex: 'startdate', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 80}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPenggunaCompanyList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPenggunaCompanyList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPenggunaCompanyListPopup = Ext.create('widget.window', {
    id: 'wGridPenggunaCompanyListPopup',
    title: 'Pilih Perusahaan',
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
            xtype:'GridPenggunaCompanyList'
    }]
});