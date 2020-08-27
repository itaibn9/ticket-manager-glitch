import React, { useState, useEffect } from 'react';
import '../styling/Ticket.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Tickets({ ticket, hideOnClick, callRestore }) {
  const [classTicket, setClassTicket] = useState('ticket');
  const classes = useStyles();
  function changeTheDate(theDate) {
    const current = new Date(theDate);
    const timestring = `${current.getDay() + 1}/${current.getMonth() + 1}/${current.getFullYear()}
     ${current.toLocaleTimeString()}`;
    return timestring;
  }
  useEffect(() => {
    setClassTicket('ticket');
  }, [callRestore]);
  return (
    <div id={ticket.id} key={ticket.id} className={classTicket}>
      <Card className={classes.root}>
        <button
          type="submit"
          className="hideTicketButton"
          onClick={() => {
            setClassTicket('hiddenTicket');
            hideOnClick();
          }}
        >
          Hide
        </button>
        <CardContent>
          <Typography variant="h5" component="h2">
            {ticket.title}
          </Typography>
          <Typography variant="body2" component="p">
            {ticket.content}
          </Typography>
        </CardContent>
        <CardActions className="lowerBar">
          <span>
            by
            {ticket.userEmail}
            {' '}
            |
            {' '}
            {changeTheDate(ticket.creationTime)}
          </span>
          <span>
            {ticket.labels ? (ticket.labels).map((element) => (
              <Button
                style={{ textTransform: 'none' }}
                className="label"
                size="small"
              >
                {element}
              </Button>
            )) : null}
          </span>
        </CardActions>
      </Card>
    </div>
  );
}

export default Tickets;
