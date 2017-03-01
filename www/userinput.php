<?php

$hostname = "localhost:3306";
$username = "shsmath";
$password = "somerville";
$dbname = "VoteCount";
$usertable = "Votes";


mysql_connect($hostname, $username, $password, $dbname) or die("<html> <script language = 'Javascript'> alert('Unable to connect to database! Please try again later'),history.go(-1)</script></html>");

mysql_select_db($dbname);
$query="SELECT * FROM $usertable";
$result = mysql_query($query);

//while($row = mysql_fetch_array($result)) {
echo mysql_query($query); 
echo "<table>";
echo "<tr>";
echo "<th>6</th>";
echo "<th>5</th>";
echo "<th>6</th>";
echo "<th>2</th>";
echo "</tr>";
//}
while($row = mysql_fetch_array($result)) {
    echo "ANOTHER PLACE";
    echo "<tr>";
    echo "<td>" . $row['1'] . "</td>";
    echo "<td>" . $row['2'] . "</td>";
    echo "<td>" . $row['3'] . "</td>";
    echo "<td>" . $row['1'] . "</td>";
    echo "</tr>";
}
echo "</table>";
?>