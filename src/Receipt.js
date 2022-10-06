class Receipt {
    constructor() {
        this.lineItems = [];
    }

    addLineItem(product, quantity, totalPrice) {
        this.lineItems.push(new LineItem(product, quantity, totalPrice));
    }

    totalPrice() {
        return this.lineItems
            .reduce((total, li) => total + li.totalPrice, 0);
    }
}

class LineItem {
    constructor(product, quantity, totalPrice) {
        this.product = product;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}

module.exports = {
    Receipt,
};