const Order = require('./order');

class OrderProcessor {
    constructor(cart) {
        this._cart = cart;
    }

    createOrder() {
        const price = this._cart.getTotalPrice();
        return new Order(price);
    }
}

module.exports = OrderProcessor;
