<?php

class m_tambahangajigrid extends CI_Model {

    function tableName() {
        return 'tambahangaji';
    }

    function pkField() {
        return 'idtambahangaji';
    }

    function searchField() {
        $field = "tambahantype";
        return explode(",", $field);
    }

    function selectField() {
        return "idtambahangaji,idemployee,tambahantype,startdate,enddate,jumlah,d.namasiklus,keterangan";
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
                . "join tambahangajitype b ON a.idtambahangajitype = b.idtambahangajitype
                    join siklus d ON a.idsiklus = d.idsiklus";

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
            'idtambahangaji' => $this->input->post('idtambahangaji') == '' ? $this->m_data->getSeqVal('seq_tambahangaji') : $this->input->post('idtambahangaji'),
            'idemployee' => $this->input->post('idemployee'),
            'idtambahangajitype' => $this->m_data->getID('tambahangajitype', 'tambahantype', 'idtambahangajitype', $this->input->post('tambahantype')),
            // 'idamounttype' => $this->m_data->getID('amounttype', 'amounttype', 'idamounttype', $this->input->post('amounttype')),
            'idsiklus' => $this->m_data->getID('siklus', 'namasiklus', 'idsiklus', $this->input->post('namasiklus')),
            'namatambahan'=>$this->input->post('namatambahan'),
            'startdate'=>backdate($this->input->post('startdate')),
            'enddate'=>backdate($this->input->post('enddate')),
            'jumlah'=>$this->input->post('jumlah'),
            'keterangan'=>$this->input->post('keterangan')
        );
        return $data;
    }

}

?>