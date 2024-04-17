async function post() {
  const userObj = new FormData();
  // Retrieve user input values from HTML input elements
  userObj.append("username", document.getElementById("username").value);
  userObj.append("title", document.getElementById("messageInput3").value);
  userObj.append("text", document.getElementById("messageInput2").value);
  userObj.append("file", document.getElementById("file").files[0]); // Append file data

  // Frontend validation
  if (!postVal()) {
    return; // Abort post if validation fails
  }
  console.log(userObj); // Log FormData object data

  // Send data to server
  try {
    const response = await fetch("/M00872279/post", {
      method: "POST",
      body: userObj, // Send FormData object
    });

    const data = await response.json();
    // Handle response from server
    console.log(data.message); // Log server response
    // Redirect or show message to the user based on response
  } catch (error) {
    console.error(error);
    console.log("Not Possible to Same Post Twice");
    // Handle error
  }
}

// Function to display the selected file name
function displayFileName(input) {
  if (input.files.length > 0) {
    const fileName = input.files[0].name;
    const uploadSpan = input.parentElement.querySelector(".upload span");
    uploadSpan.textContent = fileName;
  } else {
    // Handle case when no file is selected
    console.error("No file selected");
  }
}

function moveFileToDestination(destinationFolderPath, fileName) {
  const mv = require("mv");

  const uploadedFilePath = "/path/to/uploaded/file"; // Specify the current path of the uploaded file

  mv(uploadedFilePath, `${destinationFolderPath}/${fileName}`, function (err) {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log("File moved successfully");
      // Continue with further processing or show success message
    }
  });
}

function postVal() {
  const title = document.getElementById("messageInput3").value; // Title
  const text = document.getElementById("messageInput2").value; // Text

  // Perform validation checks
  if (!title || !text) {
    // Show error message if any field is empty
    alert("Please fill in all fields");
    return false;
  }

  // If all validations pass, return true
  return true;
}
document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here
  document
    .getElementById("createButton")
    .addEventListener("click", function () {
      if (postVal()) {
        post(); // Call the post() function if validation passes
      }
    });
});
