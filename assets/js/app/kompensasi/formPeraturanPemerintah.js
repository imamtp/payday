var formPeraturanPemerintah = Ext.create('Ext.form.Panel', {
    id: 'formPeraturanPemerintah',
    title: 'Peraturan Pemerintah',
    width: 450,
    //    height: 300,
    // url: SITE_URL + 'backend/saveform/PeraturanPemerintah/kompensasi',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        // anchor: '100%'
               width: 300
    },
    // layout: 'hbox',
    // defaults: {
    //     padding: '5 10 5 5'
    // },
    items: [
            {
                xtype: 'comboxstatus',
                readOnly:true,
                value:'Aktif',
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
            },
            {
                xtype: 'comboxdasarKomponenUpah',
                valueField: 'idkomponenupah',
                multiSelect: true,
                id: 'komponenupahpemerintah',
                name: 'komponenupahpemerintah[]'
            }, 
            {
                html: "<iframe src='"+SITE_URL+"kompensasi/pplemburpage'  width='100%' height='200'></iframe>",
                xtype: "panel"
            }
    ]
});

// formPeraturanPemerintah.body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportBarangDibeli' src='kompensasi/pplemburpage'>");