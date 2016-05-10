<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class deposit extends MY_Controller {

    public function index() {
        
    }

    function getSummaryDeposit()
    {
    	$aggrementno = $this->input->get('aggrementno');

    	$qlastdeposit = $this->db->query("select depositdate,amount from deposit where aggrementno = '$aggrementno' and status='Receive' and display is null order by depositdate desc limit 1");
    	if($qlastdeposit->num_rows()>0)
    	{
    		$r = $qlastdeposit->row();
    		$lastdeposit = $r->amount;
    		$depositdate = backdate2($r->depositdate);
    	} else {
    		$lastdeposit = 0;
    		$depositdate = '';
    	}

    	$qbalance = $this->db->query("select a.balance,b.productname,b.productcode,a.startdate
			from adminsuper a 
			left join product b on a.productid = b.productid 
			left join sys_user c ON a.user_id = c.user_id 
			left join company d ON a.idcompany = d.idcompany 
			WHERE TRUE AND a.aggrementno='$aggrementno' and a.display is null");
    	if($qbalance->num_rows()>0)
    	{
    		$r = $qbalance->row();
    		$balance = $r->balance == null ? 0 : $r->balance;
    		$productcode = $r->productcode;
    		$productname = $r->productname;
    		$startdate = $r->startdate;
    	} else {
    		$balance = 0;
    		$productcode = '';
    		$productname = '';
    		$startdate = '';
    	}

    	$json = array('success' => true, 'lastdeposit' => number_format($lastdeposit),'depositdate'=>$depositdate,'balance'=>number_format($balance),'productname'=>$productname,'productcode'=>$productcode,'startdate'=>backdate2($startdate));
        echo json_encode($json);
    }

    function tesdate()
    {
        // ini_set('date.timezone', 'America/Los_Angeles');
        ini_set('date.timezone', 'Asia/Jakarta');
        // echo date('Y-m-d H:m:s');
        $dt = new DateTime();
        echo $dt->format('Y-m-d H:i:s');
        //echo print_r(getdate());
    }

}
?>