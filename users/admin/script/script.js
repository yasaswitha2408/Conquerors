document.querySelector('#but').addEventListener('click', (eve) => {
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    if (email === '') {
        alert('Enter you email');
    }
    else if (name === '') {
        alert("Enter the name");
    }
    else {
        var url = '/register/' + email + '/' + name;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('email sent successfully')
                }
                else {
                    alert('Failed to register the user');
                }
            });
    }
});