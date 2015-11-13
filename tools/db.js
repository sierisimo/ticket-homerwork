var sqlite = require('sqlite3').verbose(),
  debug = require('debug')('db');

function insertTickets(tickets) {
  var db, ticket, items, prom = Promise.resolve();

  for (var ticketName in tickets) {
    db = new sqlite.Database('./db/tickets.sqlite3');

    ticket = tickets[ticketName];
    items = ticket.items;

    //db.serialize(function() {
      var stProduct = db.prepare("INSERT OR IGNORE INTO product VALUES(?)"),
        stClient = db.prepare("INSERT OR IGNORE INTO client VALUES(?)"),
        stTicket = db.prepare("INSERT OR REPLACE INTO ticket VALUES($id,$client_id,$total,$ticket_date, $currency)"),
        stProductTicket = db.prepare("INSERT OR REPLACE INTO productsInTicket VALUES($ticket_id, $product_id, $age, $quantity, $value)");

      for (var l = items.length; l--;) {
        stProduct.run(items[l].productId);
      }
      stProduct.finalize();

      stClient.run(ticket.header.clientId);
      stClient.finalize();

      stTicket.run({
        $id: ticket.header.id,
        $client_id: ticket.header.clientId,
        $total: ticket.total.total,
        $ticket_date: ticket.header.date.valueOf(),
        $currency: ticket.header.currency
      });
      stTicket.finalize();

      for (var l = items.length; l--;) {
        stProductTicket.run({
          $ticket_id: ticket.header.id,
          $product_id: items[l].productId,
          $age: items[l].age,
          $quantity: items[l].quantity,
          $value: items[l].value
        });
      }
      stProductTicket.finalize();

      db.close();
  //  });
  }
}

function getAllOfTickets() {
  var db = new sqlite.Database('./db/tickets.sqlite3');
}

exports.insertTickets = insertTickets;
exports.getInfoTickets = getAllOfTickets;
