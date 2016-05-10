<?php

class m_perusahaan extends CI_Model {

    function tableName() {
        return 'company';
    }

    function pkField() {
        return 'idcompany';
    }

    function searchField() {
        $field = "companyname,companycode,aggrementno";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idcompany,a.companyaddress,a.companyname,a.email,a.companycode,b.aggrementno,b.startdate,b.enddate,b.status,c.productcode,c.productname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'companycode'=>'Kode Perusahaan'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join adminsuper b ON a.idcompany = b.idcompany
                    join product c ON b.productid = c.productid";

        return $query;
    }

    function whereQuery() {
        // if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        // } else if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        //     } else {
        //         $wer = null;
        //     }
         return "a.display is null ".$this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idlevel' => $this->input->post('idlevel') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idlevel'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'levelname' => $this->input->post('levelname'),
            'description' => $this->input->post('description'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            'kodelevel' => $this->input->post('kodelevel'),
            'urutan' => $this->input->post('urutan'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>