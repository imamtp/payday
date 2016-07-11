Ext.define('GridPekerjaanOrganisasiListModel', {
    extend: 'Ext.data.Model',
    fields: ['idorganisasi','kodeorg','namaorg','kodebudgetorg','deskripsi','idcompany','userin','datein','status','idcompany','companyname','companycode'],
    idProperty: 'id'
});

var storeGridPekerjaanOrganisasiList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPekerjaanOrganisasiListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Organisasi/desainorg',
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
              
Ext.define('MY.searchPekerjaanOrganisasiList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPekerjaanOrganisasiList',
    store: storeGridPekerjaanOrganisasiList,
    width: 180
});

var smGridPekerjaanOrganisasiList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPekerjaanOrganisasiList', {
    itemId: 'GridPekerjaanOrganisasiList',
    id: 'GridPekerjaanOrganisasiList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPekerjaanOrganisasiList',
    store: storeGridPekerjaanOrganisasiList,
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
                    Ext.getCmp('idorganisasiatasan_fPekerjaan').setValue(selectedRecord.get('idorganisasi'));
                    Ext.getCmp('namaorgatasan_fPekerjaan').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('kodeorgatasan_fPekerjaan').setValue(selectedRecord.get('kodeorg'));

                    Ext.getCmp('wGridPekerjaanOrganisasiListPopup').hide();
            }
        },
        {header: 'idorganisasi', dataIndex: 'idorganisasi', hidden: true},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPekerjaanOrganisasiList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPekerjaanOrganisasiList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPekerjaanOrganisasiListPopup = Ext.create('widget.window', {
    id: 'wGridPekerjaanOrganisasiListPopup',
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
            xtype:'GridPekerjaanOrganisasiList'
    }]
});