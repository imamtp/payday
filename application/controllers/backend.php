<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Backend extends MY_Controller {

    public function index() {
        
    }

    function getRateTax($idtax) {
        $q = $this->db->get_where('tax', array('idtax' => $idtax))->row();
        echo json_encode(array('success' => true, 'rate' => $q->rate));
    }

    function getSequence() {
        $seqName = $this->input->post('seqName');
        $seqField = $this->input->post('seqField');
//        $q = $this->db->query("select nextval('$seqName') as noseq")->row();
        $q = $this->db->query("select max($seqField) as noseq from $seqName")->row();
        echo json_encode(array('success' => true, 'message' => $q->noseq + 1));
    }

    function definition($table) {
        
    }

    function loadFormData($data, $id = null, $dir = null) {

        if ($dir != null) {
            $dir = $dir . '/';
        }
//        echo $dir;
        $modelfile = $dir . 'm_' . $data;
        $this->load->model($modelfile, 'datamodel');

//        $this->load->model('m_' . $data, 'datamodel');
//        $pkfield = $this->datamodel->pkField();
//        $pkfield = explode(",", $pkfield);

        $arrWer = array();
        $extraparams = $this->input->post('extraparams');
        $arrPerParam = explode(",", $extraparams);

        foreach ($arrPerParam as $value) {
            $p = explode(":", $value);
            if (isset($p[1]))
                $arrWer[$p[0]] = $p[1];
        }

        $arrWer = array();
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    if ($vparam[1] != 'undefined') {
                        $arrWer[$vparam[0]] = $vparam[1];
                    }
                }
                $i++;
            }
        } else {
            $wer = null;
        }

        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }


        if ($wer != '') {
            $sql = $this->datamodel->query() . " WHERE " . $wer;
        } else {
            $sql = $this->datamodel->query();
        }


        $q = $this->db->query($sql);
        // echo $this->db->last_query();
        if ($q->num_rows() > 0) {
            $r = $q->row();
//            var_dump($r);
            $field = $this->datamodel->selectField();
            $field = explode(",", $field);
            $json = "{success: true,data: {";
            foreach ($field as $value) {
                $v = explode(".", $value);
                if (count($v) > 1) {
                    //pake alias.. insert array ke 1
                    //apus spasi
                    //                    $vas = str_replace(" ", "", $v[1]);
                    $vas = $v[1];

                    //detek alias
                    $vas = explode(" as ", $vas);
                    if (count($vas) > 1) {
                        //pake alias
                        $json .="$vas[1]: \"" . $r->$vas[1] . "\",";
                    } else {
                        $json .="$v[1]: \"" . $r->$v[1] . "\",";
                    }
                    //                    $json .="$v[1]: \"" . $r->$v[1] . "\",";
                } else {
                    //detek alias
                    $vas = explode(" as ", $value);
                    if (count($vas) > 1) {
                        //pake alias
                        $json .="$vas[1]: \"" . $r->$vas[1] . "\",";
                    } else {
                        if ($value == 'conversionmonth' || $value == 'lastmonthfinanceyear') {
                            if ($r->$value != 0) {
                                $json .="$value: \"" . ambilBulan($r->$value) . "\",";
                            } else {
                                $json .="$value: \"" . null . "\",";
                            }
                        } else {
                            $json .="$value: \"" . $r->$value . "\",";
                        }
                    }
                }
            }

            if ($data == 'VDataKaryawan' || $data == 'personil' || $data == 'PengajuanIzin' || $data == 'VSuratLembur') {
                $this->load->model('personalia/m_pekerjaan');

                $param = explode(":", $this->input->post('extraparams'));

                if ($data == 'PengajuanIzin') {
                    $idpelamar = $this->db->get_where('pengajuanizin', array('idpengajuanizin' => $param[1]))->row();
                    $d = $this->m_pekerjaan->getLastPekerjaan($idpelamar->idpelamar);
                } else if ($data == 'VSuratLembur') {
                    $idpelamar = $this->db->get_where('lembur', array('idlembur' => $param[1]))->row();
                    $d = $this->m_pekerjaan->getLastPekerjaan($idpelamar->idpelamar);
                } else if ($data == 'VDataKaryawan') {
                    $d = $this->m_pekerjaan->getkekaryaanname($param[1]);
                } else {
                    $d = $this->m_pekerjaan->getLastPekerjaan($param[1]);
                }

// print_r($d);
                $json .= "idpekerjaan: \"" . $d['idpekerjaan'] . "\",";
                $json .= "tglmasuk: \"" . $d['tglmasuk'] . "\",";
                $json .= "namajabatan: \"" . $d['namajabatan'] . "\",";
                $json .= "namalokasi: \"" . $d['namalokasi'] . "\",";
                $json .= "kodeorg: \"" . $d['kodeorg'] . "\",";
                $json .= "namaorg: \"" . $d['namaorg'] . "\",";
                $json .= "kekaryaanname: \"" . $d['kekaryaanname'] . "\",";
                $json .= "namaatasan: \"" . $d['namaatasan'] . "\",";
                $json .= "levelnameindividu: \"" . $d['levelnameindividu'] . "\",";
                $json .= "levelnamejabatan: \"" . $d['levelnamejabatan'] . "\"";
            }



            $json .="}}";
        } else {
            $json = json_encode(array('success' => false, 'message' => 'Data tidak detemukan'));
        }

        echo $json;
    }

    function saveform($model, $dir = null) {

        if ($dir != null) {
            $dir = $dir . '/';
        }
//        echo $dir;
        $modelfile = $dir . 'm_' . $model;

        $this->load->model($modelfile, 'datamodel');
        $formstate = 'statusform' . $model;
        // echo "formstate:".$formstate." ";
        $statusform = $this->input->post($formstate);

        $d = $this->datamodel->updateField();
        $fc = $this->datamodel->fieldCek();
//        print_r($d);
        //cek existing data
        $pkfield = $this->datamodel->pkField();
        $pkfield = explode(",", $pkfield);
        $arrWer = array();
        foreach ($d as $key => $value) {
            foreach ($pkfield as $vpk) {
                if ($key == $vpk && $value != null) {
//                    echo $value;
                    $arrWer[$key] = $value;
                }
            }
        }
        // print_r($arrWer);
        $dt = new DateTime();
        $tanggalwaktu = $dt->format('Y-m-d H:i:s');
//        $this->db->where($arrWer);
//        $q = $this->db->get($this->datamodel->tableName());
//        echo count($arrWer)." ".$q->num_rows()." ".$this->db->last_query()."<hr>";
        // echo 's:'.$statusform;
        //cek ada kolom idcompany gak?
        $master = false;
        $qc = $this->db->query("select column_name from information_schema.columns where table_name='" . $this->datamodel->tableName() . "'");
        // echo $this->db->last_query();
        foreach ($qc->result() as $r) {
            if ($r->column_name == 'idcompany') {
                $master = true;
                break;
            }
        }

        if ($statusform == 'edit') {
            // echo 'master.'.$master;
            //kalo data dari idcompany parent tidak boleh diubah
            if ($master) {
                if ($this->session->userdata('group_id') > 2) {
                    //selain master dan super admin
                    $qd = $this->db->get_where($this->datamodel->tableName(), $arrWer);
                    // echo $this->db->last_query();
                    if ($qd->num_rows() > 0) {
                        $rd = $qd->row();

                        if ($rd->idcompany == $this->session->userdata('idcompanyparent')) {
                            //kalo idcompany nya parent idak bisa
                            if ($rd->idcompany != $this->session->userdata('idcompany')) {
                                $json = array('success' => false, 'message' => 'Data tidak boleh diubah');
                                echo json_encode($json);
                                exit();
                            }
                        }
                    }
                    $qd->free_result();
                }
            }

//////////////////////////////////////////////////////

            if ($fc !== FALSE) {
                //cek udah ada apa belom
                foreach ($d as $key => $value) {
                    foreach ($fc as $keyfc => $valuefc) {
//                        echo $keyfc."==".$key."<br>";
                        if ($keyfc == $key) {

                            if ($master) {
                                // if($this->datamodel->tableName()=='company')
                                // {
                                $qcek = $this->db->query("select * from " . $this->datamodel->tableName() . " a where true " . $this->m_data->whereCompany() . " and $key='$value' and " . $this->datamodel->pkField() . "!=" . $this->input->post($this->datamodel->pkField()) . " and display is null");
                                // } else {
                                //     $qcek = $this->db->query("select * from ".$this->datamodel->tableName()." a where true and $key='$value' and ".$this->datamodel->pkField()."!=".$this->input->post($this->datamodel->pkField())." and display is null");
                                // }
                                //echo $this->db->last_query();
                            } else {
                                $qcek = $this->db->get_where($this->datamodel->tableName(), array($key => $value, 'display' => null));
                            }

                            if ($qcek->num_rows() > 0) {
                                $json = array('success' => false, 'message' => $valuefc . ' <b>' . $value . '</b> sudah ada di dalam database');
                                echo json_encode($json);
                                exit;
                            }
                        }
                    }
                }
            }

            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = $tanggalwaktu;
            $d['display'] = null;
            // print_r($d);
            $this->db->where($arrWer);
            $this->db->update($this->datamodel->tableName(), $d);
            // echo $this->db->last_query();
            if ($this->db->affected_rows() > 0) {
                // echo $this->db->last_query();
                $json = array('success' => true, 'message' => 'Data berhasil disimpan');
            } else {
                $json = array('success' => false, 'message' => 'Data gagal disimpan');
            }
        } else {
            $d['userin'] = $this->session->userdata('username');
            $d['datein'] = $tanggalwaktu;
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = $tanggalwaktu;

            if ($fc !== FALSE) {
                //cek udah ada apa belom
                foreach ($d as $key => $value) {
                    foreach ($fc as $keyfc => $valuefc) {
//                        echo $keyfc."==".$key."<br>";
                        if ($keyfc == $key) {
                            if ($master) {
                                // $this->db->where('idcompany', $this->session->userdata('idcompany'));
                                // $this->db->or_where('idcompany', $this->session->userdata('idcompanyparent')); 
                                // $qcek = $this->db->get_where($this->datamodel->tableName(), array($key => $value,'display'=>null));
                                // if($this->datamodel->tableName()=='company')
                                // {
                                $qcek = $this->db->query("select * from " . $this->datamodel->tableName() . " a where true " . $this->m_data->whereCompany() . " and $key='$value' and display is null");
                                // echo $this->db->last_query();
                                // } else  {
                                //         $qcek = $this->db->query("SELECT idcompany
                                //         FROM ".$this->datamodel->tableName()."
                                //         WHERE (idcompany = ". $this->session->userdata('idcompany')."  OR idcompany = ". $this->session->userdata('idcompanyparent')." ) AND $key =  '$value' AND display IS NULL");
                                //     }
                            } else {
                                $qcek = $this->db->get_where($this->datamodel->tableName(), array($key => $value, 'display' => null));
                            }
                            //echo $this->db->last_query();

                            if ($qcek->num_rows() > 0) {
                                $json = array('success' => false, 'message' => $valuefc . ' <b>' . $value . '</b> sudah ada di dalam database');
                                echo json_encode($json);
                                exit;
                            }
                        }
                    }
                }
            }
// echo $this->db->last_query();
            $this->db->insert($this->datamodel->tableName(), $d);

            if ($model == 'KebijakanPengupahan') {
                $id = $d['idkebijakanpengupahan'];
            } else {
                $id = null;
            }


            if ($this->db->affected_rows() > 0) {
                $json = array('success' => true, 'message' => 'Data berhasil disimpan', 'id' => $id);
            } else {

                $json = array('success' => false, 'message' => 'Data gagal disimpan');
            }
        }

        if ($model == 'ConfigUpahTTBulan' || $model == 'ConfigUpahTTTahun') {
            if ($this->input->post('komponenupah') != '') {
                $configupah = $this->input->post('komponenupah');

                $this->db->where('idkomponenupah', $d['idkomponenupah']);
                $this->db->delete('dasarkomponenupah');

                foreach ($configupah as $u) {
                    $upah = $this->m_data->getID('komponenupah', 'namakomponen', 'idkomponenupah', $u);
                    $this->db->insert('dasarkomponenupah', array('idkomponenupah' => $d['idkomponenupah'], 'iddasarkomponenupah' => $upah));
                }
            }
        }


        if ($model == 'SysMenu_crud') {
            //buat atur hak akses menu per grup

            $sys_menu_id = $this->input->post('sys_menu_id');

            if ($sys_menu_id == '') {
                $sys_menu_id = $d['sys_menu_id'];
            }

//             $group_name = $this->input->post('group_name');
//                  if ($sys_menu_id != null || $sys_menu_id != '') {
// //                        $idunitdiremove=null;
//                         $this->db->where('sys_menu_id',$sys_menu_id);
//                         $this->db->delete('sys_group_menu');
//                         foreach ($group_name as $u) {
//                             $group = $this->m_data->getID('sys_group', 'group_name', 'group_id', $u);
//                             $qcek = $this->db->get_where('sys_group_menu',array('group_id'=>$group,'sys_menu_id'=>$sys_menu_id));
//                             if($qcek->num_rows()>0)
//                             {
//                             } else {
//                                 $this->db->insert('sys_group_menu',array('group_id'=>$group,'sys_menu_id'=>$sys_menu_id));
//                             }
//                         }
//                 } else {
//                     foreach ($group_name as $u) {
//                         $group = $this->m_data->getID('sys_group', 'group_name', 'group_id', $u);
// //                        echo $this->db->last_query();
//                         $this->db->insert('sys_group_menu',array('group_id'=>$group,'sys_menu_id'=>$d['sys_menu_id']));
//                     }
//                 }

            if ($this->input->post('status') == 'Aktif') {
                $this->db->where('sys_menu_id', $sys_menu_id);
                $this->db->update('sys_menu', array('display' => null));
            } else {
                $this->db->where('sys_menu_id', $sys_menu_id);
                $this->db->update('sys_menu', array('display' => 0));
            }
        } //end if model=SysMenu
        // echo $this->db->last_query();
        echo json_encode($json);
    }

    public function ext_get_account($table, $dir = null, $idunit = null) {

        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }


        $extraparams = $this->input->post('extraparams');
//        if($extraparams!='')
//        {
//            $wer = "";
//            $p = explode(',', $extraparams);
//            foreach ($p as $key => $value) {
//                $vparam = explode(':', $value);
//                if($vparam[1]!='null' && $vparam[1]!='undefined')
//                {
//                    $wer .= $vparam[0]."='$vparam[1]'";
//                }
//            }
//        } else {
//            $wer=null;
//        }
        $arrWer = array();
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    if ($vparam[1] != 'undefined') {
                        $arrWer[$vparam[0]] = $vparam[1];
                    }
                }
                $i++;
            }
        } else {
            $wer = null;
        }

//         print_r($arrWer);
        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }

        $start = isset($_POST['start']) ? $_POST['start'] : 0;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 10;
        $page = $this->input->post('page');


        if ($page > 1) {
            if ($page == 2) {
                //problem saat clear search box, start-nya hilang
                $start = $limit;
            } else {
                $kali = $page - 1;
                $start = $limit * $kali;
            }
        }
// echo $page.' '.$start.' ';

        $w = " WHERE TRUE";

        if (isset($_POST['query'])) {

            $field = 0;

            foreach ($this->datamodel->searchField() as $key => $value) {
                if ($field == 0) {
                    // $w .="(";
                    $w.=" AND ((" . $value . " LIKE '%" . $_POST['query'] . "%') ";
                } else {
                    $w.=" OR (" . $value . " LIKE '%" . $_POST['query'] . "%') ";
                }
                $field++;
            }
            $w .=")";

            if ($extraparams != '' && $wer != '') {
                $w.=" AND $wer ";
            }
        } else if ($extraparams != '' && $wer != '') {
            $w.=" AND $wer ";
        }

        //query tambahan dari model
        if ($this->datamodel->whereQuery() != "") {
            $w.=" AND " . $this->datamodel->whereQuery() . " ";
        }

        ////////////////////////////////
        if ($this->input->post('idaccounttype') != '') {
            $w.=" AND (";
            $idacctype = explode(",", $this->input->post('idaccounttype'));
//            echo count($idacctype);
            $i = 1;
            foreach ($idacctype as $value) {
                $w.=" a.idaccounttype=$value";
                if ($i != count($idacctype)) {
                    $w.=" OR";
                }
                $i++;
            }
            $w.=")";

            // $sql.=" AND a.idpos=2";
        }

        if ($this->input->post('notshowacctype') != '') {
            $w.=" AND (";
            $idacctype = explode(",", $this->input->post('notshowacctype'));
//            echo count($idacctype);
            $i = 1;
            foreach ($idacctype as $value) {
                $w.=" a.idaccounttype!=$value";
                if ($i != count($idacctype)) {
                    $w.=" OR";
                }
                $i++;
            }
            $w.=")";

            // $sql.=" AND a.idpos=2";
            // echo $sql;
            // exit;
        }

        if ($this->input->post('idunit') != '') {
            $w.=" AND a.idunit=" . $this->input->post('idunit') . " ";
        }

        // $sql.=" AND a.idunit!=99";
        if (strpos($w, 'a.idunit') === false) {
            // echo $w;
            exit;
        }

        /////////////////////////////////////////////


        $orderby = $this->datamodel->orderBy() != "" ? "ORDER BY " . $this->datamodel->orderBy() : null;
        $sql = $this->datamodel->query() . " $w " . $orderby . " LIMIT $limit OFFSET $start";

//        $sql= $this->datamodel->query()." $w LIMIT $limit OFFSET $start";
        // echo $sql;
        $this->db->limit($start, $limit);
        $query_page = $this->db->query($sql);
        // echo $sql;
        $arr = array();
        foreach ($query_page->result() as $obj) {

            if ($table == 'clossinginvgrid') {
                if ($obj->assetaccount == null || $obj->akumpenyusutaccount == null || $obj->depresiasiaccount == null) {
                    $obj->status = 'akunundefined';
                } else if ($obj->assetaccount == 0 || $obj->akumpenyusutaccount == 0 || $obj->depresiasiaccount == 0) {
                    $obj->status = 'akunundefined';
                } else if ($obj->bebanperbulan == null) {
                    $obj->status = 'bebanundefined';
                } else {
                    $obj->status = 'true';
                }
            }
            $arr[] = $obj;
        }

        $query = $this->db->query($this->datamodel->query() . " $w");

        $results = $query->num_rows();
        echo '{success:true,numrow:' . $query->num_rows() . ',results:' . $results .
        ',rows:' . json_encode($arr) . '}';
    }

    public function ext_get_all($table, $dir = null, $idunit = null) {

        $this->load->model('personalia/m_pekerjaan');
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }


        $extraparams = $this->input->post('extraparams');
//        if($extraparams!='')
//        {
//            $wer = "";
//            $p = explode(',', $extraparams);
//            foreach ($p as $key => $value) {
//                $vparam = explode(':', $value);
//                if($vparam[1]!='null' && $vparam[1]!='undefined')
//                {
//                    $wer .= $vparam[0]."='$vparam[1]'";
//                }
//            }
//        } else {
//            $wer=null;
//        }
        $arrWer = array();
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    if ($vparam[1] != 'undefined') {
                        $arrWer[$vparam[0]] = $vparam[1];
                    }
                }
                $i++;
            }
        } else {
            $wer = null;
        }

//         print_r($arrWer);
        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }

        $start = isset($_POST['start']) ? $_POST['start'] : 0;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 10;
        $page = $this->input->post('page');


        if ($page > 1) {
            if ($page == 2) {
                //problem saat clear search box, start-nya hilang
                $start = $limit;
            } else {
                $kali = $page - 1;
                $start = $limit * $kali;
            }
        }
// echo $page.' '.$start.' ';

        $w = " WHERE TRUE";

        if (isset($_POST['query'])) {

            $field = 0;

            foreach ($this->datamodel->searchField() as $key => $value) {
                if ($field == 0) {
                    // $w .="(";
                    $w.=" AND ((" . $value . " LIKE '%" . strtoupper($_POST['query']) . "%') ";
                } else {
                    $w.=" OR (" . $value . " LIKE '%" . strtoupper($_POST['query']) . "%') ";
                }
                $field++;
            }
            $w .=")";

            if ($extraparams != '' && $wer != '') {
                $w.=" AND $wer ";
            }
        } else if ($extraparams != '' && $wer != '') {
            $w.=" AND $wer ";
        }

        //query tambahan dari model
        if ($this->datamodel->whereQuery() != "") {
            $w.=" AND " . $this->datamodel->whereQuery() . " ";
        }

        // if ($idunit != null && $idunit != 'null') {
        //     $w.=" AND a.idunit=$idunit ";
        // }

        $orderby = $this->datamodel->orderBy() != "" ? "ORDER BY " . $this->datamodel->orderBy() : null;
        $sql = $this->datamodel->query() . " $w " . $orderby . " LIMIT $limit OFFSET $start";

//        $sql= $this->datamodel->query()." $w LIMIT $limit OFFSET $start";
        // echo $sql;
        $this->db->limit($start, $limit);
        $query_page = $this->db->query($sql);
        // echo $sql;
        // exit;

        $arr = array();
        $no = 1;
        foreach ($query_page->result() as $obj) {



            if ($table == 'clossinginvgrid') {
                if ($obj->assetaccount == null || $obj->akumpenyusutaccount == null || $obj->depresiasiaccount == null) {
                    $obj->status = 'akunundefined';
                } else if ($obj->assetaccount == 0 || $obj->akumpenyusutaccount == 0 || $obj->depresiasiaccount == 0) {
                    $obj->status = 'akunundefined';
                } else if ($obj->bebanperbulan == null) {
                    $obj->status = 'bebanundefined';
                } else {
                    $obj->status = 'true';
                }
            }

            if ($table == 'gridpayroll') {
                $obj->month = ambilBulan($obj->month);
            }

            if ($table == 'companydeposit' || $table == 'AdminSuper') {
                $obj->totalkaryawan = $this->m_data->totalkaryawan($obj->idcompany);
                $obj->startdate = backdate2($obj->startdate);
            }

            if ($table == 'VDataKaryawan' || $table == 'VSuratLembur' || $table == 'datapekerjaan' || $table == 'PengajuanIzin') {
                $d = $this->m_pekerjaan->getLastPekerjaan($obj->idpelamar);

                $obj->idpekerjaan = $d['idpekerjaan'];
                $obj->tglmasuk = $d['tglmasuk'];
                $obj->tglberakhir = $d['tglberakhir'];
                $obj->namajabatan = $d['namajabatan'];
                $obj->namalokasi = $d['namalokasi'];
                $obj->kodeorg = $d['kodeorg'];
                $obj->namaorg = $d['namaorg'];
                $obj->kekaryaanname = $d['kekaryaanname'];
                $obj->namaatasan = $d['namaatasan'];
                $obj->levelnameindividu = $d['levelnameindividu'];
                $obj->levelnamejabatan = $d['levelnamejabatan'];
                $obj->idstrukturjabatan = $d['idstrukturjabatan'];
            }

            if ($table == 'VDataKaryawangrid' || $table == 'datapekerjaan') {
                if ($obj->display != null) {
                    $obj->status = 'Nonaktif';
                } else if ($obj->kekaryaanname == null) {
                    if ($obj->idpergerakan == 128) {

                        $obj->status = 'TERMINASI';
                        if ($table == 'datapekerjaan') {
                            $obj->kekaryaanname = 'TERMINASI';
                        }
                        $obj->tglberakhir = $obj->tglmasuk;

                        $qterm = $this->db->query("SELECT a.idpelamar,tglmasuk
															from pelamar a
															 LEFT JOIN
															(
																	SELECT MIN(idpekerjaan) as idpekerjaan, idpelamar,tglmasuk
																	FROM pekerjaan
																	WHERE statuspergerakan='Disetujui'
																	GROUP BY idpelamar,tglmasuk
															) as b ON a.idpelamar = b.idpelamar
															where a.idpelamar = 36
															ORDER BY tglmasuk 
															limit 1");
                        if ($qterm->num_rows() > 0) {
                            $rterm = $qterm->row();
                            $obj->tglmasuk = $rterm->tglmasuk;
                        }
                    } else {
                        $obj->status = 'Belum ada pergerakan personil';
                    }
                } else {
                    $obj->status = $obj->kekaryaanname;
                }
            }

            if ($table == 'Pengguna') {
                if ($obj->group_id == 2) {
                    //adminsuper statusnya yg dipake : status produk
                    $qq = $this->db->query("select status from adminsuper where user_id=" . $obj->user_id . "");
                    if ($qq->num_rows() > 0) {
                        $rr = $qq->row();
                        $obj->status = $rr->status;
                    } else {
                        $obj->status = 'undefined';
                    }
                    $qq->free_result();
                }
            }

            if ($table == 'Pekerjaan') {
                if ($no == 1) {
                    $obj->status = 'Aktif';
                } else {
                    $obj->status = 'Nonaktif';
                }

                if ($obj->idpergerakan == 128) {
                    $obj->kekaryaanname = 'TERMINASI';
                }
                $no++;
            }

            if ($table == 'RolesMenu') {
                $obj->status = $obj->status == null ? 'YA' : $obj->status;
            }

            if ($table == 'riwayatgaji') {
                if ($obj->kodeorg == null && $obj->namajabatan == null) {
                    //kalo terminasi cari jabatan sebelumnya
                    $qJabatanSebelumnya = $this->db->query("select max(a.idpekerjaan) as tglberakhir,d.kodeorg,e.namajabatan
                                        from pekerjaan a 
                                        join pergerakanpersonil b ON a.idpergerakanpersonil = b.idpergerakanpersonil 
                                        join strukturjabatan c ON a.idstrukturjabatan = c.idstrukturjabatan
                                        join organisasi d ON c.idorganisasi = d.idorganisasi
                                        join jabatan e ON c.idjabatan = e.idjabatan
                                        where a.idpelamar = " . $obj->idpelamar . " and b.idpergerakan!=128 and b.statuspergerakan='Disetujui' 
                                        group by d.kodeorg,e.namajabatan")->row();

                    $obj->kodeorg = $qJabatanSebelumnya->kodeorg;
                    $obj->namajabatan = $qJabatanSebelumnya->namajabatan;
                }
            }

            $obj->tgllahir = isset($obj->tgllahir) ? backdate2_reverse($obj->tgllahir) : null;
            $obj->tglmasukpeg = isset($obj->tglmasukpeg) ? backdate2_reverse($obj->tglmasukpeg) : null;
            $obj->tglberakhir = isset($obj->tglberakhir) ? backdate2_reverse($obj->tglberakhir) : null;
            $obj->startdate = isset($obj->startdate) ? backdate2_reverse($obj->startdate) : null;
            $obj->enddate = isset($obj->enddate) ? backdate2_reverse($obj->enddate) : null;
            $obj->tglmasuk = isset($obj->tglmasuk) ? backdate2_reverse($obj->tglmasuk) : null;
            $obj->tglakhirjabatan = isset($obj->tglakhirjabatan) ? backdate2_reverse($obj->tglakhirjabatan) : null;
            $obj->tglgajipertama = isset($obj->tglgajipertama) ? backdate2_reverse($obj->tglgajipertama) : null;
            $obj->rencanatglmasuk = isset($obj->rencanatglmasuk) ? backdate2_reverse($obj->rencanatglmasuk) : null;
            $obj->tgllamaran = isset($obj->tgllamaran) ? backdate2_reverse($obj->tgllamaran) : null;
            $obj->tglmulai = isset($obj->tglmulai) ? backdate2_reverse($obj->tglmulai) : null;
            $obj->tglselesai = isset($obj->tglselesai) ? backdate2_reverse($obj->tglselesai) : null;
            $obj->tgllembur = isset($obj->tgllembur) ? backdate2_reverse($obj->tgllembur) : null;
            $obj->tglhadir = isset($obj->tglhadir) ? backdate2_reverse($obj->tglhadir) : null;

            // if(isset($obj->startdate))
            // {
            //     $obj->startdate = backdate2($obj->startdate);
            //     echo $obj->startdate;
            //     exit;
            // }
            // if(isset($obj->enddate))
            // {
            //     $obj->enddate = backdate2($obj->enddate);
            // }
            $arr[] = $obj;
        }

        $query = $this->db->query($this->datamodel->query() . " $w");

        $results = $query->num_rows();
        echo '{success:true,numrow:' . $query->num_rows() . ',results:' . $results .
        ',rows:' . json_encode($arr) . '}';
    }

    public function exportxl($table, $tahun, $bulan, $kodebank) {
        // require '/var/www/hrdpay/assets/libs/phpexcel/php-excel.class.php';
        // // create a simple 2-dimensional array
        // $data = array(
        //         1 => array ('Name', 'Surname'),
        //         array('Schwarz', 'Oliver'),
        //         array('Test', 'Peter')
        //         );
        // // generate file (constructor parameters are optional)
        // $xls = new Excel_XML('UTF-8', false, 'My Test Sheet');
        // $xls->addArray($data);
        // $xls->generateXML('my-test');
        // $bulantahun = str_replace("T00:00:00", "", $periodepenggajian);
        // $bulantahun = explode("-", $bulantahun);
        // $bulan = $bulantahun[1];
        // $tahun = $bulantahun[0];
        require '/var/www/hrdpay/assets/libs/phpexport/php-export-data.class.php';
        $exporter = new ExportDataExcel('browser', 'test.xls');

        $exporter->initialize(); // starts streaming data to web browser

        $bank = 1;
        if ($bank == 1) {
            $exporter->addRow(array("No", "NAMA", "NO REKENING", "JUMLAH"));
        } else {
            $exporter->addRow(array("No", "NAMA", "NO REKENING", "JUMLAH"));
        }



        $bulan = ambilNoBulan($bulan);
        $sql = "select a.pegawainid,pegawainama,kodekeljab,nomorrek, nettobulan
                    from ms_pegawai a
                    join (select nettobulan,pegawainid
                            from gajibulanan where bulan='$bulan' AND tahun='$tahun') b ON a.pegawainid = b.pegawainid
                    WHERE TRUE AND a.pegawainid in(select pegawainid
                                                            from gajibulanan where bulan='$bulan' AND tahun='$tahun') ";

        $query_page = $this->db->query($sql);

        $arr = array();
        $i = 1;
        foreach ($query_page->result() as $obj) {
            $arr[] = $obj;
            $exporter->addRow(array($i, $obj->pegawainama, $obj->nomorrek, $obj->nettobulan));
            $i++;
        }



        // $exporter->addRow(array(1, 2, 3, "123-456-7890"));


        $exporter->finalize(); // writes the footer, flushes remaining data to browser.

        exit(); // all done
    }

    public function ext_update($table) {
        $this->load->model('m_' . $table, 'datamodel');

        $view = json_decode($this->input->post('postdata'));

        $data = $this->datamodel->updateField($view);
        // print_r($data);

        if ($view != '') {

            //cek multiple PK
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model
                $banyakwer = true;
                // $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[$value] = $data[$value];
                    $i++;
                }
                $this->db->where($pkarr);
                $q = $this->db->get($this->datamodel->tableName());
            } else {
                $banyakwer = false;
                $q = $this->db->get_where($this->datamodel->tableName(), array($this->datamodel->pkField() => $data[$this->datamodel->pkField()]));
            }
            //end cek
            // echo $this->db->last_query();

            if ($q->num_rows() > 0) {
                if ($banyakwer) {
                    $this->db->where($pkarr);
                } else {
                    $this->db->where($this->datamodel->pkField(), $data[$this->datamodel->pkField()]);
                }

                $this->db->update($this->datamodel->tableName(), $data);
            } else {
                $this->db->insert($this->datamodel->tableName(), $data);
            }
        } else {
            $this->db->insert($this->datamodel->tableName(), $data);
        }
    }

    public function ext_delete($table, $dir = null, $option = null) {
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }



        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {

            //cek ada kolom idcompany gak?
            $parent = false;
            $qc = $this->db->query("select column_name from information_schema.columns where table_name='" . $this->datamodel->tableName() . "'");
            foreach ($qc->result() as $r) {
                if ($r->column_name == 'idcompany') {
                    $parent = true;
                    break;
                }
            }
            //kalo data dari idcompany parent tidak boleh dihapus
            if ($parent) {
                if ($this->session->userdata('group_id') > 2) {
                    $this->db->where($this->datamodel->pkField(), $id);
                    $qd = $this->db->get($this->datamodel->tableName());
                    if ($qd->num_rows() > 0) {
                        $rd = $qd->row();

                        //selain master dan super admin
                        if ($rd->idcompany != $this->session->userdata('idcompany')) {
                            $json = array('success' => false, 'message' => 'Data tidak boleh dihapus');
                            echo json_encode($json);
                            exit();
                        }
                    }
                }
            }

            if ($table == 'PengajuanCuti') {
                //hapus pengajuan cuti harus mengembalikan nilai sisa cuti yang sebelumnya di cuticounter
                $qpc = $this->db->get_where('pengajuancuti', array('idpengajuancuti' => $id))->row();

                $qc = $this->db->get_where('cuticounter', array('idpelamar' => $qpc->idpelamar, 'idpengaturancuti' => $qpc->idpengaturancuti));
                if ($qc->num_rows() > 0) {
                    $rc = $qc->row();
                    $this->db->where('idpelamar', $rc->idpelamar);
                    $this->db->where('idpengaturancuti', $rc->idpengaturancuti);
                    $this->db->update('cuticounter', array(
                        'diambil' => $rc->diambil - $qpc->durasi
                    ));
                }
            }

            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model

                $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                    $i++;
                }
                // print_r($pkarr);
                $this->db->where($pkarr);
                // $this->db->delete('asd');
            } else {
                $this->db->where($this->datamodel->pkField(), $id);
                // $this->db->delete($this->datamodel->tableName());
            }


            if ($table == 'SysGroup') {
                $this->db->where('group_id', $id);
                $this->db->update('sys_user', array('group_id' => null));

                $this->db->where('group_id', $id);
                $this->db->delete('sys_group_menu');
            }




            $this->db->where($this->datamodel->pkField(), $id);

            if ($option == 'hidden') {
                //delete pake display=0
                $this->db->update($this->datamodel->tableName(), array('display' => 0));
            } else {
                $this->db->delete($this->datamodel->tableName());
            }

            if ($table == 'pergerakanpersonil') {
                $this->db->where('idpergerakanpersonil', $id);
                $this->db->delete('pekerjaan');
            }

            if ($table == 'upahpegawai') {
                //update status penyesuaian upah
                $penyesuaian = $this->input->post('penyesuaian');
                $idpekerjaan = $this->input->post('idpekerjaan');
                $idpelamar = $this->input->post('idpelamar');
                if ($penyesuaian != '' && $idpekerjaan != '') {
                    $q = $this->db->get_where('penyesuaian', array('idpelamar' => $idpelamar, 'tipe' => $penyesuaian, 'status' => 0, 'idpekerjaan' => $idpekerjaan));
                    if ($q->num_rows() > 0) {
                        $this->db->where(array('idpelamar' => $idpelamar, 'tipe' => $penyesuaian, 'status' => 0, 'idpekerjaan' => $idpekerjaan));
                        $this->db->update('penyesuaian', array('status' => 1));
                    }
                }
            }

            // echo $this->db->last_query();
        }

        if ($this->db->affected_rows() > 0) {
            $json = array('success' => true, 'message' => 'Data berhasil dihapus');
            echo json_encode($json);
        } else {
            $json = array('success' => false, 'message' => 'Data gagal dihapus');
            echo json_encode($json);
        }
    }

    public function ext_delete_tmp($table, $dir = null) {
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }



        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model

                $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                    $i++;
                }
                // print_r($pkarr);
                $this->db->where($pkarr);
                // $this->db->delete('asd');
            } else {
                $this->db->where($this->datamodel->pkField(), $id);
                // $this->db->delete($this->datamodel->tableName());
            }

            //delete pake display=0
            $this->db->update($this->datamodel->tableName(), array('display' => 0));
        }
    }

    public function ext_delete2($table, $dir = null) {
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }



        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            echo $id;
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model

                $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                    $i++;
                }
                // print_r($pkarr);
                $this->db->where($pkarr);
                // $this->db->delete('asd');
            } else {
                $this->db->where($this->datamodel->pkField(), $id);
                // $this->db->delete($this->datamodel->tableName());
            }

            if ($table == 'AnggaranKso' || $dir == 'master') {
                //delete pake display=0
                $this->db->update($this->datamodel->tableName(), array('display' => 0));
            } else {
                $this->db->delete($this->datamodel->tableName());
            }
//            echo $this->db->last_query();
        }
    }

    public function ext_deletes($table, $dir = null) {
        //hapus record dengan banyak PK
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }



        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model
                $i = 0;
                $pkarr = array();
                $posdata = explode("&", $id);
                foreach ($posdata as $key => $value) {
                    $f = explode('.', $pkfield[$i]); //ngilangin alias
                    $pkarr[str_replace(" ", "", $f[1])] = $value;
                    $i++;
                }

                // $pkarr = array();
                // $i = 0;
                // foreach ($pkfield as $key => $value) {
                //     $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                //     $i++;
                // }
                // print_r($pkarr);
                $this->db->where($pkarr);
                $this->db->delete($this->datamodel->tableName());
            }

            // $this->db->delete($this->datamodel->tableName());
        }
    }

    public function ext_delete_batch($table) {
        $this->load->model('m_' . $table, 'datamodel');

        $this->db->trans_start();
// echo $table;
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {

            //delete FK tabel
            $rel = $this->datamodel->relation();
            $jum = count($rel);
            for ($i = 0; $i < $jum; $i++) {
                // print_r($rel[$i]);
                $this->db->where($rel[$i][1], $id);
                $this->db->delete($rel[$i][0]);
            }
            //tabel master
            $this->db->where($this->datamodel->pkField(), $id);
            $this->db->delete($this->datamodel->tableName());
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal menghapus data'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses menghapus data'));
        }
    }

    public function get_category() {
        $query = $this->db->query("select sys_menu_group_id,group_name from sys_menu_group");
        $json = "{'rows':[";
        foreach ($query->result() as $data) {
            $json .= '{sys_menu_group_id:"' . $data->sys_menu_group_id .
                    '", group_name:"' . $data->group_name . '"},';
        }
        $json .= "]}";
        echo $json;
    }

    public function get_parent() {
        $query = $this->db->query("select sys_menu_id,menu_name from sys_menu where parent=0");
        $json = "{'rows':[";
        foreach ($query->result() as $data) {
            $json .= '{parent:"' . $data->sys_menu_id .
                    '", menu_name:"' . $data->menu_name . '"},';
        }
        $json .= "]}";
        echo $json;
    }

    function store_field($tableName) {
        //buat bikin field di store
        //diambil dari setiap module di model

        $this->load->model('m_' . $tableName, 'datamodel');
        $fields = $this->datamodel->selectField();
        $jsvar = "{ \"fields\": [";
        foreach ($fields as $key => $value) {
            $jsvar .= "{ \"name\": \"$key\"  , \"type\": \"$value\"    },";
        }
        $jsvar .= "]}";
        echo $jsvar;
    }

    function comboxcompany() {
        if ($this->session->userdata('group_id') == 1) {
            //master
            $wer = " AND a.parent is not null";
        } else if ($this->session->userdata('group_id') == 2) {
            //superadmin
            $wer = " AND (a.idcompany=" . $this->session->userdata('idcompany') . " or a.parent=" . $this->session->userdata('idcompany') . ") AND a.parent is not null";
        } else if ($this->session->userdata('group_id') > 2) {
            //selain master admin
            $wer = " AND (a.idcompany=" . $this->session->userdata('idcompany') . ") AND a.parent is not null";
        } else {
            $wer = null;
        }
        // $wer .=  "a.display is null $wer";

        $field = array('idcompany', 'companyname', 'companycode');
        $q = $this->db->query("select idcompany,companyname,companycode from company a where a.display is null $wer");
        $this->fetchJson($q, $field);
    }

    function comboOrgInduk() {
        $field = array('kodeorginduk');
        $sql = "select DISTINCT kodeorginduk from org ORDER BY kodeorginduk limit 100 ";
        $q = $this->db->query($sql);

        $this->fetchJson($q, $field);
    }

    function comboxtahuntk() {
        $field = array('tahun');
        $sql = "select DISTINCT tahun
                from perencanaantk a
                where display is null " . $this->m_data->whereCompany() . "";
        $q = $this->db->query($sql);

        $this->fetchJson($q, $field);
    }

    function comboxkomponenupah($jenis) {
        if ($jenis == 'tetap') {
            $jenis = 'Upah Tetap';
        } else {
            $jenis = 'Upah Tidak Tetap';
        }

        $field = array('namakomponen', 'idkomponenupah');
        $sql = "select idkomponenupah,namakomponen
                from komponenupah
                where jeniskomponen='$jenis' and (idcompany=" . $this->session->userdata('idcompany') . " OR idcompany=" . $this->session->userdata('idcompanyparent') . ")";
        $q = $this->db->query($sql);

        $this->fetchJson($q, $field);
    }

    function comboxBenefit() {
        $field = array('idbenefit', 'namabenefit');
        $sql = "select idbenefit,namabenefit
                from komponenbenefit
                where (idcompany=" . $this->session->userdata('idcompany') . " OR idcompany=" . $this->session->userdata('idcompanyparent') . ")";
        $q = $this->db->query($sql);

        $this->fetchJson($q, $field);
    }

    function comboxPengurangUpah() {
        $field = array('idpengurangupah', 'namapengurangupah');
        $sql = "select idpengurangupah,namapengurangupah
                from pengurangupah
                where (idcompany=" . $this->session->userdata('idcompany') . " OR idcompany=" . $this->session->userdata('idcompanyparent') . ")";
        $q = $this->db->query($sql);

        $this->fetchJson($q, $field);
    }

    function comboJabatan() {
        $field = array('jabatandetail', 'nourutjab');
        $qj = $this->db->get_where('keljab', array('ketkeljab' => $_GET['ketkeljab']))->row();
        $sql = "select jabatandetail,nourutjab from tabjab where kodekeljab = '" . $qj->kodekeljab . "' ORDER BY jabatandetail,nourutjab";
        // echo $sql;
        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function comboxDasarKomponenUpah() {
        $field = array('idkomponenupah', 'namakomponen');
        // $qj = $this->db->get_where('keljab', array('ketkeljab' => $_GET['ketkeljab']))->row();
        $sql = "select idkomponenupah,namakomponen from komponenupah a 
        where display is null " . $this->m_data->whereCompany() . " and now() between startdate and enddate 
        and jeniskomponen='Upah Tetap'";
        // echo $sql;
        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function comboxJabatan() {
        $field = array('idjabatan', 'namajabatan');
         $idcompany = $this->input->get('idcompany');
        // $qj = $this->db->get_where('keljab', array('ketkeljab' => $_GET['ketkeljab']))->row();

        if($idcompany!='')
        { 
            $wer = " and idcompany = $idcompany";
        } else {
            $wer = $this->m_data->whereCompany();
        }

        // $qj = $this->db->get_where('keljab', array('ketkeljab' => $_GET['ketkeljab']))->row();
        $sql = "select idjabatan,namajabatan from jabatan a where display is null  " .$wer . " and now() between startdate and enddate";
        // echo $sql;
        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function comboxOrg() {
        $field = array('idorganisasi', 'namaorg');
        $idcompany = $this->input->get('idcompany');
        // $qj = $this->db->get_where('keljab', array('ketkeljab' => $_GET['ketkeljab']))->row();

        if($idcompany!='')
        { 
            $wer = " and idcompany = $idcompany";
        } else {
            $wer = $this->m_data->whereCompany();
        }
        $sql = "select idorganisasi,namaorg from organisasi a 
        where display is null  " .$wer. " and now() between startdate and enddate";
        // echo $sql;
        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function combounit() {
        $field = array('idunit', 'namaunit');
        if ($this->session->userdata('group_id') == 99) {
            // $idunit = $this->session->userdata('idunit');
//             $q = $this->db->get_where($data, array('idunit'=>$this->session->userdata('idunit')));
            $sql = "select idunit,namaunit from unit where idunit <> 99";
        } else {
            //administrtor
            $idcompany = $this->session->userdata('idcompany');
            $quunit = $this->db->get_where('userunit', array('user_id' => $this->session->userdata('userid')));
            // echo $this->db->last_query();
            $unit = "";
            foreach ($quunit->result() as $rr) {
                $qunit = $this->db->get_where('unit', array('idunit' => $rr->idunit))->row();
                $unit.= " idunit=" . $qunit->idunit . ' OR';
            }
            $unit = substr($unit, 0, -2);
            if ($unit == "") {
                $unit = null;
            } else {
                $unit = "AND (" . $unit . ")";
            }

            $sql = "select idunit,namaunit from unit where idunit <> 99 $unit AND idcompany=$idcompany";
        }

        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function combox($data, $id = null) {

        $param = "";
        $display = false;
        $d = array();
        $orderby = false;
        $orderbyfield = null;
        $company = false;
        $datamaster = false;
        if ($data == 'bussinestype') {
            $field = array('idbussinestype', 'namebussines');
        } else if ($data == 'sutri') {
            $field = array('nourutsutri', 'namasutri');
        } else if ($data == 'accounttype') {
            $field = array('idaccounttype', 'acctypename');
            $display = true;
            $orderby = true;
            $orderbyfield = 'acctypename';
        } else if ($data == 'unit') {
            $field = array('idunit', 'namaunit');
        } else if ($data == 'employeetype') {
            $field = array('idemployeetype', 'nametype');
        } else if ($data == 'sys_user') {
            $field = array('user_id', 'realname');
        } else if ($data == 'sys_group') {
            $display = true;
            $field = array('group_id', 'group_name');
        } else if ($data == 'tunjangantype') {
            $field = array('idtunjtype', 'nametunj');
        } else if ($data == 'siklus') {
            $field = array('idsiklus', 'namasiklus');
        } else if ($data == 'potongantype') {
            $field = array('idpotongantype', 'namepotongan');
        } else if ($data == 'amounttype') {
            $field = array('idamounttype', 'name');
        } else if ($data == 'payrolltype') {
            $field = array('payrolltypeid', 'payname');
        } else if ($data == 'tambahangajitype') {
            $field = array('idtambahangajitype', 'tambahantype');
            $display = true;
        } else if ($data == 'ptkp') {
            $display = true;
            $field = array('idptkp', 'namaptkp');
        } else if ($data == 'natadaya_rekening') {
            $display = true;
            $field = array('norek', 'accname');
        } else if ($data == 'tingkatlokasi') {
            $field = array('idtingkatlokasi', 'tingkatlokasi');
        } else if ($data == 'lokasi_org') {
            $display = true;
            //$company=true;
            $datamaster = true;
            $field = array('idlokasiorg', 'namalokasi');
        } else if ($data == 'kekaryaan') {
            $display = true;
            $datamaster = true;
            $field = array('idkekaryaan', 'kekaryaanname');
        } else if ($data == 'sextype') {
            $field = array('idsex', 'sexname');
        } else if ($data == 'statuskawin') {
            $display = true;
            $datamaster = true;
            $field = array('idstatuskawin', 'namastatuskawin');
        } else if ($data == 'jenjangpendidikan') {
            $display = true;
            $datamaster = true;
            $field = array('idjenjangpendidikan', 'namajenjang');
        } else if ($data == 'jeniskontrak') {
            $field = array('idjeniskontrak', 'namakontrak');
        } else if ($data == 'level') {
            $display = true;
            $datamaster = true;
            $field = array('idlevel', 'levelname');
        } else if ($data == 'hubkeluarga') {
            $display = true;
            // $datamaster=true;
            $field = array('idhubkeluarga', 'namahubkeluarga');
        } else if ($data == 'agama') {
            $display = true;
            $datamaster = true;
            $field = array('idagama', 'namaagama');
        } else if ($data == 'pergerakan') {
            $display = true;
            $orderby = true;
            $orderbyfield = 'kodepergerakan';
            $field = array('idpergerakan', 'namapergerakan');
        } else if ($data == 'jenisizin') {
            $display = true;
            $datamaster = true;
            $field = array('idjenisizin', 'namaizin');
        } else if ($data == 'waktulembur') {
            $field = array('idwaktulembur', 'waktulembur');
        } else if ($data == 'jamkerjaharian') {
            $display = true;
            $datamaster = true;
            $field = array('idjamkerjaharian', 'namajamkerja');
        } else if ($data == 'configdasarupahtt') {
            $display = true;
            $datamaster = true;
            $field = array('idconfigdasarupahtt', 'dasarupahtt');
        } else if ($data == 'pengaturancuti') {
            $display = true;
            $company = true;
            $field = array('idpengaturancuti', 'namapengcuti');
        } else if ($data == 'kewarganegaraan') {
            $display = true;
            $datamaster = true;
            $field = array('idkewarganegaraan', 'namakewarganegaraan');
        } else if ($data == 'jadwalkerja') {
            $display = true;
            $datamaster = true;
            $field = array('idjadwalkerja', 'namajadwalkerja');
        } else if ($data == 'jamkerjaharian') {
            $display = true;
            $datamaster = true;
            $field = array('idjamkerjaharian', 'namajamkerja');
        }

        // echo $data." && ".$this->session->userdata('group_id');

        if ($orderby) {
            $this->db->order_by($orderbyfield);
        }

        if ($datamaster) {
            $this->db->where('idcompany', $this->session->userdata('idcompany'));
            $this->db->or_where('idcompany', $this->session->userdata('idcompanyparent'));
        }

        if ($data == 'kekaryaan') {
            $this->db->or_where('idcompany', 1);
        }
        
//        if (isset($_GET['whereonly']))
//        {
//            $whereonly = explode(':',$_GET['whereonly']);
//            $this->db->where($whereonly[0],$whereonly[1]);
//        }

        if (isset($_GET['xtraparam'])) {
            $p = explode('=', $_GET['xtraparam']);
            $this->db->where('display', null);
            $q = $this->db->get_where($data, array($p[0] => $p[1]));
        } if (isset($_POST['xtraparam'])) {
            $p = explode('=', $_GET['xtraparam']);
            $this->db->where('display', null);
            $q = $this->db->get_where($data, array($p[0] => $p[1]));
        } else if ($data == 'unit') {
            if ($this->session->userdata('group_id') != 99) {
                $this->db->where('display', null);
                $q = $this->db->get_where($data, array('idunit' => $this->session->userdata('idunit')));
            } else {
                //super user/admin
                $this->db->where('display', null);
                $q = $this->db->get($data);
            }
        } else if ($data == 'sys_group') {
            if ($this->session->userdata('group_id') != 1) {
                //selain master admin
                $wer = " AND (idcompany=" . $this->session->userdata('idcompany') . ")";
            } else if ($this->session->userdata('group_id') == 1) {
                //master admin
                 if (isset($_GET['whereonly']))
                {
                    $whereonly = explode(':',$_GET['whereonly']);
//                    $this->db->where($whereonly[0],$whereonly[1]);
                    $wer = " AND (".$whereonly[0]."=".$whereonly[1].")";
                } else {
                    $wer = " AND (group_id=1 OR group_id=2 OR group_id=3 OR group_id=4)";
                }
                
            } else {
                $wer = null;
            }
            $where = "display is null $wer";

            $q = $this->db->query("select * from $data where $where");
        } else if ($company) {
            if ($display) {
                
            }

            if ($this->session->userdata('group_id') == 2) {
                $qc = $this->db->query("select idcompany from company where parent=" . $this->session->userdata('idcompany') . "");
                //superadmin
                $i = 0;
                foreach ($qc->result() as $r) {
                    $this->db->or_where('idcompany', $r->idcompany);
                    $i++;
                }
            }

            $this->db->where('idcompany', $this->session->userdata('idcompany'));
            $this->db->where('display', null);
            // echo $this->m_data->whereCompany();k
            //$this->db->or_where('idcompany',$this->session->userdata('idcompanyparent'));

            $q = $this->db->get($data);
            // echo $this->db->last_query();
        } else {
            if ($display) {
                $this->db->where('display', null);
            }
            $q = $this->db->get($data);
        }

// echo $this->db->last_query();
        header('Content-Type: text/javascript; charset=UTF-8');

        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        $this->fetchJson($q, $field);
    }

    function comboxTahunPayroll() {
        $field = array('year');
        $q = $this->db->query('select DISTINCT year from payroll');

        header('Content-Type: text/javascript; charset=UTF-8');

        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        $this->fetchJson($q, $field);
    }

    function feedMonth() {
        $arrMonth = array('01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'Nopember', '12' => 'Desember');

        $json = "{
                \"success\": true,
                \"dat\": [";

        foreach ($arrMonth as $key => $value) {
            $json .= "{";
            $json .="\"nobulan\": \"" . $key . "\"," . "\"namabulan\": \"" . $value . "\"";
            $json .= "},";
        }

        $json .="]}";
        // $json = str_replace(" ", "", $json);
        echo $json;
    }

    function fetchJson($q, $field) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
                    $d[$i][$field[$if]] = $r[$field[$if]];
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
        $json = "{
                \"success\": $success,
                \"dat\": [";
//           $json = "[";
        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
//                echo $d[$i][$field[$if]].' ';
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

//        $json .="]";
        $json .="]}";
//         $json = str_replace(" ", "", $json);
        echo $json;
    }

    function fetchJson2($q, $field) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
                    $d[$i][$field[$if]] = $r[$field[$if]];
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
//        $json = "{
//                \"success\": $success,
//                \"dat\": [";
        $json = "[";

        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

        $json .="]";
//        $json .="]}";
        // $json = str_replace(" ", "", $json);
        echo $json;
    }

    function cetak($modul, $id) {
        // $modul=$this->input->get('modul');
        // $id=$this->input->get('id');
        if ($modul == 'penerimaansiswa') {
            $this->load->model('money/m_historypembayaransiswa', 'model');
            $d['data'] = $this->model->cetak($id);
            $d['title'] = 'Bukti Pembayaran';
            $this->load->view('tplcetak/penerimaansiswa', $d);
        } else if ($modul == 'receivemoney') {
            $this->load->model('money/m_receivemoney', 'model');
            $d['data'] = $this->model->cetak($id);
            $d['title'] = 'KWITANSI';
            $this->load->view('tplcetak/penerimaan', $d);
        } else if ($modul == 'purchase') {
            $this->load->model('purchase/m_purchaseall', 'model');
            $d['data'] = $this->model->cetak($id);
            $d['title'] = 'FAKTUR PEMBELIAN';
            $this->load->view('tplcetak/pembelian', $d);
        } else if ($modul == 'Return') {
            $this->load->model('purchase/m_return', 'model');
            $d['data'] = $this->model->cetak($id);
            $d['title'] = 'FAKTUR RETUR';
            $this->load->view('tplcetak/retur', $d);
        }
    }

    function cmb() {
        echo "{\"success\":true,
                \"dat\":[{\"agamakode\":\"2\",\"agamanama\":\"KRISTEN\"}]}";
    }

    function teslasabsen() {
//         $date = '2011/10/14';
// $day = date('D', strtotime($date));
// echo $day;

        $this->load->model('m_user');
        echo $this->m_user->cekAbsenSebelumnya('5171084L', '04', '2014');
    }

    function replacedata() {
        $db = $this->load->database('sipeg', TRUE);
        $q = $db->get('tjabstruktural');
        foreach ($q->result() as $r) {
            $qcek = $this->db->get_where('tjabstruktural', array('kdtgktunit' => $r->kdtgktunit, 'kdjenjang' => $r->kdjenjang, 'kddaerah' => $r->kddaerah, 'kodesubunit' => $r->kodesubunit));
            $d = array(
                'kdjenjang' => $r->kdjenjang,
                'kddaerah' => $r->kddaerah,
                'kodesubunit' => $r->kodesubunit,
                'nilai' => $r->nilai,
                'kdtgktunit' => $r->kdtgktunit,
                'display' => null
            );
            if ($qcek->num_rows() > 0) {
                $this->db->where(array('kdtgktunit' => $r->kdtgktunit, 'kdjenjang' => $r->kdjenjang, 'kddaerah' => $r->kddaerah, 'kodesubunit' => $r->kodesubunit));
                $this->db->update('tjabstruktural', $d);
            } else {
                $this->db->insert('tjabstruktural', $d);
            }
        }
    }

    function abc() {
        $this->db->where('penugasannama !=', '');
        $q = $this->db->get('rtugas');
        foreach ($q->result() as $r) {
            $qq = $this->db->query("select nextval('seq_rtugas'::regclass) as no")->row();
            $this->db->where('penugasannama', $r->penugasannama);
            $this->db->where('pegawainid', $r->pegawainid);
            $this->db->update('rtugas', array('nortugas' => $qq->no));
        }
    }

    function insertmenu() {
        $q = $this->db->get_where('sys_group_menu', array('group_id' => 99));
        // echo $this->db->last_query()."<br>";
        foreach ($q->result() as $r) {
            $this->db->insert('sys_group_menu', array('sys_menu_id' => $r->sys_menu_id, 'group_id' => 2));
            echo $this->db->last_query() . "<br>";
        }
    }

    function linkunit() {
        $q = $this->db->get('linkedacc');
        foreach ($q->result() as $r) {
            $qu = $this->db->get('unit');
            foreach ($qu->result() as $ru) {
                $qc = $this->db->get_where('linkedaccunit', array('idlinked' => $r->idlinked, 'idunit' => $ru->idunit));
                if ($qc->num_rows() > 0) {
                    
                } else {
                    $this->db->insert('linkedaccunit', array('idlinked' => $r->idlinked, 'idunit' => $ru->idunit));
                }
            }
        }
    }

    function tesexec() {
        $datbaseName = 'aktivadb';
        $userName = 'imm';
        $password = 'imm';
        $timeStampValue = time();
        $saveLocation = "C:\xampp\htdocs\aktiva";

        // $createBackup = "pg_dump -U" . $userName. "-Fp " .$datbaseName. " > " . $saveLocation.$timeStampValue."."."sql";
        echo exec("C:\Program Files (x86)\PostgreSQL\9.1\bin\pg_dump -U imm -Fp aktivadb -f aktivadbexec.backup");
        // echo exec("whoami");
    }

    function tes() {
        $tgllembur = '2015-02-02';
        $q = $this->db->get_where('lembur', array('idpelamar' => 20, 'display' => null, 'tgllembur' => "$tgllembur"));
        echo $this->db->last_query();
        // echo $this->m_data->getID('jenisizin', 'namaizin', 'idjenisizin', 'SAKIT',true);
        // echo 'a';
    }

    function tesseq() {
        $this->load->model('m_data');
        echo $this->m_data->getSeqVal('seq_product', 'sys_user', 'user_id');
    }

}
