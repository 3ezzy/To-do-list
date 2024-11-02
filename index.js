let tasks = [];

// Cache DOM elements for efficiency
const modal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalButton = document.getElementById('closeModal');
const taskForm = document.getElementById('taskForm');
const todoSection = document.getElementById('todo-section');
const inProgressSection = document.getElementById('in-progress-section');
const doneSection = document.getElementById('done-section');

let currentTask = null; // Track the task being edited

// Open and Close Modal Functions
function openModal() {
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    taskForm.reset();
    currentTask = null;
}

// Show modal when clicking "Add Task+"
addTaskBtn.onclick = openModal;
closeModalButton.onclick = closeModal;

// Update task counters
function updateTaskCounters() {
    let todoCount = tasks.filter(task => task.status === 'do').length;
    let doingCount = tasks.filter(task => task.status === 'doing').length;
    let doneCount = tasks.filter(task => task.status === 'done').length;

    document.getElementById('todo-count').textContent = `(${todoCount})`;
    document.getElementById('in-progress-count').textContent = `(${doingCount})`;
    document.getElementById('done-count').textContent = `(${doneCount})`;
}

// Task form submission handling
taskForm.onsubmit = function (e) {
    e.preventDefault();

    // Form values
    const taskName = document.getElementById('task').value;
    const taskDate = document.getElementById('date').value;
    const taskDescription = document.getElementById('description').value;
    const taskStatus = document.getElementById('status').value;
    const taskPriority = document.getElementById('priority').value;

    const newTask = { name: taskName, date: taskDate, description: taskDescription, status: taskStatus, priority: taskPriority };

    if (currentTask) {
        const taskIndex = tasks.findIndex(task => task.name === currentTask.querySelector('h2').textContent);
        tasks[taskIndex] = newTask;
    } else {
        tasks.push(newTask);
    }

    renderTasks();
    updateTaskCounters();
    closeModal();
};

// Render tasks
function renderTasks() {
    todoSection.innerHTML = '';
    inProgressSection.innerHTML = '';
    doneSection.innerHTML = '';

    tasks.forEach(task => {
        const taskHTML = createTaskHTML(task);

        if (task.status === 'do') {
            todoSection.innerHTML += taskHTML;
        } else if (task.status === 'doing') {
            inProgressSection.innerHTML += taskHTML;
        } else if (task.status === 'done') {
            doneSection.innerHTML += taskHTML;
        }
    });

    // Event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', openEditModal));
    document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', deleteTask));
}

// Priority Color
function createTaskHTML(task) {
    let priorityColor;

    switch (task.priority) {
        case 'P1':
            priorityColor = 'bg-red-500'; 
            break;
        case 'P2':
            priorityColor = 'bg-orange-500';
            break;
        case 'P3':
            priorityColor = 'bg-green-500'; 
            break;
        default:
            priorityColor = 'bg-gray-300';
    }

    return `
        <div class="task-card border rounded-md shadow-md p-4" data-status="${task.status}">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-bold">${task.name}</h2>
                <span class="text-sm text-gray-500">${task.date}</span>
            </div>
            <p class="text-gray-700 mt-2">${task.description}</p>
            <p class="text-sm text-gray-600">Priority: <span class="${priorityColor} text-white px-2 py-1 rounded">${task.priority}</span></p>
            <div class="flex justify-end gap-3 mt-4">
                <button class="edit-btn bg-amber-300 text-white py-2 px-4 rounded-md">Edit</button>
                <button class="delete-btn bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
            </div>
        </div>
    `;
}

// Open edit modal with current task data
function openEditModal(e) {
    const taskCard = e.target.closest('.task-card');
    const taskName = taskCard.querySelector('h2').textContent;
    const task = tasks.find(t => t.name === taskName);

    document.getElementById('task').value = task.name;
    document.getElementById('date').value = task.date;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;
    document.getElementById('priority').value = task.priority;

    currentTask = taskCard;
    openModal();
}

// Delete task function
function deleteTask(e) {
    const taskCard = e.target.closest('.task-card');
    const taskName = taskCard.querySelector('h2').textContent;

    tasks = tasks.filter(task => task.name !== taskName);
    renderTasks();
    updateTaskCounters();
}

renderTasks();
updateTaskCounters();
