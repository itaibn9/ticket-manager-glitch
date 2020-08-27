import React, { useEffect, useState } from 'react';
import '../styling/App.css';
import axios from 'axios';
import Ticket from './Ticket';
import Search from './Search';

function App() {
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [numOfTickets, setNumOfTickets] = useState(0);
  const [callrestore, setCallrestore] = useState(0);
  const hideTheTicket = () => {
    setCounter(counter + 1);
  };
  const filterBySearch = async (title) => {
    try {
      const data = await axios.get(`/api/tickets?searchText=${title}`);
      setTickets(data.data);
      setNumOfTickets(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/tickets');
        const content = data[0].content.slice(0,100)
        setNumOfTickets(data.length);
        setTickets(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const restoreHiddenTickets = () => {
    setCounter(0);
    setCallrestore(callrestore + 1);
  };
  return (
    <main>
      <header>
        <h1>My Ticket Manager</h1>
      </header>
      <div className="infoOnTickets">
        <div>
        <h3>
          {' '}
          {numOfTickets}
          {' '}
          results
          {' '}
          </h3>
          {counter > 0 ? (
            <i>
              (Hidden tickets:
              <span id="hideTicketsCounter">
                {counter}
              </span>
              <b> - </b>
              <button id="restoreHideTickets" onClick={restoreHiddenTickets}>restore</button>
              )
            </i>
          ) : ''}
          {' '}
          </div>
        <Search onchange={filterBySearch} />
      </div>
      {tickets.map((i) => <Ticket ticket={i} hideOnClick={hideTheTicket} callRestore={callrestore} />)}
    </main>
  );
}
export default App;
