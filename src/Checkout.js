const { Receipt } = require('./Receipt');

function getQuantity(products, value) {
    return products.filter((v) => (v === value)).length;
}

class Checkout {
    constructor(catalogue) {
        this.catalogue = catalogue;
    }

    scan(products) {
        const receipt = new Receipt();
        let productsFiltered = [];

        for (let i=0; i < products.length; i++){
            let totalPrice = 0;
            const alreadyFiltered = productsFiltered.findIndex((object) => {
                return object.product.name == products[i].name
            }); 
            
            if (alreadyFiltered < 0) {
                const quantity = getQuantity(products, products[i]);
                const prodInDiscount = this.catalogue.getSpecialPrice(products[i]);
                const qtyAtDiscount = prodInDiscount && quantity > 1 && quantity >= prodInDiscount.qty ? prodInDiscount : null;
                
                if (qtyAtDiscount) {
                    const normalPriceQty = quantity % qtyAtDiscount.qty;
                    totalPrice = qtyAtDiscount.price;
                    for (let k=0; k < normalPriceQty; k++){
                        totalPrice = totalPrice + this.catalogue.getPriceOf(products[i])
                    }
                } else {
                    totalPrice = this.catalogue.getPriceOf(products[i]) * quantity;
                }
                productsFiltered.push({ product: products[i], qty: quantity, total: totalPrice })
             }
        }
        
        for (let j=0; j<productsFiltered.length; j++) {
            receipt.addLineItem(productsFiltered[j].product, productsFiltered[j].qty, productsFiltered[j].total )
        }

        return receipt;
    }
    
}

module.exports = {
    Checkout,
};