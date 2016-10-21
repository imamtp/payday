<?php

class m_configdasarupahtt extends CI_Model {

    function tableName() {
        return 'configdasarupahtt';
    }

    function pkField() {
        return 'idconfigdasarupahtt';
    }

    function searchField() {
        $field = "kodedasarupahtt,dasarupahtt";
        return explode(",", $field);
    }

    function selectField() {
        return "idconfigdasarupahtt,a.idcompany,b.companyname,kodedasarupahtt,dasarupahtt,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodeupah'=>'Kode Upah'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join company b ON a.idcompany = b.idcompany";

        return $query;
    }

    function whereQuery() {
         return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data = array(
            "idconfigdasarupahtt" => $this->input->post('idconfigdasarupahtt') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idconfigdasarupahtt'),
            "idcompany"  => $this->input->post('idcompany'),
            "kodedasarupahtt"  => $this->input->post('kodedasarupahtt'),
            "dasarupahtt"  => $this->input->post('dasarupahtt'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

	public function tes()
	{
		echo 'tesmtod';
	}
	
    public function nilaiuut($idkomponenupah,$idpelamar)
    {
        $q = $this->db->get_where('komponenupah',array('idkomponenupah'=>$idkomponenupah));
        // echo $this->db->last_query();
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->jenisnilai=='Komponen Upah')
            {
                $dasarup = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$idkomponenupah));
                $nilai=0;
                foreach ($dasarup->result() as $rdasarup) {

                    $qkomponenupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$rdasarup->iddasarkomponenupah));
                    if($qkomponenupah->num_rows()>0)
                    {
                        $rqkomponenupah = $qkomponenupah->row();
                        if($rqkomponenupah->jeniskomponen=='Upah Tetap')
                        {
                            $qq = $this->db->get_where('upahkaryawan',array('idpelamar'=>$idpelamar,'idkomponenupah'=>$rqkomponenupah->idkomponenupah,'display'=>null));
                            if($qq->num_rows()>0)
                            {
                                $rr = $qq->row();
                                $nilai+=$rr->nilai/$r->pembagi;
//                                echo $rqkomponenupah->idkomponenupah.'-'.$rr->nilai.' ';
                            } else {
                                $nilai+=0;
                            }
                        } else {
                                 $nilai+=0;
                            } 

                    } else {
                        $nilai+=0;
                    }

                }
//                echo $nilai;
                
            } else if($r->jenisnilai=='Nilai Tetap')
                {
                    $nilai = $r->angkatetap==null ? 0 : $r->angkatetap;
                } else {
                        //persentase
                   // echo 'persentase<br>';

                        $dasarup = $this->db->get_where('dasarkomponenupah',array('idkomponenupah'=>$idkomponenupah));
                        // echo $this->db->last_query();
                        $nilai=0;
                        foreach ($dasarup->result() as $rdasarup) {

                            $qkomponenupah = $this->db->get_where('komponenupah',array('idkomponenupah'=>$rdasarup->iddasarkomponenupah,'display'=>null));
                            // echo $this->db->last_query();
                            if($qkomponenupah->num_rows()>0)
                            {
                                $rqkomponenupah = $qkomponenupah->row();
                                if($rqkomponenupah->jeniskomponen=='Upah Tetap')
                                {
                                    $qq = $this->db->get_where('upahkaryawan',array('idpelamar'=>$idpelamar,'idkomponenupah'=>$rqkomponenupah->idkomponenupah));
                                    // echo $this->db->last_query();
                                    if($qq->num_rows()>0)
                                    {
                                        $rr = $qq->row();
                                        $nilai+=$rr->nilai*($r->persen/100);
                                        // echo $rr->nilai."*"."(".$r->persen."/"."100)".'<br>';
                                    } else {
                                        $nilai+=0;
                                    }
                                } else {
                                         $nilai+=0;
                                    } 

                            } else {
                                $nilai+=0;
                            }

                        }
                    }

        } else {
            $nilai = 0;
        }
        // echo $this->db->last_query();
        return $nilai;
    }

}

?>