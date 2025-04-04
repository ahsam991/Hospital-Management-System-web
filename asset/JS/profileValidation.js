function validatePassword(password) {
    let minLength = 8;
    let specialChars = "!@#$%^&*(),.?\":{}|<>"; // Define special characters manually

   
    if (password.length < minLength) {
        alert(`Password must be at least ${minLength} characters long.`);
        return false; 
    }

    let hasNumber = false;
    let hasLetter = false;
    let hasSpecialChar = false;

 
    for (let i = 0; i < password.length; i++) {
        let char = password[i];

       
        if (!isNaN(char) && char !== ' ') {
            hasNumber = true;
        }

        // Check if the character is a letter
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            hasLetter = true;
        }

        // Check if the character is a special character
        if (specialChars.indexOf(char) !== -1) {
            hasSpecialChar = true;
        }
    }

    
    if (!hasNumber) {
        alert("Password must contain at least one number.");
        return false; // Stop form submission if validation fails
    }

    if (!hasSpecialChar) {
        alert("Password must contain at least one special character.");
        return false; // Stop form submission if validation fails
    }

    return true; 
}

document.getElementById('updatePasswordForm')?.addEventListener('submit', function (e) {
   // e.preventDefault(); // Prevent default form submission

    let currentPassword = document.getElementById('current_password').value;
    let newPassword = document.getElementById('new_password').value;
    let confirmPassword = document.getElementById('confirm_password').value;

    // Validate new password
    if (!validatePassword(newPassword)) {
        return; 
    }


    if (newPassword !== confirmPassword) {
        alert("New password and confirmation do not match.");
        return; // Stop form submission if passwords do not match
    }

    // Construct query string manually
    let queryString = `current_password=${encodeURIComponent(currentPassword)}&new_password=${encodeURIComponent(newPassword)}&confirm_password=${encodeURIComponent(confirmPassword)}`;

    // Create and send an XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '../controller/processChangePassword.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the appropriate header for form submission

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            alert(response.message);
            if (response.success) {
                window.location.href = 'userProfile.php'; // Redirect on success
            }
        }
    };

    xhttp.send(queryString); 
});
