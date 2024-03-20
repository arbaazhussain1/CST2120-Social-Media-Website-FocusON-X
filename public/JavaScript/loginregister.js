async function register() {
  const userObj = {};
  // Retrieve user input values from HTML input elements
  userObj.firstname = document.getElementById("firstname").value;
  userObj.lastname = document.getElementById("lastname").value;
  userObj.username = document.getElementById("username").value;
  userObj.email = document.getElementById("email").value;
  userObj.password = document.getElementById("password_register").value;

  // // Frontend validation
  if (!registerVal()) {
    return; // Abort registration if validation fails
  }

  // Send data to server
  try {
    const response = await fetch("/M00872279/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();
    // Handle response from server
    console.log(data.message); // Log server response
    // Redirect or show message to the user based on response
  } catch (error) {
    console.error(error);
    console.log("Not Possible to Register Twice");
    // Handle error
  }
}

async function login() {
  const username = document.getElementById("login_username").value;
  const password = document.getElementById("login_password").value;

  // Frontend validation
  if (!loginVal()) {
    return; // Abort login if validation fails
  }

  // Send login data to server
  try {
    const response = await fetch("/M00872279/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();
    // Handle response from server
    console.log(data.message); // Log server response

    if (response.ok) {
      sessionStorage.setItem("username", username);
      // Redirect or show message to the user based on response
    }

    // Redirect or show message to the user based on response
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

// Frontend validation functions
function registerVal() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password_register").value;

  // Perform validation checks
  if (!firstname || !lastname || !username || !email || !password) {
    // Show error message if any field is empty
    alert("Please fill in all fields");
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  // Validate password complexity
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
    );
    return false;
  }

  // If all validations pass, return true
  return true;
}

function loginVal() {
  const username = document.getElementById("login_username").value;
  const password = document.getElementById("login_password").value;

  // Perform validation checks
  if (!username || !password) {
    // Show error message if any field is empty
    alert("Please enter both username and password");
    return false;
  }
  // Other validation checks can be added here

  // If all validations pass, return true
  return true;
}

async function login_out() {
  const username = document.getElementById("login_username").value;
  const password = document.getElementById("login_password").value;

  // Frontend validation
  if (!loginVal()) {
    return; // Abort login if validation fails
  }

  // Send login data to server
  try {
    const response = await fetch("/M00872279/login", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();
    // Handle response from server
    console.log(data.message); // Log server response

    // Example of retrieving the username from sessionStorage
    const username = sessionStorage.getItem("username");
    if (username) {
      console.log("Logged in user:", username);
    } else {
      console.log("No user logged in");
    }

    // Remove user information from sessionStorage
    sessionStorage.removeItem("username");

    // Redirect or show message to the user based on response
  } catch (error) {
    console.error(error);
    // Handle error
  }
}
