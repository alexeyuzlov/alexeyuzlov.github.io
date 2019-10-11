document.querySelectorAll('a').forEach(function (item) {
    item.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    });
});
