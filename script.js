// script.js

// retrieve todo from local storage or initialize as an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// get references to input, list, and other elements
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// initialize the app when the page loads
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask); // handle add task button click
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent default enter key behavior
      addTask(); // add task when enter is pressed
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks); // clear all tasks
  displayTasks(); // render tasks from local storage
});

// add a new task to the list
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false }); // add task with default unchecked state
    saveToLocalStorage(); // save updated list to local storage
    todoInput.value = ""; // clear input field
    displayTasks(); // refresh task list
  }
}

// render tasks on the page
function displayTasks() {
  todoList.innerHTML = ""; // clear current list
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;

    // add change event listener for checkbox
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p); // add task element to the list
  });
  todoCount.textContent = todo.length; // update task count
}

// allow editing a task's text
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text; // get current task text
  const inputElement = document.createElement("input");

  inputElement.value = existingText; // set input value to current text
  todoItem.replaceWith(inputElement); // replace text with input
  inputElement.focus(); // focus on the input

  // save updated text when input loses focus
  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText; // update task text
      saveToLocalStorage(); // save changes to local storage
    }
    displayTasks(); // refresh task list
  });
}

// toggle a task's completed state
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled; // switch disabled state
  saveToLocalStorage(); // save updated state to local storage
  displayTasks(); // refresh task list
}

// delete all tasks from the list
function deleteAllTasks() {
  todo = []; // clear the todo array
  saveToLocalStorage(); // clear local storage
  displayTasks(); // refresh task list
}

// save the todo array to local storage
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo)); // store as a string
}
