//var goto = urlStr;
//document.alert(urlStr);
var d = document.getElementsByTagName('div');
for (var x = 0, len = d.length; x < len; x++) {
    if (d[x].className.indexOf("error-container -cx-PRIVATE-ErrorPage__errorContainer") > -1) {
        document.location.replace("http://www.instagram.com");
        //document.location.replace(urlStr);
        //document.location.href = goto;
        break;
    }
}