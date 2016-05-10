<?php

class m_deposit extends CI_Model {

    function tableName() {
        return 'deposit';
    }

    function pkField() {
        return 'iddeposit';
    }

    function searchField() {
        $field = "aggrementno,productname";
        return explode(",", $field);
    }

    function selectField() {
        return "a.iddeposit,a.depositdate,a.noref,a.amount,a.accname,a.bankname,a.accnumber,a.via,a.status,a.userin,a.datein,b.idcompany,b.aggrementno,b.startdate,b.enddate,b.idsuperadmin,c.norek,d.productname,d.productcode,a.depositdate,e.companyname,e.companycode";
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
                    join adminsuper b ON a.idsuperadmin = b.idsuperadmin
                    join natadaya_rekening c ON a.idreknatadaya = c.idreknatadaya
                    join product d ON b.productid = d.productid
                    join company e ON a.idcompany = e.idcompany";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
    }

    function orderBy() {
        return "a.datein desc";
    }

    function updateField() { 
        $status =  $this->input->post('status');
        $amount = cleardot2($this->input->post('amount'));

        if($status=='Receive')
        {
            //update saldo,kirim email konfirmasi
            $q = $this->db->get_where('adminsuper',array('aggrementno'=>$this->input->post('aggrementno')))->row();
            $oldbalance= $q->balance==null ? 0 : $q->balance;
            $newbalance = $oldbalance+$amount;

            $this->db->where('aggrementno',$this->input->post('aggrementno'));
            $this->db->update('adminsuper',array('balance'=>$newbalance));
        }

        $data = array(
            'iddeposit' => $this->input->post('iddeposit') == '' ? $this->m_data->getSeqVal('seq_deposit') : $this->input->post('iddeposit'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idsuperadmin' => $this->input->post('idsuperadmin'),
            'depositdate' => backdate2_reverse($this->input->post('depositdate')),
            'noref' => $this->input->post('noref'),
            'idreknatadaya' => $this->m_data->getID('natadaya_rekening', 'norek', 'idreknatadaya', $this->input->post('norek')),
            'accname' => $this->input->post('accname'),
            'bankname' => $this->input->post('bankname'),
            'accnumber' => $this->input->post('accnumber'),
            'amount' => $amount,
            'via' => $this->input->post('via'),
            'idcompany' => $this->input->post('idcompany'),
            'aggrementno' => $this->input->post('aggrementno'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>