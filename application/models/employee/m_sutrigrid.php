<?php

class m_sutrigrid extends CI_Model {

    function tableName() {
        return 'datasutri';
    }

    function pkField() {
        return 'datasutri';
    }

    function searchField() {
        $field = "namasutri";
        return explode(",", $field);
    }

    function selectField() {
        return "datasutri,idemployee,namasutri,work,CASE WHEN samework::boolean=TRUE THEN 'Bekerja ditempat yang sama dengan suami/istri'
         WHEN samework::boolean=FALSE THEN 'Bekerja ditempa yang berbeda dengan suami/istri' end as samework";
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
            'datasutri' => $this->input->post('datasutri') == '' ? $this->m_data->getSeqVal('seq_datasutri') : $this->input->post('datasutri'),
            'idemployee' => $this->input->post('idemployee'),
            'namasutri'=>$this->input->post('namasutri'),
            'work'=>$this->input->post('work'),
            'samework'=>$this->input->post('samework')== '' ? 'f' : $this->input->post('samework')
        );
        return $data;
    }

}

?>