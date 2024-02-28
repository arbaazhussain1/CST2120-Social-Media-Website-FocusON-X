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


// JavaScript function to openModalContent
function openModalContent() {
  var myModal = new bootstrap.Modal(document.getElementById("Modal-Content"));
  myModal.show();
}

// JavaScript function to openModalContent2
function openModalContent2() {
  var myModal = new bootstrap.Modal(document.getElementById("Modal-Content2"));
  myModal.show();
}

// JavaScript function to openModalContent3
function openModalContent3() {
  var myModal = new bootstrap.Modal(document.getElementById("Modal-Content3"));
  myModal.show();
}
