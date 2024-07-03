-- ----------------------------------------------------------------------------
-- Put here INSERT statements for inserting data required by the application
-- in the "tfgproject" database.
-------------------------------------------------------------------------------

INSERT INTO "User"(userName, password, firstName,lastName,email,role)
VALUES ('user','$2a$12$POcETR8T7p.HufOnzy2NI.QmCET6D1U0SAwHWQ8u42qhqIUwECu1C','user','user','user@gmail.com',0);
INSERT INTO "User"(userName, password, firstName,lastName,email,role)
VALUES ('admin','$2a$12$uJWw4QNXPkWgyb0AfKQnNuUZW/eBt/C8MDOggi0A8MVabH/cJw.mG','admin','admin','admin@gmail.com',1);

INSERT INTO "Member" (firstName, lastName, birthdate, tfno, email, country, province, city, cp, address, amount, IBAN, gender)
VALUES ('Patricia', 'Mato Miragaya', '2002-12-19', '123456789', 'patricia@gmail.com', 'España', 'A Coruna', 'A Coruna', '12345', 'Andrés Pan Vieiro, 12', 12, '', 0);
INSERT INTO "Member" (firstName, lastName, birthdate, tfno, email, country, province, city, cp, address, amount, IBAN, gender)
VALUES ('Pepe', 'Rodríguez García', '1982-01-02', '123456789', 'pepe@gmail.com', 'España', 'A Coruna', 'A Coruna', '12345', 'Avenida Peruleiro, 36', 12, '', 1);
INSERT INTO "Member" (firstName, lastName, birthdate, tfno, email, country, province, city, cp, address, amount, IBAN, gender)
VALUES ('María', 'Gómez Fernández', '1993-05-06', '123456789', 'maria@gmail.com', 'España', 'A Coruna', 'A Coruna', '12345', 'Avenida Sardiñeira, 7', 12, '', 0);

INSERT INTO "EntityUser" (entityName) VALUES ('Entidade 1');
INSERT INTO "EntityUser" (entityName) VALUES ('Entidade 2');

INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A1', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 1');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A2', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 2');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A3', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 3');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A4', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 4');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A5', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 5');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A6', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 6');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A7', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 7');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A8', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 8');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A9', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 9');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A10', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 10');
INSERT INTO "Product" (code, origin, price, type, productName) VALUES ('MOB_A11', 'Mercado por AGAELA', 150, 'Mobilidade e transferencias', 'Produto 11');

