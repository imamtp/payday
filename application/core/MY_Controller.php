<?php

//require_once($_SERVER['DOCUMENT_ROOT'].'/bablast/assets/libs/Smarty.class.php');
require_once(DOCUMENTROOT.'kopi/assets/libs/SmartyBC.class.php');
        
class MY_Controller extends CI_Controller{
    
    public $smarty;
    public $bahasa;
    public $logo;
            
    function __construct() {
        parent::__construct();

         ini_set('date.timezone', 'Asia/Jakarta');
        
        $this->smarty = new SmartyBC();
        //$this->load->helper('alert');
        $this->load->model(array('m_user','m_data'));  
        // $this->load->model('account/m_account');
        // $this->load->model('journal/m_journal');
        // $this->load->model('purchase/m_purchase');
        $this->load->helper('common');

        $dt = new DateTime();
        
        $this->smarty->template_dir = DOCUMENTROOT.'kopi/assets/template/templates/';
        $this->smarty->compile_dir = DOCUMENTROOT.'kopi/assets/template/templates_c/';
        $this->smarty->config_dir = DOCUMENTROOT.'kopi/assets/template/configs/';
        $this->smarty->cache_dir = DOCUMENTROOT.'kopi/assets/template/cache/';
        
        $company = new stdClass();
        if($this->session->userdata('idcompany')!=null)
        {
            $company = $this->db->query("select logo,companyname from company where idcompany=". $this->session->userdata('idcompany')."")->row();
        } else if($this->session->userdata('idcompany')=='')
            {
                $company->logo = 'NatadayaAplikasiTRANSPARANT2.png';
                $company->companyname = 'NATADAYA';
            } else {
                    $company->logo = null;
                    $company->companyname = null;
                }

        if($company->logo==null)
        { 
            $this->logo = "<font style='font-size:17px;color:#000;'>".'asdsd'."</font>";
        } else {
            $this->logo = "<img src=\"".base_url('/upload/').'/'.$company->logo."\" width=150/>";

        }

        // $this->logo = 'asdsdsadsa';
        // echo $this->session->userdata('company');
        // $this->companyname = $company->companyname;
// echo 'asdasd';
        $this->smarty->assign('assets_url',$this->assets_url());
        $this->smarty->assign('site_url',  site_url());
        $this->smarty->assign('base_url',  base_url());
        $this->smarty->assign('usergroup',  $this->session->userdata('usergroup'));
        $this->smarty->assign('group_id',  $this->session->userdata('group_id'));
        $this->smarty->assign('username',  $this->session->userdata('username'));
        $this->smarty->assign('unit',  $this->session->userdata('unit'));
        $this->smarty->assign('idunit',  $this->session->userdata('idunit'));
        $this->smarty->assign('idcompany',  $this->session->userdata('idcompany'));
        $this->smarty->assign('periode',  $this->session->userdata('periode'));
        $this->smarty->assign('logoheader',  $company->logo);
        $this->smarty->assign('companyname',  $this->session->userdata('company'));
       // $this->smarty->assign('account_type',$this->session->userdata('group_name'));
        $this->smarty->assign('appname','Natadaya HRIS');

        //deposit
        $outofbalance='false';
        $balance=0;

        if($this->session->userdata('group_id')!=1 && $this->session->userdata('group_id')!='')
        {
            //bukan master admin cek deposit by idcompany
            // $this->db->select('balance,productid,startdate,user_id,idsuperadmin');
            // $qdeposit = $this->db->get_where('adminsuper',array('idcompany'=>$this->session->userdata('idcompany'),'display'=>null));
            $qdeposit = $this->db->query("SELECT  a.balance,a.productid,a.startdate,a.user_id,idsuperadmin,b.price
                                            FROM adminsuper a
                                            join product b ON a.productid = b.productid
                                            WHERE (a.idcompany = ".$this->session->userdata('idcompany')." OR a.idcompany = ".$this->session->userdata('idcompanyparent').") AND a.display IS NULL");
     // echo $this->db->last_query();
            if($qdeposit->num_rows()>0)
            {
                $r = $qdeposit->row();

                if($r->price==0)
                {
                     $outofbalance='false';
                } else {
                      $balance = $r->balance == null ? 0 : $r->balance;

                        //cek apakah sudah waktunya didebet di bulan berikutnya (1 bulan). tgl awal diambil dari debthistory, kalo kosong ambil dari tanggal aktif
                        // $qdh = $this->db->get_where('debthistory',array('user_id'=>$r->user_id));
                        // if($qdh->num_rows()>0)
                        // {
                        //     $rqdh = $qdh->row();
                        //     $startdate = $rqdh->tanggal;
                        // } else {
                        //     //belum pernah didebet

                        //     $product = $this->db->get_where('product',array('productid'=>$r->productid))->row();
                        //     if($product->price>0)
                        //     {
                        //         $qdep = $this->db->get_where('deposit',array('idsuperadmin'=>$r->idsuperadmin));
                        //         if($qdep->num_rows<=0)
                        //         {
                        //             //belum pernah deposit
                        //             $outofbalance='true';
                        //         }
                                
                        //     }
                        //     $startdate = $r->startdate;
                        // }

                         //tgl penagihan berikutnya
                         // echo $dateDebt.'=='.gmdate('Y-m-d');
                        // // exit;

                        // if($dateDebt==$dt->format('Y-m-d') || $dateDebt<=$dt->format('Y-m-d'))
                        // {
                        //     $this->db->select('price');
                        //     $qproduk = $this->db->get_where('product',array('productid'=>$r->productid,'display'=>null))->row();

                        //     if($balance<$qproduk->price)
                        //     {
                        //         $outofbalance='true';
                        //     }
                        // }

                       //get last debit 
                        $qLstDbt = $this->db->query("SELECT tanggal
                                                FROM debthistory
                                                WHERE user_id =  ".$r->user_id."
                                                order by tanggal desc limit 1");
                        if($qLstDbt->num_rows()>0)
                        {
                            $rqLstDbt = $qLstDbt->row();

                            $dateDebt = endCycle($rqLstDbt->tanggal, 1);

                            $dateNow = new DateTime($dt->format('Y-m-d'));
                            $sd2 = new DateTime($rqLstDbt->tanggal);
                            $dateDebtObj = new DateTime($dateDebt);

                            // echo $dt->format('Y-m-d').' >= '.$rqLstDbt->tanggal.' && '.$dt->format('Y-m-d').'<='.$dateDebt;

                            if($dateNow >= $sd2 && $dateNow<$dateDebtObj)
                            {
                                //tanggal sekarang sama atau lebih dari tanggal deposit - aman
                            } else {
                                if(intval($this->session->userdata('group_id'))==2)
                                {
                                    //superadmin
                                    $q = $this->db->query("select a.price 
                                                    from product a
                                                    join adminsuper b ON a.productid = b.productid
                                                    where idcompany = ".$this->session->userdata('idcompany')."")->row();
                                        if(intval($q->price)==0)
                                        {
                                            $outofbalance='false';
                                        }
                                } else {
                                     $outofbalance='true';
                                }

                               
                            }
                        } else {
                         

                        }
                    } // end if($r->price==0)
              

               

            } else {
                if($this->session->userdata('idcompanyparent')!='')
                {
                    $q = $this->db->query("select a.price 
                                from product a
                                join adminsuper b ON a.productid = b.productid
                                where idcompany = ".$this->session->userdata('idcompanyparent')."")->row();
                    if(intval($q->price)==0)
                    {
                        $outofbalance='false';
                    }
                }
            }
        }
        $this->smarty->assign('outofbalance',  $outofbalance);
        $this->smarty->assign('balance',  $balance);
        //end deposit
        
        if($this->session->userdata('logged')==false && $this->uri->segment(1)!='login')
        {
           if($this->uri->segment(2)=='page')
           {
            echo 'Session telah berakhir, silahkan tekan F5 untuk refresh halaman.';
           } else {
            redirect('login');
           }
           
        } else {
             $this->smarty->assign('pegawainid',  $this->session->userdata('userid'));
             $this->smarty->assign('pegawainama',  $this->session->userdata('username'));
        }
//        echo  $this->session->userdata('userid');
        if($this->session->userdata('group_id')) {
          //  $this->smarty->assign('menu',$this->m_sistem->getMenu());
        }
        
                 
      
    }
    
    function tanggalWaktu()
    {
        $dt = new DateTime();
        return $dt->format('Y-m-d H:i:s');
    }


    function assets_url()
    {
        return base_url().'/assets/';
    }
    
    function alert_red($msg)
    {
        return "<div class=\"alert alert-danger\"> 
                <button type=\"button\" class=\"close\" data-dismiss=\"alert\">
                <i class=\"icon-remove\"></i>
                </button> 
                <i class=\"icon-ban-circle\"></i>
                <strong>$msg</strong></div>";
    }
}
?>
