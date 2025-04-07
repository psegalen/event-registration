import { FC, useEffect, useState, useContext } from "react";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { CsvData, parseCsvFromText } from "../global/helper";
import { CsvDataTable } from "./ImportCsv";
import { DataContext } from "../global/context/DataContext";
import { primaryAccentColor } from "../global/Theme";
import { PageContext, PageType } from "../global/context/PageContext";

const LaunchWithCsvFile: FC = () => {
    const [fileName, setFileName] = useState("");
    const [parsedData, setParsedData] = useState<CsvData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { events, createRegistration } = useContext(DataContext);
    const { eventTodisplay, setPageTodisplay, setEventTodisplay } = useContext(PageContext);
    const handleSubmit = async (): Promise<void> => {
        if (typeof eventTodisplay?.id !== "string") alert("Veuillez choisir un événement !");
        else {
            setLoading(true);
            for (const registration of parsedData) {
                await createRegistration({...registration, eventId: eventTodisplay?.id})
            }
            setLoading(false);
            setPageTodisplay(PageType.RegistrationList);
        }
    }
    useEffect(() => {
        if ("launchQueue" in window) {
            window.launchQueue?.setConsumer((launchParams) => {
              if (launchParams.files && launchParams.files.length) {
                console.log("Found a file:", launchParams);
                // @ts-ignore
                launchParams.files[0].getFile().then((blob: unknown) => {
                    // @ts-ignore
                    blob.handle = launchParams.files[0];
                    // @ts-ignore
                    blob.text().then((t: string) => {
                        setParsedData(parseCsvFromText(t));
                    });
                });
                setFileName(launchParams.files[0].name);
              }
            });
          }
    }, []);
    return <>
        <Typography>Launch with CSV file : {fileName}</Typography>
        {parsedData.length !== 0 ? <>
            <CsvDataTable parsedData={parsedData} />
            <FormControl
                    sx={{
                        marginTop: "24px",
                        width: "300px",
                        "& .MuiInputLabel-outlined": {
                            color: primaryAccentColor,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: primaryAccentColor,
                        },
                        "& .MuiSelect-icon": {
                            color: primaryAccentColor,
                        },
                    }}>
                <InputLabel id="event-selector-label">Evénement concerné</InputLabel>
                <Select
                    id="event-selector"
                    labelId="event-selector-label"
                    label="Event concerné"
                    variant="outlined"
                    color="primary"
                    onChange={(e) => setEventTodisplay(events.find(ev => ev.id === e.target.value as string) || null)}>
                    {events.map((e) => <MenuItem key={e.id} value={e.id}>{e.title}</MenuItem>)}
                </Select>
            </FormControl>
            <Button
                variant="outlined"
                color="success"
                sx={{ marginTop: "16px", marginBottom: "24px" }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Importer"}
            </Button>
        </> : undefined}
    </>
}

export default LaunchWithCsvFile;