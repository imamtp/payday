<?php

class m_employeeprosesgajigridtmp extends CI_Model {

    function tableName() {
        return 'payrolltmp';
    }

    function pkField() {
        return 'idemployee';
    }

    function searchField() {
        $field = "firstname,lastname";
        return explode(",", $field);
    }

    function selectField() {
        return "pembayaranperjamkehadiran,penambahangaji,idemployeetype,payrolltypeid,idemployee,code,firstname,lastname,namaunit,nametype,jumlahjam,jumlahkehadiran,totalgaji ,totaltunjangan,pph21 ,totalpotongan,totalpembayaran,payname,userin";
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
                    from " . $this->tableName()." a ";

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