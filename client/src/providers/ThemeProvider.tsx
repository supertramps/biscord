import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D9D9D9",
    },
    secondary: {
      main: "#7289DA",
    },
    error: {
      main: "#D32F2F",
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      color: "white",
      fontFamily: "Uni-Sans",
    },
    h5: {
      fontSize: "2rem",
      fontFamily: "Uni-Sans",
    },
    body1: {
      fontSize: "1.5rem",
      color: "#D9D9D9",
      fontFamily: "whitney",
    },
    body2: {
      fontsize: "0.8rem",
      color: "#99AAB5",
    },
  },
});
