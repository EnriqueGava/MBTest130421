import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Logout } from '../../../functions';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: '#FFFFFF',
        marginRight: 5,
    }
}));


const Lista = () => {
    const classes = useStyles();
    return (
        <div>

            <List component="nav">
                <ListItem button>
                    <ListItemIcon >
                        <ListAltIcon className={classes.icon} />

                        <Link to="/Supervisor/levantamientos">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Levantamiento</Typography>}
                            />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ListAltIcon className={classes.icon}/>
                        
                        <Link to="/Supervisor/nuevo_levantamiento">
                            <ListItemText
                                    disableTypography
                                    primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Nuevo Levantamiento</Typography>}
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