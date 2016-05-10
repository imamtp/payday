var formImportRowDataPerencanaan = Ext.create('Ext.form.Panel', {
        id: 'formImportRowDataPerencanaan',
        width: 740,
        height: 240,
        url: SITE_URL + 'ptk/importPTK',
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
               window.location = BASE_URL+"assets/xlsx/tempate_import_ptk.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Perencanaan:<br><li>Isi sesuai urutan kolom yang telah disediakan</li><li>Kode Perusahaan adalah kode perusahaan yang ada pada menu Modul Organisasi -> Perusahaan</li><li>Tulis nama bulan dengan menggunakan angka bulan, misal: bulan kebutuhan tenaga kerja di bulan januari maka ditulis 01.</li><li>Kode Jabatan adalah kode jabatan yang ada pada menu Desain Organisasi -> Struktur Jabatan</li><li>Kode lokasi adalah kode yang ada pada menu Modul Organisasi -> Desain Perusahaan -> Lokasi</li> <li>Jumlah adalah jumlah kebutuhan tenaga kerja yang akan direncanakan. Ditulis dengan angka bulat</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupImportRowDataPerencanaan');
                Ext.getCmp('formImportRowDataPerencanaan').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Import',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            // params: {idunit:Ext.getCmp('idunitDataPerencanaan').getValue()},
                            success: function(form, action) {
                                // msg.hide();
                                var win = Ext.getCmp('windowPopupImportRowDataPerencanaan');
                                Ext.getCmp('formImportRowDataPerencanaan').getForm().reset();
                                Ext.Msg.alert('Import Data Perencanaan', action.result.message);
                                win.hide();
                                storeGridPerencanaan.load();
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

var winImportPerencanaan = Ext.create('widget.window', {
    id: 'windowPopupImportRowDataPerencanaan',
    title: 'Import Perencanaan',
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
    items: [formImportRowDataPerencanaan]
})