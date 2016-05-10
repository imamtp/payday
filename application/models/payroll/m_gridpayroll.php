<?php

class m_gridpayroll extends CI_Model {

    function tableName() {
        return 'payroll';
    }

    function pkField() {
        return 'idpayroll';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpayroll,a.idjournal,a.month,a.year,a.datein,namaunit,b.memo";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pegawai'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                 . "join journal b ON a.idjournal = b.idjournal
                    join unit c oN b.idunit = c.idunit";
        return $query;
    }

    function whereQuery() {
        // $bulantahunpenggajian = str_replace('T00:00:00', '', $this->input->post('bulantahunpenggajian'));
        // $arrDate1 = explode("-", $bulantahunpenggajian);
        // $date1 = $arrDate1[0].'-'.$arrDate1[1].'-01';
        // $date2 = $arrDate1[0].'-'.$arrDate1[1].'-'.cal_days_in_month(CAL_GREGORIAN, $arrDate1[1], $arrDate1[0]);
        
        // $wer = "    A.MONTH = '".$arrDate1[1]."' AND A.YEAR = ".$arrDate1[0]."";
        
        return '';
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idsallary' => $this->input->post('idsallary') == '' ? $this->m_data->getSeqVal('seq_sallary') : $this->input->post('idsallary'),
            'basicsallary' => $this->input->post('basicsallary'),
            'idemployee'=>$this->input->post('idemployee')
        );
        return $data;
    }

}

?>