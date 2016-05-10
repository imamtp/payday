var formImportRowKehadiran = Ext.create('Ext.form.Panel', {
        id: 'formImportRowKehadiran',
        width: 740,
        height: 240,
        url: SITE_URL + 'kehadiran/importKehadiran',
        bodyStyle: 'padding:5px',
        labelAlign: 'top',
        autoScroll: true,
        fieldDefaults: {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 150
            // width: 400
        },
        items: [
        {
            xtype: 'filefield',
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            // id: 'filexlsxImportPerencanaanXlsx',
            anchor: '50%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
               window.location = BASE_URL+"assets/xlsx/tempate_import_kehadiran.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Kehadiran:<br><li>Isi sesuai urutan kolom yang telah disediakan</li><li>NIK adalah kode kepegawaian yang ada pada menu Personalia -> Data Karyawan<li>Kode Jam Kerja adalah kode yang ada pada menu Kehadiran -> Pengaturan Kehadiran -> Jam Kerja Harian</li><li>Format tangal dd.mm.yyy (tanggal.bulan.tahun). Contoh 01.05.2015</li><li>Format waktu masuk/keluar adalah hh:mm (jam:menit) dengan format 24 jam. Contoh: Masuk 08:15 - Keluar 17:00</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupImportRowKehadiran');
                Ext.getCmp('formImportRowKehadiran').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Import',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            // params: {idunit:Ext.getCmp('idunitKehadiran').getValue()},
                            success: function(form, action) {
                                // msg.hide();
                                var win = Ext.getCmp('windowPopupImportRowKehadiran');
                                Ext.getCmp('formImportRowKehadiran').getForm().reset();
                                Ext.Msg.alert('Import Data Kehadiran', action.result.message);
                                win.hide();
                                storeGridRekapKehadiran.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Import Data Gagal', action.result ? action.result.message : 'No response');
                                // msg.hide();
                //                            storeGridSetupTax.load();
                            }

                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
            }
        }]
});

var winImportKehadiran = Ext.create('widget.window', {
    id: 'windowPopupImportRowKehadiran',
    title: 'Import Data Kehadiran',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportRowKehadiran]
})