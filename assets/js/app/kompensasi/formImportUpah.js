Ext.define('FormUpahGaji', {
    title: 'Upload Upah Karyawan',
    itemId: 'FormUpahGaji',
    id: 'FormUpahGaji',
    extend: 'Ext.form.Panel',
    alias: 'widget.FormUpahGaji',
    url: SITE_URL + 'kompensasi/importUpah2',
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
            allowBlank:false,
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            anchor: '50%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
                Ext.Ajax.request({
                    url: SITE_URL + 'sistem/cekakses',
                    method: 'POST',
                    params: {
                        roleid: 162
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if(d.success)
                        {
                            window.location = SITE_URL +"kompensasi/xlsxwriter/"+idcompany;
                        } else {
                             Ext.Msg.alert("Info", d.message);
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                    }
                });
               // window.location = BASE_URL+"assets/xlsx/tempate_upah.xlsx";
               
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Ketentuan Upload Pengupahan:<br><li>Mengikuti urutan kolom yang telah ditentukan</li><li>Format tanggal pada periode upah awal dan akhir adalah dd.mm.yyyy. Contoh: 01.09.2015</li><li>Pastikan seluruh Format di setiap Cell adalah text</li><li>Simpan file template pengupahan ini ke dalam format/ekstension .xlsx (Excel Workbook)</li><li>Jika terdapat pecahan pada nilai pengupahan, gunakan separator comma (,)</li>'
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
                Ext.Ajax.request({
                    url: SITE_URL + 'sistem/cekakses',
                    method: 'POST',
                    params: {
                        roleid: 163
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if(d.success)
                        {
                            var msg = Ext.MessageBox.wait('Sedang memproses...');
                            var form = Ext.getCmp('FormUpahGaji').getForm();
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
                        } else {
                             Ext.Msg.alert("Info", d.message);
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                    }
                });
                
            }
        }]
});
