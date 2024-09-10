
const body = document.body;
const main = document.createElement("main");
main.setAttribute("class","main-container" );
body.appendChild(main)
const h1 = document.createElement("h1");
h1.innerText = "To Do List";
main.appendChild(h1);
const form = document.createElement("form");
main.appendChild(form);

const inputContainer = document.createElement("div");
inputContainer.setAttribute("class", "input-container");
form.appendChild(inputContainer);
const inputText = document.createElement("input");
inputText.type = "text";
inputText.setAttribute("id", "IdText");
inputContainer.appendChild(inputText);
const inputSubmit = document.createElement("input");
inputSubmit.type = "submit";
inputSubmit.setAttribute("id", "IdSubmit");
inputContainer.appendChild(inputSubmit);
const table = document.createElement("table");
table.setAttribute("class", "table");
main.appendChild(table);

const tr = document.createElement("tr");
table.appendChild(tr);
const arrTh = ["id", "ToDo", "Status", "actions"];
arrTh.forEach((val, idx) =>{
    let th = document.createElement("th");
    th.innerText = val;
    tr.appendChild(th)
})


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



const idTableCreate = (task) => {
    const tdId = document.createElement("td");
    tdId.innerText = `${task.id.substring(0,3)}...` ;
    return tdId;
    
}
const toDoTableCreate = (task) =>{
    const tdToDo = document.createElement("td");
    tdToDo.innerText = task.toDo;
    tdToDo.setAttribute("id", "IdToDo");
    console.log(task.status)
    if(task.status){
        tdToDo.style.backgroundColor = "red";
        tdToDo.style.textDecoration ="line-through";
        console.log(tdToDo)
    }

    return tdToDo
}

const StatusTableCreate = (task) => {
    const tdStatus = document.createElement("td");
    tdStatus.innerText = task.status ? "DONE" : "To Do";
    return tdStatus;
}
const clickDelete = (task) => {
    tasks = tasks.filter(t => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTable();

}

const clickUpdate = (task) => {
    const updatedText = prompt("Update task:", task.toDo);
            if (updatedText) {
                task.toDo = updatedText;
                localStorage.setItem("tasks", JSON.stringify(tasks));

                renderTable();

            }

}

const clickStatus = (task) => {
    task.status = !task.status;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTable();

}


const actionsTableCreate =(task)  =>{
    const tdActions = document.createElement("td");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("id", "IdDelete");
        deleteBtn.addEventListener("click", () => clickDelete(task));
        tdActions.appendChild(deleteBtn);

    const updateBtn = document.createElement("button");
        updateBtn.innerText = "Update";
        updateBtn.setAttribute("id", "IdUpdate");
        updateBtn.addEventListener("click",() => clickUpdate(task));
        tdActions.appendChild(updateBtn);

        const toggleStatusBtn = document.createElement("button");
        toggleStatusBtn.innerText = "Status";
        toggleStatusBtn.setAttribute("id", "IdStatus");
        toggleStatusBtn.addEventListener("click",() => clickStatus(task));
        tdActions.appendChild(toggleStatusBtn);    

    return tdActions    
}


const renderTable = () => {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row, index) => {
        if (index > 0) {
            row.remove();
        } 
    });
    
    tasks.forEach(task => {
        const tr = document.createElement("tr");    
        
        tr.appendChild(idTableCreate(task));
        
        tr.appendChild(toDoTableCreate(task));
        
        tr.appendChild(StatusTableCreate(task));
        
        tr.appendChild(actionsTableCreate(task));
        table.appendChild(tr);

        
    });
}

const inputFormEvent = (e) => {
    e.preventDefault();
    const IsText = inputText.value.trim();
    if(IsText !== ""){
        const newElment = {
            id: Date.now().toString() + Math.random().toString(16),
            toDo: IsText,
            status: false
        };
        tasks.push(newElment);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        inputText.value = "";
        renderTable();
    }
}
form.addEventListener("submit", inputFormEvent);
renderTable();


