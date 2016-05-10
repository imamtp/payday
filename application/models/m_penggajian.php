<?php

class m_penggajian extends CI_Model {

    function angsuran($ide,$debug,$d,$m,$y)
    {
        //ambil semua potongan yang ada di pegawai
        $startdate = $y."-".$m."-".$d;
        $sql = "SELECT a.*,b.namepotongan
                from potongan a
                join potongantype b ON a.idpotongantype = b.idpotongantype
                where sisaangsuran!=0 and $startdate>=startdate and idemployee=$ide and b.jenispotongan = 'Pinjaman' and display is null";
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $d = array();
            $total=0;
            $i=0;
            foreach ($q->result() as $r)
            {
                $total+=$r->jumlahpotongan;
                $d['angsuran'][$i]['nama'] = $r->namepotongan;
                $d['angsuran'][$i]['jumlah'] = $r->jumlahpotongan;
//                $d['potongan'][$i][$r->namepotongan] = $r->jumlahpotongan;
                $i++;
                
                if($debug==3)
                {
                    //simpan ke database
                    $sisapotongan = $r->totalpotongan-$r->jumlahpotongan;
                    $sisaangsuran = $r->sisaangsuran-1;
                    $dinsert = array(
                        "idpotongan" => $r->idpotongan,
//                        "idprosesgaji" int8,
                        "datepaid" =>  date('Y-m-d H:m:s'),
                        "jumlahpotongan" => $r->jumlahpotongan,
                        "sisapotongan" => $sisapotongan,
                        "sisaangsuran" => $sisaangsuran,
                        "totalpotongan" => $r->totalpotongan,
                        "userin" => $this->session->userdata('username'),
                        "datein" => date('Y-m-d H:m:s'),
                        "month"=>$m,
                        "year"=>$y,
                        "idemployee" => $ide
                    );
                    $this->db->insert('potonganhistory',$dinsert);
                    
                    $this->db->where('idpotongan',$r->idpotongan);
                    $this->db->update('potongan',array(
                        "sisapotongan" => $sisapotongan,
                        "sisaangsuran" => $sisaangsuran
                    ));
                }
            }
            $d['total'] = $total;
        } else {
            $d['total'] = 0;
        }
        
        
        return $d;
    }

    function potongan($ide,$debug,$d,$m,$y,$tipe)
    {
        $startdate = $y."-".$m."-".$d;

        if($tipe=='potongan')
        {
            //ambil semua potongan yang ada di pegawai
            $sql = "SELECT a.*,b.namepotongan
                    from potongan a
                    join potongantype b ON a.idpotongantype = b.idpotongantype
                    where '$startdate' between startdate and enddate and idemployee=$ide and b.jenispotongan = 'Potongan' and display is null";
        } else {
              $sql = "SELECT a.*,b.namepotongan
                from potongan a
                join potongantype b ON a.idpotongantype = b.idpotongantype
                where sisaangsuran!=0 and '$startdate'>=startdate and idemployee=$ide and b.jenispotongan = 'Pinjaman' and display is null";
        }
        // echo $sql;
        $q = $this->db->query($sql);
        $d = array();
        if($q->num_rows()>0)
        {
            
            $total=0;
            $i=0;
            foreach ($q->result() as $r)
            {
                $total+=$r->jumlahpotongan;

                $sisapotongan = $r->totalpotongan-$r->jumlahpotongan;
                $sisaangsuran = $r->sisaangsuran-1;

                $d[$tipe][$i]['nama'] = $r->namepotongan;
                $d[$tipe][$i]['jumlah'] = $r->jumlahpotongan;
                $d[$tipe][$i]['sisapotongan'] = $sisapotongan;
                $d[$tipe][$i]['sisaangsuran'] = $sisaangsuran;
//                $d['potongan'][$i][$r->namepotongan] = $r->jumlahpotongan;
                $i++;
                
                if($debug==3)
                {
                    //simpan ke database
                   
                    $dinsert = array(
                        "idpotongan" => $r->idpotongan,
//                        "idprosesgaji" int8,
                        "datepaid" =>  $startdate,
                        "jumlahpotongan" => $r->jumlahpotongan,
                        "sisapotongan" => $sisapotongan,
                        "sisaangsuran" => $sisaangsuran,
                        "totalpotongan" => $r->totalpotongan,
                        "userin" => $this->session->userdata('username'),
                        "datein" => date('Y-m-d H:m:s'),
                        "month"=>$m,
                        "year"=>$y,
                        "idemployee" => $ide
                    );
                    $this->db->insert('potonganhistory',$dinsert);
                    
                    $this->db->where('idpotongan',$r->idpotongan);
                    $this->db->update('potongan',array(
                        "sisapotongan" => $sisapotongan,
                        "sisaangsuran" => $sisaangsuran
                    ));
                }
            }
            $d['total'] = $total;
        } else {
            $d[$tipe] = false;
            $d['total'] = 0;
        }
        
        
        return $d;
    }
    
    function tunjangan($ide,$debug=null,$d,$m,$y,$totalgaji)
    {
        $tgl = $y."-".$m."-".$d;

        //ambil semua potongan yang ada di pegawai
        $sql = "select a.*,b.nametunj
                from tunjangan a
                join tunjangantype b ON a.idtunjtype = b.idtunjtype
                where ('$tgl' BETWEEN startdate and enddate) and idemployee=$ide and display is null";
                // echo $sql;
        $q = $this->db->query($sql);
        $d = array();
        if($q->num_rows()>0)
        {
            
            $total=0;
            $i=0;
            foreach ($q->result() as $r)
            {
                if($r->jumlah==null && $r->persen!=null)
                {
                    //pake persentase
                    $jumlah = $totalgaji * ($r->persen/100);
                } else {
                    $jumlah =$r->jumlah;
                }

                $total+=$jumlah;
                $d['tunjangan'][$i]['nama'] = $r->nametunj;
                $d['tunjangan'][$i]['jumlah'] = $jumlah;
//                $d['tunjangan'][$i][$r->nametunj] = $r->jumlah;
                $i++;
                
                if($debug==3)
                {
                    //simpan ke database
                    $dinsert = array(
                        "idtunjangan" => $r->idtunjangan,
//                        "idprosesgaji" int8,
                        "datepaid" => $tgl,
                        "jumlah" => $jumlah,
                        "userin" => $this->session->userdata('username'),
                        "datein" => date('Y-m-d H:m:s'),
                        "month" => $m,
                        "year" => $y,
                       "idemployee" => $ide  
                    );
                    $this->db->insert("tunjanganhistory",$dinsert);
                }
            }
            $d['total'] = $total;
        } else {
            $d['tunjangan'] = false;
            $d['total'] = 0;
        }
        return $d;
    }

    function tambahangaji($ide,$debug=null,$d,$m,$y)
    {
        $tgl = $y."-".$m."-".$d;
        
        $sql = "select a.*,b.tambahantype
                from tambahangaji a
                join tambahangajitype b ON a.idtambahangajitype = b.idtambahangajitype
                where ('$tgl' BETWEEN startdate and enddate) and idemployee=$ide and display is null";
                // echo $sql;
        $q = $this->db->query($sql);
        $d = array();
        if($q->num_rows()>0)
        {
            
            $total=0;
            $i=0;
            foreach ($q->result() as $r)
            {
                $total+=$r->jumlah;
                $d['tambahangaji'][$i]['nama'] = $r->tambahantype;
                $d['tambahangaji'][$i]['jumlah'] = $r->jumlah;
//                $d['tunjangan'][$i][$r->nametunj] = $r->jumlah;
                $i++;
                
                if($debug==3)
                {
                    //simpan ke database
                    $dinsert = array(
                        "idtambahangaji" => $r->idtambahangaji,
//                        "idprosesgaji" int8,
                        "datepaid" => $tgl,
                        "jumlah" => $r->jumlah,
                        "userin" => $this->session->userdata('username'),
                        "datein" => date('Y-m-d H:m:s'),
                        "month" => $m,
                        "year" => $y,
                       "idemployee" => $ide  
                    );
                    $this->db->insert("tambahangajihistory",$dinsert);
                }
            }
            $d['total'] = $total;
        } else {
            $d['tambahangaji'] = false;
            $d['total'] = 0;
        }
        return $d;
    }
    
    function premi($idemployee,$gajipokok,$idasuransi=null,$debug=null)
    {
        
         $sql = "select b.idasuransi,namapremi,deskripsi,percentemployee,percentcompany
                from asuransiemp a
                join asuransi b ON a.idasuransi = b.idasuransi
                where idemployee=$idemployee";
         
        if($idasuransi!=null)
        {
            $add = " AND b.idasuransi=4";
        } else {
            $add=null;
        }
        
        $sql.=$add;
//        echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $d = array();
            $totalemployee=0;
            $totalcompany=0;
            $i=0;
            foreach ($q->result() as $r)
            {
                $amounte = $gajipokok*($r->percentemployee/100);
                $amountc = $gajipokok*($r->percentcompany/100);
                $d['premi'][$i]['idasuransi'] = $r->idasuransi;
                $d['premi'][$i]['namapremi'] = $r->namapremi;
                $d['premi'][$i]['persenE'] = $r->percentemployee;
                $d['premi'][$i]['persenC'] = $r->percentcompany;
                $d['premi'][$i]['premiE'] = $amounte;
                $d['premi'][$i]['premiC'] =  $amountc;
                
                $totalemployee+=$d['premi'][$i]['premiE'];
                $totalcompany+=$d['premi'][$i]['premiC'];
                $i++;
                
                if($debug==3)
                {
                    //simpan ke database
                    $dinsert = array(
                       "percente" => $r->percentemployee,
                       "percentc"  => $r->percentcompany,
                       "amounte"  => $amounte,
                       "amountc"  => $amountc,
                       "userin"  => $this->session->userdata('username'),
                       "datein"  => date('Y-m-d H:m:s'),
                       "month"  => date('m'),
                       "year"  => date('Y'),
                       "idasuransi"  => $r->idasuransi,
                       "idemployee" => $idemployee
                    );
                    $this->db->insert('asuransipayhistory',$dinsert);
                }
            }
            $d['totalemployee'] = $totalemployee;
            $d['totalcompany'] = $totalcompany;
        } else {
            $d['premi'] = null;
            $d['totalemployee'] = 0;
            $d['totalcompany'] = 0;
        }
        return $d;
    }

    function saveAccountPayroll($idemployee,$pembayaran)
    {
        //menambahh saldo akun pembayaran gaji berdasarkan jenis pegawai

        $this->db->select('idemployeetype,idunit');
        $qpeg = $this->db->get_where('employee',array('idemployee'=>$idemployee))->row();
        $this->db->select('idaccountpayroll,idaccount');
        $qacc = $this->db->get_where('employeetype',array('idemployeetype'=>$qpeg->idemployeetype))->row();
        $idaccountpayroll = $qacc->idaccountpayroll;
        $idaccountkas = $qacc->idaccount;

        //tambah saldo
        $qbal = $this->db->get_where('account',array('idaccount'=>$idaccountpayroll,'display'=>null));
        if($qbal->num_rows()>0)
        {
            $r = $qbal->row();
            $newbalance = $r->balance+$pembayaran;
            $this->db->where('idaccount',$idaccountpayroll);
            $this->db->update('account',array('balance'=>$newbalance));

            //simpan tabel temporary untuk penyimpanan hasil proses gaji yang selanjutnya disimpan ke dalam jurnal
            $dtmp = array(
                    "idemployee" => $idemployee,
                    "idaccountpayroll" => $idaccountpayroll,
                    "idaccountkas" => $idaccountkas,
                    "jumlah" => $newbalance,
                    "userin" => $this->session->userdata('userid'),
                    "idunit" => $qpeg->idunit,
                    "accnumberpayroll" => $r->accnumber
                );
            $this->db->insert('prosesgaji_tmp',$dtmp);

            return true;

        } else {
            return false;
        }
    }

    function saveJournal($memo)
    {
       //buat jurnal setelah proses gaji berhasil dari prosesgaji_tmp

        $uid = $this->session->userdata('userid');
        $q = $this->db->query("select distinct idaccountpayroll,accnumberpayroll from prosesgaji_tmp where userin=$uid");
        foreach ($q->result() as $r) {
            $idaccountpayroll = $r->idaccountpayroll;
            $accnumberpayroll  = $r->accnumberpayroll;
            $qj = $this->db->query("select sum(jumlah) as jumlah 
                from prosesgaji_tmp 
                where idaccountpayroll=$idaccountpayroll")->row();
            $jumlah = $qj->jumlah;

            //akun kas (kredit) & akun pembayaran (debit)

            //dapatkan idkas
            $qkas = $this->db->query("select idaccountkas,idunit from prosesgaji_tmp where idaccountpayroll=$idaccountpayroll limit 1")->row();
            $idaccountkas = $qkas->idaccountkas;

            if($this->session->userdata('idunit')!=99)
            {
                $idunit = $this->session->userdata('idunit');
            } else {
                $idunit = $qkas->idunit;
            }

            $tgl = explode("-", date('Y-m-d'));

            $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

            //kas (kredit)
            $d = array(
                'idjournal' => $qseq->id,
                'idjournaltype' => 2, //pembayaran
                'nojournal' => "#".$qseq->id.date('Ymd'),
                'datejournal' => date('Y-m-d'),
                'memo' => $memo." - ".$accnumberpayroll,
                'totaldebit' => $jumlah,
                'totalcredit' => $jumlah,
                'year' => $tgl[0],
                'month' => $tgl[1],
                'userin' => $this->session->userdata('username'),
                'usermod' => $this->session->userdata('username'),
                'datein' => date('Y-m-d H:m:s'),
                'datemod' => date('Y-m-d H:m:s'),
                'idunit' => $idunit
            );

            $this->db->insert('journal', $d);

            //journal kas (debit) & uang muka pembelian
            //kas
            // $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
            $curBalance = $this->m_account->getCurrBalance($idaccountkas, $idunit);
            $newBalance = $curBalance - $jumlah;

            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccountkas,
    //            'idtax' integer,
                'debit' => 0,
                'credit' => $jumlah,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance,
                'currbalance' => $newBalance
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($idaccountkas, $newBalance, $idunit);

            //akun pembayaran gaji (debit)
            $curBalance2 = $this->m_account->getCurrBalance($idaccountpayroll, $idunit);
            //itung saldo baru
            $newBalance2 = $curBalance2 + $jumlah;
            //insert
            $ditem2 = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccountpayroll,
    //            'idtax' integer,
                'debit' => $jumlah,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
            $this->db->insert('journalitem', $ditem2);
            //update saldo baru
            $this->m_account->saveNewBalance($idaccountpayroll, $newBalance2, $idunit);
        }
        //end foreach
    }
}
?>