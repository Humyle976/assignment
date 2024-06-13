var button_task_create = document.getElementById("task-create-button");
var button_task_add = document.getElementById("add-task-button");
var undo_button = document.getElementById("undo-button");
var ul = document.querySelector("ul");


function showTaskForm()
{
    var task_input=document.querySelector(".task-input");
    task_input.style.display= "block";
    button_task_create.style.display= "none";
}

function addTask()
{
    var taskTitle = document.getElementById("task-title");
    var task_input=document.querySelector(".task-input");
    var taskDescription = document.getElementById("task-description");
    var startDate = document.getElementById("start-date");
    var endDate = document.getElementById("end-date");
    
    if  (taskTitle.value.length > 0 && taskDescription.value.length > 0 && startDate.value.length > 0 && endDate.value.length > 0 && endDate.value > startDate.value )   
    {
        task_input.style.display= "none";
        button_task_create.style.display = "block";
        
        var li = document.createElement('li');
        li.innerHTML= `<strong>Title:</strong>${taskTitle.value}<br> <strong>Start Date:</strong> ${startDate.value}<br><strong>End Date:</strong> ${endDate.value}<br><strong>Description:</strong> ${taskDescription.value}`;
                
        ul.appendChild(li);

        taskTitle.value= "";
        taskDescription.value= "";
        startDate.value="";
        endDate.value="";
    }
}

function undo()
{
    var task_input=document.querySelector(".task-input");
    task_input.style.display= "none";
    button_task_create.style.display = "block";
}

button_task_create.addEventListener("click",showTaskForm);
button_task_add.addEventListener("click",addTask);
undo_button.addEventListener("click",undo);
