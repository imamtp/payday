Ext.define('GridStrukturJabatanList2Model', {
   extend: 'Ext.data.Model',
    fields: ['idjabatan','idlevel','idcompany','kodejabatan','namajabatan','deskripsi','status','userin','datein','levelname','companycode','companyname'],
    idProperty: 'id'
});

var storeGridStrukturJabatanList2 = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanList2Model',
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
              
Ext.define('MY.searchStrukturJabatanList2', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanList2',
    store: storeGridStrukturJabatanList2,
    width: 180
});

var smGridStrukturJabatanList2 = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridStrukturJabatanList2', {
    itemId: 'GridStrukturJabatanList2',
    id: 'GridStrukturJabatanList2',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanList2',
    store: storeGridStrukturJabatanList2,
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
                    Ext.getCmp('idjabatanStrukturJabatan').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('namajabatanStrukturJabatan').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('kodejabatanStrukturJabatan').setValue(selectedRecord.get('kodejabatan'));
                    Ext.getCmp('idlevelStrukturJabatan').setValue(selectedRecord.get('idlevel'));
                    Ext.getCmp('levelnameStrukturJabatan').setValue(selectedRecord.get('levelname'));

                    Ext.getCmp('wGridStrukturJabatanList2Popup').hide();
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
                    xtype: 'searchStrukturJabatanList2',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStrukturJabatanList2, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanList2Popup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanList2Popup',
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
            xtype:'GridStrukturJabatanList2'
    }]
});