import { Button, Card, Typography } from "@mui/material";
import { FC, useContext } from "react";
import "../App.css";
import { DataContext } from "../global/context/DataContext";
import { PageContext, PageType } from "../global/context/PageContext";

const EventList: FC = () => {
  const { events } = useContext(DataContext);
  const { setPageTodisplay, setEventTodisplay } = useContext(PageContext);
  return (
    <div className="container">
      <div className="eventList">
        <Typography className="title" variant="h1">
          Liste des évènements
        </Typography>
        <div className="events">
          {events.map((event, index) => (
            <Card
              key={index}
              className="event-card"
              onClick={() => {
                setEventTodisplay(event);
                setPageTodisplay(PageType.EventDetails);
              }}
            >
              <Typography className="event-card-title" variant="h2">
                {event.title}
              </Typography>
              <img
                className="event-card-img"
                src={event.picture}
                alt={event.title}
              />
            </Card>
          ))}
        </div>
      </div>
      <Button
        onClick={() => setPageTodisplay(PageType.CreateEvent)}
        variant="outlined"
        color="success"
      >
        Créer un évènement
      </Button>
    </div>
  );
};

export default EventList;
