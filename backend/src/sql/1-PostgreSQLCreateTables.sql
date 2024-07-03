DROP TABLE IF EXISTS "Loan";
DROP TABLE IF EXISTS "Member";
DROP TABLE IF EXISTS "EntityUser";
DROP TABLE IF EXISTS "Product";
DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
    id BIGSERIAL PRIMARY KEY,
    userName VARCHAR(60) COLLATE "C" NOT NULL,
    password VARCHAR(60) NOT NULL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL,
    CONSTRAINT UserUserNameUniqueKey UNIQUE (userName)
);
CREATE INDEX "UserIndexByUserName" ON "User" (userName);

CREATE TABLE "Member" (
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60),
    birthdate DATE,
    tfno VARCHAR(9) NOT NULL,
    email VARCHAR(60),
    gender SMALLINT,
    country VARCHAR(60) NOT NULL,
    province VARCHAR(60) NOT NULL,
    city VARCHAR(60) NOT NULL,
    cp INT NOT NULL,
    address VARCHAR(100) NOT NULL,
    amount INT NOT NULL,
    IBAN VARCHAR(24) NOT NULL
);

CREATE TABLE "EntityUser"(
     id BIGSERIAL PRIMARY KEY,
     entityName VARCHAR(60) NOT NULL
);

CREATE TABLE "Product" (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(60) NOT NULL,
    image BYTEA,
    origin VARCHAR(60) NOT NULL,
    price FLOAT NOT NULL,
    type VARCHAR(60) NOT NULL,
    subtype VARCHAR(60),
    productName VARCHAR(60) NOT NULL,
    description VARCHAR(60),
    location VARCHAR(60),
    observations VARCHAR(60),
    state SMALLINT DEFAULT 0 NOT NULL -- En préstamo o libre
);

CREATE TABLE "Loan" (
    id BIGSERIAL PRIMARY KEY,
    dateLoan timestamp,
    homeTransport BOOLEAN,
    assumeSpent VARCHAR(60),
    amountTransport FLOAT,
    observations VARCHAR(60),
    devolution timestamp,
    productId BIGINT NOT NULL,
    memberId BIGINT,
    entityId BIGINT,
    loanUserId BIGINT,
    devolutionUserId BIGINT,
    entityFirstName VARCHAR(60),
    entityLastName  VARCHAR(60),
    entityTfno VARCHAR(9),
    entityEmail VARCHAR(60),
    CONSTRAINT ProductIdFK FOREIGN KEY (productId) REFERENCES "Product" (id),
    CONSTRAINT MemberIdFK FOREIGN KEY (memberId) REFERENCES "Member" (id),
    CONSTRAINT EntityIdFK FOREIGN KEY (entityId) REFERENCES "EntityUser" (id),
    CONSTRAINT LoanUserIdFK FOREIGN KEY (loanUserId) REFERENCES "User" (id),
    CONSTRAINT DevolutionUserIdFK FOREIGN KEY (devolutionUserId) REFERENCES "User" (id)
);
