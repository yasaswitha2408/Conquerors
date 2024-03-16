function changelan1() {
    var x = document.querySelectorAll(".lan1");
    var y = parent.document.querySelector("#lan").value;
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        const sourceText = x[i].innerHTML;
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${y}&dt=t&q=${encodeURIComponent(sourceText)}`;
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
changelan1();