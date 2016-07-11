<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class ptk extends MY_Controller {

    public function index() {
        
    }

    function clearFormKTK()
    {
    	//apus temporarydata
    	$dwer = array(
    			'idcompany'=>$this->session->userdata('idcompany'),
    			'userin'=>$this->session->userdata('username'),
    			'status'=>'temporary'
    		);
    	$this->db->where($dwer);
    	$this->db->delete('perencanaantk');
    }

    function updateGridFormPerencanaanTK()
    {
    	$dataGrid = json_decode($this->input->post('dataGrid'));
    	$tahun = $this->input->post('tahun');
    	$idcompany = $this->m_data->getID('company', 'companyname', 'idcompany', $this->input->post('companyname'));
        $idcompany = $this->input->post('companyname');

    	foreach ($dataGrid as $key => $value) {
    		$dwhere = array(
    				'idperencanaantk'=>$value->idperencanaantk
    			);
    		if(abs($value->revisi)==0)
			{
				$jumlahrevisi = 0;
			} else if($value->revisi<0)
    		{
    			// echo $value->jumlah."-".abs($value->revisi);
    			$jumlahrevisi = $value->jumlah-abs($value->revisi);
    		} else {
    			$jumlahrevisi = $value->jumlah+$value->revisi;
    		}
    		$d = array(
    				'tahun' => $value->tahun,
		            'idcompany' => $value->idcompany,
		            'idjabatan' => $value->idjabatan,
		            'idorganisasi' => $value->idorganisasi,
		            'idlokasiorg' => $value->idlokasiorg,
		            'namabulan' => $value->namabulan,
		            'jumlah' => $value->jumlah,
		            'revisi' => $value->revisi,
		            'jumlahrevisi' => $jumlahrevisi,
		            'idjabatanatasan' => $value->idjabatanatasan
    			);
    		$this->db->where($dwhere);
    		$this->db->update('perencanaantk',$d);
    	}

    	//summary
    	$qsummary = $this->db->query("
    				select DISTINCT a.tahun,a.idcompany,b.companyname,c.jumlah,c.revisi,c.jumlahrevisi
					from perencanaantk a
					join company b ON a.idcompany = b.idcompany
					join (select tahun,idcompany,sum(jumlah) as jumlah,sum(revisi) as revisi,sum(jumlahrevisi) as jumlahrevisi
								from perencanaantk
								GROUP BY tahun,idcompany) c ON a.tahun = c.tahun and a.idcompany = c.idcompany
					where a.tahun =$tahun and a.idcompany=$idcompany
    		");
    	if($qsummary->num_rows()>0)
    	{
    		$r = $qsummary->row();
    		$jumlah = $r->jumlah;
    		$revisi = $r->revisi;
    		$jumlahrevisi = $r->jumlahrevisi;
    	} else {
    		$jumlah = 0;
    		$revisi = 0;
    		$jumlahrevisi = 0;
    	}

    	if ($this->db->affected_rows() === FALSE) {
            $json = array('success' => false, 'message' => 'Gagal','jumlah'=>$jumlah,'revisi'=>$revisi,'jumlahrevisi'=>$jumlahrevisi);
        } else {
            $json = array('success' => true, 'message' => '','jumlah'=>$jumlah,'revisi'=>$revisi,'jumlahrevisi'=>$jumlahrevisi);
        }

        echo json_encode($json);
    }

    function deletePTK()
    {
    	$this->db->where('idperencanaantk',$this->input->post('idperencanaantk'));
    	$this->db->delete('perencanaantk');

    	if ($this->db->affected_rows() === FALSE) {
            $json = array('success' => false);
        } else {
            $json = array('success' => true);
        }
        echo json_encode($json);
    }

    function setStatus()
    {
    	$this->db->trans_start();

    	$dataGrid = json_decode($this->input->post('dataGrid'));

    	foreach ($dataGrid as $key => $value) {
    		$dwhere = array(
    				'idperencanaantk'=>$value->idperencanaantk
    			);
    		$this->db->where($dwhere);
    		$this->db->update('perencanaantk',array('status'=>'saved'));
    	}

    	if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Data Perencanaan Tenaga Kerja Gagal Tersimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Data Perencanaan Tenaga Kerja Berhasil Tersimpan'));
        }
    }

    function getPerencanaan()
    {
		$tahun = $this->input->post('tahun');
		$idcompany = $this->input->post('idcompany');
		$namabulan = $this->input->post('namabulan');

		$field = array('idperencanaantk','levelname','kodelevel','kodejabatan','tahun','idcompany','idjabatan','idorganisasi','idlokasiorg','idjabatanatasan','namabulan','jumlah','revisi','jumlahrevisi','status','userin','usermod','companyname','companycode','kodeorg','kodebudgetorg','namaorg','namalokasi','namajabatan','namajabatanatasan');
		$query = "select a.idperencanaantk,g.levelname,g.kodelevel,e.kodejabatan,a.tahun,a.idcompany,a.idjabatan,a.idorganisasi,a.idlokasiorg,a.idjabatanatasan,a.namabulan,a.jumlah,a.revisi,a.jumlahrevisi,a.status,a.userin,a.usermod,b.companyname,b.companycode,c.kodeorg,c.kodebudgetorg,c.namaorg,d.namalokasi,e.namajabatan,f.namajabatan as namajabatanatasan
					from perencanaantk a
					join company b ON a.idcompany = b.idcompany
					join organisasi c ON a.idorganisasi = c.idorganisasi
					join lokasi_org d ON a.idlokasiorg = d.idlokasiorg
					join jabatan e ON a.idjabatan = e.idjabatan
					join jabatan f ON a.idjabatanatasan = f.idjabatan
					join level g ON e.idlevel = g.idlevel
					where a.tahun=$tahun and a.idcompany=$idcompany and namabulan='$namabulan' and a.display is null";
		$query = $this->db->query($query);
		$data = array();
		if ($query->num_rows() > 0)
		{
		   $row = $query->row_array(); 
		   foreach ($field as $key => $value) {
		   	 $data[$value] = $row[$value];
		   }
		   
		   if($row['revisi']==0)
		   	{
		   		$data['jumlahperencanaan'] = $row['jumlah'];
		   	} else if($row['revisi']<0)
		   {
		   	$data['jumlahperencanaan'] = $row['jumlah']-abs($row['revisi']);
		   } else {
		   	$data['jumlahperencanaan'] = $row['jumlah']+$row['revisi'];
		   }
		   
		   $success=true;
		} else {
			$success=false;
		}

		echo json_encode(array('success' => $success, 'data' => $data));
    }

    function getNumPerencanaan()
    {
        $tahun = $this->input->post('tahun');
        $idcompany = $this->m_data->getID('company', 'companyname', 'idcompany', $this->input->post('companyname'));
        $namabulan = $this->input->post('namabulan');
        $idlokasiorg = $this->input->post('idlokasiorg');
        $idstrukturjabatan = $this->input->post('idstrukturjabatan');

        $this->load->model('personalia/m_pekerjaan');
        $numemployee = $this->m_pekerjaan->getNumEmployee($idstrukturjabatan,$idcompany);

        $qsj = $this->db->get_where('strukturjabatan',array('idstrukturjabatan'=>$idstrukturjabatan))->row();

        $query = "select jumlahrevisi
                    from perencanaantk a
                    where a.tahun=$tahun and a.idcompany=$idcompany and namabulan='$namabulan' 
                    and idlokasiorg = $idlokasiorg and idjabatan = ".$qsj->idjabatan." and idorganisasi = ".$qsj->idorganisasi."
                    and idjabatanatasan = ".$qsj->idjabatanatasan." and a.display is null";
                    // echo $query;
        $query = $this->db->query($query);
        if ($query->num_rows() > 0)
        {
            $r = $query->row();
            $num = $r->jumlahrevisi;
        } else {
            $num = false;
        }
        echo json_encode(array('success' =>true, 'num' => $num,'numemployee'=>$numemployee,'selisih'=>$numemployee-$num));
    }

    function savePermintaan()
    {
         $startmonth = intval(ambilNoBulan($this->input->post('namabulan')));
         $startmonthValidasi = $startmonth;

         $this->db->trans_start();
         // echo $startmonth.' ';
         while ($startmonthValidasi <= 12) {
             // echo $startmonth.' ';

             if($startmonthValidasi<10)
             {
                $nobulan = '0'.$startmonthValidasi;
             } else {
                $nobulan = $startmonthValidasi;
             }

             $namabulan = ambilBulan($nobulan);

             // $idlokasiorg = $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'),true);
             $idlokasiorg = $this->input->post('namalokasi');

             $idjabatan = $this->input->post('idjabatan');
             $qjab = $this->db->get_where('jabatan',array('idjabatan'=>$idjabatan))->row();

             $qlok = $this->db->get_where('lokasi_org',array('idlokasiorg'=>$idlokasiorg))->row();

            //cek dulu
            $qcek = $this->db->get_where('perencanaantk',array('display'=>null,'nobulan'=>"$nobulan",'idjabatan'=>$idjabatan,'idlokasiorg'=>$idlokasiorg,'tahun'=>$this->input->post('tahun')));
            // echo $this->db->last_query().' ';
            if($qcek->num_rows()>0)
            {
                // echo $this->db->last_query();
                echo json_encode(array('success' => false, 'message' => 'Data perencanaan untuk jabatan '.$qjab->namajabatan.' di '.$qlok->namalokasi.' '.$namabulan.' '.$this->input->post('tahun').' sudah ada di dalam database'));
                exit;
            }
             $startmonthValidasi++;
        }

         while ($startmonth <= 12) {
             // echo $startmonth.' ';

             if($startmonth<10)
             {
                $nobulan = '0'.$startmonth;
             } else {
                $nobulan = $startmonth;
             }

             $namabulan = ambilBulan($nobulan);

             // $idlokasiorg = $this->m_data->getID('lokasi_org', 'namalokasi', 'idlokasiorg', $this->input->post('namalokasi'),true);
             $idlokasiorg = $this->input->post('namalokasi');

             // $idcompany = $this->m_data->getID('company', 'companyname', 'idcompany', $this->input->post('companyname'));
             $idcompany = $this->input->post('companyname');

            $revisi = $this->input->post('revisi');
            $jumlah = $this->input->post('jumlah');
            $jumlah2 = $jumlah;

            if (strpos($revisi,'-') !== false) {
            // echo 'true';
            $jumlahrevisi = $jumlah - intval(str_replace('-', '', $revisi));
            } else {
                $jumlahrevisi = $jumlah + $revisi;
            }

             $data = array(
                'idperencanaantk' => $this->input->post('idperencanaantk') == '' ? $this->m_data->getSeqVal('seq_perencanaantk') : $this->input->post('idperencanaantk'),
    //            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
                'tahun' => $this->input->post('tahun'),
                'idcompany' => $idcompany,
                // 'startdate' => backdate2_reverse($this->input->post('startdate')),
                // 'enddate' => backdate2_reverse($this->input->post('enddate')),
                'idjabatan' => $this->input->post('idjabatan'),
                // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
                'idorganisasi' => $this->input->post('idorganisasi'),
                'idlokasiorg' => $idlokasiorg,
                'namabulan' => $namabulan,
                'jumlah' => $jumlah,
                'revisi' => $revisi,
                'jumlahrevisi' => $jumlah2,
                'idjabatanatasan' => $this->input->post('idjabatanatasan'),
                'status' => 'temporary',
                'nobulan'=>$nobulan
            );
            $this->db->insert('perencanaantk',$data);
            // echo $this->db->last_query().'            <br>';
            $startmonth++;
         }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal menambahkan data'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses menambahkan data'));
        }
         
    }

    function importPTK()
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

             // echo count($val[0]);
            // if(count($val[0])!=7)
            // {
            //     $status = false;
            //     $message = 'Format template file import perencanaan tidak sesuai/salah';
            //     $valid = array('status' => $status, 'message' => $message);
            //     echo json_encode($valid);
            //     exit;
            // }

            $start = 1;
            while (isset($val[$start])) {
                $d = $val[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasiPTK($d);
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

            // $start-=1;
            if ($oke) {
                $this->db->trans_begin();

                $start = 1;

                $total = 0;
                while (isset($val[$start])) {

                    $d = $val[$start];
                    if($d['0']!='')
                    {
                        // $qcmp = $this->db->get_where('company', array('companycode' => "".$d['1']."",'display'=>null))->row();
                        $this->db->select('idcompany,parent');
                        $qcmp = $this->db->get_where('company', array('companycode' => "".$d['1']."",'display'=>null))->row();

                        // $qjab = $this->db->get_where('jabatan', array('kodejabatan' => $d['4'],'display'=>null,'idcompany'=>$this->session->userdata('idcompany')))->row();

                        $qjab = $this->db->query("select a.idjabatan,a.idorganisasi,a.idjabatanatasan
                                                    from strukturjabatan a
                                                    join jabatan b ON a.idjabatan = b.idjabatan
                                                    where b.kodejabatan='".$d['4']."' and (b.idcompany = ".$qcmp->idcompany." OR b.idcompany = ".$qcmp->parent.") and b.display is null")->row();

                        //lokasi
                        $this->db->select('idcompany,parent');
                        $qemp = $this->db->get_where('company', array('companycode' => "".$d['1']."",'display'=>null))->row();

                         // $q = $this->db->get_where('lokasi_org', array('kodebudgelokasi' => $d['5'],'display'=>null,'idcompany'=>$qemp->idcompany));
                        $qlok = $this->db->query("SELECT kodebudgelokasi,idlokasiorg FROM lokasi_org WHERE kodebudgelokasi = '".$d['5']."' AND display IS NULL AND (idcompany = $qemp->idcompany OR idcompany = $qemp->parent)")->row();

                        // $qlok = $this->db->get_where('lokasi_org', array('kodebudgelokasi' => $d['5'],'display'=>null,'idcompany'=>$this->session->userdata('idcompany')))->row();
                        //end lokasi

                        if(intval($d['3'])<10)
                         {
                            $nobulan = '0'.intval($d['3']);
                         } else {
                            $nobulan = $d['3'];
                         }

                         $namabulan = ambilBulan($nobulan);

                        $data = array(
                            "tahun" => intval($d['1']),
                            "idcompany" => $qcmp->idcompany,
                            "idjabatan" => $qjab->idjabatan,
                            "idorganisasi" => $qjab->idorganisasi,
                            "idlokasiorg" => $qlok->idlokasiorg,
                            "idjabatanatasan" => $qjab->idjabatanatasan,
                            "namabulan" =>$namabulan,
                            "jumlah" => $d['6'],
                            "revisi" => 0,
                            "jumlahrevisi" => 0,
                            "status" =>'saved',
                            "userin" => $this->session->userdata('username'),
                            "usermod" => $this->session->userdata('username'),
                            "datein" => date('Y-m-d H:m:s'),
                            "datemod" => date('Y-m-d H:m:s'),
                            // "display" int4,
                            // "idperencanaantk" int4 DEFAULT nextval('seq_perencanaantk'::regclass) NOT NULL,
                            "nobulan" => $nobulan,
                            "idupload" => $idupload
                        );
                        
                        $this->db->insert('perencanaantk',$data);

                        $start++;
                    }
                }

                $start-=1;
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $start . ' Data Perencanaan Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $start . ' Data Perencanaan Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
    }

    function validasiPTK($d,$update=false)
    {
         $status = true;
      
        $message = 'valid';


        ///////////////////////////////////////
        if($d['2']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tahun Kebutuhan tidak boleh kosong';
        } 
        // else {
        //      $q = $this->db->get_where('unit', array('idunit' => $d['2'],'display'=>null));
        //     if ($q->num_rows() > 0) {
        //     } else {
        //         $status = false;
        //         $message = 'Error data NO ' . $d['0'] . ': Kode Unit: '.$d['2'].' tidak ada di database';
        //     }
        // }
        /////////////////////////////////////////

        if($d['3']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Bulan kebutuhan tidak boleh kosong';
        }
        /////////////////////////////////////////

        if(!isset($d['4']) || $d['4']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Jabatan tidak boleh kosong';
        } else {
            $this->db->select('idcompany');
            $qemp = $this->db->get_where('company', array('companycode' => "".$d['1']."",'display'=>null))->row();

             $q = $this->db->get_where('jabatan', array('kodejabatan' => $d['4'],'display'=>null,'idcompany'=>$qemp->idcompany));
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Jabatan: '.$d['4'].' tidak ada di database';
            }
        }
        ////////////////////////////////////////////

        if($d['5']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Lokasi tidak boleh kosong';
        } else {
            $this->db->select('idcompany,parent');
            $qemp = $this->db->get_where('company', array('companycode' => "".$d['1']."",'display'=>null))->row();

             // $q = $this->db->get_where('lokasi_org', array('kodebudgelokasi' => $d['5'],'display'=>null,'idcompany'=>$qemp->idcompany));
            $q = $this->db->query("SELECT kodebudgelokasi FROM lokasi_org WHERE kodebudgelokasi = '".$d['5']."' AND display IS NULL AND (idcompany = $qemp->idcompany OR idcompany = $qemp->parent)");
            if ($q->num_rows() > 0) {
            } else {
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Lokasi: '.$d['5'].' tidak ada di database';
            }
        }
        //////////////////////////////////////////////
        if(!isset($d['6']) || $d['6']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Jumlah kebutuhan tenaga kerja tidak boleh kosong';
           
        } else {
            if (strpos($d['6'],'.') !== false) {
               $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Jumlah kebutuhan tenaga kerja tidak boleh ada tanda titik(.)';
            } else if (strpos($d['6'],',') !== false) {
               $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Jumlah kebutuhan tenaga kerja tidak boleh ada tanda comma(,)';
            }
        }

        ///////////

         if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Kode Perusahaan tidak boleh kosong';
        }  else {
            $code = $d['1'];
            $qemp = $this->db->get_where('company', array('companycode' => "".$code."",'display'=>null));
            if($qemp->num_rows()<=0)
            {
                $remp = $qemp->row();
                $idcompany = $remp->idcompany;
                $status = false;
                $message = 'Error data NO ' . $d['0'] . ': Kode Perusahaan tidak ada di dalam database ';
            } 
        }
       
        return array('status' => $status, 'message' => $message);
    }

}
?>