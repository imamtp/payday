<?php

class m_rekappph21 extends CI_Model {

    function tableName() {
        return 'payrollproceed';
    }

    function pkField() {
        return 'idemployee,idemployee,month,year';
    }

    function title()
    {
        return "Rekap PPH21 Karyawan";
    }

    function columnLabel()
    {
        $label = array(
                'No Induk'=>'txt:code',
                'Nama Pegawai'=>'txt:lastname',
                'Deskripsi'=>'txt:namaunit',
                'Jenis Pegawai'=>'txt:nametype',
                'PTKP'=>'num:ptkp',
                'Wajib Pajak'=>'num:wajibpajak',
                'Jenis PPH21'=>'txt:jenispph21',
                // 'Jumlah Tanggungan'=>'num:numtanggungan',
                'Tarif Pajak(%)'=>'num:tarifpajak',
                'PPH21 Dibayar'=>'num:pph21'
            );
        return $label;
    }

    function searchField() {
        $field = "code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.code,a.lastname,a.namaunit,a.nametype,a.pph21,a.ptkp,a.wajibpajak,a.jenispph21,a.tarifpajak,a.numtanggungan";
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
        $arrSd = explode("-",$startdate);
        // $arrNd = explode("-",$enddate);
// print_r($arrSd);
        // $monthSD = getNoMonth($arrSd[0]);
        // $yearSD = $arrSd[1];

        // $monthND = getNoMonth($arrNd[0]);
        // $yearND = $arrNd[1];

        return " WHERE ".fetchUnit($idunit,'a')." and (a.month='".$arrSd[1]."' and a.year=".$arrSd[0].")";
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