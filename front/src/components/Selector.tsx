import { MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { primaryAccentColor } from "../global/Theme";
import { EventsRecord } from "../pocketbase-type";

const EventSelector: FC<{
  events: EventsRecord[];
  onChange: (item?: EventsRecord) => void;
}> = ({ events, onChange }) => (
  <Select
    color="primary"
    sx={{
      maxWidth: "300px",
      color: primaryAccentColor,
      "& .MuiInputLabel-outlined": {
        color: primaryAccentColor,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: primaryAccentColor,
      },
      "& .MuiSelect-icon": {
        color: primaryAccentColor,
      },
    }}
    onChange={(e) =>
      onChange(events.find((ev) => ev.id === e.target.value))
    }
  >
    {events.map((e) => (
      <MenuItem value={e.id}>{e.title}</MenuItem>
    ))}
  </Select>
);

export default EventSelector;
