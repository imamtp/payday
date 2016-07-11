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
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchFormulaLemburList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
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