let toItemContainer = document.getElementById("todoItemsContainer");
let addtodoEl = document.getElementById("addTodoBtn");
let saveBtn = document.getElementById("saveBTN");
let deleteAllBTN = document.getElementById("deleteBTN");



function getItemformStorage() {
    let stringObj = localStorage.getItem("todo"); //getting the list using getitem but this is a string list
    let todolistObj = JSON.parse(stringObj); //convert the string to a js object
    if (todolistObj === null) {
        return [];
    } else {
        return todolistObj;
    }
}

let todo = getItemformStorage(); //gettting list directly from local storage
let count = todo.length;



// by clicking th save btn we are saving the object list in the form of string in local storage using
// JSON.stringify
saveBtn.onclick = function() {
    //saving the list in the form of string
    localStorage.setItem("todo", JSON.stringify(todo));
}

//this func will get the saved items if any on reload


//to toggle btw class when the box is checked
function onStatusChanged(checkboxID, labelID, todoID) {
    let checkBoxEl = document.getElementById(checkboxID);
    let labelEl = document.getElementById(labelID);
    labelEl.classList.toggle("checked");
    let todoItemIndex = todo.findIndex(function(eachItem) {
        let eachItemIndex = "todo" + eachItem.uniq;
        if (eachItemIndex === todoID) {
            return true;
        } else {
            return false;
        }
    });
    let todoObj = todo[todoItemIndex];
    if (todoObj.isChecked === true) {
        todoObj.isChecked = false;
    } else {
        todoObj.isChecked = true;
    }


}

function onDelete(todoID) {
    let todoEl = document.getElementById(todoID);
    toItemContainer.removeChild(todoEl);
    let deletedItemIndex = todo.findIndex(function(eachItem) {
        let eachItemID = "todo" + eachItem.uniq;
        if (eachItemID === todoID) {
            return true;
        } else {
            return false;
        }
    });
    todo.splice(deletedItemIndex, 1);
}

function todoFunc(todo) {
    let checkboxID = "checkbox" + todo.uniq;
    let labelID = "label" + todo.uniq;
    let todoID = "todo" + todo.uniq;


    let todoElement = document.createElement("li");
    todoElement.id = todoID;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    toItemContainer.appendChild(todoElement);


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.classList.add("checkbox-input");
    inputElement.id = checkboxID;
    inputElement.checked = todo.isChecked;
    if (inputElement.checked === true) {
        inputElement.classList.add("checked");
    }

    inputElement.onclick = function() {
        onStatusChanged(checkboxID, labelID, todoID);
    };

    todoElement.appendChild(inputElement);


    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);



    let labelElement = document.createElement("label");
    labelElement.id = labelID;
    labelElement.setAttribute("for", checkboxID);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let dltIconContainer = document.createElement("div");
    dltIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(dltIconContainer);

    let dltIconElement = document.createElement("i");
    dltIconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    dltIconContainer.appendChild(dltIconElement);

    dltIconElement.onclick = function() {
        onDelete(todoID);
    };


}

for (let eachItem of todo) {
    todoFunc(eachItem);
}

function onAdd() {
    let userInputEL = document.getElementById("todoUserInput");
    let inputVal = userInputEL.value;
    if (inputVal === "") {
        alert("Enter Valid Text");
        return;
    }

    count = count + 1;
    let newtodo = {
        text: inputVal,
        uniq: count,
        isChecked: false
    };

    todo.push(newtodo);
    todoFunc(newtodo);
    userInputEL.value = "";
}
addtodoEl.onclick = function() {
    onAdd();
};