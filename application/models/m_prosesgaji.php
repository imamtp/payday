<?php

class m_prosesgaji extends CI_Model {

    function tableName() {
        return 'employee';
    }

    function pkField() {
        return 'idemployee';
    }

    function searchField() {
        $field = "firstname,namaunit";
        return explode(",", $field);
    }

    function query() {
        $query = "select idemployee,firstname,lastname,namaunit,a.idemployeetype
                    from employee a
                    join unit b ON a.idunit = b.idunit";
        return $query;
    }

    function whereQuery() {
        $bulantahun = str_replace("T00:00:00", "", $this->input->post('bulantahunpenggajian'));
        $bulantahun = explode("-", $bulantahun);
        $bulan = $bulantahun[1];
        $tahun = $bulantahun[0];

        return " AND idemployee not in(select idemployee 
                        from prosesgaji 
                        where bulan='" . $bulan . "' AND tahun='" . $tahun . "') AND a.display is null AND keaktifan='Aktif'";
    }

    function orderBy() {
        return "";
    }

    function updateField($table) {
        foreach ($table as $key => $row) {
            $data = array(
                'nourutsutri' => $row->nourutsutri,
                'pegawainid' => $row->pegawainid,
                'kodekelamin' => $this->m_data->getID('kelamin', 'ketkelamin', 'kodekelamin', $row->ketkelamin),
                'namasutri' => $row->namasutri,
                'tgllhrsutri' => str_replace("T00:00:00", "", $row->tgllhrsutri),
                'kodekerja' => $this->m_data->getID('tkerja', 'ketkerja', 'kodekerja', $row->ketkerja),
                'nipegplnsutri' => $row->nipegplnsutri,
                'tglstatus' => str_replace("T00:00:00", "", $row->tglstatus),
                'notunjangan' => $this->m_data->getID('tunjangan', 'kettunjangan', 'notunjangan', $row->kettunjangan),
                // 'kodestatus'=>$row->kodestatus,
                'tempatmenikah' => $row->tempatmenikah,
                'tempatlahir' => $row->tempatlahir,
                'nosertifikat' => $row->nosertifikat,
                // 'tglstatusputus'=>str_replace("T00:00:00", "", $row->tglstatusputus),
                // 'fixed' character varying(5),
                'datemod' => date('Y-m-d H:m:s'),
                'usermod' => $this->session->userdata('username'),
            );
        }
        return $data;
    }

    function getssID($d, $pegid) {
        $q = $this->db->get_where('sutri', array('namasutri' => $d, 'pegawainid' => $pegid));
        if ($q->num_rows() > 0) {
            $r = $q->row();
            return $r->nourutsutri;
        } else {
            $q = $this->db->get_where('sutri', array('pegawainid' => $pegid));
            // echo $this->db->last_query().' '.$q->num_rows();
            $r = $q->row();
            return $r->nourutsutri;
        }
    }

    // function updateField($table)
    // {
    //     $postdata = $this->input->post('postdata');
    //     $postdata = str_replace("[{", "", str_replace("}]", "", $postdata));
    //     $postdata = explode(",", $postdata);
    //     $data = array();
    //      $i=0;
    //      foreach($postdata as $key=>$row){
    //         // array_push($data[$i][$key], $row);
    //         $data[$i][$key] = str_replace("\"", "", $row);
    //         // $data=array(                
    //         //     $row=>$this-,
    //         //     $row=>$row->pegawainama
    //         // );
    //     }
    //     print_r($data);
    //       return $data;
    // }
}

?>
