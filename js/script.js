// ---------------- Capturing elements -----------------------------
const addTodoButton = document.querySelector("#add-todo button");
const todoUList = document.querySelector("#todo-ul");
const addTodoInput = document.querySelector("#add-todo-input");

// -------------- Event Listeners --------------------

addTodoInput.addEventListener("input", (e) => {
  addTodoInputValue = e.target.value;
});

addTodoButton.addEventListener("click", (e) => {
  // create a todo object (id, text, isCompleted:false)
  let newTodo = { id: Date.now(), text: addTodoInputValue, isCompleted: false };
  // Initialize empty array or get the one in LS if exists
  let todoItemsArray = JSON.parse(localStorage.getItem("todoItemsArray"))
    ? JSON.parse(localStorage.getItem("todoItemsArray"))
    : [];
  // push newTodo to todoItemsArray
  todoItemsArray.push(newTodo);
  // Save ib LS
  saveTodoItemsArrayInLocalStorage(todoItemsArray);
  // Display using data stored in LS
  displayAllTodoItems(todoItemsArray);
});

// -------------- Functions --------------------

function createTodoItemUI(id, text, isCompleted) {
  const li = document.createElement("li");
  const article = document.createElement("article");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const button = document.createElement("button");
  li.classList.add("list-items", "br8", "m1");
  li.setAttribute("id", `li-${id}`);
  button.textContent = "Delete";
  button.classList.add("btn1");
  button.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("id").slice(3); //string
    deleteTodoItem(Number(id));
  });
  label.textContent = text;
  label.setAttribute("for", `todo-${id}`);
  label.classList.add("ml1");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", `todo-${id}`);
  input.setAttribute("name", `todo-${id}`);
  input.checked = isCompleted;
  input.addEventListener("change", (e) => updateItem(e));
  form.append(input);
  form.append(label);
  article.append(form);
  article.append(button);
  li.append(article);
  return li;
}

function updateItem(e) {
  // Retrieve Todos from LS
  let todoItemsArray = JSON.parse(localStorage.getItem("todoItemsArray"));
  // Bake new array with updated isCompleted boolean
  newArray = todoItemsArray.map((todoItem) => {
    return todoItem.id == e.target.getAttribute("id").slice(5)
      ? { ...todoItem, isCompleted: e.target.checked }
      : todoItem;
  });
  // Save new array in LS
  saveTodoItemsArrayInLocalStorage(newArray);
  // Display with data in LS
  displayAllTodoItems();
}

function deleteTodoItem(id) {
  // Retrieve Todos from LS
  let todoItemsArray = JSON.parse(localStorage.getItem("todoItemsArray"));
  // Update array by removing deleted item
  todoItemsArray = todoItemsArray.filter((todoItem) => todoItem.id !== id);
  // Save in LS
  saveTodoItemsArrayInLocalStorage(todoItemsArray);
  // Display using data stored in LS
  displayAllTodoItems(todoItemsArray);
}

function displayAllTodoItems() {
  // Initialize empty todos array
  let todoItemsArray = [];
  // EMpty the ul
  todoUList.textContent = "";
  // check LS
  if (localStorage.getItem("todoItemsArray")) {
    todoItemsArray = JSON.parse(localStorage.getItem("todoItemsArray"));
  }
  // Paint new ul with updated li's
  todoItemsArray.forEach((todoItem) => {
    todoUList.append(
      createTodoItemUI(todoItem.id, todoItem.text, todoItem.isCompleted)
    );
  });
}

function saveTodoItemsArrayInLocalStorage(todoItemsArray) {
  localStorage.setItem("todoItemsArray", JSON.stringify([...todoItemsArray]));
}

// -------------- Initialization --------------------
let addTodoInputValue;

function init() {
  displayAllTodoItems();
}

init();
