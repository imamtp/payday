<?php

class m_suratketerangan extends CI_Model {

    function tableName() {
        return 'suratketerangan';
    }

    function pkField() {
        return 'idsuratket';
    }

    function searchField() {
        $field = "nosurat,jenissurat,tujuan";
        return explode(",", $field);
    }

    function selectField() {
        return "idsuratket,idpelamar,nosurat,jenissurat,masberlaku,tujuan,userin,datein";
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
            'idsuratket' => $this->input->post('idsuratket') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idsuratket'),
            // 'idpelatihan'=> $this->input->post('idpelatihan'),
           // 'idsuratket' => $this->input->post('idpelatihan'),
            'idpelamar' => $this->input->post('idpelamar'),
            'nosurat' => $this->input->post('nosurat'),
            'jenissurat' => $this->input->post('jenissurat'),
            'masberlaku' => backdate2_reverse($this->input->post('masberlaku')),
            'tujuan' => $this->input->post('tujuan'),
        );
        return $data;
    }

}

?>