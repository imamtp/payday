<?php

class m_tingkatlokasi extends CI_Model {

    function tableName() {
        return 'tingkatlokasi';
    }

    function pkField() {
        return 'idtingkatlokasi';
    }

    function searchField() {
        $field = "tingkatlokasi";
        return explode(",", $field);
    }

    function selectField() {
        return "idtingkatlokasi,tingkatlokasi,kodetingkatlokasi,deskripsi,status,userin,datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodetingkatlokasi'=>'Kode Tingkat Lokasi'  
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
            'idtingkatlokasi' => $this->input->post('idtingkatlokasi') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idtingkatlokasi'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'tingkatlokasi' => $this->input->post('tingkatlokasi'),
            'kodetingkatlokasi' => $this->input->post('kodetingkatlokasi'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'deskripsi' => $this->input->post('deskripsi'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>