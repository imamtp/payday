<?php

class m_gantiproduk extends CI_Model {

    function tableName() {
        return 'gantiproduk';
    }

    function pkField() {
        return 'idgantiproduk';
    }

    function searchField() {
        $field = "namaagama,kodeagama";
        return explode(",", $field);
    }

    function selectField() {
        return "idagama,namaagama,status,idcompany,kodeagama,userin,datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeagama'=>'Kode Agama'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('idcompany')==1)
        {
            //master
            $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        } else  if($this->session->userdata('idcompany')!=1)
            {
                //selain master admin
                $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.idcompany=1)";
            } else {
                $wer = null;
            }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $aggrementno = $this->input->post('aggrementno');
        $productidnew = $this->input->post('idproductnew');

        //cek harga produk baru berapa
        $q = $this->db->get_where('product',array('productid'=>$productidnew))->row();
        $jumkaryawanNew = $q->maxemployee;

        //cek saldonya cukup atau tidak
        $qsa = $this->db->get_where('adminsuper',array('aggrementno'=>$aggrementno))->row();
        if(intval($qsa->balance)<intval($q->price))
        {
            // if($qsa->balance!==$q->price);
            // {
                $json = array('success' => false, 'message' => 'Saldo tidak mencukupi ');
                echo json_encode($json);
                exit;
            // }
        } 

        //cek jumlah karyawan mencukupi atau tidak
        //cek downgrade atau upgrade
        $idproductold = $qsa->productid;
        $qold = $this->db->get_where('product',array('productid'=>$idproductold))->row();

        $totalkaryawan = $this->m_data->totalkaryawan($qsa->idcompany);
        // if($qold->price<$q->price)
        // {
        //     //upgrade
        //     if($totalkaryawan>$jumkaryawanNew)
        //     {
        //         $json = array('success' => false, 'message' => 'Jumlah karyawan yang ada melebihi kuota maksimal dari produk yang dipilih '.$totalkaryawan.' '.$jumkaryawanNew);
        //         echo json_encode($json);
        //         exit;
        //     }
        // } else {
        //     //downgrade
        //     // echo $totalkaryawan.'>'.$jumkaryawanNew;

        //     2 : 1
        //     if($totalkaryawan>$jumkaryawanNew)
        //     {
        //         $json = array('success' => false, 'message' => 'Jumlah karyawan yang ada melebihi kuota maksimal dari produk yang dipilih '.$totalkaryawan.' '.$jumkaryawanNew);
        //         echo json_encode($json);
        //         exit;
        //     }
        // }
        if($totalkaryawan>$jumkaryawanNew && $jumkaryawanNew!=0)
        {
            $json = array('success' => false, 'message' => 'Jumlah karyawan yang ada melebihi kuota maksimal dari produk yang dipilih');
            echo json_encode($json);
            exit;
        }

        $this->db->where('aggrementno',$aggrementno);
        $this->db->update('adminsuper',array('productid'=>$productidnew,'balance'=>$qsa->balance-$q->price));

        $data = array(
            'idgantiproduk' => $this->input->post('idgantiproduk') == '' ? $this->m_data->getSeqVal('seq_product') : $this->input->post('idgantiproduk'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'aggrementno' => $aggrementno,
            'productidold' => $this->input->post('idproduct'),
            'productidnew' => $productidnew
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            // 'status' => $this->input->post('status'),
            // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            // 'kodelevel' => $this->input->post('kodelevel'),
            // 'urutan' => $this->input->post('urutan'),
            // 'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>