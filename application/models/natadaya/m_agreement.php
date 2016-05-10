<?php

class m_agreement extends CI_Model {

    function tableName() {
        return 'adminsuper';
    }

    function pkField() {
        return 'idsuperadmin';
    }

    function searchField() {
        $field = "aggrementno";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsuperadmin,a.aggrementno,a.startdate,a.enddate,a.status,b.productname,b.productcode,c.realname,c.username,d.companycode,d.companyname,d.idcompany";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        // $f = array(
        //   'aggrementno'=>'No Perjanjian'
        // );
        return null;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join product b on a.productid = b.productid
                    left join sys_user c ON a.user_id = c.user_id
                    left join company d ON a.idcompany = d.idcompany";

        return $query;
    }

    function whereQuery() {
        return " c.group_id=2 and a.display is null and a.status='Aktif'";
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
            'startdate' => $this->input->post('startdate'),
            'enddate' => $this->input->post('enddate'),
            'productname' => $this->input->post('productname'),
            'description' => $this->input->post('description'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>