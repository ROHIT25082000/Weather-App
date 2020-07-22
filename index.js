var arr = document.getElementsByClassName("container-fluid")
var randomIndex = Math.floor(Math.random() * 4);
arr[0].classList.add("back"+randomIndex);