const taskInput = document.getElementById('taskName');
const addButton = document.querySelector('.task-input button');
const pendingTasks = document.getElementById('pendingTasks');
const inProgressTasks = document.getElementById('inProgressTasks');
const doneTasks = document.getElementById('doneTasks');

addButton.onclick = function() {
    const taskText = taskInput.value.trim();
    if(taskText === '') {
        alert('Vui lòng nhập tên công việc');
        return;
    }
    
    createTask(taskText, pendingTasks);
    saveAllTasks();
    taskInput.value = '';
}

function createTask(taskText, targetColumn) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    
    const taskContent = document.createElement('p');
    taskContent.textContent = taskText;
    
    const moveButton = document.createElement('button');
    moveButton.textContent = 'Chuyển tiếp';
    
    taskDiv.appendChild(taskContent);
    if(targetColumn !== doneTasks) { 
        taskDiv.appendChild(moveButton);
        
        moveButton.onclick = function() {
            if(targetColumn === pendingTasks) {
                inProgressTasks.appendChild(taskDiv);
            } else if(targetColumn === inProgressTasks) {
                doneTasks.appendChild(taskDiv);
                moveButton.remove(); 
            }
            saveAllTasks();
        };
    }
    
    targetColumn.appendChild(taskDiv);
}

function saveAllTasks() {
    const saveTasks = (element, key) => {
        const tasks = [];
        const taskElements = element.getElementsByClassName('task');
        for(let task of taskElements) {
            tasks.push(task.querySelector('p').textContent);
        }
        localStorage.setItem(key, JSON.stringify(tasks));
    };
    
    saveTasks(pendingTasks, 'pendingTasks');
    saveTasks(inProgressTasks, 'inProgressTasks');
    saveTasks(doneTasks, 'doneTasks');
}

function loadTasks() {
    const loadColumn = (key, targetColumn) => {
        const savedTasks = localStorage.getItem(key);
        if(savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(taskText => createTask(taskText, targetColumn));
        }
    };
    
    loadColumn('pendingTasks', pendingTasks);
    loadColumn('inProgressTasks', inProgressTasks);
    loadColumn('doneTasks', doneTasks);
}

window.onload = function() {
    loadTasks();
};