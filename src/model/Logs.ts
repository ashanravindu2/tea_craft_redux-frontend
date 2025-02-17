export class Logs {
    logCode: string;
    logDate: Date | string;
    observation: string;
    productionID: string;
    supplierID: string;
    employeeID: string;
    observedImage: string;

    constructor(
        logCode: string,
        logDate: Date | string,
        observation: string,
        productionID: string,
        supplierID: string,
        employeeID: string,
        observedImage: string
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