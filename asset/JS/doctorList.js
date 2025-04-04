window.onload = function() {
    // Function to load doctor data from the server using xhttp
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../controller/doctorController.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            var tableBody = document.getElementById('doctorTableBody');
            tableBody.innerHTML = ""; // Clear existing rows

            if (data.length === 0) {
                var row = `<tr>
                            <td colspan="9">No doctors available.</td>
                        </tr>`;
                tableBody.innerHTML = row;
            } else {
                // Loop through data and populate the table
                var rowsHTML = '';
                for (var i = 0; i < data.length; i++) {
                    var doctor = data[i];
                    rowsHTML += `
                        <tr>
                            <td>${doctor.id}</td>
                            <td>${doctor.phone}</td>
                            <td>${doctor.email}</td>
                            <td>${doctor.name}</td>
                            <td>${doctor.available_time}</td>
                            <td>${doctor.speciality}</td>
                            <td>${doctor.hospital}</td>
                            <td><button onclick="showPassword(${doctor.id}, '${doctor.password}')">Show Password</button></td>
                            <td><button onclick="deleteDoctor(${doctor.id})">Delete</button></td>
                        </tr>
                    `;
                }
                tableBody.innerHTML = rowsHTML; // Set the rows in the table body
            }
        }
    };

    xhttp.send();
};

// Function to show the password
function showPassword(id, password) {
    alert('Password for doctor ' + id + ': ' + password);
}

// Function to delete a doctor
function deleteDoctor(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        var formData = new FormData();
        formData.append('action', 'delete');
        formData.append('id', id);

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../controller/doctorController.php", true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                if (response.status === 'success') {
                    alert('Doctor deleted successfully');
                    window.location.reload(); // Reload the page to update the table
                } else {
                    alert('Error deleting doctor');
                }
            }
        };
        xhttp.send(formData);
    }
}
