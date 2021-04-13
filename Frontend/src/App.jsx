import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

import Container from './componentes/SideBar/Container';
import ContainerL from './componentes/SideBar/SideBarL/ContainerL'
import ContainerM from './componentes/SideBar/SideBarM/ContainerM'
import ContainerCu from './componentes/SideBar/SideBarCu/ContainerCu'
import ContainerS from './componentes/SideBar/SideBarSup/ContainerS'
import Routes from './Routes';
import Cookie from 'js-cookie';
import { isLogin, hasRole } from './functions';

function App(props) {
  
  if(isLogin() && Cookie.get("Role")==='JUDE')  
  return (
    <ThemeProvider theme={theme}>
      <Container/>
    </ThemeProvider>
  );
  else if(isLogin() && Cookie.get("Role")==='CampoE')  
  return (
    <ThemeProvider theme={theme}>
      <ContainerL/>
    </ThemeProvider>
  );
  else if(isLogin() && Cookie.get("Role")==='MantE')  
  return (
    <ThemeProvider theme={theme}>
      <ContainerM/>
    </ThemeProvider>
  );
  else if(isLogin() && Cookie.get("Role")==='CuadE')  
  return (
    <ThemeProvider theme={theme}>
      <ContainerCu/>
    </ThemeProvider>
  );
  else if(isLogin() && Cookie.get("Role")==='SupE')  
  return (
    <ThemeProvider theme={theme}>
      <ContainerS/>
    </ThemeProvider>
  );
  else 
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );

  {/*return (
    <ThemeProvider theme={theme}>
      <ContainerL/>
    </ThemeProvider>
  );*/}
 
}

export default App;
