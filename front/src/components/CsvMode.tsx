import { FC, useEffect, useState, useContext } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CsvData, parseCsvText } from "../global/helper";
import { CsvDataTable } from "./ImportCsv";
import EventSelector from "./Selector";
import { DataContext } from "../global/context/DataContext";
import { EventsRecord } from "../pocketbase-type";
import { PageContext, PageType } from "../global/context/PageContext";

const CsvMode: FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [evt, setEvt] = useState<EventsRecord | undefined>();
  const [loading, setLoading] = useState(false);
  const { events, createRegistration } = useContext(DataContext);
  const { setPageTodisplay } = useContext(PageContext);
  useEffect(() => {
    if ("launchQueue" in window) {
      //@ts-ignore
      window.launchQueue?.setConsumer(async (launchParams) => {
        if (launchParams.files && launchParams.files.length) {
          const file = launchParams.files[0];
          if (file.kind === "file") {
            const blob = await file?.getFile();
            const text = await blob?.text();
            setData(parseCsvText(text));
          }
        }
      });
    }
  }, []);
  const onEventSelected = (event?: EventsRecord): void =>
    setEvt(event);
  const importData = async (): Promise<void> => {
    setLoading(true);
    data.forEach(
      async (registration) =>
        await createRegistration({
          ...registration,
          eventId: evt?.id,
        })
    );
    setLoading(false);
    setPageTodisplay(PageType.Home);
  };
  return (
    <>
      <CsvDataTable parsedData={data} />
      <EventSelector events={events} onChange={onEventSelected} />
      {typeof evt !== "undefined" ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={importData}
        >
          {loading ? <CircularProgress size={24} /> : "Importer"}
        </Button>
      ) : undefined}
    </>
  );
};

export default CsvMode;
