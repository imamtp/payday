Ext.define('GridStrukturJabatanAtasanListModel', {
   extend: 'Ext.data.Model',
    fields: ['idjabatan','idlevel','idcompany','kodejabatan','namajabatan','deskripsi','status','userin','datein','levelname','companycode','companyname'],
    idProperty: 'id'
});

var storeGridStrukturJabatanAtasanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanAtasanListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Jabatan/desainorg',
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
              
Ext.define('MY.searchStrukturJabatanAtasanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanAtasanList',
    store: storeGridStrukturJabatanAtasanList,
    width: 180
});

var smGridStrukturJabatanAtasanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridStrukturJabatanAtasanList', {
    itemId: 'GridStrukturJabatanAtasanList',
    id: 'GridStrukturJabatanAtasanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanAtasanList',
    store: storeGridStrukturJabatanAtasanList,
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
                    Ext.getCmp('idjabatanatasanStrukturJabatan').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('namajabatanatasanStrukturJabatan').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('kodejabatanatasanStrukturJabatan').setValue(selectedRecord.get('kodejabatan'));

                    Ext.getCmp('wGridStrukturJabatanAtasanListPopup').hide();
            }
        },
        {header: 'idjabatan', dataIndex: 'idjabatan', hidden: true},
        {header: 'idlevel', dataIndex: 'idlevel', hidden: true},
        {header: 'Kode Jabatan', dataIndex: 'kodejabatan', minWidth: 100},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 250,flex:1},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 200}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchStrukturJabatanAtasanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStrukturJabatanAtasanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanAtasanListPopup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanAtasanListPopup',
    title: 'Pilih Jabatan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 880,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridStrukturJabatanAtasanList'
    }]
});