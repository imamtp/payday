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
                <h1>Data Jabatan</h1>       
            </center>
        <!-- </td> -->
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>No</td>
         <td><b>Kode Jabatan</td>
         <td><b>Nama Jabatan</td>
         <td><b>Nama Perusahaan</td>
         <td><b>Kode Perusahaan</td>
         <td><b>Level</td>
         <td><b>Deskripsi</td>
         <td><b>Status</td>
         <td><b>Tgl Aktif</td>
         <td><b>Tgl Terminasi</td>
    </tr>

    <?php
    $no=1;
    // $this->load->model('personalia/m_pekerjaan');
    foreach ($data->result() as $r) {
            ?>
            <tr style="font-size: 12px;">
                 <td><?=$no?></td>
                 <td><?=$r->kodejabatan?></td>
                 <td><?=$r->namajabatan?></td>
                 <td><?=$r->companyname ?></td>
                 <td><?=$r->companycode ?></td>
                 <td><?=$r->levelname ?></td>
                 <td><?=$r->deskripsi ?></td>
                 <td><?=$r->status ?></td>
                 <td><?=$r->startdate ?></td>
                 <td><?=$r->enddate ?></td>
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