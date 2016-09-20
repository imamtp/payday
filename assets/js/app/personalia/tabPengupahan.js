Ext.define('TabPengupahan', {
    extend: 'Ext.tab.Panel',
    id: 'TabPengupahan',
    alias: 'widget.TabPengupahan',
    title:'Pengupahan',
    activeTab: 0,
    plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    listeners: {
        render: function() {
            this.items.each(function(i){
                i.tab.on('click', function(){

                    var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    if(i.title=='Identitas')
                    {

                    } else if(i.title=='Benefit')
                    {
                        
                    }

                });
            });
        }
    },  
    items: [
      {
        xtype:'GridUpahTetap',
        listeners: {
            activate: function() {                
                storeGridUpahTetap.on('beforeload',function(store, operation,eOpts){
                operation.params={
                            'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()+','+'b.jeniskomponen:Upah Tetap'
                          };
                      });
                storeGridUpahTetap.load();
            }
        }
      },
      {
        xtype:'GridUpahTidakTetap',
        listeners: {
            activate: function() {                
                storeGridUpahTidakTetap.on('beforeload',function(store, operation,eOpts){
                operation.params={
                            'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()+','+'b.jeniskomponen:Upah Tidak Tetap'
                          };
                      });
                storeGridUpahTidakTetap.load();
            }
        }
      },
      {
        xtype:'GridPengurangUpah',
        listeners: {
            activate: function() {                
                storeGridPengurangUpah.on('beforeload',function(store, operation,eOpts){
                operation.params={
                            'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                          };
                      });
                storeGridPengurangUpah.load();
            }
        }
      },
      Ext.create('Ext.form.Panel', {
            id: 'formSetingPtkp',
            title:'Pengaturan Pengupahan',
            width: 900,
            bodyStyle: 'padding:5px',
            labelAlign: 'top',
            autoScroll: true,
            fieldDefaults: {
                msgTarget: 'side',
                blankText: 'Tidak Boleh Kosong',
                labelWidth: 150,
                width: 400
            },
            layout: 'hbox',
            defaults: {
                padding: '5 10 5 5'
            },
            items: [
                {
                    items: [ 
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Memiliki NPWP',
                            id:'punyanpwp',
                            listeners: {
                                change: function(field, newValue, oldValue, eOpts){
                                    // var nonpwp = Ext.getCmp('nonpwp');
                                    // // console.log(newValue)
                                    // if(newValue.punyanpwp==1)
                                    // {
                                    //     nonpwp.setDisabled(false);
                                    // } else {
                                    //     nonpwp.setDisabled(true);
                                    // }
                                }
                            },
                            items: [
                                {boxLabel: 'YA', name: 'punyanpwp',id:'punyanpwp1',width:100,inputValue:1},
                                {boxLabel: 'Tidak',name: 'punyanpwp',id:'punyanpwp2',inputValue:2}
                            ]
                        },
                        // {
                        //     xtype:'textfield',
                        //     disabled:true,
                        //     fieldLabel:'No NPWP',
                        //     id:'nonpwp',
                        //     name:'nonpwp'
                        // },
                        {
                            xtype: 'comboxjenisptkp',
                            name: 'namaptkp',
                            id: 'namaptkp_fSetingPtkp',
                            allowBlank:false
                        },
                        {
                            xtype:'comboxJumlahHari',
                            id:'comboxJumlahHari',
                            allowBlank:false
                        }
                    ]
                },
                {
                    items: [{
                            xtype: 'radiogroup',
                            id:'biayajabatan',
                            fieldLabel: 'Hitung Biaya Jabatan',
                            items: [
                                {boxLabel: 'Ya', name: 'biayajabatan',width:100,inputValue:1},
                                {boxLabel: 'Tidak',name: 'biayajabatan',inputValue:2}
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id:'jenispotonganpph',
                            fieldLabel: 'Jenis Potongan PPH',
                            items: [
                                {boxLabel: 'GROSS', name: 'jenispotonganpph',width:100,inputValue:1},
                                {boxLabel: 'NET',name: 'jenispotonganpph',inputValue:2}
                            ]
                        }]
                }
            ],
            buttons: [{
                    text: 'Simpan',
                    handler: function() {
                      Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 103
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var form = Ext.getCmp('formSetingPtkp').getForm();
                                    if (form.isValid()) {
                                       Ext.Ajax.request({
                                            url: SITE_URL + 'personalia/updateptkp',
                                            method: 'POST',
                                            params: {
                                                idpelamar: Ext.getCmp('idpelamar_dkaryawan').getValue(),
                                                namaptkp:Ext.getCmp('namaptkp_fSetingPtkp').getValue(),
                                                punyanpwp:Ext.getCmp('punyanpwp').getValue(),
                                                jumlahhari:Ext.getCmp('comboxJumlahHari').getValue(),
                                                biayajabatan:Ext.getCmp('biayajabatan').getValue(),
                                                jenispotonganpph:Ext.getCmp('jenispotonganpph').getValue()
                                            },
                                            success: function(form, action) {
                                               var d = Ext.decode(form.responseText);
                                               Ext.Msg.alert("Info", d.message);
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", 'Error occured, please try again');
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
                }],
            listeners: {
                activate: function() {                
                    Ext.Ajax.request({
                                // url: SITE_URL + 'personalia/getptkp',
                                url: SITE_URL + 'personalia/getsetingpengupahan',
                                method: 'POST',
                                params: {
                                    idpelamar: Ext.getCmp('idpelamar_dkaryawan').getValue()
                                },
                                success: function(form, action) {
                                   var d = Ext.decode(form.responseText);
                                   if(d.punyanpwp==0 || d.punyanpwp==1 || d.punyanpwp=='' || d.punyanpwp==null)
                                   {
                                     //seting default -> YA
                                     var val = {punyanpwp : 1};
                                   } else {
                                     var val = {punyanpwp : 2};
                                   }

                                   if(d.biayajabatan==0 || d.biayajabatan==1 || d.biayajabatan=='' || d.biayajabatan==null)
                                   {
                                     //seting default -> YA
                                     var valjabatan = {biayajabatan : 1};
                                   } else {
                                     var valjabatan = {biayajabatan : 2};
                                   }

                                   if(d.jenispotonganpph==0 || d.jenispotonganpph==1 || d.jenispotonganpph=='' || d.jenispotonganpph==null)
                                   {
                                     //seting default -> YA
                                     var valjenispotonganpph = {jenispotonganpph : 1};
                                   } else {
                                     var valjenispotonganpph = {jenispotonganpph : 2};
                                   }

                                   if(d.jumlahhari==0 || d.jumlahhari==1 || d.jumlahhari=='' || d.jumlahhari==null)
                                   {
                                     //seting default -> YA
                                     var valjumlahhari = null;
                                   } else {
                                     var valjumlahhari = d.jumlahhari;
                                   }

                                   Ext.getCmp('punyanpwp').setValue(val);
                                   Ext.getCmp('namaptkp_fSetingPtkp').setValue(d.namaptkp)
                                   Ext.getCmp('comboxJumlahHari').setValue(valjumlahhari);
                                   Ext.getCmp('biayajabatan').setValue(valjabatan);
                                   Ext.getCmp('jenispotonganpph').setValue(valjenispotonganpph);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", 'Error occured, please try again');
                                }
                            });
                }
            }
        })
    ]
});
