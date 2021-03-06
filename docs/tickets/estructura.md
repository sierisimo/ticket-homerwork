# Estructura

Los archivos de extensión ticket deben cumplir con una estructura mas o menos estricta, esta estructura se define a continuación.

## Elementos

Cada archivo de ticket debe contener 3 tipos de elementos:

* Header/Descriptor
* Items
* Total/Resumen

Estos elementos se encuentran de alguna manera "ofuscados" para evitar que se pueda directamente ver el contenido sin antes pasarlo por una serie de programas.

> **Danger** Se asumen muchas cosas de estos elementos, sin embargo la estructura se mantiene.

### Header/Descriptor

El header de cada ticket es una sola linea que debe contener los siguientes elementos en orden y tamaño estricto:

* **Indicador de linea**: denotado por una letra _**H**_
* **Número de factura**: Una combinación de caracteres alfanuméricos con una longitud exacta de 8 elementos. Los primeros 3 elementos denotan el tipo de operación.
* **Número de cliente**: 6 caracteres alfanuméricos exactamente, estos sirven para identificar al cliente.
* **Fecha**: Fecha dada por el formato YYYYMMdd donde
  * Y: Digito de año
  * M: Digito de mes
  * d: Digito de día
* **Tipo de moneda**: De dos a tres caracteres que denotan el tipo de moneda usada en la transacción.

#### Ejemplo

> HINV03126R007PL20150317EUR

### Items

Los items son el único elemento que puede estar una o mas veces repetido. Debe contener:

* **Indicador de linea**: denotado por una letra _**I**_
* **Id de producto**: Exactamente 7 elementos alfanuméricos.
* **Espacio divisor**: Un espacio para indicar separación entre elementos.
* **Antigüedad de producto**: Un número indicando la antigüedad del producto, no importa la cantidad de digitos en este nümero siempre que se respete el orden.
* **Espacio divisor**: Tres espacios para indicar separación
* **Cantidad**: Un número indicando la cantidad del producto, no importa la cantidad de digitos en este nümero siempre que se respete el orden.
* **Espacio divisor**: Cuatro espacios para indicar separación entre elementos
* **Valor neto**: Un número con punto decimal, sirve para indicar el precio.

#### Ejemplo

> **Cuation** El siguiente ejemplo no usa espacios, usa el caracter ":" para proporcionar una mejor legibilidad del ejemplo


> ICONU018:3:::5::::53.74

### Total

La linea de total debe ser unica, sus elementos son evaluados y de no coincidir con lo necesario, seran reemplazado con los valores calculados.

Su estructura consiste:

* **Indicador de linea**: denotado por una letra _**T**_
* **Espacio divisor**: Un solo espacio para indicar separación.
* **Total de lineas**: Un número indicando el total de items, si este número no coincide, se usara el total de elementos en la parte de items
* **Espacio divisor**: 6 espacios para indicar separación entre elementos.
* **Total neto**: Un número con punto decimal que indica el total de la compra, si este número no tiene coherencia con la suma total de los items, se usara la suma total en lugar de este numero.

#### Ejemplo

> **Cuation** El siguiente ejemplo no usa espacios, usa el caracter ":" para proporcionar una mejor legibilidad del ejemplo

> T 5      1599.46
