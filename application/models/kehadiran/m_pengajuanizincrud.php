<?php

class m_pengajuanizincrud extends CI_Model {

    function tableName() {
        return 'pengajuanizin';
    }

    function pkField() {
        return 'idpengajuanizin';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "idpengajuanizin,a.idpelamar,a.idjenisizin,startdate,enddate,a.namalengkap,durasi,namaatasan,namajabatanatasan,namaorgatasan,c.namaizin";
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
                    join pelamar b ON a.idpelamar = b.idpelamar
                    join jenisizin c ON a.idjenisizin = c.idjenisizin";

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
                $wer = " (b.idcompany=".$this->session->userdata('idcompany')." OR b.idcompany=".$this->session->userdata('idcompanyparent').")";
            } else {
                $wer = null;
            }
         return $wer;
    }

    function orderBy() {
        return "";
    }

    function checkdate($startdate,$enddate,$idpelamar)
    {
        $qcek = $this->db->query("select tglmulai,tglselesai from pengajuancuti where idpelamar = $idpelamar and ('$startdate' between tglmulai and tglselesai) and display is null");
        
        if($qcek->num_rows()>0)
        {
            $r = $qcek->row();
            $json = array('success' => false, 'message' => 'Tidak bisa mengajukan izin karena karyawan sudah memiliki data cuti pada tanggal <br><b>'.backdate2($r->tglmulai).' s/d '.backdate2($r->tglselesai).'</b>');
            echo json_encode($json);
            exit;
        } else {
            $qcek = $this->db->query("select tglmulai,tglselesai from pengajuancuti where idpelamar = $idpelamar and ('$enddate' between tglmulai and tglselesai) and display is null");
            if($qcek->num_rows()>0)
            {
                $r = $qcek->row();
                $json = array('success' => false, 'message' => 'Tidak bisa mengajukan izin karena karyawan sudah memiliki data cuti pada tanggal <br><b>'.backdate2($r->tglmulai).' s/d '.backdate2($r->tglselesai).'</b>');
                echo json_encode($json);
                exit;
            }
        }
        // echo $this->db->last_query();
        $qcek = $this->db->query("select tglhadir from kehadiran where idpelamar = $idpelamar and (tglhadir between '$startdate' and '$enddate')");
        if($qcek->num_rows()>0)
        {
            $r = $qcek->row();
            $json = array('success' => false, 'message' => 'Tidak bisa mengajukan izin karena karyawan sudah memiliki data kehadiran pada tanggal <br><b>'.backdate2($r->tglhadir).'</b>');
            echo json_encode($json);
            exit;
        }
    }

    function updateField() { 
        $idpelamar = $this->input->post('idpelamar');
        $startdate = backdate2_reverse($this->input->post('startdate'));
        $enddate = backdate2_reverse($this->input->post('enddate'));
          
        
        if($this->input->post('statusformPengajuanIzinCrud')=='input')
        {
            $this->checkdate($startdate,$enddate,$idpelamar);//cek dulu apakah tidak ada cuti dan kehadiran yang telah diinput

            //check duplicate
            $qcek = $this->db->query("select idpelamar from pengajuanizin where idpelamar = $idpelamar and ('$startdate' between startdate and enddate) and display is null");        
            if($qcek->num_rows()>0)
            {
                $r = $qcek->row();
                $json = array('success' => false, 'message' => 'Tidak bisa mengajukan izin karena cuti periode cuti sudah ada');
                echo json_encode($json);
                exit;
            } else {
                $qcek = $this->db->query("select idpelamar from pengajuanizin where idpelamar = $idpelamar and ('$enddate' between startdate and enddate) and display is null");
                if($qcek->num_rows()>0)
                {
                    $r = $qcek->row();
                    $json = array('success' => false, 'message' => 'Tidak bisa mengajukan izin karena cuti periode cuti sudah ada');
                    echo json_encode($json);
                    exit;
                }
            }
            //end check duplicate
        } else if($this->input->post('statusformPengajuanIzinCrud')=='edit')
            {
                $idpengajuanizin = $this->input->post('idpengajuanizin');
                $q = $this->db->get_where('pengajuanizin',array('idpengajuanizin'=>$idpengajuanizin));
                if($q->num_rows()>0)
                {
                    $r = $q->row();
                    if($r->startdate==$startdate && $r->enddate==$enddate)
                    {

                    } else {
                        $this->checkdate($startdate,$enddate,$idpelamar);
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
            "idpengajuanizin" => $this->input->post('idpengajuanizin') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpengajuanizin'),
            "idpelamar" => $idpelamar,
            "idjenisizin" =>$this->m_data->getID('jenisizin', 'namaizin', 'idjenisizin', $this->input->post('namaizin'),true),
            "startdate" => $startdate,
            "enddate" => $enddate
        );
        return $data;
    }

}

?>