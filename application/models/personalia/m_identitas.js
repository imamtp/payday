<?php

class m_identitas extends CI_Model {

    function tableName() {
        return 'identitas';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "productname,productcode";
        return explode(",", $field);
    }

    function selectField() {
        return "productid,productname,startdate,enddate,status,productcode,maxemployee,startdate,enddate,userin,datein,description";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'productcode'=>'Kode Produk'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idpelamar'=> $this->input->post('status'),
            'nomorktp' => $this->input->post('status'),
            'masberlakuktp' => $this->input->post('status'),
            'nonpwp' => $this->input->post('status'),
            'idptkp' => $this->input->post('status'),
            'nomorsim1' => $this->input->post('status'),
            'jenissim1' => $this->input->post('status'),
            'masaberlakusim1' => $this->input->post('status'),
            'nomorsim2' => $this->input->post('status'),
            'jenissim2' => $this->input->post('status'),
            'masaberlakusim2' => $this->input->post('status'),
            'nomorsim3' => $this->input->post('status'),
            'jenissim3' => $this->input->post('status'),
            'masaberlakusim3' => $this->input->post('status'),
            'nomorpasport' => $this->input->post('status'),
            'masaberlakupassport' => $this->input->post('status')
        );
        return $data;
    }

}

?>