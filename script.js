// Function to execute when the window is loaded
window.onload = function () {
    // Add event listener to the form submission
    document.getElementById("form").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      submitForm(); // Call the submitForm function
    });
  };
  
  // Function to handle form submission
  function submitForm() {
    // Get form values
    const id = document.getElementById("id").value;
    const fullName = document.getElementById("fullName").value;
    const address = document.getElementById("address").value;
    const status = document.getElementById("status").value;
  
    const formData = new FormData();
    formData.append("id", id);
    formData.append("fullName", fullName);
    formData.append("address", address);
    formData.append("status", status);
  
    const data = new URLSearchParams(formData).toString();
  
    // Send POST request
    fetch("https://register-backend.onrender.com/fee", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(handleResponse) // Handle the response
      .then(displayConfirmation) // Display the confirmation
      .catch(handleError); // Handle any errors
  }
  
  // Function to handle the response from the server
  function handleResponse(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  
  // Function to display the confirmation message
  function displayConfirmation(data) {
    // Update DOM to show confirmation
    const form = document.querySelector("form");
    const confirmation = document.getElementById("confirmation");
    const title = document.querySelector("h1");
  
    form.style.display = "none";
    confirmation.style.display = "flex";
    title.innerText = "Confirmation of Registration";
  
    const information = document.getElementById("information");
    information.innerHTML = `ID: ${data.id}<br>
      Full Name: ${data.fullName}<br>
      Address: ${data.address}<br>
      Fee: ${data.fee}`;
  
    // Update the switch button text and functionality
    const switchButton = document.getElementById("switch");
    switchButton.innerText = "Reset Form"; // Change button text
    switchButton.addEventListener("click", function () {
      title.innerText = "Registration Page"; // Reset title
      form.style.display = "block"; // Show the form again
      confirmation.style.display = "none"; // Hide the confirmation message
    });
  }
  
  // Function to handle errors during the POST request
  function handleError(error) {
    console.error("Error sending POST request:", error.message);
  }
  