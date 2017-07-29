<?php

class m_seleksipelamar extends CI_Model {

    function tableName() {
        return 'calonpelamar';
    }

    function pkField() {
        return 'idcalonpelamar';
    }

    function searchField() {
        $field = "b.namalengkap,nomorpermintaantk";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idcalonpelamar,a.idpelamar,a.statuscalon,a.idpermintaantk,a.nik,namalokasi,a.idlevel,a.rencanatglmasuk,a.tanggalakhirkontrak,b.namalengkap,b.noktp,c.nomorpermintaantk,d.namajabatan,e.levelname as levelnamejabatan,f.namaorg,g.namajabatan as namajabatanatasan,k.namalengkap as namaatasan,h.kekaryaanname,a.statuscalon,i.levelname as levelindividu,j.namakontrak,a.userin,a.datein,a.periodekekaryaan,a.jumlahbulankekaryaan,a.tglakhirkekaryaan,m.companyname";
    }

    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'productcode'=>'Kode Produk'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join pelamar b ON a.idpelamar = b.idpelamar
                    join permintaantk c ON a.idpermintaantk = c.idpermintaantk
                    join strukturjabatan z ON c.idstrukturjabatan = z.idstrukturjabatan
                    join jabatan d ON z.idjabatan = d.idjabatan
                    join level e ON d.idlevel = e.idlevel
                    join organisasi f ON z.idorganisasi = f.idorganisasi
                    join jabatan g ON z.idjabatanatasan = g.idjabatan
                    join kekaryaan h ON a.idkekaryaan = h.idkekaryaan
                    join level i ON a.idlevel = i.idlevel
                    left join jeniskontrak j ON a.idjeniskontrak = j.idjeniskontrak
                    left join pelamar k ON c.idpelamaratasan = k.idpelamar
                    join lokasi_org l ON c.idlokasiorg = l.idlokasiorg
                    join company m ON b.idcompany = m.idcompany";

        return $query;
    }

    function whereQuery() {

        // $wer ="AND (a.statuscalon='Tindak Lanjut' OR a.statuscalon='Diajukan')";
        $wer=null;
            // $wer .= " AND a.idpelamar not in (select idpelamar from calonpelamar where statuscalon!='Disetujui' or statuscalon!='Tindak Lanjut')";
        if($this->input->post('dihapus')=='true')
        {
            $wer.=" (a.display is null OR a.display=0)";
        } else {
            $wer.=" (a.display is null AND b.display is null)";
        }

         return "$wer ".$this->m_data->whereCompany('b',false)."";
    }

    function orderBy() {
        return "a.idcalonpelamar asc";
    }

     function randomno()
      {
          $rand = mt_rand(0x000000, 0xffffff); // generate a random number between 0 and 0xffffff
          $rand = dechex($rand & 0xffffff); // make sure we're not over 0xffffff, which shouldn't happen anyway
          $rand = str_pad($rand, 6, '0', STR_PAD_LEFT); // add zeroes in front of the generated string
          return strtoupper($rand);
      }

    function updateField() {
        $dt = new DateTime();
        $tanggalwaktu = $dt->format('Y-m-d H:i:s');

         $idpelamar = $this->input->post('idpelamar');

         //delete idpelamar yang sama di calonpelamar saat statenya insert
         if($this->input->post('statusformSeleksiPelamar')=='input')
         {
            $this->db->where(array('idpelamar'=>$idpelamar));
            $this->db->delete('calonpelamar');
         }

         $idlevel = $this->m_data->getID('level', 'levelname', 'idlevel', $this->input->post('levelindividu'));
         $idkekaryaan = $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname'));
         $tglmasuk = backdate2_reverse($this->input->post('rencanatglmasuk'));
         $tglakhirkekaryaan = $this->input->post('tglakhirkekaryaan') == null ? null : backdate2_reverse($this->input->post('tglakhirkekaryaan'));
         $statuscalon = $this->input->post('statuscalon');

         $qptk = $this->db->get_where('permintaantk',array('idpermintaantk'=>$this->input->post('idpermintaantk')))->row();

         $idpergerakanpersonil = $this->input->post('idpergerakanpersonil') == '' ? $this->m_data->getSeqVal('seq_pergerakanpersonil','pergerakanpersonil','idpergerakanpersonil') : $this->input->post('idpergerakanpersonil');
         $dpekerjaan = array(
                "idpelamar" => $idpelamar,
                "idlevelindividu" => $idlevel,
                "idlokasiorg" => $qptk->idlokasiorg,
                "idkekaryaan" => $idkekaryaan,
                "tglmasuk" => $tglmasuk,
                "tglberakhir" => $tglakhirkekaryaan,
                // "namaatasan" varchar(100),
                // "idlokasiorgatasan" int4,
                // "idpekerjaan" int4 NOT NULL,
                // "display" int4,
                // "userin" varchar(20),
                // "usermod" varchar(20),
                // "datein" timestamp(6),
                // "datemod" timestamp(6),
                "idstrukturjabatan" => $qptk->idstrukturjabatan,
                "idjabatanatasan" => $qptk->idjabatanatasan,
                // "idorganisasiatasan" => $qptk->idjabatanatasan,
                "idpelamaratasan" => $qptk->idpelamaratasan,
                "statuspergerakan" =>  $statuscalon,
                "idpergerakanpersonil" =>  $idpergerakanpersonil
            );
        $dpekerjaan['userin'] = $this->session->userdata('username');
        $dpekerjaan['datein'] = $tanggalwaktu;
        $dpekerjaan['usermod'] = $this->session->userdata('username');
        $dpekerjaan['datemod'] = $tanggalwaktu;

        $q= $this->db->get_where('pekerjaan',array('idpelamar'=>$idpelamar,'display'=>null));
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $this->db->where('idpelamar',$idpelamar);
            $this->db->update('pekerjaan',$dpekerjaan);
        } else {
            $dpekerjaan['idpekerjaan'] = $this->m_data->getSeqVal('seq_datapegawai');
            $this->db->insert('pekerjaan',$dpekerjaan);
        }

        if($statuscalon=='Disetujui')
        {
          

            
            $qpekerjaan = $this->db->get_where('pekerjaan',array('idpelamar'=>$idpelamar))->row();
            
            //insert ke tabel penyesuian upah karyawan baru
             $dpenyesuaian = array(
              "idpelamar" => $idpelamar,
              "idpergerakanpersonil" => $idpergerakanpersonil,
              "idpekerjaan" => $qpekerjaan->idpekerjaan,
              "datein" => $tanggalwaktu,
              // "tipe" => 'baru',
              "status" =>0
            );
            $dpenyesuaian['tipe'] = 'baru';
            $this->db->insert('penyesuaian',$dpenyesuaian);

            $qcmp = $this->db->get_where('pelamar',array('idpelamar'=>$idpelamar))->row();

            //cek apakah kuota penambahan karyawan masih mencukupi dgn kuota produk
            $qcektot = $this->db->query("select count(*) as totpeg
                        from pelamar
                        where idcompany = ".$qcmp->idcompany." and display is null")->row();

            $qcekparent = $this->db->query("select parent from company where idcompany = ".$qcmp->idcompany."")->row();
            if($qcekparent->parent==null)
            {
                //admin user
                $totalkaryawan = $this->m_data->totalkaryawan($qcmp->idcompany);
                $qProd = $this->db->query("select productid from adminsuper where idcompany = ".$qcmp->idcompany."")->row();
            } else {
                $totalkaryawan = $this->m_data->totalkaryawan($qcekparent->parent);
                $qProd = $this->db->query("select productid from adminsuper where idcompany = ".$qcekparent->parent."")->row();
            }

                //get kuota
                $qProdQ = $this->db->query("select maxemployee from product where productid = ".$qProd->productid."")->row();

                if($totalkaryawan==$qProdQ->maxemployee)
                {
                     $json = array('success' => false, 'message' => 'Tidak bisa menambah karyawan lagi, karena sudah mencapai batas maksimum total pegawai sebesar <b>'.$qProdQ->maxemployee.'</b>');
                    echo json_encode($json);
                    exit;
                }

                //produk
            //end cek

            $dataPergerakan = array(
                'idpergerakanpersonil' => $idpergerakanpersonil,
    //            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
                // 'idcompany' => $this->input->post('idcompany'),
                // 'idpekerjaanfrom' => $idpekerjaanfrom,
                'nopergerakan' => $this->randomno(),
                'idcompany' => $qcmp->idcompany,
                // 'idjabatan' => $this->input->post('idjabatan'),
                // 'startdate' => backdate2_reverse($this->input->post('startdate')),
                // 'enddate' => backdate2_reverse($this->input->post('enddate')),
                'idpelamar' =>$idpelamar,
                // 'idstrukturjabatanfrom' =>$idstrukturjabatan_from == null ? null : $idstrukturjabatan_from,
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
                'statuspergerakan' =>$statuscalon,
                 'idpergerakan' => 131,
                 // 'periodekekaryaan' => $this->input->post('periodekekaryaan'),
                 // 'jumlahbulankekaryaan' => $this->input->post('jumlahbulankekaryaan'),
                 // 'catatanpenyesuaian'=>$this->input->post('catatanpenyesuaian'),
                 // 'startdatenewpay'=>$startdatenewpay,
                 // 'alasanterminasi'=>$this->input->post('alasanterminasi'),
                 // 'tglterminasi'=>$tglterminasi
            );
            $this->db->insert('pergerakanpersonil',$dataPergerakan);
        }
        
        $data = array(
            'idcalonpelamar' => $this->input->post('idcalonpelamar') == '' ? $this->m_data->getSeqVal('seq_calonpelamar') : $this->input->post('idcalonpelamar'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idpelamar' => $idpelamar,
            'idpermintaantk' => $this->input->post('idpermintaantk'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'nik' => $this->input->post('nik'),
            'idlevel' =>  $idlevel,
            'rencanatglmasuk' => $tglmasuk,
            'idjeniskontrak' => $this->m_data->getID('jeniskontrak', 'namakontrak', 'idjeniskontrak', $this->input->post('namakontrak')),
            // 'tanggalakhirkontrak' => backdate2_reverse($this->input->post('tanggalakhirkontrak')),
            'statuscalon' => $statuscalon,
            'periodekekaryaan' => $this->input->post('periodekekaryaan'),
            'idkekaryaan' => $idkekaryaan,
            // 'jumlahpermintaantk' => $this->input->post('jumlahpermintaantk')==null ? 0 : $this->input->post('jumlahpermintaantk'),
            'jumlahbulankekaryaan' => $this->input->post('jumlahbulankekaryaan'),
            'tglakhirkekaryaan'  => $tglakhirkekaryaan
        );
        return $data;
    }

}

?>
