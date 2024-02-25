// narbar button
document.querySelectorAll(".dropdown-toggle").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (event.target.classList.contains("dropdown-toggle")) {
      event.target.classList.toggle("toggle-change");
    } else if (
      event.target.parentElement.classList.contains("dropdown-toggle")
    ) {
      event.target.parentElement.classList.toggle("toggle-change");
    }
  });
});

// sidebar button
function sidebar() {
  document.querySelector("#sidebar").classList.toggle("collapsed");
}

// const registerbutton = document.getElementById("register-btn");
// console.log(registerbutton);
// const togglePopupRegister = (e) => {
//   if (e.target === registerbutton) {

//     document.getElementById("overlay").style.display = "block";
//     document.getElementById("popupRegister").style.display = "block";

//   } else {

//     document.getElementById("overlay").style.display = "none";
//     document.getElementById("popupRegister").style.display = "none";
//   }
//  };

// registerbutton.addEventListener("click", togglePopupRegister);

// document.addEventListener('DOMContentLoaded', function() {
//   const registerbutton = document.getElementById('register-btn');
//   const popup = document.getElementById('popupRegister');
//   const closePopup = document.getElementById('close-btn');

//   registerbutton.addEventListener('click', function() {
//       popup.style.display = 'block';
//   });

//   closePopup.addEventListener('click', function() {
//       popup.style.display = 'none';
//   });
// });
