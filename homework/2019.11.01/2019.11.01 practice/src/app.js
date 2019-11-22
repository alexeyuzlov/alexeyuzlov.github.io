const productsRaw = require('../assets/db.json');
const Store = require('./store');
const Cart = require('./cart');
const OrderProcessor = require('./order-processor');

function app() {
    const store = new Store(productsRaw);

    const selectedProducts = store.search((item) => item.price < 200);

    const cart = new Cart(selectedProducts);

    const orderProcessor = new OrderProcessor(cart);
    const order = orderProcessor.createOrder();

    return order.finalPrice;
}

module.exports = app;
