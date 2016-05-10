<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class rekrutmen extends MY_Controller {

    public function index() {
        
    }

    function downloadcv()
    {
    	$idpelamar = $this->input->post('idpelamar');
    	if($idpelamar=='')
    	{
    		echo json_encode(array('success' => false, 'message' => 'Belum Ada CV'));
    		exit;
    	}

    	$q = $this->db->get_where('pelamar',array('idpelamar'=>$idpelamar));
    	if($q->num_rows()>0)
    	{
    		$r = $q->row();
    		if($r->cv==null || $r->cv=='')
    		{
    			echo json_encode(array('success' => false, 'message' => 'Belum Ada CV'));
    			exit;
    		} else {
    			echo json_encode(array('success' => true,'cv'=>$r->cv));
    		}
    	}
    }


    function getFotoPelamar()
    {
    	$this->db->select('foto');
        $q = $this->db->get_where('pelamar',array('idpelamar'=>$this->input->post('idpelamar')));
        if($q->num_rows()>0)
        {
            $r = $q->row();
           echo "{success:true, foto:'".$r->foto."'}";            
        } else {
            echo "{success:true, foto:'".null."'}";          
        }
    }

    function getfilecv()
    {
    	$this->load->helper('download');

    	$idpelamar = $this->input->post('idpelamar');
    	$q = $this->db->get_where('pelamar',array('idpelamar'=>$this->input->post('idpelamar')));
        if($q->num_rows()>0)
        {
            $r = $q->row();       
    //            	$data = file_get_contents('./upload/cv/'.$r->cv);
				// $name = $r->cv;

				// force_download($name, $data);
            $this->downloadFile('./uploadl/cv/',base_url().'/uploadl/cv/'.$r->cv);
        }

    }

	function downloadFile($url, $path) {
		  $newfname = $path;
		  $file = fopen ($url, "rb");
		  if ($file) {
		    $newf = fopen ($newfname, "wb");
		    if ($newf)
		    while(!feof($file)) {
		      fwrite($newf, fread($file, 1024 * 8 ), 1024 * 8 );
		    }
		  }
		  if ($file) {
		    fclose($file);
		  }
		  if ($newf) {
		    fclose($newf);
		  }
	 } 

}
?>