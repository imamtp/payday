<?php

class m_saldo extends CI_Model {

    function tableName() {
        return 'adminsuper';
    }

    function pkField() {
        return 'idsuperadmin';
    }

    function searchField() {
        $field = "companycode,companyname,productcode,productname";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsuperadmin,a.startdate,a.enddate,balance,holdbalance,b.companycode,b.companyname,c.productcode,c.productname";
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
                    from " . $this->tableName()." a 
                    join company b ON a.idcompany = b.idcompany
                    join product c ON a.productid = c.productid";

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