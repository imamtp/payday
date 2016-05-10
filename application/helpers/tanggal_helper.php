<?php

function fetchDate($i) {
//     echo $i.'<br>';
    $date = str_replace(" ", "", $i);
    // echo $date.'<br>';
    $arrMonth = array('January' => '01', 'February' => '02', 'March' => '03', 'April' => '04', 'May' => '05', 'June' => '06', 'July' => '07', 'August' => '08', 'September' => '09', 'October' => '10', 'November' => '11', 'December' => '12');
    // // explode(delimiter, string)
    $i = explode(",", $date);
    // echo "date ".$i[0]." ".$i[1]." : ";
    // echo $arrMonth[$i[0]]."<hr>";
    // echo "asdasd ".print_r($i)."<hr>";
    if(isset($arrMonth[$i[0]]))
    {
        return array('bulan' => $arrMonth[$i[0]], 'tahun' => $i[1]);
    } else {
        return false;
    }
}

function getNoMonth($d)
{
   $arrMonth = array('January' => '01', 'February' => '02', 'March' => '03', 'April' => '04', 'May' => '05', 'June' => '06', 'July' => '07', 'August' => '08', 'September' => '09', 'October' => '10', 'November' => '11', 'December' => '12');
    // // explode(delimiter, string)
   return $arrMonth[$d];
}

function getMonth($d)
{
   $arrMonth = array('1'=>'January', '2'=>'February', '3'=>'March', '4'=>'April', '5'=>'May', '6'=>'June' , '7' => 'July','8' => 'August' ,'9' => 'September', '10'=>'October' ,'11'=> 'November','12' => 'December');
    // // explode(delimiter, string)
   return $arrMonth[$d];
}

function ambilBulan($i) {
    $arrMonth = array('01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' => 'Desember');
    return $arrMonth[$i];
}

function ambilNoBulan($i) {
    $arrMonth = array('Januari' => '01', 'Februari' => '02', 'Maret' => '03', 'April' => '04', 'Mei' => '05', 'Juni' => '06', 'Juli' => '07', 'Agustus' => '08', 'September' => '09', 'Oktober' => '10', 'November' => '11', 'Desember' => '12');
    // echo $arrMonth[$i];
    return $arrMonth[$i];
}

function inputDate($v) {
    return $v == null ? null : str_replace("T00:00:00", "", $v);
}

function backdate($d)
{
    $tgl = explode("/", $d);
//    echo  $tgl[2].'/'.$tgl[1].'/'.$tgl[0];
    return $tgl[2].'/'.$tgl[1].'/'.$tgl[0];
}

function backdate2($d)
{
    $tgl = explode("-", $d);
    return $tgl[2].'-'.$tgl[1].'-'.$tgl[0];
}

function backdate2_reverse($d)
{
    //30-05-2015
    $tgl = explode("-", $d);
    return $tgl[2].'-'.$tgl[1].'-'.$tgl[0];
}

function lastday($month,$year)
{
    return cal_days_in_month(CAL_GREGORIAN, $month, $year);
}

function getTimeDiff($dtime,$atime){
   
   $nextDay=$dtime>$atime?1:0;
   $dep=EXPLODE(':',$dtime);
   $arr=EXPLODE(':',$atime);
   $diff=ABS(MKTIME($dep[0],$dep[1],0,DATE('n'),DATE('j'),DATE('y'))-MKTIME($arr[0],$arr[1],0,DATE('n'),DATE('j')+$nextDay,DATE('y')));
   $hours=FLOOR($diff/(60*60));
   $mins=FLOOR(($diff-($hours*60*60))/(60));
   $secs=FLOOR(($diff-(($hours*60*60)+($mins*60))));
   IF(STRLEN($hours)<2){$hours="0".$hours;}
   IF(STRLEN($mins)<2){$mins="0".$mins;}
   IF(STRLEN($secs)<2){$secs="0".$secs;}
   return $hours.':'.$mins.':'.$secs;
}

function sumTimes($times) {

        // loop throught all the times
    $minutes=null;
    foreach ($times as $time) {
        list($hour, $minute) = explode(':', $time);
        $minutes += $hour * 60;
        $minutes += $minute;
    }

    $hours = floor($minutes / 60);
    $minutes -= $hours * 60;

        // returns the time already formatted
    return sprintf('%02d:%02d', $hours, $minutes);
}

function jumlahjam($jam)
{
        // $jam = '09:31:00';
    $jarr = explode(':', $jam);
    $hh = intval($jarr[0]);
    if(intval($jarr[1])>30)
    {
            //lebih dari 30 menit diitung 1 jam
        return $hh+1;
    } else {
        return $hh;
    }
}

function diffInMonths($date1,$date2)
{
        // echo $date1.','.$date2.'<br>';
    $date2arr = explode('-', $date2);
        // $date1 = new DateTime($date1);
        // $date2 = new DateTime($date2);

        // $diff =  $date1->diff($date2);

        // $months = $diff->y * 12 + $diff->m + $diff->d / 30;

        // return (int) round($months);
    $begin = new DateTime( $date1 );
    $end = new DateTime( $date2 );
    if($date2arr[1]<12)
    {
        $end = $end->modify( '+1 month' );
    }
    

    $interval = DateInterval::createFromDateString('1 month');

    $period = new DatePeriod($begin, $interval, $end);
        // echo var_dump($period);
    $counter = 0;
    foreach($period as $dt) {
        $counter++;
    }

    return $counter;
}

function converttgl($d)
{
    $d = explode(".", $d);
    return $d[2].'-'.$d[1].'-'.$d[0];
}

function add_months($months, DateTime $dateObject) 
{
    $next = new DateTime($dateObject->format('Y-m-d'));
    $next->modify('last day of +'.$months.' month');

    if($dateObject->format('d') > $next->format('d')) {
        return $dateObject->diff($next);
    } else {
        return new DateInterval('P'.$months.'M');
    }
}

function endCycle($d1, $months)
{
    $date = new DateTime($d1);

        // call second function to add the months
    $newDate = $date->add(add_months($months, $date));

        // goes back 1 day from date, remove if you want same day of month
    $newDate->sub(new DateInterval('P1D')); 

        //formats final date to Y-m-d form
    $dateReturned = $newDate->format('Y-m-d'); 

    return $dateReturned;
}

function validasitgl($no,$jenis,$date)
    {
        $tgl = explode(".", $date);

        $bulan = isset($tgl[1]) ? intval($tgl[1]) : null;

        $message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format tangal dd.mm.yyy (tanggal.bulan.tahun). Contoh 01.05.201';
        if(count($tgl)<3)
        {
            $status = false;            
        } else if($bulan>12) {
            $status = false;
        } 
        else {
            $status = true;
            $message = null;
        }
        return array('message'=>$message,'status'=>$status);
    }
?>