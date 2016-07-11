
Ext.define('TabItemConfigFormulaLembur', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemConfigFormulaLembur',
    alias: 'widget.TabItemConfigFormulaLembur',
    activeTab: 0,
    plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    listeners: {
        render: function() {
            this.items.each(function(i){               
                i.tab.on('click', function(){
                    // alert(i.title);
                    // var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    // if(i.title=='Jadwal Pengupahan')
                    // {
                     
                    // } 

                });
            });
        }
    },
    items: [
        formSatuanHarian,
        formSatuanJam,
        formPeraturanPemerintah
    ]
});

    


var formFormulaLembur = Ext.create('Ext.form.Panel', {
    id: 'formFormulaLembur',
    width: 1200,
//    height: 300,
    url: SITE_URL + 'backend/saveform/FormulaLembur/kompensasi',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'50%'
//        width: 400
    },
    defaults: {
            anchor: '100%'
    },
    items: [
    {
        xtype: 'container',
        layout:'hbox',
        items:[{
            xtype: 'container',
            border:false,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'statusformFormulaLembur',
                        id: 'statusformFormulaLembur'
                    }, {
                        xtype: 'hiddenfield',
                        fieldLabel: 'idformulalembur',
                        name: 'idformulalembur'
                    },
                    {
                        xtype:'hiddenfield',
                        fieldLabel:'idcompany',
                        id:'idcompany_fFormulaLembur',
                        name:'idcompany'
                    },
                    Ext.define('Ext.ux.companyname_fFormulaLembur', {
                        labelWidth:140,
                        width:470,
                        extend: 'Ext.form.field.Trigger',
                        alias: 'widget.companyname_fFormulaLembur',
                        name: 'companyname',
                        editable: false,
                        id: 'companyname_fFormulaLembur',
                        fieldLabel: 'Perusahaan',
                        emptyText: 'Pilih Perusahaan...',
                        onTriggerClick: function() {
                             wGridCompanyFormulaLemburListPopup.show();
                             storeGridCompanyFormulaLemburList.load();
                        }
                    }),
                     {
                        xtype: 'textfield',
                        width:470,
                        fieldLabel: 'Kode Formula Lembur',
                        allowBlank: false,
                        name: 'koderumuslembur'
                    }, {
                        xtype: 'textfield',
                        width:470,
                        fieldLabel: 'Nama Formula Lembur',
                        allowBlank: false,
                        name: 'namarumuslembur'
                    }
            ]
        },{
            xtype: 'container',
            margins:'0px 0px 0px 5px',
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    name:'startdate',
                    allowBlank: false,
                    fieldLabel: 'Tgl Mulai Berlaku'
                }, {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    allowBlank: false,
                    name:'enddate',
                    fieldLabel: 'Tgl Akhir Berlaku'
                },
                {
                    xtype:'comboxJenisFormLembur',
                    id:'cb_comboxJenisFormLembur',
                    allowBlank: false,
                    listeners: {
                    select: function() {
                            setTabFormulaLembur(this.value);
                        }
                    }
                }
            ]
        },{
            xtype: 'container',
            margins:'0px 0px 0px 5px',
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
                {
                    xtype:'comboxYaTidak',
                    allowBlank: false,
                    fieldLabel: 'Masuk Pajak',
                    name:'kenapajak',
                    listeners: {
                        select: {
                            fn: function(combo, value) {
                                if(combo.getValue()=='YA')
                                {
                                    Ext.getCmp('comboxFungsiPajakConfigLembur').setDisabled(false);
                                } else {
                                    Ext.getCmp('comboxFungsiPajakConfigLembur').setDisabled(true);
                                }
                            }
                        }
                    }
                },
                {
                    xtype:'comboxFungsiPajak',
                    id:'comboxFungsiPajakConfigLembur',
                    allowBlank: false
                }
            ]
        }]
    },{
            xtype:'TabItemConfigFormulaLembur'
        }],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var win = Ext.getCmp('windowPopupFormulaLembur');
                Ext.getCmp('formFormulaLembur').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnFormulaLemburSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                // var formSatuanHarian = Ext.getCmp('formSatuanHarian').getForm().getFieldValues();
                if (form.isValid()) {
                    form.submit({
                        // params:{
                        //    formSatuanHarian:Ext.encode(formSatuanHarian) 
                        // },
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formFormulaLembur').getForm().reset();
                            Ext.getCmp('windowPopupFormulaLembur').hide();
                            storeGridformulalembur.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridformulalembur.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wFormulaLembur = Ext.create('widget.window', {
    id: 'windowPopupFormulaLembur',
    title: 'Form Formula Lembur',
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
    items: [formFormulaLembur]
});

Ext.define('GridformulalemburModel', {
    extend: 'Ext.data.Model',
    fields: ['idformulalembur','companyname','koderumuslembur','namarumuslembur','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridformulalembur = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridformulalemburModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/FormulaLembur/kompensasi',
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
Ext.define('MY.searchGridformulalembur', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridformulalembur',
    store: storeGridformulalembur,
    width: 180
});
var smGridformulalembur = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridformulalembur.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteFormulaLembur').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteFormulaLembur').enable();
        }
    }
});
Ext.define('Gridformulalembur', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridformulalembur,
    title: 'Formula Lembur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'Grididformulalembur',
    id: 'Grididformulalembur',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridformulalembur',
    store: storeGridformulalembur,
    loadMask: true,
    columns: [
        {header: 'idformulalembur', dataIndex: 'idformulalembur', hidden: true},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Kode Formula', dataIndex: 'koderumuslembur', minWidth: 150},
        {header: 'Nama Formula', dataIndex: 'namarumuslembur', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150},
        {header: 'date in', dataIndex: 'datein', minWidth: 150}
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
                                roleid: 148
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wFormulaLembur.show();
                                    Ext.getCmp('statusformFormulaLembur').setValue('input');
                                    dasarKomponenUpahStore.load();
                                    Ext.getCmp('BtnFormulaLemburSimpan').setDisabled(false);
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
                                roleid: 149
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    var grid = Ext.ComponentQuery.query('Gridformulalembur')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    } else {
                                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                        var formFormulaLembur = Ext.getCmp('formFormulaLembur');
                                        formFormulaLembur.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/FormulaLembur/1/kompensasi',
                                            params: {
                                                extraparams: 'a.idformulalembur:' + selectedRecord.data.idformulalembur
                                            },
                                            success: function(form, action) {
                                                var obj = Ext.decode(action.response.responseText);
                                                var d = obj.data;
                                                // console.log(obj.data)

                                                setTabFormulaLembur(obj.data.jenisformula);

                                                if (d.statushariankerja == 'Aktif') {
                                                    Ext.getCmp('jenisnilaihariankerja').setDisabled(false);
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(false);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(false);

                                                    if (d.jenisnilaihariankerja == 'Komponen Upah') {
                                                        Ext.getCmp('komponenupahhariankerja').setDisabled(false);
                                                        Ext.getCmp('faktorpembagihariankerja').setDisabled(false);
                                                        Ext.getCmp('angkatetaphariankerja').setDisabled(true);
                                                        Ext.getCmp('persentasehariankerja').setDisabled(true);
                                                    } else if (d.jenisnilaihariankerja == 'Nilai Tetap'){
                                                        Ext.getCmp('komponenupahhariankerja').setDisabled(true);
                                                        Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                                        Ext.getCmp('angkatetaphariankerja').setDisabled(false);
                                                        Ext.getCmp('persentasehariankerja').setDisabled(true);
                                                    } else {
                                                        //persentase
                                                        Ext.getCmp('komponenupahhariankerja').setDisabled(false);
                                                        Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                                        Ext.getCmp('angkatetaphariankerja').setDisabled(true);
                                                        Ext.getCmp('persentasehariankerja').setDisabled(false);
                                                    }

                                                } else {
                                                    Ext.getCmp('jenisnilaihariankerja').setDisabled(true);
                                                    Ext.getCmp('komponenupahhariankerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                                    Ext.getCmp('angkatetaphariankerja').setDisabled(true);
                                                    Ext.getCmp('persentasehariankerja').setDisabled(true);
                                                }

                                                if (d.statusharianlibur == 'Aktif') {
                                                    Ext.getCmp('jenisnilaiharianlibur').setDisabled(false);
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(false);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(false);

                                                     if (d.jenisnilaiharianlibur == 'Komponen Upah') {
                                                                Ext.getCmp('komponenupahharianlibur').setDisabled(false);
                                                                Ext.getCmp('faktorpembagiharianlibur').setDisabled(false);
                                                                Ext.getCmp('angkatetapharianlibur').setDisabled(true);
                                                                Ext.getCmp('persentaseharianlibur').setDisabled(true);
                                                            } else if (d.jenisnilaiharianlibur == 'Nilai Tetap') {
                                                                Ext.getCmp('komponenupahharianlibur').setDisabled(true);
                                                                Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                                Ext.getCmp('angkatetapharianlibur').setDisabled(false);
                                                                Ext.getCmp('persentaseharianlibur').setDisabled(true);
                                                            } else {
                                                                Ext.getCmp('komponenupahharianlibur').setDisabled(false);
                                                                Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                                Ext.getCmp('angkatetapharianlibur').setDisabled(true);
                                                                Ext.getCmp('persentaseharianlibur').setDisabled(false);
                                                            }
                                                } else {
                                                    Ext.getCmp('jenisnilaiharianlibur').setDisabled(true);
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(true);
                                                    Ext.getCmp('persentaseharianlibur').setDisabled(true);
                                                }



                                                if (d.statusharianraya == 'Aktif') {
                                                    Ext.getCmp('jenisnilaiharianraya').setDisabled(false);
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(false);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(false);

                                                    if (d.jenisnilaiharianraya == 'Komponen Upah') {
                                                        Ext.getCmp('komponenupahharianraya').setDisabled(false);
                                                        Ext.getCmp('faktorpembagiharianraya').setDisabled(false);
                                                        Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                                        Ext.getCmp('persentaseharianraya').setDisabled(true);
                                                    } else if (d.jenisnilaiharianraya == 'Nilai Tetap') {
                                                        Ext.getCmp('komponenupahharianraya').setDisabled(true);
                                                        Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                                        Ext.getCmp('angkatetapharianraya').setDisabled(false);
                                                        Ext.getCmp('persentaseharianraya').setDisabled(true);
                                                    } else {
                                                        Ext.getCmp('komponenupahharianraya').setDisabled(false);
                                                        Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                                        Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                                        Ext.getCmp('persentaseharianraya').setDisabled(false);
                                                    }

                                                } else {
                                                    Ext.getCmp('jenisnilaiharianraya').setDisabled(true);
                                                    Ext.getCmp('komponenupahharianraya').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                                    Ext.getCmp('persentaseharianraya').setDisabled(true);
                                                }

                                                //////////////////////////////////TAB SATUAN JAM///////////////////////////////////
                                                 if (d.statusjamkerja == 'Aktif') {
                                                    Ext.getCmp('jenisnilaijamkerja').setDisabled(false);
                                                    Ext.getCmp('jumlahjamkerja').setDisabled(false);
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(false);
                                                    Ext.getCmp('persentasejamkerja').setDisabled(false);

                                                    if (d.jenisnilaijamkerja == 'Komponen Upah') {
                                                                Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                                                Ext.getCmp('faktorpembagijamkerja').setDisabled(false);
                                                                Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                                                Ext.getCmp('persentasejamkerja').setDisabled(true);
                                                    } else if (d.jenisnilaijamkerja == 'Nilai Tetap'){
                                                            Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                                            Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                            Ext.getCmp('angkatetapjamkerja').setDisabled(false);
                                                            Ext.getCmp('persentasejamkerja').setDisabled(true);
                                                        } else {
                                                                Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                                                Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                                Ext.getCmp('angkatetapjamkerja').setDisabled(false);
                                                                Ext.getCmp('persentasejamkerja').setDisabled(false);
                                                            }

                                                } else {
                                                    Ext.getCmp('jenisnilaijamkerja').setDisabled(true);
                                                    Ext.getCmp('jumlahjamkerja').setDisabled(true);
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                                    Ext.getCmp('persentasejamkerja').setDisabled(true);
                                                }


                                                 if (d.statusjamlibur == 'Aktif') {
                                                    Ext.getCmp('jenisnilaijamlibur').setDisabled(false);
                                                    Ext.getCmp('jumlahjamlibur').setDisabled(false);
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(false);
                                                    Ext.getCmp('persentasejamlibur').setDisabled(false);

                                                     if (d.jenisnilaijamlibur == 'Komponen Upah') {
                                                        Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                                        Ext.getCmp('faktorpembagijamlibur').setDisabled(false);
                                                        Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                                        Ext.getCmp('persentasejamlibur').setDisabled(true);
                                                    } else if (d.jenisnilaijamlibur == 'Nilai Tetap'){
                                                            Ext.getCmp('komponenupahjamlibur').setDisabled(true);
                                                            Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                                            Ext.getCmp('angkatetapjamlibur').setDisabled(false);
                                                            Ext.getCmp('persentasejamlibur').setDisabled(true);
                                                        } else {
                                                            Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                                            Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                                            Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                                            Ext.getCmp('persentasejamlibur').setDisabled(false);
                                                        }

                                                } else {
                                                    Ext.getCmp('jenisnilaijamlibur').setDisabled(true);
                                                    Ext.getCmp('jumlahjamlibur').setDisabled(true);
                                                    Ext.getCmp('komponenupahjamlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                                    Ext.getCmp('persentasejamlibur').setDisabled(false);
                                                }


                                                if (d.statusjamraya == 'Aktif') {
                                                    Ext.getCmp('jenisnilaijamraya').setDisabled(false);
                                                    Ext.getCmp('jumlahjamraya').setDisabled(false);
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(false);
                                                    Ext.getCmp('persentasejamraya').setDisabled(false);

                                                    if (d.jenisnilaijamraya == 'Komponen Upah') {
                                                            Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                            Ext.getCmp('faktorpembagijamraya').setDisabled(false);
                                                            Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                                            Ext.getCmp('persentasejamraya').setDisabled(true);
                                                        } else if (d.jenisnilaijamraya == 'Nilai Tetap'){
                                                                Ext.getCmp('komponenupahjamraya').setDisabled(true);
                                                                Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                                Ext.getCmp('angkatetapjamraya').setDisabled(false);
                                                                Ext.getCmp('persentasejamraya').setDisabled(true);
                                                            } else {
                                                                    Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                                    Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                                                    Ext.getCmp('persentasejamraya').setDisabled(false);
                                                                }
                                                } else {
                                                    Ext.getCmp('jenisnilaijamraya').setDisabled(true);
                                                    Ext.getCmp('jumlahjamraya').setDisabled(true);
                                                    Ext.getCmp('komponenupahjamraya').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                                    Ext.getCmp('persentasejamraya').setDisabled(true);
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        })

                                        wFormulaLembur.show();
                                        Ext.getCmp('statusformFormulaLembur').setValue('edit');
                                        dasarKomponenUpahStore.load();

                                        Ext.getCmp('BtnFormulaLemburSimpan').setDisabled(false);

                                         Ext.Ajax.request({
                                                url: SITE_URL+'kompensasi/getdasarkomponenupahLembur',
                                                method: 'POST',
                                                params: { idformulalembur: selectedRecord.data.idformulalembur },
                                                success: function(form, action) {
                                                    console.log(action)
                                                    var obj = Ext.decode(form.responseText);
                                                    // var komponenupahhariankerja = obj.komponenupahhariankerja;
                                                    // console.log(obj)
                                                    // var str = form.responseText;
                                                    // var valUnit = str.split(',');
                                                    if(obj.komponenupahhariankerja!=null)
                                                    {
                                                        Ext.getCmp('komponenupahhariankerja').setValue(obj.komponenupahhariankerja.split(','));
                                                    }
                                                    if(obj.komponenupahharianlibur!=null)
                                                    {
                                                        Ext.getCmp('komponenupahharianlibur').setValue(obj.komponenupahharianlibur.split(','));
                                                    }
                                                    if(obj.komponenupahharianraya!=null)
                                                    {
                                                        Ext.getCmp('komponenupahharianraya').setValue(obj.komponenupahharianraya.split(','));
                                                    }

                                                    //jaman
                                                    if(obj.komponenupahjamkerja!=null)
                                                    {
                                                        Ext.getCmp('komponenupahjamkerja').setValue(obj.komponenupahjamkerja.split(','));
                                                    }
                                                    if(obj.komponenupahjamlibur!=null)
                                                    {
                                                        Ext.getCmp('komponenupahjamlibur').setValue(obj.komponenupahjamlibur.split(','));
                                                    }
                                                    if(obj.komponenupahjamraya!=null)
                                                    {
                                                        Ext.getCmp('komponenupahjamraya').setValue(obj.komponenupahjamraya.split(','));
                                                    }
                                                    //end jaman

                                                    //pemerintah
                                                    if(obj.komponenupahpemerintah!=null)
                                                    {
                                                        Ext.getCmp('komponenupahpemerintah').setValue(obj.komponenupahpemerintah.split(','));
                                                    }
                                                    
                                                    // formInventory.findField('namaunitFormInvX').setValue(valUnit);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            });
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
                    id: 'btnDeleteFormulaLembur',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 150
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
                                                var grid = Ext.ComponentQuery.query('Gridformulalembur')[0];
                                                var sm = grid.getSelectionModel();
                                                selected = [];
                                                Ext.each(sm.getSelection(), function(item) {
                                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                                });
                                                Ext.Ajax.request({
                                                    url: SITE_URL + 'backend/ext_delete/FormulaLembur/kompensasi/hidden',
                                                    method: 'POST',
                                                    params: {postdata: Ext.encode(selected)}
                                                });
                                                storeGridformulalembur.remove(sm.getSelection());
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
                    xtype: 'searchGridformulalembur',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridformulalembur, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridformulalembur.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            // var formFormulaLembur = Ext.getCmp('formFormulaLembur');
            // wFormulaLembur.show();
            // formFormulaLembur.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/FormulaLembur/1/kompensasi',
            //     params: {
            //         extraparams: 'a.idformulalembur:' + record.data.idformulalembur
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })

            // Ext.getCmp('statusformFormulaLembur').setValue('edit');
            // dasarKomponenUpahStore.load();
        }
    }
});


function setTabFormulaLembur(val)
{
      var TabItemConfigFormulaLembur = Ext.getCmp('TabItemConfigFormulaLembur');
                        
    // TabItemConfigFormulaLembur.items.getAt(0).setDisabled(true);
    // alert(this.value);
       if(val=='Satuan Harian')
       {
            TabItemConfigFormulaLembur.items.getAt(0).setDisabled(false);
            TabItemConfigFormulaLembur.items.getAt(1).setDisabled(true);
            TabItemConfigFormulaLembur.items.getAt(2).setDisabled(true);
            TabItemConfigFormulaLembur.setActiveTab(0);
       } else if(val=='Satuan Jam')
           {
                TabItemConfigFormulaLembur.items.getAt(0).setDisabled(true);
                TabItemConfigFormulaLembur.items.getAt(1).setDisabled(false);
                TabItemConfigFormulaLembur.items.getAt(2).setDisabled(true);
                TabItemConfigFormulaLembur.setActiveTab(1);
           } else {
                    TabItemConfigFormulaLembur.items.getAt(0).setDisabled(true);
                    TabItemConfigFormulaLembur.items.getAt(1).setDisabled(true);
                    TabItemConfigFormulaLembur.items.getAt(2).setDisabled(false);
                    TabItemConfigFormulaLembur.setActiveTab(2);
               }
}