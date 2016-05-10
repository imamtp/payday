<?php

class m_SuratLembur extends CI_Model {

    function tableName() {
        return 'lembur';
    }

    function pkField() {
        return 'idlembur';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "idpengajuanizin,a.idpelamar,a.idjenisizin,startdate,enddate,a.namalengkap,durasi,namajabatan,namaorg,a.namaatasan,a.namajabatanatasan,a.namaorgatasan,d.namaizin,e.nik";
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
                    join v_detailkaryawan b ON a.idpelamar = b.idpelamar
                    join pelamar c ON a.idpelamar = c.idpelamar
                    join jenisizin d ON a.idjenisizin = d.idjenisizin
                    join calonpelamar e ON c.idpelamar = e.idpelamar";

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
                $wer = " (c.idcompany=".$this->session->userdata('idcompany')." OR c.idcompany=".$this->session->userdata('idcompanyparent').")";
            } else {
                $wer = null;
            }
         return $wer;
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
            "idlembur" => $this->input->post('idlembur') == '' ? $this->m_data->getSeqVal('seq_lembur') : $this->input->post('idlembur'),
            "idpelamar" => $this->input->post('idpelamar'),
            "idwaktulembur" => $this->m_data->getID('waktulembur', 'waktulembur', 'idwaktulembur', $this->input->post('waktulembur')),
            "tgllembur" => backdate2_reverse($this->input->post('tgllembur')),
            "formulalembur" => $this->input->post('formulalembur'),
            "mulailembur_jam" => $this->input->post('mulailembur_jam'),
            "mulailembur_menit" => $this->input->post('mulailembur_menit'),
            "akhirlembur_jam" => $this->input->post('akhirlembur_jam'),
            "akhirlembur_menit" => $this->input->post('akhirlembur_menit')
        );
        return $data;
    }

}

?>