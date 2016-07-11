Ext.define('GridPerencanaanModel', {
   extend: 'Ext.data.Model',
    fields: ['idperencanaantk','tahun','idcompany','idjabatan','kodejabatan','namabulan','kodelevel','levelname','idorganisasi','idlokasiorg','idjabatanatasan','namabulan','jumlah','revisi','jumlahrevisi','status','userin','usermod','companyname','companycode','kodeorg','kodebudgetorg','namaorg','namalokasi','namajabatan','namajabatanatasan','idupload'],
    idProperty: 'id'
});

var storeGridPerencanaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPerencanaanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/datarawptk/ptk',
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


//////////////////////////////



Ext.define('KitchenSink.view.grid.EntryPerencanaanTK', {
        extend: 'Ext.grid.Panel',
        id: 'EntryPerencanaanTK',
        alias: 'widget.EntryPerencanaanTK',
        xtype: 'cell-editing',
        // title: 'Form Perencanaan Tenaga Kerja',
        //    frame: true,    
        initComponent: function() {
            this.cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1
            });
            Ext.apply(this, {
                    width: 1240,
                    height: 500,
                    forceFit: true,
                    plugins: [this.cellEditing],
                    store: PerencanaanTKGridStore,
                    columns: [
                    {
                        header: 'idperencanaantk',
                        hidden: true,
                        dataIndex: 'idperencanaantk'
                    },
                    {
                        header: 'tahunperencanaan',
                        hidden: true,
                        dataIndex: 'idjabatan'
                    },{
                        header: 'idcompany',
                        hidden: true,
                        dataIndex: 'idcompany'
                    },{
                        header: 'idjabatan',
                        hidden: true,
                        dataIndex: 'idjabatan'
                    },{
                        header: 'idlevel',
                        hidden: true,
                        dataIndex: 'idlevel'
                    },{
                        header: 'idorganisasi',
                        hidden: true,
                        dataIndex: 'idorganisasi'
                    },{
                        header: 'idlokasi',
                        hidden: true,
                        dataIndex: 'idlokasi'
                    },{
                        header: 'idjabatanatasan',
                        hidden: true,
                        dataIndex: 'idjabatanatasan'
                    },{
                        header: 'Kode Jabatan',
                        dataIndex: 'kodejabatan',
                        width: 100
                    }, {
                        header: 'Nama Jabatan',
                        dataIndex: 'namajabatan',
                        width: 120
                    }, {
                        header: 'Level Jabatan',
                        dataIndex: 'kodelevel',
                        width: 150
                    }, {
                        header: 'Nama Organisasi',
                        dataIndex: 'namaorg',
                        width: 150
                    }, {
                        header: 'Lokasi',
                        dataIndex: 'namalokasi',
                        width: 150,
                        // editor: {
                        //     xtype: 'combobox', store: lokasiStore, queryMode: 'local', displayField: 'namalokasi', valueField: 'namalokasi'
                        // }
                        // editor: {
                        //     xtype: 'comboxlokasi',
                        //     allowBlank: false,
                        //     minValue: 0
                        // }
                    }, {
                        header: 'Nama Jabatan Atasan',
                        dataIndex: 'namajabatanatasan',
                        width: 150
                    }, 
                    {
                        header: 'Bulan',
                        dataIndex: 'namabulan',
                        width: 130,
                        // editor: {
                        //     xtype: 'combobox', store: storeBulan, queryMode: 'local', displayField: 'namabulan', valueField: 'namabulan'
                        // }
                        // editor: {
                        //     xtype: 'comboxbulan',
                        //     width: 150,
                        //     allowBlank: false
                        // }
                    },
                    {
                        xtype: 'numbercolumn',
                        header: 'Jumlah',
                        width: 100,
                        decimalPrecision:0,
                        dataIndex: 'jumlah',
                        align: 'right',
                        // editor: {
                        //     xtype: 'numberfield',
                        //     allowBlank: false,
                        //     minValue: 0
                        // }
                    },{
                        xtype: 'numbercolumn',
                        header: 'Revisi',
                        decimalPrecision:0,
                        width: 100,
                        dataIndex: 'revisi',
                        align: 'right',
                        // editor: {
                        //     xtype: 'numberfield',
                        //     allowBlank: false
                        // }
                    },{
                        xtype: 'numbercolumn',
                        header: 'Jumlah Revisi',
                        decimalPrecision:0,
                        width: 110,
                        dataIndex: 'jumlahrevisi',
                        align: 'right'
                    }, {
                        xtype: 'actioncolumn',
                        width: 30,
                        align: 'center',
                        sortable: false,
                        menuDisabled: true,
                        items: [{
                            icon: BASE_URL + 'assets/icons/fam/cross.gif',
                            tooltip: 'Hapus',
                            scope: this,
                            handler: this.onRemoveClick
                        }]
                    }],
                    selModel: {
                        selType: 'cellmodel'
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                    xtype: 'comboxcompany',
                                    valueField:'idcompany',
                                    id: 'companyname_ptk',
                                    name: 'companyname',
                                    labelWidth: 190
                                }
                                // ,'->',
                                // {
                                //     xtype: 'textfield',
                                //     readOnly:true,
                                //     fieldStyle: 'text-align: right;',
                                //     fieldLabel: 'Jumlah',
                                //     id: 'jumlah_ptk'
                                // }
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [{
                                    xtype: 'numberfield',
                                    value:new Date().getFullYear(),
                                    fieldLabel: 'Tahun Kebutuhan Tenaga Kerja',
                                    labelWidth: 190,
                                    name: 'tahun',
                                    id: 'tahun_ptk'
                                }
                                // ,'->',
                                // {
                                //     xtype: 'textfield',
                                //     fieldStyle: 'text-align: right;',
                                //     readOnly:true,
                                //     fieldLabel: 'Revisi',
                                //     id: 'revisi_ptk'
                                // }
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [{
                                    text: 'Tambah Item',
                                    iconCls: 'add-icon',
                                    scope: this,
                                    handler: this.onAddClick
                                }
                                // ,'->',
                                // {
                                //     xtype: 'textfield',
                                //     readOnly:true,
                                //     fieldStyle: 'text-align: right;',
                                //     fieldLabel: 'Jumlah Revisi',
                                //     id: 'jumlahrevisi_ptk'
                                // }
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: ['->',{
                                    text: 'Simpan Perencanan Tenaga Kerja',
                                    iconCls: 'disk',
                                    handler: Ext.bind(this.recordData, this, 'noprint', true)
                                }]
                            }, {
                                xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
                                store: PerencanaanTKGridStore, // same store GridPanel is using
                                dock: 'bottom',
                                displayInfo: true
                                        // pageSize:20
                            }],
                        listeners: {
                            cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                            render: {
                                scope: this,
                                fn: function(grid) {
                                    //                        disableEntryPerencanaanTK();
                                }
                            }
                        }
                    }); this.callParent(); this.on('afterlayout', this.loadStore, this, {
                    delay: 1,
                    single: true
                }); this.on('afteredit', this.onAfterEdit, this); this.on({
                    scope: this,
                    edit: function() {
                        updateGridFormPerencanaanTK();
                    }
                });
            },
            onAfterEdit: function(o) {
                // handle after edit
                console.log('after edit');
            },
            recordDataPrint: function(button, event, mode) {
                console.log(mode)
            },
            recordData: function(button, event, mode) {
                // if (validasiReceive()) {
                    var json = Ext.encode(Ext.pluck(PerencanaanTKGridStore.data.items, 'data'));
                    //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPerencanaanTK').getValue());
                    Ext.Ajax.request({
                        url: SITE_URL + 'ptk/setStatus',
                        method: 'POST',
                        params: {
                            dataGrid: json,
                            status:'saved'
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            if (!d.success) {
                                Ext.Msg.alert('Peringatan', d.message);
                            } else {
                                Ext.Msg.alert('Info', d.message);
                                Ext.getCmp('wEntryPerencanaanTK').hide();
                                storeGridPerencanaan.load();
                            }
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                // }
            },
            saveRecurr: function() {
                if (validasiPayment()) {
                    Ext.getCmp('formformRecc').getForm().reset();
                    wformRecc.show();
                }
            },
            loadStore: function() {
                //        this.getStore().load({
                //            // store loading is asynchronous, use a load listener or callback to handle results
                //            callback: this.onStoreLoad
                //        });
            },
            onStoreLoad: function() {
                //        Ext.Msg.show({
                //            title: 'Store Load Callback',
                //            msg: 'store was loaded, data available for processing',
                //            icon: Ext.Msg.INFO,
                //            buttons: Ext.Msg.OK
                //        });
            },
            onAddClick: function() {

                var companyname_ptk = Ext.getCmp('companyname_ptk').getValue();
                var tahun_ptk = Ext.getCmp('tahun_ptk').getValue();
                // alert(idcompany_ptk)
                if (companyname_ptk == null) {
                    Ext.Msg.alert('Perhatian', 'Perusahaan belum dipilih');
                } else if(tahun_ptk == null){
                    Ext.Msg.alert('Perhatian', 'Tahun belum diinput');
                } else {
                    wAddRowPerencanaanTK.show();
                    Ext.getCmp('status_addRowktk').setValue('temporary');
                    Ext.getCmp('companyname_addRowktk').setValue(companyname_ptk);
                    Ext.getCmp('tahun_addRowktk').setValue(tahun_ptk);

                }
            },
            onRemoveClick: function(grid, rowIndex) {

                
                console.log(PerencanaanTKGridStore.data.items[rowIndex].data.idperencanaantk);
                var idperencanaantk = PerencanaanTKGridStore.data.items[rowIndex].data.idperencanaantk;

                Ext.Ajax.request({
                    url: SITE_URL + 'ptk/deletePTK',
                    method: 'POST',
                    params: {
                        idperencanaantk: idperencanaantk
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', 'Gagal');
                        } else {
                           updateGridFormPerencanaanTK();
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });

                
            },
            onEdit: function(editor, e) {
                e.record.commit();
            }
        });

    function updateGridFormPerencanaanTK() {
        // var json = Ext.encode(Ext.pluck(PerencanaanTKGridStore.data.items, 'data'));
        //             //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPerencanaanTK').getValue());
        // Ext.Ajax.request({
        //     url: SITE_URL + 'ptk/updateGridFormPerencanaanTK',
        //     method: 'POST',
        //     params: {
        //         dataGrid: json,
        //         tahun: Ext.getCmp('tahun_ptk').getValue(),
        //         companyname: Ext.getCmp('companyname_ptk').getValue()
        //     },
        //     success: function(form, action) {
        //         var d = Ext.decode(form.responseText);
        //         if (!d.success) {
        //             Ext.Msg.alert('Peringatan', 'Gagal');
        //         } else {
        //             // Ext.Msg.alert('Success', d.message);
                    PerencanaanTKGridStore.load();

        //             // Ext.getCmp('jumlah_ptk').setValue(d.jumlah);
        //             // Ext.getCmp('revisi_ptk').setValue(d.revisi);
        //             // Ext.getCmp('jumlahrevisi_ptk').setValue(d.jumlahrevisi);
        //         }
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        //     }
        // });

        // var subtotalReceive = 0 * 1;
        // var totalPajak = 0 * 1;
        // var totalReceive = 0 * 1;
        // Ext.each(PerencanaanTKGridStore.data.items, function(obj, i) {
        //     var pajak = (obj.data.amount * 1 / 100) * obj.data.ratetax;
        //     totalPajak += pajak;
        //     subtotalReceive += obj.data.amount * 1;
        // });
        // totalReceive = subtotalReceive * 1 - totalPajak * 1;
        // Ext.getCmp('subtotalReceive').setValue(subtotalReceive.toLocaleString('null', {
        //     minimumFractionDigits: 2
        // }));
        // Ext.getCmp('taxReceive').setValue(totalPajak.toLocaleString('null', {
        //     minimumFractionDigits: 2
        // }));
        // Ext.getCmp('totalReceive').setValue(totalReceive.toLocaleString('null', {
        //     minimumFractionDigits: 2
        // }));
    }

    function validasiReceive() {
        //    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
        if (Ext.getCmp('accnameReceive').getValue() == '') {
            Ext.Msg.alert('Failed', 'Akun penerimaan kas belum diinput');
        } else if (Ext.getCmp('notransReceive').getValue() == '') {
            Ext.Msg.alert('Failed', 'Masukkan no transaksi');
        } else if (Ext.getCmp('tanggalReceive').getValue() == null) {
            Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan');
        } else if (Ext.getCmp('memoReceive').getValue() == '') {
            Ext.Msg.alert('Failed', 'Masukkan memo penerimaan');
        } else if (Ext.getCmp('subtotalReceive').getValue() == '') {
            Ext.Msg.alert('Failed', 'Masukkan item penerimaan');
        } else {
            return true;
        }
    }

    var wEntryPerencanaanTK = Ext.create('widget.window', {
        id: 'wEntryPerencanaanTK',
        title: 'Form Perencanaan Tenaga Kerja',
        header: {
            titlePosition: 2,
            titleAlign: 'center'
        },
        maximize:true,
        closable: true,
        closeAction: 'hide',
        autoWidth: true,
        autoHeight: true,
        layout: 'fit',
        border: false,
        items: [{
            xtype: 'EntryPerencanaanTK'
        }]
    });


