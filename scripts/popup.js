function changeIcon(path) {
    chrome.browserAction.setIcon({
        path: {
            38: path
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var checkbox1 = document.getElementsByName('checkbox1')[0];
    var div0 = document.getElementsByName('div0')[0];
    var div1 = document.getElementsByName('div1')[0];
    //var inp0 = document.getElementsByName("maxIter")[0];
    var inp1 = document.getElementsByName("relaunch")[0];
    var likes = document.getElementsByName("hashlike")[0];

    //inp0.value = localStorage.getItem('val0');
    inp1.value = localStorage.getItem('val1');
    likes.value = localStorage.getItem('val2');

    /*inp0.addEventListener("blur", function (event) {
        localStorage.setItem('val0', inp0.value);
    });*/

    inp1.addEventListener("blur", function (event) {
        localStorage.setItem('val1', inp1.value);
    });

    likes.addEventListener("blur", function (event) {
        localStorage.setItem('val2', likes.value);
    });

    if (localStorage.getItem('stat') == "true") {
        checkbox1.setAttribute('checked', 'checked');
        //div0.style = "visibility: visible;";
        div1.style = "visibility: visible;";

    } else {
        //inp0.value = localStorage.getItem('');
        inp1.value = localStorage.getItem('');
    }

    checkbox1.addEventListener('click', function () {
        if (checkbox1.checked) {
            //div0.style = "visibility: visible;";
            div1.style = "visibility: visible;";
            //changeIcon("images/workheart.jpg");
            localStorage.setItem('stat', "true");

        } else {
            //div0.style = "visibility: hidden;";
            div1.style = "visibility: hidden;";
            //changeIcon("images/icon-38.png");
            localStorage.setItem('stat', "false");
        }
    }, false);

}, false);

//var xhashlike;

document.addEventListener('DOMContentLoaded', function () {
    var flagAlarm1 = localStorage.getItem('flagAlarm1');
    var hashBUTTON = document.getElementById('hashPage');

    if (flagAlarm1 == 'true'){
        hashBUTTON.innerHTML = "STOP";
        hashBUTTON.style.color = 'red';     
    }
    else{
        hashBUTTON.innerHTML = "Do it !";
        hashBUTTON.style.color = 'green';
    }

    var checkbox1 = document.getElementsByName('checkbox1')[0];
    var flag = true;

    hashBUTTON.addEventListener('click', function () {

        var xhashlike = document.getElementsByName("hashlike")[0].value;
        /*if (flagAlarm1 == 'true')
            changeIcon("images/icon-38.png");*/

        if (flagAlarm1 == 'false') {
            if (checkbox1.checked) {
                //changeIcon("images/workheart.jpg");
                
                /*var curTabId = chrome.tabs.getSelected.tabIndex;
                alert('' + curTabId);
                localStorage.setItem('curTabId', curTabId);*/
                var relaunchTime = document.getElementsByName("relaunch")[0].value;
                localStorage.setItem('xhashlike', xhashlike);
                localStorage.setItem('relaunchTime', relaunchTime);
                localStorage.setItem('flagStart', 'true');
            } else {
                chrome.tabs.executeScript(null, {
                    code: 'var likes_count = ' + xhashlike + ';'
                });
                chrome.tabs.executeScript(null, {
                    file: "scripts/do_likes_simple.js"
                });

            }
        }

        localStorage.setItem('flagAlarm1', 'false');    
        window.close();  
        
    }, false);
}, false);