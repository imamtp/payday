<?php

class m_sysgroup extends CI_Model {

    function tableName() {
        return 'sys_group';
    }

    function pkField() {
        return 'group_id';
    }

    function searchField() {
        $field = "group_name";
        return explode(",", $field);
    }

    function selectField() {
        return "group_id,group_name,userin,datein,description";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'group_id'=>'group_id'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('idcompany')!=1)
        {
            //selain master admin
            $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.sistem='f')";
        } else  if($this->session->userdata('group_id')==4)
        {
            //user natadaya
            $wer = " and a.sistem='t' and a.group_id!=3 and a.group_id!=1 and a.group_id!=4";
        } else {
            $wer = " and a.sistem='t' and a.group_id!=3";
        }
        return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'group_id' => $this->input->post('group_id') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('group_id'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'group_name' => $this->input->post('group_name'),
            'description' => $this->input->post('description'),
            'idcompany' => $this->session->userdata('idcompany')
        );
        return $data;
    }

}

?>