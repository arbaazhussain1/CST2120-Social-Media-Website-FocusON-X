// async function post() {
//     const userObj = {};
//     // Retrieve user input values from HTML input elements
//     userObj.username = document.getElementById("username").value;
//     userObj.title = document.getElementById("title").value;
//     // userObj.text = document.getElementById("text").value;
//     // description
//     userObj.text = document.querySelector("#text").value;

  
//     // // Frontend validation
//     if (!postVal()) {
//       return; // Abort post if validation fails
//     }
//     console.log(userObj); // Log userObj data

//     // Send data to server
//     try {
//       const response = await fetch("/M00872279/post", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userObj),
//       });
  
//       const data = await response.json();
//       // Handle response from server
//       console.log(data.message); // Log server response
//       // Redirect or show message to the user based on response
      
//     } catch (error) {
//       console.error(error);
//       console.log("Not Possible to Same Post Twice");
//       // Handle error
//     }
//   }

async function post() {
  const userObj = new FormData();
  // Retrieve user input values from HTML input elements
  userObj.append('username', document.getElementById("username").value);
  userObj.append('title', document.getElementById("title").value);
  userObj.append('text', document.querySelector("#text").value);
  userObj.append('file', document.getElementById("file").files[0]); // Append file data

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
  const fileName = input.files[0].name;
  const uploadSpan = input.parentElement.querySelector(".upload span");
  uploadSpan.textContent = fileName;
}

  // Function to move the uploaded file to the destination folder
function moveFileToDestination() {
    const mv = require('mv');

    // Assuming file is saved to 'uploads' folder
    const uploadedFilePath = 'path/to/uploaded/file'; // Replace with the actual path to the uploaded file
    const destinationFolderPath = 'path/to/destination/folder'; // Replace with the desired destination folder

    mv(uploadedFilePath, `${destinationFolderPath}/${file.name}`, function(err) {
        if (err) {
            console.error(err);
            // Handle error
        } else {
            console.log('File moved successfully');
            // Continue with further processing or show success message
        }
    });
}
  
  
  // Frontend validation functions
  function postVal() {
    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    // const text = document.getElementById("text").value;
    const text = document.querySelector("#text").value;
    console.log(username, title, text); // Log input field values

  
    // Perform validation checks
    if ( !username || !title || !text) {
      // Show error message if any field is empty
      alert("Please fill in all fields");
      return false;
    }
  
  
    // If all validations pass, return true
    return true;
  }