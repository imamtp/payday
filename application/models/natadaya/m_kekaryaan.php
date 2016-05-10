<?php

class m_kekaryaan extends CI_Model {

    function tableName() {
        return 'kekaryaan';
    }

    function pkField() {
        return 'idkekaryaan';
    }

    function searchField() {
        $field = "kekaryaanname,kodekekaryaan";
        return explode(",", $field);
    }

    function selectField() {
        return "idkekaryaan,kekaryaanname,description,status,idcompany,kodekekaryaan,userin,datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekekaryaan'=>'Kode kekaryaan'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        //  if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.idcompany=1)";
        //     } else {
        //         $wer = null;
        //     }
        //  return "a.display is null $wer";
        return "a.display is null AND (a.idcompany=1)";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idkekaryaan' => $this->input->post('idkekaryaan') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idkekaryaan'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'kekaryaanname' => $this->input->post('kekaryaanname'),
            'description' => $this->input->post('description'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            'kodekekaryaan' => $this->input->post('kodekekaryaan'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>