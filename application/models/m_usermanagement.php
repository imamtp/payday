<?php

class m_usermanagement extends CI_Model {

    function tableName() {
       return 'sys_user';
    }

    function pkField() {
        return 'user_id';
    }

    function searchField() {
        $field = "username";

        return explode(",", $field);
    }

    function selectField() {
       return "user_id,username,clientid,password,a.email,laslogin,realname,b.group_name";
    }

    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
            'username' => 'username'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName() . " a "
                . "left join sys_group b ON a.group_id = b.group_id";

        return $query;
    }

    function whereQuery() {
        if ($this->session->userdata('group_id') != 99) {
            return " idcompany=".$this->session->userdata('idcompany');
        } else {
            return null;
        }
        
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        $user_id = $this->input->post('user_id')== '' ? $this->m_data->getSeqVal('seq_user_id') : $this->input->post('user_id');
        $namaunit = $this->input->post('namaunit');

         if ($this->input->post('user_id') != '') {
            $this->db->where('user_id', $user_id);
            $this->db->delete('userunit');

            foreach ($namaunit as $u) {
                $this->db->insert('userunit',array('user_id'=>$user_id,'idunit'=>$this->m_data->getID('unit', 'namaunit', 'idunit', $u)));
            }
        } else {
            foreach ($namaunit as $u) {
                $this->db->insert('userunit',array('user_id'=>$user_id,'idunit'=>$this->m_data->getID('unit', 'namaunit', 'idunit', $u)));
            }
        }

        $data = array(
            'user_id' => $user_id,
//            'idcustomertype' => $this->m_data->getID('customertype', 'namecustype', 'idcustomertype', $this->input->post('namecustype')),
                'username'  => $this->input->post('username'),
                'password'  => $this->input->post('password'),
                'email'  => $this->input->post('email'),
                'idcompany'  => $this->session->userdata('idcompany'),
//                'laslogin' timestamp without time zone,             
                'group_id'  => $this->m_data->getID('sys_group', 'group_name', 'group_id', $this->input->post('group_name')),
                'realname'  => $this->input->post('realname'),
                // 'idunit'  => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
//                'iduserparent'  => $this->input->post('notes'),
//            'notes' => $this->input->post('notes')
        );
        return $data;
    }

}

?>