<?php

class m_rekapthr extends CI_Model {

    function tableName() {
        return 'thrlist';
    }

    function pkField() {
        return 'idemployee,idemployee,month,year';
    }

    function title()
    {
        return "Pembayaran THR Karyawan";
    }

    function columnLabel()
    {
        $label = array(
                'No Induk'=>'txt:code',
                'Nama Pegawai'=>'txt:lastname',
                'Unit'=>'txt:namaunit',
                'Total pendapatan'=>'num:totalpendapatan',
                'Pengali'=>'txt:pengali',
                'Jumlah THR'=>'num:jumlahthr',
                'THR tambahan'=>'num:thrtambahan',
                'Total THR'=>'num:totalthr'
            );
        return $label;
    }

    function searchField() {
        $field = "code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.pengali,a.totalpendapatan,a.jumlahthr,a.thrtambahan,a.totalthr,b.code,b.lastname,c.namaunit";
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
                    join employee b ON a.idemployee = b.idemployee
                    join unit c ON b.idunit = c.idunit";

        return $query;
    }

    function whereQuery($idunit,$startdate,$enddate) {
        $arrSd = explode("-",$startdate);
        // $arrNd = explode("-",$enddate);
// print_r($arrSd);
        // $monthSD = getNoMonth($arrSd[0]);
        // $yearSD = $arrSd[1];

        // $monthND = getNoMonth($arrNd[0]);
        // $yearND = $arrNd[1];

        return " WHERE ".fetchUnit($idunit,'b')." and (a.month='".$arrSd[1]."' and a.year=".$arrSd[0].")";
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