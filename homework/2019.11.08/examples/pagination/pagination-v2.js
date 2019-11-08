// utils
function iterate(total) {
    return Array(total).fill();
}

function list(fn, total) {
    return iterate(total).reduce((prev, current, index) => prev + fn(prev, current, index), '');
}
// end utils

function paginationUI(pagesTotal) {
    const pages = list((prev, current, index) => pageUI(index + 1), pagesTotal);
    return `<div class="pagination">${pages}</div>`;
}

function pageUI(pageNumber) {
    return `<button class="pagination-item" type="button" onclick="togglePage(this)">${pageNumber}</button>`;
}

function togglePage(el) {
    for (let item of document.querySelectorAll('.pagination-item')) {
        item.classList.remove('active');
    }

    el.classList.add('active');
}

function app() {
    const total = 100;
    const pageSize = 10;
    const totalPage = Math.ceil(total / pageSize);

    let el =document.createElement('div');
    el.innerHTML = paginationUI(totalPage);
    document.body.append(el);

    document.querySelector('.pagination-item').classList.add('active');
}

app();
