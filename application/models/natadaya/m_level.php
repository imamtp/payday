<?php

class m_level extends CI_Model {

    function tableName() {
        return 'level';
    }

    function pkField() {
        return 'idlevel';
    }

    function searchField() {
        $field = "levelname,kodelevel";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idlevel,a.levelname,a.description,a.status,a.idcompany,kodelevel,urutan,a.userin,a.datein,c.companyname";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodelevel'=>'Kode Level'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
        $pergerakan = $this->input->post('pergerakan');
        $idlevelindividu = $this->input->post('idlevelindividu');
        $werlevel = null;

        if($idlevelindividu!=null)
        {
            if($pergerakan!=null)
            {
                $ql = $this->db->query("select urutan from level where idlevel = $idlevelindividu")->row();
            }

            if($pergerakan=='PENINGKATAN LEVEL INDIVIDU')
            {            
                $werlevel = " and a.urutan > ".$ql->urutan."";
            }

            if($pergerakan=='PENURUNAN LEVEL INDIVIDU')
            {
                $werlevel = " and a.urutan < ".$ql->urutan."";
            }

            if($pergerakan=='PROMOSI')
            {
                $werlevel = " and a.urutan > ".$ql->urutan."";
            }

            if($pergerakan=='DEMOSI')
            {
                $werlevel = " and a.urutan < ".$ql->urutan."";
            }
        }


         return "a.display is null ".$this->m_data->whereCompany()." ".$werlevel;
    }

    function orderBy() {
        return "urutan";
    }

    function updateField() { 

        $data = array(
            'idlevel' => $this->input->post('idlevel') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('idlevel'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'levelname' => $this->input->post('levelname'),
            'description' => $this->input->post('description'),
            // 'startdate' => backdate2_reverse($this->input->post('startdate')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('status'),
            'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            'kodelevel' => $this->input->post('kodelevel'),
            'urutan' => $this->input->post('urutan'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>