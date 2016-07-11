Ext.define('GridLevelPergerakanListModel', {
   extend: 'Ext.data.Model',
    fields: ['idlevel','levelname','description','status','idcompany','kodelevel','urutan','userin','datein'],
    idProperty: 'id'
});

var storeGridLevelPergerakanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridLevelPergerakanListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Level/natadaya',
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
              
Ext.define('MY.searchLevelPergerakanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchLevelPergerakanList',
    store: storeGridLevelPergerakanList,
    width: 180
});

var smGridLevelPergerakanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridLevelPergerakanList', {
    itemId: 'GridLevelPergerakanList',
    id: 'GridLevelPergerakanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridLevelPergerakanList',
    store: storeGridLevelPergerakanList,
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
                    Ext.getCmp('idlevelindividu_fPergerakanP').setValue(selectedRecord.get('idlevel'));
                    Ext.getCmp('levelnameindividu_fPergerakanP').setValue(selectedRecord.get('levelname'));
                    // Ext.getCmp('companynameOrganisasi').setValue(selectedRecord.get('companyname'));

                    Ext.getCmp('wGridLevelPergerakanListPopup').hide();
            }
        },
        {header: 'idlevel', dataIndex: 'idlevel', hidden: true},
        {header: 'Kode Level', dataIndex: 'kodelevel', minWidth: 100},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 200,flex:1},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
        {header: 'Urutan', dataIndex: 'urutan', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchLevelPergerakanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridLevelPergerakanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridLevelPergerakanListPopup = Ext.create('widget.window', {
    id: 'wGridLevelPergerakanListPopup',
    title: 'Pilih Level',
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
            xtype:'GridLevelPergerakanList'
    }]
});