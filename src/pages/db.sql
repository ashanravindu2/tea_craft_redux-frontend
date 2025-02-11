CREATE DATABASE TeaFactoryDB;
USE TeaFactoryDB;


-- User Admin Table
CREATE TABLE UserAdmin (
                           UserID INT PRIMARY KEY AUTO_INCREMENT,
                           Username VARCHAR(50) UNIQUE NOT NULL,
                           PasswordHash VARCHAR(255) NOT NULL,
                           Role ENUM('Admin', 'Manager', 'Employee') NOT NULL
);


-- Raw Material Stock Table
CREATE TABLE RawMaterialStock (
                                  StockID INT PRIMARY KEY AUTO_INCREMENT,
                                  SupplierID INT,
                                  QuantityInKg DECIMAL(10,2) NOT NULL,
                                  DateReceived DATE,
                                  FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);


-- ProductionPage Table
CREATE TABLE Production (
                            ProductionID INT PRIMARY KEY AUTO_INCREMENT,
                            StockID INT,
                            ProcessDate DATE NOT NULL,
                            ProcessedQuantity DECIMAL(10,2) NOT NULL,
                            FOREIGN KEY (StockID) REFERENCES RawMaterialStock(StockID)
);

-- Products Table
CREATE TABLE Products (
                          ProductID INT PRIMARY KEY AUTO_INCREMENT,
                          Name VARCHAR(100) NOT NULL,
                          Type VARCHAR(50),
                          PricePerKg DECIMAL(10,2) NOT NULL
);