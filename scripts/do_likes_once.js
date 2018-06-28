function openBOX() {
	console.log('open');
    var heart = document.getElementsByClassName("coreSpriteHeartOpen");
    if (heart.length == 0) {
        var d = document.getElementsByTagName('div');
        var n = 0;
        for (var i = 0, len = d.length; i < len; i++) {
            if (d[i].className.indexOf("eLAPa") > -1) {
				console.log(n + ' image next');
                n++;
            }
            if (n == 10) {
                d[i].click();
                break;
            }
        }

    }
}


function doLikeAndNext() {

    var a = document.getElementsByTagName('span');

    for (var x = 0, len = a.length; x < len; x++) {
        if (a[x].className.indexOf("coreSpriteHeartOpen") > -1) {
            a[x].click();
            NumberLike++;
            break;
        }
    }

    var a = document.getElementsByTagName('a');

    for (var x = 0, len = a.length; x < len; x++) {

        if (a[x].className.indexOf("coreSpriteRightPaginationArrow") > -1) {
            a[x].click();

            if (NumberLike % 8 == 0) {
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            }

            break;
        }
    }

    if (NumberLike >= maxlike) {
        clearInterval(i);
    }

}

/*function alertLikes() {
    alert(NumberLike + ' likes done!!!');
}*/

var NumberLike = 0;
var maxlike = likes_count;

//doLikeAndNext();
function CloseImage() {
    var closes = document.getElementsByTagName('button');
    for (var x = 0, len = closes.length; x < len; x++) {
        if (closes[x].className.indexOf("ckWGn") > -1) {
            closes[x].click();
            break;
        }
    }
}

var i;
var rand = 300;
var xmax = 3 * 1000;
var xmin = 1 * 1000;

var myFunction = function () {
    doLikeAndNext();
    rand = Math.round(Math.random() * (xmax - xmin)) + xmin;
    clearInterval(i);

    if (NumberLike < maxlike) {
        i = setInterval('myFunction();', rand);
    } else {
        clearInterval(i);
        setInterval('CloseImage();', 2500);
        /*i = setInterval('alertLikes();', 1000);
        clearInterval(i);*/
        NumberLike = 0;
        setInterval(function () {
            location.reload();
        }, 5000);
    }
}

setTimeout(function () {
    openBOX();
}, 300);

if (NumberLike < maxlike) {
    i = setInterval('myFunction();', rand);
}