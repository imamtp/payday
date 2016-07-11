Ext.define('GridStrukturJabatanList_fPermintaanModel', {
   extend: 'Ext.data.Model',
    fields: ['idstrukturjabatan','idcompany','idjabatan','idorganisasi','idjabatanatasan','kodebudgetorg','status','userin','datein','deskripsi','companycode','companyname','kodejabatan','namajabatan','kodeorg','namaorg','idlevel','kodelevel','levelname','kodejabatanatasan','namajabatanatasan'],
    idProperty: 'id'
});

var storeGridStrukturJabatanList_fPermintaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanList_fPermintaanModel',
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
              
Ext.define('MY.searchStrukturJabatanList_fPermintaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanList_fPermintaan',
    store: storeGridStrukturJabatanList_fPermintaan,
    width: 180
});

var smGridStrukturJabatanList_fPermintaan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    List_fPermintaaneners: {
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

Ext.define('GridStrukturJabatanList_fPermintaan', {
    itemId: 'GridStrukturJabatanList_fPermintaan',
    id: 'GridStrukturJabatanList_fPermintaan',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanList_fPermintaan',
    store: storeGridStrukturJabatanList_fPermintaan,
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
                    Ext.getCmp('namajabatan_fPermintaan').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('kodejabatan_fPermintaan').setValue(selectedRecord.get('kodejabatan'));
                    Ext.getCmp('levelname_fPermintaan').setValue(selectedRecord.get('levelname'));
                    Ext.getCmp('namaorg_fPermintaan').setValue(selectedRecord.get('namaorg'));
                    Ext.getCmp('kodebudgetorg_fPermintaan').setValue(selectedRecord.get('kodebudgetorg'));
                    Ext.getCmp('namajabatanatasan_fPermintaan').setValue(selectedRecord.get('namajabatanatasan'));

                    // Ext.getCmp('idjabatan_fPermintaan').setValue(selectedRecord.get('idjabatan'));
                    // Ext.getCmp('idlevel_fPermintaan').setValue(selectedRecord.get('idlevel'));
                    // Ext.getCmp('idorganisasi_fPermintaan').setValue(selectedRecord.get('idorganisasi'));
                    // Ext.getCmp('idjabatanatasan_fPermintaan').setValue(selectedRecord.get('idjabatanatasan'));
                    Ext.getCmp('idstrukturjabatan_fPermintaan').setValue(selectedRecord.get('idstrukturjabatan'));

                    getNumPerencanaan();
                    Ext.getCmp('wGridStrukturJabatanList_fPermintaanPopup').hide();
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
                    xtype: 'searchStrukturJabatanList_fPermintaan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridStrukturJabatanList_fPermintaan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanList_fPermintaanPopup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanList_fPermintaanPopup',
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
            xtype:'GridStrukturJabatanList_fPermintaan'
    }]
});