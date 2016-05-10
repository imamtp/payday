<?php

class m_pengaturancuti extends CI_Model {

    function tableName() {
        return 'pengaturancuti';
    }

    function pkField() {
        return 'idpengaturancuti';
    }

    function searchField() {
        $field = "kodepengcuti";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpengaturancuti,kodepengcuti,namapengcuti,jumlahcuti,bulanbericuti,bulantambahcuti,haritambahcuti,jenpengurangcuti,jumpengurangcuti,hitungsisacuti,a.idcompany,a.userin,a.usermod,b.companyname,b.companycode";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodepengcuti'=>'Kode'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company b ON a.idcompany = b.idcompany";

        return $query;
    }

    function whereQuery() {
                $wer = null;
         return "a.display is null $wer ".$this->m_data->whereCompany('b');
    }

    function orderBy() {
        return "a.idpengaturancuti asc";
    }

    function updateField() { 

        $data = array(
            'idpengaturancuti' => $this->input->post('idpengaturancuti') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idpengaturancuti'),
            'kodepengcuti' => $this->input->post('kodepengcuti'),
            'namapengcuti' => $this->input->post('namapengcuti'),
            'jumlahcuti' => $this->input->post('jumlahcuti'),
            'bulanbericuti' => $this->input->post('bulanbericuti'),
            'bulantambahcuti' => $this->input->post('bulantambahcuti'),
            'haritambahcuti' => $this->input->post('haritambahcuti'),
            'jenpengurangcuti' => $this->input->post('jenpengurangcuti'),
            'jumpengurangcuti' => $this->input->post('jumpengurangcuti'),
            'hitungsisacuti' => $this->input->post('hitungsisacuti'),
            'idcompany' => $this->session->userdata('idcompany')
        );
        return $data;
    }

}

?>