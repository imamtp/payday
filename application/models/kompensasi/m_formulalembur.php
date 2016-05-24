<?php

class m_formulalembur extends CI_Model {
//upah tetap
    function tableName() {
        return 'rumusanlembur';
    }

    function pkField() {
        return 'idformulalembur';
    }

    function searchField() {
        $field = "koderumuslembur,namarumuslembur";
        return explode(",", $field);
    }

    function selectField() {
        return "idformulalembur,a.idcompany,b.companyname,koderumuslembur,jenisformula,namarumuslembur,statushariankerja,jenisnilaihariankerja,faktorpembagihariankerja,statusharianlibur,jenisnilaiharianlibur,faktorpembagiharianlibur,statusharianraya,jenisnilaiharianraya,faktorpembagiharianraya,angkatetaphariankerja,angkatetapharianlibur,angkatetapharianraya,statusjamkerja,jumlahjamkerja,jenisnilaijamkerja,faktorpembagijamkerja,angkatetapjamkerja,statusjamlibur,jumlahjamlibur,jenisnilaijamlibur,faktorpembagijamlibur,angkatetapjamlibur,statusjamraya,jumlahjamraya,jenisnilaijamraya,faktorpembagijamraya,angkatetapjamraya,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod,kenapajak,fungsipajak,hitungpajak,persentasehariankerja,persentaseharianlibur,persentaseharianraya,persentasejamkerja,persentasejamlibur,persentasejamraya";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'koderumuslembur'=>'Kode Rumus Lembur'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join company b ON a.idcompany = b.idcompany";

        return $query;
    }

    function whereQuery() {
         return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

       $komponenupahhariankerja = $this->input->post('komponenupahhariankerja');
       $num = count($komponenupahhariankerja);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenupahhariankerja))
       {
            $komponenupahhariankerjaVal = null;
       } else {
        // echo $this->input->post('komponenupahhariankerja');
            // echo $num;
           $komponenupahhariankerjaVal = null;
           $i=1;
           foreach ($komponenupahhariankerja as $u) {    
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahhariankerjaVal.=$kom;
                $komponenupahhariankerjaVal.=$u;
                if($i!=$num)
                {
                    $komponenupahhariankerjaVal.=",";
                }
                $i++;
            }
       }
       ///////////////////////////////////////////////////////
       $komponenupahharianlibur = $this->input->post('komponenupahharianlibur');
       $num = count($komponenupahharianlibur);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenupahharianlibur))
       {
            $komponenupahharianliburVal = null;
       } else {
            // echo $num;
           $komponenupahharianliburVal = null;
           $i=1;
           foreach ($komponenupahharianlibur as $u) {          
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahharianliburVal.=$kom;
                $komponenupahharianliburVal.=$u;
                if($i!=$num)
                {
                    $komponenupahharianliburVal.=",";
                }
                $i++;
            }
       }
       //////////////////////////////////////////////////////////////
       $komponenupahharianraya = $this->input->post('komponenupahharianraya');
       $num = count($komponenupahharianraya);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenupahharianraya))
       {
            $komponenupahharianrayaVal = null;
       } else {
            // echo $num;
           $komponenupahharianrayaVal = null;
           $i=1;
           foreach ($komponenupahharianraya as $u) {          
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahharianrayaVal.=$kom;
                $komponenupahharianrayaVal.=$u;
                if($i!=$num)
                {
                    $komponenupahharianrayaVal.=",";
                }
                $i++;
            }
       }
       ///////////JAM-JAMAN/////////////////////////
       $komponenupahjamkerja = $this->input->post('komponenupahjamkerja');
       $num = count($komponenupahjamkerja);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenupahjamkerja))
       {
            $komponenupahjamkerjaVal = null;
       } else {
            // echo $num;
           $komponenupahjamkerjaVal = null;
           $i=1;
           foreach ($komponenupahjamkerja as $u) {          
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahjamkerjaVal.=$kom;
                $komponenupahjamkerjaVal.=$u;
                if($i!=$num)
                {
                    $komponenupahjamkerjaVal.=",";
                }
                $i++;
            }
       }
       //////////////////
       $komponenupahjamliburVal = null;
       $komponenupahjamlibur = $this->input->post('komponenupahjamlibur');
       $num = count($komponenupahjamlibur);
       // echo 'num:'.is_array($komponenupahharian);
       if($komponenupahjamlibur!='' || $komponenupahjamlibur!=null)
       {
           $i=1;
           foreach ($komponenupahjamlibur as $u) {          
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahjamliburVal.=$kom;
                $komponenupahjamliburVal.=$u;
                if($i!=$num)
                {
                    $komponenupahjamliburVal.=",";
                }
                $i++;
            }
       }
       //////////////
       $komponenupahjamraya = $this->input->post('komponenupahjamraya');
       $num = count($komponenupahjamraya);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenupahjamraya))
       {
            $komponenupahjamrayaVal = null;
       } else {
            // echo $num;
           $komponenupahjamrayaVal = null;
           $i=1;
           foreach ($komponenupahjamraya as $u) {          
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahjamrayaVal.=$kom;
                $komponenupahjamrayaVal.=$u;
                if($i!=$num)
                {
                    $komponenupahjamrayaVal.=",";
                }
                $i++;
            }
       }

       //////////////
       $komponenupahpemerintah = $this->input->post('komponenupahpemerintah');
       $num = count($komponenupahpemerintah);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenupahpemerintah))
       {
            $komponenupahpemerintahVal = null;
       } else {
            // echo $num;
           $komponenupahpemerintahVal = null;
           $i=1;
           foreach ($komponenupahpemerintah as $u) {          
                // $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u,true);
                // $komponenupahpemerintahVal.=$kom;
                $komponenupahpemerintahVal.=$u;
                if($i!=$num)
                {
                    $komponenupahpemerintahVal.=",";
                }
                $i++;
            }
       }


        $data = array(
            "idformulalembur" => $this->input->post('idformulalembur') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idformulalembur'),
            "idcompany"  => $this->input->post('idcompany'),
            "koderumuslembur"  => $this->input->post('koderumuslembur'),
            "namarumuslembur"  => $this->input->post('namarumuslembur'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate')),
            "statushariankerja"  => $this->input->post('statushariankerja'),
            "jenisnilaihariankerja"  => $this->input->post('jenisnilaihariankerja'),
            "komponenupahhariankerja"  => $komponenupahhariankerjaVal,
            "faktorpembagihariankerja"  => $this->input->post('faktorpembagihariankerja'),
            "angkatetaphariankerja"  => $this->input->post('angkatetaphariankerja'),
            "statusharianlibur"  => $this->input->post('statusharianlibur'),
            "jenisnilaiharianlibur"  => $this->input->post('jenisnilaiharianlibur'),
            "komponenupahharianlibur"  => $komponenupahharianliburVal,
            "faktorpembagiharianlibur"  => $this->input->post('faktorpembagiharianlibur'),
            "angkatetapharianlibur"  => $this->input->post('angkatetapharianlibur'),
            "statusharianraya"  => $this->input->post('statusharianraya'),
            "jenisnilaiharianraya"  => $this->input->post('jenisnilaiharianraya'),
            "komponenupahharianraya"  => $komponenupahharianrayaVal,
            "faktorpembagiharianraya"  => $this->input->post('faktorpembagiharianraya'),
            "angkatetapharianraya"  => $this->input->post('angkatetapharianraya'),
            "statusjamkerja"  => $this->input->post('statusjamkerja'),
            "jumlahjamkerja"  => $this->input->post('jumlahjamkerja'),
            "jenisnilaijamkerja"  => $this->input->post('jenisnilaijamkerja'),
            "komponenupahjamkerja"  => $komponenupahjamkerjaVal,
            "faktorpembagijamkerja"  => $this->input->post('faktorpembagijamkerja'),
            "angkatetapjamkerja"  => $this->input->post('angkatetapjamkerja'),
            "statusjamlibur"  => $this->input->post('statusjamlibur'),
            "jumlahjamlibur"  => $this->input->post('jumlahjamlibur'),
            "jenisnilaijamlibur"  => $this->input->post('jenisnilaijamlibur'),
            "komponenupahjamlibur"  => $komponenupahjamliburVal,
            "faktorpembagijamlibur"  => $this->input->post('faktorpembagijamlibur'),
            "angkatetapjamlibur"  => $this->input->post('angkatetapjamlibur'),
            "statusjamraya"  => $this->input->post('statusjamraya'),
            "jumlahjamraya"  => $this->input->post('jumlahjamraya'),
            "jenisnilaijamraya"  => $this->input->post('jenisnilaijamraya'),
            "komponenupahjamraya"  => $komponenupahjamrayaVal,
            "faktorpembagijamraya"  => $this->input->post('faktorpembagijamraya'),
            "angkatetapjamraya"  => $this->input->post('angkatetapjamraya'),
            "jenisformula" => $this->input->post('jenisformula'),
            "kenapajak" => $this->input->post('kenapajak'),
            "fungsipajak" => $this->input->post('fungsipajak'),
            "hitungpajak" => $this->input->post('hitungpajak'),
            "persentasehariankerja" => $this->input->post('persentasehariankerja'),
            "persentaseharianlibur" => $this->input->post('persentaseharianlibur'),
            "persentaseharianraya" => $this->input->post('persentaseharianraya'),
            "persentasejamkerja" => $this->input->post('persentasejamkerja'),
            "persentasejamlibur" => $this->input->post('persentasejamlibur'),
            "persentasejamraya" => $this->input->post('persentasejamraya'),
            'komponenupahpemerintah'=>$komponenupahpemerintahVal
        );
        return $data;
    }

    function getUpahLemburPegawai($idpelamar,$idformulalembur)
    {
      // echo $idformulalembur;
      $q = $this->db->get_where('rumusanlembur',array('idformulalembur'=>$idformulalembur))->row();
      if($q->komponenupahpemerintah==null)
      {
       $upah = 9;
      } else {
         $komponen = explode(',', $q->komponenupahpemerintah);
         $upah = 0;
         foreach ($komponen as $value) {
              $sql = "select a.nilai
                      from upahkaryawan a
                      join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                      where a.idpelamar=".$idpelamar." and a.display is null and a.idkomponenupah=".$value."";
              $qupah = $this->db->query($sql);
              if($qupah->num_rows()>0)
              {
                $rqupah = $qupah->row();
                $upah+=$rqupah->nilai;
              }  
         }
      }     
      return $upah;
    }

    function getUpahTetapPegawai($idpelamar)
    {
      $q = $this->db->query("select sum(a.nilai) as upah
                            from upahkaryawan a
                            join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                            where a.idpelamar = $idpelamar");
      if($q->num_rows()>0)
      {
        $r = $q->row();
        return $r->upah;
      } else {
        return 0;
      }
    }

    function getupahpegawai($idpelamar,$komponenupahjamkerja)
    {
       $dasarupah=0;
       
       //get upah pegawai
      if (preg_match('/,/',$komponenupahjamkerja))
      { 
        // echo 'true';
          $ku = explode(",", $komponenupahjamkerja);
        
         foreach ($ku as $key => $value) {
           $qupah = $this->db->get_where('upahkaryawan',array('idpelamar'=>$idpelamar,'idkomponenupah'=>$value,'display'=>null));
           if($qupah->num_rows()>0)
           {
            $r = $qupah->row();
            $dasarupah+=$r->nilai;
           } else {
            $dasarupah+=0;
           }
           
         }
      } else {
        
           $qupah = $this->db->get_where('upahkaryawan',array('idpelamar'=>$idpelamar,'idkomponenupah'=>$komponenupahjamkerja,'display'=>null));
           if($qupah->num_rows()>0)
           {
              $r = $qupah->row();
              $dasarupah+=$r->nilai;
           } else {
              $dasarupah+=0;
           }
           // echo $this->db->last_query();
      }

       
       return $dasarupah;
      
        //end upah pegawai
    }

    function hitunglembur($idpelamar,$tanggal,$idformulalembur)
    {


      $q = $this->db->get_where('lembur',array('idpelamar'=>$idpelamar,'tgllembur'=>$tanggal,'display'=>null));
      $harikerja=0;
      $harilibur=0;
      $hariraya=0;
      $upahlembur=0;
      foreach ($q->result() as $r) {
        $idwaktulembur = $r->idwaktulembur;

        $formula = $this->db->get_where('rumusanlembur',array('idformulalembur'=>$r->idformulalembur))->row();

        $jumlahjam = jumlahjam(getTimeDiff($r->mulailembur_jam.':'.$r->mulailembur_menit.':00',$r->akhirlembur_jam.':'.$r->akhirlembur_menit.':00'));
        // $jumlahjam = 4;

        $this->db->select('jumlahhari');
        $qhk = $this->db->get_where('pelamar',array('idpelamar'=>$idpelamar))->row();
        $jumlahharikerja = $qhk->jumlahhari == null ? 5 : $qhk->jumlahhari ;

         if($formula->jenisformula=='Satuan Jam')
          {
              if($idwaktulembur==1)
              {
                  //hari kerja
                  if($formula->statusjamkerja=='Aktif')
                  {
                    $maxhour = $formula->jumlahjamkerja;
                    if($formula->jenisnilaijamkerja=='Komponen Upah')
                    {
                      $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahjamkerja);
                      $upahlembur = $jumlahjam * (1/$formula->faktorpembagijamkerja) * $dasarupah;
                    } else if($formula->jenisnilaijamkerja=='Nilai Tetap'){
                        //angka tetap
                        $upahlembur = $jumlahjam * $formula->angkatetapjamkerja;
                      } else {
                          //persen
                          $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahjamkerja);
                          $upahlembur = $jumlahjam * (($formula->persentasejamkerja/100) * $dasarupah);
                        }

                  } else {
                    $upah = 0;
                  }
                  $harikerja++;
              } else if($idwaktulembur==2)
                  {
                      //hari libur
                      if($formula->statusjamlibur=='Aktif')
                      {
                        $maxhour = $formula->jumlahjamlibur;
                        if($formula->jenisnilaijamlibur=='Komponen Upah')
                        {
                          $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahjamlibur);
                          $upahlembur = $jumlahjam * (1/$formula->faktorpembagijamlibur) * $dasarupah;
                        } else if($formula->jenisnilaijamlibur=='Nilai Tetap') {
                            //angka tetap
                            $upahlembur = $jumlahjam * $formula->angkatetapjamlibur;
                          } else {
                              //persen
                              $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahjamlibur);
                              $upahlembur = $jumlahjam * (($formula->persentasejamlibur/100) * $dasarupah);
                            }

                      } else {
                        $upah = 0;
                      }
                      $harilibur++;
                  } else if($idwaktulembur==3)
                      {
                          //hari raya
                        if($formula->statusjamraya=='Aktif')
                        {
                          $maxhour = $formula->jumlahjamraya;
                          if($formula->jenisnilaijamraya=='Komponen Upah')
                          {
                            $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahjamraya);
                            $upahlembur = $jumlahjam * (1/$formula->faktorpembagijamraya) * $dasarupah;
                          } else  if($formula->jenisnilaijamraya=='Nilai Tetap') {
                              //angka tetap
                              $upahlembur = $jumlahjam * $formula->angkatetapjamraya;
                            } else {
                                //persen
                                $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahjamraya);
                                $upahlembur = $jumlahjam * (($formula->persentasejamraya/100) * $dasarupah);
                              }

                        } else {
                          $upah = 0;
                        }
                        $hariraya++;
                      }
          } // end satuan jam

          if($formula->jenisformula=='Satuan Harian')
          {
            
              if($idwaktulembur==1)
              {
                   //hari kerja
                  if($formula->statushariankerja=='Aktif')
                  {
                    if($formula->jenisnilaihariankerja=='Komponen Upah')
                    {
                      $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahhariankerja);
                      $upahlembur = (1/$formula->faktorpembagihariankerja) * $dasarupah;
                    } else if($formula->jenisnilaihariankerja=='Nilai Tetap'){
                        //angka tetap
                        $upahlembur = $formula->angkatetaphariankerja;
                      } else {
                          //persen
                          $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahhariankerja);
                          $upahlembur = (($formula->persentasehariankerja/100) * $dasarupah);
                        }

                  } else {
                    $upahlembur = 0;
                  }
                  $harikerja++;

              }  else if($idwaktulembur==2)
                  {
                      //hari libur
                      if($formula->statusharianlibur=='Aktif')
                      {
                       
                        if($formula->jenisnilaiharianlibur=='Komponen Upah')
                        {
                          $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahharianlibur);
                          $upahlembur = (1/$formula->faktorpembagiharianlibur) * $dasarupah;
                        } else if($formula->jenisnilaiharianlibur=='Nilai Tetap'){
                            //angka tetap
                            $upahlembur = $formula->angkatetapharianlibur;
                          } else {
                            
                              //persen
                              $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahharianlibur);
                              // echo 'libur:'.$dasarupah;
                              $upahlembur = (($formula->persentaseharianlibur/100) * $dasarupah);
                               
                            }

                      } else {
                        $upahlembur = 0;
                      }
                      $harilibur++;
                  } else if($idwaktulembur==3)
                      {
                          //hari raya
                          if($formula->statusharianraya=='Aktif')
                          {
                            if($formula->jenisnilaiharianraya=='Komponen Upah')
                            {
                              $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahharianraya);
                              $upahlembur = (1/$formula->faktorpembagiharianraya) * $dasarupah;
                            } else if($formula->jenisnilaiharianraya=='Nilai Tetap'){
                                //angka tetap
                                $upahlembur = $formula->angkatetapharianraya;
                              } else {
                                  //persen
                                  $dasarupah = $this->getupahpegawai($idpelamar,$formula->komponenupahharianraya);
                                  $upahlembur = (($formula->persentaseharianraya/100) * $dasarupah);
                                }

                          } else {
                            $upahlembur = 0;
                          }
                          $harilibur++;
                      }
          } else if($formula->jenisformula=='Peraturan Pemerintah')
            {             
              // $dasarupah = $this->getUpahTetapPegawai($idpelamar);$idformulalembur
              $dasarupah = $this->getUpahLemburPegawai($idpelamar,$idformulalembur);
              // echo $dasarupah;
              if($idwaktulembur==1)
              {
                // echo $jumlahjam;
                  //hari kerja
                // Untuk jam kerja lembur pertama dibayar upah sebesar 1,5 kali upah  sejam.
                // Untuk setiap jam kerja lembur berikutnya harus dibayar upah sebesar 2 kali upah sejam

                if($jumlahjam>=1)
                {
                  //jam pertama
                  // 1,5  X 1/173 x Upah Sebulan
                  $jampertama = 1.5 * ($dasarupah/173);
                  // echo 's'.$dasarupah;
                } else {
                  $jampertama = 0;
                }

                if($jumlahjam>1)
                {
                  //jam selanjutnya :
                  $jamselanjutnya = (2 * ($dasarupah/173))*($jumlahjam-1);
                } else {
                  $jamselanjutnya = 0;
                }

                $upahlembur = $jampertama + $jamselanjutnya;
// echo $upahlembur;
                $harikerja++;

              } else if($idwaktulembur==2 || $idwaktulembur==3)
                  {
                      //hari libur
                      $day = date('N', strtotime($tanggal));

                       if($jumlahharikerja==6)
                       {
                          
                          if($day==6) //hari sabtu
                          {
                            //Hari Libur Resmi Jatuh Pada Hari Kerja Terpendek 
                            // 5 Jam pertama =  5 jam x 2 x 1/173 x upah sebulan
                            // Jam ke-6  =  1 jam x 3 x 1/173 xupah sebulan
                            // Jam Ke-7 & 8  =  1 jam X 4 x 1/173 x upah sebulan
                            if($jumlahjam<5)
                            {
                                $jam5pertama = $jumlahjam * 2 * ($dasarupah/173);
                            } else if($jumlahjam>=5){
                                $jam5pertama = 5 * 2 * ($dasarupah/173);
                            }

                            if($jumlahjam>=6)
                            {
                                $jamke6 = 1 * 3 * ($dasarupah/173);
                            } else {
                                $jamke6 = 0;
                            }

                            if($jumlahjam>=7)
                            {
                                $jamke7 = 1 * 4 * ($dasarupah/173);
                            } else {
                                $jamke7 = 0;
                            }

                            if($jumlahjam>=8)
                            {
                                $jamke8 = 1 * 4 * ($dasarupah/173);
                            } else {
                                $jamke8 = 0;
                            }

                            $upahlembur = $jam5pertama + $jamke6 + $jamke7 + $jamke8;

                          } else {
                                // 7 Jam pertama = 7 jam x 2 x 1/173 x upah sebulan
                                // Jam Ke 8  = 1 jam x 3 x 1/173 xupah sebulan
                                // Jam Ke-9 s/d Jam ke-10  = 1 jam X 4 x 1/173 x upah sebulan
                                if($jumlahjam<7)
                                {
                                    $jam7pertama = $jumlahjam * 2 * ($dasarupah/173);
                                } else if($jumlahjam>=7){
                                   $jam7pertama = 7 * 2 * ($dasarupah/173);
                                }

                                if($jumlahjam>=8)
                                {
                                    $jamke8 = 1 * 3 * ($dasarupah/173);
                                } else {
                                    $jamke8 = 0;
                                }

                                if($jumlahjam>=9)
                                {
                                    $jamke9 = 1 * 4 * ($dasarupah/173);
                                } else {
                                    $jamke9 = 0;
                                }

                                if($jumlahjam>=10)
                                {
                                    $jamke10 = 1 * 4 * ($dasarupah/173);
                                } else {
                                    $jamke10 = 0;
                                }
                              $upahlembur = $jam7pertama + $jamke8 + $jamke9 + $jamke10;
                          }
                         
                       } else if($jumlahharikerja==5)
                         {
                            if($day==5) //hari jumat
                            {
                              // echo 'hari jumat';
                                 //Hari Libur Resmi Jatuh Pada Hari Kerja Terpendek 
                                // 5 Jam pertama =  5 jam x 2 x 1/173 x upah sebulan
                                // Jam ke-6  =  1 jam x 3 x 1/173 xupah sebulan
                                // Jam Ke-7 & 8  =  1 jam X 4 x 1/173 x upah sebulan
                                if($jumlahjam<5)
                                {
                                    $jam5pertama = $jumlahjam * 2 * ($dasarupah/173);
                                } else if($jumlahjam>=5){
                                    $jam5pertama = 5 * 2 *($dasarupah/173);
                                }

                                if($jumlahjam>=6)
                                {
                                    $jamke6 = 1 * 3 * ($dasarupah/173);
                                } else {
                                   $jamke6 = 0;
                                }

                                if($jumlahjam>=7)
                                {
                                    $jamke7 = 1 * 4 * ($dasarupah/173);
                                } else {
                                  $jamke7 = 0;
                                }

                                if($jumlahjam>=8)
                                {
                                    $jamke8 = 1 * 4 * ($dasarupah/173);
                                } else {
                                  $jamke8 = 0;
                                }

                                $upahlembur = $jam5pertama + $jamke6 + $jamke7 + $jamke8;
                            } else {
                                // 8 Jam pertama = 8 jam x 2 x 1/173 x upah sebulan
                                // Jam ke-9  = 1 jam x 3 x 1/173 xupah sebulan
                                // Jam ke-10 s/d Jam ke-11 = 1 jam X 4 x 1/173 x upah sebulan
                                if($jumlahjam<8)
                                {
                                    $jam8pertama = $jumlahjam * 2 * ($dasarupah/173);
                                } else if($jumlahjam>=8) {
                                    $jam8pertama = 8 * 2 * ($dasarupah/173);
                                }

                                if($jumlahjam>=9)
                                {
                                    $jamke9 = 1 * 3 * ($dasarupah/173);
                                } else {
                                    $jamke9 = 0;
                                }

                                if($jumlahjam>=10)
                                {
                                    $jamke10 = 1 * 4 * ($dasarupah/173);
                                } else {
                                    $jamke10 = 0;
                                }

                                if($jumlahjam>=11)
                                {
                                    $jamke11 = 1 * 4 * ($dasarupah/173);
                                } else {
                                    $jamke11 = 0;
                                }
                              $upahlembur = $jam8pertama + $jamke9 + $jamke10 + $jamke11;
                            }
                            
                         }

                         $harilibur++;

                  }  //end else if($idwaktulembur==2 || $idwaktulembur==3)

                  // else if($idwaktulembur==3)
                  //     {
                  //         //hari raya
                  //     }
                  // echo 'asd';
            }


          
      }
     
       return array(
          'upahlembur'=>round($upahlembur),
          'harikerja'=>$harikerja,
          'harilibur'=>$harilibur,
          'hariraya'=>$hariraya,
          'kenapajak'=>isset($formula->kenapajak) ? $formula->kenapajak : null,
          'fungsipajak'=>isset($formula->fungsipajak) ? $formula->fungsipajak : null
        );
    }



}

?>