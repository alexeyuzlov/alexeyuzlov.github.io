let el = document.getElementById('some-element');

// Все ноды
el.parentNode; // null если ещё не существует самого элемента not-found.html
el.childNodes; // NodeList
el.firstChild;
el.lastChild;
el.previousSibling;
el.nextSibling;

// Только ноды-элементы
el.parentElement;
el.children; // HTMLCollection
el.firstElementChild;
el.lastElementChild;
el.previousElementSibling;
el.nextElementSibling;

for (let element of el.children) {
    //
}
