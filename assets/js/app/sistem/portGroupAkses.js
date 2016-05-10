// Ext.define('PortGroupAkses', {
//     extend: 'Ext.Panel',
//     alias: 'widget.PortGroupAkses',
//     layout: 'border',
//     defaults: {
//         // collapsible: true,
//         // split: true
//     },
//     items: [
//         {
//             region: 'east',
//             flex: 1,
//             split: true,
//             xtype: 'gridRules'
//         },
//         {
//             flex: 2,
//             region: 'center',
//             items: [
//                 {
//                     //            height:sizeH-50*1,
//                     xtype: 'GridTreeSysGroupAksesMenu'
//                 }
//             ]
//         }
//     ]
// });

var wSysGroupAksesMenu = Ext.create('widget.window', {
    id: 'wSysGroupAksesMenu',
    title: 'Hak Akses',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    // minWidth: 450,
    //    height: 350,
    autoHeight: true,
    layout: 'hbox',
    
    items: [
       {
            xtype: 'GridTreeSysGroupAksesMenu'
        }
    ]
});