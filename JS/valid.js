////registration////

// Function to validate registration email
function validRegstEmail() {
  var emailInput = document.getElementById("email-reg").value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailInput);
}

// Function to display the validation message for registration email
function validEmail() {
  var isValid = validRegstEmail();
  var showMessage = document.getElementById("Email");
  if (!isValid) {
    showMessage.innerHTML = "<b style='color:red'>Invalid email address</b>";
  } else {
    showMessage.innerHTML = "<b style='color:green'>Valid email address</b>";
  }
  return isValid;
}


// Function to validate the registration username
function validRegstName() {
  var username = document.getElementById("username-reg").value;
  return username.length >= 3 && isNaN(username);
}
// Function to display the validation message for registration username
function validName() {
  var isValid = validRegstName();
  var showMessage = document.getElementById("Name");
  if (!isValid) {
    showMessage.innerHTML = "<b style='color:red'>Name must be more than 3 characters and not a number</b>";
  } else {
    showMessage.innerHTML = "<b style='color:green'>Valid name </b>";
  }
  return isValid;
}
// Function validate registration password
function validRegstPass() {
  var testPass = document.getElementById("password-reg").value === document.getElementById("password-reg2").value;
  var passwordInput = document.getElementById("password-reg");
  var passwordRegex = /^(?=.*\d).{8,}$/;
  if (passwordRegex.test(passwordInput.value) && testPass) {
    return true;
  } else {
    return false;

  }
}

// Function to display the validation message for registration password
function checkPassRegst() {
  var isValid = validRegstPass();
  var showMessage = document.getElementById("showMs");
  if (isValid) {
    showMessage.innerHTML = "<b style='color:green'>the same</b>";
  } else {
    showMessage.innerHTML = "<b style='color:red'>not the same password and Password must be at least 8 characters long </b>";
  }
  return isValid;
}

/////login//////

// Function to validate login username
function validLoginName() {
  var usernamelogin = document.getElementById("username").value;
  return usernamelogin.length >= 3 && isNaN(usernamelogin);
}

// Function to display the validation message for login username
function fuValidLog() {
  var isValid = validLoginName();
  var messageElement = document.getElementById("NameLogin");
  if (!isValid) {
    messageElement.innerHTML = "<b style='color:red'>Name must be more than 3 characters and not a number</b>";
  } else {
    messageElement.innerHTML = "<b style='color:green'>Valid </b>";
  }
}

// Function to validate login password
function validPasswordLogin() {
  var passwordInput = document.getElementById("password");
  var passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(passwordInput.value);
}

// Function to display the validation message for login password
function fupasValidLog() {
  var isValid = validPasswordLogin();
  var message = document.getElementById("showLogin");
  if (isValid) {
    message.innerHTML = "<b style='color:green'>Valid</b>"
  } else {
    message.innerHTML = "<b style='color:red'>Password must be at least 8 characters long</b>";

  }
}

/////local//////

//registration///
var storData;
if (localStorage.userData != null) {
  storData = JSON.parse(localStorage.userData)

} else {
  storData = [];
}

// Function to check if the username already exists in localStorage
function isUserExists(username) {
  return storData.some(storData => storData.username === username);
}
function ispassExists(password) {
  return storData.some(storData => storData.password === password);
}
function isemailExists(email) {
  return storData.some(storData => storData.email === email);
}

// Function to handle user registration
function register(event) {
  event.preventDefault();
  var username = document.getElementById("username-reg").value;
  var password = document.getElementById("password-reg").value;
  var email = document.getElementById("email-reg").value;

  if (validName() && checkPassRegst() && validEmail()) {
    if (isemailExists(email)) {
      alert('email already exist');
      return;
    }

    // Retrieve and update the user data from localStorage
    storData.push({ username, password, email });
    localStorage.setItem('userData', JSON.stringify(storData));
    alert('User registered successfully');
    window.location.href = 'login.html';
  } else {
    document.getElementById("valid").style.display = "block";
  }
}


// Function to handle user login
function login(event) {
  event.preventDefault();
  if (validLoginName() && validPasswordLogin()) {
    var usernamelocal = document.getElementById("username").value;
    var passwordlocal = document.getElementById("password").value;

    if (!isUserExists(usernamelocal) || !ispassExists(passwordlocal)) {
      alert("this user is not exit, plz registr");
      return;
    }

    storData = JSON.parse(localStorage.getItem("userData"));
    var found = storData.some(user => user.username === usernamelocal && user.password === passwordlocal);

    if (usernamelocal === 'admin') {
      window.location.href = 'category.html';
    } else if (found) {
      window.location.href = 'categoryuser.html';
    }
  } else {
    document.getElementById("valid").style.display = "block";
  }
}


