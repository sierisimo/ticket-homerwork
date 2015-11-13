# Ejemplos Consultas

Las consultas se crean dentro del programa, estas son llenadas dinamicamente mediante el modulo de SQLite3, la manera es creando "statements" que se llenan con objetos.

A continuación se muestran las consultas:

```SQL
--- Ingresar un nuevo producto
INSERT OR IGNORE INTO product VALUES(?)

--- Ingresar un nuevo cliente
INSERT OR IGNORE INTO client VALUES(?)

--- Ingresar o actualizar un ticket
INSERT OR REPLACE INTO ticket VALUES($id,$client_id,$total,$ticket_date, $currency)

--- Ingresar o actualizar los productos que tiene un ticket
INSERT OR REPLACE INTO productsInTicket VALUES($ticket_id, $product_id, $age, $quantity, $value)
```
