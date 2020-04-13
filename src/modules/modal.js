import { createElement } from "docrel";
import { addNewProject, addNewTodo } from "../index.js";
import { compareAsc, format } from 'date-fns'

const renderProjectModal = () => {
    const modalContainer = createElement('div', { id: "modal-container" });
    const modal = createElement('div', { class: "modal" })

    const label = createElement('label', { textContent: "Name of your new project:" })
    const input = createElement('input', { type: "text", class: "modal-input" });

    const btnDiv = createElement('div', { class: "btn-container" });
    const addBtn = createElement('button', { class: "modal-btn add-btn", textContent: "Add" });
    const closeBtn = createElement('button', { class: "modal-btn close-btn", textContent: "Close" });

    btnDiv.appendChild(addBtn);
    btnDiv.appendChild(closeBtn);

    modal.appendChild(label);
    modal.appendChild(input);
    modal.appendChild(btnDiv);



    document.body.appendChild(modalContainer);
    modalContainer.appendChild(modal);

    setTimeout(function () {
        modal.style.transform = "translateY(300px)";
        modal.style.opacity = 1;
    }, 10);

    // modal.classList.add('open');

    input.focus();

    modalContainer.addEventListener('click', (e) => {
        if (e.target.id === 'modal-container' || e.target.classList.contains('close-btn')) {
            closeModal();
        }
    });



    addBtn.addEventListener('click', () => {
        const title = input.value;
        if (title === '') return;
        addNewProject(title);
        closeModal();
    })


}

const renderTodoModal = () => {
    const modalContainer = createElement('div', { id: "modal-container" });
    const modal = createElement('div', { class: "modal" })

    const inputDiv = createElement('div', { class: "input-container" });
    const labelTitle = createElement('label', { textContent: "Task title:" })
    const inputTitle = createElement('input', { attrs: { type: "text", class: 'modal-input' } });
    const labelDate = createElement('label', { textContent: "Date:" });
    const inputDate = createElement('input', { attrs: { type: "date" } });

    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });


    // inputDate.value = new Date().toDateInputValue();
    inputDate.valueAsDate = new Date();
    const labelTime = createElement('label', { textContent: "Time:" });
    const inputTime = createElement('input', { attrs: { type: 'time' } });

    let time = parseInt(format(new Date(), 'h')) + 1;
    time = `0${time}:00`;
    inputTime.defaultValue = time;
    let inputs = [labelTitle, inputTitle, labelDate, inputDate, labelTime, inputTime];
    inputs.forEach(input => inputDiv.appendChild(input));

    const btnDiv = createElement('div', { class: "btn-container" });
    const addBtn = createElement('button', { class: "modal-btn add-btn", textContent: "Add" });
    const closeBtn = createElement('button', { class: "modal-btn close-btn", textContent: "Close" });

    btnDiv.appendChild(addBtn);
    btnDiv.appendChild(closeBtn);

    modal.appendChild(inputDiv);
    modal.appendChild(btnDiv);

    document.body.appendChild(modalContainer);
    modalContainer.appendChild(modal);

    setTimeout(function () {
        modal.style.transform = "translateY(300px)";
        modal.style.opacity = 1;
    }, 10);

    inputTitle.focus();

    modalContainer.addEventListener('click', (e) => {
        if (e.target.id === 'modal-container' || e.target.classList.contains('close-btn')) {
            closeModal();
        }
    });

    addBtn.addEventListener('click', () => {
        const title = inputTitle.value;
        if (title === '') return;
        let date = new Date(inputDate.value + " " + inputTime.value);
        if (isNaN(date.getTime())) {
            alert('Invalid date');
            return;
        }
        date = format(date, 'd. MMM yyyy. hh:mm');
        addNewTodo(title, date);
        closeModal();
    });

};

const closeModal = () => {
    let modal = document.querySelector('#modal-container');
    modal.remove();
}

export { renderProjectModal, renderTodoModal, closeModal }