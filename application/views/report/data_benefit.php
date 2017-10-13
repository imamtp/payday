<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
// if($option!='print')
// {
    $borderstyle = "border-bottom: #E6E8E6; background-color: #B3E5FC;  border-bottom-width: thin; border-bottom-style: dotted; ";
// } else {
//     $borderstyle = null;
// }
?>
<style>
    td {        
       font-size: 12px;
    }


</style>
<body>
<!-- <center> -->
<!-- <center> -->
<br><br> 
    <h1>Data Benefit</h1>        
    
<table class='tablereport' style=" margin: 5px; line-height: 13px;" width='40%' border='0' padding="0">

<tr>
     <td>Nama Lengkap</td>
     <td><?=$dt['namalengkap']?></td>
</tr>
<tr>
     <td>NIK</td>
     <td><?=$dt['nik']?></td>
</tr>
<tr>
     <td>No Rekening</td>
     <td><?=$dt['nomorrekening']?></td>
</tr>
<tr>
     <td>Nama Rekening</td>
     <td><?=$dt['namaakunrekening']?></td>
</tr>
<tr>
     <td>Nama Bank</td>
     <td><?=$dt['namabank']?></td>
</tr>
<tr>
     <td>Cabang Bank</td>
     <td><?=$dt['cabangbank']?></td>
</tr>
<tr>
     <td>No polis Asuransi</td>
     <td><?=$dt['nopolisasuransi']?></td>
</tr>
<tr>
     <td>No BPJS Kesehatan</td>
     <td><?=$dt['nobpjskesehatan']?></td>
</tr>
<tr>
     <td>No BPJS Tenagakerja</td>
     <td><?=$dt['nobpjstenagakerja']?></td>
</tr>
<tr>
     <td>No BPJS Kesehatan</td>
     <td><?=$dt['nobpjskesehatan']?></td>
</tr>
</table>

<p>&nbsp;</p>
    
<table class='tablereport' style=" margin: 5px; line-height: 13px;" width='40%' border='0' padding="0">
 <tr>
         <td style="background-color:#172385; color:#FFF;"><b>Kode Benefit</b></td>
         <td style="background-color:#172385; color:#FFF;"><b>Nama Benefit</b></td>
    </tr>
    <?php
    foreach ($dt_list as $value) {
        ?>
       
        <?php
            ?>
            <tr>
                 <td><?=$value['kodebenefit']?></td>
                 <td><?=$value['namabenefit']?></td>
            </tr>
       
        <?php
           // echo "<tr><td colspan=5><hr style=border: none; height: 0;  border-top: 0px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3);> </td></tr>";
    }
    ?>
</table>


    
</body>
