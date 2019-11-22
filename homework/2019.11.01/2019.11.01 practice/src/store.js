const {toProduct} = require('./product');

class Store {
    constructor(rawProducts) {
        this._products = rawProducts.map(toProduct);
    }

    getTotalProducts() {
        return this._products.length;
    }

    search(predicateFn) {
        return this._products.filter(predicateFn);
    }
}

module.exports = Store;
