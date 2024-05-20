// selecting popup box popup overlay button

var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-popup-button")

addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = 'block'
    popupbox.style.display = 'block'
})

//select cancel button
var cancelpopup = document.getElementById("cancel-popup")

cancelpopup.addEventListener("click", function (event) {
    event.preventDefault()
    popupoverlay.style.display = 'none'
    popupbox.style.display = 'none'
})

//select container,add-work,add-title-input,add-employee-input,work-description-input

var container = document.querySelector('.container')
var addwork = document.getElementById("add-work")
var worktitle = document.getElementById("add-work-input")
var employee = document.getElementById("add-employee-input")
var workdescription = document.getElementById("work-description-input")

addwork.addEventListener('click', function (event) {
    event.preventDefault()
    var div = document.createElement("div")
    div.setAttribute('class', 'work-container')
    div.innerHTML = `<h2>${worktitle.value}</h2>
    <h4>${employee.value}</h4>
    <p>${workdescription.value}</p>
    <button onclick="deletebook(event)">Delete</button>`
    container.append(div)
    popupoverlay.style.display = 'none'
    popupbox.style.display = 'none'

    worktitle.value = '';
    employee.value = '';
    workdescription.value = '';
})

function deletebook(event) {
    event.target.parentElement.remove()
}