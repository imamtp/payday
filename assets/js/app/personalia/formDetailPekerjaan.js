var formDetailPekerjaan = Ext.create('Ext.form.Panel', {
    id: 'formDetailPekerjaan',
    autoWidth: true,
    // width:800,
    autoHeight: true,
    title: 'Data Pekerjaan',
    //    height: 300,
    bodyStyle: 'padding:5px',
    url: SITE_URL + 'personalia/saveAtasanPergerakan',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor: '100%'
        //        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [
    {
        items: [
                {
                    xtype: 'hiddenfield',
                    name: 'statusformDetailPekerjaan'
                }, {
                    xtype: 'hiddenfield',
                    id:'idpelamar_detailPekerjaan',
                    name: 'idpelamar'
                },  {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idpekerjaan',
                    id:'idpekerjaan_DetailPekerjaan',
                    name: 'idpekerjaan'
                },
                {
                    margins:'0px 0px 0px 5px',
                    readOnly:true,
                    xtype: 'comboxpergerakan',
                    width:400,
                    //allowBlank:false
                },
               {
                    xtype: 'hiddenfield',
                    name: 'idpergerakanpersonil'
                },
                
                {
                    xtype: 'textfield',
                    // cls: 'x-item-disabled',
                    fieldLabel: 'No Pergerakan',
                    readOnly: true,
                    name: 'nopergerakan',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                // insertNoRef('nopergerakan','nopergerakan_DetailPekerjaan','PP');
                            });
                        }
                    }
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'idstrukturjabatan'
                }, {
                    xtype: 'hiddenfield',
                    name: 'idjabatan'
                },
                Ext.define('Ext.ux.namajabatan_DetailPekerjaan', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.namajabatan_DetailPekerjaan',
                    name: 'namajabatan',
                    //allowBlank:false,
                    editable: false,
                    readOnly:true,
                    fieldLabel: 'Jabatan',
                    emptyText: 'Pilih Jabatan...',
                    onTriggerClick: function() {
                        wGridJabatanListPopup.show();
                        storeGridJabatanList.load();
                    }
                }),
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Level Jabatan',
                    name: 'levelnamejabatan'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idlevelindividu_DetailPekerjaan',
                    name: 'idlevelindividu'
                },
                Ext.define('Ext.ux.levelnameindividu_DetailPekerjaan', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.levelnameindividu_DetailPekerjaan',
                    editable: false,
                    fieldLabel: 'Level Individu',
                    //allowBlank:false
                    readOnly:true,
                    name: 'levelnameindividu',
                    emptyText: 'Pilih Level Individu...',
                    onTriggerClick: function() {
                        wGridLevelIndividuListPopup.show();
                        storeGridLevelIndividuList.load();
                    }
                }), {
                    xtype: 'comboxlokasi',
                    //allowBlank:false,
                    readOnly:true,
                    id: 'namalokasi_DetailPekerjaan'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idorganisasi_DetailPekerjaan',
                    readOnly:true,
                    name: 'idorganisasi'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Organisasi',
                    readOnly:true,
                    name: 'namaorg',
                }
            ]
    },
    {
        items: [
                {
                    xtype: 'comboxkekaryaan',
                    readOnly:true,
                    //allowBlank:false
                }, {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    name: 'tglmasuk',
                    readOnly:true,
                    //allowBlank:false
                    fieldLabel: 'Tgl Efektif'
                }, {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    name: 'tglberakhir',
                    readOnly:true,
                    //allowBlank:false
                    fieldLabel: 'Tgl Berakhir'
                },
                /////////////PENEMPATAN BARU/////////////
                {
                  xtype:'comboxkekaryaan',
                  hidden:true,
                  name:'kekaryaanname',
                  readOnly:true
              },
              {
                  xtype: 'radiogroup',
                  //allowBlank:false,
                  hidden:true,
                  readOnly:true,
                  fieldLabel: 'Periode Kekaryawanan',
                  items: [
                     {boxLabel: 'Bulan', name: 'periodekekaryaan', width:70, inputValue: 1},
                      {boxLabel: 'Tanggal', name: 'periodekekaryaan', width:70, inputValue: 2},
                  ],
                  listeners: {
                      change: function(field, newValue, oldValue) {
                          // var value = newValue.show;
                          // console.log(value)
                          // console.log(newValue.periodekekaryaan)
                          // if (Ext.isArray(value)) {
                          //     return;
                          // }
                          if (newValue.periodekekaryaan == 1) {
                              Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(false);
                              // Ext.getCmp('tglakhirkekaryaan').setDisabled(true);
                          } else if (newValue.periodekekaryaan == 2){
                              Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(true);
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setDisabled(false);
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setReadOnly(false);
                          }
                      }
                  }
              },
              {
                  xtype: 'numberfield',
                  //allowBlank:true,
                  hidden:true,
                  fieldLabel: 'Jumlah Bulan',
                  // //allowBlank:false
                  // value:1,
                  minValue:0,
                  readOnly:true,
                  name: 'jumlahbulankekaryaan',
                  listeners: {
                      change: function(field, newValue, oldValue) {
                          // console.log(Ext.getCmp('rencanatglmasuk').getSubmitValue())
                          // var rencanatglmasuk = Ext.getCmp('tglmasuk_DetailPekerjaan').getSubmitValue();
                          // if(rencanatglmasuk==null)
                          // {
                          //     Ext.Msg.alert('Info', 'Input tanggal efektif terlebih dahulu');
                          // } else {
                          //      var tgl = moment(rencanatglmasuk, "DD-MM-YYYY").add(newValue, 'months');
                          // // var tglakhir = tgl.format('DD-MM-YYYY');
                          // // console.log(tgl.format('DD-MM-YYYY'))
                          //     var tglakhir = moment(tgl.format('DD-MM-YYYY'), "DD-MM-YYYY").subtract(1, 'days');
                          //      // console.log(tglakhir.format('DD-MM-YYYY'))
                          //     Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setValue(tglakhir.format('DD-MM-YYYY'));
                          // }

                      }
                  }
              },
              {
                  xtype: 'datefield',
                  hidden:true,
                  format: 'd-m-Y',
                  //allowBlank:false,
                  readOnly:true,
                  name:'tglberakhir',
                  // //allowBlank:false
                  fieldLabel: 'Tgl Akhir'
              },
                /////////////END PENEMPATAN BARU/////////
                 {
                    xtype: 'hiddenfield',
                    id: 'idpelamaratasan_DetailPekerjaan',
                    name: 'idpelamaratasan'
                },
                Ext.define('Ext.ux.namaatasan_DetailPekerjaan', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.namaatasan_DetailPekerjaan',
                    editable: false,
                    fieldLabel: 'Nama Atasan',
                    // //allowBlank:false
                    id:'namaatasan_DetailPekerjaan',
                    name: 'namaatasan',
                    emptyText: 'Pilih Atasan...',
                    onTriggerClick: function() {
                        wGridNamaAtasanDetailPekerjaanListPopup.show();
                        storeGridNamaAtasanDetailPekerjaanList.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        // 'extraparams': 'k.statuscalon:Disetujui',
                                        'notidpelamar': Ext.getCmp('idpelamar_detailPekerjaan').getValue(),
                                      };
                                  });
                        storeGridNamaAtasanDetailPekerjaanList.load();
                    }
                }), {
                    xtype: 'displayfield',
                    fieldLabel: 'Jabatan Atasan',
                    //allowBlank:false
                    id:'namajabatanatasan_DetailPekerjaan',
                    readOnly:true,
                    name: 'namajabatanatasan'
                },  {
                    xtype: 'displayfield',
                    id:'namaorgatasan_DetailPekerjaan',
                    fieldLabel: 'Organisasi Atasan',
                    name: 'namaorgatasan',
                    readOnly: true
                },
                //  Ext.define('Ext.ux.namaorgatasan_DetailPekerjaan', {
                //     extend: 'Ext.form.field.Trigger',
                //     alias: 'widget.namaorgatasan_DetailPekerjaan',
                //     editable: false,
                //     fieldLabel: 'Organisasi Atasan',
                //     //allowBlank:false,
                //     id:'namaorgatasan_DetailPekerjaan',
                //     name: 'namaorgatasan',
                //     emptyText: 'Pilih Organisasi Atasan...',
                //     onTriggerClick: function() {
                //          wGridOrganisasiAtasanDetailPekerjaanListPopup.show();
                //          storeGridOrganisasiAtasanDetailPekerjaanList.load();
                //     }
                // }),
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Kode Organisasi Atasan',
                    id:'kodeorgatasan_DetailPekerjaan',
                    name: 'kodeorgatasan',
                    readOnly: true
                }
                // , {
                //     xtype: 'displayfield',
                //     fieldLabel: 'Lokasi Atasan',
                //     id: 'lokasiatasan_DetailPekerjaan',
                //     name: 'lokasiatasan'
                // }
                ,{
                        xtype: 'displayfield',
                        fieldLabel: 'Status Pergerakan',
                        id:'statuspergerakan_DetailPekerjaan',
                        name: 'statuspergerakan'
                }
        ]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupDetailPekerjaan');
            Ext.getCmp('formDetailPekerjaan').getForm().reset();
            win.hide();
        }
    },
    {
        text: 'Simpan',
        handler: function() {
           // kotakLoading();
            // var form = Ext.getCmp('formDetailPekerjaan').getForm();
            // console.log(form)
            var form = this.up('form').getForm();
            var invalidFields = [];
            Ext.suspendLayouts();
            form.getFields().filterBy(function(field) {
                if (field.validate()) return;
                invalidFields.push(field);
            });
            Ext.resumeLayouts(true);
            console.log(invalidFields);

            //console.log(form)
            if (form.isValid()) {
                form.submit({
                    // url: SITE_URL + 'backend/saveform/DetailPekerjaan/personalia',
                    waitMsg: 'Loading...',
                    method: 'POST',
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('windowPopupDetailPekerjaan').hide();
                        //storeGridDataDetailPekerjaan.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridDetailPekerjaan.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});


Ext.define('TabItemDetailPekerjaan', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemDetailPekerjaan',
    alias: 'widget.TabItemDetailPekerjaan',
    activeTab: 0,
    // plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    // plugins: [{
    //     ptype: 'tabscrollermenu',
    //     maxText: 15,
    //     pageSize: 20
    // }],
    listeners: {
        render: function() {
            this.items.each(function(i){
                i.tab.on('click', function(){
                    if(i.title=='Daftar Bawahan')
                    {
                        var idDetailPekerjaan = Ext.getCmp('idpekerjaan_DetailPekerjaan').getValue();
                        if(idDetailPekerjaan=='')
                        {
                            Ext.Msg.alert("Info", "Data Pergerakan Personil Belum Diinput");
                            // Ext.getCmp('tambahBawahanBtn').setDisabled(true);
                            // var tabs = btn.up('tabpanel');
                            Ext.getCmp('TabItemDetailPekerjaan').setActiveTab(0);
                            Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(true);
                        }  else {
                            // Ext.getCmp('tambahBawahanBtn').setDisabled(false);
                            storeGridBawahan.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        'extraparams': 'aa.idpelamaratasan:'+Ext.getCmp('idpelamar_detailPekerjaan').getValue()
                                      };
                                  });
                            storeGridBawahan.load();
                            // Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);

                            if(Ext.getCmp('statuspergerakan_DetailPekerjaan').getValue()=='Disetujui')
                            {
                                Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(true);
                            } else {
                                Ext.getCmp('btnDetailBawahanPergerakan').setDisabled(false);
                            }
                        }
                    }
                });
            });
        }
    },
    items: [
        formDetailPekerjaan,
        {
            xtype:'GridBawahan'
            // listeners: {
            //     activate: function() {
            //         storeGridBawahan.load();
            //     }
            // }
        }
    ]
});


var wDetailPekerjaan = Ext.create('widget.window', {
    id: 'windowPopupDetailPekerjaan',
    title: 'Detail Pekerjaan',
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
    items: [
    {
        xtype:'TabItemDetailPekerjaan'
    }]
});
