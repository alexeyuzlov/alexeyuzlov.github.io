const OrderProcessor = require('./order-processor');
const Order = require('./order');

const cart = {
    getTotalPrice() {
        return 150;
    }
};

describe('OrderProcessor', () => {
    it('should create order correctly', () => {
        let orderProcessor = new OrderProcessor(cart);
        let order = orderProcessor.createOrder();
        expect(order).toBeInstanceOf(Order);
    });
});
