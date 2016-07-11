Ext.define('GridPersonilNewJobListModel', {
     extend: 'Ext.data.Model',
   fields: ['idpelamar','ni','nik','namalengkap','idcompany','companyname','tgllahir','idjabatan','kodejabatan','namajabatan','levelnamejabatan','levelnameindividu','namalokasi','idorganisasi','kodeorg','namaorg','namalokasi','tglmasuk','tglberakhir','kekaryaanname'],
    idProperty: 'id'
});

var storeGridPersonilNewJobList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPersonilNewJobListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/personilnojob/personalia',
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



Ext.define('MY.searchPersonilNewJobList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPersonilNewJobList',
    store: storeGridPersonilNewJobList,
    width: 180
});

var smGridPersonilNewJobList = Ext.create('Ext.selection.CheckboxModel', {
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

Ext.define('GridPersonilNewJobList', {
    itemId: 'GridPersonilNewJobList',
    id: 'GridPersonilNewJobList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPersonilNewJobList',
    store: storeGridPersonilNewJobList,
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

                    Ext.getCmp('idpelamar_fPergerakanP_from').setValue(selectedRecord.get('idpelamar'));
                    // Ext.getCmp('idperkerjaan_fPergerakanP_from').setValue(selectedRecord.get('idpekerjaan'));
                    Ext.getCmp('idcompany_fPergerakanP_from').setValue(selectedRecord.get('idcompany'));
                    Ext.getCmp('namalengkap_fPergerakanP_from').setValue(selectedRecord.get('namalengkap'));
                    Ext.getCmp('companyname_fPergerakanP_from').setValue(selectedRecord.get('companyname'));
                    Ext.getCmp('nik_fPergerakanP_from').setValue(selectedRecord.get('nik'));


                    Ext.getCmp('wGridPersonilNewJobListPopup').hide();
            }
        },
        {header: 'idpelamar', dataIndex: 'idpelamar', hidden: true},
        // {header: 'NI', dataIndex: 'ni', minWidth: 100},
        {header: 'NIK', dataIndex: 'nik', minWidth: 100},
        {header: 'Nama lengkap', dataIndex: 'namalengkap', minWidth: 150,flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPersonilNewJobList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',displayMsg:'Menampilkan {0} - {1} dari {2}',
            store: storeGridPersonilNewJobList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wGridPersonilNewJobListPopup = Ext.create('widget.window', {
    id: 'wGridPersonilNewJobListPopup',
    title: 'Pilih Personil',
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
            xtype:'GridPersonilNewJobList'
    }]
});
