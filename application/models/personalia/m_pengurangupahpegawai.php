<?php

class m_pengurangupahpegawai extends CI_Model {

    function tableName() {
        return 'pengurangupahkaryawan';
    }

    function pkField() {
        return 'a.idpengurangupah,a.idpelamar';
    }

    function searchField() {
        $field = "kodepengurangupah,b.namapengurangupah,b.kenapajak,b.fungsipajak,b.hitungpajak,b.startdate,b.startdate";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpengurangupah,a.idpelamar,kodepengurangupah,b.namapengurangupah,b.kenapajak,b.fungsipajak,b.hitungpajak,b.startdate,b.startdate,angkatetappengurangupah,faktorpembagipengurangupah,jenisnilaipengurang,persenpengurangupah";
    }
    
    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekomponen'=>'Kode Upah'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join pengurangupah b ON a.idpengurangupah = b.idpengurangupah";

        return $query;
    }

    function whereQuery() {
         // return "(now() BETWEEN b.startdate and b.enddate) ". $this->m_data->whereCompany('b')."";
        return "";
    }

    function orderBy() {
        return "a.datein desc";
    }

    function updateField() { 
        $data = array(
            "idkomponenupah" => $this->input->post('idkomponenupah') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idkomponenupah'),
            "idcompany"  => $this->input->post('idcompany'),
            "kodekomponen"  => $this->input->post('kodekomponen'),
            "namakomponen"  => $this->input->post('namakomponen'),
            "kenapajak"  => $this->input->post('kenapajak'),
            "fungsipajak"  => $this->input->post('fungsipajak'),
            "hitungpajak"  => $this->input->post('hitungpajak'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate')),
            "jeniskomponen"=>'Upah Tetap'
        );
        return $data;
    }

}

?>