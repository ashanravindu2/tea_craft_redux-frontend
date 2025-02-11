export class Product{
    productID: string;
    name: string;
    type: string;
    pricePerKg: number;

    constructor(
        productID: string,
        name: string,
        type: string,
        pricePerKg: number,
    ) {
        this.productID = productID;
        this.name = name;
        this.type = type;
        this.pricePerKg = pricePerKg;
    }
}