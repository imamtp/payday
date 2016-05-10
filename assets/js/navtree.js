function treestore(id)
{
    var treestore = new Ext.data.TreeStore({
        proxy: {
            type: 'ajax',
            url: 'dashboard/getTreeMenu/' + id + '/'
        },
        root: {
            text: 'Ext JS',
            id: '0',
            expanded: true
        },
        // folderSort: true,
        // sorters: [{
        //     property: 'text',
        //     direction: 'ASC'
        // }]
    });
    return treestore
}

if (curnipeg == '')
{
    var DashboardPage = Ext.create('Ext.Component', {
        border: false,
        xtype: "component",
        title: "Dashboard",
        autoEl: {
            tag: "iframe",
            src: "dashboard/page"
        }, listeners: {
            maximize: function(window, opts) {
                var the_iframe = DashboardPage.getEl().dom;
                the_iframe.contentWindow.location.reload();
            },
            restore: function(window, opts) {
                console.log('res')
                var the_iframe = DashboardPage.getEl().dom;
                the_iframe.contentWindow.location.reload();
            }
        }

    });


} else {
    var DashboardPage = {
        id: 'tabcontent',
        contentEl: 'center2',
        title: 'Dashboard'
                // closable: true
    }
}


var items = [DashboardPage];

var tabPanel = Ext.createWidget('tabpanel', {
    // border: true,   
    autoScroll: true,
    itemId: Ext.id(),
    id: Ext.id(),
    // renderTo: Ext.getBody(),
    region: 'center',
    resizeTabs: true,
    enableTabScroll: true,
    // width: 600,
    // height: 600,
    closeAction: 'hide',
    defaults: {
        // closeAction: 'hide',
        // autoScroll: true,
        bodyPadding: 3
    },
    items: items,
    // destroyOnClose: false,

});

function closeAllTab()
{
//    tabPanel.removeAll();  
    tabPanel.items.each
            (
                    function(item)
                    {
                        if (item.closable)
                        {
                            tabPanel.remove(item);
                        }
                    }
            );
}

function addTab(title, menu_link) {
    var id = tabPanel.items.length;
    console.log(menu_link);
    // console.log(Offline.check());
    if (menu_link != null)
    {
        var tab = tabPanel.getComponent(title);
        // if (menu_link == 'inputInventory')
        // {
        //     menu_link = 'Input Persediaan Baru';
        //     showInputInv();
        // } else if (menu_link == 'input_lembur')
        // {
        //     wLembur.show();
        // } else if (menu_link == 'input_lembur_fix')
        // {
        //     wLemburFixAmount.show();
        // } else if (menu_link == 'input_cuti')
        // {
        //     wCuti.show();
        // } else if (menu_link == 'input_persediaan_awal')
        // {
        //     showInputInv();     
        //     // Ext.getCmp('fieldsetInvBuy').setDisabled(true);
        //     // Ext.getCmp('fieldsetInvSell').setDisabled(true);                   
        //     Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
        //     Ext.getCmp('fieldsetInvPersediaan').show();
        //     storeGridAccInv.removeAll();
        //     storeGridAccInv.sync();

            

        //     var formInventoryV2 = Ext.getCmp('formInventoryV2').getForm();
        //     formInventoryV2.findField('nilaibuku').hide();
        //     formInventoryV2.findField('akumulasiAkhir').hide();
        //     formInventoryV2.findField('cbpersediaan').show();
        //     formInventoryV2.findField('cbpersediaan').setDisabled(false);
        //     // Ext.getCmp('fieldsetInvPersediaan').hide();
        //     Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(true);

        //     formInventoryV2.reset();
        // } else {

            
                if (!Ext.isDefined(tab)) {
                    var tab = tabPanel.add({
                        // id:Ext.id(),
                        title: title,
                        itemId: title,
                        layout: 'fit',
                        border: true,
                        autoScroll: true,
                        closeAction: 'hide',
                        closable: true,
                        listeners:{
                            close: function() {
                                if(menu_link=='PortProsesGaji')
                                {
                                   //hapus tabel gaji sementara
                                    // Ext.Ajax.request({
                                    //     url: SITE_URL + 'penggajian/deletePayrollListTmp',
                                    //     method: 'GET'
                                    // });
                                }
                            }
                        },
                        border: false,
                                items: [
                                    {
                                        xtype: menu_link,
                                        autoDestroy: false,
                                        // isDestroyed:false
                                    }
                                ]
                    });

                    tabPanel.doLayout();
                } else {

                    //tab sudah ada
                     if(menu_link=='PortProsesGaji')
                        {
                           // hapus tabel gaji sementara
                            Ext.Ajax.request({
                                url: SITE_URL + 'penggajian/deletePayrollListTmp',
                                method: 'GET'
                            });
                        }
                }

                tabPanel.setActiveTab(tab);
           
            
        // }

    }
}



var treeNavigation = Ext.create('Ext.tree.Panel', {
    id: 'navTreePanel',
    autoHeight: true,
    singleExpand: singleexpand,
    width: 340,
    store: treestore(0)
    , listeners: {
        itemclick: {
            fn: function(view, record, item, index, evt, eOpts) {
                 // record.isExpanded() ? record.collapse() : record.expand();

                if(outofbalance=='false' || record.get('text')=='Deposit')
                {
                    addTab(record.get('text'), record.get('hrefTarget'));
                } else {
                    Ext.Msg.alert('Info Billing','Maaf, saldo anda tidak mencukupi. Silahkan lakukan deposit terlebih dahulu untuk melanjutkan. <br><br> Sisa Saldo: '+balance);
                }
            }
        }
    }
    , rootVisible: false
});

function collapsenav()
{
    treeNavigation.collapseAll();
}

function expandnav()
{
    treeNavigation.expandAll();
}