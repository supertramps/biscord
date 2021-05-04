import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D9D9D9",
    },
    secondary: {
      main: "#1DA1F2",
    },
    error: {
      main: "#D32F2F",
    },
  },
  typography: {
    h1: {
      fontSize: 55,
      color:"white"
    },
    h5: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1.2rem",
      color: "#D9D9D9",
    },
    body2: {
      fontsize: "1rem",
      color: "#6E767D",
    },
  },
});
