<?php

class m_pendidikan extends CI_Model {

    function tableName() {
        return 'pendidikan';
    }

    function pkField() {
        return 'idpendidikan';
    }

    function searchField() {
        $field = "namainstansi";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpendidikan,a.idpelamar,a.fakultas,a.jurusan,a.tahunmulai,a.tahunselesai,a.namainstansi,a.userin,a.datein,b.namajenjang";
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
                    join jenjangpendidikan b ON a.idjenjangpendidikan = b.idjenjangpendidikan";

        return $query;
    }

    function whereQuery() {
        // if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     $wer = " AND (b.idcompany=".$this->session->userdata('idcompany').")";
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (b.idcompany=".$this->session->userdata('idcompany').")";
        //     } else {
        //         $wer = null;
        //     }
         return "a.display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idpendidikan' => $this->input->post('idpendidikan') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idpendidikan'),
            // 'idtingkatlokasi' => $this->m_data->getID('tingkatlokasi', 'tingkatlokasi', 'idtingkatlokasi', $this->input->post('tingkatlokasi')),
            // 'idlevelindividu' => $this->input->post('idlevelindividu'),
            'idjenjangpendidikan' => $this->m_data->getID('jenjangpendidikan', 'namajenjang', 'idjenjangpendidikan', $this->input->post('namajenjang')),
            // 'idkekaryaan' => $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            // 'tglmasuk' => backdate2_reverse($this->input->post('tglmasuk')),
            // 'tglberakhir' => backdate2_reverse($this->input->post('tglberakhir')),
            'fakultas' => $this->input->post('fakultas'),
            // 'idlokasiorgatasan' => $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
            'jurusan' => $this->input->post('jurusan'),
            // 'display' int4,
            // 'userin' varchar(20),
            // 'usermod' varchar(20),
            // 'datein' timestamp(6),
            // 'datemod' timestamp(6),
            'tahunmulai' => $this->input->post('tahunmulai'),
            'tahunselesai' => $this->input->post('tahunselesai'),
            'namainstansi' => $this->input->post('namainstansi'),
            'idpelamar' => $this->input->post('idpelamar')
        );
        return $data;
    }

}

?>