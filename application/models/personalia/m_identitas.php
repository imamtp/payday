<?php

class m_identitas extends CI_Model {

    function tableName() {
        return 'identitas';
    }

    function pkField() {
        return 'idpelamar';
    }

    function searchField() {
        $field = "productname,productcode";
        return explode(",", $field);
    }

    function selectField() {
        return "idpelamar,nomorktp,masberlakuktp,nonpwp,nomorsim1,jenissim1,masaberlakusim1,nomorsim2,jenissim2,masaberlakusim2,nomorsim3,jenissim3,masaberlakusim3,nomorpasport,masaberlakupassport,namaptkp";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'productcode'=>'Kode Produk'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join jenisptkp b ON a.idjenisptkp = b.idjenisptkp";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $idpelamar = $this->input->post('idpelamar');

        $q = $this->db->get_where('identitas',array('idpelamar'=>$idpelamar));
        if($q->num_rows()>0)
        {   
            // $this->db->where(array('idpelamar'=>$idpelamar));
            // $this->db->update('identitas',array('nomorktp'=>$this->input->post('noktp')));
        } else {
            $this->db->insert('identitas',array('idpelamar'=>$idpelamar,'nomorktp'=>$this->input->post('noktp')));
           
        }

        $data = array(
            'idpelamar'=> $idpelamar,
            'nomorktp' => $this->input->post('nomorktp'),
            'masberlakuktp' => $this->input->post('masberlakuktp')=='' ? null : backdate2_reverse($this->input->post('masberlakuktp')),
            'nonpwp' => $this->input->post('nonpwp'),
            'idjenisptkp' => $this->m_data->getID('jenisptkp', 'namaptkp', 'idjenisptkp', $this->input->post('namaptkp')),
            'nomorsim1' => $this->input->post('nomorsim1'),
            'jenissim1' => $this->input->post('jenissim1'),
            'masaberlakusim1' => $this->input->post('masaberlakusim1')=='' ? null : backdate2_reverse($this->input->post('masaberlakusim1')),
            'nomorsim2' => $this->input->post('nomorsim2'),
            'jenissim2' => $this->input->post('jenissim2'),
            'masaberlakusim2' => $this->input->post('masaberlakusim2')=='' ? null : backdate2_reverse($this->input->post('masaberlakusim2')),
            'nomorsim3' => $this->input->post('nomorsim3'),
            'jenissim3' => $this->input->post('jenissim3'),
            'masaberlakusim3' => $this->input->post('masaberlakusim3')=='' ? null : backdate2_reverse($this->input->post('masaberlakusim3')),
            'nomorpasport' => $this->input->post('nomorpasport'),
            'masaberlakupassport' => $this->input->post('masaberlakupassport')=='' ? null : backdate2_reverse($this->input->post('masaberlakupassport'))
        );
        return $data;
    }

}

?>