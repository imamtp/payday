<?php

class m_personil extends CI_Model {

    function tableName() {
        return 'pelamar';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "a.namalengkap,namajabatan,namaorg,kodeorg,namalokasi";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,a.ni,nik,a.namalengkap,aa.idpekerjaan,c.namajabatan,e.namaorg,kodeorg,d.namalokasi,k.statuscalon,a.display,a.idcompany,l.namalengkap as namaatasan,m.companyname";
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
                    LEFT JOIN strukturjabatan b ON aa.idstrukturjabatan = b.idstrukturjabatan
                    LEFT JOIN jabatan c ON b.idjabatan = c.idjabatan
                    LEFT JOIN lokasi_org d ON aa.idlokasiorg = d.idlokasiorg
                    LEFT JOIN organisasi e ON b.idorganisasi = e.idorganisasi
                    LEFT JOIN kekaryaan f ON aa.idkekaryaan = f.idkekaryaan
                    LEFT JOIN pelamar g ON aa.idpelamaratasan = g.idpelamar
                    LEFT JOIN level j ON aa.idlevelindividu = j.idlevel
                    LEFT JOIN level i ON c.idlevel = i.idlevel
                    JOIN calonpelamar k ON a.idpelamar = k.idpelamar
                    left join pelamar l ON aa.idpelamaratasan = l.idpelamar
                    join company m ON a.idcompany = m.idcompany";
        return $query;
    }

    function whereQuery($idcompany=null,$idorganisasi=null,$idjabatan=null,$idpelamar=null) {
         if($this->input->post('notidpelamar')!='')
         {
            //cari atasan
            $wer = " AND a.idpelamar!=".$this->input->post('notidpelamar')." and (statuscalon!='Diajukan' OR statuscalon is null) ";
         } else {
            $wer = null;
         }


         if($this->input->post('withjob')=='true')
         {
           //data personil yang sudah ada pergerakan/tabel pekerjaan
            $werjob = "  and x.idpekerjaan is not null";
         } else {
            $werjob = null;
         }

         if($idcompany!=null)
         {
            $wer.= " and a.idcompany=$idcompany ";
         }

         if($idorganisasi!=null)
         {
            $wer.= " and b.idorganisasi=$idorganisasi ";
         }

         if($idjabatan!=null)
         {
            $wer.= " and b.idjabatan=$idjabatan ";
         }

		 if($idpelamar!=null)
		 {
			 $wer.= " and a.idpelamar=$idpelamar ";
		 }
         return "a.display is null ".$this->m_data->whereCompany('a',false)."".$wer.$werjob;
    }

    function orderBy() {
        return "a.idpelamar asc";
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
            // 'display' int4,
            // 'userin' varchar(20),
            // 'usermod' varchar(20),
            // 'datein' timestamp(6),
            // 'datemod' timestamp(6),
            'idstrukturjabatan' => $this->input->post('idstrukturjabatan'),
            'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            'idorganisasiatasan' => $this->input->post('idorganisasiatasan')
        );
        return $data;
    }

}

?>
