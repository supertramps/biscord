import { useState, useEffect } from "react";

import {
  Box,
  makeStyles,
  Theme,
} from "@material-ui/core";

function Giphy() {
  const [gifURL, setGifURL] = useState<string>("");
  const classes = useStyles();
  var myHeaders = new Headers();
  myHeaders.get("Content-Type");

  const term = "abc";
  const url = `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=nGgKX5djKNAVoYChgFHSzk7Q2tnOs65p&limit=1/`;
  const fetchGif = async () => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/JSON",
      },
      method: "GET",
    });

    const json = await response.json();

    setGifURL(json.data[0].embed_url);
  };

  useEffect(() => {
    fetchGif();
  }, [term]);

  return (
    <Box>
      <iframe className={classes.iFrame} src={gifURL} />
    </Box>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#2C2F33",
  },
  iFrame: {
    border: "none",
    cursor: "none",
  },
}));

export default Giphy;
