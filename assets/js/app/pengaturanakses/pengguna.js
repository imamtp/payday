
var formPengguna = Ext.create('Ext.form.Panel', {
    id: 'formPengguna',
    width: 450,
//    height: 300,
    url: SITE_URL + 'backend/saveform/Pengguna/pengaturanakses',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 170,
        anchor:'100%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformPengguna',
            id: 'statusformPengguna'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'user_id',
            name: 'user_id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Kode User',
            maxLength:30,
            allowBlank: false,
            id: 'usercode_fPengguna',
            name: 'usercode'
        },
        {
            xtype:'comboxsys_group',
            id:'comboxsys_group_fPengguna',
            allowBlank: false,
            listeners: {
                select: function() { 
                    // if(this.value=='Master Admin' || this.value=='Super Admin')
                    // {
                    //     Ext.getCmp('companyname_pengguna').hide();
                    //     Ext.getCmp('companycode_pengguna').hide();
                    // }
                }
            }
        },
        {
            xtype: 'hiddenfield',
            id: 'idcompany_fPengguna',
            name: 'idcompany'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Perusahaan',
            name: 'companyname',
            allowBlank:false,
            id: 'companyname_pengguna',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        if(Ext.getCmp('comboxsys_group_fPengguna').getValue()!='Super Admin')
                        {
                            wGridPenggunaCompanyListPopup.show();
                            storeGridPenggunaCompanyList.load();
                        }
                    });
                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Kode Perusahaan',
            readOnly:true,
            id: 'companycode_pengguna',
            name: 'companycode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Pengguna',
            maxLength:30,
            allowBlank: false,
            name: 'realname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Username Aplikasi',
            allowBlank: false,
            maxLength:20,
            name: 'username'
        },{
            xtype: 'textfield',
            inputType:'password',
            maxLength:224,
            fieldLabel: 'Password Aplikasi',
            allowBlank: false,
            name: 'password'
        },{
            xtype: 'textfield',
            vtype:'email',
            maxLength:50,
            fieldLabel: 'Email',
            allowBlank: false,
            name: 'email'
        },{
            xtype: 'datefield',
            format: 'd-m-Y',
            name:'startdate',
            id:'startdate_fPengguna',
            allowBlank: false,
            fieldLabel: 'Tgl Aktivasi'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name:'enddate',
            id:'enddate_fPengguna',
            fieldLabel: 'Tgl Terminasi'
        },{
            xtype:'comboxstatus',
            id:'comboxstatus_fPengguna',
            allowBlank: false
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPengguna');
                Ext.getCmp('formPengguna').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPenggunaSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPengguna').getForm().reset();
                            Ext.getCmp('windowPopupPengguna').hide();
                            storeGridPengguna.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPengguna.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPengguna = Ext.create('widget.window', {
    id: 'windowPopupPengguna',
    title: 'Form Pengguna',
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
    items: [formPengguna]
});

Ext.define('GridPenggunaModel', {
    extend: 'Ext.data.Model',
    fields: ['user_id','username','password','email','realname','usercode','status','startdate','group_name','enddate','companyname','companycode','userin','datein'],
    idProperty: 'id'
});

var storeGridPengguna = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPenggunaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Pengguna/pengaturanakses',
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
Ext.define('MY.searchGridPengguna', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPengguna',
    store: storeGridPengguna,
    width: 180
});
var smGridPengguna = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPengguna.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePengguna').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePengguna').enable();
        }
    }
});
Ext.define('GridPengguna', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridPengguna,
    title: 'Daftar Pengguna',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPenggunaID',
    id: 'GridPenggunaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPengguna',
    store: storeGridPengguna,
    loadMask: true,
    columns: [
        {header: 'user_id', dataIndex: 'user_id', hidden: true},
        {header: 'Kode User', dataIndex: 'usercode', minWidth: 150},
        {header: 'Nama Pengguna', dataIndex: 'realname', minWidth: 150,flex:1},
        {header: 'Username Aplikasi', dataIndex: 'username', minWidth: 150},
        // {header: 'Password Aplikasi', dataIndex: 'password', minWidth: 150},
        {header: 'Email', dataIndex: 'email', minWidth: 150},
        {header: 'Kode User', dataIndex: 'usercode', minWidth: 150},
        {header: 'Kelompok User', dataIndex: 'group_name', minWidth: 150},
        {header: 'Kode Perusahaan', dataIndex: 'companycode', minWidth: 150},
        {header: 'Nama Perusahaan', dataIndex: 'companyname', minWidth: 150},
        {header: 'Tgl Aktivasi', dataIndex: 'startdate', minWidth: 150},
        {header: 'Tgl Terminasi', dataIndex: 'enddate', minWidth: 150},
        {header: 'Status', dataIndex: 'status', minWidth: 150}
        // {header: 'user in', dataIndex: 'userin', minWidth: 150},
        // {header: 'date in', dataIndex: 'datein', minWidth: 150}
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
                                roleid: 33
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    wPengguna.show();
                                    Ext.getCmp('statusformPengguna').setValue('input');
                                   
                                    if(group_id==1)
                                    {
                                        //superadmin
                                        sys_groupStore.on('beforeload',function(store, operation,eOpts){
                                                operation.params={                  
                                                    'whereonly':'group_id:4'
                                                  };
                                              });
                                        sys_groupStore.load();
                                        Ext.getCmp('companyname_pengguna').setDisabled(true);
                                        Ext.getCmp('companycode_pengguna').setDisabled(true);

                                        Ext.getCmp('companyname_pengguna').hide();
                                        Ext.getCmp('companycode_pengguna').hide();
                                    } else {
                                        sys_groupStore.load();
                                        Ext.getCmp('usercode_fPengguna').setReadOnly(false);
                                        Ext.getCmp('comboxsys_group_fPengguna').setReadOnly(false);
                                        Ext.getCmp('companyname_pengguna').show();
                                        Ext.getCmp('companycode_pengguna').show();
                                        Ext.getCmp('startdate_fPengguna').setReadOnly(false);
                                        Ext.getCmp('enddate_fPengguna').setReadOnly(false);
                                        Ext.getCmp('comboxstatus_fPengguna').setReadOnly(false);
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
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 34
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                            var grid = Ext.ComponentQuery.query('GridPengguna')[0];
                                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                            var data = grid.getSelectionModel().getSelection();
                                            if (data.length == 0)
                                            {
                                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                            } else {
                                                //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                                                var formPengguna = Ext.getCmp('formPengguna');
                                                formPengguna.getForm().load({
                                                    url: SITE_URL + 'backend/loadFormData/Pengguna/1/pengaturanakses',
                                                    params: {
                                                        extraparams: 'a.user_id:' + selectedRecord.data.user_id
                                                    },
                                                    success: function(form, action) {
                                                        var d = Ext.decode(action.response.responseText);
                                                        if(d.data.group_id==4 || d.data.group_id==1)
                                                        {
                                                            Ext.getCmp('companyname_pengguna').setDisabled(true);
                                                            Ext.getCmp('companycode_pengguna').setDisabled(true);

                                                            Ext.getCmp('companyname_pengguna').hide();
                                                            Ext.getCmp('companycode_pengguna').hide();
                                                        } else {
                                                             Ext.getCmp('companyname_pengguna').setDisabled(false);
                                                            Ext.getCmp('companycode_pengguna').setDisabled(false);

                                                            Ext.getCmp('companyname_pengguna').show();
                                                            Ext.getCmp('companycode_pengguna').show();
                                                        }
                                                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                    }
                                                })

                                                wPengguna.show();
                                                Ext.getCmp('statusformPengguna').setValue('edit');
                                                sys_groupStore.load();

                                                if(group_id!=1)
                                                {
                                                    Ext.getCmp('usercode_fPengguna').setReadOnly(true);
                                                    //Ext.getCmp('comboxsys_group_fPengguna').setReadOnly(true);
                                                    Ext.getCmp('companyname_pengguna').setReadOnly(true);
                                                    Ext.getCmp('companycode_pengguna').setReadOnly(true);
                                                    Ext.getCmp('startdate_fPengguna').setReadOnly(true);
                                                    Ext.getCmp('enddate_fPengguna').setReadOnly(true);
                                                    Ext.getCmp('comboxstatus_fPengguna').setReadOnly(true);
                                                } else {
                                                    Ext.getCmp('usercode_fPengguna').setReadOnly(false);
                                                    //Ext.getCmp('comboxsys_group_fPengguna').setReadOnly(false);
                                                    Ext.getCmp('companyname_pengguna').setReadOnly(false);
                                                    Ext.getCmp('companycode_pengguna').setReadOnly(false);
                                                    Ext.getCmp('startdate_fPengguna').setReadOnly(false);
                                                    Ext.getCmp('enddate_fPengguna').setReadOnly(false);
                                                    Ext.getCmp('comboxstatus_fPengguna').setReadOnly(false);
                                                }
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
                    id: 'btnDeletePengguna',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'sistem/cekakses',
                            method: 'POST',
                            params: {
                                roleid: 35
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success)
                                {
                                    Ext.Msg.show({
                                            title: 'Confirm',
                                            msg: 'Delete Selected ?',
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn) {
                                                if (btn == 'yes') {
                                                    var grid = Ext.ComponentQuery.query('GridPengguna')[0];
                                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                                    var sm = grid.getSelectionModel();
                                                    // alert(group_id)
                                                    if(selectedRecord.data.group_name!='Super Admin' && group_id!=1)
                                                    {
                                                        selected = [];
                                                        Ext.each(sm.getSelection(), function(item) {
                                                            selected.push(item.data[Object.keys(item.data)[0]]);
                                                        });
                                                        Ext.Ajax.request({
                                                            url: SITE_URL + 'backend/ext_delete/Pengguna/pengaturanakses/hidden',
                                                            method: 'POST',
                                                            params: {postdata: Ext.encode(selected)}
                                                        });
                                                        storeGridPengguna.remove(sm.getSelection());
                                                        sm.select(0);
                                                    } else if(group_id==1)
                                                    {
                                                        selected = [];
                                                        Ext.each(sm.getSelection(), function(item) {
                                                            selected.push(item.data[Object.keys(item.data)[0]]);
                                                        });
                                                        Ext.Ajax.request({
                                                            url: SITE_URL + 'backend/ext_delete/Pengguna/pengaturanakses/hidden',
                                                            method: 'POST',
                                                            params: {postdata: Ext.encode(selected)}
                                                        });
                                                        storeGridPengguna.remove(sm.getSelection());
                                                        sm.select(0);
                                                    } else {
                                                         Ext.Msg.alert("Info", 'Akun Super Admin tidak bisa dihapus');
                                                    }
                                                    
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
                    xtype: 'searchGridPengguna',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPengguna, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPengguna.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPengguna = Ext.getCmp('formPengguna');
            wPengguna.show();
            formPengguna.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Pengguna/1/pengaturanakses',
                params: {
                    extraparams: 'a.user_id:' + record.data.user_id
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformPengguna').setValue('edit');
            sys_groupStore.load();
        }
    }
});
