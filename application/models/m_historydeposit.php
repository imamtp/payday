<?php

class m_historydeposit extends CI_Model {

    function tableName() {
        return 'deposit';
    }

    function pkField() {
        return 'iddeposit';
    }

    function searchField() {
        $field = "aggrementno";
        return explode(",", $field);
    }

    function selectField() {
        return "a.iddeposit,a.aggrementno,a.idcompany,a.depositdate,a.noref,a.amount,a.accname,a.bankname,d.price,a.accnumber,c.norek,d.productname,d.productcode,a.via,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        // $f = array(
        //   'aggrementno'=>'No Perjanjian',
        //   'usercode'=>'Kode User', 
        //   'companycode'=>'Kode Perusahaan'   
        // );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a  
                    join adminsuper b ON a.idsuperadmin = b.idsuperadmin
                    join natadaya_rekening c ON a.idreknatadaya = c.idreknatadaya
                    join product d ON b.productid = d.productid";

        return $query;
    }

    function whereQuery() {
        return " a.display is null";
    }

    function orderBy() {
        return "a.datein desc";
    }

    function updateField() { 
       $aggrementno = $this->input->post('aggrementno');
       $q = $this->db->get_where('adminsuper',array('aggrementno'=>$aggrementno))->row();

       $data = array(
            'iddeposit' => $this->input->post('iddeposit') == '' ? $this->m_data->getSeqVal('seq_deposit') : $this->input->post('iddeposit'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idsuperadmin' => $q->idsuperadmin,
            'depositdate' => backdate2_reverse($this->input->post('depositdate')),
            'noref' => $this->input->post('noref'),
            'idreknatadaya' => $this->m_data->getID('natadaya_rekening', 'norek', 'idreknatadaya', $this->input->post('norek')),
            'accname' => $this->input->post('accname'),
            'bankname' => $this->input->post('bankname'),
            'accnumber' => $this->input->post('accnumber'),
            'amount' => cleardot2($this->input->post('amount')),
            'via' => $this->input->post('via'),
            'idcompany' => $q->idcompany,
            'aggrementno' => $aggrementno,
            'status' => 'Waiting Respond'
        );
        return $data;
    }

}

?>