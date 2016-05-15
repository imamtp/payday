<?php

class m_lokasiorg extends CI_Model {

    function tableName() {
        return 'lokasi_org';
    }

    function pkField() {
        return 'idlokasiorg';
    }

    function searchField() {
        $field = "namalokasi,tingkatlokasi";
        return explode(",", $field);
    }

    function selectField() {
        return "idlokasiorg,kodebudgelokasi,namalokasi,a.idtingkatlokasi,a.idcompany,companycode,a.startdate,a.enddate,a.description,a.status,a.userin,a.datein,tingkatlokasi,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        // $f = array(
        //   'kodebudgelokasi'=>'Kode lokasi',
        //   'namalokasi'=>'nama lokasi'
        // );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join tingkatlokasi b ON a.idtingkatlokasi = b.idtingkatlokasi
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
       
         return "a.display is null ".$this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $kodebudgelokasi = $this->input->post('kodebudgelokasi');

        if($this->input->post('idlokasiorg') == '')
        {
            $idlokasiorg = $this->m_data->getSeqVal('seq_lokasi');
        } else {    
            $idlokasiorg = $this->input->post('idlokasiorg');
        }

        $this->load->model('m_data');

        $validation = array(
            'tableName'=>$this->tableName(),
            'pkField'=>$this->pkField(),
            'valPkField'=>$idlokasiorg,
            'keyField'=>'kodebudgelokasi',
            'valKeyField'=>$kodebudgelokasi,
            'label'=>'Kode Lokasi'
        );
        $this->m_data->extValidation($validation);        

        $data = array(
            'idlokasiorg' => $idlokasiorg,
           'idtingkatlokasi' => $this->m_data->getID('tingkatlokasi', 'tingkatlokasi', 'idtingkatlokasi', $this->input->post('tingkatlokasi')),
            'kodebudgelokasi' => $kodebudgelokasi,
            'namalokasi' => strtoupper($this->input->post('namalokasi')),
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