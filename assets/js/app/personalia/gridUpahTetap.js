Ext.define('GridUpahTetapModel', {
    extend: 'Ext.data.Model',
    fields: ['idupahkaryawan','idkomponenupah','idcompany','kodekomponen','nilai','namakomponen','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridUpahTetap = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUpahTetapModel',
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

Ext.define('MY.searchGridUpahTetap', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridUpahTetap',
    store: storeGridUpahTetap,
    width: 180
});

////////////////////////////////////////////////////////////////////////////


Ext.define('GridUpahTetap', {
    width: 900,
    height:390,
    title: 'Upah Tetap',
    itemId: 'GridUpahTetapID',
    id: 'GridUpahTetapID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUpahTetap',
    store: storeGridUpahTetap,
    loadMask: true,
    columns: [
      {header: 'idupahkaryawan', dataIndex: 'idupahkaryawan', hidden: true},
      {header: 'Kode Upah', dataIndex: 'kodekomponen', minWidth: 100},
      {header: 'Nama Upah', dataIndex: 'namakomponen', minWidth: 200,flex:1},
      {header: 'Nilai', dataIndex: 'nilai',xtype:'numbercolumn',align:'right', minWidth: 150},
      {header: 'Kena Pajak', dataIndex: 'kenapajak', minWidth: 150},
      // {header: 'Hitung Pajak', dataIndex: 'hitungpajak', minWidth: 150},
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
                                roleid: 96
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wGridUpahTetapListPopup.show();
                                    storeGridUpahTetapList.on('beforeload',function(store, operation,eOpts){
                                            operation.params={
                                                         'extraparams': 'a.jeniskomponen:Upah Tetap'
                                                      };
                                                   });
                                    storeGridUpahTetapList.load();
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        
                        // Ext.getCmp('idpelamar_fUpahTetap').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                    }
                },
                {
                    text: 'Ubah Nilai',
                    id:'btnUbahNilaiUT',
                    hidden:true,
                    iconCls: 'edit-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 97
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridUpahTetap')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formNilaiUpahTetap = Ext.getCmp('formNilaiUpahTetap');
                                        formNilaiUpahTetap.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/upahpegawai/1/personalia',
                                            params: {
                                                extraparams: 'a.idupahkaryawan:' + selectedRecord.data.idupahkaryawan
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                Ext.getCmp('nilai_fNilaiUpahTetap').setValue(renderNomor(d.data.nilai));
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wNilaiUpahTetap.show();
                                        Ext.getCmp('statusformupahpegawai').setValue('edit');
                                    }
                                } else {
                                     Ext.Msg.alert("Info", d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                            }
                        });

                        

                    }
                },
                 {
                    id: 'btnDeleteUpahTetap',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 98
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.Msg.show({
                                        title: 'Konfirmasi',
                                        msg: 'Hapus data terpilih ?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                                var grid = Ext.ComponentQuery.query('GridUpahTetap')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/upahpegawai/personalia/hidden',
                                                    method: 'POST',
                                                    params: {
                                                        postdata: Ext.encode(selected),
                                                        idpelamar: Ext.getCmp('idpelamar_dkaryawan').getValue(),
                                                        penyesuaian: Ext.getCmp('tipePenyesuaianUpah').getValue(),
                                                        idpekerjaan: Ext.getCmp('idpekerjaanPenyesuaianUpah').getValue()
                                                    }
                                                });
                                                storeGridUpahTetap.remove(sm.getSelection());
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
                    xtype: 'searchGridUpahTetap',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridUpahTetap, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridUpahTetap.load();
                storeGridUpahTetap.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});
