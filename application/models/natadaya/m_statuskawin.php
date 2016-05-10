<?php

class m_statuskawin extends CI_Model {

    function tableName() {
        return 'statuskawin';
    }

    function pkField() {
        return 'idstatuskawin';
    }

    function searchField() {
        $field = "namastatuskawin,kodestatuskawin";
        return explode(",", $field);
    }

    function selectField() {
        return "idstatuskawin,namastatuskawin,a.status,a.idcompany,kodestatuskawin,a.userin,a.datein,a.usermod,a.datemod,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodestatuskawin'=>'Kode Status Perkawinan'  
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
            'idstatuskawin' => $this->input->post('idstatuskawin') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idstatuskawin'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namastatuskawin' => $this->input->post('namastatuskawin'),
            'kodestatuskawin' => $this->input->post('kodestatuskawin'),
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