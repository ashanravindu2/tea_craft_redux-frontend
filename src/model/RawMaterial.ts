export class RawMaterial {

    stockID: string;
    supplierID: string;
    quantityInKg: number;
    dateReceived: Date | string;

    constructor(
        stockID: string,
        supplierID: string,
        quantityInKg:  number,
        dateReceived: Date | string,
    ) {
        this.stockID = stockID;
        this.supplierID = supplierID;
        this.quantityInKg = quantityInKg;
        this.dateReceived = dateReceived;
    }

}