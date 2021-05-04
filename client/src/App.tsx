
import { ThemeProvider } from '@material-ui/core';
import React from 'react'
import './App.css';
import LandingPage from './componants/LandingPage';
import { theme } from './providers/ThemeProvider';
import MainPage from "./componants/MainPage";

function App() {
  return (
   <>
    <MainPage />
   <ThemeProvider theme={theme}>

   <LandingPage/>
   </ThemeProvider>
   </>
  );

}

export default App;
