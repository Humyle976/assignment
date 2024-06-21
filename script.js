let buttonTaskCreate = document.getElementById("task-create-button");
let buttonTaskAdd = document.getElementById("add-task-button");
let undoButton = document.getElementById("undo-button");
let taskInput = document.querySelector(".task-input-container");
let ul = document.querySelector(".list");

function showTaskForm()
{
    taskInput.style.display= "flex";
    buttonTaskCreate.style.display= "none";
}

function addTask()
{
    var taskTitle = document.querySelector("#task-title");
    var taskDescription = document.querySelector("#task-description");
    var startDate = document.querySelector("#start-date");
    var endDate = document.querySelector("#end-date");

    

    if  (taskTitle.value.length > 0 && taskDescription.value.length > 0 && startDate.value.length > 0 && endDate.value.length > 0 && endDate.value > startDate.value )
        {
            let li = document.createElement("li");
            let checkBox = document.createElement("input")
            let div = document.createElement("div");
            let taskHeading = document.createElement("h2");
            let delBtn = document.createElement("button");
            let taskHeadingSpan = document.createElement("span");
            
            taskHeading.setAttribute("class", "task-heading");
            checkBox.setAttribute("type" , "checkbox");
            checkBox.setAttribute("class" , "todos");
            delBtn.setAttribute("class", "del-button");
            taskHeadingSpan.setAttribute("class", "task-heading-span");
            div.setAttribute("class", "list-container");

            taskHeadingSpan.innerHTML = `${taskTitle.value.toUpperCase()}`;
            
            delBtn.textContent = `Delete`;

            taskHeading.appendChild(taskHeadingSpan);
            div.appendChild(checkBox);
            div.appendChild(taskHeading);
            div.appendChild(delBtn);
            li.appendChild(div);
            ul.appendChild(li);
            
            taskInput.style.display= "none";
            buttonTaskCreate.style.display= "block";

            
            checkBox.addEventListener("click", function(event) {
                if (event.target.checked) {
                    event.target.nextElementSibling.style.textDecoration = "line-through";
                } else {
                    event.target.nextElementSibling.style.textDecoration = "none";
                }
            });
            
            taskHeadingSpan.addEventListener("click", function() {
                taskDescriptionBox(taskHeadingSpan,taskTitle,taskDescription,startDate,endDate);
            });
            delBtn.addEventListener("click", () => {
                confirmation(li);
            });
        }else showError(taskTitle,taskDescription,startDate,endDate);
}

function undo()
{
    document.querySelector(".task-input-container").style.display = "none";
    buttonTaskCreate.style.display = "block";
}


const confirmation = (li) => {

    const confirmDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");
    const confirmYes = document.createElement("button");
    const confirmNo = document.createElement("button");
    const msgTxt = document.createElement("p");
    const confirmContainer = document.createElement("div");

    confirmContainer.setAttribute("class" , "confirm-box-container");
    confirmDiv.setAttribute("class","confirm-box");
    buttonDiv.setAttribute("class", "confirm-button-container");
    confirmYes.setAttribute("class" ,"confirm-yes");
    confirmNo.setAttribute("class", "confirm-no");
    msgTxt.setAttribute("class", "confirm-msg");


    msgTxt.textContent = `Are You Sure You Want To Delete The Task?`;
    confirmYes.textContent = `Yes`;
    confirmNo.textContent = `No`;
    
    confirmDiv.appendChild(msgTxt);
    buttonDiv.appendChild(confirmYes);
    buttonDiv.appendChild(confirmNo);
    confirmDiv.appendChild(buttonDiv);
    confirmContainer.appendChild(confirmDiv);
    document.querySelector(".page").appendChild(confirmContainer);

    confirmYes.addEventListener("click", () => {
        li.remove();
        confirmContainer.remove();
    })
    confirmNo.addEventListener("click", () => {
        confirmContainer.remove();
    })
}

const taskDescriptionBox = (taskHeadingSpan, taskTitle , taskDescription , startDate ,endDate) => {
    
        let container = document.createElement("div");
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let editBtn = document.createElement("button");
        let confirmBtn = document.createElement("button"); 
        let inputTitle = document.createElement("input");
        let inputDescription = document.createElement("textarea");
        let inputStart = document.createElement("input");
        let inputEnd = document.createElement("input");
        let titleLabel = document.createElement("label");
        let descriptionLabel = document.createElement("label");
        let startLabel = document.createElement("label");
        let endLabel = document.createElement("label");

        inputTitle.type = "text";
        inputStart.type = "date";
        inputEnd.type = "date";

        titleLabel.textContent = "Title";
        descriptionLabel.textContent = "Description";
        startLabel.textContent = "Start Date";
        endLabel.textContent = "End Date";
        editBtn.textContent = "Edit";
        confirmBtn.textContent = "X";


        inputTitle.value = taskTitle.value;
        inputDescription.value = taskDescription.value;
        inputStart.value = startDate.value;
        inputEnd.value = endDate.value; 
        
        inputTitle.disabled = true;
        inputDescription.disabled = true;
        inputStart.disabled = true;
        inputEnd.disabled = true;

        container.setAttribute("class","description-box-container");
        div.setAttribute("class" , "description-box-div");
        div2.setAttribute("class" , "description-box-div2");
        div3.setAttribute("class", "description-box-button-container");
        editBtn.setAttribute("class", "description-box-edit");
        confirmBtn.setAttribute("class", "description-box-confirm");

        titleLabel.setAttribute("for", "desciption-box-title");
        inputTitle.setAttribute("id","description-box-title");

        descriptionLabel.setAttribute("for", "description-box-description")
        inputDescription.setAttribute("id","description-box-description");
        
        startLabel.setAttribute("for", "description-box-start-date")
        inputStart.setAttribute("id","description-box-start-date");

        endLabel.setAttribute("for", "description-box-end-date")
        inputEnd.setAttribute("id","description-box-end-date");
        
        div.appendChild(div2);
        div.appendChild(div3);
        div3.appendChild(confirmBtn);
        div3.appendChild(editBtn);
        div2.appendChild(titleLabel);
        div2.appendChild(inputTitle);
        div2.appendChild(startLabel);
        div2.appendChild(inputStart);
        div2.appendChild(endLabel);
        div2.appendChild(inputEnd);
        div2.appendChild(descriptionLabel);
        div2.appendChild(inputDescription);
        container.appendChild(div);
        document.querySelector(".page").appendChild(container);

        editBtn.addEventListener("click" , () => {
            editBtn.style.display = "none"
            inputTitle.disabled = false;
            inputDescription.disabled = false;
            inputEnd.disabled = false;
            confirmBtn.textContent = "Save"
        })
        confirmBtn.addEventListener("click" , () => {
            if(inputTitle.value.length > 0 && inputDescription.value.length > 0 && inputStart.value < inputEnd.value)
            {
                taskHeadingSpan.innerHTML = `${inputTitle.value.toUpperCase()}`;
                taskTitle.value = inputTitle.value;
                taskDescription.value = inputDescription.value;
                endDate.value = inputEnd.value;
                container.remove();
            }
        })
}
function showError(taskTitle,taskDescription,startDate,endDate){
    if(taskTitle.value.length < 0 ){
        taskTitle.style.borderColor = "red";
    }
    if(taskDescriptionBox.value.length < 0){
        taskDescription.style.borderColor = "red";
    }
    if(startDate.value.length < 0){
        startDate.style.borderColor = "red";
    }
    if(endDate.value.length < 0 ){
        endDate.style.borderColor = "red";
    }
    if(startDate.value > endDate.value){
        endDate.style.borderColor = "red";
    }
}

buttonTaskAdd.addEventListener("click",addTask);
buttonTaskCreate.addEventListener("click",showTaskForm);
undoButton.addEventListener("click",undo);