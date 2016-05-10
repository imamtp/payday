<?php

class m_jenjangpendidikan extends CI_Model {

    function tableName() {
        return 'jenjangpendidikan';
    }

    function pkField() {
        return 'idjenjangpendidikan';
    }

    function searchField() {
        $field = "namajenjang";
        return explode(",", $field);
    }

    function selectField() {
        return "idjenjangpendidikan,namajenjang,kodejenjang,a.status,a.idcompany,urutan,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodejenjang'=>'Kode Jenjang'  
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
        return "urutan asc";
    }

    function updateField() { 

        $data = array(
            'idjenjangpendidikan' => $this->input->post('idjenjangpendidikan') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idjenjangpendidikan'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namajenjang' => $this->input->post('namajenjang'),
            // 'description' => $this->input->post('description'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            'kodejenjang' => $this->input->post('kodejenjang'),
            'urutan' => $this->input->post('urutan'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>