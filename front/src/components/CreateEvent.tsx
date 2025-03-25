import { Button, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import "../App.css";
import { DataContext } from "../global/context/DataContext";
import { PageContext, PageType } from "../global/context/PageContext";
import CustomTextField from "./CustomTextField";

const CreateEvent: FC = () => {
  const { createEvent } = useContext(DataContext);
  const { setPageTodisplay } = useContext(PageContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const success = await createEvent({ title, description, picture });
      if (success) {
        setPageTodisplay(PageType.EventList);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  return (
    <div className="container">
      <Typography variant="h1" className="title">
        Création d'un évènement
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          value={title}
          label="Titre"
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomTextField
          value={description}
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
        <CustomTextField
          value={picture}
          label="Image URL"
          onChange={(e) => setPicture(e.target.value)}
        />
        <div className="button-group">
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setPageTodisplay(PageType.EventList)}
            sx={{ marginTop: 2 }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            sx={{ marginTop: 2 }}
          >
            Valider
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
