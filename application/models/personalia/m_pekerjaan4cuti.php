<?php

class m_pekerjaan4cuti extends CI_Model {

    function tableName() {
        return 'pekerjaan';
    }

    function pkField() {
        return 'idlokasiorg';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpekerjaan,a.idpergerakanpersonil,a.idpelamar,a.tglmasuk,a.tglberakhir,
        a.userin,a.datein,b.namalengkap,a.idlevelindividu,c.levelname as levelnameindividu,d.namalokasi,e.kekaryaanname,
        f.idjabatan,f.idstrukturjabatan,g.namajabatan,g.kodejabatan,h.levelname,
        k.namaorg,k.kodeorg,j.nik,a.statuspergerakan,a.idpelamaratasan,z.namalengkap as namaatasan,
        cc.namajabatan as namajabatanatasan,cc.kodejabatan as kodejabatanatasan,ee.namaorg as namaorgatasan,
        ee.kodeorg as kodeorgatasan,a.idorganisasiatasan,dd.namalokasi as namalokasiatasan,l.companyname";
    }

    function fieldCek()
    {

        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodebudgelokasi'=>'Kode  budge lokasi'
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join pelamar b ON a.idpelamar = b.idpelamar
                    left join pelamar z ON a.idpelamaratasan = z.idpelamar
                    join level c ON a.idlevelindividu = c.idlevel
                    left join lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                    join kekaryaan e ON a.idkekaryaan = e.idkekaryaan
                    join strukturjabatan f ON a.idstrukturjabatan = f.idstrukturjabatan
                    join organisasi k ON f.idorganisasi = k.idorganisasi
                    join jabatan g ON f.idjabatan = g.idjabatan
                    join level h ON g.idlevel = h.idlevel
                    join jabatan i ON f.idjabatan = i.idjabatan
                    join calonpelamar j ON a.idpelamar = j.idpelamar
                    LEFT JOIN (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON a.idpelamaratasan = xx.idpelamar
                    LEFT join pekerjaan aa ON xx.idpekerjaan = aa.idpekerjaan
                    LEFT JOIN strukturjabatan bb ON aa.idstrukturjabatan = bb.idstrukturjabatan
                    LEFT JOIN jabatan cc ON bb.idjabatan = cc.idjabatan
                    LEFT JOIN organisasi ee ON bb.idorganisasi = ee.idorganisasi
                    LEFT JOIN lokasi_org dd ON aa.idlokasiorg = dd.idlokasiorg
                    JOIN company l ON b.idcompany = l.idcompany";

        return $query;
    }

    function whereQuery() {
         $tgl = gmdate('Y-m-d');
         return "a.display is null ".$this->m_data->whereCompany('b')." AND (a.statuspergerakan='Diterima' OR a.statuspergerakan='Disetujui') and ('$tgl' BETWEEN a.tglmasuk AND a.tglberakhir)";
    }

    function orderBy() {
        return "a.tglmasuk desc";
    }

    function updateField() {

        $data = array(
            'idpekerjaan' => $this->input->post('idpekerjaan') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idpekerjaan'),
            // 'idtingkatlokasi' => $this->m_data->getID('tingkatlokasi', 'tingkatlokasi', 'idtingkatlokasi', $this->input->post('tingkatlokasi')),
            'idlevelindividu' => $this->input->post('idlevelindividu'),
            'idlokasiorg' => $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi')),
            'idkekaryaan' => $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            'tglmasuk' => backdate2_reverse($this->input->post('tglmasuk')),
            'tglberakhir' => backdate2_reverse($this->input->post('tglberakhir')),
            'namaatasan' => $this->input->post('namaatasan'),
            'idlokasiorgatasan' => $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
            'idpelamar' => $this->input->post('idpelamar'),
            'idpelamaratasan' => $this->input->post('idpelamaratasan')
            // 'display' int4,
            // 'userin' varchar(20),
            // 'usermod' varchar(20),
            // 'datein' timestamp(6),
            // 'datemod' timestamp(6),
            // 'idstrukturjabatan' => $this->input->post('idstrukturjabatan'),
            // 'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            // 'idorganisasiatasan' => $this->input->post('idorganisasiatasan')
        );
        return $data;
    }

}
?>
