import React, { useState, useEffect } from 'react';
import { Avatar, Typography, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
          minHeight: 'fit-content',
          marginTop: 1
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

    const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axios.post("/users/user", {token : Cookie.get("Token")})
        .then(data => {
          axios.get(`/users/photo/${data.data.user}`)
            .then(result => {
              
              setUser(Object.values(Object.values(result.data))[1]);
            })
    })
 

  }, []);
    
  

  const [imagendes, setImagen] = React.useState({});
  const getImage = () => {
    axios.post("/users/desencrypt", { email: user.User_ID, password: user.Perfil })
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
        alt="Person"
        className={classes.avatar}
        src={getImage()}
      />
      <Typography
        className={classes.name}
        variant="h4"
        style={{ color: '#FFFFFF' }}
      >
        {user.Nombre}
      </Typography>
      <Typography variant="body2" style={{ color: '#FFFFFF' }}>JUD</Typography>
      <div>
            <List component="nav">
      <ListItem button>
                    <EditIcon className={classes.icon}/>
                        <Link to="/Jud/Edit_perfilJ">
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
