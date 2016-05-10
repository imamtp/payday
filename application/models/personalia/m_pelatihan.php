<?php

class m_pelatihan extends CI_Model {

    function tableName() {
        return 'pelatihan';
    }

    function pkField() {
        return 'idpelatihan';
    }

    function searchField() {
        $field = "namapelatihan";
        return explode(",", $field);
    }

    function selectField() {
        return "idpelatihan,idpelamar,namapelatihan,jenispelatihan,tglpelatihan,nosertifikat,jenissertifikat,a.userin,a.datein";
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
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
        // if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     $wer = " AND (b.idcompany=".$this->session->userdata('idcompany').")";
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (b.idcompany=".$this->session->userdata('idcompany').")";
        //     } else {
        //         $wer = null;
        //     }
         return "a.display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idpelatihan' => $this->input->post('idpelatihan') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idpelatihan'),
            // 'idpelatihan'=> $this->input->post('idpelatihan'),
            'idpelamar'=> $this->input->post('idpelamar'),
            'namapelatihan'=> $this->input->post('namapelatihan'),
            'jenispelatihan'=> $this->input->post('jenispelatihan'),
            'tglpelatihan'=> $this->input->post('tglpelatihan')!='' ? backdate2_reverse($this->input->post('tglpelatihan')) : null,
            'nosertifikat'=> $this->input->post('nosertifikat'),
            'jenissertifikat'=> $this->input->post('jenissertifikat')
        );
        return $data;
    }

}

?>