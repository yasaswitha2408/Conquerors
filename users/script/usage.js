document.querySelector("#ok1").addEventListener("click", function (e) {
    var a = document.querySelector("#waterWorks").value;
    var b = document.querySelector("#wateruse").value;
    var c = document.querySelector("#otherWork").value;
    var d = document.querySelector("#waterunit").value;
    if (a === "") {
        alert("Please select the water usage option");
    }
    else if (b === "") {
        alert("Please enter the water usage");
    }
    else if (a === "other" && c === "") {
        alert("Please select the other water name");
    }
    else {
        if (a === "other") {
            fetch("/usage/" + c + "/" + b + "/" + d)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Successfully updated");
                        document.location.href = "usage.html";
                    }
                    else {
                        alert("Failed to update");
                    }
                });
        }
        else {
            fetch("/usage/" + a + "/" + b + "/" + d)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Successfully updated");
                        document.location.href = "usage.html";
                    }
                    else {
                        alert("Failed to update");
                    }
                });
        }
    }
});
document.querySelector("#ok").addEventListener("click", function (e) {
    document.querySelector(".tot").style.display = "flex";
});
function showInput() {
    var selectedOption = document.getElementById("waterWorks").value;
    var otherInput = document.querySelector(".vis");

    if (selectedOption === "other") {
        otherInput.style.display = "flex";
    } else {
        otherInput.style.display = "none";
    }
}