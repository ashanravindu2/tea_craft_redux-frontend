import {v4 as uuidv4} from "uuid";

export class Supplier{
    supplierId: string = `ST-${uuidv4()}`;
    firstName: string;
    lastName: string;
    gender: string;
    joinedDate: Date | string;
    dob: Date | string;
    addressLine01: string;
    addressLine02: string;
    addressLine03: string;
    addressLine04: string;
    addressLine05: string;
    postalCode: string;
    contactNo: string;
    email: string;

    constructor(
        firstName: string,
        lastName: string,
        gender: string,
        joinedDate: Date | string,
        dob: Date | string,
        addressLine01: string,
        addressLine02: string,
        addressLine03: string,
        addressLine04: string,
        addressLine05: string,
        postalCode: string,
        contactNo: string,
        email: string,

    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.joinedDate = joinedDate;
        this.dob = dob;
        this.addressLine01 = addressLine01;
        this.addressLine02 = addressLine02;
        this.addressLine03 = addressLine03;
        this.addressLine04 = addressLine04;
        this.addressLine05 = addressLine05;
        this.postalCode = postalCode;
        this.contactNo = contactNo;
        this.email = email;

    }
}