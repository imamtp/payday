
var formNilaiUpahTetap = Ext.create('Ext.form.Panel', {
    id: 'formNilaiUpahTetap',
    width: 350,
//    height: 300,
    url: SITE_URL + 'kompensasi/insertUpahPegawai',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        anchor:'100%'
//        width: 400
    },
    items: [
         {
            xtype: 'hiddenfield',
            name: 'statusformupahpegawai',
            id: 'statusformupahpegawai'
        },{
            xtype: 'hiddenfield',
            name: 'idupahkaryawan',
            id: 'idupahkaryawan_fNilaiUpahTetap'
        },{
            xtype: 'hiddenfield',
            name: 'idpelamar',
            id: 'idpelamar_fNilaiUpahTetap'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idkomponenupah',
            name: 'idkomponenupah',
            id:'idkomponenupah_fNilaiUpahTetap'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'penyesuaian',
            name: 'penyesuaian',
            id:'penyesuaian_fNilaiUpahTetap'
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idpekerjaan',
            name: 'idpekerjaan',
            id:'idpekerjaan_fNilaiUpahTetap'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nilai Upah',
            allowBlank: false,
            id:'nilai_fNilaiUpahTetap',
            name: 'nilai',
            fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                        }, c);
                    }
                }
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('wNilaiUpahTetap');
                Ext.getCmp('formNilaiUpahTetap').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            // Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formNilaiUpahTetap').getForm().reset();
                            Ext.getCmp('wNilaiUpahTetap').hide();
                            Ext.getCmp('wGridUpahTetapListPopup').hide();
                            storeGridUpahTetap.load();

                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridAgama_Natadaya.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wNilaiUpahTetap = Ext.create('widget.window', {
    id: 'wNilaiUpahTetap',
    title: 'Masukan Nilai Upah Tetap',
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
    items: [formNilaiUpahTetap]
});


Ext.define('GridUpahTetapListModel', {
    extend: 'Ext.data.Model',
    fields: ['idkomponenupah','idcompany','kodekomponen','namakomponen','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridUpahTetapList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUpahTetapListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/komponenupah/kompensasi',
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

// storeGridUpahTetapList.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                      'extraparams': 'k.statuscalon:Disetujui'
//                   };
//                });

Ext.define('MY.searchUpahTetapList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchUpahTetapList',
    store: storeGridUpahTetapList,
    width: 180
});

var smGridUpahTetapList = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchase.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemPurchase').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemPurchase').enable();
        }
    }
});

Ext.define('GridUpahTetapList', {
    itemId: 'GridUpahTetapList',
    id: 'GridUpahTetapList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUpahTetapList',
    store: storeGridUpahTetapList,
    loadMask: true,
    columns: [
    {
            text: 'Pilih',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                    wNilaiUpahTetap.show();

                    Ext.getCmp('idpelamar_fNilaiUpahTetap').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                    Ext.getCmp('idkomponenupah_fNilaiUpahTetap').setValue(selectedRecord.get('idkomponenupah'));
                    Ext.getCmp('penyesuaian_fNilaiUpahTetap').setValue(Ext.getCmp('tipePenyesuaianUpah').getValue());
                    Ext.getCmp('idpekerjaan_fNilaiUpahTetap').setValue(Ext.getCmp('idpekerjaanPenyesuaianUpah').getValue());
                    Ext.getCmp('statusformupahpegawai').setValue('input');

                    // var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    // Ext.getCmp('idpelamaratasan_fPergerakanP').setValue(selectedRecord.get('idpelamar'));

                    // Ext.Ajax.request({
                    //     url: SITE_URL + 'kompensasi/insertUpahPegawai',
                    //     method: 'POST',
                    //     params: {
                    //         idpelamar: idpelamar,
                    //         idkomponenupah: selectedRecord.get('idkomponenupah'),
                    //         penyesuaian: Ext.getCmp('tipePenyesuaianUpah').getValue(),
                    //         idpekerjaan: Ext.getCmp('idpekerjaanPenyesuaianUpah').getValue()
                    //     },
                    //     success: function(form, action) {
                    //         // var d = Ext.decode(form.responseText);
                    //         storeGridUpahTetap.load();
                    //     },
                    //     failure: function(form, action) {
                    //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    //     }
                    // });

                    // Ext.getCmp('wGridUpahTetapListPopup').hide();
            }
        },
        {header: 'idkomponenupah', dataIndex: 'idkomponenupah', hidden: true},
        {header: 'Kode Upah', dataIndex: 'kodekomponen', minWidth: 100},
        {header: 'Nama Upah', dataIndex: 'namakomponen', minWidth: 150,flex:1},
        {header: 'Kena pajak', dataIndex: 'kenapajak', minWidth: 150},
        // {header: 'Hitung pajak', dataIndex: 'hitungpajak', minWidth: 150},
        {header: 'fungsi pajak', dataIndex: 'fungsipajak', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchUpahTetapList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridUpahTetapList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridUpahTetapListPopup = Ext.create('widget.window', {
    id: 'wGridUpahTetapListPopup',
    title: 'Pilih Komponen Upah Tetap',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 680,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridUpahTetapList'
    }]
});
