toDoList = []
let initialId = 1;
let pending_task_count = 0;
let completed_task_count = 0;

function Note(text) {
    this.noteId = initialId++;
    this.text = text;
    this.completed = false;
    this.dateClosed = null;
}

const updateNote = (noteId) => {
    console.info(`Note id is ${noteId}`);
    toDoList.forEach(item => {
        if(item.noteId==noteId) {
            console.info('note found!!');
            if(item.completed) {
                const flag = confirm("Do you want to mark it as incomplete?");
                item.completed = flag?false:true;
            } else {
                item.completed = true;
            }
        }
    });
    populateNoteList();
};

const createHTMLElementById = (element, id, onclickHanlder) => {

}

const populateNoteList = () => {
    let ulPending = document.getElementById('pendingTask');
    let ulCompleted = document.getElementById('completedTask');
    pending_task_count = 0;
    completed_task_count = 0;
    ulPending.innerHTML = '';
    ulCompleted.innerHTML = '';
    for(let i=0; i < toDoList.length; i++) {
        let liElement = document.createElement('li');
        let noteTile = document.createElement('button');
        noteTile.innerText = toDoList[i].text;
        noteTile.id = toDoList[i].noteId;
        noteTile.onclick = function() {
            updateNote(toDoList[i].noteId);
        }
        liElement.appendChild(noteTile);
            
        if (toDoList[i].completed) {
            noteTile.className = 'strike';
            completed_task_count++;
            ulCompleted.appendChild(liElement);
        } else {
            pending_task_count++;
            ulPending.appendChild(liElement);
        }
    }
    console.log(`${pending_task_count} pending tasks...`);
    console.log(`${completed_task_count} completed tasks...`);
    if(pending_task_count>0) {
        document.getElementById('error-pending').style.display = "none";
        console.log("here");
    } else {
        document.getElementById('error-pending').style.display = "block";
    }
    if(completed_task_count>0) {
        document.getElementById('error-completed').style.display = "none";
        console.log("THere");
    } else {
        document.getElementById('error-completed').style.display = "block";
    }
};

function saveNote(btn_id) {
    console.info(`This is button id: ${btn_id}`);
    let noteText = document.getElementById("note").value;
    if(noteText==undefined || noteText==null || noteText=='') {
        alert("Please insert valid value..");
        return;
    }
    let newNote = new Note(noteText);
    toDoList.push(newNote);
    reset();
    console.log(toDoList);
    populateNoteList();
}

function reset() {
    document.getElementById("note").value = '';
}