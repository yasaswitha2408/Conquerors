fetch("/pall")
    .then(res => res.json())
    .then(data => {
        var r = document.getElementById("products");
        if (data.success) {
            var t = data.user;
            for (var i = 0; i < t.length; i++) {
                var option = document.createElement("option");
                option.value = t[i];
                option.className = "hi"
                r.appendChild(option);
            }
        }
    });
document.querySelector("#im").addEventListener("click", function (e) {
    var r = document.getElementById("product").value;
    var y = document.querySelectorAll(".hi");
    var c = 0;
    for (var i = 0; i < y.length; i++) {
        if (jaccardSimilarity(r, y[i].value) > 0.9) {
            const ok = window.confirm(`Do you wish to add product to database`);
            if (ok) {
                document.querySelector(".c2").style.display = "flex";
                document.querySelector("#barcode").value = r;
                document.querySelector(".head").style.display = "none";
            } else {
                alert("Product not added to database");
            }
            c = 1;
        }
    }
    if (c == 0) {
        var r = document.getElementById("product").value;
        fetch("https://amarnathboddu.pythonanywhere.com/" + r)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    try {
                        n = Number(data.response);
                        alert("The usage of water is:" + n + " ltr/kg")
                        const ok = window.confirm(`Do you wish to add product to database`);
                        if (ok) {
                            document.querySelector(".c2").style.display = "flex";
                            document.querySelector("#barcode").value = r;
                            document.querySelector("#barcode").name = n;
                            document.querySelector(".head").style.display = "none";
                        } else {
                            alert("Product not added to database");
                        }
                    }
                    catch (err) {
                        alert("Product not found in database");
                    }
                }
                else {
                    alert("Product not found in database");
                }
            });
    }
});
function jaccardSimilarity(a, b) {
    const setA = new Set(a.split(''));
    const setB = new Set(b.split(''));

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    return intersection.size / union.size;
}
document.querySelector("#ok").addEventListener("click", (event) => {
    let id = document.getElementById("barcode").value;
    const min = document.getElementById("min").value;
    if (document.getElementById("barcode").name === "barcode") {
        if (min === '') {
            alert("Please enter the minimum value");
        } else {
            try {
                fetch(`/usave1/${id}/${min}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.success) {
                            alert("Data updated successfully");
                            document.location.href = "search.html";
                        } else {
                            alert("Data updated successfully");
                            document.location.href = "search.html";
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
    }
    else {
        fetch("/save2/" + id + "/" + document.getElementById("barcode").name + "/" + min)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("data updated successfully");
                    document.location.href = "search.html";
                }
                else {
                    alert("Please try again");
                }
            });
    }
});

