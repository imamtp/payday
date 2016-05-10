function setSequenceID(fieldID, seqField, seqName)
{
    Ext.Ajax.request({
        url: SITE_URL + 'backend/getSequence',
        method: 'POST',
        params: {
            seqName: seqName,
            seqField: seqField
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp(fieldID).setValue(d.message);
        },
        failure: function(form, action) {
            Ext.getCmp(fieldID).setValue('Get sequence failure!');
        }
    });
}



function disableUnitInventory()
{
    //buat disable combo box unit untuk user selain superuser/administrator
    if(group_id!=99)
    {   
        //grid all inventory
//        Ext.getCmp('cbUnitInvAll').setDisabled(true);
//        Ext.getCmp('cbUnitInv').setDisabled(true);
//        Ext.getCmp('cbUnitInvBuy').setDisabled(true);
//        Ext.getCmp('cbUnitInvSell').setDisabled(true);
//        //form inventory
//         var form = Ext.ComponentQuery.query('FormProfile')[0];
//        form.getForm().findField("namaunitFormInv").setReadOnly(true);
        

    }
}

function disableUnitJournal()
{
    if(group_id!=99)
    { 
//        Ext.getCmp('idunitJGeneral').setDisabled(true);
    }
}

function disableUnitTreeAcc()
{
    if(group_id!=99)
    {
//        Ext.getCmp('cbUnitTreeAccount').setDisabled(true);   
    }
}

function disableEntryJournal()
{
    if(group_id!=99)
    {
//        storeUnit.load();
//       Ext.getCmp('cbUnitEntryJournal').setReadOnly(true);   
//       Ext.getCmp('cbUnitEntryJournal').setValue(namaunit);      
          
    }     
}

function disableEntryPurchase()
{
    if(group_id!=99)
    {
//        storeUnit.load();
//       Ext.getCmp('cbUnitEntryPurchase').setReadOnly(true);   
//       Ext.getCmp('cbUnitEntryPurchase').setValue(namaunit);      
          
    }     
}

function datenow()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
}

function insertNoRef(type,el,prefix)
{
    if(prefix==null)
    {
        prefix='NO';
    }

    Ext.Ajax.request({
        url: SITE_URL + 'setup/getseq',
        method: 'GET',
        params: {
            type: type,
            prefix:prefix
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp(el).setValue(d.noref);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
    
}

function cekAkses(btn)
{
    Ext.Ajax.request({
        url: SITE_URL + 'sistem/cekAkses',
        params: {
            id: btn,
        },
        success: function(response){
             if(response.responseText=='TIDAK')
             {
                  Ext.Msg.alert('Hak Akses', 'Maaf, anda tidak mempunyai hak akses untuk melanjutkan proses ini.');
             } else {
                 
             }
         },
        failure: function(form, action) {
            Ext.Msg.alert('Hak Akses', 'Cek Hak Akses Gagal, Silahkan coba lagi.');
        }
    });
}

function kotakLoading()
{
    var msgBox = Ext.MessageBox.show({
       left:5, // mention initial positioning with left and top config.
       top:5,
       msg: 'Sedang Memproses Data...',
       progressText: 'Saving...',
       width:300,
       wait:true,
       waitConfig: {interval:200},
       animateTarget: 'waitButton'
    });

    // box.getDialog().setPosition(x,y)

     msgBox.getPositionEl().setTop(5);
}