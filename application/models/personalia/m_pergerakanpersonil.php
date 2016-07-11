<?php

class m_pergerakanpersonil extends CI_Model {

    function tableName() {
        return 'pergerakanpersonil';
    }

    function pkField() {
        return 'idpergerakanpersonil';
    }

    function searchField() {
        $field = "b.namalengkap,p.namajabatan,q.namaorg,c.companyname,s.namalokasi,n.nik,m.namapergerakan,a.nopergerakan";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpergerakanpersonil,a.nopergerakan,a.idpelamar,a.idcompany,a.idjabatan,a.idlevelindividu,a.idorganisasi,
a.statuspergerakan,a.userin,a.datein,b.namalengkap,c.companyname,m.namapergerakan,b.ni,n.nik,a.idpekerjaanfrom,
p.namajabatan,q.namaorg,s.namalokasi,t.levelname as levelnamejabatan,u.levelname as levelnameindividu,v.kekaryaanname as kekaryaanname,
r.tglmasuk as tglmasuk,r.tglberakhir as tglberakhir,w.namalengkap as namaatasan,ccc.namajabatan as namajabatanatasan,eee.namaorg as namaorgatasan,
r.idpelamaratasan,r.idlevelindividu,r.idstrukturjabatan,r.idpekerjaan,
pp.namajabatan as namajabatan_from,qq.namaorg as namaorg_from,ss.namalokasi as namalokasi_from,tt.levelname as levelnamejabatan_from,
uu.levelname as levelnameindividu_from,vv.kekaryaanname as kekaryaanname_from,rr.tglmasuk as tglmasuk_from,rr.tglberakhir as tglberakhir_from,
rr.idpelamaratasan as idpelamaratasan_from,ww.namalengkap as namaatasan_from,rr.idstrukturjabatan as idstrukturjabatan_from,cc.namajabatan as namajabatanatasan_from,ee.namaorg as namaorgatasan_from,a.periodekekaryaan,a.jumlahbulankekaryaan,catatanpenyesuaian,startdatenewpay,alasanterminasi,tglterminasi";
    }

    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeorg'=>'Kode Organisasi'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join pelamar b ON a.idpelamar = b.idpelamar
                    join company c ON b.idcompany = c.idcompany
                    LEFT join pergerakan m ON a.idpergerakan = m.idpergerakan
                     LEFT join (select nik,idpelamar 
									from calonpelamar) n ON a.idpelamar = n.idpelamar
                    LEFT join pekerjaan r ON a.idpergerakanpersonil = r.idpergerakanpersonil
                    LEFT join strukturjabatan o ON r.idstrukturjabatan = o.idstrukturjabatan
                    LEFT join jabatan p ON o.idjabatan = p.idjabatan
                    LEFT join organisasi q ON o.idorganisasi = q.idorganisasi
                    LEFT join lokasi_org s ON r.idlokasiorg = s.idlokasiorg
                    LEFT join level t ON p.idlevel = t.idlevel
                    LEFT join level u ON r.idlevelindividu = u.idlevel
                    LEFT join kekaryaan v ON r.idkekaryaan = v.idkekaryaan
                    LEFT JOIN pelamar w ON r.idpelamaratasan = w.idpelamar
                    LEFT  JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xxx ON xxx.idpelamar = r.idpelamaratasan
                    LEFT JOIN pekerjaan aaa ON xxx.idpekerjaan = aaa.idpekerjaan
                    LEFT JOIN strukturjabatan bbb ON aaa.idstrukturjabatan = bbb.idstrukturjabatan
                    LEFT JOIN jabatan ccc ON bbb.idjabatan = ccc.idjabatan
                    LEFT JOIN organisasi eee ON bbb.idorganisasi = eee.idorganisasi

                    LEFT JOIN pekerjaan rr ON A .idpekerjaanfrom = rr.idpekerjaan
                    LEFT JOIN strukturjabatan oo ON rr.idstrukturjabatan = oo.idstrukturjabatan
                    LEFT JOIN jabatan pp ON oo.idjabatan = pp.idjabatan
                    LEFT JOIN organisasi qq ON oo.idorganisasi = qq.idorganisasi
                    LEFT JOIN lokasi_org ss ON rr.idlokasiorg = ss.idlokasiorg
                    LEFT JOIN LEVEL tt ON pp.idlevel = tt.idlevel
                    LEFT JOIN LEVEL uu ON rr.idlevelindividu = uu.idlevel
                    LEFT JOIN kekaryaan vv ON rr.idkekaryaan = vv.idkekaryaan
                    LEFT JOIN pelamar ww ON rr.idpelamaratasan = ww.idpelamar
                    
                    LEFT  JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON xx.idpelamar = rr.idpelamaratasan
                    LEFT JOIN pekerjaan aa ON xx.idpekerjaan = aa.idpekerjaan
                    LEFT JOIN strukturjabatan bb ON aa.idstrukturjabatan = bb.idstrukturjabatan
                    LEFT JOIN jabatan cc ON bb.idjabatan = cc.idjabatan
                    LEFT JOIN organisasi ee ON bb.idorganisasi = ee.idorganisasi ";

        return $query;
    }

    function whereQuery() {
        $wer = $this->m_data->whereCompany('b',false);

        $startdate = str_replace('T00:00:00', '', $this->input->post('startdate'));
        $enddate = str_replace('T00:00:00', '', $this->input->post('enddate'));
        if($startdate!=null && $enddate!=null)
        {
            $wer.=" AND r.tglmasuk BETWEEN '$startdate' AND '$enddate'";
        }

        return "a.display is null $wer";
    }

    function orderBy() {
        return "idpergerakanpersonil desc";
    }

    function updateField() {
        $data = array(
            'idpergerakanpersonil' => $this->input->post('idpergerakanpersonil') == '' ? $this->m_data->getSeqVal('seq_pergerakanpersonil') : $this->input->post('idpergerakanpersonil'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idcompany' => $this->input->post('idcompany'),
            'idjabatan' => $this->input->post('idjabatan'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'idpelamar' =>$this->input->post('idpelamar'),
            'idstrukturjabatan' =>$this->input->post('idstrukturjabatan'),
            'idpelamaratasan' =>$this->input->post('idpelamaratasan'),
            'idorganisasi' =>$this->input->post('idorganisasi'),
            'idcompany' =>$this->input->post('idcompany'),
            'idjabatan' =>$this->input->post('idjabatan'),
            'idlevelindividu' =>$this->input->post('idlevelindividu'),
            'idorganisasi' =>$this->input->post('idorganisasi'),
            'idkekaryaan' =>$this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            // 'idjabatanatasan' =>$this->input->post('idjabatanatasan'),
            // 'idorganisasiatasan' =>$this->input->post('idorganisasiatasan'),
            'idlokasiorg' =>$this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi')),
            // 'idlokasiorgatasan' =>$this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('lokasiatasan')),
            'tglmasuk' =>backdate2_reverse($this->input->post('tglmasuk')),
            'tglberakhir' =>backdate2_reverse($this->input->post('tglberakhir')),
            // 'namaatasan' =>$this->input->post('namaatasan'),
            'statuspergerakan' =>$this->input->post('statuspergerakan'),
             'idpergerakan' =>$this->m_data->getID('pergerakan', 'namapergerakan', 'idpergerakan', $this->input->post('namapergerakan'))
        );
        return $data;
    }

}

?>
