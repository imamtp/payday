<?php

class m_lokasi extends CI_Model {

    function tableName() {
        return 'lokasi';
    }

    function pkField() {
        return 'idlokasi';
    }

    function searchField() {
        $field = "namalokasi";
        return explode(",", $field);
    }

    function selectField() {
        return "idlokasi,namalokasi,deskripsi,kodelokasi,status,userin,datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodelokasi'=>'Kode Lokasi'  
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
        return "";
    }

    function updateField() { 
        $data = array(
            'idlokasi' => $this->input->post('idlokasi') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idlokasi'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namalokasi' => $this->input->post('namalokasi'),
            'kodelokasi' => $this->input->post('kodelokasi'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'deskripsi' => $this->input->post('deskripsi'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>