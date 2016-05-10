<?php

class m_bawahanpergerakanpending extends CI_Model {

    function tableName() {
        return 'benefit';
    }

    function pkField() {
        return 'idbenefit';
    }

    function searchField() {
        $field = "namapelatihan";
        return explode(",", $field);
    }

    function selectField() {
        return "idbenefit,idpelamar,nomorrekening,namaakunrekening,namabank,cabangbank,nopolisasuransi,nobpjskesehatan,nobpjstenagakerja,userin,datein";
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
                    from " . $this->tableName()." a";

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
            // 'idbenefit' => $this->input->post('idbenefit') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idbenefit'),
                   // 'idbenefit'=> $this->input->post('idbenefit'),
                'idpergerakanpersonil'=> $this->input->post('idpergerakanpersonil'),
                'idpelamar'=> $this->input->post('idpelamar'),
                'idpekerjaan'=> $this->input->post('idpekerjaan'),
                // 'namabank'=> $this->input->post('namabank'),
                // 'cabangbank'=> $this->input->post('cabangbank'),
                'idpelamaratasan'=> $this->input->post('idpelamaratasan'),
                'status'=> 'pending'
        );
        return $data;
    }

}

?>