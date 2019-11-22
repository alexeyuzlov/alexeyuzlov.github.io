class Cart {
    constructor(products = []) {
        this._items = [];

        this.addProducts(products);
    }

    getTotalProducts() {
        return this._items.length;
    }

    addProducts(products) {
        products.map((item) => this._add(item));
    }

    getTotalPrice() {
        return this._items.reduce((prev, current) => {
            return prev + current.price;
        }, 0);
    }

    _add(product) {
        this._items.push(product);
    }
}

module.exports = Cart;
