<?php

class m_pengajuancuti extends CI_Model {

    function tableName() {
        return 'pengajuancuti';
    }

    function pkField() {
        return 'idpengajuancuti';
    }

    function searchField() {
        $field = "keterangan,namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "idpengajuancuti,a.idpengaturancuti,a.idpelamar,c.namalengkap,tglmulai,tglselesai,durasi,a.keterangan,namapengcuti,e.nik,
        f.companyname,g.sisacuti";
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
                    join pengaturancuti d ON a.idpengaturancuti = d.idpengaturancuti
                    join calonpelamar e ON c.idpelamar = e.idpelamar
                    join company f ON c.idcompany = f.idcompany
                    left join (select sum(kuota-diambil) as sisacuti,idpelamar,idpengaturancuti
                                from cuticounter
                                group by idpelamar,idpengaturancuti) g ON a.idpelamar = g.idpelamar AND a.idpengaturancuti = g.idpengaturancuti";

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
         return "a.display is null ". $this->m_data->whereCompany('c')."";
    }

    function orderBy() {
        return "idpengajuancuti asc";
    }

    function checkdate($startdate,$enddate,$idpelamar)
    {
        $qcek = $this->db->query("select startdate,enddate from pengajuanizin where idpelamar = $idpelamar and ('$startdate' between startdate and enddate) and display is null");
        
        if($qcek->num_rows()>0)
        {
            $r = $qcek->row();
            $json = array('success' => false, 'message' => 'Tidak bisa mengajukan cuti karena karyawan sudah memiliki data izin pada tanggal <br><b>'.backdate2($r->startdate).' s/d '.backdate2($r->enddate).'</b>');
            echo json_encode($json);
            exit;
        } else {
            $qcek = $this->db->query("select startdate,enddate from pengajuanizin where idpelamar = $idpelamar and ('$enddate' between startdate and enddate) and display is null");
            if($qcek->num_rows()>0)
            {
                $r = $qcek->row();
                $json = array('success' => false, 'message' => 'Tidak bisa mengajukan cuti karena karyawan sudah memiliki data izin pada tanggal <br><b>'.backdate2($r->startdate).' s/d '.backdate2($r->enddate).'</b>');
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
        $durasi = $this->input->post('durasi');
        $idpelamar = $this->input->post('idpelamar');
        $tglmulai = backdate2_reverse($this->input->post('tglmulai'));
        $tglselesai = backdate2_reverse($this->input->post('tglselesai'));

        if($this->input->post('statusformPengajuanCuti')=='input')
        {
            $this->checkdate($tglmulai,$tglmulai,$idpelamar);//cek dulu apakah tidak ada cuti dan kehadiran yang telah diinput

            //check duplicate
            $qcek = $this->db->query("select idpelamar from pengajuancuti where idpelamar = $idpelamar and ('$tglmulai' between tglmulai and tglselesai) and display is null");        
            if($qcek->num_rows()>0)
            {
                $r = $qcek->row();
                $json = array('success' => false, 'message' => 'Tidak bisa mengajukan cuti karena periode cuti tersebut sudah ada');
                echo json_encode($json);
                exit;
            } else {
                $qcek = $this->db->query("select idpelamar from pengajuancuti where idpelamar = $idpelamar and ('$tglselesai' between tglmulai and tglselesai) and display is null");
                if($qcek->num_rows()>0)
                {
                    $r = $qcek->row();
                    $json = array('success' => false, 'message' => 'Tidak bisa mengajukan izin karena periode cuti tersebut sudah ada');
                    echo json_encode($json);
                    exit;
                }
            }
            //end check duplicate
        } else if($this->input->post('statusformPengajuanCuti')=='edit')
            {
                $idpengajuancuti = $this->input->post('idpengajuancuti');
                $q = $this->db->get_where('pengajuancuti',array('idpengajuancuti'=>$idpengajuancuti));
                if($q->num_rows()>0)
                {
                    $r = $q->row();
                    if($r->tglmulai==$tglmulai && $r->tglselesai==$tglselesai)
                    {

                    } else {
                        $this->checkdate($tglmulai,$tglselesai,$idpelamar);
                    }
                }
            }



		$id = $this->m_data->getID('pengaturancuti', 'namapengcuti', 'idpengaturancuti', $this->input->post('namapengcuti'));

        $q = $this->db->get_where('cuticounter',array('idpelamar'=>$idpelamar,'idpengaturancuti'=>$id));
		// echo $this->db->last_query().'<br';
        if($q->num_rows()>0)
        {
			
            $r = $q->row();
            $diambil = $r->diambil;
            $kuota = $r->kuota;

            $this->db->where(array('idpelamar'=>$idpelamar,'idpengaturancuti'=>$id));
            $this->db->update('cuticounter',array('diambil'=>$durasi+$diambil));
			// echo $this->db->last_query().'<br';
        } else {
            $diambil = 0;
            $kuota = 0;

// Ketika seseorang jatah cuti 12, bar dpt cuti pd bulan ke 6. Maka 
// - selama 6 bukan ybs blm dpt jatah cuti, namun boleh ambil cuti, akibatnya. Jatah cuti 0, ambil (let say 2 hari) maka sisa cutinya adalah -2. 
// - pada bulan ke 6, dimana ybs akan mendapatkan cuti 6 hari, maka -2+6 = 4 hari 
// - angka -2 ini harus distate sbg sisa cuti nya. Ketika ybs resign pd bulan ke 5, maka gajinya dia akan dipotong 2 hari, krn status cutinya -2
            // $this->db->where('idpelamar',$idpelamar);
            $this->db->insert('cuticounter',array('idpelamar'=>$idpelamar,'idpengaturancuti'=>$id,'diambil'=>$durasi+$diambil,'kuota'=>0,'lastupdate'=>date('Y-m-d')));
        }

        

        $data = array(
            "idpengajuancuti" => $this->input->post('idpengajuancuti') == '' ? $this->m_data->getSeqVal('seq_kehadiran','pengajuancuti','idpengajuancuti') : $this->input->post('idpengajuancuti'),
            "idpengaturancuti" => $this->m_data->getID('pengaturancuti', 'namapengcuti', 'idpengaturancuti', $this->input->post('namapengcuti'),false),
            // "idjenisizin" => $this->m_data->getID('jenisizin', 'namaizin', 'idjenisizin', $this->input->post('namaizin'),true),
            "idpelamar" => $idpelamar,
            "durasi" => $durasi,
            "sisacuti" => $this->input->post('sisacuti'),
            "idcompany" => $this->session->userdata('idcompany'),
            "keterangan" => $this->input->post('keterangan'),
            "tglmulai" => $tglmulai,
            "tglselesai" => $tglselesai
        );
        return $data;
    }

}

?>