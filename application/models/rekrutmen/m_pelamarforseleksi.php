<?php

class m_pelamarforseleksi extends CI_Model {

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
        return "a.idpelamar,e.statuscalon,a.namalengkap,tgllahir,a.idsex,b.sexname,a.noktp,a.alamat,a.notelp,a.nohandphone,a.jabatandituju,tgllamaran,a.status,a.userin,a.datein,tempatlahir,a.idstatuskawin,a.email,daerahrekrut,alamatktp,d.idjenjangpendidikan,d.namajenjang,fakultas,jurusan,foto,cv,referensi,sumberlamaran,namastatuskawin,keterangan,f.companyname";
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
         if($this->input->post('option')=='seleksi_pelamar_list'){
            $wer = " and a.idpelamar not in (select idpelamar from pekerjaan)";
         } else {
            // $wer = " and e.statuscalon='Diajukan'";
         }
          $wer .= " and e.statuscalon='Diajukan'";
         return "a.display is null ".$this->m_data->whereCompany('a',false)." $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $status = $this->input->post('status');
        if($this->input->post('statusformPelamar')=='input')
        {
            $idpelamar = $this->m_data->getSeqVal('seq_pelamar');
            if($status=='Disetujui')
            {
                $this->db->insert('calonpelamar',array('idpelamar'=>$idpelamar));
            }
        } else {
            $idpelamar = $this->input->post('idpelamar');
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
        $config['max_size'] = '10000';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload');

        $this->upload->initialize($config); 

        if (!$this->upload->do_upload('foto'))
        {
            // $error = $this->upload->display_errors();
            // // echo $error;
            // if($error!='<p>You did not select a file to upload.</p>')
            // {
            //     echo "{success:false, message:'".$error."'}";
            // } else {
            //     // echo "{success:false, message:'simpan prosess'}";
            //     $this->prosesSaveKepegawaian(null,$input);
            // }
            // $foto = null;
        }
        else
        {
             // $this->prosesSaveKepegawaian($this->upload->data()['orig_name'],$input);
            $data['foto'] = $this->upload->data()['orig_name'];
        }

        $config['upload_path'] = './upload/cv';
        $config['allowed_types'] = '*';
        $config['max_size'] = '10000';

        $this->load->library('upload');

        $this->upload->initialize($config); 

        if (!$this->upload->do_upload('cv'))
        {
            // print_r($this->upload->display_errors());
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