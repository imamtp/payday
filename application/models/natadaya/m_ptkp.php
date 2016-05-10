<?php

class m_ptkp extends CI_Model {

    function tableName() {
        return 'ptkp';
    }

    function pkField() {
        return 'idptkp';
    }

    function searchField() {
        $field = "namaptkp,kodeptkp";
        return explode(",", $field);
    }

    function selectField() {
        return "idptkp,namaptkp,status,idcompany,nilaiptkp,kodeptkp,userin,datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeptkp'=>'Kode PTKP'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        if($this->session->userdata('idcompany')==1)
        {
            //master
            $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        } else  if($this->session->userdata('idcompany')!=1)
            {
                //selain master admin
                // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
            } else {
                $wer = null;
            }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idptkp' => $this->input->post('idptkp') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idptkp'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namaptkp' => $this->input->post('namaptkp'),
            'kodeptkp' => $this->input->post('kodeptkp'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            // 'kodelevel' => $this->input->post('kodelevel'),
            'nilaiptkp' => $this->input->post('nilaiptkp'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>