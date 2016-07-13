<?php

class m_lembur extends CI_Model {

	function data($stardate,$enddate,$idpelamar=null,$commit=false,$idpayroll=null)
	{
        $idcompany = $this->input->post('idcompany');
        $idjabatan = $this->input->post('idjabatan');
        $idorganisasi = $this->input->post('idorganisasi');

		$sqlpeg = "select a.idpelamar,a.namalengkap,bb.nik,c.namajabatan,e.namaorg,kodeorg,g.namalengkap as namaatasan,h.companyname
        from pelamar a 
        join calonpelamar bb ON a.idpelamar = bb.idpelamar
        LEFT  JOIN
        (
            SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
            FROM pekerjaan
            WHERE statuspergerakan='Disetujui'
            GROUP BY idpelamar
        ) as x ON a.idpelamar = x.idpelamar
        LEFT join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
        LEFT JOIN strukturjabatan b ON aa.idstrukturjabatan = b.idstrukturjabatan
        LEFT JOIN jabatan c ON b.idjabatan = c.idjabatan
        LEFT JOIN organisasi e ON b.idorganisasi = e.idorganisasi
        LEFT JOIN pelamar g ON aa.idpelamaratasan = g.idpelamar
        join company h ON a.idcompany = h.idcompany
        where a.display is null";

        if($idcompany!=null)
        {
            $sqlpeg.= " AND a.idcompany=$idcompany";
        } else {
            $sqlpeg.= " ".$this->m_data->whereCompany('a',false);
        }

        if($idjabatan!=null)
        {
            $sqlpeg.= " AND b.idjabatan=$idjabatan";
        } else {

        }

        if($idorganisasi!=null)
        {
            $sqlpeg.= " AND b.idorganisasi=$idorganisasi";
        } else {

        }

        if($idpelamar!=null)
        {
        	$sqlpeg.=" AND a.idpelamar=$idpelamar";
        }

        $qpeg = $this->db->query($sqlpeg);
// echo $sqlpeg;
        $this->load->model('kehadiran/m_vsuratlembur','model');
        $this->load->model('kompensasi/m_formulalembur');

        $data = array();
        $dataLembur = array();
        $num=0;
        foreach ($qpeg->result() as $r) {
           

            $jumlahjam = array();
            $upahlemburPajak = 0;
            $upahlemburNoPajak = 0;
            $upahlemburTambahPajak = 0;
            $upahlemburKurangPajak = 0;
            $harikerja=0;
            $harilibur=0;
            $hariraya=0;

            if($stardate!=null && $enddate!=null)
            {
                $wer = " and (tgllembur between '$stardate' and '$enddate')";
            } else {
                $wer = null;
            }

            $q = $this->db->query($this->model->query()." where a.idpelamar=".$r->idpelamar." $wer");
            //echo $this->db->last_query().'<hr>';
            if($q->num_rows()>0)
            {
                 $hari=0;
                 foreach ($q->result() as $rr) {
                   
                    $idformulalembur = $rr->idformulalembur;
                    // echo $idformulalembur.' ';
                    // echo 'waktu:'.$rr->mulailembur_jam.':'.$rr->mulailembur_menit.':00'.','.$rr->akhirlembur_jam.':'.$rr->akhirlembur_menit.':00<br>';
                    // $sumthetime = getTimeDiff($rr->mulailembur_jam.':'.$rr->mulailembur_menit.':00',$rr->akhirlembur_jam.':'.$rr->akhirlembur_menit.':00');
                    // echo 'sumthetime:'.$sumthetime.' '.intval($rr->durasi_istirahat);                   

                    //hitung upah
                    $ul = $this->m_formulalembur->hitunglembur($r->idpelamar,$rr->tgllembur,$idformulalembur);

                    // $jumlahjam[] = $rr->durasi_total;
                    $jumlahjam[] = $ul['totaljam'];

                    if($ul['kenapajak']=='YA')
                    {
                        if($ul['fungsipajak']=='Penambah')
                        {   
                            $upahlemburTambahPajak+= $ul['upahlembur']; 
                        } else if($ul['fungsipajak']=='Pengurang'){
                            $upahlemburKurangPajak+= $ul['upahlembur']; 
                        } else {
                            //netral
                        }
                        $upahlemburPajak += $ul['upahlembur']; 
                    } else {
                        $upahlemburNoPajak += $ul['upahlembur']; 
                    }

                    // echo $r->idpelamar.'-'.$idformulalembur.':'.($ul['upahlembur']).' ';

                    
                    $harikerja+= $ul['harikerja']; 
                    $harilibur+= $ul['harilibur']; 
                    $hariraya+= $ul['hariraya'];  
                    // echo ' upahlembur:'.$ul.'<br>';                

                    //end hitung upah
                    $hari++;

                     if($commit=='true')
                    {
                        $dlemburhistory = array(
                                'idpayroll'=>$idpayroll,
                                'idlembur'=>$rr->idlembur,
                                'jumlahjam'=>$sumthetime,
                                'upahlemburPajak'=>$upahlemburPajak,
                                'upahlemburNoPajak'=>$upahlemburNoPajak,
                                'harikerja'=>$harikerja,
                                'harilibur'=>$harilibur,
                                'hariraya'=>$hariraya,
                                'totallembur'=>$upahlemburPajak+$upahlemburNoPajak
                        );
                        $this->db->insert('lemburhistory',$dlemburhistory);
                    }

                    
                }
                
                // print_r($jumlahjam);
                // $data['jumlahjam'] = jumlahjam(sumTimes($jumlahjam));
                $data['jumlahjam'] = sumTimesArray($jumlahjam);
                $data['jumlahhari'] = $hari;
                $data['upahlemburPajak'] = $upahlemburPajak;
                $data['upahlemburNoPajak'] = $upahlemburNoPajak;
                $data['upahlemburTambahPajak'] = $upahlemburTambahPajak;
                $data['upahlemburKurangPajak'] = $upahlemburKurangPajak;
                $data['totallembur'] =   $upahlemburPajak+$upahlemburNoPajak;
                $data['harikerja'] = $harikerja;
                $data['harilibur'] = $harilibur;
                $data['hariraya'] = $hariraya;
                $data['namalengkap'] = $r->namalengkap;
                $data['nik'] = $r->nik;
                $data['namajabatan'] = $r->namajabatan;
                $data['namaorg'] = $r->namaorg;
                $data['kodeorg'] = $r->kodeorg;
                $data['namaatasan'] = $r->namaatasan;
                $data['companyname'] = $r->companyname;

                // echo $data['totallembur'].' ';
                // print_r($data);
                // array_push($data,$dataLembur);
                $dataLembur[] = $data;
                unset($data);
                $num++;
            } else {
                // echo $this->db->last_query().'<hr>';
            }
            // echo $this->db->last_query();
          // print_r($data);
        }   
        return array('num'=>$num,'data'=>$dataLembur);
	}
}
?>