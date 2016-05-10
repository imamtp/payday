<?php

class m_vdatakaryawan extends CI_Model {

    function tableName() {
        return 'v_datakaryawan';
    } 

    function pkField() {
        return 'idlokasiorg';
    }

    function searchField() {
        $field = "namalengkap,namaagama,noktp,alamat,notelp,nohandphone,jabatandituju,status,tempatlahir,email,daerahrekrut,alamatktp,fakultas,jurusan,foto,foto,cv,referensi,sumberlamaran,gelarakademik,kewarganegaraan,notelp2,sexname,namastatuskawin,namajenjang,companyname,companycode";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,a.idcompany,namakewarganegaraan,namalengkap,golongandarah,daerahrekrut,gelarakademik,tgllahir,noktp,alamat,notelp,nohandphone,a.status,a.userin,a.usermod,a.datein,a.datemod,tempatlahir,email,alamatktp,fakultas,jurusan,foto,cv,referensi,kewarganegaraan,notelp2,sexname,namastatuskawin,namajenjang,umur,companyname,companycode,namaagama,email2,nohandphone2,a.nik,ni,c.statuscalon,a.idjadwalkerja";
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
                    left join calonpelamar c ON a.idpelamar = c.idpelamar
                    left join kewarganegaraan d ON a.idkewarganegaraan = d.idkewarganegaraan";

        return $query;
    }

    function whereQuery() {
       
         $wer ="AND (c.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' or a.status is null)";
         return "a.display is null $wer ".$this->m_data->whereCompany()." AND c.display is null";
    }

    function orderBy() {
        return "";
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