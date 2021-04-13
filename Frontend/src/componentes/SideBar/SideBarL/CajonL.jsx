import React from 'react'
import { Drawer, makeStyles, Divider, Typography } from '@material-ui/core'
import ListaL from './ListaL';
import PerfilL from './PerfilL';
const estilos = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        backgroundColor: '#4caf50',
    },
    toolbar: theme.mixins.toolbar,
    divider: {
        marginBottom: 26
    },
    areas: {
        marginTop: 16,
        marginBottom: 10,

    }
}))
const Cajon = (props) => {

    const classes = estilos();
    return (

        <Drawer className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}>

            <div className={classes.areas}>
                <Typography variant="h3" align="center" style={{ color: '#FFFFFF' }}>
                    JUD Estaciones
                </Typography>
            </div>
            <PerfilL />
            <div className={classes.divider}></div>
            <Divider />
            <ListaL />

        </Drawer>

    );
}

export default Cajon;