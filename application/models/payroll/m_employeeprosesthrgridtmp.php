<?php

class m_employeeprosesthrgridtmp extends CI_Model {

    function tableName() {
        return 'thrlisttmp';
    }

    function pkField() {
        return 'idemployee';
    }

    function searchField() {
        $field = "firstname,lastname,code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idemployee,a.pengali,a.totalpendapatan,a.masakerja,a.jumlahthr,a.kehadiranjam,a.thrtambahan,a.totalthr,a.month,a.year,b.firstname,b.lastname,b.code,a.keterangan";
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
                    from " . $this->tableName()." a 
                    join employee b on a.idemployee = b.idemployee";

        return $query;
    }

    function whereQuery() {
        return null;
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
            'tglresign' => $this->input->post('tglresign')
        );
        return $data;
    }

}

?>