Ext.define('GridPelamarListModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','namalengkap','tgllahir','idsex','sexname','noktp','alamat','notelp','nohandphone','jabatandituju','tgllamaran','status','userin','datein','tempatlahir','idstatuskawin','email','daerahrekrut','alamatktp','idjenjangpendidikan','fakultas','jurusan','foto','cv','referensi','sumberlamaran','namastatuskawin'],
    idProperty: 'id'
});

var storeGridPelamarList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPelamarListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/pelamarforseleksi/rekrutmen',
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

// storeGridPelamarList.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'a.statuscalon:'+Ext.getCmp('comboxstatusPelamar_seleksiPelamar').getValue()
//                   };
//               });

Ext.define('MY.searchPelamarList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPelamarList',
    store: storeGridPelamarList,
    width: 180
});

var smGridPelamarList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPelamarList', {
    itemId: 'GridPelamarList',
    id: 'GridPelamarList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPelamarList',
    store: storeGridPelamarList,
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

                    Ext.getCmp('idpelamar_fSeleksiPelamar').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('namalengkap_fSeleksiPelamar').setValue(selectedRecord.get('namalengkap'));


                    Ext.getCmp('wGridPelamarListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Tgl Lahir', dataIndex: 'tgllahir', minWidth: 150},
        {header: 'Jenis Kelamin', dataIndex: 'sexname', minWidth: 150},
        {header: 'Jabatan Dituju', dataIndex: 'jabatandituju', minWidth: 150},
        {header: 'Tgl Lamaran', dataIndex: 'tgllamaran', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPelamarList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPelamarList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPelamarListPopup = Ext.create('widget.window', {
    id: 'wGridPelamarListPopup',
    title: 'Pilih Pelamar',
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
            xtype:'GridPelamarList'
    }]
});
