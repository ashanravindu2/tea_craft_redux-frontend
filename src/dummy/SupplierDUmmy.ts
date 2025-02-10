import {Supplier} from "../model/Supplier.ts";


const supplierData: Supplier[] = [
    new Supplier(
        "John",
        "Doe",
        "Male",
        new Date("2022-01-15").toISOString(),
        new Date("1990-06-25").toISOString(),
        "123 Main St",
        "Suite 100",
        "Springfield",
        "IL",
        "USA",
        "62701",
        "555-123-4567",
        "john.doe@example.com",

    ),
    new Supplier(
        "Jane",
        "Smith",
        "Female",
        new Date("2020-03-01").toISOString(),
        new Date("1985-10-10").toISOString(),
        "456 Elm St",
        "Apt 20B",
        "Los Angeles",
        "CA",
        "USA",
        "90001",
        "555-987-6543",
        "jane.smith@example.com",

    ),
    new Supplier(
        "Alice",
        "Johnson",
        "Female",
        new Date("2018-07-10").toISOString(),
        new Date("1988-03-12").toISOString(),
        "789 Oak St",
        "",
        "San Francisco",
        "CA",
        "USA",
        "94102",
        "555-567-1234",
        "alice.johnson@example.com",

    ),
];

export default supplierData;