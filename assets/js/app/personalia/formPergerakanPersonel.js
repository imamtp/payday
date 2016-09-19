var formPergerakanPersonel = Ext.create('Ext.form.Panel', {
    id: 'formPergerakanPersonel',
    autoWidth: true,
    // width:800,
    autoHeight: true,
    title: 'Data Personil',
    //    height: 300,
    bodyStyle: 'padding:5px',
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
        items: [ {
        margins:'0px 0px 0px 5px',
        xtype: 'comboxpergerakan',
        width:400,
        id: 'comboxpergerakan_fPergerakanP',
        allowBlank:false,
        listeners: {
            change: function(field, newValue, oldValue) {
                
                // Ext.getCmp('formPergerakanPersonel').getForm.reset();
                
                var TabItemPergerakanPersonil = Ext.getCmp('TabItemPergerakanPersonil');
                var namajabatan = Ext.getCmp('namajabatan_fPergerakanP_from');
                var levelnameJabatan = Ext.getCmp('levelnameJabatan_fPergerakanP_from');
                var levelnameindividu = Ext.getCmp('levelnameindividu_fPergerakanP_from');
                var namalokasi = Ext.getCmp('namalokasi_fPergerakanP_from');
                var namaorg = Ext.getCmp('namaorg_fPergerakanP_from');
                var kekaryaanname = Ext.getCmp('kekaryaanname_fPergerakanP_from');
                var tglmasuk = Ext.getCmp('tglmasuk_fPergerakanP_from');
                var tglberakhir = Ext.getCmp('tglberakhir_fPergerakanP_from');
                var namaatasanm = Ext.getCmp('namaatasan_fPergerakanP_from');
                var namajabatanatasan = Ext.getCmp('namajabatanatasan_fPergerakanP_from');
                var namaorgatasan = Ext.getCmp('namaorgatasan_fPergerakanP_from');

                var comboxkekaryaan_fPergerakanP = Ext.getCmp('comboxkekaryaan_fPergerakanP');
                // var tglmasuk_fPergerakanP = Ext.getCmp('tglmasuk_fPergerakanP');
                var tglberakhir_fPergerakanP = Ext.getCmp('tglberakhir_fPergerakanP');

                var kekaryaanname_fPergerakanBaru = Ext.getCmp('kekaryaanname_fPergerakanBaru');
                var periodekekaryaan_fPergerakanBaru = Ext.getCmp('periodekekaryaan_fPergerakanBaru');
                var jumlahbulankekaryaan_fPergerakanBaru = Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru');
                var tglakhirkekaryaan_fPergerakanBaru = Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru');

                if(newValue=='PENEMPATAN BARU')
                {
                    // Ext.getCmp('fieldsetPersonil').show();
                    Ext.getCmp('fieldsetTUjuanPergerakan').show();
                    Ext.getCmp('catatanPenyesuaianUpah').hide();
                    Ext.getCmp('startdatenewpay').hide();
                    Ext.getCmp('catatanPenyesuaianUpah').setDisabled(true);
                    Ext.getCmp('penyesuaianStatus').setValue('false');

                    Ext.getCmp('namajabatan_fPergerakanP').setDisabled(false);
                    Ext.getCmp('levelnameindividu_fPergerakanP').setDisabled(false);
                    Ext.getCmp('namalokasi_fPergerakanP').setDisabled(false);
                    Ext.getCmp('comboxkekaryaan_fPergerakanP').setDisabled(false);
                    Ext.getCmp('tglmasuk_fPergerakanP').setDisabled(false);
                    Ext.getCmp('tglberakhir_fPergerakanP').setDisabled(false);
                    Ext.getCmp('kekaryaanname_fPergerakanBaru').setDisabled(false);
                    Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(false);
                    Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(false);
                    Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setDisabled(false);
                    Ext.getCmp('namaatasan_fPergerakanP').setDisabled(false);
                    Ext.getCmp('namajabatanatasan_fPergerakanP').setDisabled(false);
                    // TabItemPergerakanPersonil.items.getAt(1).setDisabled(true);
                    // TabItemPergerakanPersonil.hide();
                    namajabatan.hide();
                    levelnameJabatan.hide();
                    levelnameindividu.hide();
                    namalokasi.hide();
                    namaorg.hide();
                    kekaryaanname.hide();
                    tglmasuk.hide();
                    tglberakhir.hide();
                    namaatasanm.hide();
                    namajabatanatasan.hide();
                    namaorgatasan.hide();

                    comboxkekaryaan_fPergerakanP.setDisabled(true);
                    // tglmasuk_fPergerakanP.setDisabled(true);
                    tglberakhir_fPergerakanP.setDisabled(true);
                    comboxkekaryaan_fPergerakanP.hide();
                    // tglmasuk_fPergerakanP.hide();
                    tglberakhir_fPergerakanP.hide();

                    kekaryaanname_fPergerakanBaru.setDisabled(false);
                    periodekekaryaan_fPergerakanBaru.setDisabled(false);
                    jumlahbulankekaryaan_fPergerakanBaru.setDisabled(false);
                    tglakhirkekaryaan_fPergerakanBaru.setDisabled(false);
                    kekaryaanname_fPergerakanBaru.show();
                    periodekekaryaan_fPergerakanBaru.show();
                    jumlahbulankekaryaan_fPergerakanBaru.show();
                    tglakhirkekaryaan_fPergerakanBaru.show();

                    Ext.getCmp('alasanterminasi').hide();
                    Ext.getCmp('tglterminasi').hide();
                } else if(newValue=='PENYESUAIAN UPAH') 
                    {
                        // Ext.getCmp('fieldsetPersonil').hide();
                        Ext.getCmp('fieldsetTUjuanPergerakan').hide();
                        Ext.getCmp('catatanPenyesuaianUpah').show();
                        Ext.getCmp('startdatenewpay').show();
                        
                        Ext.getCmp('catatanPenyesuaianUpah').setDisabled(false);
                        Ext.getCmp('penyesuaianStatus').setValue('true');
                        TabItemPergerakanPersonil.items.getAt(1).setDisabled(true);

                        Ext.getCmp('namajabatan_fPergerakanP').setDisabled(true);
                        Ext.getCmp('levelnameindividu_fPergerakanP').setDisabled(true);
                        Ext.getCmp('namalokasi_fPergerakanP').setDisabled(true);
                        Ext.getCmp('comboxkekaryaan_fPergerakanP').setDisabled(true);
                        Ext.getCmp('tglmasuk_fPergerakanP').setDisabled(true);
                        Ext.getCmp('tglberakhir_fPergerakanP').setDisabled(true);
                        Ext.getCmp('kekaryaanname_fPergerakanBaru').setDisabled(true);
                        Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(true);
                        Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(true);
                        Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setDisabled(true);
                        Ext.getCmp('namaatasan_fPergerakanP').setDisabled(true);
                        Ext.getCmp('namajabatanatasan_fPergerakanP').setDisabled(true);

                            Ext.getCmp('alasanterminasi').hide();
                            Ext.getCmp('tglterminasi').hide();
                    } else if(newValue=='TERMINASI')  {
                           // Ext.getCmp('fieldsetPersonil').hide();
                            Ext.getCmp('fieldsetTUjuanPergerakan').hide();
                            var catatanPenyesuaianUpah = Ext.getCmp('catatanPenyesuaianUpah');
                            catatanPenyesuaianUpah.hide();
                            Ext.getCmp('startdatenewpay').hide();
                            catatanPenyesuaianUpah.setDisabled(true);
                            Ext.getCmp('penyesuaianStatus').setValue('false');
                            TabItemPergerakanPersonil.items.getAt(1).setDisabled(true);

                            Ext.getCmp('namajabatan_fPergerakanP').setDisabled(true);
                            Ext.getCmp('levelnameindividu_fPergerakanP').setDisabled(true);
                            Ext.getCmp('namalokasi_fPergerakanP').setDisabled(true);
                            Ext.getCmp('comboxkekaryaan_fPergerakanP').setDisabled(true);
                            Ext.getCmp('tglmasuk_fPergerakanP').setDisabled(true);
                            Ext.getCmp('tglberakhir_fPergerakanP').setDisabled(true);
                            Ext.getCmp('kekaryaanname_fPergerakanBaru').setDisabled(true);
                            Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(true);
                            Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(true);
                            Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setDisabled(true);
                            Ext.getCmp('namaatasan_fPergerakanP').setDisabled(true);
                            Ext.getCmp('namajabatanatasan_fPergerakanP').setDisabled(true);

                            Ext.getCmp('alasanterminasi').show();
                            Ext.getCmp('tglterminasi').show();
                        } else {
                            // Ext.getCmp('fieldsetPersonil').show();
                            Ext.getCmp('fieldsetTUjuanPergerakan').show();
                            Ext.getCmp('catatanPenyesuaianUpah').hide();
                            Ext.getCmp('startdatenewpay').hide();
                            Ext.getCmp('catatanPenyesuaianUpah').setDisabled(true);
                            Ext.getCmp('penyesuaianStatus').setValue('false');

                            Ext.getCmp('namajabatan_fPergerakanP').setDisabled(false);
                            Ext.getCmp('levelnameindividu_fPergerakanP').setDisabled(false);
                            Ext.getCmp('namalokasi_fPergerakanP').setDisabled(false);
                            Ext.getCmp('comboxkekaryaan_fPergerakanP').setDisabled(false);
                            Ext.getCmp('tglmasuk_fPergerakanP').setDisabled(false);
                            Ext.getCmp('tglberakhir_fPergerakanP').setDisabled(false);
                            Ext.getCmp('kekaryaanname_fPergerakanBaru').setDisabled(false);
                            Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(false);
                            Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(false);
                            Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setDisabled(false);
                            Ext.getCmp('namaatasan_fPergerakanP').setDisabled(false);
                            Ext.getCmp('namajabatanatasan_fPergerakanP').setDisabled(false);

                            TabItemPergerakanPersonil.items.getAt(1).setDisabled(false);
                            TabItemPergerakanPersonil.show();
                            namajabatan.show();
                            levelnameJabatan.show();
                            levelnameindividu.show();
                            namalokasi.show();
                            namaorg.show();
                            kekaryaanname.show();
                            tglmasuk.show();
                            tglberakhir.show();
                            namaatasanm.show();
                            namajabatanatasan.show();
                            namaorgatasan.show();

                            comboxkekaryaan_fPergerakanP.setDisabled(false);
                            // tglmasuk_fPergerakanP.setDisabled(false);
                            tglberakhir_fPergerakanP.setDisabled(false);
                            comboxkekaryaan_fPergerakanP.show();
                            // tglmasuk_fPergerakanP.show();
                            tglberakhir_fPergerakanP.show();

                            kekaryaanname_fPergerakanBaru.setDisabled(true);
                            periodekekaryaan_fPergerakanBaru.setDisabled(true);
                            jumlahbulankekaryaan_fPergerakanBaru.setDisabled(true);
                            tglakhirkekaryaan_fPergerakanBaru.setDisabled(true);
                            kekaryaanname_fPergerakanBaru.hide();
                            periodekekaryaan_fPergerakanBaru.hide();
                            jumlahbulankekaryaan_fPergerakanBaru.hide();
                            tglakhirkekaryaan_fPergerakanBaru.hide();

                            Ext.getCmp('alasanterminasi').hide();
                            Ext.getCmp('tglterminasi').hide();
                        }
            }
        }
    },
    {
            xtype: 'fieldset',
            title: 'Data Personil',
            id:'fieldsetPersonil',
            // collapsible: true,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'statusformPergerakanPersonil',
                    id: 'statusformPergerakanPersonel'
                }, {
                    xtype: 'hiddenfield',
                    name: 'idpelamar',
                    id: 'idpelamar_fPergerakanP_from'
                },  {
                    xtype: 'hiddenfield',
                    id: 'idpergerakanpersonil_fPergerakanP',
                    name: 'idpergerakanpersonil'
                },
                 {
                    xtype: 'hiddenfield',
                    id: 'idperkerjaan_fPergerakanP_from',
                    name: 'idpekerjaanfrom'
                },
                Ext.define('Ext.ux.namalengkap_fPergerakanP', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.namalengkap_fPergerakanP',
                    name: 'namalengkap',
                    editable: false,
                    id: 'namalengkap_fPergerakanP_from',
                    fieldLabel: 'Nama Personil',
                    emptyText: 'Pilih Personil...',
                    onTriggerClick: function() {

                        if(Ext.getCmp('comboxpergerakan_fPergerakanP').getValue()=='PENEMPATAN BARU')
                        {
                          wGridPersonilNewJobListPopup.show();
                          storeGridPersonilNewJobList.load();
                        } else {
                          wGridPersonilListPopup.show();
                          storeGridPersonilList.on('beforeload',function(store, operation,eOpts){
                             operation.params={
                                         // 'extraparams': 'k.statuscalon:Disetujui',
                                         'withjob':'true'
                                       };
                                   });
                          storeGridPersonilList.load();
                        }


                    }
                }), {
                    xtype: 'hiddenfield',
                    name: 'idcompany',
                    id: 'idcompany_fPergerakanP_from'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Nama Perusahaan',
                    id: 'companyname_fPergerakanP_from',
                    name: 'companyname'
                }, {
                    xtype: 'displayfield',
                    hidden:true,
                    fieldLabel: 'NI',
                    id: 'ni_fPergerakanP_from',
                    name: 'ni'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'NIK',
                    id: 'nik_fPergerakanP_from',
                    name: 'nik'
                }, {
                    xtype: 'hiddenfield',
                    name: 'idstrukturjabatan_from',
                    id: 'idstrukturjabatan_fPergerakanP_from'
                }, {
                    xtype: 'hiddenfield',
                    name: 'idjabatan_from',
                    id: 'idjabatan_fPergerakanP_from'
                },
                 {
                    xtype: 'displayfield',
                    fieldLabel: 'Jabatan',
                    name: 'namajabatan_from',
                    id: 'namajabatan_fPergerakanP_from',
                },
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idleveljabatan_fPergerakanP',
                    id: 'idleveljabatan_fPergerakanP_from',
                    name: 'idleveljabatan_from'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Level Jabatan',
                    id: 'levelnameJabatan_fPergerakanP_from',
                    name: 'levelnamejabatan_from'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idlevelindividu_fPergerakanP',
                    id: 'idlevelindividu_fPergerakanP_from',
                    name: 'idlevelindividu_from'
                },
                 {
                    xtype: 'displayfield',
                    fieldLabel: 'Level Individu',
                    name: 'levelnameindividu_from',
                    id: 'levelnameindividu_fPergerakanP_from',
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Lokasi',
                    name: 'namalokasi_from',
                    id: 'namalokasi_fPergerakanP_from',
                },
                 {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idorganisasi_fPergerakanP',
                    id: 'idorganisasi_fPergerakanP_from',
                    name: 'idorganisasi_from'
                }
                , {
                    xtype: 'displayfield',
                    fieldLabel: 'Organisasi',
                    id: 'namaorg_fPergerakanP_from',
                    name: 'namaorg_from',
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Kekaryawanan',
                    id: 'kekaryaanname_fPergerakanP_from',
                    name: 'kekaryaanname_from',
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tgl Efektif',
                    name: 'tglmasuk_from',
                    id: 'tglmasuk_fPergerakanP_from'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tgl Berakhir',
                    name: 'tglberakhir_from',
                    id: 'tglberakhir_fPergerakanP_from'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'idpelamaratasan_fPergerakanP_from',
                    name: 'idpelamaratasan_from'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Nama Atasan',
                    name: 'namaatasan_from',
                    id: 'namaatasan_fPergerakanP_from'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Jabatan Atasan',
                    allowBlank: false,
                    id: 'namajabatanatasan_fPergerakanP_from',
                    name: 'namajabatanatasan_from'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Kode Jabatan Atasan',
                    id: 'kodejabatanatasan_fPergerakanP_from',
                    name: 'kodejabatanatasan_from',
                    readOnly: true
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Organisasi Atasan',
                    id: 'namaorgatasan_fPergerakanP_from',
                    name: 'namaorgatasan_from',
                    readOnly: true
                },
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Kode Organisasi Atasan',
                    id: 'kodeorgatasan_fPergerakanP_from',
                    name: 'kodeorgatasan_from',
                    readOnly: true
                }
                // , {
                //     xtype: 'displayfield',
                //     fieldLabel: 'Lokasi Atasan',
                //     id: 'lokasiatasan_fPergerakanP_from',
                //     name: 'lokasiatasan'
                // }
            ]
        }]
    },
    {
        items: [
        {
                    xtype: 'displayfield'
        },
        {
            xtype:'textarea',
            allowBlank:false,
            hidden:true,
            width:400,
            height:300,
            fieldLabel:'Catatan Perubahan Upah',
            name:'catatanpenyesuaian',
            id:'catatanPenyesuaianUpah'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdatenewpay',
            id:'startdatenewpay',
            hidden:true,
            fieldLabel: 'Tgl Efektif'
        },
        {
            xtype:'textarea',
            // allowBlank:false,
            hidden:true,
            width:400,
            height:300,
            fieldLabel:'Alasan Terminasi',
            name:'alasanterminasi',
            id:'alasanterminasi'
        },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'tglterminasi',
            id:'tglterminasi',
            hidden:true,
            fieldLabel: 'Tgl Terminasi'
        },
        {
            xtype: 'hiddenfield',
            name: 'penyesuaianstatus',
            id: 'penyesuaianStatus'
        },{
            xtype: 'fieldset',
            title: 'Tujuan Pergerakan Personil',
            id:'fieldsetTUjuanPergerakan',
            // collapsible: true,
            items: [
                
                {
                    xtype: 'hiddenfield',
                    name: 'idpekerjaan',
                    id: 'idpekerjaan_fPergerakanP'
                },
                {
                    xtype: 'textfield',
                    // cls: 'x-item-disabled',
                    fieldLabel: 'No Pergerakan',
                    readOnly: true,
                    id:'nopergerakan_fPergerakanP',
                    name: 'nopergerakan',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                insertNoRef('nopergerakan','nopergerakan_fPergerakanP','PP');
                            });
                        }
                    }
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'idstrukturjabatan',
                    id: 'idstrukturjabatan_fPergerakanP'
                }, {
                    xtype: 'hiddenfield',
                    name: 'idjabatan',
                    id: 'idjabatan_fPergerakanP'
                },
                Ext.define('Ext.ux.namajabatan_fPergerakanP', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.namajabatan_fPergerakanP',
                    name: 'namajabatan',
                    allowBlank:false,
                    editable: false,
                    id: 'namajabatan_fPergerakanP',
                    fieldLabel: 'Jabatan',
                    emptyText: 'Pilih Jabatan...',
                    onTriggerClick: function() {
                        wGridJabatanListPopup.show();
                        storeGridJabatanList.load({
                                params:{
                                    pergerakan: Ext.getCmp('comboxpergerakan_fPergerakanP').getValue(),
                                    idleveljabatan: Ext.getCmp('idleveljabatan_fPergerakanP_from').getValue()
                                }
                            });
                    }
                }), {
                    xtype: 'displayfield',
                    fieldLabel: 'Level Jabatan',
                    id: 'levelnameJabatan_fPergerakanP',
                    name: 'levelnamejabatan'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idlevelindividu_fPergerakanP',
                    id: 'idlevelindividu_fPergerakanP',
                    name: 'idlevelindividu'
                },
                Ext.define('Ext.ux.levelnameindividu_fPergerakanP', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.levelnameindividu_fPergerakanP',
                    editable: false,
                    fieldLabel: 'Level Individu',
                    allowBlank: false,
                    id: 'levelnameindividu_fPergerakanP',
                    name: 'levelnameindividu',
                    emptyText: 'Pilih Level Individu...',
                    onTriggerClick: function() {
                        wGridLevelIndividuListPopup.show();
                        storeGridLevelIndividuList.load(
                            {
                                params:{
                                    pergerakan: Ext.getCmp('comboxpergerakan_fPergerakanP').getValue(),
                                    idlevelindividu: Ext.getCmp('idlevelindividu_fPergerakanP_from').getValue()
                                }
                            });
                    }
                }), {
                    xtype: 'comboxlokasi',
                    allowBlank:false,
                    id: 'namalokasi_fPergerakanP'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'idorganisasi_fPergerakanP',
                    id: 'idorganisasi_fPergerakanP',
                    name: 'idorganisasi'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Organisasi',
                    id: 'namaorg_fPergerakanP',
                    name: 'namaorg',
                },
                {
                    xtype: 'comboxkekaryaan',
                    id: 'comboxkekaryaan_fPergerakanP',
                    allowBlank:false
                }, {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    name: 'tglmasuk',
                    id: 'tglmasuk_fPergerakanP',
                    allowBlank: false,
                    fieldLabel: 'Tgl Efektif'
                }, {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    name: 'tglberakhir',
                    id: 'tglberakhir_fPergerakanP',
                    allowBlank: false,
                    fieldLabel: 'Tgl Berakhir'
                },
                /////////////PENEMPATAN BARU/////////////
                {
                  xtype:'comboxkekaryaan',
                  hidden:true,
                  name:'kekaryaanname',
                  id: 'kekaryaanname_fPergerakanBaru',
                  // allowBlank:false,
                  listeners: {
                      change: function(field, newValue, oldValue) {
                          if(newValue=='TETAP')
                          {
                              Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(true);
                              Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(true);
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setValue('31-12-9999');
                          } else if(newValue=='PERCOBAAN')
                          {
                              Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(true);
                              Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(true);
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setValue('31-12-9999');
                          } else if(newValue=='KONTRAK')
                          {
                              Ext.getCmp('periodekekaryaan_fPergerakanBaru').setDisabled(false);
                              Ext.getCmp('jumlahbulankekaryaan_fPergerakanBaru').setDisabled(false);
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setDisabled(false);
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setReadOnly(true);
                          }
                      }
                  }
              },
              {
                  xtype: 'radiogroup',
                  allowBlank:false,
                  hidden:true,
                  id:'periodekekaryaan_fPergerakanBaru',
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
                  allowBlank:false,
                  hidden:true,
                  fieldLabel: 'Jumlah Bulan',
                  // allowBlank: false,
                  // value:1,
                  minValue:1,
                  id: 'jumlahbulankekaryaan_fPergerakanBaru',
                  name: 'jumlahbulankekaryaan',
                  listeners: {
                      change: function(field, newValue, oldValue) {
                          // console.log(Ext.getCmp('rencanatglmasuk').getSubmitValue())
                          var rencanatglmasuk = Ext.getCmp('tglmasuk_fPergerakanP').getSubmitValue();
                          if(rencanatglmasuk==null)
                          {
                              Ext.Msg.alert('Info', 'Input tanggal efektif terlebih dahulu');
                          } else {
                               var tgl = moment(rencanatglmasuk, "DD-MM-YYYY").add(newValue, 'months');
                          // var tglakhir = tgl.format('DD-MM-YYYY');
                          // console.log(tgl.format('DD-MM-YYYY'))
                              var tglakhir = moment(tgl.format('DD-MM-YYYY'), "DD-MM-YYYY").subtract(1, 'days');
                               // console.log(tglakhir.format('DD-MM-YYYY'))
                              Ext.getCmp('tglakhirkekaryaan_fPergerakanBaru').setValue(tglakhir.format('DD-MM-YYYY'));
                          }

                      }
                  }
              },
              {
                  xtype: 'datefield',
                  hidden:true,
                  format: 'd-m-Y',
                  allowBlank:false,
                  id:'tglakhirkekaryaan_fPergerakanBaru',
                  name:'tglberakhir',
                  // allowBlank: false,
                  fieldLabel: 'Tgl Akhir'
              },
                /////////////END PENEMPATAN BARU/////////
                 {
                    xtype: 'hiddenfield',
                    id: 'idpelamaratasan_fPergerakanP',
                    name: 'idpelamaratasan'
                },
                Ext.define('Ext.ux.namaatasan_fPergerakanP', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.namaatasan_fPergerakanP',
                    editable: false,
                    fieldLabel: 'Nama Atasan',
                    // allowBlank: false,
                    id: 'namaatasan_fPergerakanP',
                    name: 'namaatasan',
                    emptyText: 'Pilih Atasan...',
                    onTriggerClick: function() {
                        wGridNamaAtasanPergerakanPersonilListPopup.show();
                        storeGridNamaAtasanPergerakanPersonilList.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                         'aktif': 'true',
                                        // 'extraparams': 'k.statuscalon:Disetujui',
                                        'notidpelamar': Ext.getCmp('idpelamar_fPergerakanP_from').getValue(),
                                      };
                                  });
                        storeGridNamaAtasanPergerakanPersonilList.load();
                    }
                }), {
                    xtype: 'displayfield',
                    fieldLabel: 'Jabatan Atasan',
                    allowBlank: false,
                    id: 'namajabatanatasan_fPergerakanP',
                    name: 'namajabatanatasan'
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Kode Jabatan Atasan',
                    id: 'kodejabatanatasan_fPergerakanP',
                    name: 'kodejabatanatasan',
                    readOnly: true
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Organisasi Atasan',
                    id: 'namaorgatasan_fPergerakanP',
                    name: 'namaorgatasan',
                    readOnly: true
                },
                //  Ext.define('Ext.ux.namaorgatasan_fPergerakanP', {
                //     extend: 'Ext.form.field.Trigger',
                //     alias: 'widget.namaorgatasan_fPergerakanP',
                //     editable: false,
                //     fieldLabel: 'Organisasi Atasan',
                //     allowBlank:false,
                //     id:'namaorgatasan_fPergerakanP',
                //     name: 'namaorgatasan',
                //     emptyText: 'Pilih Organisasi Atasan...',
                //     onTriggerClick: function() {
                //          wGridOrganisasiAtasanPergerakanPersonilListPopup.show();
                //          storeGridOrganisasiAtasanPergerakanPersonilList.load();
                //     }
                // }),
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Kode Organisasi Atasan',
                    id: 'kodeorgatasan_fPergerakanP',
                    name: 'kodeorgatasan',
                    readOnly: true
                }
                // , {
                //     xtype: 'displayfield',
                //     fieldLabel: 'Lokasi Atasan',
                //     id: 'lokasiatasan_fPergerakanP',
                //     name: 'lokasiatasan'
                // }
                ,{
                        xtype: 'displayfield',
                        fieldLabel: 'Status Pergerakan',
                        id: 'statuspergerakan_fPergerakanP',
                        name: 'statuspergerakan'
                }
            ]
        }]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupPergerakanPersonel');
            Ext.getCmp('formPergerakanPersonel').getForm().reset();
            win.hide();
        }
    }, {
        text: 'Diajukan',
        id:'BtnDiajukanPergerakan',
        handler: function() {
            kotakLoading();

           
            

            Ext.Ajax.request({
                url: SITE_URL + 'sistem/cekakses',
                method: 'POST',
                params: {
                    roleid: 169
                },
                success: function(formx, action) {
                    var d = Ext.decode(formx.responseText);
                    if(d.success)
                    {
                        var form = Ext.getCmp('formPergerakanPersonel').getForm();
                        if (form.isValid()) {
                            form.submit({
                                // url: SITE_URL + 'backend/saveform/PergerakanPersonil/personalia',
                                url: SITE_URL + 'personalia/saveProsesPergerakan2',
                                params: {
                                    statuspergerakan: 'Diajukan'
                                },
                                success: function(form, action) {
                                    Ext.Msg.alert('Success', action.result.message);
                                    // Ext.getCmp('formDataKaryawan').getForm().reset();
                                    Ext.getCmp('windowPopupPergerakanPersonel').hide();
                                    storeGridDataPergerakanPersonel.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    //                            storeGridPergerakanPersonel.load();
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
    },
    // {
    //     text: 'Proses',
    //     handler: function() {
    //         var form = this.up('form').getForm();
    //         if (form.isValid()) {
    //             form.submit({
    //                 url: SITE_URL + 'personalia/saveProsesPergerakan',
    //                 params: {
    //                     statuspergerakan: 'Proses'
    //                 },
    //                 success: function(form, action) {
    //                     Ext.Msg.alert('Success', action.result.message);
    //                     // Ext.getCmp('formDataKaryawan').getForm().reset();
    //                     Ext.getCmp('windowPopupPergerakanPersonel').hide();
    //                     storeGridDataPergerakanPersonel.load();
    //                 },
    //                 failure: function(form, action) {
    //                     Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //                     //                            storeGridPergerakanPersonel.load();
    //                 }
    //             });
    //         } else {
    //             Ext.Msg.alert("Error!", "Your form is invalid!");
    //         }
    //     }
    // },
    {
        text: 'Disetujui',
        id:'BtnDisetujuiPergerakan',
        handler: function() {
            kotakLoading();

             Ext.Ajax.request({
                url: SITE_URL + 'sistem/cekakses',
                method: 'POST',
                params: {
                    roleid: 172
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if(d.success)
                    {
                        var form = Ext.getCmp('formPergerakanPersonel').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: SITE_URL + 'personalia/saveProsesPergerakan2',
                                params: {
                                    statuspergerakan: 'Disetujui'
                                },
                                success: function(form, action) {
                                    Ext.Msg.alert('Success', action.result.message);
                                    // Ext.getCmp('formDataKaryawan').getForm().reset();
                                    Ext.getCmp('windowPopupPergerakanPersonel').hide();
                                    storeGridDataPergerakanPersonel.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    //                            storeGridPergerakanPersonel.load();
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
    },
    {
        text: 'Ditolak',
        disabled:true,
        id:'BtnDitolakPergerakan',
        handler: function() {
            kotakLoading();

             Ext.Ajax.request({
                url: SITE_URL + 'sistem/cekakses',
                method: 'POST',
                params: {
                    roleid: 173
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if(d.success)
                    {
                         var form = Ext.getCmp('formPergerakanPersonel').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: SITE_URL + 'personalia/saveProsesPergerakan',
                                params: {
                                    statuspergerakan: 'Ditolak'
                                },
                                success: function(form, action) {
                                    Ext.Msg.alert('Success', action.result.message);
                                    // Ext.getCmp('formDataKaryawan').getForm().reset();
                                    Ext.getCmp('windowPopupPergerakanPersonel').hide();
                                    storeGridDataPergerakanPersonel.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    //                            storeGridPergerakanPersonel.load();
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
    },
    {
        text: 'Simpan',
        id:'BtnUbahPergerakan',
        handler: function() {
            kotakLoading();

             Ext.Ajax.request({
                url: SITE_URL + 'sistem/cekakses',
                method: 'POST',
                params: {
                    roleid: 170
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if(d.success)
                    {
                        var form = Ext.getCmp('formPergerakanPersonel').getForm();
                        if (form.isValid()) {
                            form.submit({
                                // url: SITE_URL + 'backend/saveform/PergerakanPersonil/personalia',
                                url: SITE_URL + 'personalia/saveAtasanPergerakan',
                                success: function(form, action) {
                                    Ext.Msg.alert('Success', action.result.message);
                                    Ext.getCmp('windowPopupPergerakanPersonel').hide();
                                    storeGridDataPergerakanPersonel.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    //                            storeGridPergerakanPersonel.load();
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
