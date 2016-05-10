<?php

class m_benefitkaryawan extends CI_Model {

    function tableName() {
        return 'benefitkaryawan';
    }

    function pkField() {
        return 'a.idpelamar,b.idbenefit';
    }

    function searchField() {
        $field = "kodebenefit,b.nip,b.namabenefit";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpelamar,b.idbenefit,b.kodebenefit,b.nip,b.namabenefit";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekomponen'=>'Kode Upah'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join komponenbenefit b ON a.idbenefit = b.idbenefit";

        return $query;
    }

    function whereQuery() {
         return false;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        return false;
    }

}

?>