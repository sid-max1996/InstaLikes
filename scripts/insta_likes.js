document.addEventListener('DOMContentLoaded', function (tab) {
    localStorage.setItem('flagStart', 'false');
    localStorage.setItem('flagAlarm1', 'false');
    var startFlag = 'false';
    var flagAlarm1 = 'false';
    var flag = false;
    var delayInMinutes = 0;
    var periodInMinutes = 0;
    var xhashlike = 0;
    var url = '';
    var id = '';
    var idInt = 0;
    var ErrFlag = true;

    chrome.alarms.create("Alarm0", {
        delayInMinutes: 0.1,
        periodInMinutes: 0.02
    });

    chrome.alarms.create("AlarmErr", {
        delayInMinutes: 0.5,
        periodInMinutes: 0.2
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {

        startFlag = localStorage.getItem('flagStart');

        if (alarm.name == "Alarm0" && startFlag == 'true') {
            localStorage.setItem('flagStart', 'false');
            localStorage.setItem('flagAlarm1', 'true');
            var relaunchTime = localStorage.getItem('relaunchTime');
            xhashlike = localStorage.getItem('xhashlike');
            periodInMinutes = parseFloat(relaunchTime);

            chrome.tabs.getSelected(null, function (tab) {
                url = tab.url;
                id = tab.id;
            });

            chrome.alarms.create("Alarm1", {
                delayInMinutes,
                periodInMinutes
            });
        }

        if (alarm.name == "Alarm1") {
            flagAlarm1 = localStorage.getItem('flagAlarm1');
            if (flagAlarm1 == 'false') {
                alarm.clear("Alarm1");
            } else {
                if (url.toString().search(/www.instagram.com/) != -1) {
                    flag = true;
                    idInt = parseInt(id);
                    //chrome.tabs.reload(idInt);
                    chrome.tabs.update(idInt, {
                        url: url
                    });
                }
            }
        }

        if (alarm.name == "AlarmErr") {
            /*chrome.tabs.executeScript(idInt, {
                code: 'var urlStr = ' + url + ';'
            });*/
            chrome.tabs.executeScript(idInt, {
                file: "scripts/error.js"
            });
        }

    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
        if (tabInfo.url.toString().search(/www.instagram.com/) != -1 && changeInfo.status == "complete" && flag == true) {
            flag = false;
            setTimeout(function () {
                chrome.tabs.executeScript(idInt, {
                    code: 'var likes_count = ' + xhashlike + ';'
                });
                chrome.tabs.executeScript(idInt, {
                    file: "scripts/do_likes_once.js"
                });
            }, 5000);
        }
    });

    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        if (tabId == idInt)
            localStorage.setItem('flagAlarm1', 'false');
    });

});