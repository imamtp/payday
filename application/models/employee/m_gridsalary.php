<?php

class m_gridsalary extends CI_Model {

    function tableName() {
        return 'sallary';
    }

    function pkField() {
        return 'idsallary';
    }

    function searchField() {
        $field = "firstname,lastname,idemployee'
            ELSE NULL 
        END as samework";
        return explode(",", $field);
    }

    function selectField() {
        return "idsallary,basicsallary,idemployee";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pegawai'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idsallary' => $this->input->post('idsallary') == '' ? $this->m_data->getSeqVal('seq_sallary') : $this->input->post('idsallary'),
            'basicsallary' => $this->input->post('basicsallary'),
            'idemployee'=>$this->input->post('idemployee')
        );
        return $data;
    }

}

?>