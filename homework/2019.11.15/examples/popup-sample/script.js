const OFFSET_X = 8; // plus triangle-size
const OFFSET_Y = 8; // plus triangle-size

let dynamicAreaEl = document.querySelector('.dynamic-area');

// never use classes like this one in your real projects!
class Geometry {
    get parentCenterX() {
        return Math.floor(this.parentElRect.width / 2);
    }

    get parentStartX() {
        return this.parentElRect.left;
    }

    get parentEndY() {
        return this.parentElRect.bottom;
    }

    get centerX() {
        return Math.floor(this.elRect.width / 2);
    }

    get windowStartX() {
        return OFFSET_X;
    }

    get parentStartY() {
        return this.parentElRect.top;
    }

    constructor({parentElRect, elRect}) {
        this.parentElRect = parentElRect;
        this.elRect = elRect;
    }

    tryOpenToTheBottom() {
        let x = this.parentStartX + this.parentCenterX - this.centerX;
        let y = this.parentEndY + OFFSET_Y;

        return {
            x,
            y
        }
    }

    tryOpenToTheLeft() {
        // return {x, y}
    }

    isValidX(x) {
        return x > this.windowStartX; // and less then windowEndX
    }

    isValidY(y) {
        return y < getWindowHeight(); // and more then windowStartY
    }
}

function getCoordinates({parentElRect, elRect}) {
    let geometry = new Geometry({parentElRect, elRect});

    let coords = geometry.tryOpenToTheBottom();
    // should be valid x, y if not
    // 1. try to apply fix to x, y before try next side
    // 2. check all possible cases before open popup as modal: bottom -> right -> top -> left

    return {
        x: coords.x,
        y: coords.y
    }
}

function open(toggleEl) {
    let originalPopupEl = toggleEl.nextElementSibling;
    let popupEl = originalPopupEl.cloneNode(true);
    popupEl.style.display = 'block';
    popupEl.cloneNode();
    dynamicAreaEl.append(popupEl);

    // make sure you should recalculate window and toggleEl / popupEl positions every time when popup open
    let parentElRect = toggleEl.getBoundingClientRect();
    let elRect = popupEl.getBoundingClientRect();

    let coordinates = getCoordinates({parentElRect, elRect});

    popupEl.style.left = coordinates.x + 'px';
    popupEl.style.top = coordinates.y + 'px';
}

function closeAll() {
    dynamicAreaEl.innerHTML = '';
}

// obviously it's not the best example how to handle multiple items inside dynamic area
document.addEventListener('click', ($event) => {
    /**
     * @type {HTMLElement}
     */
    let el = $event.target;
    if (el.closest('.toggle')) {
        let isAnyOpened = dynamicAreaEl.children.length !== 0;
        if (isAnyOpened) {
            closeAll();
        } else {
            open(el);
        }
    } else {
        closeAll();
    }
});

// https://www.w3schools.com/jsref/prop_win_innerheight.asp
function getWindowHeight() {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
}

function getWindowWidth() {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}
