<?php

class m_anakgrid extends CI_Model {

    function tableName() {
        return 'dataanak';
    }

    function pkField() {
        return 'datanakid';
    }

    function searchField() {
        $field = "namaanak";
        return explode(",", $field);
    }

    function selectField() {
        return "datanakid,idemployee,namaanak";
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
            'datanakid' => $this->input->post('datanakid') == '' ? $this->m_data->getSeqVal('seq_dataanak') : $this->input->post('datanakid'),
            'idemployee' => $this->input->post('idemployee'),
            'namaanak'=>$this->input->post('namaanak')
        );
        return $data;
    }

}

?>