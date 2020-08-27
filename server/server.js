const express = require('express');

const fs = require('fs');
const path = require('path');
const app = express();

function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps)

// serve static build
// app.use('/', express.static(path.join(__dirname, '../tic-tac/build')));
app.use(express.json());

// Read
app.get('/api/tickets', (req, res) => {
  const data = fs.readFileSync('./data.json');
  const tickets = JSON.parse(data);
  const { searchText } = req.query;
  if (searchText) {
    const filteredTickets = tickets.filter((input) => input.title.toLowerCase().includes(searchText.toLowerCase()));
    res.send((filteredTickets));
  } else {
    res.send((tickets));
  }
});

// create
app.post('/api/tickets/:ticketId/done', (req, res) => {
  const data = fs.readFileSync('./data.json');
  const tickets = JSON.parse(data);
  const foundTicket = tickets.findIndex((id) => id.id === req.params.ticketId);
  tickets[foundTicket].done = true;
  const info = JSON.stringify(tickets, null, 2);
  fs.writeFile('./data.json', info, () => console.log('file updated'));
  res.send(tickets[foundTicket]);
});

app.post('/api/tickets/:ticketId/undone', (req, res) => {
  const data = fs.readFileSync('./data.json');
  const tickets = JSON.parse(data);
  const foundTicket = tickets.findIndex((id) => id.id === req.params.ticketId);
  tickets[foundTicket].done = false;
  const info = JSON.stringify(tickets, null, 2);
  fs.writeFile('./data.json', info, () => console.log('file updated'));
  res.send(tickets[foundTicket]);
});


let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});

