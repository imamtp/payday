<?php

class m_agama extends CI_Model {

    function tableName() {
        return 'agama';
    }

    function pkField() {
        return 'idagama';
    }

    function searchField() {
        $field = "namaagama,kodeagama";
        return explode(",", $field);
    }

    function selectField() {
        return "idagama,namaagama,a.status,a.idcompany,kodeagama,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeagama'=>'Kode Agama'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
         return "a.display is null ".$this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idagama' => $this->input->post('idagama') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idagama'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namaagama' => $this->input->post('namaagama'),
            'kodeagama' => $this->input->post('kodeagama'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            // 'kodelevel' => $this->input->post('kodelevel'),
            // 'urutan' => $this->input->post('urutan'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>