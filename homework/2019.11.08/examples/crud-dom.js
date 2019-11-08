// поиск
document.querySelectorAll(); // static NodeList
document.querySelector();
el.querySelectorAll(); // Element
el.querySelector();

// проверка отношений элементов
el.contains(nodeEl);
el.closest('.parent-element-via-selecor');

// устаревшие поиски
document.getElementById('some-id'); // Element
document.getElementsByClassName('some-classname'); // // HTMLCollection устарело, лучше querySelector
// getElementsBy*

// Создание
// элемент создан, но не является частью веб-страницы
/**
 * @type {HTMLElement}
 */
let nodeEl = document.createElement(tag); // ctrl + left-click
let text = document.createTextNode('Some Text');

// Вставка
// elem = ...nodes or strings
nodeEl.append(smth); // добавляет узлы или строки в конец node,
nodeEl.prepend(elem);// вставляет узлы или строки в начало node,
nodeEl.before(elem); // вставляет узлы или строки до node,
nodeEl.after(elem); // вставляет узлы или строки после node,
nodeEl.replaceWith(elem); // заменяет node заданными узлами или строками.

nodeEl.insertAdjacentHTML(position, html);
nodeEl.insertAdjacentText(position, text);
nodeEl.insertAdjacentElement(position, element);

elem.cloneNode(bool);

// Удаление
nodeEl.remove(elem);
nodeEl.parentElement.removeChild(nodeEl); // old way
