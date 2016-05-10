<?php

class m_jadwalupahtahunan extends CI_Model {

    function tableName() {
        return 'jadwalupah';
    }

    function pkField() {
        return 'idjadwalupah';
    }

    function searchField() {
        $field = "bulan";
        return explode(",", $field);
    }

    function selectField() {
        return "idjadwalupah,idkomponenupah,tanggal,bulan as namabulan,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeupah'=>'Kode Upah'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a";

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
            "idjadwalupah" => $this->input->post('idjadwalupah') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idjadwalupah'),
            "idkomponenupah"  => $this->input->post('idkomponenupah'),
            "tanggal"  => $this->input->post('tanggal'),
            "bulan"  => $this->input->post('namabulan'),
            "nobulan"  => ambilNoBulan($this->input->post('namabulan'))
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

}

?>