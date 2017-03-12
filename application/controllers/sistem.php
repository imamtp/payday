<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class sistem extends MY_Controller {

    public function index() {
        echo 'asdad';
    }
    
    function sysmenudata($parent, $active = null)
    {
         $json = "{
                    \"text\": \".\",
                    \"children\": [
                        " . $this->createMenu($parent, $active) . "
                    ]
                }";
        echo $json;
    }
    
    function createMenu($PARENT, $active) {
        $group_id = $this->session->userdata('group_id');

        if($group_id==2)
        {
            //superadmin
             $sql = "SELECT a.sys_menu_id,a.menu_name,a.menu_link,a.parent,a.sort,a.icon,a.description,b.menu_name as menuinduk,b.sys_menu_id as sys_menu_id_induk,CASE WHEN a.display is null THEN 'Aktif' ELSE 'Non Aktif' END as status
                from sys_menu a
                left join sys_menu b ON a.parent = b.sys_menu_id
                join sys_group_menu c ON a.sys_menu_id = c.sys_menu_id and c.group_id = $group_id
                where a.parent=$PARENT and a.sys_menu_id!=133 and a.sys_menu_id!=163 and a.display is null";
        } else {
             $sql = "SELECT a.sys_menu_id,a.menu_name,a.menu_link,a.parent,a.sort,a.icon,a.description,b.menu_name as menuinduk,b.sys_menu_id as sys_menu_id_induk,CASE WHEN a.display is null THEN 'Aktif' ELSE 'Non Aktif' END as status
                from sys_menu a
                left join sys_menu b ON a.parent = b.sys_menu_id
                where a.parent=$PARENT";
        }
       

        if($this->session->userdata('group_id')!=1)
        {
            //bukan master admin
            $sql.=" and a.sys_menu_id!=125";
        }

        $sql.=" ORDER BY a.sort asc";
        // echo $sql;
        $query = $this->db->query($sql);


        $menu = "";
        foreach ($query->result() as $r) {
            $leaf = $this->cekChildMenu($r->sys_menu_id);
            $icon = $r->icon==null ? 'open-folder' : $r->icon;
            $menu .= "{";
            $menu .= "\"id\": \"$r->sys_menu_id\",
                    \"text\": \"$r->menu_name\",
                    \"menu_link\": \"$r->menu_link\",
                    \"sys_menu_id\": \"$r->sys_menu_id\",
                    \"menuinduk\": \"$r->menuinduk\",
                    \"sys_menu_id_induk\": \"$r->sys_menu_id_induk\",
                    \"parent\": \"$r->parent\",
                    \"sort\": \"$r->sort\",
                    \"iconCls\": \"$icon\",
                    \"icon\": \"$r->icon\",
                    \"description\": \"$r->description\",
                    \"status\": \"$r->status\",
                    \"leaf\": $leaf";
//            echo $leaf;
            if ($leaf == 'false') {
                $menu .=",\"children\": [" . $this->makeSubMenu($r->sys_menu_id, $active) . "]";
            }

            $menu .="},";
        }
        return $menu;
    }
    
    function cekChildMenu($id) {
        $q = $this->db->get_where('sys_menu', array('parent' => $id));

        if ($q->num_rows() > 0) {
            return 'false';
        } else {
            return 'true';
        }
    }
    
    function makeSubMenu($parent, $active) {
        return $this->createMenu($parent, $active);
    }
    
    function getaksesmenuunit()
    {
        $idmenu = $this->input->post('idmenu');
        $qunit = $this->db->get_where('unit',array('display'=>null));
       return $this->fetchJsonAksesMenu($qunit,array('idunit','namaunit','checked'),$idmenu);
    }
    
    function getaksesmenu()
    {
        $id = $this->input->post('id');
        $this->db->join('sys_group','sys_group.group_id = sys_group_menu.group_id');
        $q  = $this->db->get_where('sys_group_menu',array('sys_menu_id'=>$id));
        $v = null;
        foreach($q->result() as $r)
        {
            $v.=$r->group_name.',';
        }
        $v = substr($v, 0, -1);;
        echo $v;
    }
    
    function fetchJsonAksesMenu($q, $field,$idmenu) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
					if($field[$if]=='checked')
					{
                        $qcek = $this->db->get_where('sys_menu_unit',array('idunit'=>$r['idunit'],'sys_menu_id'=>$idmenu));
                        if($qcek->num_rows()>0)
                        {
                            $rcek = $qcek->row();
                            if($rcek->sys_menu_id==null)
                            {
                                $d[$i][$field[$if]] = false;  
                            } else {
                                $d[$i][$field[$if]] = true;  
                            }
                        } else {
                            $d[$i][$field[$if]] = false;    
                        }
						
					} else {
						$d[$i][$field[$if]] = $r[$field[$if]];	
					}
                    
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
        $json = "{
                \"success\": $success,
                \"data\": [";
//           $json = "[";
        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
//                echo $d[$i][$field[$if]].' ';
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

//        $json .="]";
        $json .="]}";
//         $json = str_replace(" ", "", $json);
        echo $json;
    }
    
    function getUnit()
    {
        // $q = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        $sql = "select idunit,namaunit 
                from unit
                where display is null";
        $q = $this->db->query($sql);
        $d = array();
        $num = $q->num_rows();
        $i=1;
        $str = null;
        foreach ($q->result() as $r) {
//            $str.=$r->namaunit;
            if($i!=$num)
            {
                $str.="[$r->idunit,$r->namaunit],";
            }
            $i++;
            // $d[] = $r->namaunit;
        }
        // echo json_encode($d);
        echo $str;
    }
	
    function hapusmenu()
    {
//        $records = json_decode($this->input->post('postdata'));
//        foreach ($records as $id) {
//        }
        $this->db->trans_begin();
        
        $id = $this->input->post('id');
        $q = $this->db->get_where('sys_menu',array('parent'=>$id));
        foreach($q->result() as $r)
        {
            $this->hapussubmenu($r->sys_menu_id);
        }        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_group_menu');
        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_menu');
        
        
        
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Hapus menu gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Hapus menu berhasil');
        }

        echo json_encode($json);
    }
    
    function hapussubmenu($id)
    {
        $q = $this->db->get_where('sys_menu',array('parent'=>$id));
        foreach($q->result() as $r)
        {
            $this->recHapusMenu($r->sys_menu_id);
            $this->db->where('sys_menu_id',$r->sys_menu_id);
            $this->db->delete('sys_group_menu');

            $this->db->where('sys_menu_id',$r->sys_menu_id);
            $this->db->delete('sys_menu');
        } 
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_group_menu');
              
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_menu');
    }
    
    function recHapusMenu($id)
    {
        $this->hapussubmenu($id);
    }
    
    function cekAksesold()
    {
        $rule_id = $this->input->post('rule_id');
        $group_id = $this->session->userdata('group_id');
        
        $q = $this->db->get_where('sys_group_rules',array('group_id'=>$group_id,'rule_id'=>$rule_id));
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->grantaccess==null || $r->grantaccess=='TIDAK') 
            {
                echo 'TIDAK';
            } else {
                echo 'YA';
            }
        } else {
            echo 'TIDAK';
        }
    }
    
    function saveRuleChange()
    {
        $this->db->trans_begin();
        
        $group_id = $this->input->post('group_id');
        $rule_id = $this->input->post('rule_id');
        $grantaccess = $this->input->post('grantaccess');
        $this->db->where(array('group_id'=>$group_id,'rule_id'=>$rule_id));
        $this->db->update('sys_group_rules',array('grantaccess'=>$grantaccess));
        
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

        echo json_encode($json);
    }

    function nextseq()
    {
        $sql = "SELECT c.relname FROM pg_class c WHERE c.relkind = 'S'";
        $q = $this->db->query($sql);
        foreach ($q->result() as $r) {
            $this->db->query("select nextval('".$r->relname."')");
        }
    }

    function resetdata($idcompany=null)
    {
        $this->db->trans_begin();

        $qc = $this->db->get('company');
        foreach ($qc->result() as $rc) {

            $this->db->where('idcompany',$rc->idcompany);
            $this->db->delete('perencanaantk');

            $this->db->where('idcompany',$rc->idcompany);
            $this->db->delete('permintaantk');

            echo $rc->idcompany.'<br>';
            $qpelamar = $this->db->query("select idpelamar from pelamar where idcompany=$rc->idcompany");
            if($qpelamar->num_rows()>0)
            {
                $r = $qpelamar->row();
                $idpelamar = $r->idpelamar;

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('benefit');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('identitas');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('kehadiran');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('keluarga');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('lembur');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pekerjaan');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pelatihan');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pendidikan');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pengajuancuti');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pengajuanizin');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pengalamankerja');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pergerakanpersonil');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pergerakanpersonilbawahan');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('upahkaryawan');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('calonpelamar');

                $this->db->where('idpelamar',$idpelamar);
                $this->db->delete('pelamar');
                echo $this->db->last_query().'<br>';
            }
        }

        

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Hapus gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Hapus berhasil');
        }

        echo json_encode($json);
        
    }


    function cekakses()
    {
        $group_id = $this->session->userdata('group_id');
        $roleid = $this->input->post('roleid');

        $q = $this->db->query("select a.rolename,b.status
                                from roles a
                                left join role_menu b ON a.roleid = b.roleid and b.group_id=$group_id
                                where a.roleid=$roleid");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->status=='YA' || $r->status==null)
            {
                $json = array('success' => true, 'message' => '');
            } else {
                $json = array('success' => false, 'message' => 'Maaf, anda tidak berhak untuk melakukan '.$r->rolename);
            }
        } else {
            $json = array('success' => false, 'message' => 'Insufficient Rights!');
        }
       // echol $this->db->last_query();
        echo json_encode($json);
    }

    function cek_kuota()
    {
        $sql = "select count(*) as total from pelamar a
                where true ". $this->m_data->whereCompany('a',false);
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();

            if(intval($this->session->userdata('group_id'))==2)
            {
                $idcompanyparent = $this->session->userdata('idcompany');
            } else {
                $idcompanyparent = $this->session->userdata('idcompanyparent');
            }
            
            $this->db->select('productid');
            $qprod = $this->db->get_where('adminsuper',array('idcompany'=>$idcompanyparent,'display'=>null))->row();

            $this->db->select('maxemployee');
            $qquota = $this->db->get_where('product',array('productid'=>$qprod->productid,'display'=>null))->row();

            if($qquota->maxemployee==0)
            {
                //unlimited
                $json = array('success' => true, 'message' => 'oke');
            } else if($r->total<=$qquota->maxemployee)
            {
                $json = array('success' => true, 'message' => 'oke');
            } else if($r->total>$qquota->maxemployee){
                $json = array('success' => false, 'message' => 'Tidak bisa menambah data karena sudah melebihi kuota maksimal sebesar '.$qquota->maxemployee.' data karyawan');
            }
        } else {
            $json = array('success' => false, 'message' => 'Insufficient Rights!');
        }
        // echo $this->db->last_query();
        echo json_encode($json);
    }

    function saveRoleMenu()
    {
        $dataGrid = json_decode($this->input->post('dataGrid'));
        $group_id = $this->input->post('group_id');
        foreach ($dataGrid as $key => $value) {
            $q = $this->db->get_where('role_menu',array('group_id'=>$group_id,'roleid'=>$value->roleid));
            if($q->num_rows()>0)
            {
                $this->db->where('roleid',$value->roleid);
                $this->db->where('group_id',$group_id);
                $this->db->update('role_menu',array('status'=>$value->status));
            } else {
                $this->db->insert('role_menu',array(
                        'status'=>$value->status,
                        'group_id'=>$group_id,
                        'roleid'=>$value->roleid
                    ));
            }
            // echo $this->db->last_query().'<br>';
        }

    }

    function savevisible()
    {
        $data = array(
                'group_id'=>$this->input->post('sys_group_role'),
                'sys_menu_id'=>$this->input->post('sys_menu_id')
            );
        $qcek = $this->db->get_where('sys_group_menu',$data);
        if($qcek->num_rows()>0)
        {
            $this->db->where($data);
            $this->db->update('sys_group_menu',$data);
        } else {
            $this->db->insert('sys_group_menu',$data);
        }
    }
	
    function deletevisible()
    {
        $data = array(
                'group_id'=>$this->input->post('sys_group_role'),
                'sys_menu_id'=>$this->input->post('sys_menu_id')
            );
       $this->db->where($data);
       $this->db->delete('sys_group_menu');
    }

    function getvisible()
    {
        $data = array(
                'group_id'=>$this->input->post('sys_group_role'),
                'sys_menu_id'=>$this->input->post('sys_menu_id')
            );
        $qcek = $this->db->get_where('sys_group_menu',$data);
        if($qcek->num_rows()>0)
        {
            $json = array('success' => true, 'value' => true);
        } else {
            $json = array('success' => true, 'value' => false);
        }
        echo json_encode($json);
    }
}
?>
