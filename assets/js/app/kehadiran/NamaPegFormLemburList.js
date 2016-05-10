Ext.define('GridNamaPegFormLemburListModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','ni','nik','namalengkap','tgllahir','idjabatan','kodejabatan','namaatasan','namajabatan','namalokasi','idorganisasi','kodeorg','namaorg','namalokasi','tglmasuk','tglberakhir','kekaryaanname','companyname'],
    idProperty: 'id'
});

var storeGridNamaPegFormLemburList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridNamaPegFormLemburListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/datapekerjaanaktif/personalia',
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

storeGridNamaPegFormLemburList.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
                    'aktif':'true'
                  };
              });
              
Ext.define('MY.searchNamaPegFormLemburList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchNamaPegFormLemburList',
    store: storeGridNamaPegFormLemburList,
    width: 180
});

var smGridNamaPegFormLemburList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridNamaPegFormLemburList', {
    itemId: 'GridNamaPegFormLemburList',
    id: 'GridNamaPegFormLemburList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridNamaPegFormLemburList',
    store: storeGridNamaPegFormLemburList,
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
                    Ext.getCmp('idpelamar_fSuratLembur').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('namalengkap_fSuratLembur').setValue(selectedRecord.get('namalengkap'));
                    Ext.getCmp('namajabatan_fSuratLembur').setValue(selectedRecord.get('namajabatan'));                  
                    Ext.getCmp('namaorg_fSuratLembur').setValue(selectedRecord.get('namaorg'));         
                    Ext.getCmp('namaatasan_fSuratLembur').setValue(selectedRecord.get('namaatasan'));               
                    // Ext.getCmp('kodeorgatasan_fPekerjaan').setValue(selectedRecord.get('kodeorg'));    
                    // Ext.getCmp('lokasiatasan_fPekerjaan').setValue(selectedRecord.get('namalokasi'));  
                    

                    Ext.getCmp('wGridNamaPegFormLemburListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
         {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Nama Organisasi', dataIndex: 'namaorg', minWidth: 150},
        {header: 'Kode Organisasi', dataIndex: 'kodeorg', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchNamaPegFormLemburList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridNamaPegFormLemburList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridNamaPegFormLemburListPopup = Ext.create('widget.window', {
    id: 'wGridNamaPegFormLemburListPopup',
    title: 'Pilih Karyawan',
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
            xtype:'GridNamaPegFormLemburList'
    }]
});