import React from 'react'
import { makeStyles, Hidden} from '@material-ui/core';
import SideBarM from './SideBarM';
import CajonM from './CajonM';
import Routes from '../../../Routes';

const estilo = makeStyles(theme =>({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Container = () => {

    const [abrir, setAbrir] = React.useState(false);

    const handleDrawerToggle = () => {
        setAbrir(!abrir)
    }

    const classes = estilo();
    return (  
        <div className={classes.root}>
            <SideBarM handleDrawerToggle={handleDrawerToggle}/>
            <Hidden xsDown>
                <CajonM
                    variant="permanent"
                    open={true}
                />
            </Hidden>
            <Hidden smUp>
                <CajonM
                    variant="temporary"
                    open={abrir}
                    onClose={handleDrawerToggle}
                />
            </Hidden>
            
            <div className={classes.content}>
                <div className={classes.toolbar}></div>
                <Routes/>
            </div>
        </div>
    );
}
 
export default Container;