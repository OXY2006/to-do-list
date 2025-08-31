const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

async function loadTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();

  taskList.innerHTML = "";
  tasks.forEach(task => addTaskToUI(task));
}

addTaskBtn.addEventListener("click", async () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: taskText })
  });

  const newTask = await res.json();
  addTaskToUI(newTask);

  taskInput.value = "";
});

async function deleteTask(id, element) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  element.remove();
}

function addTaskToUI(task) {
  const li = document.createElement("li");
  li.textContent = task.description;

  const delBtn = document.createElement("span");
  delBtn.textContent = "✖";
  delBtn.addEventListener("click", () => deleteTask(task.id, li));

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

loadTasks();