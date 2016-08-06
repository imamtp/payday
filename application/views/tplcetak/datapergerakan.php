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
    <table class='tablereport' width='100%' border='0' padding="0">
    <tr>
        <!-- <td colspan="5">  -->
            <center>
                <h1>Data Pergerakan Personil</h1>       
            </center>
        <!-- </td> -->
    </tr>
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>No</td>
         <td><b>NIK</td>
         <td><b>Nama Lengkap</td>
         <td><b>No Pergerakan</td>
         <td><b>Jenis Pergerakan</td>
         <td><b>Jabatan Sebelumnya</td>
         <td><b>Jabatan Baru</td>    
         <td><b>Kekaryawanan Sebelumnya</td>
         <td><b>Kekaryawanan</td>
         <td><b>Level Jabatan Sebelumnya</td>
         <td><b>Level Jabatan</td>
         <td><b>Level Individu Sebelumnya</td>
         <td><b>Level Individu</td>
         <td><b>Lokasi Sebelumnya</td>
         <td><b>Lokasi Baru</td>
         <td><b>Organisasi Sebelumnya</td>
         <td><b>Organisasi Baru</td>
         <td><b>Nama Atasan</td>
         <td><b>Nama Jabatan Atasan</td>
         <td><b>Nama Org Atasan</td>
         <td><b>Tgl Mulai Jabatan</td>
         <td><b>Tgl Akhir Jabatan</td>
         <td><b>Status</td>
    </tr>

    <?php
    $no=1;
    foreach ($data->result() as $r) {
            if($r->idpergerakan==128)
            {
                //tampilan jabatan walaupun sudah terminasi
                $d = $m_pekerjaan->getLastPekerjaanv2($r->idpelamar,false,$r->idpergerakanpersonil);
                
                $r->namajabatan = $d['namajabatan'];
                $r->namalokasi = $d['namalokasi'];
                $r->levelnamejabatan = $d['levelnamejabatan'];
                $r->levelnameindividu = $d['levelnameindividu'];
                $r->namaorg = $d['namaorg'];
                $r->namaatasan = $d['namaatasan'];
                $r->namajabatanatasan = isset($d['namajabatanatasan']) ? $d['namajabatanatasan'] : null;
                $r->namaorg = $d['namaorg'];
                $r->kekaryaanname = $d['kekaryaanname'];
                $r->tglmasuk = $d['tglmasukkaryawan'];
                $r->tglberakhir = $d['tglberakhir'];
            }
            ?>
            <tr style="font-size: 12px;">
                 <td><?=$no?></td>
                 <td><?=$r->nik?></td>  
                 <td><?=$r->namalengkap?></td>
                 <td><?=$r->nopergerakan?></td>
                 <td><?=$r->namapergerakan?></td>                 
                 <td><?=$r->namajabatan_from?></td>
                 <td><?=$r->namajabatan?></td>
                 <td><?=$r->kekaryaanname_from?></td>      
                 <td><?=$r->kekaryaanname?></td>     
                 <td><?=$r->levelnamejabatan_from?></td> 
                 <td><?=$r->levelnamejabatan?></td>
                 <td><?=$r->levelnameindividu_from?></td>  
                 <td><?=$r->levelnameindividu?></td>                            
                 <td><?=$r->namalokasi_from?></td>
                 <td><?=$r->namalokasi?></td>                 
                 <td><?=$r->namaorg_from?></td>
                 <td><?=$r->namaorg?></td>
                 <td><?=$r->namaatasan?></td>
                 <td><?=$r->namajabatanatasan?></td>
                 <td><?=$r->namaorgatasan?></td>
                 <td><?=$r->tglmasuk?></td>
                 <td><?=$r->tglberakhir?></td>
                 <td><?=$r->statuspergerakan?></td>
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