<?php

class m_configbenefit extends CI_Model {

    function tableName() {
        return 'komponenbenefit';
    }

    function pkField() {
        return 'idbenefit';
    }

    function searchField() {
        $field = "kodebenefit,namabenefit";
        return explode(",", $field);
    }

    function selectField() {
        return "idbenefit,a.idcompany,b.companyname,nip,kodebenefit,namabenefit,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod,jenisnilaibenefitcmp,pembagibenefitcmp,angkatetapbenefitcmp,persenbenefitcmp,kenapajakcmp,fungsipajakcmp,hitungpajakcmp,ditanggungperusahaan,jenisnilaibenefitemp,pembagibenefitemp,angkatetapbenefitemp,persenbenefitemp,kenapajakemp,fungsipajakemp,hitungpajakemp,ditanggungkaryawan";
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
         return "a.display is null ". $this->m_data->whereCompany()."";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
       


        $id = $this->input->post('idbenefit') == '' ? $this->m_data->getSeqVal('seq_configkompensasi') : $this->input->post('idbenefit');
        $data = array(
            "idbenefit" => $id,
            "idcompany"  => $this->input->post('idcompany'),
            "nip"  => $this->input->post('nip'),
            // "idconfigdasarupahtt"  => $this->m_data->getID('configdasarupahtt', 'dasarupahtt', 'idconfigdasarupahtt', $this->input->post('dasarupahtt')),
            "namabenefit"  => $this->input->post('namabenefit'),
            "kodebenefit"  => $this->input->post('kodebenefit'),
            // "kenapajak"  => $this->input->post('kenapajak'),
            // "fungsipajak"  => $this->input->post('fungsipajak'),
            // "hitungpajak"  => $this->input->post('hitungpajak'),
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('enddate'))
            // "komponenupahbenefit" => $komponenupahbenefitVal,
            // "jenisnilaibenefit"  => $this->input->post('jenisnilaibenefit'),
            // "faktorpembagibenefit"  => $this->input->post('faktorpembagibenefit'),
            // "angkatetapbenefit"  => $this->input->post('angkatetapbenefit')
        );

        $ditanggungperusahaan = $this->input->post('ditanggungperusahaan');
        $ditanggungkaryawan = $this->input->post('ditanggungkaryawan');

        if($ditanggungperusahaan=='on')
        {
            $komponenupahbenefitcmp = $this->input->post('komponenupahbenefitcmp');
            $num = count($komponenupahbenefitcmp);
            // echo 'num:'.is_array($komponenupahharian);
            if(!is_array($komponenupahbenefitcmp))
            {
                $komponenupahbenefitValcmp = null;
            } else {
                // echo $num;
               $komponenupahbenefitValcmp = null;
               $i=1;
               foreach ($komponenupahbenefitcmp as $u) {          
                    $kom = $this->m_data->getIDbyCompany('komponenupah', 'namakomponen', 'idkomponenupah', $u,$this->input->post('idcompany'));
                    $komponenupahbenefitValcmp.=$kom;
                    if($i!=$num)
                    {
                        $komponenupahbenefitValcmp.=",";
                    }
                    $i++;
                }
            }

            $data['komponenupahbenefitcmp'] = $komponenupahbenefitValcmp;
            $data['jenisnilaibenefitcmp'] = $this->input->post('jenisnilaibenefitcmp');
            $data['pembagibenefitcmp'] = $this->input->post('pembagibenefitcmp') != '' ? cleardot2($this->input->post('pembagibenefitcmp')) : null;
            $data['angkatetapbenefitcmp'] = $this->input->post('angkatetapbenefitcmp') != '' ? cleardot2($this->input->post('angkatetapbenefitcmp')) : null;
            $data['persenbenefitcmp'] = $this->input->post('persenbenefitcmp') != '' ? $this->input->post('persenbenefitcmp') : null;
            $data['kenapajakcmp'] = $this->input->post('kenapajakcmp');
            $data['fungsipajakcmp'] = $this->input->post('fungsipajakcmp') == '' ? null : $this->input->post('fungsipajakcmp');
            $data['hitungpajakcmp'] = $this->input->post('hitungpajakcmp');
        } else {
            $data['komponenupahbenefitcmp'] = null;
            $data['jenisnilaibenefitcmp'] = null;
            $data['pembagibenefitcmp'] = null;
            $data['angkatetapbenefitcmp'] = null;
            $data['persenbenefitcmp'] = null;
            $data['kenapajakcmp'] = null;
            $data['fungsipajakcmp'] = null;
            $data['hitungpajakcmp'] = null;
        }

        if($ditanggungkaryawan=='on')
        { 
            $komponenupahbenefitemp = $this->input->post('komponenupahbenefitemp');
            $num = count($komponenupahbenefitemp);
            // echo 'num:'.is_array($komponenupahharian);
            if(!is_array($komponenupahbenefitemp))
            {
                $komponenupahbenefitValemp = null;
            } else {
                // echo $num;
               $komponenupahbenefitValemp = null;
               $i=1;
               foreach ($komponenupahbenefitemp as $u) {          
                    $kom = $this->m_data->getIDbyCompany('komponenupah', 'namakomponen', 'idkomponenupah', $u,$this->input->post('idcompany'));
                    $komponenupahbenefitValemp.=$kom;
                    if($i!=$num)
                    {
                        $komponenupahbenefitValemp.=",";
                    }
                    $i++;
                }
            }

            $data['komponenupahbenefitemp'] = $komponenupahbenefitValemp;
            $data['jenisnilaibenefitemp'] = $this->input->post('jenisnilaibenefitemp');
            $data['pembagibenefitemp'] = $this->input->post('pembagibenefitemp') != '' ? cleardot2($this->input->post('pembagibenefitemp')) : null;
            $data['angkatetapbenefitemp'] = $this->input->post('angkatetapbenefitemp') != '' ? cleardot2($this->input->post('angkatetapbenefitemp')) : null;
            $data['persenbenefitemp'] = $this->input->post('persenbenefitemp') != '' ? $this->input->post('persenbenefitemp') : null;
            $data['kenapajakemp'] = $this->input->post('kenapajakemp');
            $data['fungsipajakemp'] = $this->input->post('fungsipajakemp') == '' ? null : $this->input->post('fungsipajakemp');
            $data['hitungpajakemp'] = $this->input->post('hitungpajakemp');
        } else {
            $data['komponenupahbenefitemp'] = null;
            $data['jenisnilaibenefitemp'] = null;
            $data['pembagibenefitemp'] = null;
            $data['angkatetapbenefitemp'] = null;
            $data['persenbenefitemp'] = null;
            $data['kenapajakemp'] = null;
            $data['fungsipajakemp'] = null;
            $data['hitungpajakemp'] = null;
        }

        $data['ditanggungperusahaan'] = $ditanggungperusahaan == 'on' ? 'true' : 'false';
        $data['ditanggungkaryawan'] = $ditanggungkaryawan == 'on' ? 'true' : 'false';

        return $data;
    }

}

?>