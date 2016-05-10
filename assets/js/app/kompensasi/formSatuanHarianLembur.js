var formSatuanHarian = Ext.create('Ext.form.Panel', {
    id: 'formSatuanHarian',
    title: 'Satuan Harian',
    width: 450,
    //    height: 300,
    // url: SITE_URL + 'backend/saveform/SatuanHarian/kompensasi',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        // anchor: '100%'
               width: 355
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [
            {
                items: [{
                        xtype: 'fieldset',
                        title: 'Hari Kerja',
                        // collapsible: true,
                        items: [
                                {
                                    xtype: 'comboxstatus',
                                    fieldLabel: 'Status',
                                    name: 'statushariankerja',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Aktif') {
                                                    Ext.getCmp('jenisnilaihariankerja').setDisabled(false);
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(false);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(false);
                                                } else {
                                                    Ext.getCmp('jenisnilaihariankerja').setDisabled(true);
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxJenisNilai',
                                    name: 'jenisnilaihariankerja',
                                    id: 'jenisnilaihariankerja',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(false);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(true);
                                                    Ext.getCmp('persentasehariankerja').setDisabled(true);
                                                } else if (combo.getValue() == 'Nilai Tetap'){
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(false);
                                                    Ext.getCmp('persentasehariankerja').setDisabled(true);
                                                } else {
                                                    //persentase
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(true);
                                                    Ext.getCmp('persentasehariankerja').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxdasarKomponenUpah',
                                    multiSelect: true,
                                    id: 'komponenupahhariankerja',
                                    valueField: 'idkomponenupah',
                                    name: 'komponenupahhariankerja[]'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Faktor Pembagi',
                                    id: 'faktorpembagihariankerja',
                                    name: 'faktorpembagihariankerja'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Angka Tetap',
                                    id: 'angkatetaphariankerja',
                                    name: 'angkatetaphariankerja'
                                },{
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase',
                                    id: 'persentasehariankerja',
                                    name: 'persentasehariankerja'
                                }
                            ]
                        }
                    ]
            },
            {
                items: [{
                        xtype: 'fieldset',
                        title: 'Hari Libur',
                        // collapsible: true,
                        items: [
                                {
                                    xtype: 'comboxstatus',
                                    fieldLabel: 'Status',
                                    name: 'statusharianlibur',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Aktif') {
                                                    Ext.getCmp('jenisnilaiharianlibur').setDisabled(false);
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(false);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(false);
                                                } else {
                                                    Ext.getCmp('jenisnilaiharianlibur').setDisabled(true);
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxJenisNilai',
                                    name: 'jenisnilaiharianlibur',
                                    id: 'jenisnilaiharianlibur',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(false);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(true);
                                                    Ext.getCmp('persentaseharianlibur').setDisabled(true);
                                                } else if (combo.getValue() == 'Nilai Tetap'){
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(false);
                                                    Ext.getCmp('persentaseharianlibur').setDisabled(true);
                                                } else {
                                                    //persentase
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(true);
                                                    Ext.getCmp('persentaseharianlibur').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxdasarKomponenUpah',
                                    multiSelect: true,
                                    id: 'komponenupahharianlibur',
                                    valueField: 'idkomponenupah',
                                    name: 'komponenupahharianlibur[]'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Faktor Pembagi',
                                    id: 'faktorpembagiharianlibur',
                                    name: 'faktorpembagiharianlibur'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Angka Tetap',
                                    id: 'angkatetapharianlibur',
                                    name: 'angkatetapharianlibur'
                                },{
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase',
                                    id: 'persentaseharianlibur',
                                    name: 'persentaseharianlibur'
                                }
                            ]
                        }
                    ]
            },
            {
                items: [{
                        xtype: 'fieldset',
                        title: 'Hari Raya',
                        // collapsible: true,
                        items: [
                           {
                                    xtype: 'comboxstatus',
                                    fieldLabel: 'Status',
                                    name: 'statusharianraya',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Aktif') {
                                                    Ext.getCmp('jenisnilaiharianraya').setDisabled(false);
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(false);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(false);
                                                } else {
                                                    Ext.getCmp('jenisnilaiharianraya').setDisabled(true);
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxJenisNilai',
                                    name: 'jenisnilaiharianraya',
                                    id: 'jenisnilaiharianraya',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(false);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                                    Ext.getCmp('persentaseharianraya').setDisabled(true);
                                                } else if (combo.getValue() == 'Nilai Tetap'){
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(false);
                                                    Ext.getCmp('persentaseharianraya').setDisabled(true);
                                                } else {
                                                    //persentase
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                                    Ext.getCmp('persentaseharianraya').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxdasarKomponenUpah',
                                    valueField: 'idkomponenupah',
                                    multiSelect: true,
                                    id: 'komponenupahharianraya',
                                    name: 'komponenupahharianraya[]'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Faktor Pembagi',
                                    id: 'faktorpembagiharianraya',
                                    name: 'faktorpembagiharianraya'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Angka Tetap',
                                    id: 'angkatetapharianraya',
                                    name: 'angkatetapharianraya'
                                },{
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase',
                                    id: 'persentaseharianraya',
                                    name: 'persentaseharianraya'
                                }
                            ]
                        }
                    ]
            }
    ]
});