Ext.define('GridPersonilCutiListModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','namalengkap','idcompany','namajabatan','companyname','nik','ni','idcompany','namalokasi','namaorg','levelnameindividu','levelnamejabatan','idjabatan','idlevelindividu','idlevel','idorg'],
    idProperty: 'id'
});

var storeGridPersonilCutiList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPersonilCutiListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/personil/personalia',
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
              
Ext.define('MY.searchPersonilCutiList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPersonilCutiList',
    store: storeGridPersonilCutiList,
    width: 180
});

var smGridPersonilCutiList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPersonilCutiList', {
    itemId: 'GridPersonilCutiList',
    id: 'GridPersonilCutiList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPersonilCutiList',
    store: storeGridPersonilCutiList,
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
                    Ext.getCmp('idpelamar_fPengajuanCuti').setValue(selectedRecord.get('idpelamar'));
                    // Ext.getCmp('idcompany_fPergerakanP').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('namalengkap_fPengajuanCuti').setValue(selectedRecord.get('namalengkap'));
                    // Ext.getCmp('companyname_fPergerakanP').setValue(selectedRecord.get('companyname'));
                    // Ext.getCmp('nik_fPergerakanP').setValue(selectedRecord.get('nik'));
                    // Ext.getCmp('ni_fPergerakanP').setValue(selectedRecord.get('ni'));
                    // Ext.getCmp('idjabatan_fPergerakanP').setValue(selectedRecord.get('idjabatan'));
                    // Ext.getCmp('namajabatan_fPergerakanP').setValue(selectedRecord.get('namajabatan'));
                    // Ext.getCmp('levelnameJabatan_fPergerakanP').setValue(selectedRecord.get('levelnamejabatan'));
                    // Ext.getCmp('idlevelindividu_fPergerakanP').setValue(selectedRecord.get('idlevelindividu'));
                    // Ext.getCmp('levelnameindividu_fPergerakanP').setValue(selectedRecord.get('levelnameindividu'));
                    // Ext.getCmp('namalokasi_fPergerakanP').setValue(selectedRecord.get('namalokasi'));
                    // Ext.getCmp('idorganisasi_fPergerakanP').setValue(selectedRecord.get('idorg'));
                    // Ext.getCmp('namaorg_fPergerakanP').setValue(selectedRecord.get('namaorg'));

                    Ext.getCmp('wGridPersonilCutiListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'NI', dataIndex: 'ni', minWidth: 150},
        {header: 'nama lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'namajabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Level Jabatan', dataIndex: 'levelnamejabatan', minWidth: 150},
        {header: 'Level Individu', dataIndex: 'levelnameindividu', minWidth: 150},
        {header: 'Lokasi', dataIndex: 'namalokasi', minWidth: 150},
        {header: 'Organisasi', dataIndex: 'namaorg', minWidth: 150}
        
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPersonilCutiList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPersonilCutiList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPersonilCutiListPopup = Ext.create('widget.window', {
    id: 'wGridPersonilCutiListPopup',
    title: 'Pilih Personil',
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
            xtype:'GridPersonilCutiList'
    }]
});