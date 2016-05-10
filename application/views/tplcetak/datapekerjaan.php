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
                <h1>Data Pekerjaan</h1>       
            </center>
        <!-- </td> -->
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>NIK</td>
         <td><b>Nama Lengkap</td>
         <td><b>Tanggal Lahir</td>
         <td><b>NIK</td>
         <td><b>Jabatan</td>
         <td><b>Level Jabatan</td>
         <td><b>Level Individu</td>
         <td><b>Lokasi</td>
         <td><b>Organisasi</td>
         <td><b>Kekaryawanan</td>
         <td><b>Perusahaan</td>
         <td><b>Tgl Masuk</td>
         <td><b>Tgl Berakhir</td>
         <!-- <td><b>Nama Atasan</td>
         <td><b>Jabatan Atasan</td>
         <td><b>Organisasi Atasan</td> -->
    </tr>

    <?php
    $no=1;
    // $this->load->model('personalia/m_pekerjaan');
    foreach ($data->result() as $r) {
            $d = $m_pekerjaan->getLastPekerjaan($r->idpelamar);
            ?>
            <tr style="font-size: 12px;">
                 <td><?=$r->nik?></td>
                 <td><?=$r->namalengkap?></td>
                 <td><?=$r->tgllahir?></td>
                 <td><?=$r->nik?></td>
                 <td><?=$d['levelnamejabatan']?></td>
                 <td><?=$d['levelnameindividu']?></td>
                 <td><?=$d['namajabatan']?></td>
                 <td><?=$d['namalokasi']?></td>
                 <td><?=$d['namaorg']?></td>
                 <td><?=$d['kekaryaanname']?></td>
                 <td><?=$r->companyname?></td>
                 <td><?=isset($d['tglmasuk']) ? $d['tglmasuk'] : ''?></td>
                 <td><?=isset($d['tglberakhir']) ?$d['tglberakhir']:''?></td>
               <!--   <td><?=isset($d['namaatasan']) ?$d['namaatasan']:''?></td>
                 <td><?=isset($d['namajabatanatasan']) ?$d['namajabatanatasan']:''?></td>
                 <td><?=isset($d['namaorgatasan']) ?$d['namaorgatasan']:''?></td> -->
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