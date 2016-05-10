Ext.define('GridPengurangUpahModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengurangupah','idpelamar','kodepengurangupah','namapengurangupah','komponenpengurang','jenisnilaipengurang','faktorpembagipengurangupah','angkatetappengurangupah','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','persenpengurangupah'],
    idProperty: 'id'
});

var storeGridPengurangUpah = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPengurangUpahModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/pengurangupahpegawai/personalia',
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

Ext.define('MY.searchGridPengurangUpah', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPengurangUpah',
    store: storeGridPengurangUpah,
    width: 180
});

////////////////////////////////////////////////////////////////////////////


Ext.define('GridPengurangUpah', {
    width: 900,
    height:390,
    title: 'Pengurang Upah',
    itemId: 'GridPengurangUpahID',
    id: 'GridPengurangUpahID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPengurangUpah',
    store: storeGridPengurangUpah,
    loadMask: true,
    columns: [
        {header: 'idpengurangupah', dataIndex: 'idpengurangupah', hidden: true},
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Kode Pengurang Upah', dataIndex: 'kodepengurangupah', minWidth: 170},
        {header: 'Nama Pengurang Upah', dataIndex: 'namapengurangupah', minWidth: 170,flex:1},
        // {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        // {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        // {header: 'Fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
        {header: 'Faktor Pembagi Pengurang', dataIndex: 'faktorpembagipengurangupah', minWidth: 170},
        {header: 'Angka Tetap', dataIndex: 'angkatetappengurangupah', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Persentase', dataIndex: 'persenpengurangupah', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 101
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wGridPengurangUpahListPopup.show();
                                    storeGridPengurangUpahList.on('beforeload',function(store, operation,eOpts){
                                            operation.params={
                                                         'notin': 'pengurangupahkaryawan',
                                                         'idpelamar': Ext.getCmp('idpelamar_dkaryawan').getValue()
                                                      };
                                                   });
                                    storeGridPengurangUpahList.load();
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });
                       
                        // Ext.getCmp('idpelamar_fPengurangUpah').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                    }
                },
                 {
                    id: 'btnDeletePengurangUpah',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 102
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.Msg.show({
                                        title: 'Confirm',
                                        msg: 'Delete Selected ?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                                var grid = Ext.ComponentQuery.query('GridPengurangUpah')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]+'&'+item.data[Object.keys(item.data)[1]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_deletes/pengurangupahpegawai/personalia',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)},
                                                    success: function(form, action) {
                                                        // var d = Ext.decode(form.responseText);
                                                        storeGridPengurangUpah.load();
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                    }
                                                });
                                                // storeGridPengurangUpah.remove(sm.getSelection());
                                                // sm.select(0);
                                            }
                                        }
                                    });
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        
                    },
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPengurangUpah',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPengurangUpah, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridPengurangUpah.load();
                // storeGridPengurangUpah.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
