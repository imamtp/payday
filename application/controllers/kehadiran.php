<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class kehadiran extends MY_Controller {

    public function index() {
        
    }

    function checkdate($tglhadir,$idpelamar)
    {
        $qcek = $this->db->query("select tglmulai,tglselesai from pengajuancuti where idpelamar = $idpelamar and ('$tglhadir' between tglmulai and tglselesai) and display is null");
        
        if($qcek->num_rows()>0)
        {
            $r = $qcek->row();
            $json = array('success' => false, 'message' => 'Tidak bisa mengajukan kehadiran karena karyawan sudah memiliki data cuti pada tanggal  <br><b>'.backdate2($r->tglmulai).' s/d '.backdate2($r->tglselesai).'</b>');
            echo json_encode($json);
            exit;
        }

        $qcek = $this->db->query("select startdate,enddate from pengajuanizin where idpelamar = $idpelamar and ('$tglhadir' between startdate and enddate) and display is null");
        
        if($qcek->num_rows()>0)
        {
            $r = $qcek->row();
            $json = array('success' => false, 'message' => 'Tidak bisa mengajukan kehadiran karena karyawan sudah memiliki data izin pada tanggal  <br><b>'.backdate2($r->startdate).' s/d '.backdate2($r->enddate).'</b>');
            echo json_encode($json);
            exit;
        }
    }

    function saveKehadiran()
    {
    	$idpelamar = $this->input->post('idpelamar');
    	$tglhadir = backdate2_reverse($this->input->post('tglhadir'));

    	if($this->input->post('statusformKehadiran')=='input')
		{	
	    	$qcek = $this->db->get_where('kehadiran',array('idpelamar'=>$idpelamar,'tglhadir'=>$tglhadir,'display'=>null));
	    	if($qcek->num_rows()>0)
	    	{
	    		  $json = array('success' => false, 'message' => 'Data kehadiran '.$this->input->post('namalengkap').' pada tanggal '.$this->input->post('tglhadir').' sudah ada di database');
	              echo json_encode($json);
	              exit;
	    	} 
	    }

	    $this->checkdate($tglhadir, $idpelamar);

    		$this->db->trans_begin();

    		$data = array(
		    	// "idkehadiran" int4 DEFAULT nextval('seq_kehadiran'::regclass) NOT NULL,
					"idpelamar" => $idpelamar,
					"tglhadir" => $tglhadir,
					"idjamkerjaharian" => $this->m_data->getID('jamkerjaharian', 'namajamkerja', 'idjamkerjaharian', $this->input->post('namajamkerja')),
					"jammasuk_jam" => $this->input->post('jammasuk_jam'),
					"jammasuk_menit" => $this->input->post('jammasuk_menit'),
					"jampulang_jam" => $this->input->post('jampulang_jam'),
					"jampulang_menit" => $this->input->post('jampulang_menit'),
					// "display" int4,
					// "userin" => $this->session->userdata('username'),
	                "usermod" => $this->session->userdata('username'),
	                // "datein" => date('Y-m-d H:m:s'),
	                "datemod" => date('Y-m-d H:m:s')
				);

    		if($this->input->post('statusformKehadiran')=='edit')
			{	
				$data["usermod"] = $this->session->userdata('username');
				$data["datemod"] = date('Y-m-d H:m:s');
				$this->db->where('idkehadiran',$this->input->post('idkehadiran'));
				$this->db->update('kehadiran',$data);
			} else {
				$data["userin"] = $this->session->userdata('username');
				$data["datein"] = date('Y-m-d H:m:s');
				$this->db->insert('kehadiran',$data);
			}


    		

			if ($this->db->trans_status() === FALSE) {
	            $this->db->trans_rollback();
	            $json = array('success' => false, 'message' => 'Data kehadiran gagal disimpan');
	        } else {
	            $this->db->trans_commit();
	            $json = array('success' => true, 'message' => 'Data kehadiran berhasil disimpan');
	        }

	        echo json_encode($json);
    	
    }


    	function datakehadiran()
    	{
    		$this->load->model('personalia/m_personildetail','m_personil');
    		$search = $this->input->post('query');

    		if($this->input->post('startdate')!='' && $this->input->post('enddate')!='')
    		{
    			$startdate = str_replace('T00:00:00', '', $this->input->post('startdate'));
	            $enddate = str_replace('T00:00:00', '', $this->input->post('enddate'));
	           

	            $datetime1 = new DateTime($startdate);
				$datetime2 = new DateTime($enddate);
				$difference = $datetime1->diff($datetime2);

	             if($startdate==$enddate)
	            {
	            	$jumlahhari=2;
	            } else {
	            	$jumlahhari = $difference->days+1;
	            }

	            $qhadir = "SELECT a.*,b.namalengkap,c.nik
									FROM kehadiran a
									join pelamar b ON a.idpelamar = b.idpelamar
									join calonpelamar c ON b.idpelamar = c.idpelamar
									WHERE a.display IS NULL and a.tglhadir between '$startdate' and '$enddate' ";
	           	if($search!=null)
				{
					$qhadir.=" and (c.nik like '%".strtoupper($search)."%' OR b.namalengkap like '%".strtoupper($search)."%')";
				}

				$qhadir.="ORDER BY idkehadiran";

	        } else {
	        	$qhadir = "SELECT a.*,b.namalengkap,c.nik
									FROM kehadiran a
									join pelamar b ON a.idpelamar = b.idpelamar
									join calonpelamar c ON b.idpelamar = c.idpelamar
									WHERE a.display IS NULL ";
				if($search!=null)
				{
					$qhadir.=" and (c.nik like '%".strtoupper($search)."%' OR b.namalengkap like '%".strtoupper($search)."%')";
				}
				$qhadir.="ORDER BY idkehadiran";
	        }
// echo $qhadir;
// exit;
 			$q = $this->db->query($qhadir);

    		// $this->db->order_by('idkehadiran','desc');
    		// $q = $this->db->get_where('kehadiran',array('display'=>null));
    		// echo $this->db->last_query();
    		$arr = array();
        	foreach ($q->result() as $obj) {
    			$idjamkerjaharian = $obj->idjamkerjaharian;
    			$tglhadir = $obj->tglhadir;
    			$idpelamar = $obj->idpelamar;
    			$idkehadiran = $obj->idkehadiran;

    			$qjam = $this->db->get_where('jamkerjaharian',array('idjamkerjaharian'=>$idjamkerjaharian));
    			if($qjam->num_rows()>0)
    			{
    				$rjam = $qjam->row();
    				$toleransi_menit = $rjam->toleransi_menit;
    				$jammasuk = $rjam->jammasuk_jam.':'.$rjam->jammasuk_menit;
    				$jamMulaiIstirahat = $rjam->mulaiistirahat_jam.':'.$rjam->mulaiistirahat_menit;
    				$jamAkhirIstirahat = $rjam->akhiristirahat_jam.':'.$rjam->akhiristirahat_menit;

					$endTime = strtotime("+$toleransi_menit minutes", strtotime($jammasuk.":00"));
					$toleransiKehadiran = date('h:i:s', $endTime);
					// echo $toleransiKehadiran

    				$sql =	"select idkehadiran,idpelamar,tglhadir,jammasuk_jam,jammasuk_menit,jampulang_jam,jampulang_menit,jamhadir,jamhadirfull,jampulang,durasiistirahat,durasikerja
							from (
								select idkehadiran,idpelamar,tglhadir,jammasuk_jam,jammasuk_menit,jampulang_jam,jampulang_menit,display,userin,datein,
									(((jammasuk_jam)::text || ':'::text) || (jammasuk_menit)::text || ':00'::text) AS jamhadir,jamhadirfull,
									(((jampulang_jam)::text || ':'::text) || (jampulang_menit)::text || ':00'::text) AS jampulang,jampulangfull,durasiistirahat,
									age(jampulangfull::timestamp,jamhadirfull::timestamp)-durasiistirahat as durasikerja
								from (
									select a.idkehadiran,a.idpelamar,a.tglhadir,a.jammasuk_jam,a.jammasuk_menit,a.jampulang_jam,a.jampulang_menit,a.display,a.userin,a.datein,
									(((tglhadir)::text || ' '::text ||(jammasuk_jam)::text || ':'::text) || (jammasuk_menit)::text || ':00'::text) AS jamhadirfull,
									(((tglhadir)::text || ' '::text ||(jampulang_jam)::text || ':'::text) || (jampulang_menit)::text || ':00'::text) AS jampulangfull,
									age('$tglhadir $jamAkhirIstirahat'::timestamp,'$tglhadir $jamMulaiIstirahat'::timestamp) as durasiistirahat
									from kehadiran a
									where a.idkehadiran=$idkehadiran) aa) aaa";
					$qhadir = $this->db->query($sql);
					// echo $sql;
					if($qhadir->num_rows()>0)
					{
						$rhadir = $qhadir->row();
						// var_dump($qhadir->row());
						$q2 = $this->db->query("select age('$rhadir->jamhadirfull'::timestamp,'$tglhadir $toleransiKehadiran'::timestamp) as keterlambatan")->row();
						
						if($rhadir->jamhadir<=$toleransiKehadiran)
						{
						  $keterlambatan = 0;
						} else 
						if($this->hoursToMinutes($q2->keterlambatan)>0)
						{
							//terlambat
							$q3 = $this->db->query("select age('$rhadir->jamhadirfull'::timestamp,'$tglhadir $jammasuk'::timestamp) as keterlambatan")->row();
							$keterlambatan = $this->hoursToMinutes($q3->keterlambatan);
						} else {
							$keterlambatan = 0;
						}

						$obj->idkehadiran = $rhadir->idkehadiran;
						$obj->idpelamar = $rhadir->idpelamar;
						$obj->tglhadir = $rhadir->tglhadir;
						$obj->jammasuk_jam = $rhadir->jammasuk_jam;
						$obj->jammasuk_menit = $rhadir->jammasuk_menit;
						$obj->jampulang_jam = $rhadir->jampulang_jam;
						$obj->jampulang_menit = $rhadir->jampulang_menit;
						$obj->jamhadir = $rhadir->jamhadir;
						$obj->jamhadirfull = $rhadir->jamhadirfull;
						$obj->jampulang = $rhadir->jampulang;
						$obj->durasiistirahat = $rhadir->durasiistirahat;
						$obj->durasikerja = $rhadir->durasikerja;
						$obj->keterlambatan = $keterlambatan;

						//detail karyawan
						$query = $this->m_personil->query()." WHERE a.idpelamar = $idpelamar";
						// echo $query;
						// exit;

						// $query = $this->m_personil->query()." WHERE ".$this->m_personil->whereQuery()." and a.idpelamar = $idpelamar";
						// echo $query;
						$qdetail = $this->db->query($query);
						if($qdetail->num_rows()<=0)
						{
							$qdetail = $qdetail->row();
							
							$qpeg = $this->db->query("select namalengkap,nik
									from pelamar a
									left join calonpelamar b on a.idpelamar = b.idpelamar
									where a.idpelamar=$idpelamar")->row();
							$obj->nik = $qpeg->nik;
							$obj->namalengkap = $qpeg->namalengkap;
							$obj->companyname = isset($qdetail->companyname) ? $qdetail->companyname : null;
							$obj->namajabatan = null;
							$obj->namaorg = null;
							$obj->namaatasan = null;
							$obj->namajabatanatasan =null;
							$obj->namaorgatasan = null;

							// $qpeg->free_result();
						} else {
							$qdetail = $qdetail->row();

							$obj->nik = $qdetail->nik;
							$obj->namalengkap = $qdetail->namalengkap;
							$obj->companyname = $qdetail->companyname;
							$obj->namajabatan = $qdetail->namajabatan;
							$obj->namaorg = $qdetail->namaorg;
							$obj->namaatasan = $qdetail->namaatasan;
							$obj->namajabatanatasan = $qdetail->namajabatanatasan;
							$obj->namaorgatasan = $qdetail->namaorgatasan;
						}

						// $qdetail = $this->db->query("select nik,namalengkap,namajabatan,namaorg,namaatasan,namajabatanatasan,namaorgatasan from v_detailkaryawan where idpelamar = $idpelamar")->row();
						

						// $qdetail->free_result();

					}
    			} else {
    				exit;
    			}
    			$obj->tglhadir = isset($obj->tglhadir) ? backdate2_reverse($obj->tglhadir) : null;
    			$arr[] = $obj;
    		}

    		// $results = $query->num_rows();
        	$results = $q->num_rows();
        	echo '{success:true,numrow:' . $q->num_rows() . ',results:' . $results .',rows:' . json_encode($arr) . '}';
    		
    	}

    	function hoursToMinutes($hours) 
		{ 
		    $minutes = 0; 
		    if (strpos($hours, ':') !== false) 
		    { 
		        // Split hours and minutes. 
		        list($hours, $minutes) = explode(':', $hours); 
		    } 
		    return $hours * 60 + $minutes; 
		} 

		function rekap($idcompany=null,$idjabatan=null,$idorganisasi=null,$startdate=null,$enddate=null,$eksport=null,$stream=false,$idpelamar=null)
		{
			// echo 'param idcompany:'.$idcompany.' idjabatan:'.$idjabatan.' idorganisasi:'.$idorganisasi.' startdate:'.$startdate.' enddate:'.$enddate.' eksport:'.$eksport.' stream:'.$stream.' idpelamar:'.$idpelamar;
			
			if($stream==true)
			{
				$idjabatan=null;
				$idorganisasi=null;
			}
			
			 if($eksport==null && $stream==null)
            {
				$sd = $this->input->post('startdate')=='' ? $startdate : $this->input->post('startdate');
				// echo 'asd'.$this->input->post('startdate');
				$startdate = backdate2_reverse(str_replace('T00:00:00', '', $sd));
				$nd = $this->input->post('enddate')=='' ? $enddate :  $this->input->post('enddate');
            	$enddate = backdate2_reverse(str_replace('T00:00:00', '', $nd));
           
            	$idcompany = $this->input->post('idcompany');
	            $idorganisasi = $this->input->post('idorganisasi');
	            $idjabatan = $this->input->post('idjabatan');
	        } else {

				
	        	$startdate = backdate2_reverse($startdate);
            	$enddate = backdate2_reverse($enddate);
	        }

          	$this->load->model('personalia/m_personil');


            $datetime1 = new DateTime($startdate);
			$datetime2 = new DateTime($enddate);
			$difference = $datetime1->diff($datetime2);

            if($startdate==$enddate)
            {
            	$jumlahhari=2;
            } else {
            	$jumlahhari = $difference->days+1;
            }

             $query = $this->m_personil->query()." WHERE ".$this->m_personil->whereQuery($idcompany,$idorganisasi,$idjabatan,$idpelamar)."";

		
			// $queryKaryawan = $this->db->query("select idpelamar,idcompany,nik,namalengkap,namajabatan,namaorg,
			// 	namaatasan,namajabatanatasan,namaorgatasan 
			// 	from v_detailkaryawan where display is null 
			// 	and idcompany=".$this->session->userdata('idcompany')."");
	        $queryKaryawan = $this->db->query($query);
// echo $this->db->last_query();
			$arr = array();
        	foreach ($queryKaryawan->result() as $obj) {
        		$idpelamar = $obj->idpelamar;

				$hadir=0;
				$tidakhadir=0;
				$keterlambatan=0;
				$durasiketerlambatan=0;
				$izin=0;
				$cuti=0;
				$i=1;
				$first=true;
				while ($i<$jumlahhari)
				// for($i=1;$i<$jumlahhari;$i++)
				{
					if($first)
					{
						$qhadir = $this->db->query("select idjamkerjaharian from kehadiran where display is null and idpelamar=$idpelamar and tglhadir='$startdate'");
						$tgl = $startdate;
						$first=false;
						// echo $tgl.' '.$this->db->last_query().'<br>';
						// $i=2;
						// echo ' '.$i;
					} else {
						// echo $i;
						$tglhadir = strtotime("+$i days", strtotime($startdate));
						$tglhadir =  date('Y-m-d', $tglhadir);
						// echo $tglhadir;
						$qhadir = $this->db->query("select idjamkerjaharian from kehadiran where display is null and idpelamar=$idpelamar and tglhadir='$tglhadir'");
						$tgl = $tglhadir;
						$i++;
						// exit;
					}
					// echo 'i.'.$i;
					if($qhadir->num_rows()>0)
					{
						$rhadir = $qhadir->row();
						// echo $tgl.' '.$rhadir->idjamkerjaharian;
						$hadir++;
						// echo $this->db->last_query().'<br>';
						$rjam = $this->db->get_where('jamkerjaharian',array('idjamkerjaharian'=>$rhadir->idjamkerjaharian))->row();

	    				$toleransi_menit = $rjam->toleransi_menit;
	    				$jammasuk = $rjam->jammasuk_jam.':'.$rjam->jammasuk_menit;
	    				$jamMulaiIstirahat = $rjam->mulaiistirahat_jam.':'.$rjam->mulaiistirahat_menit;
	    				$jamAkhirIstirahat = $rjam->akhiristirahat_jam.':'.$rjam->akhiristirahat_menit;

						$endTime = strtotime("+$toleransi_menit minutes", strtotime($jammasuk.":00"));
						$toleransiKehadiran = date('h:i:s', $endTime);
						// echo $toleransiKehadiran

	    				$sql =	"select idkehadiran,idpelamar,tglhadir,jammasuk_jam,jammasuk_menit,jampulang_jam,jampulang_menit,jamhadir,jamhadirfull,jampulang,durasiistirahat,durasikerja
								from (
									select idkehadiran,idpelamar,tglhadir,jammasuk_jam,jammasuk_menit,jampulang_jam,jampulang_menit,display,userin,datein,
										(((jammasuk_jam)::text || ':'::text) || (jammasuk_menit)::text || ':00'::text) AS jamhadir,jamhadirfull,
										(((jampulang_jam)::text || ':'::text) || (jampulang_menit)::text || ':00'::text) AS jampulang,jampulangfull,durasiistirahat,
										age(jampulangfull::timestamp,jamhadirfull::timestamp)-durasiistirahat as durasikerja
									from (
										select a.idkehadiran,a.idpelamar,a.tglhadir,a.jammasuk_jam,a.jammasuk_menit,a.jampulang_jam,a.jampulang_menit,a.display,a.userin,a.datein,
										(((tglhadir)::text || ' '::text ||(jammasuk_jam)::text || ':'::text) || (jammasuk_menit)::text || ':00'::text) AS jamhadirfull,
										(((tglhadir)::text || ' '::text ||(jampulang_jam)::text || ':'::text) || (jampulang_menit)::text || ':00'::text) AS jampulangfull,
										age('$tgl $jamAkhirIstirahat'::timestamp,'$tgl $jamMulaiIstirahat'::timestamp) as durasiistirahat
										from kehadiran a
										where a.idpelamar=$idpelamar and a.tglhadir='$tgl') aa) aaa";
						$qhadir = $this->db->query($sql);
						if($qhadir->num_rows()>0)
						{
							$rhadir = $qhadir->row();
							// var_dump($qhadir->row());
							$q2 = $this->db->query("select age('$rhadir->jamhadirfull'::timestamp,'$tgl $toleransiKehadiran'::timestamp) as keterlambatan")->row();
							if($this->hoursToMinutes($q2->keterlambatan)>0)
							{
								//terlambat
								$q3 = $this->db->query("select age('$rhadir->jamhadirfull'::timestamp,'$tgl $jammasuk'::timestamp) as keterlambatan")->row();
								$durasiketerlambatan += $this->hoursToMinutes($q3->keterlambatan);
								$keterlambatan++;
							} else {
								$durasiketerlambatan += 0;
							}

						}//end qhadir

					} else {
						$tidakhadir++;
						// echo $tgl.' '.$this->db->last_query().'<br>';
					}


					//hitung izin
					$qizin = $this->db->query("select count(*) from pengajuanizin where '$tgl' between startdate and enddate and display is null and idpelamar=$idpelamar");
					if($qizin->num_rows()>0)
					{
						$rizin = $qizin->row();
						if($rizin->count>0)
						{
							// echo $this->db->last_query().'<br>';
							$izin++;
						}
					}

					//hitung cuti
					$qcuti = $this->db->query("select count(*) from pengajuancuti where '$tgl' between tglmulai and tglselesai and display is null and idpelamar=$idpelamar");
					if($qcuti->num_rows()>0)
					{
						$rcuti = $qcuti->row();
						if($rcuti->count>0)
						{
							// echo $this->db->last_query().'<br>';
							$cuti++;
						}
					}

					if($startdate==$enddate)
		            {
		            	break;
		            }
				}
				$obj->hadir = $hadir;
				$obj->tidakhadir = $tidakhadir-$cuti;
				$obj->durasiketerlambatan = $durasiketerlambatan;
				$obj->keterlambatan = $keterlambatan;
				$obj->izin = $izin;
				$obj->cuti = $cuti;

        		$arr[] = $obj;
        	}

			if($stream==true)
			{
				return $arr;
				//print_r($arr);
				exit;
			}
			
        	if($eksport==null)
        	{
        		$results = $queryKaryawan->num_rows();
	        	echo '{success:true,numrow:' . $queryKaryawan->num_rows() . ',results:' . $results .',rows:' . json_encode($arr) . '}';
	        } else {
	        	  //cetak ke excel
	            $html = $this->load->view('tplcetak/tpl_rekapkehadiran', array('data'=>$arr,'fontsize'=>9),true);
	            $filename = "data_rekap_kehadiran.xls";
	            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
	            header("Content-type:   application/x-msexcel; charset=utf-8");
	            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
	            header("Expires: 0");
	            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	            header("Cache-Control: max-age=0");
	            echo $html;
	        }

		}

	function importKehadiran()
    {
        $config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
            $file = $this->upload->data()['full_path'];
            $orig_name = $this->upload->data()['orig_name'];

            require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);

            $start = 1;
            while (isset($val[$start])) {
                $d = $val[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasiKehadiran($d);
                    if ($valid['status']) {
                        $oke = true;
                        $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                        $idupload = $qseq->idupload;
                    } else {
                        $oke = false;
                        break;
                    }

                   

                    $start++;
                }
            }

            if ($oke) {
                $this->db->trans_begin();

                $start = 1;

                $total = 0;
                while (isset($val[$start])) {

                    $d = $val[$start];
                    if($d['0']!='')
                    {
                    	$qemp = $this->db->query("select a.idpelamar
									from calonpelamar a
									join pelamar b ON a.idpelamar = b.idpelamar
									where b.display is null and a.nik='". $d['1']."' and b.idcompany=".$this->session->userdata('idcompany')."")->row();

	                 	$tglhadir = explode(".", $d['3']);

			            $qjk = $this->db->query("select idjamkerjaharian
							from jamkerjaharian a
							where display is null and kodejamkerja='".$d['2']."' ". $this->m_data->whereCompany()."")->row();

			            $jamMasuk = explode(":", $d['4']);
			            $jamKeluar = explode(":", $d['5']);

                    	 $data = array(
							"idpelamar" => $qemp->idpelamar,
							"tglhadir" => $tglhadir[2].'-'.$tglhadir[1].'-'.$tglhadir[0],
							"idjamkerjaharian" => $qjk->idjamkerjaharian,
							"jammasuk_jam" => $jamMasuk[0],
							"jammasuk_menit" => $jamMasuk[1],
							"jampulang_jam" => $jamKeluar[0],
							"jampulang_menit" =>  $jamKeluar[1],
							// "display" int4,
							"userin" => $this->session->userdata('username'),
			                "usermod" => $this->session->userdata('username'),
			                "datein" => $this->tanggalWaktu(),
			                "datemod" => $this->tanggalWaktu()
						);

			    		$this->db->insert('kehadiran',$data);
                        $start++;
                    }
                }

                $start-=1;
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $start . ' Data Kehadiran Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $start . ' Data Kehadiran Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
    }


    function validasiKehadiran($d,$update=false)
    {
         $status = true;
      
        $message = 'valid';

        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': NIK tidak boleh kosong';
        }  else {
            $code = $d['1'];
            $qemp = $this->db->query("select a.idpelamar
									from calonpelamar a
									join pelamar b ON a.idpelamar = b.idpelamar
									where b.display is null and a.nik='$code' and b.idcompany=".$this->session->userdata('idcompany')."");
            if($qemp->num_rows()<=0)
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': NIK tidak ada di dalam database ';
            } 
        }
        ///////////////////////////////////////
        if($d['2']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Jam Kerja tidak boleh kosong';
        } 
        else {
            $code = $d['2'];
            $qemp = $this->db->query("select kodejamkerja
				from jamkerjaharian a
				where display is null and kodejamkerja='$code' ". $this->m_data->whereCompany()."");
            // echo $this->db->last_query();
            if($qemp->num_rows()<=0)
            {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Jam Kerja tidak ada di dalam database ';
            } 
        }

        /////////////////////////////////////////
        if($d['3']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal kehadiran tidak boleh kosong';
        } else {
        	$valid = $this->validasitgl($d['0'],'Tanggal kehadiran',$d['3']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['3'];
            }
        }
        /////////////////////////////////////////

         /////////////////////////////////////////
        if($d['4']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Jam masuk tidak boleh kosong';
        } else {
        	$valid = $this->validasijam($d['0'],'Jam Masuk',$d['4']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message'];
            }
        }
        /////////////////////////////////////////

         /////////////////////////////////////////
        if($d['5']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Jam keluar tidak boleh kosong';
        } else {
        	$valid = $this->validasijam($d['0'],'Jam Keluar',$d['5']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message'];
            }
        }
        /////////////////////////////////////////

        $q = $this->db->get_where("calonpelamar",array('nik'=>$d['1']));

        if($q->num_rows()>0)
        {
        	$tglArr = explode('.', $d['3']);
        	$tglhadir = $tglArr[2].'-'.$tglArr[1].'-'.$tglArr[0];

        	

        	$r = $q->row();
        	$qpeg = $this->db->get_where('pelamar',array('idpelamar'=>$r->idpelamar))->row();
        	$qcek = $this->db->query("select tglmulai,tglselesai from pengajuancuti where idpelamar = ".$r->idpelamar." and ('$tglhadir' between tglmulai and tglselesai) and display is null");
        
	        if($qcek->num_rows()>0)
	        {
	            $rr = $qcek->row();
	            $status = false;
                $message = 'Tidak bisa mengajukan kehadiran karena karyawan <b>'.$d['1'].' - '.$qpeg->namalengkap.'</b> sudah memiliki data cuti pada tanggal  <br><b>'.backdate2($rr->tglmulai).' s/d '.backdate2($rr->tglselesai).'</b>';
	        }

	        $qcek = $this->db->query("select startdate,enddate from pengajuanizin where idpelamar = ".$r->idpelamar." and ('$tglhadir' between startdate and enddate) and display is null");
        
	        if($qcek->num_rows()>0)
	        {
	            $rr = $qcek->row();
	            $status = false;
                $message = 'Tidak bisa mengajukan kehadiran karena karyawan <b>'.$d['1'].' - '.$qpeg->namalengkap.'</b> sudah memiliki data izin pada tanggal  <br><b>'.backdate2($rr->startdate).' s/d '.backdate2($rr->enddate).'</b>';
	        }

	        $qcek = $this->db->query("select count(*) from kehadiran where idpelamar = ".$r->idpelamar." and tglhadir='".$tglhadir."'")->row();
	        if($qcek->count>0)
	        {
	            // $rr = $qcek->row();
	            $status = false;
	            // select count(*) from kehadiran where idpelamar = 82 and tglhadir='2015-03-01'
                $message = 'Karyawan <b>'.$d['1'].' - '.$qpeg->namalengkap.'</b> sudah memiliki data kehadiran pada tanggal  <br><b>'.$d['3'].'</b>';
                // $message = $this->db->last_query();
	        }

        }

       
       
        return array('status' => $status, 'message' => $message);
    }

    function validasitgl($no,$jenis,$date)
    {
        $tgl = explode(".", $date);

        $bulan = isset($tgl[1]) ? intval($tgl[1]) : null;

        $message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format tangal dd.mm.yyy (tanggal.bulan.tahun). Contoh 01.05.201';
        if(count($tgl)<3)
        {
            $status = false;            
        } else if($bulan>12) {
            $status = false;
        } 
        else {
            $status = true;
            $message = null;
        }
        return array('message'=>$message,'status'=>$status);
    }

    function validasijam($no,$jenis,$jam)
    {
    	$jamArr = explode(":", $jam);

    	$hh = intval($jamArr[0]);
    	$mm = intval($jamArr[1]);

    	$message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format waktu masuk/keluar adalah hh:mm (jam:menit) dengan format 24 jam. Contoh: Masuk 08:15 - Keluar 17:00';
        
         if(count($jamArr)<2)
        {
            $status = false;            
        } else if($hh>24) {
            $status = false;
        } else if($mm>60) {
            $status = false;
        } else {
            $status = true;
            $message = null;
        }
        return array('message'=>$message,'status'=>$status);
    }

    function sumkuotacuti()
    {
		$idpelamar = $this->input->post('idpelamar');
		$idcuti = $this->m_data->getID('pengaturancuti', 'namapengcuti', 'idpengaturancuti', $this->input->post('idpengaturancuti'),true);
    	$dt = new DateTime();
        $datenow =  $dt->format('Y-m-d');

    	$q = $this->db->query("select a.idpelamar,tglmasuk,tglberakhir
    		from pelamar a
    		LEFT  JOIN
            (
                SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                FROM pekerjaan
                WHERE statuspergerakan='Disetujui'
                GROUP BY idpelamar
            ) as x ON a.idpelamar = x.idpelamar
            LEFT join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
            where a.idpelamar = $idpelamar");
    	if($q->num_rows()>0)
    	{
    		$r = $q->row();

    		$qcuti = $this->db->get_where('pengaturancuti',array('idpengaturancuti'=>$idcuti))->row();
    		$defaulkuota = $qcuti->jumlahcuti;

			// echo $r->tglmasuk.'>'.$datenow.'<br>';
    		if($r->tglmasuk>$datenow)
    		{
    			$numMonthAktif =  $this->nb_mois($datenow,$r->tglmasuk);
    		} else {
    			$numMonthAktif =   $this->nb_mois($r->tglmasuk,$datenow);
    		}
    		
    		if($numMonthAktif>=$qcuti->bulanbericuti)
    		{
    			$dr = explode("-", $r->tglmasuk);
    			$startdate = date('Y').'-'.$dr['1'].'-'.$dr['2'];

    			//cek udah berapa cuti yang diambil dalam satu tahun
    			$lastdate = date('Y-m-d', strtotime($startdate . ' +1 year'));

    			$qlastcuti = $this->db->query("select durasi
												from pengajuancuti
												where idpelamar = $idpelamar and (tglmulai between '$startdate' and '$lastdate') and display is null");
    			$jumcuti=0;
    			foreach ($qlastcuti->result() as $rc) {
    				$jumcuti+=$rc->durasi;
    			}

    			if($jumcuti<$defaulkuota)
    			{
    				$json = array('status'=>true,'kuota'=>$defaulkuota-$jumcuti,'message'=>'');
    			} else {
    				$json = array('status'=>false,'kuota'=>0,'message'=>'Kuota cuti sudah habis');
    			}
    		} else {
    			$json = array('status'=>false,'kuota'=>0,'message'=>'Personil belum melewati masa minimum pemberian cuti');
    		}	
    		
    	}

    	echo json_encode($json);
    }

    function sumkuotacuti2()
    {
    	$idpelamar = $this->input->post('idpelamar');
    	$this->cuticounter(null,$idpelamar,$this->input->post('idpengaturancuti'));
		$id = $this->m_data->getID('pengaturancuti', 'namapengcuti', 'idpengaturancuti', $this->input->post('idpengaturancuti'));
		
    	$q = $this->db->get_where('cuticounter',array('idpelamar'=>$idpelamar,'idpengaturancuti'=>$id));
    	if($q->num_rows()>0)
    	{
    		$r = $q->row();
    		$kuota = $r->kuota;
    		$diambil = $r->diambil;

    		if($diambil==$kuota)
    		{
    			$json = array('status'=>false,'kuota'=>0,'message'=>'Kuota cuti sudah habis');
    		} else {

    			$json = array('status'=>true,'kuota'=>($kuota-$diambil),'message'=>null);
    		}
    	} else {
    		$json = array('status'=>false,'kuota'=>0,'message'=>'Tidak ada data kuota cuti');
    	}
    	echo json_encode($json);
    }

    function cuticounter($idcompany=null,$idpelamar=null,$idpengaturancuti=null)
    {
    	$dt = new DateTime();
        $tglSekarang = $dt->format('Y-m-d');
        // echo $tglSekarang;

    	

    	$sql = "select a.idpelamar,c.tglmasuk
    		from pelamar a
    		LEFT JOIN (
                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as b ON a.idpelamar = b.idpelamar 
    	 LEFT join pekerjaan c ON b.idpekerjaan = c.idpekerjaan
    	 where TRUE";

    	if($idcompany!=null && $idcompany!='')
    	{
    		$sql.=" AND a.idcompany=$idcompany";	
    	} else {
    		$qp = $this->db->get_where('pelamar',array('idpelamar'=>$idpelamar))->row();
    		// $idcompany = $this->session->userdata('idcompany');
    		$idcompany = $qp->idcompany;
    		$sql.=" AND a.idcompany=$idcompany";	
    	}
		
		
		if($this->input->post('idpengaturancuti')!=null)
		{
			$id = $this->m_data->getID('pengaturancuti', 'namapengcuti', 'idpengaturancuti', $this->input->post('idpengaturancuti'));
			// var_dump($id);
			$idpengaturancuti = $id;
			$qconfig = $this->db->get_where('pengaturancuti',array('idpengaturancuti'=>$id));
			if($qconfig->num_rows()>0)
			{
				$rconfig = $qconfig->row();
				$kuotacuti = $rconfig->jumlahcuti;
				$startMonthcuti = $rconfig->bulanbericuti; //bulan k
			} else {
				$json = array('status'=>false,'message'=>'Belum ada pengaturan cuti');
				// echo $this->db->last_query();
				return $json;
				exit;
			}
		} else if($idpengaturancuti!=null)
			{
				$qconfig = $this->db->get_where('pengaturancuti',array('idpengaturancuti'=>$idpengaturancuti));
				if($qconfig->num_rows()>0)
				{
					$rconfig = $qconfig->row();
					$kuotacuti = $rconfig->jumlahcuti;
					$startMonthcuti = $rconfig->bulanbericuti; //bulan k
				} else {
					$json = array('status'=>false,'message'=>'Belum ada pengaturan cuti');
					// echo $this->db->last_query();
					return $json;
					exit;
				}
			} else {
				$json = array('status'=>false,'message'=>'idpengaturancuti undefined');
					return $json;
					exit;
				// $qconfig = $this->db->get_where('pengaturancuti',array('idcompany'=>$idcompany));
				// // echo $this->db->last_query();
				// if($qconfig->num_rows()>0)
				// {
					// $rconfig = $qconfig->row();
					// $kuotacuti = $rconfig->jumlahcuti;
					// $startMonthcuti = $rconfig->bulanbericuti; //bulan k
				// } else {
					// $json = array('status'=>false,'message'=>'Belum ada pengaturan cuti');
					// echo $this->db->last_query();
					// return $json;
					// exit;
				// }
			}
    	
    	
    	$numrecycle = 12; //bulan

    	if($idpelamar!=null)
    	{
    		$sql.=" AND a.idpelamar=$idpelamar";	
    	}
// echo $sql;
    	$q = $this->db->query($sql);
// echo $this->db->last_query();
// exit;
    	foreach ($q->result() as $r) {
    		
    		//cek udah setahun atau belum, kalau belum cuti diberikan di bulan ketiga 
    		$datetime1 = new DateTime($r->tglmasuk);
			$datetime2 = new DateTime($tglSekarang);

			$difference = $datetime1->diff($datetime2);

			// echo 'Difference: '.$difference->y.' years, ' 
			//                    .$difference->m.' months, ' 
			//                    .$difference->d.' days';

			// print_r($difference);

			//kalo pas setahun, hapus, dan beri kuota baru 
			// echo $difference->days.'==366<br>';
			if($difference->days>=366) 
			{
				$qcutinow = $this->db->get_where('cuticounter',array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti));
				if($qcutinow->num_rows()>0)
				{
					$rcutinow = $qcutinow->row();
					// echo $rcutinow->lastupdate.'<'.$tglSekarang;
					
					if($rcutinow->lastupdate<=$tglSekarang)
					{
						$this->db->where(array('idpelamar',$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti));
						$this->db->update('cuticounter',array('kuota'=>$kuotacuti,'lastupdate'=>$tglSekarang,'diambil'=>0));
					}
				} else {
					$this->db->insert('cuticounter',array('idpelamar'=>$r->idpelamar,'kuota'=>$kuotacuti,'lastupdate'=>$tglSekarang,'idpengaturancuti'=>$idpengaturancuti));
				}
				break;
			}

// echo 'asd';
			if($difference->days>365) //masa kerja setahun atau lebih
			{
				$qcutinow = $this->db->get_where('cuticounter',array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti));
				if($q->num_rows()>0)
				{
					$rcutinow = $qcutinow->row();
				} else {
					$this->db->insert('cuticounter',array('idpelamar'=>$r->idpelamar,'kuota'=>$kuotacuti,'lastupdate'=>$tglSekarang,'idpengaturancuti'=>$idpengaturancuti));
				}
			} else {
				//kurang dari satu tahun
				// echo 'b<br>';

				// $effectiveDate = date('Y-m-d', strtotime("+ 3 months", strtotime($r->tglmasuk)));
				$effectiveDate = date('Y-m-d', strtotime("+ $startMonthcuti MONTHS", strtotime($r->tglmasuk)));
				// $effectiveDate = '-';

				// echo 'startMonthcuti:'.$startMonthcuti.' '.$r->tglmasuk.' '.$effectiveDate.'=='.$tglSekarang.' '.$this->nb_mois($r->tglmasuk,$effectiveDate).'<br>';

				if($effectiveDate==$tglSekarang)
				{
					//pas bulan ke tiga
					$qcutinow = $this->db->get_where('cuticounter',array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti));
					if($qcutinow->num_rows()<=0)
					{
						$this->db->insert('cuticounter',array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti,'kuota'=>($kuotacuti/$numrecycle)*$startMonthcuti,'lastupdate'=>$tglSekarang));
					}
				} else if($tglSekarang>$effectiveDate)
					{
			//			echo $tglSekarang.'>'.$effectiveDate;
						//lebih dari $startMonthcuti
						$qcutinow = $this->db->get_where('cuticounter',array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti));
						if($qcutinow->num_rows()>0)
						{
							//echo $tglSekarang.'>'.$effectiveDate;
							$rcutinow = $qcutinow->row();

							$jumlahBulan = $this->nb_mois($r->tglmasuk,$tglSekarang); //hitung udah berjalan berapa bulan
							$kuotaBaru = ($kuotacuti/$numrecycle)*$jumlahBulan;
// echo $kuotacuti.'/'.$numrecycle.' '.$kuotaBaru;
							$this->db->where(array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti));
							$this->db->update('cuticounter',array('kuota'=>$kuotaBaru,'lastupdate'=>$tglSekarang));
						} else {
							// echo $tglSekarang.'>'.$effectiveDate;
							$jumlahBulan = $this->nb_mois($r->tglmasuk,$tglSekarang); //hitung udah berjalan berapa bulan
							$this->db->insert('cuticounter',array('idpelamar'=>$r->idpelamar,'idpengaturancuti'=>$idpengaturancuti,'kuota'=>($kuotacuti/$numrecycle)*$jumlahBulan,'lastupdate'=>$tglSekarang));
						}
					} else {
						// echo $this->nb_mois($r->tglmasuk,$tglSekarang);
					}
			}
    	}
    }

    function xxx()
    {
    	$m = 9;
    	$effectiveDate = date('Y-m-d', strtotime("+ $m MONTHS", strtotime('2015-01-12')));
    	echo $effectiveDate;
    }

    function nb_mois($date1, $date2)
	{
		// $begin = new DateTime( $date1 );
	 //    $end = new DateTime( $date2 );
	 //    $end = $end->modify( '+1 month' );

	 //    $interval = DateInterval::createFromDateString('+ 1 month');

	 //    $period = new DatePeriod($begin, $interval, $end);
	 //    $counter = 0;
	 //    foreach($period as $dt) {
	 //        $counter++;
	 //    }

	 //    return $counter;
		// $date1 = '2000-01-25';
		// $date2 = '2010-02-20';

		$ts1 = strtotime($date1);
		$ts2 = strtotime($date2);

		$year1 = date('Y', $ts1);
		$year2 = date('Y', $ts2);

		$month1 = date('m', $ts1);
		$month2 = date('m', $ts2);

		$diff = (($year2 - $year1) * 12) + ($month2 - $month1);
		return $diff;
	}
}
 ?>