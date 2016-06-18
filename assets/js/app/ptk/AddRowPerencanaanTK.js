Ext.define('PerencanaanTKGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['idperencanaantk','tahun','idcompany','idjabatan','kodejabatan','namabulan','kodelevel','levelname','idorganisasi','idlokasiorg','idjabatanatasan','namabulan','jumlah','revisi','jumlahrevisi','status','userin','usermod','companyname','companycode','kodeorg','kodebudgetorg','namaorg','namalokasi','namajabatan','namajabatanatasan'],
    idProperty: 'id'
});

var PerencanaanTKGridStore = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PerencanaanTKGridStoreModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/datarawptk/ptk',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    }
    // sorters: [{
    //         property: 'menu_name',
    //         direction: 'DESC'
    //     }]
});

PerencanaanTKGridStore.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.status:temporary',
                    'withuserin':'true'
                  };
              });

// var PerencanaanTKGridStore = Ext.create('Ext.data.Store', {
//     model: 'PerencanaanTKGridStoreModel'
// });

var formAddRowPerencanaanTK = Ext.create('Ext.form.Panel', {
    id: 'formAddRowPerencanaanTK',
    width: 450,
    autoHeight:true,
    // height: 430,
    // url: SITE_URL + 'backend/saveform/datarawptk/ptk',
    url: SITE_URL+'ptk/savePermintaan',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
        // width: 400
    },
    items: [
        {
            xtype:'hiddenfield',
            name:'idperencanaantk'
        },
        {
            xtype:'hiddenfield',
            id:'companyname_addRowktk',
            name:'companyname'
        },
         {
            xtype:'hiddenfield',
            id:'tahun_addRowktk',
            name:'tahun'
        },
        {
            xtype:'hiddenfield',
            id:'status_addRowktk',
            name:'status'
        },
        {
            xtype:'hiddenfield',
            id:'idjabatan_addRowktk',
            name:'idjabatan'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pilih Jabatan',
            name: 'namajabatan',
            allowBlank:false,
            id: 'namajabatan_addRowktk',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wGridStrukturJabatanListPopup.show();
                        // storeGridAccount.on('beforeload',function(store, operation,eOpts){
                        //             operation.params={
                        //                         'idunit': Ext.getCmp('idunitPerencanaanTK').getValue(),
                        //                         'idaccounttype': '12,16,11'
                        //             };
                        //         });
                        storeGridStrukturJabatanList.load({
                            params:{
                                tahun:Ext.getCmp('tahun_ptk').getValue()
                            }
                        });
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Jabatan',
            id:'kodejabatan_addRowktk',
            name: 'kodejabatan',
            readOnly:true
        },
        {
            xtype:'hiddenfield',
            id:'idlevel_addRowktk',
            name:'idlevel'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Level Jabatan',
            id:'levelname_addRowktk',
            name: 'accnumber',
            readOnly:true
        },
        {
            xtype:'hiddenfield',
            id:'idorganisasi_addRowktk',
            name:'idorganisasi'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Organisasi Jabatan',
            id:'namaorg_addRowktk',
            name: 'accnumber',
            readOnly:true
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Kode Budget Organisasi',
            id:'kodebudgetorg_addRowktk',
            name: 'kodebudgetorg',
            readOnly:true
        },        
        {
            xtype:'hiddenfield',
            id:'idjabatanatasan_addRowktk',
            name:'idjabatanatasan'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nama Jabatan Atasan',
            id:'namajabatanatasan_addRowktk',
            // name: 'accnumber',
            readOnly:true
        },
        {
            xtype:'comboxlokasi',
            valueField:'idlokasiorg'
        },
        {
            xtype:'comboxbulan'
        },
        {
            xtype:'textfield',
            fieldLabel:'Jumlah',
            allowBlank:false,
            name:'jumlah',
            id:'jumlah_addRowKtk'
        },
        {
            xtype:'textfield',
            fieldLabel:'Revisi',
            allowBlank:false,
            name:'revisi',
            id:'revisi_addRowktk'
        },
        {
            xtype:'displayfield',
            fieldLabel:'Jumlah Revisi',
            readOnly:true,
            // allowBlank:false,
            name:'jumlahrevisi',
            id:'jumlahrevisi_addRowktk'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAddRowPerencanaanTK');
                Ext.getCmp('formAddRowPerencanaanTK').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowPerencanaanTKSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {

                    form.submit({
                        // params: {
                        //     tahun: Ext.getCmp('tahun_addRowktk').getValue(),
                        //     companyname: Ext.getCmp('companyname_addRowktk').getValue()
                        // },
                        success: function(form, action) {

                            // Ext.Msg.alert('Perencanaan Tenaga Kerja', action.result.message);
                            Ext.getCmp('formAddRowPerencanaanTK').getForm().reset();
                            Ext.getCmp('windowPopupAddRowPerencanaanTK').hide();

                            updateGridFormPerencanaanTK();
                            // PerencanaanTKGridStore.load();

                            // Ext.getCmp('jumlah_ptk').setValue(action.result.jumlah);
                            // Ext.getCmp('revisi_ptk').setValue(action.result.revisi);
                            // Ext.getCmp('jumlahrevisi_ptk').setValue(action.result.jumlahrevisi);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridOrganisasi.load();
                        }
                    });
                    
                    // var rec = new PerencanaanTKGridStoreModel({
                    //     idaccount: Ext.getCmp('idaccountPerencanaanTKAdd').getValue(),
                    //     accname: Ext.getCmp('accnamePerencanaanTKAdd').getValue(),
                    //     accnumber: Ext.getCmp('accnumberPerencanaanTKAdd').getValue(),
                    //     amount: Ext.getCmp('amountPerencanaanTKAdd').getValue(),
                    //     ratetax: Ext.getCmp('ratetaxPerencanaanTKAdd').getValue()
                    // });
                    
                    // var grid = Ext.getCmp('EntryPerencanaanTKMoney');
                    // grid.getStore().insert(0, rec);
                    
                    // updateGridPerencanaanTK();
                    
                    // Ext.getCmp('windowPopupAddRowPerencanaanTK').hide();
                    
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wAddRowPerencanaanTK = Ext.create('widget.window', {
    id: 'windowPopupAddRowPerencanaanTK',
    title: 'Tambah Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formAddRowPerencanaanTK]
});

