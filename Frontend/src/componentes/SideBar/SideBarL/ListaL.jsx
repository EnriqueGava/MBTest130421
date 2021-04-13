import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Logout} from '../../../functions'
import {
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
                        <ListAltIcon className={classes.icon}/>
                        
                        <Link to="/Campo/new_levantamientos">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Nuevo Levantamiento</Typography>}
                                />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon className={classes.icon}/>
                        <Link to="/Campo/levantamientos">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Levantamientos</Typography>}
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