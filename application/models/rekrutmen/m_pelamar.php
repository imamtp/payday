<?php

class m_pelamar extends CI_Model {

    function tableName() {
        return 'pelamar';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "namalengkap,alamat";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,namalengkap,tgllahir,a.idsex,b.sexname,noktp,alamat,notelp,nohandphone,jabatandituju,tgllamaran,a.status,a.userin,a.datein,tempatlahir,a.idstatuskawin,a.email,daerahrekrut,alamatktp,d.idjenjangpendidikan,d.namajenjang,fakultas,jurusan,foto,cv,referensi,sumberlamaran,namastatuskawin,keterangan,e.statuscalon,f.companyname";
    }

    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodelevel'=>'Kode Level'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    left join sextype b ON a.idsex = b.idsex
                    left join statuskawin c ON a.idstatuskawin = c.idstatuskawin
                    left join jenjangpendidikan d ON a.idjenjangpendidikan = d.idjenjangpendidikan
                    left join calonpelamar e ON a.idpelamar = e.idpelamar
                    join company f ON a.idcompany = f.idcompany";

        return $query;
    }

    function whereQuery() {
        // if($this->session->userdata('idcompany')==1)
        // {
        //     //master
        //     $wer = " AND (a.idcompany=".$this->session->userdata('idcompany').")";
        // } else  if($this->session->userdata('idcompany')!=1)
        //     {
        //         //selain master admin
        //         $wer = " AND (a.idcompany=".$this->session->userdata('idcompany')." OR a.idcompany=1)";
        //     } else {
                // $wer = "AND a.status!='Aktif' and a.status!='Belum Ada Status' and a.idpelamar not in (select idpelamar from calonpelamar where statuscalon!='Disetujui' or statuscalon!='Tindak Lanjut')";
        //     }
         $wer = null;
        if($this->input->post('startdate')!=null && $this->input->post('enddate')!=null)
        {
            $startdate = backdate2_reverse($this->input->post('startdate'));
            $enddate = backdate2_reverse($this->input->post('enddate'));
            $wer.=" AND tgllamaran BETWEEN '$startdate' AND '$enddate'";
        }
         return "a.display is null ".$this->m_data->whereCompany('a',false)." $wer";
    }

    function orderBy() {
        return "a.idpelamar desc";
    }

    function updateField() {
        $status = $this->input->post('status');
        if($this->input->post('statusformPelamar')=='input')
        {
            //cek no KTP sama
            $this->db->select('noktp');
            $q = $this->db->get_where('pelamar',array('noktp'=>$this->input->post('noktp'),'idcompany'=>$this->session->userdata('idcompany'),'display'=>null));
            if($q->num_rows()>0)
            {
                $json = array('success' => false, 'message' => 'No KTP '.$this->input->post('noktp').' sudah ada di dalam database');
                echo json_encode($json);
                exit;
            }

            $idpelamar = $this->m_data->getSeqVal('seq_pelamar','calonpelamar','idpelamar');
            $this->db->insert('calonpelamar',array('idpelamar'=>$idpelamar,'statuscalon'=>$status));

            $this->db->insert('identitas',array('idpelamar'=>$idpelamar,'nomorktp'=>$this->input->post('noktp')));
        } else {
            $idpelamar = $this->input->post('idpelamar');

            $this->db->select('noktp');
            $q = $this->db->get_where('pelamar',array('idpelamar'=>$this->input->post('idpelamar'),'display'=>null));
            if($q->num_rows()>0)
            {
                $r = $q->row();
                if($r->noktp!=$this->input->post('noktp'))
                {
                    $q2 = $this->db->query("select noktp from pelamar where noktp ='".$this->input->post('noktp')."' and idpelamar!=$idpelamar and idcompany = ".$this->session->userdata('idcompany')." and display is null");
                    if($q2->num_rows()>0)
                    {
                        $json = array('success' => false, 'message' => 'No KTP '.$this->input->post('noktp').' sudah ada di dalam database');
                        echo json_encode($json);
                        exit;
                    }
                }
            }

            $q = $this->db->get_where('identitas',array('idpelamar'=>$idpelamar));
            if($q->num_rows()>0)
            {
                $this->db->where(array('idpelamar'=>$idpelamar));
                $this->db->update('identitas',array('nomorktp'=>$this->input->post('noktp')));
            } else {
                $this->db->insert('identitas',array('idpelamar'=>$idpelamar,'nomorktp'=>$this->input->post('noktp')));

            }

            if($status=='Disetujui')
            {
              //masuk ke data karyawan
              $this->db->where('idpelamar',$idpelamar);
              $this->db->update('calonpelamar',array('statuscalon'=>$status));

              //kalau sudah ada di tabel pekerjaan(artinya sudah diseleksi) ubah statuspergerakan menjadi disetujui juga
              $qp = $this->db->get_where('pekerjaan',array('idpelamar'=>$idpelamar));
              if($qp->num_rows()>0)
              {
                $this->db->where('idpelamar',$idpelamar);
                $this->db->update('pekerjaan',array('statuspergerakan'=>$status));
              }
              $qp->free_result();
			  
			  //

            }
        }

        $data = array(
            'idpelamar' => $idpelamar,
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namalengkap' => strtoupper($this->input->post('namalengkap')),
            // 'tgllahir' => $this->input->post('tgllahir'),
            'tgllahir' => backdate2_reverse($this->input->post('tgllahir')),
            // 'enddate' => backdate2_reverse($this->input->post('enddate')),
            'noktp' => $this->input->post('noktp'),
            'idsex' => $this->m_data->getID('sextype', 'sexname', 'idsex', $this->input->post('sexname')),
            'alamat' => $this->input->post('alamat'),
            'notelp' => $this->input->post('notelp'),
            'nohandphone' => $this->input->post('nohandphone'),
            'jabatandituju' => $this->input->post('jabatandituju'),
            'tgllamaran' => backdate2_reverse($this->input->post('tgllamaran')),
            'status' => $status,
            'keterangan' => $this->input->post('status')=='Diajukan' ? 'Ditindak Lanjuti' : null,
            'tempatlahir' => $this->input->post('tempatlahir'),
            'idstatuskawin' => $this->m_data->getID('statuskawin', 'namastatuskawin', 'idstatuskawin', $this->input->post('namastatuskawin')),
            'email' => $this->input->post('email'),
            'daerahrekrut' => $this->input->post('daerahrekrut'),
            'alamatktp' => $this->input->post('alamatktp'),
            'idjenjangpendidikan' => $this->m_data->getID('jenjangpendidikan', 'namajenjang', 'idjenjangpendidikan', $this->input->post('namajenjang')),
            'fakultas' => $this->input->post('fakultas'),
            'jurusan' => $this->input->post('jurusan'),
            'idcompany' => $this->session->userdata('idcompany'),
            // 'foto' => $this->input->post('status'),
            // 'cv' => $this->input->post('status'),
            'referensi' => $this->input->post('referensi'),
            'sumberlamaran' => $this->input->post('sumberlamaran')
        );

        $config['upload_path'] = './upload/foto';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '1100';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload');

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('foto'))
        {
            $error = $this->upload->display_errors();
            if($error!='<p>You did not select a file to upload.</p>')
            {
                $json = array('success' => false, 'message' => 'Upload Foto: '.$error);
                echo json_encode($json);
                exit;
            } else {

            }
        }
        else
        {
             // $this->prosesSaveKepegawaian($this->upload->data()['orig_name'],$input);
            $data['foto'] = $this->upload->data()['orig_name'];
        }

        $config['upload_path'] = './upload/cv';
        $config['allowed_types'] = 'pdf|doc|docx';
        $config['max_size'] = '6000';

        $this->load->library('upload');

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('cv'))
        {
          $error = $this->upload->display_errors();
          if($error!='<p>You did not select a file to upload.</p>')
          {
              $json = array('success' => false, 'message' => 'Upload CV: '.$error);
              echo json_encode($json);
              exit;
          } else {

          }
        }
        else
        {
             // $this->prosesSaveKepegawaian($this->upload->data()['orig_name'],$input);
            $data['cv'] = $this->upload->data()['orig_name'];
        }
        return $data;
    }

}

?>
