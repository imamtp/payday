
var formPengajuanCuti = Ext.create('Ext.form.Panel', {
    id: 'formPengajuanCuti',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/PengajuanCuti/kehadiran',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformPengajuanCuti',
            id: 'statusformPengajuanCuti'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpengajuancuti',
            name: 'idpengajuancuti'
        },
         {
            xtype: 'hiddenfield',
            name: 'idpelamar',
            id: 'idpelamar_fPengajuanCuti'
        },
         {
            xtype: 'hiddenfield',
            name: 'tglmasuk',
            id: 'tglmasuk_fPengajuanCuti'
        },
        Ext.define('Ext.ux.namalengkap_fPengajuanCuti', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namalengkap_fPengajuanCuti',
            name: 'namalengkap',
            editable: false,
            id: 'namalengkap_fPengajuanCuti',
            fieldLabel: 'Nama Personil',
            emptyText: 'Pilih Personil...',
            onTriggerClick: function() {
                wGridPersonilCutiListPopup.show();
                storeGridPersonilCutiList.load();
            }
        }),
        {
            xtype:'comboxpengaturancuti',
            listeners: {
            select: function(val) { 
                    console.log(val.value)
                    Ext.Ajax.request({
                        url: SITE_URL + 'kehadiran/sumkuotacuti2',
                        method: 'POST',
                        params: {
                            idpelamar: Ext.getCmp('idpelamar_fPengajuanCuti').getValue(),
                            idpengaturancuti:val.value
                        },
                        success: function(form, action) {
                           var d = Ext.decode(form.responseText);
                           if(!d.status)
                           {
                             Ext.Msg.alert("Info", d.message);
                             //Ext.getCmp('BtnPengajuanCutiSimpan').setDisabled(true);
                           } else  {                             
                             //Ext.getCmp('BtnPengajuanCutiSimpan').setDisabled(false);
                            }
                            Ext.getCmp('sisacuti').setValue(d.kuota);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    });
                }
            }
        },{
            xtype: 'textfield',
            readOnly:true,
            fieldLabel: 'Sisa Cuti',
            // allowBlank: false,
            id:'sisacuti',
            name: 'sisacuti'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            id: 'tglmulai_fPengCuti',
            name: 'tglmulai',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai',
            listeners: {
                'change': function(field, newValue, oldValue) {
                    if (Ext.getCmp('tglmulai_fPengCuti').getValue() != null && Ext.getCmp('tglselesai_fPengCuti').getValue() != null)
                    {
                      Ext.getCmp('durasi_fPengCuti').setValue(hitungSisaCuti());
                      Ext.getCmp('BtnPengajuanCutiSimpan').setDisabled(false);
                    }
                }
            }
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            id: 'tglselesai_fPengCuti',
            name: 'tglselesai',
            allowBlank: false,
            fieldLabel: 'Tgl Selesai',
            listeners: {
                'change': function(field, newValue, oldValue) {
                    if (Ext.getCmp('tglmulai_fPengCuti').getValue() != null && Ext.getCmp('tglselesai_fPengCuti').getValue() != null)
                    {
                      Ext.getCmp('durasi_fPengCuti').setValue(hitungSisaCuti());
                    }
                }
            }
        },
        {
            xtype:'textfield',
            fieldLabel:'Durasi (hari)',
            readOnly:true,
            name:'durasi',
            id: 'durasi_fPengCuti'
        },
        {
            xtype:'textarea',
            fieldLabel:'Keterangan',
            name:'keterangan'
        }
        ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPengajuanCuti');
                Ext.getCmp('formPengajuanCuti').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPengajuanCutiSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {

                    var masuk = new Date(Ext.getCmp('tglmasuk_fPengajuanCuti').getSubmitValue()).getTime();

                    var mulai = Ext.getCmp('tglmulai_fPengCuti').getSubmitValue();
                   // console.log(mulai);
                    var mulaiArr = mulai.split('-');
                    var startCuti = new Date(mulaiArr[2]+'-'+mulaiArr[1]+'-'+mulaiArr[0]).getTime();
                        // 
                    //alert(Ext.getCmp('tglmasuk_fPengajuanCuti').getSubmitValue()+' '+mulaiArr[2]+'-'+mulaiArr[1]+'-'+mulaiArr[0]);
                    //     console.log(masuk+' '+startCuti);
                    if(startCuti<masuk)
                    {
                        Ext.Msg.alert('Info', 'Tidak bisa melanjutkan pengajuan cuti dikarenakan tanggal mulai cuti yang diambil jatuh sebelum tanggal aktif jabatan karyawan.');
                        Ext.getCmp('BtnPengajuanCutiSimpan').setDisabled(true);
                        return;
                    } else {
                        Ext.getCmp('BtnPengajuanCutiSimpan').setDisabled(false);
                    }

                    if(Ext.getCmp('durasi_fPengCuti').getValue()*1>Ext.getCmp('sisacuti').getValue()*1)
                    {
                        // Ext.Msg.alert('Info', 'Jumlah cuti yang diambil melebih sisa cuti');

                        Ext.Msg.show({
                                        title: 'Info',
                                        msg: 'Jumlah cuti yang diambil melebih sisa cuti. <br><br> Tetap lanjutkan?',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn) {
                                            if (btn == 'yes') {
                                               form.submit({
                                                    success: function(form, action) {

                                                        Ext.Msg.alert('Success', action.result.message);
                                                        Ext.getCmp('formPengajuanCuti').getForm().reset();
                                                        Ext.getCmp('windowPopupPengajuanCuti').hide();
                                                        storeGridPengajuanCuti.load();
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //                            storeGridPengajuanCuti.load();
                                                    }
                                                });
                                            }
                                        }
                                    });

                    } else {



                        form.submit({
                            success: function(form, action) {

                                Ext.Msg.alert('Success', action.result.message);
                                Ext.getCmp('formPengajuanCuti').getForm().reset();
                                Ext.getCmp('windowPopupPengajuanCuti').hide();
                                storeGridPengajuanCuti.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //                            storeGridPengajuanCuti.load();
                            }
                        });
                    }


                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPengajuanCuti = Ext.create('widget.window', {
    id: 'windowPopupPengajuanCuti',
    title: 'Form Pengajuan Cuti',
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
    items: [formPengajuanCuti]
});

Ext.define('GridPengajuanCutiModel', {
    extend: 'Ext.data.Model',
    fields: ['idpengajuancuti','idpengaturancuti','idpelamar','sisacuti','namalengkap','tglmulai','tglselesai','durasi','keterangan','namapengcuti','nik','companyname'],
    idProperty: 'id'
});

var storeGridPengajuanCuti = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPengajuanCutiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PengajuanCuti/kehadiran',
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
Ext.define('MY.searchGridPengajuanCuti', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPengajuanCuti',
    store: storeGridPengajuanCuti,
    width: 180
});
var smGridPengajuanCuti = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPengajuanCuti.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePengajuanCuti').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePengajuanCuti').enable();
        }
    }
});
Ext.define('GridPengajuanCuti', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPengajuanCuti,
    title: 'Daftar Pengajuan Cuti',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPengajuanCutiID',
    id: 'GridPengajuanCutiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPengajuanCuti',
    store: storeGridPengajuanCuti,
    loadMask: true,
    columns: [
        {header: 'idpengajuancuti', dataIndex: 'idpengajuancuti', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Lengkap', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Nama Cuti', dataIndex: 'namapengcuti', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'tglmulai', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'tglselesai', minWidth: 150},
        {header: 'Durasi', dataIndex: 'durasi', minWidth: 150},
         {header: 'Sisa Cuti', dataIndex: 'sisacuti', minWidth: 150},
        {header: 'Keterangan', dataIndex: 'keterangan', minWidth: 150}
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
                                roleid: 129
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPengajuanCuti.show();
                                    Ext.getCmp('statusformPengajuanCuti').setValue('input');
                                    pengaturancutiStore.load();
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
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 130
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('GridPengajuanCuti')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formPengajuanCuti = Ext.getCmp('formPengajuanCuti');
                                        formPengajuanCuti.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/PengajuanCuti/1/kehadiran',
                                            params: {
                                                extraparams: 'a.idpengajuancuti:' + selectedRecord.data.idpengajuancuti
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(action.response.responseText);
                                                // Ext.getCmp('price_fPengajuanCuti').setValue(renderNomor(d.data.price));
                                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wPengajuanCuti.show();
                                        Ext.getCmp('statusformPengajuanCuti').setValue('edit');
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
                }, {
                    id: 'btnDeletePengajuanCuti',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 131
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
                                                var grid = Ext.ComponentQuery.query('GridPengajuanCuti')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/PengajuanCuti/kehadiran/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridPengajuanCuti.remove(sm.getSelection());
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
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPengajuanCuti',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPengajuanCuti, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPengajuanCuti.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formPengajuanCuti = Ext.getCmp('formPengajuanCuti');
            // wPengajuanCuti.show();
            // formPengajuanCuti.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PengajuanCuti/1/natadaya',
            //     params: {
            //         extraparams: 'a.PengajuanCutiid:' + record.data.PengajuanCutiid
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformPengajuanCuti').setValue('edit');
        }
    }
});

function hitungSisaCuti()
{
     var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var d1 = explode('-',Ext.getCmp('tglmulai_fPengCuti').getSubmitValue());
    var d2 = explode('-',Ext.getCmp('tglselesai_fPengCuti').getSubmitValue());

    var firstDate = new Date(d1[2],d1[1],d1[0]);
    var secondDate = new Date(d2[2],d2[1],d2[0]);

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    return diffDays*1+1*1;
}