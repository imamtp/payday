Ext.define('GridPelamarListModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','namalengkap','tgllahir','idsex','sexname','noktp','alamat','notelp','nohandphone','jabatandituju','tgllamaran','status','userin','datein','tempatlahir','idstatuskawin','email','daerahrekrut','alamatktp','idjenjangpendidikan','fakultas','jurusan','foto','cv','referensi','sumberlamaran','namastatuskawin','companyname'],
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

storeGridPelamarList.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'option': 'seleksi_pelamar_list'
                  };
              });

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
                    Ext.getCmp('idpermintaantk_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('nomorpermintaantk_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('namajabatan_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('levelname_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('namaorg_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('namajabatanatasan_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('namaatasan_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('idpelamaratasan_fSeleksiPelamar').setValue(null);
                    Ext.getCmp('kekaryaanname_fSeleksiPelamar').setValue(null);

                    Ext.getCmp('idpelamar_fSeleksiPelamar').setValue(selectedRecord.get('idpelamar'));
                    Ext.getCmp('namalengkap_fSeleksiPelamar').setValue(selectedRecord.get('namalengkap'));
                    Ext.getCmp('companyname_fSeleksiPelamar').setValue(selectedRecord.get('companyname'));
                    Ext.getCmp('nomorpermintaantk_fSeleksiPelamar').show();

                    Ext.getCmp('wGridPelamarListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 150},
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
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
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
