import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-e1373-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const tasksInDB = ref(database, "tasks");

const popupOverlay = document.getElementById("popup-overlay");
const popupBox = document.getElementById("popup-box");
const addPopupButton = document.getElementById("add-popup-button");
const cancelPopup = document.getElementById("cancel-popup");
const container = document.querySelector('.container');
const addWork = document.getElementById("add-work");
const workTitle = document.getElementById("add-work-input");
const employee = document.getElementById("add-employee-input");
const workDescription = document.getElementById("work-description-input");

addPopupButton.addEventListener("click", function () {
    popupOverlay.style.display = 'block';
    popupBox.style.display = 'block';
});

cancelPopup.addEventListener("click", function (event) {
    event.preventDefault();
    popupOverlay.style.display = 'none';
    popupBox.style.display = 'none';
});

popupOverlay.addEventListener("click", function () {
    popupOverlay.style.display = 'none';
    popupBox.style.display = 'none';
});

addWork.addEventListener('click', function (event) {
    event.preventDefault();
    let task = {
        title: workTitle.value,
        employee: employee.value,
        description: workDescription.value
    };

    push(tasksInDB, task);

    popupOverlay.style.display = 'none';
    popupBox.style.display = 'none';

    workTitle.value = '';
    employee.value = '';
    workDescription.value = '';
});

onValue(tasksInDB, function (snapshot) {
    if (snapshot.exists()) {
        let tasksArray = Object.entries(snapshot.val());
        clearTasks();

        for (let i = 0; i < tasksArray.length; i++) {
            let currentTask = tasksArray[i];
            let currentTaskID = currentTask[0];
            let currentTaskValue = currentTask[1];

            appendTaskToContainer(currentTaskID, currentTaskValue);
        }
    } else {
        container.innerHTML = "<h3>No tasks available.</h3>";
    }
});

function clearTasks() {
    container.innerHTML = "";
}

function appendTaskToContainer(taskID, task) {
    let div = document.createElement("div");
    div.setAttribute('class', 'work-container');
    div.innerHTML = `<h2>${task.title}</h2>
                     <h4>${task.employee}</h4>
                     <p>${task.description}</p>
                     <button onclick="deleteTask('${taskID}')">Delete</button>`;
    container.append(div);
}

window.deleteTask = function (taskID) {
    let taskRef = ref(database, `tasks/${taskID}`);
    remove(taskRef);
}
