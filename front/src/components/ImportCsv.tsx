import {
  FC,
  useState,
  FormEvent,
  useCallback,
  useContext,
} from "react";
import "../App.css";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { CsvData, parseCSV } from "../global/helper";
import { DataContext } from "../global/context/DataContext";
import { PageContext, PageType } from "../global/context/PageContext";

export const CsvDataTable: FC<{ parsedData: CsvData[] }> = ({
  parsedData,
}) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" gutterBottom>
      Aperçu des données ({parsedData.length} entrées)
    </Typography>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Entreprise</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parsedData.slice(0, 5).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {parsedData.length > 5 && (
      <Typography variant="body2" sx={{ mt: 2 }}>
        ... et {parsedData.length - 5} entrées supplémentaires
      </Typography>
    )}
  </Box>
);

const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImportCsv: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [parsedData, setParsedData] = useState<CsvData[]>([]);
  const { createRegistration } = useContext(DataContext);
  const { eventTodisplay, setPageTodisplay } =
    useContext(PageContext);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      parseCSV(acceptedFiles[0], setMessage, setParsedData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    parsedData.forEach(
      async (registration) =>
        await createRegistration({
          ...registration,
          eventId: eventTodisplay?.id,
        })
    );
    setLoading(false);
    setPageTodisplay(PageType.RegistrationList);
  };

  return (
    <div className="container">
      <Typography variant="h1" className="title">
        Importer un CSV
      </Typography>
      <form onSubmit={handleSubmit}>
        <DropzoneArea {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Déposez le fichier CSV ici...</Typography>
          ) : (
            <Typography>
              Glissez et déposez un fichier CSV ici, ou cliquez pour
              sélectionner un fichier
            </Typography>
          )}
          {file && (
            <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
              Fichier sélectionné : {file.name}
            </Typography>
          )}
        </DropzoneArea>
        {parsedData.length > 0 && (
          <CsvDataTable parsedData={parsedData} />
        )}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!file || loading || parsedData.length === 0}
          >
            {loading ? <CircularProgress size={24} /> : "Importer"}
          </Button>
        </Box>
      </form>
      {message && (
        <Typography
          variant="body2"
          color={message.includes("Erreur") ? "error" : "success"}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default ImportCsv;
