let task;
let date;
let tasks = [];
let list = document.getElementById("lista_ul");

function fstLoad() {
  JSON.parse(localStorage.getItem("tasks"))
    ? (tasks = JSON.parse(localStorage.getItem("tasks")))
    : [];
  console.log("carregou");
  renderList();
  toggleEnjoyDay();
}

function toggleShowBallon(show) {
  let ballon = document.getElementById("plus_ballon").style;
  if (show) {
    ballon.display = "inline-block";
  } else {
    ballon.display = "none";
  }
}

function toggleDisplayForm() {
  let form = document.getElementById("form_new_task").style;
  let addBtn = document.getElementById("btn_plus");
  if (form.display == "block") {
    form.display = "none";
    addBtn.innerHTML = "<i class='fas fa-plus'></i>";
  } else {
    form.display = "block";
    addBtn.innerHTML = "<i class='fas fa-minus'></i>";
  }
}

function addTask() {
  task = document.getElementById("task").value;
  date = document.getElementById("date").value;
  if (!task) {
    alert("Tarefa vazia. Insira um nome.");
    return;
  }
  let dateInput = new Date(date);
  let d = new Date();
  let dateToday = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  // ALERTA DE GAMBIERRA
  if (dateInput.getTime() + 10800000 < dateToday.getTime()) {
    alert("Data invalida - insira a data atual ou futura");
    return;
  }
  tasks.push({
    taskName: task,
    taskDate: date,
  });
  toggleEnjoyDay();
  // list = document.getElementById("lista_ul");
  renderList();
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
}

function resetTask() {
  task = document.getElementById("task");
  date = document.getElementById("date");
  if (!task.value) {
    alert("Tarefa ja está vazia.");
    return;
  }
  task.value = "";
  date.value = "";
}

function deleteTask(index, amount) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == tasks[index]) {
      tasks.splice(index, amount);
      list.innerHTML = "";
      renderList();
    }
  }
  toggleEnjoyDay();
}

function renderList() {
  list.innerHTML = "";
  tasks.forEach((e, i) => {
    list.innerHTML +=
      "<li><input id= check-" +
      i +
      " type='checkbox'><label for=check-" +
      i +
      "><span>" +
      e.taskName +
      "</span><span>" +
      e.taskDate +
      "</pan>";
    ("</label></li>");
    //   "<li><p>" +
    //   e.taskName +
    //   "</p><p>" +
    //   e.taskDate +
    //   "</p><div class='btns'><button class='btn_yellow' onclick='deleteTask(" +
    //   i +
    //   ", 1)'>X</button><button class='btn_yellow' onclick='deleteTask(" +
    //   i +
    //   ", 1)'>Done</button><button class='btn_yellow' onclick='togglePopUp(" +
    //   i +
    //   ")'>Edit</button></div></li>";
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleEnjoyDay() {
  let noTask = document.getElementById("done").style;
  if (tasks.length > 0) {
    noTask.display = "none";
  } else {
    noTask.display = "block";
  }
}

function clearList() {
  if (tasks.length <= 0) {
    alert("A lista ja está vazia.");
    return;
  }
  deleteTask(0, tasks.length);
  localStorage.clear();
  renderList();
  toggleEnjoyDay();
}

function editTask(index) {
  let item = tasks[index];
  item.taskName;
  item.taskDate;
}

function togglePopUp(index) {
  let popUp = document.getElementById("edit_task_form").style;
  if (popUp.display == "block") {
    popUp.display = "none";
  } else {
    popUp.display = "block";
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i] == tasks[index]) {
        document.getElementById("taskEdit").value = tasks[index].taskName;
        document.getElementById("dateEdit").value = tasks[index].taskDate;
        document.getElementById("indexEdit").value = index;
      }
    }
  }
}

function saveChanges() {
  let index = document.getElementById("indexEdit").value;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == tasks[index]) {
      tasks[index].taskName = document.getElementById("taskEdit").value;
      tasks[index].taskDate = document.getElementById("dateEdit").value;
    }
  }
  renderList();
  togglePopUp("");
}

let mode = "dark";
let modeHtml = document.getElementById("mode");
let body = document.querySelector("body");
let taskList = document.getElementById("task_list");
let header = document.getElementById("bg-header");
let formNewTask = document.getElementById("form_new_task");

modeHtml.innerHTML = "<img src='img/sun.ico'></img>";

function changeMode() {
  if (mode === "dark") {
    mode = "light";
    modeHtml = document.getElementById("mode").innerHTML =
      "<img src='img/moon.ico'></img>";
    body.classList = "light-mode";
    taskList.classList = "tasks_list_light";
    header.classList = "bg-header-light";
    formNewTask.classList = "form_new_task_light";
  } else {
    mode = "dark";
    modeHtml = document.getElementById("mode").innerHTML =
      "<img src='img/sun.ico'></img>";
    body.classList = "dark-mode";
    taskList.classList = "tasks_list_dark";
    header.classList = "bg-header-dark";
    formNewTask.classList = "form_new_task_dark";
  }
}
