Ext.define('GridUpahTidakTetapModel', {
    extend: 'Ext.data.Model',
    fields: ['idupahkaryawan','idkomponenupah','idcompany','kodekomponen','namakomponen','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod','jangkawaktu','jenisnilai','angkatetap','persen','pembagi'],
    idProperty: 'id'
});

var storeGridUpahTidakTetap = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUpahTidakTetapModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/upahpegawai/personalia',
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

Ext.define('MY.searchGridUpahTidakTetap', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridUpahTidakTetap',
    store: storeGridUpahTidakTetap,
    width: 180
});

////////////////////////////////////////////////////////////////////////////


Ext.define('GridUpahTidakTetap', {
    width: 900,
    height:390,
    title: 'Upah Tidak Tetap',
    itemId: 'GridUpahTidakTetapID',
    id: 'GridUpahTidakTetapID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUpahTidakTetap',
    store: storeGridUpahTidakTetap,
    loadMask: true,
    columns: [
      {header: 'idupahkaryawan', dataIndex: 'idupahkaryawan', hidden: true},
      {header: 'Kode Upah', dataIndex: 'kodekomponen', minWidth: 150},
      {header: 'Nama Upah', dataIndex: 'namakomponen', minWidth: 150,flex:1},
      {header: 'Jenis Nilai', dataIndex: 'jenisnilai', minWidth: 150},
      {header: 'Pembagi', dataIndex: 'pembagi', minWidth: 150},
      {header: 'Angka Tetap', dataIndex: 'angkatetap', minWidth: 150, align:'right',xtype:'numbercolumn'},
      {header: 'Persen', dataIndex: 'persen', minWidth: 150},
      {header: 'Jangka Waktu', dataIndex: 'jangkawaktu', minWidth: 150},
      {header: 'Kena Pajak', dataIndex: 'kenapajak', minWidth: 150},
      //{header: 'Hitung Pajak', dataIndex: 'hitungpajak', minWidth: 150},
      {header: 'Fungsi Pajak', dataIndex: 'fungsipajak', minWidth: 150}
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
                                roleid: 99
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wGridUpahTidakTetapListPopup.show();
                                    storeGridUpahTidakTetapList.on('beforeload',function(store, operation,eOpts){
                                            operation.params={
                                                         'extraparams': 'a.jeniskomponen:Upah Tidak Tetap'
                                                      };
                                                   });
                                    storeGridUpahTidakTetapList.load();
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        
                        // Ext.getCmp('idpelamar_fUpahTidakTetap').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                    }
                },
                 {
                    id: 'btnDeleteUpahTidakTetap',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 100
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
                                                var grid = Ext.ComponentQuery.query('GridUpahTidakTetap')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/upahpegawai/personalia/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridUpahTidakTetap.remove(sm.getSelection());
                                                sm.select(0);
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
                    xtype: 'searchGridUpahTidakTetap',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridUpahTidakTetap, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridUpahTidakTetap.load();
                storeGridUpahTidakTetap.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
