import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Logout} from '../../../functions'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BuildIcon from '@material-ui/icons/Build';
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';
const Lista = () => {
    const useStyles = makeStyles((theme) => ({
        icon: {
        color: '#FFFFFF',
        marginRight: 5,
        },
        logout: {
            flexGrow: 1
        }
        }));
    const classes = useStyles();
    return ( 
        <div>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <ListAltIcon className={classes.icon} />
                        
                        <Link to="/Mantenimiento/MaLevantamiento">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Levantamientos aprobados</Typography>}
                                />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon className={classes.icon}/>
                        <Link to="/Mantenimiento/Status_T">
                        <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Solicitud de Trabajo</Typography>}
                                />
                        </Link>
                    </ListItemIcon>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <BuildIcon className={classes.icon}/>
                        <Link to="/Mantenimiento/InventarioM">
                        <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Inventario</Typography>}
                                />
                        </Link>
                    </ListItemIcon>
                </ListItem>

                <ListItem button>
                    <ListItemIcon onClick={()=>Logout()}>
                        <ExitToAppIcon className={classes.icon}/>
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
