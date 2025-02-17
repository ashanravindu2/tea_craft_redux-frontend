export class Production {
    productionID: string;
    qualityChecks: boolean;
    processDate!: Date | string;
    logs: string;
    processedQuantity: number;

    constructor(
        productionID: string,
        qualityChecks: boolean,
        processDate: Date | string,
        logs: string,
        processedQuantity: number,
    ) {
        this.productionID = productionID;
        this.qualityChecks = qualityChecks;
        this.processDate = processDate;
        this.logs = logs;
        this.processedQuantity = processedQuantity;
    }
}