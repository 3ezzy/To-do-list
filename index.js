// Get the modal and button elements
const modal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModal = document.getElementById('closeModal');

// Show modal when clicking "Add Task+"
addTaskBtn.onclick = function () {
    modal.classList.remove('hidden');
};

// Close modal when clicking the "Close" button
closeModal.onclick = function () {
    modal.classList.add('hidden');
};

// Handle form submission
const taskForm = document.getElementById('taskForm');

taskForm.onsubmit = function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const taskName = document.getElementById('task').value;
    const taskDate = document.getElementById('date').value;
    const taskDescription = document.getElementById('description').value;
    const taskStatus = document.getElementById('status').value;
    const taskPriority = document.getElementById('priority').value;

    // Create new task card
    const newTask = `
        <div class="border rounded-md shadow-md p-4">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-bold">${taskName}</h2>
                <span class="text-sm text-gray-500">${taskDate}</span>
            </div>
            <p class="text-gray-700 mt-2">${taskDescription}</p>
            <p class="text-sm text-gray-600">Priority: ${taskPriority}</p>
            <div class="flex justify-end gap-3 mt-4">
                <button class="bg-amber-300 text-white py-2 px-4 rounded-md">Edit</button>
                <button class="bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
            </div>
        </div>`;

    // Append task to the correct section based on status
    let section;
    if (taskStatus === "do") {
        section = document.getElementById('todo-section');
    } else if (taskStatus === "doing") {
        section = document.getElementById('in-progress-section');
    } else if (taskStatus === "done") {
        section = document.getElementById('done-section');
    }

    section.innerHTML += newTask;

    // Close modal after adding task
    modal.classList.add('hidden');

    // Optionally, reset form fields
    taskForm.reset();
};


// function clearForm (){
//     taskName.value = "";
//     taskDate.value = "";
//     taskDescription.value = "";
//     taskStatus.value = "";
//     taskPriority.value = "";
// }


