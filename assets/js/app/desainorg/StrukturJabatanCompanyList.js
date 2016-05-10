Ext.define('GridStrukturJabatanCompanyListModel', {
   extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridStrukturJabatanCompanyList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanCompanyListModel',
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
              
Ext.define('MY.searchStrukturJabatanCompanyList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanCompanyList',
    store: storeGridStrukturJabatanCompanyList,
    width: 180
});

var smGridStrukturJabatanCompanyList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridStrukturJabatanCompanyList', {
    itemId: 'GridStrukturJabatanCompanyList',
    id: 'GridStrukturJabatanCompanyList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanCompanyList',
    store: storeGridStrukturJabatanCompanyList,
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
                    Ext.getCmp('idcompanyStrukturJabatan').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companycodeStrukturJabatan').setValue(selectedRecord.get('companycode'));
                    Ext.getCmp('companynameStrukturJabatan').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridStrukturJabatanCompanyListPopup').hide();
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
                    xtype: 'searchStrukturJabatanCompanyList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStrukturJabatanCompanyList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanCompanyListPopup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanCompanyListPopup',
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
            xtype:'GridStrukturJabatanCompanyList'
    }]
});