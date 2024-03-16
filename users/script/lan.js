function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
document.addEventListener('DOMContentLoaded', function () {
    const myCookieValue = getCookie("lan");
    console.log("Existing cookie value:", myCookieValue);
    if (myCookieValue) {
        document.querySelector("#lan").value = myCookieValue;
        changelan1();
        var iframe = document.getElementById('hi1');
        iframe.contentWindow.location.reload();
        var iframe = document.getElementById('hi2');
        iframe.contentWindow.location.reload();
    } else {
        console.log("Setting new cookie...");
        setCookie("lan", "en", 7);
        console.log("Cookie set successfully.");
    }
});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function changelan() {
    var x = document.querySelectorAll(".lan1");
    var y = document.querySelector("#lan").value;
    var myCookieValue = getCookie("lan");
    for (let i = 0; i < x.length; i++) {
        const sourceText = x[i].innerHTML;
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${myCookieValue}&tl=${y}&dt=t&q=${encodeURIComponent(sourceText)}`;
        console.log(apiUrl);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data[0] && data[0][0]) {
                    x[i].innerHTML = data[0][0][0];
                } else {
                    console.error('Invalid translation response:', data);
                }
            })
            .catch(error => {
                console.error('Error during translation:', error);
            });
    }
    setCookie("lan", y, 7);
    var iframe = document.getElementById('hi1');
    iframe.contentWindow.location.reload();
    var iframe = document.getElementById('hi2');
    iframe.contentWindow.location.reload();
}
function changelan1() {
    var x = document.querySelectorAll(".lan1");
    var y = document.querySelector("#lan").value;
    for (let i = 0; i < x.length; i++) {
        const sourceText = x[i].innerHTML;
        const apiUrl = `https://translate.googleapis.com/translate_a/?client=gtx&sl=en&tl=${y}&dt=t&q=${encodeURIComponent(sourceText)}`;
        console.log(apiUrl);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data[0] && data[0][0]) {
                    x[i].innerHTML = data[0][0][0];
                } else {
                    console.error('Invalid translation response:', data);
                }
            })
            .catch(error => {
                console.error('Error during translation:', error);
            });
    }
}