<?php

class m_vsuratlembur extends CI_Model {

    function tableName() {
        return 'v_lembur';
    }

    function pkField() {
        return 'idlembur';
    }

    function searchField() {
        $field = "namalengkap,nik";
        return explode(",", $field);
    }

    function selectField() {
        return "idlembur,a.idpelamar,idwaktulembur,tgllembur,formulalembur,waktulembur,a.datein,a.userin,mulailembur_jam,mulailembur_menit,akhirlembur_jam,akhirlembur_menit,jammulailembur,jamakhirlembur,durasi,a.namalengkap,a.display,a.idcompany,nik,c.idformulalembur,c.namarumuslembur,cc.namajabatan as namajabatanatasan,ee.namaorg as namaorgatasan,ff.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodepolakerja'=>'Kode pola kerja'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join calonpelamar b ON a.idpelamar = b.idpelamar
                    join rumusanlembur c ON a.idformulalembur = c.idformulalembur
                    join pelamar d ON a.idpelamar = d.idpelamar
                    INNER JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan    
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
                    join company ff ON d.idcompany = ff.idcompany";

        return $query;
    }

    function whereQuery() {
          return "a.display is null ". $this->m_data->whereCompany('a',false)."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            // "idpolakerja" => $this->input->post('idpolakerja') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpolakerja'),
            // "kodepolakerja" => $this->input->post('kodepolakerja'),
            // "namapola"  => $this->input->post('namapola'),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('startdate')),
            // "keterangan" => $this->input->post('keterangan'),
            // "status" => $this->input->post('status'),
            "idlembur" => $this->input->post('idlembur') == '' ? $this->m_data->getSeqVal('seq_lembur') : $this->input->post('idlembur'),
            "idpelamar" => $this->input->post('idpelamar'),
            "idwaktulembur" => $this->m_data->getID('waktulembur', 'waktulembur', 'idwaktulembur', $this->input->post('waktulembur')),
            "tgllembur" => backdate2_reverse($this->input->post('tgllembur')),
            "formulalembur" => $this->input->post('formulalembur'),
            "mulailembur_jam" => $this->input->post('mulailembur_jam'),
            "mulailembur_menit" => $this->input->post('mulailembur_menit'),
            "akhirlembur_jam" => $this->input->post('akhirlembur_jam'),
            "akhirlembur_menit" => $this->input->post('akhirlembur_menit'),
            "idformulalembur"=>$this->input->post('idformulalembur')
        );
        return $data;
    }

}

?>