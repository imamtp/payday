<?php

class m_suratlembur extends CI_Model {

    function tableName() {
        return 'lembur';
    }

    function pkField() {
        return 'idlembur';
    }

    function searchField() {
        $field = "namalengkap,nik";
        return explode(",", $field);
    }

    function selectField() {
        return "idlembur,idpelamar,idwaktulembur,tgllembur,formulalembur,waktulembur,datein,userin,mulailembur_jam,mulailembur_menit,akhirlembur_jam,akhirlembur_menit,jammulailembur,jamakhirlembur,durasi,namalengkap,namajabatan,namaorg,namaatasan,namajabatanatasan,namaorgatasan,nik,display,idcompany";
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
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
         return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $tgllembur = backdate2_reverse($this->input->post('tgllembur'));
        $idpelamar = $this->input->post('idpelamar');

        if($this->input->post('statusformSuratLembur')=='input')
        {
            //cek dulu dia izin apa engga
            $q = $this->db->query("select idpelamar from pengajuanizin where display is null and ('$tgllembur' between startdate and enddate)");
            if($q->num_rows()>0)
            {
                 $json = array('success' => false, 'message' => 'Tidak bisa mengajukan data lembur karena karyawan sedang dalam periode perizinan');
                 echo json_encode($json);
                 exit;
            }

            //cek duplikasi
            $q = $this->db->get_where('lembur',array('idpelamar'=>$idpelamar,'display'=>null,'tgllembur'=>"$tgllembur"));
            if($q->num_rows()>0)
            {
                 $json = array('success' => false, 'message' => 'Tidak bisa mengajukan data lembur pada tanggal yang sama');
                 echo json_encode($json);
                 exit;
            }

            $idlembur =$this->m_data->getSeqVal('seq_lembur');

        } else if($this->input->post('statusformSuratLembur')=='edit')
         {   
            $idlembur = $this->input->post('idlembur');
            $q = $this->db->get_where('lembur',array('idlembur'=>$idlembur))->row();
            if($q->tgllembur!=$tgllembur)
            {
                //edit tanggal lembur
                $q = $this->db->query("select idpelamar from pengajuanizin where display is null and ('$tgllembur' between startdate and enddate)");
                if($q->num_rows()>0)
                {
                     $json = array('success' => false, 'message' => 'Tidak bisa mengajukan data lembur karena karyawan sedang dalam periode perizinan');
                     echo json_encode($json);
                     exit;
                }

                //cek duplikasi
                $q = $this->db->get_where('lembur',array('idpelamar'=>$idpelamar,'display'=>null,'tgllembur'=>"$tgllembur"));
                if($q->num_rows()>0)
                {
                     $json = array('success' => false, 'message' => 'Tidak bisa mengajukan data lembur pada tanggal yang sama');
                     echo json_encode($json);
                     exit;
                }

            }
        }

        $data = array(
            // "idpolakerja" => $this->input->post('idpolakerja') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpolakerja'),
            // "kodepolakerja" => $this->input->post('kodepolakerja'),
            // "namapola"  => $this->input->post('namapola'),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('startdate')),
            // "keterangan" => $this->input->post('keterangan'),
            // "status" => $this->input->post('status'),
            "idlembur" => $idlembur,
            "idpelamar" => $idpelamar,
            "idwaktulembur" => $this->m_data->getID('waktulembur', 'waktulembur', 'idwaktulembur', $this->input->post('waktulembur')),
            "tgllembur" => $tgllembur,
            "formulalembur" => $this->input->post('formulalembur'),
            "mulailembur_jam" => $this->input->post('mulailembur_jam'),
            "mulailembur_menit" => $this->input->post('mulailembur_menit'),
            "akhirlembur_jam" => $this->input->post('akhirlembur_jam'),
            "akhirlembur_menit" => $this->input->post('akhirlembur_menit'),
            "idformulalembur" => $this->input->post('idformulalembur'),
        );
        return $data;
    }

}

?>