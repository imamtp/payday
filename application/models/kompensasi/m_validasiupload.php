<?php

class m_validasiupload extends CI_Model {

	function validasitgl($no,$jenis,$date)
    {
        $tgl = explode(".", $date);

        // $bulan = intval($tgl[1]);

        $message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format Tanggal: dd.mm.yyyy';
        if(isset($tgl[1]))
        {
        	$bulan = intval($tgl[1]);
        	 // $status = false;   
        	if(count($tgl)<3)
	        {
	            $status = false;            
	        } else if($tgl[0]>33) {
	            $status = false;
	        } else if($bulan>12) {
	            $status = false;
	        }  else {
	            $status = true;
	            $message = null;
	        }
        } else {
        	$status = false;   
        }
        return array('message'=>$message,'status'=>$status);
    }

	function upah($d)
    {
        $status = true;
        $namasheet = '<b>SHEET PENGUPAHAN</b><br><br>';
      
        $message = 'valid';

        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode NIk tidak boleh kosong';
        }  else {
            $code = $d['1'];
            $this->db->join('calonpelamar', 'calonpelamar.idpelamar = pelamar.idpelamar');
            $qemp = $this->db->get_where('pelamar', array('nik'=>"".$d['1']."",'idcompany' => $this->session->userdata('idcompany'),'pelamar.display'=>null));
            if($qemp->num_rows()<=0)
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode NIK tidak ada di dalam database ';
            } 
        }

        ///////////////////////////////////////
        if($d['2']!='' || $d['2']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Periode Upah Awal',$d['2']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message'];
            }
         }

        //////////////////////////////////////
          if($d['3']!='' || $d['3']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Periode Akhir Awal',$d['3']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message'];
            }
         }

        /////////////////////////////////////


        if($d['4']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Jenis Potongan PPH tidak boleh kosong';
        } 
        else {
           if($d['4']!='NET' && $d['4']!='GROSS')
           {
           	 $status = false;
             $message = 'Error data NO ' . $d['0'] . ':Jenis Potongan PPH Salah';
           }
        }
        /////////////////////////////////////////

        // if($d['3']=='')
        // {
        //     $status = false;
        //     $message = 'Error data NO ' . $d['0'] . ': Bulan kebutuhan tidak boleh kosong';
        // }
        /////////////////////////////////////////

        if($d['5']=='' || $d['5']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode PTKP tidak boleh kosong';
        } else {
             $q = $this->db->get_where('ptkp', array('kodeptkp' => $d['5'],'display'=>null));
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode PTKP: '.$d['5'].' tidak ada di database';
            }
        }

        //total pendapatan
        if($d['7']=='' || $d['7']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Total Pendapatan tidak boleh kosong';
        }

        //Penerimaan Bruto
        if($d['8']=='' || $d['8']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Penerimaan Bruto tidak boleh kosong';
        }

        //Tunjangan Pajak
        if($d['9']=='' || $d['9']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tunjangan Pajak tidak boleh kosong';
        }

        //Biaya Jabatan
        if($d['10']=='' || $d['10']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Biaya Jabatan tidak boleh kosong';
        }

        //Penerimaan Net
        if($d['11']=='' || $d['1']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Penerimaan Net tidak boleh kosong';
        }

        //Neto Setahun
        if($d['12']=='' || $d['12']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Neto Setahun tidak boleh kosong';
        }

        //PKP Setahun
        if($d['13']=='' || $d['13']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': PKP Setahun tidak boleh kosong';
        }

        //PPH Setahun
        if($d['14']=='' || $d['14']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ':PPH Setahun tidak boleh kosong';
        }

        //PPH Sebulan
        if($d['15']=='' || $d['15']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ':PPH Sebulan tidak boleh kosong';
        }

         //Take Home Pay
        if($d['16']=='' || $d['16']==null)
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ':Take Home Pay tidak boleh kosong';
        }




        ////////////////////////////////////////////
       
        return array('status' => $status,'sheet'=>'Pengupahan', 'message' =>  $message);
    }

    function upahT($d)
    {
        $status = true;
        $namasheet = '<b>SHEET UPAH TETAP</b><br><br>';
      
        $message = 'valid';

        if($d['0']!='')
        {
            $q = $this->db->query("select kodekomponen
                                    from komponenupah
                                    where kodekomponen='".$d['0']."' and jeniskomponen='Upah Tetap' and idcompany=".$this->session->userdata('idcompany')." and display is null");
            if($q->num_rows()<=0)
            {
                $status = false;
                $message = "Kode Upah Tetap ".$d['0']." tidak ada di dalam database ";
            } 
        }

        return array('status' => $status,'sheet'=>'UPAH TETAP', 'message' =>  $message);
    }

    function upahTT($d)
    {
        $status = true;
        $namasheet = '<b>SHEET UPAH TIDAK TETAP</b><br><br>';
      
        $message = 'valid';

        if($d['0']!='')
        {
            $q = $this->db->query("select kodekomponen
                                    from komponenupah
                                    where kodekomponen='".$d['0']."' and jeniskomponen='Upah Tidak Tetap' and idcompany=".$this->session->userdata('idcompany')." and display is null");
            if($q->num_rows()<=0)
            {
                $status = false;
                $message = "Kode Upah Tidak Tetap ".$d['0']." tidak ada di dalam database ";
            } 
        }

        return array('status' => $status,'sheet'=>'UPAH TIDAK TETAP', 'message' =>  $message);
    }

    function benefit($d)
    {
        $status = true;
        $namasheet = '<b>SHEET BENEFIT</b><br><br>';
      
        $message = 'valid';

        if($d['0']!='')
        {
            $q = $this->db->query("select kodekomponen
                                    from komponenupah
                                    where kodekomponen='".$d['0']."' and jeniskomponen='Upah Tidak Tetap' and idcompany=".$this->session->userdata('idcompany')." and display is null");
            if($q->num_rows()<=0)
            {
                $status = false;
                $message = "Kode Upah Tidak Tetap ".$d['0']." tidak ada di dalam database ";
            } 
        }

        return array('status' => $status,'sheet'=>'BENEFIT', 'message' =>  $message);
    }

    function upah2($d,$field,$no)
    {
        $i=0;
        $status = true;
        $message = null;
        foreach ($d as $key => $value) {

            if($field[$i]=='f/2')
            {   
                if($value=='')
                {
                    $status = false;
                    $message = 'Error data NO '. $no.' : Kode NIk  tidak boleh kosong';
                    break;
                }  else {
                    $code = $d['1'];
                    $this->db->join('calonpelamar', 'calonpelamar.idpelamar = pelamar.idpelamar');
                    $qemp = $this->db->get_where('pelamar', array('nik'=>"".$value."",'idcompany' => $this->session->userdata('idcompany'),'pelamar.display'=>null));
                    if($qemp->num_rows()<=0)
                    {
                        $status = false;
                        $message = 'Error data NO '. $no.' : Kode NIK <b>'. $value . '</b> tidak ada di dalam database ';
                        break;
                    } 
                    
                }
            } else 

            ///////////////////////////////////////
            if($field[$i]=='f/3')
            {  
                if($value!='' || $value!=null)
                {
                    $valid = $this->validasitgl($no,'Periode Upah Awal',$value);
                    if (!$valid['status']) {
                        $status = false;
                        $message = $valid['message'];
                        break;
                    }
                 }
             } else

            //////////////////////////////////////
            if($field[$i]=='f/4')
            {  
                if($value!='' || $value!=null)
                {
                    $valid = $this->validasitgl($no,'Periode Upah Akhir',$value);
                    if (!$valid['status']) {
                        $status = false;
                        $message = $valid['message'];
                        break;
                    }
                 }
            } else

             /////////////////////////////////////
            if($field[$i]=='f/5')
            {  
                if($value=='')
                {
                    $status = false;
                    $message = 'Error data NO ' . $no . ': Jenis Potongan PPH tidak boleh kosong';
                    break;
                } 
                else {
                   if($value!='NET' && $value!='GROSS')
                   {
                     $status = false;
                     $message = 'Error data NO ' . $no . ':Jenis Potongan PPH Salah';
                     break;
                   }
                }
            } else

             /////////////////////////////////////
            if($field[$i]=='f/6')
            {  
                if($value=='' || $value==null)
                {
                    $status = false;
                    $message = 'Error data NO ' . $no . ': Kode PTKP tidak boleh kosong';
                    break;
                } else {
                     $q = $this->db->get_where('ptkp', array('kodeptkp' => $value,'display'=>null));
                    if ($q->num_rows() > 0) {
                    } else {
                        $status = false;
                        $message = 'Error data NO ' . $no. ': Kode PTKP: '.$value.' tidak ada di database';
                        break;
                    }
                }
            }

            $i++;
        }
        return array('status' => $status,'message' =>  $message);
    }


}

?>
