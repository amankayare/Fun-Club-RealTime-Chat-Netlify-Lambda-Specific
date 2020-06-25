function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.display = "block";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.display = "none";

}

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
document.getElementById("scroll").onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.getElementById("scroll").scrollTop > 10) {
        mybutton.style.display = "none";
    } else {
        mybutton.style.display = "block";
    }
}

// When the user clicks on the button, scroll to the top of the document
function ButtomFunction() {

    document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight;

}
