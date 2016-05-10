<?php

class m_reknatadaya extends CI_Model {

    function tableName() {
        return 'natadaya_rekening';
    }

    function pkField() {
        return 'idreknatadaya';
    }

    function searchField() {
        $field = "norek";
        return explode(",", $field);
    }

    function selectField() {
        return "idreknatadaya,norek,accname,accnumber,bankname,branchname,address";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'norek'=>'No Rekening'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return "display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idreknatadaya' => $this->input->post('idreknatadaya') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idreknatadaya'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'norek' => $this->input->post('norek'),
            'accname' => $this->input->post('accname'),
            'accnumber' => $this->input->post('accnumber'),
            'bankname' => $this->input->post('bankname'),
            'branchname' => $this->input->post('branchname'),
            'address' => $this->input->post('address')
        );
        return $data;
    }

}

?>