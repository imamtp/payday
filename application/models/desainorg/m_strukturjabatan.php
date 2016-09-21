<?php

class m_strukturjabatan extends CI_Model {

    function tableName() {
        return 'strukturjabatan';
    }

    function pkField() {
        return 'idstrukturjabatan';
    }

    function searchField() {
        $field = "a.deskripsi,companycode,b.companyname,c.kodejabatan,c.namajabatan,d.kodeorg,d.namaorg,d.kodebudgetorg,f.kodejabatan,f.namajabatan";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idstrukturjabatan,a.idcompany,a.idjabatan,a.idorganisasi,a.startdate,a.enddate,a.idjabatanatasan,a.status,a.userin,a.datein,a.deskripsi,b.companycode,b.companyname,c.kodejabatan,c.namajabatan,d.kodeorg,d.namaorg,d.kodebudgetorg,e.idlevel,e.kodelevel,e.levelname,f.kodejabatan as kodejabatanatasan,f.namajabatan as namajabatanatasan";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeorg'=>'Kode Organisasi'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join company b ON a.idcompany = b.idcompany
                    join jabatan c ON a.idjabatan = c.idjabatan
                    join organisasi d ON a.idorganisasi = d.idorganisasi
                    join level e ON c.idlevel = e.idlevel
                    join jabatan f ON a.idjabatanatasan = f.idjabatan";

        return $query;
    }

    function whereQuery() {
        $startdate = $this->input->post('startdate')=='' ? '' : backdate2_reverse($this->input->post('startdate'));
        $enddate = $this->input->post('enddate')=='' ? '' : backdate2_reverse($this->input->post('enddate'));
        
        $werdate = '';

        //PERGERAKAN
        $pergerakan = $this->input->post('pergerakan');
        $idleveljabatan = $this->input->post('idleveljabatan');
        $werPergerakan = null;

        if($idleveljabatan!=null)
        {
            if($pergerakan!=null)
            {
                $ql = $this->db->query("select urutan from level where idlevel = $idleveljabatan")->row();
            }

            if($pergerakan=='PROMOSI')
            {
               $werPergerakan = " and e.urutan > ".$ql->urutan."";
            }

            if($pergerakan=='DEMOSI')
            {
               $werPergerakan = " and e.urutan < ".$ql->urutan."";
            }
        }

        
        //END PERGERAKAN

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
                        
                    }
        $y = $this->input->post('tahun');
        if($y!='')
        {
            $werdate .= " AND ('".$y."-".date('m')."-".date('d')."' between a.startdate and a.enddate)";
        }

        if($pergerakan=='MUTASI')
        {
            //Validasi di mutasi dimana hanya bisa pindah ke jabatan yang se level dan level individu yang selevel belum bekerja, 
            $werPergerakan.= " AND e.idlevel = ".$this->input->post('idleveljabatan')."";
        }

        // return "a.display is null and now() between a.startdate and a.enddate ". $this->m_data->whereCompany()."";
        return "a.display is null $werdate ". $this->m_data->whereCompany()." ".$werPergerakan;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $idcompany = $this->input->post('idcompany');
        $idjabatan = $this->input->post('idjabatan');
        // $idorganisasi =$this->m_data->getID('organisasi', 'namaorg', 'idorganisasi', $this->input->post('namaorg'),true);
        $idorganisasi = $this->input->post('idorganisasi');
        $idjabatanatasan = $this->input->post('idjabatanatasan');
        $startdate = backdate2_reverse($this->input->post('startdate'));
        $enddate = backdate2_reverse($this->input->post('enddate'));

        if($this->input->post('statusformStrukturJabatan')=='input')
        {
            $q = $this->db->query("select idstrukturjabatan from strukturjabatan 
                where idcompany=$idcompany and idjabatan=$idjabatan and idorganisasi=$idorganisasi and idjabatanatasan=$idjabatanatasan
                and (startdate>='$startdate' and enddate<='$enddate') and display is null");
            if($q->num_rows()>0)
            {
                echo json_encode(array("success" => false, "message" => "Data sudah ada"));
                       exit();
            }
        }

        $data = array(
            'idstrukturjabatan' => $this->input->post('idstrukturjabatan') == '' ? $this->m_data->getSeqVal('seq_strukturjabatan') : $this->input->post('idstrukturjabatan'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idcompany' => $idcompany,
            'idjabatan' => $idjabatan,
            'startdate' => $startdate,
            'enddate' => $enddate,
            'idorganisasi' => $idorganisasi,
            'idjabatanatasan' => $idjabatanatasan,
            'status' => $this->input->post('status'),
            'deskripsi' => $this->input->post('deskripsi')
        );
        return $data;
    }

}

?>