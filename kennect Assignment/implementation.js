
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm() {
  // Get input values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("cpassword").value;

  // Define error message variables
  var nameError = emailError = passwordError = confirmError = true;

  // Validate name
  if (name === "") {
    printError("name_error", "Please enter your name");
    return false;
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(name) === false) {
      printError("name_error", "Please enter a valid name");
 return false;
    } else {
      printError("name_error", "");
      nameError = false;
    }
  }

  // Validate email address
  if (email === "") {
    printError("email_error", "Please enter your email address");
 return false;
  } else {
    // Regular expression for basic email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      printError("email_error", "Please enter a valid email address");
 return false;
    } else {
      printError("email_error", "");
      emailError = false;
    }
  }

  // Validate password
  if (password === "") {
    printError("password_error", "Please enter your password");
 return false;
  } else {
    // Regular expression for password validation
    var regex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}$/;
    if (regex.test(password) === false) {
      printError("password_error", "Password at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter");
 return false;
    } else {
      printError("password_error", "");
      passwordError = false;
    }
  }

  // Validate confirm password
  if (confirmPassword === "") {
    printError("confirm_error", "Please confirm your password");
 return false;
  } else {
    if (password !== confirmPassword) {
      printError("confirm_error", "Passwords do not match");
 return false;
    } else {
      printError("confirm_error", "");
      confirmError = false;
    }
  }

  // Prevent form submission if there are any errors
  if (nameError || emailError || passwordError || confirmError) {
    return false;
  } else {
    // Submit the form if all inputs are valid
    alert("Registration successful");
    return true;
  }
}