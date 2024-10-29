    // Get the modal and button elements
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModal = document.getElementById('closeModal');

    // Show modal when clicking "Add Task+"
    addTaskBtn.onclick = function () {
        modal.classList.remove('hidden');
    }

    // Close modal when clicking the "Close" button
    closeModal.onclick = function () {
        modal.classList.add('hidden');
    }
