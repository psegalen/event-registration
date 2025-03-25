import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import "../App.css";
import { DataContext } from "../global/context/DataContext";
import { PageContext, PageType } from "../global/context/PageContext";
import { RegistrationsRecord } from "../pocketbase-type";
import { getFullDate } from "../global/helper";

const SigninMode: FC = () => {
  const { registrations, updateRegistration } = useContext(DataContext);
  const { eventTodisplay, setPageTodisplay } = useContext(PageContext);

  const eventRegistrations: RegistrationsRecord[] = registrations.filter(
    (registration) => registration.eventId === eventTodisplay?.id
  );

  const handleToggleArrival = async (registrationId: string) => {
    const now = new Date().toISOString();
    const updatedRegistration = { id: registrationId, arrivedAt: now };

    await updateRegistration(updatedRegistration);
  };
  return (
    <div className="container">
      <Typography variant="h1" className="title">
        Emargement : {eventTodisplay?.title}
      </Typography>
      {eventRegistrations.length > 0 ? (
        <div>
          <List className="registrationList">
            {eventRegistrations.map((registration) => (
              <ListItem
                className={`registration-item ${
                  registration.arrivedAt ? "arrived" : "notArrived"
                }`}
                key={registration.id}
              >
                <Checkbox
                  disabled={registration.arrivedAt ? true : false}
                  edge="start"
                  className={`checkbox ${
                    registration.arrivedAt ? "checked" : "unchecked"
                  }`}
                  checked={registration.arrivedAt ? true : false}
                  onChange={() =>
                    registration.arrivedAt
                      ? undefined
                      : handleToggleArrival(registration.id || "")
                  }
                />
                <Tooltip
                  arrow
                  title={
                    registration.arrivedAt
                      ? `Arrivé : ${getFullDate(registration.arrivedAt)}`
                      : ""
                  }
                >
                  <ListItemText
                    className="registration-text"
                    sx={{ color: registration.arrivedAt ? "white" : undefined }}
                    primary={`${registration.firstname} ${registration.lastname}`}
                    secondary={`${registration.company}`}
                  />
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <Typography className="error">
          Pas d'inscriptions pour cet évènement.
        </Typography>
      )}

      <div className="button-container">
        <Button
          onClick={() => setPageTodisplay(PageType.CreateSignin)}
          variant="outlined"
          color="primary"
        >
          Ajouter un émargement
        </Button>
        <Button
          onClick={() => setPageTodisplay(PageType.RegistrationList)}
          variant="outlined"
          color="warning"
          sx={{ marginTop: 2 }}
        >
          Retourner à la liste des inscrits
        </Button>
      </div>
    </div>
  );
};

export default SigninMode;
