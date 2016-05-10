<?php

class m_rulesupahtidaktetap extends CI_Model {

    function tableName() {
        return 'kebijakanupahtidaktetap';
    }

    function pkField() {
        return 'idkebijakanupahtidaktetap';
    }

    function searchField() {
        $field = "kodekebijakan,namakebijakan";
        return explode(",", $field);
    }

    function selectField() {
        return "idkebijakanupahtidaktetap,a.idkomponenupah,idkebijakanpengupahan,a.idlevel,nilai,b.urutan,b.levelname,c.namakomponen";
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
                    join level b ON a.idlevel = b.idlevel
                    join komponenupah c ON a.idkomponenupah = c.idkomponenupah";

        return $query;
    }

    function whereQuery() {
        // if($this->session->userdata('idcompany')!=1)
        // {
        //     //selain master admin
        //     $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        // } else {
            $wer = null;
        // }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            "idkebijakanupahtidaktetap" => $this->input->post('idkebijakanupahtidaktetap') == '' ? $this->m_data->getSeqVal('seq_komponenkebijakan') : $this->input->post('idkebijakanupahtidaktetap'),
            // "idkomponenupah"  => $this->session->userdata('idkomponenupah'),
            "idkomponenupah"  => $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $this->input->post('namakomponen')),
            "idkebijakanpengupahan"  => $this->input->post('idkebijakanpengupahan'),
            "idlevel"  => $this->m_data->getID('level', 'levelname', 'idlevel', $this->input->post('levelname')),
            "nilai"  => $this->input->post('nilai')
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

}

?>