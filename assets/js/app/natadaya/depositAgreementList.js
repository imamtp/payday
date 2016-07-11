Ext.define('GridAgreementListModel', {
    extend: 'Ext.data.Model',
    fields: ['idsuperadmin','aggrementno','startdate','enddate','username','realname','status','idcompany','productname','productcode','companycode','companyname'],
    idProperty: 'id'
});

var storeGridAgreementList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAgreementListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Agreement/natadaya',
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
              
Ext.define('MY.searchAgreementList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchAgreementList',
    store: storeGridAgreementList,
    width: 180
});

var smGridAgreementList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridAgreementList', {
    itemId: 'GridAgreementList',
    id: 'GridAgreementList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAgreementList',
    store: storeGridAgreementList,
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
                    Ext.getCmp('aggrementno_depositnatadaya').setValue(selectedRecord.get('aggrementno'));
                    Ext.getCmp('productcode_depositnatadaya').setValue(selectedRecord.get('productcode'));
                    Ext.getCmp('productname_depositnatadaya').setValue(selectedRecord.get('productname'));
                    Ext.getCmp('idsuperadmin_depositnatadaya').setValue(selectedRecord.get('idsuperadmin'));
                    Ext.getCmp('idcompany_depositnatadaya').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companycode_depositnatadaya').setValue(selectedRecord.get('companycode'));
                    Ext.getCmp('companyname_depositnatadaya').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridAgreementListPopup').hide();
            }
        },
        {header: 'idsuperadmin', dataIndex: 'idsuperadmin', hidden: true},
        {header: 'idcompany', dataIndex: 'idcompany', hidden: true},
        {header: 'No Perjanjian', dataIndex: 'aggrementno', minWidth: 150},
        {header: 'Admin User', dataIndex: 'realname', minWidth: 180},
        {header: 'Kode Produk', dataIndex: 'productcode', minWidth: 150},
        {header: 'Nama Produk', dataIndex: 'productname', minWidth: 180},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150, hidden: true}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchAgreementList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridAgreementList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridAgreementListPopup = Ext.create('widget.window', {
    id: 'wGridAgreementListPopup',
    title: 'Pilih Perjanjian Admin Super',
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
            xtype:'GridAgreementList'
    }]
});