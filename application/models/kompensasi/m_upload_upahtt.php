<?php

class m_upload_upahtt extends CI_Model {

    function tableName() {
        return 'v_upahtt';
    }

    function pkField() {
        return 'upload_upahtt_id';
    }

    function searchField() {
        $field = "fungsipajak,jenisupah,namalengkap,masukpajak,companyname";
        return explode(",", $field);
    }

    function selectField() {
        return "upload_upahtt_id,idpelamar,startdate,enddate,masukpajak,nominal,fungsipajak,jenisupah,namalengkap,companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodebenefit'=>'Kode Benefit'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
        $startdate = $this->input->post('startdate')!=null ? explode('-', $this->input->post('startdate')) : null;
        $enddate = $this->input->post('enddate')!=null ? explode('-', $this->input->post('enddate')) : null;
        $jenisupah = $this->input->post('jenisupah');

        $wer = "";

        if($startdate!=null && $enddate!=null)
        {
            $wer.=" ( startdate >= '".$startdate[2].'-'.$startdate[1].'-'.$startdate[0]."' and enddate <= '".$enddate[2].'-'.$enddate[1].'-'.$enddate[0]."')";
        }
// echo $startdate.'==null && '.$enddate.'==null && '.$jenisupah;
        if($startdate==null && $enddate==null && $jenisupah!=null)
        {
            // $wer.=" jenisupah='$jenisupah'";
        } else if( $jenisupah!=null) {
            // $wer.=" and jenisupah='$jenisupah'";
        }

         return $wer.' and '.substr($this->m_data->whereCompany(), 4);
    }

    function orderBy() {
        return "upload_upahtt_id";
    }

    function updateField() { 

        return false;
    }

}

?>