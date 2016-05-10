<?php

class m_kebijakanpengupahan extends CI_Model {

    function tableName() {
        return 'kebijakanpengupahan';
    }

    function pkField() {
        return 'idkebijakanpengupahan';
    }

    function searchField() {
        $field = "kodekebijakan,namakebijakan";
        return explode(",", $field);
    }

    function selectField() {
        return "idkebijakanpengupahan,a.idcompany,b.companyname,namakebijakan,kodekebijakan,jenislevel,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekebijakan'=>'kode kebijakan'  
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
            "idkebijakanpengupahan" => $this->input->post('idkebijakanpengupahan') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idkebijakanpengupahan'),
            "idcompany"  => $this->session->userdata('idcompany'),
            "kodekebijakan"  => $this->input->post('kodekebijakan'),
            "namakebijakan"  => $this->input->post('namakebijakan'),
            "jenislevel"  => $this->input->post('jenislevel'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

}

?>