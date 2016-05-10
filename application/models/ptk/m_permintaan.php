<?php

class m_permintaan extends CI_Model {

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
        return "a.idpermintaantk,g.levelname,g.kodelevel,e.kodejabatan,a.statusperencanaan,a.tahun,a.idcompany,a.idjabatan,a.idorganisasi,a.idlokasiorg,a.idjabatanatasan,a.namabulan,a.jumlahpermintaantk,a.jumlahbulankekaryaan,a.tglakhirkekaryaan,a.status,a.userin,a.usermod,b.companyname,b.companycode,c.kodeorg,c.kodebudgetorg,c.namaorg,d.namalokasi,e.namajabatan,f.namajabatan as namajabatanatasan";
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
                    join organisasi c ON a.idorganisasi = c.idorganisasi
                    join lokasi_org d ON a.idlokasiorg = d.idlokasiorg
                    join jabatan e ON a.idjabatan = e.idjabatan
                    join jabatan f ON a.idjabatanatasan = f.idjabatan
                    join level g ON e.idlevel = g.idlevel";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('idcompany')==1)
        {
            //master
            // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
            $wer = null;
        } else  if($this->session->userdata('idcompany')!=1)
            {
                //selain master admin
                $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
            } else {
                $wer = null;
            }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "a.idperencanaantk asc";
    }

    function updateField() { 

        $data = array(
            'idpermintaantk' => $this->input->post('idpermintaantk') == '' ? $this->m_data->getSeqVal('seq_permintaantk') : $this->input->post('idpermintaantk'),
            'idcompany' => $this->input->post('idcompany'),
            'idjabatan' => $this->input->post('idjabatan'),
            'idorganisasi' => $this->input->post('idorganisasi'),
            'idlokasiorg' => $this->input->post('idlokasiorg'),
            'idjabatanatasan' => $this->input->post('idjabatanatasan'),
            'nomorpermintaantk' => $this->input->post('nomorpermintaantk'),
            'namabulan' => $this->input->post('namabulan'),
            'tahun' => $this->input->post('tahun'),
            'namaatasan' => $this->input->post('namaatasan'),
            'rencanatglmasuk' => backdate2_reverse($this->input->post('rencanatglmasuk')),
            'jumlahrencana' => $this->input->post('jumlahrencana'),
            'jumlahsaatini' => $this->input->post('jumlahsaatini'),
            'selisih' => $this->input->post('selisih'),
            'tujuan' => $this->input->post('tujuan'),
            'statusperencanaan' => $this->input->post('statusperencanaan'),
            'idkekaryaan' => $this->m_data->getID('kekaryaan', 'kekaryaanname', 'idkekaryaan', $this->input->post('kekaryaanname')),
            'jumlahpermintaantk' => $this->input->post('jumlahpermintaantk')==null ? 0 : $this->input->post('jumlahpermintaantk'),
            'jumlahbulankekaryaan' => $this->input->post('jumlahbulankekaryaan'),
            'tglakhirkekaryaan'  => $this->input->post('tglakhirkekaryaan') == null ? null : backdate2_reverse($this->input->post('tglakhirkekaryaan')),
        );
        return $data;
    }

}

?>