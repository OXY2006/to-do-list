
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const message = document.getElementById("message");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = "<p style='text-align:center;color:#666;'>No tasks yet!</p>";
    return;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleComplete(index);

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTodo(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}


function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    showMessage("⚠️ Please enter a task!", "red");
    return;
  }

  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
  showMessage("✅ Task added!", "green");
  todoInput.value = "";
}


function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}


function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
  showMessage("🗑️ Task deleted!", "red");
}


function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  setTimeout(() => (message.textContent = ""), 2000);
}


addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTodo();
});


renderTodos();
