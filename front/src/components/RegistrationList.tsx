import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import "../App.css";
import { DataContext } from "../global/context/DataContext";
import { PageContext, PageType } from "../global/context/PageContext";

const RegistrationList: FC = () => {
  const { registrations } = useContext(DataContext);
  const { eventTodisplay, setPageTodisplay } = useContext(PageContext);

  const eventRegistrations = registrations.filter(
    (registration) => registration.eventId === eventTodisplay?.id
  );
  return (
    <div className="container">
      <Typography className="title" variant="h1">
        Inscriptions : {eventTodisplay?.title}
      </Typography>
      {eventRegistrations.length > 0 ? (
        <List className="registrationList">
          {eventRegistrations.map((registration, index) => (
            <div key={registration.id || index}>
              <ListItem className="registration-item">
                <ListItemText
                  className="registration-text"
                  primary={`${registration.firstname} ${registration.lastname}`}
                  secondary={`${registration.company}`}
                />
              </ListItem>
            </div>
          ))}
        </List>
      ) : (
        <Typography className="error">
          Il n'y a pas encore d'inscriptions pour cet évènement.
        </Typography>
      )}
      <div className="button-container">
        <Button
          variant="outlined"
          onClick={() => setPageTodisplay(PageType.CreateRegistration)}
        >
          Ajouter une inscription
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setPageTodisplay(PageType.SigninMode)}
        >
          Emargement
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => setPageTodisplay(PageType.EventDetails)}
        >
          Retourner à l'évènement
        </Button>
      </div>
    </div>
  );
};

export default RegistrationList;
