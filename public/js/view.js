function copy_function(id, btn) {

  document.getElementById(btn).style.backgroundColor = "#A9A9A9";


  var value = document.getElementById(id).innerHTML;
  console.log('name copy function called')
  var input_temp = document.createElement("input");
  input_temp.value = value.trim();
  document.body.appendChild(input_temp);
  input_temp.select();
  document.execCommand("copy");
  document.body.removeChild(input_temp);
};
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


//left aside modal
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".modal-btn-h");
var closeButton = document.querySelector(".close-button");


function toggleModal() {
  var aside = document.getElementById('left-modal');
  document.getElementById('content').appendChild(aside);
  document.getElementById('left-modal').style.display = "block";



  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", trigger);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick)

//right aside modal

var modal2 = document.querySelector(".modal2");
var trigger2 = document.querySelector(".modal-btn-s");
var closeButton2 = document.querySelector(".close-button2");



function toggleModal2() {
  console.log('clickeddddd');
  var aside2 = document.getElementById('right-modal');
  document.getElementById('content2').appendChild(aside2);
  document.getElementById('right-modal').style.display = "block";



  modal2.classList.toggle("show-modal2");
}

function windowOnClick(event) {
  if (event.target === modal2) {
    toggleModal2();
  }
}

trigger2.addEventListener("click", trigger2);
closeButton2.addEventListener("click", toggleModal2);
window.addEventListener("click", windowOnClick)



