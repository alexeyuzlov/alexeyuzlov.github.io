class Paging {
    get totalPages() {
        return Math.ceil(this._total / this._pageSize);
    }

    constructor(total, pageSize) {
        this._total = total;
        this._pageSize = pageSize;
    }
}

class PaginationUIBuilder {
    get wrapperElement() {
        return this._paginationEl;
    }

    get pageElements() {
        return this.wrapperElement.children;
    }

    constructor(paging) {
        /**
         * @type {HTMLElement}
         */
        this._paginationEl = null;

        this._paging = paging;
    }

    generateUI() {
        this._generateWrapper();
        this._generatePages();
    }

    pageChange(pageNumber) {
        // override
    }

    destroy() {
        this._detachEvents();
    }

    _generateWrapper() {
        this._paginationEl = document.createElement('div');
        this._paginationEl.classList.add('pagination');
    }

    _generatePages() {
        for (let index = 0; index < this._paging.totalPages; index++) {
            let pageNumber = this._generatePageNumber(index);
            let pageEl = this._generatePage(pageNumber);
            this._paginationEl.append(pageEl);
        }
    }

    _generatePage(pageNumber) {
        let el = document.createElement('button');
        el.type = 'button';
        el.textContent = pageNumber;
        el.classList.add('pagination-item');

        this._attachClickOnPage(el, pageNumber);

        return el;
    }

    _generatePageNumber(index) {
        return index + 1;
    }

    _attachClickOnPage(el, pageNumber) {
        el.addEventListener('click', () => this.pageChange(pageNumber));
    }

    _detachEvents() {
        // TODO
    }
}

class PaginationUI {
    /**
     * @param {Paging} paging
     * @param {number} initialPage
     */
    constructor({initialPage = 1, pageElements}) {
        this._pageElements = pageElements;

        this.togglePage(initialPage);
        this._waitForPageChanging();
    }

    emitPage(pageNumber) {
        // external API
    }

    togglePage(pageNumber) {
        this._toggleActiveClasses(pageNumber);
        this.emitPage(pageNumber);
    }

    _waitForPageChanging() {
        // TODO listen custom user event
    }

    _toggleActiveClasses(pageNumber) {
        /**
         * @type {HTMLCollection}
         */
        let items = this._pageElements;

        for (let link of items) {
            link.classList.remove('active');
        }

        items[pageNumber - 1].classList.add('active');
    }
}

class UIFactory {
    static pagination({paging, successFn, initialPage = 1}) {
        let builder = new PaginationUIBuilder(paging);
        builder.generateUI();

        let pagingUI = new PaginationUI({
            wrapperElement: builder.wrapperElement,
            pageElements: builder.pageElements,
            initialPage
        });

        builder.pageChange = (pageNumber) => pagingUI.togglePage(pageNumber);

        successFn(builder.wrapperElement);

        return pagingUI;
    }
}

//////////////////////////

(function () {
    let blogPagingModel = new Paging(100, 10);
    let blogPagingUI = UIFactory.pagination({
        paging: blogPagingModel,
        initialPage: 5,
        successFn: (paginationEl) => document.body.append(paginationEl)
    });

    blogPagingUI.emitPage = (page) => {
        console.info('Blog page has been changed', page);
    };

    let chatPagingModel = new Paging(63, 12);
    let chatPagingUI = UIFactory.pagination({
        paging: chatPagingModel,
        successFn: (paginationEl) => document.body.append(paginationEl)
    });

    chatPagingUI.emitPage = (page) => {
        console.info('Chat page has been changed', page);
    };
})();
