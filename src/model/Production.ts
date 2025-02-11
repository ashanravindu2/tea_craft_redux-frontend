export class Production {
    productionID: string;
    stockID: string;
    processDate!: Date | string;
    processedQuantity: number;

    constructor(
        productionID: string,
        stockID: string,
        processDate: Date | string,
        processedQuantity: number,
    ) {
        this.productionID = productionID;
        this.stockID = stockID;
        this.processDate = processDate;
        this.processedQuantity = processedQuantity;
    }
}