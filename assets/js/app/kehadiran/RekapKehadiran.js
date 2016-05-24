
var formRekapKehadiran = Ext.create('Ext.form.Panel', {
    id: 'formRekapKehadiran',
    width: 450,
//    height: 300,
    url: SITE_URL + 'RekapKehadiran/saveRekapKehadiran',
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
    defaults: {
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    }
                },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformRekapKehadiran',
            id: 'statusformRekapKehadiran'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idRekapKehadiran',
            name: 'idRekapKehadiran'
        },
        {
            xtype: 'hiddenfield',
            id: 'idpelamar_fRekapKehadiran',
            name: 'idpelamar'
        },
         Ext.define('Ext.ux.namaatasan_fPergerakanP', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.namalengkap_fRekapKehadiran',
            editable: false,
            fieldLabel: 'Nama Karyawan',
            allowBlank: false,
            id:'namalengkap_fRekapKehadiran',
            name: 'namalengkap',
            emptyText: 'Pilih Karyawan...',
            onTriggerClick: function() {
                 wGridNamaPegFormHadirListPopup.show();
                storeGridNamaPegFormHadirList.load();
            }
        }),
         {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan',
            name:'namajabatan',
            id: 'namajabatan_fRekapKehadiran'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi',
            name:'namaorg',
            id: 'namaorg_fRekapKehadiran'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Atasan',
            name:'namaatasan',
            id: 'namaatasan_fRekapKehadiran'
        },
        {
            xtype:'comboxjamKerja'
         },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tglhadir',
            allowBlank: false,
            fieldLabel: 'Tanggal'
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Masuk',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'jammasuk_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'jammasuk_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ' (hh:mm)'
               }
            ]
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Pulang',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'jampulang_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'jampulang_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ' (hh:mm)'
               }
            ]
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupRekapKehadiran');
                Ext.getCmp('formRekapKehadiran').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRekapKehadiranSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formRekapKehadiran').getForm().reset();
                            Ext.getCmp('windowPopupRekapKehadiran').hide();
                            storeGridRekapKehadiran.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridRekapKehadiran.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wRekapKehadiran = Ext.create('widget.window', {
    id: 'windowPopupRekapKehadiran',
    title: 'Form RekapKehadiran',
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
    items: [formRekapKehadiran]
});

Ext.define('GridRekapKehadiranModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','nik','namalengkap','namajabatan','namaorg','namaatasan','namajabatanatasan','namaorgatasan','hadir','tidakhadir','durasiketerlambatan','keterlambatan','izin','cuti','companyname'],
    idProperty: 'id'
});

var storeGridRekapKehadiran = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRekapKehadiranModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'kehadiran/rekap',
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

storeGridRekapKehadiran.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'idcompany': Ext.getCmp('companyname_filterRekapKehadiran').getValue(),
                    'idorganisasi': Ext.getCmp('namaorg_filterRekapKehadiran').getValue(),
                    'idjabatan': Ext.getCmp('namajabatan_filterRekapKehadiran').getValue(),
                    'startdate': Ext.getCmp('startdate_rekapkehadiran').getValue(),
                    'enddate': Ext.getCmp('enddate_rekapkehadiran').getValue()
                  };
              });

Ext.define('MY.searchGridRekapKehadiran', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRekapKehadiran',
    store: storeGridRekapKehadiran,
    width: 180
});
var smGridRekapKehadiran = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRekapKehadiran.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRekapKehadiran').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRekapKehadiran').enable();
        }
    }
});
Ext.define('GridRekapKehadiran', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRekapKehadiran,
    title: 'Rangkuman Kehadiran',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRekapKehadiranID',
    id: 'GridRekapKehadiranID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRekapKehadiran',
    store: storeGridRekapKehadiran,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Organisasi', dataIndex: 'namaorg', minWidth: 150},       
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        {header: 'Kehadiran', dataIndex: 'hadir', minWidth: 150},    
        {header: 'Tidak Hadir', dataIndex: 'tidakhadir', minWidth: 150},    
        {header: 'Durasi keterlambatan', dataIndex: 'durasiketerlambatan', minWidth: 150},    
        {header: 'Keterlambatan', dataIndex: 'keterlambatan', minWidth: 150},    
        {header: 'Izin', dataIndex: 'izin', minWidth: 150},    
        {header: 'Cuti', dataIndex: 'cuti', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Perusahaan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_companyRekapKehadiran',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyRekapKehadiran').getValue())
                                    {
                                        Ext.getCmp('companyname_filterRekapKehadiran').setValue(null);
                                        Ext.getCmp('companyname_filterRekapKehadiran').setDisabled(true);
                                        storeGridRekapKehadiran.load();
                                    } else {
                                        Ext.getCmp('companyname_filterRekapKehadiran').setDisabled(false);
                                        storeGridRekapKehadiran.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterRekapKehadiran',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                // storeGridRekapKehadiran.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Organisasi'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_orgRekapKehadiran',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgRekapKehadiran').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterRekapKehadiran').setValue(null);
                                        Ext.getCmp('namaorg_filterRekapKehadiran').setDisabled(true);
                                        storeGridRekapKehadiran.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterRekapKehadiran').setDisabled(false);
                                        storeGridRekapKehadiran.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterRekapKehadiran',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridRekapKehadiran.load();
                                // console.log(this.value)
                            }
                        }
                    },
                    {
                        xtype:'displayfield',
                        labelWidth:72,
                        fieldLabel:'Jabatan'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'checkbox1',
                        id:'filtercb_jabatanRekapKehadiran',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanRekapKehadiran').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterRekapKehadiran').setValue(null);
                                        Ext.getCmp('namajabatan_filterRekapKehadiran').setDisabled(true);
                                        storeGridRekapKehadiran.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterRekapKehadiran').setDisabled(false);
                                        storeGridRekapKehadiran.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        id: 'namajabatan_filterRekapKehadiran',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridRekapKehadiran.load();
                                // console.log(this.value)
                            }
                        }
                    }
                ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
               {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    id:'startdate_rekapkehadiran',
                    name:'startdate',
                    allowBlank: false,
                    fieldLabel: 'Tanggal',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            if (Ext.getCmp('startdate_rekapkehadiran').getValue() != null && Ext.getCmp('enddate_rekapkehadiran').getValue() != null)
                            {
                               // storeGridRekapKehadiran.load()
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    id:'enddate_rekapkehadiran',
                    name:'enddate',
                    labelWidth:30,
                    allowBlank: false,
                    fieldLabel: 's/d',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            if (Ext.getCmp('startdate_rekapkehadiran').getValue() != null && Ext.getCmp('enddate_rekapkehadiran').getValue() != null)
                            {
                               // storeGridRekapKehadiran.load()
                            }
                        }
                    }
                },{
                            // itemId: 'reloadDataJGeneral',
                    text: 'Cari',
                    iconCls: 'cog-icon',
                    handler: function() {
                         if (Ext.getCmp('startdate_rekapkehadiran').getValue() != null && Ext.getCmp('enddate_rekapkehadiran').getValue() != null)
                            {
                               storeGridRekapKehadiran.load()
                            } else {
                                Ext.Msg.alert("Info", 'Tentukan tanggal mulai dan akhir periode kehadiran');
                            }
                    }
                }, {
                    xtype: 'button',
                    text: 'Export Data',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            window.location = SITE_URL+"kehadiran/rekap/" + Ext.getCmp('companyname_filterRekapKehadiran').getValue()+'/'+
                                       Ext.getCmp('namajabatan_filterRekapKehadiran').getValue()+'/'+Ext.getCmp('namaorg_filterRekapKehadiran').getValue() + '/'+ 
                                       Ext.getCmp('startdate_rekapkehadiran').getSubmitValue() + '/' + Ext.getCmp('enddate_rekapkehadiran').getSubmitValue()+'/true/null/null';
                        }
                    }
                },{
                            itemId: 'reloadDataJGeneral',
                            text: 'Refresh',
                            iconCls: 'refresh',
                            handler: function() {
                                if (Ext.getCmp('startdate_rekapkehadiran').getValue() != null && Ext.getCmp('enddate_rekapkehadiran').getValue() != null)
                                {
                                   storeGridRekapKehadiran.load()
                                }
                            }   
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridRekapKehadiran',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridRekapKehadiran, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                companyStore.load();
                jabatanStore.load();
                orgStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formRekapKehadiran = Ext.getCmp('formRekapKehadiran');
            wRekapKehadiran.show();
            formRekapKehadiran.getForm().load({
                url: SITE_URL + 'backend/loadFormData/RekapKehadiran/1/RekapKehadiran',
                params: {
                    extraparams: 'a.idRekapKehadiran:' + record.data.idRekapKehadiran
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformRekapKehadiran').setValue('edit');
        }
    }
});
