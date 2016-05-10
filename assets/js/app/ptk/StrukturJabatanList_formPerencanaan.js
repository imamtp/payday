Ext.define('GridStrukturJabatanList_formPerencanaanModel', {
   extend: 'Ext.data.Model',
    fields: ['idstrukturjabatan','idcompany','idjabatan','idorganisasi','idjabatanatasan','kodebudgetorg','status','userin','datein','deskripsi','companycode','companyname','kodejabatan','namajabatan','kodeorg','namaorg','idlevel','kodelevel','levelname','kodejabatanatasan','namajabatanatasan'],
    idProperty: 'id'
});

var storeGridStrukturJabatanList_formPerencanaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanList_formPerencanaanModel',
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
              
Ext.define('MY.searchStrukturJabatanList_formPerencanaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanList_formPerencanaan',
    store: storeGridStrukturJabatanList_formPerencanaan,
    width: 180
});

var smGridStrukturJabatanList_formPerencanaan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    List_formPerencanaaneners: {
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

Ext.define('GridStrukturJabatanList_formPerencanaan', {
    itemId: 'GridStrukturJabatanList_formPerencanaan',
    id: 'GridStrukturJabatanList_formPerencanaan',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanList_formPerencanaan',
    store: storeGridStrukturJabatanList_formPerencanaan,
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
                    Ext.getCmp('namajabatan_formPerencanaan').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('kodejabatan_formPerencanaan').setValue(selectedRecord.get('kodejabatan'));
                    Ext.getCmp('levelname_formPerencanaan').setValue(selectedRecord.get('levelname'));
                    Ext.getCmp('namaorg_formPerencanaan').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('kodebudgetorg_formPerencanaan').setValue(selectedRecord.get('kodebudgetorg'));
                    Ext.getCmp('namajabatanatasan_formPerencanaan').setValue(selectedRecord.get('namajabatanatasan'));

                    Ext.getCmp('idjabatan_formPerencanaan').setValue(selectedRecord.get('idjabatan'));
                    Ext.getCmp('idlevel_formPerencanaan').setValue(selectedRecord.get('idlevel'));
                    Ext.getCmp('idorganisasi_formPerencanaan').setValue(selectedRecord.get('idorganisasi'));
                    Ext.getCmp('idjabatanatasan_formPerencanaan').setValue(selectedRecord.get('idjabatanatasan'));
                    // Ext.getCmp('idjabatan_addRowktk').setValue(selectedRecord.get('namajabatanatasan'));


                    Ext.getCmp('wGridStrukturJabatanList_formPerencanaanPopup').hide();
            }
        },
        {header: 'idstrukturjabatan', dataIndex: 'idstrukturjabatan', hidden: true},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 100},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'Kode Jabatan', dataIndex: 'kodejabatan', minWidth: 90},
        {header: 'Nama Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Level', dataIndex: 'levelname', minWidth: 200},
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
                    xtype: 'searchStrukturJabatanList_formPerencanaan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridStrukturJabatanList_formPerencanaan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanList_formPerencanaanPopup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanList_formPerencanaanPopup',
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
            xtype:'GridStrukturJabatanList_formPerencanaan'
    }]
});