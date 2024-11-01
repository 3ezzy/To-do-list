// Get the modal and button elements
const modal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModal = document.getElementById('closeModal');
let currentTask = null; // To keep track of the task being edited

// Show modal when clicking "Add Task+"
addTaskBtn.onclick = function () {
    modal.classList.remove('hidden');
    currentTask = null; // Reset current task
    taskForm.reset(); // Reset form fields
};

// Close modal when clicking the "Close" button
closeModal.onclick = function () {
    modal.classList.add('hidden');
};

// Handle form submission
const taskForm = document.getElementById('taskForm');

taskForm.onsubmit = function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // form values
    const taskName = document.getElementById('task').value;
    const taskDate = document.getElementById('date').value;
    const taskDescription = document.getElementById('description').value;
    const taskStatus = document.getElementById('status').value;
    const taskPriority = document.getElementById('priority').value;

    if (currentTask) {
        // Update existing task
        currentTask.querySelector('h2').textContent = taskName;
        currentTask.querySelector('span').textContent = taskDate;
        currentTask.querySelector('p').textContent = taskDescription;
        currentTask.querySelector('.text-sm.text-gray-600').textContent = `Priority: ${taskPriority}`;

        // Update the task status in the appropriate section
        const previousStatus = currentTask.dataset.status;
        if (previousStatus !== taskStatus) {
            // Move task to the new section based on updated status
            currentTask.remove();
            addTaskToSection(taskStatus, currentTask);
        }
    } else {
        // Create new task card
        const newTask = document.createElement('div');
        newTask.classList.add('border', 'rounded-md', 'shadow-md', 'p-4');
        newTask.innerHTML = `
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-bold">${taskName}</h2>
                <span class="text-sm text-gray-500">${taskDate}</span>
            </div>
            <p class="text-gray-700 mt-2">${taskDescription}</p>
            <p class="text-sm text-gray-600">Priority: ${taskPriority}</p>
            <div class="flex justify-end gap-3 mt-4">
                <button class="edit-btn bg-amber-300 text-white py-2 px-4 rounded-md">Edit</button>
                <button class="delete-btn bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
            </div>
        `;

        // Append task to the correct section based on status
        addTaskToSection(taskStatus, newTask);
    }

    // Close modal after adding/updating task
    modal.classList.add('hidden');

    // Optionally, reset form fields
    taskForm.reset();
};

// Function to add task to the correct section
function addTaskToSection(status, taskElement) {
    let section;
    if (status === "do") {
        section = document.getElementById('todo-section');
    } else if (status === "doing") {
        section = document.getElementById('in-progress-section');
    } else if (status === "done") {
        section = document.getElementById('done-section');
    }

    taskElement.dataset.status = status; // Store the status in a data attribute
    section.appendChild(taskElement);

    // Add event listeners for the new task's buttons
    addTaskEventListeners(taskElement);
}

// Function to add event listeners to task buttons
function addTaskEventListeners(taskElement) {
    taskElement.querySelector('.delete-btn').addEventListener('click', function () {
        taskElement.remove();
    });

    taskElement.querySelector('.edit-btn').addEventListener('click', function () {
        // Populate the form with existing task details
        document.getElementById('task').value = taskElement.querySelector('h2').textContent;
        document.getElementById('date').value = taskElement.querySelector('span').textContent;
        document.getElementById('description').value = taskElement.querySelector('p').textContent;

        // Set the priority
        const priorityText = taskElement.querySelector('.text-sm.text-gray-600').textContent;
        document.getElementById('priority').value = priorityText.includes('P1') ? 'P1' : 
            priorityText.includes('P2') ? 'P2' : 'P3';

        // Set the status
        const taskStatus = taskElement.dataset.status; // Get status from data attribute
        document.getElementById('status').value = taskStatus;

        // Set currentTask to the task being edited
        currentTask = taskElement;

        // Show modal
        modal.classList.remove('hidden');
    });
}
