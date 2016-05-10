<?php

class m_rulespengurangupah extends CI_Model {

    function tableName() {
        return 'kebijakanpengurangupah';
    }

    function pkField() {
        return 'idkebijakanpengurangupah';
    }

    function searchField() {
        $field = "kodekebijakan,namakebijakan";
        return explode(",", $field);
    }

    function selectField() {
        return "idkebijakanpengurangupah,a.idpengurangupah,idkebijakanpengupahan,a.idlevel,nilai,b.urutan,b.levelname,c.namapengurangupah";
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
                    join pengurangupah c ON a.idpengurangupah = c.idpengurangupah";

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
            "idkebijakanpengurangupah" => $this->input->post('idkebijakanpengurangupah') == '' ? $this->m_data->getSeqVal('seq_komponenkebijakan') : $this->input->post('idkebijakanpengurangupah'),
            // "idkomponenupah"  => $this->session->userdata('idkomponenupah'),
            "idpengurangupah"  => $this->m_data->getID('pengurangupah', 'namapengurangupah', 'idpengurangupah', $this->input->post('namapengurangupah')),
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