import { ThemeProvider } from '@material-ui/core';
import React from 'react'
import './App.css';
import LandingPage from './componants/LandingPage';
import { theme } from './providers/ThemeProvider';

function App() {
  return (
   <>
   <ThemeProvider theme={theme}>

   <LandingPage/>
   </ThemeProvider>
   </>
  );
}

export default App;
