Ext.define('GridStrukturJabatanFormPekerjaanListModel', {
   extend: 'Ext.data.Model',
    fields: ['idstrukturjabatan','idcompany','idjabatan','idorganisasi','idjabatanatasan','kodebudgetorg','status','userin','datein','deskripsi','companycode','companyname','kodejabatan','namajabatan','kodeorg','namaorg','idlevel','kodelevel','levelname','kodejabatanatasan','namajabatanatasan'],
    idProperty: 'id'
});

var storeGridStrukturJabatanFormPekerjaanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStrukturJabatanFormPekerjaanListModel',
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
              
Ext.define('MY.searchStrukturJabatanFormPekerjaanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStrukturJabatanFormPekerjaanList',
    store: storeGridStrukturJabatanFormPekerjaanList,
    width: 180
});

var smGridStrukturJabatanFormPekerjaanList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridStrukturJabatanFormPekerjaanList', {
    itemId: 'GridStrukturJabatanFormPekerjaanList',
    id: 'GridStrukturJabatanFormPekerjaanList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStrukturJabatanFormPekerjaanList',
    store: storeGridStrukturJabatanFormPekerjaanList,
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
                    Ext.getCmp('idstrukturjabatan_fPekerjaan').setValue(selectedRecord.get('idstrukturjabatan'));

                    Ext.getCmp('namajabatan_fPekerjaan').setValue(selectedRecord.get('namajabatan'));
                    Ext.getCmp('kodejabatan_fPekerjaan').setValue(selectedRecord.get('kodejabatan'));
                    Ext.getCmp('levelname_fPekerjaan').setValue(selectedRecord.get('levelname'));
                    Ext.getCmp('namaorg_fPekerjaan').setValue(selectedRecord.get('namaorg'));
                    // Ext.getCmp('kodebudgetorg_addRowktk').setValue(selectedRecord.get('kodebudgetorg'));
                    // Ext.getCmp('idjabatanatasan_fPekerjaan').setValue(selectedRecord.get('idjabatanatasan'));
                    // Ext.getCmp('namajabatanatasan_fPekerjaan').setValue(selectedRecord.get('namajabatanatasan'));
                    // Ext.getCmp('kodejabatanatasan_fPekerjaan').setValue(selectedRecord.get('kodejabatanatasan'));

                    // Ext.getCmp('idjabatan_fPekerjaan').setValue(selectedRecord.get('idjabatan'));
                    // Ext.getCmp('idlevel_fPekerjaan').setValue(selectedRecord.get('idlevel'));
                    // Ext.getCmp('idorganisasi_fPekerjaan').setValue(selectedRecord.get('idorganisasi'));
                    // Ext.getCmp('idjabatanatasan_fPekerjaan').setValue(selectedRecord.get('idjabatanatasan'));
                    // Ext.getCmp('idjabatan_addRowktk').setValue(selectedRecord.get('namajabatanatasan'));


                    Ext.getCmp('wGridStrukturJabatanFormPekerjaanListPopup').hide();
            }
        },
        {header: 'idstrukturjabatan', dataIndex: 'idstrukturjabatan', hidden: true},
        {header: 'Kode Jabatan', dataIndex: 'kodejabatan', minWidth: 200},
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
                    xtype: 'searchStrukturJabatanFormPekerjaanList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridStrukturJabatanFormPekerjaanList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridStrukturJabatanFormPekerjaanListPopup = Ext.create('widget.window', {
    id: 'wGridStrukturJabatanFormPekerjaanListPopup',
    title: 'Pilih Jabatan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 880,
    height: 300,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridStrukturJabatanFormPekerjaanList'
    }]
});