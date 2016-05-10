<?php

class m_polakerja extends CI_Model {

    function tableName() {
        return 'polakerja';
    }

    function pkField() {
        return 'idpolakerja';
    }

    function searchField() {
        $field = "namapola";
        return explode(",", $field);
    }

    function selectField() {
        return "idpolakerja,kodepolakerja,namapola,startdate,enddate,keterangan,status,startdate,enddate,userin,datein";
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
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
       
         return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            "idpolakerja" => $this->input->post('idpolakerja') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpolakerja'),
            "kodepolakerja" => $this->input->post('kodepolakerja'),
            "namapola"  => $this->input->post('namapola'),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('startdate')),
            "keterangan" => $this->input->post('keterangan'),
            "status" => $this->input->post('status'),
            // "display" int4,
            // "userin" varchar(20),
            // "usermod" varchar(20),
            // "datein" timestamp(6),
            // "datemod" timestamp(6),
            "idcompany" =>$this->session->userdata('idcompany'),
        );
        return $data;
    }

}

?>