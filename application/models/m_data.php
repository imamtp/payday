<?php

class m_data extends CI_Model {

    function getID($table, $kolom, $vkolom, $id,$company=false) {
        if ($id == '0') {
            return null;
        } else {
            if($company)
            {
                $this->db->where('idcompany',$this->session->userdata('idcompany'));
            }
            $q = $this->db->get_where($table, array($kolom => $id));
            // echo $this->db->last_query();
            if ($q->num_rows() > 0) {
                $r = $q->row();
                return $r->$vkolom;
            } else {
                //cek lagi siapa tau punya parent
                if($company)
                {
                    $this->db->where('idcompany',$this->session->userdata('idcompanyparent'));
                    $q = $this->db->get_where($table, array($kolom => $id));
                    if ($q->num_rows() > 0) {
                        $r = $q->row();
                        return $r->$vkolom;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }                
            }
        }
        echo $this->db->last_query();
        $q->free_result();
    }
	
	function getIDbyCompany($table, $kolom, $vkolom, $id,$idcompany) {
        $this->db->where('idcompany',$idcompany);
		$q = $this->db->get_where($table, array($kolom => $id));
		if ($q->num_rows() > 0) {
			$r = $q->row();
			return $r->$vkolom;
		} else {
			return null;
		}
        $q->free_result();
    }

    function querySeq($nameSeq)
    {
        $q = $this->db->query("select nextval('".$nameSeq."') as id")->row();
        return $q->id;
    }
    
    function getSeqVal($nameSeq,$table=null,$pk=null)
    {
        if($table!=null)
        {
            
            $qmax = $this->db->query("select max($pk) as idmax from $table")->row();
            // if($id<=$qmax->id)
            // {
                $id = $this->querySeq($nameSeq);
                //echo $id;
                $max=$qmax->idmax+1;
                while($id<=$max)
                {
                     $id = $this->querySeq($nameSeq);
                }
            // }
        } else {
            $id = $this->querySeq($nameSeq);
        }
       // $q = $this->db->query("select nextval('".$nameSeq."') as id")->row();
        return $id;
        // $q->free_result();
    }
    
    function getIdAccount($idlinked,$idunit)
    {
        
        //ambil idaccount dari tabel linkedaccunit
        $q = $this->db->get_where('linkedaccunit',array('idlinked'=>$idlinked,'idunit'=>$idunit));
       // echo $this->db->last_query();
        $qacc = $this->db->get_where('linkedacc',array('idlinked'=>$idlinked));
        $racc = $qacc->row(0);

        if($q->num_rows()>0)
        {
            $r = $q->row();
           if($r->idaccount==null)
           {
               echo json_encode(array('success'=>false,'message'=>"Link akun <b>$racc->namelinked</b> belum ditentukan<br><br> Menu pengaturan link akun:<br> Pengaturan > Link Akun"));
               $q->free_result();
               exit;
           } else {
                return $r->idaccount;
           }
        } else {
             
             echo json_encode(array('success'=>false,'message'=>"Link akun <b>$racc->namelinked</b> belum ditentukan<br><br> Menu pengaturan link akun:<br> Pengaturan > Link Akun"));
             $q->free_result();
             exit;
        }
    }
    
    function getCurrBalance($idaccount)
    {
        $q = $this->db->get_where('account',array('idaccount'=>$idaccount));
        if($q->num_rows()>0)
        {
            $r = $r->row();
            return $r->balance;
        } else {
            return false;
        }
        $q->free_result();
    }

     function insertTaxHistory($idtax,$taxval,$rate,$datein,$idjournal,$type)
    {
        $d = array(
                "idtax" =>$idtax,
                "taxval" =>$taxval,
                "rate" =>$rate,
                "datein" =>$datein,
                "idjournal" =>$idjournal,
                "type"=>$type
            );
        $this->db->insert('taxhistory',$d);
    }

    function totalkaryawan($idcompany=null)
    {
        if($idcompany==null)
        {
            $wercmp = $this->whereCompany();
        } else {
            $qc = $this->db->query("select idcompany from company where parent=".$idcompany."");
            $jum = $qc->num_rows();
            $wercompany = null;
            if($jum>=1)
            {
                $wercompany .= ' OR ';
            }

            $i=1;
            
            foreach ($qc->result() as $r) {
                $wercompany .= " a.idcompany=".$r->idcompany;
                if($i!=$jum)
                {
                     $wercompany .= " OR ";
                }
                $i++;
            }
            $wercmp = " AND (a.idcompany=".$idcompany.$wercompany.")";
            // $wercmp = "AND a.idcompany=$idcompany";
        }

        $qtot = $this->db->query("select count(*) total from pelamar a where display is null ".$wercmp."")->row();
        return $qtot->total;
    }

    function whereReportCompany($prefix='a',$masterdata=true)
    {
        if($this->session->userdata('group_id')==1)
        {
            //master
            $wer = null;
        } else  if($this->session->userdata('group_id')==2)
            {
                //super admin gak punya parent
                    $qc = $this->db->query("select idcompany from company where parent=".$this->session->userdata('idcompany')."");
                   // echo $this->db->last_query();
                    $jum = $qc->num_rows();
                    $wercompany = null;
                    if($jum>=1)
                    {
                        $wercompany .= ' OR ';
                    }

                    $i=1;
                    
                    foreach ($qc->result() as $r) {
                        $wercompany .= " $prefix.idcompany=".$r->idcompany;
                        if($i!=$jum)
                        {
                             $wercompany .= " OR ";
                        }
                        $i++;
                    }
                    $wer = " AND ($prefix.idcompany=".$this->session->userdata('idcompany').$wercompany.")";

            } else  if($this->session->userdata('group_id')>2) 
                {
                    $wer = " AND ($prefix.idcompany=".$this->session->userdata('idcompany').")";
                } else {
                    $wer = null;
                }

        return $wer;
    }

    function whereCompany($prefix='a',$masterdata=true)
    {
        if($this->session->userdata('group_id')==1)
        {
            //master
            $wer = null;
        } else  if($this->session->userdata('group_id')==2)
            {
                //super admin gak punya parent
                    $qc = $this->db->query("select idcompany from company where parent=".$this->session->userdata('idcompany')."");
                   // echo $this->db->last_query();
                    $jum = $qc->num_rows();
                    $wercompany = null;
                    if($jum>=1)
                    {
                        $wercompany .= ' OR ';
                    }

                    $i=1;
                    
                    foreach ($qc->result() as $r) {
                        $wercompany .= " $prefix.idcompany=".$r->idcompany;
                        if($i!=$jum)
                        {
                             $wercompany .= " OR ";
                        }
                        $i++;
                    }
                    $wer = " AND ($prefix.idcompany=".$this->session->userdata('idcompany').$wercompany.")";

            } else  if($this->session->userdata('group_id')>2) 
                {
                    if($masterdata)
                    {
                        $wer = " AND ($prefix.idcompany=".$this->session->userdata('idcompany')." OR $prefix.idcompany=".$this->session->userdata('idcompanyparent').")";
                    } else {
                        $wer = " AND ($prefix.idcompany=".$this->session->userdata('idcompany').")";
                    }
                } else {
                    $wer = null;
                }

        return $wer;
    }

    function whereCompany2($prefix='a')
    {
        if($this->session->userdata('group_id')==1)
        {
            //master
            $wer = null;
            // $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";

            // $qc = $this->db->query("select idcompany from company where parent=".$this->session->userdata('idcompany')."");
            //     $jum = $qc->num_rows();
            //     $wercompany = null;
            //     if($jum>=1)
            //     {
            //         $wercompany .= ' OR ';
            //     }

            //     $i=1;
                
            //     foreach ($qc->result() as $r) {
            //         $wercompany .= " a.idcompany=".$r->idcompany;
            //         if($i!=$jum)
            //         {
            //              $wercompany .= " OR ";
            //         }
            //         $i++;
            //     }
            //     $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').$wercompany.")";
        } else  if($this->session->userdata('group_id')==2)
            {
                //super admin gak punya parent

                // if($this->session->userdata('idcompanyparent')==null)
                // {
                    $qc = $this->db->query("select idcompany from company where parent=".$this->session->userdata('idcompany')."");
                    $jum = $qc->num_rows();
                    $wercompany = null;
                    if($jum>=1)
                    {
                        $wercompany .= ' OR ';
                    }

                    $i=1;
                    
                    foreach ($qc->result() as $r) {
                        $wercompany .= " $prefix.idcompany=".$r->idcompany;
                        if($i!=$jum)
                        {
                             $wercompany .= " OR ";
                        }
                        $i++;
                    }
                    $wer = " $prefix.idcompany=".$this->session->userdata('idcompany').$wercompany."";
                // } else {
                //     //super admin ada parent
                //      $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
                // }

            } else  if($this->session->userdata('group_id')>2) 
                {
                    $wer = " ($prefix.idcompany=".$this->session->userdata('idcompany')." OR $prefix.idcompany=".$this->session->userdata('idcompanyparent').")";
                } else {
                    $wer = null;
                }
        return $wer;
    }

    function extValidation($val)
    {
        //  $validation = array(
        //     'tableName'=>$this->tableName(),
        //     'pkField'=>$this->pkField(),
        //     'valPkField'=>$idlokasiorg,
        //     'keyField'=>'kodebudgelokasi',
        //     'valKeyField'=>$kodebudgelokasi,
        //     'label'=>'Kode Lokasi'
        // );

        if($this->input->post($val['pkField']) == '')
        {
            //input
            $q = $this->db->query("select ".$val['keyField']." from ".$val['tableName']." a where display is null AND ".$val['keyField']."='".$val['valKeyField']."' ".$this->whereCompany()."");
            if($q->num_rows()>0)
            {
               echo json_encode(array("success" => false, "message" => "".$val['label']." sudah terdaftar"));
               exit();
            }
        } else {    
            $q = $this->db->query("select ".$val['keyField']." from ".$val['tableName']." where display is null AND ".$val['pkField']."=".$val['valPkField']."");
            if($q->num_rows()>0)
            {
                $r = $q->row();
                if($r->$val['keyField']!=$val['valKeyField'])
                {
                    //update kode
                    $q2 = $this->db->query("select ".$val['keyField']." from ".$val['tableName']." a where display is null AND ".$val['keyField']."='".$val['valKeyField']."' ".$this->whereCompany()."");
                    if($q2->num_rows()>0)
                    {
                       echo json_encode(array("success" => false, "message" => "".$val['label']." sudah terdaftar"));
                       exit();
                    }
                }
            }
        }
    }
    
   

}

?>