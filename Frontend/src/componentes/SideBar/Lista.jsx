import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Logout } from '../../functions';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AddBoxIcon from '@material-ui/icons/AddBox';
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

                        <Link to="/Jud/levantamientos">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Levantamiento</Typography>}
                            />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon className={classes.icon} />
                        <Link to="/Jud/solicitud_trabajo">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Solicitud de Trabajo</Typography>}
                            />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIndIcon className={classes.icon} />
                        <Link to="/Jud/Usuarios">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Usuarios</Typography>}
                            />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AddBoxIcon  className={classes.icon} />
                        <Link to="/Jud/Nueva_linea">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Nueva linea</Typography>}
                            />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AddBoxIcon  className={classes.icon} />
                        <Link to="/Jud/Nueva_categoria">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Nueva Categoria</Typography>}
                            />
                        </Link>
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AddBoxIcon  className={classes.icon} />
                        <Link to="/Jud/Nueva_falla">
                            <ListItemText
                                disableTypography
                                primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Nueva Falla</Typography>}
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