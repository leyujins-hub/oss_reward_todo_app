const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const priorityInput = document.getElementById("priorityInput");
const todoList = document.getElementById("todoList");
const completeText = document.getElementById("completeText");

const recommendButton = document.getElementById("recommendButton");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

let todos = [];
let completeCount = 0;

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = todoInput.value.trim();
  const priority = priorityInput.value;

  if (title === "") {
    alert("할 일을 입력해주세요.");
    return;
  }

  const todo = {
    id: Date.now(),
    title: title,
    priority: priority,
    done: false,
  };

  todos.push(todo);
  todoInput.value = "";

  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.priority}`;

    if (todo.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
      <span>${todo.title}</span>
      <button onclick="toggleTodo(${todo.id})">
        ${todo.done ? "취소" : "완료"}
      </button>
    `;

    todoList.appendChild(li);
  });

  completeText.textContent = `완료한 과제: ${completeCount}개`;
}

function toggleTodo(id) {
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      if (!todo.done) {
        completeCount++;
      } else {
        completeCount--;
      }

      return {
        ...todo,
        done: !todo.done,
      };
    }

    return todo;
  });

  renderTodos();
}

recommendButton.addEventListener("click", function () {
  popup.classList.remove("hidden");
});

closePopup.addEventListener("click", function () {
  popup.classList.add("hidden");
});