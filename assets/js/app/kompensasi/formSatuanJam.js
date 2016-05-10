var formSatuanJam = Ext.create('Ext.form.Panel', {
    id: 'formSatuanJam',
    title: 'Satuan Jam',
    width: 450,
    //    height: 300,
    // url: SITE_URL + 'backend/saveform/Satuanjam/kompensasi',
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
                                    name: 'statusjamkerja',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Aktif') {
                                                    Ext.getCmp('jenisnilaijamkerja').setDisabled(false);
                                                    Ext.getCmp('jumlahjamkerja').setDisabled(false);
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(false);
                                                } else {
                                                    Ext.getCmp('jenisnilaijamkerja').setDisabled(true);
                                                    Ext.getCmp('jumlahjamkerja').setDisabled(true);
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                },{
                                    xtype: 'numberfield',
                                    fieldLabel: 'Jumlah Jam',
                                    id: 'jumlahjamkerja',
                                    name: 'jumlahjamkerja'
                                }, {
                                    xtype: 'comboxJenisNilai',
                                    name: 'jenisnilaijamkerja',
                                    id: 'jenisnilaijamkerja',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                                    Ext.getCmp('persentasejamkerja').setDisabled(true);
                                                } else if (combo.getValue() == 'Nilai Tetap'){
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(false);
                                                    Ext.getCmp('persentasejamkerja').setDisabled(true);
                                                } else {
                                                    //persentase
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                                    Ext.getCmp('persentasejamkerja').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxdasarKomponenUpah',
                                    multiSelect: true,
                                    id: 'komponenupahjamkerja',
                                    valueField: 'idkomponenupah',
                                    name: 'komponenupahjamkerja[]'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Faktor Pembagi',
                                    id: 'faktorpembagijamkerja',
                                    name: 'faktorpembagijamkerja'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Angka Tetap',
                                    id: 'angkatetapjamkerja',
                                    name: 'angkatetapjamkerja'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase',
                                    id: 'persentasejamkerja',
                                    name: 'persentasejamkerja'
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
                                    name: 'statusjamlibur',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Aktif') {
                                                    Ext.getCmp('jenisnilaijamlibur').setDisabled(false);
                                                    Ext.getCmp('jumlahjamlibur').setDisabled(false);
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(false);
                                                } else {
                                                    Ext.getCmp('jenisnilaijamlibur').setDisabled(true);
                                                    Ext.getCmp('jumlahjamlibur').setDisabled(true);
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Jumlah Jam',
                                    id: 'jumlahjamlibur',
                                    name: 'jumlahjamlibur'
                                }, {
                                    xtype: 'comboxJenisNilai',
                                    name: 'jenisnilaijamlibur',
                                    id: 'jenisnilaijamlibur',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                                     Ext.getCmp('persentasejamlibur').setDisabled(true);
                                                } else  if (combo.getValue() == 'Nilai Tetap'){
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(false);
                                                     Ext.getCmp('persentasejamlibur').setDisabled(true);
                                                } else {
                                                    //persentase
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                                    Ext.getCmp('persentasejamlibur').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxdasarKomponenUpah',
                                    valueField: 'idkomponenupah',
                                    multiSelect: true,
                                    id: 'komponenupahjamlibur',
                                    name: 'komponenupahjamlibur[]'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Faktor Pembagi',
                                    id: 'faktorpembagijamlibur',
                                    name: 'faktorpembagijamlibur'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Angka Tetap',
                                    id: 'angkatetapjamlibur',
                                    name: 'angkatetapjamlibur'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase',
                                    id: 'persentasejamlibur',
                                    name: 'persentasejamlibur'
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
                                    name: 'statusjamraya',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Aktif') {
                                                    Ext.getCmp('jenisnilaijamraya').setDisabled(false);
                                                    Ext.getCmp('jumlahjamraya').setDisabled(false);
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(false);
                                                } else {
                                                    Ext.getCmp('jenisnilaijamraya').setDisabled(true);
                                                    Ext.getCmp('jumlahjamraya').setDisabled(true);
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                                }
                                            }
                                        }
                                    }
                                },{
                                    xtype: 'numberfield',
                                    fieldLabel: 'Jumlah Jam',
                                    id: 'jumlahjamraya',
                                    name: 'jumlahjamraya'
                                }, {
                                    xtype: 'comboxJenisNilai',
                                    name: 'jenisnilaijamraya',
                                    id: 'jenisnilaijamraya',
                                    listeners: {
                                        select: {
                                            fn: function(combo, value) {
                                                if (combo.getValue() == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                                    Ext.getCmp('persentasejamraya').setDisabled(true);
                                                } else  if (combo.getValue() == 'Nilai Tetap') {
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(false);
                                                    Ext.getCmp('persentasejamraya').setDisabled(true);
                                                } else {
                                                    //persentase
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                                    Ext.getCmp('persentasejamraya').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'comboxdasarKomponenUpah',
                                    valueField: 'idkomponenupah',
                                    multiSelect: true,
                                    id: 'komponenupahjamraya',
                                    name: 'komponenupahjamraya[]'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Faktor Pembagi',
                                    id: 'faktorpembagijamraya',
                                    name: 'faktorpembagijamraya'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Angka Tetap',
                                    id: 'angkatetapjamraya',
                                    name: 'angkatetapjamraya'
                                },{
                                    xtype: 'textfield',
                                    fieldLabel: 'Persentase',
                                    id: 'persentasejamraya',
                                    name: 'persentasejamraya'
                                }
                            ]
                        }
                    ]
            }
    ]
});