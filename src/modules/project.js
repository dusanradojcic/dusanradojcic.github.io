import { createElement } from "docrel"

const Project = (title, id) => {
    let todoList = [];
    let todoIndex = 1;
    return { title, id, todoList, todoIndex };
};

const renderProject = (project) => {
    const div = createElement('div', { class: "project-item", attrs: { "data-id": project.id } });
    div.innerHTML = `
        <h2 data-id="${project.id}">${project.title}</h2>
            `;
    return div;
};

export { Project, renderProject };