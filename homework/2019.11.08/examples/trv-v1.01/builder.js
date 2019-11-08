class AppMath {
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class IncrementCounter {
    constructor() {
        this._counter = 0;
    }

    next() {
        let current = this._counter;
        this._counter++;
        return current;
    }
}

class Pool {
    constructor(pool) {
        this._pool = pool;
    }

    getRandomItem({zIndex, top, left}) {
        let index = AppMath.random(0, this._pool.length - 1);

        let box = this._pool.item(index).cloneNode(true);

        box.style.left = `${left}px`;
        box.style.top = `${top}px`;
        box.style.zIndex = zIndex.toString();

        return box;
    }
}

class PoolItemFactory {
    constructor(pool) {
        this._pool = pool;
    }

    createRandomElement({zIndex, left, top}) {
        return this._pool.getRandomItem({
            zIndex,
            left,
            top
        });
    }
}

const ACTIVE_CLASS = 'active';

class Builder {
    constructor(builderAreaEl, pool) {
        this._builderAreaEl = builderAreaEl;
        this._counter = new IncrementCounter();
        this._factory = new PoolItemFactory(pool);

        this._isEditableMode = true;
    }

    init() {
        this._initClickListener();
        this._initKeyboardListener();
    }

    appendElement(element) {
        this._builderAreaEl.append(element);
    }

    removeSelectedElement() {
        let element = this._builderAreaEl.querySelector(`.${ACTIVE_CLASS}`);

        try {
            element.remove();
        } catch (e) {
            console.warn(e);
        }
    }

    bubbleExistElement(element) {
        if (element.classList.contains('active')) {
            return;
        }

        this.toggleActiveElement(element);
        let index = this._counter.next();
        element.style.zIndex = index.toString();
    }

    toggleActiveElement(element) {
        this.unselectAllElements();
        element.classList.add(ACTIVE_CLASS);
    }

    unselectAllElements() {
        let items = this._builderAreaEl.children;
        for (let item of items) {
            item.classList.remove(ACTIVE_CLASS);
        }
    }

    toggleMode() {
        this._isEditableMode = !this._isEditableMode;
        this.unselectAllElements();
        console.info('Is editable', this._isEditableMode);
    }

    _initClickListener() {
        this._builderAreaEl.addEventListener('click', (event) => {
            if (!this._isEditableMode) {
                return;
            }

            let exist = event.target.closest('.pool-item');
            if (exist) {
                this.bubbleExistElement(exist);
                return;
            }

            let element = this._factory.createRandomElement({
                zIndex: this._counter.next(),
                left: event.clientX,
                top: event.clientY
            });

            this.appendElement(element);
            this.toggleActiveElement(element);
        });
    }

    _initKeyboardListener() {
        this._builderAreaEl.addEventListener('keydown', (event) => {
            // btw, non cross browser yet
            switch (event.key) {
                case 'Delete':
                    this.removeSelectedElement();
                    return;
                case 'Enter':
                    this.toggleMode();
                    return;
                default:
                // nothing
            }
        });
    }
}
