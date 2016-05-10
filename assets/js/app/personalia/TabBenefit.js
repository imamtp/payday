Ext.define('TabBenefit', {
    extend: 'Ext.tab.Panel',
    id: 'TabBenefit',
    alias: 'widget.TabBenefit',
    title:'Benefit',
    activeTab: 0,
    plain:true,
    // autoWidth: '90%',
    bodyPadding: 2,
    autoScroll: true,
    listeners: {
        render: function() {
            this.items.each(function(i){
                i.tab.on('click', function(){

                    var idpelamar = Ext.getCmp('idpelamar_dkaryawan').getValue();
                    if(i.title=='Identitas')
                    {

                    } else if(i.title=='Benefit')
                    {
                        
                    }

                });
            });
        }
    },
    items: [
      formBenefit,
      {
        xtype:'GridBenefitKaryawan',
        listeners: {
            activate: function() {                
                storeGridBenefitKaryawan.on('beforeload',function(store, operation,eOpts){
                operation.params={
                            'extraparams': 'a.idpelamar:'+Ext.getCmp('idpelamar_dkaryawan').getValue()
                          };
                      });
                storeGridBenefitKaryawan.load();
            }
        }
      }
    ]
});
