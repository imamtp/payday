<?php

class m_datapekerjaan extends CI_Model {

    function tableName() {
        return 'pelamar';
    }

    function pkField() {
        return 'idpekerjaan';
    }

    function searchField() {
        $field = "namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "aa.idpekerjaan,a.idpelamar,a.idcompany,a.tgllahir,b.idorganisasi,b.idjabatan,a.namalengkap,aa.idpekerjaan,c.namajabatan,e.namaorg,kodeorg,d.namalokasi,k.statuscalon,a.display,a.idcompany,aa.tglmasuk,aa.tglberakhir,g.namalengkap as namaatasan,i.levelname as levelnamejabatan,j.levelname as levelnameindividu,f.kekaryaanname,companyname,a.ni,nik";
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
                    INNER JOIN 
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    LEFT JOIN
                    (
                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON a.idpelamar = xx.idpelamar
                    left join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan
                    JOIN strukturjabatan b ON aa.idstrukturjabatan = b.idstrukturjabatan 
                    JOIN jabatan c ON b.idjabatan = c.idjabatan 
                    JOIN lokasi_org d ON aa.idlokasiorg = d.idlokasiorg 
                    JOIN organisasi e ON b.idorganisasi = e.idorganisasi 
                    JOIN kekaryaan f ON aa.idkekaryaan = f.idkekaryaan 
                    LEFT JOIN pelamar g ON aa.idpelamaratasan = g.idpelamar 
                    JOIN level j ON aa.idlevelindividu = j.idlevel 
                    JOIN level i ON c.idlevel = i.idlevel
                    JOIN calonpelamar k ON a.idpelamar = k.idpelamar
                    join company l ON a.idcompany = l.idcompany";

        return $query;
    }

    function whereQuery() {

        // $wer = $this->m_data->whereCompany('a',false);

       
        // if($this->input->post('tglmasuk1')!=null && $this->input->post('tglmasuk2')!=null)
        // {
        //     $tglmasuk1 = backdate2_reverse($this->input->post('tglmasuk1'));
        //     $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
        //     $wer.=" AND tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        // } else

        // if($this->input->post('tglmasuk1')!=null && $this->input->post('tglmasuk2')==null)
        // {
        //     $tglmasuk1 = backdate2_reverse($this->input->post('tglmasuk1'));
        //     // $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
        //     $wer.=" AND tglmasuk ='$tglmasuk1'";
        // }

        //  return "a.display is null $wer";

        $aktif = $this->input->post('aktif');
        $wer = $this->m_data->whereCompany('a',false);

        if($this->input->post('tglmasuk1')!=null && $this->input->post('tglmasuk2')!=null)
        {
            $tglmasuk1 = backdate2_reverse($this->input->post('tglmasuk1'));
            $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        } else if($this->input->post('tglmasuk1')!=null && $this->input->post('tglmasuk2')==null)
        {
            $tglmasuk1 = backdate2_reverse($this->input->post('tglmasuk1'));
            // $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND tglmasuk ='$tglmasuk1'";
        }
        
        if($this->input->post('tglkeluar1')!=null && $this->input->post('tglkeluar2')!=null)
        {
            $tglkeluar1 = backdate2_reverse($this->input->post('tglkeluar1'));
            $tglkeluar2 = backdate2_reverse($this->input->post('tglkeluar2'));
            $wer.=" AND tglberakhir BETWEEN '$tglkeluar1' AND '$tglkeluar2'";
        } else if($this->input->post('tglkeluar1')!=null && $this->input->post('tglkeluar2')==null)
        {
            $tglkeluar1 = backdate2_reverse($this->input->post('tglkeluar1'));
            // $tglmasuk2 = backdate2_reverse($this->input->post('tglmasuk2'));
            $wer.=" AND tglberakhir ='$tglkeluar1'";
        }

         // return "a.display is null $wer";

         $wer .=" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

         $datenow = gmdate('Y-m-d');
         
         if($aktif=='true')
         {
            return "a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir OR '$datenow' between aaa.tglmasuk and aaa.tglberakhir) $wer";
         } else {
            // $wer = str_replace("WHERE TRUE AND", "WHERE TRUE", $wer);
            // return "$wer";
             return "a.display is null $wer";
        }
    }

    function orderBy() {
        return "aa.idpekerjaan desc";
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