<?php

class m_jenisizin extends CI_Model {

    function tableName() {
        return 'jenisizin';
    }

    function pkField() {
        return 'idjenisizin';
    }

    function searchField() {
        $field = "namaizin,kodeizin";
        return explode(",", $field);
    }

    function selectField() {
        return "idjenisizin,kodeizin,namaizin,keterangan,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeizin'=>'kode izin'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
         if($this->session->userdata('idcompany')==1)
        {
            //master
            // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        } else  if($this->session->userdata('idcompany')!=1)
            {
                //selain master admin
                // if($this->session->userdata('group_id')==2)
                // {
                //     $idcompany = $this->session->userdata('idcompany');
                // } else {
                //     $idcompany = $this->session->userdata('idcompanyparent');
                // }
                $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.idcompany=".$this->session->userdata('idcompanyparent').")";
            } else {
                $wer = null;
            }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            "idjenisizin" => $this->input->post('idjenisizin') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idjenisizin'),
            "kodeizin" => $this->input->post('kodeizin'),
            "namaizin"  => $this->input->post('namaizin'),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('startdate')),
            "keterangan" => $this->input->post('keterangan'),
            // "status" => $this->input->post('status'),
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