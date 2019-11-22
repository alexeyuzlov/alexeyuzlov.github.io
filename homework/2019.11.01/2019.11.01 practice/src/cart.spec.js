const Cart = require('./cart');

const products = [
    {
        id: 1,
        price: 10,
    },
    {
        id: 2,
        price: 20,
    }
];

describe('Cart', () => {
    it('should be empty by default', () => {
        let cart = new Cart();
        expect(cart.getTotalProducts()).toBe(0);
    });

    it('should correctly add products', () => {
        let cart = new Cart();

        cart.addProducts(products);

        expect(cart.getTotalProducts()).toBe(2);
    });

    it('should correctly provide total price for empty cart', () => {
        let cart = new Cart();

        expect(cart.getTotalPrice()).toBe(0);
    });

    it('should correctly provide total price', () => {
        let cart = new Cart();

        cart.addProducts(products);

        expect(cart.getTotalPrice()).toBe(30);
    });
});
