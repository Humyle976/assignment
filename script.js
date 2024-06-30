let addTaskButton = document.querySelector(".add-task-button");
let saveTaskButton = document.querySelector(".save-task-button");
let backButton = document.querySelector(".back-button");
let taskInput = document.querySelector(".task-input-container");
let ul = document.querySelector(".list");
let taskDone = document.querySelector(".task-done");

function addTask() {
    var taskTitle = document.querySelector("#task-title");
    var taskDescription = document.querySelector("#task-description");
    var startDate = document.querySelector("#start-date");
    var endDate = document.querySelector("#end-date");
    var priority = document.querySelector("#task-priority");
    var category = document.querySelector("#task-category");

    if (
        taskTitle.value.length > 0 &&
        taskDescription.value.length > 0 &&
        startDate.value.length > 0 &&
        endDate.value.length > 0 &&
        endDate.value > startDate.value
    ) {
        document.querySelector(".no-task").style.display = "none";
        let li = document.createElement("li");
        let checkBox = document.createElement("input");
        let div = document.createElement("div");
        let taskHeading = document.createElement("h2");
        let delBtn = document.createElement("button");
        let taskDes = document.createElement("span");

        taskHeading.setAttribute("class", "task-heading");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "checkbox");
        delBtn.setAttribute("class", "del-button fa-solid fa-trash-can");

        li.setAttribute("class", `list-container ${priority.value.toLowerCase()} ${category.value.toLowerCase()}`);
        taskHeading.innerHTML = `${taskTitle.value} `;
        taskDes.innerHTML = `${startDate.value} ${endDate.value} ${taskDescription.value} ${priority.value} ${category.value}`;
        taskDes.style.display = "none";
        taskHeading.appendChild(taskDes);
        div.appendChild(checkBox);
        div.appendChild(taskHeading);
        div.appendChild(delBtn);
        li.appendChild(div);
        ul.append(li);

        taskInput.style.display = "none";
        addTaskButton.style.display = "block";
        filter();
          

        checkBox.addEventListener("click", function (event) {
            event.stopPropagation();
            if (event.target.checked) {
                event.target.nextElementSibling.style.textDecoration = "line-through";
                ul.appendChild(event.target.parentElement.parentElement);
                filter();
            } else {
                event.target.nextElementSibling.style.textDecoration = "none";
                ul.insertBefore(event.target.parentElement.parentElement, ul.firstChild);
                filter();
            }
        });

        li.onclick = function () {
            descriptionBox(li);
        };

        delBtn.onclick = function (event) {
            event.stopPropagation();
            document.querySelector(".confirm-box-container").style.display = "flex";

            document.querySelector(".confirm-yes").onclick = function () {
                li.remove();
                if (document.querySelectorAll("li").length == 0) {
                    document.querySelector(".no-task").style.display = "block";
                }
                document.querySelector(".confirm-box-container").style.display = "none";
            };
            document.querySelector(".confirm-no").onclick = function () {
                document.querySelector(".confirm-box-container").style.display = "none";
            };
        };
        taskTitle.value = "";
        taskDescription.value = "";
        startDate.value = "";
        endDate.value = "";
        priority.value = "Low";
        category.value = "Work";
    }
}

saveTaskButton.addEventListener("click", addTask);

addTaskButton.addEventListener("click", () => {
    taskInput.style.display = "flex";
});

backButton.addEventListener("click", () => {
    document.querySelector(".task-input-container").style.display = "none"; 
});

const descriptionBox = (li) => {
    document.querySelector(".task-description-container").style.display = "block";
    let taskArr = li.children[0].children[1].textContent.split(" ");
    let descriptionBoxArr = document.querySelectorAll(
        ".task-description > input , .task-description > textarea , .task-description select"
    );
    for (let i = 0; i < taskArr.length; i++) {
        descriptionBoxArr[i].value = taskArr[i];
    }
    document.querySelector(".description-box-edit").onclick = function () {
        for (let i = 0; i < descriptionBoxArr.length; i++) {
            descriptionBoxArr[i].disabled = false;
        }
        document.querySelector(".description-box-confirm").innerText = "Save";
        document.querySelector(".description-box-edit").style.display = "none";
    };
    document.querySelector(".description-box-confirm").onclick = function () {
        if (
            descriptionBoxArr[0].value.length > 0 &&
            descriptionBoxArr[1].value.length > 0 &&
            descriptionBoxArr[2].value.length > 0 &&
            descriptionBoxArr[3].value.length > 0 &&
            descriptionBoxArr[2].value > descriptionBoxArr[1].value
        ) {
            li.children[0].children[1].innerHTML = `${descriptionBoxArr[0].value} <span style="display:none;">${descriptionBoxArr[1].value} ${descriptionBoxArr[2].value} ${descriptionBoxArr[3].value} ${descriptionBoxArr[4].value} ${descriptionBoxArr[5].value}</span>`;
            document.querySelector(".task-description-container").style.display =
                "none";
            document.querySelector(".description-box-confirm").innerText = "X";
            document.querySelector(".description-box-edit").style.display = "flex";
            li.className = `list-container ${descriptionBoxArr[4].value.toLowerCase()} ${descriptionBoxArr[5].value.toLowerCase()}`;
            for (let i = 0; i < descriptionBoxArr.length; i++) {
                descriptionBoxArr[i].disabled = true;
            }
            filter();
        }
    };
};

document.querySelector(".filter").addEventListener("click", () => {
    document.querySelector(".filter-container").style.display = "block";
    document.querySelector(".save-filter-button").onclick = () => {
        filter();
    } 
})
const filter = () => {
    {
        let tasks = document.querySelectorAll("li");
        let filterValue = document.querySelector(".filter-status label input:checked").value;
        let priorityArr = document.querySelectorAll(".filter-priority label input:checked");
        let categoryArr = document.querySelectorAll(".filter-category label input:checked"); 
        if(priorityArr.length == 0){
            priorityArr = document.querySelectorAll(".filter-priority label input");
        }
        if(categoryArr.length == 0 ){   
            categoryArr = document.querySelectorAll(".filter-category label input")
        }
        for (let k = 0; k < tasks.length; k++) {
            let isChecked = tasks[k].querySelector("input").checked;
            let bool = false;
            for (let i = 0; i < priorityArr.length; i++) {
                for (let j = 0; j < categoryArr.length; j++) {
                    
                    if (tasks[k].classList.contains(priorityArr[i].value.toLowerCase()) && tasks[k].classList.contains(categoryArr[j].value.toLowerCase())) {
                        bool = true;
                        break;
                    }
                }
                if (bool && ((filterValue == "InProgress" && !isChecked) ||
                (filterValue == "Completed" && isChecked) || (filterValue == "All"))) {
                    tasks[k].style.display = "block";
                } else {
                    tasks[k].style.display = "none";
                }
            }
        }
        sort();
        document.querySelector(".filter-container").style.display = "none";
    }
}
document.querySelector(".sort").onclick = function () {
    let dropDown = document.querySelector(".drop-down");
    dropDown.style.display == "block" ? dropDown.style.display = "none" : dropDown.style.display = "block";
}
document.querySelector(".sort-option").onchange = () => {
    sort();
}

const sort = () => {
    let sortOpt = document.querySelector(".sort-option").value;
    if(sortOpt === "Low To High"){
        sortLowToHigh();
    }else if(sortOpt === "High To Low"){
        highToLow();
    }else if (sortOpt === "Due Date"){
        dueDate();
    }
}
const sortLowToHigh = () => {
    let tasks = Array.prototype.slice.call(document.querySelectorAll("li"));
    tasks.sort(function(a,b){
        let priorityA = getPriorityLevel(a);
        let priorityB = getPriorityLevel(b);

        if (priorityA < priorityB) {
            return -1;
        } else if (priorityA > priorityB) {
            return 1;
        } else {
            return 0;
        }
    })
    ul.innerHTML = "";
    tasks.forEach(li => {
        ul.appendChild(li);
    });
}
const highToLow = () => {
    let tasks = Array.prototype.slice.call(document.querySelectorAll("li"));
    tasks.sort(function(a,b){
        let priorityA = getPriorityLevel(a);
        let priorityB = getPriorityLevel(b);

        if (priorityA > priorityB) {
            return -1;
        } else if (priorityA < priorityB) {
            return 1;
        } else {
            return 0;
        }
    })
    ul.innerHTML = "";
    tasks.forEach(li => {
        ul.appendChild(li);
    });
}
const dueDate = () => {
    let tasks = Array.prototype.slice.call(document.querySelectorAll("li"));
    tasks.sort(function(a,b){
        if(a.children[0].children[1].children[0].textContent.split(" ")[1] > b.children[0].children[1].children[0].textContent.split(" ")[1]){
            return 1;
        }else if ((a.children[0].children[1].children[0].textContent.split(" ")[1] < b.children[0].children[1].children[0].textContent.split(" ")[1])){
            return -1;
        }else return 0;
    })
    ul.innerHTML = "";
    tasks.forEach(li => {
        ul.appendChild(li);
    });
}

function getPriorityLevel(task) {
    if (task.classList.contains("low")) {
        return 1;
    } else if (task.classList.contains("medium")) {
        return 2; 
    } else if (task.classList.contains("high")) {
        return 3; 
    } else {
        return 0;
    }
}
