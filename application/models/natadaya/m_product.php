<?php

class m_product extends CI_Model {

    function tableName() {
        return 'product';
    }

    function pkField() {
        return 'productid';
    }

    function searchField() {
        $field = "productname,productcode";
        return explode(",", $field);
    }

    function selectField() {
        return "productid,productname,startdate,enddate,status,productcode,price,maxemployee,startdate,enddate,userin,datein,description";
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
        return " a.display is null ";
    }

    function orderBy() {
        return "price asc";
    }

    function updateField() { 
        $data = array(
            'productid' => $this->input->post('productid') == '' ? $this->m_data->getSeqVal('seq_product') : $this->input->post('productid'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'maxemployee' => $this->input->post('maxemployee'),
            'productcode' => $this->input->post('productcode'),
            'price' => cleardot2($this->input->post('price')),
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'productname' => $this->input->post('productname'),
            'description' => $this->input->post('description'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>