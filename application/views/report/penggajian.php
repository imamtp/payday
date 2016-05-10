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
         <td><b>Nama Lengkap</td>
         <td><b>Potong PPH</td>
         <?php
         foreach ($komponenut->result() as $r) {
            echo "<td><b>".ucwords(strtolower($r->namakomponen))."</td>";
         }
         ?>
         <td><b>Total Upah Tetap</td>
         <?php
         foreach ($komponenutt->result() as $r) {
            echo "<td><b>".ucwords(strtolower($r->namakomponen))."</td>";
         }
         ?>
         <td><b>Total Upah Non Tetap</td>
         <td><b>Total Lembur</td>
         <?php
         foreach ($benefit->result() as $r) {
            echo "<td><b>".ucwords(strtolower($r->namabenefit))."</td>";
         }
         ?>
         <td><b>Total Pendapatan Benefit</td>
         <?php
         foreach ($benefite->result() as $r) {
            echo "<td><b>".ucwords(strtolower($r->namabenefit))."</td>";
         }
         ?>
         <td><b>Total Potongan Benefit</td>
         <?php
         foreach ($potongan->result() as $r) {
            echo "<td><b>Potongan ".ucwords(strtolower($r->namapengurangupah))."</td>";
         }
         ?>
         <td><b>Total Potongan Lain</td>
         <td><b>Total Pendapatan</td>
         <td><b>Penerimaan Bruto</td>
         <td><b>Tunjangan Pajak</td>
         <td><b>Biaya Jabatan</td>
         <td><b>Penerimaan Net</td>
         <td><b>Neto Setahun</td>
         <td><b>PKP Setahun</td>
         <td><b>PPH Setahun</td>
         <td><b>PPH Sebulan</td>
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
                <td><?=$value['hitungpajak']?></td>
                <?php
                 foreach ($komponenut->result() as $rut) {
                    if($value['upload']=='t')
                    {
                        //data history upah dari hasil upload
                        $qut = $this->db->query("select a.idupahkaryawan,a.nilai,c.namakomponen
                                            from upahhistory a
                                            join komponenupah c ON a.idupahkaryawan = ".$rut->idkomponenupah."
                                            where a.idupahkaryawan = ".$rut->idkomponenupah." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']." and jenisupah='tetap'");
                    } else {
                          $qut = $this->db->query("select a.idupahkaryawan,a.nilai,c.namakomponen
                                            from upahhistory a
                                            join upahkaryawan b ON a.idupahkaryawan = b.idupahkaryawan
                                            join komponenupah c ON b.idkomponenupah = c.idkomponenupah
                                            where c.idkomponenupah = ".$rut->idkomponenupah." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']." and jenisupah='tetap'");
                    }
                  
                    // echo $this->db->last_query().'<br>';
                    if($qut->num_rows()>0)
                    {
                        $rut = $qut->row();
                        $numut = $rut->nilai;
                    } else {
                        $numut = 0;
                    }
                    echo "<td align=right><b>".number_format($numut)."</td>";
                 }
                 ?>
                <td align="right"><?=number_format($value['totalut'])?></td>
                <?php
                 foreach ($komponenutt->result() as $rutt) {
                    if($value['upload']=='t')
                    {
                        $qutt = $this->db->query("select a.idupahkaryawan,a.nilai,c.namakomponen
                                            from upahhistory a
                                            join komponenupah c ON a.idupahkaryawan = ".$rutt->idkomponenupah."
                                            where a.idupahkaryawan = ".$rutt->idkomponenupah." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']." and jenisupah='tidaktetap'");
                        // echo $this->db->last_query().'<br>';
                    } else {
                        $qutt = $this->db->query("select a.idupahkaryawan,a.nilai,c.namakomponen
                                            from upahhistory a
                                            join upahkaryawan b ON a.idupahkaryawan = b.idupahkaryawan
                                            join komponenupah c ON b.idkomponenupah = c.idkomponenupah
                                            where c.idkomponenupah = ".$rutt->idkomponenupah." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']." and jenisupah='tidaktetap'");
                    }

                    if($qutt->num_rows()>0)
                    {
                        $rutt = $qutt->row();
                        $numutt = $rutt->nilai;
                    } else {
                        $numutt = 0;
                    }
                    echo "<td align=right><b>".number_format($numutt)."</td>";
                 }
                 ?>
                <td align="right"><?=number_format($value['totalutt'])?></td>
                <td align="right"><?=number_format($value['totallembur'])?></td>
                <?php
                 foreach ($benefit->result() as $rb) {
                    $qbenefit = $this->db->query("select a.idbenefit,a.idpelamar,a.nilaibenefit,b.namabenefit
                                                from benefithistory a
                                                join komponenbenefit b ON a.idbenefit = b.idbenefit
                                            where b.idbenefit = ".$rb->idbenefit." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']." and ditanggung='perusahaan'");
                    if($qbenefit->num_rows()>0)
                    {
                        $rbenefit = $qbenefit->row();
                        $numbenefit = $rbenefit->nilaibenefit;
                    } else {
                        $numbenefit = 0;
                    }
                    echo "<td align=right><b>".number_format($numbenefit)."</td>";
                 }
                 ?>
                <td align="right"><?=number_format($value['benefitcmp'])?></td>
                 <?php
                 foreach ($benefite->result() as $rbemp) {
                    $qbenefitemp = $this->db->query("select a.idbenefit,a.idpelamar,a.nilaibenefit,b.namabenefit
                                                from benefithistory a
                                                join komponenbenefit b ON a.idbenefit = b.idbenefit
                                            where b.idbenefit = ".$rbemp->idbenefit." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']." and ditanggung='karyawan'");
                    // echo $this->db->last_query().'<br>';
                    if($qbenefitemp->num_rows()>0)
                    {
                        $rbenefitemp = $qbenefitemp->row();
                        $numbenefit = $rbenefitemp->nilaibenefit;
                    } else {
                        $numbenefit = 0;
                    }
                    echo "<td align=right><b>".number_format($numbenefit)."</td>";
                 }
                 ?>
                <td align="right"><?=number_format($value['benefitemp'])?></td>
                 <?php
                 foreach ($potongan->result() as $rpot) {
                    $qpotongan = $this->db->query("select a.idpengurangupah,a.nilai,b.namapengurangupah
                                            from pengurangupahhistory a
                                            join pengurangupah b ON a.idpengurangupah = b.idpengurangupah
                                            where b.idpengurangupah = ".$rpot->idpengurangupah." and a.idpelamar = ".$value['idpelamar']." and a.idpayroll= ".$value['idpayroll']."");
                    if($qpotongan->num_rows()>0)
                    {
                        $rpotongan = $qpotongan->row();
                        $numpotongan = $rpotongan->nilai;
                    } else {
                        $numpotongan = 0;
                    }
                    echo "<td align=right><b>".number_format($numpotongan)."</td>";
                 }
                 ?>
                <td align="right"><?=number_format($value['nilaipotongan'])?></td>
                <td align="right"><?=number_format($value['totalpendapatan'])?></td>
                <td align="right"><?=number_format($value['penerimaanbruto'])?></td>
                <td align="right"><?=number_format($value['tunjanganpajak'])?></td>
                <td align="right"><?=number_format($value['biayajabatan'])?></td>
                <td align="right"><?=number_format($value['penerimaannet'])?></td>
                <td align="right"><?=number_format($value['netosetahun'])?></td>
                <td align="right"><?=number_format($value['pkpsetahun'])?></td>
                <td align="right"><?=number_format($value['pphsettahun'])?></td>
                <td align="right"><?=number_format($value['pphsebulan'])?></td>
                <td align="right"><?=number_format($value['takehomepay'])?></td>
                <td align="right"><?=number_format($value['prevtakehomepay'])?></td>
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