<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class kompensasi extends MY_Controller {

    public function index() {

    }
    
    function removeprec($num)
    {
        $precision = 0;
        return substr(number_format($num, $precision+1, '.', ''), 0, -1);
    }

      function calc_pph($data,$i,$pkpsetahun)
    {
        $obj=new stdClass();

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
        return $obj->pphsettahun;
    }

    function cek_terminasi($startdate,$enddate,$terminate_date)
    {
        // echo $startdate.','.$enddate;
        $paymentDate=date('Y-m-d', strtotime($terminate_date));
        //echo $paymentDate; // echos today! 
        // echo $terminate_date;
        $contractDateBegin = date('Y-m-d', strtotime($startdate));
        $contractDateEnd = date('Y-m-d', strtotime($enddate));
        // echo $contractDateEnd;

        // echo '('.$paymentDate.' > '.$contractDateBegin.') && ('.$paymentDate.' < '.$contractDateEnd.')';
        // echo ' <= x'.$contractDateEnd;

        if($contractDateEnd<=$terminate_date)
        {
            //tanggal akhir penggajian lebih kecil atau sama dengan tgl terminasi
            return false;
        } else {
            //kalo sudah lewat terminasi date jgn muncukan thp
            return true;
        }
        // if (($paymentDate >= $contractDateBegin) && ($paymentDate <= $contractDateEnd))
        // {
        //   return true;
        // }
        // else
        // {
        //   return false;
        // }
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

    function getTglTerminasi($idpelamar)
    {
        $sql = "select a.tglmasuk
                from pekerjaan a
                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                where b.idpergerakan = 128 and a.idpelamar=$idpelamar and b.statuspergerakan='Disetujui'";
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $d = $r->tglmasuk;
        } else {
            $d = '9999-12-01';
        }
        return $d;
    }
    
    function pphteratur($pkpsetahunteratur,$data,$i,$masapajaksetahun)
    {
         $obj = new stdClass();
         
        $pkpsetahun =$pkpsetahunteratur;
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

                        // $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        $pphsetsebulan = $data[$i]['pphsettahun'] <=0 ? 0 : ceil($data[$i]['pphsettahun']/$masapajaksetahun);
                        // echo $pphsetsebulan.' ';
                        // echo ceil($data[$i]['pphsettahun']/$masapajaksetahun);

                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : $pphsetsebulan;
                        $obj->pphsebulan = $data[$i]['pphsebulan'];
                        
                        return $obj->pphsebulan;
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
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahhariankerjaVal.=$qupah->namakomponen;
                $komponenupahhariankerjaVal.=$r;
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
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahharianliburVal.=$qupah->namakomponen;
                $komponenupahharianliburVal.=$r;
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
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahharianrayaVal.=$qupah->namakomponen;
                $komponenupahharianrayaVal.=$r;
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
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahjamkerjaVal.=$qupah->namakomponen;
                $komponenupahjamkerjaVal.=$r;
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
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahjamliburVal.=$qupah->namakomponen;
                $komponenupahjamliburVal.=$r;
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
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahjamrayaVal.=$qupah->namakomponen;
                $komponenupahjamrayaVal.=$r;
                if($i!=$num)
                {
                    $komponenupahjamrayaVal.=",";
                }
                $i++;
            }
        }

        //end jaman

        ////////////////////////
        $komponenupahpemerintahVal = null;
        if($q->komponenupahpemerintah!=null)
        {
            $komponenupahpemerintah = explode(",", $q->komponenupahpemerintah);
            $num = count($komponenupahpemerintah);

            $i=1;
            foreach ($komponenupahpemerintah as $r) {
                // $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                // $komponenupahpemerintahVal.=$qupah->namakomponen;
                $komponenupahpemerintahVal.=$r;
                if($i!=$num)
                {
                    $komponenupahpemerintahVal.=",";
                }
                $i++;
            }
        }
        ///end pemerintah


        // echo $komponenupahhariankerjaVal;
        echo json_encode(array(
                'komponenupahhariankerja'=>$komponenupahhariankerjaVal,
                'komponenupahharianlibur'=>$komponenupahharianliburVal,
                'komponenupahharianraya'=>$komponenupahharianrayaVal,
                'komponenupahjamkerja'=>$komponenupahjamkerjaVal,
                'komponenupahjamlibur'=>$komponenupahjamliburVal,
                'komponenupahjamraya'=>$komponenupahjamrayaVal,
                'komponenupahpemerintah'=>$komponenupahpemerintahVal
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
            // echo $q->komponenupahbenefitcmp;
            if($num>0)
            {
                $i=1;
                foreach ($komponenupahbenefitcmp as $r) {
                    if($r!='')
                    {
                        $qupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$r))->row(0);
                        $komponenupahbenefitValcmp.=$qupah->namakomponen;
                        if($i!=$num)
                        {
                            $komponenupahbenefitValcmp.=",";
                        }
                        $i++;
                    }
                }
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
                $this->db->where(array(
                            'idpelamar'=>$idpelamar,
                            'idkomponenupah'=>$idkomponenupah
                        ));
                $this->db->update('upahkaryawan',array('display'=>null));
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

            // if($this->input->post('penyesuaian')!='')
            // {
            //     //cek kalo ada karyawan di penyesuaian dengan status 0/karyawan baru berarti penyesuaian karyawan baru dihapus/sudah disesuaikan diubah ke status=1
            //     $q = $this->db->get_where('penyesuaian',array('idpelamar'=>$idpelamar,'tipe'=>$this->input->post('penyesuaian'),'status'=>0,'idpekerjaan'=>$idpekerjaan));
            //     if($q->num_rows()>0)
            //     {
            //         $this->db->where(array('idpelamar'=>$idpelamar,'tipe'=>$this->input->post('penyesuaian'),'status'=>0,'idpekerjaan'=>$idpekerjaan));
            //         $this->db->update('penyesuaian',array('status'=>1));
            //     }
            // }
        }

        
    }

    function penyesuaian_done()
    {
        $this->db->where(array('idpelamar'=>$this->input->post('idpelamar')));
        $this->db->update('penyesuaian',array('status'=>1));
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

        echo '{success:true,numrow:' . $d['num'] . ',results:' . $d['num'] .',rows:' . json_encode($d['data']) . '}';    
    }
    
    function pajakjantonov($idpelamar,$pphsebulan,$tahun,$bulan)
    {
        $month=11;
        $year=$tahun;
        $num = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $q = $this->db->query("SELECT sum(pphsebulan) as total
        from payrolldata
        where idpelamar = $idpelamar and (startdate between '$tahun-01-01' and '".$tahun.'-11-'.$num."')")->row();
        if($idpelamar==134)
        {
            // echo $this->db->last_query();
            // exit;
        }

        // echo $this->db->last_query();\
        if($q->total==null)
        {
            return round($pphsebulan);
        } else {
            if(intval($bulan)==12)
            {
                //desember
                return round($q->total);
            } else {
                return round($q->total+$pphsebulan);
            }
            
        }
    }
    
    function kehadiran()
    {
        $this->load->library('../controllers/kehadiran');
        $this->kehadiran->rekap(35,null,null,'2015-10-01','2015-10-30',null,1,40);
    }
    
    function utt()
    {
        $this->load->model('kompensasi/m_configdasarupahtt');
        $this->m_configdasarupahtt->tes();
    }

    function penggajian($idcompany=null,$startdate=null,$enddate=null)
    {
        $this->load->model('kompensasi/m_komponenupah');

        $footerUT = 0;
        $footerUTT = 0;
        $footerLembur = 0;
        $footerBenefitCmp = 0;
        $footerBenefitEmp = 0;
        $footerPotongan = 0;
        $footerPendapatan = 0;
        $footerBruto = 0;
        $footerPajak = 0;
        $footerTHP = 0;
        $footerPPH = 0;


        $commit = $this->input->post('option') == 'save' ? 'true' : null;

        if($idcompany==null)
        {
            $idcompany = $this->input->post('idcompany');
        }

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

        $bulanGaji = $startdateArr[1];

        if($commit=='true')
        {
            $this->db->trans_start();

            $qpayroll = $this->db->query("select nextval('seq_payroll') as idpayroll")->row();
            $idpayroll = $qpayroll->idpayroll;

            $dpayroll = array(
                    'idpayroll'=>$idpayroll,
                    'idcompany'=>$idcompany,
                    'startdate'=>$startdate,
                    'enddate'=>$enddate,
                    'userin'=>$this->session->userdata('username'),
                    'datein'=>$this->tanggalWaktu()
                );
            $this->db->insert('payroll',$dpayroll);
        } else {
            $idpayroll = null;
        }

        $obj=new stdClass();

        $idjabatan = $this->input->post('idjabatan');
        $idorganisasi = $this->input->post('idorganisasi');


        $akhirtahun = $startdateArr[0].'-12-'.cal_days_in_month(CAL_GREGORIAN, 12, $startdateArr[0]);

        $date1 = new DateTime($startdate);
        $date2 = new DateTime($enddate);

        $this->load->model('kompensasi/m_lembur');

        //getweekdays
        // $numdayswork = $this->get_weekdays($startdate,$enddate);
        $numdayswork = countDaysMonth($startdate,$enddate)->days+1; //dihitung total dengan weekend
        // echo $numdayswork;
        // $numdayswork = 17;

        // echo $startdateArr[0].'-'.$startdateArr[1].'-01';
        $numfulldayswork = $this->get_weekdays($startdateArr[0].'-'.$startdateArr[1].'-01',$enddate);


        $numdays = $date2->diff($date1)->format("%a");
        $maxdaysWork=22;

        $penghasilannet = 0; 

        if($this->input->post('query')!=null)
        {
            //pencarian nama karyawan;
            $wernama = " and a.namalengkap like '%".  strtoupper($this->input->post('query'))."%'";
        } else {
            $wernama = null;
        }


          $sqlpeg = "select a.idpelamar,idptkp,namalengkap,aaa.tglmasuk,aa.tglberakhir,punyanpwp,biayajabatan,a.idcompany,
                    jenispotonganpph,bb.idpergerakan,b.nik,c.companycode,e.kodeorg,f.namajabatan,bb.idpergerakan
                    from pelamar a
                    join calonpelamar b ON a.idpelamar = b.idpelamar
                    join company c ON a.idcompany = c.idcompany
                    JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui' and display is null
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    left join strukturjabatan d ON aa.idstrukturjabatan = d.idstrukturjabatan
                    left join organisasi e ON d.idorganisasi = e.idorganisasi
                    left join jabatan f ON d.idjabatan = f.idjabatan
                    JOIN
                    (
                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui' and display is null
                        GROUP BY idpelamar
                    ) as xx ON a.idpelamar = xx.idpelamar
                    join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan
                    left join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                    where a.idcompany=$idcompany and a.idptkp is not null $wernama 
                    and ('$startdate' >= aaa.tglmasuk OR aaa.tglmasuk >= '$startdate')"
                . " order by b.nik";
       // echo $sqlpeg; exit;
       // exit; and (aaa.tglmasuk between '$startdate' and '$enddate')"
        $qpeg = $this->db->query($sqlpeg);
        
        $data=array();
        $arrJson=array();
        $i=0;

        $data[$i]['durasi'] = $numdayswork;
        $obj->durasi = $numdayswork;
        
        // $this->load->library('../controllers/kehadiran');
        $this->load->model('kompensasi/m_configdasarupahtt');
        foreach ($qpeg->result() as $rpeg) {
            // var_dump($rpeg);
            // exit;
            $obj = new stdClass();
            
            $obj->idpelamar = $rpeg->idpelamar;
            $obj->idpergerakan = $rpeg->idpergerakan;
            $idptkp = $rpeg->idptkp;

            $obj->startdate = $startdate;
            $obj->enddate = $enddate;

            //cek tanggal masuk pegawai > dari tanggal periode awal gaji

            // 2017-01-01<2017-01-15 
            // if($startdate<$rpeg->tglmasuk)
            // {
            //     //belum waktunya
            //     echo $startdate.'<'.$rpeg->tglmasuk.' ';
            //     continue;
            // }

            if (($rpeg->tglmasuk <= $obj->startdate))
            {
              // echo "is between";

            }
            else
            {
                // echo '('.$rpeg->tglmasuk.' > '.$obj->startdate.') && ('.$rpeg->tglmasuk.' < '.$obj->enddate.') ----- ';
                if(($rpeg->tglmasuk>=$obj->startdate) && ($rpeg->tglmasuk<=$obj->enddate))
                {

                } else {
                    continue;   
                }
                           
            }
            // if($)

            // var_dump($obj);
//echo $rpeg->namalengkap.' ';

 // echo $obj->idpelamar.' '; 
            //cek udah digaji apa belum
            $qcek = $this->db->query("select idpelamar from payrolldata
                                        where idpelamar = $obj->idpelamar 
                                        and ((startdate>='$startdate' and startdate<='$enddate') 
                                        OR (enddate>='$startdate' and enddate<='$enddate')) ");
            if($qcek->num_rows()>0)
            {
                // if($obj->idpelamar==166)
                // {
                    // echo $this->db->last_query();
                // }
                continue;
            }
           

            $penghasilanbruto = 0; //Penghasilan Bruto hanya memasukkan komponen yang dikategorikan masuk pajak (total)
            $penghasilanbrutoT = 0; //penghasilan bruto teratur
            $penghasilanbrutoTT = 0; //penghasilan bruto tidak tetap
            
            $data[$i]['idpayroll'] = $idpayroll;
            $data[$i]['idpelamar'] = $rpeg->idpelamar;
            $data[$i]['namalengkap'] = $rpeg->namalengkap;
            $obj->namalengkap = $rpeg->namalengkap;
            $obj->nik = $rpeg->nik;
            $obj->companycode = $rpeg->companycode;

            if($rpeg->idpergerakan==128)
            {
                //kalo terminasi cari jabatan sebelumnya
                $qJabatanSebelumnya = $this->db->query("select max(a.idpekerjaan) as tglberakhir,d.kodeorg,e.namajabatan
                                    from pekerjaan a 
                                    join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil 
                                    join strukturjabatan c ON a.idstrukturjabatan = c.idstrukturjabatan
                                    join organisasi d ON c.idorganisasi = d.idorganisasi
                                    join jabatan e ON c.idjabatan = e.idjabatan
                                    where a.idpelamar = ".$rpeg->idpelamar." and b.idpergerakan!=128 and b.statuspergerakan='Disetujui' 
                                    and a.display is null
                                    group by d.kodeorg,e.namajabatan")->row();

                $obj->kodeorg = $qJabatanSebelumnya->kodeorg;
                $obj->namajabatan = $qJabatanSebelumnya->namajabatan;
            } else {
                $obj->kodeorg = $rpeg->kodeorg;
                $obj->namajabatan = $rpeg->namajabatan;
            }
            

            $data[$i]['startdate'] = $startdate;
            $data[$i]['enddate'] = $enddate;
            $data[$i]['punyanpwp'] = $rpeg->punyanpwp;
            $obj->punyanpwp = $rpeg->punyanpwp==1 ? 'YA' : 'TIDAK';
             // echo $startdate;
            // 
            $absen = $this->rekaphadir($idcompany,null,null,$startdate,$enddate,null,true,$rpeg->idpelamar);
            // $absen = json_decode($absenj);
        // print_r($absen);
        // exit;
            $data[$i]['kehadiran'] = $absen[0]->hadir;
            $obj->kehadiran = $absen[0]->hadir;
            
            $data[$i]['durasi'] = $numdayswork;
            $obj->durasi = $numdayswork;

            if($rpeg->jenispotonganpph==1 || $rpeg->jenispotonganpph==0 || $rpeg->jenispotonganpph==null)
            {
                $data[$i]['hitungpajak'] = 'GROSS';
                $obj->hitungpajak = 'GROSS';
            } else {
                $data[$i]['hitungpajak'] = 'NET';
                $obj->hitungpajak = 'NET';
            }

             //first payroll
            $data[$i]['tglgajipertama'] = $this->m_komponenupah->getFirstPayroll($rpeg->idpelamar,$startdate);
            $obj->tglgajipertama = $data[$i]['tglgajipertama'];
            //end first payroll

            //itung jumlah periode kerja
            $qtglmasuk = $this->db->query("select min(tglmasuk) as tglmasuk from pekerjaan where idpelamar=".$rpeg->idpelamar."  and display is null ORDER BY tglmasuk limit 1")->row();
           
            $data[$i]['masakerja'] = diffInMonths($rpeg->tglmasuk,$startdate);
            $obj->masakerja = $data[$i]['masakerja'];
            $data[$i]['tglmasuk'] = $rpeg->tglmasuk;
            $obj->tglmasuk = $data[$i]['tglmasuk'];
            $tglMasukArr = explode('-', $obj->tglmasuk);
            //end itung jumlah periode kerja

            //ptkp 
            $qptkp = $this->db->get_where('ptkp',array('idptkp'=>$idptkp))->row();
            // echo $this->db->last_query();
            $nilaiptkp = $qptkp->nilaiptkp;
            $data[$i]['nilaiptkp'] = $nilaiptkp;
            $obj->nilaiptkp = $nilaiptkp;
            $data[$i]['kodeptkp'] = $qptkp->kodeptkp;
            $obj->kodeptkp = $qptkp->kodeptkp;


             //query tgl akhir kerja
            $qterminate = $this->db->query("select max(a.tglmasuk) as tglberakhir
                                                from pekerjaan a
                                                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                                                where a.idpelamar = ".$rpeg->idpelamar." and b.idpergerakan=128 and b.statuspergerakan='Disetujui' and a.display is null")->row();


            if($qterminate->tglberakhir!=null)
            { 
               
                 // $rterminate = $qterminate->row();
                 $tglakhirjabatan = $qterminate->tglberakhir;
                 $tglakhirjabatanArr = explode('-', $tglakhirjabatan);


                 //hitung hari proporsional
                    //deteksi apakah periode penggajian dalam bulan yang sama dengan tanggal masuk karyawan
                 $qDetectTglMasuk = $this->db->query("select
                                                            a.tglmasuk
                                                        from
                                                            pekerjaan a
                                                        join pergerakanpersonil b ON a .idpergerakanpersonil = b.idpergerakanpersonil
                                                        where
                                                            a .idpelamar = ".$rpeg->idpelamar."
                                                        and b.idpergerakan <> 128
                                                        and b.statuspergerakan = 'Disetujui' 
                                                        and (a.tglmasuk > '".$startdate."' and a.tglmasuk < '".$enddate."')
                                                         and a.display is null
                                                        order by a.idpekerjaan desc
                                                        limit 1");
                 if($qDetectTglMasuk->num_rows()>0)
                 {
                    $rDetectTglMasuk = $qDetectTglMasuk->row();
                    $date1 = new DateTime($rDetectTglMasuk->tglmasuk);
                 } else {
                    $date1 = new DateTime($startdate);
                 }
                 $now    = new DateTime($enddate);
                 $future = new DateTime($tglakhirjabatan);
                 if($future>$now)
                 {
                    $date2 = new DateTime($enddate);
                 } else {
                    $date2 = new DateTime($tglakhirjabatan);   
                 }

                 // echo $this->db->last_query();                 
                 $proporsionalDays = $date2->diff($date1)->format("%a")+1;
                 //end hitung hari proporsional
            } else {

                 $qterminate = $this->db->query("select max(a.tglberakhir) as tglberakhir
                                                from pekerjaan a
                                                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                                                where a.idpelamar = ".$rpeg->idpelamar." and b.statuspergerakan='Disetujui' and a.display is null");
                if($qterminate->num_rows()>0)
                {
                     $rterminate = $qterminate->row();
                     $tglakhirjabatan = $rterminate->tglberakhir;
                     $tglakhirjabatanArr = explode('-', $tglakhirjabatan);
                     // echo $tglakhirjabatan;
                } else {
                    echo 'tglJabatan end not found';
                    exit;
                }

                  //hitung hari proporsional
                    //deteksi apakah periode penggajian dalam bulan yang sama dengan tanggal masuk karyawan
                 $qDetectTglMasuk = $this->db->query("select
                                                            a.tglmasuk
                                                        from
                                                            pekerjaan a
                                                        join pergerakanpersonil b ON a .idpergerakanpersonil = b.idpergerakanpersonil
                                                        where
                                                            a .idpelamar = ".$rpeg->idpelamar."
                                                        and b.idpergerakan <> 128
                                                        and b.statuspergerakan = 'Disetujui' 
                                                        and (a.tglmasuk > '".$startdate."' and a.tglmasuk < '".$enddate."')
                                                         and a.display is null
                                                        order by a.idpekerjaan desc
                                                        limit 1");
                 if($qDetectTglMasuk->num_rows()>0)
                 {
                    $rDetectTglMasuk = $qDetectTglMasuk->row();
                    $date1 = new DateTime($rDetectTglMasuk->tglmasuk);
                    // echo $rDetectTglMasuk->tglmasuk;
                 } else {
                    $date1 = new DateTime($startdate);
                    // echo $date1;
                 }
                 $date2 = new DateTime($enddate);

                 // echo $this->db->last_query(); 
                 // echo $rDetectTglMasuk->tglmasuk.'-'.$enddate;                
                 $proporsionalDays = $date2->diff($date1)->format("%a")+1;
                 // echo $proporsionalDays;
            }

            $tglakhirjabatanArr = explode('-', $tglakhirjabatan);
            $data[$i]['tglakhirjabatan'] = $tglakhirjabatan;
            $obj->tglakhirjabatan = $tglakhirjabatan;
            // echo $obj->tglakhirjabatan;
          
            //end query tgl akhir kerja

              //hitung durasi kalo dalam bulan yg sama
            // $paymentDate=date('Y-m-d', strtotime($tglakhirjabatan));
            // $contractDateBegin = date('Y-m-d', strtotime($obj->startdate));
            // $contractDateEnd = date('Y-m-d', strtotime($obj->enddate));

            // // echo $paymentDate.' '.$contractDateBegin.'-'.$contractDateEnd;
            // // $terminateInSameMonth = false;
            // if (($paymentDate > $contractDateBegin) && ($paymentDate < $contractDateEnd))
            // {
            //   // echo "is between";
            //     $obj->durasi = countDaysMonth($obj->startdate,$tglakhirjabatan)->days+1;
            //     // $numdayswork = $obj->durasi;
            //     // var_dump($obj->durasi);
            // }
            // else
            // {
            //   // echo "NO GO!";  
            // }

            //cek udah terminate apa belum
            $qterminateYet = $this->db->query("select max(a.tglmasuk) as tglberakhir
                            from pekerjaan a
                            join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                            where a.idpelamar = ".$rpeg->idpelamar." and b.idpergerakan=128 and b.statuspergerakan='Disetujui' and 
                            (a.tglmasuk between '$startdate' and '$enddate')");
            if($qterminateYet->num_rows()>0)
            {
                $RqterminateYet = $qterminateYet->row();
                //udah resign di periode penggajian yang sama, maka tidak munculd alam grid pengupahan
                if($RqterminateYet->tglberakhir!=null)
                {
                    //break;
                    //biarin aja. ini masuk penggajian terakhir
                }
            } 

            //kalo bulan akhir periode penggajian melewati tanggal akhir jabatan gak masuk grid/penghitungan
            $arrDateEnd = explode('-', $enddate);
            $arrDateEndJab = explode('-', $obj->tglakhirjabatan);
            if($arrDateEnd[0]==$arrDateEndJab[0])
            { 
                //tahun yang sama
                if(intval($arrDateEnd[1])>intval($arrDateEndJab[1]))
                {
                    //udah lewat bulan gak masuk grid/penghitungan
                    // echo $rpeg->idpelamar;
                    continue;
                }
               
            }

            if(intval($tglakhirjabatanArr[0])==intval($startdateArr[0]))
            {
                //tahun terminasi sama dengan tahun penggajian
                // 31-07-2015 < 02-03-2015
                if (intval($tglakhirjabatanArr[1])==intval($startdateArr[1])) {  
                    //bulan yang sama
                     $data[$i]['masapajaksetahun'] = intval($tglakhirjabatanArr[1])-intval($tglMasukArr[1])+1;
                     
                     // echo $numdayswork;
                } else {
                    if(intval($startdateArr[1])>1)
                    {
                         // echo $qtglmasuk->tglmasuk;
                        $data[$i]['masapajaksetahun'] = diffInMonths($qtglmasuk->tglmasuk,$tglakhirjabatan)-intval($startdateArr[1]);
                        // echo $qtglmasuk->tglmasuk.','.$tglakhirjabatan.'  -   '.diffInMonths($qtglmasuk->tglmasuk,$tglakhirjabatan);
                        if($data[$i]['masapajaksetahun']>=12)
                        {
                            $data[$i]['masapajaksetahun'] = 12;
                        } 
                    } else {
                        $data[$i]['masapajaksetahun'] = 12;
                    }
                   
                    // 
                }
            } else {
                $data[$i]['masapajaksetahun'] = diffInMonths($qtglmasuk->tglmasuk,$akhirtahun) > 12 ? 12 : diffInMonths($qtglmasuk->tglmasuk,$akhirtahun);
                // $data[$i]['masapajaksetahun'] = diffInMonths($qtglmasuk->tglmasuk,$tglakhirjabatan) > 12 ? 12 : diffInMonths($qtglmasuk->tglmasuk,$akhirtahun);
            }
            // echo $data[$i]['masapajaksetahun'].' ';
            
            
            $obj->masapajaksetahun = $data[$i]['masapajaksetahun'];
            //////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TETAP
            $qUT = $this->db->query("select a.idupahkaryawan,a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
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

                

                if(isset($proporsionalDays))
                {
                    // echo $proporsionalDays.' ';
                    //proprate
                    // $prorata = $rUT->nilai/$numdayswork;
                    // $totalUT+=$prorata*$proporsionalDays;
                    // echo $rUT->nilai.' ';
                    $nilaiUT = round(($rUT->nilai/$numdayswork)*$proporsionalDays,2);
                    // echo $rUT->namakomponen.':'.$nilaiUT.' ';
                    $totalUT+=$nilaiUT;
                    // echo round(($rUT->nilai/$numdayswork)*$proporsionalDays,2).' ';
                    // echo '('.$rUT->nilai.'/'.$numdayswork.'*'.$proporsionalDays.') ';
                    // echo round($rUT->nilai/$numdayswork).'  ';
                } else {
                    $nilaiUT = $rUT->nilai;
                    $totalUT+=$nilaiUT;
                }


                if($rUT->kenapajak=='YA')
                {
                    if($rUT->fungsipajak=='Penambah')
                    {
                        $utPenambahPajak+=$nilaiUT;
                        $penghasilanbruto += $nilaiUT;
                        $penghasilanbrutoT += $nilaiUT;
                    } else if($rUT->fungsipajak=='Pengurang')
                        {
                            //pengurang
                            $utPengurangPajak+=$nilaiUT;
                        } else {
                            //netral
                            // $utPengurangPajak+=$rUT->nilai;
                        }
                    // echo $penghasilanbruto.' += '.$rUT->nilai.'<br>';
                    

                } else {
                    // $penghasilannet += $rUT->nilai;
                }
 
                 //

                // if($commit=='true')
                // {
                //     $dupahhistory = array(
                //             'idpayroll'=>$idpayroll,
                //             'idpelamar'=>$rpeg->idpelamar,
                //             'idupahkaryawan'=>$rUT->idupahkaryawan,
                //             'jenisupah'=>'tetap',
                //             'nilai'=>$rUT->nilai
                //         );
                //     $this->db->insert('upahhistory',$dupahhistory);
                // }
            }
            // echo $proporsionalDays;
            // echo $totalUT;
            $data[$i]['totalUT'] = $totalUT;
            $obj->totalUT = $totalUT;

            ///////////////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TIDAK TETAP BULANAN
            $penghasilanTT = 0; //pengahasilan tidak tetap
            
            $qUTT = $this->db->query("select a.idupahkaryawan,a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
                                        from upahkaryawan a
                                        join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                                        where b.jeniskomponen='Upah Tidak Tetap' and b.jangkawaktu='Bulanan' and a.idpelamar=".$rpeg->idpelamar." and 
                                        a.display is null and (b.startdate >= '$startdate' and b.enddate <= '$enddate') ");
           // echo $this->db->last_query().'<br>';
            $utTPenambahPajak=0;
            $utTPengurangPajak=0;
            $totalUTT=0;

            $nilai=0;
            if($qUTT->num_rows()>0)
            {
                foreach ($qUTT->result() as $rUTT) {
                     // $this->upahtt->tes();
                    // $this->utt();
                    $nilaiV = $this->m_configdasarupahtt->nilaiuut($rUTT->idkomponenupah,$rpeg->idpelamar);

                    $nilai += ($nilaiV/$numdayswork)* $obj->kehadiran;
                    // echo '('.$nilaiV.'/'.$numdayswork.')* '.$obj->kehadiran.':'.$nilai;
                    // exit;
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
                            $utTPenambahPajak+=$nilai;
                            $penghasilanbruto+=$nilai;
                            $penghasilanbrutoTT+=$nilai;
                        } else if($rUTT->fungsipajak=='Pengurang')
                        {
                            $utTPengurangPajak+=$nilai;
                        } else {
                            //netral
                            // $utTPengurangPajak+=$rUTT->nilai;
                        }
                        // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                       
                    } else {
                        // $penghasilannet+=$rUTT->nilai;
                    }

                    $totalUTT+=$nilai;

                    //UPLOAD
                    $qutt_upload = $this->db->query("select masukpajak,nominal,fungsipajak,jenisupah
                            from v_upahtt a  WHERE TRUE AND (startdate >= '$startdate' and enddate <= '$enddate') 
                            and idpelamar =".$rpeg->idpelamar."");
                    // echo $this->db->last_query().'    ';
                    if($qutt_upload->num_rows()>0)
                    {
                        foreach ($qutt_upload->result() as $rUTT_upload) {
                                $nilaiV = $rUTT_upload->nominal;
                                // $nilai += ($nilaiV/$numdayswork)* $obj->kehadiran;
                                $nilai = $nilaiV;
                                // $data[$i]['upahtidaktetap']['item'][] = array(
                                //                                     // 'namakomponen'=>$rUTT->namakomponen,
                                //                                     'nilai'=>$nilai,
                                //                                     'kenapajak'=>$rUTT->kenapajak,
                                //                                     'fungsipajak'=>$rUTT->fungsipajak
                                //                                 );

                                if($rUTT_upload->masukpajak=='YA')
                                {
                                    if($rUTT_upload->fungsipajak=='Penambah')
                                    {
                                        $utTPenambahPajak+=$nilai;
                                        $penghasilanbruto+=$nilai;
                                        $penghasilanbrutoTT+$nilai;
                                    } else if($rUTT_upload->fungsipajak=='Pengurang')
                                    {
                                        $utTPengurangPajak+=$nilai;
                                    } else {
                                        //netral
                                        // $utTPengurangPajak+=$rUTT->nilai;
                                    }
                                    // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                                   
                                } else {
                                    // $penghasilannet+=$rUTT->nilai;
                                }

                                $totalUTT+=$nilai;
                            }


                    }

                    // if($commit=='true')
                    // {
                    //     $dupahhistory = array(
                    //             'idpayroll'=>$idpayroll,
                    //             'idpelamar'=>$rpeg->idpelamar,
                    //             'jenisupah'=>'tidaktetap',
                    //             'idupahkaryawan'=>$rUT->idupahkaryawan,
                    //             'nilai'=>$nilai
                    //         );

                    //     $wer = array('idpayroll'=>$idpayroll, 'idupahkaryawan'=>$rUT->idupahkaryawan, 'idpelamar'=>$rpeg->idpelamar);
                    //     $cek = $this->db->get_where('upahhistory',$wer);
                    //     if($cek->num_rows()>0)
                    //     {
                    //         $this->db->where($wer);
                    //         $this->db->update('upahhistory',$dupahhistory);
                    //     } else {
                    //          $this->db->insert('upahhistory',$dupahhistory);     
                    //     }
                       
                    // }
                }


            } else {
                // echo 'upload '.$rpeg->idpelamar.' ';
                 //UPLOAD
                $qutt_upload = $this->db->query("select masukpajak,nominal,fungsipajak,jenisupah
                            from v_upahtt a  WHERE TRUE AND (startdate >= '$startdate' and enddate <= '$enddate') and idpelamar =".$rpeg->idpelamar."");
                // echo $this->db->last_query();

                if($qutt_upload->num_rows()>0)
                {
                    foreach ($qutt_upload->result() as $rUTT_upload) {
                            $nilaiV = $rUTT_upload->nominal;

                            // $nilai += ($nilaiV/$numdayswork)* $obj->kehadiran;
                            $nilai = $nilaiV;
// echo $nilai;
                            // $data[$i]['upahtidaktetap']['item'][] = array(
                            //                                     // 'namakomponen'=>$rUTT->namakomponen,
                            //                                     'nilai'=>$nilai,
                            //                                     'kenapajak'=>$rUTT->kenapajak,
                            //                                     'fungsipajak'=>$rUTT->fungsipajak
                            //                                 );

                            if($rUTT_upload->masukpajak=='YA')
                            {
                                if($rUTT_upload->fungsipajak=='Penambah')
                                {
                                    $utTPenambahPajak+=$nilai;
                                    $penghasilanbruto+=$nilai;
                                    $penghasilanbrutoTT+=$nilai;
                                } else if($rUTT_upload->fungsipajak=='Pengurang')
                                {
                                    $utTPengurangPajak+=$nilai;
                                } else {
                                    //netral
                                    // $utTPengurangPajak+=$rUTT->nilai;
                                }
                                // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                               
                            } else {
                                // $penghasilannet+=$rUTT->nilai;
                            }

                            $totalUTT+=$nilai;

// echo $nilai.' ';
                            // if($commit=='true')
                            // {
                            //     $dupahhistory = array(
                            //             'idpayroll'=>$idpayroll,
                            //             'idpelamar'=>$rpeg->idpelamar,
                            //             'jenisupah'=>'tidaktetap',
                            //             'idupahkaryawan'=>$rUT->idupahkaryawan,
                            //             'nilai'=>$nilai
                            //         );
                            //     // $this->db->insert('upahhistory',$dupahhistory);
                            // }
                        }
                } else {
                     $totalUTT = 0;
                }
            }
            // echo $totalUTT;
            $data[$i]['totalUTT'] = $totalUTT;
            $obj->totalUTT = $data[$i]['totalUTT'];
            $penghasilanTT+= $obj->totalUTT;


             ///////////////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TIDAK TETAP TAHUNAN
            $qUTTTahun = $this->db->query("select a.idupahkaryawan,a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
                                        from upahkaryawan a
                                        join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                                        join (select idkomponenupah from jadwalupah 
                                        where display is null and tanggal='".intval($startdateArr[2])."' and nobulan='".$startdateArr[1]."') c ON b.idkomponenupah = c.idkomponenupah
                                        where b.jeniskomponen='Upah Tidak Tetap' and b.jangkawaktu='Tahunan' and a.idpelamar=".$rpeg->idpelamar." and 
                                        a.display is null and (now() BETWEEN b.startdate and b.enddate)");
           // echo $this->db->last_query().'<br>';
//            exit;
            $utTTahunPenambahPajak=0;
            $utTTahunPengurangPajak=0;
            $totalUTTTahun=0;
            $nilai=0;
            if($qUTTTahun->num_rows()>0)
            {
                foreach ($qUTTTahun->result() as $rUTTTahun) {
                     // $this->upahtt->tes();
                    // $this->utt();
                    $nilaiV = $this->m_configdasarupahtt->nilaiuut($rUTTTahun->idkomponenupah,$rpeg->idpelamar);
                    // echo $nilaiV;
                    $nilai += $nilaiV;
                    // echo '('.$nilaiV.'/'.$numdayswork.')* '.$obj->kehadiran.':'.$nilai;
                    // exit;
                    $data[$i]['upahtidaktetap']['item'][] = array(
                                                        'namakomponen'=>$rUTTTahun->namakomponen,
                                                        'nilai'=>$nilai,
                                                        'kenapajak'=>$rUTTTahun->kenapajak,
                                                        'fungsipajak'=>$rUTTTahun->fungsipajak
                                                    );

                    if($rUTTTahun->kenapajak=='YA')
                    {
                        if($bulanGaji!='12')
                        {
                            if($rUTTTahun->fungsipajak=='Penambah')
                            {
                                $utTTahunPenambahPajak+=$nilai;
                                // $penghasilanbruto+=$nilai;
                                $penghasilanbrutoTT+=$nilai;
                            } else if($rUTTTahun->fungsipajak=='Pengurang')
                            {
                                $utTTahunPengurangPajak+=$nilai;
                            } else {
                                //netral
                                // $utTPengurangPajak+=$rUTT->nilai;
                            }
                            // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                        }
                       
                    } else {
                        // $penghasilannet+=$rUTT->nilai;
                    }

                    $totalUTTTahun+=$nilai;

                    // if($commit=='true')
                    // {
                    //     $dupahhistory = array(
                    //             'idpayroll'=>$idpayroll,
                    //             'idpelamar'=>$rpeg->idpelamar,
                    //             'jenisupah'=>'tidaktetap',
                    //             'idupahkaryawan'=>$rUTTTahun->idupahkaryawan,
                    //             'nilai'=>$nilai
                    //         );
                    //     $this->db->insert('upahhistory',$dupahhistory);
                    // }
                }
            } else {
                $totalUTTTahun = 0;
            }
            // echo $penghasilanTT;
            $data[$i]['totalUTTTahun'] = $totalUTTTahun;
            // $obj->totalUTT += $data[$i]['totalUTTTahun'];
            // echo $obj->totalUTT;
            // $penghasilanTT+=$obj->totalUTT;
            $penghasilanTT+=$data[$i]['totalUTTTahun'];
            $obj->totalUTT = $penghasilanTT;
            $obj->totalUTTTahun = $totalUTTTahun;
            // echo $penghasilanTT;

            ///////////////////////////////////////////////////////////////////////////////////////////////


            ///////////////////////////////////////////////////////////////////////////////////////////////
            //LEMBUR
            $d = $this->m_lembur->data($startdate,$enddate,$rpeg->idpelamar,$commit);
            // print_r($d);
            $datalembur = $d;
            if($d['num']!=0)
            {
                // print_r($d);
                $data[$i]['lembur']['jumlahjam'] = isset($d['data'][0]['jumlahjam']) ? $d['data'][0]['jumlahjam'] : 0;
                $data[$i]['lembur']['jumlahhari'] = isset($d['data'][0]['jumlahhari']) ? $d['data'][0]['jumlahhari'] : 0;          
                $data[$i]['lembur']['upahlemburPajak'] = isset($d['data'][0]['upahlemburPajak']) ? $d['data'][0]['upahlemburPajak'] : 0;
                $data[$i]['lembur']['upahlemburNoPajak'] = isset($d['data'][0]['upahlemburNoPajak']) ? $d['data'][0]['upahlemburNoPajak'] : 0;
                $data[$i]['lembur']['harikerja'] = isset($d['data'][0]['harikerja']) ? $d['data'][0]['harikerja'] : 0;
                $data[$i]['lembur']['harilibur'] = isset($d['data'][0]['harilibur']) ? $d['data'][0]['harilibur'] : 0;
                $data[$i]['lembur']['hariraya'] = isset($d['data'][0]['hariraya']) ? $d['data'][0]['hariraya'] : 0;

                $data[$i]['upahlemburPajak'] = isset($d['data'][0]['upahlemburPajak']) ? $d['data'][0]['upahlemburPajak'] : 0;
                $data[$i]['upahlemburNoPajak'] = isset($d['data'][0]['upahlemburNoPajak']) ? $d['data'][0]['upahlemburNoPajak'] : 0;
                $data[$i]['upahlemburTambahPajak'] = isset($d['data'][0]['upahlemburTambahPajak']) ? $d['data'][0]['upahlemburTambahPajak'] : 0;
                $data[$i]['upahlemburKurangPajak'] = isset($d['data'][0]['upahlemburKurangPajak']) ? $d['data'][0]['upahlemburKurangPajak'] : 0;
                // echo $penghasilanbruto.' += '.$data[$i]['lembur']['upahlemburPajak'].'<br>';
                $penghasilanbruto+= $data[$i]['upahlemburTambahPajak'];
                // $penghasilannet+= $data[$i]['lembur']['upahlemburNoPajak'];

            } else {
                $data[$i]['upahlemburPajak'] = 0;
                $data[$i]['upahlemburNoPajak'] = 0;
                $data[$i]['upahlemburTambahPajak'] = 0;
                $data[$i]['upahlemburKurangPajak'] = 0;
            }



            $obj->upahlemburPajak = $data[$i]['upahlemburPajak'];
            $obj->upahlemburNoPajak = $data[$i]['upahlemburNoPajak'];
            $obj->totallembur =  $obj->upahlemburPajak+$obj->upahlemburNoPajak;
            $data[$i]['totallembur'] = $obj->totallembur;
            $penghasilanTT+=$obj->totallembur;
            

                   
            // $penerimaan = $totalUT+$totalUTT+$upahLembur;


            ///////////////////////////////////////////////////////////////////////////////////////////////
            //BENEFIT
            $benefitCmpBruto = 0;
            $benefitCmpNet = 0;
            $benefitEmpBruto = 0;
            $benefitEmpNet = 0;
            $benefitCmp = 0;
            $benefitEmp = 0;
            $benefitPengurangPajak = 0;
            $qbk = $this->db->get_where('benefitkaryawan',array('idpelamar'=>$rpeg->idpelamar));

            foreach ($qbk->result() as $rb) {
                $qbenefit = $this->db->get_where('komponenbenefit',array('idbenefit'=>$rb->idbenefit,'display'=>null));
                // echo $this->db->last_query();
                if($qbenefit->num_rows()>0)
                {
                    $rbenefit = $qbenefit->row();
                    // echo $rbenefit->namabenefit.'<br>';

                    if($rbenefit->ditanggungperusahaan=='t')
                    {
                        if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                        {
                            $k = explode(',', $rbenefit->komponenupahbenefitcmp);

                            $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);

                            $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitcmp;
                            $nilaiBenefit = $this->max_plafon_benefit($rb->idbenefit,$nilaiBenefit,'company');

                            if($rbenefit->kenapajakcmp=='YA')
                            {                                 
                                if($rbenefit->fungsipajakcmp=='Penambah')
                                {
                                    // $benefitCmpBruto += $nilaiBenefit;  
                                    $penghasilanbruto+= $nilaiBenefit;     
                                    $penghasilanbrutoT+= $nilaiBenefit;
                                } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                    {
                                        $benefitPengurangPajak += $nilaiBenefit;  
                                    } else {
                                            //netral
                                        }
                                        // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                 
                                                            
                            } else {
                               // $benefitCmpNet += $nilaiBenefit;   
                            }

                            $benefitCmp+=$nilaiBenefit;
                        } //if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                          else if($rbenefit->jenisnilaibenefitcmp=='Nilai Tetap')
                            {
                                $nilaiBenefit = $rbenefit->angkatetapbenefitcmp;
                                $nilaiBenefit = $this->max_plafon_benefit($rb->idbenefit,$nilaiBenefit,'company');

                                if($rbenefit->kenapajakcmp=='YA')
                                {
                                    // $benefitCmpBruto += $nilaiBenefit;
                                    // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';
                                    // $penghasilanbruto+= $nilaiBenefit;

                                    if($rbenefit->fungsipajakcmp=='Penambah')
                                    {
                                        // $benefitCmpBruto += $nilaiBenefit;  
                                        $penghasilanbruto+= $nilaiBenefit;    
                                        $penghasilanbrutoT+= $nilaiBenefit; 
                                    } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                        {
                                            $benefitPengurangPajak += $nilaiBenefit;  
                                        } else {
                                                //netral
                                            }                                
                                }

                                $benefitCmp+=$nilaiBenefit;
                            } else if($rbenefit->jenisnilaibenefitcmp=='Persentase')
                                {
                                        // $k = explode(',', $rbenefit->komponenupahbenefitcmp);

                                        $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitcmp;
                                        // exit;
                                        $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitcmp/100);
                                        $nilaiBenefit = $this->max_plafon_benefit($rb->idbenefit,$nilaiBenefit,'company');

                                        if($rbenefit->kenapajakcmp=='YA')
                                        {
                                            if($rbenefit->fungsipajakcmp=='Penambah')
                                            {
                                                // $benefitCmpBruto += $nilaiBenefit;  
                                                $penghasilanbruto+= $nilaiBenefit;    
                                                $penghasilanbrutoT+= $nilaiBenefit; 
                                            } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                                {
                                                    $benefitPengurangPajak += $nilaiBenefit;  
                                                } else {
                                                        //netral
                                                    }                                   
                                        }


                                        $benefitCmp+=$nilaiBenefit;
                                }
                                
                               

                        // if($commit=='true')
                        // {
                        //     $dbenefithistory = array(
                        //             'idpayroll'=>$idpayroll,
                        //             'idpelamar'=>$rpeg->idpelamar,
                        //             'idbenefit'=>$rb->idbenefit,
                        //             'ditanggung'=>'perusahaan',
                        //             'nilaibenefit'=>$nilaiBenefit
                        //         );
                        //     $this->db->insert('benefithistory',$dbenefithistory);
                        // }

  // print_r($dbenefithistory);
                                 // echo $nilaiBenefit.'<br>';
                    } // end if($rbenefit->ditanggungperusahaan=='t')




                    if($rbenefit->ditanggungkaryawan=='t')
                    {
                        if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
                        {
                            $k = explode(',', $rbenefit->komponenupahbenefitemp);

                            $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);

                            $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitemp;

                            $nilaiBenefit = $this->max_plafon_benefit($rb->idbenefit,$nilaiBenefit,'employee');

                            if($rbenefit->kenapajakemp=='YA')
                            {
                                 if($rbenefit->fungsipajakcmp=='Penambah')
                                    {
                                        $penghasilanbruto+= $nilaiBenefit;    
                                        $penghasilanbrutoT+= $nilaiBenefit; 
                                    } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                        {
                                            $benefitPengurangPajak += $nilaiBenefit;  
                                        } else {
                                                //netral
                                            }                                                           
                            }

                            $benefitEmp += $nilaiBenefit;

                        } //if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
                          else if($rbenefit->jenisnilaibenefitemp=='Nilai Tetap')
                            {
                                $nilaiBenefit = $rbenefit->angkatetapbenefitemp;

                                $nilaiBenefit = $this->max_plafon_benefit($rb->idbenefit,$nilaiBenefit,'employee');

                                if($rbenefit->kenapajakemp=='YA')
                                {
                                   // $benefitEmpBruto += $nilaiBenefit; 
                                   // $penghasilanbruto+=$benefitEmpBruto;

                                   if($rbenefit->fungsipajakcmp=='Penambah')
                                    {
                                        $penghasilanbruto+= $nilaiBenefit;     
                                        $penghasilanbrutoT+= $nilaiBenefit;
                                    } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                        {
                                            $benefitPengurangPajak += $nilaiBenefit;  
                                        } else {
                                                //netral
                                            }      
                                }

                                $benefitEmp += $nilaiBenefit;
                            } else if($rbenefit->jenisnilaibenefitemp=='Persentase')
                                {
                                    // var_dump($rbenefit);
                                        // $k = explode(',', $rbenefit->komponenupahbenefitemp);

                                        $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitemp;
                                        $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitemp/100);
                                         // echo $nilaibenefit;
                                        $nilaiBenefit = $this->max_plafon_benefit($rb->idbenefit,$nilaiBenefit,'employee');

                                        if($rbenefit->kenapajakemp=='YA')
                                        {
                                            // $benefitEmpBruto += $nilaiBenefit;
                                            // echo $penghasilanbruto.' += '.$nilaiBenefit.' '.$rbenefit->fungsipajakemp.' <br>'; 
                                            // $penghasilanbruto+=$benefitEmpBruto;

                                            if($rbenefit->fungsipajakemp=='Penambah')
                                            {
                                                $penghasilanbruto+= $nilaiBenefit;     
                                                $penghasilanbrutoT+= $nilaiBenefit;
                                            } else if($rbenefit->fungsipajakemp=='Pengurang')
                                                {
                                                    $benefitPengurangPajak += $nilaiBenefit;  
                                                    // echo $benefitPengurangPajak.' ';
                                                } else {
                                                        //netral
                                                    }      
                                        }

                                        $benefitEmp += $nilaiBenefit;
                                        
//                                         echo $totalKomponen.' ';
//                                        if($rpeg->idpelamar==187)
//                                        {
//                                            exit;
//                                        }
                                }

                        // if($commit=='true')
                        // {
                        //     $dbenefithistory = array(
                        //             'idpayroll'=>$idpayroll,
                        //             'idpelamar'=>$rpeg->idpelamar,
                        //             'idbenefit'=>$rb->idbenefit,
                        //             'ditanggung'=>'karyawan',
                        //             'nilaibenefit'=>$nilaiBenefit
                        //         );
                        //     $this->db->insert('benefithistory',$dbenefithistory);
                        // }
                        
                         
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
            $data[$i]['benefitCmp'] = $benefitCmp;
            $data[$i]['benefitEmp'] = $benefitEmp;
            $obj->benefitCmp = $benefitCmp;
            $obj->benefitEmp = $benefitEmp;

            // echo $obj->benefitEmp.' '.$obj->benefitCmp.' ';
            
           


            ////////////////////PENGURANG UPAH///////////////////////////        
            $qPotongan = $this->db->query("select a.idpelamar,a.idpengurangupah,b.namapengurangupah,b.kenapajak,b.fungsipajak,b.hitungpajak,b.komponenpengurang,b.jenisnilaipengurang,b.faktorpembagipengurangupah,b.angkatetappengurangupah,b.persenpengurangupah
                                            from pengurangupahkaryawan a
                                            join pengurangupah b ON a.idpengurangupah = b.idpengurangupah
                                            where (now() BETWEEN b.startdate and b.enddate) and a.idpelamar=".$rpeg->idpelamar."");
            // echo $this->db->last_query();

            $potonganBruto = 0;
            $potonganNet = 0;
            $nilaiPotongan = 0;
            foreach ($qPotongan->result() as $rPotongan) {
                $nilaipot = 0;
                if($rPotongan->jenisnilaipengurang=='Komponen Upah')
                        {
                            // $k = explode(',', $rPotongan->komponenupahbenefitcmp);

                            $totalKomponen = $this->countKomponenValue($rPotongan->komponenpengurang,$rpeg->idpelamar);

                            $nilaiPotongan+= $totalKomponen/$rPotongan->faktorpembagipengurangupah;
                            $nilaipot = $nilaiPotongan;
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
                                $nilaiPotongan+= $rPotongan->angkatetappengurangupah;
                                $nilaipot = $nilaiPotongan;
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
                                        $nilaiPotongan+= $totalKomponen*($rPotongan->persenpengurangupah/100);
                                        $nilaipot = $nilaiPotongan;
                                        // if($rPotongan->kenapajak=='YA')
                                        // {
                                        //     $potonganBruto += $nilaiPotongan;      
                                        //     // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                      
                                        //     $penghasilanbruto+= $nilaiPotongan;                                       
                                        // } else {
                                        //     $potonganNet += $nilaiBenefit;    
                                        // }
                                }

                // if($commit=='true')
                // {
                //     $dpengurangupahhistory = array(
                //             'idpayroll'=>$idpayroll,
                //             'idpelamar'=>$rpeg->idpelamar,
                //             'idpengurangupah'=>$rPotongan->idpengurangupah,
                //             'nilai'=>$nilaipot
                //         );
                //     $this->db->insert('pengurangupahhistory',$dpengurangupahhistory);
                // }               
            }
            $obj->nilaiPotongan = $nilaiPotongan;
            $data[$i]['nilaiPotongan'] = $nilaiPotongan; 
            // echo $nilaiPotongan;
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
            
            // $totalpendapatan =  $data[$i]['totalUT']+$data[$i]['totalUTT']+$obj->totallembur+$obj->benefitCmp;
            // $data[$i]['totalpendapatan'] = $totalpendapatan;
            // $obj->totalpendapatan = $totalpendapatan;
           // echo $penghasilanbruto;

            $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

            // $data[$i]['penerimaanbruto'] = number_format($penghasilanbrutoFinal);
            // echo $penghasilanbruto+ 327658.33;
            $tunjanganpajakTMP = null;
            if($data[$i]['hitungpajak'] == 'NET')
            {
                
                $tunjanganpajak = $this->tunjanganpajak($rpeg->idpelamar,$startdate,$enddate,$data[$i]['tglgajipertama'],$data[$i]['hitungpajak'],$data[$i]['punyanpwp'],$rpeg->tglmasuk,$nilaiptkp,ceil($benefitCmp),ceil($benefitEmp),ceil($penghasilanbruto),ceil($totalUT),ceil($totalUTT),ceil($rpeg->biayajabatan),ceil($obj->totallembur),$data[$i]['masapajaksetahun'],ceil($utPengurangPajak),ceil($utTPengurangPajak),ceil($data[$i]['upahlemburKurangPajak']),ceil($benefitPengurangPajak));
                // print_r($tunjanganpajak);
                // exit;
                $tunjanganpajakTMP = $tunjanganpajak;
                // print_r($tunjanganpajak);
                if($data[$i]['masapajaksetahun']<12 && diffInMonths($qtglmasuk->tglmasuk,$obj->tglakhirjabatan)<12)
                {
                    //karyawan sudah terminate dalam tahun yang sama
// echo $data[$i]['masapajaksetahun']." ".diffInMonths($qtglmasuk->tglmasuk,$obj->tglakhirjabatan);
                    // $tunjanganpajak = explode('.', $tunjanganpajak['tunjanganpajaknew']);
                    $tunjanganpajak = $this->tunjanganPajakKurangSetahun($tunjanganpajak,$penghasilanbruto,$rpeg,$benefitEmp,$obj,$utPengurangPajak,$utTPengurangPajak,$data[$i]['upahlemburKurangPajak'],$benefitPengurangPajak,$data[$i]['totalUT'],$data[$i]['totalUTT'],$data[$i]['masapajaksetahun'],$nilaiptkp,$data[$i]['punyanpwp'],$startdateArr,$enddateArr);
                    $data[$i]['penerimaanbruto'] = $penghasilanbruto+$tunjanganpajak;
                    $data[$i]['tunjanganpajak'] = $tunjanganpajak;

                    //  $tunjanganpajak = explode('.', $tunjanganpajak['tunjanganpajaknew']);
                    // $data[$i]['penerimaanbruto'] = $penghasilanbruto+$tunjanganpajak[0];
                    // $data[$i]['tunjanganpajak'] = $tunjanganpajak[0];
                } else {

                    $tunjanganpajak = explode('.', $tunjanganpajak['pphsebulan']);
                    // echo $penghasilanbruto;
                    // exit;
                    $data[$i]['penerimaanbruto'] = ceil($penghasilanbruto+$tunjanganpajak[0]);
                    $data[$i]['tunjanganpajak'] = ceil($tunjanganpajak[0]);
                }
                
                // echo '<pre>';
                // print_r($this->tunjanganpajak($rpeg->idpelamar,$startdate,$enddate));
                // echo '</pre>';
                // exit;
            } else {
                // echo $penghasilanbruto;
                $data[$i]['penerimaanbruto'] = $penghasilanbruto;
                $data[$i]['tunjanganpajak'] = 0;
            }

            $obj->penghasilanbrutoT = $penghasilanbrutoT;
            $obj->penghasilanbrutoTT = $penghasilanbrutoTT;
            $obj->penerimaanbruto =  $data[$i]['penerimaanbruto'];
            // echo $obj->penerimaanbruto.' + '.$data[$i]['totalUTTTahun'];
            $obj->penerimaanbruto_total = $obj->penerimaanbruto + $data[$i]['totalUTTTahun'];
            $data[$i]['penerimaanbruto_total'] = $obj->penerimaanbruto_total;

// echo $utPengurangPajak.','.$utTPengurangPajak;
            $tot_pengurang_pajak = ceil($utPengurangPajak)+ceil($utTPengurangPajak)+ceil($data[$i]['upahlemburKurangPajak'])+ceil($benefitPengurangPajak);
            // echo ceil($utPengurangPajak).','.ceil($utTPengurangPajak).','.ceil($data[$i]['upahlemburKurangPajak']).','.ceil($benefitPengurangPajak);

              //akumulasi
            $obj->akum_bruto = $this->akum_bruto($obj->idpelamar,$obj->penerimaanbruto);

            $obj->akum_utt = $this->akum_uttm($obj->idpelamar,$obj->totalUTTTahun,$startdateArr[0].'-01-01',$startdateArr[0].'-'.$startdateArr[1].'-01',$rpeg->idcompany,$startdateArr[1]);
if($obj->idpelamar==257)
{
// echo $obj->akum_utt;
}
            $obj->akum_tunjpajak = $this->akum_tunjpajak($obj->idpelamar,$data[$i]['tunjanganpajak']);
            $obj->akum_benefit_kary = $this->akum_benefit_kary($obj->idpelamar,$tot_pengurang_pajak);
            // echo $obj->akum_benefit_kary;
            // print_r($tglakhirjabatanArr);
            // print_r($startdateArr);
            // echo intval($tglakhirjabatanArr[1]).'-'.intval($startdateArr[1]);

            if(intval($tglakhirjabatanArr[0])>$startdateArr[0])
            {
                $selisih_sisa_bulan_pajak =  12-intval($startdateArr[1]);    
            } else {
                $selisih_sisa_bulan_pajak =   intval($tglakhirjabatanArr[1])-intval($startdateArr[1]);
            }
            
            // $selisih_sisa_bulan_pajak = 0;
            // $obj->bruto_th = (($obj->penerimaanbruto-$data[$i]['tunjanganpajak'])   * ($obj->masapajaksetahun-intval($startdateArr[1]))) +  $obj->akum_bruto + $obj->akum_utt + ( $data[$i]['tunjanganpajak'] * ($obj->masapajaksetahun-intval($startdateArr[1])) + $obj->akum_tunjpajak);
            // echo $selisih_sisa_bulan_pajak;
             $obj->bruto_th = (($obj->penerimaanbruto-$data[$i]['tunjanganpajak'])   * $selisih_sisa_bulan_pajak) +  $obj->akum_bruto + $obj->akum_utt + ( $data[$i]['tunjanganpajak'] * ($selisih_sisa_bulan_pajak) + $obj->akum_tunjpajak);
            // echo  '(('.$obj->penerimaanbruto.'-'.$data[$i]['tunjanganpajak'].')   * ('.$obj->masapajaksetahun.'-'.intval($startdateArr[1]).')) +  '.$obj->akum_bruto.' + '.$obj->akum_utt.' + ( '.$data[$i]['tunjanganpajak'].' * ('.$obj->masapajaksetahun.'-'.intval($startdateArr[1]).') + '.$obj->akum_tunjpajak.')';
          // echo intval($startdateArr[1]);
            //end akumulasi

            // =IFERROR(IF((BV4*5%)/S4>500000,500000*S4,BV4*5%),0)
            //BIJAB/BIPEN
            $bv = ($obj->bruto_th*(5/100)) > 0 ? ($obj->bruto_th*(5/100))/$obj->masapajaksetahun : 0;
            // echo '('.$obj->bruto_th.'*(5/100)) ---- '.'('.$obj->bruto_th.'*(5/100))/'.$obj->masapajaksetahun;
            if($bv>500000)
            {
                $obj->bijab = 500000*$obj->masapajaksetahun;
            } else {
                $obj->bijab = $obj->bruto_th*(5/100);
            }
            // echo $bijab;
            //end BIJAB/BIPEN

            //UPAH PENGURANG PAJAK
            // =(AX4*(J4-Q4))+BT4
            // $obj->upj = ($tot_pengurang_pajak*($obj->masapajaksetahun-intval($startdateArr[1])))+$obj->akum_benefit_kary;
            $obj->upj = ($tot_pengurang_pajak*($selisih_sisa_bulan_pajak))+$obj->akum_benefit_kary;
            
            // echo $obj->upj;
            //end UPAH PENGURANG PAJAK

            //PH KENA PAJAK
            // =IF(ROUND(BV4-BW4-BX4-BY4,-3)<0,0,ROUND(BV4-BW4-BX4-BY4,-3))
            $ph_kena_pajak = round($obj->bruto_th-$obj->bijab-$obj->upj-$obj->nilaiptkp,-3);
            // echo $obj->bruto_th.' - '.$obj->bijab.' - '.$tot_pengurang_pajak.'-'.$obj->nilaiptkp;
            $obj->ph_kena_pajak = $ph_kena_pajak < 0 ? 0 : $ph_kena_pajak;
            //EN PH KENA PAJAK

            //pph21 cell CA:CF)
            $obj->pph_setahun2 = $this->pph_setahun($obj->ph_kena_pajak,$data[$i]['punyanpwp']);
            // echo $obj->pph_setahun2;
            //end //pph21 cell CA:CF)

            $obj->tunjanganpajak = $data[$i]['tunjanganpajak'];

            // $biayajabatan = ceil($data[$i]['penerimaanbruto']*0.05);
            $obj->biayajabatanT = $data[$i]['penerimaanbruto']*0.05;
            // echo $data[$i]['penerimaanbruto'].' : '.$penghasilanbrutoT;
                // =IF(
            //     500000<=AU4,
            //     0,
            //     IF(
            //             AS4*0.05+AU4>500000,
            //             (500000)-AU4,
            //             AS4*0.05
            //         )
            // )

            // echo $obj->biayajabatanT.'  -   ';
            //start biaya jabatan tidak teratur/ utt tahunan
            $obj->biayajabatanTT = 0;
            if(500000<=$obj->biayajabatanT)
            {
                $obj->biayajabatanTT = 0;
            } else if((($obj->totalUTTTahun*0.05)+$obj->biayajabatanT) > 500000)
                {
                    $obj->biayajabatanTT = 500000-$obj->biayajabatanT;
                    // echo '500000 -'.$obj->biayajabatanT;
                } else {
                        $obj->biayajabatanTT = $obj->totalUTTTahun*0.05;
                }   
            // $obj->biayajabatanTT = $obj->biayajabatanTT>500000 ? 500000 : $obj->biayajabatanTT;
            // $obj->biayajabatanTT = $penghasilanbrutoTT*0.05; //biaya jabatan tidak teratur,tidak teteap tahunan

            $biayajabatan = ($data[$i]['penerimaanbruto']*0.05)+$obj->biayajabatanTT;

            // echo $biayajabatan;
            $data[$i]['numdayswork'] = $numdayswork;
            // echo 'biayajabatan'.$rpeg->biayajabatan;
            if($rpeg->biayajabatan==1 || $rpeg->biayajabatan==null || $rpeg->biayajabatan==0)
            {
                if($bulanGaji!='12')
                {
                    $data[$i]['biayajabatan'] = $biayajabatan<=500000 ? $biayajabatan : 500000;
                } else {
                    $data[$i]['biayajabatan'] = 0;
                }
            } else {
                $data[$i]['biayajabatan'] = 0;
            }
            $obj->biayajabatan = $data[$i]['biayajabatan'];

            $obj->biayajabatanT = $obj->biayajabatanT>500000 ? 500000 : $obj->biayajabatanT; //biaya jabatan teratur ga boleh lebih dari 500rb
                        // echo 'biayajabatan:'+$obj->biayajabatan;
                        // exit;
                        $totalPengurangPajak = ($utPengurangPajak+$utTPengurangPajak+$data[$i]['upahlemburKurangPajak']+$benefitPengurangPajak);

                        // echo $penghasilanbrutoT.'-'.$obj->biayajabatanT.'-'.$totalPengurangPajak;
                        // echo $obj->penerimaanbruto_total.'-'.$obj->biayajabatanT.'-'.$totalPengurangPajak;
                        $obj->penerimaannet_sebulan = $obj->penerimaanbruto_total-$obj->biayajabatan-$totalPengurangPajak; //neto sebulan
                        // echo $obj->penerimaannet_sebulan;
                        // echo $obj->penerimaanbruto.'-'.$obj->biayajabatanT.'-'.$totalPengurangPajak;
                        $obj->penerimaannetT = $obj->penerimaanbruto-$obj->biayajabatanT-$totalPengurangPajak; //neto sebulan teratur
                        // echo $obj->penerimaannetT.' - ';
                        $obj->penerimaannetTT = $totalUTTTahun-$obj->biayajabatanTT; //neto sebulan tidak teratur
                        // echo $obj->penerimaannetTT;
                        // $obj->penerimaannetTT = $obj->biayajabatanTT; //tanpa penghasilan bulanan tidak teratur

                        // $obj->penghasilannetTT = 
                        $penghasilannet = $data[$i]['penerimaanbruto']-($data[$i]['biayajabatan'])-$totalPengurangPajak;
                         // $penghasilannet = $pengha-($data[$i]['biayajabatan'])-($utPengurangPajak+$utTPengurangPajak+$data[$i]['upahlemburKurangPajak']+$benefitPengurangPajak);
                        // echo $penghasilannet;

                        // echo $obj->totalUTT;                        
                        $totalpendapatan =  $data[$i]['totalUT']+$obj->totalUTT+$obj->totallembur+$obj->benefitCmp+ $data[$i]['tunjanganpajak'];
                        // echo $data[$i]['totalUT'].'+'.$data[$i]['totalUTT'].'+'.$obj->totallembur.'+'.$obj->benefitCmp.'+'.$data[$i]['tunjanganpajak'].' - '.number_format($totalpendapatan);
                        // exit;
                        // echo $data[$i]['tunjanganpajak'].'=';

                        // echo '(totalpendapatan:'.$data[$i]['totalUT'].'+'.$data[$i]['totalUTT'].'+'.$data[$i]['upahlemburNoPajak'].'+'.$benefitCmpBruto.'+'.$benefitCmpNet.'+'.$tunjanganpajak.'='.$totalpendapatan.') ';

                        $data[$i]['totalpendapatan'] = $totalpendapatan;
                        $obj->totalpendapatan = $data[$i]['totalpendapatan'];
// echo $data[$i]['totalpendapatan'].'=';

                        $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

                        // $data[$i]['penerimaanbruto'] = $penghasilanbruto;
                        
                        // echo $penghasilannet.'-'.$penghasilanTT;
                        // $data[$i]['penerimaannet'] = $penghasilannet-$penghasilanTT;
                        $data[$i]['penerimaannet'] = $penghasilannet;
                        $obj->penerimaannet = $data[$i]['penerimaannet'];
                        
                        // $obj->penerimaannetTT = $penghasilanTT;
//                        echo '('.$penghasilannet.'*'.$data[$i]['masapajaksetahun'].')+'.$penghasilanTT;
//                        $data[$i]['netosetahun'] = ($penghasilannet*$data[$i]['masapajaksetahun'])+$penghasilanTT;
                        // $data[$i]['netosetahun'] = ($obj->penerimaannet*$data[$i]['masapajaksetahun'])+$penghasilanTT;
                        // echo $data[$i]['masapajaksetahun'];
                        // $data[$i]['netosetahun'] = ($obj->penerimaannet*$data[$i]['masapajaksetahun']);
                        // echo $obj->penerimaannetT.'*'.$data[$i]['masapajaksetahun'].'+'.$obj->penerimaannetTT;
                        // $data[$i]['netosetahun'] = ($obj->penerimaannetT*$data[$i]['masapajaksetahun'])+$obj->penerimaannetTT;
                        // $data[$i]['netosetahun'] = ($obj->penerimaannet*$data[$i]['masapajaksetahun'])+$obj->penerimaannetTT;//update
                        // echo $obj->penerimaannet;
                        // $data[$i]['netosetahun'] = ($obj->penerimaannet*$data[$i]['masapajaksetahun']); //tanpa upah bulanan tidak teratur
                        // $obj->netosetahun = $data[$i]['netosetahun'];
                        // echo '('.$obj->penerimaannetT.'*'.$data[$i]['masapajaksetahun'].')'.'+'.$obj->penerimaannetTT;
                         $data[$i]['netosetahun'] = ($obj->penerimaannetT*$data[$i]['masapajaksetahun'])+$obj->penerimaannetTT; //tanpa upah bulanan tidak teratur
                        $obj->netosetahun = $data[$i]['netosetahun'];

                        // echo $obj->netosetahun ;
                        // echo  $netsetahun.'<'.$nilaiptkp;

                        if($obj->netosetahun<=$nilaiptkp)
                        {
                            $pkpsetahun = 0;
                        } else {  
                            // echo $data[$i]['netosetahun']-$nilaiptkp.' - '.round(($data[$i]['netosetahun']-$nilaiptkp),-3,PHP_ROUND_HALF_DOWN);
                            // $pkpsetahun = substr(round(($data[$i]['netosetahun']-$nilaiptkp),-4), 0, -3) . '000';
                            // $pkpsetahun = substr(($obj->netosetahun-$nilaiptkp), 0, -3) . '000';
                            // $pkpsetahun = ceil($data[$i]['netosetahun']-$nilaiptkp);
                            // $pkpsetahun = substr_replace($pkpsetahun, '000', -3);
                            // echo $obj->netosetahun-$nilaiptkp;
                            $pkpsetahun = round(($obj->netosetahun-$nilaiptkp),3);

                            if($pkpsetahun>10000000)
                            {
                                $pkpsetArr = explode(',', number_format($pkpsetahun));
                                $pkpsetahun = $pkpsetArr[0].$pkpsetArr[1].'000';
                            } else {

                            }
                            
                            // print_r($pkpsetArr);
                        }

                      

                        $data[$i]['pkpsetahun'] = $pkpsetahun;
                        $obj->pkpsetahun = $data[$i]['pkpsetahun'];
                        $arrPKP = explode('.', $obj->pkpsetahun);
                        // echo ' '.$obj->pkpsetahun;
                        // $obj->pkpsetahunteratur =  $obj->pkpsetahun-$penghasilanTT;
                        // $num = intval(substr(($obj->pkpsetahun-$obj->penerimaannetTT), -3));
                        $num = intval(substr(($arrPKP[0]), -3));
                        // echo $num;
                        if($num>=500)
                        {
                            $plus = 1000;
                        } else {
                            $plus = 0;
                        }

                        $obj->pkpsetahun = substr(($arrPKP[0]), 0, -3) . '000';
                        $obj->pkpsetahun +=$plus;

                        
                        //pkp teratur
                        if(($obj->netosetahun-$obj->penerimaannetTT)<=$nilaiptkp)
                        {
                            $pkpsetahunteratur = 0;
                        } else {
                            $pkpsetahunteratur = round((($obj->netosetahun-$obj->penerimaannetTT)-$nilaiptkp),3);

                            if($pkpsetahunteratur>10000000)
                            {
                                $pkpsetArr = explode(',', number_format($pkpsetahunteratur));
                                $pkpsetahunteratur = $pkpsetArr[0].$pkpsetArr[1].'000';
                            }
                        }
                        
                        $data[$i]['pkpsetahunteratur'] = $pkpsetahunteratur;
                        $obj->pkpsetahunteratur = $data[$i]['pkpsetahunteratur'];
                        $arrPKP = explode('.', $obj->pkpsetahunteratur);
                        // echo ' '.$obj->pkpsetahun;
                        // $obj->pkpsetahunteratur =  $obj->pkpsetahun-$penghasilanTT;
                        // $num = intval(substr(($obj->pkpsetahun-$obj->penerimaannetTT), -3));
                        $num = intval(substr(($arrPKP[0]), -3));
                        // echo $num;
                        if($num>=500)
                        {
                            $plus = 1000;
                        } else {
                            $plus = 0;
                        }

                        $obj->pkpsetahunteratur = substr(($arrPKP[0]), 0, -3) . '000';
                        $obj->pkpsetahunteratur +=$plus;

                        // echo $obj->pkpsetahun-$obj->pkpsetahunteratur;
                         //end pkp teatur
             
                        ///////////// pph5%tahun
                        // $pph5tahun = $pkpsetahun <= 50000000 ? $pkpsetahun*0.05 : 50000000*0.05;
                        // $data[$i]['pph5%tahun'] = $data[$i]['punyanpwp']==1 ? $pph5tahun : $pph5tahun*1.2; 
                        // $obj->pph5tahun = $data[$i]['pph5%tahun'];
                        // ///////////// pph5%tahun

                        // $data[$i]['pph10%tahun'] = 0;

                        // ///////////// pph15%tahun
                        // if($pkpsetahun<=50000000)
                        // {
                        //     $pph15tahun = 0;
                        // } else if($pkpsetahun>50000000 && $pkpsetahun<250000000) {
                        //     $pph15tahun = ($pkpsetahun-50000000)*0.15;
                        // } else {
                        //     $pph15tahun = 200000000*0.15;
                        // }

                        // $data[$i]['pph15%tahun'] = $data[$i]['punyanpwp']==1 ? $pph15tahun : $pph15tahun*1.2; 
                        // $obj->pph15tahun = $data[$i]['pph15%tahun'];
                        // ///////////////// pph15%tahun

                        // ///////////// pph25%tahun
                        // if($pkpsetahun<=250000000)
                        // {
                        //     $pph25tahun = 0;
                        // } else if($pkpsetahun>250000000 && $pkpsetahun<500000000) {
                        //     $pph25tahun = ($pkpsetahun-250000000)*0.25;
                        // } else {
                        //     $pph25tahun = 250000000*0.25;
                        // }

                        // $data[$i]['pph25%tahun'] = $data[$i]['punyanpwp']==1 ? $pph25tahun : $pph25tahun*1.2; 
                        // $obj->pph25tahun = $data[$i]['pph25%tahun'];
                        // ///////////////// pph25%tahun

                        // ///////////// pph30%tahun
                        // if($pkpsetahun<=500000000)
                        // {
                        //     $pph30tahun = 0;
                        // } else if($pkpsetahun>500000000) {
                        //     $pph30tahun = ($pkpsetahun-500000000)*0.30;
                        // } else {
                        //     $pph30tahun = 500000000*0.30;
                        // }

                        // $data[$i]['pph30%tahun'] = $data[$i]['punyanpwp']==1 ? $pph30tahun : $pph30tahun*1.2; 
                        // $obj->pph25tahun = $data[$i]['pph30%tahun'];
                        // ///////////////// pph30%tahun

                        // // $data[$i]['pph30%tahun'] = ($pkpsetahun*0.30)/12;
                        // $data[$i]['pph35%tahun'] = 0;
                        // $obj->pph35tahun = $data[$i]['pph35%tahun'];

                        // $data[$i]['pphsettahun'] = $data[$i]['pph5%tahun']+$data[$i]['pph10%tahun']+$data[$i]['pph15%tahun']+$data[$i]['pph25%tahun']+$data[$i]['pph30%tahun']+$data[$i]['pph35%tahun'];
                        // // $obj->pphsettahun = $data[$i]['pphsettahun'];
                        $obj->pphsettahun = $this->calc_pph($data,$i,$obj->pkpsetahun);
                        $data[$i]['pphsettahun'] = $obj->pphsettahun;

                        $obj->pphsettahunteratur = $this->calc_pph($data,$i,$obj->pkpsetahunteratur); 
                        // echo $obj->pphsettahun;

                        // $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        $pphsetsebulan = $data[$i]['pphsettahun'] <=0 ? 0 : ceil($data[$i]['pphsettahun']/$obj->masapajaksetahun);
                        // echo ceil($data[$i]['pphsettahun']/$obj->masapajaksetahun);

//                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : $pphsetsebulan;
//                        $obj->pphsebulan = $data[$i]['pphsebulan'];
                        
                        $obj->pphsebulanteratur = $this->pphteratur($obj->pkpsetahunteratur,$data,$i,$obj->masapajaksetahun);
// echo $obj->pphsebulanteratur;

                        // $obj->pphsettahunteratur =  round($obj->pphsebulanteratur*$obj->masapajaksetahun,-1);
                        // echo $obj->pphsebulanteratur.'*'.$obj->masapajaksetahun;
                        // $obj->pphsettahunteratur =  $obj->pphsettahun;
                       // echo $pphsetsebulan .' ';
// echo $obj->pphsettahun-$obj->pphsettahunteratur;
                        // if($obj->pphsettahun>$obj->pphsettahunteratur)
                        // {
                        //     $obj->pphsebulantakteratur = $obj->pphsettahunteratur-$obj->pphsettahunteratur;
                        // } else {
                        //     $obj->pphsebulantakteratur = $obj->pphsettahun-$obj->pphsettahun;
                        // }
                        // echo $obj->pphsebulantakteratur;
                        // if($data[$i]['punyanpwp']==1)
                        // {
                            $obj->pphsebulantakteratur = $obj->pphsettahun - $obj->pphsettahunteratur;
                        // }
                        
                        $data[$i]['pphsebulan'] = $obj->pphsebulanteratur+$obj->pphsebulantakteratur;
                        $obj->pphsebulan = $data[$i]['pphsebulan']<0 ? 0 :  $data[$i]['pphsebulan'];
                                
                        // echo $enddate.'>='.$obj->tglakhirjabatan;

                        if($startdate>=$obj->tglakhirjabatan || $enddate>=$obj->tglakhirjabatan)
                        {
                          if($data[$i]['masapajaksetahun']<12)
                            {
                                // $getTglTerminasiArr = explode('-', $this->getTglTerminasi($rpeg->idpelamar));
                                // echo intval($startdateArr[0]).' == '.$getTglTerminasiArr;
                                // if(intval($startdateArr[0]) == intval($getTglTerminasiArr[0]))
                                // {
                                //     $obj->pphterminasi = $obj->pphsettahun <= 0 ? 0 : round($obj->pphsettahun/$data[$i]['masapajaksetahun']);
                                // } else {
                                //     $obj->pphterminasi = 0;
                                // }
                                // $obj->pphterminasi = $obj->pphsettahun <= 0 ? 0 : round($obj->pphsettahun/$data[$i]['masapajaksetahun']);
                                $obj->pphterminasi = $obj->pphsebulanteratur+$obj->pphsebulantakteratur;
                            } else {
                                $obj->pphterminasi = 0;
                            }
                        } else {
                             $obj->pphterminasi = 0;
                        }

                        

                       

                        $data[$i]['tunjanganpajaknew'] = $data[$i]['pphsebulan'];

                        $tunjanganpajak = $data[$i]['pphsebulan'];

                        // if(intval($startdateArr[1])==12)
                        // { 
                        //    //kalo udah bulan desember, ambil pajaknya dari pajakterutang bulan november
                        //     $obj->pphsebulan = $this->pajakterutangdes($obj->idpelamar,$startdateArr[0]);
                        //     $data[$i]['pphsebulan'] = $obj->pphsebulan;
                        // }
                        
                       // echo $data[$i]['totalpendapatan'].'-('.$benefitCmp.'+'.$benefitEmp.')-'.$data[$i]['pphsebulan'].'+'.$obj->totalUTT;
                       // exit;
//                        11863433-(381600+180000)-1006833+10000000
                                       // $data[$i]['takehomepay'] = round(($data[$i]['totalpendapatan']-$data[$i]['pphsebulan'])-($benefitCmp+$benefitEmp+$data[$i]['tunjanganpajak']+$nilaiPotongan));
                       if($obj->idpelamar==227)
                        {
                            // echo $obj->totalUTT.' ';
                        }
                       // if($obj->totalUTT>1)
                       // {
                        //kalo ada isinya, ga usah ditambahin lagi, karena sudah ditambahkan sebelumnya
                         $data[$i]['takehomepay'] = $data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan'];
                         // echo $data[$i]['totalpendapatan'].'-'.($benefitCmp+$benefitEmp).'-'.$data[$i]['pphsebulan'];
                       // } else {
                         // $data[$i]['takehomepay'] = $data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan']+$obj->totalUTT;
                       // }
                       
                          //24-8-16
                        // $data[$i]['takehomepay'] = $data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan'];
                       

                        // echo $data[$i]['takehomepay'];
                        // exit;
                        if (strpos($data[$i]['takehomepay'], '.') !== false) {
                             //24-8-16
                             $data[$i]['takehomepay'] = ceil($data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan']);
                             // echo $data[$i]['takehomepay'];
                            //24-8-16
                            // $data[$i]['takehomepay'] = ceil($data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan']);
                        }
                        
                        $obj->takehomepay = $data[$i]['takehomepay'];
                        // echo  $obj->takehomepay;

                        if($obj->idpelamar==150)
                        {
                            // echo $data[$i]['totalpendapatan']; //9481600
                            // echo ($benefitCmp+$benefitEmp); //561600
                            // echo $data[$i]['pphsebulan'];
                            // exit;
                        }

                        // if(intval($bulanGaji)>=11)
                        // {
                        //     $obj->pajakjantonov = $this->pajakjantonov($data[$i]['idpelamar'],($obj->pphsebulantakteratur+$obj->pphsebulanteratur),$enddateArr[0])+$data[$i]['pphsebulan'];
                        // } else {
                        //     $obj->pajakjantonov = $this->pajakjantonov($data[$i]['idpelamar'],($obj->pphsebulantakteratur+$obj->pphsebulanteratur),$enddateArr[0]);
                        // }
                         $obj->pajakjantonov = $this->pajakjantonov($data[$i]['idpelamar'],($obj->pphsebulantakteratur+$obj->pphsebulanteratur),$enddateArr[0],$startdateArr[1]);
                         $data[$i]['pajakjantonov'] = $obj->pajakjantonov;
                         // echo $obj->pajakjantonov;
                        $obj->pajakterbayar = $obj->pajakjantonov-$obj->pphterminasi;
                        $data[$i]['pajakterbayar'] = $obj->pajakterbayar;
                        // $obj->pajakterutangdes = $obj->pphsettahun-$obj->pajakterbayar;
                        $obj->pajakterutangdes = $obj->pph_setahun2-$obj->pajakterbayar;
                        $data[$i]['pajakterutangdes'] = $obj->pajakterutangdes;
                         // echo $obj->pphsettahun.'-'.$obj->pajakterbayar;
                        // echo $obj->pphsettahun."+".$obj->pph_setahun2;

                         if(intval($startdateArr[1])==122)
                        { 
                           //kalo udah bulan desember, ambil pajaknya dari pajakterutang bulan november
                            $data[$i]['pphsebulan'] = $obj->pajakterutangdes;
                            $obj->pphsebulan = $data[$i]['pphsebulan'];
                            // echo ($utPengurangPajak+$utTPengurangPajak+$utTTahunPengurangPajak+$benefitPengurangPajak);
                            $data[$i]['takehomepay'] = $obj->totalUT + $obj->totalUTTTahun - ($obj->benefitCmp+$obj->benefitEmp) - $obj->pphsebulan;

                            $pendapatan =  $obj->totalUT+($obj->totalUTT - $obj->totalUTTTahun)+($obj->benefitCmp)+$obj->totallembur;
                            $data[$i]['takehomepay'] = $pendapatan-($obj->benefitCmp+$obj->benefitEmp) - $obj->pphsebulan + $obj->totalUTTTahun;
                            $obj->takehomepay = $data[$i]['takehomepay'];
                            // echo $thp;
                            // echo $obj->totalUT.'+'.($obj->totalUTT - $obj->totalUTTTahun).'+'.($obj->benefitCmp).'+'.$obj->totallembur;
                            // echo $obj->totalUT.' + '.$obj->totalUTTTahun.' - '.$obj->pphsebulan.' - '.($obj->benefitCmp+$obj->benefitEmp);
                            // $data[$i]['takehomepay'] = ceil($obj->totalUT-($benefitCmp+$benefitEmp)-$obj->pphsebulan);
                        } 
                        
                        // echo $qtglmasuk->tglmasuk.','.$obj->tglakhirjabatan;
                        // echo $data[$i]['masapajaksetahun'].'<12 && '.diffInMonths($qtglmasuk->tglmasuk,$obj->tglakhirjabatan).'<12';
                        if($data[$i]['masapajaksetahun']<12 && diffInMonths($qtglmasuk->tglmasuk,$obj->tglakhirjabatan)<12)
                        {
                            if($obj->hitungpajak=='GROSS')
                            {
                                $obj->pphsebulan = $obj->pajakterutangdes < 0 ? $this->removeprec($obj->pajakterutangdes) :  $obj->pajakterutangdes;
                              
                            } else {
                                $obj->pphsebulan = $obj->tunjanganpajak < 0 ? $this->removeprec($obj->tunjanganpajak) :  $obj->tunjanganpajak ;
                            }
                            
                            $data[$i]['pphsebulan'] = $obj->pphterminasi;

                            $data[$i]['takehomepay'] = ceil($data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$obj->pphsebulan);
                            $obj->takehomepay = $data[$i]['takehomepay'];

                            //$obj->pajakterutangdes = $obj->tunjanganpajak;

                        } 

                        //selisih pph
                        if($data[$i]['masapajaksetahun']<12 && $obj->pphterminasi>0)
                        {
                            // echo $obj->pphsebulan.'+'.$obj->pphterminasi;
                            // $obj->selisihpph = abs($obj->pphsebulan)+$obj->pphterminasi;
                            $obj->selisihpph = $obj->pphterminasi-$obj->pajakterutangdes;
                        } else {
                            $obj->selisihpph = 0;
                        }
                        $obj->pajaktotalbayarsetahun = $obj->pajakterutangdes+$obj->pajakterbayar;
                        $data[$i]['pajaktotalbayarsetahun'] = $obj->pajaktotalbayarsetahun;
            // echo '<pre>';
            // print_r($data);
            // echo '</pre>';
                        if($data[$i]['masapajaksetahun']<12 && diffInMonths($qtglmasuk->tglmasuk,$obj->tglakhirjabatan)<12)
                        {
                            // $data[$i]['takehomepay'] = $this->penggajian2($idcompany,$startdate,$enddate,$obj->idpelamar,$obj->pphsebulan,$data[$i]['masapajaksetahun']);
                            // $obj->takehomepay = $data[$i]['takehomepay'];
                            // echo 'a'.$tunjanganpajakTMP;
                            // exit;
                        }

                        //get take home pay month before
                        $PrevMonth = explode('-',date('Y-m-d', strtotime('-1 month', strtotime($data[$i]['startdate']))));
                        $PrevPayQ = $this->db->query("select takehomepay from payrolldata where idpelamar=".$data[$i]['idpelamar']." and bulan = '".$PrevMonth[1]."' and tahun = '".$PrevMonth[0]."'");
                        // echo $this->db->last_query();
                        if($PrevPayQ->num_rows()>0)
                        {
                            $rprevpay = $PrevPayQ->row();
                            $PrevPay = $rprevpay->takehomepay;
                        } else {
                            $PrevPay = 0;
                        }
                        $obj->prevtakehomepay = $PrevPay;
                        //exit;
                        //end get thp before

            if(intval($enddateArr[1]) == 182)
            {
                //desember
                // unset($obj->biayajabatan);
                unset($obj->netosetahun);
                unset($obj->pkpsetahun);
                unset($obj->pph5tahun);
                unset($obj->pph15tahun);
                unset($obj->pph25tahun);
                unset($obj->pph35tahun);
                unset($obj->pphsettahun);

                //kalo desember, set variabel berikut ke bulan november
                $qpayrolbefore = $this->db->get_where('payrolldata',array('idpelamar'=>$data[$i]['idpelamar'],'bulan'=>'11'));
                if($qpayrolbefore->num_rows()>0)
                {
                    $rqpayrolbefore = $qpayrolbefore->row();
                    $obj->pajakjantonov = $rqpayrolbefore->pajakjantonov;
                    $obj->pajakterbayar = $rqpayrolbefore->pajakterbayar;
                    $obj->pajakterutangdes = $rqpayrolbefore->pajakterutangdes;
                    $obj->pajaktotalbayarsetahun = $rqpayrolbefore->pajaktotalbayarsetahun;
                    // $obj->pajakjantonov = $rqpayrolbefore->pajakjantonov;
                }

                $data[$i]['pphsebulan'] = $obj->pajakterutangdes;
                $obj->pphsebulan = $obj->pajakterutangdes;
                $data[$i]['tunjanganpajak'] = $obj->pphsebulan;
                $obj->tunjanganpajak = $obj->pphsebulan;

                // $totalpendapatan = $data[$i]['totalUT']+$data[$i]['totalUTT']+$obj->totallembur+$obj->benefitCmp+$obj->pphsebulan;
                $totalpendapatan = $data[$i]['totalUT']+$penghasilanTT+$obj->totallembur+$obj->benefitCmp+$obj->pphsebulan;
                $data[$i]['totalpendapatan'] = $totalpendapatan;
                $obj->totalpendapatan = $data[$i]['totalpendapatan'];

                // echo $obj->benefitCmp;
                // echo $data[$i]['totalUT']+$penghasilanTT+$obj->benefitEmp+$obj->benefitCmp;
                // $data[$i]['takehomepay'] = round(($obj->totalpendapatan-($benefitCmp+$benefitEmp)-$obj->pphsebulan+$obj->totalUTT));
                // echo round(($obj->totalpendapatan-($benefitCmp+$benefitEmp)-$obj->pphsebulan));
                // $data[$i]['takehomepay'] = $obj->totalpendapatan;
                // $data[$i]['takehomepay'] = $data[$i]['takehomepay']-$benefitCmp+$benefitEmp;
                // $x = $obj->pphsebulan;
                // $data[$i]['takehomepay'] = $data[$i]['takehomepay']-$x;
                // unset($x);
                
                // echo $obj->totalpendapatan.'-'.($benefitCmp+$benefitEmp).'-'.$obj->pphsebulan.'+'.$obj->totalUTT.' ===';
                // exit;
                // $data[$i]['takehomepay'] = $PrevPay;
                // $obj->takehomepay = $data[$i]['takehomepay'];
            }
            // echo '('.$data[$i]['takehomepay'].'/'.$numdayswork.')*'.$proporsionalDays;
            
            // $data[$i]['takehomepay'] = ($data[$i]['takehomepay']/$numdayswork)*$proporsionalDays;
            // if($this->cek_terminasi($startdate,$enddate,$obj->tglakhirjabatan))
            // {
                // $obj->takehomepay = 0; //kalo udah terminate, THP dibuat 0
            //     $data[$i]['takehomepay'] = 0;
            //     $obj->takehomepay = 0;
            // } else {
                $obj->takehomepay = $data[$i]['takehomepay'];
                // echo $obj->takehomepay;
            // }

            
            // $obj->takehomepay = $obj->totalUT-$data[$i]['nilaiPotongan']-$benefitEmp;

            if($commit=='true')
            {
                $datapayroll = array(
                        "idpayroll"=>$idpayroll,
                        "idpelamar"=>$data[$i]['idpelamar'],
                        "tglgaji" =>$this->tanggalWaktu(),
                        "bulan" =>$enddateArr[1],
                        "tahun" =>$enddateArr[0],
                        "startdate" =>$data[$i]['startdate'],
                        "enddate" =>$data[$i]['enddate'],
                        "namalengkap"=>$data[$i]['namalengkap'],
                        "punyanpwp"=>$data[$i]['punyanpwp'],
                        "durasi" =>$data[$i]['durasi'],
                        "hitungpajak"=>$data[$i]['hitungpajak'],
                        "masapajaksetahun"=>$data[$i]['masapajaksetahun'],
                        "selisihpph" =>$obj->selisihpph,
                        "tglgajipertama" =>$data[$i]['tglgajipertama'],
                        "masakerja" =>$data[$i]['masakerja'],
                        "tglmasuk" =>$data[$i]['tglmasuk'],
                        "nilaiptkp" =>$data[$i]['nilaiptkp'],
                        "kodeptkp" =>$data[$i]['kodeptkp'],
                        "totalut" =>$obj->totalUT,
                        "totalutt" =>$obj->totalUTT+$obj->totalUTTTahun,
                        // "totalut" =>$obj->totalUTT,
                        "upahlemburpajak" =>$data[$i]['upahlemburPajak'],
                        "upahlemburnopajak" =>$data[$i]['upahlemburNoPajak'],
                        "upahlemburtambahpajak" =>$data[$i]['upahlemburTambahPajak'],
                        "upahlemburkurangpajak" =>$data[$i]['upahlemburKurangPajak'],
                        "totallembur" =>$data[$i]['totallembur'],
                        // "benefitcmpbruto" =>$data[$i]['benefitCmpBruto'],
                        // "benefitcmpnet" =>$data[$i]['benefitCmpNet'],
                        // "benefitempbruto" =>$data[$i]['benefitEmpBruto'],
                        // "benefitempnet" =>$data[$i]['benefitEmpNet'],
                        "benefitcmp" =>$data[$i]['benefitCmp'],
                        "benefitemp" =>$data[$i]['benefitEmp'],
                        "numdayswork" =>$data[$i]['numdayswork'],
                        "nilaipotongan" =>$data[$i]['nilaiPotongan'],
                        "totalpendapatan" =>$data[$i]['totalpendapatan'],
                        "penerimaanbruto" =>$data[$i]['penerimaanbruto'],
                        "penerimaanbruto_total"=>$data[$i]['penerimaanbruto_total'],
                        "tunjanganpajak" =>$data[$i]['tunjanganpajak'],
                        "biayajabatan" => intval($enddateArr[1]) == 12 ? 0 : $data[$i]['biayajabatan'],
                        "penerimaannet" =>$data[$i]['penerimaannet'],
                        "netosetahun" => intval($enddateArr[1]) == 12 ? 0 : $data[$i]['netosetahun'],
                        "pkpsetahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pkpsetahun'],
                        // "pph5tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph5%tahun'],
                        // "pph15tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph15%tahun'],
                        // "pph25tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph25%tahun'],
                        // "pph35tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph35%tahun'],
                        "pphsettahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pphsettahun'],
                        "pphsebulan" =>$obj->pphsebulan,
                        "pajakjantonov"=>$data[$i]['pajakjantonov'],
                        "pajakterbayar"=>$data[$i]['pajakterbayar'],
                        "pajakterutangdes"=>$data[$i]['pajakterutangdes'],
                        "pajaktotalbayarsetahun"=>$data[$i]['pajaktotalbayarsetahun'],
                        "takehomepay" =>$obj->takehomepay,
                        "prevtakehomepay" => $PrevPay,
                    );
                $this->db->insert('payrolldata',$datapayroll);
                // echo '   '.$obj->takehomepay;
            }

            $footerUT+=$data[$i]['totalUT'];
            $footerUTT+=$data[$i]['totalUTT'];
            $footerLembur+=$data[$i]['totallembur'];
            $footerBenefitCmp+=$data[$i]['benefitCmp'];
            $footerBenefitEmp+=$data[$i]['benefitEmp'];
            $footerPotongan+=$data[$i]['nilaiPotongan'];
            $footerPendapatan+=$data[$i]['totalpendapatan'];
            $footerBruto+=$data[$i]['penerimaanbruto'];
            $footerPajak+=$data[$i]['tunjanganpajak'];
            $footerTHP+=$data[$i]['takehomepay'];
            $footerPPH+=$data[$i]['pphsebulan'];

            //   if(intval($enddateArr[1]) == 12)
            // {
            //     //desember
            //     unset($obj->biayajabatan);
            //     unset($obj->netosetahun);
            //     unset($obj->pkpsetahun);
            //     unset($obj->pph5tahun);
            //     unset($obj->pph15tahun);
            //     unset($obj->pph25tahun);
            //     unset($obj->pph35tahun);
            //     unset($obj->pphsettahun);
            // }
    // echo $obj->idpelamar.' ';
            $obj->startdate = backdate2_reverse($obj->startdate);
            $obj->enddate = backdate2_reverse($obj->enddate);
            $obj->tglmasuk = backdate2_reverse($obj->tglmasuk);
            $obj->tglakhirjabatan = backdate2_reverse($obj->tglakhirjabatan);
            $obj->tglgajipertama = backdate2_reverse($obj->tglgajipertama);
            
            $arrJson[] = $obj;
            unset($obj);
            // unset($obj->takehomepay);
            // array_push($arrJson,$obj);
            // echo 'a'.$arrJson;
// print_r($arrJson);
// exit;            
            $i++;
        }
// print_r($arrJson);

        $summary = array(
            'footerUT'=>number_format($footerUT),
            'footerUTT'=>number_format($footerUTT),
            'footerLembur'=>number_format($footerLembur),
            'footerBenefitCmp'=>number_format($footerBenefitCmp),
            'footerBenefitEmp'=>number_format($footerBenefitEmp),
            'footerPotongan'=>number_format($footerPotongan),
            'footerPendapatan'=>number_format($footerPendapatan),
            'footerBruto'=>number_format($footerBruto),
            'footerPajak'=>number_format($footerPajak),
            'footerTHP'=>number_format($footerTHP),
            'footerPPH'=>number_format($footerPPH)
        );

        // $arrJson['summary'] = $summary;

        if($commit=='true')
        {

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                echo json_encode(array('success' => false, 'message' => 'Gagal menyimpan data perhitungan upah'));
            } else {
                $this->db->trans_commit();
                echo json_encode(array('success' => true, 'message' => 'Sukses menyimpan data perhitungan upah'));
            }
        } else {
            echo '{success:true,numrow:' . $i . ',results:' . $i .',rows:' . json_encode($arrJson) . ',summary:'.json_encode($summary).'}';
        }
            // echo '<pre>';
            // print_r($data);
            // echo '</pre>';            
    }

    function eksportcsv($sd,$nd,$idcompany,$idorg=null,$idjab=null)
    {
        $tgl = explode('-', $sd);

        $fn = 'csv_espt_'.$sd.'_sd_'.$nd;
        // output headers so that the file is downloaded rather than displayed
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename='.$fn.'.csv');

        // create a file pointer connected to the output stream
        $output = fopen('php://output', 'w');

        // output the column headings
        fputcsv($output, array('Masa Pajak;Tahun Pajak;Pembetulan;NPWP;Nama;Kode Pajak;Jumlah Bruto;Jumlah PPh;Kode Negara'));

        // fetch the data
        $rows = $this->db->query("select a.bulan,a.tahun,penerimaanbruto,pphsebulan,b.namalengkap,b.nonpwp
                                    from payrolldata a
                                    join pelamar b ON a.idpelamar = b.idpelamar
                                    where b.idcompany = $idcompany and b.display is null and (a.startdate between '".backdate2_reverse($sd)."' and '".backdate2_reverse($nd)."')");
        $rows = $rows->result_array();

        // loop over the rows, outputting them
        $data = array();
        foreach ($rows as $key => $value) {
            // 21-100-01
            $data = array(intval($tgl[1]).';'.$tgl[2].';'.'0'.';'.$value['nonpwp'].';'.$value['namalengkap'].';'.'21-100-01'.';'.$value['penerimaanbruto'].';'.$value['pphsebulan'].';');
            fputcsv($output, $data);
        }
        

        // foreach ($rows as $key => $row) {
          
        // }

         // fputcsv($output, $row);
        // while ($row = mysql_fetch_assoc($rows)) 
    }

    function eksportxls($sd,$nd,$idcompany,$idorg=null,$idjab=null)
    {
        $data['fontsize'] = 12;
        $data['lineheight'] = 12;
        $data['option'] = 'print';

        $data['periode'] = $sd.' s/d '.$nd;
        $qcmp = $this->db->get_where('company',array('idcompany'=>$idcompany))->row();
        $data['companyname'] = $qcmp->companyname;

            //cetak ke excel
        $this->load->model('kompensasi/m_riwayatgaji');

        $sql = $this->m_riwayatgaji->query()." WHERE ".$this->m_riwayatgaji->whereQuery($sd,$nd,$idcompany,$idorg,$idjab);
        // echo $sql; die;
        //komponen UT
        // $qut = $this->db->query("select idkomponenupah,namakomponen
        //                             from komponenupah
        //                             where jeniskomponen='Upah Tetap' and idcompany=$idcompany and display is null");
        // $data['komponenut'] = $qut;

        // //komponen UTT
        // $qutt = $this->db->query("select idkomponenupah,namakomponen
        //                             from komponenupah
        //                             where jeniskomponen='Upah Tidak Tetap' and idcompany=$idcompany and display is null");
        // // echo $this->db->last_query();
        // $data['komponenutt'] = $qutt;

        // //benefit
        // $qbenefit = $this->db->query("select idbenefit,namabenefit
        //                             from komponenbenefit
        //                             where idcompany=$idcompany and display is null");
        // $data['benefit'] = $qbenefit;

        // $qbenefite = $this->db->query("select idbenefit,namabenefit
        //                             from komponenbenefit
        //                             where idcompany=$idcompany and display is null and ditanggungkaryawan='t'");
        // $data['benefite'] = $qbenefite;

        // //potongan
        // $qpotongan = $this->db->query("select idpengurangupah,namapengurangupah
        //                             from pengurangupah
        //                             where idcompany=$idcompany and display is null");
        // $data['potongan'] = $qpotongan;

        // echo $sql;
        $data['data'] = $this->db->query($sql);

        $html = $this->load->view('report/penggajian2', $data,true);
        $filename = "gaji_".$data['companyname']."_".$sd."_".$nd.".xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename.".xls"); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function pplemburpage()
    {
        $this->load->view('pplembur');
    }
    
    function hoursToMinutes($hours) 
        { 
            $minutes = 0; 
            if (strpos($hours, ':') !== false) 
            { 
                // Split hours and minutes. 
                list($hours, $minutes) = explode(':', $hours); 
            } 
            return $hours * 60 + $minutes; 
        }
        
    function rekaphadir($idcompany=null,$idjabatan=null,$idorganisasi=null,$startdate=null,$enddate=null,$eksport=null,$stream=false,$idpelamar=null)
        {
            // echo 'param idcompany:'.$idcompany.' idjabatan:'.$idjabatan.' idorganisasi:'.$idorganisasi.' startdate:'.$startdate.' enddate:'.$enddate.' eksport:'.$eksport.' stream:'.$stream.' idpelamar:'.$idpelamar;
            
            if($stream==true)
            {
                $idjabatan=null;
                $idorganisasi=null;
            }
            
             if($eksport==null && $stream==null)
            {
                $sd = $this->input->post('startdate')=='' ? $startdate : null;
                // $startdate = backdate2_reverse(str_replace('T00:00:00', '', $sd));
                $nd = $this->input->post('enddate')=='' ? $enddate : null;
                // $enddate = backdate2_reverse(str_replace('T00:00:00', '', $nd));
           
                $idcompany = $this->input->post('idcompany');
                $idorganisasi = $this->input->post('idorganisasi');
                $idjabatan = $this->input->post('idjabatan');
            } else {
                // $startdate = backdate2_reverse($startdate);
                // $enddate = backdate2_reverse($enddate);
            }

            $this->load->model('personalia/m_personil');


            $datetime1 = new DateTime($startdate);
            $datetime2 = new DateTime($enddate);
            $difference = $datetime1->diff($datetime2);

            if($startdate==$enddate)
            {
                $jumlahhari=2;
            } else {
                $jumlahhari = $difference->days+1;
            }

             $query = $this->m_personil->query()." WHERE ".$this->m_personil->whereQuery($idcompany,$idorganisasi,$idjabatan,$idpelamar)."";

        
            // $queryKaryawan = $this->db->query("select idpelamar,idcompany,nik,namalengkap,namajabatan,namaorg,
            //  namaatasan,namajabatanatasan,namaorgatasan 
            //  from v_detailkaryawan where display is null 
            //  and idcompany=".$this->session->userdata('idcompany')."");
            $queryKaryawan = $this->db->query($query);
// echo $this->db->last_query();
            $arr = array();
            foreach ($queryKaryawan->result() as $obj) {
                $idpelamar = $obj->idpelamar;

                $hadir=0;
                $tidakhadir=0;
                $keterlambatan=0;
                $durasiketerlambatan=0;
                $izin=0;
                $cuti=0;
                $i=1;
                $first=true;
                while ($i<$jumlahhari)
                // for($i=1;$i<$jumlahhari;$i++)
                {
                    if($first)
                    {
                        $qhadir = $this->db->query("select idjamkerjaharian from kehadiran where display is null and idpelamar=$idpelamar and tglhadir='$startdate'");
                        $tgl = $startdate;
                        $first=false;
                        // echo $tgl.' '.$this->db->last_query().'<br>';
                        // $i=2;
                        // echo ' '.$i;
                    } else {
                        // echo $i;
                        $tglhadir = strtotime("+$i days", strtotime($startdate));
                        $tglhadir =  date('Y-m-d', $tglhadir);
                        // echo $tglhadir;
                        $qhadir = $this->db->query("select idjamkerjaharian from kehadiran where display is null and idpelamar=$idpelamar and tglhadir='$tglhadir'");
                        $tgl = $tglhadir;
                        $i++;
                        // exit;
                    }
                    // echo 'i.'.$i;
                    if($qhadir->num_rows()>0)
                    {
                        $rhadir = $qhadir->row();
                        // echo $tgl.' '.$rhadir->idjamkerjaharian;
                        $hadir++;
                        // echo $this->db->last_query().'<br>';
                        $rjam = $this->db->get_where('jamkerjaharian',array('idjamkerjaharian'=>$rhadir->idjamkerjaharian))->row();

                        $toleransi_menit = $rjam->toleransi_menit;
                        $jammasuk = $rjam->jammasuk_jam.':'.$rjam->jammasuk_menit;
                        $jamMulaiIstirahat = $rjam->mulaiistirahat_jam.':'.$rjam->mulaiistirahat_menit;
                        $jamAkhirIstirahat = $rjam->akhiristirahat_jam.':'.$rjam->akhiristirahat_menit;

                        $endTime = strtotime("+$toleransi_menit minutes", strtotime($jammasuk.":00"));
                        $toleransiKehadiran = date('h:i:s', $endTime);
                        // echo $toleransiKehadiran

                        $sql =  "select idkehadiran,idpelamar,tglhadir,jammasuk_jam,jammasuk_menit,jampulang_jam,jampulang_menit,jamhadir,jamhadirfull,jampulang,durasiistirahat,durasikerja
                                from (
                                    select idkehadiran,idpelamar,tglhadir,jammasuk_jam,jammasuk_menit,jampulang_jam,jampulang_menit,display,userin,datein,
                                        (((jammasuk_jam)::text || ':'::text) || (jammasuk_menit)::text || ':00'::text) AS jamhadir,jamhadirfull,
                                        (((jampulang_jam)::text || ':'::text) || (jampulang_menit)::text || ':00'::text) AS jampulang,jampulangfull,durasiistirahat,
                                        age(jampulangfull::timestamp,jamhadirfull::timestamp)-durasiistirahat as durasikerja
                                    from (
                                        select a.idkehadiran,a.idpelamar,a.tglhadir,a.jammasuk_jam,a.jammasuk_menit,a.jampulang_jam,a.jampulang_menit,a.display,a.userin,a.datein,
                                        (((tglhadir)::text || ' '::text ||(jammasuk_jam)::text || ':'::text) || (jammasuk_menit)::text || ':00'::text) AS jamhadirfull,
                                        (((tglhadir)::text || ' '::text ||(jampulang_jam)::text || ':'::text) || (jampulang_menit)::text || ':00'::text) AS jampulangfull,
                                        age('$tgl $jamAkhirIstirahat'::timestamp,'$tgl $jamMulaiIstirahat'::timestamp) as durasiistirahat
                                        from kehadiran a
                                        where a.idpelamar=$idpelamar and a.tglhadir='$tgl') aa) aaa";
                        $qhadir = $this->db->query($sql);
                        if($qhadir->num_rows()>0)
                        {
                            $rhadir = $qhadir->row();
                            // var_dump($qhadir->row());
                            $q2 = $this->db->query("select age('$rhadir->jamhadirfull'::timestamp,'$tgl $toleransiKehadiran'::timestamp) as keterlambatan")->row();
                            if($this->hoursToMinutes($q2->keterlambatan)>0)
                            {
                                //terlambat
                                $q3 = $this->db->query("select age('$rhadir->jamhadirfull'::timestamp,'$tgl $jammasuk'::timestamp) as keterlambatan")->row();
                                $durasiketerlambatan += $this->hoursToMinutes($q3->keterlambatan);
                                $keterlambatan++;
                            } else {
                                $durasiketerlambatan += 0;
                            }

                        }//end qhadir

                    } else {
                        $tidakhadir++;
                        // echo $tgl.' '.$this->db->last_query().'<br>';
                    }


                    //hitung izin
                    $qizin = $this->db->query("select count(*) from pengajuanizin where '$tgl' between startdate and enddate and display is null and idpelamar=$idpelamar");
                    if($qizin->num_rows()>0)
                    {
                        $rizin = $qizin->row();
                        if($rizin->count>0)
                        {
                            // echo $this->db->last_query().'<br>';
                            $izin++;
                        }
                    }

                    //hitung cuti
                    $qcuti = $this->db->query("select count(*) from pengajuancuti where '$tgl' between tglmulai and tglselesai and display is null and idpelamar=$idpelamar");
                    if($qcuti->num_rows()>0)
                    {
                        $rcuti = $qcuti->row();
                        if($rcuti->count>0)
                        {
                            // echo $this->db->last_query().'<br>';
                            $cuti++;
                        }
                    }

                    if($startdate==$enddate)
                    {
                        break;
                    }
                }
                $obj->hadir = $hadir;
                $obj->tidakhadir = $tidakhadir-$cuti;
                $obj->durasiketerlambatan = $durasiketerlambatan;
                $obj->keterlambatan = $keterlambatan;
                $obj->izin = $izin;
                $obj->cuti = $cuti;

                $arr[] = $obj;
            }

            if($stream==true)
            {
                return $arr;
                //print_r($arr);
                exit;
            }
            
            if($eksport==null)
            {
                $results = $queryKaryawan->num_rows();
                echo '{success:true,numrow:' . $queryKaryawan->num_rows() . ',results:' . $results .',rows:' . json_encode($arr) . '}';
            } else {
                  //cetak ke excel
                $html = $this->load->view('tplcetak/tpl_rekapkehadiran', array('data'=>$arr,'fontsize'=>9),true);
                $filename = "data_rekap_kehadiran.xls";
                header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
                header("Content-type:   application/x-msexcel; charset=utf-8");
                header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
                header("Expires: 0");
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                header("Cache-Control: max-age=0");
                echo $html;
            }

        }

    function hapusgaji()
    {
        $this->db->trans_start();

        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
             $idarr = explode(',', $id);
             $idpayroll = $idarr[0];
             $idpelamar = $idarr[1];

             $tables = array(
                    'benefithistory',
                    'lemburhistory',
                    'pengurangupahhistory',
                    'upahhistory',
                    'payrolldata'
                );
            $this->db->where(array('idpayroll'=>$idpayroll,'idpelamar'=>$idpelamar));
            $this->db->delete($tables);
        }

       if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal menghapus data'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses menghapus data'));
        }
    }

    function hapusgajiall($idpayroll)
    {
        $this->db->trans_start();

        // $records = json_decode($this->input->post('postdata'));
        // foreach ($records as $id) {
        //      $idarr = explode(',', $id);
        //      $idpayroll = $idarr[0];
        //      $idpelamar = $idarr[1];

             $tables = array(
                    'benefithistory',
                    'lemburhistory',
                    'pengurangupahhistory',
                    'upahhistory',
                    'payrolldata'
                );
            $this->db->where(array('idpayroll'=>$idpayroll));
            $this->db->delete($tables);
        // }

       if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal menghapus data'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses menghapus data'));
        }
    }

     function penggajian2($idcompany=null,$startdate=null,$enddate=null,$idpelamar,$tunjanganpajakTMP,$masapajaksetahun)
    {
        $this->load->model('kompensasi/m_komponenupah');

        $commit = $this->input->post('option') == 'save' ? 'true' : null;

        if($idcompany==null)
        {
            $idcompany = $this->input->post('idcompany');
        }

        if($startdate==null)
        {
            $startdate = $this->input->post('startdate');
        }
        if($enddate==null)
        {
            $enddate = $this->input->post('enddate');
        }

//        $startdate = backdate2_reverse($startdate);
        $startdateArr = explode('-', $startdate);
//        $enddate = backdate2_reverse($enddate);
        $enddateArr = explode('-', $enddate);

        if($commit=='true')
        {
            $this->db->trans_start();

            $qpayroll = $this->db->query("select nextval('seq_payroll') as idpayroll")->row();
            $idpayroll = $qpayroll->idpayroll;

            $dpayroll = array(
                    'idpayroll'=>$idpayroll,
                    'idcompany'=>$idcompany,
                    'startdate'=>$startdate,
                    'enddate'=>$enddate,
                    'userin'=>$this->session->userdata('username'),
                    'datein'=>$this->tanggalWaktu()
                );
            // $this->db->insert('payroll',$dpayroll);
        } else {
            $idpayroll = null;
        }

        $obj=new stdClass();

        $idjabatan = $this->input->post('idjabatan');
        $idorganisasi = $this->input->post('idorganisasi');


        $akhirtahun = $startdateArr[0].'-12-'.cal_days_in_month(CAL_GREGORIAN, 12, $startdateArr[0]);

        $date1 = new DateTime($startdate);
        $date2 = new DateTime($enddate);

        $this->load->model('kompensasi/m_lembur');

        //getweekdays
        $numdayswork = $this->get_weekdays($startdate,$enddate);

        $numdays = $date2->diff($date1)->format("%a");
        $maxdaysWork=22;

        $penghasilannet = 0; 

        if($this->input->post('query')!=null)
        {
            //pencarian nama karyawan;
            $wernama = " and a.namalengkap like '%".  strtoupper($this->input->post('query'))."%'";
        } else {
            $wernama = null;
        }
        
        $sqlpeg = "select a.idpelamar,idptkp,namalengkap,aaa.tglmasuk,aa.tglberakhir,punyanpwp,biayajabatan,
                    jenispotonganpph,bb.idpergerakan,b.nik,c.companycode,e.kodeorg,f.namajabatan,bb.idpergerakan
                    from pelamar a
                    join calonpelamar b ON a.idpelamar = b.idpelamar
                    join company c ON a.idcompany = c.idcompany
                    JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    left join strukturjabatan d ON aa.idstrukturjabatan = d.idstrukturjabatan
                    left join organisasi e ON d.idorganisasi = e.idorganisasi
                    left join jabatan f ON d.idjabatan = f.idjabatan
                    JOIN
                    (
                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON a.idpelamar = xx.idpelamar
                    join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan
                    left join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                    where a.idpelamar = $idpelamar and a.idcompany=$idcompany and a.idptkp is not null $wernama 
                    and ('$startdate' between aa.tglmasuk and aa.tglberakhir OR '$startdate' between aaa.tglmasuk and aaa.tglberakhir)"
                . " order by b.nik";
       // echo $sqlpeg;
       // exit;
        $qpeg = $this->db->query($sqlpeg);

        $data=array();
        $arrJson=array();
        $i=0;
        
        $data[$i]['durasi'] = $numdayswork;
        $obj->durasi = $numdayswork;

        // $this->load->library('../controllers/kehadiran');
        $this->load->model('kompensasi/m_configdasarupahtt');
        foreach ($qpeg->result() as $rpeg) {
            // var_dump($rpeg);
            // exit;
            $obj = new stdClass();
            
            $obj->idpelamar = $rpeg->idpelamar;
            $obj->idpergerakan = $rpeg->idpergerakan;
            $idptkp = $rpeg->idptkp;

            $obj->startdate = $startdate;
            $obj->enddate = $enddate;
            // var_dump($obj);
//echo $rpeg->namalengkap.' '; 
            //cek udah digaji apa belum
            $qcek = $this->db->query("select idpelamar from payrolldata
                                        where idpelamar = $obj->idpelamar 
                                        and ((startdate>='$startdate' and startdate<='$enddate') 
                                        OR (enddate>='$startdate' and enddate<='$enddate')) ");
            if($qcek->num_rows()>0)
            {
                // echo $this->db->last_query();
                continue;
            }

            $penghasilanbruto = 0; //Penghasilan Bruto hanya memasukkan komponen yang dikategorikan masuk pajak
            
            $data[$i]['idpayroll'] = $idpayroll;
            $data[$i]['idpelamar'] = $rpeg->idpelamar;
            $data[$i]['namalengkap'] = $rpeg->namalengkap;
            $obj->namalengkap = $rpeg->namalengkap;
            $obj->nik = $rpeg->nik;
            $obj->companycode = $rpeg->companycode;

            if($rpeg->idpergerakan==128)
            {
                //kalo terminasi cari jabatan sebelumnya
                $qJabatanSebelumnya = $this->db->query("select max(a.idpekerjaan) as tglberakhir,d.kodeorg,e.namajabatan
                                    from pekerjaan a 
                                    join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil 
                                    join strukturjabatan c ON a.idstrukturjabatan = c.idstrukturjabatan
                                    join organisasi d ON c.idorganisasi = d.idorganisasi
                                    join jabatan e ON c.idjabatan = e.idjabatan
                                    where a.idpelamar = ".$rpeg->idpelamar." and b.idpergerakan!=128 and b.statuspergerakan='Disetujui' 
                                    group by d.kodeorg,e.namajabatan")->row();

                $obj->kodeorg = $qJabatanSebelumnya->kodeorg;
                $obj->namajabatan = $qJabatanSebelumnya->namajabatan;
            } else {
                $obj->kodeorg = $rpeg->kodeorg;
                $obj->namajabatan = $rpeg->namajabatan;
            }
            

            $data[$i]['startdate'] = $startdate;
            $data[$i]['enddate'] = $enddate;
            $data[$i]['punyanpwp'] = $rpeg->punyanpwp;
            $obj->punyanpwp = $rpeg->punyanpwp==1 ? 'YA' : 'TIDAK';
            
            // 
            $absen = $this->rekaphadir($idcompany,null,null,$startdate,$enddate,null,true,$rpeg->idpelamar);
            // $absen = json_decode($absenj);
        // print_r($absen);
        // exit;
            $data[$i]['kehadiran'] = $absen[0]->hadir;
            $obj->kehadiran = $absen[0]->hadir;
            
           

            if($rpeg->jenispotonganpph==1 || $rpeg->jenispotonganpph==0 || $rpeg->jenispotonganpph==null)
            {
                $data[$i]['hitungpajak'] = 'GROSS';
                $obj->hitungpajak = 'GROSS';
            } else {
                $data[$i]['hitungpajak'] = 'NET';
                $obj->hitungpajak = 'NET';
            }

             //first payroll
            // $qfpayroll = $this->db->query("select tglgaji from payrolldata where idpelamar=".$rpeg->idpelamar." ORDER BY tglgaji DESC limit 1");
            // if($qfpayroll->num_rows()>0)
            // {
            //     $rqfpayroll = $qfpayroll->row();
            //     $tglgajipertamaArr = explode('-', $rqfpayroll->tglgaji);
            //     $data[$i]['tglgajipertama'] = $tglgajipertamaArr[0].'-'.$tglgajipertamaArr[1].'-01';
            // } else {
            //     $data[$i]['tglgajipertama'] = $startdate;
            // }
            $data[$i]['tglgajipertama'] = $this->m_komponenupah->getFirstPayroll($rpeg->idpelamar,$startdate);
            $obj->tglgajipertama = $data[$i]['tglgajipertama'];
            //end first payroll

            //itung jumlah periode kerja
            $qtglmasuk = $this->db->query("select min(tglmasuk) as tglmasuk from pekerjaan where idpelamar=".$rpeg->idpelamar." ORDER BY tglmasuk limit 1")->row();
           

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
            $tglMasukArr = explode('-', $obj->tglmasuk);
            //end itung jumlah periode kerja

            //ptkp 
            $qptkp = $this->db->get_where('ptkp',array('idptkp'=>$idptkp))->row();
            // echo $this->db->last_query();
            $nilaiptkp = $qptkp->nilaiptkp;
            $data[$i]['nilaiptkp'] = $nilaiptkp;
            $obj->nilaiptkp = $nilaiptkp;
            $data[$i]['kodeptkp'] = $qptkp->kodeptkp;
            $obj->kodeptkp = $qptkp->kodeptkp;

             //query tgl akhir kerja
            $qterminate = $this->db->query("select max(a.tglmasuk) as tglberakhir
                                                from pekerjaan a
                                                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                                                where a.idpelamar = ".$rpeg->idpelamar." and b.idpergerakan=128 and b.statuspergerakan='Disetujui'")->row();
            if($qterminate->tglberakhir!=null)
            { 
                 // $rterminate = $qterminate->row();
                 $tglakhirjabatan = $qterminate->tglberakhir;
                 $tglakhirjabatanArr = explode('-', $tglakhirjabatan);
            } else {

                 $qterminate = $this->db->query("select max(a.tglberakhir) as tglberakhir
                                                from pekerjaan a
                                                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                                                where a.idpelamar = ".$rpeg->idpelamar." and b.statuspergerakan='Disetujui'");
                if($qterminate->num_rows()>0)
                {
                     $rterminate = $qterminate->row();
                     $tglakhirjabatan = $rterminate->tglberakhir;
                     $tglakhirjabatanArr = explode('-', $tglakhirjabatan);
                } else {
                    echo 'tglJabatan end not found';
                    exit;
                }
            }
            $data[$i]['tglakhirjabatan'] = $tglakhirjabatan;
            $obj->tglakhirjabatan = $tglakhirjabatan;
            //end query tgl akhir kerja 

            //hitung durasi kalo dalam bulan yg sama
            $paymentDate=date('Y-m-d', strtotime($tglakhirjabatan));
            $contractDateBegin = date('Y-m-d', strtotime($obj->startdate));
            $contractDateEnd = date('Y-m-d', strtotime($obj->startdate));

            echo $paymentDate.' '.$contractDateBegin.'-'.$contractDateEnd;
            if (($paymentDate > $contractDateBegin) && ($paymentDate < $contractDateEnd))
            {
              echo "is between";
            }
            else
            {
              echo "NO GO!";  
            }

            //cek udah terminate apa belum
            $qterminateYet = $this->db->query("select max(a.tglmasuk) as tglberakhir
                            from pekerjaan a
                            join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                            where a.idpelamar = ".$rpeg->idpelamar." and b.idpergerakan=128 and b.statuspergerakan='Disetujui' and 
                            (a.tglmasuk between '$startdate' and '$enddate')");
            if($qterminateYet->num_rows()>0)
            {
                $RqterminateYet = $qterminateYet->row();
                //udah resign di periode penggajian yang sama, maka tidak munculd alam grid pengupahan
                if($RqterminateYet->tglberakhir!=null)
                {
                    //break;
                    //biarin aja. ini masuk penggajian terakhir
                }
            } 

            //kalo bulan akhir periode penggajian melewati tanggal akhir jabatan gak masuk grid/penghitungan
            $arrDateEnd = explode('-', $enddate);
            $arrDateEndJab = explode('-', $obj->tglakhirjabatan);
            if($arrDateEnd[0]==$arrDateEndJab[0])
            {
                //tahun yang sama
                if(intval($arrDateEnd[1])>intval($arrDateEndJab[0]))
                {
                    //udah lewat bulan gak masuk grid/penghitungan
                    break;
                }
            }
            // $today_dt = new DateTime($enddate);
            // $expire_dt = new DateTime($obj->tglakhirjabatan);

            // if ($today_dt>=$expire_dt) {  
            //     echo 'asd '.$enddate;
            //     exit;
            //      break;
            // }


            // echo $data[$i]['tglgajipertama'].','.$akhirtahun;
           $data[$i]['masapajaksetahun'] = $masapajaksetahun;

            
            
            $obj->masapajaksetahun = $data[$i]['masapajaksetahun'];
            //////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TETAP
            $qUT = $this->db->query("select a.idupahkaryawan,a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
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
                        $penghasilanbruto += $rUT->nilai;
                    } else if($rUT->fungsipajak=='Pengurang')
                        {
                            //pengurang
                            $utPengurangPajak+=$rUT->nilai;
                        } else {
                            //netral
                            // $utPengurangPajak+=$rUT->nilai;
                        }
                    // echo $penghasilanbruto.' += '.$rUT->nilai.'<br>';
                    

                } else {
                    // $penghasilannet += $rUT->nilai;
                }

                $totalUT+=$rUT->nilai;

                // if($commit=='true')
                // {
                //     $dupahhistory = array(
                //             'idpayroll'=>$idpayroll,
                //             'idpelamar'=>$rpeg->idpelamar,
                //             'idupahkaryawan'=>$rUT->idupahkaryawan,
                //             'jenisupah'=>'tetap',
                //             'nilai'=>$rUT->nilai
                //         );
                //     $this->db->insert('upahhistory',$dupahhistory);
                // }
            }
            // echo $totalUT;
            $data[$i]['totalUT'] = $totalUT;
            $obj->totalUT = $totalUT;

            ///////////////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TIDAK TETAP BULANAN
            $qUTT = $this->db->query("select a.idupahkaryawan,a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
                                        from upahkaryawan a
                                        join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                                        where b.jeniskomponen='Upah Tidak Tetap' and b.jangkawaktu='Bulanan' and a.idpelamar=".$rpeg->idpelamar." and 
                                        a.display is null and (now() BETWEEN b.startdate and b.enddate)");
           // echo $this->db->last_query().'<br>';
            $utTPenambahPajak=0;
            $utTPengurangPajak=0;
            $totalUTT=0;
            $nilai=0;
            if($qUTT->num_rows()>0)
            {
                foreach ($qUTT->result() as $rUTT) {
                     // $this->upahtt->tes();
                    // $this->utt();
                    $nilaiV = $this->m_configdasarupahtt->nilaiuut($rUTT->idkomponenupah,$rpeg->idpelamar);
                    // echo $nilaiV.' ';
                    // exit;
                    // $q = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$rUTT->idkomponenupah));
                    // $num = $q->num_rows();
                    // $str = null;
                    // $nilai=0;
                    // foreach ($q->result() as $r) {
                    //     $qupah = $this->db->get_where('upahkaryawan',array('idkomponenupah'=>$r->iddasarkomponenupah,'idpelamar'=>$rpeg->idpelamar,'display'=>null));
                    //     if($qupah->num_rows()>0)
                    //     {
                    //         $rupah = $qupah->row();
                    //         $nilai+=$rupah->nilai;
                    //     } else {
                    //         $nilai+=0;
                    //     }
                        
                    // }
                    $nilai += ($nilaiV/$numdayswork)* $obj->kehadiran;
                    // echo '('.$nilaiV.'/'.$numdayswork.')* '.$obj->kehadiran.':'.$nilai;
                    // exit;
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
                            $utTPenambahPajak+=$nilai;
                            $penghasilanbruto+=$nilai;
                        } else if($rUTT->fungsipajak=='Pengurang')
                        {
                            $utTPengurangPajak+=$nilai;
                        } else {
                            //netral
                            // $utTPengurangPajak+=$rUTT->nilai;
                        }
                        // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                       
                    } else {
                        // $penghasilannet+=$rUTT->nilai;
                    }

                    $totalUTT+=$nilai;

                    // if($commit=='true')
                    // {
                    //     $dupahhistory = array(
                    //             'idpayroll'=>$idpayroll,
                    //             'idpelamar'=>$rpeg->idpelamar,
                    //             'jenisupah'=>'tidaktetap',
                    //             'idupahkaryawan'=>$rUT->idupahkaryawan,
                    //             'nilai'=>$nilai
                    //         );
                    //     $this->db->insert('upahhistory',$dupahhistory);
                    // }
                }
            } else {
                $totalUTT = 0;
            }
            // echo $totalUTT;
            $data[$i]['totalUTT'] = $totalUTT;
            $obj->totalUTT = $data[$i]['totalUTT'];


             ///////////////////////////////////////////////////////////////////////////////////////////////////
            //UPAH TIDAK TETAP TAHUNAN
            $qUTTTahun = $this->db->query("select a.idupahkaryawan,a.idpelamar,a.idkomponenupah,b.namakomponen,a.nilai,b.kenapajak,b.fungsipajak,b.hitungpajak
                                        from upahkaryawan a
                                        join komponenupah b ON a.idkomponenupah = b.idkomponenupah
                                        join (select idkomponenupah from jadwalupah 
                                        where display is null and tanggal='".intval($startdateArr[2])."' and nobulan='".$startdateArr[1]."') c ON b.idkomponenupah = c.idkomponenupah
                                        where b.jeniskomponen='Upah Tidak Tetap' and b.jangkawaktu='Tahunan' and a.idpelamar=".$rpeg->idpelamar." and 
                                        a.display is null and (now() BETWEEN b.startdate and b.enddate)");
//            echo $this->db->last_query().'<br>';
//            exit;
            $utTTahunPenambahPajak=0;
            $utTTahunPengurangPajak=0;
            $totalUTTTahun=0;
            $nilai=0;
            if($qUTTTahun->num_rows()>0)
            {
                foreach ($qUTTTahun->result() as $rUTTTahun) {
                     // $this->upahtt->tes();
                    // $this->utt();
                    $nilaiV = $this->m_configdasarupahtt->nilaiuut($rUTTTahun->idkomponenupah,$rpeg->idpelamar);

                    $nilai += $nilaiV;
                    // echo '('.$nilaiV.'/'.$numdayswork.')* '.$obj->kehadiran.':'.$nilai;
                    // exit;
                    $data[$i]['upahtidaktetap']['item'][] = array(
                                                        'namakomponen'=>$rUTTTahun->namakomponen,
                                                        'nilai'=>$nilai,
                                                        'kenapajak'=>$rUTTTahun->kenapajak,
                                                        'fungsipajak'=>$rUTTTahun->fungsipajak
                                                    );

                    if($rUTTTahun->kenapajak=='YA')
                    {
                        if($rUTTTahun->fungsipajak=='Penambah')
                        {
                            $utTTahunPenambahPajak+=$nilai;
                            $penghasilanbruto+=$nilai;
                        } else if($rUTTTahun->fungsipajak=='Pengurang')
                        {
                            $utTTahunPengurangPajak+=$nilai;
                        } else {
                            //netral
                            // $utTPengurangPajak+=$rUTT->nilai;
                        }
                        // echo $penghasilanbruto.' += '.$rUTT->nilai.'<br>';
                       
                    } else {
                        // $penghasilannet+=$rUTT->nilai;
                    }

                    $totalUTTTahun+=$nilai;

                    // if($commit=='true')
                    // {
                    //     $dupahhistory = array(
                    //             'idpayroll'=>$idpayroll,
                    //             'idpelamar'=>$rpeg->idpelamar,
                    //             'jenisupah'=>'tidaktetap',
                    //             'idupahkaryawan'=>$rUTTTahun->idupahkaryawan,
                    //             'nilai'=>$nilai
                    //         );
                    //     $this->db->insert('upahhistory',$dupahhistory);
                    // }
                }
            } else {
                $totalUTTTahun = 0;
            }
            // echo $totalUTT;
            $data[$i]['totalUTTTahun'] = $totalUTTTahun;
            $obj->totalUTT += $data[$i]['totalUTTTahun'];

            ///////////////////////////////////////////////////////////////////////////////////////////////


            ///////////////////////////////////////////////////////////////////////////////////////////////
            //LEMBUR
            $d = $this->m_lembur->data($startdate,$enddate,$rpeg->idpelamar,$commit);
            // print_r($d);
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
                $data[$i]['upahlemburTambahPajak'] = $d['data']['upahlemburTambahPajak'];
                $data[$i]['upahlemburKurangPajak'] = $d['data']['upahlemburKurangPajak'];
                // echo $penghasilanbruto.' += '.$data[$i]['lembur']['upahlemburPajak'].'<br>';
                $penghasilanbruto+= $data[$i]['upahlemburTambahPajak'];
                // $penghasilannet+= $data[$i]['lembur']['upahlemburNoPajak'];

            } else {
                $data[$i]['upahlemburPajak'] = 0;
                $data[$i]['upahlemburNoPajak'] = 0;
                $data[$i]['upahlemburTambahPajak'] = 0;
                $data[$i]['upahlemburKurangPajak'] = 0;
            }
          
            $obj->upahlemburPajak = $data[$i]['upahlemburPajak'];
            $obj->upahlemburNoPajak = $data[$i]['upahlemburNoPajak'];
            $obj->totallembur =  $obj->upahlemburPajak+$obj->upahlemburNoPajak;
            $data[$i]['totallembur'] = $obj->totallembur;

            // $penerimaan = $totalUT+$totalUTT+$upahLembur;


            ///////////////////////////////////////////////////////////////////////////////////////////////
            //BENEFIT
            $benefitCmpBruto = 0;
            $benefitCmpNet = 0;
            $benefitEmpBruto = 0;
            $benefitEmpNet = 0;
            $benefitCmp = 0;
            $benefitEmp = 0;
            $benefitPengurangPajak = 0;
            $qbk = $this->db->get_where('benefitkaryawan',array('idpelamar'=>$rpeg->idpelamar));

            foreach ($qbk->result() as $rb) {
                $qbenefit = $this->db->get_where('komponenbenefit',array('idbenefit'=>$rb->idbenefit,'display'=>null));
                // echo $this->db->last_query();
                if($qbenefit->num_rows()>0)
                {
                    $rbenefit = $qbenefit->row();
                    // echo $rbenefit->namabenefit.'<br>';

                    if($rbenefit->ditanggungperusahaan=='t')
                    {
                        if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                        {
                            $k = explode(',', $rbenefit->komponenupahbenefitcmp);

                            $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);

                            $nilaiBenefit = $totalKomponen/$rbenefit->pembagibenefitcmp;
                            if($rbenefit->kenapajakcmp=='YA')
                            {                                 
                                if($rbenefit->fungsipajakcmp=='Penambah')
                                {
                                    // $benefitCmpBruto += $nilaiBenefit;  
                                    $penghasilanbruto+= $nilaiBenefit;     
                                } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                    {
                                        $benefitPengurangPajak += $nilaiBenefit;  
                                    } else {
                                            //netral
                                        }
                                        // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                 
                                                            
                            } else {
                               // $benefitCmpNet += $nilaiBenefit;   
                            }

                            $benefitCmp+=$nilaiBenefit;
                        } //if($rbenefit->jenisnilaibenefitcmp=='Komponen Upah')
                          else if($rbenefit->jenisnilaibenefitcmp=='Nilai Tetap')
                            {
                                $nilaiBenefit = $rbenefit->angkatetapbenefitcmp;

                                if($rbenefit->kenapajakcmp=='YA')
                                {
                                    // $benefitCmpBruto += $nilaiBenefit;
                                    // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';
                                    // $penghasilanbruto+= $nilaiBenefit;

                                    if($rbenefit->fungsipajakcmp=='Penambah')
                                    {
                                        // $benefitCmpBruto += $nilaiBenefit;  
                                        $penghasilanbruto+= $nilaiBenefit;     
                                    } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                        {
                                            $benefitPengurangPajak += $nilaiBenefit;  
                                        } else {
                                                //netral
                                            }                                
                                }

                                $benefitCmp+=$nilaiBenefit;
                            } else if($rbenefit->jenisnilaibenefitcmp=='Persentase')
                                {
                                        // $k = explode(',', $rbenefit->komponenupahbenefitcmp);

                                        $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitcmp,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitcmp;
                                        // exit;
                                        $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitcmp/100);

                                        if($rbenefit->kenapajakcmp=='YA')
                                        {
                                            if($rbenefit->fungsipajakcmp=='Penambah')
                                            {
                                                // $benefitCmpBruto += $nilaiBenefit;  
                                                $penghasilanbruto+= $nilaiBenefit;     
                                            } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                                {
                                                    $benefitPengurangPajak += $nilaiBenefit;  
                                                } else {
                                                        //netral
                                                    }                                   
                                        }


                                        $benefitCmp+=$nilaiBenefit;
                                }

                        // if($commit=='true')
                        // {
                        //     $dbenefithistory = array(
                        //             'idpayroll'=>$idpayroll,
                        //             'idpelamar'=>$rpeg->idpelamar,
                        //             'idbenefit'=>$rb->idbenefit,
                        //             'ditanggung'=>'perusahaan',
                        //             'nilaibenefit'=>$nilaiBenefit
                        //         );
                        //     $this->db->insert('benefithistory',$dbenefithistory);
                        // }

  // print_r($dbenefithistory);
                                 // echo $nilaiBenefit.'<br>';
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
                                 if($rbenefit->fungsipajakcmp=='Penambah')
                                    {
                                        $penghasilanbruto+= $nilaiBenefit;     
                                    } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                        {
                                            $benefitPengurangPajak += $nilaiBenefit;  
                                        } else {
                                                //netral
                                            }                                                           
                            }

                            $benefitEmp += $nilaiBenefit;

                        } //if($rbenefit->jenisnilaibenefitemp=='Komponen Upah')
                          else if($rbenefit->jenisnilaibenefitemp=='Nilai Tetap')
                            {
                                $nilaiBenefit = $rbenefit->angkatetapbenefitemp;

                                if($rbenefit->kenapajakemp=='YA')
                                {
                                   // $benefitEmpBruto += $nilaiBenefit; 
                                   // $penghasilanbruto+=$benefitEmpBruto;

                                   if($rbenefit->fungsipajakcmp=='Penambah')
                                    {
                                        $penghasilanbruto+= $nilaiBenefit;     
                                    } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                        {
                                            $benefitPengurangPajak += $nilaiBenefit;  
                                        } else {
                                                //netral
                                            }      
                                }

                                $benefitEmp += $nilaiBenefit;
                            } else if($rbenefit->jenisnilaibenefitemp=='Persentase')
                                {
                                        // $k = explode(',', $rbenefit->komponenupahbenefitemp);

                                        $totalKomponen = $this->countKomponenValue($rbenefit->komponenupahbenefitemp,$rpeg->idpelamar);
                                        // echo $totalKomponen.'*'.$rbenefit->persenbenefitemp;
                                        $nilaiBenefit = $totalKomponen*($rbenefit->persenbenefitemp/100);

                                        if($rbenefit->kenapajakemp=='YA')
                                        {
                                            // $benefitEmpBruto += $nilaiBenefit;
                                            // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>'; 
                                            // $penghasilanbruto+=$benefitEmpBruto;

                                            if($rbenefit->fungsipajakcmp=='Penambah')
                                            {
                                                $penghasilanbruto+= $nilaiBenefit;     
                                            } else if($rbenefit->fungsipajakcmp=='Pengurang')
                                                {
                                                    $benefitPengurangPajak += $nilaiBenefit;  
                                                } else {
                                                        //netral
                                                    }      
                                        }

                                        $benefitEmp += $nilaiBenefit;
                                }

                        // if($commit=='true')
                        // {
                        //     $dbenefithistory = array(
                        //             'idpayroll'=>$idpayroll,
                        //             'idpelamar'=>$rpeg->idpelamar,
                        //             'idbenefit'=>$rb->idbenefit,
                        //             'ditanggung'=>'karyawan',
                        //             'nilaibenefit'=>$nilaiBenefit
                        //         );
                        //     $this->db->insert('benefithistory',$dbenefithistory);
                        // }
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
            $data[$i]['benefitCmp'] = $benefitCmp;
            $data[$i]['benefitEmp'] = $benefitEmp;
            $obj->benefitCmp = $benefitCmp;
            $obj->benefitEmp = $benefitEmp;


            ////////////////////PENGURANG UPAH///////////////////////////        
            $qPotongan = $this->db->query("select a.idpelamar,a.idpengurangupah,b.namapengurangupah,b.kenapajak,b.fungsipajak,b.hitungpajak,b.komponenpengurang,b.jenisnilaipengurang,b.faktorpembagipengurangupah,b.angkatetappengurangupah,b.persenpengurangupah
                                            from pengurangupahkaryawan a
                                            join pengurangupah b ON a.idpengurangupah = b.idpengurangupah
                                            where (now() BETWEEN b.startdate and b.enddate) and a.idpelamar=".$rpeg->idpelamar."");

            $potonganBruto = 0;
            $potonganNet = 0;
            $nilaiPotongan = 0;
            foreach ($qPotongan->result() as $rPotongan) {
                $nilaipot = 0;
                if($rPotongan->jenisnilaipengurang=='Komponen Upah')
                        {
                            // $k = explode(',', $rPotongan->komponenupahbenefitcmp);

                            $totalKomponen = $this->countKomponenValue($rPotongan->komponenpengurang,$rpeg->idpelamar);

                            $nilaiPotongan+= $totalKomponen/$rPotongan->faktorpembagipengurangupah;
                            $nilaipot = $nilaiPotongan;
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
                                $nilaiPotongan+= $rPotongan->angkatetappengurangupah;
                                $nilaipot = $nilaiPotongan;
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
                                        $nilaiPotongan+= $totalKomponen*($rPotongan->persenpengurangupah/100);
                                        $nilaipot = $nilaiPotongan;
                                        // if($rPotongan->kenapajak=='YA')
                                        // {
                                        //     $potonganBruto += $nilaiPotongan;      
                                        //     // echo $penghasilanbruto.' += '.$nilaiBenefit.'<br>';                                      
                                        //     $penghasilanbruto+= $nilaiPotongan;                                       
                                        // } else {
                                        //     $potonganNet += $nilaiBenefit;    
                                        // }
                                }

                // if($commit=='true')
                // {
                //     $dpengurangupahhistory = array(
                //             'idpayroll'=>$idpayroll,
                //             'idpelamar'=>$rpeg->idpelamar,
                //             'idpengurangupah'=>$rPotongan->idpengurangupah,
                //             'nilai'=>$nilaipot
                //         );
                //     $this->db->insert('pengurangupahhistory',$dpengurangupahhistory);
                // }               
            }
            $obj->nilaiPotongan = $nilaiPotongan;
            $data[$i]['nilaiPotongan'] = $nilaiPotongan; 
            // echo $nilaiPotongan;
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
            
            // $totalpendapatan =  $data[$i]['totalUT']+$data[$i]['totalUTT']+$obj->totallembur+$obj->benefitCmp;
            // $data[$i]['totalpendapatan'] = $totalpendapatan;
            // $obj->totalpendapatan = $totalpendapatan;

            $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

            // $data[$i]['penerimaanbruto'] = number_format($penghasilanbrutoFinal);
            // echo $penghasilanbruto+ 327658.33;
            if($data[$i]['hitungpajak'] == 'NET')
            {
                
                // $tunjanganpajak = $this->tunjanganpajak($rpeg->idpelamar,$startdate,$enddate,$data[$i]['tglgajipertama'],$data[$i]['hitungpajak'],$data[$i]['punyanpwp'],$rpeg->tglmasuk,$nilaiptkp,$benefitCmp,$benefitEmp,$penghasilanbruto,$totalUT,$totalUTT,$rpeg->biayajabatan,$obj->totallembur,$data[$i]['masapajaksetahun'],$utPengurangPajak,$utTPengurangPajak,$data[$i]['upahlemburKurangPajak'],$benefitPengurangPajak);
                $tunjanganpajak = $tunjanganpajakTMP;
                // print_r($tunjanganpajak);
                $tunjanganpajak = explode('.', $tunjanganpajak['tunjanganpajaknew']);
    //                 echo $tunjanganpajak[0].' ';
    //                 exit;
                    $data[$i]['penerimaanbruto'] = $penghasilanbruto+$tunjanganpajak[0];
                    $data[$i]['tunjanganpajak'] = $tunjanganpajak[0];
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

                        $penghasilannet = $data[$i]['penerimaanbruto']-($benefitEmp+$data[$i]['biayajabatan'])-($utPengurangPajak+$utTPengurangPajak+$data[$i]['upahlemburKurangPajak']+$benefitPengurangPajak);
                        
                        // echo                         
                        $totalpendapatan =  $data[$i]['totalUT']+$data[$i]['totalUTT']+$obj->totallembur+$obj->benefitCmp+ $data[$i]['tunjanganpajak'];

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
                            $pkpsetahun = ceil($data[$i]['netosetahun']-$nilaiptkp);
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

                        // $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        $pphsetsebulan = $data[$i]['pphsettahun']/$obj->masapajaksetahun;

                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : ceil($pphsetsebulan);
                        $obj->pphsebulan = $data[$i]['pphsebulan'];

                        if($data[$i]['masapajaksetahun']<12)
                        {
                            $getTglTerminasiArr = explode('-', $this->getTglTerminasi($rpeg->idpelamar));
                            // echo intval($startdateArr[0]).' == '.$getTglTerminasiArr;
                            if(intval($startdateArr[0]) == intval($getTglTerminasiArr[0]))
                            {
                                $obj->pphterminasi = ceil($obj->pphsettahun/$data[$i]['masapajaksetahun']);
                            } else {
                                $obj->pphterminasi = 0;
                            }
                            
                        } else {
                            $obj->pphterminasi = 0;
                        }

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
                        // echo $data[$i]['totalpendapatan'].'-'.$data[$i]['pphsebulan'].'-'.$benefitCmp.'+'.$benefitEmp.'+'.$data[$i]['tunjanganpajak'].'+'.$nilaiPotongan;
                        // echo $data[$i]['totalpendapatan'].'-'.($benefitCmp+$benefitEmp).'-'.$data[$i]['pphsebulan'],'+'.$obj->totalUTT;
                        // $data[$i]['takehomepay'] = round(($data[$i]['totalpendapatan']-$data[$i]['pphsebulan'])-($benefitCmp+$benefitEmp+$data[$i]['tunjanganpajak']+$nilaiPotongan));
                        $data[$i]['takehomepay'] = round_up($data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan']+$obj->totalUTT);
                        $obj->takehomepay = $data[$i]['takehomepay'];

                        return $obj->takehomepay;

                        $obj->pajakjantonov = $this->pajakjantonov($data[$i]['idpelamar'],$data[$i]['pphsebulan'],$enddateArr[0]);
                        $obj->pajakterbayar = $obj->pajakjantonov-$obj->pphterminasi;
                        $obj->pajakterutangdes = $obj->pphsettahun-$obj->pajakterbayar;

                        if($data[$i]['masapajaksetahun']<12 && diffInMonths($qtglmasuk->tglmasuk,$obj->tglakhirjabatan)<12)
                        {
                            $obj->pphsebulan = $obj->tunjanganpajak ;
                            $data[$i]['pphsebulan'] = $obj->pphterminasi;
                            $obj->pajakterutangdes = $obj->tunjanganpajak;
                        }

                        //selisih pph
                        if($data[$i]['masapajaksetahun']<12 && $obj->pphterminasi>0)
                        {
                            $obj->selisihpph = $obj->pphterminasi-$obj->pajakterutangdes;
                        } else {
                            $obj->selisihpph = 0;
                        }
                        $obj->pajaktotalbayarsetahun = $obj->pajakterutangdes+$obj->pajakterbayar;

            // echo '<pre>';
            // print_r($data);
            // echo '</pre>';
            if(intval($enddateArr[1]) == 12)
            {
                //desember
                unset($obj->biayajabatan);
                unset($obj->netosetahun);
                unset($obj->pkpsetahun);
                unset($obj->pph5tahun);
                unset($obj->pph15tahun);
                unset($obj->pph25tahun);
                unset($obj->pph35tahun);
                unset($obj->pphsettahun);

                //kalo desember, set variabel berikut ke bulan november
                $qpayrolbefore = $this->db->get_where('payrolldata',array('idpelamar'=>$data[$i]['idpelamar'],'bulan'=>'11'));
                if($qpayrolbefore->num_rows()>0)
                {
                    $rqpayrolbefore = $qpayrolbefore->row();
                    $obj->pajakjantonov = $rqpayrolbefore->pajakjantonov;
                    $obj->pajakterbayar = $rqpayrolbefore->pajakterbayar;
                    $obj->pajakterutangdes = $rqpayrolbefore->pajakterutangdes;
                    $obj->pajaktotalbayarsetahun = $rqpayrolbefore->pajaktotalbayarsetahun;
                    // $obj->pajakjantonov = $rqpayrolbefore->pajakjantonov;
                }
            }

            if($commit=='true')
            {
                $datapayroll = array(
                        "idpayroll"=>$idpayroll,
                        "idpelamar"=>$data[$i]['idpelamar'],
                        "tglgaji" =>$this->tanggalWaktu(),
                        "bulan" =>$enddateArr[1],
                        "tahun" =>$enddateArr[0],
                        "startdate" =>$data[$i]['startdate'],
                        "enddate" =>$data[$i]['enddate'],
                        "namalengkap"=>$data[$i]['namalengkap'],
                        "punyanpwp"=>$data[$i]['punyanpwp'],
                        "durasi" =>$data[$i]['durasi'],
                        "hitungpajak"=>$data[$i]['hitungpajak'],
                        "masapajaksetahun"=>$data[$i]['masapajaksetahun'],
                        "selisihpph" =>$obj->selisihpph,
                        "tglgajipertama" =>$data[$i]['tglgajipertama'],
                        "masakerja" =>$data[$i]['masakerja'],
                        "tglmasuk" =>$data[$i]['tglmasuk'],
                        "nilaiptkp" =>$data[$i]['nilaiptkp'],
                        "kodeptkp" =>$data[$i]['kodeptkp'],
                        "totalut" =>$data[$i]['totalUT'],
                        "totalutt" =>$data[$i]['totalUTT'],
                        "upahlemburpajak" =>$data[$i]['upahlemburPajak'],
                        "upahlemburnopajak" =>$data[$i]['upahlemburNoPajak'],
                        "upahlemburtambahpajak" =>$data[$i]['upahlemburTambahPajak'],
                        "upahlemburkurangpajak" =>$data[$i]['upahlemburKurangPajak'],
                        "totallembur" =>$data[$i]['totallembur'],
                        // "benefitcmpbruto" =>$data[$i]['benefitCmpBruto'],
                        // "benefitcmpnet" =>$data[$i]['benefitCmpNet'],
                        // "benefitempbruto" =>$data[$i]['benefitEmpBruto'],
                        // "benefitempnet" =>$data[$i]['benefitEmpNet'],
                        "benefitcmp" =>$data[$i]['benefitCmp'],
                        "benefitemp" =>$data[$i]['benefitEmp'],
                        "numdayswork" =>$data[$i]['numdayswork'],
                        "nilaipotongan" =>$data[$i]['nilaiPotongan'],
                        "totalpendapatan" =>$data[$i]['totalpendapatan'],
                        "penerimaanbruto" =>$data[$i]['penerimaanbruto'],
                        "tunjanganpajak" =>$data[$i]['tunjanganpajak'],
                        "biayajabatan" => intval($enddateArr[1]) == 12 ? 0 : $data[$i]['biayajabatan'],
                        "penerimaannet" =>$data[$i]['penerimaannet'],
                        "netosetahun" => intval($enddateArr[1]) == 12 ? 0 : $data[$i]['netosetahun'],
                        "pkpsetahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pkpsetahun'],
                        "pph5tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph5%tahun'],
                        "pph15tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph15%tahun'],
                        "pph25tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph25%tahun'],
                        "pph35tahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pph35%tahun'],
                        "pphsettahun" =>intval($enddateArr[1]) == 12 ? 0 : $data[$i]['pphsettahun'],
                        "pphsebulan" =>$data[$i]['pphsebulan'],
                        "pajakjantonov"=>$obj->pajakjantonov,
                        "pajakterbayar"=>$obj->pajakterbayar,
                        "pajakterutangdes"=>$obj->pajakterutangdes,
                        "pajaktotalbayarsetahun"=>$obj->pajaktotalbayarsetahun,
                        "takehomepay" =>$obj->takehomepay
                    );
                $this->db->insert('payrolldata',$datapayroll);
            }

            //   if(intval($enddateArr[1]) == 12)
            // {
            //     //desember
            //     unset($obj->biayajabatan);
            //     unset($obj->netosetahun);
            //     unset($obj->pkpsetahun);
            //     unset($obj->pph5tahun);
            //     unset($obj->pph15tahun);
            //     unset($obj->pph25tahun);
            //     unset($obj->pph35tahun);
            //     unset($obj->pphsettahun);
            // }
    // echo $obj->idpelamar.' ';
            $obj->startdate = backdate2_reverse($obj->startdate);
            $obj->enddate = backdate2_reverse($obj->enddate);
            $obj->tglmasuk = backdate2_reverse($obj->tglmasuk);
            $obj->tglakhirjabatan = backdate2_reverse($obj->tglakhirjabatan);
            $obj->tglgajipertama = backdate2_reverse($obj->tglgajipertama);
            
            $arrJson[] = $obj;
            unset($obj);

            // array_push($arrJson,$obj);
            // echo 'a'.$arrJson;
// print_r($arrJson);
// exit;            
            $i++;
        }
// print_r($arrJson);
        if($commit=='true')
        {

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                echo json_encode(array('success' => false, 'message' => 'Gagal menyimpan data perhitungan upah'));
            } else {
                $this->db->trans_commit();
                echo json_encode(array('success' => true, 'message' => 'Sukses menyimpan data perhitungan upah'));
            }
        } else {
            echo '{success:true,numrow:' . $i . ',results:' . $i .',rows:' . json_encode($arrJson) . '}';
        }
            // echo '<pre>';
            // print_r($data);
            // echo '</pre>';            
    }

    function tunjanganPajakKurangSetahun($tunjanganpajak,$penghasilanbruto,$rpeg,$benefitEmp,$obj,$utPengurangPajak,$utTPengurangPajak,$upahlemburKurangPajak,$benefitPengurangPajak,$totalUT,$totalUTT,$masapajaksetahun,$nilaiptkp,$punyanpwp,$startdateArr,$enddateArr)
    {
//        echo $tunjanganpajak.'.','.'.$penghasilanbruto.','.$rpeg.','.$benefitEmp.','.$obj.','.$utPengurangPajak.','.
//                $utTPengurangPajak.','.$upahlemburKurangPajak.','.$benefitPengurangPajak.','.$totalUT.','.
//                $totalUTT.','.$masapajaksetahun.','.$nilaiptkp.','.$punyanpwp.','.$startdateArr.','.$enddateArr;
        $objx = new stdClass();
        $i=0;

        $data[$i]['punyanpwp'] = $punyanpwp;
        
        if(!isset($tunjanganpajak['tunjanganpajaknew']))
        {
            $tunjanganpajak[0] = 0;
        } else {
            $tunjanganpajak = explode('.', $tunjanganpajak['tunjanganpajaknew']);
        }


        $data[$i]['penerimaanbruto'] = $penghasilanbruto+$tunjanganpajak[0];
        $data[$i]['tunjanganpajak'] = $tunjanganpajak[0];

        $objx->penerimaanbruto =  $data[$i]['penerimaanbruto'];
        $objx->tunjanganpajak = $data[$i]['tunjanganpajak'];

            $biayajabatan = $data[$i]['penerimaanbruto']*0.05;

                        // $data[$i]['numdayswork'] = $numdayswork;
//                         echo 'biayajabatan'.$rpeg->biayajabatan;
                        if($rpeg->biayajabatan==1 || $rpeg->biayajabatan==null || $rpeg->biayajabatan==0)
                        {
                            $data[$i]['biayajabatan'] = $biayajabatan<=500000 ? $biayajabatan : 500000;
                        } else {
                            $data[$i]['biayajabatan'] = 0;
                        }
                        $objx->biayajabatan = $data[$i]['biayajabatan'];

                        $penghasilannet = $data[$i]['penerimaanbruto']-($benefitEmp+$data[$i]['biayajabatan'])-($utPengurangPajak+$utTPengurangPajak+$upahlemburKurangPajak+$benefitPengurangPajak);
                        
                        // echo                         
                        $totalpendapatan =  $totalUT+$totalUTT+$obj->totallembur+$obj->benefitCmp+ $data[$i]['tunjanganpajak'];

                        // echo '(totalpendapatan:'.$data[$i]['totalUT'].'+'.$data[$i]['totalUTT'].'+'.$data[$i]['upahlemburNoPajak'].'+'.$benefitCmpBruto.'+'.$benefitCmpNet.'+'.$tunjanganpajak.'='.$totalpendapatan.') ';

                        $data[$i]['totalpendapatan'] = $totalpendapatan;
                        $objx->totalpendapatan = $data[$i]['totalpendapatan'];

                        // $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

                        // $data[$i]['penerimaanbruto'] = $penghasilanbruto;
                        

                        $data[$i]['penerimaannet'] = $penghasilannet;
                        $objx->penerimaannet = $data[$i]['penerimaannet'];
                        $data[$i]['netosetahun'] = $penghasilannet*$masapajaksetahun;
                        $objx->netosetahun = $data[$i]['netosetahun'];
                        // echo  $netsetahun.'<'.$nilaiptkp;

                        if($data[$i]['netosetahun']<=$nilaiptkp)
                        {
                            $pkpsetahun = 0;
                        } else {    
                            $pkpsetahun = round(($data[$i]['netosetahun']-$nilaiptkp),-3);
                            // $pkpsetahun = ceil($data[$i]['netosetahun']-$nilaiptkp);
                            // $pkpsetahun = substr_replace($pkpsetahun, '000', -3);
                        }


                        $data[$i]['pkpsetahun'] = $pkpsetahun;
                        $objx->pkpsetahun = $data[$i]['pkpsetahun'];
             
                        ///////////// pph5%tahun
                        $pph5tahun = $pkpsetahun <= 50000000 ? $pkpsetahun*0.05 : 50000000*0.05;
                        $data[$i]['pph5%tahun'] = $data[$i]['punyanpwp']==1 ? $pph5tahun : $pph5tahun*1.2; 
                        $objx->pph5tahun = $data[$i]['pph5%tahun'];
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
                        $objx->pph15tahun = $data[$i]['pph15%tahun'];
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
                        $objx->pph25tahun = $data[$i]['pph25%tahun'];
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
                        $objx->pph25tahun = $data[$i]['pph30%tahun'];
                        ///////////////// pph30%tahun

                        // $data[$i]['pph30%tahun'] = ($pkpsetahun*0.30)/12;
                        $data[$i]['pph35%tahun'] = 0;
                        $objx->pph35tahun = $data[$i]['pph35%tahun'];

                        $data[$i]['pphsettahun'] = $data[$i]['pph5%tahun']+$data[$i]['pph10%tahun']+$data[$i]['pph15%tahun']+$data[$i]['pph25%tahun']+$data[$i]['pph30%tahun']+$data[$i]['pph35%tahun'];
                        $objx->pphsettahun = $data[$i]['pphsettahun'];

                        // $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        $pphsetsebulan = $data[$i]['pphsettahun'] <= 0 ? : $data[$i]['pphsettahun']/$obj->masapajaksetahun;

                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : ceil($pphsetsebulan);
                        $objx->pphsebulan = $data[$i]['pphsebulan'];

                        if($masapajaksetahun<12)
                        {
                            $getTglTerminasiArr = explode('-', $this->getTglTerminasi($rpeg->idpelamar));
                            // echo intval($startdateArr[0]).' == '.$getTglTerminasiArr;
                            if(intval($startdateArr[0]) == intval($getTglTerminasiArr[0]))
                            {
                                $objx->pphterminasi = $objx->pphsettahun <= 0 ? 0 : $objx->pphsettahun/$masapajaksetahun;
                            } else {
                                $objx->pphterminasi = 0;
                            }
                            
                        } else {
                            $objx->pphterminasi = 0;
                        }

                        $data[$i]['tunjanganpajaknew'] = $data[$i]['pphsebulan'];

                        $tunjanganpajak = $data[$i]['pphsebulan'];

                        // $data[$i]['takehomepay'] = round_up($data[$i]['totalpendapatan']-($benefitCmp+$benefitEmp)-$data[$i]['pphsebulan']+$obj->totalUTT);
                        // $objx->takehomepay = $data[$i]['takehomepay'];

                        $objx->pajakjantonov = $this->pajakjantonov($rpeg->idpelamar,$data[$i]['pphsebulan'],$enddateArr[0]);
                        $objx->pajakterbayar = $objx->pajakjantonov-$objx->pphterminasi;
                        $objx->pajakterutangdes = $objx->pphsettahun-$objx->pajakterbayar;
        return $objx->pajakterutangdes;
    }

    function tunjanganpajak($idpelamar,$startdate,$enddate,$tglgajipertama,$hitungpajak,$punyanpwp,$tglmasuk,$nilaiptkp,$benefitCmp,$benefitEmp,$penghasilanbrutoParams,$totalUT,$totalUTT,$biayajabatanstatus,$totallembur,$masapajaksetahun,$utPengurangPajak,$utTPengurangPajak,$upahlemburKurangPajak,$benefitPengurangPajak)
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

             $data[$i]['tglgajipertama'] = $tglgajipertama;
         
            $data[$i]['masakerja'] = diffInMonths($tglmasuk,$startdate);
            $data[$i]['tglmasuk'] = $tglmasuk;
            //end itung jumlah periode kerja

            //ptkp 
             $data[$i]['nilaiptkp'] = $nilaiptkp;
            // $data[$i]['kodeptkp'] = $qptkp->kodeptkp;
            // echo $data[$i]['tglgajipertama'].','.$akhirtahun;
            // $data[$i]['masapajaksetahun'] = diffInMonths($data[$i]['tglgajipertama'],$akhirtahun) > 12 ? 12 : diffInMonths($data[$i]['tglgajipertama'],$akhirtahun);
             $data[$i]['masapajaksetahun'] = $masapajaksetahun;

            $data[$i]['totalUT'] = $totalUT;

            $data[$i]['totalUTT'] = $totalUTT;

            $tunjanganpajak=0;
            // echo $masapajaksetahun.' ';
            $penghasilanbrutoOld = $penghasilanbrutoParams;
                    for($j=0;$j<$masapajaksetahun;$tunjanganpajak++) {
                       // echo $tunjanganpajak.' ';
                        if($penghasilanbruto==0)
                        {
                            $penghasilanbruto = ceil($penghasilanbrutoParams);
                        }
                        // echo ' penghasilanbruto:'.$penghasilanbruto.' tunjanganpajak:'.$tunjanganpajak.' <br>';

                        $data[$i]['tunjanganpajaknow'] = $tunjanganpajak;
                        $penghasilanbruto = ceil($penghasilanbrutoOld+$tunjanganpajak);
                        // echo 'penghasilanbruto:'.$penghasilanbruto.' ';
                        $biayajabatan = ceil($penghasilanbruto*0.05);
                        // echo $penghasilanbruto*0.05.'-'.ceil($penghasilanbruto*0.05);
                        // exit;
                        $data[$i]['numdayswork'] = $numdayswork;

                        if($biayajabatanstatus==1 || $biayajabatanstatus==null || $biayajabatanstatus==0)
                        {
                            $data[$i]['biayajabatan'] = $biayajabatan<=500000 ? $biayajabatan : 500000;
                        } else {
                            $data[$i]['biayajabatan'] = 0;
                        }

                        // $penghasilannet = $penghasilanbruto-$data[$i]['biayajabatan'];
                        $penghasilannet = ceil($penghasilanbruto-($benefitEmp+$data[$i]['biayajabatan'])-($utPengurangPajak+$utTPengurangPajak+$upahlemburKurangPajak+$benefitPengurangPajak));
                                                
                        $totalpendapatan =  ceil($data[$i]['totalUT']+$data[$i]['totalUTT']+$totallembur+$benefitCmp+$tunjanganpajak);

                        // echo '(totalpendapatan:'.$data[$i]['totalUT'].'+'.$data[$i]['totalUTT'].'+'.$data[$i]['upahlemburNoPajak'].'+'.$benefitCmpBruto.'+'.$benefitCmpNet.'+'.$tunjanganpajak.'='.$totalpendapatan.') ';

                        $data[$i]['totalpendapatan'] = $totalpendapatan;

                        $ntahun = $data[$i]['masakerja'] <=12 ? $data[$i]['masakerja'] : 12;

                        $data[$i]['penerimaanbruto'] = ceil($penghasilanbruto);
                        

                        $data[$i]['penerimaannet'] = number_format($penghasilannet);
                        $data[$i]['netosetahun'] = ceil($penghasilannet*$data[$i]['masapajaksetahun']);
                        // echo  $netsetahun.'<'.$nilaiptkp;

                        if($data[$i]['netosetahun']<=$nilaiptkp)
                        {
                            $pkpsetahun = 0;
                        } else {    
                            $pkpsetahun = round($data[$i]['netosetahun']-$nilaiptkp,-3);
                            // $pkpsetahun = ceil($data[$i]['netosetahun']-$nilaiptkp);
                            // $pkpsetahun = ceil(substr_replace($pkpsetahun, '000', -3));
                        }
                        $data[$i]['pkpsetahun'] = $pkpsetahun;
             
                        ///////////// pph5%tahun
                        $pph5tahun = $pkpsetahun <= 50000000 ? ceil($pkpsetahun*0.05) : ceil(50000000*0.05);
                        $data[$i]['pph5%tahun'] = $data[$i]['punyanpwp']==1 ? $pph5tahun : $pph5tahun*1.2; 
                        ///////////// pph5%tahun

                        $data[$i]['pph10%tahun'] = 0;

                        ///////////// pph15%tahun
                        if($pkpsetahun<=50000000)
                        {
                            $pph15tahun = 0;
                        } else if($pkpsetahun>50000000 && $pkpsetahun<250000000) {
                            $pph15tahun = ceil(($pkpsetahun-50000000)*0.15);
                        } else {
                            $pph15tahun = ceil(200000000*0.15);
                        }

                        $data[$i]['pph15%tahun'] = $data[$i]['punyanpwp']==1 ? $pph15tahun : $pph15tahun*1.2; 
                        ///////////////// pph15%tahun

                        ///////////// pph25%tahun
                        if($pkpsetahun<=250000000)
                        {
                            $pph25tahun = 0;
                        } else if($pkpsetahun>250000000 && $pkpsetahun<500000000) {
                            $pph25tahun = ceil(($pkpsetahun-250000000)*0.25);
                        } else {
                            $pph25tahun = ceil(250000000*0.25);
                        }

                        $data[$i]['pph25%tahun'] = $data[$i]['punyanpwp']==1 ? $pph25tahun : $pph25tahun*1.2; 
                        ///////////////// pph25%tahun

                        ///////////// pph30%tahun
                        if($pkpsetahun<=500000000)
                        {
                            $pph30tahun = 0;
                        } else if($pkpsetahun>500000000) {
                            $pph30tahun = ceil(($pkpsetahun-500000000)*0.30);
                        } else {
                            $pph30tahun = ceil(500000000*0.30);
                        }

                        $data[$i]['pph30%tahun'] = $data[$i]['punyanpwp']==1 ? $pph30tahun : $pph30tahun*1.2; 
                        ///////////////// pph30%tahun
                        // print_r($data[$i]);
                        // exit;

                        // $data[$i]['pph30%tahun'] = ($pkpsetahun*0.30)/12;
                        $data[$i]['pph35%tahun'] = 0;
                        $data[$i]['pphsettahun'] = ceil($data[$i]['pph5%tahun']+$data[$i]['pph10%tahun']+$data[$i]['pph15%tahun']+$data[$i]['pph25%tahun']+$data[$i]['pph30%tahun']+$data[$i]['pph35%tahun']);
                        $pphsetsebulan = $data[$i]['pphsettahun']/$data[$i]['masapajaksetahun'];
                        //echo $data[$i]['pphsettahun'].'/'.$data[$i]['masapajaksetahun'].' ';
                       // exit;

                        $data[$i]['pphsebulan'] = $pphsetsebulan<0 ? 0 : $pphsetsebulan;
                        $data[$i]['tunjanganpajaknew'] = $data[$i]['pphsebulan'];

                        $tunjanganpajak = $data[$i]['pphsebulan'];
                     
                       // $data[$i]['takehomepay'] = ceil(($data[$i]['totalpendapatan']-$data[$i]['pphsebulan'])-($benefitCmp+$benefitEmp+$tunjanganpajak));
        
                        $j++;
                    }
          

        return $data[0];
        // echo '<pre>';
        // print_r($data);
        // echo '</pre>';
        // exit;
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
            $kupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$value,'display'=>null));
            if($kupah->num_rows()>0)
            {
                $rkupah = $kupah->row();
                if($rkupah->jeniskomponen=='Upah Tetap')
                {
                    $qnilaiUpah = $this->db->get_where('upahkaryawan',array('idkomponenupah'=>$value,'idpelamar'=>$idpelamar,'display'=>null));
                    // echo $this->db->last_query();
                    if($qnilaiUpah->num_rows()>0)
                    {
                        $rqnilaiUpah = $qnilaiUpah->row();
                        $totalKomponen += $rqnilaiUpah->nilai;
                         
                    } 
                } else {
                    //upah tidak tetap
                    $qUTT = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$value,'display'=>null));
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
//                                        if($idpelamar==187)
//                                        {
//                                            echo $this->db->last_query().' ';
//                                            exit;
//                                        }
        }
        return $totalKomponen;
    }

     function importUpah2($debug=false)
    {
        $this->load->model('kompensasi/m_komponenupah');

        $config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
            $file = $this->upload->data()['full_path'];
            $orig_name = $this->upload->data()['orig_name'];
            // $file = DOCUMENTROOT."/upload/xlsx/template_upload_upah_v2.xlsx";

            require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $finfo = new finfo(); 
            $fileinfo = $finfo->file($file, FILEINFO_MIME);

              //echo $fileinfo;
            //kalo dari excelwrite ==> application/zip; charset=binary

            if($fileinfo!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=binary')
            {                
                echo json_encode(array('success' => true, 'message' =>'Format file upload salah'));
                exit;
            }

            $this->load->model('kompensasi/m_validasiupload','validasi');           

            $upah = $xlsx->rows(2);

            //identifikasi field
            $field = $upah[0];
           // print_r($upah);

            $start = 2;
            $no=1;
            while (isset($upah[$start])) {
                $d = $upah[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasi->upah2($d,$field,$no);
                    // print_r($valid);
                    if ($valid['status']) {
                        $oke = true;
                    } else {
                        $oke = false;
                        // break;
                    }
                    
                }
                $start++;
                $no++;
            }

            if ($oke) {
                $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                $idupload = $qseq->idupload;

                $payrolldata = array();
                $utdata = array();
                $uttdata = array();
                $bcdata = array();     
                $bedata = array();      
                $ptdata = array();        

                $this->db->trans_begin();
                $total=1;
                $start = 2;
                $idx = 0;
                while (isset($upah[$start])) {
                    $d = $upah[$start];

                    if($d[0]!='')
                    {
                        // print_r($d);
                        $payrolldata[$idx]['idpayroll'] = $idupload;
                       
                       
                        $i=0;
                        $idxt = 0;
                        $idxtt = 0;
                        $idxbc = 0;
                        $idxbe = 0;
                        $idxpt = 0;
                        $totalut = 0;
                        $totalutt = 0;
                        $benefitcmp = 0;
                        $benefitemp = 0;
                        foreach ($d as $key => $value) {

                            if($field[$i]=='f/2')
                            {
                                //NIK
                                $this->db->select('pelamar.idpelamar');
                                $this->db->join('calonpelamar', 'calonpelamar.idpelamar = pelamar.idpelamar');
                                $qemp = $this->db->get_where('pelamar', array('nik'=>"".$value."",'idcompany' => $this->session->userdata('idcompany'),'pelamar.display'=>null))->row();
                                $payrolldata[$idx]['idpelamar'] = $qemp->idpelamar;
                                $idpelamar = $qemp->idpelamar;
                            }   

                            if($field[$i]=='f/3')
                            {  
                                $payrolldata[$idx]['startdate'] = converttgl($value);
                            } else

                            //////////////////////////////////////
                            if($field[$i]=='f/4')
                            {  
                                $payrolldata[$idx]['enddate'] = converttgl($value);
                            } else

                             /////////////////////////////////////
                            if($field[$i]=='f/5')
                            {  
                               $payrolldata[$idx]['hitungpajak'] = $value;
                            } else

                             /////////////////////////////////////
                            if($field[$i]=='f/6')
                            {  
                               $this->db->select('nilaiptkp');
                               $qptkp = $this->db->get_where('ptkp',array('kodeptkp'=>$value))->row(); 
                               $payrolldata[$idx]['kodeptkp'] = $value;
                               $payrolldata[$idx]['nilaiptkp'] = $qptkp->nilaiptkp;
                            } else 

                            if($field[$i]=='f/7')
                            {  
                                $payrolldata[$idx]['totallembur'] = cleardot($value);
                            } else

                            if($field[$i]=='f/8')
                            {  
                                $payrolldata[$idx]['totalpendapatan'] = cleardot($value);
                            } else

                            if($field[$i]=='f/10')
                            {  
                                $payrolldata[$idx]['nilaipotongan'] = cleardot($value);
                            } else

                            if($field[$i]=='f/11')
                            {  
                                $payrolldata[$idx]['totalpendapatan'] = cleardot($value);
                            } else

                            if($field[$i]=='f/12')
                            {  
                                $payrolldata[$idx]['penerimaanbruto'] = cleardot($value);
                            } else

                            if($field[$i]=='f/13')
                            {  
                                $payrolldata[$idx]['tunjanganpajak'] = cleardot($value);
                            } else

                            if($field[$i]=='f/14')
                            {  
                                $payrolldata[$idx]['biayajabatan'] = cleardot($value);
                            } else

                            if($field[$i]=='f/15')
                            {  
                                $payrolldata[$idx]['penerimaannet'] = cleardot($value);
                            } else

                            if($field[$i]=='f/16')
                            {  
                                $payrolldata[$idx]['netosetahun'] = cleardot($value);
                            } else

                            if($field[$i]=='f/17')
                            {  
                                $payrolldata[$idx]['pkpsetahun'] = cleardot($value);
                            } else

                            if($field[$i]=='f/18')
                            {  
                                $payrolldata[$idx]['pphsettahun'] = cleardot($value);
                            } else

                            if($field[$i]=='f/19')
                            {  
                                $payrolldata[$idx]['pphsebulan'] = cleardot($value);
                            } else

                            if($field[$i]=='f/20')
                            {  
                                $payrolldata[$idx]['takehomepay'] = cleardot($value);
                            } else {
                                
                                $fkArr = explode('/', $field[$i]);

                                if($fkArr[0]=='ut')
                                {
                                    // echo  $field[$i].'<br>';
                                    //upah tetap
                                    if($value!='' || $value!=null)
                                    {
                                        $utdata[$idx][$idxt]['idpayroll'] = $idupload;
                                        $utdata[$idx][$idxt]['idupahkaryawan'] = $fkArr[1];
                                        $utdata[$idx][$idxt]['nilai'] = cleardot($value);
                                        $utdata[$idx][$idxt]['jenisupah'] = 'tetap';
                                        $utdata[$idx][$idxt]['idpelamar'] = $idpelamar;
                                        $idxt++;
                                        $totalut+=cleardot($value);
                                    }
                                } else if($fkArr[0]=='utt')
                                    {
                                        //upah tidak tetap
                                        if($value!='' || $value!=null)
                                        {
                                            $uttdata[$idx][$idxtt]['idpayroll'] = $idupload;
                                            $uttdata[$idx][$idxtt]['idupahkaryawan'] = $fkArr[1];
                                            $uttdata[$idx][$idxtt]['nilai'] = cleardot($value);
                                            $uttdata[$idx][$idxtt]['jenisupah'] = 'tidaktetap';
                                            $uttdata[$idx][$idxtt]['idpelamar'] = $idpelamar;
                                            $totalutt+=cleardot($value);
                                            $idxtt++;
                                        }
                                    } else if($fkArr[0]=='bc')
                                        {
                                            //benefit perusahaan      
                                             if($value!='' || $value!=null)
                                            {                                      
                                                $bcdata[$idx][$idxbc]['idpayroll'] = $idupload;
                                                $bcdata[$idx][$idxbc]['idbenefit'] = $fkArr[1];
                                                $bcdata[$idx][$idxbc]['nilaibenefit'] = cleardot($value);
                                                $bcdata[$idx][$idxbc]['ditanggung'] = 'perusahaan';
                                                $bcdata[$idx][$idxbc]['idpelamar'] = $idpelamar;
                                                $benefitcmp+=cleardot($value);
                                                $idxbc++;
                                            }
                                        } else if($fkArr[0]=='be')
                                            {
                                                //benefit karyawan    
                                                if($value!='' || $value!=null)
                                                {                                        
                                                    $bedata[$idx][$idxbe]['idpayroll'] = $idupload;
                                                    $bedata[$idx][$idxbe]['idbenefit'] = $fkArr[1];
                                                    $bedata[$idx][$idxbe]['nilaibenefit'] = cleardot($value);
                                                    $bedata[$idx][$idxbe]['ditanggung'] = 'karyawan';
                                                    $bedata[$idx][$idxbe]['idpelamar'] = $idpelamar;                                                    
                                                    $benefitemp+=cleardot($value);
                                                    $idxbe++;
                                                }
                                            } else if($fkArr[0]=='p')
                                                {
                                                    //potongan        
                                                    if($value!='' || $value!=null)
                                                    {                          
                                                        $ptdata[$idx][$idxpt]['idpayroll'] = $idupload;
                                                        $ptdata[$idx][$idxpt]['idpengurangupah'] = $fkArr[1];
                                                        $ptdata[$idx][$idxpt]['nilai'] = cleardot($value);
                                                        $ptdata[$idx][$idxpt]['idpelamar'] = $idpelamar;
                                                        $idxpt++;
                                                    }
                                                }
                                // $idxx++;
                            }


                            $i++;
                            
                        } //foreach ($d as $key => $value)


                        $payrolldata[$idx]['totalut'] = $totalut;
                        $payrolldata[$idx]['totalutt'] = $totalutt;
                        $payrolldata[$idx]['benefitcmp'] = $benefitcmp;
                        $payrolldata[$idx]['benefitemp'] = $benefitemp;

                        // print_r($d);
                        $total++;
                    }
                    $idx++;
                    $start++;
                } 

                // print_r($payrolldata);
                // print_r($utdata);
                // print_r($uttdata);
                // print_r($bcdata);
                // print_r($bedata);
                // print_r($ptdata);
            } else {
                echo json_encode($valid);
                exit;
            }

            //insert ke database
            if($debug==false)
            {
                        $this->db->insert('payroll',array(
                            "idpayroll" => $idupload,
                            "namefile" => $orig_name,
                            "idcompany"  => $this->session->userdata('idcompany'),
                            "tanggal" => gmdate('Y-m-d'),
                            // "startdate" date,
                            // "enddate" date,
                            "userin" => $this->session->userdata('username'),
                            "datein" => $this->tanggalWaktu()
                        ));
            }

            $total=1;
            $idx=0;
            foreach ($payrolldata as $key => $value) {
                 
                 $date = explode('-', $value['startdate']);

                 $this->db->select('namalengkap,punyanpwp');
                 $qpeg = $this->db->get_where('pelamar',array('idpelamar'=>$value['idpelamar']))->row();
                 $tglgajipertama = $this->m_komponenupah->getFirstPayroll($value['idpelamar'],$value['startdate']);
                 $dpayroll = array(
                    "idpayroll" =>  $idupload,
                    "idpelamar" => $value['idpelamar'],
                    "bulan"  => $date[1],
                    "tahun"  => $date[0],
                    "tglgaji" => gmdate('Y-m-d'),
                    "startdate" => $value['startdate'],
                    "enddate" => $value['enddate'],
                    "namalengkap"  => $qpeg->namalengkap,
                    "punyanpwp" => $qpeg->punyanpwp,
                    // "durasi" => ,
                    "hitungpajak" => $value['hitungpajak'],
                    "tglgajipertama" => $tglgajipertama,
                    "masakerja" => $this->m_komponenupah->getMasaKerja($value['idpelamar'],$value['startdate']),
                    // "tglmasuk" => ,
                    "nilaiptkp"  => $value['nilaiptkp'],
                    "kodeptkp"  => $value['kodeptkp'],
                    "totalut" => $value['totalut'],
                    // "upahlemburpajak" => ,
                    // "upahlemburnopajak" => ,
                    // "upahlemburtambahpajak" => ,
                    // "upahlemburkurangpajak" => ,
                    "totallembur" => $value['totallembur'],
                    // "benefitcmpbruto" => ,
                    // "benefitcmpnet" => ,
                    // "benefitempbruto" => ,
                    // "benefitempnet" => ,
                    "benefitcmp" => $value['benefitcmp'],
                    "benefitemp" => $value['benefitemp'],
                    // "numdayswork" => ,
                    "nilaipotongan" => $value['nilaipotongan'],
                    "totalpendapatan" => $value['totalpendapatan'],
                    "penerimaanbruto" => $value['penerimaanbruto'],
                    "tunjanganpajak" => $value['tunjanganpajak'],
                    "biayajabatan" => $value['biayajabatan'],
                    "penerimaannet" => $value['penerimaannet'],
                    "netosetahun" => $value['netosetahun'],
                    "pkpsetahun" => $value['pkpsetahun'],
                    // "pph5tahun" => ,
                    // "pph15tahun" => ,
                    // "pph25tahun" => ,
                    // "pph35tahun" => ,
                    "pphsettahun" => $value['pphsettahun'],
                    "pphsebulan" => $value['pphsebulan'],
                    "takehomepay" => $value['takehomepay'],
                    "masapajaksetahun" => $this->m_komponenupah->getMasaPajakSetahun($value['startdate'],$tglgajipertama),
                    "totalutt" => $value['totalutt'],
                    "upload" => true
                );

                if($debug==false)
                {
                    $this->db->insert('payrolldata',$dpayroll);
                } else {
                    print_r($dpayroll);
                }

                 //upah tetap
                if(isset($utdata[$idx]))
                {
                    foreach ($utdata[$idx] as $key => $value) {
                        $dut = array(
                            "idupahkaryawan" => $value['idupahkaryawan'],
                            "nilai" => $value['nilai'],
                            "idpayroll" => $idupload,
                            "jenisupah" => $value['jenisupah'],
                            "idpelamar" => $value['idpelamar']
                        );

                        if($debug==false)
                        {
                            $this->db->insert('upahhistory',$dut);
                        }
                    }
                }

                    //upah tidak tetap
                if(isset($uttdata[$idx]))
                {
                    foreach ($uttdata[$idx] as $key => $value) {
                        $dutt = array(
                            "idupahkaryawan" => $value['idupahkaryawan'],
                            "nilai" => $value['nilai'],
                            "idpayroll" => $idupload,
                            "jenisupah" => $value['jenisupah'],
                            "idpelamar" => $value['idpelamar']
                        );

                        if($debug==false)
                        {
                            $this->db->insert('upahhistory',$dutt);
                        }
                    }
                }

                    //benefit perusahaan   
                if(isset($bcdata[$idx]))
                {   
                    foreach ($bcdata[$idx] as $key => $value) {
                        $db = array(
                            "idpelamar" => $value['idpelamar'],
                            "idbenefit" => $value['idbenefit'],
                            "idpayroll" => $value['idpayroll'],
                            "ditanggung" => $value['ditanggung'],
                            "nilaibenefit" => $value['nilaibenefit']
                        );

                        if($debug==false)
                        {
                            $this->db->insert('benefithistory',$db);
                        }
                    }
                }

                    //benefit karyawan      
                if(isset($bedata[$idx]))
                {
                    foreach ($bedata[$idx] as $key => $value) {
                        $db = array(
                            "idpelamar" => $value['idpelamar'],
                            "idbenefit" => $value['idbenefit'],
                            "idpayroll" => $value['idpayroll'],
                            "ditanggung" => $value['ditanggung'],
                            "nilaibenefit" => $value['nilaibenefit']
                        );

                        if($debug==false)
                        {
                            $this->db->insert('benefithistory',$db);
                        }
                    }
                }

                //potongan   
                if(isset($ptdata[$idx]))
                {
                    foreach ($ptdata[$idx] as $key => $value) {
                        $dpt = array(
                            "idpayroll" => $value['idpayroll'],
                            "idpengurangupah" => $value['idpengurangupah'],
                            "nilai" => $value['nilai'],
                            "idpelamar" => $value['idpelamar']
                        );

                        if($debug==false)
                        {
                            $this->db->insert('pengurangupahhistory',$dpt);
                        }
                    }
                }


                $total++;
                $idx++;
            }

           
           
            $total-=1;
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                echo json_encode(array('success' => false, 'message' => $total . ' Data Pengupahan Gagal Diimport.'));
            } else {
                $this->db->trans_commit();
//                     $this->db->trans_rollback();
                echo json_encode(array('success' => true, 'message' => $total . ' Data Pengupahan Berhasil Diimport.'));
            }
        }
    }

    function importUpah()
    {
        $config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
            $file = $this->upload->data()['full_path'];
            $orig_name = $this->upload->data()['orig_name'];

            require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $finfo = new finfo(); 
            $fileinfo = $finfo->file($file, FILEINFO_MIME);
            
            //echo $fileinfo;
            //kalo dari excelwrite ==> application/zip; charset=binary

            if($fileinfo!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=binary')
            {                
                echo json_encode(array('success' => true, 'message' =>'Format file upload salah'));
                exit;
            }

            //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=binary

            $this->load->model('kompensasi/m_validasiupload','validasi');           

            $upah = $xlsx->rows(2);
            $upaht = $xlsx->rows(3);
            $upahtt = $xlsx->rows(4);
            $benefit = $xlsx->rows(5);
            $pengurang = $xlsx->rows(6);
            
            $oke = true;

            ///////////////////////////////UPAH / SHEET 1/////////////////////////////
            $start = 2;
            while (isset($upah[$start])) {
                $d = $upah[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasi->upah($d);
                    if ($valid['status']) {
                        $oke = true;
                    } else {
                        $oke = false;
                        break;
                    }
                    
                }
                $start++;
            }

            ///////////////////////////////UPAH TETAP/ SHEET 2/////////////////////////////
            $statusUT = false;
            $validUT = null;
            $start = 2;
            $adaUT = false;
            while (isset($upaht[$start])) {
                $d = $upaht[$start];
                if($d['0']!='' || $d['0']!=null)
                {
                    $adaUT=true;
                    $validUT = $this->validasi->upahT($d);
                    if ($validUT['status']) {
                        $statusUT = true;
                    } else {
                        break;
                    }                   
                }
                $start++;
            }

            if(!$statusUT && $adaUT==true)
            {
                //tampilin error di sheet upah teteap
                 echo json_encode($validUT);
                 exit;
            }


            ///////////////////////////////UPAH TIDAK TETAP/ SHEET 3/////////////////////////////
            $statusUTT = false;
            $validUTT = null;
            $start = 2;
            $adaUTT = false;
            while (isset($upahtt[$start])) {
                $d = $upahtt[$start];
                if($d['0']!='' || $d['0']!=null)
                {
                    $adaUTT=true;
                    $validUTT = $this->validasi->upahTT($d);
                    if ($validUTT['status']) {
                        $statusUTT = true;
                    } else {
                        break;
                    }                   
                }
                $start++;
            }
            if(!$statusUTT && $adaUTT==true)
            {
                //tampilin error di sheet upah tidak teteap
                 echo json_encode($validUTT);
                 exit;
            }

             ///////////////////////////////BENEFIT/ SHEET 3/////////////////////////////
            $statusB = false;
            $validB = null;
            $start = 2;
            $adaB = false;
            while (isset($benefit[$start])) {
                $d = $benefit[$start];
                if($d['0']!='' || $d['0']!=null)
                {
                    $adaB=true;
                    $validB = $this->validasi->benefit($d);
                    if ($validB['status']) {
                        $statusB = true;
                    } else {
                        break;
                    }                   
                }
                $start++;
            }
            if(!$statusB && $adaB==true)
            {
                //tampilin error di sheet upah tidak teteap
                 echo json_encode($validB);
                 exit;
            }



            



            if ($oke) {
                // $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                // $idupload = $qseq->idupload;

                $this->db->trans_begin();
               
                $total = 0;

                ////////////UPAH / sheet 1///////////////
                $start = 2;
                while (isset($upah[$start])) {
                    $d = $upah[$start];
                    if($d['0']!='')
                    {
                        print_r($d);
                        $start++;
                        $total++;
                    }
                } 

                //insert UT / sheet 2
                if($statusUT==true && $adaUT==true)
                {
                    $start = 2;
                    while (isset($upaht[$start])) {
                        $d = $upaht[$start];
                        if($d['0']!='')
                        {
                            print_r($d);
                            $start++;
                        }
                    }
                } 

                //insert UTT / sheet 3
                if($statusUTT==true && $adaUTT==true)
                {
                    $start = 2;
                    while (isset($upahtt[$start])) {
                        $d = $upahtt[$start];
                        if($d['0']!='')
                        {
                            print_r($d);
                            $start++;
                        }
                    }
                } 

                //insert BENEFIT / sheet 4
                if($statusB==true && $adaB==true)
                {
                    $start = 2;
                    while (isset($benefit[$start])) {
                        $d = $benefit[$start];
                        if($d['0']!='')
                        {
                            print_r($d);
                            $start++;
                        }
                    }
                } 


                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $total . ' Data Pengupahan Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $total . ' Data Pengupahan Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
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

   function tescurl()
   {
    $submit_url = "http://118.97.69.173:7777/kloter?year=1435&embarkasi=BTH&kloter=1"; 

    $curl = curl_init(); 

    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC ) ; 
    curl_setopt($curl, CURLOPT_USERPWD, "saudia:saudi#ws#2015"); 
//    curl_setopt($curl, CURLOPT_SSLVERSION,3); 
//    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); 
//    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2); 
    curl_setopt($curl, CURLOPT_HEADER, true); 
//    curl_setopt($curl, CURLOPT_POST, true); 
    //curl_setopt($curl, CURLOPT_POSTFIELDS, $params ); 
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
    curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"); 
    curl_setopt($curl, CURLOPT_URL, $submit_url); 
    $curldata = curl_exec($curl);
//echo $curldata;

//$data = "123_String";    
$dataparsed = substr($curldata, strpos($curldata, "?>") - 36);    

//    $data = explode("text/html", $curldata ); 
  //  $temp = explode("\r\n", $data[1]) ; 

    //$result = unserialize( $temp[2] ) ; 

    //print_r($result); 

   libxml_use_internal_errors(true);
   $data = simplexml_load_string($dataparsed);
   if (!$data) {
       echo "Error loading XML\n";
       foreach(libxml_get_errors() as $error) {
           echo "\t", $error->message;
       }
   } else {
      print_r($data);
   }

    curl_close($curl); 
   }

   function xlsxwriter($idcompany)
   {
        require_once(DOCUMENTROOT."/assets/libs/PHPXLSXWriter/xlsxwriter.class.php");

        $ketentuan = array(  
             array('KETENTUAN :'),
             array('1. Mengikuti urutan kolom yang telah ditentukan'),
             array('2. Format tanggal pada periode upah awal dan akhir adalah dd.mm.yyyy. Contoh: 01.09.2015'),
             array('3. Pastikan seluruh Format di setiap Cell adalah text'),
             array('4. Simpan file template pengupahan ini ke dalam format/ekstension .xlsx (Excel Workbook)'),
             array('5. Jika terdapat pecahan pada nilai pengupahan, gunakan separator comma (,)'),
        );

        $data2[1] = array('NO','Kode NIK','Periode Upah Awal','Periode Upah Akhir','Jenis PPH','Kode PTKP');
        $no=1;
        foreach ($data2[1] as $key => $value) {
            $data2[0][] = 'f/'.$no;
            $no++;
        }

        //UT
         //komponen UT
        $qut = $this->db->query("select idkomponenupah,namakomponen
                                    from komponenupah
                                    where jeniskomponen='Upah Tetap' and idcompany=$idcompany and display is null");
        if($qut->num_rows()>0)
        {
            $arrUT = array();
            foreach ($qut->result() as $r) {
                // $arrUT[] = ucwords(strtolower($r->namakomponen));
                array_push($data2[1], ucwords(strtolower($r->namakomponen)));
                $data2[0][] = 'ut/'.$r->idkomponenupah;
            }
        }
        //end UT

        //UTT
        //komponen UTT
        $qut = $this->db->query("select idkomponenupah,namakomponen
                                    from komponenupah
                                    where jeniskomponen='Upah Tidak Tetap' and idcompany=$idcompany and display is null");
        if($qut->num_rows()>0)
        {
            $arrUT = array();
            foreach ($qut->result() as $r) {
                // $arrUT[] = ucwords(strtolower($r->namakomponen));
                array_push($data2[1], ucwords(strtolower($r->namakomponen)));
                $data2[0][] = 'utt/'.$r->idkomponenupah;
            }
        }
        //end UTT

        array_push($data2[1],'Upah Lembur');
         $data2[0][] = 'f/7';

        //BENEFIT PERUSAHAAN
        $qbenefitC = $this->db->query("select idbenefit,namabenefit
                                        from komponenbenefit
                                        where idcompany=$idcompany and display is null and ditanggungperusahaan='t'");
        if($qbenefitC->num_rows()>0)
        {
            foreach ($qbenefitC->result() as $r) {
                array_push($data2[1], ucwords(strtolower($r->namabenefit)).' Perusahaan');
                $data2[0][] = 'bc/'.$r->idbenefit;
            }
        }
        //end UTT


        array_push($data2[1],'Total Pendapatan Benefit');
        $data2[0][] = 'f/8';

         //BENEFIT KARYAWAN
        $qbenefitC = $this->db->query("select idbenefit,namabenefit
                                        from komponenbenefit
                                        where idcompany=$idcompany and display is null and ditanggungkaryawan='t'");
        if($qbenefitC->num_rows()>0)
        {
            foreach ($qbenefitC->result() as $r) {
                array_push($data2[1], ucwords(strtolower($r->namabenefit)).' Karyawan');
                $data2[0][] = 'be/'.$r->idbenefit;
            }
        }
        //end 

        array_push($data2[1],'Total Potongan Benefit');
        $data2[0][] = 'f/9';

        //potongan
        $qpotongan = $this->db->query("select idpengurangupah,namapengurangupah
                                    from pengurangupah
                                    where idcompany=$idcompany and display is null");
        if($qpotongan->num_rows()>0)
        {
            foreach ($qpotongan->result() as $r) {
                array_push($data2[1], ucwords(strtolower($r->namapengurangupah)));
                $data2[0][] = 'p/'.$r->idpengurangupah;
            }
        }
        array_push($data2[1],'Total Potongan Lain');
        $data2[0][] = 'f/10';
        
        $f = ['Total Pendapatan','Penerimaan Bruto','Tunjangan Pajak','Biaya Jabatan','Penerimaan Net','Neto Setahun',
                    'PKP Setahun', 'PPH Setahun','PPH Sebulan','Take Home Pay'];

        foreach ($f as $key => $value) {
            array_push($data2[1],$value);
        }

        $data2[0][] = 'f/11';
        $data2[0][] = 'f/12';
        $data2[0][] = 'f/13';
        $data2[0][] = 'f/14';
        $data2[0][] = 'f/15';
        $data2[0][] = 'f/16';
        $data2[0][] = 'f/17';
        $data2[0][] = 'f/18';
        $data2[0][] = 'f/19';
        $data2[0][] = 'f/20';

        // foreach ($data2[1] as $key => $value) {
        //     $data2[0][] = '-';
        //     $i++;
        // }
        rsort($data2);
        //  print_r($data2);
        // echo $i;
        $writer = new XLSXWriter();
        $writer->setAuthor('NATADAYA');
        $writer->writeSheet($ketentuan,'KETENTUAN');
        $writer->writeSheet($data2,'PENGUPAHAN');
        // echo $writer->writeToString();
        
        // header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=binary');
        header('Content-Disposition: attachment;filename="template_upload_upah.xlsx"');
        $writer->writeToStdOut();//like echo $writer->writeToString();
   }

   function importupahtt()
   {
        $config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
            $file = $this->upload->data()['full_path'];
            $orig_name = $this->upload->data()['orig_name'];

            require_once "application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);


            $start = 1;
            while (isset($val[$start])) {
                // unset($idpelamar);
                $d = $val[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasiImportUTT($d);
                    // exit;
                    // print_r($valid);
                    // echo '<hr>';
                    // exit;
                    
                   
                    if ($valid['status']) {
                        $idpelamar = $valid['idpelamar'];
                        // echo $idpelamar.' ';
                        $oke = 'true';
                        // $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                        // $idupload = $qseq->idupload;
                    } else {
                        $oke = 'false';
                        break;
                    }
                    $start++;
                }
            }
            // echo $oke;
             // exit;

            if ($oke=='true') {
                $this->db->trans_begin();

                $start = 1;

                $total = 0;
                while (isset($val[$start])) {

                    $d = $val[$start];
                    if($d['0']!='')
                    {
                         // $qnik = $this->db->get_where('calonpelamar',array('nik'=>$d[1]))->row();
                         $sd = explode('.', $d[4]);
                         $nd = explode('.', $d[5]);

                         $idpelamar = $this->getIdPelamar($d);

                         $data = array(
                                "idpelamar" => $idpelamar,
                                "startdate" => $sd[2].'-'.$sd[1].'-'.$sd[0],
                                "enddate" => $nd[2].'-'.$nd[1].'-'.$nd[0],
                                // "jenisupah" => $d[2],
                                "masukpajak" => $d[6],
                                "fungsipajak" => $d[7],
                                "nominal" => str_replace('.', '', $d[8]),
                                "datein" => $this->tanggalWaktu(),
                                "userin" => $this->session->userdata('username')
                            );

                        $this->db->insert('upload_upahtt',$data);
                        $start++;
                    }
                }

                $start-=1;
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $start . ' Upah Tidak Tetap Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $start . ' Upah Tidak Tetap Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
   }

   function validasiImportUTT($d,$update=false)
   {
        $status = true;
        $idpelamar = null;
      
        $message = 'valid';

        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': NIK tidak boleh kosong';
        }  else {
            $code = $d['1'];
            $tgl = date('Y-m-d');
            $qemp = $this->db->query("select g.nik,a.idpelamar
                                    from pelamar a
                                    LEFT JOIN
                                    (
                                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                                        FROM pekerjaan
                                        WHERE statuspergerakan='Disetujui'
                                        GROUP BY idpelamar
                                    ) as x ON a.idpelamar = x.idpelamar
                                    left join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                                    join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                                    LEFT JOIN
                                    (
                                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                                        FROM pekerjaan
                                        WHERE statuspergerakan='Disetujui'
                                        GROUP BY idpelamar
                                    ) as xx ON a.idpelamar = xx.idpelamar
                                    left join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan                    
                                    LEFT join (select nik,idpelamar,statuscalon 
                                                    from calonpelamar
                                                    where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                                    LEFT join sextype c ON a.idsex = c.idsex
                                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                                    left join company f ON a.idcompany = f.idcompany  
                                    left join calonpelamar g ON a.idpelamar = g.idpelamar
                                    WHERE TRUE AND a.display is null and ('".$tgl."' between aa.tglmasuk and aa.tglberakhir OR '".$tgl."' between aaa.tglmasuk and aaa.tglberakhir)  ".$this->m_data->whereCompany()."
                                    AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null) AND bb.idpergerakan!=128 and g.nik='".$code."'");
            if($qemp->num_rows()>0)
            {
                $remp = $qemp->row();
                $idpelamar = $remp->idpelamar;

                // echo $this->db->last_query();
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': NIK tidak ada di dalam database ';
            }
        }

         ///////////////////////////////////////
        if($d['2']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Komponen Upah tidak boleh kosong';
        } else {
            $qemp = $this->db->query("select kodekomponen from komponenupah a WHERE TRUE 
                                     ".$this->m_data->whereCompany()." AND kodekomponen = '".str_replace(' ', '', $d['2'])."' ");
             if($qemp->num_rows()>0)
            {

            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Komponen Upah tidak ada di dalam database ';
            }
        }


         ///////////////////////////////////////
        // if($d['3']=='')
        // {
        //     $status = false;
        //     $message = 'Error data NO ' . $d['0'] . ': Kode Jenis Upah tidak boleh kosong <br><br>Petunjuk: 1. Tahunan 2. Bulanan';
        // } 
        // else {
        //     $c = intval($d['3']);
        //    if($c!=1 && $c!=2)
        //    {
        //         $status = false;
        //         $message = 'Error data NO ' . $d['0'] . ': Kode Jenis Upah salah ';
        //    }
        // }

        /////////////////////////////////////////
        if($d['4']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Mulai tidak boleh kosong';
        } else {
            $valid = validasitgl($d['0'],'Tanggal Mulai',$d['4']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message'];
            }
        }

        /////////////////////////////////////////
        if($d['5']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Akhir tidak boleh kosong';
        } else {
            $valid = validasitgl($d['0'],'Tanggal Mulai',$d['5']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['5'];
            }
        }

        /////////////////////////////////////////
        if($d['6']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kolom Masuk Pajak tidak boleh kosong';
        } else {
            $v = strtoupper($d['6']);
            if($v!='YA' && $v!='TIDAK')
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Pengisian Kolom Masuk Pajak Salah';
            }
            
        }

        /////////////////////////////////////////
        if($d['7']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Fungsi Pajak tidak boleh kosong';
        } else {
            $v = intval($d['7']);
            if($v!=1 && $v!=2 && $v!=3)
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Fungsi Pajak Salah<br><br>Petunjuk:<br>1.Penambah<br>2.Pengurang<br>3.Netral';
            }
        }

        /////////////////////////////////////////
        if($d['8']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Nominal tidak boleh kosong';
        }
       
        return array('status' => $status, 'message' => $message,'idpelamar'=>$idpelamar);
   }

   function getIdPelamar($d)
   {
            $code = $d['1'];
            $tgl = date('Y-m-d');
            $qemp = $this->db->query("select g.nik,a.idpelamar
                                    from pelamar a
                                    LEFT JOIN
                                    (
                                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                                        FROM pekerjaan
                                        WHERE statuspergerakan='Disetujui'
                                        GROUP BY idpelamar
                                    ) as x ON a.idpelamar = x.idpelamar
                                    left join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                                    join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                                    LEFT JOIN
                                    (
                                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                                        FROM pekerjaan
                                        WHERE statuspergerakan='Disetujui'
                                        GROUP BY idpelamar
                                    ) as xx ON a.idpelamar = xx.idpelamar
                                    left join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan                    
                                    LEFT join (select nik,idpelamar,statuscalon 
                                                    from calonpelamar
                                                    where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                                    LEFT join sextype c ON a.idsex = c.idsex
                                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                                    left join company f ON a.idcompany = f.idcompany  
                                    left join calonpelamar g ON a.idpelamar = g.idpelamar
                                    WHERE TRUE AND a.display is null and ('".$tgl."' between aa.tglmasuk and aa.tglberakhir OR '".$tgl."' between aaa.tglmasuk and aaa.tglberakhir)  ".$this->m_data->whereCompany()."
                                    AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null) AND bb.idpergerakan!=128 and g.nik='".$code."'");
       $remp = $qemp->row();
       return $remp->idpelamar;
   }

   function hapus_upload_upahtt()
   {
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where('upload_upahtt_id',$id);
            $this->db->delete('upload_upahtt');
        }
    // echo $this->input->post('postdata');
   }

   function tesitunglembur()
   {
        // $totallembur = 's';
   }

   function max_plafon_benefit($idbenefit,$amount,$type)
   {
        $q = $this->db->get_where('komponenbenefit',array('idbenefit'=>$idbenefit))->row();
        
        if($type=='employee')
        {

            if($q->maxplafonemp!=null && intval($q->maxplafonemp) != 0)
            {
               // echo $amount.'>'.$q->maxplafonemp;

                if($amount>$q->maxplafonemp)
                {

                    return $q->maxplafonemp;
                } else {
                    return $amount;
                }
            } else {
                return $amount;
            }
        } else {    
            //company
            if($q->maxplafoncmp!=null && intval($q->maxplafoncmp) != 0)
            {
                if($amount>$q->maxplafoncmp)
                {
                    return $q->maxplafoncmp;
                } else {
                    return $amount;
                }
            } else {
                return $amount;
            }
        }

   }

   function akum_bruto($idpelamar,$bruto)
   {
        $q = $this->db->query("select sum(penerimaanbruto_total) from 
            payrolldata
            where idpelamar  = $idpelamar");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            return $r->sum+$bruto;
        } else {
            return 0;
        }
   }

   function akum_uttm($idpelamar,$utttahun=0,$startdate,$enddate,$idcompany,$bulan)
   {
    //akumulasi upah tidak tetap tahunan
        // $q = $this->db->query("select sum(totalutt) from 
        //     payrolldata
        //     where idpelamar  = $idpelamar");
        // if($q->num_rows()>0)
        // {
        //     $r = $q->row();
        //     return $r->sum;
        // } else {
        //     return 0;
        // }
    // $sql = "select sum(a.nilai)
    //         from upahhistoryx a
    //         join payroll b ON a.idpayroll = b.idpayroll
    //         join upahkaryawan c ON a.idupahkaryawan = a.idupahkaryawan
    //         where a.idpelamar  = $idpelamar and jenisupah = 'tidaktetap' 
    //         AND c.idkomponenupah IN (select idkomponenupah
    //                     from komponenupah
    //                     where jeniskomponen = 'Upah Tidak Tetap' and jangkawaktu = 'Tahunan')
    //         AND (b.startdate between '$startdate' and '$enddate')";

        $sql = "select sum(nilai)
                from (
                    select a.idpayroll,a.nilai,a.idpelamar,a.idupahkaryawan
                    from upahhistory a
                    join upahkaryawan b ON a .idupahkaryawan = b .idupahkaryawan
                    join komponenupah c ON b.idkomponenupah = c.idkomponenupah
                    where a.jenisupah = 'tidaktetap' and a.idpelamar = $idpelamar
                    and c.jeniskomponen = 'Upah Tidak Tetap' and c.jangkawaktu = 'Tahunan'
                    and a.idpayroll IN (select a.idpayroll
                                        from (select idpayroll from payroll
                                                where startdate between '$startdate'
                                                and '$enddate' and idcompany = $idcompany) a) 
                                        ) a";

        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if(intval($bulan)==12)
            {
//                 if($idpelamar==257)
// {
//     echo $utttahun;
// }

                return $r->sum == null ? $utttahun : $r->sum+$utttahun;
            } else {
                return $r->sum == null ? $utttahun : $r->sum;
            }
            
        } else {
            return 0;
        }
   }

   function akum_tunjpajak($idpelamar,$pajak)
   {
     $q = $this->db->query("select sum(tunjanganpajak) from 
            payrolldata
            where idpelamar  = $idpelamar");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            return $r->sum+$pajak;
        } else {
            return 0;
        }
   }

   function akum_benefit_kary($idpelamar,$benf)
   {
     $q = $this->db->query("select sum(benefitemp) from 
            payrolldata
            where idpelamar  = $idpelamar");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            return $r->sum+$benf;
        } else {
            return 0;
        }
   }

   function pph_setahun($pkpsetahun,$punyanpwp)
    {
  /*       =IF(
    BZ8<50000001,
    BZ8*5%,
        IF(
            BZ8<250000001,
            2500000+((BZ8-50000000)*15%),
            IF(
                BZ8<500000001,
                2500000+30000000+((BZ8-250000000)*25%),
                2500000+30000000+62500000+((BZ8-500000000)*30%)
            )
        )
    )
    */

    if($pkpsetahun<50000001)
    {
        $pph = $pkpsetahun*0.05;
    } else if($pkpsetahun>50000001 && $pkpsetahun<250000001)
        {
            $pph = 2500000+(($pkpsetahun-50000000)*0.15);
        } else if($pkpsetahun>250000001 && $pkpsetahun<500000001)
            {
               $pph = 2500000+30000000+(($pkpsetahun-250000000)*0.25);    
            } else {
                    $pph = 2500000+30000000+62500000+(($pkpsetahun-500000000)*0.30);
            }

            return $punyanpwp == 1 ? $pph : $pph*(120/100);
    }

    function pajakterutangdes($idpelamar,$tahun)
    {
        $q = $this->db->query("select pajakterutangdes from 
            payrolldata
            where idpelamar = $idpelamar and tahun = '$tahun' and bulan = '11'");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            return $r->pajakterutangdes;
        } else {
            return 0;
        }
    }

    function tanggal_masuk($idpelamar,$startdate,$enddate)
    {
        $qDetectTglMasuk = $this->db->query("select
                                                a.tglmasuk
                                            from
                                                pekerjaan a
                                            join pergerakanpersonil b ON a .idpergerakanpersonil = b.idpergerakanpersonil
                                            where
                                                a .idpelamar = ".$rpeg->idpelamar."
                                            and b.idpergerakan <> 128
                                            and b.statuspergerakan = 'Disetujui' 
                                            and (a.tglmasuk > '".$startdate."' and a.tglmasuk < '".$enddate."')
                                            order by a.idpekerjaan desc
                                            limit 1")->row();
        return $qDetectTglMasuk->tglmasuk;
    }

    function pengali_prorate()
    {
        $numdayswork = countDaysMonth($startdate,$obj->tglakhirjabatan)->days+1;
    }

}
