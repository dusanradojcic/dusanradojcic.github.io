import { createElement } from "docrel"
import { mainDiv } from "./modules/maindiv.js"
import { Project, renderProject } from "./modules/project.js";
import { Todo, renderTodo } from "./modules/todo.js"
import css from "./style.css";
import { renderProjectModal, renderTodoModal, closeModal } from "./modules/modal.js";

let projects = [];
let projectId = 1;


const contentDiv = document.querySelector('#content');
const projectList = createElement('div', { class: "project-list" });
const heading = createElement('h1', { textContent: "Your projects" });
projectList.appendChild(heading);


const todoList = createElement('div', { class: "todo-list" });
const heading2 = createElement('h1', { textContent: "Project no.1" });
todoList.appendChild(heading2);

mainDiv.appendChild(projectList);
mainDiv.appendChild(todoList);
contentDiv.appendChild(mainDiv);



const addNewProject = (title) => {
  const project = Project(title, projectId++);
  projects.push(project);
  renderProjectList();
}

const addNewTodo = (title, date) => {
  const index = parseInt(todoList.firstChild.dataset.project) - 1;
  const projekat = projects[index];
  const todo = Todo(projekat.todoIndex, title, date);
  projekat.todoIndex++;
  projekat.todoList.push(todo);
  renderTodoList(projects[index]);
}


const button1 = createElement('button', { class: 'button-main', textContent: 'Add new project' });


const renderProjectList = () => {
  projectList.innerHTML = `<h1>Your projects</h1>`;
  projects.forEach(project => projectList.appendChild(renderProject(project)));
  projectList.appendChild(button1);
}

const button2 = createElement('button', { class: 'button-main', textContent: 'Add new task' });

const renderTodoList = (project) => {
  todoList.innerHTML = `<h1 data-project=${project.id}>${project.title}</h1>`;
  project.todoList.forEach(todo => todoList.appendChild(renderTodo(todo)));
  todoList.appendChild(button2);
}


const changeProject = (e) => {
  if (!e.target.dataset.id) {
    return;
  }
  const index = parseInt(e.target.dataset.id) - 1;
  const project = projects[index];
  renderTodoList(project);
}






let prj = Project("Prvi projekat", projectId++);
projects.push(prj);

prj.todoList.push(Todo(1, "First tood", new Date()));

renderProjectList();
renderTodoList(prj);



const addPrj = (e) => {
  if (e.target.classList.contains('button-main')) {
    e.target.blur();
    renderProjectModal();
  }
}
/*
const addTodo = () => {
  const title = prompt('Unesite todo');
  if (title) {
    addNewTodo(title);
  }
}*/


projectList.addEventListener('click', changeProject);
projectList.addEventListener('click', addPrj);
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27 && document.querySelector('#modal-container')) {
    closeModal();
  }
})
todoList.addEventListener('click', (e) => {

  if (e.target.type === 'checkbox') {

      e.target.parentElement.classList.toggle('checked');
    
  }
})

button2.addEventListener('click', renderTodoModal);


export { addNewProject, addNewTodo }