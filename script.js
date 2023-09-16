document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            // Add event listeners for edit and delete buttons
            const editButton = li.querySelector(".edit-button");
            const deleteButton = li.querySelector(".delete-button");

            editButton.addEventListener("click", () => editTask(index));
            deleteButton.addEventListener("click", () => deleteTask(index));

            taskList.appendChild(li);
        });
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    }

    function editTask(index) {
        const updatedTask = prompt("Edit task:", tasks[index]);
        if (updatedTask !== null) {
            tasks[index] = updatedTask.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }

    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }

    addTaskButton.addEventListener("click", addTask);
    renderTasks();
});
