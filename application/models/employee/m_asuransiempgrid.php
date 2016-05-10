<?php

class m_asuransiempgrid extends CI_Model {

    function tableName() {
        return 'asuransiemp';
    }

    function pkField() {
        return 'idasuransiemp';
    }

    function searchField() {
        $field = "namapremi,deskripsi";
        return explode(",", $field);
    }

    function selectField() {
        return "idasuransiemp,a.idasuransi,a.idemployee,b.namapremi,b.deskripsi,b.percentcompany,b.percentemployee";
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
                    from " . $this->tableName()." a "
                . "join asuransi b ON a.idasuransi = b.idasuransi";

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
            'idasuransiemp' => $this->input->post('idasuransiemp') == '' ? $this->m_data->getSeqVal('seq_asuransiemp') : $this->input->post('idasuransiemp'),
            'idasuransi' => $this->input->post('idasuransi'),
            'idemployee' => $this->input->post('idemployee')
        );
        return $data;
    }

}

?>