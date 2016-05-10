<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		// $this->load->view('welcome_message');
		echo 'index';
	}

	function tesmssql($table=null)
	{
		// echo 'asd';
		// $dbmssql = $this->load->database('mssql', TRUE);
		// // $dbmssql->get('PegawaSi');
		// // echo ':'.$dbmssql->num_rows();
		// 	$q = $dbmssql->query("SELECT * 
		// 		  FROM syscolumns 
		// 		 WHERE id=OBJECT_ID('".$table."') ");
		// 		echo 'asd'.$q->last_query();
		// 		$field1 = array();
		// 		foreach ($q->result() as $r) {
		// 			$field = 'name';
		// 			// echo $r->$field.'<br/>';
		// 			array_push($field1, $r->$field);
		// 		}

		try
		{
		 $db = new PDO('odbc:Driver=FreeTDS; Server=192.168.56.101; Port=1433; Database=sipeg; UID=sa; PWD=sa123456;');
		}
		catch(PDOException $exception)
		{
		die("Unable to open database.Error message:$exception.");
		}
		echo 'Successfully connected!<hr/>';

		$query = "SELECT *
					  FROM syscolumns 
					 WHERE id=OBJECT_ID('".$table."') ";

		$field1 = array();
	    foreach ($db->query($query) as $row) {
	        // print $row['name'] . "\t";
	        array_push($field1, $row['name']);
	    }

		$q = $this->db->query("select column_name from information_schema.columns where
table_name='".$table."'");
		$field2 = array();
		foreach ($q->result() as $r) {
					$field = 'column_name';
					array_push($field2, $r->$field);
					// echo $r->$field.'<br/>';
		}

		$data = array();
		// $q = $dbmssql->query("SELECT * FROM ".$table."");
		$i=0;
		// foreach ($q->result() as $r) {
		// 	# code...
		// 	foreach ($field1 as $key => $value) {
		// 		# code...
		// 		$data[$i][strtolower($value)] = $r->$value;
		// 	}
		// 	// break;
		// 	$i++;
		// }

		$query = "SELECT *
					  FROM $table";
	    foreach ($db->query($query) as $row) {
	    	foreach ($field1 as $key => $value) {
		// 		# code...
	    		if($value=='nmuser')
	    		{
	    			$data[$i]['userin'] = $row[$value];
	    			$data[$i]['usermod'] = $row[$value];
	    		} else if($value=='startdate' || $value=='enddate')
	    		{
	    			// $data[$i]['datemod'] = $row[$value];
	    			// $data[$i]['datein'] = $row[$value];
	    			$data[$i]['userin'] = $row[$value];
	    			$data[$i]['usermod'] = $row[$value];
	    		} else if($value=='tglupdate')
	    		{
	    			$data[$i]['datemod'] = $row[$value];
	    			$data[$i]['datein'] = $row[$value];
	    		} else if($value=='NMUSER')
	    		{
	    			$data[$i]['userin'] = $row[$value];
	    			$data[$i]['usermod'] = $row[$value];
	    		} else if($value=='TGLUPDATE')
	    		{
	    			$data[$i]['datemod'] = $row[$value];
	    			$data[$i]['datein'] = $row[$value];
	    		} else if($value=='GolPegId')
	    		{
	    			$data[$i]['golpegid'] = $row[$value] == null ? 'U9999' : strtoupper($row[$value]);
	    		}
	    		 else {
//                             if(strtolower($value)!='nortugas')
//                             {
                                 $data[$i][strtolower($value)] = $row[$value];
//                             }
	    			
//                                echo utf8_encode($row[$value]);
	    		}
				
			}
			$i++;
			// break;
	    }
	    // print_r($data);
	    $dbsipeg = $this->load->database('sipeg', TRUE);

		$table = strtolower($table);
		$i-=1;
		for($j=0;$j<=$i;$j++)
		{
			echo $j;
			print_r($data[$j]);
                        
                        
                        
                            $dbsipeg->insert($table,$data[$j]);
			
			echo $j.$dbsipeg->last_query().'<br/>';
		}

	}

	function tescon()
	{
		$myServer = '192.168.56.101';
			$myUser = "sa";
			$myPass = "sa123456";

// 			$dbhandle = mssql_connect($myServer, $myUser, $myPass)
// 			or die("Couldn't connect to SQL Server on $myServer. Error: " . mssql_get_last_message());
// var_dump($dbhandle);
		$db = new PDO("dblib:host=$myServer;dbname=sipeg;charset=UTF-8", $myUser, $myPass);

	}

	function tesodbc()
	{
		try
		{
		 $db = new PDO('odbc:Driver=FreeTDS; Server=192.168.56.101; Port=1433; Database=sipeg; UID=sa; PWD=sa123456;');
		}
		catch(PDOException $exception)
		{
		die("Unable to open database.Error message:$exception.");
		}
		echo 'Successfully connected!<hr/>';

		$query = "SELECT *
					  FROM syscolumns 
					 WHERE id=OBJECT_ID('Bank') ";

	    foreach ($db->query($query) as $row) {
	        print $row['name'] . "\t";
	        // print_r($row);
	    }

		// $query = "SELECT *
		// 		  FROM syscolumns 
		// 		 WHERE id=OBJECT_ID('Bank') ";
		// $statement = $db->prepare($query);
		// $statement->bindValue(1, 'Value', PDO::PARAM_STR);
		// $statement->execute();
		// $result = $statement->fetchAll(PDO::FETCH_NUM);
		// var_dump($result);
	}

	function udpateggolongan()
	{
		 $dbsipeg = $this->load->database('sipeg', TRUE);
		 $q = $dbsipeg->get('golongan');
		 foreach ($q->result() as $r) {
		 	$dbsipeg->where('golpegid',$r->golpegid);
		 	$dbsipeg->update('golongan',array('golpegid'=>strtoupper($r->golpegid)));
		 }
	}

	function updatepegawai($table='PEGAWAI')
	{

		try
		{
		 $db = new PDO('odbc:Driver=FreeTDS; Server=192.168.56.101; Port=1433; Database=sipeg; UID=sa; PWD=sa123456;');
		}
		catch(PDOException $exception)
		{
		die("Unable to open database.Error message:$exception.");
		}
		echo 'Successfully connected!<hr/>';

		$query = "SELECT *
					  FROM syscolumns 
					 WHERE id=OBJECT_ID('".$table."') ";

		$field1 = array();
	    foreach ($db->query($query) as $row) {
	        array_push($field1, $row['name']);
	    }

		$q = $this->db->query("select column_name from information_schema.columns where
table_name='".$table."'");
		$field2 = array();
		foreach ($q->result() as $r) {
					$field = 'column_name';
					array_push($field2, $r->$field);
					// echo $r->$field.'<br/>';
		}

		$data = array();
		$i=0;
		$daftarfield = '';
		foreach ($field1 as $key => $value) {
			$daftarfield.=$value.',';
		}
		 // $query = "SELECT * FROM $table WHERE pegawainid='5582204J'";
		$query = "SELECT PegawaiNid,JobClass,KodeRumah,Kondite,KodeBayar,Keluarga,PRK_GAJI,KEDUDUKAN,LANTAI,
		TELEPON_EXT,GEDUNG,TGLCUTI,TGLWINDUAN,NOPAJAK,GAJICODE,kodejab,lastupdateby,
		lastupdatedate,nourutdir,mskrjbeli,indexgaji,bumrumah,statusbumrumah,Nourutgaji
		,KodeTunDaerah,KodeTunPensiun,skala,NourutProfesi,KodeKompetensi,skalaphdp,
		nourutprofesi2,kodeprofesi1,kodeprofesi2,tglnpwp,unit,grade,jab,prof1,prof2,
		perner,kodedplk,NomorRekdplk FROM $table";

		$dbsipeg = $this->load->database('sipeg', TRUE);
	    
	    foreach ($db->query($query) as $row) {
	    	// echo $row['Keluarga'].'<hr/>';
	    	print_r($row).'<hr/>';
	    	foreach ($field1 as $key => $value) {
		// 		# code...
	    		// print_r($row).'<hr/>';

	    		// if($value=='nmuser')
	    		// {
	    		// 	$data[$i]['userin'] = $row[$value];
	    		// 	$data[$i]['usermod'] = $row[$value];
	    		// } else if($value=='startdate' || $value=='enddate')
	    		// {
	    		// 	// $data[$i]['datemod'] = $row[$value];
	    		// 	// $data[$i]['datein'] = $row[$value];
	    		// 	$data[$i]['userin'] = $row[$value];
	    		// 	$data[$i]['usermod'] = $row[$value];
	    		// } else if($value=='tglupdate')
	    		// {
	    		// 	$data[$i]['datemod'] = $row[$value];
	    		// 	$data[$i]['datein'] = $row[$value];
	    		// } else if($value=='NMUSER')
	    		// {
	    		// 	$data[$i]['userin'] = $row[$value];
	    		// 	$data[$i]['usermod'] = $row[$value];
	    		// } else if($value=='TGLUPDATE')
	    		// {
	    		// 	$data[$i]['datemod'] = $row[$value];
	    		// 	$data[$i]['datein'] = $row[$value];
	    		// } else if($value=='GolPegId')
	    		// {
	    		// 	$data[$i]['golpegid'] = $row[$value] == null ? 'U9999' : strtoupper($row[$value]);
	    		// }
	    		//  else {
	    			if(isset($row[$value]))
	    			{
	    				// echo "xxxx".$value;
	    				if($value=='Kondite')
	    				{
	    					$kondite = strtolower(str_replace(" ", "", str_replace("'", "", $row[$value])));
	    					echo 'KONDITE:'.$kondite;
	    					$data[$i][strtolower($value)] = $kondite == '' ? NULL : $kondite; 
	    				} else {
	    					$data[$i][strtolower($value)] = $row[$value];
	    				}
	    				
	    			}
	    			
	    		// }
				
			}

			 $dbsipeg->where('pegawainid',$data[$i]['pegawainid']); 
			 $dbsipeg->update('ms_pegawai',$data[$i]);
			 echo $dbsipeg->last_query().'<hr/>';
			 $i++;
			// break;
			// print_r($data);
	    }
	    // print_r($data);
	    $dbsipeg = $this->load->database('sipeg', TRUE);

		$table = strtolower($table);
		$i-=1;
		for($j=0;$j<=$i;$j++)
		{
			// echo $j;
			// print_r($data[$j]);
			// echo '<hr/>';
			// $dbsipeg->insert($table,$data[$j]);
			// echo $j.$dbsipeg->last_query().'<br/>';
		}

	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */