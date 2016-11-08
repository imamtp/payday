<?php

class m_jabatan extends CI_Model {

    function tableName() {
        return 'jabatan';
    }

    function pkField() {
        return 'idjabatan';
    }

    function searchField() {
        $field = "kodejabatan,namajabatan";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idjabatan,a.idlevel,a.idcompany,a.kodejabatan,a.namajabatan,a.startdate,a.enddate,a.status,a.userin,a.datein,b.levelname,c.companycode,c.companyname,a.deskripsi";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodejabatan'=>'Kode Jabatan'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join level b ON a.idlevel = b.idlevel
                    join company c ON a.idcompany = c.idcompany";

        return $query;
    }

    function whereQuery() {
        $startdate = $this->input->post('startdate')=='' ? '' : backdate2_reverse($this->input->post('startdate'));
        $enddate = $this->input->post('enddate')=='' ? '' : backdate2_reverse($this->input->post('enddate'));

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

        // return "a.display is null and now() between a.startdate and a.enddate ". $this->m_data->whereCompany()."";
        return "a.display is null $werdate ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            'idjabatan' => $this->input->post('idjabatan') == '' ? $this->m_data->getSeqVal('seq_jabatan') : $this->input->post('idjabatan'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'idlevel' => $this->input->post('idlevel'),
            'idcompany' => $this->input->post('idcompany'),
            'startdate' => backdate2_reverse($this->input->post('startdate')),
            'enddate' => backdate2_reverse($this->input->post('enddate')),
            'kodejabatan' => $this->input->post('kodejabatan'),
            // 'idcompany' => $this->input->post('idcompany') == '' ? $this->session->userdata('idcompany') : $this->input->post('idcompany'),
            'namajabatan' => strtoupper($this->input->post('namajabatan')),
            'deskripsi' => $this->input->post('deskripsi'),
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>