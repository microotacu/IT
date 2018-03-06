<?php
header("Content-type: text/plain; charset=windows-1251");

$array = array("","Очень плохо","Плохо","Хорошо, но не совсем","Хорошо","Очень хорошо");

$col=6;
$val=17;

if(isset($_GET["start"]))
{
	$x=$val/$col;
}
else
{
	$col++;
	$val=$val+$_GET['val']; 
	$x=$val/$col;
}	
echo "<i>Текущая оценка:</i> ".$array[$x]."<br /><i>Количество оценивших: </i>".$col."";
?>