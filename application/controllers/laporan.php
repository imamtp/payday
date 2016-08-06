<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class laporan extends MY_Controller {

    public function index() {
        
    }
    
    function periode($sd,$nd)
    {
        $sd = str_replace("%20", " ", $sd);
        $nd = str_replace("%20", " ", $nd);
        $periode = $sd==$nd ? $sd : $sd.' s/d '.$nd;
        return $periode;
    }

    function options($option)
    {
        $data = array();
        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }
        $data['option'] = $option;
        return $data;
    }

    function datapekerjaan($idcompany,$startdate=null,$enddate=null,$keaktifan=null,$option='excel')
    {
        $this->load->model('personalia/m_datapekerjaan','model');


        //  $query = "select " . $this->model->selectField() . "
        //             from " . $this->model->tableName()." a
        //             join v_detailkaryawan b ON a.idpelamar = b.idpelamar
        //             join calonpelamar c ON a.idpelamar = c.idpelamar";       

        // $query.= ' WHERE a.display is null ';

      

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = $this->model->query().' WHERE TRUE AND '.$this->model->whereQuery();

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        // if($idjabatan!='null')
        // {
        //     $query.=" AND b.idjabatan=$idjabatan";
        // }

        //  if($idorganisasi!='null')
        // {
        //     $query.=" AND b.idorganisasi=$idorganisasi";
        // }

        if($enddate!='null' && $startdate!='null')
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        // if($startterminatedate!=null && $endterminatedate!=null)
        // {
        //     $startterminatedate = backdate2_reverse($startterminatedate);
        //     $endterminatedate = backdate2_reverse($endterminatedate);
        //     $query.=" AND tglberakhir BETWEEN '$startterminatedate' AND '$endterminatedate'";
        // }

         $datenow = gmdate('Y-m-d');
         
         if($keaktifan=='true')
         {
             $query .= " AND a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir) ";
         } else {
             $query .= " AND a.display is null";
        }

        $query .= " ".$orderby;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        $this->load->model('personalia/m_pekerjaan');
        $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/datapekerjaan', $data,true);


        $filename = "data_pekerjaan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function perencanaantk($tahun=null,$idcompany=null,$namabulan=null,$idjabatan=null,$idorganisasi=null,$option=null)
    {
        $this->load->model('ptk/m_datarawptk','model');

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = $this->model->query() ." WHERE a.display is null ";

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($tahun!='null')
        {
            $query.=" AND a.tahun=$tahun";
        }

        if($namabulan!='null')
        {
            $query.=" AND a.namabulan='$namabulan'";
        }

        if($idorganisasi!='null')
        {
            $query.=" AND a.idorganisasi=$idorganisasi";
        }

        if($idjabatan!='null')
        {
            $query.=" AND a.idjabatan=$idjabatan";
        }


        $query .= " ".$orderby;
        
        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );

        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/perencanaantk', $data,true);


        $filename = "data_perencanaantk.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datastrukturjabatan($idcompany=null,$idorganisasi=null,$startdate=null,$enddate=null,$option='excel')
    {
        $this->load->model('desainorg/m_strukturjabatan','model');

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = $this->model->query() ." WHERE a.display is null ". $orderby;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }
// echo $query;
        if($idorganisasi!='null')
        {
            $query.=" AND a.idorganisasi=$idorganisasi";
        }

        if($startdate!='' && $enddate!='')
        {
            $werdate = " AND (a.startdate>='$startdate' AND a.enddate<='$enddate') ";
        } else if($startdate!='' && $enddate=='')
            {
                $werdate = " AND a.startdate='$startdate' ";
            }  else if($enddate!='' && $startdate=='')
                {
                    $werdate = " AND a.enddate='$enddate' ";
                } else {
                        $werdate = null;
                    }

        $query.= $werdate;

        $query .= " ".$orderby;
// echo $query;
// exit;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );

        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/strukturjabatan', $data,true);


        $filename = "data_strukturjabatan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datajabatan($idcompany=null,$idjabatan=null,$startdate=null,$enddate=null,$option='excel')
    {
        $this->load->model('desainorg/m_jabatan','model');

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = $this->model->query() ." WHERE a.display is null ". $orderby;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($idjabatan!='null')
        {
            $query.=" AND a.idjabatan=$idjabatan";
        }

        if($startdate!='' && $enddate!='')
        {
            $werdate = " AND (a.startdate>='$startdate' AND a.enddate<='$enddate') ";
        } else if($startdate!='' && $enddate=='')
            {
                $werdate = " AND a.startdate='$startdate' ";
            }  else if($enddate!='' && $startdate=='')
                {
                    $werdate = " AND a.enddate='$enddate' ";
                } else {
                        $werdate = null;
                    }

        $query.= $werdate;

        $query .= " ".$orderby;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        $this->load->model('desainorg/m_jabatan');
        $data['m_jabatan'] = $this->m_jabatan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/datajabatan', $data,true);


        $filename = "data_jabatan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datakaryawan($idcompany,$idjabatan,$idorganisasi,$startdate=null,$enddate=null,$startterminatedate=null,$endterminatedate=null,$status=null,$option='excel')
    {
        $this->load->model('personalia/m_VDataKaryawangrid','model');


        //  $query = "select " . $this->model->selectField() . "
        //             from " . $this->model->tableName()." a
        //             join v_detailkaryawan b ON a.idpelamar = b.idpelamar
        //             join calonpelamar c ON a.idpelamar = c.idpelamar";       

        // $query.= ' WHERE a.display is null ';

         $wer =" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

         $datenow = gmdate('Y-m-d');
         
         if($status=='true')
         {
            $wer .= " AND a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir OR '$datenow' between aaa.tglmasuk and aaa.tglberakhir) $wer AND bbb.idpergerakan!=128";
         } else {
            // $wer = str_replace("WHERE TRUE AND", "WHERE TRUE", $wer);
            // return "$wer";
            $wer .= " AND a.display is null $wer";
        }

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = $this->model->query()." where true ".$wer;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($idjabatan!='null')
        {
            $query.=" AND e.idjabatan=$idjabatan";
        }

         if($idorganisasi!='null')
        {
            $query.=" AND e.idorganisasi=$idorganisasi";
        }

        if($enddate!='null' && $startdate!='null')
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        if($startterminatedate!='null' && $endterminatedate!='null')
        {
            $startterminatedate = backdate2_reverse($startterminatedate);
            $endterminatedate = backdate2_reverse($endterminatedate);
            $query.=" AND tglberakhir BETWEEN '$startterminatedate' AND '$endterminatedate'";
        }

        $query .= " ".$orderby;
        
        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        // $this->load->model('personalia/m_pekerjaan');
        // $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/datakaryawan', $data,true);


        $filename = "data_karyawan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function dataidentitas($idcompany,$idjabatan,$idorganisasi,$startdate=null,$enddate=null,$startterminatedate=null,$endterminatedate=null,$status=null,$option='excel')
    {
        $this->load->model('personalia/m_VDataKaryawangrid','model');
      
        $wer =" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

        $datenow = gmdate('Y-m-d');
         
        if($status=='true')
        {
            $wer .= " AND a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir) $wer AND bb.idpergerakan!=128";
        } else {
            $wer .= " AND a.display is null $wer";
        }

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = "select a.idpelamar,a.idcompany,e.idorganisasi,e.idjabatan,a.namalengkap,aa.idpekerjaan,k.statuscalon,a.display,a.idcompany,aa.tglmasuk,aa.tglberakhir,ni,nik,tgllahir,sexname,noktp,notelp,nohandphone,statuscalon,a.status,kekaryaanname,a.display,f.companyname,
                    nomorktp,masberlakuktp,nomorsim1,jenissim1,masaberlakusim1,nomorsim2,jenissim2,masaberlakusim2,nomorsim3,jenissim3,masaberlakusim3,nomorpasport,masaberlakupassport,bb.idpergerakan
                    from pelamar a
                    LEFT JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    left join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
					join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                    LEFT join (select nik,idpelamar,statuscalon 
									from calonpelamar
										where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                    LEFT join sextype c ON a.idsex = c.idsex
                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                    left join company f ON a.idcompany = f.idcompany";
        $query .= " left join identitas g ON a.idpelamar = g.idpelamar";
        $query .=" where true ".$wer;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($idjabatan!='null')
        {
            $query.=" AND e.idjabatan=$idjabatan";
        }

         if($idorganisasi!='null')
        {
            $query.=" AND e.idorganisasi=$idorganisasi";
        }

        if($enddate!='null' && $startdate!='null')
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND aa.tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        if($startterminatedate!='null' && $endterminatedate!='null')
        {
            $startterminatedate = backdate2_reverse($startterminatedate);
            $endterminatedate = backdate2_reverse($endterminatedate);
            $query.=" AND aa.tglberakhir BETWEEN '$startterminatedate' AND '$endterminatedate'";
        }

        $query .= " ".$orderby;
// echo $query;
// exit;
        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        // $this->load->model('personalia/m_pekerjaan');
        // $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/dataidentitas', $data,true);


        $filename = "data_identitas.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datakeluarga($idcompany,$idjabatan,$idorganisasi,$startdate=null,$enddate=null,$startterminatedate=null,$endterminatedate=null,$status=null,$option='excel')
    {
        $this->load->model('personalia/m_VDataKaryawangrid','model');
      
        $wer =" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

        $datenow = gmdate('Y-m-d');
         
        if($status=='true')
        {
            $wer .= " AND a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir) $wer AND bb.idpergerakan!=128";
        } else {
            $wer .= " AND a.display is null $wer";
        }

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = "select a.idpelamar,a.idcompany,e.idorganisasi,e.idjabatan,a.namalengkap,aa.idpekerjaan,k.statuscalon,a.display,a.idcompany,aa.tglmasuk,aa.tglberakhir,statuscalon,a.status,kekaryaanname,a.display,f.companyname,
                    h.sexname,i.namaagama,j.namajenjang,g.pekerjaan,g.namalengkap as namalengkapkel,namahubkeluarga,bb.idpergerakan,k.nik
                    from pelamar a
                    LEFT JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    left join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan					
					join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                    LEFT join (select nik,idpelamar,statuscalon 
									from calonpelamar
										where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                    LEFT join sextype c ON a.idsex = c.idsex
                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                    left join company f ON a.idcompany = f.idcompany";
        $query .= " left join keluarga g ON a.idpelamar = g.idpelamar
                    LEFT join sextype h ON g.idsex = h.idsex
                    LEFT join agama i ON g.idagama = i.idagama
                    LEFT join jenjangpendidikan j ON g.idjenjangpendidikan = j.idjenjangpendidikan
                    LEFT join hubkeluarga l ON g.idhubkeluarga = l.idhubkeluarga
                    ";
        $query .=" where true ".$wer;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($idjabatan!='null')
        {
            $query.=" AND e.idjabatan=$idjabatan";
        }

         if($idorganisasi!='null')
        {
            $query.=" AND e.idorganisasi=$idorganisasi";
        }

        if($enddate!='null' && $startdate!='null')
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND aa.tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        if($startterminatedate!='null' && $endterminatedate!='null')
        {
            $startterminatedate = backdate2_reverse($startterminatedate);
            $endterminatedate = backdate2_reverse($endterminatedate);
            $query.=" AND aa.tglberakhir BETWEEN '$startterminatedate' AND '$endterminatedate'";
        }

        $query .= " ".$orderby;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        // $this->load->model('personalia/m_pekerjaan');
        // $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/datakeluarga', $data,true);


        $filename = "data_keluarga.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datapendidikan($idcompany,$idjabatan,$idorganisasi,$startdate=null,$enddate=null,$startterminatedate=null,$endterminatedate=null,$status=null,$option='excel')
    {
        $this->load->model('personalia/m_VDataKaryawangrid','model');
      
         $wer =" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

        $datenow = gmdate('Y-m-d');
         
        if($status=='true')
        {
            $wer .= " AND a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir) $wer AND bb.idpergerakan!=128";
        } else {
            $wer .= " AND a.display is null $wer";
        }

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = "select a.idpelamar,a.idcompany,e.idorganisasi,e.idjabatan,a.namalengkap,aa.idpekerjaan,k.statuscalon,a.display,a.idcompany,aa.tglmasuk,aa.tglberakhir,statuscalon,a.status,kekaryaanname,a.display,f.companyname,
                    g.fakultas,g.jurusan,g.tahunmulai,g.tahunselesai,g.namainstansi,h.namajenjang,bb.idpergerakan,k.nik
                    from pelamar a
                    LEFT JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    left join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
					join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                     LEFT join (select nik,idpelamar,statuscalon 
									from calonpelamar
										where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                    LEFT join sextype c ON a.idsex = c.idsex
                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                    left join company f ON a.idcompany = f.idcompany";
        $query .= " left join pendidikan g ON a.idpelamar = g.idpelamar
                    left join jenjangpendidikan h ON g.idjenjangpendidikan = h.idjenjangpendidikan";
        $query .=" where true ".$wer;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($idjabatan!='null')
        {
            $query.=" AND e.idjabatan=$idjabatan";
        }

         if($idorganisasi!='null')
        {
            $query.=" AND e.idorganisasi=$idorganisasi";
        }

        if($enddate!='null' && $startdate!='null')
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND aa.tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        if($startterminatedate!='null' && $endterminatedate!='null')
        {
            $startterminatedate = backdate2_reverse($startterminatedate);
            $endterminatedate = backdate2_reverse($endterminatedate);
            $query.=" AND aa.tglberakhir BETWEEN '$startterminatedate' AND '$endterminatedate'";
        }

        $query .= " ".$orderby;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        // $this->load->model('personalia/m_pekerjaan');
        // $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/datapendidikan', $data,true);


        $filename = "data_pendidikan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datapelatihan($idcompany,$idjabatan,$idorganisasi,$startdate=null,$enddate=null,$startterminatedate=null,$endterminatedate=null,$status=null,$option='excel')
    {
        $this->load->model('personalia/m_VDataKaryawangrid','model');
      
        $wer =" AND (k.statuscalon='Disetujui' OR a.status='Belum Ada Status' OR a.status='Disetujui' OR a.status is null)";

        $datenow = gmdate('Y-m-d');
         
        if($status=='true')
        {
            $wer .= " AND a.display is null and ('$datenow' between aa.tglmasuk and aa.tglberakhir) $wer AND bb.idpergerakan!=128";
        } else {
            $wer .= " AND a.display is null $wer";
        }

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = "select a.idpelamar,a.idcompany,e.idorganisasi,e.idjabatan,a.namalengkap,aa.idpekerjaan,k.statuscalon,a.display,a.idcompany,aa.tglmasuk,aa.tglberakhir,statuscalon,a.status,kekaryaanname,a.display,f.companyname,
                    g.namapelatihan,g.jenispelatihan,g.tglpelatihan,g.nosertifikat,g.jenissertifikat,bb.idpergerakan,k.nik
                    from pelamar a
                    LEFT JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    left join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
					join pergerakanpersonil bb ON aa.idpergerakanpersonil = bb.idpergerakanpersonil
                     LEFT join (select nik,idpelamar,statuscalon 
									from calonpelamar
										where statuscalon='Disetujui') k ON a.idpelamar = k.idpelamar
                    LEFT join sextype c ON a.idsex = c.idsex
                    left join kekaryaan d ON aa.idkekaryaan = d.idkekaryaan
                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                    left join company f ON a.idcompany = f.idcompany";
        $query .= " left join pelatihan g ON a.idpelamar = g.idpelamar";
        $query .=" where true ".$wer;

        if($idcompany!='null')
        {
            $query.=" AND a.idcompany=$idcompany";
        } else {
             $query.=$this->m_data->whereReportCompany();
        }

        if($idjabatan!='null')
        {
            $query.=" AND e.idjabatan=$idjabatan";
        }

         if($idorganisasi!='null')
        {
            $query.=" AND e.idorganisasi=$idorganisasi";
        }

        if($enddate!='null' && $startdate!='null')
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND aa.tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        if($startterminatedate!='null' && $endterminatedate!='null')
        {
            $startterminatedate = backdate2_reverse($startterminatedate);
            $endterminatedate = backdate2_reverse($endterminatedate);
            $query.=" AND aa.tglberakhir BETWEEN '$startterminatedate' AND '$endterminatedate'";
        }

        $query .= " ".$orderby;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>$option
        );
        // $this->load->model('personalia/m_pekerjaan');
        // $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;
        
        // echo $query;

        $html = $this->load->view('tplcetak/datapelatihan', $data,true);


        $filename = "data_pelatihan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }

    function datapergerakan($status=null,$startdate=null,$enddate=null)
    {
        $this->load->model('personalia/m_pergerakanpersonil','model');
      
        $wer = $this->m_data->whereCompany('b',false);

        $orderby = $this->model->orderBy() != "" ? "ORDER BY " . $this->model->orderBy() : null;
        $query = $this->model->query()." where true $wer";

        // if($idcompany!='null')
        // {
        //     $query.=" AND a.idcompany=$idcompany";
        // } else {
        //      $query.=$this->m_data->whereCompany();
        // }

        // if($idjabatan!='null')
        // {
        //     $query.=" AND e.idjabatan=$idjabatan";
        // }

        //  if($idorganisasi!='null')
        // {
        //     $query.=" AND e.idorganisasi=$idorganisasi";
        // }
        

        if($enddate!=null && $startdate!=null)
        {
            $tglmasuk1 = backdate2_reverse($startdate);
            $tglmasuk2 = backdate2_reverse($enddate);
            $query.=" AND r.tglmasuk BETWEEN '$tglmasuk1' AND '$tglmasuk2'";
        }

        if($status!=null && $status!='null')
        {
            $query .=" AND a.statuspergerakan='$status' $wer";
        }

        $query .= " ".$orderby;

        $data = array(
            'data'=>$this->db->query($query),
            'option'=>'excel'
        );
        $this->load->model('personalia/m_pekerjaan');
        $data['m_pekerjaan'] = $this->m_pekerjaan; 
        $data['fontsize'] = 9;

        // $this->load->view('tplcetak/datapergerakan', $data);
        // return true;

        $html = $this->load->view('tplcetak/datapergerakan', $data,true);


        $filename = "data_pergerakan.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo $html;
    }


    function recursive($idunit, $startdate, $enddate, $idaccount,$idaccounttype) {
        return $this->checkChild($idunit, $startdate, $enddate, $idaccount,$idaccounttype);
    }

    function checkChild($idunit, $startdate, $enddate, $idaccount,$idaccounttype) {

        $sql = "select idaccount,accnumber,accname,balance,idpos
                    from clossing
                    where ".$this->fetchWhereUnit($idunit)." and idaccounttype=$idaccounttype and idparent=$idaccount
                    AND display ISNULL and active=TRUE AND
                    dateclose between '$startdate' and '$enddate'";
//        echo $sql,'<hr>';
//        exit;
        $qkas = $this->db->query($sql);
        if ($qkas->num_rows() > 0) {
            $arr = array();
            $i = 0;
            $total=0;
            foreach ($qkas->result() as $r) {
                $arr[$i]['accnumber'] = $r->accnumber;
                $arr[$i]['accname'] = $r->accname;
                $arr[$i]['balance'] = $r->balance;
                $arr[$i]['idpos'] = $r->idpos;
//                echo $r->accname;
//                exit;
                $recursive = $this->recursive($idunit, $startdate, $enddate, $r->idaccount,$idaccounttype);
                $arr[$i]['child'] = $recursive['data'];
                $i++;
                $total+=$r->balance+$recursive['total'];
            }
            return array('data'=>$arr,'total'=>$total);
        } else {
            return array('data'=>'false','total'=>0);
        }
    }

    function getDataNeraca($idunit = null, $startdate = null, $enddate = null, $idaccounttype) {


        $sql = "select a.idaccount,a.accnumber,a.accname,b.balance,a.idpos
                    from account a
                    join clossing b ON a.idaccount = b.idaccount
                    where ".$this->fetchWhereUnit($idunit,'a')." and a.idaccounttype=$idaccounttype and a.idpos=1
                    AND a.display ISNULL and a.active=TRUE AND
                    b.dateclose between '$startdate' and '$enddate'";
                    // if($idaccounttype==19)
                    // {
                        // echo $sql;   
                    //     exit;
                    // }
        $qkas = $this->db->query($sql);
        
        $arr = array();
        $i = 0;
        $total=0;
        foreach ($qkas->result() as $r) {
            // print_r($arr[$i]);
            $arr[$i]['accnumber'] = $r->accnumber;
            $arr[$i]['accname'] = $r->accname;
            $arr[$i]['balance'] = $r->balance;
            $arr[$i]['idpos'] = $r->idpos;
//            echo $r->accname;
            $child = $this->checkChild($idunit, $startdate, $enddate, $r->idaccount,$idaccounttype);
            // print_r($child);
            $arr[$i]['child'] = $child['data'];
            // if($idaccounttype==12)
            // {
            //     echo $r->accname.'-'.$r->balance.'<br>';
            // }
            $i++;
            // if($r->child=='false')
            // {
                $total+=$child['total'];
            // }
        }
        return array('data'=>$arr,'total'=>$total);
    }

    function neraca($idunit,$sd,$nd,$option=null) {
        
        $this->load->helper('report');
        $this->load->model('m_laporan');
        
        //ubah tanggal ke format date
        $startdateArr = explode("%20", $sd);
        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddateArr = explode("%20", $nd);
        $enddate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-'.  lastday(getNoMonth($enddateArr[0]), $enddateArr[1]);
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $unitarr = explode(",", $idunit);
        $i=0;
        $data['option'] = $option;
        foreach ($unitarr as $key => $value) {

                $namaunit = $this->fetchUnit($value);
                $idunit = $value;

                $kas = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 19);
                // print_r($kas);
               // exit;
                $bank = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 1);
                // print_r($bank);
                // exit;
                $piutang = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 2);
                $persediaan = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 20);
                $hartatetap = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 4);
                $hutanglancar = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 18);
                $hutangpanjang = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 9);
                $kewajibanlain = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 10);
                $modal = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 11);
                // print_r($modal);
                
                // $data = $this->options($option);

                $data['data'][$i] = array(
                    'kas'=>$kas['data'],
                    // 'kastotal'=>$kas['total'],
                    'bank'=>$bank['data'],
                    'piutang'=>$piutang['data'],
                    'persediaan'=>$persediaan['data'],
                    'hartatetap'=>$hartatetap['data'],
                    'hartatetap'=>$hartatetap['data'],
                    'hutanglancar'=>$hutanglancar['data'],
                    'hutangpanjang'=>$hutangpanjang['data'],
                    'kewajibanlain'=>$kewajibanlain['data'],
                    'modal'=>$modal['data'],
                    'totalharta'=>$kas['total']+$bank['total']+$piutang['total']+$persediaan['total']+$hartatetap['total'],
                    // 'totalkewajiban'=>$hutanglancar['total']+$hutangpanjang['total']+$kewajibanlain['total'],
                    'totalmodal'=>$modal['total'],
                    'periode'=>$this->periode($sd, $nd),
                    'unit'=>$namaunit,
                    
                    'arrHarta' => array(
                        'kas' => 'Kas',
                        'bank' => 'Bank',
                        'piutang' => 'Piutang',
                        'persediaan' => 'Persediaan',
                        'hartatetap' => 'Harta Tetap'
                    ),
                    'arrKewajiban' => array(
                        'hutanglancar' => 'Hutang Lancar',
                        'hutangpanjang' => 'Hutang Jangka Panjang',
                        'kewajibanlain' => 'Kewajiban Lain'
                    ),
                    'arrModal' => array(
                        'modal' => 'Modal'
                    )
                );
          $i++; 
        }
       
       // print_r($data);
        if($option=='print')
        {
            $data['fontsize'] = 7;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }
        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/neraca', $data,true);
            $filename = "neraca_".$namaunit."_".$data['sd']."_".$data['nd'].".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/neraca', $data);
        }
       
        
    }

    function neraca2($idunit,$sd,$nd,$option=null) {
        
        $this->load->helper('report');
        $this->load->model('m_laporan');
        
        //ubah tanggal ke format date
        $startdateArr = explode("%20", $sd);
        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddateArr = explode("%20", $nd);
        $enddate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-'.  lastday(getNoMonth($enddateArr[0]), $enddateArr[1]);
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $unitarr = explode(",", $idunit);
        $i=0;
        $data['option'] = $option;
        foreach ($unitarr as $key => $value) {

                
          $i++; 
        }
       
       // print_r($data);
        if($option=='print')
        {
            $data['fontsize'] = 7;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }
        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/neraca', $data,true);
            $filename = "neraca_".$namaunit."_".$data['sd']."_".$data['nd'].".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/neraca', $data);
        }
       
        
    }
    
    
    function getbulansebelumnya($bulan)
    {
//        echo strpos($bulan,'0');
        if (strpos($bulan,'0') !== false) {
           
            //bulan dengan 0 didepan
            $b = explode("0", $bulan);
            $m = intval($b[1])-1;
//            echo '0'.$m;
            return '0'.$m;
        } else {
            return $bulan-1;
        }
    }
    
    function aruskas2($idunit,$nd,$option=null) {
          $this->load->helper('report');
        
        //ubah tanggal ke format date
//        $startdateArr = explode("%20", $sd);
//        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddateArr = explode("%20", $nd);
        $bulan = getNoMonth($enddateArr[0]);
        if($bulan=='01')
        {
            $bulansebelumnya = '12';
         } else {
            $bulansebelumnya = $this->getbulansebelumnya($bulan);
        }
// echo $bulansebelumnya;
        $startdateBefore = $enddateArr[1].'-'.$bulansebelumnya.'-01';
        $enddateBefore = $enddateArr[1].'-'.$bulansebelumnya.'-'.  lastday($bulansebelumnya, $enddateArr[1]);

        $startdate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-01';
        $enddate = $enddateArr[1].'-'.$bulan.'-'.  lastday($bulan, $enddateArr[1]);
        // echo $startdate.' '.$enddate;
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
       
        
        
        //ARUS KAS DARI KEGIATAN OPERASI
            //KAS MASUK
            $sql = "select sum(debit) as debit,sum(credit) as credit,b.accnumber,b.accname,a.idaccount,b.accnumber
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 12 OR b.idaccounttype = 16) AND ".$this->fetchWhereUnit($idunit,'a')."
                    AND a.tanggal BETWEEN '$startdate' AND '$enddate'
                    GROUP BY b.accnumber,b.accname,a.idaccount,b.accnumber";
// echo $sql;
            $qkasMasuk = $this->db->query($sql);
            $dataKasMasuk = array();
            $i=0;
            $totalkasMasuk=0;
            foreach ($qkasMasuk->result() as $r)
            {
                // $saldo = $r->balance;
                if($r->debit>$r->credit)
                {
                    $saldo = $r->debit-$r->credit;
                    // $totalsaldo+=$r->debit-$r->credit;
                } else {
                    $saldo = $r->credit-$r->debit;
                }

                // $sql = "select debit,credit,b.accnumber,b.accname,a.idaccount
                //     from accountlog a
                //     join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                //     where (b.idaccounttype = 12 OR b.idaccounttype = 16) AND ".$this->fetchWhereUnit($idunit,'b')."
                //     AND a.tanggal BETWEEN '$startdateBefore' AND '$enddateBefore' AND a.idaccount=$r->idaccount";

                // $qsaldoawal = $this->db->query($sql);

                
//                echo $sql;
                // if($qsaldoawal->num_rows()>0)
                // {
                //     $rsaldoAwal = $qsaldoawal->row();
                //     $selisih = $saldo-($rsaldoAwal->debit-$rsaldoAwal->credit);
                //     $saldoawal = ($rsaldoAwal->debit-$rsaldoAwal->credit);
                // } else {
                    $selisih = $saldo;
                    $saldoawal = 0;
                // }
                
                // if($selisih!=0)
                // {
                    $dataKasMasuk[$i]['accnumber']=$r->accnumber;
                    $dataKasMasuk[$i]['accname']=$r->accname;
                    $dataKasMasuk[$i]['saldoawal']=$saldoawal;
                    $dataKasMasuk[$i]['saldosekarang']=$saldo;
                    $dataKasMasuk[$i]['selisih']=$selisih;        
                    $totalkasMasuk+=$selisih;
                    $i++;
                // }
            }
            //END KAS MASUK
            
            
            //KAS KELUAR
            // $sql = "select a.idaccount,a.accnumber,a.accname,a.balance
            //         from clossing a
            //         join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
            //         where a.month='$bulan' and a.year=$enddateArr[1]
            //         and (b.idaccounttype = 14 OR b.idaccounttype = 15)
            //         and ".$this->fetchWhereUnit($idunit,'a')."
            //         order by b.idaccounttype";

            $sql = "select sum(debit) as debit,sum(credit) as credit,b.accnumber,b.accname,a.idaccount,b.accnumber
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 14 OR b.idaccounttype = 15) AND ".$this->fetchWhereUnit($idunit,'a')."
                    AND a.tanggal BETWEEN '$startdate' AND '$enddate'
                    GROUP BY b.accnumber,b.accname,a.idaccount,b.accnumber";
// echo $sql;
            $qkasKeluar = $this->db->query($sql);
            $dataKasKeluar = array();
            $i=0;
            $totalkasKeluar=0;
            foreach ($qkasKeluar->result() as $r)
            {
                // $saldo = $r->balance;
                if($r->debit>$r->credit)
                {
                    $saldo = $r->debit-$r->credit;
                    // $totalsaldo+=$r->debit-$r->credit;
                } else {
                    $saldo = $r->credit-$r->debit;
                }

                //ambil saldo awal
                 // $sql = "select a.balance
                 //    from clossing a
                 //    join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                 //    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
                 //    and a.idaccount = $r->idaccount
                 //    and ".$this->fetchWhereUnit($idunit,'a')."
                 //    order by b.idaccounttype";

                $sql = "select debit,credit,b.accnumber,b.accname,a.idaccount
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 14 OR b.idaccounttype = 15) AND ".$this->fetchWhereUnit($idunit,'b')."
                    AND a.tanggal BETWEEN '$startdateBefore' AND '$enddateBefore' AND a.idaccount=$r->idaccount";

                $qsaldoawal = $this->db->query($sql);

                
//                echo $sql;
                if($qsaldoawal->num_rows()>0)
                {
                    $rsaldoAwal = $qsaldoawal->row();
                    $selisih = $saldo-($rsaldoAwal->debit-$rsaldoAwal->credit);
                    $saldoawal = ($rsaldoAwal->debit-$rsaldoAwal->credit);
                } else {
                    $selisih = $saldo;
                    $saldoawal = 0;
                }
                
                if($selisih!=0)
                {
                    $dataKasKeluar[$i]['accnumber']=$r->accnumber;
                    $dataKasKeluar[$i]['accname']=$r->accname;
                    $dataKasKeluar[$i]['saldoawal']=$saldoawal;
                    $dataKasKeluar[$i]['saldosekarang']=$saldo;
                    $dataKasKeluar[$i]['selisih']=$selisih;        
                    $totalkasKeluar+=$selisih;
                    $i++;
                }
            }
        
        //ARUS KAS DARI KEGIATAN INVESTASI
            $sql = "select a.idaccount,sum(a.debit) as debit,sum(a.credit) as credit,b.accname
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where (b.idaccounttype = 20 OR b.idaccounttype=4)
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulan' and c.year=$enddateArr[1] group by a.idaccount,b.accname";
           // echo $sql;
            $qinvs = $this->db->query($sql);
            $dataInves = array();
            $i=0;
            $totalInves=0;
            foreach ($qinvs->result() as $r)
            {
                $saldo = $r->debit-$r->credit;
                //ambil saldo awal
                 // $sql = "select a.balance,a.accname
                 //    from clossing a
                 //    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                 //    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
                 //    and a.idaccount = $r->idaccount
                 //    and ".$this->fetchWhereUnit($idunit,'a')."
                 //    order by b.idaccounttype";
                $sql = "select a.idaccount,sum(a.debit) as balance,b.accname
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where (b.idaccounttype = 20 OR b.idaccounttype=4) and a.idaccount = $r->idaccount
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulansebelumnya' and c.year=$enddateArr[1] AND a.credit=0 
                    group by a.idaccount,b.accname";

                $qsaldoawal = $this->db->query($sql);
                if($qsaldoawal->num_rows()>0)
                {
                    $rsaldoAwal = $qsaldoawal->row();
                    $accname = $rsaldoAwal->accname;
                    // $accname = $this->fetchUnit($idunit);
                    $selisih = $saldo-($r->debit-$r->credit);
                    $saldoawal = $rsaldoAwal->balance;
                } else {
                    // $qacc = $this->db->get_where('account',array('idaccount'=>$r->idaccount,'idunit'=>$idunit))->row();
                    $accname = $r->accname;
                    // $accname = $this->fetchUnit($idunit);
                    $selisih = $r->debit-$r->credit;
                    $saldoawal = 0;
                }
                
                if($selisih!=0)
                {
                    $dataInves[$i]['accname']=$accname;
                    $dataInves[$i]['saldoawal']=$saldoawal;
                    $dataInves[$i]['saldosekarang']=$saldo;
                    $dataInves[$i]['selisih']=$selisih;  
                    $totalInves+=$selisih;
                    $i++;
                }
            }
            
        //ARUS KAS DARI KEGIATAN PENDANAAN
             $sql = "select c.memo,a.idaccount,sum(a.credit) as balance
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where b.idaccounttype = 11
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulan' and c.year=$enddateArr[1] AND a.debit=0 "
                     . "group by c.memo,a.idaccount";
           // echo $sql;
            $qinvs = $this->db->query($sql);
            $dataDana = array();
            $i=0;
            $totalDana=0;
            foreach ($qinvs->result() as $r)
            {
                $saldo = $r->balance;
                //ambil saldo awal
//                 $sql = "select a.balance,a.accname
//                    from clossing a
//                    join account b ON a.idaccount = b.idaccount
//                    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
//                    and a.idaccount = $r->idaccount
//                    and a.idunit = $idunit
//                    order by b.idaccounttype";
//                $qsaldoawal = $this->db->query($sql);
////                echo $sql;
//                if($qsaldoawal->num_rows()>0)
//                {
//                    $rsaldoAwal = $qsaldoawal->row();
//                    
////                    if($saldo>$rsaldoAwal->balance)
////                    {
////                        $selisih = $saldo-$rsaldoAwal->balance;
////                    } else {
////                        $selisih = $rsaldoAwal->balance-$saldo;
////                    }
//                    $selisih = $saldo;
//                    $saldoawal = $rsaldoAwal->balance;
//                } else {
//                    $selisih = $r->balance;
//                    $saldoawal = 0;
//                }
                $selisih = $r->balance;
//                $saldoawal = 0;
                if($selisih!=0)
                {
                    $dataDana[$i]['accname']=$r->memo;
//                    $dataDana[$i]['saldoawal']=$saldoawal;
                    $dataDana[$i]['saldosekarang']=$r->balance;
                    $dataDana[$i]['selisih']=$selisih;  
                    $totalDana+=$selisih;
                    $i++;
                }
            }
        
//            Saldo Kas Akhir Periode Sebelumnya
            // $sql = "select a.idaccount,a.balance
            //     from clossing a
            //     join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
            //     where a.idaccounttype = 19 and b.idpos = 2
            //     AND a.month='$bulansebelumnya' and a.year=$enddateArr[1] AND ".$this->fetchWhereUnit($idunit,'a')."";
//             $sql = "select sum(debit-credit) as totalkasakhirsebelumnya
//                     from accountlog a
//                     join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
//                     where b.idaccounttype = 19 and a.tanggal between '$startdateBefore' and '$enddateBefore'";
// //            echo $sql;
//             $qawal = $this->db->query($sql);
//             if($qawal->num_rows()>0)
//             {
//                 $r = $qawal->row();
//                 $totalkasawal = $r->totalkasakhirsebelumnya;
//             } else {
//                 $totalkasawal = 0;
//             }
            $totalkasawal =  $this->getArusKasAwal($idunit,$startdateBefore,$enddateBefore);
            // echo $totalkasawal;
            
            // foreach($qawal->result() as $r)
            // {
            //     $totalkasawal += $r->balance;
            // }
            
//            Saldo Kas Akhir Periode
             // $sql = "select a.idaccount,a.balance
             //    from clossing a
             //    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
             //    where a.idaccounttype = 19
             //    AND a.month='$bulan' and a.year=$enddateArr[1] AND ".$this->fetchWhereUnit($idunit,'b')."";
            $sql = "select sum(debit-credit) as totalkasakhir
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    where b.idaccounttype = 19 and a.tanggal between '$startdate' and '$enddate'";
            // echo $sql;
            $qakhir = $this->db->query($sql);
            $r = $qakhir->row();
            $totalkasakhir = $r->totalkasakhir;

// echo "$totalkasMasuk-$totalkasKeluar-$totalInves+$totalDana";

        $v1 = $totalkasMasuk-$totalkasKeluar;
        $v2 = $totalInves+$totalDana;
        $kasMasukBersih=$v1+$v2;
        // echo '<br>'.$kasMasukBersih;
        $data = array(
                'periode'=>str_replace("%20", " ", $this->uri->segment(4)),
                'unit'=>$namaunit,
                'option'=>$option,
                'aruskasmasuk'=>$dataKasMasuk,
                'totalkasmasuk'=>$totalkasMasuk,
                'aruskaskeluar'=>$dataKasKeluar,
                'totalkaskeluar'=>$totalkasKeluar,
                'totalkasoperasi'=>$totalkasMasuk-$totalkasKeluar,
                'dataInves'=>$dataInves,
                'totalInves'=>$totalInves,
                'dataDana'=>$dataDana,
                'totalDana'=>$totalDana,
                'kasMasukBersih'=>$kasMasukBersih,
                'periodeawal'=>ambilBulan($bulansebelumnya).' '.$enddateArr[1],
                'periodeakhir'=>ambilBulan($bulan).' '.$enddateArr[1],
                'totalkasawal'=>$totalkasawal,
                // 'totalkasakhir'=>$totalkasakhir
                'totalkasakhir'=>$kasMasukBersih+$totalkasawal
        );
//        print_r($data);
        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }

         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/aruskas', $data,true);
            $filename = "aruskas_".$namaunit."_".$enddate.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/aruskas', $data);
        }
        
//        print_r($data);
 
    }

    function getArusKasAwal($idunit,$startdate,$enddate)
    {
        $this->load->helper('report');

        $enddateArr = explode("-", $enddate);
        $bulan = $enddateArr[1];
        // $bulansebelumnya = $this->getbulansebelumnya($bulan);

        // $startdateBefore = $enddateArr[1].'-'.$bulansebelumnya.'-01';
        // $enddateBefore = $enddateArr[1].'-'.$bulansebelumnya.'-'.  lastday($bulansebelumnya, $enddateArr[1]);

        // $startdate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-01';
        // $enddate = $enddateArr[1].'-'.$bulan.'-'.  lastday($bulan, $enddateArr[1]);

        $namaunit = $this->fetchUnit($idunit);
        
        //ARUS KAS DARI KEGIATAN OPERASI
            //KAS MASUK
            $sql = "select sum(debit) as debit,sum(credit) as credit,b.accnumber,b.accname,a.idaccount,b.accnumber
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 12 OR b.idaccounttype = 16) AND ".$this->fetchWhereUnit($idunit,'a')."
                    AND a.tanggal BETWEEN '$startdate' AND '$enddate'
                    GROUP BY b.accnumber,b.accname,a.idaccount,b.accnumber";
// echo $sql;
            $qkasMasuk = $this->db->query($sql);
            $dataKasMasuk = array();
            $i=0;
            $totalkasMasuk=0;
            foreach ($qkasMasuk->result() as $r)
            {
                // $saldo = $r->balance;
                if($r->debit>$r->credit)
                {
                    $saldo = $r->debit-$r->credit;
                    // $totalsaldo+=$r->debit-$r->credit;
                } else {
                    $saldo = $r->credit-$r->debit;
                }
                    $selisih = $saldo;
                    $saldoawal = 0;

                    $dataKasMasuk[$i]['accnumber']=$r->accnumber;
                    $dataKasMasuk[$i]['accname']=$r->accname;
                    $dataKasMasuk[$i]['saldoawal']=$saldoawal;
                    $dataKasMasuk[$i]['saldosekarang']=$saldo;
                    $dataKasMasuk[$i]['selisih']=$selisih;        
                    $totalkasMasuk+=$selisih;
                    $i++;
                // }
            }
            //END KAS MASUK
            
            
            //KAS KELUAR

            $sql = "select sum(debit) as debit,sum(credit) as credit,b.accnumber,b.accname,a.idaccount,b.accnumber
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 14 OR b.idaccounttype = 15) AND ".$this->fetchWhereUnit($idunit,'a')."
                    AND a.tanggal BETWEEN '$startdate' AND '$enddate'
                    GROUP BY b.accnumber,b.accname,a.idaccount,b.accnumber";
// echo $sql;
            $qkasKeluar = $this->db->query($sql);
            $dataKasKeluar = array();
            $i=0;
            $totalkasKeluar=0;
            foreach ($qkasKeluar->result() as $r)
            {
                // $saldo = $r->balance;
                if($r->debit>$r->credit)
                {
                    $saldo = $r->debit-$r->credit;
                    // $totalsaldo+=$r->debit-$r->credit;
                } else {
                    $saldo = $r->credit-$r->debit;
                }

                $selisih = $saldo;
                $saldoawal = 0;
           
                $dataKasKeluar[$i]['accnumber']=$r->accnumber;
                $dataKasKeluar[$i]['accname']=$r->accname;
                $dataKasKeluar[$i]['saldoawal']=$saldoawal;
                $dataKasKeluar[$i]['saldosekarang']=$saldo;
                $dataKasKeluar[$i]['selisih']=$selisih;        
                $totalkasKeluar+=$selisih;
                $i++;
            }
        
        //ARUS KAS DARI KEGIATAN INVESTASI
            $sql = "select a.idaccount,sum(a.debit) as debit,sum(a.credit) as credit,b.accname
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where (b.idaccounttype = 20 OR b.idaccounttype=4)
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulan' and c.year=$enddateArr[1] group by a.idaccount,b.accname";
           // echo $sql;
            $qinvs = $this->db->query($sql);
            $dataInves = array();
            $i=0;
            $totalInves=0;
            foreach ($qinvs->result() as $r)
            {
                $saldo = $r->debit-$r->credit;
                //ambil saldo awal
                 // $sql = "select a.balance,a.accname
                 //    from clossing a
                 //    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                 //    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
                 //    and a.idaccount = $r->idaccount
                 //    and ".$this->fetchWhereUnit($idunit,'a')."
                 //    order by b.idaccounttype";
                $sql = "select a.idaccount,sum(a.debit) as balance,b.accname
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where (b.idaccounttype = 20 OR b.idaccounttype=4) and a.idaccount = $r->idaccount
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulansebelumnya' and c.year=$enddateArr[1] AND a.credit=0 
                    group by a.idaccount,b.accname";

                $qsaldoawal = $this->db->query($sql);
                if($qsaldoawal->num_rows()>0)
                {
                    $rsaldoAwal = $qsaldoawal->row();
                    $accname = $rsaldoAwal->accname;
                    // $accname = $this->fetchUnit($idunit);
                    $selisih = $saldo-($r->debit-$r->credit);
                    $saldoawal = $rsaldoAwal->balance;
                } else {
                    // $qacc = $this->db->get_where('account',array('idaccount'=>$r->idaccount,'idunit'=>$idunit))->row();
                    $accname = $r->accname;
                    // $accname = $this->fetchUnit($idunit);
                    $selisih = $r->debit-$r->credit;
                    $saldoawal = 0;
                }
                
                if($selisih!=0)
                {
                    $dataInves[$i]['accname']=$accname;
                    $dataInves[$i]['saldoawal']=$saldoawal;
                    $dataInves[$i]['saldosekarang']=$saldo;
                    $dataInves[$i]['selisih']=$selisih;  
                    $totalInves+=$selisih;
                    $i++;
                }
            }
            
        //ARUS KAS DARI KEGIATAN PENDANAAN
             $sql = "select c.memo,a.idaccount,sum(a.credit) as balance
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where b.idaccounttype = 11
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulan' and c.year=$enddateArr[1] AND a.debit=0 "
                     . "group by c.memo,a.idaccount";
           // echo $sql;
            $qinvs = $this->db->query($sql);
            $dataDana = array();
            $i=0;
            $totalDana=0;
            foreach ($qinvs->result() as $r)
            {
                $saldo = $r->balance;
                //ambil saldo awal
                $selisih = $r->balance;
//                $saldoawal = 0;
                if($selisih!=0)
                {
                    $dataDana[$i]['accname']=$r->memo;
//                    $dataDana[$i]['saldoawal']=$saldoawal;
                    $dataDana[$i]['saldosekarang']=$r->balance;
                    $dataDana[$i]['selisih']=$selisih;  
                    $totalDana+=$selisih;
                    $i++;
                }
            }
        


// echo "$totalkasMasuk-$totalkasKeluar-$totalInves+$totalDana";

        $v1 = $totalkasMasuk-$totalkasKeluar;
        $v2 = $totalInves+$totalDana;
        $kasMasukBersih=$v1+$v2;
        return $kasMasukBersih;
    }

    function aruskas($idunit,$nd,$option=null) {
          $this->load->helper('report');
        
        //ubah tanggal ke format date
//        $startdateArr = explode("%20", $sd);
//        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddateArr = explode("%20", $nd);
        $bulan = getNoMonth($enddateArr[0]);
        $bulansebelumnya = $this->getbulansebelumnya($bulan);

        $startdateBefore = $enddateArr[1].'-'.$bulansebelumnya.'-01';
        $enddateBefore = $enddateArr[1].'-'.$bulansebelumnya.'-'.  lastday($bulansebelumnya, $enddateArr[1]);

        $startdate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-01';
        $enddate = $enddateArr[1].'-'.$bulan.'-'.  lastday($bulan, $enddateArr[1]);
        // echo $startdate.' '.$enddate;
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
       
        
        
        //ARUS KAS DARI KEGIATAN OPERASI
            //KAS MASUK
            $sql = "select sum(debit) as debit,sum(credit) as credit,b.accnumber,b.accname,a.idaccount,b.accnumber
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 12 OR b.idaccounttype = 16) AND ".$this->fetchWhereUnit($idunit,'a')."
                    AND a.tanggal BETWEEN '$startdate' AND '$enddate'
                    GROUP BY b.accnumber,b.accname,a.idaccount,b.accnumber";
// echo $sql;
            $qkasMasuk = $this->db->query($sql);
            $dataKasMasuk = array();
            $i=0;
            $totalkasMasuk=0;
            foreach ($qkasMasuk->result() as $r)
            {
                // $saldo = $r->balance;
                if($r->debit>$r->credit)
                {
                    $saldo = $r->debit-$r->credit;
                    // $totalsaldo+=$r->debit-$r->credit;
                } else {
                    $saldo = $r->credit-$r->debit;
                }

                $sql = "select debit,credit,b.accnumber,b.accname,a.idaccount
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 12 OR b.idaccounttype = 16) AND ".$this->fetchWhereUnit($idunit,'b')."
                    AND a.tanggal BETWEEN '$startdateBefore' AND '$enddateBefore' AND a.idaccount=$r->idaccount";

                $qsaldoawal = $this->db->query($sql);

                
//                echo $sql;
                if($qsaldoawal->num_rows()>0)
                {
                    $rsaldoAwal = $qsaldoawal->row();
                    $selisih = $saldo-($rsaldoAwal->debit-$rsaldoAwal->credit);
                    $saldoawal = ($rsaldoAwal->debit-$rsaldoAwal->credit);
                } else {
                    $selisih = $saldo;
                    $saldoawal = 0;
                }
                
                if($selisih!=0)
                {
                    $dataKasMasuk[$i]['accnumber']=$r->accnumber;
                    $dataKasMasuk[$i]['accname']=$r->accname;
                    $dataKasMasuk[$i]['saldoawal']=$saldoawal;
                    $dataKasMasuk[$i]['saldosekarang']=$saldo;
                    $dataKasMasuk[$i]['selisih']=$selisih;        
                    $totalkasMasuk+=$selisih;
                    $i++;
                }
            }
            //END KAS MASUK
            
            
            //KAS KELUAR
            // $sql = "select a.idaccount,a.accnumber,a.accname,a.balance
            //         from clossing a
            //         join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
            //         where a.month='$bulan' and a.year=$enddateArr[1]
            //         and (b.idaccounttype = 14 OR b.idaccounttype = 15)
            //         and ".$this->fetchWhereUnit($idunit,'a')."
            //         order by b.idaccounttype";

            $sql = "select sum(debit) as debit,sum(credit) as credit,b.accnumber,b.accname,a.idaccount,b.accnumber
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 14 OR b.idaccounttype = 15) AND ".$this->fetchWhereUnit($idunit,'a')."
                    AND a.tanggal BETWEEN '$startdate' AND '$enddate'
                    GROUP BY b.accnumber,b.accname,a.idaccount,b.accnumber";
// echo $sql;
            $qkasKeluar = $this->db->query($sql);
            $dataKasKeluar = array();
            $i=0;
            $totalkasKeluar=0;
            foreach ($qkasKeluar->result() as $r)
            {
                // $saldo = $r->balance;
                if($r->debit>$r->credit)
                {
                    $saldo = $r->debit-$r->credit;
                    // $totalsaldo+=$r->debit-$r->credit;
                } else {
                    $saldo = $r->credit-$r->debit;
                }

                //ambil saldo awal
                 // $sql = "select a.balance
                 //    from clossing a
                 //    join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                 //    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
                 //    and a.idaccount = $r->idaccount
                 //    and ".$this->fetchWhereUnit($idunit,'a')."
                 //    order by b.idaccounttype";

                $sql = "select debit,credit,b.accnumber,b.accname,a.idaccount
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount AND a.idunit = b.idunit
                    where (b.idaccounttype = 14 OR b.idaccounttype = 15) AND ".$this->fetchWhereUnit($idunit,'b')."
                    AND a.tanggal BETWEEN '$startdateBefore' AND '$enddateBefore' AND a.idaccount=$r->idaccount";

                $qsaldoawal = $this->db->query($sql);

                
//                echo $sql;
                if($qsaldoawal->num_rows()>0)
                {
                    $rsaldoAwal = $qsaldoawal->row();
                    $selisih = $saldo-($rsaldoAwal->debit-$rsaldoAwal->credit);
                    $saldoawal = ($rsaldoAwal->debit-$rsaldoAwal->credit);
                } else {
                    $selisih = $saldo;
                    $saldoawal = 0;
                }
                
                if($selisih!=0)
                {
                    $dataKasKeluar[$i]['accnumber']=$r->accnumber;
                    $dataKasKeluar[$i]['accname']=$r->accname;
                    $dataKasKeluar[$i]['saldoawal']=$saldoawal;
                    $dataKasKeluar[$i]['saldosekarang']=$saldo;
                    $dataKasKeluar[$i]['selisih']=$selisih;        
                    $totalkasKeluar+=$selisih;
                    $i++;
                }
            }
        
        //ARUS KAS DARI KEGIATAN INVESTASI
            $sql = "select a.idaccount,sum(a.debit) as debit,sum(a.credit) as credit,b.accname
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where (b.idaccounttype = 20 OR b.idaccounttype=4)
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulan' and c.year=$enddateArr[1] group by a.idaccount,b.accname";
           // echo $sql;
            $qinvs = $this->db->query($sql);
            $dataInves = array();
            $i=0;
            $totalInves=0;
            foreach ($qinvs->result() as $r)
            {
                $saldo = $r->debit-$r->credit;
                //ambil saldo awal
                 // $sql = "select a.balance,a.accname
                 //    from clossing a
                 //    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                 //    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
                 //    and a.idaccount = $r->idaccount
                 //    and ".$this->fetchWhereUnit($idunit,'a')."
                 //    order by b.idaccounttype";
                $sql = "select a.idaccount,sum(a.debit) as balance,b.accname
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where (b.idaccounttype = 20 OR b.idaccounttype=4) and a.idaccount = $r->idaccount
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulansebelumnya' and c.year=$enddateArr[1] AND a.credit=0 
                    group by a.idaccount,b.accname";

                $qsaldoawal = $this->db->query($sql);
                if($qsaldoawal->num_rows()>0)
                {
                    $rsaldoAwal = $qsaldoawal->row();
                    $accname = $rsaldoAwal->accname;
                    // $accname = $this->fetchUnit($idunit);
                    $selisih = $saldo-($r->debit-$r->credit);
                    $saldoawal = $rsaldoAwal->balance;
                } else {
                    // $qacc = $this->db->get_where('account',array('idaccount'=>$r->idaccount,'idunit'=>$idunit))->row();
                    $accname = $r->accname;
                    // $accname = $this->fetchUnit($idunit);
                    $selisih = $r->debit-$r->credit;
                    $saldoawal = 0;
                }
                
                if($selisih!=0)
                {
                    $dataInves[$i]['accname']=$accname;
                    $dataInves[$i]['saldoawal']=$saldoawal;
                    $dataInves[$i]['saldosekarang']=$saldo;
                    $dataInves[$i]['selisih']=$selisih;  
                    $totalInves+=$selisih;
                    $i++;
                }
            }
            
        //ARUS KAS DARI KEGIATAN PENDANAAN
             $sql = "select c.memo,a.idaccount,sum(a.credit) as balance
                    from journalitem a 
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    join journal c ON a.idjournal = c.idjournal
                    where b.idaccounttype = 11
                    AND ".$this->fetchWhereUnit($idunit,'c')." AND c.month='$bulan' and c.year=$enddateArr[1] AND a.debit=0 "
                     . "group by c.memo,a.idaccount";
           // echo $sql;
            $qinvs = $this->db->query($sql);
            $dataDana = array();
            $i=0;
            $totalDana=0;
            foreach ($qinvs->result() as $r)
            {
                $saldo = $r->balance;
                //ambil saldo awal
//                 $sql = "select a.balance,a.accname
//                    from clossing a
//                    join account b ON a.idaccount = b.idaccount
//                    where a.month='$bulansebelumnya' and a.year=$enddateArr[1]
//                    and a.idaccount = $r->idaccount
//                    and a.idunit = $idunit
//                    order by b.idaccounttype";
//                $qsaldoawal = $this->db->query($sql);
////                echo $sql;
//                if($qsaldoawal->num_rows()>0)
//                {
//                    $rsaldoAwal = $qsaldoawal->row();
//                    
////                    if($saldo>$rsaldoAwal->balance)
////                    {
////                        $selisih = $saldo-$rsaldoAwal->balance;
////                    } else {
////                        $selisih = $rsaldoAwal->balance-$saldo;
////                    }
//                    $selisih = $saldo;
//                    $saldoawal = $rsaldoAwal->balance;
//                } else {
//                    $selisih = $r->balance;
//                    $saldoawal = 0;
//                }
                $selisih = $r->balance;
//                $saldoawal = 0;
                if($selisih!=0)
                {
                    $dataDana[$i]['accname']=$r->memo;
//                    $dataDana[$i]['saldoawal']=$saldoawal;
                    $dataDana[$i]['saldosekarang']=$r->balance;
                    $dataDana[$i]['selisih']=$selisih;  
                    $totalDana+=$selisih;
                    $i++;
                }
            }
        
//            Saldo Kas Akhir Periode Sebelumnya
            // $sql = "select a.idaccount,a.balance
            //     from clossing a
            //     join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
            //     where a.idaccounttype = 19 and b.idpos = 2
            //     AND a.month='$bulansebelumnya' and a.year=$enddateArr[1] AND ".$this->fetchWhereUnit($idunit,'a')."";
            $sql = "select sum(debit-credit) as totalkasakhirsebelumnya
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    where b.idaccounttype = 19 and a.tanggal between '$startdateBefore' and '$enddateBefore'";
//            echo $sql;
            $qawal = $this->db->query($sql);
            if($qawal->num_rows()>0)
            {
                $r = $qawal->row();
                $totalkasawal = $r->totalkasakhirsebelumnya;
            } else {
                $totalkasawal = 0;
            }
            
            // foreach($qawal->result() as $r)
            // {
            //     $totalkasawal += $r->balance;
            // }
            
//            Saldo Kas Akhir Periode
             // $sql = "select a.idaccount,a.balance
             //    from clossing a
             //    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
             //    where a.idaccounttype = 19
             //    AND a.month='$bulan' and a.year=$enddateArr[1] AND ".$this->fetchWhereUnit($idunit,'b')."";
            $sql = "select sum(debit-credit) as totalkasakhir
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b')."
                    where b.idaccounttype = 19 and a.tanggal between '$startdate' and '$enddate'";
            // echo $sql;
            $qakhir = $this->db->query($sql);
            $r = $qakhir->row();
            $totalkasakhir = $r->totalkasakhir;

        $kasMasukBersih=($totalkasMasuk-$totalkasKeluar)-$totalInves+$totalDana;
        $data = array(
                'periode'=>str_replace("%20", " ", $this->uri->segment(4)),
                'unit'=>$namaunit,
                'option'=>$option,
                'aruskasmasuk'=>$dataKasMasuk,
                'totalkasmasuk'=>$totalkasMasuk,
                'aruskaskeluar'=>$dataKasKeluar,
                'totalkaskeluar'=>$totalkasKeluar,
                'totalkasoperasi'=>$totalkasMasuk-$totalkasKeluar,
                'dataInves'=>$dataInves,
                'totalInves'=>$totalInves,
                'dataDana'=>$dataDana,
                'totalDana'=>$totalDana,
                'kasMasukBersih'=>$kasMasukBersih,
                'periodeawal'=>ambilBulan($bulansebelumnya).' '.$enddateArr[1],
                'periodeakhir'=>ambilBulan($bulan).' '.$enddateArr[1],
                'totalkasawal'=>$totalkasawal,
                // 'totalkasakhir'=>$totalkasakhir
                'totalkasakhir'=>$kasMasukBersih+$totalkasawal
        );
//        print_r($data);
        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }

         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/aruskas', $data,true);
            $filename = "aruskas_".$namaunit."_".$enddate.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/aruskas', $data);
        }
        
//        print_r($data);
 
    }
    
    function labarugi($idunit,$sd,$nd,$option=null) {
        $this->load->helper('report');  
        $this->load->model('m_laporan');

        //ubah tanggal ke format date
        $startdateArr = explode("%20", $sd);
        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddateArr = explode("%20", $nd);
        $enddate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-'.  lastday(getNoMonth($enddateArr[0]), $enddateArr[1]);
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $pendapatan = $this->m_laporan->getDataLabaRugi($idunit, $startdate, $enddate, 12);
        // print_r($pendapatan);
        // exit;
        $biayapendapatan = $this->m_laporan->getDataLabaRugi($idunit, $startdate, $enddate, 13);
        // print_r($biayapendapatan);
        // exit;
        $pengeluaran = $this->m_laporan->getDataLabaRugi($idunit, $startdate, $enddate, 14);
        // print_r($pengeluaran);
        // exit;
        $pendapatanlain = $this->m_laporan->getDataLabaRugi($idunit, $startdate, $enddate, 16);
        $pengeluaranlain = $this->m_laporan->getDataLabaRugi($idunit, $startdate, $enddate, 15);
//        print_r($pengeluaranlain);
        
        $labarugioperasi = ($pendapatan['total']-$biayapendapatan['total'])-$pengeluaran['total'];
        // echo $pengeluaran['total'];

        //pajak penghasilan
        if($pendapatan['total']<=4800000000)
        {
            $pajakpenghasilan = $pendapatan['total']*(1/100);
        } else {

        }
        $data = array(
            'pendapatan'=>$pendapatan['data'],
            'biayapendapatan'=>$biayapendapatan['data'],
            'totalpendapatan'=>$pendapatan['total'],
            'totalbiayapendapatan'=>$biayapendapatan['total'],
            'labarugikotor'=>$pendapatan['total']-$biayapendapatan['total'],            
            'pengeluaran'=>$pengeluaran['data'],
            'totalpengeluaran'=>$pengeluaran['total'],
            'labarugioperasi'=>$labarugioperasi,
            'pendapatanlain'=>$pendapatanlain['data'],
            'totalpendapatanlain'=>$pendapatanlain['total'],
            'pengeluaranlain'=>$pengeluaranlain['data'],
            'totalpengeluaranlain'=>$pengeluaranlain['total'],
            'pajakpenghasilan'=>$pajakpenghasilan,
            'labarugisebelumpajak'=>$labarugioperasi+$pendapatanlain['total']-$pengeluaranlain['total'],
            'labarugisesudahpajak'=>$labarugioperasi+$pendapatanlain['total']-$pengeluaranlain['total']-$pajakpenghasilan,
            'periode'=>$this->periode($sd, $nd),
            'unit'=>$namaunit,
            'option'=>$option,
            'arrHarta' => array(
                'pendapatan' => 'Pendapatan'
            ),
            'arrKewajiban' => array(               
                'biayapendapatan'=>'Biaya Atas Pendapatan'
            ),
            'arrPengeluaran' => array(
                'pengeluaran' => 'Pengeluaran'
            ),
            'arrPendapatanLain' => array(
                'pendapatanlain'=>'Pendapatan Lain'
            ),
            'arrPengeluaranLain' => array(
                'pengeluaranlain'=>'Pengeluaran Lain'
            )
        );
        
         if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }

        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/labarugi', $data,true);
            $filename = "labarugi_".$namaunit."_".$this->periode($sd, $nd).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else if($option=='api'){
            return $data;
        } else {
            $this->load->view('report/labarugi', $data);
        }
    }

    function tesapilaba()
    {
        print_r($this->labarugi(2,"September%202014","October%202014","api"));
    }
    
    function selisihNeracaSaldo($idaccount,$sd,$nd,$idunit,$acctype)
    {
        $sql = "select a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
			from account a 
			join journalitem b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
			join journal c ON b.idjournal = c.idjournal 
			where ".$this->fetchWhereUnit($idunit,'c')." and ($acctype) 
			AND a.display ISNULL and a.active=TRUE 
			AND c.datejournal between '$sd' and '$nd' AND a.idaccount = $idaccount 
			group by a.accnumber,a.accname
			order by a.accnumber";
        $q = $this->db->query($sql);
        $r = $q->row();
        if($r->debit>$r->credit)
        {
            return $r->debit-$r->credit;
        } else {
            return $r->credit-$r->debit;
        }
    }
    
    function neracasaldo($idunit,$sd,$option=null)
    {
        // $qu = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
//        $data = array(
//                'periode'=>  str_replace("%20"," ", $sd),
//                'unit'=>$q->namaunit,
//             );
         
          //ubah tanggal ke format date
        $startdateArr = explode("%20", $sd);
        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-'.  lastday(getNoMonth($startdateArr[0]), $startdateArr[1]);
        
        $totaldebit = 0;
        $totalcredit = 0;
        $totalsaldo = 0;

//        --kas, piutang, persediaan, aktiva tetap bersaldo debitr->
        $acctype = "a.idaccounttype=1 OR a.idaccounttype=4 OR a.idaccounttype=19 OR a.idaccounttype=20 OR a.idaccounttype=2 OR a.idaccounttype=3";
        // $sql = "select a.idaccount,a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
        //         from account a
        //         join journalitem b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
        //         join journal c ON b.idjournal = c.idjournal
        //         where ".$this->fetchWhereUnit($idunit,'c')."
        //         and ($acctype)
        //         AND a.display ISNULL and a.active=TRUE and credit=0
        //         AND c.datejournal between '$startdate' and '$enddate'                
        //         group by a.idaccount,a.accnumber,a.accname,b.credit"
        //         . " order by a.accnumber";
        $sql = "select a.idaccount,a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
                    from accountlog b
                    join account a ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
                    where ($acctype)
                    AND a.display ISNULL and a.active=TRUE
                    AND b.tanggal between '$startdate' and '$enddate'                
                    group by a.idaccount,a.accnumber,a.accname
                    order by a.accnumber";
        // echo $sql;
        $qkas = $this->db->query($sql);
        
        $arrKas = array();
        $i = 0;
        foreach ($qkas->result() as $r) {
            $arrKas[$i]['accnumber'] = $r->accnumber;
            $arrKas[$i]['accname'] = $r->accname;
            $arrKas[$i]['debit'] =$r->debit;
            // $arrKas[$i]['debit'] = $this->selisihNeracaSaldo($r->idaccount,$startdate, $enddate, $idunit, $acctype,'b');
            $arrKas[$i]['credit'] = $r->credit;
            if($r->debit>$r->credit)
            {
                $saldo = number_format($r->debit-$r->credit);
                $totalsaldo = ($r->debit-$r->credit)+$totalsaldo;
                // $totalsaldo+=$r->debit-$r->credit;
            } else {
                $saldo = "(".number_format($r->credit-$r->debit).")";
                $totalsaldo = ($r->debit-$r->credit)+$totalsaldo;
            }
           
            $arrKas[$i]['saldo'] = $saldo;
            $i++;
        }
        // print_r($arrKas);
        // echo 'saldo:'.$totalsaldo;
        // echo '--------------------------------------------------------------------------------';
//        --Akun-akun kelompok kewajiban (utang) bersaldo kredit.
        $acctype = "a.idaccounttype=9 OR a.idaccounttype=18 OR a.idaccounttype=10";
        $sql = "select a.idaccount,a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
                    from accountlog b
                    join account a ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
                    where ($acctype)
                    AND a.display ISNULL and a.active=TRUE
                    AND b.tanggal between '$startdate' and '$enddate'                
                    group by a.idaccount,a.accnumber,a.accname
                    order by a.accnumber";
        // $sql = "select a.idaccount,a.accnumber,a.accname,b.debit,sum(b.credit) as credit
        //         from account a
        //         join journalitem b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
        //         join journal c ON b.idjournal = c.idjournal
        //         where ".$this->fetchWhereUnit($idunit,'c')."
        //         and ($acctype)
        //         AND a.display ISNULL and a.active=TRUE AND b.debit=0
        //         AND c.datejournal between '$startdate' and '$enddate'
        //         group by a.idaccount,a.accnumber,a.accname,b.debit";
                // echo $sql;
        $q = $this->db->query($sql);
        
        $arrUtang = array();
        $i = 0;
        $total=0;
        foreach ($q->result() as $r) {
            $arrUtang[$i]['accnumber'] = $r->accnumber;
            $arrUtang[$i]['accname'] = $r->accname;
            $arrUtang[$i]['debit'] = $r->debit;
            // $arrUtang[$i]['credit'] = $this->selisihNeracaSaldo($r->idaccount,$startdate, $enddate, $idunit, $acctype);
            $arrUtang[$i]['credit'] = $r->credit;
            if($r->credit>$r->debit)
            {
                $saldo = "(".number_format($r->debit-$r->credit).")";
                $totalsaldo = ($r->debit-$r->credit)+$totalsaldo;
            } else {
               $saldo = number_format($r->credit-$r->debit);
               $totalsaldo = ($r->credit-$r->debit)+$totalsaldo;
               // $totalsaldo+=$r->credit-$r->debit;
            }
            $arrUtang[$i]['saldo'] = $saldo;
            $i++;
        }
        //  print_r($arrUtang);
        // echo 'saldo:'.$totalsaldo;
        // echo '--------------------------------------------------------------------------------';
//        Akun kelompok ekuitas pemilik (modal, laba ditahan) bersaldo kredit.
        /*
        changelog
        4/7/15 : laba ditahan diilangin
        */
        // $acctype = "a.idaccounttype=11 OR a.idaccounttype=21";

        //ilangin laba berjalan
        // $qlb = $this->db->get_where('linkedaccunit',array('idlinked'=>4,'idunit'=>$idunit))
        $acctype = "a.idaccounttype=11 OR a.idaccounttype=21";
         $sql = "select a.idaccount,a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
                    from accountlog b
                    join account a ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
                    where ($acctype)
                    AND a.display ISNULL and a.active=TRUE
                    AND b.tanggal between '$startdate' and '$enddate' AND b.idaccount != 642
                    and b.idaccount not in (select idaccount from linkedaccunit where (idlinked=4 OR idlinked=3) and ".$this->fetchWhereUnit($idunit).")
                    group by a.idaccount,a.accnumber,a.accname
                    order by a.accnumber";
                    // echo $sql;
         // $sql = "select a.idaccount,a.accnumber,a.accname,b.debit,sum(b.credit) as credit
         //        from account a
         //        join journalitem b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
         //        join journal c ON b.idjournal = c.idjournal
         //        where ".$this->fetchWhereUnit($idunit,'c')."
         //        and ($acctype)
         //        AND a.display ISNULL and a.active=TRUE AND b.debit=0
         //        AND c.datejournal between '$startdate' and '$enddate'
         //        group by a.idaccount,a.accnumber,a.accname,b.debit";
        $q = $this->db->query($sql);
        
        
        $arrEkuitas = array();
        $i = 0;
        $total=0;
        foreach ($q->result() as $r) {
            $arrEkuitas[$i]['accnumber'] = $r->accnumber;
            $arrEkuitas[$i]['accname'] = $r->accname;
            $arrEkuitas[$i]['debit'] = $r->debit;
            // $arrEkuitas[$i]['credit'] = $this->selisihNeracaSaldo($r->idaccount,$startdate, $enddate, $idunit, $acctype);
            $arrEkuitas[$i]['credit'] = $r->credit;
            if($r->credit>$r->debit)
            {
                 $saldo = "(".number_format($r->debit-$r->credit).")";
                $totalsaldo = ($r->debit-$r->credit)+$totalsaldo;
               
            } else {
               
                // $totalsaldo-=$r->debit-$r->credit;
                 $saldo = number_format($r->credit-$r->debit);
                // $totalsaldo+=$r->credit-$r->debit;
                $totalsaldo = ($r->credit-$r->debit)+$totalsaldo;
            }
            $arrEkuitas[$i]['saldo'] = $saldo;
            $i++;
        }
        // print_r($arrEkuitas);
        // echo 'saldo:'.$totalsaldo;
        // echo '--------------------------------------------------------------------------------';
        
        //       Akun pendapatan bersaldo kredit.
        $acctype = "a.idaccounttype=12 OR a.idaccounttype=16";
        $sql = "select a.idaccount,a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
                    from accountlog b
                    join account a ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
                    where ($acctype)
                    AND a.display ISNULL and a.active=TRUE
                    AND b.tanggal between '$startdate' and '$enddate'                
                    group by a.idaccount,a.accnumber,a.accname
                    order by a.accnumber";
         // $sql = "select a.idaccount,a.accnumber,a.accname,b.debit,sum(b.credit) as credit
         //        from account a
         //        join journalitem b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
         //        join journal c ON b.idjournal = c.idjournal
         //        where ".$this->fetchWhereUnit($idunit,'c')."
         //        and ($acctype)
         //        AND a.display ISNULL and a.active=TRUE AND b.debit=0
         //        AND c.datejournal between '$startdate' and '$enddate'
         //        group by a.idaccount,a.accnumber,a.accname,b.debit";
        $q = $this->db->query($sql);
        
        
        $arrPendapatan = array();
        $i = 0;
        $total=0;
        foreach ($q->result() as $r) {
            $arrPendapatan[$i]['accnumber'] = $r->accnumber;
            $arrPendapatan[$i]['accname'] = $r->accname;
            $arrPendapatan[$i]['debit'] = $r->debit;
            // $arrPendapatan[$i]['credit'] = $this->selisihNeracaSaldo($r->idaccount,$startdate, $enddate, $idunit, $acctype);
            $arrPendapatan[$i]['credit'] = $r->credit;
            if($r->credit>$r->debit)
            {$saldo = "(".number_format($r->debit-$r->credit).")";
                
                // $totalsaldo+=$r->credit-$r->debit;
                $totalsaldo = $totalsaldo-($r->credit-$r->debit);
            } else {
                $saldo = number_format($r->credit-$r->debit);
                $totalsaldo = $totalsaldo+($r->debit-$r->credit);
                // $totalsaldo-=$r->debit-$r->credit;
            }
            $arrPendapatan[$i]['saldo'] = $saldo;
            $i++;
        }
        // print_r($arrPendapatan);
        // echo 'saldo:'.$totalsaldo;
        // echo '--------------------------------------------------------------------------------';
         //Akun biaya bersaldo debit.
        $acctype = "a.idaccounttype=14 OR a.idaccounttype=15 OR a.idaccounttype=9 OR a.idaccounttype=10";
         $sql = "select a.idaccount,a.accnumber,a.accname,sum(b.debit) as debit,sum(b.credit) as credit
                    from accountlog b
                    join account a ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
                    where ($acctype)
                    AND a.display ISNULL and a.active=TRUE
                    AND b.tanggal between '$startdate' and '$enddate'                
                    group by a.idaccount,a.accnumber,a.accname
                    order by a.accnumber";
                    // echo $sql;
         // $sql = "select a.idaccount,a.accnumber,a.accname,b.debit,sum(b.credit) as credit
         //        from account a
         //        join journalitem b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'a')."
         //        join journal c ON b.idjournal = c.idjournal
         //        where ".$this->fetchWhereUnit($idunit,'c')."
         //        and ($acctype)
         //        AND a.display ISNULL and a.active=TRUE AND b.credit=0
         //        AND c.datejournal between '$startdate' and '$enddate'
         //        group by a.idaccount,a.accnumber,a.accname,b.debit";
        $q = $this->db->query($sql);
        
        
        $arrBiaya = array();
        $i = 0;
        $total=0;
        foreach ($q->result() as $r) {
            $arrBiaya[$i]['accnumber'] = $r->accnumber;
            $arrBiaya[$i]['accname'] = $r->accname;
            // $arrBiaya[$i]['debit'] = $this->selisihNeracaSaldo($r->idaccount,$startdate, $enddate, $idunit, $acctype);
            $arrBiaya[$i]['debit'] = $r->debit;
            if($r->debit>$r->credit)
            {
                $saldo = number_format($r->debit-$r->credit);
                $totalsaldo+=$r->debit-$r->credit;
            } else {
                $saldo = "(".number_format($r->credit-$r->debit).")";
                // $totalsaldo-=$r->credit-$r->debit;
                $totalsaldo = ($r->credit-$r->debit)+$totalsaldo;
            }
            $arrBiaya[$i]['saldo'] = $saldo;
            $arrBiaya[$i]['credit'] = 0;
            $i++;
        }
        // print_r($arrBiaya);
        // echo 'saldo:'.$totalsaldo;
        // echo '--------------------------------------------------------------------------------';
//        echo "<pre>";
//        print_r($arrKas);
//        echo '</pre>';
         $data = array(
            'arrKas'=>$arrKas,
            'arrUtang'=>$arrUtang,
            'arrEkuitas'=>$arrEkuitas,
            'arrPendapatan'=>$arrPendapatan,
            'arrBiaya'=>$arrBiaya,
            'totalsaldo'=>$totalsaldo,
            'periode'=>  str_replace("%20"," ", $sd),
            'unit'=>$namaunit,
            'option'=>$option,
        );
        
        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }

        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/neracaSaldo', $data,true);
            $filename = "labarugi_".$namaunit."_".$this->periode($sd, $nd).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/neracaSaldo', $data);
        }
        
  
    }
    
    function penggajian($idunit,$sd,$option=null)
    {
        $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $arr = explode("%20",$sd);
        
        $data = array(
                'periode'=>  str_replace("%20"," ", $sd),
                'unit'=>$q->namaunit,
                'option'=>$option
             );
        
        $month = getNoMonth($arr[0]);
        $year = $arr[1];
        
        
        $this->load->model('payroll/m_griddatagaji','model');
        $query = $this->model->query();
        
        $date1 = $year.'-'.$month.'-01';
        $date2 = $year.'-'.$month.'-'.cal_days_in_month(CAL_GREGORIAN, $month, $year);
        
        $wer = " WHERE b.idunit=$idunit AND a.datein BETWEEN '$date1' AND '$date2'";
        
        $query.= $wer;
        $data['data'] = $this->db->query($query);        
        
        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }

        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/penggajian', $data,true);
            $filename = "penggajian_".$q->namaunit."_".$sd.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/penggajian', $data);
        }
    }
    
    function generalledger($idunit,$sd,$nd=null,$option=null)
    {
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $data = array(
                'periode'=>  str_replace("%20"," ", $sd),
                'unit'=>$namaunit,
                 'option'=>$option
             );
         
          //ubah tanggal ke format date
        $startdateArr = explode("%20", $sd);
        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
        $enddate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-'.  lastday(getNoMonth($startdateArr[0]), $startdateArr[1]);
         
        $sql = "select idaccount,accname,accnumber"
                . " from account"
                . " where display is null and display ISNULL and active=TRUE AND"
                . " ".$this->fetchWhereUnit($idunit)." AND idaccount in (select a.idaccount
                                                        from journalitem a
                                                        join journal b ON a.idjournal = b.idjournal
                                                        where datejournal BETWEEN '$startdate' AND '$enddate')"
                . " order by accnumber";
        $q = $this->db->query($sql);
        $arrList = array();
        $i=0;
        foreach($q->result() as $r)
        {
            $arrList[$i]['accnumber'] = $r->accnumber;
            $arrList[$i]['accname'] = $r->accname;
            $idaccount = $r->idaccount;
            //ambil saldo awal akun di bulan sebelumnya
            $nm = getNoMonth($startdateArr[0]);
            $sql = "select balance from clossing
                    where ".$this->fetchWhereUnit($idunit)." and month='$nm' and idaccount=$idaccount";
            $qbalance = $this->db->query($sql);
            if($qbalance->num_rows()>0)
            {
                $r = $qbalance->row();   
                $bal = $r->balance;
            } else {
                $bal = 0;
            }
            $arrList[$i]['balance'] = $bal;
            
            //get jurnal
            $sqlJ = "select b.nojournal,b.memo,b.datejournal,a.debit,a.credit,c.idaccount,c.idaccounttype
                    from journalitem a
                    join journal b ON a.idjournal = b.idjournal
                    join account c ON a.idaccount = c.idaccount and b.idunit = c.idunit
                    where a.idaccount = $idaccount AND ".$this->fetchWhereUnit($idunit,'b')." AND datejournal BETWEEN '$startdate' AND '$enddate'"
                    . " order by datejournal asc";
            
            $qj = $this->db->query($sqlJ);
            
                 $ii=0;
                foreach($qj->result() as $rr)
                {
                    $arrList[$i]['transaction'][$ii]['datejournal'] = $rr->datejournal;
                    $arrList[$i]['transaction'][$ii]['nojournal'] = $rr->nojournal;
                    $arrList[$i]['transaction'][$ii]['memo'] = $rr->memo;
                    $arrList[$i]['transaction'][$ii]['debit'] = $rr->debit;
                    $arrList[$i]['transaction'][$ii]['credit'] = $rr->credit;
                    $arrList[$i]['transaction'][$ii]['idaccount'] = $rr->idaccount;
                    $arrList[$i]['transaction'][$ii]['idaccounttype'] = $rr->idaccounttype;
                    $ii++;
                }
           
            
            $i++;
        }
        $data['acclist'] = $arrList;

        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }

        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/generalledger', $data,true);
            $filename = "penggajian_".$q->namaunit."_".$sd.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/generalledger', $data);
        }
        // $this->load->view('report/generalledger', $data);
    }
    
    function JurnalUmum($idunit,$sd,$nd,$option=null)
    {
        $this->load->helper('report');
         
        $startdate = $sd;
        $enddate = $nd;
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $sqlJ = "select idjournal,nojournal,datejournal,memo
                from journal a
                where datejournal BETWEEN '$startdate' and '$enddate' and ".$this->fetchWhereUnit($idunit)." order by datejournal desc";
        $qj = $this->db->query($sqlJ);
        $d = array();
        $i=0;
        foreach ($qj->result() as $r)
        {
            $tglArr = explode("-", $r->datejournal);
            $d[$i]['datejournal'] = $tglArr[2].' '.ambilBulan($tglArr[1]).' '.$tglArr[0];
            $d[$i]['memo'] = $r->memo;
            $d[$i]['nojournal'] = $r->nojournal;
            
            $qjitem = "select debit,credit,accnumber,accname"
                    . " from journalitem a"
                    . " join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit).""
                    . " where idjournal = $r->idjournal";
            $qitem = $this->db->query($qjitem);
            $ii=0;
            $subtotaldebit=0;
            $subtotalcredit=0;
            foreach($qitem->result() as $rr)
            {
                // $d[$i]['item'][$ii]['nojournal'] = $r->nojournal;
                $d[$i]['item'][$ii]['accnumber'] = $rr->accnumber;
                $d[$i]['item'][$ii]['accname'] = $rr->accname;
                $d[$i]['item'][$ii]['debit'] = $rr->debit;
                $d[$i]['item'][$ii]['credit'] = $rr->credit;
                $subtotaldebit+=$rr->debit;
                $subtotalcredit+=$rr->credit;
                $ii++;
            }  
            $d[$i]['totaldebit'] = $subtotaldebit;
            $d[$i]['totalcredit'] = $subtotalcredit;
            $i++;
        }
        
        $data = array(
            'journal'=>$d,
            'periode'=>$this->periode($sd, $nd),
            'unit'=>$namaunit,
            'option'=>$option
        );

        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }
        
         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/jurnalumum', $data,true);
            $filename = "jurnalumum_".$namaunit."_".$sd."-".$nd.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/jurnalumum', $data);
        }
        
    }
    
    function kasmasuk($idunit,$sd,$nd,$option=null)
    {
        $this->load->helper('report');
         
        $startdate = $sd;
        $enddate = $nd;
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $sql1 = "select b.idjournal,b.datejournal,b.memo,b.nojournal,c.accname,a.debit,a.credit
                from journalitem a
                join journal b ON a.idjournal = b.idjournal
                join account c ON a.idaccount = c.idaccount and ".$this->fetchWhereUnit($idunit,'c')."
                where datejournal BETWEEN '$startdate' and '$enddate' and ".$this->fetchWhereUnit($idunit,'b')."
                and (c.idaccounttype=1 or c.idaccounttype=19) and credit = 0";
                // echo $sql1;
        $qj = $this->db->query($sql1);
        $d = array();
        $i=0;
        foreach ($qj->result() as $r)
        {
            $d[$i]['datejournal'] = $r->datejournal;
            $d[$i]['memo'] = $r->memo;
            $d[$i]['nojournal'] = $r->nojournal;
            
            $qjitem = "select debit,credit,accnumber,accname"
                    . " from journalitem a"
                    . " join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b').""
                    . " where idjournal = $r->idjournal";
            $qitem = $this->db->query($qjitem);
            $ii=0;
             $subtotaldebit=0;
            $subtotalcredit=0;
            foreach($qitem->result() as $rr)
            {
                // $d[$i]['item'][$ii]['nojournal'] = $r->nojournal;
                $d[$i]['item'][$ii]['accnumber'] = $rr->accnumber;
                $d[$i]['item'][$ii]['accname'] = $rr->accname;
                $d[$i]['item'][$ii]['debit'] = $rr->debit;
                $d[$i]['item'][$ii]['credit'] = $rr->credit;
                $subtotaldebit+=$rr->debit;
                $subtotalcredit+=$rr->credit;
                $ii++;
            }  
            $d[$i]['totaldebit'] = $subtotaldebit;
            $d[$i]['totalcredit'] = $subtotalcredit;
            $i++;
        }
        
         $data = array(
            'journal'=>$d,
            'periode'=>$this->periode($sd, $nd),
            'unit'=>$namaunit,
            'option'=>$option
        );

       if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }
        
         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/kasmasuk', $data,true);
            $filename = "kasmasuk_".$namaunit."_".$sd."-".$nd.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/kasmasuk', $data);
        }
    }
    
    function kaskeluar($idunit,$sd,$nd,$option=null)
    {
        $this->load->helper('report');
         
        $startdate = $sd;
        $enddate = $nd;
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $sql1 = "select a.idjournal,a.datejournal,a.memo,a.nojournal
                from journal a
                where datejournal BETWEEN '$startdate' and '$enddate' and ".$this->fetchWhereUnit($idunit,'a')." and (idjournaltype = 7 OR idjournaltype=2)";
        $qj = $this->db->query($sql1);
        $d = array();
        $i=0;
        foreach ($qj->result() as $r)
        {
            $d[$i]['datejournal'] = $r->datejournal;
            $d[$i]['memo'] = $r->memo;
            $d[$i]['nojournal'] = $r->nojournal;
            
            $qjitem = "select debit,credit,accnumber,accname"
                    . " from journalitem a"
                    . " join account b ON a.idaccount = b.idaccount and ".$this->fetchWhereUnit($idunit,'b').""
                    . " where idjournal = $r->idjournal";
                    // echo $qjitem;
            $qitem = $this->db->query($qjitem);
            $ii=0;
             $subtotaldebit=0;
            $subtotalcredit=0;
            foreach($qitem->result() as $rr)
            {
                $d[$i]['item'][$ii]['nojournal'] = $r->nojournal;
                $d[$i]['item'][$ii]['accnumber'] = $rr->accnumber;
                $d[$i]['item'][$ii]['accname'] = $rr->accname;
                $d[$i]['item'][$ii]['debit'] = $rr->debit;
                $d[$i]['item'][$ii]['credit'] = $rr->credit;
                 $subtotaldebit+=$rr->debit;
                $subtotalcredit+=$rr->credit;
                $ii++;
            }  
            $d[$i]['totaldebit'] = $subtotaldebit;
            $d[$i]['totalcredit'] = $subtotalcredit;
            $i++;
        }
        
         $data = array(
            'journal'=>$d,
            'periode'=>$this->periode($sd, $nd),
            'unit'=>$namaunit,
            'option'=>$option
        );

        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 18;
        }
        
         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/kaskeluar', $data,true);
            $filename = "kaskeluar_".$namaunit."_".$sd."-".$nd.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/kaskeluar', $data);
        }
    }
    
//    function neracasaldo($idunit,$sd,$option=null)
//    {
//           //ubah tanggal ke format date
//        $startdateArr = explode("%20", $sd);
//        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
//        $enddate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-'.  lastday(getNoMonth($enddateArr[0]), $enddateArr[1]);
//        
//        $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
//        
//         $sql1 = "select b.idjournal,b.datejournal,b.memo,b.nojournal,c.accname,a.debit,a.credit
//                from journalitem a
//                join journal b ON a.idjournal = b.idjournal
//                join account c ON a.idaccount = c.idaccount
//                where datejournal BETWEEN '$startdate' and '$enddate' and b.idunit = $idunit
//                and (c.idaccounttype=1 or c.idaccounttype=19) and credit = 0";
//        $qj = $this->db->query($sql1);
//        $d = array();
//        $i=0;
//        foreach ($qj->result() as $r)
//        {
//            
//        }
//        
//        
//    }
    
    function daftarbarang($idunit,$option=null)
    {
        $sql = "select a.idinventory,invno,nameinventory,a.description,cost,qtystock,unitmeasure,b.namecat,d.namaunit
                    from inventory a
                    join inventorycat b ON a.idinventorycat = b.idinventorycat
                    join inventoryunit c ON a.idinventory = c.idinventory
                    join unit d ON c.idunit = d.idunit
                    where ".$this->fetchWhereUnit($idunit,'c')."";
                    // echo $sql;
        $qj = $this->db->query($sql);
        $d = array();
        $i=0;
        foreach ($qj->result() as $r)
        {
            $d[$i]['invno'] = $r->invno;
            $d[$i]['nameinventory'] = $r->nameinventory;
            $d[$i]['cost'] = $r->cost;
            $d[$i]['qtystock'] = $r->qtystock;
            $d[$i]['unitmeasure'] = $r->unitmeasure;
            $d[$i]['total'] = $r->cost*$r->qtystock;
            $d[$i]['namaunit'] = $r->namaunit;
            $i++;
        }
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $data = array(
            'data'=>$d,
            'unit'=>$namaunit,
            'option'=>$option
        );

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        
         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/daftarbarang', $data,true);
            $filename = "daftarbarang_".$namaunit.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/daftarbarang', $data);
        }
    }
    
    function barangdibeli($idunit,$sd,$nd,$option=null)
    {
        $startdate = $sd;
        $enddate = $nd;
        
        $sql = "select c.nameinventory,c.unitmeasure,a.idpurchase, a.idinventory,a.qty,a.price,a.total,a.invno,b.nopurchase,b.memo,b.date,b.idunit,d.namecurr
                from purchaseitem a
                join purchase b ON a.idpurchase = b.idpurchase
                join inventory c ON a.idinventory = c.idinventory
                join currency d ON d.idcurrency = b.idcurrency
                where ".$this->fetchWhereUnit($idunit,'b')." AND date BETWEEN '$startdate' and '$enddate'";
        $qj = $this->db->query($sql);
        $d = array();
        $i=0;
        $total=0;
        foreach ($qj->result() as $r)
        {
            $d[$i]['invno'] = $r->invno;
            $d[$i]['nameinventory'] = $r->nameinventory;
            $d[$i]['qty'] = $r->qty;
            $d[$i]['namecurr'] = $r->namecurr;
            $d[$i]['unitmeasure'] = $r->unitmeasure;
            $d[$i]['total'] = $r->total;
            $i++;
            $total+=$r->total;
        }
        
        // $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        $namaunit = $this->fetchUnit($idunit);
        
        $data = array(
            'data'=>$d,
            'periode'=>$this->periode($sd, $nd),
            'unit'=>$namaunit,
            'option'=>$option,
            'total'=>$total
        );

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        
         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/barangdibeli', $data,true);
            $filename = "barangdibeli_".$namaunit."_".$sd."_".$nd.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/barangdibeli', $data);
        }
    }
    
    function recursiveAkun($idunit, $idaccount,$idaccounttype) {
        return $this->checkChildAkun($idunit, $idaccount,$idaccounttype);
    }

    function checkChildAkun($idunit, $idaccount,$idaccounttype) {

        $sql = "select a.idaccount,a.accnumber,a.accname,a.balance,a.idpos,b.acctypename
                    from account a
                    LEFT JOIN accounttype b ON a.idaccounttype = b.idaccounttype
                    where a.idunit = $idunit and a.idaccounttype=$idaccounttype and a.idparent=$idaccount
                    AND a.display ISNULL and a.active=TRUE";
//        echo $sql,'<hr>';
//        exit;
        $qkas = $this->db->query($sql);
        if ($qkas->num_rows() > 0) {
            $arr = array();
            $i = 0;
            $total=0;
            foreach ($qkas->result() as $r) {
                $arr[$i]['accnumber'] = $r->accnumber;
                $arr[$i]['accname'] = $r->accname;
                $arr[$i]['balance'] = $r->balance;
                $arr[$i]['idpos'] = $r->idpos;
                 $arr[$i]['acctypename'] = $r->acctypename;
//                echo $r->accname;
//                exit;
                $recursive = $this->recursiveAkun($idunit, $r->idaccount,$idaccounttype);
                $arr[$i]['child'] = $recursive['data'];
                $i++;
                $total+=$r->balance+$recursive['total'];
            }
            return array('data'=>$arr,'total'=>$total);
        } else {
            return array('data'=>'false','total'=>0);
        }
    }
    
    function getDataAkun($idunit = null, $idaccounttype) {


        $sql = "select a.idaccount,a.accnumber,a.accname,a.balance,a.idpos,b.acctypename
                    from account a
                    LEFT JOIN accounttype b ON a.idaccounttype = b.idaccounttype
                    where a.idunit = $idunit and a.idaccounttype=$idaccounttype and a.idpos=1
                    AND a.display ISNULL and a.active=TRUE";
        $qkas = $this->db->query($sql);
        
        $arr = array();
        $i = 0;
        $total=0;
        foreach ($qkas->result() as $r) {
        
            $arr[$i]['accnumber'] = $r->accnumber;
            $arr[$i]['accname'] = $r->accname;
            $arr[$i]['balance'] = $r->balance;
            $arr[$i]['idpos'] = $r->idpos;
            $arr[$i]['acctypename'] = $r->acctypename;
//            echo $r->accname;
            $child = $this->checkChildAkun($idunit, $r->idaccount,$idaccounttype);
            $arr[$i]['child'] = $child['data'];
//            echo $r->accname.'-'.$arr[$i]['child'].'<br>';
            $i++;
            $total+=$r->balance;
        }
        return array('data'=>$arr,'total'=>$total);
    }
    
    function daftarakun($idunit,$option=null) {
        
        $this->load->helper('report');
        
        //ubah tanggal ke format date
//        $startdateArr = explode("%20", $sd);
//        $startdate = $startdateArr[1].'-'.getNoMonth($startdateArr[0]).'-01';
//        $enddateArr = explode("%20", $nd);
//        $enddate = $enddateArr[1].'-'.getNoMonth($enddateArr[0]).'-'.  lastday(getNoMonth($enddateArr[0]), $enddateArr[1]);
        
        $q = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
        
        $kas = $this->getDataAkun($idunit, 19);
        $bank = $this->getDataAkun($idunit, 1);
        $piutang = $this->getDataAkun($idunit, 2);
        $persediaan = $this->getDataAkun($idunit, 20);
        $hartatetap = $this->getDataAkun($idunit, 4);
        $hutanglancar = $this->getDataAkun($idunit, 18);
        $hutangpanjang = $this->getDataAkun($idunit, 9);
        $kewajibanlain = $this->getDataAkun($idunit, 10);
        $modal = $this->getDataAkun($idunit, 11);
                
        $data = array(
            'kas'=>$kas['data'],
            'bank'=>$bank['data'],
            'piutang'=>$piutang['data'],
            'persediaan'=>$persediaan['data'],
            'hartatetap'=>$hartatetap['data'],
            'hartatetap'=>$hartatetap['data'],
            'hutanglancar'=>$hutanglancar['data'],
            'hutangpanjang'=>$hutangpanjang['data'],
            'kewajibanlain'=>$kewajibanlain['data'],
            'modal'=>$modal['data'],
            'totalharta'=>$kas['total']+$bank['total']+$piutang['total']+$persediaan['total']+$hartatetap['total'],
            'totalkewajiban'=>$hutanglancar['total']+$hutangpanjang['total']+$kewajibanlain['total'],
            'totalmodal'=>$modal['total'],
//            'periode'=>$this->periode($sd, $nd),
            'unit'=>$q->namaunit,
            'option'=>$option,
            'arrHarta' => array(
                'kas' => 'Kas',
                'bank' => 'Bank',
                'piutang' => 'Piutang',
                'persediaan' => 'Persediaan',
                'hartatetap' => 'Harta Tetap'
            ),
            'arrKewajiban' => array(
                'hutanglancar' => 'Hutang Lancar',
                'hutangpanjang' => 'Hutang Jangka Panjang',
                'kewajibanlain' => 'Kewajiban Lain'
            ),
            'arrModal' => array(
                'modal' => 'Modal'
            )
        );

if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        
        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/daftarakun', $data,true);
            $filename = "daftarakun_".$q->namaunit.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/daftarakun', $data);
        }
    }
    
    function tes() {
         $filename = "file.xls";
        header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
        header("Content-type:   application/x-msexcel; charset=utf-8");
        header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: max-age=0");
        echo "<table width='400' border='0'>
            <tr>
                    <td><div style='margin-left: 20px'>1</div></td>
                    <td>2</td>
            </tr>
            <tr>
                    <td><div style='margin-left: 40px'>1</div></td>
                    <td>2</td>
            </tr>
            <tr>
                    <td><div style='margin-left: 40px'>1</div></td>
                    <td>2</td>
            </tr>
            <tr>
                    <td><div style='margin-left: 20px'>1</div></td>
                    <td>2</td>
            </tr>
            </table>";
    }

    function fetchWhereUnit($unit,$alias=null)
    {
        $u = explode(",", $unit);
        // echo count($u);
        
        $i=1;
        $where='(';
        foreach ($u as $key => $value) {
            // $q = $this->db->get_where('unit',array('idunit'=>$value))->row();

            if($alias==null)
            {
                $where.= $alias.'idunit='.$value;
            } else {
                $where.= $alias.'.idunit='.$value;
            }
            

            if($i<count($u))
            {
                $where.=" OR ";
            }
            $i++;            
        }
        $where.=')';
        return $where;
    }

    function fetchUnit($unit)
    {
        $u = explode(",", $unit);
        // echo count($u);
        
        $i=1;
        $namaunit='';
        foreach ($u as $key => $value) {
            $q = $this->db->get_where('unit',array('idunit'=>$value))->row();

            $namaunit.= $q->namaunit;
            if($i<count($u))
            {
                $namaunit.=", ";
            }
            $i++;            
        }
        return $namaunit;
    }

    function generate($model,$idunit,$sd,$nd,$option=null)
    {
        // $model = $this->uri->segment(2);

        // $data['title'] = "REKAP PENGGAJIAN";
        $u = explode(",", $idunit);
        // echo count($u);
        
        $namaunit = $this->fetchUnit($idunit);

        if($nd=='null')
        {
            $nd=$sd;
        }

        $arrSd = explode("%20",$sd);
        $arrNd = explode("%20",$nd);

        if($sd==$nd)
        {
            $periode = $sd;
        } else {
            $periode = $sd.' s/d '.$nd;
        }

        $data = array(
                'periode'=>  str_replace("%20"," ", $periode),
                'unit'=>$namaunit,
                'option'=>$option
             );
        
        $monthSD = getNoMonth($arrSd[0]);
        $yearSD = $arrSd[1];

        $monthND = getNoMonth($arrNd[0]);
        $yearND = $arrNd[1];
        
        
        $this->load->model('report/m_'.$model,'model');
        $query = $this->model->query();
        
        $startdate = $yearSD.'-'.$monthSD.'-01';
        $enddate = $yearND.'-'.$monthND.'-'.cal_days_in_month(CAL_GREGORIAN, $monthND, $yearND);
        
        $wer = $this->model->whereQuery($idunit,$startdate,$enddate);
        
        $query.= $wer;
        $query.= $this->model->groupBy();
        // echo $query;
        $data['data'] = $this->db->query($query);  

        $data['label'] = $this->model->columnLabel();      
        
        $data['title'] = $this->model->title();

        // print_r($data); 

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($model=='rekapgaji')
        {
            $data['tablewidth'] = '120%';
        } else {
            $data['tablewidth'] = '100%';
        }
        
        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/tpl_rekap_2', $data,true);
            $filename = $model."_".$q->namaunit."_".str_replace(" ", "_", $periode).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/tpl_rekap_2', $data);
        }
    }
    
    function penerimaanTahun($idunit=null,$tahun,$option=null)
    {
        $namaunit = $this->fetchUnit($idunit);
        $data = array(
            'periode'=> $tahun,
            'unit'=>$namaunit,
            'option'=>$option,
            'title'=>'Laporan Penerimaan Tahunan'
        );
        
        $q = $this->db->query("select idaccount,idunit,accnumber,accname
            from account 
            where idaccounttype=12 and idpos=2 and idunit=$idunit and display is null");
        
        $report = array();    
        $i=0;
        foreach($q->result() as $r)
        {
            $report[$i]['accname'] = $r->accname.'.'.$r->accnumber;
            for($bulan=1;$bulan<=12;$bulan++)
            {
                if($bulan<10)
                {
                    $month = '0'.$bulan;    
                } else {
                    $month = $bulan;
                }
                
                $startdate = $tahun.'-'.$month.'-01';
                $enddate = $tahun.'-'.$month.'-'.cal_days_in_month(CAL_GREGORIAN, $month, $tahun);
                
                 $qpendapatan = $this->db->query("select sum(amount) as jumlah
                                                    from receivemoneyitem a
                                                    join receivemoney b ON a.idreceivemoney = b.idreceivemoney
                                                    where a.idaccount = $r->idaccount 
                                                    and b.datetrans between '$startdate' and '$enddate'");
                                                    
                if($qpendapatan->num_rows()>0)
                {
                    $rpendapatan = $qpendapatan->row();
                    $report[$i]['pendapatan'][$bulan] = $rpendapatan->jumlah;
                } else {
                    $report[$i]['pendapatan'][$bulan] = 0;
                }                
            }     
           $i++;
        }
        $data['report'] = $report;
        
//        print_r($report);

        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
            $data['tablewidth'] = '100%';
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 14;
            $data['tablewidth'] = '150%';
        }
     
     
    $data['daftarbulan'] = array('01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' => 'Desember');
         
     if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/penerimaan', $data,true);
            $filename = "PENERIMAAN_SISWA_".$namaunit ."_".str_replace(" ", "_", $periode).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/penerimaan', $data);
        }
    }
    
    function PenerimaanSiswaBulan($idunit=null,$sd,$nd,$option=null)
    {
        $namaunit = $this->fetchUnit($idunit);
        
        if($nd=='null')
        {
            $nd=$sd;
        }

        $arrSd = explode("%20",$sd);
        $arrNd = explode("%20",$nd);

        if($sd==$nd)
        {
            $periode = $sd;
        } else {
            $periode = $sd.' s/d '.$nd;
        }

        $data = array(
                'periode'=>  str_replace("%20"," ", $periode),
                'unit'=>$namaunit,
                'option'=>$option,
                'title'=>'Penerimaan Siswa Bulanan'
             );
             
        $monthSD = getNoMonth($arrSd[0]);
        $yearSD = $arrSd[1];

        $monthND = getNoMonth($arrNd[0]);
        $yearND = $arrNd[1];
        
        $startdate = $yearSD.'-'.$monthSD.'-01';
        $enddate = $yearND.'-'.$monthND.'-'.cal_days_in_month(CAL_GREGORIAN, $monthND, $yearND);
        $data['startdate'] = $startdate;
        $data['enddate'] = $enddate;
        
        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        $data['tablewidth'] = '95%';
        
        //kolom
        $q = $this->db->query("select idaccount,idunit,accnumber,accname
            from account 
            where idaccounttype=12 and idpos=2 and idunit=$idunit and display is null");
//            echo $this->db->last_query();
        $data['kolom'] = $q;
        
        $q = $this->db->query("select idsiswa,namasiswa
            from siswa 
            where display is null and idunit=$idunit");
//            echo $this->db->last_query();
        $data['siswa'] = $q;
        
        if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/penerimaan_siswa_bulan', $data,true);
            $filename = "PENERIMAAN_SISWA_".$namaunit ."_".str_replace(" ", "_", $periode).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/penerimaan_siswa_bulan', $data);
        }
    }
    
    function pengeluaranTahun($idunit=null,$tahun,$option=null)
    {
        $namaunit = $this->fetchUnit($idunit);
        $data = array(
            'periode'=> $tahun,
            'unit'=>$namaunit,
            'option'=>$option,
            'title'=>'Laporan Pengeluaran Tahunan'
        );
        
        $q = $this->db->query("select idaccount,idunit,accnumber,accname
            from account 
            where (idaccounttype=14 OR idaccounttype=15) and idpos=2 and idunit=$idunit and display is null");
        
        $report = array();    
        $i=0;
        foreach($q->result() as $r)
        {
            $report[$i]['accname'] = $r->accname.'.'.$r->accnumber;
            for($bulan=1;$bulan<=12;$bulan++)
            {
                if($bulan<10)
                {
                    $month = '0'.$bulan;    
                } else {
                    $month = $bulan;
                }
                
                $startdate = $tahun.'-'.$month.'-01';
                $enddate = $tahun.'-'.$month.'-'.cal_days_in_month(CAL_GREGORIAN, $month, $tahun);
                
                 $qpendapatan = $this->db->query("select sum(amount) as jumlah
                                                    from spendmoneyitem a
                                                    join spendmoney b ON a.idspendmoney = b.idspendmoney
                                                    where a.idaccount = $r->idaccount 
                                                    and b.datetrans between '$startdate' and '$enddate'");
                                                    
                if($qpendapatan->num_rows()>0)
                {
                    $rpendapatan = $qpendapatan->row();
                    $report[$i]['pendapatan'][$bulan] = $rpendapatan->jumlah;
                } else {
                    $report[$i]['pendapatan'][$bulan] = 0;
                }                
            }     
           $i++;
        }
        $data['report'] = $report;
        
//        print_r($report);

        if($option=='print')
        {
            $data['fontsize'] = 9;
            $data['lineheight'] = 12;
            $data['tablewidth'] = '100%';
        } else {
            $data['fontsize'] = 12;
            $data['lineheight'] = 14;
            $data['tablewidth'] = '150%';
        }
     
     
    $data['daftarbulan'] = array('01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' => 'Desember');
         
     if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/penerimaan', $data,true);
            $filename = "PENGELUARAN_SISWA_".$namaunit ."_".str_replace(" ", "_", $periode).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/penerimaan', $data);
        }
    }

    function generatetab($model,$idunit=null,$sd,$nd,$option=null)
    {
        //generate report with cross tab
        if($nd=='null')
        {
            $nd=$sd;
        }

        $arrSd = explode("%20",$sd);
        $arrNd = explode("%20",$nd);

        if($sd==$nd)
        {
            $periode = $sd;
        } else {
            $periode = $sd.' s/d '.$nd;
        }

        $u = explode(",", $idunit);
        // echo count($u);
        
        $namaunit = $this->fetchUnit($idunit);

        $data = array(
                'periode'=>  str_replace("%20"," ", $periode),
                'unit'=>$namaunit,
                'option'=>$option
             );
        
        $monthSD = getNoMonth($arrSd[0]);
        $yearSD = $arrSd[1];

        $monthND = getNoMonth($arrNd[0]);
        $yearND = $arrNd[1];
        
        
        $this->load->model('report/m_'.$model,'model');
        // $query = $this->model->query();
        
        $startdate = $yearSD.'-'.$monthSD.'-01';
        $enddate = $yearND.'-'.$monthND.'-'.cal_days_in_month(CAL_GREGORIAN, $monthND, $yearND);

        $this->load->model('report/m_'.$model,'model');
        $columnField = $this->model->columnField();
        // print_r($columnField);

        $valueField = $this->model->valueField();
// echo $columnField['table'];
        // $this->db->select($columnField['pkfield']);
        $q1 = $this->db->get($columnField['table']);

        // echo $this->db->num_rows();
// print_r($q1->result_array);

        $qemployee = $this->db->get_where('employee',array('idunit'=>$idunit));

        $dat = array();
        $i=0;
        foreach ($qemployee->result() as $remp) {
            foreach ($q1->result_array() as $r) {

                $pkfield = $r[$columnField['pkfield']];
                // echo 'pekafield:'.$pkfield;

                    $dat[$i]['code'] = $remp->code;
                    $dat[$i]['lastname'] = $remp->lastname;

                    $sql = $this->model->query($startdate,$enddate,$pkfield,$remp->idemployee);
                            // echo $sql.'<hr>';
                    $query = $this->db->query($sql);
                    if($query->num_rows()>0)
                    {
                        $row = $query->row();
                        $total = $row->total;

                        // $data['lastname'] = $row->lastname;
                        
                        // $data[$i] = ar
                    }  else {
                        $total = 0;
                    }
                    $dat[$i][$r[$columnField['field']]] = $total;                
            }
            $i++;
        }
// print_r($dat);
        $data['data'] = $dat;  

        $label = array(
                'No Pegawai'=>'txt:code',
                'Nama Lengkap'=>'txt:lastname'
            );
        foreach ($q1->result_array() as $r) {
            $label[str_replace("Tunjangan ","", $r[$columnField['field']])]="num:".$r[$columnField['field']]."";
        }
        $data['label'] = $label;      
        
        $data['title'] = $this->model->title(); 

            if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }

        // print_r($data);
         if($option=='excel')
        {
            //cetak ke excel
            $html = $this->load->view('report/tpl_rekap_nonarray', $data,true);
            $filename = $model."_".$q->namaunit."_".str_replace(" ", "_", $periode).".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/tpl_rekap_nonarray', $data);
        }
    }

    function rekapkehadiran($idcompany=null,$idjabatan=null,$idorganisasi=null,$startdate=null,$enddate=null)
    {

    }

    function testis()
    {
        $this->load->helper('common');
        echo fetchUnit("1,2","a");
    }

}

?>