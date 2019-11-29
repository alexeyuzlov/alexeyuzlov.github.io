class RestService {
    get apiUrl() {
        return 'http://localhost:3000/';
    }

    getAll(endpoint) {
        return fetch(`${this.apiUrl}${endpoint}`)
            .then((response) => response.json())
    }

    create(endpoint, body) {
        return fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    remove(endpoint) {
        return fetch(`${this.apiUrl}${endpoint}`, {
            method: 'DELETE'
        })
    }
}

let restService = new RestService();
let createBtnEl = document.querySelector('.js-add');
let dataEl = document.querySelector('.js-data');

function removePost(id) {
    restService.remove(`posts/${id}`).then(
        () => printAll()
    );
}

function generateRow({id, author, title}) {
    return `
<tr>
    <td>${id}</td>
    <td>${author}</td>
    <td>${title}</td>
    <td>
        <button type="button" onclick="removePost(${id})">Remove</button>
    </td>
</tr>                
`;
}

function generateTable(rows) {
    return `
<table>
    <thead>
    <tr>
        <th>id</th>
        <th>title</th>
        <th>author</th>
        <th>actions</th>
    </tr>
    </thead>
    <tbody>${rows}</tbody>
</table>
    `
}

function printAll() {
    restService.getAll(`posts/`).then(
        (data) => {
            let rows = data.map((item) => generateRow(item)).join('');
            dataEl.innerHTML = generateTable(rows);
        }
    );
}

createBtnEl.addEventListener('click', () => {
    const post = {
        title: 'hello',
        author: 'world'
    };

    restService.create(`posts`, post).then(
        () => printAll()
    )
});

printAll();
