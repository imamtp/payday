Ext.define('GridRekapLemburModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelamar','nik','namalengkap','namajabatan','namaorg','namaatasan','namajabatanatasan','namaorgatasan','jumlahjam','jumlahhari','upahlembur','harikerja','harilibur','hariraya','companyname','totallembur'],
    idProperty: 'id'
});

var storeGridRekapLembur = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRekapLemburModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'kompensasi/rekaplembur',
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

storeGridRekapLembur.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'idcompany': Ext.getCmp('companyname_filterRekapLembur').getValue(),
                    'idjabatan': Ext.getCmp('namajabatan_filterRekapLembur').getValue(),
                    'idorganisasi': Ext.getCmp('namaorg_filterRekapLembur').getValue(),                    
                    'startdate': Ext.getCmp('startdate_RekapLembur').getValue(),
                    'enddate': Ext.getCmp('enddate_RekapLembur').getValue()
                  };
              });

Ext.define('MY.searchGridRekapLembur', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRekapLembur',
    store: storeGridRekapLembur,
    width: 180
});
var smGridRekapLembur = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRekapLembur.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRekapLembur').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRekapLembur').enable();
        }
    }
});
Ext.define('GridRekapLembur', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRekapLembur,
    title: 'Rangkuman Lembur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRekapLemburID',
    id: 'GridRekapLemburID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRekapLembur',
    store: storeGridRekapLembur,
    loadMask: true,
    columns: [
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'NIK', dataIndex: 'nik', minWidth: 150},
        {header: 'Nama Karyawan', dataIndex: 'namalengkap', minWidth: 150},
        {header: 'Jabatan', dataIndex: 'namajabatan', minWidth: 150},
        {header: 'Organisasi', dataIndex: 'namaorg', minWidth: 150},       
        {header: 'Nama Atasan', dataIndex: 'namaatasan', minWidth: 150},
        {header: 'Hari Kerja', align:'right',dataIndex: 'harikerja', minWidth: 80},  
        {header: 'Hari Libur', align:'right',dataIndex: 'harilibur', minWidth: 80},  
        {header: 'Hari Raya', align:'right',dataIndex: 'hariraya', minWidth: 80},  
        {header: 'Total Hari', align:'right',dataIndex: 'jumlahhari', minWidth: 80},    
        {header: 'Total Jam', xtype:'numbercolumn',align:'right',dataIndex: 'jumlahjam', minWidth: 80},    
        {header: 'Total Upah', xtype:'numbercolumn',align:'right',dataIndex: 'totallembur', minWidth: 150},
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
                        id:'filtercb_companyRekapLembur',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_companyRekapLembur').getValue())
                                    {
                                        Ext.getCmp('companyname_filterRekapLembur').setValue(null);
                                        Ext.getCmp('companyname_filterRekapLembur').setDisabled(true);
                                        storeGridRekapLembur.load();
                                    } else {
                                        Ext.getCmp('companyname_filterRekapLembur').setDisabled(false);
                                        storeGridRekapLembur.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxcompany',
                        fieldLabel:'',
                        id: 'companyname_filterRekapLembur',
                        name: 'companyname',
                        valueField:'idcompany',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridRekapLembur.load();
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
                        id:'filtercb_orgRekapLembur',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_orgRekapLembur').getValue())
                                    {
                                        Ext.getCmp('namaorg_filterRekapLembur').setValue(null);
                                        Ext.getCmp('namaorg_filterRekapLembur').setDisabled(true);
                                        storeGridRekapLembur.load();
                                    } else {
                                        Ext.getCmp('namaorg_filterRekapLembur').setDisabled(false);
                                        storeGridRekapLembur.load();
                                    }
                                }
                            }
                        }
                    },{
                        xtype: 'comboxOrg',
                        valueField:'idorganisasi',
                        fieldLabel:'',
                        id: 'namaorg_filterRekapLembur',
                        name: 'namaorg',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridRekapLembur.load();
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
                        id:'filtercb_jabatanRekapLembur',
                        // fieldLabel: 'Semua',
                        boxLabel: 'Semua',
                        listeners: {
                            click: {
                                element: 'el', //bind to the underlying el property on the panel
                                fn: function(){
                                    if(Ext.getCmp('filtercb_jabatanRekapLembur').getValue())
                                    {
                                        Ext.getCmp('namajabatan_filterRekapLembur').setValue(null);
                                        Ext.getCmp('namajabatan_filterRekapLembur').setDisabled(true);
                                        storeGridRekapLembur.load();
                                    } else {
                                        Ext.getCmp('namajabatan_filterRekapLembur').setDisabled(false);
                                        storeGridRekapLembur.load();
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'comboxJabatan',
                        valueField:'idjabatan',
                        fieldLabel:'',
                        id: 'namajabatan_filterRekapLembur',
                        name: 'namajabatan',
                        labelWidth: 70,
                        listeners: {
                        select: function() {
                                storeGridRekapLembur.load();
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
                    id:'startdate_RekapLembur',
                    name:'startdate',
                    allowBlank: false,
                    fieldLabel: 'Tanggal',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            if (Ext.getCmp('startdate_RekapLembur').getValue() != null && Ext.getCmp('enddate_RekapLembur').getValue() != null)
                            {
                               storeGridRekapLembur.load()
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    id:'enddate_RekapLembur',
                    name:'enddate',
                    labelWidth:30,
                    allowBlank: false,
                    fieldLabel: 's/d',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            if (Ext.getCmp('startdate_RekapLembur').getValue() != null && Ext.getCmp('enddate_RekapLembur').getValue() != null)
                            {
                               storeGridRekapLembur.load()
                            }
                        }
                    }
                },
                {
                        // text: 'Hitung Pengupahan',
                        iconCls: 'cog-icon',
                        handler: function() {
                            storeGridRekapLembur.load();
                        }
                    },
                {
                        text: 'Hapus Filter',
                        iconCls: 'refresh',
                        handler: function() {
                            Ext.getCmp('companyname_filterRekapLembur').setValue(null);
                            Ext.getCmp('namajabatan_filterRekapLembur').setValue(null);
                            Ext.getCmp('namaorg_filterRekapLembur').setValue(null);
                            Ext.getCmp('startdate_RekapLembur').setValue(null);
                            Ext.getCmp('enddate_RekapLembur').setValue(null);
                            storeGridRekapLembur.reload();
                        }
                }
            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridRekapLembur, // same store GridPanel is using
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
            var formRekapLembur = Ext.getCmp('formRekapLembur');
            wRekapLembur.show();
            formRekapLembur.getForm().load({
                url: SITE_URL + 'backend/loadFormData/RekapLembur/1/RekapLembur',
                params: {
                    extraparams: 'a.idRekapLembur:' + record.data.idRekapLembur
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformRekapLembur').setValue('edit');
        }
    }
});
