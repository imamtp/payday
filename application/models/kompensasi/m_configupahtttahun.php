<?php

class m_configupahtttahun extends CI_Model {

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
        return "idkomponenupah,a.idcompany,b.companyname,c.dasarupahtt,kodekomponen,namakomponen,kenapajak,fungsipajak,hitungpajak,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod,jeniskomponen,jangkawaktu,jenisnilai,pembagi,angkatetap,persen";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekomponen'=>'Kode Komponen'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join company b ON a.idcompany = b.idcompany
                    left join configdasarupahtt c ON a.idconfigdasarupahtt = c.idconfigdasarupahtt";

        return $query;
    }

    function whereQuery() {
         return "a.jeniskomponen='Upah Tidak Tetap' AND a.jangkawaktu='Tahunan' AND a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $id = $this->input->post('idkomponenupah') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idkomponenupah');
        $data = array(
            "idkomponenupah" => $id,
            "idcompany"  => $this->input->post('idcompany'),
            "idconfigdasarupahtt"  => $this->m_data->getID('configdasarupahtt', 'dasarupahtt', 'idconfigdasarupahtt', $this->input->post('dasarupahtt')),
            "namakomponen"  => $this->input->post('namakomponen'),
            "kodekomponen"  => $this->input->post('kodekomponen'),
            "kenapajak"  => $this->input->post('kenapajak'),
            "fungsipajak"  => $this->input->post('fungsipajak'),
            "hitungpajak"  => $this->input->post('hitungpajak'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate')),
            "jenisnilai"  => $this->input->post('jenisnilai'),
            "pembagi"  => $this->input->post('pembagi') != '' ? cleardot2($this->input->post('pembagi')) : null,
            "angkatetap"  => $this->input->post('angkatetap') != '' ? cleardot2($this->input->post('angkatetap')) : null,
            "persen"  => $this->input->post('persen') != '' ? cleardot2($this->input->post('persen')) : null,
            "jeniskomponen"=>'Upah Tidak Tetap',
            "jangkawaktu"=>'Tahunan'
        );
        return $data;
    }

}

?>