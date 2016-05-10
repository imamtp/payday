<?php

class m_organisasi extends CI_Model {

    function tableName() {
        return 'organisasi';
    }

    function pkField() {
        return 'idorganisasi';
    }

    function searchField() {
        $field = "kodeorg,namaorg";
        return explode(",", $field);
    }

    function selectField() {
        return "idorganisasi,kodeorg,namaorg,a.startdate,a.enddate,kodebudgetorg,deskripsi,a.userin,a.datein,a.status,a.idcompany,b.companyname,b.companycode";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeorg'=>'Kode Organisasi'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company b ON a.idcompany = b.idcompany";

        return $query;
    }

    function whereQuery() {
        $startdate = $this->input->post('startdate')=='' ? '' : backdate2_reverse($this->input->post('startdate'));
        $enddate = $this->input->post('enddate')=='' ? '' : backdate2_reverse($this->input->post('enddate'));

        if($startdate!='' && $enddate!='')
        {
            $werdate = " AND (a.startdate>='$startdate' AND a.enddate<='$enddate') ";
        } else {
            $werdate = null;
        }

        // return "a.display is null and now() between a.startdate and a.enddate ". $this->m_data->whereCompany()."";
        return "a.display is null $werdate ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idorganisasi' => $this->input->post('idorganisasi') == '' ? $this->m_data->getSeqVal('seq_organisasi') : $this->input->post('idorganisasi'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'kodeorg' => $this->input->post('kodeorg'),
            'namaorg' => strtoupper($this->input->post('namaorg')),
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'kodebudgetorg' => $this->input->post('kodebudgetorg'),
            'deskripsi' => $this->input->post('deskripsi'),
            'idcompany' => $this->input->post('idcompany')
            // 'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>