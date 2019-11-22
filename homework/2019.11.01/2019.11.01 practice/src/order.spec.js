const Order = require('./order');

describe('Order', () => {
    it('should be created correctly', () => {
        let order = new Order(146);
        expect(order).toBeDefined();
    });
});
