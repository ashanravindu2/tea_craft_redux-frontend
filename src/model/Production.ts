export class Production {
    productionID: string;
    stockID: string;
    processDate!: Date | string;
    logs: string;
    processedQuantity: number;

    constructor(
        productionID: string,
        stockID: string,
        processDate: Date | string,
        logs: string,
        processedQuantity: number,
    ) {
        this.productionID = productionID;
        this.stockID = stockID;
        this.processDate = processDate;
        this.logs = logs;
        this.processedQuantity = processedQuantity;
    }
}