var bulanarr = [['01', 'Januari'], ['02', 'Februari'], ['03', 'Maret'], ['04', 'April'], ['05', 'Mei'], ['06', 'Juni'], ['07', 'Juli'], ['08', 'Agustus'], ['09', 'September'], ['10', 'Oktober'], ['11', 'November'], ['12', 'Desember']];
var storeBulan = new Ext.data.ArrayStore({
    fields: ['nobulan', 'namabulan'],
    data: bulanarr
});

Ext.define('comboxbulan', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbulan',
    fieldLabel: 'Bulan',
      editable: false,
    triggerAction: 'all',
    displayField: 'namabulan',
    valueField: 'namabulan',
    name: 'namabulan',
    store: storeBulan
});

var statusPerencanaanarr = [['ON BUDGET'], ['OFF BUDGET']];
var storeStatusPerencanaan = new Ext.data.ArrayStore({
    fields: ['status'],
    data: statusPerencanaanarr
});

Ext.define('comboxPerencanaan', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPerencanaan',
    fieldLabel: 'Status Perencanaan',
     editable: false,
    triggerAction: 'all',
    displayField: 'status',
    valueField: 'status',
    name: 'status',
    store: storeStatusPerencanaan
});

var storeJenisUTT = new Ext.data.ArrayStore({
    fields: ['jenisutt_id','jenisutt_name'],
    data: [[1,'Bulanan'], [2,'Tahunan']]
});

Ext.define('comboxJenisUTT', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJenisUTT',
    fieldLabel: 'Jenis Upah',
     editable: false,
    triggerAction: 'all',
    displayField: 'jenisutt_name',
    valueField: 'jenisutt_id',
    name: 'jenisutt_name',
    store: storeJenisUTT
});

///
var JumlahHariarr = [[5], [6]];
var storeJumlahHari = new Ext.data.ArrayStore({
    fields: ['jumlahhari'],
    data: JumlahHariarr
});

Ext.define('comboxJumlahHari', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJumlahHari',
    fieldLabel: 'Jumlah Hari Kerja',
     editable: false,
    triggerAction: 'all',
    displayField: 'jumlahhari',
    valueField: 'jumlahhari',
    name: 'jumlahhari',
    store: storeJumlahHari
});
//

var jenisFormLemburArr = [['Satuan Harian'], ['Satuan Jam'], ['Peraturan Pemerintah']];
var storeJenisFormLembur = new Ext.data.ArrayStore({
    fields: ['jenisformula'],
    data: jenisFormLemburArr
});

Ext.define('comboxJenisFormLembur', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJenisFormLembur',
    fieldLabel: 'Jenis Formula Lembur',
     editable: false,
    triggerAction: 'all',
    displayField: 'jenisformula',
    valueField: 'jenisformula',
    name: 'jenisformula',
    store: storeJenisFormLembur
});

var formulaLemburArr = [['HARIAN'], ['JAM'], ['UU Ketenagakerjaan']];
var storeFormulaLembur = new Ext.data.ArrayStore({
    fields: ['formulalembur'],
    data: formulaLemburArr
});

Ext.define('comboxFormulaLembur', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxFormulaLembur',
    fieldLabel: 'Formula Lembur',
     editable: false,
    triggerAction: 'all',
    displayField: 'formulalembur',
    valueField: 'formulalembur',
    name: 'formulalembur',
    store: storeFormulaLembur
});

var storeWaktuLembur = Ext.create('Ext.data.Store', {
        fields: ['idwaktulembur', 'waktulembur'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/waktulembur',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxWaktuLembur', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxWaktuLembur',
    fieldLabel: 'Waktu Lembur',
     editable: false,
    triggerAction: 'all',
    displayField: 'waktulembur',
    valueField: 'waktulembur',
    name: 'waktulembur',
    store: storeWaktuLembur
});

var jenisSimarr = [['SIM A'], ['SIM B1'], ['SIM B2'], ['SIM C'], ['SIM D']];
var storejenisSim = new Ext.data.ArrayStore({
    fields: ['jenissim'],
    data: jenisSimarr
});

Ext.define('comboxjenisSim', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxjenisSim',
    fieldLabel: 'Jenis Sim',
     editable: false,
    triggerAction: 'all',
    displayField: 'jenissim',
    valueField: 'jenissim',
    name: 'jenissim',
    store: storejenisSim
});

var statusAkunarr = [['Aktif'], ['Suspended']];
var storeStatusAkun = new Ext.data.ArrayStore({
    fields: ['status'],
    data: statusAkunarr
});

Ext.define('comboxstatusAkun', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstatusAkun',
    fieldLabel: 'Status Akun',
     editable: false,
    triggerAction: 'all',
    displayField: 'status',
    valueField: 'status',
    name: 'status',
    store: storeStatusAkun
});

var statusPelamararr = [['Diajukan'],['Disetujui']];
var storeStatusPelamar = new Ext.data.ArrayStore({
    fields: ['status'],
    data: statusPelamararr
});

Ext.define('comboxstatusPelamar', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstatusPelamar',
    fieldLabel: 'Status Pelamar',
     editable: false,
    triggerAction: 'all',
    displayField: 'status',
    valueField: 'status',
    name: 'status',
    store: storeStatusPelamar
});

var statusarr = [['Aktif'], ['Non Aktif']];
var storeStatus = new Ext.data.ArrayStore({
    fields: ['status'],
    data: statusarr
});

Ext.define('comboxstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstatus',
    fieldLabel: 'Status',
     editable: false,
    triggerAction: 'all',
    displayField: 'status',
    valueField: 'status',
    name: 'status',
    store: storeStatus
});

var statusCalonPelamararr = [['Diajukan'], ['Disetujui']];
var storeStatusCalonPelamar = new Ext.data.ArrayStore({
    fields: ['statuscalon'],
    data: statusCalonPelamararr
});

Ext.define('comboxstatusCalonPelamar', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstatusCalonPelamar',
    fieldLabel: 'Status Calon Pelamar',
     editable: false,
    triggerAction: 'all',
    displayField: 'statuscalon',
    valueField: 'statuscalon',
    name: 'statuscalon',
    store: storeStatusCalonPelamar
});

var JenPengurangCutiarr = [['BULANAN'], ['TAHUNAN']];
var storeJenPengurangCuti = new Ext.data.ArrayStore({
    fields: ['jenpengurangcuti'],
    data: JenPengurangCutiarr
});

Ext.define('comboxJenPengurangCuti', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJenPengurangCuti',
    fieldLabel: 'Jenis Pengurang Cuti',
     editable: false,
    triggerAction: 'all',
    displayField: 'jenpengurangcuti',
    valueField: 'jenpengurangcuti',
    name: 'jenpengurangcuti',
    store: storeJenPengurangCuti
});

var statusDepositArr = [['Receive'], ['Refund'],['Waiting Respond']];
var storeDepositStatus = new Ext.data.ArrayStore({
    fields: ['status'],
    data: statusDepositArr
});

Ext.define('comboxstatusDeposit', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstatusDeposit',
    fieldLabel: 'Status',
     editable: false,
    triggerAction: 'all',
    displayField: 'status',
    valueField: 'status',
    name: 'status',
    store: storeDepositStatus
});

var statusTransferMethod = [['ATM'], ['Setor Tunai'], ['Internet Banking'], ['Lainnya']];
var storeTransferMethod = new Ext.data.ArrayStore({
    fields: ['via'],
    data: statusTransferMethod
});

Ext.define('comboxTransferMethod', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxTransferMethod',
    fieldLabel: 'Via',
     editable: false,
    triggerAction: 'all',
    displayField: 'via',
    valueField: 'via',
    name: 'via',
    store: storeTransferMethod
});

var statusYaTidak = [['YA'], ['TIDAK']];
var storeYaTidak = new Ext.data.ArrayStore({
    fields: ['yatidak'],
    data: statusYaTidak
});

Ext.define('comboxYaTidak', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxYaTidak',
    // fieldLabel: 'Via',
    editable: false,
    triggerAction: 'all',
    displayField: 'yatidak',
    valueField: 'yatidak',
    // name: 'via',
    store: storeYaTidak
});

var fungsiPajak = [['Penambah'], ['Pengurang'], ['Netral ']];
var storeFungsiPajak = new Ext.data.ArrayStore({
    fields: ['fungsipajak'],
    data: fungsiPajak
});

Ext.define('comboxFungsiPajak', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxFungsiPajak',
    fieldLabel: 'Fungsi Pajak',
    editable: false,
    triggerAction: 'all',
    displayField: 'fungsipajak',
    valueField: 'fungsipajak',
    name: 'fungsipajak',
    store: storeFungsiPajak
});

var HitungPajak = [['GROSS'], ['NET']];
var storeHitungPajak = new Ext.data.ArrayStore({
    fields: ['hitungpajak'],
    data: HitungPajak
});

Ext.define('comboxHitungPajak', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxHitungPajak',
    fieldLabel: 'Cara Hitung Pajak',
    editable: false,
    triggerAction: 'all',
    displayField: 'hitungpajak',
    valueField: 'hitungpajak',
    name: 'hitungpajak',
    store: storeHitungPajak
});

var SatuanLemburArray = [['Harian'], ['Jam'],['Peraturan Pemerintah']];
var storeSatuanLembur = new Ext.data.ArrayStore({
    fields: ['satuanlembur'],
    data: SatuanLemburArray
});

Ext.define('comboxSatuanLembur', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxSatuanLembur',
    fieldLabel: 'Satuan Lembur',
    editable: false,
    triggerAction: 'all',
    displayField: 'satuanlembur',
    valueField: 'satuanlembur',
    name: 'satuanlembur',
    store: storeSatuanLembur
});

var JenisHariArray = [['Hari Kerja'], ['Hari Libur'],['Hari Raya']];
var storeJenisHari = new Ext.data.ArrayStore({
    fields: ['jenishari'],
    data: JenisHariArray
});

Ext.define('comboxJenisHari', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJenisHari',
    fieldLabel: 'Jenis Hari',
    editable: false,
    triggerAction: 'all',
    displayField: 'jenishari',
    valueField: 'jenishari',
    name: 'jenishari',
    store: storeJenisHari
});

var JenisNilaiArray = [['Komponen Upah'], ['Nilai Tetap'], ['Persentase']];
var storeJenisNilai = new Ext.data.ArrayStore({
    fields: ['jenisnilai'],
    data: JenisNilaiArray
});

Ext.define('comboxJenisNilai', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJenisNilai',
    fieldLabel: 'Jenis Nilai',
    editable: false,
    triggerAction: 'all',
    displayField: 'jenisnilai',
    valueField: 'jenisnilai',
    name: 'jenisnilai',
    store: storeJenisNilai
});

var JenisLevelArray = [['Jabatan'], ['Pribadi']];
var storeJenisLevel = new Ext.data.ArrayStore({
    fields: ['jenislevel'],
    data: JenisLevelArray
});

Ext.define('comboxJenisLevel', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxJenisLevel',
    fieldLabel: 'Jenis Level',
    editable: false,
    triggerAction: 'all',
    displayField: 'jenislevel',
    valueField: 'jenislevel',
    name: 'jenislevel',
    store: storeJenisLevel
});

Ext.define('comboxbulan2', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbulan2',
    // fieldLabel: 'Bulan',
    displayField: 'namabulan',
    valueField: 'namabulan',
    name: 'namabulan',
    store: storeBulan
});

var storeUnit = Ext.create('Ext.data.Store', {
        fields: ['idunit', 'namaunit'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/unit',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode:'remote',
        autoLoad: false
    });

Ext.define('comboxunit', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxunit',
    fieldLabel: 'Unit',
    displayField: 'namaunit',
    valueField: 'namaunit',
    name: 'namaunit',
    editable: false,
    triggerAction: 'all',
    store: storeUnit
});

var storeUnit = Ext.create('Ext.data.Store', {
        fields: ['idunit', 'namaunit'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combounit',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxunit', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxunit',
    fieldLabel: 'Unit',
    displayField: 'namaunit',
    valueField: 'namaunit',
    name: 'namaunit',
    editable: false,
    triggerAction: 'all',
    store: storeUnit
});

Ext.define('comboxcurrency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcurrency',
    fieldLabel: 'Mata Uang',
    displayField: 'namecurr',
    valueField: 'idcurrency',
    name: 'namecurr',
    submitValue: 'idcurrency',
    editable: false,
    triggerAction: 'all',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{namecurr}. {slogan}">{namecurr} ({symbol})</div>';
        }
    },
    store: Ext.create('Ext.data.Store', {
        fields: ['idcurrency', 'namecurr','symbol'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/currency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});


var sys_groupStore = Ext.create('Ext.data.Store', {
        fields: ['group_id', 'group_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/sys_group',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
});

Ext.define('comboxsys_group', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsys_group',
    displayField: 'group_name',
    fieldLabel: 'Kelompok User',
    queryMode: 'local',
    name: 'group_name',
    editable: false,
    triggerAction: 'all',
    valueField: 'group_name',
    store: sys_groupStore
});

var storetunjangan = Ext.create('Ext.data.Store', {
        fields: ['idtunjtype', 'nametunj'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tunjangantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtunjangantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtunjangantype',
    displayField: 'nametunj',
    fieldLabel: 'Jenis Tunjangan',
    queryMode: 'local',
    name: 'nametunj',
    editable: false,
    triggerAction: 'all',
    valueField: 'nametunj',
    store: storetunjangan
});

var siklusStore = Ext.create('Ext.data.Store', {
        fields: ['idsiklus', 'namasiklus'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/siklus',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxsiklus', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsiklus',
    displayField: 'namasiklus',
    fieldLabel: 'Siklus',
    queryMode: 'local',
    name: 'namasiklus',
    editable: false,
    triggerAction: 'all',
    valueField: 'namasiklus',
    store: siklusStore
});

var potongantypeStore = Ext.create('Ext.data.Store', {
        fields: ['idpotongantype', 'namepotongan'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/potongantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpotongantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpotongantype',
    displayField: 'namepotongan',
    fieldLabel: 'Jenis Potongan',
    queryMode: 'local',
    name: 'namepotongan',
    editable: false,
    triggerAction: 'all',
    valueField: 'namepotongan',
    store: potongantypeStore
});

Ext.define('comboxamounttype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxamounttype',
    displayField: 'name',
    fieldLabel: 'Tipe Potongan',
    queryMode: 'local',
    name: 'name',
    editable: false,
    triggerAction: 'all',
    valueField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['idamounttype', 'name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/potongantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var payrolltypeStore = Ext.create('Ext.data.Store', {
        fields: ['payrolltypeid', 'payname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/payrolltype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpayrolltype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpayrolltype',
    displayField: 'payname',
    fieldLabel: 'Jenis Pembayaran',
    queryMode: 'local',
    name: 'payname',
    editable: false,
    triggerAction: 'all',
    valueField: 'payname',
    store: payrolltypeStore
});

var tambahangajitypeStore = Ext.create('Ext.data.Store', {
        fields: ['idtambahangajitype', 'tambahantype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tambahangajitype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtambahangajitype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtambahangajitype',
    displayField: 'tambahantype',
    fieldLabel: 'Jenis Tambahan Gaji',
    queryMode: 'local',
    name: 'tambahantype',
    editable: false,
    triggerAction: 'all',
    valueField: 'tambahantype',
    store: tambahangajitypeStore
});

var jenisptkpStore = Ext.create('Ext.data.Store', {
        fields: ['idptkp', 'namaptkp'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/ptkp',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: true
    });
Ext.define('comboxjenisptkp', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjenisptkp',
    displayField: 'namaptkp',
    fieldLabel: 'Jenis PTKP',
    queryMode: 'local',
    name: 'namaptkp',
    editable: false,
    triggerAction: 'all',
    valueField: 'namaptkp',
    store: jenisptkpStore,
    // listConfig: {
    //     getInnerTpl: function() {
    //         return '<div data-qtip="{deskripsi}.">{namaptkp}</div>';
    //     }
    // }
});

var pelangganTypeStore = Ext.create('Ext.data.Store', {
        fields: ['idpelanggantype', 'pelanggantype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/pelanggantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
Ext.define('comboxpelanggantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpelanggantype',
    displayField: 'pelanggantype',
    fieldLabel: 'Jenis Pelanggan',
    queryMode: 'local',
    name: 'pelanggantype',
    editable: false,
    triggerAction: 'all',
    valueField: 'pelanggantype',
    store: pelangganTypeStore
});

var tahunPayrollStore = Ext.create('Ext.data.Store', {
        fields: ['year'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxTahunPayroll',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtahunPayroll', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtahunPayroll',
    displayField: 'year',
    fieldLabel: 'Tahun Penggajian',
    queryMode: 'local',
    name: 'tahunpayroll',
    editable: false,
    triggerAction: 'all',
    valueField: 'year',
    store: tahunPayrollStore
});

var rekNatadayaStore = Ext.create('Ext.data.Store', {
        fields: ['norek','accname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/natadaya_rekening',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxrekNatadaya', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxrekNatadaya',
    displayField: 'norek',
    fieldLabel: 'No Rek Natadaya',
    queryMode: 'local',
    name: 'norek',
    editable: false,
    triggerAction: 'all',
    valueField: 'norek',
    store: rekNatadayaStore
});

var tingkatlokasiStore = Ext.create('Ext.data.Store', {
        fields: ['idtingkatlokasi','tingkatlokasi'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tingkatlokasi',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtingkatlokasi', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtingkatlokasi',
    displayField: 'tingkatlokasi',
    fieldLabel: 'Tingkat Lokasi',
    queryMode: 'local',
    name: 'tingkatlokasi',
    editable: false,
    triggerAction: 'all',
    valueField: 'tingkatlokasi',
    store: tingkatlokasiStore
});

var lokasiStore = Ext.create('Ext.data.Store', {
        fields: ['idlokasiorg','namalokasi'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/lokasi_org',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxlokasi', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxlokasi',
    displayField: 'namalokasi',
    fieldLabel: 'Lokasi',
    queryMode: 'local',
    name: 'namalokasi',
    editable: false,
    triggerAction: 'all',
    valueField: 'namalokasi',
    store: lokasiStore
});

var companyStore = Ext.create('Ext.data.Store', {
        fields: ['idcompany','companyname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxcompany',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxcompany', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxcompany',
    displayField: 'companyname',
    fieldLabel: 'Perusahaan',
    queryMode: 'local',
    name: 'companyname',
    editable: false,
    triggerAction: 'all',
    valueField: 'companyname',
    store: companyStore
});

var tahunTKStore = Ext.create('Ext.data.Store', {
        fields: ['tahun'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxtahuntk',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxTahunTK', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxTahunTK',
    displayField: 'tahun',
    fieldLabel: 'Tahun Tenaga Kerja',
    queryMode: 'local',
    labelWidth:150,
    name: 'tahun',
    editable: false,
    triggerAction: 'all',
    valueField: 'tahun',
    store: tahunTKStore
});

var kekaryaanStore = Ext.create('Ext.data.Store', {
        fields: ['idkekaryaan','kekaryaanname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/kekaryaan',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxkekaryaan', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxkekaryaan',
    displayField: 'kekaryaanname',
    fieldLabel: 'Status Kekaryawanan',
    queryMode: 'local',
    labelWidth:150,
    name: 'kekaryaanname',
    editable: false,
    triggerAction: 'all',
    valueField: 'kekaryaanname',
    store: kekaryaanStore
});

var sextypeStore = Ext.create('Ext.data.Store', {
        fields: ['idsex','sexname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/sextype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxsextype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsextype',
    displayField: 'sexname',
    fieldLabel: 'Jenis Kelamin',
    queryMode: 'local',
    labelWidth:150,
    name: 'sexname',
    editable: false,
    triggerAction: 'all',
    valueField: 'sexname',
    store: sextypeStore
});

var statuskawinStore = Ext.create('Ext.data.Store', {
        fields: ['idstatuskawin','namastatuskawin'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/statuskawin',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxstatuskawin', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxstatuskawin',
    displayField: 'namastatuskawin',
    fieldLabel: 'Status Pernikahan',
    queryMode: 'local',
    labelWidth:150,
    name: 'namastatuskawin',
    editable: false,
    triggerAction: 'all',
    valueField: 'namastatuskawin',
    store: statuskawinStore
});

var jenjangpendidikanStore = Ext.create('Ext.data.Store', {
        fields: ['idjenjangpendidikan','namajenjang'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jenjangpendidikan',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxjenjangpendidikan', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjenjangpendidikan',
    displayField: 'namajenjang',
    fieldLabel: 'Jenjang Pendidikan',
    queryMode: 'local',
    labelWidth:150,
    name: 'namajenjang',
    editable: false,
    triggerAction: 'all',
    valueField: 'namajenjang',
    store: jenjangpendidikanStore
});

var levelStore = Ext.create('Ext.data.Store', {
        fields: ['idlevel','levelname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/level',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxlevel', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxlevel',
    displayField: 'levelname',
    fieldLabel: 'Level',
    queryMode: 'local',
    labelWidth:150,
    name: 'levelname',
    editable: false,
    triggerAction: 'all',
    valueField: 'levelname',
    store: levelStore
});

var jeniskontrakStore = Ext.create('Ext.data.Store', {
        fields: ['idjeniskontrak','namakontrak'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jeniskontrak',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxjeniskontrak', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjeniskontrak',
    displayField: 'namakontrak',
    fieldLabel: 'Jenis Kontrak',
    queryMode: 'local',
    labelWidth:150,
    name: 'namakontrak',
    editable: false,
    triggerAction: 'all',
    valueField: 'namakontrak',
    store: jeniskontrakStore
});

var hubkeluargaStore = Ext.create('Ext.data.Store', {
        fields: ['idhubkeluarga','namahubkeluarga'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/hubkeluarga',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxhubkeluarga', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxhubkeluarga',
    displayField: 'namahubkeluarga',
    fieldLabel: 'Hubungan Keluarga',
    queryMode: 'local',
    labelWidth:150,
    name: 'namahubkeluarga',
    editable: false,
    triggerAction: 'all',
    valueField: 'namahubkeluarga',
    store: hubkeluargaStore
});

var agamaStore = Ext.create('Ext.data.Store', {
        fields: ['idagama','namaagama'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/agama',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxagama', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxagama',
    displayField: 'namaagama',
    fieldLabel: 'Agama',
    queryMode: 'local',
    labelWidth:150,
    name: 'namaagama',
    editable: false,
    triggerAction: 'all',
    valueField: 'namaagama',
    store: agamaStore
});

var pergerakanStore = Ext.create('Ext.data.Store', {
        fields: ['idpergerakan','namapergerakan'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/pergerakan',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpergerakan', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpergerakan',
    displayField: 'namapergerakan',
    fieldLabel: 'Jenis Pergerakan',
    queryMode: 'local',
    labelWidth:150,
    name: 'namapergerakan',
    editable: false,
    triggerAction: 'all',
    valueField: 'namapergerakan',
    store: pergerakanStore
});

var jenisizinStore = Ext.create('Ext.data.Store', {
        fields: ['idjenisizin','namaizin'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jenisizin',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxjenisizin', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjenisizin',
    displayField: 'namaizin',
    fieldLabel: 'Jenis Izin',
    queryMode: 'local',
    labelWidth:150,
    name: 'namaizin',
    editable: false,
    triggerAction: 'all',
    valueField: 'namaizin',
    store: jenisizinStore
});

var jamKerjaStore = Ext.create('Ext.data.Store', {
        fields: ['idjamkerjaharian','namajamkerja'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jamkerjaharian',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxjamKerja', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjamKerja',
    displayField: 'namajamkerja',
    fieldLabel: 'Jam Kerja',
    queryMode: 'local',
    labelWidth:150,
    name: 'namajamkerja',
    editable: false,
    triggerAction: 'all',
    valueField: 'namajamkerja',
    store: jamKerjaStore
});

var dasarPerhitunganUTTStore = Ext.create('Ext.data.Store', {
        fields: ['idconfigdasarupahtt','dasarupahtt'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/configdasarupahtt',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxdasarPerhitunganUTT', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxdasarPerhitunganUTT',
    displayField: 'dasarupahtt',
    fieldLabel: 'Dasar Perhitungan Upah',
    queryMode: 'local',
    labelWidth:150,
    name: 'dasarupahtt',
    editable: false,
    triggerAction: 'all',
    valueField: 'dasarupahtt',
    store: dasarPerhitunganUTTStore
});

var dasarKomponenUpahStore = Ext.create('Ext.data.Store', {
        fields: ['idkomponenupah','namakomponen'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxDasarKomponenUpah',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxdasarKomponenUpah', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxdasarKomponenUpah',
    displayField: 'namakomponen',
    fieldLabel: 'Dasar Komponen Upah',
    queryMode: 'local',
    labelWidth:150,
    name: 'namakomponen',
    editable: false,
    triggerAction: 'all',
    valueField: 'namakomponen',
    store: dasarKomponenUpahStore
});



var upahTetapStore = Ext.create('Ext.data.Store', {
        fields: ['idkomponenupah','namakomponen'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxkomponenupah/tetap',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxdasarKomponenUpahTetap', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxdasarKomponenUpahTetap',
    displayField: 'namakomponen',
    fieldLabel: 'Komponen Upah Tetap',
    queryMode: 'local',
    labelWidth:150,
    name: 'namakomponen',
    editable: false,
    triggerAction: 'all',
    valueField: 'namakomponen',
    store: upahTetapStore
});

var upahTidakTetapStore = Ext.create('Ext.data.Store', {
        fields: ['idkomponenupah','namakomponen'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxkomponenupah/tidaktetap',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxKomponenTidakUpah', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxKomponenTidakUpah',
    displayField: 'namakomponen',
    fieldLabel: 'Komponen Upah Tidak Tetap',
    queryMode: 'local',
    labelWidth:150,
    name: 'namakomponen',
    editable: false,
    triggerAction: 'all',
    valueField: 'namakomponen',
    store: upahTidakTetapStore
});

var benefitStore = Ext.create('Ext.data.Store', {
        fields: ['idbenefit','namabenefit'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxBenefit',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxBenefit', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxBenefit',
    displayField: 'namabenefit',
    fieldLabel: 'Komponen Benefit',
    queryMode: 'local',
    labelWidth:150,
    name: 'namabenefit',
    editable: false,
    triggerAction: 'all',
    valueField: 'namabenefit',
    store: benefitStore
});

var pengurangUpahStore = Ext.create('Ext.data.Store', {
        fields: ['idpengurangupah','namapengurangupah'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxPengurangUpah',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxPengurangUpah', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxPengurangUpah',
    displayField: 'namapengurangupah',
    fieldLabel: 'Pengurang Upah',
    queryMode: 'local',
    labelWidth:150,
    name: 'namapengurangupah',
    editable: false,
    triggerAction: 'all',
    valueField: 'namapengurangupah',
    store: pengurangUpahStore
});

var pengaturancutiStore = Ext.create('Ext.data.Store', {
        fields: ['idpengaturancuti','namapengcuti'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/pengaturancuti',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpengaturancuti', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpengaturancuti',
    displayField: 'namapengcuti',
    fieldLabel: 'Jenis Cuti',
    queryMode: 'local',
    labelWidth:150,
    name: 'namapengcuti',
    editable: false,
    triggerAction: 'all',
    valueField: 'namapengcuti',
    store: pengaturancutiStore
});

var jabatanStore = Ext.create('Ext.data.Store', {
        fields: ['idjabatan','namajabatan'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxJabatan',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxJabatan', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxJabatan',
    displayField: 'namajabatan',
    fieldLabel: 'Jabatan',
    queryMode: 'local',
    labelWidth:150,
    name: 'namajabatan',
    editable: false,
    triggerAction: 'all',
    valueField: 'namajabatan',
    store: jabatanStore
});

var orgStore = Ext.create('Ext.data.Store', {
        fields: ['idorganisasi','namaorg'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxOrg',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxOrg', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxOrg',
    displayField: 'namaorg',
    fieldLabel: 'Organisasi',
    queryMode: 'local',
    labelWidth:150,
    name: 'namaorg',
    editable: false,
    triggerAction: 'all',
    valueField: 'namaorg',
    store: orgStore
});

var kewarganegaraanStore = Ext.create('Ext.data.Store', {
        fields: ['idkewarganegaraan','namakewarganegaraan'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/kewarganegaraan',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxkewarganegaraan', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxkewarganegaraan',
    displayField: 'namakewarganegaraan',
    fieldLabel: 'Kewarganegaraan',
    queryMode: 'local',
    labelWidth:150,
    name: 'namakewarganegaraan',
    editable: false,
    triggerAction: 'all',
    valueField: 'namakewarganegaraan',
    store: kewarganegaraanStore
});

var jadwalKerjaStore = Ext.create('Ext.data.Store', {
        fields: ['idjadwalkerja', 'namajadwalkerja'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jadwalkerja',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
Ext.define('comboxJadwalKerja', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxJadwalKerja',
    displayField: 'namajadwalkerja',
    fieldLabel: 'Jadwal Kerja',
    queryMode: 'local',
    name: 'namajadwalkerja',
    editable: false,
    triggerAction: 'all',
    valueField: 'namajadwalkerja',
    store: jadwalKerjaStore
});