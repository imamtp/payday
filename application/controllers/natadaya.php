<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class natadaya extends MY_Controller {

    public function index() {
        
    }

    function saveAdminSuper()
    {
    	$statusformAdminSuper = $this->input->post('statusformAdminSuper');

    	$this->db->trans_begin();

    	 if($statusformAdminSuper!='edit')
        {
        	//validasi dulu
            $q = $this->db->get_where('sys_user',array('email'=>$this->input->post('email')));
            if($q->num_rows()>0)
            {
                echo json_encode(array('success' => false, 'message' => 'Alama email sudah ada di dalam database.'));
                exit;
            }

        	$q = $this->db->get_where('company',array('companycode'=>$this->input->post('companycode')));
        	if($q->num_rows()>0)
        	{
        		echo json_encode(array('success' => false, 'message' => 'Kode perusahaan sudah ada di dalam database.'));
        		exit;
        	}

        	$q = $this->db->get_where('adminsuper',array('aggrementno'=>$this->input->post('aggrementno')));
        	if($q->num_rows()>0)
        	{
        		echo json_encode(array('success' => false, 'message' => 'No Perjanjian sudah ada di dalam database.'));
        		exit;
        	}

        	$q = $this->db->get_where('sys_user',array('usercode'=>$this->input->post('usercode')));
        	if($q->num_rows()>0)
        	{
        		echo json_encode(array('success' => false, 'message' => 'Kode user sudah ada di dalam database.'));
        		exit;
        	}
        } 

        $idcompany = $this->input->post('idcompany') == '' ? $this->m_data->getSeqVal('seq_company') : $this->input->post('idcompany');

    	$dCompany = array(
            'idcompany' => $idcompany,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'companyname' => $this->input->post('companyname'),
            'companyaddress' => $this->input->post('companyaddress'),
            'telp' => $this->input->post('telp'),
            'fax' => $this->input->post('fax'),
            'companycode' => $this->input->post('companycode')
        );

        if($statusformAdminSuper=='edit')
        {
        	$this->db->where('idcompany',$idcompany);
        	$this->db->update('company',$dCompany);
        } else {
        	$this->db->insert('company',$dCompany);
        }

        ///////////////////////////////////
       

        $user_id = $this->input->post('user_id') == '' ? $this->m_data->getSeqVal('seq_user_id') : $this->input->post('user_id');
        
        if($statusformAdminSuper=='input')
        {
             $q = $this->db->get_where('sys_user',array('user_id'=>$user_id));
            if($q->num_rows()>0)
            {
                $user_id = $this->m_data->getSeqVal('seq_user_id');
            }
        }
       

    	 $dUser = array(
            'user_id' => $user_id,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idcompany' => $idcompany,
            'username' => $this->input->post('username'),
            'password' => $this->input->post('password'),
            'email' => $this->input->post('email'),
            'group_id' => 2,
            'realname' => $this->input->post('realname'),
            'usercode' => $this->input->post('usercode'),
            'status' => $this->input->post('statusproduk'),
            'startdate' => backdate2_reverse($this->input->post('startdateakun')),
            'enddate' => backdate2_reverse($this->input->post('enddateakun'))
        );

    	if($statusformAdminSuper=='edit')
        {
        	$this->db->where('user_id',$user_id);
        	$this->db->update('sys_user',$dUser);
        } else {
        	$this->db->insert('sys_user',$dUser);
        }

        //////////////////////////////////////
        $idsuperadmin = $this->input->post('idsuperadmin') == '' ? $this->m_data->getSeqVal('seq_adminsuper') : $this->input->post('idsuperadmin');

         $dAdminsuper = array(
         	'idsuperadmin'=>$idsuperadmin,
            'idcompany' => $idcompany,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'productid' => $this->input->post('productid'),
            'aggrementno' => $this->input->post('aggrementno'),
            'user_id' => $user_id,
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'status' => $this->input->post('statusproduk')
        );

    	if($statusformAdminSuper=='edit')
        {
        	$this->db->where('idsuperadmin',$idsuperadmin);
        	$this->db->update('adminsuper',$dAdminsuper);
        } else {
        	$this->db->insert('adminsuper',$dAdminsuper);
        }

         if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            echo json_encode(array('success'=>false,'message'=>'Data gagal disimpan. Silahkan coba lagi.'));
        }
        else
        {
            $this->db->trans_commit();
            echo json_encode(array('success'=>true,'message'=>'Data berhasil disimpan.'));
        }

    }

}
?>