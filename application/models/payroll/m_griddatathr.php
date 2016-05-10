<?php

class m_griddatathr extends CI_Model {

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
        return "d.idthr,d.idjournal,d.tglthr,b.idemployee,e.nametype,a.pengali,a.totalpendapatan,a.jumlahthr,a.thrtambahan,a.totalthr,b.code,b.lastname,c.namaunit";
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
                    join thr d ON a.idthr = d.idthr
                    join employee b ON a.idemployee = b.idemployee
                    join unit c ON b.idunit = c.idunit
                    join employeetype e ON b.idemployeetype = e.idemployeetype";

        return $query;
    }

    function whereQuery() {
        $date = explode(",", $this->input->post('bulantahunpenggajian'));
        $startdate =  str_replace("T00:00:00", "",$date[0]);
        $enddate =  str_replace("T00:00:00", "",$date[1]);

        // $bulantahunpenggajian = str_replace("T00:00:00", "", $this->input->post('bulantahunpenggajian'));
        // $arrSd = explode("-",$bulantahunpenggajian);
        // $arrNd = explode("-",$enddate);
// print_r($arrSd);
        // $monthSD = getNoMonth($arrSd[0]);
        // $yearSD = $arrSd[1];

        // $monthND = getNoMonth($arrNd[0]);
        // $yearND = $arrNd[1];
        return " (tglthr BETWEEN '$startdate' and '$enddate')";
        // return " (a.month='".$arrSd[1]."' and a.year=".$arrSd[0].")";
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

    function cetak($id)
    {        
        //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE d.idthr=$id";

        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            return $q->row();
        } else{
            return false;
        }

    }

}

?>