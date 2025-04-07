import { Button, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import "../App.css";
import { DataContext } from "../global/context/DataContext";
import { PageContext, PageType } from "../global/context/PageContext";
import { RegistrationsRecord } from "../pocketbase-type";
import CustomTextField from "./CustomTextField";

const CreateRegistration: FC = () => {
  const { createRegistration } = useContext(DataContext);
  const { eventTodisplay, setPageTodisplay } =
    useContext(PageContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!eventTodisplay) return;

    const newRegistration: RegistrationsRecord = {
      eventId: eventTodisplay.id,
      firstname,
      lastname,
      company, // Note: 'society' is used in the RegistrationsRecord type
    };

    const success = await createRegistration(newRegistration);
    if (success) {
      setPageTodisplay(PageType.RegistrationList);
    } else {
      // Handle error (you might want to show an error message to the user)
      console.error("Failed to create registration");
    }
  };
  return (
    <div>
      <Typography variant="h1" className="title">
        Nouvel inscription : {eventTodisplay?.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          label="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <CustomTextField
          label="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <CustomTextField
          label="Société"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <div className="button-group">
          <Button
            variant="outlined"
            color="warning"
            onClick={() =>
              setPageTodisplay(PageType.RegistrationList)
            }
            sx={{ marginTop: 2 }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            sx={{ marginTop: 2, marginRight: 2 }}
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRegistration;
