import { Button, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { PageContext, PageType } from "../global/context/PageContext";
import "../App.css";

const EventDetails: FC = () => {
  const { setPageTodisplay, eventTodisplay, setEventTodisplay } =
    useContext(PageContext);
  return (
    <div className="container">
      <div className="event-details-container">
        <Typography variant="h1" className="title">
          {eventTodisplay?.title}
        </Typography>
        <img className="event-details-img" src={eventTodisplay?.picture} />
        <Typography className="event-details-description">
          {eventTodisplay?.description}
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
