import { createTheme } from "@mui/material";

export const primaryAccentColor = "#1BAEE7";
export const secondaryAccentColor = "#153E52";
export const textColor = "#FFFFFF";
export const cardsColor = "#FFFFFF";
export const backgroundColor = "#153E52";

const Theme = createTheme({
  typography: {
    fontFamily: "Source Code Pro",
  },
  palette: {
    primary: {
      main: primaryAccentColor,
    },
    secondary: {
      main: secondaryAccentColor,
    },
    info: {
      main: secondaryAccentColor,
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontSize: "24px",
            fontWeight: 800,
            textTransform: "uppercase",
            margin: "16px 0",
            color: primaryAccentColor,
          },
        },
        {
          props: { variant: "h2" },
          style: {
            fontSize: "16px",
            fontWeight: 600,
            margin: "8px 0",
            color: primaryAccentColor,
          },
        },
        {
          props: { variant: "h2", textTransform: "uppercase" },
          style: {
            fontSize: "32px",
            fontWeight: 600,
            margin: "8px 0",
            textTransform: "uppercase",
            color: primaryAccentColor,
          },
        },
        {
          props: { variant: "body1" },
          style: {
            fontSize: "16px",
            fontWeight: 400,
            margin: "8px 0",
          },
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          backgroundColor: "rgba(0,0,0,0.7)",
          maxWidth: "400px",
        },
        arrow: {
          color: "rgba(0,0,0,0.7)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "white",
          },
        },
      ],
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
        sx: {
          backgroundColor: cardsColor,
          borderRadius: "8px",
          padding: "24px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        size: "small",
      },
    },
  },
});

export default Theme;
