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
                <h1>Data Perencanaan Tenaga Kerja</h1>       
            </center>
        <!-- </td> -->
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>No</td>
         <td><b>Perusahaan</td>
         <td><b>Kode Jabatan</td>
         <td><b>Nama Jabatan</td>
         <td><b>Level Jabatan</td>
         <td><b>Nama Organisasi</td>
         <td><b>Lokasi</td>
         <td><b>Nama Jabatan Atasan</td>
         <td><b>Tahun</td>
         <td><b>Bulan</td>
         <td><b>Jumlah</td>
         <td><b>Revisi</td>
         <td><b>Jumlah Revisi</td>
    </tr>

    <?php
    $no=1;
    // $this->load->model('personalia/m_pekerjaan');
    foreach ($data->result() as $r) {
            ?>
            <tr style="font-size: 12px;">
                 <td><?=$no?></td>
                 <td><?=$r->companyname?></td>
                 <td><?=$r->kodejabatan?></td>
                 <td><?=$r->namajabatan?></td>
                 <td><?=$r->kodelevel?></td>
                 <td><?=$r->namaorg?></td>
                 <td><?=$r->namalokasi?></td>
                 <td><?=$r->namajabatanatasan?></td>
                 <td><?=$r->tahun?></td>
                 <td><?=$r->namabulan?></td>
                 <td><?=$r->jumlah?></td>
                 <td><?=$r->revisi?></td>
                 <td><?=$r->jumlahrevisi?></td>
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