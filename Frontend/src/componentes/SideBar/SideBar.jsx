import React from 'react'
import {
    AppBar, Toolbar, Typography, IconButton, Badge,
    List, ListItem, ListItemAvatar, Avatar, ListItemText,
    Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    notificacionButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'true',
        },
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
        backgroundColor: theme.palette.mb.limegreen,
    },
    badge: {
        color: theme.palette.error.primary,
    },
    typography: {
        padding: theme.spacing(2),
    },
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}))

const SideBar = (props) => {
    const classes = useStyles();
    return (
        <div >
            <AppBar className={classes.appBar} >
                <Toolbar>
                    <IconButton color="black" aria-label="menu"
                        className={classes.menuButton}
                        onClick={() => props.handleDrawerToggle()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="black" className={classes.title} >
                       
                        <img src="/images/logos/ImagenColor2.png" width="240" height="50" ></img>
                    </Typography>

                    <IconButton color="black">
                        <PopupState variant="popper" popupId="demo-popup-popper">
                            {(popupState) => (
                                <div>

                                    <Badge color="error" variant="dot" {...bindToggle(popupState)}>
                                        <NotificationsIcon />
                                    </Badge>
                                    <Popper disablePortal={true} {...bindPopper(popupState)} transition>
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper elevation={3}>
                                                    <List className={classes.root}>
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemAvatar>
                                                                <Avatar alt="S" src="/static/images/avatar/1.jpg" />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary="Pendiente"
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className={classes.inline}
                                                                            color="textPrimary"
                                                                        >
                                                                           Levantamiento 1303
              </Typography>
                                                                        {" — El levantamiento 1303 esta pendiente de tu revision"}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <Divider variant="inset" component="li" />
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemAvatar>
                                                                <Avatar alt="H" src="/static/images/avatar/2.jpg" />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary="Pendiente"
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className={classes.inline}
                                                                            color="textPrimary"
                                                                        >
                                                                            Solicitud de trabajo 1302
              </Typography>
                                                                        {" — La solicitud de trabajo 1302 esta pendiente de tu revision"}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <Divider variant="inset" component="li" />
                                                        
                                                    </List>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </div>
                            )}
                        </PopupState>

                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}

export default SideBar