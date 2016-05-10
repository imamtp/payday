<?php

class m_komponenupah extends CI_Model {
//upah tetap
    function tableName() {
        return 'komponenupah';
    }

    function pkField() {
        return 'idkomponenupah';
    }

    function searchField() {
        $field = "kodekomponen,namakomponen";
        return explode(",", $field);
    }

    function selectField() {
        return "idkomponenupah,a.idcompany,b.companyname,kodekomponen,kenapajak,namakomponen,fungsipajak,hitungpajak,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod,jangkawaktu";
    }

    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekomponen'=>'Kode Upah'
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
        return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() {

        $data = array(
            "idkomponenupah" => $this->input->post('idkomponenupah') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idkomponenupah'),
            "idcompany"  => $this->input->post('idcompany'),
            "kodekomponen"  => $this->input->post('kodekomponen'),
            "namakomponen"  => $this->input->post('namakomponen'),
            "kenapajak"  => $this->input->post('kenapajak'),
            "fungsipajak"  => $this->input->post('fungsipajak'),
            "hitungpajak"  => $this->input->post('hitungpajak'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate')),
            "jeniskomponen"=>'Upah Tetap'
        );
        return $data;
    }

    function getFirstPayroll($idpelamar,$startdate)
    {
        $qfpayroll = $this->db->query("select tglgaji from payrolldata where idpelamar=".$idpelamar." ORDER BY tglgaji DESC limit 1");
        if($qfpayroll->num_rows()>0)
        {
            $rqfpayroll = $qfpayroll->row();
            $tglgajipertamaArr = explode('-', $rqfpayroll->tglgaji);
            return $tglgajipertamaArr[0].'-'.$tglgajipertamaArr[1].'-01';
        } else {
            return $startdate;
        }
    }

    function getMasaKerja($idpelamar,$startdate)
    {
        $sqlpeg = "select a.idpelamar,idptkp,namalengkap,idptkp,tglmasuk,tglberakhir,punyanpwp,biayajabatan,jenispotonganpph
                    from pelamar a
                    JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    where a.idpelamar=$idpelamar";
        $qpeg = $this->db->query($sqlpeg);
        if($qpeg->num_rows()>0)
        {
            $rpeg = $qpeg->row();
            return diffInMonths($rpeg->tglmasuk,$startdate);
        } else {
            return 0;
        }
    }

    function getMasaPajakSetahun($startdate,$tglgajipertama)
    {
        // $startdate = backdate2_reverse($startdate);
        $startdateArr = explode('-', $startdate);
        $akhirtahun = $startdateArr[0].'-12-'.cal_days_in_month(CAL_GREGORIAN, 12, $startdateArr[0]);
        return diffInMonths($tglgajipertama,$akhirtahun) > 12 ? 12 : diffInMonths($tglgajipertama,$akhirtahun);
    }

}

?>
