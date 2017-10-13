<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class personalia extends MY_Controller {

    public function index() {

    }

    function savePergerakanBawahan()
    {
    	 $idpelamar = $this->input->post('idpelamar');
    	 $idpekerjaan = $this->input->post('idpekerjaan');
    	 $statuspergerakan = $this->input->post('statuspergerakan');

    	 $this->db->trans_start();

    	 if($statuspergerakan=='Disetujui')
    	 {
    	 	//langsung update di tabel pekerjaan
    	 	$this->db->where('idpekerjaan',$idpekerjaan);
    	 	$this->db->update('pekerjaan',array('idpelamaratasan'=>$this->input->post('idpelamaratasan')));
    	 } else {
    	 	//simpan ke tabel temporary hingga status pergerakannya berubah menjadi proses

    	 	$data = array(
                    'idpergerakanpersonil'=> $this->input->post('idpergerakanpersonil'),
                    'idpelamar'=> $this->input->post('idpelamar'),
                    'idpekerjaan'=> $this->input->post('idpekerjaan'),
                    'idpelamaratasan'=> $this->input->post('idpelamaratasan'),
                    'status'=> 'pending'
            );

    	 	 $wer = array('idpelamar'=>$idpelamar,'idpekerjaan'=>$idpekerjaan,'status'=>'pending');
	    	 $qcek = $this->db->get_where('pergerakanpersonilbawahan',$wer);
	    	 if($qcek->num_rows()>0)
	    	 {
	    	 	$this->db->where($wer);
	    	 	$this->db->update('pergerakanpersonilbawahan',$data);
	    	 } else {
	    	 	$this->db->insert('pergerakanpersonilbawahan',$data);
	    	 }
    	 }

    	if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Date gagal disimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Date telah tersimpan'));
        }
    }

    function querylevel($id)
    {
        $q = $this->db->get_where('level',array('idlevel'=>$id))->row();
        return $q->urutan;
    }

    function savePergerakanPerStatus($idpekerjaanfrom,$idkekaryaan,$statuspergerakan)
    {
      $qPrevPekerjaan = $this->get_where('pekerjaan',array('idpekerjaan'=>$idpekerjaanfrom))->row();
      
      $qPrevPergerakan = $this->get_where('pergerakanpersonil',array('idpergerakanpersonil'=>$qPrevPekerjaan->idpergerakanpersonil));
      if($qPrevPergerakan->num_rows()>0)
      {
        $r = $qPrevPergerakan->row();

        $dt = new DateTime();
        $tanggalwaktu = $dt->format('Y-m-d H:i:s');

        $this->db->trans_start();

        if($this->input->post('idpergerakanpersonil') == '')
        {
            $idpergerakanpersonil = $this->m_data->getSeqVal('seq_pergerakanpersonil');
            $state = 'insert';

            $dataPergerakan = array(
                'idpergerakanpersonil' => $idpergerakanpersonil,
    //            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
                // 'idcompany' => $this->input->post('idcompany'),
                'idpekerjaanfrom' => $idpekerjaanfrom,
                'nopergerakan' => $this->input->post('nopergerakan'),
                'idcompany' => $r->idcompany,
                // 'idjabatan' => $this->input->post('idjabatan'),
                // 'startdate' => backdate2_reverse($this->input->post('startdate')),
                // 'enddate' => backdate2_reverse($this->input->post('enddate')),
                'idpelamar' =>$r->idpelamar,
                'idstrukturjabatanfrom' =>$r->idstrukturjabatan_from,
                // 'idpelamaratasan' =>$this->input->post('idpelamaratasan'),
                // 'idorganisasi' =>$this->input->post('idorganisasi'),
                // 'idcompany' =>$this->input->post('idcompany'),
                // 'idjabatan' =>$this->input->post('idjabatan'),
                // 'idlevelindividu' =>$this->input->post('idlevelindividu'),
                // 'idorganisasi' =>$this->input->post('idorganisasi'),
                // 'idkekaryaan' =>$this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
                // 'idjabatanatasan' =>$this->input->post('idjabatanatasan'),
                // 'idorganisasiatasan' =>$this->input->post('idorganisasiatasan'),
                // 'idlokasiorg' =>$idlokasiorg,
                // 'idlokasiorgatasan' =>$this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
                // 'tglmasuk' =>backdate2_reverse($this->input->post('tglmasuk')),
                // 'tglberakhir' =>backdate2_reverse($this->input->post('tglberakhir')),
                // 'namaatasan' =>$this->input->post('namaatasan'),
                'statuspergerakan' =>$statuspergerakan,
                 'idpergerakan' =>58,
                 'periodekekaryaan' => $r->periodekekaryaan,
                 'jumlahbulankekaryaan' => $r->jumlahbulankekaryaan,
                 'catatanpenyesuaian'=>$r->catatanpenyesuaian,
                 'startdatenewpay'=>$r->startdatenewpay,
                 // 'alasanterminasi'=>$r->alasanterminasi'),
                 'tglterminasi'=>$r->tglterminasi
            );

          $this->db->insert('pergerakanpersonil',$dataPergerakan);

          $qPrevPekerjaan = $this->get_where('pekerjaan',array('idpekerjaan'=>$idpekerjaanfrom));
          if($qPrevPergerakan->num_rows()>0)
          {
              $r = $qPrevPergerakan->row();
              $dPekerjaan = array(
                    "idpergerakanpersonil"=>$idpergerakanpersonil,
                    "idpelamar" => $r->idpelamar,
                    "idlevelindividu" => $r->idlevelindividu,
                    "idlokasiorg" => $r->idlokasiorg,
                    "idkekaryaan"  => $idkekaryaan,
                    "tglmasuk" => $r->tglmasuk,
                    "tglberakhir" => $r->tglberakhir,
                    "idstrukturjabatan" => $r->idstrukturjabatan,
                    "idpelamaratasan" => $r->idpelamaratasan,
                    "statuspergerakan" =>$statuspergerakan
              );

              $this->db->insert('pekerjaan',$dPekerjaan);
            }


        } else {
            $state = 'update';
            $idpergerakanpersonil = $this->input->post('idpergerakanpersonil');

            $q = $this->db->get_where('pekerjaan',array('idpergerakanpersonil'=>$idpergerakanpersonil));
            if($q->num_rows()>0)
            {
              $r = $q->row();

              // $qperg = $this->db->get_where('pergerakanpersonil',array('idpergerakanpersonil'=>$idpergerakanpersonil));

              $this->db->where('idpergerakanpersonil',$idpergerakanpersonil);
              $this->db->update('pergerakanpersonil',array('idkekaryaan'=>$idkekaryaan,'statuspergerakan'=>$statuspergerakan));

              $this->db->where('idpergerakanpersonil',$idpergerakanpersonil);
              $this->db->update('pekerjaan',array('idkekaryaan'=>$idkekaryaan,'statuspergerakan'=>$statuspergerakan));
            }
        }


         if($statuspergerakan=='Disetujui')
         {
           //simpan ke tabel penyesuan untuk nanti melakukan penyesuan upah karyawan baru maupun lama
            $dpenyesuaian = array(
              "idpelamar" => $idpelamar,
              "idpergerakanpersonil" => $idpergerakanpersonil,
              "idpekerjaan" => $idpekerjaanPenyesuaian,
              "datein" => $tanggalwaktu,
              // "tipe" => 'baru',
              "status" =>0
            );

            if($idpergerakan==131)//penempatan baru
            {
                $dpenyesuaian['tipe'] = 'baru';
            } else {
                $dpenyesuaian['tipe'] = 'pergerakan';
            }
            $this->db->insert('penyesuaian',$dpenyesuaian);
         }
      }
    }

    

    function saveProsesPergerakan()
    {
      	$idpergerakanpersonil = $this->input->post('idpergerakanpersonil');
      	$idpelamaratasan = $this->input->post('idpelamaratasan');
      	$idpelamar = $this->input->post('idpelamar');
        $statuspergerakan = $this->input->post('statuspergerakan');
        $idlokasiorg = $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'));
        $idlevelindividu = $this->input->post('idlevelindividu');
        $idstrukturjabatan_from = $this->input->post('idstrukturjabatan_from');
        $idstrukturjabatan = $this->input->post('idstrukturjabatan');
        $idkekaryaan = $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname'));
        $idpergerakan = $this->m_data->getID('pergerakan', 'namapergerakan', 'idpergerakan', $this->input->post('namapergerakan'));
        $idpekerjaanfrom = $this->input->post('idpekerjaanfrom') == null ? null : $this->input->post('idpekerjaanfrom');
        $startdatenewpay = $this->input->post('startdatenewpay') == null ? null : backdate2($this->input->post('startdatenewpay'));
        $tglterminasi = $this->input->post('tglterminasi') == null ? null : backdate2($this->input->post('tglterminasi'));

        //blok pergerakan personil ke level individu yang sama
        // $this->db->select('idlevelindividu');

        if($idpergerakan==58)
        {
            // $this->savePergerakanPerStatus($idpekerjaanfrom,$idkekaryaan,$statuspergerakan);
            // exit;
        }

        if($statuspergerakan!='Ditolak')
       {
                if($idpergerakan!=131 && $idpergerakan!=128 && $idpergerakan!=120 && $idpergerakan!=121 && $this->input->post('penyesuaianstatus')!='true') 
                {
                    //bukan PENEMPATAN BARU,terminasi

                    //cek kalo selain mutasi (kalo mutasi level sama gapapa)
                    if($idpergerakan!=124)
                    {
                          $qjab = $this->db->query("select b.idlevel,c.urutan
                                  from strukturjabatan a
                                  join jabatan b ON a.idjabatan = b.idjabatan
                                  join level c ON b.idlevel = c.idlevel
                                  where a.idstrukturjabatan = $idstrukturjabatan_from")->row();
                          $idleveljabatanFrom = $qjab->idlevel;
                          $noUrutjabatanFrom = $qjab->urutan;

                          $qjab = $this->db->query("select b.idlevel,c.urutan
                                  from strukturjabatan a
                                  join jabatan b ON a.idjabatan = b.idjabatan
                                  join level c ON b.idlevel = c.idlevel
                                  where a.idstrukturjabatan = $idstrukturjabatan")->row();
                          $idleveljabatanTo = $qjab->idlevel;
                          $noUrutjabatanTo = $qjab->urutan;

                          $qcekindividu = $this->db->query("select a.idpelamar,a.namalengkap,b.idpekerjaan,c.idlevelindividu,c.idkekaryaan
                                                from pelamar a
                                                LEFT JOIN (
                                                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                                                        FROM pekerjaan
                                                        WHERE statuspergerakan='Disetujui'
                                                        GROUP BY idpelamar
                                                ) as b ON a.idpelamar = b.idpelamar
                                                join pekerjaan c ON b.idpekerjaan = c.idpekerjaan
                                                where a.idpelamar = $idpelamar")->row();

                        if($qcekindividu->idkekaryaan==109) //karyawan kontrak
                        {
                          // Karyawan Kontrak, alurnya : 
                          // 1. Perpanjang Kontrak, atau 
                          // 2. Perubahan Status (ke tetap), atau 
                          // 3. Terminasi 
                          // 4. Demosi -> 15-5-2016
                          $idpergerakan = intval($idpergerakan);
                          if($idpergerakan!==129 && $idpergerakan!==58)
                          {
                             if($idpergerakan!==128 && $idpergerakan!==125)
                            {
                               echo json_encode(array('success' => false, 'message' => 'Pergerakan personil '.$this->input->post('namalengkap').' hanya bisa PERPANJANGAN KONTRAK, PERUBAHAN STATUS dan TERMINASI'));
                               exit;
                            }
                          }
                        }

                        if($qcekindividu->idkekaryaan==63) //karyawan tetap
                        {
                          // 1. Percobaan 
                          // 2. Lulus Percobaan, atau 
                          // 3. Terminasi 
                          if($idpergerakan!=120 || $idpergerakan!=128)
                          {
                             echo json_encode(array('success' => false, 'message' => 'Pergerakan personil '.$this->input->post('namalengkap').' hanya bisa LULUS PERCOBAAN dan TERMINASI'));
                             exit;
                          }
                        }

                        if($idpergerakan==123) //PROMOSI
                        {
                              if(($qcekindividu->idlevelindividu==$idlevelindividu) && ($idstrukturjabatan_from==$idstrukturjabatan))
                              {
                                  echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke jabatan/level individu yang sama'));
                                  exit;
                              }
//echo $noUrutjabatanTo.'>'.$noUrutjabatanFrom;
                               if($noUrutjabatanTo>$noUrutjabatanFrom)
                              {
                                  echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke jabatan yang lebih rendah'));
                                  exit;
                              }


                              $q1 = $this->db->query("select urutan from level where idlevel=".$qcekindividu->idlevelindividu."")->row(); //level individu saat ini
                              $q2 = $this->db->query("select urutan from level where idlevel=".$idlevelindividu."")->row();

                              if($q2->urutan>$q1->urutan)
                              {
                                 echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke level individu yang lebih rendah'));
                                  exit;
                              }

                              if($qcekindividu->idkekaryaan==63) //KEKARYAWANAN TETAP
                              {
                                 if($idkekaryaan==109)//kontrak
                                 {
                                    echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan dari TETAP ke KONTRAK'));
                                    exit;
                                 }

                                 if($idkekaryaan==64)//PERCOBAAN
                                 {
                                    echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan dari TETAP ke PERCOBAAN'));
                                    exit;
                                 }

                                 if($idkekaryaan==131)//OUTSOURCE
                                 {
                                    echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan dari TETAP ke OUTSOURCE'));
                                    exit;
                                 }
                                  
                              }
                        }

                          /////////////////////////////////////////
                         if($idpergerakan==125) // DEMOSI
                        {
                           if($noUrutjabatanTo<$noUrutjabatanFrom)
                            {
                                echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke jabatan yang lebih tinggi'));
                                exit;
                            }
                        }

                        //////////////////////////////////////////////

                        if($idpergerakan==122 || $idpergerakan==127) // PENINGKATAN LEVEL INDIVIDU / PENURUNAN LEVEL INDIVIDU
                        {
                            //promosi ke level yang lebih rendah dan level sama ditolak.
                            $qcekindividu = $this->db->query("select a.idpelamar,a.namalengkap,b.idpekerjaan,c.idlevelindividu
                                                from pelamar a
                                                LEFT JOIN (
                                                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                                                        FROM pekerjaan
                                                        WHERE statuspergerakan='Disetujui'
                                                        GROUP BY idpelamar,idpekerjaan
                                                ) as b ON a.idpelamar = b.idpelamar
                                                join pekerjaan c ON b.idpekerjaan = c.idpekerjaan
                                                where a.idpelamar = $idpelamar")->row();

                          if($qcekindividu->idlevelindividu==$idlevelindividu)
                          {
                              echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke level individu yang sama'));
                              exit;
                          }

                          $q1 = $this->db->query("select urutan from level where idlevel=".$qcekindividu->idlevelindividu."")->row();
                          $q2 = $this->db->query("select urutan from level where idlevel=".$idlevelindividu."")->row();

                          if($idpergerakan==122)
                          {
                            if($q2->urutan>$q1->urutan)
                              {
                                 echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke level individu yang lebih rendah'));
                                  exit;
                              }
                          }

                          if($idpergerakan==127)
                          {
                            if($q2->urutan<$q1->urutan)
                              {
                                 echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke level individu yang lebih tinggi'));
                                  exit;
                              }
                          }

                        }

                        /////////////////////////////////
                        //dari TETAP KE KONTRAK DI TOLAK
                        // echo $qcekindividu->idkekaryaan.' && '.$idkekaryaan;
                         if($idpergerakan==58) //perubahan status
                         { 
                            if($qcekindividu->idkekaryaan==63 && $idkekaryaan==63)
                              {
                                  echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan perubahan status yang sama'));
                                  exit;
                              }

                              if($qcekindividu->idkekaryaan==63 && $idkekaryaan==64)
                              {
                                  echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan perubahan status TETAP menjadi PERCOBAAN'));
                                  exit;
                              }

                              if($qcekindividu->idkekaryaan==63 && $idkekaryaan==109)
                              {
                                  echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan perubahan status TETAP menjadi KONTRAK'));
                                  exit;
                              }

                              if($qcekindividu->idkekaryaan==63 && $idkekaryaan==131)
                              {
                                  echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan perubahan status TETAP menjadi OUTSOURCE'));
                                  exit;
                              }
                         }
                        

                        ////////////////////////////////////////
                    }


                      //////////////////////////////////////////////////////////////////

                    //cek kalo selain mutasi (kalo mutasi level sama gapapa)
                    // if($idpergerakan!=124)
                    // {
                    //     $qcek = $this->db->query("select a.idpelamar,a.namalengkap,b.idpekerjaan,c.idlevelindividu
                    //                             from pelamar a
                    //                             LEFT JOIN (
                    //                                     SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                    //                                     FROM pekerjaan
                    //                                     WHERE statuspergerakan='Disetujui'
                    //                                     GROUP BY idpelamar
                    //                             ) as b ON a.idpelamar = b.idpelamar
                    //                             join pekerjaan c ON b.idpekerjaan = c.idpekerjaan
                    //                             where a.idpelamar = $idpelamar");
                    //     // $qcek = $this->db->get_where('v_detailkaryawan',array('idpelamar'=>$idpelamar));
                    //     if($qcek->num_rows()>0)
                    //     {
                    //         $rcek = $qcek->row();
                    //         if($rcek->idlevelindividu!=null)
                    //         {
                    //             if($this->querylevel($idlevelindividu)==$this->querylevel($rcek->idlevelindividu))
                    //             {
                    //                 echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke level individu yang sama'));
                    //                 exit;
                    //             }
                    //         }
                    //     }
                    // }

                    //   //blok pergerakan personil ke level jabatan yang sama
                    //   if($idstrukturjabatan_from!='')
                    //   {
                    //       $qjab = $this->db->query("select b.idlevel
                    //               from strukturjabatan a
                    //               join jabatan b ON a.idjabatan = b.idjabatan
                    //               where a.idstrukturjabatan = $idstrukturjabatan_from")->row();
                    //       $idleveljabatanFrom = $qjab->idlevel;

                    //       $qjab = $this->db->query("select b.idlevel
                    //               from strukturjabatan a
                    //               join jabatan b ON a.idjabatan = b.idjabatan
                    //               where a.idstrukturjabatan = $idstrukturjabatan")->row();
                    //       $idleveljabatanTo = $qjab->idlevel;

                    //       if($this->querylevel($idleveljabatanFrom)==$this->querylevel($idleveljabatanTo))
                    //       {
                    //           echo json_encode(array('success' => false, 'message' => 'Tidak bisa melakukan pergerakan ke level jabatan yang sama'));
                    //           exit;
                    //       }
                    //   }
                } //END   if($idpergerakan!=131)
                  else if($idpergerakan==131)
                  {
                    //penempatan baru
                    $this->db->where('idpelamar',$idpelamar);
                    $this->db->update('calonpelamar',array('statuscalon'=>$statuspergerakan));
                  }
        }

        $dt = new DateTime();
        $tanggalwaktu = $dt->format('Y-m-d H:i:s');

    	  $this->db->trans_start();

        if($this->input->post('idpergerakanpersonil') == '')
        {
            $idpergerakanpersonil = $this->m_data->getSeqVal('seq_pergerakanpersonil');
            $state = 'insert';
        } else {
            $state = 'update';
           $idpergerakanpersonil = $this->input->post('idpergerakanpersonil');
        }

         $dataPergerakan = array(
            'idpergerakanpersonil' => $idpergerakanpersonil,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            // 'idcompany' => $this->input->post('idcompany'),
            'idpekerjaanfrom' => $idpekerjaanfrom,
            'nopergerakan' => $this->input->post('nopergerakan'),
            'idcompany' => $this->session->userdata('idcompany'),
            // 'idjabatan' => $this->input->post('idjabatan'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'idpelamar' =>$idpelamar,
            'idstrukturjabatanfrom' =>$idstrukturjabatan_from == null ? null : $idstrukturjabatan_from,
            // 'idpelamaratasan' =>$this->input->post('idpelamaratasan'),
            // 'idorganisasi' =>$this->input->post('idorganisasi'),
            // 'idcompany' =>$this->input->post('idcompany'),
            // 'idjabatan' =>$this->input->post('idjabatan'),
            // 'idlevelindividu' =>$this->input->post('idlevelindividu'),
            // 'idorganisasi' =>$this->input->post('idorganisasi'),
            // 'idkekaryaan' =>$this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            // 'idjabatanatasan' =>$this->input->post('idjabatanatasan'),
            // 'idorganisasiatasan' =>$this->input->post('idorganisasiatasan'),
            // 'idlokasiorg' =>$idlokasiorg,
            // 'idlokasiorgatasan' =>$this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
            // 'tglmasuk' =>backdate2_reverse($this->input->post('tglmasuk')),
            // 'tglberakhir' =>backdate2_reverse($this->input->post('tglberakhir')),
            // 'namaatasan' =>$this->input->post('namaatasan'),
            'statuspergerakan' =>$statuspergerakan,
             'idpergerakan' =>$idpergerakan,
             'periodekekaryaan' => $this->input->post('periodekekaryaan'),
             'jumlahbulankekaryaan' => $this->input->post('jumlahbulankekaryaan'),
             'catatanpenyesuaian'=>$this->input->post('catatanpenyesuaian'),
             'startdatenewpay'=>$startdatenewpay,
             'alasanterminasi'=>$this->input->post('alasanterminasi'),
             'tglterminasi'=>$tglterminasi
        );

        if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
        {
          if($idpergerakan!=128) //selain terminasi
          {
            $tglmasuk = $this->input->post('tglmasuk')!=null ? backdate2_reverse($this->input->post('tglmasuk')) : null;
          } else {
            $tglmasuk = $tglterminasi;
          }

        	$d = array(
                "idpergerakanpersonil"=>$idpergerakanpersonil,
          			"idpelamar" => $idpelamar,
          			"idlevelindividu" => $idlevelindividu == null ? null : $idlevelindividu,
          			"idlokasiorg" => $idlokasiorg == null ? null : $idlokasiorg,
          			"idkekaryaan"  => $idkekaryaan == null ? null : $idkekaryaan,
          			"tglmasuk" => $tglmasuk,
          			"tglberakhir" => $this->input->post('tglberakhir')!=null ? backdate2_reverse($this->input->post('tglberakhir')) : null,
          			"idstrukturjabatan" => $idstrukturjabatan == null ? null : $idstrukturjabatan,
          			"idpelamaratasan" => $this->input->post('idpelamaratasan') =='' ? null : $this->input->post('idpelamaratasan'),
                "statuspergerakan" =>$statuspergerakan
        	);
        }

    	if($state=='insert')
        {
            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
                $d['idpekerjaan'] = $this->m_data->getSeqVal('seq_datapegawai');
                $idpekerjaanPenyesuaian = $d['idpekerjaan'];
            } else {
                $idpekerjaanPenyesuaian = $idpekerjaanfrom;
            }

            $d['userin'] = $this->session->userdata('username');
            $d['datein'] = $tanggalwaktu;
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = $tanggalwaktu;

            $this->db->insert('pergerakanpersonil',$dataPergerakan);

            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
               $this->db->insert('pekerjaan',$d);
            }

        } else {
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = $tanggalwaktu;

            $this->db->where('idpergerakanpersonil',$idpergerakanpersonil);
            $this->db->update('pergerakanpersonil',$dataPergerakan);

            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
                $this->db->where('idpergerakanpersonil',$idpergerakanpersonil);
               $this->db->update('pekerjaan',$d);

                $qpk = $this->db->get_where('pekerjaan',array('idpergerakanpersonil'=>$idpergerakanpersonil))->row();
                $idpekerjaanPenyesuaian = $qpk->idpekerjaan;
            } else {
                $idpekerjaanPenyesuaian = $idpekerjaanfrom;
            }
            
           
        }


       if($statuspergerakan=='Disetujui')
       {
            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
                     //update semua bawahan
                      $qbawahan = $this->db->get_where('pergerakanpersonilbawahan',array('idpergerakanpersonil'=>$idpergerakanpersonil));
                    	foreach ($qbawahan->result() as $r) {
                    		$this->db->where('idpekerjaan',$r->idpekerjaan);
                    		$dbawahan = array(
                    				'idpelamaratasan'=>$r->idpelamaratasan
                    			);
                    		$this->db->update('pekerjaan',$dbawahan);
                    	}

                        $this->db->where(array('idpergerakanpersonil'=>$idpergerakanpersonil));
                        $this->db->delete('pergerakanpersonilbawahan');
                        //end update semua bawahan
            }

            //simpan ke tabel penyesuan untuk nanti melakukan penyesuan upah karyawan baru maupun lama
            $dpenyesuaian = array(
              "idpelamar" => $idpelamar,
              "idpergerakanpersonil" => $idpergerakanpersonil,
              "idpekerjaan" => $idpekerjaanPenyesuaian,
              "datein" => $tanggalwaktu,
              // "tipe" => 'baru',
              "status" =>0
            );

            if($idpergerakan==131)//penempatan baru
            {
                $dpenyesuaian['tipe'] = 'baru';
            } else {
                $dpenyesuaian['tipe'] = 'pergerakan';
            }

            $qcek = $this->db->get_where('penyesuaian',array(
              "idpelamar" => $idpelamar,
              "idpergerakanpersonil" => $idpergerakanpersonil,
              "idpekerjaan" => $idpekerjaanPenyesuaian));
            if($qcek->num_rows()<=0)
            {
              $this->db->insert('penyesuaian',$dpenyesuaian);
            }
        }

        // echo 'asdsad';

    	if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Data gagal disimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Data telah tersimpan'));
        }
    }

    function getTglMasuk($idpelamar)
    {
        //TGL MASUK
        $qEntry = $this->db->query("SELECT tglmasuk
                                    from pelamar a
                                     LEFT JOIN
                                    (
                                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar,tglmasuk
                                        FROM pekerjaan
                                        WHERE statuspergerakan='Disetujui'
                                        GROUP BY idpelamar,tglmasuk
                                    ) as b ON a.idpelamar = b.idpelamar
                                    where a.idpelamar = $idpelamar
                                    ORDER BY tglmasuk 
                                    limit 1");
        //END TGL MASUK
        $rDateEntry = $qEntry->row();
        return $rDateEntry->tglmasuk;
    }

    function getTglMasukSebelumnya($idpelamar)
    {
      //TGL MASUK sebelumnya
        $qEntry = $this->db->query("select idpekerjaan,tglmasuk,tglberakhir from pekerjaan 
                                    where idpelamar = $idpelamar and statuspergerakan = 'Disetujui'
                                    order by idpekerjaan desc limit 1");
        //END TGL MASUK
        $rDateEntry = $qEntry->row();
        return $rDateEntry->tglmasuk;
    }

    function saveProsesPergerakan2()
    {
        $idpergerakanpersonil = $this->input->post('idpergerakanpersonil');
        $idpelamaratasan = $this->input->post('idpelamaratasan');
        $idpelamar = $this->input->post('idpelamar');
        $statuspergerakan = $this->input->post('statuspergerakan');
        $idlokasiorg = $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'));
        $idlevelindividu = $this->input->post('idlevelindividu');
        $idstrukturjabatan_from = $this->input->post('idstrukturjabatan_from');
        $idstrukturjabatan = $this->input->post('idstrukturjabatan');
        $idkekaryaan = $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname'));
        $idpergerakan = $this->m_data->getID('pergerakan', 'namapergerakan', 'idpergerakan', $this->input->post('namapergerakan'));
        $idpekerjaanfrom = $this->input->post('idpekerjaanfrom') == null ? null : $this->input->post('idpekerjaanfrom');
        $startdatenewpay = $this->input->post('startdatenewpay') == null ? null : backdate2($this->input->post('startdatenewpay'));
        $tglterminasi = $this->input->post('tglterminasi') == null ? null : backdate2($this->input->post('tglterminasi'));

        $tglmasuk = $this->input->post('tglmasuk')!=null ? backdate2_reverse($this->input->post('tglmasuk')) : null;
        $tglberakhir = $this->input->post('tglberakhir')!=null ? backdate2_reverse($this->input->post('tglberakhir')) : null;
        //blok pergerakan personil ke level individu yang sama
        // $this->db->select('idlevelindividu');

      

        if($idpergerakan==58 || $idpergerakan==120)
        {
          //PERUBAHAN STATUS//LULUS PERCOBAAN
          //Tidak Boleh < Tgl Masuk          

          $sd = new DateTime($tglmasuk);
          $sd2 = new DateTime($this->getTglMasuk($idpelamar));
          if($sd < $sd2)
          {
            echo json_encode(array('success' => false, 'message' => 'Tanggal efektif tidak boleh kurang dari tanggal masuk pegawai'));
            exit;
          }
            // $this->savePergerakanPerStatus($idpekerjaanfrom,$idkekaryaan,$statuspergerakan);
            // exit;
        }

        if($idpergerakan==121)
        {
          //LULUS ORIENTASI
          //Tidak Boleh < Tgl Efektif Perg. Personil Sblmnya
          $sd = new DateTime($tglmasuk);
          $sd2 = new DateTime($this->getTglMasukSebelumnya($idpelamar));
          if($sd < $sd2)
          {
            echo json_encode(array('success' => false, 'message' => 'Tanggal efektif tidak boleh kurang dari tanggal efektif pergerakan personil sebelumnya'));
            exit;
          }
        }

        if($idpergerakan==122 || $idpergerakan==127 || $idpergerakan==123 || $idpergerakan==125 || $idpergerakan== 124 || $idpergerakan==129)
        {
          /*
            PENINGKATAN LEVEL INDIVIDU
            PENURUNAN LEVEL INDIVIDU
            PROMOSI
            DEMOSI
            MUTASI
            PERPANJANGAN KONTRAK
              Tgl Efektif : Tidak Boleh < Tgl Efektif Perg. Personil Sblmnya
              Tgl Berakhir : Tidak Boleh < Tgl Efektif
          */
          $sd = new DateTime($tglmasuk);
          $sd2 = new DateTime($this->getTglMasukSebelumnya($idpelamar));
          if($sd < $sd2)
          {
            echo json_encode(array('success' => false, 'message' => 'Tanggal efektif tidak boleh kurang dari tanggal efektif pergerakan personil sebelumnya'));
            exit;
          }

          //
          $sdd = new DateTime($tglberakhir);
          if($sdd < $sd)
          {
            echo json_encode(array('success' => false, 'message' => 'Tanggal berakhir tidak boleh kurang dari tanggal efektif'));
            exit;
          }
        }

        if($idpergerakan==128)
        {
          //TERMINASI
          $tglberakhir = $tglmasuk;
        }

        if($idpergerakan==106)
        {
          //PENYESUAIAN UPAH
          $sd = new DateTime($tglmasuk);
          $sd2 = new DateTime($this->getTglMasukSebelumnya($idpelamar));
          if($sd < $sd2)
          {
            echo json_encode(array('success' => false, 'message' => 'Tanggal efektif tidak boleh kurang dari tanggal efektif pergerakan personil sebelumnya'));
            exit;
          }
        }

//  echo json_encode(array('success' => false, 'message' => 'as'));        
// exit;
        if($statuspergerakan!='Ditolak')
       {
                if($idpergerakan!=131 && $idpergerakan!=128 && $idpergerakan!=120 && $idpergerakan!=121 && $this->input->post('penyesuaianstatus')!='true') 
                {
                    //bukan PENEMPATAN BARU,terminasi

                  
                } //END   if($idpergerakan!=131)
                  else if($idpergerakan==131)
                  {
                    //penempatan baru
                    $this->db->where('idpelamar',$idpelamar);
                    $this->db->update('calonpelamar',array('statuscalon'=>$statuspergerakan));
                  }
        }

        $dt = new DateTime();
        $tanggalwaktu = $dt->format('Y-m-d H:i:s');

        $this->db->trans_start();

        if($this->input->post('idpergerakanpersonil') == '')
        {
            $idpergerakanpersonil = $this->m_data->getSeqVal('seq_pergerakanpersonil');
            $state = 'insert';
        } else {
            $state = 'update';
           $idpergerakanpersonil = $this->input->post('idpergerakanpersonil');
        }

         $dataPergerakan = array(
            'idpergerakanpersonil' => $idpergerakanpersonil,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            // 'idcompany' => $this->input->post('idcompany'),
            'idpekerjaanfrom' => $idpekerjaanfrom,
            'nopergerakan' => $this->input->post('nopergerakan'),
            'idcompany' => $this->session->userdata('idcompany'),
            // 'idjabatan' => $this->input->post('idjabatan'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'idpelamar' =>$idpelamar,
            'idstrukturjabatanfrom' =>$idstrukturjabatan_from == null ? null : $idstrukturjabatan_from,
            // 'idpelamaratasan' =>$this->input->post('idpelamaratasan'),
            // 'idorganisasi' =>$this->input->post('idorganisasi'),
            // 'idcompany' =>$this->input->post('idcompany'),
            // 'idjabatan' =>$this->input->post('idjabatan'),
            // 'idlevelindividu' =>$this->input->post('idlevelindividu'),
            // 'idorganisasi' =>$this->input->post('idorganisasi'),
            // 'idkekaryaan' =>$this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            // 'idjabatanatasan' =>$this->input->post('idjabatanatasan'),
            // 'idorganisasiatasan' =>$this->input->post('idorganisasiatasan'),
            // 'idlokasiorg' =>$idlokasiorg,
            // 'idlokasiorgatasan' =>$this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
            // 'tglmasuk' =>backdate2_reverse($this->input->post('tglmasuk')),
            // 'tglberakhir' =>backdate2_reverse($this->input->post('tglberakhir')),
            // 'namaatasan' =>$this->input->post('namaatasan'),
            'statuspergerakan' =>$statuspergerakan,
             'idpergerakan' =>$idpergerakan,
             'periodekekaryaan' => $this->input->post('periodekekaryaan'),
             'jumlahbulankekaryaan' => $this->input->post('jumlahbulankekaryaan'),
             'catatanpenyesuaian'=>$this->input->post('catatanpenyesuaian') == '' ? null : $this->input->post('catatanpenyesuaian'),
             'startdatenewpay'=>$startdatenewpay,
             'alasanterminasi'=>$this->input->post('alasanterminasi') == '' ? null : $this->input->post('alasanterminasi'),
             'tglterminasi'=>$tglterminasi
        );

          if($idpergerakan==58 || $idpergerakan==120 || $idpergerakan==121 || $idpergerakan==122 || $idpergerakan==127 || $idpergerakan==128 || $idpergerakan==129 || $idpergerakan==106)
          {
            $jabatanaVal = $this->input->post('idstrukturjabatan_from');
          } else {
            $jabatanaVal = null;
          }

          if($this->input->post('namapergerakan')=='MUTASI')
          {
            $jabatanaVal = $this->input->post('idstrukturjabatan_from');
          }

        if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
        {
          if($idpergerakan!=128) //selain terminasi
          {
            // $tglmasuk = $this->input->post('tglmasuk')!=null ? backdate2_reverse($this->input->post('tglmasuk')) : null;
          } else {
            $tglmasuk = $tglterminasi;
          }

          $d = array(
                "idpergerakanpersonil"=>$idpergerakanpersonil,
                "idpelamar" => $idpelamar,
                "idlevelindividu" => $idlevelindividu == null ? null : $idlevelindividu,
                "idlokasiorg" => $idlokasiorg == null ? null : $idlokasiorg,
                "idkekaryaan"  => $idkekaryaan == null ? null : $idkekaryaan,
                "tglmasuk" => $tglmasuk,
                "tglberakhir" => $tglberakhir,
                "idstrukturjabatan" => $idstrukturjabatan == null ?  $jabatanaVal : $idstrukturjabatan,
                "idpelamaratasan" => $this->input->post('idpelamaratasan') =='' ? null : $this->input->post('idpelamaratasan'),
                "statuspergerakan" =>$statuspergerakan
          );
        }

      if($state=='insert')
      {
            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
                $d['idpekerjaan'] = $this->m_data->getSeqVal('seq_datapegawai');
                $idpekerjaanPenyesuaian = $d['idpekerjaan'];
            } else {
                $idpekerjaanPenyesuaian = $idpekerjaanfrom;
            }

            $d['userin'] = $this->session->userdata('username');
            $d['datein'] = $tanggalwaktu;
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = $tanggalwaktu;

            $this->db->insert('pergerakanpersonil',$dataPergerakan);

            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
               $this->db->insert('pekerjaan',$d);
            }

        } else {
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = $tanggalwaktu;

            $this->db->where('idpergerakanpersonil',$idpergerakanpersonil);
            $this->db->update('pergerakanpersonil',$dataPergerakan);

            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
                $this->db->where('idpergerakanpersonil',$idpergerakanpersonil);
               $this->db->update('pekerjaan',$d);

                $qpk = $this->db->get_where('pekerjaan',array('idpergerakanpersonil'=>$idpergerakanpersonil))->row();
                $idpekerjaanPenyesuaian = $qpk->idpekerjaan;
            } else {
                $idpekerjaanPenyesuaian = $idpekerjaanfrom;
            }
            
           
        }


       if($statuspergerakan=='Disetujui')
       {
            if($this->input->post('penyesuaianstatus')!='true') //jenis pergerakan penyesuaian upah
            {
                     //update semua bawahan
                      $qbawahan = $this->db->get_where('pergerakanpersonilbawahan',array('idpergerakanpersonil'=>$idpergerakanpersonil));
                      foreach ($qbawahan->result() as $r) {
                        $this->db->where('idpekerjaan',$r->idpekerjaan);
                        $dbawahan = array(
                            'idpelamaratasan'=>$r->idpelamaratasan
                          );
                        $this->db->update('pekerjaan',$dbawahan);
                      }

                        $this->db->where(array('idpergerakanpersonil'=>$idpergerakanpersonil));
                        $this->db->delete('pergerakanpersonilbawahan');
                        //end update semua bawahan
            }

            //simpan ke tabel penyesuan untuk nanti melakukan penyesuan upah karyawan baru maupun lama
            $dpenyesuaian = array(
              "idpelamar" => $idpelamar,
              "idpergerakanpersonil" => $idpergerakanpersonil,
              "idpekerjaan" => $idpekerjaanPenyesuaian,
              "datein" => $tanggalwaktu,
              // "tipe" => 'baru',
              "status" =>0
            );

            if($idpergerakan==131)//penempatan baru
            {
                $dpenyesuaian['tipe'] = 'baru';
            } else {
                $dpenyesuaian['tipe'] = 'pergerakan';
            }

            $qcek = $this->db->get_where('penyesuaian',array(
              "idpelamar" => $idpelamar,
              "idpergerakanpersonil" => $idpergerakanpersonil,
              "idpekerjaan" => $idpekerjaanPenyesuaian));
            if($qcek->num_rows()<=0)
            {
              $this->db->insert('penyesuaian',$dpenyesuaian);
            }
        }

        // echo 'asdsad';

      if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Data gagal disimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Data telah tersimpan'));
        }
    }

     function teshari()
    {
      $date = '2015-11-02'; 
      $day = date('N', strtotime($date));
      echo $day;
    }

    function saveAtasanPergerakan()
    {
        $this->db->trans_start();

        $idpelamaratasan = $this->input->post('idpelamaratasan');
        $idpergerakanpersonil = $this->input->post('idpergerakanpersonil');

        $this->db->where(array('idpergerakanpersonil'=>$idpergerakanpersonil));
        $this->db->update('pekerjaan',array('idpelamaratasan'=>$idpelamaratasan));

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Data gagal disimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Data telah tersimpan'));
        }
    }

    function saveDataKaryawan()
    {
        $this->db->trans_start();

        $statusformDataKaryawan = $this->input->post('statusformDataKaryawan');

        if($statusformDataKaryawan=='')
        {
          if($this->input->post('idpelamar')=='')
          {
            $statusformDataKaryawan == 'input';
          }
        }

        if($statusformDataKaryawan=='input')
        {
            $qseq = $this->db->query("select nextval('seq_pelamar'::regclass) as idpelamar")->row();
            $idpelamar = $qseq->idpelamar;
        } else if($statusformDataKaryawan=='edit'){
            $idpelamar = $this->input->post('idpelamar');
        } else {
            echo 'invalid action!';
            exit;
        }

        $d = array(
            // "idcalonpelamar" int4 DEFAULT nextval('seq_calonpelamar'::regclass) NOT NULL,
            "idpelamar" => $idpelamar,
            // "idpermintaantk" int4,
            "nik" => $this->input->post('nik')
        );





        $dpelamar = array(
                "idpelamar" => $idpelamar,
                "namalengkap" => strtoupper($this->input->post('namalengkap')),
                "tgllahir" => backdate2_reverse($this->input->post('tgllahir')),
                "idsex" =>$this->m_data->getID('sextype', 'sexname', 'idsex', $this->input->post('sexname')),
                "idkewarganegaraan" =>$this->m_data->getID('kewarganegaraan', 'namakewarganegaraan', 'idkewarganegaraan', $this->input->post('namakewarganegaraan')),
                "noktp" => $this->input->post('noktp'),
                "alamat" => $this->input->post('alamat'),
                "notelp" => $this->input->post('notelp'),
                "nohandphone" => $this->input->post('nohandphone'),
                "jabatandituju"=> $this->input->post('jabatandituju'),
                // "tgllamaran" date,
                // "status" => $this->input->post('status')==null ? 'Belum Ada Status' : $this->input->post('status'),
                // "display" int4,
                // "userin" varchar(20),
                // "usermod" varchar(20),
                // "datein" timestamp(6),
                // "datemod" timestamp(6),
                "tempatlahir"=> $this->input->post('tempatlahir'),
                "idstatuskawin" => $this->m_data->getID('statuskawin', 'namastatuskawin', 'idstatuskawin', $this->input->post('namastatuskawin')),
                "email" => $this->input->post('email'),
                "daerahrekrut" => $this->input->post('daerahrekrut'),
                "alamatktp" => $this->input->post('alamatktp'),
                // "idjenjangpendidikan" int4,
                // "fakultas" varchar(150),
                // "jurusan" varchar(150),
                // "foto" varchar(150),
                // "cv" varchar(150),
                // "referensi" varchar(150),
                // "sumberlamaran" varchar(150),
                // "tglmenikah" date,
                "golongandarah" => $this->input->post('golongandarah'),
                "gelarakademik" => $this->input->post('gelarakademik'),
                "kewarganegaraan"=> $this->input->post('kewarganegaraan'),
                "idagama" =>$this->m_data->getID('agama', 'namaagama', 'idagama', $this->input->post('namaagama')),
                "notelp2"=> $this->input->post('notelp2'),
                "nohandphone2"=> $this->input->post('nohandphone2'),
                "email2"=> $this->input->post('email2'),
                "idcompany"=> $this->input->post('idcompany'),
                "ni"=> $this->input->post('ni'),
                "idjadwalkerja"=> $this->input->post('idjadwalkerja')
        );

        $dcalon = array(
            "idpelamar" => $idpelamar,
            // "idpermintaantk" int4,
            // "idlevel" int4,
            // "rencanatglmasuk" date,
            // "idjeniskontrak" int4,
            // "tanggalakhirkontrak" date,
            // "statuscalon" varchar(20),
            "nik"=> $this->input->post('nik')
        );

        $config['upload_path'] = './upload/foto';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '10000';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload');

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('fotokaryawan'))
        {
            // print_r($this->upload->display_errors());

        }  else
            {
                 // $this->prosesSaveKepegawaian($this->upload->data()['orig_name'],$input);
                $dpelamar['foto'] = $this->upload->data()['orig_name'];
            }

        if($statusformDataKaryawan=='input')
        {
            $dpelamar['userin'] = $this->session->userdata('username');
            $dpelamar['datein'] = date('Y-m-d H:m:s');
            $this->db->insert('pelamar',$dpelamar);

            $this->db->insert('calonpelamar',$dcalon);
            // echo $this->db->last_query();
        } else {
            $dpelamar['usermod'] = $this->session->userdata('username');
            $dpelamar['datemod'] = date('Y-m-d H:m:s');
            $this->db->where('idpelamar',$idpelamar);
            $this->db->update('pelamar',$dpelamar);

            $this->db->where('idpelamar',$idpelamar);
            $this->db->update('calonpelamar',$dcalon);
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal menyimpan data karyawan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses menyimpan data karyawan'));
        }
    }

    function setnonaktif()
    {
        $this->db->trans_start();

        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where('idpelamar',$id);
            $this->db->update('pelamar',array('status'=>'Nonaktif'));
        }

         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses'));
        }
    }

    function updateptkp()
    {
        $this->db->trans_start();

        $idptkp = $this->m_data->getID('ptkp', 'namaptkp', 'idptkp', $this->input->post('namaptkp'));
        $this->db->where('idpelamar',$this->input->post('idpelamar'));
        $this->db->update('pelamar',array(
                'idptkp'=>$idptkp,
                'punyanpwp'=>$this->input->post('punyanpwp'),
                'nonpwp'=>$this->input->post('nonpwp'),
                'biayajabatan'=>$this->input->post('biayajabatan'),
                'jumlahhari'=>$this->input->post('jumlahhari'),
                'jenispotonganpph'=>$this->input->post('jenispotonganpph')
            ));
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Perubahan gagal disimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Perubahan berhasil disimpan'));
        }
    }

    function getptkp()
    {
        $idpelamar = $this->input->post('idpelamar');
        $q = $this->db->query("select namaptkp
                                from pelamar a
                                join ptkp b on a.idptkp = b.idptkp
                                where idpelamar = $idpelamar");
         if ($q->num_rows()>0) {
            $r = $q->row();
            echo json_encode(array('success' => true, 'namaptkp' => $r->namaptkp));
        } else {
            echo json_encode(array('success' => true, 'namaptkp' => ''));
        }
    }

    function getsetingpengupahan()
    {
        $idpelamar = $this->input->post('idpelamar');
        $q = $this->db->query("select namaptkp,punyanpwp,nonpwp,biayajabatan,jenispotonganpph,jumlahhari
                                from pelamar a
                                join ptkp b on a.idptkp = b.idptkp
                                where idpelamar = $idpelamar");
         if ($q->num_rows()>0) {
            $r = $q->row();
            echo json_encode(array('success' => true, 'namaptkp' => $r->namaptkp,'punyanpwp'=>$r->punyanpwp, 'jumlahhari'=>$r->jumlahhari, 'nonpwp'=>$r->nonpwp,'biayajabatan'=>$r->biayajabatan,'jenispotonganpph'=>$r->jenispotonganpph));
        } else {
            echo json_encode(array('success' => true, 'namaptkp' => '','punyanpwp'=>0,'jumlahhari'=>0,'nonpwp'=>'','biayajabatan'=>0,'jenispotonganpph'=>0));
        }
    }

    function hapus(){
        $this->db->trans_start();
        
        $idpelamar = $this->input->post('idpelamar');

        $tables = array(
            'benefitkaryawan', 
            'benefithistory',
            'cuticounter',
            'identitas',
            'kehadiran',
            'keluarga',
            'lembur',
            'lemburhistory',
            'payrolldata',
            'pelatihan',
            'pendidikan',
            'pengajuancuti',
            'pengajuanizin',
            'pengalamankerja',
            'pengurangupahhistory',
            'pengurangupahkaryawan',
            'penyesuaian',
            'pergerakanpersonil',
            'pergerakanpersonilbawahan',
            'upahhistory',
            'upahkaryawan',
            'upload_upahtt',
             'calonpelamar',
            'pelamar');
        $this->db->where('idpelamar', $idpelamar);
        $this->db->delete($tables);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Hapus data gagal'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Hapus data berhasil'));
        }
    }

    function export_benefit($idpelamar){

        $sqldt = "select a.idpelamar,a.idbenefit,a.nomorrekening,
        a.namaakunrekening,a.namabank,a.cabangbank,
        a.nopolisasuransi,a.nobpjskesehatan,a.nobpjstenagakerja,
        b.nik,
        c.namalengkap
        from benefit a
        join calonpelamar b ON a.idpelamar = b.idpelamar
        join pelamar c ON a.idpelamar = c.idpelamar
        where a.idpelamar = $idpelamar";

        $sqldt_list = "select b.kodebenefit,b.namabenefit
        from benefitkaryawan a
        join komponenbenefit b ON a.idbenefit = b.idbenefit
        where a.idpelamar = $idpelamar";

        $data['dt'] = $this->db->query($sqldt)->result_array()[0];
        $data['dt_list'] = $this->db->query($sqldt_list)->result_array();

        // $this->load->view('report/data_benefit', $data);


        $html = $this->load->view('report/data_benefit', $data,true);
        $filename = "data_benefit_". $data['dt']['namalengkap'].".xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename.".xls"); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }
}
?>
