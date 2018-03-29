const mongoose = require('mongoose');

const { ObjectId: Id } = mongoose.Types;

function ticketsHandler(tickets) {
  const newArray = [];
  let item;
  
  if(!tickets || tickets.length < 2) return tickets;

  for (const ticket of tickets) {
    item = {
      _id: Id(),
      eventName: ticket.eventName,
      local: ticket.local,
      date: ticket.date,
      usdPrice: ticket.usdPrice,
    };

    newArray.push(item);
  }

  return newArray;
}

module.exports = { ticketsHandler };
