<?php

class m_tunjanganpayrollgrid extends CI_Model {

    function tableName() {
        return 'v_tunjanganpayroll';
    }

    function pkField() {
        return 'idtunjangan';
    }

    function searchField() {
        $field = "namatunjangan";
        return explode(",", $field);
    }

    function selectField() {
        return "idtunjangan,idemployee,b.nametunj as namatunjangan,persen,jenisnilai,startdate,enddate,jumlah,b.nametunj,c.name as amounttype,d.namasiklus";
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
                . "join tunjangantype b ON a.idtunjtype = b.idtunjtype
                   left join amounttype c ON a.idamounttype = c.idamounttype
                    join siklus d ON a.idsiklus = d.idsiklus";

        return $query;
    }

    function whereQuery() {
        return " a.display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idtunjangan' => $this->input->post('idtunjangan') == '' ? $this->m_data->getSeqVal('seq_tunjangan') : $this->input->post('idtunjangan'),
            'idemployee' => $this->input->post('idemployee'),
            'idtunjtype' => $this->m_data->getID('tunjangantype', 'nametunj', 'idtunjtype', $this->input->post('nametunj')),
            'idamounttype' => $this->m_data->getID('amounttype', 'amounttype', 'idamounttype', $this->input->post('amounttype')),
            'idsiklus' => $this->m_data->getID('siklus', 'namasiklus', 'idsiklus', $this->input->post('namasiklus')),
            'namatunjangan'=>$this->input->post('namatunjangan'),
            'startdate'=>backdate($this->input->post('startdate')),
            'enddate'=>backdate($this->input->post('enddate')),
            'jumlah'=>$this->input->post('jumlah')!='' ? cleardot($this->input->post('jumlah')) : null,
            'persen'=>str_replace(',', '.', $this->input->post('persen')),
            'jenisnilai' => $this->input->post('jenisnilai')
        );
        return $data;
    }

}

?>