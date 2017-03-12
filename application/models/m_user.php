<?php

class m_user extends CI_Model {

    function cekUser($id, $pass, $absen = false) {
        //2 kali cek:
        //1. sys_user 
        //2. ms_pegawai
        $q = $this->db->get_where('sys_user', array('username' => $id, 'password' => $pass,'display'=>null));
        // echo $this->db->last_query();
        if ($q->num_rows() > 0) {
            $r = $q->row();

            if($r->group_id!=1)
            {
                if($r->startdate==null || $r->enddate==null)
                {
                    
                        return array('success' => false, 'msg' => 'Login Gagal<br>Status : User Expired');
                        exit;
                }

                //cek validasinya
                $qcv = $this->db->query("select user_id
                                            from sys_user
                                            where (now() BETWEEN startdate and enddate) and user_id=".$r->user_id."");
                // echo $this->db->last_query();
                if($qcv->num_rows()<=0)
                {
                    return array('success' => false, 'msg' => 'Login Gagal<br>Status : User Expired');
                    exit;
                }
            }

            if($r->group_id!=4 && $r->group_id!=1)
            {
                if($r->idcompany==null)
                {
                    return array('success' => false, 'msg' => 'ID atau Password Salah');
                    exit;
                }
            }

            //
            $idcompanyparent=null;
            $qgroup = $this->db->get_where('sys_group',array('group_id'=>$r->group_id))->row();
            // $qunit = $this->db->get_where('unit',array('idunit'=>$r->idunit))->row();
            $qunit = false;
            if($r->group_id==1 || $r->group_id==4)
            {
                ///master admin
                $company = null;
            }  else {
                    // $quunit = $this->db->get_where('userunit',array('user_id'=>$r->user_id))->row(); 
                    $qcompany = $this->db->get_where('company',array('idcompany'=>$r->idcompany))->row(); 
                    $company = $qcompany->companyname;
                    $idcompanyparent = $qcompany->parent;

                    if($r->group_id==2)
                    {
                        //superadmin
                        $qsa = $this->db->query("select status from adminsuper where user_id=$r->user_id and display is null and now() between startdate and enddate");
                        if($qsa->num_rows()<=0)
                        {
                            return array('success' => false, 'msg' => 'Login Gagal <br><br>Status : Nonaktif');
                            exit;
                        } else {
                            $rsa = $qsa->row();
                            if($rsa->status!='Aktif')
                            {
                                return array('success' => false, 'msg' => 'Login Gagal <br><br>Status : Suspended');
                                exit;
                            }
                        }
                    }
            }
            
            // echo $this->db->last_query();
            // var_dump($qunit);
            $firsttime = false;

             if(!isset($r->group_id))
            {
                return array('success' => false, 'msg' => 'Login Gagal <br><br>Pesan : User Group belum terdefinisi. Harap hubungi Administrator');
                exit;
            }
            
            $dataSession = array(
                'userid' => $r->user_id,
                'idcompany' => $r->idcompany,
                'idcompanyparent'=>$idcompanyparent==null ? $r->idcompany : $idcompanyparent,
                'clientid' => $r->clientid,
                'username' => $r->username,
                'group_id' => $r->group_id,
                'usergroup' => $r->group_id == 99 ? 'Super User' : $qgroup->group_name,
                'company'=> $company,
                'idunit'=> $qunit==true ? $qunit->idunit : 'null',
                'logged' => true
            );
            $this->session->set_userdata($dataSession);
            $this->saveLogin($r->user_id, $r->username);

            if($r->group_id>=2)
            {
                if($r->group_id==2)
                {
                    //superadmin
                    $idcompany = $this->session->userdata('idcompany');
                } else {
                    $idcompany = $this->session->userdata('idcompanyparent');
                }

                $this->db->select('balance,productid,startdate,user_id,idsuperadmin');
                $qdeposit = $this->db->get_where('adminsuper',array('idcompany'=>$idcompany,'display'=>null));
                if($qdeposit->num_rows()>0)
                {
                    $r = $qdeposit->row();

                     //cek apakah sudah waktunya didebet di bulan berikutnya (1 bulan). tgl awal diambil dari debthistory, kalo kosong ambil dari tanggal aktif
                    // $qdh = $this->db->get_where('debthistory',array('user_id'=>$r->user_id));
                    $qdh = $this->db->query("SELECT tanggal
                                                FROM debthistory
                                                WHERE user_id =  ".$r->user_id."
                                                order by tanggal desc limit 1");
                   
                    if($qdh->num_rows()>0)
                    {
                        $rqdh = $qdh->row();
                        $startdate = $rqdh->tanggal;
                    } else {
                        $startdate = $r->startdate;
                    }

                    $this->db->select('price');
                    $qproduk = $this->db->get_where('product',array('productid'=>$r->productid,'display'=>null))->row();

                     $dt = new DateTime();

                    $dateDebt = endCycle($startdate, 1);
                    // echo $dateDebt.'=='.$dt->format('Y-m-d');
                    // exit;

                    if($qproduk->price>0)
                    {
                        $qdep = $this->db->get_where('debthistory',array('user_id'=>$r->user_id));
                        if($qdep->num_rows<=0)
                        {
                             // echo $this->db->last_query().' '.$startdate;
                            // exit;
                            $rdep = $qdep->row();
                            if($r->balance>=$qproduk->price)
                            {
                                //saldo yg dimiliki lebih besar daripada harga produk lakukan debet
                                $newbalance = $r->balance-$qproduk->price;

                                if($newbalance>0)
                                {
                                    $this->db->where('user_id',$r->user_id);
                                    $this->db->update('adminsuper',array('balance'=>$newbalance));

                                    //save history
                                    $dhist = array(
                                            "user_id" => $r->user_id,
                                            "productid" => $r->productid,
                                            "oldbalance" => $r->balance,
                                            "newbalance" => $newbalance,
                                            "tanggal" => $dt->format('Y-m-d'),
                                            "datein" => $this->tanggalWaktu()
                                        );
                                    $this->db->insert('debthistory',$dhist);
                                }
                            }
                            $firsttime = true;
                        } else {
                            $firsttime = false;
                        }
                    }

                    if(!$firsttime)
                    {
                       
                        if($dateDebt==$dt->format('Y-m-d') || $dateDebt<=$dt->format('Y-m-d'))
                        {
                            $newbalance = $r->balance-$qproduk->price;

                            if($newbalance>0)
                            {
                                $this->db->where('user_id',$r->user_id);
                                $this->db->update('adminsuper',array('balance'=>$newbalance));

                                //save history
                                $dhist = array(
                                    "user_id" => $r->user_id,
                                    "productid" => $r->productid,
                                    "oldbalance" => $r->balance,
                                    "newbalance" => $newbalance,
                                    "tanggal" => $dt->format('Y-m-d'),
                                    "datein" => $this->tanggalWaktu()
                                );
                                $this->db->insert('debthistory',$dhist);
                            }
                        }
                    }
                }

               
            }
            ////////////////////////////////////////////////////////////////////////////////////

            $this->db->where('user_id', $r->user_id);
            $this->db->update('sys_user', array('laslogin' => date('Y-m-d H:m:s')));
            return array('success' => true, 'msg' => '');
        } else {
           return array('success' => false, 'msg' => 'ID atau Password Salah');
        }
    }

    function tanggalWaktu()
    {
        $dt = new DateTime();
        return $dt->format('Y-m-d H:i:s');
    }

    function saveAbsenData($id, $n, $keterlambatan,$dendaketerlambatan) {
        $this->cekAbsenSebelumnya($id, date('m'), date('Y'));

        $this->load->library('user_agent');
        $ip = getenv('HTTP_CLIENT_IP')? :
                getenv('HTTP_X_FORWARDED_FOR')? :
                        getenv('HTTP_X_FORWARDED')? :
                                getenv('HTTP_FORWARDED_FOR')? :
                                        getenv('HTTP_FORWARDED')? :
                                                getenv('REMOTE_ADDR');
        $d = array(
            'pegawainid' => $id,
            'kodeabsensitipe' => 2,
            'jammasuk' => $this->jamsekarang(),
            'tanggal' => date('Y-m-d'),
            'bulan' => date('m'),
            'tahun' => date('Y'),
            'is_referral' => $this->agent->is_referral(),
            'browser' => $this->agent->browser(),
            'version' => $this->agent->version(),
            'mobile' => $this->agent->mobile(),
            'robot' => $this->agent->robot(),
            'referrer' => $this->agent->referrer(),
            'agent_string' => $this->agent->agent_string(),
            'userin' => $n,
            'usermod' => $n,
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'terlambatmenit' => $keterlambatan,
            'ipaddress' => $ip
        );
        if($dendaketerlambatan==1)
        {
            $this->db->insert('absensi', $d);
        }
    }

    function saveLogin($id, $nama) {
//        $this->cekAbsenSebelumnya($id, date('m'), date('Y'));

        $this->load->library('user_agent');
        $ip = getenv('HTTP_CLIENT_IP')? :
                getenv('HTTP_X_FORWARDED_FOR')? :
                        getenv('HTTP_X_FORWARDED')? :
                                getenv('HTTP_FORWARDED_FOR')? :
                                        getenv('HTTP_FORWARDED')? :
                                                getenv('REMOTE_ADDR');

        date_default_timezone_set('Asia/Jakarta');
        
        $d = array(
            'pegawainid' => $id,
            'username' => $nama,
            'jammasuk' => date("H:m:s"),
            'tanggal' => date('Y-m-d'),
            'bulan' => date('m'),
            'tahun' => date('Y'),
            'is_referral' => $this->agent->is_referral(),
            'browser' => $this->agent->browser(),
            'version' => $this->agent->version(),
            'mobile' => $this->agent->mobile(),
            'robot' => $this->agent->robot(),
            'referrer' => $this->agent->referrer(),
            'agent_string' => $this->agent->agent_string(),
//				'userin' => $n,
//				'usermod' => $n,
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
//				'terlambatmenit'=>$keterlambatan,
            'ipaddress' => $ip
        );
        $this->db->insert('loginlog', $d);
    }

    function cekAbsen($id) {
        $datenow = date('Y-m-d');
        $q = $this->db->get_where('absensi', array('tanggal' => $datenow, 'pegawainid' => $id));
        if ($q->num_rows() > 0) {
            //udah absen
            return false;
        } else {
            return true;
        }
    }

    function cekAbsenSebelumnya($pegawainid, $bulan, $tahun) {
        $lastabsen = $this->db->query("SELECT tanggal from absensi
											where pegawainid = '$pegawainid' AND tahun='$tahun'
											ORDER BY tanggal desc limit 1");

        $q = $this->db->get_where('harilibur', array('status' => 1));
        foreach ($q->result() as $r) {
            $tgl_libur[] = date('Y') . '-' . $r->tanggal;
        }

        foreach ($tgl_libur as & $harilibur) {
            $harilibur = strtotime($harilibur);
        }

        if ($lastabsen->num_rows() > 0) {
            $r = $lastabsen->row();
            // var_dump($r);
            $lastAbsen = strtotime($r->tanggal);
            // echo $lastAbsen;
            $dlastAbsen = explode("-", $r->tanggal);
            $dateNow = strtotime(date('Y-m-d'));

            $jumharikerja = 0;
            // echo $lastAbsen." <= ".$dateNow ;
            while ($lastAbsen <= $dateNow) {
                // echo date('Y-m-d',$lastAbsen)." <= ".date('Y-m-d',$dateNow)."<br>";
                $hari_temp = date('D', $lastAbsen);
                if (!( $hari_temp == 'Sun' ) && !( $hari_temp == 'Sat' ) && !in_array($lastAbsen, $tgl_libur)) {

                    $hari_temp = date('d', $lastAbsen);
                    $jumharikerja++;

                    $q = $this->db->get_where('absensi', array('pegawainid' => $pegawainid, 'tanggal' => date('Y-m-d', $lastAbsen)));
                    if ($q->num_rows() > 0) {
                        // echo date('Y-m-d',$lastAbsen)." <= ".date('Y-m-d',$dateNow)." ABSEN <br>";
                    } else {
                        // echo date('Y-m-d',$lastAbsen)." <= ".date('Y-m-d',$dateNow)." ALPHA <br>";
                        $d = array(
                            'pegawainid' => $pegawainid,
                            'jammasuk' => '00:00:00',
                            'tanggal' => date('Y-m-d', $lastAbsen),
                            'bulan' => date('m', $lastAbsen),
                            'tahun' => $tahun,
                            'datein' => date('Y-m-d'),
                            'terlambatmenit' => 999,
                        );
                        if(date('Y-m-d', $lastAbsen)!=date('Y-m-d'))
                        {
                            $this->db->insert('absensi', $d);
                        }
                        
                        // echo $this->db->last_query()."<br>";
                    }
                }


                $lastAbsen = strtotime('+1 day', $lastAbsen);
            }
            // $jumharikerja-=1;
        } else {
            return false;
        }
        // echo $jumharikerja;
    }
    
    function tglsekarang()
    {
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = time();
        $jamsekarang = mdate($datestring, $time);
        return $jamsekarang;
    }
    
    function jamsekarang()
    {
        $datestring = "%H:%i:%s";
        $time = time();
        $jamsekarang = mdate($datestring, $time);
        return $jamsekarang;
    }

    function keterlambatan($id = null) {
        // $timenow = date('Y-m-d 09:00:00');
        $q = $this->db->get('pengaturan')->row();

        $this->load->helper('date');
        // $datestring = "%h:%i";
//        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = time();

        // echo mdate($datestring, $time);
        $jammasuk = date("Y-m-d " . $q->jammasuk);
        // $jammasuk = date("Y-m-d 02:00:00");
        $jamsekarang = $this->jamsekarang();
        // echo $jammasuk.' '.$jamsekarang.'<br/>';

        $waktusekarang = mdate("%H:%i:%s", $time);
        $waktumasuk = $q->jammasuk;
        // $waktumasuk = "02:00:00";

        $arrjammasuk = explode(":", $waktumasuk);
        $arrjamsekarang = explode(":", $waktusekarang);

        //cek kelebihan apa kekurangan
        // echo (int)$arrjamsekarang[0]." < ".(int)$arrjammasuk[0].'<br/>';
        $selisih = (int) $arrjammasuk[0] - (int) $arrjamsekarang[0];
        if ($selisih > 5) {
            // echo "belum waktunya untuk absen";
            return array('terlambat' => false, 'keterlambatan' => 0, 'msg' => 'Maaf, belum waktunya untuk absen');
        } else {

            $start_date = new DateTime($jammasuk);
            $since_start = $start_date->diff(new DateTime($this->tglsekarang()));
            // echo $since_start->days.' days total<br>';
            // echo $since_start->y.' years<br>';
            // echo $since_start->m.' months<br>';
            // echo $since_start->d.' days<br>';
//            echo $since_start->h . ' hours<br>';
            // echo $since_start->i.' minutes<br>';
            // echo $since_start->s.' seconds<br>';

            $keterlambatan = ($since_start->h * 60) + $since_start->i;
//            echo ($since_start->h*60)." ".$since_start->i;
//            if ($since_start->h == 0) {
//                return array('terlambat' => true, 'keterlambatan' => 0, 'msg' => null);
//            } else
                if ($keterlambatan > $q->absentoleransi) {
                    //terlambat
                    // -$q->absentoleransi
                    // echo "total menit keterlambatan : ".$keterlambatan." menit<br>";
                    return array('terlambat' => true, 'keterlambatan' => $keterlambatan, 'msg' => null);
                } else {
                    $keterlambatan = $keterlambatan - $q->absentoleransi;
                    // echo "tidak terlambat";
                    // echo "total menit keterlambatan : ".$keterlambatan." menit<br>";
                    return array('terlambat' => false, 'keterlambatan' => $keterlambatan, 'msg' => null);
                }
        }
    }

}

?>