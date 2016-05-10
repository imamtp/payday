<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class penggajian extends MY_Controller {

    public function index() {
        
    }

    public function getData($table) {

        $this->load->model('m_' . $table, 'datamodel');

        $extraparams = $this->input->post('extraparams');
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    $arrWer[$vparam[0]] = $vparam[1];
                }

                $i++;
            }
        } else {
            $wer = null;
        }

        // print_r($arrWer);
        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            // echo "$key='$value' ";
            // echo $i."!=".$jum." ";
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }
        // echo $wher;

        $start = isset($_POST['start']) ? $_POST['start'] : 0;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 10;

        $w = " WHERE TRUE";

        if (isset($_POST['query'])) {

            $field = 0;

            foreach ($this->datamodel->searchField() as $key => $value) {
                if ($field == 0) {
                    // $w .="(";
                    $w.=" AND ((" . $value . " LIKE '%" . $_POST['query'] . "%') ";
                } else {
                    $w.=" OR (" . $value . " LIKE '%" . $_POST['query'] . "%') ";
                }
                $field++;
            }
            $w .=")";

            if ($extraparams != '') {
                $w.=" AND $wer ";
            }
        } else if ($extraparams != '' && $wer != '') {
            $w.=" AND $wer ";
        }

        if ($this->datamodel->query() != '') {
            //query tambahan dari model
            $w.=" " . $this->datamodel->whereQuery() . " ";
        }

//        $sql = $this->datamodel->query() . " $w ";
        $orderby = $this->datamodel->orderBy() != "" ? "ORDER BY " . $this->datamodel->orderBy() : null;
        $sql = $this->datamodel->query() . " $w " . $orderby . " LIMIT $limit OFFSET $start";
//        $sql = $this->datamodel->query() . " $w LIMIT $limit OFFSET $start";

        $this->db->limit($start, $limit); 
        // $sql = str_replace("AND    AND", "AND", $sql);
        $query_page = $this->db->query($sql);
//         echo $sql;
        $arr = array();
        foreach ($query_page->result() as $obj) {
            $arr[] = $obj;
        }

        $i = 0;
        $v = new StdClass();
        $arrdata = array();
        foreach ($arr as $key => $value) {

            //cek status kawin
            if (isset($value->idkawin)) {
                if ($value->idkawin == 2) {
                    //cek sutri 
                    $idemployee = $value->idemployee;
                    $q = $this->db->query("SELECT idemployee
                                            FROM datasutri
                                            WHERE idemployee =  '$idemployee'");
//                    echo $this->db->last_query();
                    if ($q->num_rows() > 0) {
                        $value->status = 'Ok';
                    } else {
                        $value->status = 'Sutri belum didaftarkan';
                    }
                } else {
                    $value->status = 'Ok';
                }
            } else {
                $value->status = 'Ok';
            }
            
            //add jabatan dan region kso
//            if ($table == 'rekapksogaji') {
//                $value->namajabkso = $this->m_ms_pegawai->getNamaJabKso($value->idemployee);
//            }

            //cek org/unit
//            $qjab = $this->db->query("select b.idemployee,b.pegawainama,c.namapanjang,a.jabatannosk,d.namajab,e.ketjenmut,a.idemployee,nourutrjab,jabatannosk,a.nourutjab,jabatantglmulai,a.peringkat,jabatantglakhir,jabatanlamanya,ketjab,a.kodeorginduk,a.kodeorganak,a.skala,f.ketkeljab,d.jabatandetail
//                                        from rjabatan a
//                                        join ms_pegawai b ON a.idemployee = b.idemployee
//                                        join org c ON a.kodeorganak = c.kodeorganak and a.kodeorginduk = c.kodeorginduk
//                                        left join tabjab d ON a.kodekeljab = d.kodekeljab and a.nourutjab = d.nourutjab
//                                        join keljab f ON a.kodekeljab = f.kodekeljab
//                                        join jenmut e ON a.nojenmut = e.nojenmut  WHERE TRUE AND a.idemployee='$value->idemployee'  "
//                                            . "ORDER BY a.jabatantglmulai,a.datein desc LIMIT 1");
            
             $arrdata[] = $value;
                $i++;
        }

        if (count($arrdata) <= 0) {
            $datanya = $arr;
        } else {
            $datanya = $arrdata;
        }

        $query = $this->db->query($this->datamodel->query() . " $w");

        $results = $query->num_rows();
        echo '{success:true,numrow:' . $i . ',results:' . $results .
        ',rows:' . json_encode($datanya) . '}';
    }

    function proses() {
        $postdata = json_decode($this->input->post('postdata'));
        $bulantahun = str_replace("T00:00:00", "", $this->input->post('bulantahun'));
        $bulantahun = explode("-", $bulantahun);
        $bulan = $bulantahun[1];
        $tahun = $bulantahun[0];
        $verifikasi = false;
//        $aktifitaskode = $this->input->post('aktifitaskode');
//        $kodekeljab = $this->input->post('kodekeljab');
//        $qaktif = $this->db->get_where('tbaktif', array('aktifitaskode' => $aktifitaskode))->row();
//        $qkeljab = $this->db->get_where('keljab', array('kodekeljab' => $kodekeljab))->row();

//        $q = $this->db->query("select nextval('seq_penggajian'::regclass) as nopenggajian")->row();
//        $nopenggajian = $q->nopenggajian;

        //verifikasi dimulai
        $i = 1;
        foreach ($postdata as $key => $value) {
            if ($this->generate($tahun, $bulan, $value->idemployee, 3)) {
                $verifikasi = true;
                $i++;
            }
        }
        
        $i-=1;
        if ($verifikasi) {
//            $d = array(
//                'nopenggajian' => $nopenggajian,
//                'bulan' => $bulan,
//                'tahun' => $tahun,
//                'datein' => date('Y-m-d H:m:s'),
//                'userin' => $this->session->userdata('username'),
//                'aktifitaskode' => $aktifitaskode,
//                'kodekeljab' => $kodekeljab
//            );
//            $this->db->insert('penggajian', $d);

            //buat jurnal setelah proses gaji berhasil
            $this->m_penggajian->saveJournal("Pembayaran Gaji ".$bulan."/".$tahun);

            echo "{success: true, message:'Berhasil memproses " . $i . " data '}";
        } else {
            echo "{success: false, message:'Penggajian gagal diproses'}";
        }
        // }
    }


    function proses2()
    {
        $this->load->model('m_data');
        $this->load->model('m_journal');
        $this->load->model('m_penggajian');

        $idunit = $this->input->post('idunit');
        $idaccountPayrollKas = $this->input->post('idaccountPayrollKas');
        $idaccountPayroll = $this->input->post('idaccountPayroll');

        //cek link hutang pph
        $idaccountpph = $this->m_data->getIdAccount(22,$idunit);

        $this->db->trans_begin();

        // $periodepenggajian = str_replace("T00:00:00", "", $this->input->post('periodepenggajian'));
        $periode = $this->input->post('periodepenggajian');
        $periodeArr = explode("-", $periode);

        // print_r($periodeArr);
        

        $m = $periodeArr[1];
        $y = $periodeArr[2];
        $d = $periodeArr[0];

        $tglpenggajian = $y."-".$m."-".$d;
        
        $qseq = $this->db->query("select nextval('seq_payroll') as id")->row();
        $idpayroll = $qseq->id;

        $q = $this->db->get_where('payrolltmp',array('userid'=>$this->session->userdata('userid')));
        if($q->num_rows()>0)
        {

                $i=1;
                foreach ($q->result() as $r) {
                    $data = array(
                            "idemployee" => $r->idemployee,
                            "idemployeetype" => $r->idemployeetype,
                            "payrolltypeid" => $r->payrolltypeid,
                            "firstname" => $r->firstname,
                            "lastname" => $r->lastname,
                            "namaunit" => $r->namaunit,
                            "nametype" => $r->nametype,
                            "pembayaranperjamkehadiran"=>$r->pembayaranperjamkehadiran,
                            "jumlahjam" => $r->jumlahjam,
                            "jumlahkehadiran" => $r->jumlahkehadiran,
                            "totalgaji" => $r->totalgaji,
                            "penambahangaji" => $r->penambahangaji,
                            "totaltunjangan" => $r->totaltunjangan,
                            "pph21" => $r->pph21,
                            "tglpenggajian"=>$tglpenggajian,
                            "totalpotongan" => $r->totalpotongan,
                            "totalpembayaran" => $r->totalpembayaran,
                            "payname" => $r->payname,
                            "userin" => $this->session->userdata('username'),
                            "code" => $r->code,
                            "userid" =>  $this->session->userdata('userid'),
                            "ptkp" => $r->ptkp,
                            "wajibpajak" => $r->wajibpajak,
                            "jenispph21" => $r->jenispph21,
                            "tarifpajak" => $r->tarifpajak,
                            "pphterhutang" => $r->pphterhutang,
                            "premiinsurance" => $r->premiinsurance,
                            "idunit" => $r->idunit,
                            "month" => $m,
                            "year" => $y,
                            "idpayroll" => $idpayroll
                    );
                    // print_r($d);
                    // echo '<hr>';
                    //premi insuransi
                // $v['idasuransi'].','.$v['namapremi'].','.$v['persenE'].','.$v['persenC'].','.$v['premiE'].','.$v['premiC'].':';               
                    $premidata = explode(":", $r->premiinsurance);
                    foreach ($premidata as $key => $value) {

                        $field = explode(",", $value);
                        // print_r($field);
                        //     exit;
                            if(isset($field[1]))
                            {
                                    $dpremi = array(
                                        "percente" => $field[2],
                                        "percentc" => $field[3],
                                        "amounte" => $field[4],
                                        "amountc" => $field[5],
                                        "userin" => $this->session->userdata('username'),
                                        "datein" => date('Y-m-d H:m:s'),
                                        "month" => $m,
                                        "year" => $y,
                                        "idasuransi" => $field[0],
                                        "idemployee" => $r->idemployee
                                );
                                $this->db->insert('asuransipayhistory',$dpremi);
                            }
                    }

                    $this->db->insert('payrollproceed',$data);

                    $tambahangaji = $this->m_penggajian->tambahangaji($r->idemployee,3,$d,$m,$y);

                    $tunjangan = $this->m_penggajian->tunjangan($r->idemployee,3,$d,$m,$y,$r->totalgaji);
                    // print_r($tunjangan);

                    //potongan
                    $potongan = $this->m_penggajian->potongan($r->idemployee,3,$d,$m,$y,'potongan');
                    // print_r($potongan);

                    //pinjaman
                    $pinjaman = $this->m_penggajian->potongan($r->idemployee,3,$d,$m,$y,'pinjaman');

                    $i++;
                }

                $this->db->where('userid',$this->session->userdata('userid'));
                $this->db->delete('payrolltmp');

                //buat jurnal penggajian berdasarkan jenis pegawai
                $qseq = $this->db->query("select nextval('seq_journal') as id")->row();
                $idjurnal = $qseq->id;
                $periode = backdate2($periode);
                $tgl = explode("-", $periode);
                $m = $tgl[1];
                $y = $tgl[0];
                $d = array(
                    'idjournal' => $idjurnal,
                    'idjournaltype' => 7, //kaskeluar
                    'nojournal' => date('Ymd').'07'.$qseq->id,
        //                    name character varying(225),
                    'datejournal' => $periode,
                    'memo' => 'Payroll '.$periode,
                    // 'totaldebit' => $totalbeban,
                    // 'totalcredit' => $totalbeban,
        //                    'totaltax' double precision,
        //                    isrecuring boolean,
                    'year' => $y,
                    'month' => $m,
        //                    display integer,
                    'userin' => $this->session->userdata('username'),
                    'usermod' => $this->session->userdata('username'),
                    'datein' => date('Y-m-d H:m:s'),
                    'datemod' => date('Y-m-d H:m:s'),
                    'idunit' => $idunit
                );

                $this->db->insert('journal', $d);

                $this->m_journal->saveTitipanPremiPayrollPerusahaan($idjurnal,$idunit,$periode);

                $this->m_journal->savePayroll($this->session->userdata('userid'),$idunit,$periode,$idaccountPayrollKas,$idaccountPayroll,$idjurnal);

                $this->m_journal->saveTitipanPremiPayroll($idjurnal,$idunit,$periode);

                //end jurnal

                // $this->db->where('idpayroll',$idpayroll);
                $dpayroll = array(
                        "idpayroll"=>$idpayroll,
                        "idjournal" => $idjurnal,
                        "month" => $m,
                        "idunit"=>$idunit,
                        "year" => $y,
                        "userin" => $this->session->userdata('userid'),
                        "datein" => date('Y-m-d')
                );
                $this->db->insert('payroll',$dpayroll);

                // //masukkan akun pph
                // $idaccpph21 = $this->m_data->getIdAccount(22, $idunit);
                // $this->m_journal->savePPH21($this->session->userdata('userid'),$idunit);

                //masukan beban penggajian berdasarkan jenisnya
                // $this->m_journal->saveBebanGajiByType($this->session->userdata('userid'),$idunit);

                //masukan premi karyawan dan beban premi perusahaan
                // $this->m_journal->saveBebanPremi($this->session->userdata('userid'),$idunit);

                // echo 'tes';
                if ($this->db->trans_status() === FALSE)
                {
                    $this->db->trans_rollback();
                    echo json_encode(array('success'=>false,'message'=>'Proses penggajian gagal. Silahkan coba lagi.'));
                }
                else
                {
                    $this->db->trans_commit();


                    echo json_encode(array('success'=>true,'message'=>'Penggajian berhasil diproses.'));
                }
            } else {
                echo json_encode(array('success'=>false,'message'=>'Proses penggajian gagal karena belum ada daftar pegawai yang akan diproses gajinya'));
            }
    }

    function cetakTHR($idthr,$employee)
    {
        $d['title'] = 'Pembayaran THR';

        $this->load->model('payroll/m_griddatathr','model');
        $d['data'] = $this->model->cetak($idthr);

        $qnotef = $this->db->get_where('journal',array('idjournal'=>$d['data']->idjournal))->row();
        $d['no'] = $qnotef->nojournal;

        $qthr = $this->db->get_where('thr',array('idthr'=>$idthr))->row();


        $qunit = $this->db->get_where('unit',array('idunit'=>$qthr->idunit));
        if($qunit->num_rows()>0)
        {
            $runit = $qunit->row();
            $d['logo'] = $runit->logo==null ? 'logo_aktiva2.png' : $runit->logo;
            $d['namaunit'] = $runit->namaunit;
            $d['alamat'] = $runit->alamat;
        }

        $this->load->view('tplcetak/thr',$d);
    }

    function cetakGaji($year,$month,$idemployee,$debug)
    {
        // echo $month;
        $dslip['debug']=$debug;
        // $month = ambilNoBulan($month);
        $dslip['bulan']=$month;
        $dslip['tahun']=$year;

        $sql = "SELECT A.idemployee,A.idemployeetype,norek,namabank,premiinsurance,C.idaccount,C.idaccountpayroll,d.accname,
        e.accname,A.firstname,A.lastname,namaunit,A.nametype,jumlahjam,jumlahkehadiran,totalgaji,totaltunjangan,pph21,
        totalpotongan,totalpembayaran,payname,A.userin,A.code,jenispph21,month,year,A.idunit,idpayroll,f.norek,f.namabank
                FROM
                    payrollproceed A
                JOIN employeetype C ON A.idemployeetype = C.idemployeetype
                LEFT JOIN account d ON C.idaccount = d.idaccount
                LEFT JOIN account e ON C.idaccountpayroll = e.idaccount
                JOIN employee f ON A.idemployee = f.idemployee
                WHERE
                    A.MONTH = '$month' AND A.YEAR = $year and A.idemployee=$idemployee";
        $q = $this->db->query($sql);
        // echo $sql;
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $idunit = $r->idunit;

            $dslip['nametype']=$r->nametype;
            $dslip['pegawainama']=$r->firstname.' '.$r->lastname;
            $dslip['gajipokok']=$r->totalgaji;
            $dslip['norek']=$r->norek;
            $dslip['namabank']=$r->namabank;
            $dslip['jenispph21']=$r->jenispph21;
            $dslip['pph21']=$r->pph21;

            //start tambahan gaji
            $qtambahangaji = $this->db->query("select a.idtambahangaji,a.month,a.year,a.jumlah,c.tambahantype
                            from tambahangajihistory a
                            join tambahangaji b ON a.idtambahangaji = b.idtambahangaji
                            join tambahangajitype c ON b.idtambahangajitype = c.idtambahangajitype
                            where b.idemployee=$idemployee and a.month='$month' and year=$year");
            $tambahangaji=array();
            $totaltambahangaji=0;
            $i=0;
            foreach ($qtambahangaji->result() as $r) {
                $tambahangaji[$i]['nama']=$r->tambahantype;
                $tambahangaji[$i]['jumlah']=$r->jumlah;
                $totaltambahangaji+=$r->jumlah;
            }
            $dslip['tambahangaji'] = $tambahangaji;
            $dslip['totaltambahangaji']=$totaltambahangaji;
            //end tambahan gaji

            //start tunjangan
            $qtunjangan = $this->db->query("select a.month,a.year,b.idtunjangan,b.idemployee,c.nametunj,a.jumlah
                            from tunjanganhistory a 
                            join tunjangan b ON a.idtunjangan = b.idtunjangan
                            join tunjangantype c ON b.idtunjtype = c.idtunjtype
                            where b.idemployee=$idemployee and a.month='$month' and year=$year");
            // echo $this->db->last_query();
            $tunjangan=array();
            $totaltunjangan=0;
            $i=0;
            foreach ($qtunjangan->result() as $r) {
                $tunjangan[$i]['nama']=$r->nametunj;
                $tunjangan[$i]['jumlah']=$r->jumlah;
                $totaltunjangan+=$r->jumlah;
                $i++;
            }
            $dslip['tunjangan'] = $tunjangan;
            $dslip['totaltunjangan']=$totaltunjangan;
            //end tunjangan

            //start potongan
            $qpotongan = $this->db->query("select a.idpotongan,a.jumlahpotongan,a.sisapotongan,a.totalpotongan,
                a.sisaangsuran,a.month,a.year,c.namepotongan,c.jenispotongan,a.idemployee,d.firstname
                                from potonganhistory a
                                join potongan b ON a.idpotongan = b.idpotongan
                                join potongantype c ON b.idpotongantype = c.idpotongantype
                                join employee d ON a.idemployee = d.idemployee
                                where a.month='$month' and a.year=$year and c.jenispotongan='Potongan' and a.idemployee=$idemployee");
            $potongan=array();
            $totalpotongan=0;
            $i=0;
            foreach ($qpotongan->result() as $r) {
                $potongan[$i]['nama']=$r->namepotongan;
                $potongan[$i]['jumlah']=$r->jumlahpotongan;
                $totalpotongan+=$r->jumlahpotongan;
            }
            $dslip['potongan'] = $potongan;
            $dslip['totalpotongan']=$totalpotongan;
            //end potongan

             //start potongan angsuran
            $qpotonganangsuran = $this->db->query("select a.idpotongan,a.jumlahpotongan,a.sisapotongan,a.totalpotongan,
                a.sisaangsuran,a.month,a.year,c.namepotongan,c.jenispotongan,a.idemployee,d.firstname
                                from potonganhistory a
                                join potongan b ON a.idpotongan = b.idpotongan
                                join potongantype c ON b.idpotongantype = c.idpotongantype
                                join employee d ON a.idemployee = d.idemployee
                                where a.month='$month' and a.year=$year and c.jenispotongan='Pinjaman' and a.idemployee=$idemployee");
            $potonganangsuran=array();
            $totalpotonganangsuran=0;
            $i=0;
            foreach ($qpotonganangsuran->result() as $r) {
                $potonganangsuran[$i]['nama']=$r->namepotongan;
                $potonganangsuran[$i]['jumlah']=$r->jumlahpotongan;
                $potonganangsuran[$i]['sisapotongan']=$r->sisapotongan;
                $potonganangsuran[$i]['sisaangsuran']=$r->sisaangsuran;
                $totalpotonganangsuran+=$r->jumlahpotongan;
            }
            $dslip['potonganangsuran'] = $potonganangsuran;
            $dslip['totalpotonganangsuran']=$totalpotonganangsuran;
            //end potongan angsuran

            //potongan premi asuransi
            $qpremi = $this->db->query("select a.percente,a.amounte,a.month,a.year,a.idasuransi,a.idemployee,b.namapremi,b.deskripsi,b.tampilemp
                    from asuransipayhistory a
                    join asuransi b ON a.idasuransi = b.idasuransi
                    where a.month='$month' and a.year=$year and a.idemployee=$idemployee and a.amounte!=0");
            $premi=array();
            $totalpremi=0;
            $i=0;
            foreach ($qpremi->result() as $r) {
                $premi[$i]['nama']=$r->namapremi;
                $premi[$i]['percente']=$r->percente;
                $premi[$i]['amounte']=$r->amounte;
                $totalpremi+=$r->amounte;
            }
            $dslip['premi']=$premi;
            //end potongan premi asuransi
            $dslip['potonganTotal']=$dslip['totalpotonganangsuran']+$dslip['totalpotongan']+$totalpremi+$dslip['pph21'];

            $dslip['penghasilanbersih']=$dslip['gajipokok']+$dslip['totaltunjangan']+$dslip['totaltambahangaji']-$dslip['potonganTotal'];

            $qlogo = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
            $dslip['print'] = true;
            $dslip['logoheaderslip'] = $qlogo->logo==null ? 'logo_aktiva2.png' : $qlogo->logo;

            $this->load->view('v_slipgaji',$dslip);

        } else {
            echo 'Data tidak ditemukan';
        }

    }


    function prosesThr() {
        $postdata = json_decode($this->input->post('postdata'));
        $startdatethr = str_replace("T00:00:00", "", $this->input->post('startdatethr'));
        $startdatethr = explode("-", $startdatethr);
        $startbulan = $startdatethr[1];
        $starttahun = $startdatethr[0];

        $agamakode = $this->input->post('agamakode');

        $enddatethr = str_replace("T00:00:00", "", $this->input->post('enddatethr'));
        $enddatethr = explode("-", $enddatethr);
        $endbulan = $enddatethr[1];
        $endtahun = $enddatethr[0];
        
        $d1 = strtotime($starttahun."-".$startbulan."-01");
//        echo $d1;
        $d2 = strtotime($endtahun."-".$endbulan."-01");
        $min_date = min($d1,$d2);
        $max_date = max($d1,$d2);
        $jumlahbulan=0;
        
        while(($min_date = strtotime("+1 MONTH",$min_date))<=$max_date)
        {
            $jumlahbulan++;
        }
//        echo $jumlahbulan;
        
        $this->load->model('m_penggajian');

        $arrMonth = array('01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'Nopember', '12' => 'Desember');
        $arrMonth2 = $arrMonth;

        $this->db->trans_begin();

        $i = 1;
        foreach ($postdata as $key => $value) {
            //cek apakah sudah THR sudah ada di tabel pembayaran berdasarkan idemployee
            $q = $this->db->get_where('pembayaran', array('idemployee' => $value->idemployee, 'nojenpembayaran' => 4));
            if ($q->num_rows() > 0) {
                $r = $q->row();
                $nopembayaran = $r->nopembayaran;
            } else {
                //kalo belum insert pembayaran THR
                $n = $this->db->query("select nextval('seq_nopembayaran'::regclass) as nopem")->row();
                $nopembayaran = $n->nopem;
                $d = array(
                    'nopembayaran' => $nopembayaran,
                    'nojenpembayaran' => 4,
//                    nosklus integer,
//                    jumlah double precision,
//                    pembayaranberikutnya date,
//                    namapembayaran character varying(200),
                    'userin' => $this->session->userdata('username'),
                    'usermod' => $this->session->userdata('username'),
                    'datein' => date('Y-m-d H:m:s'),
                    'datemod' => date('Y-m-d H:m:s'),
                    'idemployee' => $value->idemployee
//                    mulaipembayaran date,
//                    keterangan text,
//                    akhirpembayaran date,  
                );
                $this->db->insert('pembayaran', $d);
            }


            $besargaji = $this->m_penggajian->getP1($value->idemployee);
//            $besargaji = 4369000;

            $bulannya = "";
//            $jumlahbulan = null;
//            $mulaiitung = false;
//            foreach ($arrMonth as $key => $v) {
//
//                if ($startbulan == $key) {
//                    //mulai
//                    $bulannya.=$v . ' s/d ';
//                    $mulaiitung = true;
//                }
//
//                if ($mulaiitung) {
//                    $jumlahbulan+=1;
//                }
//
//                if ($key == $endbulan) {
//                    //akhir
//                    $bulannya.= $arrMonth2[$endbulan];
//                    break;
//                }
//
////                if($startbulan>$key)
////                {
////                    $jumlahbulan+=1;
////                }
//            }
            $jumlahbulan12 = $jumlahbulan / 12;
            $bulannya = $arrMonth[$startbulan]." " . $starttahun." s/d ".$arrMonth[$endbulan]." " . $endtahun;

            $d = array(
                'nopembayaran' => $nopembayaran,
                'nojenpembayaran' => 4,
                'jumlah' => $jumlahbulan12 * $besargaji,
                'bulan' => date('m'),
                'tahun' => date('Y'),
                'bulanawalthr' => $startbulan,
                'bulanakhirthr' => $endbulan,
                'tahunawalthr' => $starttahun,
                'tahunakhirthr' => $endtahun,
                'bulannya' => $bulannya,
                'jumlahbulan' => $jumlahbulan,
                'jumlahbulan12' => $jumlahbulan12,
                'besargaji' => $besargaji
            );
//print_r($d);
            $this->db->insert('pembayaranr', $d);
            $i++;
//            break;
        }
        $i-=1;
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success: false, message:'gagal'}";
        } else {
            $this->db->trans_commit();
            echo "{success: true, message:'Sukses memproses " . $i . " data'}";
        }
    }

    function generate($tahun, $bulan, $idemployee, $debug = false) {
        $this->load->model('m_penggajian');
        $keterangan = "Pembayaran Gaji ";
        if (!is_numeric($bulan)) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            $bulan = getNoMonth($bulan);
        }
        $dslip['bulan'] = $bulan;
        $dslip['tahun'] = $tahun;
        //kode debug = 
        //1. preview slip,tampil sql
        //2. preview slip
        //3. preview slip,generate gaji

        $qcekawal = $this->db->get_where('prosesgaji', array('tahun' => $tahun, 'bulan' => $bulan, 'idemployee' => $idemployee));
//         echo $this->db->last_query();
        if ($qcekawal->num_rows() <= 0 || $debug == 1 || $debug == 2 || $debug == 4) {
            $this->db->trans_begin();
            //DEBUG
            //1. debug 2.preview false.production 4.print
            $sql = "SELECT a.idsallary,basicsallary,c.nametype,b.firstname,b.lastname,norek,namabank   
                    FROM sallary a
                    join employee b ON a.idemployee = b.idemployee
                    join employeetype c ON b.idemployeetype = c.idemployeetype 
                    WHERE b.idemployee='$idemployee'";
//            echo $sql;
            $q = $this->db->query($sql);
            if ($q->num_rows() > 0) {
                $dslip['debug'] =  $debug;
                $r = $q->row();
                
                $dslip['pegawainama'] = $r->firstname.' '.$r->lastname;
                $dslip['nametype'] = $r->nametype;
                $dslip['norek'] = $r->norek;
                $dslip['namabank'] = $r->namabank;
                
                $gajipokok = $r->basicsallary;
                $dslip['gajipokok'] = $gajipokok;
                
                $potongan = $this->m_penggajian->potongan($idemployee,$debug);
                $dslip['potongan'] = $potongan;
                $dslip['totalpotongan'] = $potongan['total'];
                
                $tunjangan = $this->m_penggajian->tunjangan($idemployee,$debug);
                $dslip['tunjangan'] = $tunjangan;
                $dslip['totaltunjangan'] = $tunjangan['total'];                
                
                //premi penambah penghasilan (jpkPeg,jkkPeg,jkPeg)
                $premiPenambah = $this->m_penggajian->premi($idemployee,2,$gajipokok,null,$debug);
//                print_r($premiPenambah);
                $dslip['preminambah'] = $premiPenambah['premi'];
                
                //premi pemotong penghasilan (jpkPeg,jkkPeg,jkPeg)
                $premiPemotong = $this->m_penggajian->premi($idemployee,1,$gajipokok,null,$debug);
                $dslip['premipotong'] = $premiPemotong['premi'];
                //jamsostek
//                $jamsostek = $this->saveJamsostek($idemployee, $bulan, $tahun, $d['upahpokok'], 7, $console, $debug);
//                print_r($premiPemotong);

//                    $premidibayar = $jamsostek['jkkPeg'] + $jamsostek['jpkPeg'] + $jamsostek['jkmPeg'];
//                 $premidibayar = $jamsostek['jkmPeg'];

                $dslip['asuransi'] = $premiPenambah['premi'];

//                    $dslip['pembayaranlaintotal'] = $jamsostek['jkkPeg'] + $jamsostek['jpkPeg'] + $jamsostek['jkmPeg'] + $d['thr'] + $d['pakaian'] + $d['pembinaan'] + +$pembayaranlain['total'];
//                $dslip['pembayaranlaintotal'] = $jamsostek['jkmPeg'] + $d['thr'] + $d['pakaian'] + $d['pembinaan'] + +$pembayaranlain['total'];
                $dslip['totalpenghasilan'] = $gajipokok+$dslip['totaltunjangan'];
//echo $dslip['totalpenghasilan'];

//                $penambahpenghasilan = $jamsostek['jpkPeg']+$jamsostek['jkkPeg']+$jamsostek['jkPeg'];

                $biayajabatan = ($dslip['totalpenghasilan']+$premiPenambah['totalemployee'])*(5/100);
                $dslip['biayajabatan'] = $biayajabatan;
                
                //JHT / pengurang pendapatan
                $premiJht = $this->m_penggajian->premi($idemployee,1,$gajipokok,4);
//                print_r($premiJht);
                
                //iuran premi perusahaan
                $dslip['totalIuranPerusaaan'] =  $premiJht['totalcompany'];

//                $potongan = $premiPemotong['jhtPeg'];

                $penghasilanUPPH = $dslip['totalpenghasilan'] - $dslip['biayajabatan'] + $premiJht['totalemployee'];

                $penghasilan = $dslip['totalpenghasilan'] + $dslip['totaltunjangan'];                    

                $pengurang = $dslip['biayajabatan']+$premiJht['totalemployee'];

                $totalpenghasilan = $dslip['totalpenghasilan']+$premiPenambah['totalemployee'];

                $pph = $this->generatepph21($idemployee, $totalpenghasilan, $pengurang, $debug);
                $dslip['pph'] = $pph;
//                $dslip['potonganTotal'] = $pph['pphterhutang'] + $premiPemotong['totalemployee'] + $biayajabatan + $dslip['totalpotongan'] ;
                $dslip['potonganTotal'] = $pph['pphterhutang'] + $premiPemotong['totalemployee'] + $dslip['totalpotongan'] ;
                
                $dslip['penghasilanbersih'] = $dslip['totalpenghasilan'] - $dslip['potonganTotal'];

                if($debug==2 || $debug==4)
                {
                    //preview slip gaji
                    $this->load->view('v_slipgaji', $dslip);
                }
                
                if($debug==3)
                {
                    //simpan penggajian
                    $d = array(
                        "idsallary" => $r->idsallary,
//                        "idpotongan" int4,
//                        "idtunjangan" int4,
                        "jenpph" => $pph['jenispph21'],
                        "totalpotongan" => $dslip['potonganTotal'],
                        "totaltunjangan" => $dslip['totaltunjangan'],
                        "biayajabatan" =>  $dslip['biayajabatan'],
                        "pph21" => $pph['pphterhutang'],
                        "totalpembayaran" => $dslip['penghasilanbersih'],
                        "userin" => $this->session->userdata('username'),
                        "usermod" => $this->session->userdata('username'),
                        "datein" => date('Y-m-d H:m:s'),
                        "datemod"=> date('Y-m-d H:m:s'),
                        "bulan" => date('m'),
                        "tahun" => date('Y'),
                        "idemployee" => $idemployee,
                        "gajipokok" => $gajipokok
                    );
                    $this->db->insert('prosesgaji',$d);

                    //menambahh saldo akun pembayaran gaji berdasarkan jenis pegawai
                    $this->m_penggajian->saveAccountPayroll($idemployee,$dslip['penghasilanbersih']);
                }

                if ($this->db->trans_status() === FALSE)
                {
                    $this->db->trans_rollback();
                    return false;
                }
                else
                {
                    $this->db->trans_commit();
                    return true;
                }
                
            } else {
                if ($debug == 1)
                {
                    echo "Gaji belum ditentukan :" . $this->db->last_query() . "<hr>";
                } else {
                     echo "Gaji belum ditentukan";
                }
                return false;
            }
        } else {
            echo "periode gaji " . ambilBulan($bulan) . ' ' . $tahun . ' sudah dihitung';
            return false;
        }
    }

    function saveJamsostek($idemployee, $bulan, $tahun, $penghasilan, $kekaryaankode, $console, $debug) {
        //potongan jamsostek
//        $qj = $this->db->get('jamsostekpersen')->row();

        $jenbpjs = null;
        if ($kekaryaankode == 7) {
//            echo $penghasilan;
            //project/kso
            $qj = $this->m_penggajian->getRateOrg($idemployee, 7);
//            echo "<pre>";
//            print_r($qj);
//            echo "</pre>";
            
            //cek status kawin
            $q = $this->db->get_where('ms_pegawai',array('idemployee'=>$idemployee))->row();
            if($q->idkawin==2)
            {
                $jpk = $qj['jpkksokawin'] / 100;
                $jpkpersen = $qj['jpkksokawin'];
            } else {
                $jpk = $qj['jpkkso'] / 100;
                $jpkpersen = $qj['jpkkso'];
            }
            
            
            $jht = $qj['jhtkso'] / 100;
            
            $jkk = $qj['jkkkso'] / 100;
            $jk = $qj['jkkso'] / 100;
//            $bpjsk = $qj['bpjskso'] / 100;
            $jhtperusahaan = $qj['jhtksoperusahaan'] / 100;
            $jkm = $qj['jkmkso'] / 100;

            if ($qj['jenbpjskso'] == 'fix') {
                $jenbpjs = 'fix';
                $bpjsk = $qj['bpjskso'];
                $bpjskpersen = 0;
            } else {
                $bpjsk = $qj['bpjskso'] / 100;
                $bpjskpersen = $qj['bpjskso'];
            }

            $jhtpersen = $qj['jhtkso'];
            
            $jkkpersen = $qj['jkkkso'];
            $jkpersen = $qj['jkkso'];
            $jhtperusahaanpersen = $qj['jhtksoperusahaan'];
            $jkmpersen = $qj['jkmkso'];
        } else {
            //non kso
            $qj = $this->m_penggajian->getRateOrg($idemployee, $kekaryaankode);
//            echo $this->db->last_query();
            
             //cek status kawin
            $q = $this->db->get_where('ms_pegawai',array('idemployee'=>$idemployee))->row();
            if($q->idkawin==2)
            {
                $jpk = $qj['jpknonksokawin'] / 100;
                $jpkpersen = $qj['jpknonksokawin'];
            } else {
                $jpk = $qj['jpknonkso'] / 100;
                $jpkpersen = $qj['jpknonkso'];
            }
            
            $jht = $qj['jhtnonkso'] / 100;
            $jkk = $qj['jkknonkso'] / 100;
            $jk = $qj['jknonkso'] / 100;
//            $bpjsk = $qj['bpjsnonkso'] / 100;
            $jhtperusahaan = $qj['jhtnonksoperusahaan'] / 100;
            $jkm = $qj['jkmnonkso'] / 100;

            if ($qj['jenbpjsnonkso'] == 'fix') {
                $jenbpjs = 'fix';
                $bpjsk = $qj['bpjsnonkso'];
                $bpjskpersen = 0;
            } else {
                $bpjsk = $qj['bpjsnonkso'] / 100;
                $bpjskpersen = $qj['bpjsnonkso'];
            }

            $jhtpersen = $qj['jhtnonkso'];
           
            $jkkpersen = $qj['jkknonkso'];
            $jkpersen = $qj['jknonkso'];
//            $bpjskpersen = $qj['bpjsnonkso'];
            $jhtperusahaanpersen = $qj['jhtnonksoperusahaan'];
            $jkmpersen = $qj['jkmnonkso'];
        }



        //cek kesertaan pegawai
//        $qk = $this->db->get_where('jamsostekpremi', array('idemployee' => $idemployee));
//        if ($qk->num_rows() > 0) {
//            $qk = $qk->row();
//            // echo $this->db->last_query();
//            $jhtPeg = $qk->jht == 't' ? $penghasilan * $jht : 0;
//            $jpkPeg = $qk->jpk == 't' ? $penghasilan * $jpk : 0;
//            $jkkPeg = $qk->jkk == 't' ? $penghasilan * $jkk : 0;
//            $jkPeg = $qk->jk == 't' ? $penghasilan * $jk : 0;
//            $bpjskPeg = $qk->bpjsk == 't' ? $penghasilan * $bpjsk : 0;
//        } else {
//            $jhtPeg = 0;
//            $jpkPeg = 0;
//            $jkkPeg = 0;
//            $jkPeg = 0;
//            $bpjskPeg = 0;
//        }
//echo $penghasilan;
        $jhtPeg = $penghasilan * $jht;
        $jpkPeg = $penghasilan * $jpk;
        $jkkPeg = $penghasilan * $jkk;
        $jkPeg = $penghasilan * $jk;
        $jhtPegPerusahaan = $penghasilan * $jhtperusahaan;
        $jkmPeg = $penghasilan * $jkm;
        
        if ($jenbpjs == 'fix') {
            $bpjskPeg = $bpjsk;
        } else {
            $bpjskPeg = $penghasilan * $bpjsk;
        }


        
        $totalPotPeg = $jhtPeg;
        if($kekaryaankode==11)
        {
            //pkwt gak pake bpjs,jkm,jpk
            $totalPemPers = $jkkPeg + $jkPeg;
        } else {
            $totalPemPers = $jpkPeg + $jkkPeg + $jkPeg + $bpjskPeg + $jkmPeg;
        }
        
        $total = $totalPotPeg + $totalPemPers;
        
        $data = array(
            // 'nojamsostek' => ,
            // 'noanggota' => ,
            'idemployee' => $idemployee,
            'gaji' => $penghasilan,
            'jht' => $jhtPeg,
            'jhtpersen' => $jhtpersen,
//            'jpk' => $jpkPeg,
//            'jpkpersen' => $jpkpersen,
            'jkk' => $jkkPeg,
            'jkkpersen' => $jkkpersen,
            'jk' => $jkPeg,
//            'bpjskpersen' => $bpjskpersen,
//            'bpjsk' => $bpjskPeg,
            'jhtperusahaanpersen' => $jhtperusahaanpersen,
            'jhtperusahaan' => $jhtPegPerusahaan,
//            'jkmpersen' => $jkmpersen,
//            'jkm' => $jkmPeg,
            'total' => $total,
            'totalperusahaan'=>$totalPemPers,
            'totalpegawai'=>$totalPotPeg,
            'tanggal' => date("Y-m-d"),
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date("Y-m-d H:m:s"),
            'datemod' => date("Y-m-d H:m:s"),
            'jkpersen' => $jkpersen,
            'bulan' => $bulan,
            'tahun' => $tahun
        );
//print_r($data);
//        echo $kekaryaankode;
        if($kekaryaankode==11 || $kekaryaankode==9)
        {
            //pkwt,tugas karya gak pake bpjs,jkm,jpk
            $data['bpjskpersen'] = 0;
            $data['bpjsk'] = 0;
            $data['jkmpersen'] = 0;
            $data['jkm'] = 0;
            $data['jpkpersen'] = 0;
            $data['jpk'] = 0;
        } else if($kekaryaankode==8)
            {
                $data['bpjskpersen'] = 0;
                $data['bpjsk'] = 0;
                $data['jkmpersen'] = 0;
                $data['jkm'] = 0;
                $data['jpkpersen'] = $jpkpersen;
                $data['jpk'] = $jpkPeg;
            } else {
                $data['bpjskpersen'] = $bpjskpersen;
                $data['bpjsk'] = $bpjskPeg;    
                $data['jkmpersen'] = $jkmpersen;
                $data['jkm'] = $jkmPeg;
                $data['jpkpersen'] = $jpkpersen;
                $data['jpk'] = $jpkPeg;
            }

        $wer = array('idemployee' => $idemployee, 'bulan' => $bulan, 'tahun' => $tahun);
        $qcek = $this->db->get_where('jamsostek', $wer);

        if (!$debug && $debug != 2) {
            //cek dulu
            //            echo $this->db->last_query();
            if ($qcek->num_rows() > 0) {
                $this->db->where($wer);
                $this->db->update('jamsostek', $data);
            } else {
                if ($this->input->post('prosesgaji') != 1) {
                    $this->db->insert('jamsostek', $data);
                }

                if ($console) {
                    $this->db->insert('jamsostek', $data);
                }
            }
        }

        if ($debug == 3) {
            if ($qcek->num_rows() > 0) {
                $this->db->where($wer);
                $this->db->update('jamsostek', $data);
            } else {
                $this->db->insert('jamsostek', $data);
            }
        }


        $d = array(
            'jhtPeg' => $jhtPeg,
//            'jpkPeg' => $jpkPeg,
            'jkkPeg' => $jkkPeg,
            'jkPeg' => $jkPeg,
//            'bpjskPeg' => $bpjskPeg,
//            'bpjskPersen' => $bpjskpersen,
            'jhtPersen' => $jhtpersen,
//            'jpkPersen' => $jpkpersen,
            'jkkPersen' => $jkkpersen,
            'jkPersen' => $jkpersen,
            'jhtPegPerusahaan' => $jhtPegPerusahaan,
            'jhtPegPerusahaanPersen' => $jhtperusahaanpersen,
//            'jkmPeg' => $jkmPeg,
//            'jkmPersen' => $jkmpersen
        );
       
        if($kekaryaankode==11 || $kekaryaankode==9)
        {
//             echo $kekaryaankode;
            //pkwt,tugas karya gak pake bpjs,jkm,jpk
            $d['bpjskPersen'] = 0;
            $d['bpjskPeg'] = 0;
            $d['jkmPersen'] = 0;
            $d['jkmPeg'] = 0;
            $d['jpkPersen'] = 0;
            $d['jpkPeg'] = 0;
        }  else if($kekaryaankode==8)
            {
                $d['bpjskPersen'] = 0;
                $d['bpjskPeg'] = 0;
                $d['jkmPersen'] = 0;
                $d['jkmPeg'] = 0;
                $d['jpkPersen'] = $jpkpersen;
                $d['jpkPeg'] = $jpkPeg;
            } else {
                    $d['bpjskPersen'] = $bpjskpersen;
                    $d['bpjskPeg'] = $bpjskPeg;
                    $d['jkmPersen'] = $jkmpersen;
                    $d['jkmPeg'] = $jkmPeg;
                    $d['jpkPersen'] = $jpkpersen;
                    $d['jpkPeg'] = $jpkPeg;
                }
        
        if ($debug == 1)
        {   echo "<pre>";
            echo "jamsostek :" . print_r($d) . "<hr>";
            echo "</pre>";
        }
        return $d;
    }

    function pembayaran($id, $bulan, $tahun, $console, $debug = false) {
        //2 tahunan
        //3 penggajian
        //cek bulan ini ada pembayaran
        // $qno = $this->db->query("select nextval('seq_nopembayaran'::regclass) as nopembayaran")->row();
        // $nopembayaran = $qno->nopembayaran;

        $i = 0;
        $arrPemb = null;
        $total = 0;
        $totalkso = 0;
        $current_date = $tahun . '-' . $bulan . '-01';
        $q = $this->db->query("select b.ketpembayaran,jumlah,nopembayaran,a.nojenpembayaran,namapembayaran
                                 from pembayaran a
                                 join jenpembayaran b ON a.nojenpembayaran = b.nojenpembayaran
                                where idemployee ='$id' AND ('$current_date' BETWEEN mulaipembayaran and akhirpembayaran) AND a.nojenpembayaran!=4 AND a.nojenpembayaran!=3");
        if ($debug == 1 && $debug != 2) {
            echo '<HR>PEMBAYARAN ' . $this->db->last_query() . '<HR>';
        }
        
        if ($q->num_rows() > 0) {
            //cek udah bayar apa belum di tanggal proses

            foreach ($q->result() as $r) {

                //cek udah bayar apa belum
                $qcek = $this->db->get_where('pembayaranr', array('nopembayaran' => $r->nopembayaran,
                    'nojenpembayaran' => $r->nojenpembayaran, 'tahun' => $tahun, 'bulan' => $bulan));

//                 $q = $this->db->query($sql);
//echo $this->db->last_query();
                if ($debug == 1 && $debug != 2) {
                    echo $this->db->last_query();
                }

                if ($qcek->num_rows() > 0) {

                    //yang sudah ada di database
                    $total+=$r->jumlah;
//                    echo 'nojenpem '.$r->nojenpembayaran;
                    if($r->nojenpembayaran==6)
                    {
                        //lainnya
                         $arrPemb[$r->namapembayaran] = $r->jumlah;
                    } else if($r->nojenpembayaran==10)
                    {
                        //tunjangan kso/project
                         $arrPemb['kso'][$r->namapembayaran] = $r->jumlah;
                         $totalkso+=$r->jumlah;
                    } else {
                         $arrPemb[$r->ketpembayaran] = $r->jumlah;
                    }
                   
                    $i++;

                    $data = array(
                        'nopembayaran' => $r->nopembayaran,
                        'nojenpembayaran' => $r->nojenpembayaran,
                        'jumlah' => $r->jumlah,
                        'tahun' => $tahun,
                        'bulan' => $bulan
                    );

                    if (!$debug) {
                        if ($this->input->post('prosesgaji') != 1) {
                            
                        }
                    } else if ($debug != 2 && $debug != 3) {
                        echo "<pre>";
                        print_r($data);
                        echo "</pre>";
                    }
                } else {
                    $total+=$r->jumlah;
                    if($r->nojenpembayaran==6)
                    {
                        //lainnya
                         $arrPemb[$r->namapembayaran] = $r->jumlah;
                    }  else if($r->nojenpembayaran==10)
                        {
                            //tunjangan kso/project
                             $arrPemb['kso'][$r->namapembayaran] = $r->jumlah;
                             $totalkso+=$r->jumlah;
                        } else {
                             $arrPemb[$r->ketpembayaran] = $r->jumlah;
                        }
                   
                    $i++;

                    $data = array(
                        'nopembayaran' => $r->nopembayaran,
                        'nojenpembayaran' => $r->nojenpembayaran,
                        'jumlah' => $r->jumlah,
                        'tahun' => $tahun,
                        'bulan' => $bulan
                    );

                    if (!$debug) {
                        if ($this->input->post('prosesgaji') != 1) {
                            $this->db->insert('pembayaranr', $data);
                        }

                        if ($console) {
                            $this->db->insert('pembayaranr', $data);
                        }
                    } else if ($debug != 2 && $debug != 3) {
                        echo "<pre>";
                        print_r($data);
                        echo "</pre>";
                    }

                    if ($debug == 3) {
                        $this->db->insert('pembayaranr', $data);
                    }
                }
            }
            $arrPemb['total'] = $total;
            $arrPemb['kso']['total'] = $totalkso;
        }
//print_r($arrPemb);
        return $arrPemb;
    }

    function pembayaranWinduan($idemployee, $gaji, $bulan, $tahun, $console, $debug = false) {
        //1. hitung tahun winduan dari tanggal masuk
        //2. winduan dibayarkan dibulan berikutnya
        $q = $this->db->get_where('ms_pegawai', array('idemployee' => $idemployee));
        if ($q->num_rows() > 0) {

            if ($debug == 1) {
                echo "<pre> WINDUAN: ";
            }

            $r = $q->row();
            $tglmasuk = explode("-", str_replace(" 00:00:00", "", $r->pegawaitglmasuk));
            $tahunmasuk = $tglmasuk[0];
            $bulanmasuk = str_replace("0", "", $tahunmasuk[1]);

            //convert string to int
            $bulanmasukint = intval($tglmasuk[1]);
            $bulanint = intval($bulan);

            $bulanpembayaran = $bulanmasukint + 1;

            $selisih = $tahun - $tahunmasuk;
//            echo "selisih: ".$selisih;
            if ($debug == 1) {
                echo "bulanmasuk:" . $bulanmasukint . " selisih " . $selisih . " bulanpembayaran: " . $bulanpembayaran;
//                echo $bulanpembayaran." == ".$bulanint;
            }
            if ($selisih == 8) {
                if ($bulanint <= $bulanmasukint) {
                    //belum masuk bulan pembayaran
                    $status = false;
                } else if ($bulanpembayaran == $bulanint) {
//                    dibayarkan dibulan berikutnya. 
//                    proses insert pembayaran winduan karna sudah mencapati 8 bulan dan bulan pembayaran
                    $status = $gaji;
                } else {
                    $status = 0;
                }
            } else {
                $status = false;
            }

            $data = array(
                'idemployee' => $idemployee,
                'jumlah' => $gaji,
                'bulan' => $bulanpembayaran,
                'tahun' => $tahun,
                'tglmasuk' => $r->pegawaitglmasuk,
                'penghasilan' => $gaji,
                'datein' => date('Y-m-d H:m:s'),
                'datemod' => date('Y-m-d H:m:s'),
                'userin' => $this->session->userdata('username'),
                'usermod' => $this->session->userdata('username')
            );


            $qcekexist = $this->db->get_where('pembayaranwinduan', array('idemployee' => $idemployee, 'bulan' => "$bulanpembayaran", 'tahun' => $tahun));
            if (!$debug) {
                if ($this->input->post('prosesgaji') != 1) {
                    if ($qcekexist->num_rows() <= 0) {
                        if ($selisih == 8) {
                            if ($bulanpembayaran == $bulanint) {
                                $this->db->insert('pembayaranwinduan', $data);
                            }
                        }
                    }
                }

                if ($console) {
                    if ($qcekexist->num_rows() <= 0) {
                        if ($selisih == 8) {
                            if ($bulanpembayaran == $bulanint) {
                                $this->db->insert('pembayaranwinduan', $data);
                            }
                        }
                    }
                }
            }


            if ($debug == 1) {
                echo "<pre> WINDUAN: ";
                print_r($data);
                echo 'STATUS:' . intval($status);
                echo "</pre>";
            }

            if ($debug == 3) {
                if ($qcekexist->num_rows() <= 0) {
                    if ($selisih == 8) {
                        if ($bulanpembayaran == $bulanint) {
                            $this->db->insert('pembayaranwinduan', $data);
                        }
                    }
                }
            }
        } else {
            $status = false;
        }

        return $status;
    }

    function pembayaranCutiTahunan($idemployee, $gaji, $bulan, $tahun, $console, $debug = false) {
        //note : cuti tahunan dan cuti besar sama?
        //jatuh tempo cuti tahunan diambil dari tanggal capeg pegawai
        $q = $this->db->get_where('ms_pegawai', array('idemployee' => $idemployee));
        if ($q->num_rows() > 0) {

            if ($debug == 1) {
                echo "<pre> CUTI TAHUNAN: ";
            }

            $r = $q->row();
            $tglcapeg = explode("-", str_replace(" 00:00:00", "", $r->pegawaitglcapeg));

            if ($tahun > $tglcapeg[0]) {
                //mulai tahun perhitungan

                if ($bulan == $tglcapeg[1]) {
                    //cek bulan jatuh tempo
                    //dibayarkan di bulan yang sama
                    $status = $gaji;
                } else {
                    $status = false;
                }
            } else {
                $status = false;
            }
        } else {
            $status = false;
        }

        return $status;
    }

    function potongan($idemployee, $bulan, $tahun, $console, $debug = false) {
        $sql = "select b.ketpot,a.*
				from tpotongan a
				join jenpot b ON a.nojenpot = b.nojenpot
				where tahunmulaipotongan<='" . $tahun . "' AND bulanmulaipotongan<='" . $bulan . "' 
				and sisapinjaman<=jumlahpinjaman and a.nojenpot=6 AND idemployee='$idemployee' and a.display is null";

        $q = $this->db->query($sql);
        // if($debug && $debug!=2){
        //  	echo "potongan ".$this->db->last_query()."<hr>";
        //  }
        $i = 0;
        $totalpotongan = 0;
        if ($q->num_rows() > 0) {
            $r = $q->row();

            // if($debug==2)
            // {
            // 	//kalo lagi pratinjau jgn diitung sisa angsuran dan angsuran keberapa di pembayaran berikutnya
            // 	$angsuranke = $r->angsuranke;
            // 	$sisapinjaman = $r->sisapinjaman;
            // } else {
            // 	$angsuranke = $r->angsuranke+1;
            // 	$sisapinjaman = $r->sisapinjaman-$r->angsurperbulan;		
            // }

            $angsuranke = $r->angsuranke + 1;
            $sisapinjaman = $r->sisapinjaman - $r->angsurperbulan;


            $d = array(
                'nopotongan' => $r->nopotongan,
                'jumlah' => $r->angsurperbulan,
                'tanggal' => $tahun . '-' . $bulan . '-' . date('d'),
                'angsuranke' => $angsuranke,
                'sisapinjaman' => $sisapinjaman,
                'bulanpembayaran' => $bulan,
                'tahunpembayaran' => $tahun
            );

            if (!$debug && $debug != 2) {
                if ($this->input->post('prosesgaji') != 1) {
                    $this->db->insert('tpotonganr', $d);
                }

                if ($console) {
                    $this->db->insert('tpotonganr', $d);
                }
            } else if ($debug == 1) {
                echo "<pre>";
                print_r($d);
                echo "</pre>";
            }


            if ($debug == 3) {
                $this->db->insert('tpotonganr', $d);
            }

            $du = array(
                'angsuranke' => $angsuranke,
                'sisapinjaman' => $sisapinjaman
            );


            $totalpotongan += $r->angsurperbulan;
            $arrPot = array('sisapinjaman'=>$r->sisapinjaman,'angsuranke' => $angsuranke, 'ketpot' => $r->ketpot, 'jumlah' => $r->angsurperbulan, 'totalpot' => $totalpotongan);

            if (!$debug && $debug != 2) {
                if ($console) {
                    $this->db->where('idemployee', $idemployee);
                    $this->db->where('nopotongan', $r->nopotongan);
                    $this->db->update('tpotongan', $du);
                }
            } else if ($debug == 1) {
                echo "POTONGAN:<pre>";
                print_r($arrPot);
                echo "</pre>";
            }

            if ($debug == 3) {
                $this->db->where('idemployee', $idemployee);
                $this->db->where('nopotongan', $r->nopotongan);
                $this->db->update('tpotongan', $du);
            }

            return $arrPot;
        } else {
            if ($debug == 1) {
                echo "POTONGAN " . $this->db->last_query() . '<hr>';
            }

            return false;
        }
    }

    function potonganLain($idemployee, $bulan, $tahun, $console, $debug = false) {
        $sql = "select b.ketpot,a.*
                from tpotongan a
                join jenpot b ON a.nojenpot = b.nojenpot
                where tahunmulaipotongan<='" . $tahun . "' AND bulanmulaipotongan<='" . $bulan . "' 
                AND idemployee='$idemployee' and a.nojenpot!=6 and a.display is null";
        $q = $this->db->query($sql);
        
        $potArr = array();
        foreach ($q->result() as $r) {
            $d = array(
                'nopotongan' => $r->nopotongan,
                'jumlah' => $r->jumlahpotongan,
                'tanggal' => $tahun . '-' . $bulan . '-' . date('d'),
//                'angsuranke' => $r->nopotongan,
                'sisapinjaman' => null,
                'bulanpembayaran' => $bulan,
                'tahunpembayaran' => $tahun
            );
            
             

            if (!$debug && $debug != 2) {
                if ($this->input->post('prosesgaji') != 1) {
                    $this->db->insert('tpotonganr', $d);
                }

                if ($console) {
                    $this->db->insert('tpotonganr', $d);
                }
            } else if ($debug == 1) {
                echo "<pre>";
                print_r($d);
                echo "</pre>";
            }


            if ($debug == 3) {
                $this->db->insert('tpotonganr', $d);
            }
            
            $potArr[] = $arrPot = array(
                 'ketpot' => $r->ketpot, 
                 'jumlahpotongan' => $r->jumlahpotongan
             );            
        }
        return $potArr;
    }

    function pembayaranCuti($idemployee, $tahun, $console, $debug = false) {
        $sql = "SELECT
						rcuti.*,namacuti
					FROM
						rcuti
					join tcuti ON rcuti.kodecuti = tcuti.kodecuti
					WHERE
						idemployee = '$idemployee'
					AND tahun = '$tahun'
					AND paid = 0
					AND rcuti.kodecuti = 1 AND persetujuan = 1";
        $q = $this->db->query($sql);
        // $q = $this->db->get_where('rcuti',array('idemployee'=>$idemployee,'tahun'=>$tahun,'paid'=>0,'kodecuti'=>1));
        // echo $this->db->last_query();
        if ($q->num_rows() > 0) {
            $r = $q->row();
            $d = array(
                'paid' => 1
            );
            //sudah dibayar paid=1

            if ($this->input->post('prosesgaji') != 1 && $debug != 2) {
                $this->db->where(array('idemployee' => $idemployee, 'tahun' => $tahun, 'paid' => 0, 'kodecuti' => 1));
                $this->db->update('rcuti', $d);
            }

            if ($console && $debug != 2) {
                $this->db->where(array('idemployee' => $idemployee, 'tahun' => $tahun, 'paid' => 0, 'kodecuti' => 1));
                $this->db->update('rcuti', $d);
            }
            if ($debug == 1) {
                echo "<pre>";
                print_r($d);
                echo "</pre>";
            }
            if ($debug == 3) {
                $this->db->where(array('idemployee' => $idemployee, 'tahun' => $tahun, 'paid' => 0, 'kodecuti' => 1));
                $this->db->update('rcuti', $d);
            }

            return array('tahun' => $tahun, 'jmlcuti' => $r->jmlcuti, 'namacuti' => $r->namacuti, 'keterangan' => $r->ketcuti, 'rupuangcuti' => $r->rupuangcuti);
        } else {
            if ($debug == 1) {
                echo "CUTI TAHUNAN " . $this->db->last_query();
            }
            return false;
        }
    }

    function generatepph21($idemployee, $bulanan, $potongan, $debug = false) {
       
            $ptkptanggungan = 2025000;
            $ptkpPribadi = 24300000;

            $q = $this->db->get_where('employee', array('idemployee' => $idemployee));
            if ($q->num_rows() > 0) {
                $r = $q->row();
                $idjenisptkp = $r->idjenisptkp;

                $qptkp = $this->db->get_where('jenisptkp',array('idjenisptkp'=>$idjenisptkp))->row();
                $jumptkp = $qptkp->totalptkp;
                $jenisPtkp = $qptkp->namaptkp;

                // $idkawin = $r->idkawin;
                // if($idkawin==null)
                // {
                //     //kalo belom diiisi belom kawin
                //     $idkawin=1;
                // }
                // // 1;"Belum/Tidak Kawin"
                // // 2;"Kawin"
                // // 3;"Duda / Janda"
                // $qtanggungan = $this->db->query("select count(*) as jumtanggungan from dataanak where idemployee = '$idemployee'");

                // if ($qtanggungan->num_rows() > 0) {
                //     $rtanggungan = $qtanggungan->row();

                //     // echo "jumtanggungan ".$rtanggungan->jumtanggungan."<br>";

                //     $jumtanggungan = $rtanggungan->jumtanggungan;
                //     $jumPtkpTanggungan = $jumtanggungan <= 3 ? $ptkptanggungan * $jumtanggungan : $ptkptanggungan * 3;
                //     $jenisPtkp = 'TK/' . $jumtanggungan;
                // } else {
                //     //tidak ada tanggungan
                //     $jumtanggungan = 0;
                //     $jumPtkpTanggungan = 0;
                //     $jenisPtkp = 'TK/0';
                // }

                // if ($idkawin == 1 || $idkawin == 3) {
                //     //PTKP Untuk Laki-laki Tidak Kawin dan Wanita (Kawin/tidak kawin)
                //     $jumptkp = $ptkpPribadi + $ptkptanggungan + $jumPtkpTanggungan;
                //     $jenisPtkp = 'TK/' . $jumtanggungan;
                // } else if ($idkawin == 2) {
                //     //cek sutri bekerja
                //     $qcekkerja = $this->db->query("select kodekerja from datasutri where idemployee = '$idemployee'");
                //     if ($qcekkerja->num_rows() <= 0) {
                //         $txt = "Sutri belum diinput: " . $idemployee;
                //         if ($this->input->post('prosesgaji') == 1) {

                //             echo "{success: false, message:'$txt'}";
                //         } else {
                //             echo $txt;
                //         }
                //         exit;
                //     }
                //     $qcekkerja = $qcekkerja->row();
                //     // 			0;"Lainnya"
                //     // 1;"Sekolah (SD s/d SLTA)"
                //     // 2;"Kuliah (Perguruan Tinggi)"
                //     // 3;"Pegawai PLN"
                //     // 4;"Bekerja lainnya"
                //     // 5;"Tidak Bekerja"
                //     // PTKP untuk isteri yang bekerja pada satu pemberi kerja tidak digabung dengan suami,
                //     //  yang digabung dengan PTKP suami hanya yang bekerja pada lebih dari satu pemberi kerja dan/atau isteri yang 
                //     //  usaha (penghasilan digabung dengan penghasilan suami)
                //     if ($qcekkerja->kodekerja == 4) {
                //         //sutri tidak bekerja di PLN  				
                //         $jumptkp = $ptkpPribadi + $ptkpPribadi + $jumPtkpTanggungan;
                //         $jenisPtkp = 'K/I/' . $jumtanggungan;
                //     } else if ($qcekkerja->kodekerja == 3) {
                //         //sutri bekerja di PLN  
                //         $jumptkp = $ptkpPribadi + $jumPtkpTanggungan;
                //         $jenisPtkp = 'K/I/' . $jumtanggungan;
                //     } else {
                //         //sutri tidak bekerja
                //         // echo "jumPtkpTanggungan ".$jumPtkpTanggungan."<br>";
                //         $jumptkp = $ptkpPribadi + $ptkptanggungan + $jumPtkpTanggungan;
                //         $jenisPtkp = 'K/' . $jumtanggungan;
                //     }
                // }

//            echo "<hr>$jumptkp<hr>";

                $netoBulan = $bulanan;
                $netoTahun = $bulanan * 12;
//                echo 'asd';
                //                (12-I18+1)
                //ambil bulan tgl masuk pegawai
                $q = $this->db->get_where('employee',array('idemployee'=>$idemployee))->row();
                $tgl = explode("-", $q->pegawaitglmasuk);
//                print_r($tgl);
                $bulanmasuk = intval($tgl[1]);
//                echo '$bulanmasuk '.$bulanmasuk.'<br>'; 
                if($bulanmasuk>1)
                {
                    $bulan = 12-1+1;
//                    echo $bulan;
                    $netoTahun = ($bulanan-$potongan)*$bulan;
                } else {
                    $bulan = 12-$bulanmasuk+1;
                    $netoTahun = ($bulanan-$potongan)*12;
                }
//                echo number_format($netoTahun);
                
                 //Jumlah Ph Neto + pembayaran lain(Bonus/THR) - biaya jabatan
//                echo number_format($bulanan)." + ".$pembayaran." - ".number_format($jabatan);
//                $netoTahun = $bulanan + $pembayaran - $jabatan;
                
                        
                // Lapisan Penghasilan Kena Pajak	Tarif Pajak
                // Sampai dengan Rp 50.000.000,-	5%
                // di atas Rp 50.000.000,- sampai dengan Rp 250.000.000,-	15%
                // di atas Rp 250.000.000,- sampai dengan Rp 500.000.000,-	25%
                // di atas Rp 50.000.000,-	30%

                if ($netoTahun <= 50000000) {
                    $tarif = 5;
                } else if ($netoTahun > 50000000 && $netoTahun <= 250000000) {
                    $tarif = 15;
                } else if ($netoTahun > 250000000 && $netoTahun <= 500000000) {
                    $tarif = 25;
                } else if ($netoTahun > 500000000) {
                    $tarif = 30;
                }
                
                $wajibPajak = $netoTahun - $jumptkp;
                $pphSetahun = ($wajibPajak * $tarif) / 100;
                $pphTerhutang = $pphSetahun / $bulan;
                if($pphTerhutang<=0)
                {
                    $pphTerhutang =0;
                }
            }

//            echo "<hr>dsadas<hr>";
            $pph21 = array(
                'netoBulan' => $debug == true ? $netoBulan : $netoBulan,
                'netoTahun' => $debug == true ? $netoTahun : $netoTahun,
                'ptkp' => $debug == true ? $jumptkp : $jumptkp,
                'wajibpajak' => $debug == true ? $wajibPajak : $wajibPajak,
                'jenispph21' => $jenisPtkp,
                'tarifpajak' => $tarif,
                'pphterhutang' => $debug == true ? $pphTerhutang : $pphTerhutang
            );

        if ($debug == 1) {
            echo "<pre>";
            print_r($pph21);
            echo "</pre>";
        }
        return $pph21;
    }
    
// $idemployee,$bulan,$tahun,tphdpc,$gajidasar,$skala,$kodegrade,
    function saveIuranPensiun($idemployee, $bulan, $tahun, $tphdpc, $p1, $skalaphdp, $kodegrade, $p1, $console, $debug = false) {
        //pegawai nonpln yang honorarium tidak mendapat iuran pensiun
        //hanya pegawai tetap yang mendapatkan iuran pensiun

        $qcek = $this->db->query("select kekaryaankode,honorarium,lamabaru,kodekeljab from ms_pegawai where idemployee='$idemployee' and nojenpegawai=1");

        if ($debug == 1) {
            echo "<hr> iuranpensiun: " . $this->db->last_query() . "<hr>";
        }

        if ($qcek->num_rows() > 0) {
//            $q = $this->db->get('pengaturan')->row();
            $q = $this->m_penggajian->getRateOrg($idemployee, null);
//            print_r($q);
            $rcek = $qcek->row();

            //dekom kodekeljab=4 tidak ada iuran pensiun / Struktural (Dewan Komisaris)
            if ($rcek->kodekeljab != 4) {
                
                //pegawai lama menggunakan PHDP
                //pegawai baru menggunakan P1
                if ($rcek->lamabaru == 'Lama') {
//                    echo 'tphdpc: '.$tphdpc;
//                    echo $q['iplama'];
                    $persenip = $q['iplama'];
                    $persenipk = $q['ipklama'];
                    $ip = ($tphdpc * $persenip) / 100;
                    $ipk = ($tphdpc * $persenipk) / 100;
//                      echo "IP ".$ip;
                } else {
                    
                    $persenip = $q['ipbaru'];
                    $persenipk = $q['ipkbaru'];
                    $ip = ($p1 * $persenip) / 100;
                    $ipk = ($p1 * $persenipk) / 100;
//                     echo "IP ".$ip;
                }
//echo $persenip;

                $iuranpensiun = $ip + $ipk;

                //cek dulu udah bayar apa belum
                $qcek = $this->db->get_where('iuranpensiun', array('bulan' => $bulan, 'tahun' => $tahun, 'idemployee' => $idemployee));
                if ($qcek->num_rows() > 0) {
                    // return false;
                    $data = array(
                        'idemployee' => $idemployee,
                        'skala' => $skalaphdp,
                        'kodegrade' => $kodegrade,
                        // 'kodekompetensi'=> ,
                        'gajidasar' => $p1,
                        'ip' => $ip,
                        'ipk' => $ipk,
                        'tahun' => $tahun,
                        'bulan' => $bulan,
                        'tanggal' => date('Y-m-d'),
                        'datein' => date('Y-m-d H:m:s'),
                        'userin' => $this->session->userdata('username'),
                        'persenip' => $persenip,
                        'persenipk' => $persenipk,
                        'jumlahiuran' => $iuranpensiun,
                    );

                    if (!$debug && $debug != 2) {
                        if ($this->input->post('prosesgaji') != 1) {
                            $this->db->where(array('bulan' => $bulan, 'tahun' => $tahun, 'idemployee' => $idemployee));
                            $this->db->update('iuranpensiun', $data);
                        }
                    }

                    if ($console) {
                        $this->db->where(array('bulan' => $bulan, 'tahun' => $tahun, 'idemployee' => $idemployee));
                        $this->db->update('iuranpensiun', $data);
                    }

                    if ($debug == 3) {
                        $this->db->where(array('bulan' => $bulan, 'tahun' => $tahun, 'idemployee' => $idemployee));
                        $this->db->update('iuranpensiun', $data);
                    }
                    
//echo $this->db->last_query();
                    
                    if ($debug == 1) {
                        echo "IURAN PENSIUN <pre>";
                        print_r($data);
                        echo "</pre>";
                    }

                    return $data;
                } else {

                    $data = array(
                        'idemployee' => $idemployee,
                        'skala' => $skalaphdp,
                        'kodegrade' => $kodegrade,
                        // 'kodekompetensi'=> ,
                        'gajidasar' => $p1,
                        'ip' => $ip,
                        'ipk' => $ipk,
                        'tahun' => $tahun,
                        'bulan' => $bulan,
                        'tanggal' => date('Y-m-d'),
                        'datein' => date('Y-m-d H:m:s'),
                        'userin' => $this->session->userdata('username'),
                        'persenip' => $persenip,
                        'persenipk' => $persenipk,
                        'jumlahiuran' => $iuranpensiun,
                    );


                    if (!$debug && $debug != 2) {
                        if ($this->input->post('prosesgaji') != 1) {
                            $this->db->insert('iuranpensiun', $data);
                        }
                    }

                    if ($console) {
                        $this->db->insert('iuranpensiun', $data);
                    }

                    if ($debug == 3) {
                        $this->db->insert('iuranpensiun', $data);
                    }

                    if ($debug == 1) {
                        echo "IURAN PENSIUN <pre>";
                        print_r($data);
                        echo "</pre>";
                    }



                    return $data;
                }
            } //end if($rcek!=4)
            else {
                $data = array(
                    'idemployee' => null,
                    'skala' => null,
                    'kodegrade' => null,
                    // 'kodekompetensi'=> ,
                    'gajidasar' => null,
                    'ip' => null,
                    'ipk' => null,
                    'tahun' => null,
                    'bulan' => null,
                    'tanggal' => null,
                    'datein' => null,
                    'userin' => null,
                    'persenip' => null,
                    'persenipk' => null,
                    'jumlahiuran' => null,
                );
            }
        } else {
            return false;
        }


        // } else if($debug==2 || $debug){
        // $data = array(
        // 	'idemployee'=> $idemployee,
        // 	'skala'=> $skalaphdp,
        // 	'kodegrade'=> $kodegrade,
        // 	// 'kodekompetensi'=> ,
        // 	'gajidasar'=> $p1,
        // 	'ip'=> $ip,
        // 	'ipk'=> $ipk,
        // 	'tahun'=> $tahun,
        // 	'bulan'=> $bulan,
        // 	'tanggal'=> date('Y-m-d'),
        // 	'datein'=> date('Y-m-d H:m:s'),
        // 	'userin'=> $this->session->userdata('username'),
        // 	'persenip'=> $q->persenip,
        // 	'persenipk'=> $q->persenipk,
        // 	'jumlahiuran'=> $iuranpensiun,
        // );
        // return $data;
        // }
    }

    function perhitunganLembur($idemployee, $tahun, $bulan, $penghasilan, $console = false, $debug = false) {
        //Hari Libur Resmi Jatuh Pada Hari Kerja Terpendek misal Jum’at di skip dulu
//        $sql = "SELECT * 
//				from lembur
//				where tanggal::varchar LIKE '" . $tahun . "-" . $bulan . "%'
//				AND idemployee = '$idemployee'";
        $sql = "SELECT * 
				from lembur
				where bulanpembayaran='$bulan' and tahunpembayaran=$tahun
				AND idemployee = '$idemployee' and nolemburtipe=2";
//        echo $sql;
        $q = $this->db->query($sql);
        if ($q->num_rows() > 0) {
            $i = 0;
            foreach ($q->result() as $r) {

                if ($r->nolemburtipe == 2) {
                    //fix amount
                    $arr[$i] = Array(
                        'jumlahjam' => null,
                        'tariflemburkerja' => $r->upahlembur,
                        'waktulembur' => null,
                        'upahlembur' => $r->upahlembur,
                        'pembulatan' => null,
                        'upah8' => null,
                        'upah9' => null,
                        'upah1011' => null);
                    $tariflemburkerja = $r->upahlembur;
                } else {
                    // $r = $q->row();
                    $jamlembur = $this->itungJam($r->jammulai, $r->jamakhir)['hours'];

                    if ($r->nojenlembur == 2) {
                        $tariflemburkerja = null;
                        $upah8 = $jamlembur * 2 * 1 / 173 * $penghasilan;
                        $upah9 = NULL;
                        $upah1011 = NULL;

                        //hari libur
                        if ($jamlembur <= 8) {
                            $upahlembur = $upah8;
                        }

                        if ($jamlembur >= 9) {
                            $upah9 = $this->upah9jam($penghasilan);
                            $upahlembur = $upah8 + $upah9;
                        }

                        if ($jamlembur >= 10 && $jamlembur <= 11) {
                            $upah9 = $this->upah9jam($penghasilan);
                            $upah1011 = 1 * 4 * 1 / 173 * $penghasilan;
                            $upahlembur = $upah8 + $upah9 + $upah1011;
                        }

                        $arr[$i] = array('jumlahjam' => $jamlembur, 'waktulembur' => 'Hari Libur', 'upahlembur' => $upahlembur, 'pembulatan' => pembulatan($upahlembur), 'upah8' => $upah8, 'upah9' => $upah9, 'upah1011' => $upah1011);
                    } else {

                        $qpeg = $this->db->get_where('ms_pegawai', array('idemployee' => $idemployee))->row();
                        $qupah = $this->db->get_where('upahlembur', array('kodekeljab' => $qpeg->kodekeljab))->row();
                        $upahlembur = $jamlembur * $qupah->upah;
                        $tariflemburkerja = $qupah->upah;
                        $upah8 = null;
                        $upah9 = null;
                        $upah1011 = null;
                        //hari kerja pembayaran lembur ambil dari pengaturan
                        $arr[$i] = array('jumlahjam' => $jamlembur, 'tariflemburkerja' => $qupah->upah, 'waktulembur' => 'Hari Kerja', 'upahlembur' => $upahlembur, 'pembulatan' => pembulatan($upahlembur), 'upah8' => $upah8, 'upah9' => $upah9, 'upah1011' => $upah1011);
                    }


                    if ($this->input->post('prosesgaji') != 1 && $debug != 1 && $debug != 2) {
                        $this->db->where('nolembur', $r->nolembur);
                        $this->db->update('lembur', $arr[$i]);
                    }

                    if ($console && $debug != 1 && $debug != 2) {
                        $this->db->where('nolembur', $r->nolembur);
                        $this->db->update('lembur', $arr[$i]);
                    }
                } //end if($r->nolemburtipe==2)

                if ($debug == 3) {
                    $this->db->where('nolembur', $r->nolembur);
                    $this->db->update('lembur', $arr[$i]);
                }

                $i++;
            } //end foreach(result)

            if ($debug == 1) {
                echo "LEMBUR:<pre>";
                print_r($arr);
                echo "</pre>";
            }
//print_r($arr);
            //rekap
            // $burkerja = array();
            // $burlibur = array();
            $rekap = array();
            $i = 0;
            $rekap['libur']['jumlahlembur'] = 0;
            $rekap['libur']['jumlahjam'] = 0;

            $rekap['kerja']['jumlahlembur'] = 0;
            $rekap['kerja']['jumlahjam'] = 0;
            foreach ($arr as $key => $value) {
                if ($value['waktulembur'] == 'Hari Libur') {
                    $rekap['libur']['jumlahlembur'] = $rekap['libur']['jumlahlembur'] + $value['upahlembur'];
                    $rekap['libur']['jumlahjam'] = $rekap['libur']['jumlahjam'] + $value['jumlahjam'];
                } else {
                    $rekap['kerja']['jumlahlembur'] = $rekap['kerja']['jumlahlembur'] + $value['upahlembur'];
                    $rekap['kerja']['jumlahjam'] = $rekap['kerja']['jumlahjam'] + $value['jumlahjam'];
                }
                $i++;
            }

            $rekap['libur']['tariflemburkerja'] = null;
            $rekap['kerja']['tariflemburkerja'] = $tariflemburkerja;

            if ($debug == 1) {
                echo "LEMBUR rekap:<pre>";
                print_r($rekap);
                echo "</pre>";
            }
            return $rekap;
        } else {
            return false;
        }
    }

    function hapusgaji() {
        $postdata = json_decode($this->input->post('postdata'));
        // $periodehapusgaji = str_replace(", ", "", $this->input->post('bulantahun'));
        // // $tgl = explode("-", $periodehapusgaji);
        // $bulan = getNoMonth($periodehapusgaji[0]);
        // $tahun = $periodehapusgaji[1];

        $i = 0;
        $status = true;
        $idpayroll = null;
        foreach ($postdata as $key => $value) {
            if ($this->hapusgajiproses($value->idpayroll)) {
                
            } else {
                $status = false;
                $idpayroll = $value->idpayroll;
                break;
            }
            $i++;
        }

        if ($status) {
            echo "{success: true, message:'Sukses menghapus " . $i . " data gaji'}";
        } else {
            echo "{success: false, message:'gagal. lastid:$idpayroll'}";
        }
    }

    function hapusgajiproses($idpayroll) {
        /*
         * hapus data gaji yang sudah digenerate dari beberapa tabel berikut :
            delete from asuransipayhistory
            delete from potonganhistory
            delete from tunjanganhistory
            delete from prosesgaji
         */

        $this->db->trans_begin();

        $qpay = $this->db->get_where('payroll',array('idpayroll'=>$idpayroll))->row();
        $idjournal = $qpay->idjournal;
        $bulan = $qpay->month;
        $tahun = $qpay->year;
        $idunit = $qpay->idunit;

        $qpaylist = $this->db->get_where('payrollproceed',array('idpayroll'=>$idpayroll));
        foreach ($qpaylist->result() as $r) {
            # code...
            $arrwer = array(
                'idemployee' => $r->idemployee,
                'month' => $bulan,
                'year' => $tahun
            );

            $this->db->where($arrwer);
            $this->db->delete('asuransipayhistory');

            $this->db->where($arrwer);
            $this->db->delete('potonganhistory');

            $this->db->where($arrwer);
            $this->db->delete('tunjanganhistory');

            $this->db->where($arrwer);
            $this->db->delete('tambahangajihistory');
            
        }

        $this->db->where(array('idpayroll'=>$idpayroll));
        $this->db->delete('payrollproceed');

        $this->db->where(array('idpayroll'=>$idpayroll));
        $this->db->delete('payroll');

        $this->db->where(array('idjournal'=>$idjournal));
        $this->db->delete('accountlog');

        $qj = $this->db->get_where('journalitem',array('idjournal'=>$idjournal));
        foreach ($qj->result() as $r) {
            if($r->credit==0)
            {
                //beban
                $curBalance = $this->m_account->getCurrBalance($r->idaccount, $idunit);
                $newBalance = $curBalance - $r->debit;
                $this->m_account->saveNewBalance($r->idaccount, $newBalance, $idunit);
            } else {
                 $curBalance = $this->m_account->getCurrBalance($r->idaccount, $idunit);

                //cek akun hutang apa bukan
                $qck = $this->db->get_where('linkedaccunit',array('idunit'=>$idunit,'idlinked'=>22,'idaccount'=>$r->idaccount));
                if($qck->num_rows()>0)
                {
                    //hutang
                    $newBalance = $curBalance - $r->credit;      
                } else {
                     //kas                   
                    $newBalance = $curBalance + $r->credit;                   
                }
                $this->m_account->saveNewBalance($r->idaccount, $newBalance, $idunit);               
            }
        }
        $this->db->where(array('idjournal'=>$idjournal));
        $this->db->delete('journalitem');

        $this->db->where(array('idjournal'=>$idjournal));
        $this->db->delete('journal');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }

    function upah9jam($penghasilan) {
        return 1 * 3 * 1 / 173 * $penghasilan;
    }

    function itungJam($dtime, $atime) {
        //   	$time1 = '12:58';
        // $time2 = '15:00';
        // list($hours, $minutes) = explode(':', $time1);
        // $startTimestamp = mktime($hours, $minutes);
        // list($hours, $minutes) = explode(':', $time2);
        // $endTimestamp = mktime($hours, $minutes);
        // $seconds = $endTimestamp - $startTimestamp;
        // $minutes = ($seconds / 60) % 60;
        // $hours = round($seconds / (60 * 60));
        // // print_r(array('hours'=>$hours,'minutes'=>$minutes,'seconds'=>$seconds));
        // return array('hours'=>$hours,'minutes'=>$minutes,'seconds'=>$seconds);

        $nextDay = $dtime > $atime ? 1 : 0;
        $dep = EXPLODE(':', $dtime);
        $arr = EXPLODE(':', $atime);
        $diff = ABS(MKTIME($dep[0], $dep[1], 0, DATE('n'), DATE('j'), DATE('y')) - MKTIME($arr[0], $arr[1], 0, DATE('n'), DATE('j') + $nextDay, DATE('y')));
        $hours = FLOOR($diff / (60 * 60));
        $mins = FLOOR(($diff - ($hours * 60 * 60)) / (60));
        $secs = FLOOR(($diff - (($hours * 60 * 60) + ($mins * 60))));
        // IF(STRLEN($hours)<2){$hours="0".$hours;}
        // IF(STRLEN($mins)<2){$mins="0".$mins;}
        // IF(STRLEN($secs)<2){$secs="0".$secs;}
        // RETURN $hours.':'.$mins.':'.$secs;
        return array('hours' => $hours, 'minutes' => $mins, 'seconds' => $secs);
    }

    function harikerja() {
        $this->load->model('m_penggajian');
        $this->m_penggajian->tesharikerja('2014', '01');
    }

    function ngitungcuti() {
        $this->load->model('m_penggajian');
        $jumhari = cal_days_in_month(CAL_GREGORIAN, date('m'), date('Y'));
        //kalo cuti sebulan penuh dari total hari kerja, karyawan tidak mendapatkan p2;
        $sql = "SELECT periodeawal,periodeakhir from rcuti a
                where a.idemployee ='5679016P' and a.kodecuti=3 
                and periodeawal between '" . date('Y-m-d') . "' and '" . date('Y-m-') . "$jumhari'";
        $qcuti = $this->db->query($sql);
        foreach ($qcuti->result() as $r) {
            $days = (strtotime($r->periodeakhir) - strtotime($r->periodeawal)) / (60 * 60 * 24);
            print $r->periodeawal . " " . $r->periodeakhir . " " . $days . "<br>";

            //hitung hari kerja efektif
            echo $this->m_penggajian->harikerja($r->periodeawal, $r->periodeakhir);
        }
    }

    function hitungtahun() {
        $d1 = new DateTime('2011-07-12');
        $d2 = new DateTime('2008-03-09');

        $diff = $d2->diff($d1);

        echo $diff->y;
    }

    function tesxl() {
        // header("Content-type: application/vnd.ms-excel");
        // header("Content-Disposition: attachment;Filename=document_name.xls");
        // echo "<html>";
        // echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
        // echo "<body>";
        // echo "<b>testdata1</b> \t <u>testdata2</u> \t \n ";
        // echo "</body>";
        // echo "</html>";

        $html = $this->load->view('tesxl', true);
        header('Content-Type: application/force-download');
        header('Content-disposition: attachment; filename=export.xls');
        // Fix for crappy IE bug in download.  
        header("Pragma: ");
        header("Cache-Control: ");
        echo $html;
    }

    function getNamaJabatan($idemployee) {
//        $sql = " 
//   select d.namajab,f.ketkeljab
//                from rjabatan a
//                join ms_pegawai b ON a.idemployee = b.idemployee
//                join org c ON a.kodeorganak = c.kodeorganak and a.kodeorginduk = c.kodeorginduk
//                join tabjab d ON a.kodekeljab = d.kodekeljab and a.nourutjab = d.nourutjab
//                join keljab f ON a.kodekeljab = f.kodekeljab
//                join jenmut e ON a.nojenmut = e.nojenmut  
//WHERE TRUE AND a.idemployee='$idemployee'";
        $sql = "select b.ketjenjang,c.namajabatan,d.namaunit,e.namapendek,ketjab
                from rjabatan a
                left join jenjang b ON a.kodejenjang = b.kodejenjang
                left join jabatan c ON c.nojabatan = a.nojabatan
                left join unitjabatan d ON a.nounitjabatan = d.nounitjabatan
                join org e ON a.kodeorganak = e.kodeorganak
                where idemployee='$idemployee' and jabatantglmulai is not null 
                order by jabatantglmulai desc limit 1 ";
        $q = $this->db->query($sql);
        if ($q->num_rows() > 0) {
            $r = $q->row();
            if($r->ketjab!='--' || $r->ketjab=='')
            {
                return $r->ketjab;
            } else {
                return $r->ketjenjang." ". $r->namajabatan;
            }
            
        } else {
            return 'null';
        }
    }

    function tesIP() {
        $this->load->model('m_penggajian');
        $d = $this->m_penggajian->getRateOrg('fwer3efw');
        print_r($d);
    }
    
    function saveBatchStopGaji() {
        
        $pegdata = explode(",", $this->input->post('pegdata'));

        $this->db->trans_begin();

        $i = 0;
        foreach ($pegdata as $value) {

            $d = array(
                'idemployee' => $value,
                'userin' => $this->session->userdata('username'),
                'datein' => date('Y-m-d H:m:s'),
            );
            $this->db->insert('tperbentiangaji', $d);
            $i++;
        }
        

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success: false, message:'Data gagal diinput'}";
            return false;
        } else {
            $this->db->trans_commit();
            echo "{success: true, message:'Data berhasi diinput'}";
            return true;
        }
    }
    
    function saveBatchLanjutGaji()
    {
        $pegdata = explode(",", $this->input->post('pegdata'));

        $this->db->trans_begin();

        $i = 0;
        foreach ($pegdata as $value) {

//            $d = array(
//                'idemployee' => $value,
//                'userin' => $this->session->userdata('username'),
//                'datein' => date('Y-m-d H:m:s'),
//            );
            $this->db->where('idemployee', $value);
            $this->db->delete('tperbentiangaji');
            $i++;
        }
        

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success: false, message:'Data gagal diproses'}";
            return false;
        } else {
            $this->db->trans_commit();
            echo "{success: true, message:'Data berhasi diproses'}";
            return true;
        }
    }

    function lastPayrollDate()
    {
        if($this->session->userdata('group_id')!==99)
        {
            $idunit = $this->session->userdata('idunit');
            $wer = " WHERE idunit=$idunit";
        } else {
            $wer = null;
        }
        $q = $this->db->query("select datein from prosesgaji $wer ORDER BY datein desc limit 1");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            echo json_encode(array('date'=>$r->datein));
        } else {
            echo json_encode(array('date'=>'Belum pernah'));
        }
    }

    function insertPayrollListTmp($idemployee2=null,$numjamkehadiran=null)
    {
        // echo 'ssss'.$idemployee2;
        $this->load->model('m_penggajian');
        $periode = str_replace("T00:00:00", "", $this->input->post('periode'));
        $periodeArr = explode("-", $periode);
        // print_r($periodeArr);
        $dd = $periodeArr[2];
        // echo $d;
        $m = $periodeArr[1];
        $y = $periodeArr[0];

        $debug = false;

        if($idemployee2==null)
        {
            $records = json_decode($this->input->post('postdata'));
            // print_r($records);
        } else {
            $records[0] = $idemployee2;
            // print_r($records);
        }

        $jumlahpeg=0;
        $jumlahpembayaran=0;
        $jumlahtunjangan=0;
        $jumlahpotongan=0;
        foreach ($records as $idemployee) {

          $qpegawai = $this->db->get_where('employee',array('idemployee'=>$idemployee))->row();
          $idemployeetype = $qpegawai->idemployeetype;

          $qunit = $this->db->get_where('unit',array('idunit'=>$qpegawai->idunit))->row();

          $qemptype = $this->db->get_where('employeetype',array('idemployeetype'=>$idemployeetype))->row();
          $payrolltypeid = $qemptype->payrolltypeid;
          $fare = $qemptype->fare;

          $qpayrolltype = $this->db->get_where('payrolltype',array('payrolltypeid'=>$payrolltypeid))->row();

          if($payrolltypeid==1)
          {
            //jam
            if($numjamkehadiran!=null)
            {
                $jumlahjam=$numjamkehadiran;
            } else {
                $jumlahjam=1;
            }
            
            $jumlahkehadiran=0;
            $totalgaji = $fare*$jumlahjam;
          } else if($payrolltypeid==2)
              {
                    //kehadiran
                    $jumlahjam=0;
                     if($numjamkehadiran!=null)
                    {
                        $jumlahkehadiran=$numjamkehadiran;
                    } else {
                        $jumlahkehadiran=1;
                    }
                    $totalgaji = $fare*$jumlahkehadiran;
                  } else if($payrolltypeid==3)
                      {
                        //fix
                        $jumlahjam=0;
                        $jumlahkehadiran=0;
                        $totalgaji = $fare;
                      }


            //tunjangan\
            // echo $d.",".$m.",".$y;
            $tambahangaji = $this->m_penggajian->tambahangaji($idemployee,$debug,$dd,$m,$y);
            // print_r($tunjangan);
            $dslip['tambahangaji'] = $tambahangaji;

              //tunjangan
              $tunjangan = $this->m_penggajian->tunjangan($idemployee,$debug,$dd,$m,$y,$totalgaji);
              // print_r($tunjangan);
              $dslip['tunjangan'] = $tunjangan;

            //potongan
            $potongan = $this->m_penggajian->potongan($idemployee,$debug,$dd,$m,$y,'potongan');
            // print_r($potongan);

            //pinjaman
            $pinjaman = $this->m_penggajian->potongan($idemployee,$debug,$dd,$m,$y,'pinjaman');
            // print_r($pinjaman);

            //premi pemotong penghasilan (jpkPeg,jkkPeg,jkPeg)
            $premiAsuransi = $this->m_penggajian->premi($idemployee,$totalgaji,null,$debug);

            $totalPremiEmployee = $premiAsuransi['totalemployee'];
            $totalPremiCompany = $premiAsuransi['totalcompany'];

            $biayajabatan = ($totalgaji)*(5/100);
            
            //JHT / pengurang pendapatan
            $premiJht = $this->m_penggajian->premi($idemployee,$totalgaji,4);
//                print_r($premiJht);
            
            //iuran premi perusahaan
            $dslip['totalIuranPerusaaan'] =  $premiJht['totalcompany'];

            $penghasilanUPPH = $totalgaji - $biayajabatan + $premiJht['totalemployee'];
            // echo "penghasilan:".$totalgaji." + ".$tunjangan['total']." + ".$tambahangaji['total'];
            $penghasilan = $totalgaji + $tunjangan['total'] + $tambahangaji['total'];                    

            $pengurang = $biayajabatan+$premiJht['totalemployee'];

            $totalpenghasilan = $penghasilan;

            $pph = $this->generatepph21($idemployee, $totalpenghasilan, $pengurang, $debug);

//                $dslip['potonganTotal'] = $pph['pphterhutang'] + $premiPemotong['totalemployee'] + $biayajabatan + $dslip['totalpotongan'] ;
           // echo "potonganTotal:". $pph['pphterhutang']." + ".$potongan['total']." + ".$premiJht['totalemployee'];
            $potonganTotal = $pph['pphterhutang'] + $potongan['total'] + $pinjaman['total'];
            
            $totalpembayaran = $totalpenghasilan - $potonganTotal;
// echo $totalgaji;
              $d = array(
                    "idemployee" => $idemployee,
                    "idemployeetype" => $idemployeetype,
                    "payrolltypeid" => $payrolltypeid,
                    "firstname" => $qpegawai->firstname,
                    "lastname" => $qpegawai->lastname,
                    "namaunit" => $qunit->namaunit,
                    "nametype" => $qemptype->nametype,
                    "pembayaranperjamkehadiran"=>$fare,
                    "jumlahjam" => $jumlahjam,
                    "jumlahkehadiran" => $jumlahkehadiran,
                    "totalgaji" => $totalgaji,
                    "penambahangaji"=>$tambahangaji['total'],
                    "totaltunjangan" => $tunjangan['total'],
                    "pph21" => $pph['pphterhutang'],
                    "totalpotongan" => $potonganTotal,
                    "totalpembayaran" => $totalpembayaran,
                    "payname" => $qpayrolltype->payname,
                    "userin" => $this->session->userdata('username'),
                    "code" => $qpegawai->code,
                    "userid" =>  $this->session->userdata('userid'),
                    "ptkp" => $pph['ptkp'],
                    "wajibpajak" => $pph['wajibpajak'],
                    "jenispph21" => $pph['jenispph21'],
                    "tarifpajak" => $pph['tarifpajak'],
                    "pphterhutang" => $pph['pphterhutang'],
                    "idunit" => $qpegawai->idunit
            );
            
            $premiinsurance=null;

            if(isset($premiAsuransi['premi']))
            {
                foreach ($premiAsuransi['premi'] as $key => $v) {
                    $premiinsurance .= $v['idasuransi'].','.$v['namapremi'].','.$v['persenE'].','.$v['persenC'].','.$v['premiE'].','.$v['premiC'].':';
                }
                $d['premiinsurance'] = $premiinsurance;
            } else {
                $d['premiinsurance'] = false;
            }

              if($idemployee2==null)
              {
                $this->db->insert('payrolltmp',$d);
              } else {
                $this->db->where('idemployee',$idemployee);
                $this->db->update('payrolltmp',$d);
              }
            // print_r($d);

            $jumlahpeg+=1;
            $jumlahpembayaran+=$totalpembayaran;
            $jumlahtunjangan+=$tunjangan['total'];
            $jumlahpotongan+=$potongan['total'];
        }

        
        if($idemployee2==null)
        {            
            echo json_encode(array('success'=>true));
        } else {
            return true;
        }
    }

    function getSummaryPayroll()
    {
        $userid = $this->session->userdata('userid');
        $q = $this->db->query("select sum(totalgaji) as totalgaji,sum(totalpotongan) as totalpotongan,sum(totaltunjangan) as totaltunjangan,
            sum(totalpembayaran) as totalpembayaran,count(*) as totalpegawai
            from payrolltmp
            where userid=$userid");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $val="<div align=left>Total Pegawai: ".number_format($r->totalpegawai)."<br> Total Tunjangan: ".number_format($r->totaltunjangan)."<br> Total Potongan: ".number_format($r->totalpotongan)."<br> <br>Total Pembayaran Gaji: ".number_format($r->totalpembayaran)."</left>";
            echo json_encode(array('success'=>true,'val'=>$val));
        } else {
             $val="<div align=left>Total Pegawai: <br> Total Tunjangan: <br> Total Potongan: <br> <br>Total Pembayaran Gaji: </left>";
            echo json_encode(array('success'=>true,'val'=>$val));
        }
    }

    function deletePayrollListTmp()
    {
        $userid = $this->session->userdata('userid');
        $this->db->where('userid',$userid);
        $this->db->delete('payrolltmp');
    }

    function updatePayrollListTmp()
    {
        $idemployee = $this->input->post('idemployee');
        $payrolltypeid = $this->input->post('payrolltypeid');
        $numjamkehadiran = $this->input->post('numjamkehadiran');
        $this->insertPayrollListTmp($idemployee,$numjamkehadiran);
        if($this->db->affected_rows()>0)
        {
            echo json_encode(array('success'=>true));
        } else {
            echo json_encode(array('success'=>false));
        }
    }

    function deletePayrollTmpBtn()
    {
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $idemployee) {
            $this->db->where('idemployee',$idemployee);
            $this->db->delete('payrolltmp');
        }
    }

    function getpenghasilan($idemployee,$periode,$numjamkehadiran=null)
    {
        $this->load->model('m_penggajian');

        $debug=false;

        //gaji+pembayaranlain+tunjangan
        $periodeArr = explode("-", $periode);
        $d = $periodeArr[2];
        $m = $periodeArr[1];
        $y = $periodeArr[0];

          $qpegawai = $this->db->get_where('employee',array('idemployee'=>$idemployee))->row();
          $idemployeetype = $qpegawai->idemployeetype;

          $qunit = $this->db->get_where('unit',array('idunit'=>$qpegawai->idunit))->row();

          $qemptype = $this->db->get_where('employeetype',array('idemployeetype'=>$idemployeetype))->row();
          $payrolltypeid = $qemptype->payrolltypeid;
          $fare = $qemptype->fare;

          $qpayrolltype = $this->db->get_where('payrolltype',array('payrolltypeid'=>$payrolltypeid))->row();

          if($payrolltypeid==1)
          {
            //jam
            if($numjamkehadiran!=null)
            {
                $jumlahjam=$numjamkehadiran;
            } else {
                $jumlahjam=1;
            }
            
            $jumlahkehadiran=0;
            $totalgaji = $fare*$jumlahjam;
          } else if($payrolltypeid==2)
              {
                    //kehadiran
                    $jumlahjam=0;
                     if($numjamkehadiran!=null)
                    {
                        $jumlahkehadiran=$numjamkehadiran;
                    } else {
                        $jumlahkehadiran=1;
                    }
                    $totalgaji = $fare*$jumlahkehadiran;
                  } else if($payrolltypeid==3)
                      {
                        //fix
                        $jumlahjam=0;
                        $jumlahkehadiran=0;
                        $totalgaji = $fare;
                      }


            //tunjangan
            $tambahangaji = $this->m_penggajian->tambahangaji($idemployee,$debug,$d,$m,$y);

              //tunjangan
              $tunjangan = $this->m_penggajian->tunjangan($idemployee,$debug,$d,$m,$y,$totalgaji);

            $penghasilan = $totalgaji + $tunjangan['total'] + $tambahangaji['total'];                    

            return $penghasilan;
    }

    function insertThrListTmp($idemployee2=null,$kehadiranjam=1)
    {
        $this->load->model('m_penggajian');
        $periode = str_replace("T00:00:00", "", $this->input->post('periode'));
        $periodeArr = explode("-", $periode);
        $d = $periodeArr[2];
        $m = $periodeArr[1];
        $y = $periodeArr[0];

        $thrtambahan = $this->input->post('thrtambahan')=='' ? 0 : str_replace(".", "", $this->input->post('thrtambahan'));
        $debug = false;

        if($idemployee2==null)
        {
            $records = json_decode($this->input->post('postdata'));
            // print_r($records);
        } else {
            $records[0] = $idemployee2;
            // print_r($records);
        }

        foreach ($records as $idemployee) {
                $qpeg = $this->db->get_where('employee',array('idemployee'=>$idemployee,'display'=>null))->row();
                $pegawaitglmasuk = $qpeg->pegawaitglmasuk;

                $jummasakerja = $this->hitungbulan($pegawaitglmasuk,$periode);
                if($jummasakerja>12)
                {
                    $pengali=12;
                } else {
                    $pengali=$jummasakerja;
                }

                // $kehadiranjam = $this->input->post('kehadiranjam')=='' ? null : $this->input->post('kehadiranjam');

                $totalpendapatan = $this->getpenghasilan($idemployee,$periode,$kehadiranjam);
                $jumlahthr = ($pengali/12)*$totalpendapatan;

                $totalthr = $jumlahthr+$thrtambahan;

                $data = array(
                        "idemployee" => $idemployee,
                        "pengali" => $pengali,
                        "totalpendapatan" => $totalpendapatan,
                        "kehadiranjam"=>$kehadiranjam,
                        "masakerja" => $jummasakerja,
                        "jumlahthr" => $jumlahthr,
                        "thrtambahan" => $thrtambahan,
                        "totalthr" => $totalthr,
                        "month" => $m,
                        "year" => $y,
                        "userid" => $this->session->userdata('userid'),
                        "keterangan"=>$this->input->post('keterangan')=='' ? null : $this->input->post('keterangan')
                    );
                if($this->input->post('update')=='true')
                {
                    $this->db->where(array('idemployee'=>$this->input->post('idemployee'),'userid' => $this->session->userdata('userid')));
                    $this->db->update('thrlisttmp',$data);
                } else {
                    $this->db->insert('thrlisttmp',$data);
                }
                
            }

        if($idemployee2==null)
        {            
            echo json_encode(array('success'=>true));
        } else {
            return true;
        }
    }

    function updateThrListTmp()
    {
        $idemployee = $this->input->post('idemployee');
        $kehadiranjam = $this->input->post('kehadiranjam')=='' ? null : $this->input->post('kehadiranjam');
        $this->insertThrListTmp($idemployee,$kehadiranjam);
        if($this->db->affected_rows()>0)
        {
            echo json_encode(array('success'=>true));
        } else {
            echo json_encode(array('success'=>false));
        }
    }

    function getSummaryThr()
    {
        // <div align=left>Total Pegawai: <br> Total Pembayaran THR: <br></left>
         $userid = $this->session->userdata('userid');
        $q = $this->db->query("select count(*) as totalpeg,sum(totalthr) as totalthr from thrlisttmp
            where userid=$userid");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $val="<div align=left>Total Pegawai: ".number_format($r->totalpeg)."<br> Total Pembayaran THR: ".number_format($r->totalthr)."</left>";
            echo json_encode(array('success'=>true,'val'=>$val));
        } else {
             $val="<div align=left>Total Pegawai: <br> Total Pembayaran THR: </left>";
            echo json_encode(array('success'=>true,'val'=>$val));
        }
    }

    function prosesTHR2()
    {
        $this->load->model('m_data');
        $this->load->model('m_journal');
        $this->load->model('m_penggajian');

        $this->db->trans_begin();

        // $periodepenggajian = str_replace("T00:00:00", "", $this->input->post('periodepenggajian'));
        $periode = $this->input->post('periodethr');
        $periodeArr = explode("-", $periode);

        // print_r($periodeArr);
        $idunit = $this->input->post('idunit');
        $idaccountpaythrSetup = $this->input->post('idaccountpaythrSetup');
        $idaccountthrSetup = $this->input->post('idaccountthrSetup');

        $m = $periodeArr[1];
        $y = $periodeArr[2];
        $d = $periodeArr[0];
        
        $this->db->trans_begin();

        $qseq = $this->db->query("select nextval('seq_thr') as id")->row();
        $idthr = $qseq->id;

        $q = $this->db->get_where('thrlisttmp',array('userid'=>$this->session->userdata('userid')));
        if($q->num_rows()>0)
        {
                 $dthr = array(
                        "idthr" => $idthr,
                        "tglthr" =>$periode,
                        // "idjournal" => $idjournal,
                        "month" => $m,
                        "year" => $y,
                        // "keterangan" varchar(225),
                        "userin" => $this->session->userdata('username'),
                        "datein" => date('Y-m-d'),
                        "idunit" => $idunit
                        // "totalthr" => $totalthr
                    );
                $this->db->insert('thr',$dthr);

                $i=1;
                $totalthr=0;
                foreach ($q->result() as $r) {
                    $data = array(
                            "idthr" => $idthr,
                            "idemployee" => $r->idemployee,
                            "pengali" => $r->pengali,
                            "totalpendapatan" => $r->totalpendapatan,
                            "masakerja"=> $r->masakerja,
                            "jumlahthr" => $r->jumlahthr,
                            "thrtambahan" => $r->thrtambahan,
                            "kehadiranjam" => $r->kehadiranjam,
                            "userid" => $r->userid,
                            "totalthr" => $r->totalthr,
                            "month" => $r->month,
                            "year" => $r->year,
                            "keterangan" => $r->keterangan
                        );
                    $totalthr=$r->totalthr;
                    $this->db->insert('thrlist',$data);
                }

                $idjournal = $this->m_journal->saveThr($periode,$totalthr,$this->session->userdata('userid'),$idunit,$idaccountpaythrSetup,$idaccountthrSetup);

                $this->db->where('idthr',$idthr);
                $this->db->update('thr',array('idjournal'=>$idjournal,'totalthr'=>$totalthr));

                $this->db->where('userid',$this->session->userdata('userid'));
                $this->db->delete('thrlisttmp');
        }

         if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            echo json_encode(array('success'=>false,'message'=>'Proses THR gagal. Silahkan coba lagi.'));
        }
        else
        {
            $this->db->trans_commit();
            echo json_encode(array('success'=>true,'message'=>'THR berhasil diproses.'));
        }
    }

    function importPotongan()
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

            $val = $xlsx->rows(1);

             // echo count($d);
            if(count($val[0])!=7)
            {
                $status = false;
                $message = 'Format template file import potongan tidak sesuai/salah';
                $valid = array('status' => $status, 'message' => $message);
                echo json_encode($valid);
                exit;
            }

            $start = 1;
            while (isset($val[$start])) {
                $d = $val[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasipotongan($d);
                    if ($valid['status']) {
                        $oke = true;
                        $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                        $idupload = $qseq->idupload;
                    } else {
                        $oke = false;
                        break;
                    }
                    $start++;
                }
            }

            // $start-=1;
            if ($oke) {
                $this->db->trans_begin();

                $start = 1;

                $total = 0;
                while (isset($val[$start])) {

                    $d = $val[$start];
                    if($d['0']!='')
                    {
                        $qemp = $this->db->get_where('employee', array('code' => "".$d['1']."",'display'=>null))->row();
                        // $data = array(
                        //     // "idtunjangan" int4 DEFAULT nextval('seq_tunjangan'::regclass) NOT NULL,
                        //     "idtunjtype" =>$d[2],
                        //     "idamounttype" => 1,
                        //     "idemployee" => $qemp->idemployee,
                        //     "idsiklus" => 1,
                        //     "namatunjangan" => isset($d[6])==false ? null : $d[6],
                        //     "startdate" => $d[4]=='' ? null : $this->convertdateimport($d[4]),
                        //     "enddate" => $d[5]=='' ? null : $this->convertdateimport($d[5]),
                        //     "jumlah" => $d[3],
                        //     // "display" int4,
                        //    "userin" => $this->session->userdata('username'),
                        //     "usermod" => $this->session->userdata('username'),
                        //     "datein"=>date('Y-m-d H:m:s'),
                        //     "datemod"=>date('Y-m-d H:m:s'),
                        //     // "persen" float8,
                        //     "jenisnilai" => 'Nilai Tetap',
                        //     "idupload" =>$idupload
                        // );
                        $data = array(
                            // "idpotongan" int4 DEFAULT nextval('seq_potongan'::regclass) NOT NULL,
                            "idpotongantype" => $d[2],
                            // "idamounttype" int4,
                            "idsiklus" => 1,
                            "idemployee" => $qemp->idemployee,
                            "startdate" => $d[4]=='' ? null : $this->convertdateimport($d[4]),
                            "enddate" => $d[5]=='' ? null : $this->convertdateimport($d[5]),
                            "totalpotongan" => $d[3],
                            "sisapotongan" => $d[3],
                            "jumlahpotongan" =>$d[3],
                              "userin" => $this->session->userdata('username'),
                            "usermod" => $this->session->userdata('username'),
                            "datein"=>date('Y-m-d H:m:s'),
                            "datemod"=>date('Y-m-d H:m:s'),
                            "jumlahangsuran" => 1,
                            "keterangan" => isset($d[6])==false ? null : $d[6],
                            "sisaangsuran" =>1,
                            "idupload" =>$idupload
                            // "display" int4,
                        );
                        $this->db->insert('potongan',$data);
                        $start++;
                    }
                }

                $dup = array(
                    "idupload" => $idupload,
                    "orig_name" => $orig_name,
                    "userin" => $this->session->userdata('username'),
                    "datein"=>date('Y-m-d H:m:s'),
                    "type" =>'potongan'
                );
                $this->db->insert('upload',$dup);

                $start-=1;
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $start . ' Data Potongan Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $start . ' Data Potongan Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
    }

    function validasipotongan($d,$update=false)
    {
         $status = true;
      
        $message = 'valid';

        $sdArr = explode(".", $d['4']);
        if(count($sdArr)!=3)
        {
            $status = false;   
            $message = 'Error data NO ' . $d[0] .' : Format Tanggal Mulai Potongan Salah. <br><br> Format Tanggal: dd.mm.yyyy';
            return array('status' => $status, 'message' => $message);
        }
        $startdate = $sdArr[2].'-'.$sdArr[1].'-01';
        $startdateEnd = $sdArr[2].'-'.$sdArr[1].'-'.lastday($sdArr[1], $sdArr[2]);

        $edArr = explode(".", $d['5']);
        if(count($edArr)!=3)
        {
            $status = false;   
            $message = 'Error data NO ' . $d[0] .' : Format Tanggal Akhir Potongan Salah. <br><br> Format Tanggal: dd.mm.yyyy';
            return array('status' => $status, 'message' => $message);
        }
        $enddate = $edArr[2].'-'.$edArr[1].'-01';
        $enddateEnd = $edArr[2].'-'.$edArr[1].'-'.lastday($edArr[1], $edArr[2]);

        $code = $d['1'];
        $qemp = $this->db->get_where('employee', array('code' => "".$code."",'display'=>null))->row();
        $idemployee = $qemp->idemployee;
        $qcek = $this->db->query("select idpotongan
                    from potongan
                    where idpotongantype = ".$d['2']." 
                    and display is null and idemployee=$idemployee and (startdate between '$startdate' and '$startdateEnd' OR enddate between '$enddate' and '$enddateEnd')");
        if($qcek->num_rows()>0)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Potongan sudah ada di dalam database';
        } else {
            $qcek = $this->db->query("select idpotongan
                    from potongan
                    where idpotongantype = ".$d['2']." 
                    and display is null and idemployee=$idemployee and enddate='".$sdArr[2].'-'.$sdArr[1].'-'.$sdArr[0]."'");
            if($qcek->num_rows()>0)
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Potongan sudah ada di dalam database';
            } else {
                
            }
        }

        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Nomor Induk Pegawai tidak boleh kosong';
        } else {
            $code = $d['1'];
             $q = $this->db->get_where('employee', array('code' => "".$code."",'display'=>null));
             // echo $this->db->last_query();
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Nomor Induk Pegawai: '.$d['1'].' tidak ada di database';
            }
        }

        if($d['2']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Potongan tidak boleh kosong';
        } else {
             $q = $this->db->get_where('potongantype', array('idpotongantype' => $d['2'],'display'=>null));
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Potongan: '.$d['2'].' tidak ada di database';
            }
        }

        if(isset($d['3'])==false || $d['3']=='' || $d['3']=='0' || $d['3']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Jumlah Potongan tidak boleh kosong';
        }

        if($d['4']!='' || $d['4']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Tanggal Mulai Potongan',$d['4']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['4'];
            }
        } else {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Mulai Potongan tidak boleh kosong';
        }

        if($d['5']!='' || $d['5']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Tanggal Akhir Potongan',$d['5']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['5'];
            }
        } else {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Akhir Potongan tidak boleh kosong';
        }

       
        return array('status' => $status, 'message' => $message);
    }

    function importTunjangan()
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

            $val = $xlsx->rows(1);

             // echo count($d);
            if(count($val[0])!=7)
            {
                $status = false;
                $message = 'Format template file import tunjangan tidak sesuai/salah';
                $valid = array('status' => $status, 'message' => $message);
                echo json_encode($valid);
                exit;
            }

            $start = 1;
            while (isset($val[$start])) {
                $d = $val[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasitunjangan($d);
                    if ($valid['status']) {
                        $oke = true;
                        $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                        $idupload = $qseq->idupload;
                    } else {
                        $oke = false;
                        break;
                    }
                    $start++;
                }
            }

            // $start-=1;
            if ($oke) {
                $this->db->trans_begin();

                $start = 1;

                $total = 0;
                while (isset($val[$start])) {

                    $d = $val[$start];
                    if($d['0']!='')
                    {
                        $qemp = $this->db->get_where('employee', array('code' => "".$d['1']."",'display'=>null))->row();
                        $data = array(
                            // "idtunjangan" int4 DEFAULT nextval('seq_tunjangan'::regclass) NOT NULL,
                            "idtunjtype" =>$d[2],
                            "idamounttype" => 1,
                            "idemployee" => $qemp->idemployee,
                            "idsiklus" => 1,
                            "namatunjangan" => isset($d[6])==false ? null : $d[6],
                            "startdate" => $d[4]=='' ? null : $this->convertdateimport($d[4]),
                            "enddate" => $d[5]=='' ? null : $this->convertdateimport($d[5]),
                            "jumlah" => $d[3],
                            // "display" int4,
                           "userin" => $this->session->userdata('username'),
                            "usermod" => $this->session->userdata('username'),
                            "datein"=>date('Y-m-d H:m:s'),
                            "datemod"=>date('Y-m-d H:m:s'),
                            // "persen" float8,
                            "jenisnilai" => 'Nilai Tetap',
                            "idupload" =>$idupload
                        );
                        $this->db->insert('tunjangan',$data);
                        $start++;
                    }
                }

                $dup = array(
                    "idupload" => $idupload,
                    "orig_name" => $orig_name,
                    "userin" => $this->session->userdata('username'),
                    "datein"=>date('Y-m-d H:m:s'),
                    "type" =>'tunjangan'
                );
                $this->db->insert('upload',$dup);

                $start-=1;
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $start . ' Data Tunjangan Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $start . ' Data Tunjangan Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
    }

    function validasitunjangan($d,$update=false)
    {
         $status = true;
      
        $message = 'valid';

        $sdArr = explode(".", $d['4']);
        if(count($sdArr)!=3)
        {
            $status = false;   
            $message = 'Error data NO ' . $d[0] .' : Format Tanggal Awal Tunjangan Salah. <br><br> Format Tanggal: dd.mm.yyyy';
            return array('status' => $status, 'message' => $message);
        }
        $startdate = $sdArr[2].'-'.$sdArr[1].'-01';
        $startdateEnd = $sdArr[2].'-'.$sdArr[1].'-'.lastday($sdArr[1], $sdArr[2]);

        $edArr = explode(".", $d['5']);
        if(count($edArr)!=3)
        {
            $status = false;   
            $message = 'Error data NO ' . $d[0] .' : Format Tanggal Akhir Tunjangan Salah. <br><br> Format Tanggal: dd.mm.yyyy';
            return array('status' => $status, 'message' => $message);
        }
        $enddate = $edArr[2].'-'.$edArr[1].'-01';
        $enddateEnd = $edArr[2].'-'.$edArr[1].'-'.lastday($edArr[1], $edArr[2]);

        $code = $d['1'];
        $qemp = $this->db->get_where('employee', array('code' => "".$code."",'display'=>null))->row();
        $idemployee = $qemp->idemployee;
        $qcek = $this->db->query("select idtunjangan
                    from tunjangan
                    where idtunjtype = ".$d['2']." 
                    and display is null and idemployee=$idemployee and (startdate between '$startdate' and '$startdateEnd' OR enddate between '$enddate' and '$enddateEnd')");
        if($qcek->num_rows()>0)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tunjangan sudah ada di dalam database';
        } else {
            $qcek = $this->db->query("select idtunjangan
                    from tunjangan
                    where idtunjtype = ".$d['2']." 
                    and display is null and idemployee=$idemployee and enddate='".$sdArr[2].'-'.$sdArr[1].'-'.$sdArr[0]."'");
            if($qcek->num_rows()>0)
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Tunjangan sudah ada di dalam database';
            } else {
                
            }
        }

        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Nomor Induk Pegawai tidak boleh kosong';
        } else {
            $code = $d['1'];
             $q = $this->db->get_where('employee', array('code' => "".$code."",'display'=>null));
             // echo $this->db->last_query();
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Nomor Induk Pegawai: '.$d['1'].' tidak ada di database';
            }
        }

        if($d['2']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Tunjangan tidak boleh kosong';
        } else {
             $q = $this->db->get_where('tunjangantype', array('idtunjtype' => $d['2'],'display'=>null));
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Tunjangan: '.$d['2'].' tidak ada di database';
            }
        }

        if(isset($d['3'])==false || $d['3']=='' || $d['3']=='0' || $d['3']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Jumlah Tunjangan tidak boleh kosong';
        }

        if($d['4']!='' || $d['4']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Tanggal Mulai Pembayaran',$d['4']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['4'];
            }
        } else {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Mulai Pembayaran tidak boleh kosong';
        }

        if($d['5']!='' || $d['5']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Tanggal Akhir Pembayaran',$d['5']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['5'];
            }
        } else {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Akhir Pembayaran tidak boleh kosong';
        }

       
        return array('status' => $status, 'message' => $message);
    }

    function convertdateimport($date)
    {
        $date = explode(".", $date);
        return $date[2].'-'.$date[1].'-'.$date[0];
    }

    function validasitgl($no,$jenis,$date)
    {
        $tgl = explode(".", $date);
// echo 'count:'.count($tgl).'   ';
        if(count($tgl)!=3)
        {
            $status = false;   
            $message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format Tanggal: dd.mm.yyyy';
        } else {

            $message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format Tanggal: dd.mm.yyyy';
            if(isset($tgl[1]))
            {
                $bulan = intval($tgl[1]);
                 // $status = false;   
                if(count($tgl)<3)
                {
                    $status = false;            
                } else if($tgl[0]>33) {
                    $status = false;
                } else if($bulan>12) {
                    $status = false;
                }  else {
                    $status = true;
                    $message = null;
                }
            } else {
                $status = false;   
            }
        }

        // $bulan = intval($tgl[1]);

        return array('message'=>$message,'status'=>$status);
    }

    function deleteThrTmpBtn()
    {
        $postdata = json_decode($this->input->post('postdata'));
        foreach ($postdata as $key => $value) {
            $this->db->where('idemployee',$value);
            $this->db->delete('thrlisttmp');
         }
    }

    function hitungbulan($date1,$date2)
    {
        // $date1 = '2010-01-01';
        // $date2 = '2011-01-01';

        $ts1 = strtotime($date1);
        $ts2 = strtotime($date2);

        $year1 = date('Y', $ts1);
        $year2 = date('Y', $ts2);

        $month1 = date('m', $ts1);
        $month2 = date('m', $ts2);

        $diff = (($year2 - $year1) * 12) + ($month2 - $month1);
        return $diff;
    }

    function getPayrollType()
    {
        $idemployee = $this->input->post('idemployee');
        $q = $this->db->query("select idemployee,b.payrolltypeid
                from employee a
                join employeetype b ON a.idemployeetype = b.idemployeetype
                where idemployee=$idemployee")->row();
        echo json_encode(array('success'=>true,'payrolltypeid'=>$q->payrolltypeid));
    }
}

?>
