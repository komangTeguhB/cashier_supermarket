class ProductCatalogue {
    constructor() {
        this.priceList = new Map();
        this.pricingRule = new Map();
    }

    setPriceOf(product, price) {
        this.priceList.set(product, price);
    }

    getPriceOf(product) {
        return this.priceList.get(product);
    }

    setSpecialPrice(product, qty, price) {
        const eligibleTerms = {
            qty: qty,
            price: price
        }
        return this.pricingRule.set(product, eligibleTerms);
    }

    getSpecialPrice(product) {
        return this.pricingRule.get(product);
    }

    reset() {
        this.priceList.clear();
        this.pricingRule.clear();
    }
}

module.exports = {
    ProductCatalogue,
};