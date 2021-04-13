import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Logout} from '../../../functions'
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';
const Lista = () => {
    const useStyles = makeStyles((theme) => ({
        icon: {
        color: '#FFFFFF',
        marginRight: 5,
        }
        }));
    const classes = useStyles();
    return ( 
        <div>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon className={classes.icon}/>
                        <Link to="/Cuadrilla/levantamientos_cu">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Solicitudes de trabajo</Typography>}
                                />
                        </Link>
                    </ListItemIcon>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <HowToRegIcon className={classes.icon}/>
                        <Link to="/Cuadrilla/menucua">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Registrar Personal</Typography>}
                                />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                

                <ListItem button>
                <ListItemIcon onClick={() => Logout()}>
                        <ExitToAppIcon className={classes.icon} />
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Cerrar Sesion</Typography>}
                        />
                    </ListItemIcon>
                </ListItem>
               
            </List>

            
        </div>
     );
}
 
export default Lista;