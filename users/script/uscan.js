function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
domReady(function () {
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText) {
            document.getElementById("barcode").value = decodeText;
            alert("Barcode Scanned: " + decodeText);
            htmlscanner.clear();
            var numberPattern = /^[-+]?\d*\.?\d+$/;
            if (!numberPattern.test(decodeText)) {
                alert("Scan only barcode");
                document.location.href = "add.html";
            }
            else {
                document.querySelector(".container").style.display = "none";
                document.querySelector(".c2").style.display = "flex";
            }
        } else {
            window.location.reload();
        }
    }
    document.querySelector("#ok").addEventListener("click", (event) => {
        let id = document.getElementById("barcode").value;
        const min = document.getElementById("min").value;
        if (min === '') {
            alert("Please enter the Quantity");
        } else {
            try {
                id = Number(id);
                fetch(`/usave/${id}/${min}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.success) {
                            alert("Data updated successfully");
                            document.location.href = "add.html";
                        } else {
                            alert("Failed to update data. Please try again.");
                        }
                    })
                    .catch(err => {
                        console.error("Error during fetch:", err);
                        alert("Failed to fetch data. Please try again.");
                    });
            } catch (err) {
                console.error("Error:", err);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    });

    htmlscanner.render(onScanSuccess);
});