import { TextField } from "@mui/material";
import { FC } from "react";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  type?: string;
  icon?: JSX.Element;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  multiline,
  type = "text",
  icon,
}) => {
  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "#1baee7",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1baee7",
          },
        },
        "& .MuiInputLabel-outlined": {
          color: "#1baee7",
        },
      }}
      variant="outlined"
      color="primary"
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      required
      multiline={multiline}
      type={type}
      slotProps={{
        input: {
          endAdornment: icon,
        },
      }}
    />
  );
};

export default CustomTextField;
