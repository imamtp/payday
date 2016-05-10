<?php

class m_griddatagaji extends CI_Model {

    function tableName() {
        return 'payrollproceed';
    }

    function pkField() {
        return 'idpayroll';
    }

    function searchField() {
        $field = "A.firstname,A.lastname,A.namaunit";
        return explode(",", $field);
    }

    function selectField() {
        return "A.idemployee,A.penambahangaji,A.idemployeetype,norek,namabank,premiinsurance,C.idaccount,C.idaccountpayroll,d.accname,e.accname,A.firstname,A.lastname,namaunit,A.nametype,jumlahjam,jumlahkehadiran,totalgaji,totaltunjangan,pph21,totalpotongan,totalpembayaran,payname,A.userin,A.code,jenispph21,month,year,A.idunit,idpayroll,tglpenggajian";
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
                 . "JOIN employeetype C ON A.idemployeetype = C.idemployeetype
                   LEFT JOIN account d ON C.idaccount = d.idaccount and a.idunit = d.idunit
                   LEFT JOIN account e ON C.idaccountpayroll = e.idaccount and a.idunit = e.idunit
                    JOIN employee f ON A.idemployee = f.idemployee";
        return $query;
    }

    function whereQuery() {
        // $bulantahunpenggajian = str_replace('T00:00:00', '', $this->input->post('bulantahunpenggajian'));
        // $arrDate1 = explode("-", $bulantahunpenggajian);
        // $date1 = $arrDate1[0].'-'.$arrDate1[1].'-01';
        // $date2 = $arrDate1[0].'-'.$arrDate1[1].'-'.cal_days_in_month(CAL_GREGORIAN, $arrDate1[1], $arrDate1[0]);
        
        // $wer = "    A.MONTH = '".$arrDate1[1]."' AND A.YEAR = ".$arrDate1[0]."";
        
        // return $wer;
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