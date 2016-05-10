Ext.define('GridJadwalUpahTahunanModel', {
    extend: 'Ext.data.Model',
    fields: ['idjadwalupah','idkomponenupah','tanggal','namabulan','startdate','enddate','userin','datein'],
    idProperty: 'id'
});

var storeGridJadwalUpahTahunan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJadwalUpahTahunanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JadwalUpahTahunan/kompensasi',
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
Ext.define('MY.searchGridJadwalUpahTahunan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJadwalUpahTahunan',
    store: storeGridJadwalUpahTahunan,
    width: 180
});

////////////////////////////////////////////////////////////////////////////


var formJadwalUpahTahunan = Ext.create('Ext.form.Panel', {
    id: 'formJadwalUpahTahunan',
    width: 450,
   // height: 500,
    url: SITE_URL + 'backend/saveform/JadwalUpahTahunan/kompensasi',
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
            name: 'statusformJadwalUpahTahunan',
            id: 'statusformJadwalUpahTahunan'
        },
        {
            xtype: 'hiddenfield',
            name: 'idjadwalupah'
        },{
            xtype:'hiddenfield',
            id:'idkomponenupah_fJadwalUpah',
            fieldLabel:'idkomponenupah_fJadwalUpah',
            name:'idkomponenupah'
        }, 
        {
            xtype:'numberfield',
            allowBlank: false,
            fieldLabel:'Tanggal',
            name:'tanggal'
        },
        {
            allowBlank: false,
            xtype:'comboxbulan'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            hidden:true,
            // allowBlank: false,
            fieldLabel: 'Tgl Mulai'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'enddate',
            hidden:true,
            // allowBlank: false,
            fieldLabel: 'Tgl Akhir'
        }
        ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJadwalUpahTahunan');
                Ext.getCmp('formJadwalUpahTahunan').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJadwalUpahTahunanSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJadwalUpahTahunan').getForm().reset();
                            Ext.getCmp('windowPopupJadwalUpahTahunan').hide();
                            storeGridJadwalUpahTahunan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJadwalUpahTahunan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJadwalUpahTahunan = Ext.create('widget.window', {
    id: 'windowPopupJadwalUpahTahunan',
    title: 'Form Jadwal Upah Tahunan',
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
    items: [formJadwalUpahTahunan]
});



Ext.define('GridJadwalUpahTahunan', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJadwalUpahTahunan,
    width: 600,
    height:390,
    title: 'Jadwal Pengupahan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJadwalUpahTahunanID',
    id: 'GridJadwalUpahTahunanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJadwalUpahTahunan',
    store: storeGridJadwalUpahTahunan,
    loadMask: true,
    columns: [
        {header: 'idjadwalupah', dataIndex: 'idjadwalupah', hidden: true},
        {header: 'idkomponenupah', dataIndex: 'idkomponenupah', hidden: true},
        {header: 'Setiap Tanggal', dataIndex: 'tanggal', minWidth: 150},
        {header: 'Bulan', dataIndex: 'namabulan', minWidth: 150},
        // {header: 'Mulai Pengupahan', dataIndex: 'startdate', minWidth: 150},
        // {header: 'Akhir Pengupahan', dataIndex: 'enddate', minWidth: 150}
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
                        wJadwalUpahTahunan.show();
                        Ext.getCmp('statusformJadwalUpahTahunan').setValue('input');
                        Ext.getCmp('idkomponenupah_fJadwalUpah').setValue(Ext.getCmp('idkomponenupah_fConfigUpahTTTahun').getValue());
                        // kekaryaanStore.load();
                        // lokasiStore.load();
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridJadwalUpahTahunan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                           editJadwalUpahTahunanForm(selectedRecord);
                        }

                    }
                }, {
                    id: 'btnDeleteJadwalUpahTahunan',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridJadwalUpahTahunan')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/JadwalUpahTahunan/kompensasi/hidden',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridJadwalUpahTahunan.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridJadwalUpahTahunan',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJadwalUpahTahunan, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridJadwalUpahTahunan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

function editJadwalUpahTahunanForm(selectedRecord)
{
     var formJadwalUpahTahunan = Ext.getCmp('formJadwalUpahTahunan');
    formJadwalUpahTahunan.getForm().load({
        url: SITE_URL + 'backend/loadFormData/JadwalUpahTahunan/1/kompensasi',
        params: {
            extraparams: 'a.idjadwalupah:' + selectedRecord.data.idjadwalupah
        },
        success: function(form, action) {
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })

    wJadwalUpahTahunan.show();
    Ext.getCmp('statusformJadwalUpahTahunan').setValue('edit');
    // Ext.getCmp('idpelamar_fJadwalUpahTahunan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
    // kekaryaanStore.load();
    // lokasiStore.load();
}