const { expect } = require('./expect');
const { Checkout, Product, ProductCatalogue } = require('../src');

describe('Checking out articles at the supermarket', () => {

    const
        A  = new Product('A'),
        B  = new Product('B'),
        C  = new Product('C'),
        D  = new Product('D');

    const catalogue = new ProductCatalogue();

    beforeEach(() => {
        catalogue.setPriceOf(A, 50);
        catalogue.setPriceOf(B, 30);
        catalogue.setPriceOf(C, 20);
        catalogue.setPriceOf(D, 15);

        catalogue.setSpecialPrice(A, 3, 130);
        catalogue.setSpecialPrice(B, 2, 45);
    });

    afterEach(() => catalogue.reset());

    describe(`The receipt`, () => {

        it(`should show the total price of 0 when the shopping cart is empty`, () => {
            const checkout = new Checkout(catalogue);

            const receipt = checkout.scan([
                /* no products in cart*/
            ]);

            expect(receipt.totalPrice()).to.equal(0);
        });

        describe(`with no special offers`, () => {

            it(`should show the total price equal to the total price of individual items`, () => {
                const checkout = new Checkout(catalogue);

                const receipt = checkout.scan([
                    A,
                ]);

                expect(receipt.totalPrice()).to.equal(50);
            });

            it(`should show the quantity and a total price per product type`, () => {
                const checkout = new Checkout(catalogue);

                const receipt = checkout.scan([
                    A,
                    D,
                    B,
                    C,
                    D,
                    C,
                    A,
                    D
                ]);

                const lineItem = receipt.lineItems[0];
                expect(lineItem).to.not.be.undefined;

                expect(lineItem.product.name).to.equal(A.name);
                expect(lineItem.quantity).to.equal(2);
                expect(lineItem.totalPrice).to.equal(2 * catalogue.getPriceOf(A));
            })
        });

        describe(`with "Special Price" offer`, () => {
            it(`should show the quantity and a total price per product type`, () => {
                const checkout = new Checkout(catalogue);

                const receipt = checkout.scan([
                    A,
                    A,
                    B,
                    C,
                    D,
                    B,
                    A,
                    A,
                    A,
                    B,
                    B,
                ]);

                const lineItem = receipt.lineItems[0];
                const specialPrice1 = catalogue.getSpecialPrice(A);
                const normalPrice = catalogue.getPriceOf(A) * 2;
                expect(lineItem.totalPrice).to.equal(specialPrice1.price + normalPrice);

                const lineItem2 = receipt.lineItems[1];
                const specialPrice2 = catalogue.getSpecialPrice(B);
                expect(lineItem2.totalPrice).to.equal(specialPrice2.price);
            })

        });
    });
});