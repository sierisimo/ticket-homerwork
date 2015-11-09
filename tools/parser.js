var debugConstructor = require('debug'),
  debug = debugConstructor('parser'),
  dheader = debugConstructor('parser:header'),
  ditem = debugConstructor('parser:item'),
  dtotal = debugConstructor('parser:total');

function parsing(obj) {
  var ticketObj = {
      items: []
    },
    line;

  //debug("Object arrived");

  for (var i = 0; i < obj.lines.length; i++) {
    line = obj.lines[i];
    switch (line[0]) {
      case 'H':
        ticketObj.header = parseHeader(line.substring(1));
        break;
      case 'I':
        ticketObj.items.push(parseItem(line.substring(1)));
        break;
      case 'T':
        ticketObj.total = parseTotal(line.substring(1));
        break;
    }
  }

  return ticketObj;
}

function parseHeader(line) {
  var headObj = {},
    index = 0,
    date, countryFlag = false;

  //Number of the ticket
  headObj.id = line.substring(index, 8);
  index = 8;

  headObj.clientId = line.substring(index, 14);

  index = 14;

  date = new Date(
    Number.parseInt(line[index++] + line[index++] + line[index++] + line[index++]),
    Number.parseInt(line[index++] + line[index++]) - 1,
    Number.parseInt(line[index++] + line[index++])
  );

  headObj.date = date;
  headObj.currency = line[index++] + line[index++];

  if (!!line[index]) {
    headObj.currency += line[index];
  }

  return headObj;
}

function parseItem(line) {
  var itemObj = {},
    elements = line.split(" "),
    numbersData;

  elements = elements.filter(function(elem, ind, arr) {
    return !!elem.length;
  });

  itemObj.productId = elements[0];

  itemObj.age = Number.parseInt(elements[1]);

  itemObj.quantity = Number.parseInt(elements[2]);

  itemObj.value = Number.parseFloat(elements[3]);

  return itemObj;
}

function parseTotal(line) {
  var totalObj = {},
    elements = line.split(" ");

  elements = elements.filter(function(elem) {
    return !!elem.length;
  });

  totalObj.lines = Number.parseInt(elements[0]);

  totalObj.total = Number.parseFloat(elements[1]);

  return totalObj;
}

exports.parse = parsing;
