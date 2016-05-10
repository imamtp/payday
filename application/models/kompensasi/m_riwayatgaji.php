<?php

class m_riwayatgaji extends CI_Model {

    function tableName() {
        return 'payrolldata';
    }

    function pkField() {
        return 'idpayroll';
    }

    function searchField() {
        $field = "b.namalengkap";
        return explode(",", $field);
    }

    function selectField() {
        return "idpayroll,a.idpelamar,bulan,tahun,tglgaji,a.startdate,masapajaksetahun,a.enddate,b.namalengkap,a.punyanpwp,durasi,hitungpajak,tglgajipertama,masakerja,a.tglmasuk,nilaiptkp,kodeptkp,totalut,totalutt,upahlemburPajak,upahlemburNoPajak,upahlemburTambahPajak,upahlemburKurangPajak,totallembur,benefitCmpBruto,benefitCmpNet,benefitEmpBruto,benefitEmpNet,numdayswork,nilaiPotongan,totalpendapatan,penerimaanbruto,tunjanganpajak,a.biayajabatan,penerimaannet,netosetahun,pkpsetahun,pph5tahun,pph15tahun,pph25tahun,pph35tahun,pphsettahun,pphsebulan,takehomepay,b.namalengkap,benefitcmp,benefitemp,upload,pajakterminasi,pajakjantonov,pajakterminasi,pajakterbayar,pajakterutangdes,pajaktotalbayarsetahun,selisihpph,c.nik,d.companycode,f.kodeorg,g.namajabatan,prevtakehomepay";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'kodekebijakan'=>'kode kebijakan'  
        );
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join pelamar b ON a.idpelamar = b.idpelamar                    
                    join calonpelamar c ON b.idpelamar = c.idpelamar
                    join company d ON b.idcompany = d.idcompany
                    JOIN
                    (
                        SELECT MAX(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as x ON a.idpelamar = x.idpelamar
                    join pekerjaan aa ON x.idpekerjaan = aa.idpekerjaan
                    left join strukturjabatan e ON aa.idstrukturjabatan = e.idstrukturjabatan
                    left join organisasi f ON f.idorganisasi = e.idorganisasi
                    left join jabatan g ON g.idjabatan = e.idjabatan
                    JOIN
                    (
                        SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar
                        FROM pekerjaan
                        WHERE statuspergerakan='Disetujui'
                        GROUP BY idpelamar
                    ) as xx ON a.idpelamar = xx.idpelamar
                    left join pekerjaan aaa ON xx.idpekerjaan = aaa.idpekerjaan
                    left join strukturjabatan bb ON aa.idstrukturjabatan = bb.idstrukturjabatan";

        return $query;
    }

    function whereQuery($sd=null,$nd=null,$idcompany=null,$idjabatan=null,$idorganisasi=null) {

        $sd = $sd == null ? backdate2_reverse($this->input->post('startdate')) : backdate2_reverse($sd);
        $nd = $nd == null ? backdate2_reverse($this->input->post('enddate')) : backdate2_reverse($nd);

        $idcompany = $this->input->post('idcompany') == null ? $idcompany : $this->input->post('idcompany');
        $idjabatan = $this->input->post('idjabatan') == null ? $idjabatan : $this->input->post('idjabatan');
        $idorganisasi = $this->input->post('idorganisasi') == null ? $idorganisasi : $this->input->post('idorganisasi');


        $wer = "b.idcompany = $idcompany AND ((a.startdate>='$sd' and a.enddate<='$nd')) ";

        if($idjabatan!='null' && $idjabatan!=null)
        {
            $wer.="AND bb.idjabatan=$idjabatan ";
        }

        if($idorganisasi!='null' && $idorganisasi!=null)
        {
            $wer.="AND bb.idorganisasi=$idorganisasi ";
        }
        return $wer;
    }

    function orderBy() {
        return "a.tahun,a.bulan,nik";
    }

    function updateField() { 

        $data = array(
            "idkebijakanbenefit" => $this->input->post('idkebijakanbenefit') == '' ? $this->m_data->getSeqVal('seq_komponenkebijakan') : $this->input->post('idkebijakanbenefit'),
            // "idkomponenupah"  => $this->session->userdata('idkomponenupah'),
            "idbenefit"  => $this->m_data->getID('komponenbenefit', 'namabenefit', 'idbenefit', $this->input->post('namabenefit')),
            "idkebijakanpengupahan"  => $this->input->post('idkebijakanpengupahan'),
            "idlevel"  => $this->m_data->getID('level', 'levelname', 'idlevel', $this->input->post('levelname')),
            "nilai"  => $this->input->post('nilai')
            // "startdate" => backdate2_reverse($this->input->post('startdate')),
            // "enddate" => backdate2_reverse($this->input->post('enddate'))
        );
        return $data;
    }

}

?>