<?php

class m_hubkeluarga extends CI_Model {

    function tableName() {
        return 'hubkeluarga';
    }

    function pkField() {
        return 'idhubkeluarga';
    }

    function searchField() {
        $field = "namahubkeluarga,kodehubkeluarga";
        return explode(",", $field);
    }

    function selectField() {
        return "idhubkeluarga,namahubkeluarga,a.status,a.idcompany,kodehubkeluarga,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodehubkeluarga'=>'Kode Hubungan Keluarga'  
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
            'idhubkeluarga' => $this->input->post('idhubkeluarga') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idhubkeluarga'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namahubkeluarga' => $this->input->post('namahubkeluarga'),
            'kodehubkeluarga' => $this->input->post('kodehubkeluarga'),
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