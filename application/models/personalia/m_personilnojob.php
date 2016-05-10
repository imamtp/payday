<?php

class m_personilnojob extends CI_Model {

    function tableName() {
        return 'pelamar';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "a.namalengkap,nik,companyname";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,a.ni,nik,a.namalengkap,x.idpekerjaan,k.statuscalon,a.display,a.idcompany,m.companyname";
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
                    LEFT  JOIN
          (
          		SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
          		FROM pekerjaan
          		WHERE statuspergerakan='Disetujui'
          		GROUP BY idpelamar
          ) as x ON a.idpelamar = x.idpelamar
          JOIN calonpelamar k ON a.idpelamar = k.idpelamar
          join company m ON a.idcompany = m.idcompany";
        return $query;
    }

    function whereQuery() {
         return "a.display is null ".$this->m_data->whereCompany('a',false)." AND (k.statuscalon='Disetujui' OR a.status is null) AND x.idpekerjaan is null";
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
