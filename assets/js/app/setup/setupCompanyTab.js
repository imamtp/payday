Ext.define('TabSetupCompany', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.TabSetupCompany',
    activeTab: 0,
    items: [
        {
            xtype: 'companyData'
        },
        {
            xtype: 'GridSetupUnit'
        }
    ]
});