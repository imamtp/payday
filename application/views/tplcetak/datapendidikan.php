<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
$borderstyle = "border-bottom: #E6E8E6;  border-bottom-width: thin; border-bottom-style: dotted; ";
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<body>
<center>
    <table class='tablereport' width='800' border='0' padding="0">
    <tr>
        <!-- <td colspan="5">  -->
            <center>
                <h1>Data Pendidikan</h1>       
            </center>
        <!-- </td> -->
    </tr>
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>NIK</td>
         <td><b>Nama Lengkap</td>
         <td><b>Kekaryawanan</td>
         <td><b>Perusahaan</td>
          <td><b>Tgl Masuk</td>
         <td><b>Tgl Berakhir</td>
         <td><b>Jenjang</td>
         <td><b>Instansi</td>
         <td><b>Fakultas</td>
         <td><b>Jurusan</td>
         <td><b>Tahun Masuk</td>
         <td><b>Tahun Lulus</td>
    </tr>

    <?php
    $no=1;
    foreach ($data->result() as $r) {
		
		if($r->display!=null)
                {
                    $r->status = 'Nonaktif';
                } else if($r->kekaryaanname==null)
                    {
						if($r->idpergerakan==128)
                        {
							
							$r->status = 'TERMINASI';
							$r->tglberakhir = $r->tglmasuk;
							
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
							if($qterm->num_rows()>0)
							{
								$rterm = $qterm->row();
								$r->tglmasuk = $rterm->tglmasuk;
							}
							
						} else {
							$r->status = 'Belum ada pergerakan personil';
						}
                    } else {
                            $r->status = $r->kekaryaanname;
                        }
						
						
            ?>
            <tr style="font-size: 12px;">
                 <td><?=$r->nik?></td>
                 <td><?=$r->namalengkap?></td>  
                 <td><?=$r->status?></td>
                 <td><?=$r->companyname?></td>
                  <td><?=$r->tglmasuk?></td>
                 <td><?=$r->tglberakhir?></td>
                 <td><?=$r->namajenjang?></td>
                 <td><?=$r->namainstansi?></td>
                 <td><?=$r->fakultas?></td>
                 <td><?=$r->jurusan?></td>
                 <td><?=$r->tahunmulai?></td>
                 <td><?=$r->tahunselesai?></td>
            </tr>
            
            <?php
        $no++;
//           echo "<tr><td colspan=5><hr style=border: none; height: 0;  border-top: 0px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3);> </td></tr>";
    }
    ?>

</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>