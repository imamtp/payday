<?php

class m_rekappremiperusahaan extends CI_Model {

    function tableName() {
        return 'asuransipayhistory';
    }

    function pkField() {
        return 'idemployee,idemployee,month,year';
    }

    function title()
    {
        return "Rekap Premi Yang Ditanggung Perusahaan";
    }

    function columnLabel()
    {
        $label = array(
                'Nama Premi'=>'txt:namapremi',
                'Rate Premi(%)'=>'txt:percentc',
                'Deskripsi'=>'txt:deskripsi',
                'Jumlah Peserta'=>'txt:totalpegawai',
                'Total Premi'=>'num:total'
            );
        return $label;
    }

    function searchField() {
        $field = "a.percentc,SUM(a.amountc) as total,b.namapremi,b.deskripsi";
        return explode(",", $field);
    }

    function selectField() {
        return "a.percentc,sum(a.amountc) as total,b.namapremi,b.deskripsi,d.totalpegawai";
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
                    from " . $this->tableName()." a 
                    JOIN asuransi b ON a.idasuransi = b.idasuransi
                    JOIN employee c ON a.idemployee = c.idemployee
                    JOIN (select count(*) as totalpegawai,c.idasuransi
                            from asuransiemp a
                            join employee b ON a.idemployee = b.idemployee
                            join asuransi c ON a.idasuransi = c.idasuransi
                            group by c.idasuransi) d ON a.idasuransi = d.idasuransi";

        return $query;
    }

    function whereQuery($idunit,$startdate,$enddate) {
        $arrSd = explode("-",$startdate);
        $arrNd = explode("-",$enddate);
// print_r($arrSd);
        // $monthSD = getNoMonth($arrSd[0]);
        // $yearSD = $arrSd[1];

        // $monthND = getNoMonth($arrNd[0]);
        // $yearND = $arrNd[1];

        return " WHERE ".fetchUnit($idunit,'c')." and (a.month='".$arrSd[1]."' and a.year=".$arrSd[0].")";
    }

    function orderBy() {
        return "";
    }

    function groupBy() {
        return " GROUP BY a.percentc,b.namapremi,b.deskripsi,d.totalpegawai";
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