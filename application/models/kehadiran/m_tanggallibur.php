<?php

class m_tanggallibur extends CI_Model {

    function tableName() {
        return 'tanggallibur';
    }

    function pkField() {
        return 'idtanggallibur';
    }

    function searchField() {
        $field = "namalibur";
        return explode(",", $field);
    }

    function selectField() {
        return "idtanggallibur,tanggallibur,namalibur,b.namabulan as bulanlibur,deskripsi,a.usermod,a.datemod,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'namalibur'=>'Nama Libur'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join bulan b ON a.bulanlibur = b.nobulan
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
       
         return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        //cek dulu
        if($this->input->post('statusformTanggalLibur')=='input')
        {
            $qcek = $this->db->get_where('tanggallibur',array(
                    'bulanlibur'=>$this->m_data->getID('bulan', 'namabulan', 'nobulan', $this->input->post('bulanlibur')),
                    'tanggallibur'=>$this->input->post('tanggallibur'),
                    'idcompany'=>$this->session->userdata('idcompany')
            ));
            if($qcek->num_rows()>0)
            {
                $json = array('success' => false, 'message' => 'Tanggal libur sudah ada di dalam database');
                echo json_encode($json);
                exit;
            }
        }

        $data = array(
            "idtanggallibur" => $this->input->post('idtanggallibur') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idtanggallibur'),
            "namalibur" => $this->input->post('namalibur'),
            "tanggallibur"  => $this->input->post('tanggallibur'),
            "bulanlibur"  => $this->m_data->getID('bulan', 'namabulan', 'nobulan', $this->input->post('bulanlibur')),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('startdate')),
            "deskripsi" => $this->input->post('deskripsi'),
            // "status" => $this->input->post('status'),
            // "display" int4,
            // "userin" varchar(20),
            // "usermod" varchar(20),
            // "datein" timestamp(6),
            // "datemod" timestamp(6),
            "idcompany" =>$this->session->userdata('idcompany'),
        );
        return $data;
    }

}

?>