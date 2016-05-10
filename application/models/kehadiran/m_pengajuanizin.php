<?php

class m_pengajuanizin extends CI_Model {

    function tableName() {
        return 'v_pengajuanizin';
    }

    function pkField() {
        return 'idpengajuanizin';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "idpengajuanizin,a.idpelamar,c.namalengkap,a.idjenisizin,a.startdate,a.enddate,durasi,d.namaizin,e.nik,f.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodepolakerja'=>'Kode pola kerja'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join pelamar c ON a.idpelamar = c.idpelamar
                    join jenisizin d ON a.idjenisizin = d.idjenisizin
                    join calonpelamar e ON c.idpelamar = e.idpelamar
                    join company f ON c.idcompany = f.idcompany";

        return $query;
    }

    function whereQuery() {
        //  if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         // if($this->session->userdata('group_id')==2)
        //         // {
        //         //     $idcompany = $this->session->userdata('idcompany');
        //         // } else {
        //         //     $idcompany = $this->session->userdata('idcompanyparent');
        //         // }
        //         $wer = " (c.idcompany=".$this->session->userdata('idcompany')." OR c.idcompany=".$this->session->userdata('idcompanyparent').")";
        //     } else {
        //         $wer = null;
        //     }
         return "c.display is null ". $this->m_data->whereCompany('c')."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            // "idpolakerja" => $this->input->post('idpolakerja') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpolakerja'),
            // "kodepolakerja" => $this->input->post('kodepolakerja'),
            // "namapola"  => $this->input->post('namapola'),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('startdate')),
            // "keterangan" => $this->input->post('keterangan'),
            // "status" => $this->input->post('status'),
            "idpengajuanizin" => $this->input->post('idpengajuanizin') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpengajuanizin'),
            "idpelamar" => $this->input->post('idpelamar'),
            // "idjenisizin" => $this->m_data->getID('jenisizin', 'namaizin', 'idjenisizin', $this->input->post('namaizin'),true),
            "idjenisizin" => $this->input->post('namaizin'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

}

?>