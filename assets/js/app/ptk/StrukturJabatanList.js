Ext.define('GridStrukturJabatanListModel', {
   extend: 'Ext.data.Model',
    fields: ['idstrukturjabatan','idcompany','idjabatan','idorganisasi','idjabatanatasan','kodebudgetorg','status','userin','datein','deskripsi','companycode','companyname','kodejabatan','namajabatan','kodeorg','namaorg','idlevel','kodelevel','levelname','kodejabatanatasan','namajabatanatasan'],
    idProperty: 'id'
});

var storeGridStrukturJabatanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/StrukturJabatan/desainorg',
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
              
Ext.define('MY.searchStrukturJabatanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanList',
    store: storeGridStrukturJabatanList,
    width: 180
});

var smGridStrukturJabatanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridStrukturJabatanList', {
    itemId: 'GridStrukturJabatanList',
    id: 'GridStrukturJabatanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanList',
    store: storeGridStrukturJabatanList,
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
                    Ext.getCmp('namajabatan_addRowktk').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('kodejabatan_addRowktk').setValue(selectedRecord.get('kodejabatan'));
                    Ext.getCmp('levelname_addRowktk').setValue(selectedRecord.get('levelname'));
                    Ext.getCmp('namaorg_addRowktk').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('kodebudgetorg_addRowktk').setValue(selectedRecord.get('kodebudgetorg'));
                    Ext.getCmp('namajabatanatasan_addRowktk').setValue(selectedRecord.get('namajabatanatasan'));

                    Ext.getCmp('idjabatan_addRowktk').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('idlevel_addRowktk').setValue(selectedRecord.get('idlevel'));
                    Ext.getCmp('idorganisasi_addRowktk').setValue(selectedRecord.get('idorganisasi'));
                    Ext.getCmp('idjabatanatasan_addRowktk').setValue(selectedRecord.get('idjabatanatasan'));
                    // Ext.getCmp('idjabatan_addRowktk').setValue(selectedRecord.get('namajabatanatasan'));


                    Ext.getCmp('wGridStrukturJabatanListPopup').hide();
            }
        },
        {header: 'idstrukturjabatan', dataIndex: 'idstrukturjabatan', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 100},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Jabatan', dataIndex: 'kodejabatan', minWidth: 90},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 200,flex:1},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 150},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'kodebudgetorg', dataIndex: 'kodebudgetorg', minWidth: 150},
        {header: 'Kode jabatan atasan', dataIndex: 'kodejabatanatasan', minWidth: 150},
        {header: 'Nama jabatan atasan', dataIndex: 'namajabatanatasan', minWidth: 150},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchStrukturJabatanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStrukturJabatanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanListPopup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanListPopup',
    title: 'Pilih Jabatan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 1000,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridStrukturJabatanList'
    }]
});