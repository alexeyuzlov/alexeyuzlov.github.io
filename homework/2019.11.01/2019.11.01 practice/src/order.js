class Order {
    get finalPrice() {
        return this._finalPrice;
    }

    get createdAt() {
        return this._createdAt;
    }

    constructor(price) {
        this._finalPrice = price;
        this._createdAt = new Date();
    }
}

module.exports = Order;
