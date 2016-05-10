<?php

class m_rulesbenefit extends CI_Model {

    function tableName() {
        return 'kebijakanbenefit';
    }

    function pkField() {
        return 'idkebijakanbenefit';
    }

    function searchField() {
        $field = "kodekebijakan,namakebijakan";
        return explode(",", $field);
    }

    function selectField() {
        return "idkebijakanbenefit,a.idkebijakanpengupahan,a.idbenefit,a.idlevel,nilai,b.urutan,b.levelname,c.namabenefit";
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
                    join komponenbenefit c ON a.idbenefit = c.idbenefit";

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
            "idkebijakanbenefit" => $this->input->post('idkebijakanbenefit') == '' ? $this->m_data->getSeqVal('seq_komponenkebijakan') : $this->input->post('idkebijakanbenefit'),
            // "idkomponenupah"  => $this->session->userdata('idkomponenupah'),
            "idbenefit"  => $this->m_data->getID('komponenbenefit', 'namabenefit', 'idbenefit', $this->input->post('namabenefit')),
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