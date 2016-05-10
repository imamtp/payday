<?php

function pembulatan($uang) {
    $uang = round($uang);
    $ratusan = substr($uang, -3);
    if ($ratusan < 500)
        $akhir = $uang - $ratusan;
    else
        $akhir = $uang + (1000 - $ratusan);
    return $akhir;
}

function clearnumberic($num) {
//    62,000.00 -> 62000.00
    return str_replace(",", "", str_replace(".00", "", $num));
}

function cleardot($num)
{
	return str_replace(".", "", str_replace(".00", "", $num));
}

function cleardot2($num)
{
	return str_replace(".", "", $num);
}

function cleartanggal($tgl)
{
    return str_replace("T00:00:00", "", $tgl);
}

function fetchUnit($unit,$alias=null)
{
	//buat di rekap
	$u = explode(",", $unit);
	// echo count($u);
	$wer='(';
		$i=1;
	foreach ($u as $key => $value) {
		$wer.=$alias.".idunit=".$value;
		if($i<count($u))
		{
			$wer.=" OR ";
		}
		$i++;
		
	}
	$wer.=')';
	return $wer;
}

function bilangRatusan($x)
{
	$kata = array(
		'',
		'Satu ',
		'Dua ',
		'Tiga ',
		'Empat ',
		'Lima ',
		'Enam ',
		'Tujuh ',
		'Delapan ',
		'Sembilan '
	);
	$string = '';
	$ratusan = floor($x / 100);
	$x = $x % 100;
	if ($ratusan > 1) $string.= $kata[$ratusan] . "Ratus ";
	  else
	if ($ratusan == 1) $string.= "Seratus ";
	$puluhan = floor($x / 10);
	$x = $x % 10;
	if ($puluhan > 1)
		{
		$string.= $kata[$puluhan] . "Puluh ";
		$string.= $kata[$x];
		}
	  else
	if (($puluhan == 1) && ($x > 0)) $string.= $kata[$x] . "Belas ";
	  else
	if (($puluhan == 1) && ($x == 0)) $string.= $kata[$x] . "Sepuluh ";
	  else
	if ($puluhan == 0) $string.= $kata[$x];
	return $string;
}

function terbilang($x)
{
	$x = number_format($x, 0, "", ".");
	$pecah = explode(".", $x);
	$string = "";
	for ($i = 0; $i <= count($pecah) - 1; $i++)
		{
		if ((count($pecah) - $i == 5) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Triliyun ";
		  else
		if ((count($pecah) - $i == 4) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Milyar ";
		  else
		if ((count($pecah) - $i == 3) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Juta ";
		  else
		if ((count($pecah) - $i == 2) && ($pecah[$i] == 1)) $string.= "Seribu ";
		  else
		if ((count($pecah) - $i == 2) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Ribu ";
		  else
		if ((count($pecah) - $i == 1) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]);
		}

	return $string;
}

function round_up($number, $precision = 2)
{
//    $fig = pow(10, $precision);
//    return (ceil($number * $fig) / $fig);
    return round((intval($number)/10))*10;
}

?>