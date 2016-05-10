<?php

class m_kewarganegaraan extends CI_Model {

    function tableName() {
        return 'kewarganegaraan';
    }

    function pkField() {
        return 'idkewarganegaraan';
    }

    function searchField() {
        $field = "namakewarganegaraan,kodekewarganegaraan";
        return explode(",", $field);
    }

    function selectField() {
        return "idkewarganegaraan,namakewarganegaraan,a.status,a.idcompany,kodekewarganegaraan,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekewarganegaraan'=>'Kode kewarganegaraan'  
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
         return "a.display is null ".$this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idkewarganegaraan' => $this->input->post('idkewarganegaraan') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idkewarganegaraan'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namakewarganegaraan' => $this->input->post('namakewarganegaraan'),
            'kodekewarganegaraan' => $this->input->post('kodekewarganegaraan'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            // 'kodelevel' => $this->input->post('kodelevel'),
            // 'urutan' => $this->input->post('urutan'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>