<?php

class m_configbenefitkary extends CI_Model {

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
        return "idbenefit,a.idcompany,b.companyname,nip,kodebenefit,namabenefit,a.startdate,a.enddate,a.display,a.userin,a.usermod,a.datein,a.datemod,jenisnilaibenefitcmp,pembagibenefitcmp,angkatetapbenefitcmp,persenbenefitcmp,kenapajakcmp,fungsipajakcmp,hitungpajakcmp,ditanggungperusahaan,jenisnilaibenefitemp,pembagibenefitemp,angkatetapbenefitemp,persenbenefitemp,kenapajakemp,fungsipajakemp,hitungpajakemp,ditanggungkaryawan,maxplafoncmp,maxplafonemp";
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
         return "a.display is null ". $this->m_data->whereCompany()." and idbenefit not in (select idbenefit from benefitkaryawan where idpelamar = ".$this->input->post('idpelamar').")";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        $data['ditanggungperusahaan'] = $ditanggungperusahaan == 'on' ? 'true' : 'false';
        $data['ditanggungkaryawan'] = $ditanggungkaryawan == 'on' ? 'true' : 'false';

        return $data;
    }

}

?>