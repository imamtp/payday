<?php

class m_perusahaan_modulorg extends CI_Model {

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
        return "a.idcompany,a.companyaddress,a.companyname,a.email,a.companycode,a.kodebudget,b.aggrementno,a.startdate,a.enddate,a.status,sort,c.productcode,c.productname";
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
                    left join adminsuper b ON a.idcompany = b.idcompany
                    left join product c ON b.productid = c.productid";

        return $query;
    }

    function whereQuery() {
       
         return "a.display is null ".$this->m_data->whereCompany()." AND a.parent is not null";
    }

    function orderBy() {
        return "a.sort asc";
    }

    function updateField() { 

        $data = array(
            'idcompany' => $this->input->post('idcompany') == '' ? $this->m_data->getSeqVal('seq_company') : $this->input->post('idcompany'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'companycode' => $this->input->post('companycode'),
            'kodebudget' => $this->input->post('kodebudget'),
            'companyname' => $this->input->post('companyname'),
            'companyaddress' => $this->input->post('companyaddress'),
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            'sort' => $this->input->post('sort'),
            'parent' => $this->session->userdata('idcompanyparent')
            // 'description' => $this->input->post('description')
        );
        return $data;
    }

}

?>