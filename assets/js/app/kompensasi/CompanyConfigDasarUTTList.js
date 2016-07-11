Ext.define('GridCompanyConfigDasarUTTListModel', {
     extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridCompanyConfigDasarUTTList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCompanyConfigDasarUTTListModel',
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

Ext.define('MY.searchCompanyConfigDasarUTTList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchCompanyConfigDasarUTTList',
    store: storeGridCompanyConfigDasarUTTList,
    width: 180
});

var smGridCompanyConfigDasarUTTList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridCompanyConfigDasarUTTList', {
    itemId: 'GridCompanyConfigDasarUTTList',
    id: 'GridCompanyConfigDasarUTTList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCompanyConfigDasarUTTList',
    store: storeGridCompanyConfigDasarUTTList,
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
                    Ext.getCmp('idcompany_fConfigDasarUpahTT').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companyname_fConfigDasarUpahTT').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridCompanyConfigDasarUTTListPopup').hide();
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
                    xtype: 'searchCompanyConfigDasarUTTList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridCompanyConfigDasarUTTList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridCompanyConfigDasarUTTListPopup = Ext.create('widget.window', {
    id: 'wGridCompanyConfigDasarUTTListPopup',
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
            xtype:'GridCompanyConfigDasarUTTList'
    }]
});
