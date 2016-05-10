Ext.define('DaftarPerusahaanDepositModel', {
    extend: 'Ext.data.Model',
    fields: ['idsuperadmin','idcompany','productid','aggrementno','user_id','startdate','enddate','statusproduk','productname','productcode','price','usercode','realname','username','password','email','companyname','companycode','companyaddress','telp','fax','statususer','totalkaryawan'],
    idProperty: 'id'
});
var storeDaftarPerusahaanDeposit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'DaftarPerusahaanDepositModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/companydeposit',
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
Ext.define('MY.searchDaftarPerusahaanDeposit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchDaftarPerusahaanDeposit',
    store: storeDaftarPerusahaanDeposit,
    width: 180
});
var smGridSiswaGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSiswaGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSiswaGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSiswaGrid').enable();
        }
    }
});
Ext.define('GridDaftarPerusahaanDeposit', {
    itemId: 'GridDaftarPerusahaanDeposit',
    id: 'GridDaftarPerusahaanDeposit',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDaftarPerusahaanDeposit',
    store: storeDaftarPerusahaanDeposit,
    loadMask: true,
    columns: [{
        header: 'No Perjanjian',
        dataIndex: 'aggrementno'
    }, {
        header: 'Kode Perusahaan',
        dataIndex: 'companycode',
        minWidth: 150
    }, {
        header: 'Nama Perusahaan',
        dataIndex: 'companyname',
        flex:1,
        minWidth: 150
    },{
        align:'right',
        header: 'Total Karyawan',
        dataIndex: 'totalkaryawan',
        minWidth: 110
    },{
        header: 'productcode',
        hidden:true,
        dataIndex: 'productcode'
    }, {
        header: 'Nama Produk',
        dataIndex: 'productname',
        minWidth: 150
    }, {
        header: 'Harga',xtype:'numbercolumn',align:'right',
        dataIndex: 'price',
        minWidth: 150
    }, {
        header: 'Tgl Aktivasi',
        dataIndex: 'startdate',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'statusproduk',
        minWidth: 150
    }],
    dockedItems: [ {
        xtype: 'pagingtoolbar',
        store: storeDaftarPerusahaanDeposit, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                grid.store.on('load', function(store, records, options){
                    grid.getSelectionModel().select(0);     
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    getSummaryDeposit(selectedRecord.data.aggrementno);
                    // console.log(selectedRecord)
                  });
                storeDaftarPerusahaanDeposit.load();
                // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                // getSummaryDeposit(selectedRecord.data.aggrementno);
            }
        },
        itemclick: function(dv, record, item, index, e) {
//            console.log(record.data.idsiswa)
            storeGridHistoryDeposit.on('beforeload',function(store, operation,eOpts){
                   operation.params={
                               'extraparams': 'a.aggrementno:'+record.data.aggrementno
                             };
                         });
            storeGridHistoryDeposit.load();
            getSummaryDeposit(record.data.aggrementno);
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formSiswaGrid = Ext.getCmp('formSiswaGrid');
            wSiswaGrid.show();
            formSiswaGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/SiswaGrid/1',
                params: {
                    extraparams: 'a.idsiswa:' + record.data.idsiswa
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformSiswaGrid').setValue('edit');
        }
    }
});

function getSummaryDeposit(aggrementno)
{
    Ext.Ajax.request({
        url: SITE_URL + 'deposit/getSummaryDeposit',
        method: 'GET',
        params: {
            aggrementno: aggrementno
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            // Ext.getCmp('monthBeforeBtn').setDisabled(true);
            Ext.getCmp('balancedeposit').setValue(d.balance);
            Ext.getCmp('lastdatedeposit').setValue(d.depositdate);
            Ext.getCmp('lastamountdeposit').setValue(d.lastdeposit);
            Ext.getCmp('productname_deposit').setValue(d.productname);
            Ext.getCmp('productcode_deposit').setValue(d.productcode);
            Ext.getCmp('startdate_deposit').setValue(d.startdate);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}
