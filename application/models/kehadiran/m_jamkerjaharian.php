<?php

class m_jamkerjaharian extends CI_Model {

    function tableName() {
        return 'jamkerjaharian';
    }

    function pkField() {
        return 'idjamkerjaharian';
    }

    function searchField() {
        $field = "kodejamkerja,namajamkerja";
        return explode(",", $field);
    }

    function selectField() {
        return "idjamkerjaharian,kodejamkerja,namajamkerja,jammasuk_jam,jammasuk_menit,jamkeluar_jam,jamkeluar_menit,toleransi_jam,toleransi_menit,mulaiistirahat_jam,mulaiistirahat_menit,akhiristirahat_jam,akhiristirahat_menit,toleransiistirahat_jam,toleransiistirahat_menit,a.status,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodejamkerja'=>'kode jam kerja'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
         if($this->session->userdata('idcompany')==1)
        {
            //master
            // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        } else  if($this->session->userdata('idcompany')!=1)
            {
                //selain master admin
                // if($this->session->userdata('group_id')==2)
                // {
                //     $idcompany = $this->session->userdata('idcompany');
                // } else {
                //     $idcompany = $this->session->userdata('idcompanyparent');
                // }
                $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.idcompany=".$this->session->userdata('idcompanyparent').")";
            } else {
                $wer = null;
            }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            "idjamkerjaharian" => $this->input->post('idjamkerjaharian') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idjamkerjaharian'),
            // "idjamkerjaharian" int4 NOT NULL,
            "kodejamkerja" => $this->input->post('kodejamkerja'),
            "namajamkerja" => $this->input->post('namajamkerja'),
            "jammasuk_jam" => $this->input->post('jammasuk_jam'),
            "jammasuk_menit" => $this->input->post('jammasuk_menit'),
            "jamkeluar_jam" => $this->input->post('jamkeluar_jam'),
            "jamkeluar_menit" => $this->input->post('jamkeluar_menit'),
            "toleransi_jam" => $this->input->post('toleransi_jam'),
            "toleransi_menit" => $this->input->post('toleransi_menit'),
            "mulaiistirahat_jam" => $this->input->post('mulaiistirahat_jam'),
            "mulaiistirahat_menit" => $this->input->post('mulaiistirahat_menit'),
            "akhiristirahat_jam" => $this->input->post('akhiristirahat_jam'),
            "akhiristirahat_menit" => $this->input->post('akhiristirahat_menit'),
            "toleransiistirahat_jam" => $this->input->post('toleransiistirahat_jam'),
            "toleransiistirahat_menit" => $this->input->post('toleransiistirahat_menit'),
            "status" => $this->input->post('status'),
            // "keterangan" => $this->input->post('keterangan'),
            "idcompany" =>$this->session->userdata('idcompany'),
        );
        return $data;
    }

}

?>