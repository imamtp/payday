<?php

class m_vdatakaryawangrid extends CI_Model {

    function tableName() {
        return 'pelamar';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "a.namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,a.ni,nik,a.namalengkap,aa.idstrukturjabatan,aa.idpekerjaan,c.namajabatan,e.namaorg,e.kodeorg,d.namalokasi,k.statuscalon,a.display,a.idcompany,l.namalengkap as namaatasan,m.companyname,i.levelname as levelnamejabatan,j.levelname as levelnameindividu,v.kekaryaanname as kekaryaanname,aa.tglmasuk,aa.tglberakhir,cc.namajabatan as namajabatanatasan,ee.namaorg as namaorgatasan,l.namalengkap as namaatasan,a.tgllahir,n.sexname,a.noktp,a.notelp,a.nohandphone,pek.tglmasuk as tglmasukpeg,bbb.idpergerakan";
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
                   LEFT  JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    LEFT join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    LEFT join pergerakanpersonil bbb ON aa.idpergerakanpersonil = bbb.idpergerakanpersonil
                    LEFT JOIN strukturjabatan b ON aa.idstrukturjabatan = b.idstrukturjabatan
                    LEFT JOIN jabatan c ON b.idjabatan = c.idjabatan
                    LEFT JOIN lokasi_org d ON aa.idlokasiorg = d.idlokasiorg
                    LEFT JOIN organisasi e ON b.idorganisasi = e.idorganisasi
                    LEFT JOIN kekaryaan f ON aa.idkekaryaan = f.idkekaryaan
                    LEFT JOIN pelamar g ON aa.idpelamaratasan = g.idpelamar
                    LEFT JOIN level j ON aa.idlevelindividu = j.idlevel
                    LEFT JOIN level i ON c.idlevel = i.idlevel
                    LEFT join kekaryaan v ON aa.idkekaryaan = v.idkekaryaan
                    JOIN calonpelamar k ON a.idpelamar = k.idpelamar
                    left join pelamar l ON aa.idpelamaratasan = l.idpelamar
                    join company m ON a.idcompany = m.idcompany
                    LEFT  JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON xx.idpelamar = aa.idpelamaratasan
                    LEFT JOIN pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan
                    LEFT JOIN strukturjabatan bb ON aaa.idstrukturjabatan = bb.idstrukturjabatan
                    LEFT JOIN jabatan cc ON bb.idjabatan = cc.idjabatan
                    LEFT JOIN organisasi ee ON bb.idorganisasi = ee.idorganisasi
                    left join sextype n ON a.idsex = n.idsex
                    LEFT  JOIN
                    (
                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xxx ON a.idpelamar = xxx.idpelamar
                    left join pekerjaan pek ON xxx.idpekerjaan = pek.idpekerjaan
                    LEFT  JOIN
                    (
                        SELECT a.idpelamar,a.tglmasuk
                        FROM pekerjaan a
                        LEFT join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil
                        WHERE b.statuspergerakan='Disetujui' and b.idpergerakan=128  
                        GROUP BY a.idpelamar,a.tglmasuk
                    ) as term ON a.idpelamar = term.idpelamar";

        return $query;
    }


    function whereQuery() {
        $aktif = $this->input->post('aktif');
        $wer = $this->m_data->whereCompany('a',false);

         if($this->input->post('notidpelamar')!='')
         {
            //cari atasan
            $wer .= " AND a.idpelamar!=".$this->input->post('notidpelamar');
         } else {
            // $wer = null;
         }

        if($this->input->post('tglmasuk1')!=null && $this->input->post('tglmasuk2')!=null)
        {
            $tglmasuk1 = backdate2_reverse($this->input->post('tglmasuk1'));
            $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND aaa.tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        } else if($this->input->post('tglmasuk1')!=null && $this->input->post('tglmasuk2')==null)
        {
            $tglmasuk1 = backdate2_reverse($this->input->post('tglmasuk1'));
            // $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND aaa.tatglmasuk ='$tglmasuk1'";
        }
		
        //terminasi
		if($this->input->post('tglkeluar1')!=null && $this->input->post('tglkeluar2')!=null)
        {
            $tglkeluar1 = backdate2_reverse($this->input->post('tglkeluar1'));
            $tglkeluar2 = backdate2_reverse($this->input->post('tglkeluar2'));
            // $wer.=" AND (aa.tglberakhir BETWEEN '$tglkeluar1' AND '$tglkeluar2') and bb.idpergerakan=128";
            $wer.=" AND (aa.tglmasuk BETWEEN '$tglkeluar1' AND '$tglkeluar2') and bbb.idpergerakan=128";
        } else if($this->input->post('tglkeluar1')!=null && $this->input->post('tglkeluar2')==null)
        {
            $tglkeluar1 = backdate2_reverse($this->input->post('tglkeluar1'));
            // $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND aa.tglmasuk ='$tglkeluar1'  and bbb.idpergerakan=128";
        }

         // return "a.display is null $wer";

         $wer .=" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

		 $datenow = gmdate('Y-m-d');
		 // echo $datenow.' ';
         if($aktif=='true')
         {
            return "a.display is null and (('$datenow' between aa.tglmasuk and aa.tglberakhir) OR ('$datenow' between pek.tglmasuk and aa.tglberakhir) OR ('$datenow' <= term.tglmasuk)) $wer";
         } else {
            // $wer = str_replace("WHERE TRUE AND", "WHERE TRUE", $wer);
            // return "$wer";
             return "a.display is null $wer";
        }
    }

    function orderBy() {
        return "a.idpelamar desc";
    }

    function updateField() {

        $data = array(
            'idlokasiorg' => $this->input->post('idlokasiorg') == '' ? $this->m_data->getSeqVal('seq_lokasi') : $this->input->post('idlokasiorg'),
           'idtingkatlokasi' => $this->m_data->getID('tingkatlokasi', 'tingkatlokasi', 'idtingkatlokasi', $this->input->post('tingkatlokasi')),
            'kodebudgelokasi' => $this->input->post('kodebudgelokasi'),
            'namalokasi' => $this->input->post('namalokasi'),
            // 'idtingkatlokasi' => $this->input->post('idtingkatlokasi'),
            'description' => $this->input->post('description'),
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany')
        );
        return $data;
    }

}

?>
