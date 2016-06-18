<?php

class m_datarawptk extends CI_Model {

    function tableName() {
        return 'perencanaantk';
    }

    function pkField() {
        return 'idperencanaantk';
    }

    function searchField() {
        $field = "namabulan,kodeorg,namaorg,namalokasi,e.namajabatan";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idperencanaantk,g.levelname,g.kodelevel,e.kodejabatan,a.tahun,a.idcompany,a.idjabatan,a.idorganisasi,a.idlokasiorg,a.idjabatanatasan,a.namabulan,a.jumlah,a.revisi,a.jumlahrevisi,a.status,a.userin,a.usermod,b.companyname,b.companycode,c.kodeorg,c.kodebudgetorg,c.namaorg,d.namalokasi,e.namajabatan,f.namajabatan as namajabatanatasan,a.idupload";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodejabatan'=>'Kode Jabatan'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company b ON a.idcompany = b.idcompany
                    join organisasi c ON a.idorganisasi = c.idorganisasi
                    left join lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                    join jabatan e ON a.idjabatan = e.idjabatan
                    join jabatan f ON a.idjabatanatasan = f.idjabatan
                    join level g ON e.idlevel = g.idlevel";

        return $query;
    }

    function whereQuery() {
        // if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        //     $wer = null;
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        //     } else {
        //         $wer = null;
        //     }
         if($this->input->post('withuserin')=='true')
         {
            $user = " AND a.userin = '".$this->session->userdata('username')."'";
         } else {
            $user = null;
         }
         return "a.display is null ".$this->m_data->whereCompany('a',false)." ".$user;
    }

    function orderBy() {
        return "d.namalokasi,e.namajabatan,nobulan asc";
    }

    function updateField() { 

        $revisi = $this->input->post('revisi');
        $jumlah = $this->input->post('jumlah');
        $revisistatus = $this->input->post('revisistatus');

        if($revisi=='')
        {
            $revisi=0;
        }

        if (strpos($revisi,'-') !== false) {
            // echo 'true';
            $jumlahrevisi = $jumlah - intval(str_replace('-', '', $revisi));
        } else {
            $jumlahrevisi = $jumlah + $revisi;
        }

        $namabulan = $this->input->post('namabulan');
        $nobulan = ambilNoBulan($namabulan);
        $tahun = $this->input->post('tahun');
        $nobulanNewInt = intval($nobulan);
        $idcompany = $this->m_data->getID('company', 'companyname', 'idcompany', $this->input->post('companyname'));

        if($this->input->post('idperencanaantk') == '')
        {
            $idperencanaantk = $this->m_data->getSeqVal('seq_perencanaantk');
        } else {
            $idperencanaantk = $this->input->post('idperencanaantk');

            $q = $this->db->get_where('perencanaantk',array('idperencanaantk'=>$idperencanaantk))->row();
            $idjabatan = $q->idjabatan;
            $idlokasiorg = $q->idlokasiorg;
            // var_dump($q);
            // echo $this->db->last_query();

            if($revisistatus !='true')
            {

                    //cek backmonth
                    // $q = $this->db->get_where('perencanaantk',array('idperencanaantk'=>$idperencanaantk))->row();
                    $nobulanOldInt = intval($q->nobulan);

                    $qjab = $this->db->get_where('jabatan',array('idjabatan'=>$q->idjabatan))->row();
                    $qlok = $this->db->get_where('lokasi_org',array('idlokasiorg'=>$q->idlokasiorg))->row();

                    //cek nama bulan
                    if($nobulanNewInt!=$nobulanOldInt)
                    {
                        $qbulan = $this->db->get_where('perencanaantk',array('idcompany'=>$idcompany,'nobulan'=>$nobulan,'tahun'=>$tahun,'idjabatan'=>$q->idjabatan,'idlokasiorg'=>$q->idlokasiorg));
                        if($qbulan->num_rows()>0)
                        {
                            $json = array('success' => false, 'message' => 'Perencanaan bulan '.$namabulan.' di tahun '.$tahun.' jabatan '.$qjab->namajabatan.' '.$qlok->namalokasi.' sudah ada di database');
                            echo json_encode($json);
                            exit;
                        }
                    }

                    if($nobulanNewInt<$nobulanOldInt)
                    {
                        //bulannya dirubah

                                $nobulanNewInt+=1;
                                $i=1;
                                while ($nobulanNewInt <= $nobulanOldInt) {

                                 if($nobulanNewInt<10)
                                 {
                                    $nobulan2 = '0'.$nobulanNewInt;
                                 } else {
                                    $nobulan2 = $nobulanNewInt;
                                 }

                                 $namabulan2 = ambilBulan($nobulan2);

                                 // $idlokasiorg = $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'),true);
                                 $idlokasiorg = $this->input->post('namalokasi');

                                 // $idcompany = $this->m_data->getID('company', 'companyname', 'idcompany', $this->input->post('companyname'));
                                 // $idcompany = $this->input->post('companyname');
                                 if($i==1)
                                 {
                                    $revisiV2 = $revisi;
                                    $jumlahrevisiV2 = $jumlahrevisi;
                                 } else {
                                     $revisiV2 =  $q->revisi;
                                     $jumlahrevisiV2 = $q->jumlahrevisi;
                                 }
                                 
                                 $data = array(
                                    'idperencanaantk' => $this->m_data->getSeqVal('seq_perencanaantk'),
                        //            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
                                    'tahun' => $tahun,
                                    'idcompany' => $idcompany,
                                    // 'startdate' => backdate2_reverse($this->input->post('startdate')),
                                    // 'enddate' => backdate2_reverse($this->input->post('enddate')),
                                    'idjabatan' => $q->idjabatan,
                                    // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
                                    'idorganisasi' => $q->idorganisasi,
                                    'idlokasiorg' => $q->idlokasiorg,
                                    'namabulan' => $namabulan2,
                                    'jumlah' => $jumlah,
                                    'revisi' => $revisiV2,
                                    'jumlahrevisi' => $jumlahrevisiV2,
                                    'idjabatanatasan' => $q->idjabatanatasan,
                                    'status' => 'saved',
                                    'nobulan'=>$nobulan2
                                );
                                $this->db->insert('perencanaantk',$data);
                                $nobulanNewInt++;
                                $i++;
                             }
                    } else if($q->jumlah!=$jumlah)
                        {
                            //update jumlah sampai kebawah
                            $nobulanOldInt+=1;
                            while ($nobulanOldInt <= 12) {
                                 
                                 if($nobulanOldInt<10)
                                 {
                                    $nobulan2 = '0'.$nobulanOldInt;
                                 } else {
                                    $nobulan2 = $nobulanOldInt;
                                 }

                                 $namabulan2 = ambilBulan($nobulan2);

                               
                                 $q = $this->db->query("SELECT * FROM perencanaantk WHERE idjabatan = $idjabatan and idlokasiorg = $idlokasiorg and idcompany =  $idcompany AND nobulan =  '$nobulan2' AND tahun =  $tahun");
                                // $q = $this->db->get_where('perencanaantk',array('idcompany'=>$idcompany,'nobulan'=>$nobulan2,'tahun'=>$tahun));
                                if($q->num_rows()>0)
                                {
                                    $r = $q->row();

                                    if (strpos($r->revisi,'-') !== false) {
                                        $jumlahrevisi2 = $jumlah - intval(str_replace('-', '', $r->revisi));
                                    } else {
                                        $jumlahrevisi2 = $jumlah + $r->revisi;
                                    }

                                     $data = array(
                                        // 'idperencanaantk' => $this->m_data->getSeqVal('seq_perencanaantk'),
                            //            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
                                        // 'tahun' => $tahun,
                                        // 'idcompany' => $idcompany,
                                        // 'startdate' => backdate2_reverse($this->input->post('startdate')),
                                        // 'enddate' => backdate2_reverse($this->input->post('enddate')),
                                        // 'idjabatan' => $q->idjabatan,
                                        // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
                                        // 'idorganisasi' => $q->idorganisasi,
                                        // 'idlokasiorg' => $q->idlokasiorg,
                                        'namabulan' => $namabulan2,
                                        'jumlah' => $jumlah,
                                        'revisi' => $r->revisi,
                                        'jumlahrevisi' => $jumlahrevisi2,
                                        // 'idjabatanatasan' => $q->idjabatanatasan,
                                        // 'status' => 'saved',
                                        'nobulan'=>$nobulan2
                                    );
                                    $this->db->where('idperencanaantk',$r->idperencanaantk);
                                    $this->db->update('perencanaantk',$data);
                                }

                                $nobulanOldInt++;
                            }
                        }
             }  //end if($revisistatus !='true')

        } 


        
        $data = array(
            'idperencanaantk' => $idperencanaantk,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            // 'tahun' => $tahun,
            // 'idcompany' => $idcompany,
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            // 'idjabatan' => $this->input->post('idjabatan'),
            // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            // 'idorganisasi' => $this->input->post('idorganisasi'),
            // 'idlokasiorg' => $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'),true),
            // 'idlokasiorg' => $this->input->post('namalokasi'),
            'namabulan' => $this->input->post('namabulan'),
            'jumlah' => $jumlah,
            'revisi' => $revisi,
            'jumlahrevisi' => $jumlahrevisi,
            // 'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            // 'status' => $this->input->post('status'),
            'nobulan' => $nobulan
        );

        if($this->input->post('revisistatus')=='true')
        {
            // $this->db->trans_start();

            $startmonth = intval(ambilNoBulan($this->input->post('namabulan')));

            $q = $this->db->get_where('perencanaantk',array('idperencanaantk'=>$idperencanaantk))->row();
            $idjabatan = $q->idjabatan;
            $idlokasiorg = $q->idlokasiorg;

            while ($startmonth <= 12) {
             // echo $startmonth.' ';

                 if($startmonth<10)
                 {
                    $nobulan = '0'.$startmonth;
                 } else {
                    $nobulan = $startmonth;
                 }
                 // echo $nobulan.' ';
                 // $namabulan = ambilBulan($nobulan);

                 // $idlokasiorg = $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'),true);

                 // $idjabatan = $this->input->post('idjabatan');
                 // $qjab = $this->db->get_where('jabatan',array('idjabatan'=>$idjabatan))->row();

                 // $qlok = $this->db->get_where('lokasi_org',array('idlokasiorg'=>$idlokasiorg))->row();

                //cek dulu
                $arrWer = array('idjabatan'=>$idjabatan,'idlokasiorg'=>$idlokasiorg,'tahun'=>$this->input->post('tahun'),'nobulan'=>''.$nobulan.'','idcompany'=>$idcompany,'display'=>null,'status'=>'saved');
                $qcek = $this->db->get_where('perencanaantk',$arrWer);
                // echo $this->db->last_query().' ';
                 // print_r($arrWer);
                    // echo '<hr>';
                if($qcek->num_rows()>0)
                {
                    $r = $qcek->row();
                     if (strpos($revisi,'-') !== false) {
                        // echo 'true';
                        $jumlahrevisi = $r->jumlah - intval(str_replace('-', '', $revisi));
                    } else {
                        $jumlahrevisi = $r->jumlah + $revisi;
                    }


                    $this->db->where($arrWer);
                    $this->db->update('perencanaantk',array(
                            'revisi'=>$revisi,
                            'jumlahrevisi'=>$jumlahrevisi
                        ));
                }
                 $startmonth++;
            }
        }

        return $data;
    }

}

?>