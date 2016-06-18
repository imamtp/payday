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
        return "a.idpelamar,a.idcompany,e.idorganisasi,e.idjabatan,a.namalengkap,aa.idpekerjaan,k.statuscalon,a.display,a.idcompany,aa.tglmasuk,aa.tglberakhir,ni,nik,tgllahir,sexname,noktp,notelp,nohandphone,statuscalon,a.status,kekaryaanname,a.display,f.companyname,bb.idpergerakan,aaa.tglmasuk as tglmasukpeg,a.idjadwalkerja";
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
									where statuscalon='Disetujui' OR statuscalon is null) k ON a.idpelamar = k.idpelamar
                    LEFT join sextype c ON a.idsex = c.idsex
                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                    left join company f ON a.idcompany = f.idcompany";

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
            $wer.=" AND (aa.tglmasuk BETWEEN '$tglkeluar1' AND '$tglkeluar2') and bb.idpergerakan=128";
        } else if($this->input->post('tglkeluar1')!=null && $this->input->post('tglkeluar2')==null)
        {
            $tglkeluar1 = backdate2_reverse($this->input->post('tglkeluar1'));
            // $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND aa.tglmasuk ='$tglkeluar1'  and bb.idpergerakan=128";
        }

         // return "a.display is null $wer";

         $wer .=" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

		 $datenow = gmdate('Y-m-d');
		 
         if($aktif=='true')
         {
            return "a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir OR '$datenow' between aaa.tglmasuk and aaa.tglberakhir) $wer AND bb.idpergerakan!=128";
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
