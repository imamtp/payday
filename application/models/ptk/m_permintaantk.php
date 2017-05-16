<?php

class m_permintaantk extends CI_Model {

    function tableName() {
        return 'permintaantk';
    }

    function pkField() {
        return 'idpermintaantk';
    }

    function searchField() {
        $field = "nomorpermintaantk";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpermintaantk,a.idpelamaratasan,a.idstrukturjabatan,a.nomorpermintaantk,i.namalengkap as namaatasan,a.jumlahrencana,a.periodekekaryaan,a.rencanatglmasuk,a.jumlahsaatini,a.selisih,a.tujuan,g.levelname,g.kodelevel,e.kodejabatan,a.statusperencanaan,a.tahun,a.idcompany,a.idjabatan,a.idorganisasi,a.idlokasiorg,a.idjabatanatasan,a.namabulan,a.jumlahpermintaantk,a.jumlahbulankekaryaan,a.tglakhirkekaryaan,a.status,a.userin,a.usermod,b.companyname,b.companycode,c.kodeorg,c.kodebudgetorg,c.namaorg,d.namalokasi,e.namajabatan,f.namajabatan as namajabatanatasan,h.kekaryaanname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'nomorpermintaantk'=>'Nomor PTK'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company b ON a.idcompany = b.idcompany
                    join strukturjabatan aa ON a.idstrukturjabatan = aa.idstrukturjabatan
                    join organisasi c ON aa.idorganisasi = c.idorganisasi
                    join lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                    join jabatan e ON aa.idjabatan = e.idjabatan
                    join jabatan f ON aa.idjabatanatasan = f.idjabatan
                    join level g ON e.idlevel = g.idlevel
                    join kekaryaan h ON a.idkekaryaan = h.idkekaryaan
                    left join pelamar i ON a.idpelamaratasan = i.idpelamar";

        return $query;
    }

    function whereQuery() {
         return "a.display is null ".$this->m_data->whereCompany('a',false)."";
    }

    function orderBy() {
        return "a.idpermintaantk desc";
    }

    function updateField() { 
        $nomorpermintaantk = $this->input->post('nomorpermintaantk');
        // $idpermintaantk = $this->input->post('idpermintaantk') == '' ? $this->m_data->getSeqVal('seq_permintaantk') : $this->input->post('idpermintaantk');
        if($this->input->post('statusformPermintaantk')=='input')
        {
            //cek dulu
            $q = $this->db->get_where('permintaantk',array('nomorpermintaantk'=>$nomorpermintaantk,'display'=>null));
            if($q->num_rows()>0)
            {
                $json = array('success' => false, 'message' => 'Nomor Permintaan TK <b>'.$nomorpermintaantk.'</b> sudah ada di dalam database');
                echo json_encode($json);
                exit;
            }
        }

        $data = array(
            'idpermintaantk' => $this->input->post('idpermintaantk') == '' ? $this->m_data->getSeqVal('seq_permintaantk') : $this->input->post('idpermintaantk'),
            // 'idcompany' =>  $this->m_data->getID('company', 'companyname', 'idcompany', $this->input->post('companyname')),
            'idcompany' => $this->input->post('idcompany'),
            'idstrukturjabatan' => $this->input->post('idstrukturjabatan'),
            // 'idjabatan' => $this->input->post('idjabatan'),
            // 'idorganisasi' => $this->input->post('idorganisasi'),
            'idlokasiorg' => $this->input->post('idlokasiorg'),
            // 'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            'nomorpermintaantk' => $nomorpermintaantk,
            'namabulan' => $this->input->post('namabulan'),
            'tahun' => $this->input->post('tahun'),
            'namaatasan' => $this->input->post('namaatasan'),
            'rencanatglmasuk' => backdate2_reverse($this->input->post('rencanatglmasuk')),
            'jumlahrencana' => $this->input->post('jumlahrencana'),
            'jumlahsaatini' => $this->input->post('jumlahsaatini'),
            'selisih' => $this->input->post('selisih'),
            'tujuan' => $this->input->post('tujuan'),
            'periodekekaryaan' => $this->input->post('periodekekaryaan'),
            'statusperencanaan' => $this->input->post('statusperencanaan'),
            'idpelamaratasan' => $this->input->post('idpelamaratasan')==null ? null : $this->input->post('idpelamaratasan'),
            'idkekaryaan' => $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            'jumlahpermintaantk' => $this->input->post('jumlahpermintaantk')==null ? 0 : $this->input->post('jumlahpermintaantk'),
            'jumlahbulankekaryaan' => $this->input->post('jumlahbulankekaryaan'),
            'tglakhirkekaryaan'  => $this->input->post('tglakhirkekaryaan') == null ? null : backdate2_reverse($this->input->post('tglakhirkekaryaan')),
        );
        return $data;
    }

}

?>