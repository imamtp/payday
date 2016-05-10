<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class kompensasi_bak extends MY_Controller {

    public function index() {

    }

    function getdasarkomponenupah()
    {
    	$idkomponenupah = $this->input->post('idkomponenupah');
    	// $idconfigkomponenupahttbulan = 6;
        $q = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$idkomponenupah));
        $num = $q->num_rows();
        $str = null;
        $i=1;
        foreach ($q->result() as $r) {
        	$qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r->iddasarkomponenupah))->row(0);
        	$str.=$qupah->namakomponen;
            if($i!=$num)
            {
                $str.=",";
            }
            $i++;
        }
        echo $str;
    }

    function getdasarkomponenupahLembur()
    {
        $idformulalembur = $this->input->post('idformulalembur');
        // $idconfigkomponenupahttbulan = 6;
        $q = $this->db->get_where('rumusanlembur',array('idformulalembur'=>$idformulalembur))->row();

        $komponenupahhariankerjaVal = null;
        if($q->komponenupahhariankerja!=null)
        {
            $komponenupahhariankerja = explode(",", $q->komponenupahhariankerja);
            $num = count($komponenupahhariankerja);
            $i=1;
            foreach ($komponenupahhariankerja as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahhariankerjaVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahhariankerjaVal.=",";
                }
                $i++;
            }
        }

        $komponenupahharianliburVal = null;
        if($q->komponenupahharianlibur!=null)
        {
            $komponenupahharianlibur = explode(",", $q->komponenupahharianlibur);
            $num = count($komponenupahharianlibur);
            $i=1;
            foreach ($komponenupahharianlibur as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahharianliburVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahharianliburVal.=",";
                }
                $i++;
            }
        }

        $komponenupahharianrayaVal = null;
        if($q->komponenupahharianraya!=null)
        {
            $komponenupahharianraya = explode(",", $q->komponenupahharianraya);
            $num = count($komponenupahharianraya);

            $i=1;
            foreach ($komponenupahharianraya as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahharianrayaVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahharianrayaVal.=",";
                }
                $i++;
            }
        }
        //end harian

        //////////////////////// jaman

        $komponenupahjamkerjaVal = null;
        if($q->komponenupahjamkerja!=null)
        {
            $komponenupahjamkerja = explode(",", $q->komponenupahjamkerja);
            $num = count($komponenupahjamkerja);
            $i=1;
            foreach ($komponenupahjamkerja as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahjamkerjaVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahjamkerjaVal.=",";
                }
                $i++;
            }
        }

        $komponenupahjamliburVal = null;
        if($q->komponenupahjamlibur!=null)
        {
            $komponenupahjamlibur = explode(",", $q->komponenupahjamlibur);
            $num = count($komponenupahjamlibur);
            $i=1;
            foreach ($komponenupahjamlibur as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahjamliburVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahjamliburVal.=",";
                }
                $i++;
            }
        }

        $komponenupahjamrayaVal = null;
        if($q->komponenupahjamraya!=null)
        {
            $komponenupahjamraya = explode(",", $q->komponenupahjamraya);
            $num = count($komponenupahjamraya);

            $i=1;
            foreach ($komponenupahjamraya as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahjamrayaVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahjamrayaVal.=",";
                }
                $i++;
            }
        }

        //end jaman

        ////////////////////////


        // echo $komponenupahhariankerjaVal;
        echo json_encode(array(
                'komponenupahhariankerja'=>$komponenupahhariankerjaVal,
                'komponenupahharianlibur'=>$komponenupahharianliburVal,
                'komponenupahharianraya'=>$komponenupahharianrayaVal,
                'komponenupahjamkerja'=>$komponenupahjamkerjaVal,
                'komponenupahjamlibur'=>$komponenupahjamliburVal,
                'komponenupahjamraya'=>$komponenupahjamrayaVal
            ));
    }

    function getdasarkomponenBenefit()
    {
        $idbenefit = $this->input->post('idbenefit');
        // $idconfigkomponenupahttbulan = 6;
        $q = $this->db->get_where('komponenbenefit',array('idbenefit'=>$idbenefit))->row();

        //perusahaan
        $komponenupahbenefitValcmp = null;
        if($q->komponenupahbenefitcmp!=null)
        {
            $komponenupahbenefitcmp = explode(",", $q->komponenupahbenefitcmp);
            $num = count($komponenupahbenefitcmp);
            $i=1;
            foreach ($komponenupahbenefitcmp as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahbenefitValcmp.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahbenefitValcmp.=",";
                }
                $i++;
            }
        }

        //karyawan
        $komponenupahbenefitValemp = null;
        if($q->komponenupahbenefitemp!=null)
        {
            $komponenupahbenefitemp = explode(",", $q->komponenupahbenefitemp);
            $num = count($komponenupahbenefitemp);
            $i=1;
            foreach ($komponenupahbenefitemp as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenupahbenefitValemp.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenupahbenefitValemp.=",";
                }
                $i++;
            }
        }
        echo $komponenupahbenefitValcmp.'='.$komponenupahbenefitValemp;
    }

    function getdasarkomponenPengurang()
    {
        $idpengurangupah = $this->input->post('idpengurangupah');
        // $idconfigkomponenupahttbulan = 6;
        $q = $this->db->get_where('pengurangupah',array('idpengurangupah'=>$idpengurangupah))->row();

        $komponenpengurangVal = null;
        if($q->komponenpengurang!=null)
        {
            $komponenpengurang = explode(",", $q->komponenpengurang);
            $num = count($komponenpengurang);
            $i=1;
            foreach ($komponenpengurang as $r) {
                $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                $komponenpengurangVal.=$qupah->namakomponen;
                if($i!=$num)
                {
                    $komponenpengurangVal.=",";
                }
                $i++;
            }
        }
        echo $komponenpengurangVal;
    }

    function insertUpahPegawai()
    {
        $idpelamar = $this->input->post('idpelamar');
        $idkomponenupah = $this->input->post('idkomponenupah');
        $idpekerjaan = $this->input->post('idpekerjaan');

        if($this->input->post('statusformupahpegawai')=='edit')
        {
            $d = array(
                        'nilai'=>cleardot2($this->input->post('nilai')),
                    );
            $this->db->where('idupahkaryawan',$this->input->post('idupahkaryawan'));
            $this->db->update('upahkaryawan',$d);
        } else {
            $q = $this->db->get_where('upahkaryawan',array('idpelamar'=>$idpelamar,'idkomponenupah'=>$idkomponenupah,'display'=>null));
            if($q->num_rows()>0)
            {

            } else {
                $d = array(
                        'idpelamar'=>$idpelamar,
                        'idkomponenupah'=>$idkomponenupah,
                        'datein'=>$this->tanggalWaktu(),
                        'userin'=>$this->session->userdata('username'),
                        'nilai'=>$this->input->post('nilai')!='' ? cleardot2($this->input->post('nilai')) : null,
                    );
                $this->db->insert('upahkaryawan',$d);
            }

            if($this->input->post('penyesuaian')!='')
            {
                //cek kalo ada karyawan di penyesuaian dengan status 0/karyawan baru berarti penyesuaian karyawan baru dihapus/sudah disesuaikan diubah ke status=1
                $q = $this->db->get_where('penyesuaian',array('idpelamar'=>$idpelamar,'tipe'=>$this->input->post('penyesuaian'),'status'=>0,'idpekerjaan'=>$idpekerjaan));
                if($q->num_rows()>0)
                {
                    $this->db->where(array('idpelamar'=>$idpelamar,'tipe'=>$this->input->post('penyesuaian'),'status'=>0,'idpekerjaan'=>$idpekerjaan));
                    $this->db->update('penyesuaian',array('status'=>1));
                }
            }
        }

        
    }

    function insertPengurangUpahPegawai()
    {
        $idpelamar = $this->input->post('idpelamar');
        $idpengurangupah = $this->input->post('idpengurangupah');
        $d = array(
                        'idpelamar'=>$idpelamar,
                        'idpengurangupah'=>$idpengurangupah,
                        'datein'=>$this->tanggalWaktu(),
                        'userin'=>$this->session->userdata('username')
                    );
        $this->db->insert('pengurangupahkaryawan',$d);
    }

    function rekaplembur()
    {
        $startdate = str_replace('T00:00:00','',$this->input->post('startdate'));
        $enddate = str_replace('T00:00:00','',$this->input->post('enddate'));

        $this->load->model('kompensasi/m_lembur');
        $d = $this->m_lembur->data($startdate,$enddate);

        echo '{success:true,numrow:' . $d['num'] . ',results:' . $d['num'] .',rows:[' . json_encode($d['data']) . ']}';    
    }

    function penggajian($idcompany=null,$startdate=null,$enddate=null)
    {
        $obj=new stdClass();
        if($idcompany==null)
        {
            $idcompany = $this->input->post('idcompany');
        }
        
        $idjabatan = $this->input->post('idjabatan');
        $idorganisasi = $this->input->post('idorganisasi');

        if($startdate==null)
        {
            $startdate = $this->input->post('startdate');
        }
        if($enddate==null)
        {
            $enddate = $this->input->post('enddate');
        }

        $startdate = backdate2_reverse($startdate);
        $startdateArr = explode('-', $startdate);
        $enddate = backdate2_reverse($enddate);
        $enddateArr = explode('-', $enddate);
        $akhirtahun = $startdateArr[0].'-12-'.cal_days_in_month(CAL_GREGORIAN, 12, $startdateArr[0]);

        $date1 = new DateTime($startdate);
        $date2 = new DateTime($enddate);



        $this->load->model('kompensasi/m_lembur');

        //getweekdays
        $numdayswork = $this->get_weekdays($startdate,$enddate);

        $numdays = $date2->diff($date1)->format("%a");
        $maxdaysWork=22;

        
        $penghasilannet = 0;

        $sqlpeg = "select a.idpelamar,idptkp,namalengkap,idptkp,tglmasuk,tglberakhir,punyanpwp,biayajabatan,jenispotonganpph
                    from pelamar a
                    JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    where a.idcompany=$idcompany";
        $qpeg = $this->db->query($sqlpeg);

        $data=array();
        $arrJson=array();
        $i=0;
        foreach ($qpeg->result() as $rpeg) {
            
            $obj->idpelamar = $rpeg->idpelamar;
            $obj->startdate = $startdate;
            $obj->enddate = $enddate;

            $penghasilanbruto = 0; //Penghasilan Bruto hanya memasukkan komponen yang dikategorikan masuk pajak
                        
            $data[$i]['idpelamar'] = $rpeg->idpelamar;
            $data[$i]['namalengkap'] = $rpeg->namalengkap;
            $obj->namalengkap = $rpeg->namalengkap;
            $data[$i]['startdate'] = $startdate;
            $data[$i]['enddate'] = $enddate;
            $data[$i]['punyanpwp'] = $rpeg->punyanpwp;
            $obj->punyanpwp = $rpeg->punyanpwp==1 ? 'YA' : 'TIDAK';
            $data[$i]['durasi'] = 31;
            $obj->durasi = 31;

            if($rpeg->jenispotonganpph==1 || $rpeg->jenispotonganpph==0 || $rpeg->jenispotonganpph==null)
            {
                $data[$i]['hitungpajak'] = 'GROSS';
                $obj->hitungpajak = 'GROSS';
            } else {
                $data[$i]['hitungpajak'] = 'NET';
                $obj->hitungpajak = 'NET';
            }

             //first payroll
            $qfpayroll = $this->db->query("select tglgaji from payroll where idpelamar=".$rpeg->idpelamar." ORDER BY tglgaji DESC limit 1");
            if($qfpayroll->num_rows()>0)
            {
                $rqfpayroll = $qfpayroll->row();
                $tglgajipertamaArr = explode('-', $rqfpayroll->tglgaji);
                $data[$i]['tglgajipertama'] = $tglgajipertamaArr[0].'-'.$tglgajipertamaArr[1].'-01';
            } else {
                $data[$i]['tglgajipertama'] = $startdate;
            }
            $obj->tglgajipertama = $data[$i]['tglgajipertama'];
            //end first payroll

            //itung jumlah periode kerja
            $qtglmasuk = $this->db->query("select tglmasuk from pekerjaan where idpelamar=".$rpeg->idpelamar." ORDER BY tglmasuk limit 1")->row();
            // $d1 = strtotime($startdate);
            // $d2 = strtotime($rpeg->tglmasuk);
            // $min_date = min($d1, $d2);
            // $max_date = max($d1, $d2);
            // echo $max_date;
            // $ix = 0;
            // while (($min_date = strtotime("+1 MONTH", $min_date)) <= $max_date) {
            //     $ix++;
            // }
            // echo $rpeg->tglmasuk.','.$startdate;
            $data[$i]['masakerja'] = diffInMonths($rpeg->tglmasuk,$startdate);
            $obj->masakerja = $data[$i]['masakerja'];
            $data[$i]['tglmasuk'] = $rpeg->tglmasuk;
            $obj->tglmasuk = $data[$i]['tglmasuk'];
            //end itung jumlah periode kerja

            //ptkp 
            $qptkp = $this->db->get_where('ptkp',array('idptkp'=>$rpeg->idptkp))->row();
            $nilaiptkp = $qptkp->nilaiptkp;
            $data[$i]['nilaiptkp'] = $nilaiptkp;
            $obj->nilaiptkp = $nilaiptkp;
            $data[$i]['kodeptkp'] = $qptkp->kodeptkp;
            $obj->kodeptkp = $qptkp->kodeptkp;
            // echo $data[$i]['tglgajipertama'].','.$akhirtahun;
            $data[$i]['masapajaksetahun'] = diffInMonths($data[$i]['tglgajipertama'],$akhirtahun) > 12 ? 12 : diffInMonths($data[$i]['tglgajipertama'],$akhirtahun);
            $obj->masapajaksetahun = $data[$i]['masapajaksetahun'];
            //////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TETAP
            $qUT = $this->db->query("select a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
                                        from upahkaryawan a
                                        join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                                        where b.jeniskomponen='Upah Tetap' and a.idpelamar=".$rpeg->idpelamar." and a.display is null
                                        and (now() BETWEEN b.startdate and b.enddate)");
            $utPenambahPajak=0;
            $utPengurangPajak=0;
            $totalUT=0;
            foreach ($qUT->result() as $rUT) {
                $data[$i]['upahtetap']['item'][] = array(
                                                    'namakomponen'=>$rUT->namakomponen,
                                                    'nilai'=>$rUT->nilai,
                                                    'kenapajak'=>$rUT->kenapajak,
                                                    'fungsipajak'=>$rUT->fungsipajak
                                                );

                if($rUT->kenapajak=='YA')
                {
                    if($rUT->fungsipajak=='Penambah')
                    {
                        $utPenambahPajak+=$rUT->nilai;
                    } else {
                        $utPengurangPajak+=$rUT->nilai;
                    }
                    // echo $penghasilanbruto.' += '.$rUT->nilai.'<br>';
                    $penghasilanbruto += $rUT->nilai;

                } else {
                    $penghasilannet += $rUT->nilai;
                }

                $totalUT+=$rUT->nilai;
            }
            // echo $totalUT;
            $data[$i]['totalUT'] = $totalUT;
            $obj->totalUT = $totalUT;

            ///////////////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TIDAK TETAP BULANAN
            $qUTT = $this->db->query("select a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
                                        from upahkaryawan a
                                        join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                                        where b.jeniskomponen='Upah Tidak Tetap' and b.jangkawaktu='Bulanan' and a.idpelamar=".$rpeg->idpelamar." and a.display is null
                                        and (now() BETWEEN b.startdate and b.enddate)");
            $utTPenambahPajak=0;
            $utTPengurangPajak=0;
            $totalUTT=0;
            foreach ($qUTT->result() as $rUTT) {

                $q = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$rUTT->idkomponenupah));
                $num = $q->num_rows();
                $str = null;
                $nilai=0;
                foreach ($q->result() as $r) {
                    $qupah = $this->db->get_where('upahkaryawan',array('idkomponenupah'=>$r->iddasarkomponenupah,'idpelamar'=>$rpeg->idpelamar,'display'=>null));
                    if($qupah->num_rows()>0)
                    {
                        $rupah = $qupah->row();
                        $nilai+=$rupah->nilai;
                    } else {
                        $nilai+=0;
                    }
                    
                }

                $data[$i]['upahtidaktetap']['item'][] = array(
                                                    'namakomponen'=>$rUTT->namakomponen,
                                                    'nilai'=>$nilai,
                                                    'kenapajak'=>$rUTT->kenapajak,
                                                    'fungsipajak'=>$rUTT->fungsipajak
                                                );

                if($rUTT->kenapajak=='YA')
                {
                    if($rUTT->fungsipajak=='Penambah')
                    {
                        $utTPenambahPajak+=$rUTT->nilai;
                    } else {
                        $utTPengurangPajak+=$rUTT->nilai;
                    }
                    // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                    $penghasilanbruto+=$rUTT->nilai;
                } else {
                    $penghasilannet+=$rUTT->nilai;
                }

                $totalUTT+=$nilai;
            }
            $data[$i]['totalUTT'] = $totalUTT;
            $obj->totalUTT = $data[$i]['totalUTT'];

            ///////////////////////////////////////////////////////////////////////////////////////////////
            //LEMBUR
            $d = $this->m_lembur->data($startdate,$enddate,$rpeg->idpelamar);
            $datalembur = $d;
            if($d['num']!=0)
            {
                $data[$i]['lembur']['jumlahjam'] = $d['data']['jumlahjam'];
                $data[$i]['lembur']['jumlahhari'] = $d['data']['jumlahhari'];
                $data[$i]['lembur']['upahlemburPajak'] = $d['data']['upahlemburPajak'];
                $data[$i]['lembur']['upahlemburNoPajak'] = $d['data']['upahlemburNoPajak'];
                $data[$i]['lembur']['harikerja'] = $d['data']['harikerja'];
                $data[$i]['lembur']['harilibur'] = $d['data']['harilibur'];
                $data[$i]['lembur']['hariraya'] = $d['data']['hariraya'];

                $data[$i]['upahlemburPajak'] = $d['data']['upahlemburPajak'];
                $data[$i]['upahlemburNoPajak'] = $d['data']['upahlemburNoPajak'];
                // echo $penghasilanbruto.' += '.$data[$i]['lembur']['upahlemburPajak'].'<br>';
                $penghasilanbruto+= $data[$i]['lembur']['upahlemburPajak'];
                $penghasilannet+= $data[$i]['lembur']['upahlemburNoPajak'];
            } else {
                $data[$i]['upahlemburPajak'] = 0;
                $data[$i]['upahlemburNoPajak'] = 0;
            }
          
            $obj->upahlemburPajak = $data[$i]['upahlemburPajak'];
            $obj->upahlemburNoPajak = $data[$i]['upahlemburNoPajak'];

            // $penerimaan = $totalUT+$totalUTT+$upahLembur;

            ///////////////////////////////////////////////////////////////////////////////////////////////
            //BENEFIT
            $benefitCmpBruto = 0;
            $benefitCmpNet = 0;
            $benefitEmpBruto = 0;
            $benefitEmpNet = 0;
            $qbk = $this->db->get_where('benefitkaryawan',array('idpelamar'=>$rpeg->idpelamar));
            foreach ($qbk->result() as $rb) {
                $qbenefit = $this->db->get_where('komponenbenefit',array('idbenefit'=>$rb->idbenefit,'display'=>null));

                if($qbenefit->num_rows()>0)
                {
                    $rbenefit = $qbenefit->row();
                    if($rbenefit->ditanggungperusahaan=='t')
                    {
                        if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                        {
                            $k = explode(',', $rbenefit->komponenupahbenefitcmp);

                            $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);

                            $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitcmp;
                            if($rbenefit->kenapajakcmp=='YA')
                            { 
                                $benefitCmpBruto += $nilaiBenefit;  
                                // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                 
                                $penghasilanbruto+= $nilaiBenefit;                         
                            } else {
                               $benefitCmpNet += $nilaiBenefit;   
                            }

                        } //if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                          else if($rbenefit->jenisnilaibenefitcmp=='Nilai Tetap')
                            {
                                $nilaiBenefit = $rbenefit->angkatetapbenefitcmp;

                                if($rbenefit->kenapajakcmp=='YA')
                                {
                                    $benefitCmpBruto += $nilaiBenefit;
                                    // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';
                                    $penghasilanbruto+= $nilaiBenefit;                                
                                } else {
                                    $benefitCmpNet += $nilaiBenefit;  
                                }
                            } else if($rbenefit->jenisnilaibenefitcmp=='Persentase')
                                {
                                        // $k = explode(',', $rbenefit->komponenupahbenefitcmp);

                                        $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitcmp;
                                        $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitcmp/100);

                                        if($rbenefit->kenapajakcmp=='YA')
                                        {
                                            $benefitCmpBruto += $nilaiBenefit;      
                                            // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                      
                                            $penghasilanbruto+= $nilaiBenefit;                                       
                                        } else {
                                            $benefitCmpNet += $nilaiBenefit;    
                                        }
                                }
                    } // end if($rbenefit->ditanggungperusahaan=='t')

                    if($rbenefit->ditanggungkaryawan=='t')
                    {
                        if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
                        {
                            $k = explode(',', $rbenefit->komponenupahbenefitemp);

                            $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);

                            $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitemp;
                            if($rbenefit->kenapajakemp=='YA')
                            {
                                $benefitEmpBruto += $nilaiBenefit; 
                                // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>'; 
                                $penghasilanbruto+= $benefitEmpBruto;                                                      
                            } else {
                                $benefitEmpNet += $nilaiBenefit;           
                            }

                        } //if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
                          else if($rbenefit->jenisnilaibenefitemp=='Nilai Tetap')
                            {
                                $nilaiBenefit = $rbenefit->angkatetapbenefitemp;

                                if($rbenefit->kenapajakemp=='YA')
                                {
                                   $benefitEmpBruto += $nilaiBenefit; 
                                   $penghasilanbruto+=$benefitEmpBruto;
                                } else {
                                    $benefitEmpNet += $nilaiBenefit; 
                                }
                            } else if($rbenefit->jenisnilaibenefitemp=='Persentase')
                                {
                                        // $k = explode(',', $rbenefit->komponenupahbenefitemp);

                                        $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitemp;
                                        $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitemp/100);

                                        if($rbenefit->kenapajakemp=='YA')
                                        {
                                            $benefitEmpBruto += $nilaiBenefit;
                                            // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>'; 
                                            $penghasilanbruto+=$benefitEmpBruto;
                                        } else {
                                            $benefitEmpNet += $nilaiBenefit;
                                        }
                                }
                    }
                }

            } //END foreach ($qbk->result() as $rb)

            $data[$i]['benefitCmpBruto'] = $benefitCmpBruto;
            $data[$i]['benefitCmpNet'] = $benefitCmpNet;
            $data[$i]['benefitEmpBruto'] = $benefitEmpBruto;
            $data[$i]['benefitEmpNet'] = $benefitEmpNet;
            $obj->benefitCmpBruto = $benefitCmpBruto;
            $obj->benefitCmpNet = $benefitCmpNet;
            $obj->benefitEmpBruto = $benefitEmpBruto;
            $obj->benefitEmpNet = $benefitEmpNet;


            ////////////////////PENGURANG UPAH///////////////////////////        
            $qPotongan = $this->db->query("select a.idpelamar,a.idpengurangupah,b.namapengurangupah,b.kenapajak,b.fungsipajak,b.hitungpajak,b.komponenpengurang,b.jenisnilaipengurang,b.faktorpembagipengurangupah,b.angkatetappengurangupah,b.persenpengurangupah
                                            from pengurangupahkaryawan a
                                            join pengurangupah b ON a.idpengurangupah = b.idpengurangupah
                                            where (now() BETWEEN b.startdate and b.enddate) and a.idpelamar=".$rpeg->idpelamar."");

            $potonganBruto = 0;
            $potonganNet = 0;
            $nilaiPotongan = 0;
            foreach ($qPotongan->result() as $rPotongan) {

                if($rPotongan->jenisnilaipengurang=='Komponen Upah')
                        {
                            // $k = explode(',', $rPotongan->komponenupahbenefitcmp);

                            $totalKomponen = $this->countKomponenValue($rPotongan->komponenpengurang,$rpeg->idpelamar);

                            $nilaiPotongan = $totalKomponen/$rPotongan->faktorpembagipengurangupah;
                            // if($rPotongan->kenapajak=='YA')
                            // { 
                            //     $potonganBruto += $nilaiPotongan;                              
                            //     $penghasilanbruto+= $nilaiPotongan;                         
                            // } else {
                            //    $potonganNet += $nilaiPotongan;   
                            // }

                        } //if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                          else if($rPotongan->jenisnilaipengurang=='Nilai Tetap')
                            {
                                $nilaiPotongan = $rPotongan->angkatetappengurangupah;

                                // if($rPotongan->kenapajak=='YA')
                                // {
                                //     $potonganBruto += $nilaiPotongan;
                                //     // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';
                                //     $penghasilanbruto+= $nilaiPotongan;                                
                                // } else {
                                //     $potonganNet += $nilaiPotongan;  
                                // }
                            } else if($rPotongan->jenisnilaipengurang=='Persentase')
                                {
                                        $totalKomponen = $this->countKomponenValue($rPotongan->komponenpengurang,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitcmp;
                                        $nilaiPotongan = $totalKomponen*($rPotongan->persenpengurangupah/100);

                                        // if($rPotongan->kenapajak=='YA')
                                        // {
                                        //     $potonganBruto += $nilaiPotongan;      
                                        //     // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                      
                                        //     $penghasilanbruto+= $nilaiPotongan;                                       
                                        // } else {
                                        //     $potonganNet += $nilaiBenefit;    
                                        // }
                                }
            }
            $obj->nilaiPotongan = $nilaiPotongan;
            ////////////////////END PENGURANG UPAH///////////////////////////


            ////////////////////////////////////////////////////////////////////////////////////////////////

            //daily, Gaji dikali 1/22 dikali jumlah hari kerja.            

            //karyawan baru dicek tanggal masuk
            // $qcek = $this->db->query("select tglmasuk from pekerjaan where idpelamar = ".$rpeg->idpelamar." and display is null ORDER BY tglmasuk asc limit 1")->row();
            // $tglJabatan = $qcek->tglmasuk;
            // $tglJabatanArr = explode('-', $qcek->tglmasuk);

            // if($startdateArr[0]>$tglJabatanArr[0])
            // {
            //     //lebih dari satu tahun dapet gaji full
            //     $penghasilanbrutoFinal = $penghasilanbruto*(1/$maxdaysWork) * $maxdaysWork; //FULL
            //     $penghasilannetFinal = $penghasilannet*(1/$maxdaysWork) * $maxdaysWork; //FULL

            // } else if($startdateArr[0]==$tglJabatanArr[0])
            //     {   
            //         //masuk dan penggajian ada di tahun yang sama dicek tanggal masuk
            //         if(intval($startdateArr[1])>=intval($tglJabatanArr[1]))
            //         {
            //             //bulan masuk lebih kecil dari pada bulan penggajian
            //             $penghasilanbrutoFinal = $penghasilanbruto*(1/$maxdaysWork) * $maxdaysWork; //FULL
            //             $penghasilannetFinal = $penghasilannet*(1/$maxdaysWork) * $maxdaysWork; //FULL
            //         } else {
            //             if(intval($startdateArr[2])<intval($tglJabatanArr[2]))
            //             {
            //                 //tgl gaji lebih kecil dari tgl masuk jabatan (prorata)
            //                 $numdayswork = $this->get_weekdays($startdateArr[0].'-'.$startdateArr[1].'-'.$tglJabatanArr[2],$enddate);
            //                 $penghasilanbrutoFinal = $penghasilanbruto*(1/$maxdaysWork) *  $numdayswork;
            //                 $penghasilannetFinal = $penghasilannet*(1/$maxdaysWork) *  $numdayswork;
            //             } else {
            //                 $penghasilanbrutoFinal = $penghasilanbruto*(1/$maxdaysWork) * $numdayswork; //FULL
            //                 $penghasilannetFinal = $penghasilannet*(1/$maxdaysWork) * $numdayswork; //FULL
            //             }
            //         }
                    
            //     }

            $data[$i]['numdayswork'] = $numdayswork;
            $obj->numdayswork = $numdayswork;
            

           
            
            $totalpendapatan =  $data[$i]['totalUT']+$data[$i]['totalUTT']+$data[$i]['upahlemburNoPajak']+$benefitCmpBruto+$benefitCmpNet;
            $data[$i]['totalpendapatan'] = $totalpendapatan;
            $obj->totalpendapatan = $totalpendapatan;

            $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

            // $data[$i]['penerimaanbruto'] = number_format($penghasilanbrutoFinal);
            // echo $penghasilanbruto+ 327658.33;
            if($data[$i]['hitungpajak'] == 'NET')
            {
                $tunjanganpajak = $this->tunjanganpajak($rpeg->idpelamar,$startdate,$enddate,$data[$i]['tglgajipertama'],$data[$i]['hitungpajak'],$data[$i]['punyanpwp'],$rpeg->tglmasuk,$nilaiptkp,$datalembur,$benefitCmpBruto,$benefitCmpNet,$benefitEmpBruto,$benefitEmpNet,$penghasilanbruto,$totalUT,$totalUTT,$rpeg->biayajabatan);
                $tunjanganpajak = explode('.', $tunjanganpajak['tunjanganpajaknew']);
                // echo $tunjanganpajak[0];
                $data[$i]['penerimaanbruto'] = $penghasilanbruto+$tunjanganpajak[0];
                $data[$i]['tunjanganpajak'] = $tunjanganpajak[0];
                
                // echo '<pre>';
                // print_r($this->tunjanganpajak($rpeg->idpelamar,$startdate,$enddate));
                // echo '</pre>';
                // exit;
            } else {
                $data[$i]['penerimaanbruto'] = $penghasilanbruto;
                $data[$i]['tunjanganpajak'] = 0;
            }
            $obj->penerimaanbruto =  $data[$i]['penerimaanbruto'];
            $obj->tunjanganpajak = $data[$i]['tunjanganpajak'];

            $biayajabatan = $data[$i]['penerimaanbruto']*0.05;

                        $data[$i]['numdayswork'] = $numdayswork;
                        // echo 'biayajabatan'.$rpeg->biayajabatan;
                        if($rpeg->biayajabatan==1 || $rpeg->biayajabatan==null || $rpeg->biayajabatan==0)
                        {
                            $data[$i]['biayajabatan'] = $biayajabatan<=500000 ? $biayajabatan : 500000;
                        } else {
                            $data[$i]['biayajabatan'] = 0;
                        }
                        $obj->biayajabatan = $data[$i]['biayajabatan'];

                        $penghasilannet = $data[$i]['penerimaanbruto']-($benefitEmpBruto+$benefitEmpNet+$data[$i]['biayajabatan']);
                        
                                                
                        $totalpendapatan =  $data[$i]['totalUT']+$data[$i]['totalUTT']+$data[$i]['upahlemburNoPajak']+$benefitCmpBruto+$benefitCmpNet+ $data[$i]['tunjanganpajak'];

                        // echo '(totalpendapatan:'.$data[$i]['totalUT'].'+'.$data[$i]['totalUTT'].'+'.$data[$i]['upahlemburNoPajak'].'+'.$benefitCmpBruto.'+'.$benefitCmpNet.'+'.$tunjanganpajak.'='.$totalpendapatan.') ';

                        $data[$i]['totalpendapatan'] = $totalpendapatan;
                        $obj->totalpendapatan = $data[$i]['totalpendapatan'];

                        $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

                        // $data[$i]['penerimaanbruto'] = $penghasilanbruto;
                        

                        $data[$i]['penerimaannet'] = $penghasilannet;
                        $obj->penerimaannet = $data[$i]['penerimaannet'];
                        $data[$i]['netosetahun'] = $penghasilannet*$data[$i]['masapajaksetahun'];
                        $obj->netosetahun = $data[$i]['netosetahun'];
                        // echo  $netsetahun.'<'.$nilaiptkp;

                        if($data[$i]['netosetahun']<=$nilaiptkp)
                        {
                            $pkpsetahun = 0;
                        } else {    
                            $pkpsetahun = round($data[$i]['netosetahun']-$nilaiptkp);
                            $pkpsetahun = substr_replace($pkpsetahun, '000', -3);
                        }
                        $data[$i]['pkpsetahun'] = $pkpsetahun;
                        $obj->pkpsetahun = $data[$i]['pkpsetahun'];
             
                        ///////////// pph5%tahun
                        $pph5tahun = $pkpsetahun <= 50000000 ? $pkpsetahun*0.05 : 50000000*0.05;
                        $data[$i]['pph5%tahun'] = $data[$i]['punyanpwp']==1 ? $pph5tahun : $pph5tahun*1.2; 
                        $obj->pph5tahun = $data[$i]['pph5%tahun'];
                        ///////////// pph5%tahun

                        $data[$i]['pph10%tahun'] = 0;

                        ///////////// pph15%tahun
                        if($pkpsetahun<=50000000)
                        {
                            $pph15tahun = 0;
                        } else if($pkpsetahun>50000000 && $pkpsetahun<250000000) {
                            $pph15tahun = ($pkpsetahun-50000000)*0.15;
                        } else {
                            $pph15tahun = 200000000*0.15;
                        }

                        $data[$i]['pph15%tahun'] = $data[$i]['punyanpwp']==1 ? $pph15tahun : $pph15tahun*1.2; 
                        $obj->pph15tahun = $data[$i]['pph15%tahun'];
                        ///////////////// pph15%tahun

                        ///////////// pph25%tahun
                        if($pkpsetahun<=250000000)
                        {
                            $pph25tahun = 0;
                        } else if($pkpsetahun>250000000 && $pkpsetahun<500000000) {
                            $pph25tahun = ($pkpsetahun-250000000)*0.25;
                        } else {
                            $pph25tahun = 250000000*0.25;
                        }

                        $data[$i]['pph25%tahun'] = $data[$i]['punyanpwp']==1 ? $pph25tahun : $pph25tahun*1.2; 
                        $obj->pph25tahun = $data[$i]['pph25%tahun'];
                        ///////////////// pph25%tahun

                        ///////////// pph30%tahun
                        if($pkpsetahun<=500000000)
                        {
                            $pph30tahun = 0;
                        } else if($pkpsetahun>500000000) {
                            $pph30tahun = ($pkpsetahun-500000000)*0.30;
                        } else {
                            $pph30tahun = 500000000*0.30;
                        }

                        $data[$i]['pph30%tahun'] = $data[$i]['punyanpwp']==1 ? $pph30tahun : $pph30tahun*1.2; 
                        $obj->pph25tahun = $data[$i]['pph30%tahun'];
                        ///////////////// pph30%tahun

                        // $data[$i]['pph30%tahun'] = ($pkpsetahun*0.30)/12;
                        $data[$i]['pph35%tahun'] = 0;
                        $obj->pph35tahun = $data[$i]['pph35%tahun'];

                        $data[$i]['pphsettahun'] = $data[$i]['pph5%tahun']+$data[$i]['pph10%tahun']+$data[$i]['pph15%tahun']+$data[$i]['pph25%tahun']+$data[$i]['pph30%tahun']+$data[$i]['pph35%tahun'];
                        $obj->pphsettahun = $data[$i]['pphsettahun'];

                        $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : $pphsetsebulan;
                        $obj->pphsebulan = $data[$i]['pphsebulan'];

                        $data[$i]['tunjanganpajaknew'] = $data[$i]['pphsebulan'];

                        $tunjanganpajak = $data[$i]['pphsebulan'];

                        // echo ' pphsebulan:'.$data[$i]['pphsebulan'].'<br>';
                        // if($j==0)
                        // {
                        //     $data[$i]['totalpendapatan'] = $data[$i]['totalpendapatan'];
                        // } else {
                        //     $data[$i]['totalpendapatan'] = $data[$i]['totalpendapatan']+$data[$i]['tunjanganpajak'];
                        // }
                        // echo $data[$i]['totalpendapatan'].'-'.$data[$i]['pphsebulan'].'-'.$data[$i]['benefitCmpBruto'].'-'.$data[$i]['benefitCmpNet'].'-'.$data[$i]['benefitEmpBruto'].'-'.$data[$i]['benefitEmpNet'];
                        // $x1 = $data[$i]['totalpendapatan']-$data[$i]['pphsebulan'];
                        // echo round($x1).' ';
                        // echo $data[$i]['benefitCmpBruto'].'+'.$data[$i]['benefitCmpNet'].'+'.$data[$i]['benefitEmpBruto'].'+'.$data[$i]['benefitEmpNet'].' ';
                        // $x2 = $data[$i]['benefitCmpBruto']+$data[$i]['benefitCmpNet']+$data[$i]['benefitEmpBruto']+$data[$i]['benefitEmpNet'];
                        // echo $x2.'<br>';
                        // echo $data[$i]['benefitCmpBruto'].'+'.$data[$i]['benefitCmpNet'].'+'.$data[$i]['benefitEmpBruto'].'+'.$data[$i]['benefitEmpNet'].'+'.$tunjanganpajak;
                        // echo $data[$i]['benefitCmpBruto']+  $data[$i]['benefitCmpNet']+$data[$i]['benefitEmpBruto']+$data[$i]['benefitEmpNet']+$tunjanganpajak;
                        $data[$i]['takehomepay'] = round(($data[$i]['totalpendapatan']-$data[$i]['pphsebulan'])-($data[$i]['benefitCmpBruto']+  $data[$i]['benefitCmpNet']+$data[$i]['benefitEmpBruto']+$data[$i]['benefitEmpNet']+$data[$i]['tunjanganpajak']+$nilaiPotongan));
                        $obj->takehomepay = $data[$i]['takehomepay'];

            echo '<pre>';
            print_r($data);
            echo '</pre>';
            $arrJson[] = $obj;            
            $i++;
        }
            // echo '<pre>';
            // print_r($data);
            // echo '</pre>';
        // echo '{success:true,numrow:' . $i . ',results:' . $i .',rows:' . json_encode($arrJson) . '}';
    }

    function tunjanganpajak($idpelamar,$startdate,$enddate,$tglgajipertama,$hitungpajak,$punyanpwp,$tglmasuk,$nilaiptkp,$datalembur,$benefitCmpBruto,$benefitCmpNet,$benefitEmpBruto,$benefitEmpNet,$penghasilanbrutoParams,$totalUT,$totalUTT,$biayajabatanstatus)
    {
        // $startdate = backdate2_reverse($startdate);
        $startdateArr = explode('-', $startdate);
        // $enddate = backdate2_reverse($enddate);
        $enddateArr = explode('-', $enddate);
        $akhirtahun = $startdateArr[0].'-12-'.cal_days_in_month(CAL_GREGORIAN, 12, $startdateArr[0]);

        $date1 = new DateTime($startdate);
        $date2 = new DateTime($enddate);

        $this->load->model('kompensasi/m_lembur');

        //getweekdays
        $numdayswork = $this->get_weekdays($startdate,$enddate);

        $numdays = $date2->diff($date1)->format("%a");
        $maxdaysWork=22;

        
        $penghasilannet = 0;

        // $sqlpeg = "select a.idpelamar,idptkp,namalengkap,idptkp,tglmasuk,tglberakhir,punyanpwp,biayajabatan
        //             from pelamar a
        //             JOIN
        //             (
        //                 SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
        //                 FROM pekerjaan
        //                 WHERE statuspergerakan='Disetujui'
        //                 GROUP BY idpelamar
        //             ) as x ON a.idpelamar = x.idpelamar
        //             join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
        //             where a.idpelamar=$idpelamar";
        // $qpeg = $this->db->query($sqlpeg);

        $data=array();
        $i=0;
        // foreach ($qpeg->result() as $rpeg) {
            $penghasilanbruto = 0; //Penghasilan Bruto hanya memasukkan komponen yang dikategorikan masuk pajak

            $data[$i]['idpelamar'] = $idpelamar;
            // $data[$i]['namalengkap'] = $rpeg->namalengkap;
            $data[$i]['startdate'] = $startdate;
            $data[$i]['enddate'] = $enddate;
            $data[$i]['punyanpwp'] = $punyanpwp;
            $data[$i]['durasi'] = 31;
            $data[$i]['hitungpajak'] = $hitungpajak;


             //first payroll
            // $qfpayroll = $this->db->query("select tglgaji from payroll where idpelamar=".$idpelamar." ORDER BY tglgaji DESC limit 1");
            // if($qfpayroll->num_rows()>0)
            // {
            //     $rqfpayroll = $qfpayroll->row();
            //     $tglgajipertamaArr = explode('-', $rqfpayroll->tglgaji);
            //     $data[$i]['tglgajipertama'] = $tglgajipertamaArr[0].'-'.$tglgajipertamaArr[1].'-01';
            // } else {
            //     $data[$i]['tglgajipertama'] = $startdate;
            // }
             $data[$i]['tglgajipertama'] = $tglgajipertama;
            //end first payroll

            //itung jumlah periode kerja
            // $qtglmasuk = $this->db->query("select tglmasuk from pekerjaan where idpelamar=".$rpeg->idpelamar." ORDER BY tglmasuk limit 1")->row();
// echo $this->db->last_query();
            $data[$i]['masakerja'] = diffInMonths($tglmasuk,$startdate);
            $data[$i]['tglmasuk'] = $tglmasuk;
            //end itung jumlah periode kerja

            //ptkp 
            // $qptkp = $this->db->get_where('ptkp',array('idptkp'=>$rpeg->idptkp))->row();
            // $nilaiptkp = $qptkp->nilaiptkp;
            $data[$i]['nilaiptkp'] = $nilaiptkp;
            // $data[$i]['kodeptkp'] = $qptkp->kodeptkp;
            // echo $data[$i]['tglgajipertama'].','.$akhirtahun;
            $data[$i]['masapajaksetahun'] = diffInMonths($data[$i]['tglgajipertama'],$akhirtahun) > 12 ? 12 : diffInMonths($data[$i]['tglgajipertama'],$akhirtahun);

            //////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TETAP
            // $qUT = $this->db->query("select a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
            //                             from upahkaryawan a
            //                             join komponenupah b ON a.idkomponenupah = b.idkomponenupah
            //                             where b.jeniskomponen='Upah Tetap' and a.idpelamar=".$idpelamar." and a.display is null
            //                             and (now() BETWEEN b.startdate and b.enddate)");
            // $utPenambahPajak=0;
            // $utPengurangPajak=0;
            // $totalUT=0;
            // foreach ($qUT->result() as $rUT) {
            //     $data[$i]['upahtetap']['item'][] = array(
            //                                         'namakomponen'=>$rUT->namakomponen,
            //                                         'nilai'=>$rUT->nilai,
            //                                         'kenapajak'=>$rUT->kenapajak,
            //                                         'fungsipajak'=>$rUT->fungsipajak
            //                                     );

            //     if($rUT->kenapajak=='YA')
            //     {
            //         if($rUT->fungsipajak=='Penambah')
            //         {
            //             $utPenambahPajak+=$rUT->nilai;
            //         } else {
            //             $utPengurangPajak+=$rUT->nilai;
            //         }
            //         // echo $penghasilanbruto.' += '.$rUT->nilai.'<br>';
            //         $penghasilanbruto += $rUT->nilai;

            //     } else {
            //         $penghasilannet += $rUT->nilai;
            //     }

            //     $totalUT+=$rUT->nilai;
            // }
            $data[$i]['totalUT'] = $totalUT;

            ///////////////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TIDAK TETAP BULANAN
            // $qUTT = $this->db->query("select a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
            //                             from upahkaryawan a
            //                             join komponenupah b ON a.idkomponenupah = b.idkomponenupah
            //                             where b.jeniskomponen='Upah Tidak Tetap' and b.jangkawaktu='Bulanan' and a.idpelamar=".$idpelamar." and a.display is null
            //                             and (now() BETWEEN b.startdate and b.enddate)");
            // $utTPenambahPajak=0;
            // $utTPengurangPajak=0;
            // $totalUTT=0;
            // foreach ($qUTT->result() as $rUTT) {

            //     $q = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$rUTT->idkomponenupah));
            //     $num = $q->num_rows();
            //     $str = null;
            //     $nilai=0;
            //     foreach ($q->result() as $r) {
            //         $qupah = $this->db->get_where('upahkaryawan',array('idkomponenupah'=>$r->iddasarkomponenupah,'idpelamar'=>$idpelamar,'display'=>null));
            //         if($qupah->num_rows()>0)
            //         {
            //             $rupah = $qupah->row();
            //             $nilai+=$rupah->nilai;
            //         } else {
            //             $nilai+=0;
            //         }
                    
            //     }

            //     $data[$i]['upahtidaktetap']['item'][] = array(
            //                                         'namakomponen'=>$rUTT->namakomponen,
            //                                         'nilai'=>$nilai,
            //                                         'kenapajak'=>$rUTT->kenapajak,
            //                                         'fungsipajak'=>$rUTT->fungsipajak
            //                                     );

            //     if($rUTT->kenapajak=='YA')
            //     {
            //         if($rUTT->fungsipajak=='Penambah')
            //         {
            //             $utTPenambahPajak+=$rUTT->nilai;
            //         } else {
            //             $utTPengurangPajak+=$rUTT->nilai;
            //         }
            //         // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
            //         $penghasilanbruto+=$rUTT->nilai;
            //     } else {
            //         $penghasilannet+=$rUTT->nilai;
            //     }

            //     $totalUTT+=$nilai;
            // }
            $data[$i]['totalUTT'] = $totalUTT;

            ///////////////////////////////////////////////////////////////////////////////////////////////
            //LEMBUR
            $d = $datalembur;
            if($d['num']!=0)
            {
                $data[$i]['lembur']['jumlahjam'] = $d['data']['jumlahjam'];
                $data[$i]['lembur']['jumlahhari'] = $d['data']['jumlahhari'];
                $data[$i]['lembur']['upahlemburPajak'] = $d['data']['upahlemburPajak'];
                $data[$i]['lembur']['upahlemburNoPajak'] = $d['data']['upahlemburNoPajak'];
                $data[$i]['lembur']['harikerja'] = $d['data']['harikerja'];
                $data[$i]['lembur']['harilibur'] = $d['data']['harilibur'];
                $data[$i]['lembur']['hariraya'] = $d['data']['hariraya'];

                $data[$i]['upahlemburPajak'] = $d['data']['upahlemburPajak'];
                $data[$i]['upahlemburNoPajak'] = $d['data']['upahlemburNoPajak'];
                // echo $penghasilanbruto.' += '.$data[$i]['lembur']['upahlemburPajak'].'<br>';
                $penghasilanbruto+= $data[$i]['lembur']['upahlemburPajak'];
                $penghasilannet+= $data[$i]['lembur']['upahlemburNoPajak'];
            } else {
                $data[$i]['upahlemburPajak'] = 0;
                $data[$i]['upahlemburNoPajak'] = 0;
            }
          

            // $penerimaan = $totalUT+$totalUTT+$upahLembur;

            ///////////////////////////////////////////////////////////////////////////////////////////////
            //BENEFIT
            // $benefitCmpBruto = 0;
            // $benefitCmpNet = 0;
            // $benefitEmpBruto = 0;
            // $benefitEmpNet = 0;
            // $qbk = $this->db->get_where('benefitkaryawan',array('idpelamar'=>$idpelamar));
            // foreach ($qbk->result() as $rb) {
            //     $qbenefit = $this->db->get_where('komponenbenefit',array('idbenefit'=>$rb->idbenefit,'display'=>null));

            //     if($qbenefit->num_rows()>0)
            //     {
            //         $rbenefit = $qbenefit->row();
            //         if($rbenefit->ditanggungperusahaan=='t')
            //         {
            //             if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
            //             {
            //                 $k = explode(',', $rbenefit->komponenupahbenefitcmp);

            //                 $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);

            //                 $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitcmp;
            //                 if($rbenefit->kenapajakcmp=='YA')
            //                 { 
            //                     $benefitCmpBruto += $nilaiBenefit;  
            //                     // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                 
            //                     $penghasilanbruto+= $nilaiBenefit;                         
            //                 } else {
            //                    $benefitCmpNet += $nilaiBenefit;   
            //                 }

            //             } //if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
            //               else if($rbenefit->jenisnilaibenefitcmp=='Nilai Tetap')
            //                 {
            //                     $nilaiBenefit = $rbenefit->angkatetapbenefitcmp;

            //                     if($rbenefit->kenapajakcmp=='YA')
            //                     {
            //                         $benefitCmpBruto += $nilaiBenefit;
            //                         // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';
            //                         $penghasilanbruto+= $nilaiBenefit;                                
            //                     } else {
            //                         $benefitCmpNet += $nilaiBenefit;  
            //                     }
            //                 } else if($rbenefit->jenisnilaibenefitcmp=='Persentase')
            //                     {
            //                             // $k = explode(',', $rbenefit->komponenupahbenefitcmp);

            //                             $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);
            //                             // echo $totalKomponen.'*'.$rbenefit->persenbenefitcmp;
            //                             $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitcmp/100);

            //                             if($rbenefit->kenapajakcmp=='YA')
            //                             {
            //                                 $benefitCmpBruto += $nilaiBenefit;      
            //                                 // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                      
            //                                 $penghasilanbruto+= $nilaiBenefit;                                       
            //                             } else {
            //                                 $benefitCmpNet += $nilaiBenefit;    
            //                             }
            //                     }
            //         } // end if($rbenefit->ditanggungperusahaan=='t')

            //         if($rbenefit->ditanggungkaryawan=='t')
            //         {
            //             if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
            //             {
            //                 $k = explode(',', $rbenefit->komponenupahbenefitemp);

            //                 $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);

            //                 $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitemp;
            //                 if($rbenefit->kenapajakemp=='YA')
            //                 {
            //                     $benefitEmpBruto += $nilaiBenefit; 
            //                     // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>'; 
            //                     $penghasilanbruto+= $benefitEmpBruto;                                                      
            //                 } else {
            //                     $benefitEmpNet += $nilaiBenefit;           
            //                 }

            //             } //if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
            //               else if($rbenefit->jenisnilaibenefitemp=='Nilai Tetap')
            //                 {
            //                     $nilaiBenefit = $rbenefit->angkatetapbenefitemp;

            //                     if($rbenefit->kenapajakemp=='YA')
            //                     {
            //                        $benefitEmpBruto += $nilaiBenefit; 
            //                        $penghasilanbruto+=$benefitEmpBruto;
            //                     } else {
            //                         $benefitEmpNet += $nilaiBenefit; 
            //                     }
            //                 } else if($rbenefit->jenisnilaibenefitemp=='Persentase')
            //                     {
            //                             // $k = explode(',', $rbenefit->komponenupahbenefitemp);

            //                             $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);
            //                             // echo $totalKomponen.'*'.$rbenefit->persenbenefitemp;
            //                             $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitemp/100);

            //                             if($rbenefit->kenapajakemp=='YA')
            //                             {
            //                                 $benefitEmpBruto += $nilaiBenefit;
            //                                 // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>'; 
            //                                 $penghasilanbruto+=$benefitEmpBruto;
            //                             } else {
            //                                 $benefitEmpNet += $nilaiBenefit;
            //                             }
            //                     }
            //         }
            //     }

            // } //END foreach ($qbk->result() as $rb)

            $data[$i]['benefitCmpBruto'] = $benefitCmpBruto;
            $data[$i]['benefitCmpNet'] = $benefitCmpNet;
            $data[$i]['benefitEmpBruto'] = $benefitEmpBruto;
            $data[$i]['benefitEmpNet'] = $benefitEmpNet;

            $tunjanganpajak=0;
            $penghasilanbrutoOld = $penghasilanbrutoParams;
                    for($j=0;$j<7;$tunjanganpajak++) {
                        // echo ' penghasilanbruto:'.$penghasilanbruto.' tunjanganpajak:'.$tunjanganpajak.' ';
                        $data[$i]['tunjanganpajaknow'] = $tunjanganpajak;
                        $penghasilanbruto = $penghasilanbrutoOld+$tunjanganpajak;
                        // echo 'penghasilanbruto:'.$penghasilanbruto.' ';
                        $biayajabatan = $penghasilanbruto*0.05;

                        $data[$i]['numdayswork'] = $numdayswork;

                        if($biayajabatanstatus==1 || $biayajabatanstatus==null || $biayajabatanstatus==0)
                        {
                            $data[$i]['biayajabatan'] = $biayajabatan<=500000 ? $biayajabatan : 500000;
                        } else {
                            $data[$i]['biayajabatan'] = 0;
                        }

                        $penghasilannet = $penghasilanbruto-$benefitEmpBruto-$benefitEmpNet-$data[$i]['biayajabatan'];
                        
                                                
                        $totalpendapatan =  $data[$i]['totalUT']+$data[$i]['totalUTT']+$data[$i]['upahlemburNoPajak']+$benefitCmpBruto+$benefitCmpNet+$tunjanganpajak;

                        // echo '(totalpendapatan:'.$data[$i]['totalUT'].'+'.$data[$i]['totalUTT'].'+'.$data[$i]['upahlemburNoPajak'].'+'.$benefitCmpBruto.'+'.$benefitCmpNet.'+'.$tunjanganpajak.'='.$totalpendapatan.') ';

                        $data[$i]['totalpendapatan'] = $totalpendapatan;

                        $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

                        $data[$i]['penerimaanbruto'] = $penghasilanbruto;
                        

                        $data[$i]['penerimaannet'] = number_format($penghasilannet);
                        $data[$i]['netosetahun'] = $penghasilannet*$data[$i]['masapajaksetahun'];
                        // echo  $netsetahun.'<'.$nilaiptkp;

                        if($data[$i]['netosetahun']<=$nilaiptkp)
                        {
                            $pkpsetahun = 0;
                        } else {    
                            $pkpsetahun = round($data[$i]['netosetahun']-$nilaiptkp);
                            $pkpsetahun = substr_replace($pkpsetahun, '000', -3);
                        }
                        $data[$i]['pkpsetahun'] = $pkpsetahun;
             
                        ///////////// pph5%tahun
                        $pph5tahun = $pkpsetahun <= 50000000 ? $pkpsetahun*0.05 : 50000000*0.05;
                        $data[$i]['pph5%tahun'] = $data[$i]['punyanpwp']==1 ? $pph5tahun : $pph5tahun*1.2; 
                        ///////////// pph5%tahun

                        $data[$i]['pph10%tahun'] = 0;

                        ///////////// pph15%tahun
                        if($pkpsetahun<=50000000)
                        {
                            $pph15tahun = 0;
                        } else if($pkpsetahun>50000000 && $pkpsetahun<250000000) {
                            $pph15tahun = ($pkpsetahun-50000000)*0.15;
                        } else {
                            $pph15tahun = 200000000*0.15;
                        }

                        $data[$i]['pph15%tahun'] = $data[$i]['punyanpwp']==1 ? $pph15tahun : $pph15tahun*1.2; 
                        ///////////////// pph15%tahun

                        ///////////// pph25%tahun
                        if($pkpsetahun<=250000000)
                        {
                            $pph25tahun = 0;
                        } else if($pkpsetahun>250000000 && $pkpsetahun<500000000) {
                            $pph25tahun = ($pkpsetahun-250000000)*0.25;
                        } else {
                            $pph25tahun = 250000000*0.25;
                        }

                        $data[$i]['pph25%tahun'] = $data[$i]['punyanpwp']==1 ? $pph25tahun : $pph25tahun*1.2; 
                        ///////////////// pph25%tahun

                        ///////////// pph30%tahun
                        if($pkpsetahun<=500000000)
                        {
                            $pph30tahun = 0;
                        } else if($pkpsetahun>500000000) {
                            $pph30tahun = ($pkpsetahun-500000000)*0.30;
                        } else {
                            $pph30tahun = 500000000*0.30;
                        }

                        $data[$i]['pph30%tahun'] = $data[$i]['punyanpwp']==1 ? $pph30tahun : $pph30tahun*1.2; 
                        ///////////////// pph30%tahun

                        // $data[$i]['pph30%tahun'] = ($pkpsetahun*0.30)/12;
                        $data[$i]['pph35%tahun'] = 0;
                        $data[$i]['pphsettahun'] = $data[$i]['pph5%tahun']+$data[$i]['pph10%tahun']+$data[$i]['pph15%tahun']+$data[$i]['pph25%tahun']+$data[$i]['pph30%tahun']+$data[$i]['pph35%tahun'];
                        $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : $pphsetsebulan;
                        $data[$i]['tunjanganpajaknew'] = $data[$i]['pphsebulan'];

                        $tunjanganpajak = $data[$i]['pphsebulan'];

                        // echo ' pphsebulan:'.$data[$i]['pphsebulan'].'<br>';
                        // if($j==0)
                        // {
                        //     $data[$i]['totalpendapatan'] = $data[$i]['totalpendapatan'];
                        // } else {
                        //     $data[$i]['totalpendapatan'] = $data[$i]['totalpendapatan']+$data[$i]['tunjanganpajak'];
                        // }
                        // echo $data[$i]['totalpendapatan'].'-'.$data[$i]['pphsebulan'].'-'.$data[$i]['benefitCmpBruto'].'-'.$data[$i]['benefitCmpNet'].'-'.$data[$i]['benefitEmpBruto'].'-'.$data[$i]['benefitEmpNet'];
                        // $x1 = $data[$i]['totalpendapatan']-$data[$i]['pphsebulan'];
                        // echo round($x1).' ';
                        // echo $data[$i]['benefitCmpBruto'].'+'.$data[$i]['benefitCmpNet'].'+'.$data[$i]['benefitEmpBruto'].'+'.$data[$i]['benefitEmpNet'].' ';
                        // $x2 = $data[$i]['benefitCmpBruto']+$data[$i]['benefitCmpNet']+$data[$i]['benefitEmpBruto']+$data[$i]['benefitEmpNet'];
                        // echo $x2.'<br>';
                        $data[$i]['takehomepay'] = round(($data[$i]['totalpendapatan']-$data[$i]['pphsebulan'])-($data[$i]['benefitCmpBruto']+  $data[$i]['benefitCmpNet']+$data[$i]['benefitEmpBruto']+$data[$i]['benefitEmpNet']+$tunjanganpajak));

                        $j++;
                    }
            // echo '<pre>';
            // print_r($data);
            // echo '</pre>';

            // $i++;
        // }

        return $data[0];
    }

    function round_down($value, $precision = 0) { 
     if (!empty($value))  {
         $sign = (0 <= $value) ? +1 : -1; 
         $amt = explode('.', $value); 
         $precision = (int) $precision; 

         if (strlen($amt[1]) > $precision) { 
             $next = (int) substr($amt[1], $precision); 
             $amt[1] = (float) (('.'.substr($amt[1], 0, $precision)) * $sign); 
             if (0 != $next) { 
                 if (-1 == $sign) { 
                     $amt[1] = $amt[1] - (float) (('.'.str_repeat('0', $precision - 1).'1') * $sign); 
                 } 
             } 
         } else { 
             $amt[1] = (float) (('.'.$amt[1]) * $sign); 
         } 
            return $amt[0] + $amt[1]; 
         }
     } 

    function countKomponenValue($komponenupahbenefitcmp,$idpelamar)
    {
        //ngitung total komponen upah t/tt

        $k = explode(',', $komponenupahbenefitcmp);

        $totalKomponen = 0;
        foreach ($k as $key => $value) {
            $kupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$value));
            if($kupah->num_rows()>0)
            {
                $rkupah = $kupah->row();
                if($rkupah->jeniskomponen=='Upah Tetap')
                {
                    $qnilaiUpah = $this->db->get_where('upahkaryawan',array('idkomponenupah'=>$value,'idpelamar'=>$idpelamar));
                    if($qnilaiUpah->num_rows()>0)
                    {
                        $rqnilaiUpah = $qnilaiUpah->row();
                        $totalKomponen += $rqnilaiUpah->nilai;
                    } 
                } else {
                    //upah tidak tetap
                    $qUTT = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$value));
                    if($qUTT->num_rows()>0)
                    {
                        $rqUTT = $qUTT->row();
                        $qupahTT = $this->db->get_where('upahkaryawan',array('idkomponenupah'=>$rqUTT->iddasarkomponenupah,'idpelamar'=>$idpelamar,'display'=>null));
                        if($qupahTT->num_rows()>0)
                        {
                            $rqupahTT = $qupahTT->row();
                            $totalKomponen += $rqupahTT->nilai;
                        }
                    }
                    
                }
            }
        }
        return $totalKomponen;
    }

    function get_weekdays($from,$to) {
        // $lastday = date("t",mktime(0,0,0,$m,1,$y));
        // $weekdays=0;
        // for($d=29;$d<=$lastday;$d++) {
        //     $wd = date("w",mktime(0,0,0,$m,$d,$y));
        //     if($wd > 0 && $wd < 6) $weekdays++;
        //     }
        // return $weekdays+20;
         $workingDays = [1, 2, 3, 4, 5]; # date format = N (1 = Monday, ...)
        $holidayDays = ['*-12-25', '*-01-01', '2013-12-23']; # variable and fixed holidays

        $from = new DateTime($from);
        $to = new DateTime($to);
        $to->modify('+1 day');
        $interval = new DateInterval('P1D');
        $periods = new DatePeriod($from, $interval, $to);

        $days = 0;
        foreach ($periods as $period) {
            if (!in_array($period->format('N'), $workingDays)) continue;
            if (in_array($period->format('Y-m-d'), $holidayDays)) continue;
            if (in_array($period->format('*-m-d'), $holidayDays)) continue;
            $days++;
        }
        return $days;
    }

    function insertBenefitPegawai()
    {
        $this->db->insert('benefitkaryawan',array('idpelamar'=>$this->input->post('idpelamar'),'idbenefit'=>$this->input->post('idbenefit')));
    }
    

    function teslembur()
    {
        $this->load->model('kompensasi/m_formulalembur');
        echo $this->m_formulalembur->hitunglembur(27,'2015-07-01');
    }

   


}
