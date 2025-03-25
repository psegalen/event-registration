export const getFullDate = (date: string): string => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();
  return `${year}-${month}-${day} à ${hours}:${minutes}:${seconds}`;
};

export interface CsvData {
  firstname: string;
  lastname: string;
  company: string;
}

export const parseCSV = (
  file: File,
  setMessage: (e: string) => void,
  setParsedData: (data: CsvData[]) => void
) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      console.log(
        "File read complete. Result type:",
        typeof event.target?.result
      );
      const rawData = event.target?.result;

      if (typeof rawData !== "string") {
        console.error("Unexpected result type:", typeof rawData);
        setMessage("Error reading file: Unexpected data type");
        return;
      }

      const lines = rawData.split("\r\n");
      if (lines.length < 2) {
        setMessage("Le fichier CSV est vide ou ne contient que l'en-tête.");
        return;
      }
      const headers = lines[0].split(",");

      if (
        headers.length !== 3 ||
        !headers.includes("firstname") ||
        !headers.includes("lastname") ||
        !headers.includes("company")
      ) {
        setMessage(
          "Le format du CSV est incorrect. Assurez-vous qu'il contient les colonnes : firstname, lastname, company"
        );
        return;
      }

      const parsedData: CsvData[] = lines
        .slice(1)
        .map((line) => {
          const values = line.split(",");

          return {
            firstname: values[headers.indexOf("firstname")],
            lastname: values[headers.indexOf("lastname")],
            company: values[headers.indexOf("company")],
          };
        })
        .filter(
          (data) =>
            (data.firstname || data.lastname || data.company) &&
            data.firstname.length > 0 &&
            data.lastname.length > 0 &&
            data.company.length > 0
        );

      setParsedData(parsedData);
      setMessage("");
    } catch (error) {
      console.error("Error in parseCSV:", error);
      setMessage("An unexpected error occurred while parsing the CSV");
    }
  };
  reader.readAsText(file);
};
