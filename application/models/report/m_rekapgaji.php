<?php

class m_rekapgaji extends CI_Model {

    function tableName() {
        return 'payrollproceed';
    }

    function pkField() {
        return 'idemployee,idemployee,month,year';
    }

    function title()
    {
        return "REKAP PENGGAJIAN";
    }

    function columnLabel()
    {
        $label = array(
                'No Pegawai'=>'txt:code',
                'Nama Lengkap'=>'txt:lastname',
                'Jenis'=>'txt:nametype',
                'Tipe Pembayaran'=>'txt:payname',
                'Jumlah Jam'=>'txt:jumlahjam',
                'Jumlah Kehadiran'=>'txt:jumlahkehadiran',
                'Total Gaji'=>'num:totalgaji',
                'Penambahan Gaji'=>'num:penambahangaji',
                'Total Tunjangan'=>'num:totaltunjangan',
                'Total Potongan'=>'num:totalpotongan',
                'Total Pembayaran'=>'num:totalpembayaran'
            );
        return $label;
    }

    function searchField() {
        $field = "a.idemployee,a.firstname,a.lastname,a.nametype,a.jumlahjam,a.jumlahkehadiran,a.totalgaji,a.totaltunjangan,a.pph21,
        a.totalpotongan,a.totalpembayaran,a.payname,a.userin,a.code,a.penambahangaji,a.month,a.year";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idemployee,a.firstname,a.lastname,a.nametype,a.jumlahjam,a.jumlahkehadiran,a.totalgaji,a.totaltunjangan,a.pph21,a.totalpotongan,a.totalpembayaran,a.payname,a.userin,a.code,a.penambahangaji,a.month,a.year";
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
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery($idunit,$startdate,$enddate) {
        return "WHERE ".fetchUnit($idunit,'a')." AND a.tglpenggajian BETWEEN '$startdate' AND '$enddate'";
    }

    function orderBy() {
        return "";
    }

    function groupBy() {
        return null;
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