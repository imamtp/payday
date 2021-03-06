<?php

class m_pekerjaan extends CI_Model {

    function tableName() {
        return 'pekerjaan';
    }

    function pkField() {
        return 'idlokasiorg';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpekerjaan,a.idpergerakanpersonil,a.idpelamar,a.tglmasuk,a.tglberakhir,
        a.userin,a.datein,b.namalengkap,a.idlevelindividu,c.levelname as levelnameindividu,d.namalokasi,e.kekaryaanname,
        f.idjabatan,f.idstrukturjabatan,g.namajabatan,g.kodejabatan,h.levelname,
        k.namaorg,k.kodeorg,j.nik,a.statuspergerakan,a.idpelamaratasan,z.namalengkap as namaatasan,
        cc.namajabatan as namajabatanatasan,cc.kodejabatan as kodejabatanatasan,ee.namaorg as namaorgatasan,
        ee.kodeorg as kodeorgatasan,a.idorganisasiatasan,dd.namalokasi as namalokasiatasan,p.idpergerakan";
    }

    function fieldCek()
    {

        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodebudgelokasi'=>'Kode  budge lokasi'
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join pelamar b ON a.idpelamar = b.idpelamar
                    left join pelamar z ON a.idpelamaratasan = z.idpelamar
                    left join level c ON a.idlevelindividu = c.idlevel
                    left join lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                    left join kekaryaan e ON a.idkekaryaan = e.idkekaryaan
                    left join strukturjabatan f ON a.idstrukturjabatan = f.idstrukturjabatan
                    left join organisasi k ON f.idorganisasi = k.idorganisasi
                    left join jabatan g ON f.idjabatan = g.idjabatan
                    left join level h ON g.idlevel = h.idlevel
                    left join jabatan i ON f.idjabatan = i.idjabatan
                    join calonpelamar j ON a.idpelamar = j.idpelamar
                    LEFT JOIN (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON a.idpelamaratasan = xx.idpelamar
                    LEFT join pekerjaan aa ON xx.idpekerjaan = aa.idpekerjaan
                    LEFT JOIN strukturjabatan bb ON aa.idstrukturjabatan = bb.idstrukturjabatan
                    LEFT JOIN jabatan cc ON bb.idjabatan = cc.idjabatan
                    LEFT JOIN organisasi ee ON bb.idorganisasi = ee.idorganisasi
                    LEFT JOIN lokasi_org dd ON aa.idlokasiorg = dd.idlokasiorg
                    join pergerakanpersonil p ON a.idpergerakanpersonil = p.idpergerakanpersonil";

        return $query;
    }

    function whereQuery() {

         return "a.display is null ".$this->m_data->whereCompany('b')." AND (a.statuspergerakan='Diterima' OR a.statuspergerakan='Disetujui')";
    }

    function orderBy() {
        return "a.tglmasuk desc";
    }

    function updateField() {

        $data = array(
            'idpekerjaan' => $this->input->post('idpekerjaan') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idpekerjaan'),
            // 'idtingkatlokasi' => $this->m_data->getID('tingkatlokasi', 'tingkatlokasi', 'idtingkatlokasi', $this->input->post('tingkatlokasi')),
            'idlevelindividu' => $this->input->post('idlevelindividu'),
            'idlokasiorg' => $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi')),
            'idkekaryaan' => $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            'tglmasuk' => backdate2_reverse($this->input->post('tglmasuk')),
            'tglberakhir' => backdate2_reverse($this->input->post('tglberakhir')),
            'namaatasan' => $this->input->post('namaatasan'),
            'idlokasiorgatasan' => $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
            'idpelamar' => $this->input->post('idpelamar'),
            'idpelamaratasan' => $this->input->post('idpelamaratasan')
            // 'display' int4,
            // 'userin' varchar(20),
            // 'usermod' varchar(20),
            // 'datein' timestamp(6),
            // 'datemod' timestamp(6),
            // 'idstrukturjabatan' => $this->input->post('idstrukturjabatan'),
            // 'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            // 'idorganisasiatasan' => $this->input->post('idorganisasiatasan')
        );
        return $data;
    }

	function getkekaryaanname($idpelamar)
    {
        // echo 'idpelamar:'.$idpelamar;
        // $sql = "SELECT f.kekaryaanname
        //         FROM pekerjaans a
        //         JOIN kekaryaan f ON a.idkekaryaan = f.idkekaryaan
        //         where a.idpelamar=$idpelamar and a.display is null and statuspergerakan='Disetujui'
        //         ORDER BY tglmasuk desc
        //         limit 1";
        $sql = "SELECT b.idpergerakan,f.kekaryaanname,a.tglmasuk
                FROM pekerjaan a
                LEFT JOIN kekaryaan f ON a.idkekaryaan = f.idkekaryaan
                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                where a.idpelamar=$idpelamar and a.display is null
                and b.statuspergerakan='Disetujui'
                and a.tglmasuk<=now()
                ORDER BY tglmasuk DESC
                limit 1";
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();

            if($r->idpergerakan==128)
            {
                $kekaryaanname = 'TERMINASI';
            } else {
                $kekaryaanname = $r->kekaryaanname;
            }
            
            $data = array(
                'idpekerjaan'=>null,
                'idstrukturjabatan'=>null,
                'tglmasuk'=>null,
                'tglberakhir'=>null,
                'namajabatan'=>null,
                'namalokasi'=>null,
                'kodeorg'=>null,
                'namaorg'=>null,
                'kekaryaanname'=>$kekaryaanname,
                'namaatasan'=>null,
                'levelnameindividu'=>null,
                'levelnamejabatan'=>null
            );
        } else {

            $data = array(
                'idpekerjaan'=>null,
                'idstrukturjabatan'=>null,
                'tglmasuk'=>null,
                'tglberakhir'=>null,
                'namajabatan'=>null,
                'namalokasi'=>null,
                'kodeorg'=>null,
                'namaorg'=>null,
                'kekaryaanname'=>null,
                'namaatasan'=>null,
                'levelnameindividu'=>null,
                'levelnamejabatan'=>null
            );
        }


        return $data;
    }

     function getLastPekerjaan($idpelamar,$terminate=true,$idpergerakanpersonil=null)
    {
		$query = $this->input->post('query');
		// $namaorg = $this->input->post('namaorg');
		// $namajabatan = $this->input->post('namajabatan');

        // echo 'idpelamar:'.$idpelamar;
        $sql = "SELECT a.idpekerjaan, a.tglmasuk, a.tglberakhir, a.idpelamar, c.idjabatan, c.kodejabatan, c.namajabatan, d.namalokasi,
                e.idorganisasi, e.kodeorg, e.namaorg, f.kekaryaanname, g.namalengkap AS namaatasan,
                a.idlevelindividu,a.idpelamaratasan, j.levelname AS levelnameindividu, i.levelname AS levelnamejabatan, b.idstrukturjabatan,l.idpergerakan,l.idpergerakanpersonil
                FROM pekerjaan a
                LEFT JOIN strukturjabatan b ON a.idstrukturjabatan = b.idstrukturjabatan
                LEFT JOIN jabatan c ON b.idjabatan = c.idjabatan
                LEFT JOIN lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                LEFT JOIN organisasi e ON b.idorganisasi = e.idorganisasi
                LEFT JOIN kekaryaan f ON a.idkekaryaan = f.idkekaryaan
                LEFT JOIN pelamar g ON a.idpelamaratasan = g.idpelamar
                LEFT JOIN level j ON a.idlevelindividu = j.idlevel
                LEFT JOIN level i ON c.idlevel = i.idlevel
                join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil";

		

        if($terminate)
        {
            if($query!='')
            {
                $sql.=" AND (d.namalokasi like '%$query%' OR d.namalokasi like '%".strtoupper($query)."%')";
            }

            $t = 'and l.idpergerakan <> 128';

            $orderBy = 'desc';
        } else {
            //tetap tampilkan jabatan untuk karyawan terminasi
            $t = null;

            $qter = $this->db->query("select count(*) as tot from pergerakanpersonil where idpelamar = $idpelamar and idpergerakan = 128 and statuspergerakan = 'Disetujui'");
            if($qter->num_rows()>0)
            {
                $orderBy = 'asc';
            } else {
                $orderBy = 'desc';
            }
            
            // if($idpelamar==221)
            // {
            //     echo $orderBy;
            //     exit;
            // }
        }

        $tglmasukkaryawan = null;
        $tglterminkaryawan = null;
        $qtglterminate = false;

          $qcekidpergerakan = $this->db->query("select max(idpekerjaan),idpergerakan from pekerjaan a 
                                                    join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil 
                                                    where a.idpelamar = $idpelamar
                                                    group by idpergerakan
                                                    order by max desc
                                                    limit 1");
          if($idpelamar==207)
         {
            // echo $this->db->last_query();
        }

          if($qcekidpergerakan->num_rows()>0)
          {
            $qcekidpergerakan = $qcekidpergerakan->row();

            if($qcekidpergerakan->idpergerakan==131 || $qcekidpergerakan->idpergerakan==128)
            {
                //penempatan baru
                $statuspergerakan = "(a.statuspergerakan='Diajukan' OR a.statuspergerakan='Disetujui')";
            } else {
                $statuspergerakan = "(a.statuspergerakan='Disetujui')";
            }

             //cari tanggal masuk karyawan kalo terminasi          
              if($qcekidpergerakan->idpergerakan==128){
                $qtglmasuk = $this->db->query("select a.tglmasuk from pekerjaan a 
                                                join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil 
                                                where a.idpelamar = $idpelamar 
                                                order by idpekerjaan asc
                                                limit 1")->row();
                $tglmasukkaryawan = $qtglmasuk->tglmasuk;

                if($idpergerakanpersonil!=null)
                {
                    $qtglterminate = $this->db->query("select a.tglmasuk from pekerjaan a 
                                                join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil 
                                                where a.idpelamar = $idpelamar and l.idpergerakan = 128 and l.idpergerakanpersonil = $idpergerakanpersonil
                                                order by idpekerjaan asc
                                                limit 1")->row();
                  if($idpelamar==40)
                     {
                        // echo $this->db->last_query();
                    }
                }

                if($qtglterminate)
                {
                    $tglterminkaryawan = $qtglterminate->tglmasuk;
                    // echo $this->db->last_query().' '.$tglterminkaryawan.'   ' ;
                }                
              }
          } else {
            // echo $this->db->last_query();
            //blum ada data pergerakan
            $statuspergerakan = "(a.statuspergerakan='Diajukan')";
          }
// var_dump($qcekidpergerakan);

        
         


		$sql.=" where a.idpelamar=$idpelamar and a.display is null and $statuspergerakan $t
                ORDER BY tglmasuk $orderBy
                limit 1";
        $q = $this->db->query($sql);
        if($idpergerakanpersonil==326)
		 {
            // echo $sql;
        }

        if($q->num_rows()>0)
        {
            $r = $q->row();

            // if($r->idpergerakanpersonil==277)
            //     {
            //        var_dump($r);
            //     }
            //     var_dump($r);

            $data = array(
                'idpekerjaan'=>$r->idpekerjaan,
                'idstrukturjabatan'=>$r->idstrukturjabatan,
                'kodejabatan'=>$r->kodejabatan,
                'tglmasuk'=> $r->idpergerakan==128 ? $tglmasukkaryawan : $r->tglmasuk,
                'tglberakhir'=> $tglterminkaryawan!=null ? $tglterminkaryawan : $r->tglberakhir,
                'tglmasukkaryawan'=>$tglmasukkaryawan,
                'namajabatan'=>$r->namajabatan,
                'namalokasi'=>$r->namalokasi,
                'kodeorg'=>$r->kodeorg,
                'namaorg'=>$r->namaorg,
                'kekaryaanname'=>$r->kekaryaanname,
                'namaatasan'=>$r->namaatasan,
                'levelnameindividu'=>$r->levelnameindividu,
                'levelnamejabatan'=>$r->levelnamejabatan
            );
            
            if($r->idpelamaratasan!=null)
            {
                $d = $this->getLastPekerjaanAtasan($r->idpelamaratasan);
                $data['idpekerjaanatasan']=$d['idpekerjaan'];
                $data['idstrukturjabatanatasan']=$d['idstrukturjabatan'];
                $data['tglmasukatasan']=$d['tglmasuk'];
                // $data['kodejabatan']=$d['kodejabatan'];
                $data['tglberakhiratasan']=$d['tglberakhir'];
                $data['namajabatanatasan']=$d['namajabatan'];
                $data['namalokasiatasan']=$d['namalokasi'];
                $data['kodeorgatasan']=$d['kodeorg'];
                $data['namaorgatasan']=$d['namaorg'];
                $data['kekaryaannameatasan']=$d['kekaryaanname'];
                // $data['namaatasan']=$d['namaatasan'];
                $data['levelnameindividuatasan']=$d['levelnameindividu'];
                $data['levelnamejabatanatasan']=$d['levelnamejabatan'];
            }
			$q->free_result();
        } else {

            $data = array(
                'idpekerjaan'=>null,
                'idstrukturjabatan'=>null,
                'tglmasuk'=>null,
                'tglmasukkaryawan'=>null,
                'kodejabatan'=>null,
                'tglberakhir'=>null,
                'namajabatan'=>null,
                'namalokasi'=>null,
                'kodeorg'=>null,
                'namaorg'=>null,
                'kekaryaanname'=>null,
                'namaatasan'=>null,
                'levelnameindividu'=>null,
                'levelnamejabatan'=>null
            );
        }
        return $data;
    }

      function getLastPekerjaanv2($idpelamar,$terminate=true,$idpergerakanpersonil=null)
    {
        $query = $this->input->post('query');
        // $namaorg = $this->input->post('namaorg');
        // $namajabatan = $this->input->post('namajabatan');

        // echo 'idpelamar:'.$idpelamar;
        $sql = "SELECT a.idpekerjaan, a.tglmasuk, a.tglberakhir, a.idpelamar, c.idjabatan, c.kodejabatan, c.namajabatan, d.namalokasi,
                e.idorganisasi, e.kodeorg, e.namaorg, f.kekaryaanname, g.namalengkap AS namaatasan,
                a.idlevelindividu,a.idpelamaratasan, j.levelname AS levelnameindividu, i.levelname AS levelnamejabatan, b.idstrukturjabatan,l.idpergerakan,l.idpergerakanpersonil
                FROM pekerjaan a
                LEFT JOIN strukturjabatan b ON a.idstrukturjabatan = b.idstrukturjabatan
                LEFT JOIN jabatan c ON b.idjabatan = c.idjabatan
                LEFT JOIN lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                LEFT JOIN organisasi e ON b.idorganisasi = e.idorganisasi
                LEFT JOIN kekaryaan f ON a.idkekaryaan = f.idkekaryaan
                LEFT JOIN pelamar g ON a.idpelamaratasan = g.idpelamar
                LEFT JOIN level j ON a.idlevelindividu = j.idlevel
                LEFT JOIN level i ON c.idlevel = i.idlevel
                join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil";

        
        $wherePergerakanBefore = null;
        if($terminate)
        {
            if($query!='')
            {
                $sql.=" AND (d.namalokasi like '%$query%' OR d.namalokasi like '%".strtoupper($query)."%')";
            }

            $t = 'and l.idpergerakan <> 128';

            // $orderBy = 'desc';
        } else {
            //tetap tampilkan jabatan untuk karyawan terminasi/jabatan sebelumnya
            $qcekterminat = $this->db->query("select a.idpelamar
                                                from pekerjaan a
                                                join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                                                where a.idpelamar = $idpelamar and b.idpergerakan = 128
                                                order by a.idpergerakanpersonil desc
                                                limit 1");
            if($qcekterminat->num_rows()>0)
            {
                //ambil pergerakan personil sebelumnya
                $wherePergerakanBefore = " and l.idpergerakanpersonil <> $idpergerakanpersonil";
            }
             // if($idpelamar==220)
             //     {
             //        echo $idpergerakanpersonil;
             //    }
            $t = null;
            // $orderBy = 'asc';
        }

         $orderBy = 'desc';

        $tglmasukkaryawan = null;
        $tglterminkaryawan = null;
        $qtglterminate = false;

          $qcekidpergerakan = $this->db->query("select max(idpekerjaan),idpergerakan from pekerjaan a 
                                                    join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil 
                                                    where a.idpelamar = $idpelamar
                                                    group by idpergerakan
                                                    order by max desc
                                                    limit 1");
          if($idpelamar==207)
         {
            // echo $this->db->last_query();
        }

          if($qcekidpergerakan->num_rows()>0)
          {
            $qcekidpergerakan = $qcekidpergerakan->row();

            if($qcekidpergerakan->idpergerakan==131 || $qcekidpergerakan->idpergerakan==128)
            {
                //penempatan baru
                $statuspergerakan = "(a.statuspergerakan='Diajukan' OR a.statuspergerakan='Disetujui')";
            } else {
                $statuspergerakan = "(a.statuspergerakan='Disetujui')";
            }

             //cari tanggal masuk karyawan kalo terminasi          
              if($qcekidpergerakan->idpergerakan==128){
                $qtglmasuk = $this->db->query("select a.tglmasuk from pekerjaan a 
                                                join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil 
                                                where a.idpelamar = $idpelamar 
                                                order by idpekerjaan asc
                                                limit 1")->row();
                $tglmasukkaryawan = $qtglmasuk->tglmasuk;

                if($idpergerakanpersonil!=null)
                {
                    $qtglterminate = $this->db->query("select a.tglmasuk from pekerjaan a 
                                                join pergerakanpersonil l ON a.idpergerakanpersonil = l.idpergerakanpersonil 
                                                where a.idpelamar = $idpelamar and l.idpergerakan = 128 and l.idpergerakanpersonil = $idpergerakanpersonil
                                                order by idpekerjaan asc
                                                limit 1")->row();
                  if($idpelamar==40)
                     {
                        // echo $this->db->last_query();
                    }
                }

                if($qtglterminate)
                {
                    $tglterminkaryawan = $qtglterminate->tglmasuk;
                    // echo $this->db->last_query().' '.$tglterminkaryawan.'   ' ;
                }                
              }
          } else {
            // echo $this->db->last_query();
            //blum ada data pergerakan
            $statuspergerakan = "(a.statuspergerakan='Diajukan')";
          }
// var_dump($qcekidpergerakan);

        
         


        $sql.=" where a.idpelamar=$idpelamar and a.display is null and $statuspergerakan $t $wherePergerakanBefore
                ORDER BY tglmasuk $orderBy
                limit 1";
        $q = $this->db->query($sql);
        // if($idpelamar==220)
        //  {
        //     echo $sql;
        // }

        if($q->num_rows()>0)
        {
            $r = $q->row();

            // if($r->idpergerakanpersonil==277)
            //     {
            //        var_dump($r);
            //     }
            //     var_dump($r);

            $data = array(
                'idpekerjaan'=>$r->idpekerjaan,
                'idstrukturjabatan'=>$r->idstrukturjabatan,
                'kodejabatan'=>$r->kodejabatan,
                'tglmasuk'=> $r->idpergerakan==128 ? $tglmasukkaryawan : $r->tglmasuk,
                'tglberakhir'=> $tglterminkaryawan!=null ? $tglterminkaryawan : $r->tglberakhir,
                'tglmasukkaryawan'=>$tglmasukkaryawan,
                'namajabatan'=>$r->namajabatan,
                'namalokasi'=>$r->namalokasi,
                'kodeorg'=>$r->kodeorg,
                'namaorg'=>$r->namaorg,
                'kekaryaanname'=>$r->kekaryaanname,
                'namaatasan'=>$r->namaatasan,
                'levelnameindividu'=>$r->levelnameindividu,
                'levelnamejabatan'=>$r->levelnamejabatan
            );
            
            if($r->idpelamaratasan!=null)
            {
                $d = $this->getLastPekerjaanAtasan($r->idpelamaratasan);
                $data['idpekerjaanatasan']=$d['idpekerjaan'];
                $data['idstrukturjabatanatasan']=$d['idstrukturjabatan'];
                $data['tglmasukatasan']=$d['tglmasuk'];
                // $data['kodejabatan']=$d['kodejabatan'];
                $data['tglberakhiratasan']=$d['tglberakhir'];
                $data['namajabatanatasan']=$d['namajabatan'];
                $data['namalokasiatasan']=$d['namalokasi'];
                $data['kodeorgatasan']=$d['kodeorg'];
                $data['namaorgatasan']=$d['namaorg'];
                $data['kekaryaannameatasan']=$d['kekaryaanname'];
                // $data['namaatasan']=$d['namaatasan'];
                $data['levelnameindividuatasan']=$d['levelnameindividu'];
                $data['levelnamejabatanatasan']=$d['levelnamejabatan'];
            }
            $q->free_result();
        } else {

            $data = array(
                'idpekerjaan'=>null,
                'idstrukturjabatan'=>null,
                'tglmasuk'=>null,
                'tglmasukkaryawan'=>null,
                'kodejabatan'=>null,
                'tglberakhir'=>null,
                'namajabatan'=>null,
                'namalokasi'=>null,
                'kodeorg'=>null,
                'namaorg'=>null,
                'kekaryaanname'=>null,
                'namaatasan'=>null,
                'levelnameindividu'=>null,
                'levelnamejabatan'=>null
            );
        }
        return $data;
    }

    function getLastPekerjaanPergerakan($idpergerakanpersonil)
    {

    }

	function getLastPekerjaanAtasan($idpelamar)
    {
        // echo 'idpelamar:'.$idpelamar;
        $sql = "SELECT a.idpekerjaan, a.tglmasuk, a.tglberakhir, a.idpelamar, c.idjabatan, c.kodejabatan, c.namajabatan, d.namalokasi,
                e.idorganisasi, e.kodeorg, e.namaorg, f.kekaryaanname, g.namalengkap AS namaatasan,
                a.idlevelindividu,idpelamaratasan, j.levelname AS levelnameindividu, i.levelname AS levelnamejabatan, b.idstrukturjabatan
                FROM pekerjaan a
                JOIN strukturjabatan b ON a.idstrukturjabatan = b.idstrukturjabatan
                JOIN jabatan c ON b.idjabatan = c.idjabatan
                JOIN lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                JOIN organisasi e ON b.idorganisasi = e.idorganisasi
                JOIN kekaryaan f ON a.idkekaryaan = f.idkekaryaan
                LEFT JOIN pelamar g ON a.idpelamaratasan = g.idpelamar
                JOIN level j ON a.idlevelindividu = j.idlevel
                JOIN level i ON c.idlevel = i.idlevel
                where a.idpelamar=$idpelamar and a.display is null
                ORDER BY tglmasuk desc
                limit 1";
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $data = array(
                'idpekerjaan'=>$r->idpekerjaan,
                'idstrukturjabatan'=>$r->idstrukturjabatan,
                'tglmasuk'=>$r->tglmasuk,
                'tglberakhir'=>$r->tglberakhir,
                'namajabatan'=>$r->namajabatan,
                'namalokasi'=>$r->namalokasi,
                'kodeorg'=>$r->kodeorg,
                'namaorg'=>$r->namaorg,
                'kekaryaanname'=>$r->kekaryaanname,
                'namaatasan'=>$r->namaatasan,
                'levelnameindividu'=>$r->levelnameindividu,
                'levelnamejabatan'=>$r->levelnamejabatan
            );
			$q->free_result();
        } else {

            $data = array(
                'idpekerjaan'=>null,
                'idstrukturjabatan'=>null,
                'tglmasuk'=>null,
                'tglberakhir'=>null,
                'namajabatan'=>null,
                'namalokasi'=>null,
                'kodeorg'=>null,
                'namaorg'=>null,
                'kekaryaanname'=>null,
                'namaatasan'=>null,
                'levelnameindividu'=>null,
                'levelnamejabatan'=>null
            );
        }


        return $data;
    }

    function getAtasan($idpelamaratasan)
    {
        //echo 'idpelamaratasan:'.$idpelamaratasan;
        $d = $this->getLastPekerjaan($idpelamaratasan);
        $atasan = array(
                'idpekerjaan'=>$r->idpekerjaan,
                'idstrukturjabatan'=>$r->idstrukturjabatan,
                'tglmasuk'=>$r->tglmasuk,
                'tglberakhir'=>$r->tglberakhir,
                'namajabatan'=>$r->namajabatan,
                'namalokasi'=>$r->namalokasi,
                'kodeorg'=>$r->kodeorg,
                'namaorg'=>$r->namaorg,
                'kekaryaanname'=>$r->kekaryaanname,
                'namaatasan'=>$r->namaatasan,
                'levelnameindividu'=>$r->levelnameindividu,
                'levelnamejabatan'=>$r->levelnamejabatan
            );
        return $atasan;
    }

    function getNumEmployee($idstrukturjabatan,$idcompany)
    {
        $this->db->select('idpelamar');
        $q = $this->db->get_where('pelamar',array('idcompany'=>$idcompany,'display'=>null));
        $num=0;
        foreach ($q->result() as $r) {
            $p = $this->getLastPekerjaan($r->idpelamar);
            if($p['idstrukturjabatan']==$idstrukturjabatan)
            {
                $num++;
            }
        }
        return $num;
    }

}

?>
