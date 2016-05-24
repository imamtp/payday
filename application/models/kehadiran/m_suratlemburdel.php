<?php
//buat hapus lembur
class m_suratlemburdel extends CI_Model {

    function tableName() {
        return 'lembur';
    }

    function pkField() {
        return 'idlembur';
    }

    function searchField() {
        $field = "namapelatihan";
        return explode(",", $field);
    }

    function selectField() {
        return "idbenefit,idpelamar,nomorrekening,namaakunrekening,namabank,cabangbank,nopolisasuransi,nobpjskesehatan,nobpjstenagakerja,userin,datein";
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
            'idbenefit' => $this->input->post('idbenefit') == '' ? $this->m_data->getSeqVal('seq_datapegawai') : $this->input->post('idbenefit'),
                   // 'idbenefit'=> $this->input->post('idbenefit'),
                'idpelamar'=> $this->input->post('idpelamar'),
                'nomorrekening'=> $this->input->post('nomorrekening'),
                'namaakunrekening'=> $this->input->post('namaakunrekening'),
                'namabank'=> $this->input->post('namabank'),
                'cabangbank'=> $this->input->post('cabangbank'),
                'nopolisasuransi'=> $this->input->post('nopolisasuransi'),
                'nobpjskesehatan'=> $this->input->post('nobpjskesehatan'),
                'nobpjstenagakerja'=> $this->input->post('nobpjstenagakerja')
        );
        return $data;
    }

}

?>