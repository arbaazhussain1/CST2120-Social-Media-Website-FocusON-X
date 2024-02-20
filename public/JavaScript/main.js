
// narbar button 
document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', event => {
   
      if(event.target.classList.contains('dropdown-toggle') ){
        event.target.classList.toggle('toggle-change');
      
      }
      else if(event.target.parentElement.classList.contains('dropdown-toggle')){
        event.target.parentElement.classList.toggle('toggle-change');
     

      }
    })
  });


  // sidebar button 
  function sidebar() {
 
      document.querySelector("#sidebar").classList.toggle("collapsed");
};


// function togglePopupRegister() {

//   document.getElementById("popupRegister").classList.toggle("active");

// };

const registerbutton = document.getElementById("register-btn");
console.log(registerbutton);
const togglePopupRegister = (e) => {
  if (e.target === registerbutton) {

    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupRegister").style.display = "block";

  } else {

    document.getElementById("overlay").style.display = "none";
    document.getElementById("popupRegister").style.display = "none";
  }
 };

// function togglePopupRegister(e) {
//   if (e.target === registerbutton) {

//     document.getElementById("overlay").style.display = "block";
//     document.getElementById("popupRegister").style.display = "block";

//   }

// };

registerbutton.addEventListener("click", togglePopupRegister);


// 

// <!-- A popup to create a new post box
//     <div id="overlay" class="overlay" style="display:none;"></div>

//     <div id="popupPost" style="display:none;">
//         <h2>Create post</h2>
//         <p>What's on your mind?</p>
//         <button id="exitButton" onclick="exitPopup('popupPost')"> &times; </button>
//         <button id="postButton" onclick=""> Post </button>
//     </div>



// function displayPopup(pageID) {
//     document.getElementById("overlay").style.display = "block";
//     document.getElementById(pageID).style.display = 'block';
// }

// function exitPopup(pageID) {
//     document.getElementById("overlay").style.display = "none";
//     document.getElementById(pageID).style.display = 'none';
// };