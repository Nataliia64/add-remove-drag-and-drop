let wrapper = document.querySelector(".wrapper");
const addTasks = document.querySelector(".add_task");

//добавляем новые ряды
addTasks.addEventListener("click", addOneTask);
function addOneTask() {
  let newPlaceholder = document.querySelector(".placeholder").cloneNode(true);
  wrapper.append(newPlaceholder);
  newPlaceholder.classList.remove("hide"); 
  newPlaceholder.querySelector(".input").focus();
}
//попытка избавиться от ошибки, не получилось 
/*wrapper.addEventListener("click", noMistakes);
function noMistakes(event){
  let wrapper = document.querySelector(".wrapper");
  let removeTask = event.target.closest(".remove_task");
  let saveMyTask = event.target.closest(".save_task");
  let taskContent = event.target.closest(".task_content");
  let writeTask = taskContent.querySelector(".input");
  if ((!saveMyTask)||(!removeTask)||(!writeTask)) return;
  if ((!wrapper.contains(saveMyTask))||(!wrapper.contains(removeTask))||(!wrapper.contains(writeTask))) return;
  //if (!wrapper.contains(removeTask)) return;
}*/

//удаляем ряды
wrapper.addEventListener("click", removeOneTask);
function removeOneTask(event) {
  let removeTask = event.target.closest(".remove_task");
  if (!removeTask) return;
  if (!wrapper.contains(removeTask)) return;
  removeTask.closest(".placeholder").remove();
}

//сохраняем задание по клику на "save task"
wrapper.addEventListener("click", saveTask);
function saveTask(event) {
  let saveMyTask = event.target.closest(".save_task");
  let taskContent = event.target.closest(".task_content");
  let writeTask = taskContent.querySelector(".input");//при клике на любой элемент внутри wrapper выдает в консоли ошибку Uncaught TypeError: Cannot read properties of null (reading 'querySelector') at HTMLDivElement.saveTask (main.js:46:31)
  if(!saveMyTask) return;
  if (!wrapper.contains(saveMyTask)) return;
  saveMyTask.remove();
  writeTask.setAttribute("readonly", "");  
}

//добавляем драг на карточки
wrapper.addEventListener("dragstart", dragstart);
function dragstart(event) {
  let card = event.target.closest(".card");
  if (!card) return;
  if (!wrapper.contains(card)) return;
  setTimeout(() => card.classList.add("hide"), 0);
  card.classList.add("hovered", "card_drop");
  card.querySelector(".input").classList.add("hovered");
}

wrapper.addEventListener("dragend", dragend);
function dragend(event) {
  let card = event.target.closest(".card");
  if (!card) return;
  if (!wrapper.contains(card)) return;
  card.classList.remove("hovered", "hide");
  card.querySelector(".input").classList.remove("hovered");
}

//добавляем дроп на ячейки
wrapper.addEventListener("dragenter", dragenter);
wrapper.addEventListener("dragover", dragover);
wrapper.addEventListener("dragleave", dragleave);
wrapper.addEventListener("drop", dragdrop);

function dragenter(event) {
  let cell = event.target.closest(".cell");
  if (!cell) return;
  if (!wrapper.contains(cell)) return;
  cell.classList.add("highlight");
}
function dragover(event) {
  let cell = event.target.closest(".cell");
  if (!cell) return;
  if (!wrapper.contains(cell)) return;
  event.preventDefault();
}
function dragleave(event) {
  let cell = event.target.closest(".cell");
  if (!cell) return;
  if (!wrapper.contains(cell)) return;
  cell.classList.remove("highlight");
}

function dragdrop(event) {
  event.target.classList.remove("highlight");
  let cell = event.target.closest(".cell");
  let droppedCard = document.querySelector(".card_drop");
  if (!cell) return;
  if (!wrapper.contains(cell)) return;
  if (
      !cell.querySelector(".card")==""
  ) {
    
    droppedCard.classList.remove("card_drop");
    cell.classList.remove("highlight");
    alert("place occupied");
  } else {
    event.target.append(document.querySelector(".card_drop"));
    droppedCard.classList.remove("card_drop");
  }
}

