<?php
header("Content-type: text/plain; charset=windows-1251");

$array = array("","����� �����","�����","������, �� �� ������","������","����� ������");

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
echo "<i>������� ������:</i> ".$array[$x]."<br /><i>���������� ���������: </i>".$col."";
?>