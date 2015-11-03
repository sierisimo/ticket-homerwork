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

  debug("Object arrived");

  for (var i = 0; i < obj.lines.length; i++) {
    line = obj.lines[i];
    switch (line[0]) {
      case 'H':
        debug("Header found!");
        ticketObj.header = parseHeader(line.substring(1));
        break;
      case 'I':
        debug("Item found!")
        ticketObj.items.push(parseItem(line.substring(1)));
        break;
      case 'T':
        debug("Total reached");
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

  headObj.type = line.substring(index, 3);
  index = 3;
  headObj.id = line.substring(index, 8);
  index = 8;
  headObj.action = line[index];
  headObj.action_id = line.substring(++index, 12);
  index = 12;
  headObj.country = line[index];

  if (!Number.parseInt(line[++index])) {
    headObj.country += line[index++];

    countryFlag = true;
  }

  date = new Date(
    Number.parseInt(line[index++] + line[index++] + line[index++] + line[index++]),
    Number.parseInt(line[index++] + line[index++]),
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
    numbersData;

  ditem("Line Arrived");

  itemObj.name = line.substring(0, 4);
  itemObj.id = line.substring(4, 7);

  numbersData = line.substring(8).split(":")

  return itemObj;
}

function parseTotal(line) {
  dtotal("Line arrived");

  return {};
}

exports.parse = parsing;
