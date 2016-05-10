///////////////////////////////////////////////////////////////
Ext.define('TabPortDetailDeposit', {
    extend: 'Ext.tab.Panel',
    id: 'TabPortDetailDeposit',
    alias: 'widget.TabPortDetailDeposit',
    activeTab: 0,
    autoWidth: '100%',
    listeners: {
        render: function() {
            // alert('a');
            this.items.each(function(i){               
                i.tab.on('click', function(){

                    var grid = Ext.ComponentQuery.query('GridDaftarPerusahaanDeposit')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    if(i.title=='Riwayat Deposit')
                    {
                        storeGridHistoryDeposit.on('beforeload',function(store, operation,eOpts){
                               operation.params={
                                           'extraparams': 'a.aggrementno:'+selectedRecord.data.aggrementno
                                         };
                                     });
                        storeGridHistoryDeposit.load();
                    }

                });
            });
        }
    },
    items: [
        {
            xtype:'DetailFormDeposit'
        },
        {
            xtype: 'GridHistoryDeposit'
        }
    ]
});
///////////////////////////////////////////////////////////////
console.log(heightPort);

if(heightPort>=200 && heightPort<=220)
{
    var tinggiPort = 425;
} else 
if(heightPort>=240 && heightPort<=359)
{
    var tinggiPort = 425;
} else if(heightPort>=360 && heightPort<=410)
{
    var tinggiPort = 525;
} else {
    var tinggiPort = heightPort+50;
}

Ext.define('PortDeposit', {
    extend: 'Ext.Panel',
    alias: 'widget.PortDeposit',
    layout: 'border',
    bodyBorder: false,
    defaults: {
        // collapsible: true,
        split: true
    },
    items: [
    {
        region: 'south',
        flex:1,
        // height: tinggiPort+200,
        xtype:'TabPortDetailDeposit'
    }, {
        id:'panelDaftarPerusahaanDeposit',
        title: 'Daftar Perusahaan',
        // flex: 1,
        listeners: {
            collapse: function() {
                // console.log('colapse')
                Ext.getCmp('panelDaftarDeposit').setTitle('Data ');
            },
            expand: function() {
                Ext.getCmp('panelDaftarDeposit').setTitle('Daftar Deposit');
            }
        },
        collapsible: true,
        region: 'center',
        items: [{
            height: tinggiPort-180,
            xtype: 'GridDaftarPerusahaanDeposit'
        }]
    }]
});
