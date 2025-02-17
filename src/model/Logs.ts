export class Logs {
    logCode: string;
    logDate: Date | string;
    observation: string;
    productionID: string;
    supplierID: string;
    employeeID: string;
    observedImage: Uint8Array;

    constructor(
        logCode: string,
        logDate: Date | string,
        observation: string,
        productionID: string,
        supplierID: string,
        employeeID: string,
        observedImage: Uint8Array
    ) {
        this.logCode = logCode;
        this.logDate = logDate;
        this.observation = observation;
        this.productionID = productionID;
        this.supplierID = supplierID;
        this.employeeID = employeeID;
        this.observedImage = observedImage;
    }
}