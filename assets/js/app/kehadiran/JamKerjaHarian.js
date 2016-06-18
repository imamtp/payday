Ext.define('GridJamKerjaHarianModel', {
    extend: 'Ext.data.Model',
    fields: ['idjamkerjaharian','kodejamkerja','namajamkerja','jammasuk_jam','jammasuk_menit','jamkeluar_jam','jamkeluar_menit','toleransi_jam','toleransi_menit','mulaiistirahat_jam','mulaiistirahat_menit','akhiristirahat_jam','akhiristirahat_menit','toleransiistirahat_jam','toleransiistirahat_menit','status','userin','datein','companyname'],
    idProperty: 'id'
});

var storeGridJamKerjaHarian = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridJamKerjaHarianModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JamKerjaHarian/kehadiran',
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


var formJamKerjaHarian = Ext.create('Ext.form.Panel', {
    id: 'formJamKerjaHarian',
    width: 550,
//    height: 300,
    url: SITE_URL + 'backend/saveform/JamKerjaHarian/kehadiran',
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
    defaults: {
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    }
                },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformJamKerjaHarian',
            id: 'statusformJamKerjaHarian'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idjamkerjaharian',
            name: 'idjamkerjaharian'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode jam kerja',
            allowBlank: false,
            name: 'kodejamkerja'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama jam kerja',
            allowBlank: false,
            name: 'namajamkerja'
        },
         {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Kerja',
            combineErrors: false,
            defaults: {
                hideLabel: true,
                maxLength:2
            },
            items: [
               {
                   name : 'jammasuk_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'jammasuk_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: 's/d'
               },
               {
                   name : 'jamkeluar_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'jamkeluar_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               }
            ]
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Toleransi Keterlambatan',
            combineErrors: false,
            defaults: {
                hideLabel: true
            },
            items: [
               {
                   name : 'toleransi_menit',
                   xtype: 'numberfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: 'Menit'
               }
            ]
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Jam Istirahat',
            combineErrors: false,
            defaults: {
                hideLabel: true
            },
            items: [
               {
                   name : 'mulaiistirahat_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'mulaiistirahat_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: 's/d'
               },
               {
                   name : 'akhiristirahat_jam',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: ':'
               },
               {
                   name : 'akhiristirahat_menit',
                   xtype: 'textfield',
                   width: 50,
                   allowBlank: false
               }
            ]
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Toleransi Istirahat',
            combineErrors: false,
            defaults: {
                hideLabel: true
            },
            items: [
               {
                   name : 'toleransiistirahat_menit',
                   xtype: 'numberfield',
                   width: 50,
                   allowBlank: false
               },
               {
                   xtype: 'displayfield',
                   value: 'Menit'
               }
            ]
        },
        {
            xtype:'comboxstatus'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupJamKerjaHarian');
                Ext.getCmp('formJamKerjaHarian').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnJamKerjaHarianSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formJamKerjaHarian').getForm().reset();
                            Ext.getCmp('windowPopupJamKerjaHarian').hide();
                            storeGridJamKerjaHarian.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridJamKerjaHarian.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wJamKerjaHarian = Ext.create('widget.window', {
    id: 'windowPopupJamKerjaHarian',
    title: 'Form Jam Kerja Harian',
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
    items: [formJamKerjaHarian]
});


Ext.define('MY.searchGridJamKerjaHarian', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJamKerjaHarian',
    store: storeGridJamKerjaHarian,
    width: 180
});
var smGridJamKerjaHarian = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridJamKerjaHarian.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteJamKerjaHarian').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteJamKerjaHarian').enable();
        }
    }
});
Ext.define('GridJamKerjaHarian', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridJamKerjaHarian,
    title: 'Daftar Jam Kerja Harian',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridJamKerjaHarianID',
    id: 'GridJamKerjaHarianID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJamKerjaHarian',
    store: storeGridJamKerjaHarian,
    loadMask: true,
    columns: [
        {header: 'idjamkerjaharian', dataIndex: 'idjamkerjaharian', hidden: true},
        {header: 'Perusahaan', dataIndex: 'companyname', minWidth: 200},
        {header: 'kode jam kerja', dataIndex: 'kodejamkerja', minWidth: 150},
        {header: 'nama jam kerja', dataIndex: 'namajamkerja', minWidth: 150,flex:1},
        {header: 'Status', dataIndex: 'status', minWidth: 150},
        {header: 'user in', dataIndex: 'userin', minWidth: 150,hidden:true},
        {header: 'date in', dataIndex: 'datein', minWidth: 150,hidden:true}
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
                        wJamKerjaHarian.show();
                        Ext.getCmp('statusformJamKerjaHarian').setValue('input');
                    }
                },
                {
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridJamKerjaHarian')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formJamKerjaHarian = Ext.getCmp('formJamKerjaHarian');
                            formJamKerjaHarian.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/JamKerjaHarian/1/kehadiran',
                                params: {
                                    extraparams: 'a.idjamkerjaharian:' + selectedRecord.data.idjamkerjaharian
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wJamKerjaHarian.show();
                            Ext.getCmp('statusformJamKerjaHarian').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteJamKerjaHarian',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {


                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridJamKerjaHarian')[0];
                                    var sm = grid.getSelectionModel();
                                    console.log(sm.getSelection()[0].data.idjamkerjaharian)

                                    Ext.Ajax.request({
                                      url: SITE_URL + 'kehadiran/cekjamkerja',
                                      method: 'GET',
                                      params: {
                                          idjamkerjaharian: sm.getSelection()[0].data.idjamkerjaharian
                                      },
                                      success: function(form, action) {
                                          var d = Ext.decode(form.responseText);
                                          if(d.status)
                                          {
                                             selected = [];
                                             Ext.each(sm.getSelection(), function(item) {
                                                selected.push(item.data[Object.keys(item.data)[0]]);
                                            });
                                            Ext.Ajax.request({
                                                url: SITE_URL + 'backend/ext_delete/JamKerjaHarian/kehadiran/hidden',
                                                method: 'POST',
                                                params: {postdata: Ext.encode(selected)}
                                            });
                                            storeGridJamKerjaHarian.remove(sm.getSelection());
                                            sm.select(0);
                                          } else {
                                            Ext.Msg.alert('Failed','Tidak bisa menghapus jam kerja, karena sedang digunakan di Jadwal Kerja');
                                          }
                                      },
                                      failure: function(form, action) {
                                          Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                      }
                                  });

                                   
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridJamKerjaHarian',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridJamKerjaHarian, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJamKerjaHarian.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formJamKerjaHarian = Ext.getCmp('formJamKerjaHarian');
            wJamKerjaHarian.show();
            formJamKerjaHarian.getForm().load({
                url: SITE_URL + 'backend/loadFormData/JamKerjaHarian/1/kehadiran',
                params: {
                    extraparams: 'a.idjamkerjaharian:' + record.data.idjamkerjaharian
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformJamKerjaHarian').setValue('edit');
        }
    }
});
