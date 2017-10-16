<?php

class m_pengguna extends CI_Model {

    function tableName() {
        return 'sys_user';
    }

    function pkField() {
        return 'user_id';
    }

    function searchField() {
        $field = "username,realname,companycode,usercode";
        return explode(",", $field);
    }

    function selectField() {
        return "a.user_id,a.username,a.idcompany,a.group_id,a.password,a.email,a.realname,a.usercode,a.status,a.startdate,b.group_name,a.enddate,c.companyname,c.companycode,a.userin,a.datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'usercode'=>'Kode User', 
          'username'=>'Username'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join sys_group b ON a.group_id = b.group_id
                    left join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=1)
        {
            //selain master admin
            $wer = " AND (c.idcompany=".$this->session->userdata('idcompany')." OR c.parent=".$this->session->userdata('idcompany').")";
        } else {
            $wer = null;
        }
        if($this->session->userdata('group_id')==1)
        {
            //masteradmin bisa lihat superadmin dan usernatadyaa
            $wer.=" AND (b.group_id = 2 OR b.group_id = 4)";
        }    
         return "a.display is null $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $statusformPengguna = $this->input->post('statusformPengguna');

        //cek email
        $email = $this->input->post('email');
        $usercode = $this->input->post('usercode');
        $username = $this->input->post('username');
        
       if($this->session->userdata('group_id')==1)
        {
            //mastearadmin input pengguna
            $idcompany = 1;
        } else {
            $idcompany = $this->input->post('idcompany') == '' ? null : $this->input->post('idcompany');
        }

        if($statusformPengguna=='input')
        {
            $q = $this->db->get_where('sys_user',array('usercode'=>$usercode,'display'=>null,'idcompany'=>$idcompany));
            if ($q->num_rows()>0) {
                echo json_encode(array('success' => false, 'message' => 'Kode User sudah terdaftar'));
                exit;
            }

            $q = $this->db->get_where('sys_user',array('username'=>$username,'display'=>null));
            if ($q->num_rows()>0) {
                echo json_encode(array('success' => false, 'message' => 'Username sudah terdaftar'));
                exit;
            }

            // $q = $this->db->get_where('sys_user',array('username'=>$username,'display'=>null,'idcompany'=>$this->input->post('idcompany')));
            // if ($q->num_rows()>0) {
            //     echo json_encode(array('success' => false, 'message' => 'Username sudah terdaftar'));
            //     exit;
            // }

            $q = $this->db->get_where('sys_user',array('email'=>$email,'display'=>null,'idcompany'=>$idcompany));
            if ($q->num_rows()>0) {
                echo json_encode(array('success' => false, 'message' => 'Email sudah terdaftar'));
                exit;
            }
        } else {
            $q = $this->db->query("select username from sys_user where username='$username'  and idcompany!=".$idcompany."");
            if ($q->num_rows()>0) {
                echo json_encode(array('success' => false, 'message' => 'Username sudah terdaftar'));
                exit;
            }
        }

        if($this->input->post('group_name')=='Super Admin'){
            $group_id = 2;
        } else {
            $group_id = $this->m_data->getID('sys_group', 'group_name', 'group_id', $this->input->post('group_name'),$idcompany);
        }

        $data = array(
            'user_id' => $this->input->post('user_id') == '' ? $this->m_data->getSeqVal('seq_user_id') : $this->input->post('user_id'),
            'group_id' => $group_id,
            'idcompany' => $idcompany,
            'username' => $username,
            'usercode' => $usercode,
            'password' => $this->input->post('password'),
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'email' => $email,
            'realname' => $this->input->post('realname'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>