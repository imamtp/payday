Ext.define('fotokaryawanthumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotokaryawanthumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});


Ext.define('TabItemKaryawan', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemKaryawan',
    alias: 'widget.TabItemKaryawan',
    activeTab: 0,
    plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    plugins: [{
        ptype: 'tabscrollermenu',
        maxText: 15,
        pageSize: 20
    }],
    listeners: {
        render: function() {
            this.items.each(function(i){
                i.tab.on('click', function(){
                    // alert(i.title);
                    var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    if(i.title=='Identitas')
                    {

                        var formIdentitas = Ext.getCmp('formIdentitas');
                            formIdentitas.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/Identitas/1/personalia',
                                params: {
                                    extraparams: 'a.idpelamar:' + idpelamar
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(action.response.responseText);
                                    // alert(d.data.nomorktp)
                                    // Ext.getCmp('idpelamar_fIdentitas').setValue(idpelamar);

                                    // if(Ext.getCmp('nomorktp_fIdentitas').getValue()=='')
                                    // {
                                    //     Ext.getCmp('statusformIdentitas').setValue('input');
                                    // } else {
                                        Ext.getCmp('statusformIdentitas').setValue('edit');
                                    // }
                                },
                                failure: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                     Ext.getCmp('statusformIdentitas').setValue('input');
                                }
                            })
                        Ext.getCmp('idpelamar_fIdentitas').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                        // Ext.getCmp('idpelamar_fPekerjaan').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                    } else if(i.title=='Benefit')
                        {
                            Ext.getCmp('formBenefit').getForm().reset();
                                            Ext.getCmp('TabBenefit').setActiveTab(0);
                            storeGridBenefitKaryawan.removeAll();

                            var formBenefit = Ext.getCmp('formBenefit');
                                formBenefit.getForm().load({
                                    url: SITE_URL + 'backend/loadFormData/Benefit/1/personalia',
                                    params: {
                                        extraparams: 'a.idpelamar:' + idpelamar
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(action.response.responseText);
                                        // alert(d.data.nomorktp)
                                        // Ext.getCmp('idpelamar_fIdentitas').setValue(idpelamar);

                                        // if(Ext.getCmp('nomorktp_fIdentitas').getValue()=='')
                                        // {
                                        //     Ext.getCmp('statusformIdentitas').setValue('input');
                                        // } else {
                                            Ext.getCmp('statusformBenefit').setValue('edit');
                                        // }
                                    },
                                    failure: function(form, action) {
                                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                         Ext.getCmp('statusformBenefit').setValue('input');
                                    }
                                })
                            Ext.getCmp('idpelamar_fBenefit').setValue(Ext.getCmp('idpelamar_dkaryawan').getValue());
                        }

                });
            });
        }
    },
    items: [
        {
            xtype:'formDataKaryawan'
        },
        {
            xtype:'GridPekerjaan',
            listeners: {
                activate: function() {
                    storeGridPekerjaan.on('beforeload',function(store, operation,eOpts){
                    operation.params={
                                'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                              };
                          });
                    storeGridPekerjaan.load();
                }
            }
        },
        formIdentitas,
        {
            xtype:'GridKeluarga',
            listeners: {
                activate: function() {
                     storeGridKeluarga.on('beforeload',function(store, operation,eOpts){
                    operation.params={
                                'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                              };
                          });
                    storeGridKeluarga.load();
                }
            }
        },
        {
            xtype:'GridPendidikan',
            listeners: {
                activate: function() {
                     storeGridPendidikan.on('beforeload',function(store, operation,eOpts){
                    operation.params={
                                'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                              };
                          });
                    storeGridPendidikan.load();
                }
            }
        },
        {
            xtype:'GridPelatihan',
            listeners: {
                activate: function() {
                     storeGridPelatihan.on('beforeload',function(store, operation,eOpts){
                    operation.params={
                                'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                              };
                          });
                    storeGridPelatihan.load();
                }
            }
        },
        {
            xtype:'TabBenefit'
        },
        {
            xtype:'GridSuratKeterangan',
            listeners: {
                activate: function() {
                     storeGridSuratKeterangan.on('beforeload',function(store, operation,eOpts){
                    operation.params={
                                'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                              };
                          });
                    storeGridSuratKeterangan.load();
                }
            }
        },
        {
          xtype:'TabPengupahan',
          id:'TabPengupahan',
          listeners: {
                activate: function() {
                    Ext.getCmp('TabPengupahan').setActiveTab(0);
                    
                    // storeGridUpahTetap.on('beforeload',function(store, operation,eOpts){
                    // operation.params={
                    //             'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()+','+'b.jeniskomponen:Upah Tetap'
                    //           };
                    //       });
                    // storeGridUpahTetap.load();
                }
            }
        }
    ]
});

Ext.define('WindowKaryawan', {
    extend: 'Ext.window.Window',
    modal:true,
    title: 'Data Karyawan',
    id: 'WindowKaryawan',
    alias: 'widget.WindowKaryawan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    listeners:{
         'close':function(win){
               Ext.getCmp('btnUbahNilaiUT').hide();
          },
         'hide':function(win){
               Ext.getCmp('btnUbahNilaiUT').hide();
              }

     },
    // width: 750,
    // minWidth: 650,
    // height: 580,
    //    maximizable: true,
    border: false,
    autoScroll: true,
    bodyStyle: 'padding-right: 0px',
    items: [{
            xtype: 'container',
            layout:'hbox',
            defaults: {
                padding: '5 10 5 5',
            },
            items:[{
                xtype: 'container',
                flex: 1,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [
                     {
                        xtype: 'fotokaryawanthumb',
                        id: 'fotokaryawanthumb',
                        fieldLabel: 'Foto',
                        anchor: '20%',
                        width: 87,
                        height: 100,
                    }
               ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    // padding: '5 10 5 5',
                    labelWidth:140,
                    width:470
                },
                items: [
               // {
               //      xtype:'hiddenfield',
               //      fieldLabel:'idpelamar',
               //      id:'idpelamar_dkaryawan',
               //      name:'idpelamar'
               //  },
                {
                    fieldLabel: 'Nama Lengkap',
                    // afterLabelTextTpl: required,
                    allowBlank: false,
                    id:'namalengkap_dkaryawan',
                    name: 'namalengkap',
                    anchor:'100%'
                },
                {
                    xtype:'hiddenfield',
                    fieldLabel:'idcompany',
                    id:'idcompany_dkaryawan',
                    name:'idcompany'
                },
                Ext.define('Ext.ux.companyname_dkaryawan', {
                    labelWidth:140,
                    width:470,
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.companyname_dkaryawan',
                    name: 'companyname',
                    editable: false,
                    id: 'companyname_dkaryawan',
                    fieldLabel: 'Perusahaan',
                    emptyText: 'Pilih Perusahaan...',
                    onTriggerClick: function() {
                         wGridCompanyDataKaryawanListPopup.show();
                        storeGridCompanyDataKaryawanList.load();
                    }
                }),
                // {
                //     fieldLabel: 'Nama Perusahaan',
                //     // afterLabelTextTpl: required,
                //     allowBlank: false,
                //     id:'companyname_dkaryawan',
                //     name: 'companyname',
                //     anchor:'100%'
                // },
                {
                    xtype:'displayfield',
                    fieldLabel: 'Status',
                    id:'status_dkaryawan'
                },
                {
                    xtype:'comboxJadwalKerja',
                    id:'comboxJadwalKerjaFormKaryawan',
                    valueField:'idjadwalkerja',
                    name:'idjadwalkerja',
                    allowBlank:false
                }
                // {
                //     xtype:'comboxstatus',
                //     id:'status_dkaryawan'
                // }

                // ,{
                //     fieldLabel: 'Status',
                //     // afterLabelTextTpl: required,
                //     allowBlank: false,
                //     id:'status_dkaryawan',
                //     name: 'status',
                //     // width:150
                //     anchor:'30%'
                // }
                ]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [
                {
                    fieldLabel: 'NI',
                    hidden:true,

                    // afterLabelTextTpl: required,
                    // allowBlank: false,
                    id:'ni_dkaryawan',
                    name: 'ni',
                    anchor:'100%'
                },{
                    fieldLabel: 'NIK',
                    // afterLabelTextTpl: required,
                    allowBlank: false,
                    id:'nik_dkaryawan',
                    name: 'nik',
                    anchor:'100%'
                }]
            },
              {
                xtype:'hiddenfield',
                fieldLabel:'tipePenyesuaianUpah',
                id:'tipePenyesuaianUpah'
              },
              {
                xtype:'hiddenfield',
                fieldLabel:'idpekerjaanPenyesuaianUpah',
                id:'idpekerjaanPenyesuaianUpah'
              }]
    },
    {
        xtype: 'TabItemKaryawan'
    }]
});


// var wDataKaryawan = Ext.create('widget.window', {
//     id: 'windowPopupDataKaryawan',
//     title: 'Data Karyawan',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     autoHeight: true,
//     layout: 'fit',
//     border: false,
//     items: [
//         {
//             xtype: 'container',
//             layout:'hbox',
//             defaults: {
//                 padding: '5 10 5 5',
//             },
//             items:[{
//                 xtype: 'container',
//                 flex: 1,
//                 border:false,
//                 layout: 'anchor',
//                 defaultType: 'textfield',
//                 items: [
//                      {
//                                 xtype: 'fotokaryawanthumb',
//                                 id: 'fotokaryawanthumb',
//                                 fieldLabel: 'Foto',
//                                 anchor: '20%',
//                                 width: 87,
//                                 height: 100,
//                     }
//                ]
//             },{
//                 xtype: 'container',
//                 flex: 1,
//                 layout: 'anchor',
//                 defaultType: 'textfield',
//                 defaults: {
//                     // padding: '5 10 5 5',
//                     labelWidth:140,
//                     width:470
//                 },
//                 items: [
//                 {
//                     fieldLabel: 'Nama Lengkap',
//                     // afterLabelTextTpl: required,
//                     allowBlank: false,
//                     id:'namalengkap_dkaryawan',
//                     name: 'namalengkap',
//                     anchor:'100%'
//                 },{
//                     fieldLabel: 'Nama Perusahaan',
//                     // afterLabelTextTpl: required,
//                     allowBlank: false,
//                     id:'companyname_dkaryawan',
//                     name: 'companyname',
//                     anchor:'100%'
//                 },{
//                     fieldLabel: 'Status',
//                     // afterLabelTextTpl: required,
//                     allowBlank: false,
//                     id:'status_dkaryawan',
//                     name: 'status',
//                     // width:150
//                     anchor:'30%'
//                 }]
//             },{
//                 xtype: 'container',
//                 flex: 1,
//                 layout: 'anchor',
//                 defaultType: 'textfield',
//                 items: [{
//                     fieldLabel: 'NI',

//                     // afterLabelTextTpl: required,
//                     allowBlank: false,
//                     id:'ni_dkaryawan',
//                     name: 'ni',
//                     anchor:'100%'
//                 },{
//                     fieldLabel: 'NIK',
//                     // afterLabelTextTpl: required,
//                     allowBlank: false,
//                     id:'nik_dkaryawan',
//                     name: 'nik',
//                     anchor:'100%'
//                 }]
//             }]
//     },
//     {
//         xtype: 'TabItemKaryawan'
//     }]
// });

var WindowKaryawan = Ext.create('WindowKaryawan');
