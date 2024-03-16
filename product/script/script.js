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
            htmlscanner.clear(); // Stop scanning after successful scan
            fetch('/fetch/' + encodeURIComponent(decodeText))
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const ok = window.confirm(`Do you want to update the data for this product already registered?`);
                        if (ok) {
                            document.querySelector(".container").style.display = "none";
                            document.querySelector(".c2").style.display = "flex";
                        } else {
                            window.location.href='/';
                        }
                    }
                    else{
                        document.querySelector(".container").style.display = "none";
                        document.querySelector(".c2").style.display = "flex";
                    }
                });
        } else {
            window.location.reload();
        }
    }

    document.querySelector("#ok").addEventListener("click", (event) => {
        const id = document.getElementById("barcode").value;
        const name = document.getElementById("name").value;
        const min = document.getElementById("min").value;
        const max = document.getElementById("max").value;
        const unit = document.getElementById("unit").value;
        const brand = document.getElementById("brand").value;
        if (name === '') {
            alert("Please enter the product name");
        } else if (min === '') {
            alert("Please enter the minimum value");
        } else if (max === '') {
            alert("Please enter the maximum value");
        } else if (brand === '') {
            alert("Please enter the brand name");
        }
        else if (unit === '') {
            alert("Please select the unit");
        } else {
            try {
                fetch('/save/' + id + "/" + name + "/" + min + "/" + max + "/" + unit+"/"+brand)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            alert("Data updated successfully");
                            window.location.reload();
                        } else {
                            alert("Failed to update data. Please try again.");
                        }
                    });
            } catch (err) {
                alert("Failed to fetch data. Please try again.");
            }
        }
    });

    htmlscanner.render(onScanSuccess);
});
