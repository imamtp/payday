Ext.define('GridBenefitListModel', {
    extend: 'Ext.data.Model',
     fields: ['idbenefit','idcompany','nip','kodebenefit','namabenefit','fungsipajak','kenapajak','hitungpajak','startdate','enddate','display','userin','usermod','datein','datemod'],
    idProperty: 'id'
});

var storeGridBenefitList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBenefitListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ConfigBenefitkary/kompensasi',
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

// storeGridBenefitList.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                      'extraparams': 'k.statuscalon:Disetujui'
//                   };
//                });

Ext.define('MY.searchBenefitList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchBenefitList',
    store: storeGridBenefitList,
    width: 180
});

var smGridBenefitList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridBenefitList', {
    itemId: 'GridBenefitList',
    id: 'GridBenefitList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridBenefitList',
    store: storeGridBenefitList,
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

                    Ext.Ajax.request({
                        url: SITE_URL + 'kompensasi/insertBenefitPegawai',
                        method: 'POST',
                        params: {
                            idpelamar: Ext.getCmp('idpelamar_dkaryawan').getValue(),
                            idbenefit: selectedRecord.get('idbenefit')
                        },
                        success: function(form, action) {
                            // var d = Ext.decode(form.responseText);
                            storeGridBenefitKaryawan.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });

                    Ext.getCmp('wGridBenefitListPopup').hide();
            }
        },
        {header: 'idbenefit', dataIndex: 'idbenefit', hidden: true},
        {header: 'NIP', dataIndex: 'nip', minWidth: 150},
        {header: 'Kode Benefit', dataIndex: 'kodebenefit', minWidth: 150},
        {header: 'Nama Benefit', dataIndex: 'namabenefit', minWidth: 150,flex:1}
        // {header: 'Tgl Mulai', dataIndex: 'startdate', minWidth: 150},
        // {header: 'Tgl Akhir', dataIndex: 'enddate', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchBenefitList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridBenefitList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridBenefitListPopup = Ext.create('widget.window', {
    id: 'wGridBenefitListPopup',
    title: 'Pilih Komponen Benefit',
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
            xtype:'GridBenefitList'
    }]
});
