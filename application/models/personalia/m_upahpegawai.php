<?php

class m_upahpegawai extends CI_Model {

    function tableName() {
        return 'upahkaryawan';
    }

    function pkField() {
        return 'idupahkaryawan';
    }

    function searchField() {
        $field = "kodekomponen,kenapajak,namakomponen,fungsipajak,hitungpajak,jangkawaktu";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idupahkaryawan,a.idpelamar,a.idkomponenupah,nilai,kodekomponen,kenapajak,namakomponen,fungsipajak,hitungpajak,b.jeniskomponen,jangkawaktu,jenisnilai,angkatetap,persen,pembagi";
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
                    join komponenupah b ON a.idkomponenupah = b.idkomponenupah";

        return $query;
    }

    function whereQuery() {
         return "a.display is null";
    }

    function orderBy() {
        return "idupahkaryawan desc";
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