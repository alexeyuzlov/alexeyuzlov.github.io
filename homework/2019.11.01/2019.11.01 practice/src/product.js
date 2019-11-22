function toProduct(item) {
    return {
        id: item.id,
        price: item.price_us || 0
    }
}

module.exports = {
    toProduct
};
