<?php

class m_rekaptunjangan extends CI_Model {

    function tableName() {
        return 'payrollproceed';
    }

    function pkField() {
        return 'idemployee,idemployee,month,year';
    }

    function title()
    {
        return "REKAP TUNJANGAN KARYAWAN";
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

    function columnField()
    {
        return array(
                'table'=>'tunjangantype',
                'pkfield'=>'idtunjtype',
                'field'=>'nametunj'
            );
    }

    function valueField()
    {
        return array(
                'table'=>'tunjanganhistory',
                'fkfield'=>'idtunjangan',
                'field'=>'jumlah'
            );
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

    function query($startdate,$enddate,$pkfield,$idemployee) {
        $query = "SELECT b.lastname,sum(a.jumlah) total
                            FROM tunjanganhistory a
                            join employee b ON a.idemployee = b.idemployee
                            join tunjangan c ON a.idtunjangan = c.idtunjangan
                            join tunjangantype d ON c.idtunjtype = d.idtunjtype
                            WHERE datepaid BETWEEN '$startdate' AND '$enddate' 
                            AND c.idtunjtype=$pkfield and b.idemployee=$idemployee
                            group by b.lastname";

        return $query;
    }

    function whereQuery($idunit,$startdate,$enddate) {
        return "WHERE ".fetchUnit($idunit,'a')."";
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