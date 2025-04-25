import { Button, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { PageContext, PageType } from "../global/context/PageContext";
import "../App.css";
import { DataContext } from "../global/context/DataContext";

const EventDetails: FC = () => {
  const {
    setPageTodisplay,
    eventTodisplay,
    setEventTodisplay,
    navEventId,
  } = useContext(PageContext);
  const { events } = useContext(DataContext);
  const finalEvent =
    navEventId.length > 0
      ? events.find((e) => e.id === navEventId)
      : eventTodisplay;
  return (
    <div className="container">
      <div className="event-details-container">
        <Typography variant="h1" className="title">
          {finalEvent?.title}
        </Typography>
        <img
          className="event-details-img"
          src={finalEvent?.picture}
        />
        <Typography className="event-details-description">
          {finalEvent?.description}
        </Typography>
      </div>
      <div className="button-container">
        <Button
          variant="outlined"
          onClick={() => setPageTodisplay(PageType.RegistrationList)}
        >
          Liste des inscrits
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setPageTodisplay(PageType.ImportCsv)}
        >
          Importer un CSV
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            setPageTodisplay(PageType.EventList);
            setEventTodisplay(null);
          }}
        >
          Retourner à la liste
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;
