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
    <table width='100%' border='0' padding="0">
    <tr>
        <td colspan="13"> 
            <center>
                <h1>REKAP PENGGAJIAN</h1>      
                <h5><?= $companyname ?></h5>  
                <h5><?= $periode ?></h5>
            </center>
        </td>
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
        <td><b>No</td>
         <td><b>Nama Karyawan</td>
         <td><b>Tahun</td>
         <td><b>Bulan</td>
         <td><b>NIK</td>
         <td><b>Kode Perusahaan</td>
         <td><b>Kode Organisasi</td>
         <td><b>Jabatan</td>
         <td><b>Tgl Mulai</td>
         <td><b>Tgl Akhir</td>
         <td><b>Tgl Masuk</td>
         <td><b>Ada NPWP</td>
         <td><b>Jumlah Hari</td>
         <td><b>Potong PPH</td>
         <td><b>Tgl Pertama Gaji</td>
         <td><b>Masa Kerja(bulan)</td>
         <td><b>Masa Pajak Setahun</td>
         <td><b>Total Upah Tetap</td>
         <td><b>Total Upah Tidak Tetap</td>
         <td><b>Total Lembur</td>
         <td><b>Benefit (Perusahaan)</td>
         <td><b>Benefit (Karyawan)</td>
         <td><b>Total Potongan Lain</td>
         <td><b>Total Pendapatan</td>
         <td><b>Penerimaan Bruto</td>
         <td><b>Tunjangan Pajak</td>
         <td><b>Biaya Jabatan</td>
         <td><b>Penerimaan Net</td>
         <td><b>Neto Setahun</td>
         <td><b>PKP Setahun</td>
         <td><b>PPH Jan-Nov</td>
         <td><b>PPH Terminasi</td>
         <td><b>PPH Terbayar</td>
         <td><b>PPH Terhutang Des</td>
         <td><b>Total Bayar Pajak Setahun</td>
         <td><b>PPH Bulan Ini</td>
         <td><b>Take Home Pay</td>
         <td><b>Take Home Pay Sebelumnya</td>
    </tr>

    <?php
    $i=1;
    foreach ($data->result_array() as $value) {
            ?>
            <tr style="font-size: 12px;">
                <td><?=$i?></td>
                <td><?=$value['namalengkap']?></td>
                <td><?=$value['tahun']?></td>          
                <td><?=$value['bulan']?></td> 
                <td><?=$value['nik']?></td> 
                <td><?=$value['companycode']?></td> 
                <td><?=$value['kodeorg']?></td> 
                <td><?=$value['namajabatan']?></td> 
                <td><?=$value['startdate']?></td> 
                <td><?=$value['enddate']?></td> 
                <td><?=$value['tglmasuk']?></td> 
                <td><?=$value['punyanpwp']?></td> 
                <td><?=$value['durasi']?></td> 
                <td><?=$value['hitungpajak']?></td> 
                <td><?=$value['tglgajipertama']?></td> 
                <td><?=$value['masakerja']?></td> 
                <td><?=$value['masapajaksetahun']?></td>
                <td><?=number_format($value['totalut'])?></td> 
                <td><?=number_format($value['totalutt'])?></td> 
                <td><?=number_format($value['totallembur'])?></td>                 
                <td><?=number_format($value['benefitcmp'])?></td>  
                <td><?=number_format($value['benefitemp'])?></td>  
                <td><?=number_format($value['nilaipotongan'])?></td>  
                <td><?=number_format($value['totalpendapatan'])?></td>  
                <td><?=number_format($value['penerimaanbruto'])?></td>  
                <td><?=number_format($value['tunjanganpajak'])?></td>  
                <td><?=number_format($value['biayajabatan'])?></td>  
                <td><?=number_format($value['penerimaannet'])?></td>  
                <td><?=number_format($value['netosetahun'])?></td>  
                <td><?=number_format($value['pkpsetahun'])?></td>  
                <td><?=number_format($value['pajakjantonov'])?></td>  
                <td><?=number_format($value['pajakterminasi'])?></td>  
                <td><?=number_format($value['pajakterbayar'])?></td>  
                <td><?=number_format($value['pajakterutangdes'])?></td>  
                <td><?=number_format($value['pajaktotalbayarsetahun'])?></td>  
                <td><?=number_format($value['pphsebulan'])?></td>  
                <td><?=number_format($value['takehomepay'])?></td>  
                <td><?=number_format($value['prevtakehomepay'])?></td>  

            </tr>
            <?php
            $i++;
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