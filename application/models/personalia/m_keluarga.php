<?php

class m_keluarga extends CI_Model {

    function tableName() {
        return 'keluarga';
    }

    function pkField() {
        return 'idkeluarga';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idkeluarga,a.idpelamar,a.tempatlahir,a.tgllahir,a.pekerjaan,a.userin,a.datein,a.namalengkap,c.sexname,d.namaagama,e.namajenjang,f.namahubkeluarga";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeorg'=>'Kode Organisasi'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join pelamar b ON a.idpelamar = b.idpelamar
                    join sextype c ON a.idsex = c.idsex
                    join agama d ON a.idagama = d.idagama
                    join jenjangpendidikan e ON a.idjenjangpendidikan = e.idjenjangpendidikan
                    join hubkeluarga f ON a.idhubkeluarga = f.idhubkeluarga";

        return $query;
    }

    function whereQuery() {
        //  if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     $wer = " AND (b.idcompany=".$this->session->userdata('idcompany').")";
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (b.idcompany=".$this->session->userdata('idcompany').")";
        //     } else {
                $wer = null;
            // }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idkeluarga' => $this->input->post('idkeluarga') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idkeluarga'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idpelamar' => $this->input->post('idpelamar'),
            'namalengkap' => $this->input->post('namalengkap'),
            'tempatlahir' => $this->input->post('tempatlahir'),
            'pekerjaan' => $this->input->post('pekerjaan'),
            'tgllahir' => backdate2_reverse($this->input->post('tgllahir')),
            'idsex' => $this->m_data->getID('sextype', 'sexname', 'idsex', $this->input->post('sexname')),
            'idagama' => $this->m_data->getID('agama', 'namaagama', 'idagama', $this->input->post('namaagama')),
            'idjenjangpendidikan' => $this->m_data->getID('jenjangpendidikan', 'namajenjang', 'idjenjangpendidikan', $this->input->post('namajenjang')),
            'idhubkeluarga' => $this->m_data->getID('hubkeluarga', 'namahubkeluarga', 'idhubkeluarga', $this->input->post('namahubkeluarga'))
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
        );
        return $data;
    }

}

?>