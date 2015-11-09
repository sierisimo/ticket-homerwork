var debug = require('debug')('validator'),
  derror = require('debug')('validator:error');

function validateTickets(tickets) {
  var ticket, items, realTotal = 0;

  debug("Validating the tickets...");

  for (var ticketName in tickets) {
    ticket = tickets[ticketName];

    validateTicketValues(ticketName, ticket);

    items = ticket.items;

    if (items.length !== ticket.total.lines) {
      derror("Error, the number of items and the number of lines doesn't match at file " + ticketName);
      derror("Fixing it with the items length");

      ticket.total.lines = items.length;
    }

    for(var l = items.length; l--;){
      realTotal += items[l].value;
    }

    if(realTotal !== ticket.total.total){
      derror("Error, total don't match... replacing with real one");
    
      ticket.total.total = realTotal;
    }
  }

  return tickets;
}

function validateTicketValues(name, obj) {
  var elem;

  if (obj === null || !obj ||
    !obj.hasOwnProperty("items") || !obj.hasOwnProperty("header") || !obj.hasOwnProperty("total")) {
    error("Error, ticket doesn't has all the elementes: [\"header\",\"items\",\"total\"]");
  }

  for (var attr in obj) {
    elem = obj[attr];

    if (elem === null || !elem) {
      error("Error, " + attr + " cannot be null or undefined... error in file: " + name);
    }

    if (attr === "items")
      if (type(elem) === "Array") {
        if (elem.length === 0) {
          error("Error, items cannot be empty");
        }

        for (var l = elem.length; l--;) {
          if (elem[l] === null || !elem[l] || type(elem[l]) !== "Object") {
            error("Error, item in " + name + " doesn't have the right format");
          }

          checkExistsAndType(elem[l], {
            productId: 'String',
            age: 'Number',
            quantity: 'Number',
            value: 'Number'
          });
        }
      } else {
        error("Error, attribute 'items' needs to be a valid Array");
      }

    if (attr === "header")
      if (type(elem) === "Object") {
        checkExistsAndType(elem, {
          id: 'String',
          clientId: 'String',
          currency: 'String',
          date: 'Date'
        });
      } else {
        error("Error, header needs to be a valid Object");
      }

    if (attr === "total")
      if (type(elem) === 'Object') {
        checkExistsAndType(elem, {
          lines: 'Number',
          total: 'Number'
        });
      } else {
        error("Error, total is not a valid Object");
      }
  }

  debug("Everything passed the validation on " + name);
}

function type(obj) {
  var text = obj.constructor.toString()
  return text.match(/function (.*)\(/)[1]
}

function checkExistsAndType(obj, typesObj) {
  for (var attr in typesObj) {
    if (!obj.hasOwnProperty(attr) || type(obj[attr]) !== typesObj[attr])
      error("Error, " + attr + " doesn't have correct type or is not defined");
  }
}

function error(text) {
  derror(text);

  throw new Error(text);
}

exports.validateTickets = validateTickets;
