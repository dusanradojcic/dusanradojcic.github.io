import { createElement } from "docrel"

const Todo = (id, title, date) => {
    return {id, title, date};
};

const renderTodo = (todo) => {
    const div = createElement('div', { class: "todo", attrs: {'data-order': `${todo.id}`}});

div.innerHTML = `
        <input type="checkbox" data-order=${todo.id}>
        <h2>${todo.title}</h2>
        <p>${todo.date}</p>
    `;
    return div;
};

export { Todo, renderTodo };
