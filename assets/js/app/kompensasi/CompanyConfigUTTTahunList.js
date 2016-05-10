Ext.define('GridCompanyConfigUTTTahunListModel', {
     extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridCompanyConfigUTTTahunList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCompanyConfigUTTTahunListModel',
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

Ext.define('MY.searchCompanyConfigUTTTahunList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchCompanyConfigUTTTahunList',
    store: storeGridCompanyConfigUTTTahunList,
    width: 180
});

var smGridCompanyConfigUTTTahunList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridCompanyConfigUTTTahunList', {
    itemId: 'GridCompanyConfigUTTTahunList',
    id: 'GridCompanyConfigUTTTahunList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCompanyConfigUTTTahunList',
    store: storeGridCompanyConfigUTTTahunList,
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
                    Ext.getCmp('idcompany_fConfigUpahTTTahun').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companyname_fConfigUpahTTTahun').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridCompanyConfigUTTTahunListPopup').hide();
            }
        },
        {header: 'idcompany', dataIndex: 'idcompany', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 200,flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchCompanyConfigUTTTahunList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridCompanyConfigUTTTahunList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridCompanyConfigUTTTahunListPopup = Ext.create('widget.window', {
    id: 'wGridCompanyConfigUTTTahunListPopup',
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
            xtype:'GridCompanyConfigUTTTahunList'
    }]
});
