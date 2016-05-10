<?php

class m_personildetail extends CI_Model {

    function tableName() {
        return 'pelamar';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "a.namalengkap,namajabatan,namaorg,kodeorg,namalokasi";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,a.ni,nik,a.namalengkap,aa.idpekerjaan,c.namajabatan,e.namaorg,e.kodeorg,d.namalokasi,k.statuscalon,a.display,
        j.levelname as levelnamejabatan,i.levelname as levelnameindividu,f.kekaryaanname,g.namalengkap as namaatasan,aa.tglmasuk,aa.tglberakhir,
        cc.namajabatan as namajabatanatasan,ee.namaorg as namaorgatasan,a.idcompany,l.companyname";
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
					LEFT JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    LEFT join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    LEFT JOIN strukturjabatan b ON aa.idstrukturjabatan = b.idstrukturjabatan
                    LEFT JOIN jabatan c ON b.idjabatan = c.idjabatan
                    LEFT JOIN lokasi_org d ON aa.idlokasiorg = d.idlokasiorg
                    LEFT JOIN organisasi e ON b.idorganisasi = e.idorganisasi
                    LEFT JOIN kekaryaan f ON aa.idkekaryaan = f.idkekaryaan
                    LEFT JOIN pelamar g ON aa.idpelamaratasan = g.idpelamar
                    LEFT JOIN level j ON aa.idlevelindividu = j.idlevel
                    LEFT JOIN level i ON c.idlevel = i.idlevel
                    LEFT join (select nik,idpelamar,statuscalon 
									from calonpelamar
										where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                    LEFT JOIN (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON aa.idpelamaratasan = xx.idpelamar
                    LEFT join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan
                    LEFT JOIN strukturjabatan bb ON aaa.idstrukturjabatan = bb.idstrukturjabatan
                    LEFT JOIN jabatan cc ON bb.idjabatan = cc.idjabatan
                    LEFT JOIN organisasi ee ON bb.idorganisasi = ee.idorganisasi
                    LEFT JOIN company l ON a.idcompany = l.idcompany";

        return $query;
    }

    function whereQuery() {
         if($this->input->post('notidpelamar')!='')
         {
            $wer = " AND a.idpelamar!=".$this->input->post('notidpelamar')."";
         } else {
            $wer = null;
         }
         return "a.display is null ".$this->m_data->whereCompany('a',false)."".$wer;
    }

    function orderBy() {
        return "a.idpelamar asc";
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
            // 'display' int4,
            // 'userin' varchar(20),
            // 'usermod' varchar(20),
            // 'datein' timestamp(6),
            // 'datemod' timestamp(6),
            'idstrukturjabatan' => $this->input->post('idstrukturjabatan'),
            'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            'idorganisasiatasan' => $this->input->post('idorganisasiatasan')
        );
        return $data;
    }

}

?>
