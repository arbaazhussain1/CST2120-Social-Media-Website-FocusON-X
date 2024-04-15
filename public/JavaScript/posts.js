async function post() {
    const userObj = {};
    // Retrieve user input values from HTML input elements
    userObj.username = document.getElementById("username").value;
    userObj.title = document.getElementById("title").value;
    // userObj.text = document.getElementById("text").value;
    // description
    userObj.description = document.getElementById("description").value;

  
    // // Frontend validation
    if (!postVal()) {
      return; // Abort post if validation fails
    }
  
    // Send data to server
    try {
      const response = await fetch("/M00872279/post", {
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
      console.log("Not Possible to Same Post Twice");
      // Handle error
    }
  }
  
  
  // Frontend validation functions
  function postVal() {
    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    // const text = document.getElementById("text").value;
    const description = document.getElementById("description").value;

  
    // Perform validation checks
    if ( !username || !title || !description) {
      // Show error message if any field is empty
      alert("Please fill in all fields");
      return false;
    }
  
  
    // If all validations pass, return true
    return true;
  }