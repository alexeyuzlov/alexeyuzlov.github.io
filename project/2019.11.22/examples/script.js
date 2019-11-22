/**
 * @type {HTMLFormElement}
 */
let formEl = document.querySelector('.js-form');

let controlWrapperEl = formEl.querySelector('.js-form-control');

const FIELD_NAME = 'answer';

let answers = [
    {
        heading: 'First',
        value: 'html'
    },
    {
        heading: '2nd',
        value: 'css'
    },
    {
        heading: '3rd',
        value: 'js'
    }
];

function generateCheckbox({heading, value}) {
    return `
        <div class="form-control">
            <label>
                <input type="checkbox" name="${FIELD_NAME}" data-value="${value}" />
                <span>${heading}</span>
            </label>
        </div>
    `;
}

function extractCheckboxListValue(checkboxEls) {
    let result = [];

    /**
     * @param {HTMLInputElement} el
     */
    for (let el of checkboxEls) {
        if (el.checked) {
            result.push(el.dataset.value);
        }
    }

    return result;
}

function attachToForm(html) {
    let controlEl = document.createElement('div');
    controlEl.innerHTML = html;

    controlWrapperEl.append(controlEl);
}

function generateDynamicForm() {
    let controlHTML = '';
    answers.forEach((item) => {
        controlHTML += generateCheckbox(item)
    });

    attachToForm(controlHTML);
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    let formValue = {
        [FIELD_NAME]: extractCheckboxListValue(formEl.elements[FIELD_NAME])
    };

    console.info(formValue);

    // let formData = new FormData(formEl);
    // formData.forEach((value, key) => console.info(value, key));
});

generateDynamicForm();
