// Function to fetch and display patient data
async function fetchAndDisplayPatients() {
    const tableBody = document.querySelector('#patientTable tbody');

    try {
        // Fetch patient data
        const response = await fetch('../controller/patientController.php');
        if (response.ok) {
            const patients = await response.json();
            let rows = '';

            for (let patient of patients) {
                rows += `
                    <tr>
                        <td>${patient.first_name}</td>
                        <td>${patient.last_name}</td>
                        <td>${patient.phone}</td>
                        <td>${patient.email}</td>
                        <td>${patient.nid}</td>
                        <td>${patient.dob}</td>
                        <td>${patient.gender}</td>
                        <td>${patient.address}</td>
                        <td>${patient.medical_history}</td>
                        <td>${patient.emergency_contact}</td>
                    </tr>
                `;
            }

            tableBody.innerHTML = rows;
        } else {
            console.error('Network response was not ok');
            tableBody.innerHTML = '<tr><td colspan="10">Failed to load data. Please try again later.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
        tableBody.innerHTML = '<tr><td colspan="10">Failed to load data. Please try again later.</td></tr>';
    }
}

// Call the function after the DOM is ready
if (document.readyState === 'loading') {
    // DOM not fully loaded, use event listener
    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            fetchAndDisplayPatients();
        }
    });
} else {
    // DOM already loaded
    fetchAndDisplayPatients();
}
