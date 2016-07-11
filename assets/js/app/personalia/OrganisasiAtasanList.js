Ext.define('GridOrganisasiAtasanPergerakanPersonilListModel', {
    extend: 'Ext.data.Model',
    fields: ['idorganisasi','kodeorg','namaorg','kodebudgetorg','deskripsi','idcompany','userin','datein','status','idcompany','companyname','companycode'],
    idProperty: 'id'
});

var storeGridOrganisasiAtasanPergerakanPersonilList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridOrganisasiAtasanPergerakanPersonilListModel',
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
              
Ext.define('MY.searchOrganisasiAtasanPergerakanPersonilList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchOrganisasiAtasanPergerakanPersonilList',
    store: storeGridOrganisasiAtasanPergerakanPersonilList,
    width: 180
});

var smGridOrganisasiAtasanPergerakanPersonilList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridOrganisasiAtasanPergerakanPersonilList', {
    itemId: 'GridOrganisasiAtasanPergerakanPersonilList',
    id: 'GridOrganisasiAtasanPergerakanPersonilList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridOrganisasiAtasanPergerakanPersonilList',
    store: storeGridOrganisasiAtasanPergerakanPersonilList,
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
                    Ext.getCmp('idorganisasiatasan_fPergerakanP').setValue(selectedRecord.get('idorganisasi'));
                    Ext.getCmp('namaorgatasan_fPergerakanP').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('kodeorgatasan_fPergerakanP').setValue(selectedRecord.get('kodeorg'));

                    Ext.getCmp('wGridOrganisasiAtasanPergerakanPersonilListPopup').hide();
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
                    xtype: 'searchOrganisasiAtasanPergerakanPersonilList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridOrganisasiAtasanPergerakanPersonilList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridOrganisasiAtasanPergerakanPersonilListPopup = Ext.create('widget.window', {
    id: 'wGridOrganisasiAtasanPergerakanPersonilListPopup',
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
            xtype:'GridOrganisasiAtasanPergerakanPersonilList'
    }]
});