Ext.define('GridFormulaLemburListModel', {
    extend: 'Ext.data.Model',
    fields: ['idformulalembur','companyname','koderumuslembur','namarumuslembur','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridFormulaLemburList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridFormulaLemburListModel',
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

// storeGridAccount.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchFormulaLemburList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchFormulaLemburList',
    store: storeGridFormulaLemburList,
    width: 180
});

var smGridFormulaLemburList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridFormulaLemburList', {
    itemId: 'GridFormulaLemburList',
    id: 'GridFormulaLemburList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridFormulaLemburList',
    store: storeGridFormulaLemburList,
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
                    Ext.getCmp('idformulalembur_fRumusLembur').setValue(selectedRecord.get('idformulalembur'));
                    // Ext.getCmp('idcompany_fPergerakanP').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('namarumuslembur_fRumusLembur').setValue(selectedRecord.get('namarumuslembur'));

                    Ext.getCmp('wGridFormulaLemburListPopup').hide();
            }
        },
        {header: 'idformulalembur', dataIndex: 'idformulalembur', hidden: true},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Kode Formula', dataIndex: 'koderumuslembur', minWidth: 150},
        {header: 'Nama Formula', dataIndex: 'namarumuslembur', minWidth: 150},
        {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
        
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Detail',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.getCmp('BtnFormulaLemburSimpan').setDisabled(true);
                        var grid = Ext.ComponentQuery.query('GridFormulaLemburList')[0];
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
                                        } else {
                                            Ext.getCmp('komponenupahhariankerja').setDisabled(true);
                                            Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                            Ext.getCmp('angkatetaphariankerja').setDisabled(false);
                                        }
                                    } else {
                                        Ext.getCmp('jenisnilaihariankerja').setDisabled(true);
                                        Ext.getCmp('komponenupahhariankerja').setDisabled(true);
                                        Ext.getCmp('faktorpembagihariankerja').setDisabled(true);
                                        Ext.getCmp('angkatetaphariankerja').setDisabled(true);
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
                                                } else {
                                                    Ext.getCmp('komponenupahharianlibur').setDisabled(true);
                                                    Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                                    Ext.getCmp('angkatetapharianlibur').setDisabled(false);
                                                }
                                    } else {
                                        Ext.getCmp('jenisnilaiharianlibur').setDisabled(true);
                                        Ext.getCmp('komponenupahharianlibur').setDisabled(true);
                                        Ext.getCmp('faktorpembagiharianlibur').setDisabled(true);
                                        Ext.getCmp('angkatetapharianlibur').setDisabled(true);
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
                                        } else {
                                            Ext.getCmp('komponenupahharianraya').setDisabled(true);
                                            Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                            Ext.getCmp('angkatetapharianraya').setDisabled(false);
                                        }
                                    } else {
                                        Ext.getCmp('jenisnilaiharianraya').setDisabled(true);
                                        Ext.getCmp('komponenupahharianraya').setDisabled(true);
                                        Ext.getCmp('faktorpembagiharianraya').setDisabled(true);
                                        Ext.getCmp('angkatetapharianraya').setDisabled(true);
                                    }

                                    //////////////////////////////////TAB SATUAN JAM///////////////////////////////////
                                     if (d.statusjamkerja == 'Aktif') {
                                        Ext.getCmp('jenisnilaijamkerja').setDisabled(false);
                                        Ext.getCmp('jumlahjamkerja').setDisabled(false);
                                        Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                        Ext.getCmp('faktorpembagijamkerja').setDisabled(false);
                                        Ext.getCmp('angkatetapjamkerja').setDisabled(false);

                                        if (d.jenisnilaijamkerja == 'Komponen Upah') {
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(false);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(false);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                                    Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                                    Ext.getCmp('angkatetapjamkerja').setDisabled(false);
                                                }
                                    } else {
                                        Ext.getCmp('jenisnilaijamkerja').setDisabled(true);
                                        Ext.getCmp('jumlahjamkerja').setDisabled(true);
                                        Ext.getCmp('komponenupahjamkerja').setDisabled(true);
                                        Ext.getCmp('faktorpembagijamkerja').setDisabled(true);
                                        Ext.getCmp('angkatetapjamkerja').setDisabled(true);
                                    }


                                     if (d.statusjamlibur == 'Aktif') {
                                        Ext.getCmp('jenisnilaijamlibur').setDisabled(false);
                                        Ext.getCmp('jumlahjamlibur').setDisabled(false);
                                        Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                        Ext.getCmp('faktorpembagijamlibur').setDisabled(false);
                                        Ext.getCmp('angkatetapjamlibur').setDisabled(false);

                                         if (d.jenisnilaijamlibur == 'Komponen Upah') {
                                            Ext.getCmp('komponenupahjamlibur').setDisabled(false);
                                            Ext.getCmp('faktorpembagijamlibur').setDisabled(false);
                                            Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                        } else {
                                            Ext.getCmp('komponenupahjamlibur').setDisabled(true);
                                            Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                            Ext.getCmp('angkatetapjamlibur').setDisabled(false);
                                        }
                                    } else {
                                        Ext.getCmp('jenisnilaijamlibur').setDisabled(true);
                                        Ext.getCmp('jumlahjamlibur').setDisabled(true);
                                        Ext.getCmp('komponenupahjamlibur').setDisabled(true);
                                        Ext.getCmp('faktorpembagijamlibur').setDisabled(true);
                                        Ext.getCmp('angkatetapjamlibur').setDisabled(true);
                                    }


                                    if (d.statusjamraya == 'Aktif') {
                                        Ext.getCmp('jenisnilaijamraya').setDisabled(false);
                                        Ext.getCmp('jumlahjamraya').setDisabled(false);
                                        Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                        Ext.getCmp('faktorpembagijamraya').setDisabled(false);
                                        Ext.getCmp('angkatetapjamraya').setDisabled(false);

                                        if (d.jenisnilaijamraya == 'Komponen Upah') {
                                                Ext.getCmp('komponenupahjamraya').setDisabled(false);
                                                Ext.getCmp('faktorpembagijamraya').setDisabled(false);
                                                Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                            } else {
                                                Ext.getCmp('komponenupahjamraya').setDisabled(true);
                                                Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                                Ext.getCmp('angkatetapjamraya').setDisabled(false);
                                            }
                                    } else {
                                        Ext.getCmp('jenisnilaijamraya').setDisabled(true);
                                        Ext.getCmp('jumlahjamraya').setDisabled(true);
                                        Ext.getCmp('komponenupahjamraya').setDisabled(true);
                                        Ext.getCmp('faktorpembagijamraya').setDisabled(true);
                                        Ext.getCmp('angkatetapjamraya').setDisabled(true);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wFormulaLembur.show();
                            Ext.getCmp('statusformFormulaLembur').setValue('edit');
                            dasarKomponenUpahStore.load();

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
                                        
                                        // formInventory.findField('namaunitFormInvX').setValue(valUnit);
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                    }
                                });
                        }

                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchFormulaLemburList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridFormulaLemburList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridFormulaLemburListPopup = Ext.create('widget.window', {
    id: 'wGridFormulaLemburListPopup',
    title: 'Pilih Formula Lembur',
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
            xtype:'GridFormulaLemburList'
    }]
});