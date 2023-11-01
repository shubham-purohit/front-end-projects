let initialId = 1;
let pending_task_count = 0;
let completed_task_count = 0;

function Note(text) {
    this.noteId = initialId++;
    this.text = text;
    this.completed = false;
    this.isDeleted = false;
}

const getNoteListFromStorage = () => {
    const data = localStorage.getItem('toDoList');
    return data ? JSON.parse(data) : []
}

const deleteNote = (noteId) => {
    const data = localStorage.getItem('toDoList');
    const toDoList = data ? JSON.parse(data) : []
    toDoList.forEach(item => {
        if(item.noteId===noteId) {
            if(item.completed) {
                item.isDeleted = true;
            } else {
                const flag = confirm("Task is not yet complete. Proceed to delete?");
                item.isDeleted = flag ? true : false;
            }
        }
    });
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
    populateNoteList(toDoList);
}

const updateNote = (noteId) => {
    const data = localStorage.getItem('toDoList');
    const toDoList = data ? JSON.parse(data) : []
    toDoList.forEach(item => {
        if(item.noteId==noteId) {
            if(item.completed) {
                const flag = confirm("Do you want to mark it as incomplete?");
                item.completed = flag ? false : true;
            } else {
                item.completed = true;
            }
        }
    });
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
    populateNoteList(toDoList);
};

const createListElement = (toDoObject) => {
    let liElement = document.createElement('li');
    let deleteButton = document.createElement('i');
    let textelement = document.createElement('p');
    deleteButton.className = 'fa-solid fa-xmark'
    deleteButton.style = 'color: #ff2600'   
    deleteButton.onclick = function() {
        deleteNote(toDoObject.noteId);
    }
    textelement.innerText = toDoObject.text;
    textelement.className = toDoObject.completed ? 'strike' : '';
    liElement.id = toDoObject.noteId;
    liElement.appendChild(textelement)
    liElement.appendChild(deleteButton)
    liElement.ondblclick = function() {
        updateNote(toDoObject.noteId);
    }
    return liElement;
}

const populateNoteList = (toDoList) => {
    note.value = '';
    pending_task_count = 0;
    completed_task_count = 0;
    pendingTask.innerHTML = '';
    completedTask.innerHTML = '';
    for(let i=0; i < toDoList.length; i++) {
        if(toDoList[i].isDeleted) {
            console.log("skipped: " + toDoList[i].id);
            continue;
        }
        console.log("not skipped: " + toDoList[i].id);
        const liElement = createListElement(toDoList[i])    
        if (toDoList[i].completed) {
            completed_task_count++;
            completedTask.appendChild(liElement);
        } else {
            pending_task_count++;
            pendingTask.appendChild(liElement);
        }
    }
    error_pending.style.display = pending_task_count>0 ? "none" : "block";
    error_completed.style.display = completed_task_count>0 ? "none" : "block";
};

const saveNote = () => {
    const noteText = note.value;
    if(noteText==undefined || noteText==null || noteText=='') {
        alert("Please insert valid value..");
        return;
    }
    const newNote = new Note(noteText);
    const toDoList = getNoteListFromStorage()
    toDoList.push(newNote);
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
    populateNoteList(toDoList);
}

const resetAll = () => {
    const flag = confirm("Do you want to clear all tasks?");
    if(!flag) {
        return
    }
    localStorage.clear();
    populateNoteList([]);
}

populateNoteList(getNoteListFromStorage())