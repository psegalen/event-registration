import { FC, useEffect, useState } from "react";
import { CsvData, parseCsvText } from "../global/helper";
import { CsvDataTable } from "./ImportCsv";

const CsvMode: FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
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
  return <CsvDataTable parsedData={data} />;
};

export default CsvMode;
