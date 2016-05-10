<?php

class m_configpengurangupah extends CI_Model {

    function tableName() {
        return 'pengurangupah';
    }

    function pkField() {
        return 'idpengurangupah';
    }

    function searchField() {
        $field = "kodebenefit,namabenefit";
        return explode(",", $field);
    }

    function selectField() {
        return "idpengurangupah,a.idcompany,b.companyname,kodepengurangupah,namapengurangupah,kenapajak,fungsipajak,hitungpajak,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod,komponenpengurang,jenisnilaipengurang,faktorpembagipengurangupah,angkatetappengurangupah,persenpengurangupah";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodebenefit'=>'Kode Benefit'  
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
         if($this->input->post('notin')=='pengurangupahkaryawan')
         {
            $wer = " and idpengurangupah not in (select idpengurangupah from pengurangupahkaryawan where idpelamar=".$this->input->post('idpelamar').")";
         } else {
            $wer = null;
         }

         return "a.display is null ". $this->m_data->whereCompany()." ".$wer;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
       $komponenpengurang = $this->input->post('komponenpengurang');
       $num = count($komponenpengurang);
       // echo 'num:'.is_array($komponenupahharian);
       if(!is_array($komponenpengurang))
       {
            $komponenpengurangVal = null;
       } else {
            // echo $num;
           $komponenpengurangVal = null;
           $i=1;
           foreach ($komponenpengurang as $u) {          
                $kom = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u);
                $komponenpengurangVal.=$kom;
                if($i!=$num)
                {
                    $komponenpengurangVal.=",";
                }
                $i++;
            }
       }


        $id = $this->input->post('idpengurangupah') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idpengurangupah');
        $data = array(
            "idpengurangupah" => $id,
            "idcompany"  => $this->input->post('idcompany'),
            "kodepengurangupah"  => $this->input->post('kodepengurangupah'),
            // "idconfigdasarupahtt"  => $this->m_data->getID('configdasarupahtt', 'dasarupahtt', 'idconfigdasarupahtt', $this->input->post('dasarupahtt')),
            "namapengurangupah"  => $this->input->post('namapengurangupah'),
            "jenisnilaipengurang"  => $this->input->post('jenisnilaipengurang'),
            "kenapajak"  => $this->input->post('kenapajak'),
            "persenpengurangupah"=>$this->input->post('persenpengurangupah'),
            "fungsipajak"  => $this->input->post('fungsipajak'),
            "hitungpajak"  => $this->input->post('hitungpajak'),
            "startdate" => backdate2_reverse($this->input->post('startdate')),
            "enddate" => backdate2_reverse($this->input->post('enddate')),
            "komponenpengurang" => $komponenpengurangVal,
            "jenisnilaipengurang"  => $this->input->post('jenisnilaipengurang'),
            "faktorpembagipengurangupah"  => $this->input->post('faktorpembagipengurangupah') == '' ? 0 : $this->input->post('faktorpembagipengurangupah'),
            "angkatetappengurangupah"  => $this->input->post('angkatetappengurangupah') == '' ? 0 : $this->input->post('angkatetappengurangupah')
        );
        return $data;
    }

}

?>