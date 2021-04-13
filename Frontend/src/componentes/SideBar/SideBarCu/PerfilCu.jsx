import React from 'react'
import {List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { blue, red } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from "@material-ui/core/Button";
import axios from 'axios';
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
    icon: {
      color: '#FFFFFF',
      marginRight: 1,
      },
    boton1: {
      color: theme.palette.getContrastText(blue[50]),
      backgroundColor: blue[50],
      '&:hover': {
        backgroundColor: blue[50],
      },
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
          console.log(data);
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
  
        <IconButton>
          <Avatar
            src={getImage()}
            alt="Person"
        className={classes.avatar}
          />
        </IconButton>
      <Typography
        className={classes.name}
        variant="h4"
        style={{ color: '#FFFFFF' }}
      >
        {user.Nombre}
      </Typography>
      <Typography variant="body1" style={{ color: '#f4f6f8' }}>Jefe de Cuadrilla</Typography>
      <div>
            <List component="nav">
      <ListItem button>
                    <EditIcon className={classes.icon}/>
                        <Link to="/Cuadrilla/edit_perfilcu">
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