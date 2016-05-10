<?php

class m_configumumlembur extends CI_Model {
//upah tetap
    function tableName() {
        return 'pengaturanlembur';
    }

    function pkField() {
        return 'idpengaturanlembur';
    }

    function searchField() {
        $field = "kodepenglembur,namapenglembur";
        return explode(",", $field);
    }

    function selectField() {
        return "idpengaturanlembur,a.idcompany,b.companyname,kodepenglembur,kenapajak,namapenglembur,fungsipajak,hitungpajak,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodepenglembur'=>'kode pengaturan lembur'  
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
         return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            "idpengaturanlembur" => $this->input->post('idpengaturanlembur') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idpengaturanlembur'),
            "idcompany"  => $this->input->post('idcompany'),
            "kodepenglembur"  => $this->input->post('kodepenglembur'),
            "namapenglembur"  => $this->input->post('namapenglembur'),
            "kenapajak"  => $this->input->post('kenapajak'),
            "fungsipajak"  => $this->input->post('fungsipajak'),
            "hitungpajak"  => $this->input->post('hitungpajak'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

}

?>