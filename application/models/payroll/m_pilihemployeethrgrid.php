<?php

class m_pilihemployeethrgrid extends CI_Model {

    function tableName() {
        return 'employee';
    }

    function pkField() {
        return 'idemployee';
    }

    function searchField() {
        $field = "firstname,lastname";
        return explode(",", $field);
    }

    function selectField() {
        return "pegawaitglmasuk,idemployee,code,keaktifan,tglresign,firstname,lastname,address,telephone,handphone,a.fax,a.email,a.website,a.city,a.state,a.postcode,a.country,a.notes,b.nametype,namaunit";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pegawai'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "left join employeetype b ON a.idemployeetype = b.idemployeetype "
                . "left join unit c ON a.idunit = c.idunit";

        return $query;
    }

    function whereQuery() {
        $periode = str_replace("T00:00:00", "", $this->input->post('periode'));
        // $periode = $this->input->post('periode');
        $idunit = $this->input->post('idunit');
        $periodeArr = explode("-", $periode);
        $m = $periodeArr[1];
        $y = $periodeArr[0];
        return " a.idunit = $idunit and idemployee NOT IN (select idemployee from thrlisttmp) and idemployee not in (select idemployee from thrlist where month='$m' and year=$y)";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idemployee' => $this->input->post('idemployee') == '' ? $this->m_data->getSeqVal('seq_employee') : $this->input->post('idemployee'),
            'idemployeetype' => $this->m_data->getID('employeetype', 'nametype', 'idemployeetype', $this->input->post('nametype')),
            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'code' => $this->input->post('code'),
            'firstname' => $this->input->post('firstname'),
            'lastname' => $this->input->post('lastname'),
            'address' => $this->input->post('address'),
            'telephone' => $this->input->post('telephone'),
//            'telephone' => $this->input->post('telephone'),
            'handphone' => $this->input->post('handphone'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'city' => $this->input->post('city'),
            'state' => $this->input->post('state'),
            'postcode' => $this->input->post('postcode'),
            'country' => $this->input->post('country'),
            'notes' => $this->input->post('notes'),
            'keaktifan' => $this->input->post('keaktifan'),
            'pegawaitglmasuk' => $this->input->post('pegawaitglmasuk'),
            'tglresign' => $this->input->post('tglresign')=='' ? null : $this->input->post('tglresign')
        );
        return $data;
    }

}

?>