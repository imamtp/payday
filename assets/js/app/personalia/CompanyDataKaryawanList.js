Ext.define('GridCompanyDataKaryawanListModel', {
     extend: 'Ext.data.Model',
    fields: ['idcompany','companyaddress','companyname','email','companycode','aggrementno','startdate','enddate','status','productcode','productname'],
    idProperty: 'id'
});

var storeGridCompanyDataKaryawanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCompanyDataKaryawanListModel',
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
              
Ext.define('MY.searchCompanyDataKaryawanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchCompanyDataKaryawanList',
    store: storeGridCompanyDataKaryawanList,
    width: 180
});

var smGridCompanyDataKaryawanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridCompanyDataKaryawanList', {
    itemId: 'GridCompanyDataKaryawanList',
    id: 'GridCompanyDataKaryawanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCompanyDataKaryawanList',
    store: storeGridCompanyDataKaryawanList,
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
                    Ext.getCmp('idcompany_dkaryawan').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('companyname_dkaryawan').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridCompanyDataKaryawanListPopup').hide();
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
                    xtype: 'searchCompanyDataKaryawanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridCompanyDataKaryawanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridCompanyDataKaryawanListPopup = Ext.create('widget.window', {
    id: 'wGridCompanyDataKaryawanListPopup',
    title: 'Pilih Organisasi',
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
            xtype:'GridCompanyDataKaryawanList'
    }]
});