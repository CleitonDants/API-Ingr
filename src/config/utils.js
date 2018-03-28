function ticketsHandler(tickets) {
  const newArray = [];
  let item;

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