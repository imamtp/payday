<?php

class m_jadwalkerja extends CI_Model {

    function tableName() {
        return 'jadwalkerja';
    }

    function pkField() {
        return 'idjadwalkerja';
    }

    function searchField() {
        $field = "kodejadwalkerja,namajadwalkerja";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idjadwalkerja,a.status,a.idpolakerja,a.kodejadwalkerja,a.namajadwalkerja,a.idjamkerjaharian_1,a.idjamkerjaharian_2,a.idjamkerjaharian_3,a.idjamkerjaharian_4,a.idjamkerjaharian_5,a.idjamkerjaharian_6,a.idjamkerjaharian_7,b.namajamkerja as namajamkerja1,c.namajamkerja as namajamkerja2,d.namajamkerja as namajamkerja3,e.namajamkerja as namajamkerja4,f.namajamkerja as namajamkerja5,g.namajamkerja as namajamkerja6,h.namajamkerja as namajamkerja7,i.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodejamkerja'=>'kode jam kerja'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join jamkerjaharian b ON a.idjamkerjaharian_1 = b.idjamkerjaharian
                    left join jamkerjaharian c ON a.idjamkerjaharian_2 = c.idjamkerjaharian
                    left join jamkerjaharian d ON a.idjamkerjaharian_3 = d.idjamkerjaharian
                    left join jamkerjaharian e ON a.idjamkerjaharian_4 = e.idjamkerjaharian
                    left join jamkerjaharian f ON a.idjamkerjaharian_5 = f.idjamkerjaharian
                    left join jamkerjaharian g ON a.idjamkerjaharian_6 = g.idjamkerjaharian
                    left join jamkerjaharian h ON a.idjamkerjaharian_7 = h.idjamkerjaharian
                    join company i ON a.idcompany = i.idcompany";

        return $query;
    }

    function whereQuery() {
         if($this->session->userdata('idcompany')==1)
        {
            //master
            // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        } else  if($this->session->userdata('idcompany')!=1)
            {
                //selain master admin
                // if($this->session->userdata('group_id')==2)
                // {
                //     $idcompany = $this->session->userdata('idcompany');
                // } else {
                //     $idcompany = $this->session->userdata('idcompanyparent');
                // }
                $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.idcompany=".$this->session->userdata('idcompanyparent').")";
            } else {
                $wer = null;
            }
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            "idjadwalkerja" => $this->input->post('idjadwalkerja') == '' ? $this->m_data->getSeqVal('seq_kehadiranconfig') : $this->input->post('idjadwalkerja'),
            // "idjamkerjaharian" int4 NOT NULL,
            "idjamkerjaharian_1" =>$this->input->post('idjamkerjaharian_1') != '' ? $this->input->post('idjamkerjaharian_1') : null,
            "idjamkerjaharian_2" =>$this->input->post('idjamkerjaharian_2') != '' ? $this->input->post('idjamkerjaharian_2') : null,
            "idjamkerjaharian_3" =>$this->input->post('idjamkerjaharian_3') != '' ? $this->input->post('idjamkerjaharian_3') : null,
            "idjamkerjaharian_4" =>$this->input->post('idjamkerjaharian_4') != '' ? $this->input->post('idjamkerjaharian_4') : null,
            "idjamkerjaharian_5" =>$this->input->post('idjamkerjaharian_5') != '' ? $this->input->post('idjamkerjaharian_5') : null,
            "idjamkerjaharian_6" =>$this->input->post('idjamkerjaharian_6') != '' ? $this->input->post('idjamkerjaharian_6') : null,
            "idjamkerjaharian_7" =>$this->input->post('idjamkerjaharian_7') != '' ? $this->input->post('idjamkerjaharian_7') : null,
            "kodejadwalkerja"=>$this->input->post('kodejadwalkerja'),
            "namajadwalkerja"=>$this->input->post('namajadwalkerja'),
            "status" => $this->input->post('status'),
            "idcompany" =>$this->session->userdata('idcompany')
        );
        return $data;
    }

}

?>