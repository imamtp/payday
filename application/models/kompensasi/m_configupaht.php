<?php

class m_configupaht extends CI_Model {
//upah tetap
    function tableName() {
        return 'komponenupah';
    }

    function pkField() {
        return 'idkomponenupah';
    }

    function searchField() {
        $field = "kodekomponen,namakomponen";
        return explode(",", $field);
    }

    function selectField() {
        return "idkomponenupah,a.idcompany,b.companyname,kodekomponen,kenapajak,namakomponen,fungsipajak,hitungpajak,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekomponen'=>'Kode Upah'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join company b ON a.idcompany = b.idcompany";

        return $query;
    }

    function whereQuery() {
         return "a.display is null ". $this->m_data->whereCompany()." AND a.jeniskomponen='Upah Tetap'";
    }

    function orderBy() {
        return "";
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