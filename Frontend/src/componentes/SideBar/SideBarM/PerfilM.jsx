import React from 'react'
import { Avatar, Typography, makeStyles,List, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import {
  Link,
} from 'react-router-dom';

import Cookie from 'js-cookie';

const Perfil = () => {

    
    const estilos = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'fit-content'
        },
        avatar: {
          width: 130,
          height: 130
        },
        name: {
          marginTop: theme.spacing(1)
        },
        offset: theme.mixins.toolbar
      }));
    const classes = estilos();

    const [userm, setUserm] = React.useState({});
  React.useEffect(() => {
    axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
          console.log(data.data)
          axios.get(`/users/photo/${data.data.user}`)
            .then(result => {
              setUserm(Object.values(Object.values(result.data))[1]);
            })
        })
    

  }, []);

  

  const [imagendes, setImagen] = React.useState({});
  const getImage = () => {
    axios.post("/users/desencrypt", { email: userm.User_ID, password: userm.Perfil })
    .then(result => {
      if (result.data.success === true) {
        console.log(result)
        setImagen(Object.values(Object.values(result.data))[1]);
      }
    })
    
    return "data:image/png;base64,"+imagendes
  }

    return ( 
        <div className={classes.root}>
            <Avatar
            src={getImage()}
            alt="Person"
            className={classes.avatar}      
      />
     <Typography
        className={classes.name}
        variant="h4"
        style={{ color: '#FFFFFF' }}
      >
        {userm.Nombre}
      </Typography>
      <Typography variant="body1" style={{ color: '#f4f6f8' }}>Mantenimiento</Typography>
      <div>
            <List component="nav">
      <ListItem button>
                    <EditIcon className={classes.icon}/>
                        <Link to="/Mantenimiento/Edit_PerfilM">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Editar Perfil</Typography>}
                                />
                        </Link>
                    
     </ListItem>
     </List>
     
    </div>
        </div>
     );
}
 
export default Perfil;
