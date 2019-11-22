const Store = require('./store');

const products = [
    {
        id: 1,
        price_us: 10,
    },
    {
        id: 2,
        price_us: 20,
    }
];

describe('Store', () => {
    let store;

    beforeEach(() => {
        store = new Store(products)
    });

    it('should correctly create store', () => {
        expect(store).toBeDefined();
    });

    it('should correctly create store with products', () => {
        expect(store.getTotalProducts()).toBe(2);
    });

    it('should correctly search products', () => {
        let result = store.search((item) => item.price === 20);
        expect(result[0].id).toBe(2);
    });
});
