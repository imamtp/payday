<?php

class m_potongangrid extends CI_Model {

    function tableName() {
        return 'potongan';
    }

    function pkField() {
        return 'idpotongan';
    }

    function searchField() {
        $field = "namepotongan";
        return explode(",", $field);
    }

    function selectField() {
        return "jenispotongan,b.namepotongan,c.name as amounttype,d.namasiklus,a.idemployee,a.startdate,a.enddate,a.totalpotongan,a.sisapotongan,a.jumlahpotongan,idpotongan,jumlahangsuran,keterangan,idemployee";
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
                . "join potongantype b ON a.idpotongantype = b.idpotongantype
                   left join amounttype c ON a.idamounttype = c.idamounttype
                    left join siklus d ON a.idsiklus = d.idsiklus";

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
            'idpotongan' => $this->input->post('idpotongan') == '' ? $this->m_data->getSeqVal('seq_potongan') : $this->input->post('idpotongan'),
            'idemployee' => $this->input->post('idemployee'),
            'idpotongantype' => $this->m_data->getID('potongantype', 'namepotongan', 'idpotongantype', $this->input->post('namepotongan'),true),
            'idamounttype' => $this->m_data->getID('amounttype', 'name', 'idamounttype', $this->input->post('amounttype')),
            'idsiklus' => $this->m_data->getID('siklus', 'namasiklus', 'idsiklus', $this->input->post('namasiklus')),
            'totalpotongan'=>$this->input->post('totalpotongan'),
            'sisapotongan'=>$this->input->post('totalpotongan'),
            'jumlahpotongan'=>clearnumberic($this->input->post('jumlahpotongan')),
            'startdate'=>backdate($this->input->post('startdate')),
            'enddate'=>$this->input->post('namasiklus')=='' ? null : backdate($this->input->post('enddate')),
            'jumlahangsuran'=>  intval($this->input->post('jumlahangsuran')),
            'sisaangsuran'=>intval($this->input->post('jumlahangsuran')),
            'keterangan'=>$this->input->post('keterangan')
        );
        return $data;
    }

}

?>