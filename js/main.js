const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");

// Загрузить данные
loadData();

// Добавление новой задачи
form.addEventListener("submit", function (event) {
  // Отменяем стандартное поведение при отправке формы ( перезагрузку страницы)
  event.preventDefault();

  // Берем текст введенный пользователем в поле ввода
  const taskText = input.value;

  // Формируем разметку для новой задачи
  const taskHTML = `<li class="list-group-item">
                     <span contenteditable="true" class="task-title">${taskText}</span>
                     <div>
                         <button type="button" data-action="ready" class="btn">Готово</button>
                         <button type="button" data-action="delete-task" class="btn">Удалить</button>
                     </div>
                 </li>`;
  // Добавляем новую задачу
  tasksList.insertAdjacentHTML("afterbegin", taskHTML);

  // Скрываем или показываем "Список дел пуст"
  toggleEmptyListItem();

  input.value = "";

  // Возвращает фокус на поле ввода после добавления новой задачи
  input.focus();

  // Сохранить данные
  saveData();
});

// Кнопки готово и удалить
tasksList.addEventListener("click", function (event) {
  if (event.target.getAttribute("data-action") == "delete-task") {
    event.target.closest("li.list-group-item").remove();

    // Скрываем или показываем "Список дел пуст"
    toggleEmptyListItem();
    // Сохранить данные
    saveData();
  } else if (event.target.getAttribute("data-action") == "ready") {
    // Находим родительский тег <li>
    const parentElement = event.target.closest("li.list-group-item");
    // Находим тег <span> и добавляем к нему класс task-title--done
    parentElement
      .querySelector("span.task-title")
      .classList.add("task-title--done");
    // Убираем у тега <span> атрибут contenteditable
    parentElement
      .querySelector("span.task-title")
      .setAttribute("contenteditable", false);
    // Перемещаем в конец списка
    tasksList.insertAdjacentElement("beforeend", parentElement);
    // Удалить кнопку Готово
    parentElement.querySelector('button[data-action="ready"]').remove();
    // Сохранить данные
    saveData();
  }
});
// Функция сокрытия или показа "список дел пуст"
function toggleEmptyListItem() {
  if (tasksList.children.length > 1) {
    document.querySelector("#empty-list-item").style.display = "none";
  } else {
    document.querySelector("#empty-list-item").style.display = "block";
  }
}

// Функция сохранения данных
function saveData() {
  localStorage.setItem("todoList", tasksList.innerHTML);
}
// Функция загрузки данных
function loadData() {
  if (localStorage.getItem("todoList")) {
    tasksList.innerHTML = localStorage.getItem("todoList");
  }
}