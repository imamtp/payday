<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Natadaya HRIS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="{$assets_url}/css/icons.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{$assets_url}/ext/resources/css/TabScrollerMenu.css" />
        <link rel="stylesheet" type="text/css" href="{$assets_url}/css/offline-theme-slide.css" />
        <link rel="stylesheet" type="text/css" href="{$assets_url}/css/offline-language-english-indicator.css" />
        <style type="text/css">
            p {
                margin:5px;
            }
            a {
                text-decoration: none;
            }
            body {
                background-color:#b0c4de;
            }
            .child-row .x-grid-cell {
                background-color: #ffe2e2;
                color: #900;
            }

            .adult-row .x-grid-cell {
                background-color: #e2ffe2;
                color: #090;
            }

            .journal-row .x-grid-cell {
                background-color: #f6f7ff;

            }

            .background-header {
              background-color: #FF0000;
            }​
        </style>

        <script type="text/javascript">
            var SITE_URL = '{$site_url}';
            var BASE_URL = '{$base_url}';
            var pegawainid;
            var curnipeg = '';
            var namaunit = '{$unit}';
            var idunit = '{$idunit}';
            var idcompany = '{$idcompany}';
            var group_id = '{$group_id}';
            var logoheader = '{$logoheader}';
            var companyname = '{$companyname}';
            // alert(companyname)
            var outofbalance = '{$outofbalance}';
            var balance = '{$balance}';

            if(group_id==1)
            {
                var singleexpand = false;
            } else {
                var singleexpand = true;
            }
        </script>

        <script src='{$assets_url}/ext/ext-all.js'></script>
        <!-- {*        <link rel="stylesheet" type="text/css" href="{$assets_url}ext/resources/css/ext-all-gray.css">*} -->
        <script src='{$assets_url}/ext/ext-theme-neptune.js'></script>

        <script src='{$assets_url}/js/SearchField4.js'></script>
        <script src='{$assets_url}/ext/src/ux/TabScrollerMenu.js'></script>
        <script src='{$assets_url}/js/app/combox.js'></script>
        <script src='{$assets_url}/js/util.js'></script>
        <script src='{$assets_url}/js/offline.min.js'></script>
        <script src='{$assets_url}/ext/NumericField.js'></script>


        <script src='{$assets_url}/js/app/pengaturan.js'></script>
        <script src='{$assets_url}/js/app/sistem/UserManagement.js'></script>


        <script src='{$assets_url}/js/navtree.js'></script>
        <script src='{$assets_url}/js/moment-develop/min/moment.min.js'></script>
        <link href="{$assets_url}/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
    </head>
    <body>

        <script type="text/javascript">

            Ext.require(['*']);

            //disable backspace key
            Ext.EventManager.on(window, 'keydown', function(e, t) {
                if (e.getKey() == e.BACKSPACE && (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly)) {
                    e.stopEvent();
                }
            });

            Ext.define('Override.toolbar.Paging', {
                override : 'Ext.toolbar.Paging',
                emptyMsg: 'Belum ada data'
            });

            var windowH = Ext.getBody().getViewSize().height;
            if (windowH <= 682)
            {
                //laptop 14'
                var sizeH = windowH - 100;
            } else if (windowH > 682) {
                //desktop
                var sizeH = windowH - 200;
            }

            var heightPort = (windowH*1)/(2*1)-90*1;
            // console.log(heightPort)

            var panelHeight =  Ext.getBody().getViewSize().height*0.7;
            // alert(panelHeight);
            Ext.onReady(function() {

                Ext.QuickTips.init();


                var rTabPanel = Ext.create('Ext.tab.Panel', {
                    hidden: true,
                    id: 'rTabPanel',
                    xtype: 'tabpanel',
                    region: 'east',
                    title: 'East Side',
                    dockedItems: [{
                            dock: 'top',
                            xtype: 'toolbar',
                            items: ['->', {
                                    xtype: 'button',
                                    text: 'test',
                                    tooltip: 'Test Button'
                                }]
                        }],
                    animCollapse: true,
                    collapsible: true,
                    split: true,
                    width: 225, // give east and west regions a width
                    minSize: 175,
                    maxSize: 400,
                    margins: '0 5 0 0',
                    activeTab: 1,
                    tabPosition: 'bottom',
                    items: [{
                            html: '<p>A TabPanel component can be a region.</p>',
                            title: 'A Tab',
                            autoScroll: true
                        }, Ext.create('Ext.grid.PropertyGrid', {
                            title: 'Property Grid',
                            closable: true,
                            source: {
                                "(name)": "Properties Grid",
                                "grouping": false,
                                "autoFitColumns": true,
                                "productionQuality": false,
                                "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                                "tested": false,
                                "version": 0.01,
                                "borderWidth": 1
                            }
                        })]
                });

                if(logoheader=='' || logoheader==null)
                {
                    var htmlHeader = "&nbsp;&nbsp;<font style='font-size:22px;color:#FFFFF0;'>{$companyname}</font><div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> ";
                } else {
                    var htmlHeader = "&nbsp;&nbsp;<img src={$base_url}/upload/{$logoheader} height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> ";
                }

                var viewport = Ext.create('Ext.Viewport', {
                    id: 'border-example',
                    layout: 'border',
                     // bodyStyle:'background-color: #FFFFFF;',
                    items: [
                        // create instance immediately
                        Ext.create('Ext.Component', {
                            region: 'north',
                            baseCls: 'x-plain',
                            // tbar:menu,
                            height: 62, // give north and south regions a height
                            autoEl: {
                                tag: 'div',
                                html: htmlHeader
                            }
                        }),
                         {
                            // lazily created panel (xtype:'panel' is default)
                            hidden: true,
                            id: 'south-panel',
                            region: 'south',
                            contentEl: 'south',
                            split: true,
                            height: 100,
                            minSize: 100,
                            maxSize: 200,
                            collapsible: true,
                            collapsed: true,
                            title: 'South',
                            margins: '0 0 0 0'
                        }, rTabPanel, {
                            region: 'west',
                            stateId: 'navigation-panel',
                            id: 'west-panel', // see Ext.getCmp() below
                            title: 'Navigasi',
                            split: true,
                            width: 270,
                            minWidth: 172,
                            maxWidth: 400,
                            collapsible: true,
                            animCollapse: true,
                            margins: '0 0 0 5',
                            layout: 'accordion',
                            defaults: {
                                // closeAction: 'hide',
                                autoScroll: true
                                        // bodyPadding: 3
                            }
                            , dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    items: [
                                        {
                                            xtype: 'button',
//                            width:100,
                                            handler: function(button, event) {
                                                expandnav();
                                            },
                                            flex: 1,
                                            text: 'Buka'
                                        }, {
                                            xtype: 'button',
                                            handler: function(button, event) {
                                                collapsenav();
                                            },
                                            flex: 1,
                                            text: 'Tutup'
                                        }, {
                                            xtype: 'button',
                                            handler: function(button, event) {
                                                closeAllTab();
                                            },
                                            flex: 1,
                                            text: 'Tutup Hal'
                                        }]
                                }],
                            items: [
                                {
                                    title: 'Selamat Datang {$username}',
                                    items: [treeNavigation]
                                }]
                        },
                        tabPanel]
                });

                // get a reference to the HTML element with id "hideit" and add a click listener to it
                Ext.get("hideit").on('click', function() {

                    // get a reference to the Panel that was created with id = 'west-panel'
                    var w = Ext.getCmp('rTabPanel');
                    // expand or collapse that Panel based on its collapsed property state
                    w.collapsed ? w.expand() : w.collapse();
                });


//setInterval(updateTime, 1000);

                var periode = '{$periode}';
                var usergroup = '{$usergroup}';
                var companyname = '{$companyname}';

                // if(companyname!='')
                // {
                //     Ext.create('Ext.Button', {
                //         text: '{$companyname}',
                //         renderTo: 'bloggout'
                //     });
                // }
                var formKataSandi = Ext.create('Ext.form.Panel', {
                                        id: 'formKataSandi',
                                        // width: 450,
                                        // height: 330,
                                        url: SITE_URL + 'backend/change_password',
                                        bodyStyle: 'padding:5px',
                                        labelAlign: 'top',
                                        autoScroll: true,
                                        fieldDefaults: {
                                            msgTarget: 'side',
                                            blankText: 'Tidak Boleh Kosong',
                                            labelWidth: 160,
                                            width: 400
                                        },
                                        items: [
                                             {
                                                xtype: 'textfield',
                                                inputType:'password',
                                                anchor: '100%',
                                                fieldLabel: 'Kata sandi baru',
                                                name: 'katasandi1'
                                            },
                                            {
                                                xtype: 'textfield',
                                                inputType:'password',
                                                anchor: '100%',
                                                fieldLabel: 'Ulangi kata sandi baru',
                                                name: 'katasandi2'
                                            },
                                            {
                                                xtype: 'hiddenfield',
                                                anchor: '100%',
                                                fieldLabel: 'idpelamar',
                                                name: 'idpelamar'
                                            }
                                        ],
                                        buttons: [{
                                                text: 'Batal',
                                                handler: function() {
                                                    var win = Ext.getCmp('windowPopupKataSandi');
                                                    Ext.getCmp('formKataSandi').getForm().reset();
                                                    win.hide();
                                                }
                                            }, {
                                                // id: 'BtnSetupTaxSimpan',
                                                text: 'Simpan',
                                                handler: function() {
                                                    var form = this.up('form').getForm();
                                                    if (form.isValid()) {
                                                        form.submit({
                                                            success: function(form, action) {

                                                                if(action.result.success)
                                                                {
                                                                    Ext.Msg.alert('Success', action.result.message);
                                                                    Ext.getCmp('formKataSandi').getForm().reset();
                                                                    Ext.getCmp('windowPopupKataSandi').hide();
                                                                }
                                                               
                                                            },
                                                            failure: function(form, action) {
                                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    //                            storeGridSetupTax.load();
                                                            }
                                                        });
                                                    } else {
                                                        Ext.Msg.alert("Error!", "Your form is invalid!");
                                                    }
                                                }
                                            }]

                                    });

                var windowPass =  Ext.create('widget.window', {
                                    id: 'windowPopupKataSandi',
                                    title: 'Ubah Kata Sandi',
                                    header: {
                                        titlePosition: 2,
                                        titleAlign: 'center'
                                    },
                                    closable: true,
                                    closeAction: 'hide',
                                    autoWidth: true,
                                    modal:true,
                                    autoHeight: true,
                                    layout: 'fit',
                                    border: false,
                                    items: [formKataSandi]
                                });

                Ext.create('Ext.Button', {
                    text: 'Anda sebagai {$username}',
                    renderTo: 'bloggout',
                    handler:function(){
                        windowPass.show();
                    }

                });



                Ext.create('Ext.Button', {
                    id: 'timeBtn',
                    text: usergroup,
                    renderTo: 'bloggout'
                });

                var unit = '{$unit}';
                if (unit != '')
                {
                    Ext.create('Ext.Button', {
                        text: '{$unit}',
                        renderTo: 'bloggout'
                    });
                }

                Ext.create('Ext.Button', {
                    id:'LogoutBtn',
                    text: 'Keluar',
                    renderTo: 'bloggout',
                    handler: function() {
                        window.location.href = 'dashboard/logout';
                    }
                });

                Ext.override(Ext.grid.RowNumberer, {
                    renderer: function(v, p, record, rowIndex) {
                        if (this.rowspan) {
                            p.cellAttr = 'rowspan="' + this.rowspan + '"';
                        }
                        var st = record.store;
                        if (st.lastOptions.page != undefined && st.lastOptions.start != undefined && st.lastOptions.limit != undefined) {
                            var page = st.lastOptions.page - 1;
                            var limit = st.lastOptions.limit;
                            return limit * page + rowIndex + 1;
                        } else {
                            return rowIndex + 1;
                        }
                    }
                });
                // Ext.window.Window.override({
                //     animateTarget: Ext.getDoc(), //animate on show/close from top left of document

                //     maximize: function() {
                //         this.callParent([true]); //animate
                //     },
                //     restore: function() {
                //         this.callParent([true]); //animate
                //     }
                // });

                Ext.define('RevRec.util.Format', {
                    override: 'Ext.util.Format',
                    originalNumberFormatter: Ext.util.Format.number,
                    number: function(v, formatString) {
                        if (v < 0) {
                            //negative number: flip the sign, format then prepend '-' onto output
                            return '-' + this.originalNumberFormatter(v * -1, formatString);
                        } else {
                            //positive number: as you were
                            return this.originalNumberFormatter(v, formatString);
                        }
                    }
                });

                
            });
</script>



        <style type="text/css">
           /* {*html { overflow: auto; }
            html, body, div, iframe { margin: 0px; padding: 0px; height: 100%; border: none; }
            iframe { display: block; width: 100%; border: none; overflow-y: auto; overflow-x: hidden; } *}*/
        </style>



        <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
        <div id="west" class="x-hide-display">
            <p>Hi. I'm the west panel.</p>
        </div>
        <div id="center2" class="x-hide-display">
            <a id="hideit" href="#">
                <!-- Toggle the west region -->
            </a>

           <!--  {*            <iframe id="tree" name="tree" src="{$site_url}/dashboard/page"  frameborder="0" marginheight="0" marginwidth="0" width="100%" height=600" scrolling="auto"></iframe> *} -->
            <!--  <p>My closable attribute is set to false so you can't close me. The other center panels can be closed.</p>
             <p>The center panel automatically grows to fit the remaining space in the container that isn't taken up by the border regions.</p> -->

        </div>

        <div id="center1" class="x-hide-display">
            <div id="center1content"> </div>
        </div>

        <div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">
        </div>
        <div id="south" class="x-hide-display">
            <!-- <p>south - generally for informational stuff, also could be for status bar</p> -->
        </div>

        <script src='{$assets_url}/js/app/natadaya/saldo.js'></script>
        <script src='{$assets_url}/js/app/natadaya/GridRekNatadaya.js'></script>
        <script src='{$assets_url}/js/app/natadaya/GantiProdukList.js'></script>
        <script src='{$assets_url}/js/app/natadaya/formGantiProduk.js'></script>
        <script src='{$assets_url}/js/app/natadaya/product.js'></script>
        <script src='{$assets_url}/js/app/natadaya/adminSuperProductList.js'></script>
        <script src='{$assets_url}/js/app/natadaya/adminSuper.js'></script>
        <script src='{$assets_url}/js/app/natadaya/depositAgreementList.js'></script>
        <script src='{$assets_url}/js/app/natadaya/deposit.js'></script>
        <script src='{$assets_url}/js/app/natadaya/tingkatLokasi.js'></script>
        <script src='{$assets_url}/js/app/natadaya/lokasi.js'></script>
        <script src='{$assets_url}/js/app/natadaya/pergerakanPersonel.js'></script>
        <script src='{$assets_url}/js/app/natadaya/level.js'></script>
        <script src='{$assets_url}/js/app/natadaya/kekaryaan.js'></script>
        <script src='{$assets_url}/js/app/natadaya/jenjangPendidikan.js'></script>
        <script src='{$assets_url}/js/app/natadaya/hubKeluarga.js'></script>
        <script src='{$assets_url}/js/app/natadaya/agama.js'></script>
        <script src='{$assets_url}/js/app/natadaya/statusKawin.js'></script>
        <script src='{$assets_url}/js/app/natadaya/kewarganegaraan.js'></script>
        <script src='{$assets_url}/js/app/natadaya/ptkp.js'></script>

        <!-- // <script src='{$assets_url}/js/app/modulorg/pengaturan/Ptkp_moduleorg.js'></script>   -->
        <script src='{$assets_url}/js/app/modulorg/desain/level_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/desain/kekaryaan_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/desain/lokasi_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/desain/perusahaan_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/pengaturan/jenjangPendidikan_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/pengaturan/hubKeluarga_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/pengaturan/agama_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/pengaturan/statusKawin_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/pengaturan/kewarganegaraan_modulorg.js'></script>
        <script src='{$assets_url}/js/app/modulorg/pengaturan/ptkp_modulorg.js'></script>

        <script src='{$assets_url}/js/app/deposit/GridHistoryDeposit.js'></script>
        <script src='{$assets_url}/js/app/deposit/DaftarPerusahaanDeposit.js'></script>
        <script src='{$assets_url}/js/app/deposit/formKonfirmasiDeposit.js'></script>
        <script src='{$assets_url}/js/app/deposit/formDetailDeposit.js'></script>
        <script src='{$assets_url}/js/app/deposit.js'></script>

        <script src='{$assets_url}/js/app/pengaturanakses/GridPenggunaCompanyList.js'></script>
        <script src='{$assets_url}/js/app/pengaturanakses/pengguna.js'></script>

        <script src='{$assets_url}/js/app/desainorg/OrganisasiCompanyList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/organisasi.js'></script>
        <script src='{$assets_url}/js/app/desainorg/JabatanCompanyList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/LevelJabatanList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/jabatan.js'></script>
        <script src='{$assets_url}/js/app/desainorg/StrukturJabatanCompanyList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/StrukturJabatanList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/StrukturJabatanOrganisasiList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/StrukturJabatanAtasanList.js'></script>
        <script src='{$assets_url}/js/app/desainorg/StrukturJabatan.js'></script>

        <script src='{$assets_url}/js/app/ptk/StrukturJabatanList.js'></script>
        <script src='{$assets_url}/js/app/ptk/AddRowPerencanaanTK.js'></script>
        <script src='{$assets_url}/js/app/ptk/EntryPerencanaanTK.js'></script>
        <script src='{$assets_url}/js/app/ptk/StrukturJabatanList_formPerencanaan.js'></script>
        <script src='{$assets_url}/js/app/ptk/winImportPerencanaan.js'></script>
        <script src='{$assets_url}/js/app/ptk/perencanaan.js'></script>
        <script src='{$assets_url}/js/app/ptk/NamaAtasanPermintaanTKList.js'></script>
        <script src='{$assets_url}/js/app/ptk/StrukturJabatanList_fPermintaan.js'></script>
        <script src='{$assets_url}/js/app/ptk/permintaan.js'></script>

        <script src='{$assets_url}/js/app/rekrutmen/pelamar.js'></script>
        <script src='{$assets_url}/js/app/rekrutmen/pelamarList.js'></script>
        <script src='{$assets_url}/js/app/rekrutmen/permintaanTkList.js'></script>
        <script src='{$assets_url}/js/app/rekrutmen/seleksiPelamar.js'></script>

        <!-- // <script src='{$assets_url}/js/app/personalia/GridProsesUpah.js'></script> -->
        <script src='{$assets_url}/js/app/personalia/UpahTidakTetapList.js'></script>
        <script src='{$assets_url}/js/app/personalia/gridUpahTidakTetap.js'></script>
        <script src='{$assets_url}/js/app/personalia/upahTetapList.js'></script>
        <script src='{$assets_url}/js/app/personalia/gridUpahTetap.js'></script>
        <script src='{$assets_url}/js/app/personalia/GridPengurangUpahList.js'></script>
        <script src='{$assets_url}/js/app/personalia/GridPengurangUpah.js'></script>
        <script src='{$assets_url}/js/app/personalia/tabPengupahan.js'></script>
        <script src='{$assets_url}/js/app/personalia/NamaAtasanFormBawahanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/bawahan.js'></script>
        <script src='{$assets_url}/js/app/personalia/NamaAtasanPergerakanPersonilList.js'></script>
        <!-- <script src='{$assets_url}/js/app/personalia/JabatanAtasanPergerakanPersonilList.js'></script> -->
        <script src='{$assets_url}/js/app/personalia/OrganisasiAtasanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/LevelIndividuList.js'></script>
        <script src='{$assets_url}/js/app/personalia/jabatanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/personilList.js'></script>
        <script src='{$assets_url}/js/app/personalia/personilListNewJob.js'></script>
        <script src='{$assets_url}/js/app/personalia/formPergerakanPersonel.js'></script>
        <script src='{$assets_url}/js/app/personalia/DataPergerakanPersonel.js'></script>
        <script src='{$assets_url}/js/app/personalia/LevelIndividuPekerjaanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/NamaAtasanFormPekerjaanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/DataPekerjaan.js'></script>
        <script src='{$assets_url}/js/app/personalia/suratKeterangan.js'></script>
        <script src='{$assets_url}/js/app/personalia/formBenefit.js'></script>
        <script src='{$assets_url}/js/app/personalia/BenefitList.js'></script>
        <script src='{$assets_url}/js/app/personalia/GridBenefitKaryawan.js'></script>
        <script src='{$assets_url}/js/app/personalia/TabBenefit.js'></script>
        <script src='{$assets_url}/js/app/personalia/pelatihan.js'></script>
        <script src='{$assets_url}/js/app/personalia/pendidikan.js'></script>
        <script src='{$assets_url}/js/app/personalia/keluarga.js'></script>
        <script src='{$assets_url}/js/app/personalia/formIdentitas.js'></script>
        <script src='{$assets_url}/js/app/personalia/PekerjaanOrganisasiList.js'></script>
        <script src='{$assets_url}/js/app/personalia/LevelIndividuList.js'></script>
        <script src='{$assets_url}/js/app/personalia/StrukturJabatanFormPekerjaanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/NamaAtasanDetailPekerjaanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/formDetailPekerjaan.js'></script>
        <script src='{$assets_url}/js/app/personalia/gridPekerjaan.js'></script>
        <script src='{$assets_url}/js/app/personalia/CompanyDataKaryawanList.js'></script>
        <script src='{$assets_url}/js/app/personalia/formDataKaryawan.js'></script>
        <script src='{$assets_url}/js/app/personalia/windowDataKaryawan.js'></script>
        <script src='{$assets_url}/js/app/personalia/DataKaryawan.js'></script>

        <script src='{$assets_url}/js/app/kehadiran/PersonilCutiList.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/GridPengajuanCuti.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/PengaturanCuti.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/RekapKehadiran.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/NamaPegFormHadirList.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/winImportKehadiran.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/kehadiran.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/NamaPegFormLemburList.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/formulaLemburList.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/SuratLembur.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/NamaPegFormIzinList.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/pengajuanIzin.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JenisIzin.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja1List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja2List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja3List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja4List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja5List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja6List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerja7List.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/jadwalKerja.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/JamKerjaHarian.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/polaKerja.js'></script>
        <script src='{$assets_url}/js/app/kehadiran/TanggalLibur.js'></script>

        <script src='{$assets_url}/js/app/kompensasi/formImportUpah.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridUploadTidakTetap.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ProsesGaji.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridRiwayatGaji.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/RekapLembur.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/UpahPergerakan.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/upahKaryBaru.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridRulesPengurangUpah.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridRulesBenefit.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridRulesUpahTidakTetap.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridRulesUpahTetap.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/KebijakanPengupahan.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigPengurangUpahList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigPengurangUpah.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigBenefitList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigBenefit.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/formPeraturanPemerintah.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/formSatuanJam.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/formSatuanHarianLembur.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyFormulaLemburList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/FormulaLembur.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigLemburList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigUmumLembur.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigUTTTahunList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/GridJadwalUpahTahunan.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigUpahTTTahun.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigUTTBulanList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigUpahTTBulan.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigDasarUTTList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigDasarUpahTT.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/CompanyConfigUTList.js'></script>
        <script src='{$assets_url}/js/app/kompensasi/ConfigUpahT.js'></script>

        <script src='{$assets_url}/js/app/setup/company.js'></script>
        <script src='{$assets_url}/js/app/setup/companyUnit.js'></script>
        <script src='{$assets_url}/js/app/setup/setupCompanyTab.js'></script>

        <script src='{$assets_url}/js/app/sistem/editRules.js'></script>
        <script src='{$assets_url}/js/app/sistem/sysMenuTreeInduk.js'></script>
        <script src='{$assets_url}/js/app/sistem/sysMenuTree.js'></script>
        <script src='{$assets_url}/js/app/pengaturanakses/sysGroupMenuAkses.js'></script>
        <script src='{$assets_url}/js/app/sistem/gridRules.js'></script>
        <script src='{$assets_url}/js/app/sistem/portGroupAkses.js'></script>
        <script src='{$assets_url}/js/app/pengaturanakses/SysGroup.js'></script>

        <script src='{$assets_url}/js/app/commonfunc.js'></script>


    </body>
</html>
