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
                <h1>REKAP KEHADIRAN</h1>       
            </center>
        <!-- </td> -->
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>No</td>
         <td><b>Nama Lengkap</td>
         <td><b>NIK</td>
         <td><b>Jabatan</td>
         <td><b>Organisasi</td>
         <td><b>Lokasi</td>
         <td><b>Perusahaan</td>
         <td><b>Jumlah Kehadiran</td>
         <td><b>Jumlah Ketidakhadiran</td>
         <td><b>Durasi Keterlambatan</td>
         <td><b>Jumlah Keterlambatan</td>
         <td><b>Jumlah Izin</td>
         <td><b>Jumlah Cuti</td>
    </tr>

    <?php
    $no=1;
    foreach ($data as $key => $r) {
            ?>
            <tr style="font-size: 12px;">
                <td><?=$no?></td>
                <td><?=$r->namalengkap?></td>  
                <td><?=$r->nik?></td>  
                <td><?=$r->namajabatan?></td>  
                <td><?=$r->namaorg?></td>  
                <td><?=$r->namalokasi?></td>  
                <td><?=$r->companyname?></td>  
                <td><?=$r->hadir?></td>  
                <td><?=$r->tidakhadir?></td>  
                <td><?=$r->durasiketerlambatan?></td>  
                <td><?=$r->keterlambatan?></td>  
                <td><?=$r->izin?></td>  
                <td><?=$r->cuti?></td>  
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