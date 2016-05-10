<?php

class m_pergerakanpersonel extends CI_Model {

    function tableName() {
        return 'pergerakan';
    }

    function pkField() {
        return 'idpergerakan';
    }

    function searchField() {
        $field = "namapergerakan";
        return explode(",", $field);
    }

    function selectField() {
        return "idpergerakan,kodepergerakan,namapergerakan,deskripsi,status,userin,datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodepergerakan'=>'Kode Pergerakan'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
    }

    function orderBy() {
        return "kodepergerakan";
    }

    function updateField() { 
        $data = array(
            'idpergerakan' => $this->input->post('idpergerakan') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idpergerakan'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'kodepergerakan' => $this->input->post('kodepergerakan'),
            'namapergerakan' => $this->input->post('namapergerakan'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'deskripsi' => $this->input->post('deskripsi'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>